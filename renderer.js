const ipc = require('electron').ipcRenderer;

const syncBtn = document.getElementById('syncBtn');

syncBtn.addEventListener('click', function(){
    console.log('sync msg 1')
    const reply = ipc.sendSync('sync-message');
    console.log(reply);
    console.log('sync msg 2')
    
})