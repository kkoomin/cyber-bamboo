$(document).ready(function() {
  renderSignUp();
});

function renderSignUp() {
  $("#main-signup").click(() => {
    let signupForm = `
    <div class="main-signup">
        <form action="">
            <input type="text" id="signup-email" name="signup-email" placeholder="email"><br>
            
            <input type="password" id="signup-password" name="signup-password" placeholder="password"><br>
    
            <input type="text" id="signup-name" name="signup-name" placeholder="name"><br>
    
            <button class="main-button">가입하기</button>
    
        </form>
    </div>
    `;
    $("#main-signup").hide();
    $(".main-container").prepend(signupForm);
  });
}
