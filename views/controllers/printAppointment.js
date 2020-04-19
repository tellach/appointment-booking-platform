var delayInMilliseconds = 1000; //1 second

document.addEventListener("DOMContentLoaded", function(){
    setTimeout(function() {
        ipc.send('print-to-pdf',event)
      }, delayInMilliseconds);
});


  
