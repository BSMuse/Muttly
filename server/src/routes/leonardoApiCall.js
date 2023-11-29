
require('dotenv').config();
const fetch = require('node-fetch');



async function generateDogPhoto(dogOne, dogTwo) {
  try {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: process.env.LEONARDO_API,
      },
      body: JSON.stringify({
    height: 512,
    modelId: 'e316348f-7773-490e-adcd-46757c738eb7',
    prompt: `${dogOne} and ${dogTwo} looking cute and happy.`,
    width: 512, // add a comma here
    init_generation_image_id: '8aa11359-c714-4ffd-a9d6-43ea1dcdb957',
    init_strength: 0.2,
    nsfw: false,
    negative_prompt: 'collar, clothing, duplicate ears, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated paws, poorly drawn paws, poorly drawn face, mutation, deformed, blurry, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature',
    presetStyle: 'LEONARDO',
    guidance_scale: 7,
    num_images: 1,
    promptMagic: false,
    promptMagicStrength: 0.5
  })
};
  const response = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', options);
  const data = await response.json();
  console.log("here is the data coming out", data);

  await new Promise(resolve => setTimeout(resolve, 10000));


  const secondOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.LEONARDO_API,
    },
  };


  secondResponse = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${data.sdGenerationJob.generationId}`, secondOptions);
  const secondData = await secondResponse.json();
  const dogUrl = secondData.generations_by_pk.generated_images[0].url
  console.log("Second fetch data:", dogUrl);
  return dogUrl;

  } 
  
  catch (error) {
  console.error(error);
}

}


module.exports = generateDogPhoto;