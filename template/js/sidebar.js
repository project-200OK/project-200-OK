
document.querySelector(".close_btn").addEventListener("click", () => {
  document.querySelector(".side_bar").style.transition = "0.5s ease-out";
  document.querySelector(".side_bar").style.transform = "translateX(-300px)";
  setTimeout(() => {
    document.querySelector(".open_btn").style.display = "block";
    document.querySelector(".open_btn").style.transform = "translateX(0px)";
  }, 500); // Transition duration과 일치시킴
});

document.querySelector(".open_btn").addEventListener("click", () => {
  // document.querySelector(".side_bar").style.opacity = "1";
  document.querySelector(".open_btn").style.visibility = "visible";
  document.querySelector(".side_bar").style.transform = "translateX(0)";
  // document.querySelector(".open_btn").style.transform = "translateX(0)";
  document.querySelector(".open_btn").style.display = "none";
});
