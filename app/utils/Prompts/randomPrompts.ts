import { surpriseMePrompts } from "../constants";

export function getRandomPrompts(prompts:string) {
   const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
   const randomPrompts = surpriseMePrompts[randomIndex];

   if(randomPrompts === prompts){
    return getRandomPrompts(prompts);
   }
   return randomPrompts;
}