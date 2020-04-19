
function updateNavBar (){
    let data = require('../config.json')
    console.log(data.doctor_name)
    document.getElementById('doctor-name').innerHTML = data.doctor_name
}

document.addEventListener("DOMContentLoaded", function(){
    updateNavBar()
    ipc.on('updatedConfigs',()=>{
        console.log('udated confid rec !')
        updateNavBar()
    })
})