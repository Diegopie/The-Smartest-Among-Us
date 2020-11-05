const accountEl = document.getElementById("accountLink");
if (localStorage.getItem("accountName")) {
  const email = localStorage.getItem("accountName");
  const accountURL = "/account=" + email;
  accountEl.setAttribute("href", accountURL);
  // const parent = $("#dropdown");
  // const sibling = $("#loginButt");
  // parent.insertBefore(accountEl, sibling);
}
document.getElementById("logout").addEventListener("click", () => {
  if (localStorage.getItem("accountName")) {
    localStorage.setItem("accountName", "")
  }
})