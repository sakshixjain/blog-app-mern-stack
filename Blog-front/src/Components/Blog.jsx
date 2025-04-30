import React, { useState, useEffect } from "react";
import axios from "axios";


function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [like, setLike] = useState([]);
  const [comment, setComment] = useState(true);
  const [commentBodies, setCommentBodies] = useState({});
  const[deleted, setDelete]= useState([]);

  const handleLike = (post, user) => {
    axios
      .post("http://localhost:9000/api/v1/likes/like", {
        post,
        user,
      })
      .then((response) => {
        setLike(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchblog = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/v1/posts");
      setBlogs(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    fetchblog();
  }, [like, comment]);

  const handleComment = async (post, user) => {
    if (!commentBodies[post]) return;

    const postData = {
      post,
      body: commentBodies[post],
      user,
    };

    try {
      await axios.post("http://localhost:9000/api/v1/comments/create/", postData);
      setCommentBodies({ ...commentBodies, [post]: "" });
      fetchblog();
    } catch (error) {
      console.log(error);
    }
  };

 
 
   const handleDelete = (id) => {
    axios.delete(`http://localhost:9000/api/v1/delete/${id}`)
      .then(() => {
        // Update state to remove deleted item
        setDelete(prevItems => prevItems.filter(item => item._id !== id));
      })
      .catch(err => {
        console.error('Delete failed:', err);
        alert('Error deleting item');
      });
  };

  return (
    <>
      <div className="blog-div">
        {blogs.map((blog) => (
          <div className="blog-box" key={blog._id}>
            <div className="blog-content">
              <span className="delete-btn"  onClick={() => handleDelete(blog._id)}> Delete: </span>
              <div className="blog-title"> {blog.title} </div>
              {/* Show uploaded image if available */}
            {blog.imageUrl && <img src={blog.imageUrl} alt="Blog" className="blog-image" />}
            
              <div className="blog-description">Body: {blog.body}</div>
              <br />
              <button onClick={() => handleLike(blog._id, "sakshi baklol")}>
              <i className="fa-solid fa-heart"></i> {blog.likes.length}
              </button>
              &nbsp; &nbsp;
              <button><i className="fa-solid fa-comment"></i> {blog.comments.length} </button>
              <div className="max-w-3xl mx-auto p-4">
                <div className="bg-white shadow rounded-lg mt-8 p-6">
                  <h2 className="body-2xl font-bold body-gray-800 mb-4  border-b pb-2">Comments</h2>
                  <form>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Add comment....."
                        value={commentBodies[blog._id] || ""}
                        onChange={(e) =>
                          setCommentBodies({ ...commentBodies, [blog._id]: e.target.value })
                        }
                        required
                      />
                      <button type="button" onClick={() => handleComment(blog._id, "random person")}>
                      <i className="fa-solid fa-paper-plane"></i>
                      </button>
                    </div>
                  </form>
                  <div className="space-y-4">
                    {blog.comments.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-gray-100 rounded-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <p className="body-gray-700">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Blog;