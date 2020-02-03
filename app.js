const express = require("express");
const path = require("path");
const session = require("express-session");
const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");
const homeRouter = require("./routes/home");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const writeRouter = require("./routes/write");
const postRouter = require("./routes/post");
const updateViewsRouter = require("./routes/updateViews");
const updateLikesRouter = require("./routes/updateLikes");
const deleteRouter = require("./routes/delete");

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
app.use("/delete", deleteRouter);
app.use("/write", writeRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", signupRouter);
app.use("/", indexRouter);
app.use("/home", homeRouter);
app.use("/post", postRouter);
app.use("/updateViews", updateViewsRouter);
app.use("/updateLikes", updateLikesRouter);

app.listen(3000, () => {
  console.log("Launch Bamboo >.<");
});
