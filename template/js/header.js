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


// 김용 추가
document.getElementById('searchForm').addEventListener('submit', function(event) {
  const searchInput = document.getElementById('searchInput').value;
  if (searchInput) {
    this.action = `/search/searchBoard.html?keyword=${searchInput}`;
  }
});