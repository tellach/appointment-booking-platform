
const printPdfButton = document.getElementById('print-pdf')

printPdfButton.addEventListener('click',function(event) {
    
     ipc.send('print-to-pdf',event)
    

})
ipc.on('wrote-pdf',function(event,path){
    console.log(path)
})