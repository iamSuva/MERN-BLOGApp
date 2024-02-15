const {Router}=require("express");
const router=Router();
const {
    registerUser,
    loginUser
    ,getUser,
    changeAvatar,
    editUser,
    getAuthors
}=require("../controllers/userController");
const authMiddleware=require("../middleware/authMiddleware");
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/:id",getUser);
router.get("/",getAuthors);
router.post("/changeAvatar",authMiddleware,changeAvatar);
router.patch("/editUser",authMiddleware,editUser);


module.exports=router;