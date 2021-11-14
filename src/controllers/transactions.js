const {transactions,trip,user} = require("../../models")
const {auth,authCountry} = require("../../middleware/verify")

exports.addtransaction =async(req,res) => {
    try{
        console.log(req.files)
        const data =  await transactions.create({
            counterQty : req.body.counterQty,
            total: req.body.total,
            status: req.body.status,
            attachment:req.body.attachment,
            idTrip:req.body.idTrip,
            idUser:req.user.id
        })
        res.send({
            status: "succes",
            message :"Success to add transaction",
            data:data
        })
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}
exports.gettransactions =async(req,res) => {
    try{
       const data =  await transactions.findAll({
           include:[
        {
                model : trip,
                as : "trip",
                attributes : {
                    exclude:["createdAt","updatedAt"]
            },      
        },
        {
               model:user,
               as:"user",
               attributes:{
                   exclude:["createdAt","updatedAt"]
               }
        }],
           attributes:{
               exclude:["createdAt","updatedAt","idTrip","idUser"]
           }
       })
       const arrayObject=[]
       for(let i = 0 ; i < data.length ; i++){
       let obj = {
            id:data[i].id,
            counterQty : data[i].counterQty,
            total: data[i].total,
            status: data[i].status,
            attachment:"http://localhost:2005/uploads/"+data[i].attachment,
            trip: {
            id: data[i].trip.id,
            title: data[i].trip.title,
            idCountry: data[i].trip.idCountry,
            accomodation: data[i].trip.accomodation,
            transportation: data[i].trip.transportation,
            eat: data[i].trip.eat,
            day: data[i].trip.day,
            night: data[i].trip.night,
            dateTrip: data[i].trip.dateTrip,
            price: data[i].trip.price,
            quota: data[i].trip.quota,
            description: data[i].trip.description
            },
            user: {
            id: data[i].user.id,
            fullname: data[i].user.fullname,
            email: data[i].user.email,
            phone: data[i].user.phone,
            address: data[i].user.address,
            status: data[i].user.status,
            photo: data[i].user.photo
            }
         }
         arrayObject.push(obj)
        }
        
        res.send({
            status: "succes",
            message :"Success to get transactions",
            data: arrayObject
        })
    }
    
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}
exports.gettransaction =async(req,res) => {
    const id = req.params.id;
    try{
       const data =  await transactions.findOne({
               where: {id},
               include:[
                {
                        model : trip,
                        as : "trip",
                        attributes : {
                            exclude:["createdAt","updatedAt"]
                    },      
                },
                {
                       model:user,
                       as:"user",
                       attributes:{
                           exclude:["createdAt","updatedAt"]
                       }
                }],
                   attributes:{
                       exclude:["createdAt","updatedAt","idTrip","idUser"]
                   }
        })
        const transactionCollection = []
        let obj = {
         id:data.id,
         counterQty : data.counterQty,
         total: data.total,
         status: data.status,
         attachment:"http://localhost:2005/uploads/"+data.attachment,
         trip: {
            id: data.trip.id,
            title: data.trip.title,
            idCountry: data.trip.idCountry,
            accomodation: data.trip.accomodation,
            transportation: data.trip.transportation,
            eat: data.trip.eat,
            day: data.trip.day,
            night: data.trip.night,
            dateTrip: data.trip.dateTrip,
            price: data.trip.price,
            quota: data.trip.quota,
            description: data.trip.description
         },
         user: {
            id: data.user.id,
            fullname: data.user.fullname,
            email: data.user.email,
            phone: data.user.phone,
            address: data.user.address,
            status: data.user.status,
            photo: data.user.photo
          }
          }
          transactionCollection.push(obj)
        res.send({
            status: "succes",
            message :"Success to get transaction",
            data: transactionCollection,
        })
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}
exports.updatetransaction =async(req,res) => {
    const id = req.params.id;
    try{
        console.log(req.files.attachment)
        if(req.files.attachment === undefined){
            console.log(1)
            await transactions.update({
                status: req.body.status,
                counterQty : req.body.counterQty   
            },{
                    where: {id}
            })
        }
       else if(req.files.attachment.length==1){ 
        await transactions.update({
            status: req.body.status,
            attachment : req.files.attachment[0].filename,
            counterQty : req.body.counterQty        
            },{
                   where: {id},
            })
        }
    
        const data = await transactions.findOne({
            where:{id}
        })
        res.send({
            status: "succes",
            message :"Success to update transaction",
            data: data
        })
        
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}
exports.deletetransaction =async(req,res) => {
    const id = req.params.id;
    try{
       await transactions.destroy({
               where: {id}
        })
       
        res.send({
            status: "succes",
            message :"Success to delete transactions",
        })
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error",
            id:id
        })
    }
}