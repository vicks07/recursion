const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const {spawn} = require('child_process');

const model = require('./models.js');

const server = app.listen(port,()=>{
    console.log('Server is listening');
});

app.get('/',(req,res,next)=>{
    for(let i =0;i < 2e6;i++){
        res.send('Server Says Hi');
    }
});

app.get('/test',(req,res)=>{
    model.getCat().then((result)=>{
       return model.getChild(result);        
    }).then((result)=>{
        //console.log(result);
        res.send(result);
        res.end();
    });
});










// const express = require('express');
// let app = express();
// const bodyParser = require('body-parser');
// const request = require('request');
// const FormData = require('form-data');
// const multiparty = require('multiparty');
// const path = require('path');
// const crypto = require('crypto');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');



// app.set('view engine','ejs');
// app.use(methodOverride('_method')); //To make a delete request  
// app.use(bodyParser.json());

// const mongoURI = 'mongodb://localhost:27017/mongoUploads';

// const conn = mongoose.createConnection(mongoURI,{useNewUrlParser:true});

// // let gfs;
// // conn.once('open',()=>{
// //     //Init stream
// //     gfs = Grid(conn.db,mongoose.mongo);
// //     gfs.collection('uploads');
// // });




// //Storage Object

// const storage = new GridFsStorage({
//     url: mongoURI,
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = buf.toString('hex') + path.extname(file.originalname);
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads'
//           };
//           resolve(fileInfo);
//         });
//       });
//     }
//   });
//   const upload = multer({ storage });


// //Get
// //Loads Form
// app.get('/',(req,res)=>{
//     res.render('index');
// });

// app.post('/upload',upload.single('file'),(req,res)=>{
//     //res.json({file:req.file});
//     res.redirect('/');
// })

// app.get('/files',(req,res)=>{
//     gfs.files.find().toArray((err,files)=>{
//         //check if files exist
//         if(!files || files.length ===0){
//             return res.status(404).json({
//                 err:'No Files exist'
//             });
//         }

//         return res.json(files);
//     });
// });

// app.get('/files/:filename',(req,res)=>{
//     gfs.files.findOne({filename:req.params.filename},(err,file)=>{
//         if(!file || file.length ===0){
//             return res.status(404).json({
//                 err:'No File exists'
//             });
//         }

//         return res.json(file);
//     });
// });

// const conn1 = mongoose.createConnection('mongodb://localhost:27017/mongoUploads');
// const gridFSBucket = new mongoose.mongo.GridFSBucket(conn1.db);


// app.get('/image/:filename',(req,res)=>{
//     gfs.files.findOne({filename:req.params.filename},(err,file)=>{
//         if(!file || file.length ===0){
//             return res.status(404).json({
//                 err:'No File exists'
//             });
//         }
//         //Check if image
//         if(file.contentType == 'image/jpeg' || file.contentType =='image/png'){
//             const readStream = gridFSBucket.createReadStream(file.filename);
//             readStream.pipe(res);
//         }else{
//             res.status(404).json({
//                 err:'Not an Image'
//             })
//         }
//         //return res.json(file);
//     });
// });


// app.get('/image',(req,res)=>{
//     gfs.files.find().sort({uploadDate:-1}).toArray((err,files)=>{
//         if(!files || files.length ===0){
//             return res.status(404).json({
//                 err:'No File exists'
//             });
//         }
//         else{
//             files.map(file=>{
//                 if(file.contentType == 'image/jpeg' || file.contentType =='image/png'){
//                     file.isImage = true;
//                     //const readStream = gfs.createReadStream(file);
//                     //console.log(readStream);
//                     //readStream.pipe(res);
//                 }else{
//                    file.isImage = false;
//                 }
//             });
//             res.render('index',{files:files});
//         }
//         //Check if image
//         //console.log('Here');
        
//         //return res.json(file);
//     });
// });


// const port = 5000;
// const server = app.listen(port,()=>{
//     console.log(`Started App on Port: ${port}`);
// });


// // app.post("/submit", function(httpRequest, httpResponse, next){

// //     var form = new multiparty.Form();

// //     form.on("part", function(part){
// //         if(part.filename)
// //         {
// //             //console.log(part);
// //             //var FormData = require("form-data");
// //             //var request = require("request");
// //             var form = new FormData();

// //             form.append("thumbnail", part, {filename: part.filename,contentType: part["content-type"]});

// //             var r = request.post("http://localhost:21/TestFTP", { "headers": {"transfer-encoding": "chunked"} }, function(err, res, body){ 
// //                 console.log(res);
// //                 httpResponse.send(res);
// //             });
            
// //             r._form = form
// //         }
// //     })

// //     form.on("error", function(error){
// //         console.log(error);
// //     })

// //     form.parse(httpRequest);    
    
// // });