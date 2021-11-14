const{Router} = require("express");
const router = Router();
const{addUsers,getUsers,getUser,updateUser,deleteUser} = require("../controllers/user")
const{addcountry,getcountries,getcountry,updatecountry,deletecountry} = require("../controllers/country")
const{register,login,checkAuth} = require("../controllers/auth")
const{addtrip,gettrips,gettrip,updatetrip,deletetrip} = require("../controllers/trip")
const{addtransaction,gettransaction,gettransactions,updatetransaction,deletetransaction} = require("../controllers/transactions")
const {auth,isAdmin} = require("../../middleware/verify")
const {uploadFile} = require("../../middleware/upload")

router.post("/register",register)
router.post("/login",login)
router.get("/check-auth",checkAuth)

router.post("/users",addUsers)
router.get("/users",auth,getUsers)
router.get("/users/:id",auth,isAdmin,getUser)
router.patch("/users/:id",auth,uploadFile("photo"),updateUser)
router.delete("/users/:id",auth,isAdmin,deleteUser)

router.post("/country",auth,isAdmin,addcountry)
router.get("/country",auth,getcountries)
router.get("/country/:id",auth,isAdmin,getcountry)
router.patch("/country/:id",auth,isAdmin,updatecountry)
router.delete("/country/:id",auth,isAdmin,deletecountry)

router.post("/trip",uploadFile("image"),addtrip)
router.get("/trip",gettrips)
router.get("/trip/:id",gettrip)
router.patch("/trip/:id",auth,uploadFile("image"),updatetrip)
router.delete("/trip/:id",auth,isAdmin,deletetrip)

router.post("/transaction",auth,addtransaction)
router.get("/transaction",gettransactions)
router.get("/transaction/:id",auth,gettransaction)
router.patch("/transaction/:id",auth,uploadFile("attachment"),updatetransaction)
router.delete("/transaction/:id",auth,deletetransaction)




module.exports=router;