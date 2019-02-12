const request= require('request');

var geocodeAddress = (city, callBack)=>{
  var encodedCity= encodeURIComponent(city);
  request({
    url:`https://api.openweathermap.org/data/2.5/weather?q=${encodedCity},IN&appid=5e9cd1fe6671a35f0dbbb871f449d52f`,
    json:true
  }, (error, response, body)=>{
    if(error){
      callBack('Unable to connect to google servers.');
    }
    else if(body.cod===200){
      callBack(undefined,{
        lon:body.coord.lon,
        lat:body.coord.lat
      });
    // console.log(`Coordinates:  Longitude-${body.coord.lon}  Latitude-${body.coord.lat}`);
    }
    else{
      callBack('Unable to find the city.');
    }
  });
};

module.exports={
  geocodeAddress
}
