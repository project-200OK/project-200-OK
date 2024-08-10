window.onload = async () => {
  try {
    const headerResponse = await fetch("/template/header-only.html");
    if (!headerResponse.ok) {
      throw new Error("Header fetch error");
    }
    const headerData = await headerResponse.text();
    document.querySelector("header").innerHTML = headerData;

    const footerResponse = await fetch("/template/footer-only.html");
    if (!footerResponse.ok) {
      throw new Error("Footer fetch error");
    }
    const footerData = await footerResponse.text();
    document.querySelector("footer").innerHTML = footerData;

    // header.js 의 내용
    const menuItem = document.querySelector(".menu_item");
    const headerSub = document.querySelector(".header_sub");
    const subMenu = document.querySelector(".sub_menu");
    const header = document.querySelector(".header");

    if (menuItem && headerSub && subMenu && header) {
      menuItem.addEventListener("mouseenter", () => {
        menuItem.style.color = "blue";
        headerSub.style.display = "block";
        subMenu.style.display = "flex";
      });

      header.addEventListener("mouseleave", () => {
        menuItem.style.color = "black";
        headerSub.style.display = "none";
        subMenu.style.display = "none";
      });
    } else {
      console.error("Required DOM elements not found.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
