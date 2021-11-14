const {country} = require("../../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.addcountry =async(req,res) => {
    try{
        await country.create(req.body)
        res.send({
            status: "succes",
            message :"Success to add country",
            country : req.body.name
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
exports.getcountries =async(req,res) => {
    try{
        const data =  await country.findAll()
        res.send({
            status: "succes",
            message :"Success to get countries",
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
exports.getcountry =async(req,res) => {
    const id = req.params.id;
    try{
        const data =  await country.findOne({
            where: {id}
        })
            
        res.status(200).send({
            status: "succes",
            message :"Success to get country",
            data: data,
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
exports.updatecountry =async(req,res) => {
    const id = req.params.id;
    try{
        await country.update(req.body,{
                where: {id}
        })
        const data = await country.findOne({
                where:{id}
        })
        res.send({
            status: "succes",
            message :"Success to update country",
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
exports.deletecountry =async(req,res) => {
    const id = req.params.id;
    try{
        await country.destroy({
            where: {id}
        })
            
        res.send({
            status: "succes",
            message :"Success to delete countrys",
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