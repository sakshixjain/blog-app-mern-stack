import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Blog from './Components/Blog'
import CreatePost from './Components/CreatePost'
function App() {

  

  return (
    <>
     <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/about" element={<CreatePost />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    
    </Router>
   
    </>
  )
}

export default App
