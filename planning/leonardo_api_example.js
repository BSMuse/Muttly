
// Fetch
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Bearer api-token'
  },
  body: JSON.stringify({
    height: 512,
    modelId: 'e316348f-7773-490e-adcd-46757c738eb7',
    prompt: 'A Greyhound/St Bernard looking cute and happy.',
    width: 512,
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

fetch('https://cloud.leonardo.ai/api/rest/v1/generations', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

//Response 
{
    "sdGenerationJob": {
      "generationId": "75925cd2-fb65-4e8c-84c0-6cc010a528e3",
      "apiCreditCost": 11
    }
  } 

//   You then need to take the gnerationId and input it into another fetch: 

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: 'Bearer api token'
  }
};

fetch('https://cloud.leonardo.ai/api/rest/v1/generations/47d8c010-bcf4-48b0-8c94-ba1dae7e8143', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


    //Response  
    {
        "generations_by_pk": {
          "generated_images": [
            {
              "url": "https://cdn.leonardo.ai/users/584ce05a-8311-4733-8c21-d01395c45acf/generations/75925cd2-fb65-4e8c-84c0-6cc010a528e3/Leonardo_Creative_A_Great_DanePit_Bull_puppy_looking_cute_and_0.jpg",
              "nsfw": false,
              "id": "1f4a36cc-1cb0-4b2a-b3ef-932e30170438",
              "likeCount": 0,
              "generated_image_variation_generics": []
            },
            {
              "url": "https://cdn.leonardo.ai/users/584ce05a-8311-4733-8c21-d01395c45acf/generations/75925cd2-fb65-4e8c-84c0-6cc010a528e3/Leonardo_Creative_A_Great_DanePit_Bull_puppy_looking_cute_and_1.jpg",
              "nsfw": false,
              "id": "06f93b9b-3abb-4ded-8b02-b743c0d4c729",
              "likeCount": 0,
              "generated_image_variation_generics": []
            },
            {
              "url": "https://cdn.leonardo.ai/users/584ce05a-8311-4733-8c21-d01395c45acf/generations/75925cd2-fb65-4e8c-84c0-6cc010a528e3/Leonardo_Creative_A_Great_DanePit_Bull_puppy_looking_cute_and_2.jpg",
              "nsfw": false,
              "id": "6df55bf0-61ab-40a3-8d3f-2f6776ec20e3",
              "likeCount": 0,
              "generated_image_variation_generics": []
            },
            {
              "url": "https://cdn.leonardo.ai/users/584ce05a-8311-4733-8c21-d01395c45acf/generations/75925cd2-fb65-4e8c-84c0-6cc010a528e3/Leonardo_Creative_A_Great_DanePit_Bull_puppy_looking_cute_and_3.jpg",
              "nsfw": false,
              "id": "18627ccb-3bb0-42e9-95b7-604099f91287",
              "likeCount": 0,
              "generated_image_variation_generics": []
            }
          ],
          "modelId": "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3",
          "prompt": "A Great Dane/Pit Bull puppy looking cute and happy.",
          "negativePrompt": "",
          "imageHeight": 512,
          "imageWidth": 512,
          "inferenceSteps": 30,
          "seed": 276687360,
          "public": false,
          "scheduler": "EULER_DISCRETE",
          "sdVersion": "v2",
          "status": "COMPLETE",
          "presetStyle": null,
          "initStrength": null,
          "guidanceScale": 10,
          "id": "75925cd2-fb65-4e8c-84c0-6cc010a528e3",
          "createdAt": "2023-11-25T20:49:08.035",
          "promptMagic": false,
          "promptMagicVersion": null,
          "promptMagicStrength": null,
          "photoReal": false,
          "photoRealStrength": null,
          "generation_elements": []
        }
      } 


    //   Alternative ***

    // Reading further into the docs, they have a 
    // useful webhook functionality that will allow us to just grab the images 
    // in one request. We will need to create an end point that is accessible to the web 
    // to be able to recieve the data. (Not local host). We could host this on heroku to do so, I believe. 

    // Here are the docs for reference: 
    https://docs.leonardo.ai/docs/guide-to-the-webhook-callback-feature#setting-the-webhook-callback