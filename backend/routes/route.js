const express = require('express');
const route = express.Router(); // Change this line to use express.Router()
const Cycle = require('../db/model/cycles');
const contact = require('../db/model/contact');
const user = require('../db/users/users')
// const auth = require('../middlewares/auth')
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const storage = new Storage({
  keyFilename: 'vertexai-key.json', // Update this with the path to your service account key file
});

const bucketName = 'vertex-ai-project1'; // Replace with your bucket name
const upload = multer({ dest: 'uploads/' });

// Uploading file and storing file


// Defining router

// const cpUpload = upload.fields([
//   { name: 'name', maxCount: 4 },
//   { name: 'email', maxCount: 4 },
//   { name: 'cycleBrand', maxCount: 4 },
//   { name: 'userPhoneNumber', maxCount: 4 },
//   { name: 'userRollNumber', maxCount: 4 },
//   { name: 'pricePerHr', maxCount: 4 },
//   { name: 'cycleDescription', maxCount: 4 },
//   { name: 'image', maxCount: 4 },
// ]);
// route.get('/post',auth,async(req,res)=>{
//   res.send("You are logged in and authorized to access this route.");
// })

route.post('/post', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('File not found');
    }

    // Generate a unique filename with a timestamp
    const filename = `${Date.now()}-${path.basename(file.originalname)}`;
    
    // Upload the file to Google Cloud Storage
    await storage.bucket(bucketName).upload(file.path, {
      destination: filename,
      public: true, // Make the file publicly accessible
    });

    // Get the public URL of the file
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
    console.log(publicUrl)
    // Send the public URL as the response
    res.status(200).send({ url: publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Internal Server Error');
  }
});

route.get("/find", async (req, res) => {
  console.log(req.body)
  try {
    const token = req.cookies.jwt;
    const data = await Cycle.find();
    res.status(200).send(data);
  } catch (error) {
    console.error("Error in retrieving data from MongoDB:", error);
    res.status(400).send(error);
  }
});

route.post("/contact", async (req, res) => {
  const reqs = JSON.stringify(req.body)
  console.log(reqs)
  try {
    const { email, message } = req.body;

    const complaint = new contact({
      email: email,
      message: message,
    });

    const postComplaint = await complaint.save();
    res.status(201).send(postComplaint);
  } catch (error) {
    console.error("Error in posting complaint:", error);
    res.status(400).send(error);
  }
});

route.post("/register", async (req, res) => {
  console.log(req.body)
  try {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const phoneNumber = req.body.phoneNumber

    const newUser = new user({
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber
    })

    const token = await newUser.genarateAuthToken()
    console.log(`Genarated JWT is ${token}`)

    // Createing a cookie
    const expiryDate = new Date(Date.now() + 30000);
    res.cookie('jwt', token, {
      expires: expiryDate,
      httpOnly: true
    })
    console.log(req.cookies)

    const saveUser = await newUser.save();
    res.status(200).send(saveUser);
  }
  catch (error) {
    console.log("We got error while adding user")
    console.log(error)
    res.status(403).send("Error in adding User")
  }
})

route.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const email = req.body.email
    const password = req.body.password

    const useremail = await user.findOne({ email: email })

    const token = await useremail.genarateAuthToken()
    console.log(`Genarated JWT is ${token}`)

    //creating cookie
    const expiryDate = new Date(Date.now() + 300000);
    res.cookie('jwt', token, {
      expires: expiryDate,
      httpOnly: true
    })
    console.log(req.cookies)

    if (useremail.password === password) {
      res.status(200).send(useremail)
    }
    else {
      res.status(400).send("Wrong Password")
    }
    console.log(useremail)
  }
  catch (err) {
    console.log("Login error")
    console.log(err)
  }
})

route.get("/logout", async (req, res) => {
  //console.log(res.body)
  // console.log(req)
  try {

    res.clearCookie('jwt')
    console.log("Logout Sucessfull")

    res.redirect("/")
  }
  catch (err) {
    res.status(400).send("Unbale to Logout")
    // console.log("Logout issue")
  }
})

route.get("/", (req, res) => {
  console.log(`this is sercet cookoie ${req.cookies.jwt}`)
  console.log("This is hoe page")
  res.send("Hello There");
});

module.exports = route;
