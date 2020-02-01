$(document).ready(function() {
  renderSignUp();
  renderWrite();
  renderLunch();
  renderLogin();
  getLogin();
  createUser();
  createPost();
  boardPagination();
  logout();
});

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
        <input type="text" id="signup-email" name="signup-email" placeholder="너의 이메일"><br>       
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

    $.post("/signup", send_param, returnData => {
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

function getLogin() {
  $(document).on("click", "#login_btn", () => {
    const email = $("#login-email").val();
    const password = $("#login-password").val();

    const send_param = { email, password };

    $.post("/login", send_param, returnData => {
      alert(returnData.message);
      if (returnData.status != "fail") $(location).attr("href", "/home");
    });
  });
}

function renderWrite() {
  $("#write-btn").click(() => {
    let writeForm = `
    <div class="write-container">
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

    $(".buttons").append(`
      <button class="main-button-small" id="board-watch-btn">게시판</button>
    `);

    $(document).on("click", "#board-watch-btn", () => {
      location.href = "/home";
    });

    $(".board-container").prepend(writeForm);
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
    const title = $("#board-write-title").val();
    const content = $("#board-write-content").val();

    const send_param = { title, content };
    $.post("/write", send_param, returnData => {
      alert(returnData.message);
      location.href = "/home";
    });
  });
}

function boardPagination() {
  $(".board-table").after('<div id="board-page-nav"></div>');
  let rowsShown = 5;
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
    let currPage = $(this).attr("rel");
    let startItem = currPage * rowsShown;
    let endItem = startItem + rowsShown;
    $(".board-table tbody tr")
      .hide()
      .slice(startItem, endItem)
      .css("display", "table-row");
  });
}

function logout() {
  $("#header-logout-btn").click(() => {
    $.post("/logout", returnData => {
      alert(returnData.message);
      location.href = "/";
    });
  });
}
