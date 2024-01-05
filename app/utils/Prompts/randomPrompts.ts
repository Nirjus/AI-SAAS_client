import { surpriseAudioPrompt, surpriseMePrompts, surpriseVideoPrompts } from "../constants";

export function getRandomPrompts(prompts:string) {
   const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
   const randomPrompts = surpriseMePrompts[randomIndex];

   if(randomPrompts === prompts){
    return getRandomPrompts(prompts);
   }
   return randomPrompts;
}

export function getRandomVideoPrompts(prompts:string) {
   const randomIndex = Math.floor(Math.random() * surpriseVideoPrompts.length);
   const randomPrompts = surpriseVideoPrompts[randomIndex];

   if(randomPrompts === prompts){
    return getRandomVideoPrompts(prompts);
   }
   return randomPrompts;
}

export function getRandomAudioPrompts(prompts:string) {
   const randomIndex = Math.floor(Math.random() * surpriseAudioPrompt.length);
   const randomPrompts = surpriseAudioPrompt[randomIndex];

   if(randomPrompts === prompts){
    return getRandomAudioPrompts(prompts);
   }
   return randomPrompts;
}