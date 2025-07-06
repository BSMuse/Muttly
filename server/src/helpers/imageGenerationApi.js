require('dotenv').config();
const Replicate = require('replicate');
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// ---------- Supabase ----------
const supabase = createClient(
  process.env.SUPABASE_URL,     // e.g. https://bwdmmqbtqftapfdcearf.supabase.co
  process.env.SUPABASE_ANON_KEY
);

// ---------- Replicate ----------
const replicate = new Replicate({
  auth: process.env.REPLICATE_API,
});

// List of possible backgrounds for random selection
const backgrounds = [
  "floating in outer space with stars and nebulas",
  "in a magical enchanted forest with glowing fireflies",
  "on a sunny beach with crystal clear water",
  "in a snowy mountain landscape",
  "in a cozy living room with a fireplace",
  "in a blooming flower garden",
  "in a bustling city park",
  "near a peaceful lake at sunset",
  "in a rustic barn with hay bales",
  "in front of a castle with medieval architecture",
  "in a zen garden with cherry blossoms",
  "on a vintage train platform",
  "in a whimsical candy land setting",
  "in a steampunk workshop",
  "in an autumn forest with falling leaves"
];

// Function to get a random background
function getRandomBackground() {
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  return backgrounds[randomIndex];
}

async function replicateSubmit(dogOne, dogTwo) {
  try {
    // Use the specific reference image
    const imagePath = path.resolve(__dirname, '../../../client/public/mock_dogs/Shiba_Inupug.jpg');
    console.log('Full image path:', imagePath);
    console.log('Does file exist?', fs.existsSync(imagePath));
    
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Reference image not found at: ${imagePath}`);
    }
    
    // Read and convert image to base64
    const imageBuffer = fs.readFileSync(imagePath);
    console.log('Image size:', imageBuffer.length, 'bytes');
    const base64Image = imageBuffer.toString('base64');
    const dataUrl = `data:image/png;base64,${base64Image}`;

    // Get a random background
    const background = getRandomBackground();
    console.log('Selected background:', background);

    const prompt = `(one dog:1.4), (solo:1.3), full-body ${dogOne}-${dogTwo} designer crossbreed,
${dogOne}-${dogTwo} mixed-breed dog, hybrid mutt, wagging tail, cute, happy,
${background}
`.trim();
    
    console.log('Starting Replicate prediction with reference image...');
    const prediction = await replicate.predictions.create({
      version: "e7ed05b327c0132e22c0818591d8ac63edf5ea9fc6929b4d6841713de24eb146",
      input: {
        prompt,
        negative_prompt: 'two dogs, second dog, two heads, extra ears, no tail, bad anatomy, extra tail, collar, clothing, duplicate ears, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, mutated paws, poorly drawn paws, poorly drawn face, mutation, deformed, blurry, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature'.trim(),
        init_image: dataUrl,
        width: 800,
        height: 512,
        num_inference_steps: 35,
        guidance_scale: 9,
        strength: 0.45,
        scheduler: "DPM++ 2M Karras",
        num_outputs: 1,
        seed: -1
      }
    });

    console.log('Prediction created:', prediction);

    // Wait for the prediction to complete
    let result = await replicate.wait(prediction);
    console.log('Prediction result:', result);

    if (!result.output || !result.output[0]) {
      throw new Error('No output received from Replicate');
    }

    const outputUrl = result.output[0];

    /* -------- Download generated image -------- */
    console.log('Downloading generated image...');
    const response = await fetch(outputUrl);
    const imgBuffer = await response.buffer();

    /* -------- Upload to Supabase Storage -------- */
    console.log('Uploading to Supabase storage...');
    const fileName = `dog-${uuidv4()}.png`;
    const { error } = await supabase
      .storage
      .from('dogs')
      .upload(fileName, imgBuffer, { contentType: 'image/png' });

    if (error) {
      console.error('Supabase upload error:', error);
      throw error;
    }

    const publicUrl = supabase
      .storage
      .from('dogs')
      .getPublicUrl(fileName).data.publicUrl;

    console.log('Successfully uploaded to Supabase:', publicUrl);

    return {
      publicUrl,
      replicateOutputUrl: outputUrl
    };

  } catch (err) {
    console.error('Replicate Submit Error:', err);
    throw err;
  }
}

module.exports = replicateSubmit;
