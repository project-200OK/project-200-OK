document.addEventListener("DOMContentLoaded", () => {
  // DOM 요소에 대한 참조
  const searchForm = document.getElementById("searchForm"); // 검색 폼 요소
  const searchInput = document.getElementById("searchInput"); // 검색 입력 필드
  const guideCardList = document.getElementById("guideCardList"); // 가이드 카드 리스트를 표시할 요소
  const boardList = document.getElementById("board-list"); // 게시물 리스트를 표시할 요소
  const guidePagination = document.getElementById("guide-pagination"); // 가이드 페이지 네이션 요소
  const postPagination = document.getElementById("post-pagination"); // 게시물 페이지 네이션 요소

  const guideTab = document.getElementById("guideTab"); // 가이드 탭 요소
  const postTab = document.getElementById("postTab"); // 게시물 탭 요소

  // 페이지당 항목 수
  const guideItemsPerPage = 16; // 가이드 페이지당 항목 수
  const postItemsPerPage = 15; // 게시물 페이지당 항목 수

  // 현재 페이지 변수
  let currentGuidePage = 1; // 현재 가이드 페이지
  let currentPostPage = 1; // 현재 게시물 페이지

  // 전체 항목을 저장할 배열
  let allItems = []; // 전체 가이드 항목을 저장하는 배열
  let allPosts = []; // 전체 게시물 항목을 저장하는 배열

  // 필터링된 항목을 저장할 배열
  let filteredGuideItems = []; // 필터링된 가이드 항목을 저장하는 배열
  let filteredPosts = []; // 필터링된 게시물 항목을 저장하는 배열

  // URL에서 쿼리 파라미터 가져오기
  const url = new URLSearchParams(location.search); // 현재 페이지 URL에서 쿼리 파라미터를 추출
  const query = url.get('value').trim().toLowerCase(); // 쿼리 파라미터 'value'를 가져와서 소문자로 변환
  filterResults(query); // 쿼리에 따라 필터링된 결과를 업데이트

  // 가이드 데이터를 필터링하는 함수
  function filterGuideData(data) {
      allItems = []; // 기존 항목 초기화
      data.categories.forEach((category, guideIndex) => { // 각 카테고리에 대해
          category.subcategories.forEach((subcategory, keywordIndex) => { // 각 서브카테고리에 대해
              subcategory.items.forEach((item, itemIndex) => { // 각 항목에 대해
                  if (item.like === "1" || item.like === "0") { // 'like'가 "1" 또는 "0"인 항목만 추가
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
      console.log(query); // 검색 쿼리 확인

      // 가이드 데이터 로드
      axios.get('http://localhost:5500/json/guide.json')
      .then((response) => {
          console.log(1); // 로드 완료 확인
          const data = response.data; // 응답에서 데이터 추출
          filterGuideData(data); // 데이터 필터링
          filteredGuideItems = allItems.filter(item => item.title.toLowerCase().includes(query)); // 쿼리로 필터링된 가이드 항목
          
          renderGuideCards(); // 필터링된 가이드 카드를 렌더링
          renderGuidePagination(); // 가이드 페이지 네이션 렌더링
          guideTab.textContent = `가이드 (${filteredGuideItems.length})`; // 가이드 탭에 검색 결과 수 표시
      })
      .catch((error) => {
          console.error("Error loading JSON:", error); // 오류 처리
      });

      // 게시물 데이터 로드
      axios.get('http://localhost:5500/json/community.json')
      .then((response) => {
          console.log(2); // 로드 완료 확인
          allPosts = response.data.posts; // 응답에서 게시물 추출
          filteredPosts = allPosts.filter(post => post.title.toLowerCase().includes(query)); // 쿼리로 필터링된 게시물
          renderPosts(currentPostPage); // 필터링된 게시물 렌더링
          renderPostPagination(); // 게시물 페이지 네이션 렌더링
          postTab.textContent = `게시물 (${filteredPosts.length})`; // 게시물 탭에 검색 결과 수 표시
      })
      .catch((error) => {
          console.error("Error loading JSON:", error); // 오류 처리
      });

      currentGuidePage = 1; // 가이드 페이지 초기화
      currentPostPage = 1; // 게시물 페이지 초기화

      // 탭의 검색 결과 수 업데이트
      guideTab.textContent = `가이드 (${filteredGuideItems.length})`; // 가이드 탭 업데이트
      postTab.textContent = `게시물 (${filteredPosts.length})`; // 게시물 탭 업데이트

      renderGuideCards(); // 필터링된 가이드 카드 렌더링
      renderPosts(currentPostPage); // 필터링된 게시물 렌더링
      renderGuidePagination(); // 가이드 페이지 네이션 렌더링
      renderPostPagination(); // 게시물 페이지 네이션 렌더링
  }

  // 가이드 카드를 렌더링하는 함수
  function renderGuideCards() {
      let cardHTML = ''; // 카드 HTML을 저장할 변수
      const startIndex = (currentGuidePage - 1) * guideItemsPerPage; // 현재 페이지의 시작 인덱스
      const endIndex = startIndex + guideItemsPerPage; // 현재 페이지의 끝 인덱스
      const itemsToShow = filteredGuideItems.slice(startIndex, endIndex); // 현재 페이지에 표시할 항목

      itemsToShow.forEach(item => {
          const detailUrl = `http://localhost:5500/guide/detail.html?guideIndex=${item.guideIndex}&keywordIndex=${item.keywordIndex}&itemIndex=${item.itemIndex}`; // 상세 페이지 URL
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

      guideCardList.innerHTML = cardHTML; // 카드 HTML을 DOM에 삽입
  }

  // 게시물 렌더링 함수
  function renderPosts(page) {
      boardList.innerHTML = `
          <div class="board-header">
              <span class="col-category">카테고리</span>
              <span class="col-title ta-center">제목</span>
              <span class="col-author">작성자</span>
              <span class="col-date">작성일</span>
          </div>
      `;

      const start = (page - 1) * postItemsPerPage; // 현재 페이지의 시작 인덱스
      const end = start + postItemsPerPage; // 현재 페이지의 끝 인덱스
      const paginatedPosts = filteredPosts.slice(start, end); // 현재 페이지에 표시할 게시물

      paginatedPosts.forEach((post, i) => {
          const boardItem = document.createElement("div");
          boardItem.className = "board-item";
          boardItem.innerHTML = `
              <span class="col-category">${post.headline}</span>
              <a href="/community/detail.html?index=${start + i}" class="col-title">${post.title}</a>
              <span class="col-author">${post.author}</span>
              <span class="col-date">${post.created_at}</span>
          `;
          boardList.appendChild(boardItem); // 게시물 항목을 DOM에 추가
      });
  }

  // 가이드 페이지 네이션 렌더링 함수
  function renderGuidePagination() {
      guidePagination.innerHTML = ""; // 기존 페이지 네이션 초기화
      const totalPages = Math.ceil(filteredGuideItems.length / guideItemsPerPage); // 총 페이지 수 계산

      const createPageButton = (pageNumber) => {
          const pageButton = document.createElement("button");
          pageButton.textContent = pageNumber; // 페이지 번호 버튼 텍스트
          pageButton.className = pageNumber === currentGuidePage ? "active" : ""; // 현재 페이지 버튼 활성화
          pageButton.addEventListener("click", () => {
              currentGuidePage = pageNumber; // 페이지 번호 변경
              renderGuideCards(); // 가이드 카드 렌더링
              renderGuidePagination(); // 페이지 네이션 렌더링
          });
          guidePagination.appendChild(pageButton); // 페이지 버튼을 DOM에 추가
      };

      // 이전 페이지 버튼
      const prevButton = document.createElement("button");
      prevButton.textContent = "이전"; // 버튼 텍스트
      prevButton.disabled = currentGuidePage === 1; // 첫 페이지일 때 비활성화
      prevButton.addEventListener("click", () => {
          if (currentGuidePage > 1) {
              currentGuidePage--; // 페이지 감소
              renderGuideCards(); // 가이드 카드 렌더링
              renderGuidePagination(); // 페이지 네이션 렌더링
          }
      });
      guidePagination.appendChild(prevButton); // 이전 페이지 버튼을 DOM에 추가

      // 페이지 번호 버튼 생성
      for (let i = 1; i <= totalPages; i++) {
          createPageButton(i);
      }

      // 다음 페이지 버튼
      const nextButton = document.createElement("button");
      nextButton.textContent = "다음"; // 버튼 텍스트
      nextButton.disabled = currentGuidePage === totalPages; // 마지막 페이지일 때 비활성화
      nextButton.addEventListener("click", () => {
          if (currentGuidePage < totalPages) {
              currentGuidePage++; // 페이지 증가
              renderGuideCards(); // 가이드 카드 렌더링
              renderGuidePagination(); // 페이지 네이션 렌더링
          }
      });
      guidePagination.appendChild(nextButton); // 다음 페이지 버튼을 DOM에 추가
  }

  // 게시물 페이지 네이션 렌더링 함수
  function renderPostPagination() {
      postPagination.innerHTML = ""; // 기존 페이지 네이션 초기화
      const totalPages = Math.ceil(filteredPosts.length / postItemsPerPage); // 총 페이지 수 계산

      const createPageButton = (pageNumber) => {
          const pageButton = document.createElement("button");
          pageButton.textContent = pageNumber; // 페이지 번호 버튼 텍스트
          pageButton.className = pageNumber === currentPostPage ? "active" : ""; // 현재 페이지 버튼 활성화
          pageButton.addEventListener("click", () => {
              currentPostPage = pageNumber; // 페이지 번호 변경
              renderPosts(currentPostPage); // 게시물 렌더링
              renderPostPagination(); // 페이지 네이션 렌더링
          });
          postPagination.appendChild(pageButton); // 페이지 버튼을 DOM에 추가
      };

      // 이전 페이지 버튼
      const prevButton = document.createElement("button");
      prevButton.textContent = "이전"; // 버튼 텍스트
      prevButton.disabled = currentPostPage === 1; // 첫 페이지일 때 비활성화
      prevButton.addEventListener("click", () => {
          if (currentPostPage > 1) {
              currentPostPage--; // 페이지 감소
              renderPosts(currentPostPage); // 게시물 렌더링
              renderPostPagination(); // 페이지 네이션 렌더링
          }
      });
      postPagination.appendChild(prevButton); // 이전 페이지 버튼을 DOM에 추가

      // 페이지 번호 버튼 생성
      for (let i = 1; i <= totalPages; i++) {
          createPageButton(i);
      }

      // 다음 페이지 버튼
      const nextButton = document.createElement("button");
      nextButton.textContent = "다음"; // 버튼 텍스트
      nextButton.disabled = currentPostPage === totalPages; // 마지막 페이지일 때 비활성화
      nextButton.addEventListener("click", () => {
          if (currentPostPage < totalPages) {
              currentPostPage++; // 페이지 증가
              renderPosts(currentPostPage); // 게시물 렌더링
              renderPostPagination(); // 페이지 네이션 렌더링
          }
      });
      postPagination.appendChild(nextButton); // 다음 페이지 버튼을 DOM에 추가
  }

  // 탭 전환 함수
  window.showTab = (tab) => {
      if (tab === 'guide') {
          guideTab.classList.add("active"); // 가이드 탭 활성화
          postTab.classList.remove("active"); // 게시물 탭 비활성화
          document.getElementById("guideSection").style.display = "block"; // 가이드 섹션 표시
          document.getElementById("postSection").style.display = "none"; // 게시물 섹션 숨기기
      } else if (tab === 'post') {
          guideTab.classList.remove("active"); // 가이드 탭 비활성화
          postTab.classList.add("active"); // 게시물 탭 활성화
          document.getElementById("guideSection").style.display = "none"; // 가이드 섹션 숨기기
          document.getElementById("postSection").style.display = "block"; // 게시물 섹션 표시
      }
  };
});
