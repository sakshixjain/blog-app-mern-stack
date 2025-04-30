const Blog= require("../models/postModel");

exports.deletePost= async(req,res)=>{
    try {
        
        //find blog id

        const {id}= req.params;

        const deleteBlog= await Blog.findByIdAndDelete(id);
        if (!deleteBlog) {
            return res.status(404).json({ 
                message: "Blog not found" 
            });
          }
      
          res.status(200).json({ 
            message: "Blog deleted successfully", 
            blogId: deleteBlog 
        });
        } catch (error) {
          console.error("Error deleting blog:", error);
          res.status(500).json({ 
            message: "Internal Server Error",
             error: error.message 
            });
        }
} 