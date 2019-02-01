const {MongoClient,ObjectId} = require('mongodb');

const mongoUrl = 'mongodb://localhost:27017/';

let getCat = ()=>{
    return new Promise((resolve,reject)=>{
        MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,client)=>{
            let db = client.db('testdb');
            db.collection('category').find({childCat:{$exists:true}}).toArray().then((result)=>{
                resolve(result);
            })
        });
    })
}

let getChild = (parent)=>{
    //console.log('parent',parent);
    let promises = []
    return new Promise((resolve,reject)=>{
        MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,client)=>{            
                let db = client.db('testdb');              
                parent.map((mainDoc)=>{                    
                promises.push(new Promise((resolve,reject)=>{
                    if(mainDoc.childCat!=undefined){
                        db.collection('category').find({_id:{$in:mainDoc.childCat}}).toArray().then((result)=>{
                            if(result.length>0){
                            //console.log('result',result);
                             mainDoc.child = result;
                            }
                            console.log('mainDoc',mainDoc);
                        resolve(mainDoc); 
                    });
                }
                }));
             });             
        return Promise.all(promises).then((result)=>{
            
           //console.log('finalRes',result);
           resolve(result);
        });
    });
});
            
       
    //})
}

module.exports ={
    getCat,
    getChild
}