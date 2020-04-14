const { loadTodayAppointments } = require('./dashboard')

document.addEventListener("DOMContentLoaded", function(){
    $.get("./dashboard.html", function(page){
        document.querySelector('main').innerHTML = page
        loadTodayAppointments()
    },'html')
    

    document.getElementById('dashboard-link').addEventListener('click',()=>{
        $.get("./dashboard.html", function(page){
            document.querySelector('main').innerHTML = page
            loadTodayAppointments()
        },'html')
        
    })
    
    document.getElementById('patients-link').addEventListener('click',()=>{
        $.get("./patients.html", function(page){
            document.querySelector('main').innerHTML = page
        },'html')
    })
})

