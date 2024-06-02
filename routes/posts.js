const express = require("express");
const router = express.Router();
const Post = require("../models/posts");
const checkauth = require("../check-auth");

// get all posts
router.get('', (req, res) => {
  //   const post = [
  //     {
  //       author: "Mashudu Luvhengo",
  //       title: "National Government",
  //       content:
  //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas nulla et ante varius dignissim. Morbi justo mauris, mattis vel eros in, imperdiet accumsan erat. Mauris et elementum odio. Nulla ullamcorper faucibus tincidunt. Pellentesque enim mi, tincidunt ut ex ut, malesuada convallis neque. Duis condimentum fringilla varius. Ut luctus pulvinar justo non venenatis.",
  //       dateCreated: "13/03/2022",
  //     },
  //     {
  //       author: "Ms Luvhengo",
  //       title: "Water and Sanitation Department",
  //       content:
  //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas nulla et ante varius dignissim. Morbi justo mauris, mattis vel eros in, imperdiet accumsan erat. Mauris et elementum odio. Nulla ullamcorper faucibus tincidunt. Pellentesque enim mi, tincidunt ut ex ut, malesuada convallis neque. Duis condimentum fringilla varius. Ut luctus pulvinar justo non venenatis.",
  //       dateCreated: "16/03/2022",
  //     },
  //     {
  //       author: "Ms Mashudu",
  //       title: "Education Department",
  //       content:
  //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas nulla et ante varius dignissim. Morbi justo mauris, mattis vel eros in, imperdiet accumsan erat. Mauris et elementum odio. Nulla ullamcorper faucibus tincidunt. Pellentesque enim mi, tincidunt ut ex ut, malesuada convallis neque. Duis condimentum fringilla varius. Ut luctus pulvinar justo non venenatis.",
  //       dateCreated: "20/03/2022",
  //     },
  //   ];
  //   res.json({
  //     message: "Post",
  //     post: post,
  //   })
  Post.find().then((posts) => {
    res.json({
      message: "Posts found",
      posts: posts,
    });
  })
  .catch((err) => {
    res.status(500).json({ message: "Error fetching posts" });
  });
});

//create a post
router.post("", checkauth, (req, res) => {
  const post = new Post({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    dateCreated: req.body.dateCreated,
  });
  post.save().then(() => {
    res.status(201).json({
      message: "Post created",
      post: post,
    });
  })
.catch((err) => {
  res.status(500).json({ message: "Error creating post" });
});;
});

router.delete('/:id', checkauth, (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Post deleted" });
  })
  .catch((err) => {
    res.status(500).json({ message: "Error deleting post" });
  });;
});

module.exports = router;
