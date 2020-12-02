
console.log('running')
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const loc=search.value
const messageOne=document.querySelector('#message-1')
const meesageTwo=document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent='Loading...'
    fetch('http://localhost:3000/weather?adress='+loc).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
            }else{
                messageOne.textContent=data.Place
                meesageTwo.textContent=data.Weather
            }
         
        })

    })
    // const loaction=search.value
    
})



