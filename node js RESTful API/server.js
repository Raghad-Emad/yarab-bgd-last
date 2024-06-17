if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv").config({ path: "./.env" });
}

const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const checkAuth = require("./middleware/checkAuth.js");
const { levelUp } = require("./LevelSystem/Level");
const jwt = require("jsonwebtoken");


const studentRouter = require("./routes/studentRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const adminRouter = require("./routes/adminRoutes");
const teacherStatRouter = require("./routes/teacherStatRoutes");
const operationRouter = require("./routes/operationRoutes");
const assignmentsRouter = require("./routes/assignmentsRoutes");
const classesRouter = require("./routes/classRoutes");
const classRequestRouter = require("./routes/ClassRoutes/ClassRequestsRoutes");
const moduleRouter = require("./routes/moduleRoutes");
const quizRouter = require("./routes/ActivityRoutes/quizRoutes");
const flashcardRouter = require("./routes/ActivityRoutes/flashcardRoutes");
const themesRouter = require("./routes/ItemRoutes/themeRoutes");
const profilePsRouter = require("./routes/ItemRoutes/profilePictureRoutes");
const bannersRouter = require("./routes/ItemRoutes/bannerRoutes");
const ratingRouter = require("./routes/ActivityRoutes/ratingRoutes");
const adminStatRouter = require("./routes/adminStatRoutes");
const submissionRouter = require("./routes/submissionRoutes");
const feedRouter = require("./routes/feedRoutes");
// const protectedRoutes = require('./routes/protectedRoutes');



const app = express();

// Middleware
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from this origin
}));

console.log('Current working directory:', process.cwd());

// Routes
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);
app.use("/admin", adminRouter);
app.use("/operation", operationRouter)
app.use("/assignments", assignmentsRouter);
app.use("/classes", classesRouter);
app.use("/classRequests", classRequestRouter);
app.use("/module", moduleRouter);
app.use("/quiz", quizRouter);
app.use("/decks", flashcardRouter);
app.use("/profilePicture", profilePsRouter);
app.use("/theme", themesRouter);
app.use("/banner", bannersRouter);
app.use("/rating", ratingRouter);
app.use("/stats", adminStatRouter);
app.use("/submission", submissionRouter);
app.use("/feed", feedRouter);
app.use("/tstats", teacherStatRouter);

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

console.log("ab", process.env.DB_PASS);

app.get("/", async (req, res) => {
  const cred = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  };

  res.json({
    status: `Ready to go ${process.env.DB_USER}`,
  });
});