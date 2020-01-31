$(document).ready(function() {
  renderSignUp();
  renderWrite();
  renderLunch();
  renderLogin();
});

function renderSignUp() {
  $("#main-signup").click(() => {
    let signupForm = `
    <div class="main-signup">
        <form>
        <input type="text" id="signup-email" name="signup-email" placeholder="email"><br>       
        <input type="password" id="signup-password" name="signup-password" placeholder="password"><br>   
        <input type="text" id="signup-name" name="signup-name" placeholder="name"><br>   
            
            
        </form>
        <button id="signup_btn" class="main-button-big">가입하기</button>
    </div>
    `;

    $("#main-signup").hide();
    $(".main-container").prepend(signupForm);

    $(document).on("click", "#signup_btn", () => {
      const name = $("#signup-name").val();
      const password = $("#signup-password").val();
      const email = $("#signup-email").val();

      const send_param = { name, password, email };

      $.post("/signup", send_param, returnData => {
        alert(returnData.message);
      });
    });
  });
}

function renderLogin(){
  $("#main-login").click(()=>{
    let loginForm = `
    <div class="main-login">
      <form>
        
        <input id="login-email" type="text" placeholder="email"><br>
        <input id="login-password" type="password" placeholder="password"><br>
        

        

      </form>
      <button id="login_btn" class="main-button-big">로그인하기</button>
    </div>`;

    $("#main-login").hide();
    $(".main-container").prepend(loginForm);

    $(document).on('click','#login_btn',()=>{
      const email=$('#login-email').val();
      const password=$('#login-password').val();

      const send_param={email,password};

      $.post('/login',send_param,(returnData)=>{
        alert(returnData.message);
        $(location).attr('href','/home');
      });

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
          <input type="text" class="write-input" placeholder="제목을 입력하삼" />
        </td>
      </tr>
      <tr>
        <td>
          <textarea
            name="textarea"
            class="write-textarea"
            rows="6"
            placeholder="내용을 입력하삼"
          ></textarea>
        </td>
      </tr>
      <tr>
        <td class="write-table-btn no-border">
          <button class="main-button-small">올리는 것이여</button>
        </td>
      </tr>
    </table>
  </div>
`;

    $(".board-table").hide();
    $("#write-btn").hide();

    $(".buttons").append(`
      <button class="main-button-small" id="board-btn">게시판</button>
    `);

    $(document).on("click", "#board-btn", () => {
      $("#board-btn").remove();
      $(".write-container").remove();
      $(".board-table").show();
      $("#write-btn").show();
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
