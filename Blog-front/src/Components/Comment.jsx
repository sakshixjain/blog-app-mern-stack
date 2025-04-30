import React, {useState, useEffect} from 'react'
import axios from 'axios'
function Comment() {

    const [comment ,setComment] = useState(0);

    useEffect(()=>{
        const fetchblog=async()=>{
            
            try{
              const response = await axios.post('http://localhost:9000/api/v1/comments/create');
              setComment(response.data.comments);
              console.log(response.data);   
            }catch(error){
                console.log(error);
                console.log("error aa gya");
            }
        }
        fetchblog();
    },[]);
  return (
    <div>
         <span> {comment}</span>
    </div>
  )
}

export default Comment
