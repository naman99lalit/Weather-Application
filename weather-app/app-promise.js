const yargs= require('yargs');
const axios = require('axios');

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
var encodedCity= encodeURIComponent(argv.city);
var geocodeUrl=`https://api.openweathermap.org/data/2.5/weather?q=${encodedCity},IN&appid=5e9cd1fe6671a35f0dbbb871f449d52f`;

axios.get(geocodeUrl).then((response)=>{
  if(response.data.cod==='404'){
    throw new Error('Unable to find the address.');
  }
  var lat=response.data.coord.lat;
  var lon=response.data.coord.lon;
  var weatherUrl =`https://api.darksky.net/forecast/e368534cac826abef1e97b8fa4c0b6f9/${lat},${lon}`;
  console.log(response.data.name);
  return axios.get(weatherUrl);
}).then((response)=>{
  var temperature = response.data.currently.temperature;
  var apparentTemperature=response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((e)=>{
  if(e.code==='ECONNREFUSED'){
    console.log('Unable to connect to API servers!');
  }else{
    console.log(e.message);
  }
});
