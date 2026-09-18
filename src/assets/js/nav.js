// Mobile navigation disclosure. The only JavaScript on the page.
(function () {
  var burger = document.querySelector(".burger");
  var panel = document.getElementById("mnav");
  if (!burger || !panel) return;

  function setOpen(open) {
    burger.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
  }

  burger.addEventListener("click", function () {
    setOpen(burger.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      burger.focus();
    }
  });

  // Close the panel if the viewport grows into the desktop nav.
  var mq = window.matchMedia("(min-width: 62rem)");
  mq.addEventListener("change", function (e) {
    if (e.matches) setOpen(false);
  });
})();
