function onFailure(error) {
  console.log(error);
}
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/users/signin");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (JSON.parse(xhr.responseText).type === "success") {
      signOut();
      location.assign(JSON.parse(xhr.responseText).redirectUrl);
    }
    else{    
      iziToast.error({
          title: 'Error',
          message: JSON.parse(xhr.responseText).msg,
      });
    }
  };
  xhr.send(JSON.stringify({ token: id_token }));
}
function renderButton() {
  gapi.signin2.render("my-signin2", {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    theme: "dark",
    onsuccess: onSignIn,
    onfailure: onFailure,
  });
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}
