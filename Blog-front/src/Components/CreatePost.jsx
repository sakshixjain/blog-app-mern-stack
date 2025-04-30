import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    const postData = {
      title,
      body,
    };

    try {
      const response = await axios.post('http://localhost:9000/api/v1/posts/create/', postData);
      setResponseData(response.data);
      // Optionally, reset the form fields after a successful post
      setTitle('');

      setBody('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
          <div className="blog-box1">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Content:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      
      {responseData && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
      
      {error && (
        <div>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default CreatePost;
  