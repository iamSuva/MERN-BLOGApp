const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const HttpError = require("../models/errorModels");

//api/posts
const createPost = async (req, res, next) => {
  try {
    const { title, category, description } = req.body;
    if (!title || !category || !description || !req.files) {
      return next(
        new HttpError("Fill in all fields and choose thumbnail", 422)
      );
    }
    const { thumbnail } = req.files;
    if (thumbnail.size > 2000000) {
      // >2mb
      return next(new HttpError("File size too big", 422));
    }
    let fileName = thumbnail.name;
    let splitedFileName = fileName.split(".");
    let newFileName =
      splitedFileName[0] +
      uuid() +
      "." +
      splitedFileName[splitedFileName.length - 1];
    thumbnail.mv(
      path.join(__dirname, "..", "/uploads", newFileName),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        } else {
          const newPost = await postModel.create({
            title,
            category,
            description,
            thumbnail: newFileName,
            creator: req.user.id,
          });
          if (!newPost) {
            return next(new HttpError("Post Could not be created", 422));
          }
          //inc count of post by user
          const currUser = await userModel.findById(req.user.id);
          const userPostCount = currUser.posts + 1;
          await userModel.findByIdAndUpdate(req.user.id, {
            posts: userPostCount,
          });
          res.status(200).json(newPost);
        }
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};
//get api/posts/
const getPosts = async (req, res, next) => {
  try {
    const posts = await postModel.find().sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//api/post/:id
const getPostById = async (req, res, next) => {
  try {
    const pid = req.params.id;
    const post = await postModel.findById(pid);
    if (!post) {
      return next(new HttpError("post not found", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
};
//get catagori post
//api/posts/categories/:category
const getCatPost = async (req, res, next) => {
  try {
    const { category } = req.params;
    const catposts = await postModel.find({ category });
    if (!catposts) {
      return next(new HttpError("post not found", 404));
    }
    res.status(200).json(catposts);
  } catch (error) {
    return next(new HttpError(error));
  }
};
//get user posts
//api/posts/users/:id
const getUserAllPosts = async (req, res, next) => {
  try {
    const uid = req.params.id;
    const userposts = await postModel
      .find({ creator: uid })
      .sort({ createdAt: -1 });
    if (!userposts) {
      return next(new HttpError("post not found", 404));
    }
    res.status(200).json(userposts);
  } catch (error) {
    return next(new HttpError(error));
  }
};
// path:api/posts/:id
const editPost = async (req, res, next) => {
  try {
    let fileName, newFileName, updatedPost;
    const postId = req.params.id;

    const { title, category, description } = req.body;
    if (!title || !category || description.length < 12) {
      return next(new HttpError("Some fields are empty", 422));
    }
    const oldPost = await postModel.findById(postId);
    if (req.user.id == oldPost.creator) {
      if (!req.files) {
        updatedPost = await postModel.findByIdAndUpdate(
          postId,
          { title, category, description },
          { new: true }
        );
      } else {
       
        fs.unlink(
          path.join(__dirname, "..", "uploads", oldPost.thumbnail),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );
        const { thumbnail } = req.files;
        if (thumbnail.size > 2000000) {
          return next(new HttpError("thumbnail is too big"));
        }
        fileName = thumbnail.name;
        let splitedFileName = fileName.split(".");
        newFileName =
          splitedFileName[0] +
          uuid() +
          "." +
          splitedFileName[splitedFileName.length - 1];
        thumbnail.mv(
          path.join(__dirname, "..", "uploads", newFileName),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );
        updatedPost = await postModel.findByIdAndUpdate(
          postId,
          { title, category, description, thumbnail: newFileName },
          { new: true }
        );
      }
      if (!updatedPost) {
        return next(new HttpError("could not update", 422));
      }
      return res.status(200).json(updatedPost);
    }else{
      return next(new HttpError("can not update.",422))
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};
// delete:api/posts/:id
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    const fileName = post?.thumbnail;
    if (req.user.id == post.creator) {
      fs.unlink(
        path.join(__dirname, "..", "uploads", fileName),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          } else {
            await postModel.findByIdAndDelete(postId);

            const currUser = await userModel.findById(req.user.id);
            const postcount = currUser?.posts - 1;
            await userModel.findByIdAndUpdate(req.user.id, {
              posts: postcount,
            });
          }
        }
      );
      res.json(`Post ${postId} delete successfully`);
    }else{
      return next(new HttpError("Post couldnt be deleted ",422));
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};
module.exports = {
  createPost,
  getPosts,
  getCatPost,
  getUserAllPosts,
  deletePost,
  editPost,
  getPostById,
};
