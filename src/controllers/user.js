const {user} = require("../../models")

exports.addUsers =async(req,res) => {
    try{
        await user.create(req.body)
        res.send({
            status: "succes",
            message :"Success to add user",
            email : req.body.email
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
exports.getUsers =async(req,res) => {
     const id = req.user
        try{
            const data =  await user.findAll({
                attributes:{
                    exclude:["createdAt","updatedAt","password"]
                }
            })
            const arrayUsers = []
            for(let i = 0 ; i < data.length ; i++){
                let obj ={
                    id : data[i].id,
                    fullname : data[i].fullname,
                    email:data[i].email,
                    phone:data[i].phone,
                    address:data[i].address,
                    status:data[i].status,
                    photo:data[i].photo
                }
                arrayUsers.push(obj)
            }
            res.send({
                status: "succes",
                message :"Success to get users",
                data: arrayUsers
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
exports.getUser =async(req,res) => {
    const id = req.params.id;
    console.log(id)
    try{
         const data =  await user.findOne(
            {
            attributes:{
                exclude:["createdAt","updatedAt","password"]
                }
            ,
            
                where: {id}
            })
            const arrayUser = []
                let obj ={
                    id : data.id,
                    fullname : data.fullname,
                    email:data.email,
                    phone:data.phone,
                    address:data.address,
                    status:data.status,
                    photo:data.photo
                }
                arrayUser.push(obj)
            
        res.send({
            status: "succes",
            message :"Success to get users",
            data: arrayUser
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
exports.updateUser =async(req,res) => {
    const id = req.params.id;
    try{ 
        console.log(req.files.photo)
        if(req.files.photo === undefined){
            await user.update({
                fullname : req.body.fullname,
                email:req.body.email,
                password:req.body.password,
                phone:req.body.phone,
                address:req.body.address,     
            },{
                    where: {id}
            })
        }
        else if(req.files.photo.length==1){
        await user.update({
            fullname : req.body.fullname,
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phone,
            address:req.body.address,
            photo:"http://localhost:2005/uploads/"+req.files.photo[0].filename
        },{
                where: {id}
        })
        }
        
        const data = await user.findOne({
                where:{id}
        })
        res.send({
            status: "succes",
            message :"Success to update user",
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
exports.deleteUser =async(req,res) => {
    const id = req.params.id;
    
    try{
        await user.destroy({
            where: {id}
        })
        
        res.send({
            status: "succes",
            message :"Success to delete users",
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