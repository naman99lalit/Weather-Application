const yargs= require('yargs');

const geocode = require( './geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    c: {
      demand:true,
      alias:'city',
      describe:'City Name to fetch weather for',
      string:true
    }
  })
  .help()
  .alias('help','h')
  .argv

geocode.geocodeAddress(argv.city,(errorMessage, results)=>{
  if(errorMessage){
    console.log(errorMessage);
  }else {
    console.log(results.city);
    weather.getWeather(results.lat,results.lon,(errorMessage,weatherResults)=>{
      if(errorMessage){
        console.log(errorMessage);
      }else{
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`)
      }
    });
  }
});
