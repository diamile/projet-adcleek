// import axios from 'axios'
import axios from "../utils/axios"

/**
 * @description service qui permet de recuperer toutes les villes
 * @returns 
 */
export async function fetchAllCitiesService():Promise<any>{
    try{
        const response =  await axios.get('/api/cities');
        return response.data
        
    } 
    catch(err){
      throw err
    }
}

/**
 * @description service qui permet de recuperer la ville courrante (ville cliqué)
 * @param id 
 * @returns 
 */
export async function fetchcurrentCityService(id:string):Promise<any>{
    try{
        const response =  await axios.get(`/api/forecast/city/${id}`);
        return response.data
    } 
    catch(err){
      throw err
    }
}

/**
 * @description: service qui permet de seeder les villes
 * @returns 
 */
export async function seedCityFromService():Promise<any>{
  try{
   const response = axios.get('/api/seedCity');
    return response
  }catch(err){
    console.log('err',err)
     throw err
  }
}
