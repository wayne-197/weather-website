const request =require('request')
const geocode=(adress,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress) +'.json?access_token=pk.eyJ1IjoiZ290aGFtMTk3IiwiYSI6ImNraTFyc2JtazNjb24ycGt6dTg3MTk0aDcifQ.Qqg8rg1Fln3HuHA47iopWw&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error!=undefined){
            callback('Cannot connect to internet',undefined)
        }
        else if(response.body.features.lenght===0){
            callback('Unable to find the location',undefined)
        }
        else{
            callback(undefined,{
                longitude :  response.body.features[0].geometry.coordinates[0],
                latitude :response.body.features[0].geometry.coordinates[1],
                placeName: response.body.features[0].place_name
            })
        }
    })
}
module.exports=geocode