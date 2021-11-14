const {trip,country} = require("../../models")
const {auth,authCountry} = require("../../middleware/verify")

exports.addtrip =async(req,res) => {
    try{
        // console.log(req.files)
        // const array = []
        // for(let i = 0 ; i <=3 ;i++){
        //     array.push(req.files.image[i].filename)
        // }
        // console.log(array)
        // const collectionPhoto = JSON.stringify(array)
        
        // await trip.create({
        //     title : req.body.title,
        //     idCountry : req.body.idCountry,
        //     accomodation : req.body.accomodation,
        //     transportation : req.body.transportation,
        //     eat : req.body.eat,
        //     day:req.body.day,
        //     night:req.body.night,
        //     dateTrip:req.body.dateTrip,
        //     price:req.body.price,
        //     quota:req.body.quota,
        //     description:req.body.description,
        //     image: collectionPhoto
        // })

        const {...data} = req.body;
        console.log(req.body)

        const allImage = req.files.image.map((el)=>el.filename)

        const imageToString = JSON.stringify(allImage)
        await trip.create({
            ...data,
            image:imageToString,
        })

        res.send({
            status: "succes",
            message :"Success to add trip",
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
exports.gettrips =async(req,res) => {
    try{
       const data =  await trip.findAll({
           include:{
               model : country,
               as : "country",
               attributes : {
                   exclude:["createdAt","updatedAt"]
               }
           },
           attributes:{
               exclude:["createdAt","updatedAt","idCountry"]
           }
       })
       const tripCollection = [];
       for(let i = 0 ; i < data.length ; i++){
           let change = JSON.parse(data[i].image)
           console.log(change)
           const imageCollection=[]
           for(let i = 0 ; i < change.length ; i++){
            imageCollection.push("http://localhost:2005/uploads/"+change[i])
           }
           let obj = {
            id:data[i].id,   
            title : data[i].title,
            accomodation : data[i].accomodation,
            transportation : data[i].transportation,
            eat : data[i].eat,
            day:data[i].day,
            night:data[i].night,
            dateTrip:data[i].dateTrip,
            price:data[i].price,
            quota:data[i].quota,
            description:data[i].description,
            filledQuota:data[i].filledQuota,
            image:imageCollection,
            country:{id:data[i].country.id, name:data[i].country.name}
             }
       tripCollection.push(obj)
           
       }

        res.send({
            status: "succes",
            message :"Success to get trips",
            data : tripCollection
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
exports.gettrip =async(req,res) => {
    const id = req.params.id;
    try{
       const data =  await trip.findOne({
               where: {id},
               include:{
                model : country,
                as : "country",
                attributes : {
                    exclude:["createdAt","updatedAt"]
                }
               },
               attributes:{
                    exclude:["createdAt","updatedAt","idCountry"]
                }
        })
       console.log(data.image)
        let change = JSON.parse(data.image)
        console.log(change)
        const tripCollection = []
        const imageCollection=[]
        for(let i = 0 ; i < change.length ; i++){
         imageCollection.push("http://localhost:2005/uploads/"+change[i])
        }
        let obj = {
         id:data.id,   
         title : data.title,
         accomodation : data.accomodation,
         transportation : data.transportation,
         eat : data.eat,
         day:data.day,
         night:data.night,
         dateTrip:data.dateTrip,
         price:data.price,
         quota:data.quota,
         description:data.description,
         filledQuota:data.filledQuota,
         image:imageCollection,
         country:{id:data.country.id, name:data.country.name}
          }
    tripCollection.push(obj)
        res.send({
            status: "succes",
            message :"Success to get trip",
            data: tripCollection
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
exports.updatetrip =async(req,res) => {
    const id = req.params.id;
    console.log(id)
    try{
        if(req.files.image === undefined){
            await trip.update({
                title : req.body.title,
                idCountry : req.body.idCountry,
                accomodation : req.body.accomodation,
                transportation : req.body.transportation,
                eat : req.body.eat,
                day:req.body.day,
                night:req.body.night,
                dateTrip:req.body.dateTrip,
                price:req.body.price,
                quota:req.body.quota,
                description:req.body.description,
                filledQuota:req.body.filledQuota,
        },{where: {id}})
       }
       
        else {
            console.log(req.files.image)
            const allImage = req.files.image.map((el)=>el.filename)
            const imageToString = JSON.stringify(allImage)
            
        await trip.update({
            title : req.body.title,
            idCountry : req.body.idCountry,
            accomodation : req.body.accomodation,
            transportation : req.body.transportation,
            eat : req.body.eat,
            day:req.body.day,
            night:req.body.night,
            dateTrip:req.body.dateTrip,
            price:req.body.price,
            quota:req.body.quota,
            description:req.body.description,
            filledQuota:req.body.filledQuota,
            image:imageToString
        },{where: {id}})
    }
    const data = await trip.findOne({
        where:{id}
    })
        res.send({
            status: "succes",
            message :"Success to update trip",
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
exports.deletetrip =async(req,res) => {
    const id = req.params.id;
    try{
       await trip.destroy({
               where: {id}
        })
       
        res.send({
            status: "succes",
            message :"Success to delete trips",
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