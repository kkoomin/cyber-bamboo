import { login, logout } from "./login.js";

$(document).ready(function() {
  goHome();
  renderSignUp();
  renderWrite();
  renderLunch();
  renderLogin();
  login();
  createUser();
  createPost();
  boardPagination();
  logout();
  renderPost();
  deletePost();
  renderBoard();
  getProfile();
  incresePostLike();
  postComment();
  renderCommentArea();
  updateMyprofile();
  updateProfileDB();
  deleteComment();
});

function goHome() {
  $(".header-title").click(() => {
    location.href = "/home";
  });
}

function renderSignUp() {
  $("#main-signup").click(() => {
    if ($(".main-login")) {
      $(".main-login").hide();
      $("#main-login").show();
    }

    let signupForm = `
    <div class="main-signup slideInDown">
        <div class="main-signup-title">회원가입</div>
        <form class="main-signup-form">
        <input type="email" id="signup-email" name="signup-email" placeholder="너의 이메일"><br>       
        <input type="password" id="signup-password" name="signup-password" placeholder="너의 비밀번호"><br>   
        <input type="text" id="signup-name" name="signup-name" placeholder="너의 닉네임"><br>   
        </form>
        <button id="signup_btn" class="main-button-big">가입하기</button>
    </div>
    `;

    $("#main-signup").hide();
    $(".main-container").prepend(signupForm);
  });
}

function createUser() {
  $(document).on("click", "#signup_btn", () => {
    const name = $("#signup-name").val();
    const password = $("#signup-password").val();
    const email = $("#signup-email").val();

    const send_param = { name, password, email };

    $.post("/users/signup", send_param, returnData => {
      alert(returnData.message);
      $("#signup-name").val("");
      $("#signup-email").val("");
      $("#signup-password").val("");
    });
  });
}

function renderLogin() {
  $("#main-login").click(() => {
    if ($(".main-signup")) {
      $(".main-signup").hide();
      $("#main-signup").show();
    }

    let loginForm = `
    <div class="main-login slideInDown">
      <div class="main-login-title">로그인</div>
      <form class="main-login-form">
        <input id="login-email" type="text" placeholder="이메일을 입력하삼"><br>
        <input id="login-password" type="password" placeholder="보안을 소중히"><br>
      </form>
      <button id="login_btn" class="main-button-big">로그인하기</button>
    </div>`;

    $("#main-login").hide();
    $(".main-container").prepend(loginForm);
  });
}

function renderWrite() {
  $("#write-btn").click(() => {
    let writeForm = `
    <div class="write-container speedIn">
    <input type="hidden" id="authorName" value="author" />
    <table class="write-table" border="1">
      <tr>
        <td>
          <input type="text" id="board-write-title" class="write-input" placeholder="제목을 입력하삼" />
        </td>
      </tr>
      <tr>
        <td>
          <textarea
            name="textarea"
            id="board-write-content"
            class="write-textarea"
            rows="6"
            placeholder="내용을 입력하삼"
          ></textarea>
        </td>
      </tr>
      <tr>
        <td class="write-table-btn no-border">
          <button id="board-write_btn" class="main-button-small">올리는 것이여</button>
        </td>
      </tr>
    </table>
  </div>
`;
    $(".board-table").hide();
    $("#write-btn").hide();
    $("#board-page-nav").hide();
    $(".board-container-title").hide();
    $("#board-watch-btn").show();

    $(".board-container").prepend(writeForm);
  });
}

function renderBoard() {
  $(document).on("click", "#board-watch-btn", () => {
    location.href = "/home";
  });
}

function renderLunch() {
  $("#lunch-btn").click(() => {
    $(".modal").show();
  });
  $(".close").click(() => {
    $("#modal").hide();
  });
}

function createPost() {
  $(document).on("click", "#board-write_btn", () => {
    const title = $("#board-write-title")
      .val()
      .trim();
    const content = $("#board-write-content")
      .val()
      .trim();

    const send_param = { title, content };
    $.post("/posts/createPost", send_param, returnData => {
      alert(returnData.message);
      location.href = "/home";
    });
  });
}

function boardPagination() {
  $(".board-table").after('<div id="board-page-nav"></div>');
  let rowsShown = 15;
  let rowsTotal = $(".board-table tbody tr").length;
  let numPages = rowsTotal / rowsShown;

  for (let i = 0; i < numPages; i++) {
    let pageNum = i + 1;
    $("#board-page-nav").append(
      '<a href="#" rel="' + i + '">' + pageNum + "</a> "
    );
  }
  $(".board-table tbody tr").hide();
  $(".board-table tbody tr")
    .slice(0, rowsShown)
    .show();
  $("#board-page-nav a:first").addClass("active");
  $("#board-page-nav a:first").addClass("focus");
  $("#board-page-nav a").bind("click", function() {
    $("#board-page-nav a").removeClass("active");
    $(this).addClass("active");
    let currentPage = $(this).attr("rel");
    let startItem = currentPage * rowsShown;
    let endItem = startItem + rowsShown;
    $(".board-table tbody tr")
      .hide()
      .slice(startItem, endItem)
      .css("display", "table-row");
  });
}

function getProfile() {
  $("#header-profile-btn").click(() => {
    $(".post-container").hide();
    $(".board-container").hide();
    $(".profile-container").show();

    $("#change-info").hide();
    $("#write-btn").hide();
    $("#board-watch-btn").show();
  });
}

/* function updateProfile() {
  $("#fix-profile-btn").click(() => {
    let fix_profile = `변경할 닉네임:<input id="fix-name"><br>`;
    fix_profile += `변경할 이메일:<input id="fix-email"><br>`;
    fix_profile += `변경할 패스워드:<input type="password" id="fix-password"><br>`;
    fix_profile += `<input id="change-profile" type="button" value="변경"><br>`;

    $("#login-profile").html(fix_profile);
  });
  $(document).on("click", "#fix-profile", function() {
    const fix_name = $("#fix-name").val();
    const fix_email = $("fix-email").val();
    const fix_password = $("fix-password").val();

    const send_param = { fix_name, fix_email, fix_password };

    $.post("/users/updateProfile", send_param, function(returnData) {
      alert(returnData.message);
    });
  });
} */

function renderPost() {
  $(".board-body-title").click(e => {
    const send_param = { id: $(e.target.parentNode).attr("data-id") };

    $.post("/posts/getPosts", send_param, returnData => {
      const postData = returnData.postData;
      const comments = returnData.comments;

      let postForm = `
      <div class="post-container centered">
  <div class="post-data" data-id="${postData.id}">
    <div class="post-header">${e.target.previousElementSibling.innerText}</div>
    <div class="post-title">${postData.title}</div>
    <div class="post-info">
      <span id="post-author">${postData.author}</span>
    </div>
    <div class="post-content">${postData.content}</div>

    <div>
      <button
        class="main-button-small button-like"
        id="post-like-btn"
        data-count="${postData.likes}"
      >
        👍좋아요
      </button>
      <button class="main-button-small button-comment" id="render-comment-btn">
        📘댓글쓰기
      </button>
      <button class="main-button-small button-delete" id="post-delete-btn">
        👿삭제하기
      </button>
    </div>
  </div>

  <div class="post-comments">
  </div>

  <div class="post-comment-area">
    <div class="comment-area">
    <div class="comment-title"><span>댓글</span></div>
    <textarea class="comment-content" id="comment"></textarea>
    <div>
    <button id="post-comment-btn" class="main-button-small">⭐등록</button>
    </div>
  </div>
</div>

      `;

      $(".board-container").hide();

      $("main").prepend(postForm);

      const commentsHTML = [];
      comments.forEach(comment => {
        commentsHTML.push(
          `<div class="comment" data-id="${comment.id}">
          ${comment.content} - <span id="comment-author" data-a="${comment.author}">${comment.author}</span> [${comment.createdAt}]           <span class="comment-delete-btn" data-id="${comment.id}">❌</span>
          </div>

          `
        );
      });
      commentsHTML.join("<br>");
      // console.log(commentsHTML);
      $(".post-comments").html(commentsHTML);

      $("#write-btn").hide();
      $("#board-watch-btn").show();
      $.post("/posts/updateViews", { id: postData.id, views: postData.views });
    });
  });
}

function incresePostLike() {
  $(document).on("click", "#post-like-btn", e => {
    const send_param = {
      id: $(e.target.parentNode.parentNode).attr("data-id"),
      likes: $("#post-like-btn").attr("data-count")
    };
    $.post("/posts/updateLikes", send_param, returnData => {
      alert(returnData.message);
    });
  });
}

function deletePost() {
  $(document).on("click", "#post-delete-btn", () => {
    const author = $("#post-author").text();
    const id = $(".post-data").attr("data-id");
    $.post("/posts/deletePost", { author, id }, returnData => {
      alert(returnData.message);
      location.href = "/home";
    });
  });
}

function renderCommentArea() {
  $(document).on("click", "#render-comment-btn", () => {
    $(".post-comment-area").show();
  });
}

function postComment() {
  $(document).on("click", "#post-comment-btn", () => {
    const content = $("#comment").val();
    const post_id = $(".post-data").attr("data-id");

    const send_param = { post_id, content };

    $.post("/posts/postComment", send_param, returnData => {
      alert(returnData.message);
      location.href = "/home";
    });
  });
}

function updateMyprofile() {
  $("#changeMyProfile").click(() => {
    $("#change-info").show();
    $("#myprofile").hide();
  });
}

function updateProfileDB() {
  $("#fix-profile-btn").click(() => {
    const name = $("#change-user-name").val();
    const email = $("#change-user-email").val();

    const send_param = { name, email };
    console.log(name + ":" + email);
    $.post("users/updateProfile", send_param, returnData => {
      console.log(returnData.user.name);
      $("#change-info").hide();
      $("#myprofile").show();
      $("#login-user-name").html(returnData.user.name);
      $("#login-user-email").html(returnData.user.email);
      // console.log(returnData.user);
      // location.href = "/home";
    });
    alert("✍내 정보를 변경했습니다.");
  });
}

function deleteComment() {
  $(document).on("click", ".comment-delete-btn", e => {
    const author = $("#comment-author").attr("data-a");
    const id = e.target.dataset.id;
    $.post("/posts/deleteComment", { author, id }, returnData => {
      alert(returnData.message);
      location.href = "/home";
    });
  });
}
