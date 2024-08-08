document
  .querySelector(".menu_item")
  .addEventListener("mouseenter", function () {
    document.querySelector(".menu_item").style.color = "blue";
    document.querySelector(".header_sub").style.display = "block";
    document.querySelector(".sub_menu").style.display = "flex";
  });

document.querySelector(".header").addEventListener("mouseleave", function () {
  document.querySelector(".menu_item").style.color = "black";
  document.querySelector(".header_sub").style.display = "none";
  document.querySelector(".sub_menu").style.display = "none";
});
