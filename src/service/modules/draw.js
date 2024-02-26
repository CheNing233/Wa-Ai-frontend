import axios from 'axios';
import store from '@/store';
import { DRAW_API_URL, DRAW_API_LIST } from '@/config/ApiConfig';

const request = (url, method, params, data) => {
  console.log("请求", url, method, params, data);
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: method,
      params: params,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.success === true) {
            console.log("返回成功", res.data);
            resolve(res.data);
          }
          else {
            console.log("返回错误", res.data);
            reject(res.data.errorMsg);
          }
        }
        else {
          console.log("请求错误", res);
          reject(`status = ${res.status}; statusText = ${res.statusText}`);
        }
      })
      .catch((err) => {
        console.log("Axios POST 错误", err);
        reject(err);
      });
  });
}

const txt2img = () =>{
  const generateParams = store.getters.workbenchGetParams;
  const selectedParams = store.getters.workbenchGetSelected;

  const DATA = {
    "prompt": generateParams.prompt || "",
    "steps": generateParams.steps || 28,
    "seed": generateParams.seed || -1,
    "sampler_name": generateParams.sampler_name || "Euler a",
    "cfg_scale": generateParams.cfg_scale || 7.0,
    "width": generateParams.width || 512,
    "height": generateParams.height || 768,
    "negative_prompt": generateParams.negative_prompt || "",
    "enable_hr": generateParams.enable_hr || true,
    "denoising_strength": generateParams.denoising_strength || 0.0,
    "n_iter": 1,
    "hr_scale": generateParams.hr_scale || 2.0,
    "hr_upscaler": generateParams.hr_upscaler || "Latent",
    "hr_second_pass_steps": generateParams.hr_second_pass_steps || 20,
    "override_settings": {
        "sd_model_checkpoint": selectedParams.CHECKPOINT.filename || "tmndMix_tmndMixSPRAINBOW",
        "sd_vae": selectedParams.VAE.filename || "ClearVAE_NansLess1.safetensors",
        "CLIP_stop_at_last_layers": generateParams.CLIP_stop_at_last_layers || 2,
        "eta_noise_seed_delta": generateParams.eta_noise_seed_delta || 0,
    },
  }

  return request(
    `${DRAW_API_URL}${DRAW_API_LIST.txt2img}`, 'post',
    {}, DATA
  );
} 

export default {
  txt2img,
};