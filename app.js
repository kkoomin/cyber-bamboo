const express = require("express");
const path = require("path");
const session = require("express-session");

const indexRouter = require("./routes/indexRoutes");
const homeRouter = require("./routes/homeRoutes");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postsRoutes");

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "임금님 귀는 당나귀 귀",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

// Router
app.use("/", indexRouter);
app.use("/home", homeRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(3000, () => {
  console.log("Launch Bamboo Sever...");
});
