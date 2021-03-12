const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path")

const dotenv = require("dotenv");
dotenv.config();

const user = require("./routes/api/user");
const profile = require("./routes/api/profile");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE)
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch(err => console.log(err))


//  Passport middleware
app.use(passport.initialize());

//  Passport Config
require("./config/passport")(passport);

//  Routes
app.use("/api/user", user);
app.use("/api/profile", profile);

// app.use(express.static(path.join(__dirname, "client", "build")))

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));