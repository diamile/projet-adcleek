
const {fetchAllcities,fetchForecast,insertForecatTodataBase,fetchWeathetDataDayFromApi,seedCityTodataBase} = require('../services')
const db = require('../database/database');

const weatherUtils = require('../database/weatherUtils')

exports.fetchAllcity = async (req,res,next) =>{

    try{
        const response = await fetchAllcities();
        return res.json(response)
    } catch(err){
       next(err);
    }
   
}


/**
 * @description recuperation de la detail d'une ville
 * @param {*} req 
 * @param {*} res
 * @return Promise 
 */
exports.fetchCityDetail = async (req,res,next) => {
    try{
        console.log('id_ville',req.params.id_ville);

        if(!req.params.id_ville) {
			return res.status(400).json({message:'BAD REQUEST'});
		}

        db
        .all(`select * from city where id=${req.params.id_ville}`)
        .then(rows => rows[0] )
        .then(async rs => {
            console.log('ici',rs)
          let forcast = await fetchForecast(rs.insee)
      
          if(!forcast || forcast.length<1){
            console.log("not exist")
            let previsions = await fetchWeathetDataDayFromApi(rs.insee);
            console.log('previsions',previsions)

      
            previsions.data.forecast.forEach(async prevision=> insertForecatTodataBase(prevision))
      
          }
      
          rs =  await fetchForecast(rs.insee);

          let response = rs.map((prevision)=>{
           
            prevision.icon = `bi bi-${weatherUtils.getIconByCode(JSON.parse(prevision.details).weather)}`;

            return prevision
 
          })
      
          return response
       
        })
        .then(data => res.status(200).send(data))

    
    } catch(err){ 
        next(err);
    }
   
}

/**
 * @description insertion des villes dans la base de donnés
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.insertCityToDataBase = async (req,res,next) => {
   try{
     const response = await seedCityTodataBase();
     res.status(200).json(response)
    }catch(err){
      next(err);
   }
}