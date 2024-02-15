const {Router}=require("express");
const router=Router();
const { createPost, getPosts, getPostById, getCatPost, getUserAllPosts, editPost, deletePost }=require("../controllers/postController");

const authMiddleware=require("../middleware/authMiddleware");

router.post("/",authMiddleware,createPost);
router.get("/",getPosts);
router.get("/:id",getPostById);
router.get("/categories/:category",getCatPost);
router.get("/users/:id",getUserAllPosts);
router.patch("/:id",authMiddleware,editPost);
router.delete("/:id",authMiddleware,deletePost);
module.exports=router;