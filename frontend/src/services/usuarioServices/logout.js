function logout() {
  localStorage.clear();
  window.location.replace("/pages/login/login.html");
}

export default logout;