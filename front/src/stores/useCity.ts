import { defineStore } from 'pinia';
import type { CityInterface} from '../interfaces';
import {fetchAllCitiesService,fetchcurrentCityService} from "../services"

interface Meteo {
    cities: CityInterface[] | null,
    [props:string]: any
}

export const useCity = defineStore('city', {
    state: (): Meteo => ({
        cities: [],
        cityDetail: null
    }),
    getters: {
        /**
         * @description getter qui retourne toutes les villes
         * @param state 
         * @returns 
         */
        getCities(state){
            return state.cities
        },


         /**
         * @description getter qui retourne le detail d'une ville
         * @param state 
         * @returns 
         */
        getCityDetail(state){
            return state.cityDetail
        }
    },
    actions: {

        /**
         * @description 'action qui recupére toutes les villes et les settent dans le store'
         */
        async fetchAllcities(){
            try{
               // call service fetchAllCitiesService
               const response = await fetchAllCitiesService();
               this.cities = response

            }catch(error){
             throw error
            }
        },
    
        /**
         * @description 'action qui permet de fetcher le current city (detail d'une ville) et l'envoyer au niveau du store'
         * @param city 
         */
        async fetchCurrentCity(city:string) {
           const response = await fetchcurrentCityService(city);
           this.cityDetail = response

        }

    }
})