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
            
            <button id="signup_btn" class="main-button-big">가입하기</button>
        </form>
        
    </div>
    `;

    $("#main-signup").hide();
    $(".main-container").prepend(signupForm);

    $(document).on('click','#signup_btn',()=>{
      const name=$("#signup-name").val();
      const password=$("#signup-password").val();
      const email=$("#signup-email").val();

      const send_param={name,password,email};

      $.post("/signup",send_param,(returnData)=>{
        alert(returnData.message);
      });
    });


  });
}
