const request = require('request');

var getWeather = (lat,lon,callBack) =>{
  request({
    url:`https://api.darksky.net/forecast/e368534cac826abef1e97b8fa4c0b6f9/${lat},${lon}`,
    json:true
  },(error,response,body)=>{
    if(!error&&response.statusCode===200){
    callBack(undefined,{
      temperature:body.currently.temperature,
      apparentTemperature:body.currently.apparentTemperature
    });
    }else{
    callBack('Unable to fetch weather');
    }
  });
}

module.exports.getWeather=getWeather;
