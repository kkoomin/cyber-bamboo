export function login() {
  $(document).on("click", "#login_btn", () => {
    const email = $("#login-email").val();
    const password = $("#login-password").val();

    const send_param = { email, password };

    $.post("/users/login", send_param, returnData => {
      alert(returnData.message);
      if (returnData.status != "fail") $(location).attr("href", "/home");
    });
  });
}

export function logout() {
  $("#header-logout-btn").click(() => {
    $.post("/users/logout", returnData => {
      alert(returnData.message);
      location.href = "/";
    });
  });
}
