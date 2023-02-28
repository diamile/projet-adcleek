
const db = require('../database/database.js')
const axios = require('axios');
//const {VALUES} = require('../database/queries')

const TOKEN = process.env.TOKEN
let  BASE_URL = "https://api.meteo-concept.com/api/forecast/daily?token="+TOKEN;
let  query = '&insee=';

BASE_URL +=query


/**
 * @description Prévisions journalières sur les 14 prochains jours pour une commune
 * @param {*} city 
 * @returns Promise (retourne la liste des prévisions journaliéres pour une commune)
 */
 async function fetchWeathetDataDayFromApi(city){
    try{
        const response = await axios.get(BASE_URL+city);
        return  response;
    } catch(err){
       throw err;
    }
 
}



/**
 * @description Récuperationn des prévisions liées à une commune via la base de donnée
 * @param {*} insee 
 * @returns  Promise
 */
 async function fetchForecast(insee){
    try{
        return await db.all(`select * from forecast where insee="${insee}"`);
    }
    catch(err){
       throw err;
    }
   
}



/**
 * @description insertion des previsions lié à une ville au niveau de la base de données
 * @param {*} data 
 */
async function insertForecatTodataBase(data){
    try{
        db.run(`insert into forecast('date', 'insee','details') values('${data.datetime}','${data.insee}','${JSON.stringify(data)}')`)
    }catch(err){
        throw err;
    }
}


/**
 * 
 * @returns Promise (liste de toutes les villes)
 */

 async function fetchAllcities() {
    try{
        return await db.all(`SELECT * FROM  city`)
    } catch(err){
      throw err;
    }
   
  }


  async function seedCityTodataBase(){
    try{
      const response = await db.seed("INSERT INTO city (insee, name, zipcode, population) VALUES ? ", VALUES);
      return response;
    }catch(err){
      throw err;
    }
  }
  
exports.fetchAllcities = fetchAllcities;
exports.fetchForecast = fetchForecast;
exports.insertForecatTodataBase = insertForecatTodataBase;
exports.fetchWeathetDataDayFromApi = fetchWeathetDataDayFromApi;
exports.seedCityTodataBase=seedCityTodataBase;
 
