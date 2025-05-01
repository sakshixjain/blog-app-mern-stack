const express= require("express");
const cors = require("cors");

const multer = require('multer');
const path = require('path');

const app= express();

require("dotenv").config();
const PORT = process.env.PORT || 9000;

//middleware
app.use(express.json());



const blog = require("./routes/blog");
app.use(cors({
    origin: '*', // Allow only this origin
    methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allowed headers
    credentials: true, // Allow cookies (if needed)
}));
//mount
app.use("/api/v1", blog);  


// Configure multer storage
const storage = multer.diskStorage({
  destination: './uploads/', // Save images in "uploads" folder
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post('/api/v1/posts/create', upload.single('image'), (req, res) => {
  const { title, body } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  res.json({ message: 'Post created successfully', title, body, image: imagePath });
});



app.listen(PORT, ()=>{
    console.log(`App is started at port no ${PORT}`);
})
const connectWithDb = require("./config/database");
connectWithDb();



app.get("/", (req,res)=>{
    res.send(`<h1> this is home</h1>`)
})