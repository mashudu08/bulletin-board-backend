const express = require("express");
const app = express();
const urlprefix = "/api";
const mongoose = require("mongoose");
// const Post = require('./models/posts');
const fs = require("fs");
const cors = require("cors");

//Load SSL certificate
const cert = fs.readFileSync("keys/certificate.pem");
const options = {
  server: { sslCA: cert },
};

//Mongoose connection string
const connstring =
  "mongodb+srv://st10115884:6kSCPrN8J8vztlc4@cluster0.uijqisq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

mongoose.connect(connstring)
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("Not connected");
  }, options);

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200', // Adjust to match your Angular app's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization"
}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});


app.get(urlprefix + "/", (req, res) => {
  res.send("Hello World Express!");
});

app.use(urlprefix + "/posts", postRoutes);
app.use(urlprefix + "/users", userRoutes);

module.exports = app;
