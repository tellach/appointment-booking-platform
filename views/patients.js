const ipc = require('electron').ipcRenderer;

function loadPatients(){
    const patients = ipc.sendSync('getPatients');
    console.log(patients)
    const patientsItems = patients.reduce((html,p)=>{
        html +=`
        <div class="card d-flex flex-row mb-3">
                    <a class="d-flex pt-3 pl-2" href="#">
                        <img src="${p.gender == 'homme' ? 'img/People-Patient-Male-icon.png' : 'img/People-Patient-Female-icon.png'}" alt="Goose Breast" class="list-thumbnail responsive border-0" style="height: 50px;" />
                    </a>
                    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
                        <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                            <a href="#" class="w-40 w-sm-100">
                                <p class="list-item-heading truncate mb-0">${p.lastName+' '+p.firstName}</p>
                            </a>
                            <p class="mb-1 text-muted text-small w-15 w-sm-100">${p.gender}</p>
                            <p class="mb-1 text-muted text-small w-15 w-sm-100">${p.dateOfBirth.split(' ')[0]}</p>
                            <button type="button" class="btn btn-xs btn-outline-primary ">Voir les rendez-vous</button>
                            <button type="button" class="btn btn-xs btn-outline-secondary">Modifier</button>
                            <button type="button" class="btn btn-xs btn-outline-danger">Supprimer</button>
                        </div>
                        
                    </div>
                </div>
        `
        return html
    }, '')
    const currentDayAppointments = document.getElementById('patientsList');
    currentDayAppointments.innerHTML = patientsItems
}

document.addEventListener("DOMContentLoaded", function(){
    loadPatients()
});
    
module.exports = { loadPatients }
