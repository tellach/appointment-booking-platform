const ipc = require('electron').ipcRenderer;

function getPatientAppointments(id){
    const appoitments = ipc.sendSync('getPatientAppointments');
    
    profileHtml = ``

    if (appoitments[0]){
        app = appoitments[0]
        app['patient.lastName']+' '+app['patient.firstName']
        
        profileHtml = `
        <div class="card mb-4">
            <div class="card-body">
                <div class="text-center">
                    <img alt="Profile" src="img/People-Patient-Male-icon.png" class="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail">
                    <p class="list-item-heading mb-1">${app['patient.lastName']+' '+app['patient.firstName']}</p>
                    <p class="mb-4 text-muted text-small">Né le ${app['patient.dateOfBirth']}</p>
                </div>
            </div>
        </div>
    ` 
    }
    
    let appoitmentsItems = appoitments.reduce((html,app)=>{
        html +=`
            <div class="card d-flex flex-row mb-3">
                <div class="d-flex flex-grow-1 min-width-zero">
                    <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                        <a class="list-item-heading mb-1 truncate w-20 w-xs-100" href="#">
                            ${app.title}
                        </a>
                        <p class="mb-1 text-muted text-small w-30 w-xs-100">${app.date.split(' ')[0] + ' ' +app.date.split(' ')[1].split('.')[0]}</p>
                        <button type="button" class="btn btn-xs btn-outline-secondary" >Modifier</button>
                        <button type="button" class="btn btn-xs btn-outline-danger" >Supprimer</button>
                    </div>
                </div>
            </div>
        `
        // html +=`
        // <div class="d-flex flex-row mb-3">
        //                             <a class="d-block position-relative" href="#">
        //                                 <img src="${app['patient.gender'] == 'Homme' ? 'img/People-Patient-Male-icon.png' : 'img/People-Patient-Female-icon.png'}" alt="Marble Cake"
        //                                 class="list-thumbnail border-0"/>
        //                             </a>
        //                             <div class="pl-3 pt-2 pr-2 pb-2">
        //                                 <a href="#">
        //                                     <p class="list-item-heading">${app['patient.lastName']+' '+app['patient.firstName']}</p>
        //                                     <div class="pr-4 d-none d-sm-block">
        //                                         <p class="text-muted mb-1 text-small">${app.title}</p>
        //                                     </div>
        //                                     <div class="text-primary text-small font-weight-medium d-none d-sm-block">
        //                                         ${app.date.split(' ')[0] + ' ' +app.date.split(' ')[1].split('.')[0]}
        //                                     </div>
        //                                 </a>
        //                             </div>
        // </div>
        // `
        return html
    }, '')
    const patientAppointments = document.getElementById('patientAppointments')
    const profile = document.getElementById('profile')

    patientAppointments.innerHTML = appoitmentsItems == '' ? 'Le patient n\' aucun rendez-vous' : appoitmentsItems
    profile.innerHTML = profileHtml
}


document.addEventListener("DOMContentLoaded", function(){
    getPatientAppointments()
});


    
module.exports = { getPatientAppointments }