const request = require('request');

var geocodeAddress= (city) =>{
  return new Promise((resolve,reject)=>{

    var encodedCity= encodeURIComponent(city);
    request({
      url:`https://api.openweathermap.org/data/2.5/weather?q=${encodedCity},IN&appid=5e9cd1fe6671a35f0dbbb871f449d52f`,
      json:true
    }, (error, response, body)=>{
      if(error){
        reject('Unable to connect to google servers.');
      }
      else if(body.cod===200){
        resolve({
          city:body.name,
          lon:body.coord.lon,
          lat:body.coord.lat
        });
      }
      else{
        reject('Unable to find the city.');
      }
    });
  });
};

geocodeAddress('Hamirpur').then((location)=>{
  console.log(JSON.stringify(location,undefined,2));
},(errorMessage)=>{
  console.log(errorMessage);
})
