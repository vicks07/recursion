const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const {spawn} = require('child_process');
////With Cluster
const os = require('os');
const cluster = require('cluster');
const pid = process.pid;

if(cluster.isMaster){
    const n_cpus = os.cpus().length;
    console.log(`Forking ${n_cpus} CPU's`);
    for(let i=0;i<n_cpus;i++){
        cluster.fork();
    }
}
else{
const server = app.listen(port,()=>{
    console.log('Server is listening');
});

app.get('/',(req,res,next)=>{
    for(let i =0;i < 2e6;i++){
    }
    res.send(`Process ${pid} Says Hi`);

});
}