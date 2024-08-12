document.addEventListener("DOMContentLoaded", () => {
  // DOM 요소에 대한 참조
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const guideCardList = document.getElementById("guideCardList");
  const boardList = document.getElementById("board-list");
  const guidePagination = document.getElementById("guide-pagination");
  const postPagination = document.getElementById("post-pagination");

  const guideTab = document.getElementById("guideTab");
  const postTab = document.getElementById("postTab");

  // 페이지당 항목 수
  const guideItemsPerPage = 16;
  const postItemsPerPage = 15;
  
  // 현재 페이지 변수
  let currentGuidePage = 1;
  let currentPostPage = 1;

  // 전체 항목을 저장할 배열
  let allItems = [];
  let allPosts = [];
  
  // 필터링된 항목을 저장할 배열
  let filteredGuideItems = [];
  let filteredPosts = [];

  // URL에서 쿼리 파라미터 가져오기
  const url = new URLSearchParams(location.search);
  const query = url.get('value').trim().toLowerCase();      
  filterResults(query); // 필터링 결과를 업데이트

  // 가이드 데이터를 필터링하는 함수
  function filterGuideData(data) {
      allItems = [];
      data.categories.forEach((category, guideIndex) => {
          category.subcategories.forEach((subcategory, keywordIndex) => {
              subcategory.items.forEach((item, itemIndex) => {
                  if (item.like === "1", "0") { // 'like'가 "1"인 항목만 추가
                      allItems.push({
                          guide: category.guide,
                          keyword: subcategory.keyword,
                          itemIndex: itemIndex,
                          guideIndex: guideIndex,
                          keywordIndex: keywordIndex,
                          ...item
                      });
                  }
              });
          });
      });
  }

  // 검색 쿼리에 따라 결과를 필터링하는 함수
  function filterResults(query) {
      console.log(query);
      
      // 가이드 데이터 로드
      axios.get('http://localhost:5500/json/guide.json')
      .then((response) => {
          console.log(1);
          const data = response.data;
          filterGuideData(data);
          filteredGuideItems = allItems.filter(item => item.title.toLowerCase().includes(query));
          
          renderGuideCards(); // 가이드 카드 렌더링
          renderGuidePagination(); // 가이드 페이지 네이션 렌더링
          guideTab.textContent = `가이드 (${filteredGuideItems.length})`; // 가이드 탭 업데이트
      })
      .catch((error) => {
          console.error("Error loading JSON:", error);
      });

      // 게시물 데이터 로드
      axios.get('http://localhost:5500/json/community.json')
      .then((response) => {
          console.log(2);
          allPosts = response.data.posts;
          filteredPosts = filteredPosts = allPosts.filter(post => post.title.toLowerCase().includes(query));;
          renderPosts(currentPostPage); // 게시물 렌더링
          renderPostPagination(); // 게시물 페이지 네이션 렌더링
          postTab.textContent = `게시물 (${filteredPosts.length})`; // 게시물 탭 업데이트
      })
      .catch((error) => {
          console.error("Error loading JSON:", error);
      });
      
      // 쿼리에 맞게 필터링
      

      console.log(allItems);
      

      currentGuidePage = 1;
      currentPostPage = 1;

      // 탭의 검색 결과 수 업데이트
      guideTab.textContent = `가이드 (${filteredGuideItems.length})`;
      postTab.textContent = `게시물 (${filteredPosts.length})`;

      renderGuideCards(); // 필터링된 가이드 카드 렌더링
      renderPosts(currentPostPage); // 필터링된 게시물 렌더링
      renderGuidePagination(); // 가이드 페이지 네이션 렌더링
      renderPostPagination(); // 게시물 페이지 네이션 렌더링
  }

  // 가이드 카드를 렌더링하는 함수
  function renderGuideCards() {
      let cardHTML = '';
      const startIndex = (currentGuidePage - 1) * guideItemsPerPage;
      const endIndex = startIndex + guideItemsPerPage;
      const itemsToShow = filteredGuideItems.slice(startIndex, endIndex);

      itemsToShow.forEach(item => {
          const detailUrl = `http://localhost:5500/guide/detail.html?guideIndex=${item.guideIndex}&keywordIndex=${item.keywordIndex}&itemIndex=${item.itemIndex}`;
          cardHTML += `
          <div class="guide_card">
              <div class="guide_card_top">
                  <p class="headline">${item.guide}</p>
                  <p class="keyword">${item.keyword}</p>
              </div>
              <div class="guide_title">${item.title}</div>
              <div class="date">${item.date}</div>
              <img src="/images/icons/emptyLike.png" alt="비어있는좋아요" class="emptyLike_icon" onclick="removeCard(this, event)">
              <div class="clickable-area" onclick="window.location.href='${detailUrl}'"></div>
          </div>`;
      });

      guideCardList.innerHTML = cardHTML;
  }

  // 게시물 렌더링 함수
  function renderPosts(page) {
      boardList.innerHTML = `
          <div class="board-header">
              <span class="col-category">카테고리</span>
              <span class="col-title">제목</span>
              <span class="col-author">작성자</span>
              <span class="col-date">작성일</span>
          </div>
      `;

      const start = (page - 1) * postItemsPerPage;
      const end = start + postItemsPerPage;
      const paginatedPosts = filteredPosts.slice(start, end);

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
  }

  // 가이드 페이지 네이션 렌더링 함수
  function renderGuidePagination() {
      guidePagination.innerHTML = "";
      const totalPages = Math.ceil(filteredGuideItems.length / guideItemsPerPage);

      const createPageButton = (pageNumber) => {
          const pageButton = document.createElement("button");
          pageButton.textContent = pageNumber;
          pageButton.className = pageNumber === currentGuidePage ? "active" : "";
          pageButton.addEventListener("click", () => {
              currentGuidePage = pageNumber;
              renderGuideCards(); // 클릭 시 페이지 변경
              renderGuidePagination();
          });
          guidePagination.appendChild(pageButton);
      };

      // 이전 페이지 버튼
      const prevButton = document.createElement("button");
      prevButton.textContent = "이전";
      prevButton.disabled = currentGuidePage === 1;
      prevButton.addEventListener("click", () => {
          if (currentGuidePage > 1) {
              currentGuidePage--;
              renderGuideCards();
              renderGuidePagination();
          }
      });
      guidePagination.appendChild(prevButton);

      // 페이지 번호 버튼 생성
      for (let i = 1; i <= totalPages; i++) {
          createPageButton(i);
      }

      // 다음 페이지 버튼
      const nextButton = document.createElement("button");
      nextButton.textContent = "다음";
      nextButton.disabled = currentGuidePage === totalPages;
      nextButton.addEventListener("click", () => {
          if (currentGuidePage < totalPages) {
              currentGuidePage++;
              renderGuideCards();
              renderGuidePagination();
          }
      });
      guidePagination.appendChild(nextButton);
  }

  // 게시물 페이지 네이션 렌더링 함수
  function renderPostPagination() {
      postPagination.innerHTML = "";
      const totalPages = Math.ceil(filteredPosts.length / postItemsPerPage);

      const createPageButton = (pageNumber) => {
          const pageButton = document.createElement("button");
          pageButton.textContent = pageNumber;
          pageButton.className = pageNumber === currentPostPage ? "active" : "";
          pageButton.addEventListener("click", () => {
              currentPostPage = pageNumber;
              renderPosts(currentPostPage); // 클릭 시 페이지 변경
              renderPostPagination();
          });
          postPagination.appendChild(pageButton);
      };

      // 이전 페이지 버튼
      const prevButton = document.createElement("button");
      prevButton.textContent = "이전";
      prevButton.disabled = currentPostPage === 1;
      prevButton.addEventListener("click", () => {
          if (currentPostPage > 1) {
              currentPostPage--;
              renderPosts(currentPostPage);
              renderPostPagination();
          }
      });
      postPagination.appendChild(prevButton);

      // 페이지 번호 버튼 생성
      for (let i = 1; i <= totalPages; i++) {
          createPageButton(i);
      }

      // 다음 페이지 버튼
      const nextButton = document.createElement("button");
      nextButton.textContent = "다음";
      nextButton.disabled = currentPostPage === totalPages;
      nextButton.addEventListener("click", () => {
          if (currentPostPage < totalPages) {
              currentPostPage++;
              renderPosts(currentPostPage);
              renderPostPagination();
          }
      });
      postPagination.appendChild(nextButton);
  }

  // 탭 전환 함수
  window.showTab = (tab) => {
      if (tab === 'guide') {
          guideTab.classList.add("active");
          postTab.classList.remove("active");
          document.getElementById("guideSection").style.display = "block";
          document.getElementById("postSection").style.display = "none";
      } else if (tab === 'post') {
          guideTab.classList.remove("active");
          postTab.classList.add("active");
          document.getElementById("guideSection").style.display = "none";
          document.getElementById("postSection").style.display = "block";
      }
  };
});
