const path=require('path')
const express= require('express')
const app=express()
const hbs=require('hbs')
const forecast=require('./utils/forecast.js')
const geocode=require('./utils/geocode.js')

//Define path
const pathDir=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//set handlebars
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(pathDir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Gotham'
    })
})



app.get('/help',(req,res)=>{
   res.render('help',{
       message:'This is a help message from server',
       title:'Help page',
       name:'gotham'
   })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About dynamic',
        name:'Gotham'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.adress){
        return res.send({
            error : 'No adress was provided'
        })
    }
    geocode(req.query.adress,(error,{longitude,latitude,placeName}={}) =>{
        if(error){
            return res.send({
                error: error
            })
        }
     forecast(longitude,latitude,(error,forecastData)=>{
         if(error){
             return res.send({
                 error: error
             })
         }
         res.send({
             Longitude : longitude,
             Latitude : latitude,
             Place: placeName,
             Weather: forecastData
         })
       
    })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message:'404',
        name:'gotham'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        message:'404 ',
        name:'gotham'
    })
})
app.listen(3000,()=>{
    console.log('Server started on port 3000')
})