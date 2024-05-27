const {Router} = require("express");
const router = Router();
const multer = require("multer")
const path = require("path")
const Blog = require("../model/blog");
const Comment = require("../model/comment");

// storage off the upload picture by the user
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/upload`));
    },
    filename: function (req, file, cb) {
      const fileName =`${Date.now()}-${file.originalname}`
      cb(null,fileName);
    },
  });
  const upload = multer({ storage: storage })

  // creation of the blog page
router.get('/AddBlog',(req, res)=> {

    return res.render("AddBlog",{
      current_page: 'add_blog',
        user:req.user,
        
    })
});

router.get('/:id', async (req, res) => {

  try {
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    const comments = await Comment.find({ blogId: req.params.id }).populate('createdBy');
    
    return res.render('blog', {
      current_page: 'blog',
      user: req.user,
      blog,
      comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});





router.post('/comment/:blogId', async (req, res)=> {
 await Comment.create({
      content : req.body.content,
      blogId : req.params.blogId,
      createdBy : req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`)
});


// route to transfer the uploaded image to the database
router.post('/',upload.single("coverImage"), async (req, res)=> {
    const {title,body} = req.body
  const blog = await Blog.create({
        body,
        title,
        createdBy : req.user._id,
        coverImageUrl : `/upload/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`)
});
module.exports=router ;