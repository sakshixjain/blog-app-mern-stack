import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Like() {

    const [like ,setLike] = useState(0);


    const LikePost= async()=>{
        try{

const response = await axios.post("http://localhost:9000/api/v1/likes/like");
         
setLike(response.data);
        }catch(error){
            console.log(error);
            console.log("error occurs when like post");
        }
    }

    
  return (
    <div>
      
         
    
    </div>
  )
}

export default Like


