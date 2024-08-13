document.addEventListener("DOMContentLoaded", function () {
  axios
    .get("/json/community.json")
    .then(function (response) {
      const posts = response.data.posts;
      const postsPerPage = 15; // 페이지당 표시할 게시물 수
      let currentPage = 1; // 현재 페이지
      let filteredPosts = posts; // 필터링된 게시물 목록

      // DOM 요소 선택
      const boardList = document.getElementById("board-list");
      const pagination = document.getElementById("pagination");
      const filterDate = document.getElementById("filter-date");
      const searchType = document.getElementById("search-type");
      const searchBox = document.getElementById("search-box");
      const searchButton = document.getElementById("search-button");

      // 게시물 렌더링 함수
      function renderPosts(page, postsList) {
        boardList.innerHTML = `
            <div class="board-header">
              <span class="col-category">카테고리</span>
              <span class="col-title ta-center">제목</span>
              <span class="col-author ta-center">작성자</span>
              <span class="col-date">작성일</span>
            </div>
            `; // 기존 게시물 목록 초기화
        const start = (page - 1) * postsPerPage;
        const end = page * postsPerPage;
        const paginatedPosts = postsList.slice(start, end); // 현재 페이지의 게시물 선택

        paginatedPosts.forEach((post, i) => {
          const boardItem = document.createElement("div");
          boardItem.className = "board-item";
          boardItem.innerHTML = `
            <span class="col-category">${post.headline}</span>
            <a href="/community/detail.html?index=${start + i}" class="col-title">${post.title}</a>
            <span class="col-author">${post.author}</span>
            <span class="col-date">${post.created_at}</span>
          `;
          boardList.appendChild(boardItem);
        });

        renderPagination(postsList.length);
      }

      // 페이지네이션 렌더링 함수
      function renderPagination(totalPosts) {
        pagination.innerHTML = ""; // 기존 페이지네이션 초기화
        const totalPages = Math.ceil(totalPosts / postsPerPage);

        const createPageButton = (pageNumber) => {
          const pageButton = document.createElement("button");
          pageButton.textContent = pageNumber;
          pageButton.className = pageNumber === currentPage ? "active" : "";
          pageButton.addEventListener("click", function () {
            currentPage = pageNumber;
            renderPosts(currentPage, filteredPosts);
          });
          pagination.appendChild(pageButton);
        };

        const prevButton = document.createElement("button");
        prevButton.textContent = "이전";
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener("click", function () {
          if (currentPage > 1) {
            currentPage--;
            renderPosts(currentPage, filteredPosts);
          }
        });
        pagination.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
          createPageButton(i);
        }

        const nextButton = document.createElement("button");
        nextButton.textContent = "다음";
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener("click", function () {
          if (currentPage < totalPages) {
            currentPage++;
            renderPosts(currentPage, filteredPosts);
          }
        });
        pagination.appendChild(nextButton);
      }

      // 필터 적용 함수
      function applyFilters() {
        const dateValue = filterDate.value;
        const searchValue = searchBox.value.toLowerCase();
        const searchTypeValue = searchType.value;

        filteredPosts = posts.filter(post => {
          const postDate = new Date(post.created_at);
          const now = new Date();
          let dateMatch = true;

          if (dateValue === "today") {
            dateMatch = postDate.toDateString() === now.toDateString();
          } else if (dateValue === "week") {
            const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
            dateMatch = postDate >= oneWeekAgo;
          } else if (dateValue === "month") {
            const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
            dateMatch = postDate >= oneMonthAgo;
          }

          let searchMatch = true;
          if (searchTypeValue === "title") {
            searchMatch = post.title.toLowerCase().includes(searchValue);
          } else if (searchTypeValue === "author") {
            searchMatch = post.author.toLowerCase().includes(searchValue);
          }

          return dateMatch && searchMatch;
        });

        currentPage = 1; // 필터 적용 시 첫 페이지로 이동
        renderPosts(currentPage, filteredPosts);
      }

      // 필터 및 검색 버튼에 이벤트 리스너 추가
      filterDate.addEventListener("change", applyFilters);
      searchButton.addEventListener("click", applyFilters);

      // 초기 렌더링
      renderPosts(currentPage, posts);
    })
    .catch(function (error) {
      console.error("게시판 데이터를 불러오는 데 실패했습니다:", error);
    });
});
