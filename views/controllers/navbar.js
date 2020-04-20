
function updateNavBar (){
    let data = require('../config.json')
    document.getElementById('doctor-name').innerHTML = data.doctor_name
}

document.addEventListener("DOMContentLoaded", function(){
    updateNavBar()
    ipc.on('updatedConfigs',()=>{
        updateNavBar()
    })
})