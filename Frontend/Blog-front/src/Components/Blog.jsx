// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Blog() {
//   const [blogs, setBlogs] = useState([]);
//   const [like, setLike] = useState([]);
//   const [comment, setComment] = useState(true);
//   const [body, setbody] = useState([]);

//   // const [unlike ,setUnLike] = useState([]);

//   const handleLike = (post, user) => {
//     axios
//       .post("http://localhost:9000/api/v1/likes/like", {
//         post,
//         user,
//       })
//       .then((response) => {
//         setLike(response.data);
//         // console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     console.log("like");
//   };


//   const fetchblog = async () => {
//     try {
//       const response = await axios.get("http://localhost:9000/api/v1/posts");
//       setBlogs(response.data.posts);
//       //  console.log(response.data.posts._id);
//       // console.log(response.data);
//     } catch (error) {
//       console.log(error);
//       console.log("error aa gya");
//     }
//   };
//   useEffect(() => {

    
//     fetchblog();
//   }, [like, comment]);
//   // console.log(blogs.likes);
//   // console.log (typeof(blogs.likes));

//   const handleComment = async (post,user) => {
//     console.log(post,user);
//     // e.preventDefault();
// // console.log(body
//     const postData = {
//       post,
//       body,
//       user
//     };

//     try {
//       axios.post(`http://localhost:9000/api/v1/comments/create/`, postData);

//       setbody("");
//       fetchblog();
//     } catch (error) {
//       console.log(error);
//     }

//     // console.log("comment");
//   };

//   return (
//     <>
//       <div className="">
//         {blogs.map((blog) => (
//           <div className="blog-box " key={blog._id}>
//             <div className="blog-content">
//               <div className="blog-title">title: {blog.title}</div>
//               <div className="blog-description">body: {blog.body}</div>
//               <br />
//               <button onClick={() => handleLike(blog._id, "sakshi baklol")}>
//                 👍 {blog.likes.length}
//               </button>
//               &nbsp; &nbsp;
//               <button>&#128172; {blog.comments.length} </button>
//               <div className="max-w-3xl mx-auto p-4">
//                 <div className="bg-white shadow rounded-lg p-6">
//                   <h2 className="body-2xl font-bold body-gray-800 mb-4 border-b pb-2">
//                     Comments
//                   </h2>
//                   <form>
//                     <div className="flex">
//                       <input
//                         type="body"
//                         name=""
//                         placeholder="Add comment....."
//                         id="comment"
//                         onChange={(e) => setbody(e.target.value)}
//                         value={body}

//                         required
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleComment(blog._id, "random person")}
//                       >
//                         Add
//                       </button>
//                     </div>
//                   </form>
//                   <div className="space-y-4">
//                     {blog.comments.map((item) => (
//                       <div
//                         key={item.id}
//                         className="p-4 bg-gray-100 rounded-md hover:shadow-lg transition-shadow duration-300"
//                       >
//                         <p className="body-gray-700">{item.body}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Blog;

import React, { useState, useEffect } from "react";
import axios from "axios";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [like, setLike] = useState([]);
  const [comment, setComment] = useState(true);
  const [commentBodies, setCommentBodies] = useState({});

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

  return (
    <>
      <div>
        {blogs.map((blog) => (
          <div className="blog-box" key={blog._id}>
            <div className="blog-content">
              <div className="blog-title">Title: {blog.title}</div>
              <div className="blog-description">Body: {blog.body}</div>
              <br />
              <button onClick={() => handleLike(blog._id, "sakshi baklol")}>
                👍 {blog.likes.length}
              </button>
              &nbsp; &nbsp;
              <button>&#128172; {blog.comments.length} </button>
              <div className="max-w-3xl mx-auto p-4">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="body-2xl font-bold body-gray-800 mb-4 border-b pb-2">Comments</h2>
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
                        Add
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