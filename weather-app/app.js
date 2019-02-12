const yargs= require('yargs');

const geocode = require( './geocode/geocode');
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
    console.log(JSON.stringify(results,undefined,2));
  }
});
