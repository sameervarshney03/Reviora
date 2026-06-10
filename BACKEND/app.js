// important requires
const connectDB = require("./src/config/database");
const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./src/routes/authRouter");
const notesRouter = require("./src/routes/notesRouter");
const profileRouter = require("./src/routes/profileRouter");
const revisionRouter = require("./src/routes/revisionRouter");

const app = express();

const cors = require("cors");

// cors middleware
app.use(
    cors({
        origin: "http://localhost:1234",
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE"]
    })
);

// using middleware express.json()
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", notesRouter);
app.use("/", profileRouter);
app.use("/", revisionRouter);



// database connection
connectDB().then(() => {
    console.log("Database connection established successfully!");
    app.listen(7777, () => {
        console.log("The server is listening successfully!");
    })
})
.catch((err) => {
    console.log("Sorry the following error occured: " , err);
})


