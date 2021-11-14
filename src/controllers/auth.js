
const { user } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();

exports.register = async (req, res) => {
  const schema = Joi.object({
    fullname: Joi.string().min(5).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(4).required(),
    phone: Joi.string().min(6).required(),
    address: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);   

    const newUser = await user.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      address: req.body.address,
      status: "user"
    });
    res.status(200).send({
      status: "success",
      data: {
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  const schema = Joi.object({
    emailLogin: Joi.string().email().min(6).required(),
    passwordLogin: Joi.string().min(4).required(),
  });

  const { error } = schema.validate(req.body);
  console.log(error)
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.emailLogin,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    
    const isValid = await bcrypt.compare(req.body.passwordLogin, userExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "password is invalid",
      });
    }

    const token = jwt.sign({ id: userExist.id,status:userExist.status }, process.env.TOKEN_RAHASIA);
    res.status(200).send({
        status: "success",
        data: {
          fullname: userExist.fullname,
          email: userExist.email,
          status:userExist.status,
         token : token
        
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Account is invalid",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    console.log(dataUser);

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          fullname: dataUser.fullname,
          email: dataUser.email,
          phone: dataUser.phone,
          gender: dataUser.gender,
          address: dataUser.address,
          status: dataUser.status,
          photo: dataUser.photo,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};