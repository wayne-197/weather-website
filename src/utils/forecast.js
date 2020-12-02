const request= require('request')
const forecast =(longitude,latitude,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=71e298c76dad771df1c5e7d7c632d627'
    request({url: url,json:true},(error,response)=>{
        if(error!=undefined){
            callback('Unable to connect to internet',undefined)
        }else if(response.body.cod === '404'){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,
                response.body.weather[0].main
            )
        }
})
}
module.exports=forecast