document
  .querySelector(".menu_item")
  .addEventListener("mouseenter", function () {
    document.querySelector(".menu_item").style.color = "#007bff";
    document.querySelector(".header_sub").style.display = "block";
    document.querySelector(".sub_menu").style.display = "flex";
  });
document
  .querySelector(".header_sub")
  .addEventListener("mouseenter", function () {
    document.querySelector(".menu_item").style.color = "#007bff";
    document.querySelector(".header_sub").style.display = "block";
    document.querySelector(".sub_menu").style.display = "flex";
  });

document
.querySelector(".header").addEventListener("mouseleave", function () {
  document.querySelector(".menu_item").style.color = "#333";
  document.querySelector(".header_sub").style.display = "none";
  document.querySelector(".sub_menu").style.display = "none";
});

document
.querySelector(".header_sub").addEventListener("mouseleave", function () {
  document.querySelector(".menu_item").style.color = "#333";
  document.querySelector(".header_sub").style.display = "none";
  document.querySelector(".sub_menu").style.display = "none";
});

// 검색창

document.querySelector('.search_btn').addEventListener('click', (event) => {
  event.preventDefault();
  try {
    const query = document.getElementById('searchInput').value;
    window.location = `/search/searchBoard.html?value=${query}`;

  }catch (error) {
    console.log("error :" +error);
    
  }
});
