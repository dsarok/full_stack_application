import fetch from 'node-fetch';
console.log('starting the project')
setInterval(() => {
    const date=new Date()
    if(date.getHours===10)
       { 
        fetch('http://localhost:3000/pushemail')
        .then(res=>res.json())
        .then(res=>console.log(res))
       }

}, 1000*60*60);
