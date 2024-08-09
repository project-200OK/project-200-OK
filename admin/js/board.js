window.onload = () => {
  axios.get('http://localhost:5500/admin/json/board.json')
      .then((res) => {
          const data = res.data;

          const itemsPerPage = 16; // 페이지당 보여줄 카드 개수
          let currentPage = 1;
          let totalItems = 0;
          let allItems = [];

          // 데이터 필터링
          const filterData = () => {
              allItems = [];

              // 모든 카테고리와 키워드에 대해 데이터를 수집
              data.categories.forEach(category => {
                  category.subcategories.forEach(subcategory => {
                      subcategory.items.forEach(item => {
                          allItems.push({
                              guide: category.guide,
                              keyword: subcategory.keyword,
                              ...item
                          });
                      });
                  });
              });

              totalItems = allItems.length;
          };

          // 현재 페이지에 맞는 카드들을 렌더링
          const renderCards = () => {
              let cardHTML = '';
              const startIndex = (currentPage - 1) * itemsPerPage;
              const endIndex = startIndex + itemsPerPage;
              const itemsToShow = allItems.slice(startIndex, endIndex);

              itemsToShow.forEach((item, index) => {
                  cardHTML += `
                  <div class="guide_card" onclick="window.location.href='#'">
                      <p class="horse_head">${item.guide}</p>
                      <p class="keyword">${item.keyword}</p>
                      <p class="guide_title">${item.title}</p>
                      <p class="author">${item.author}</p>
                      <p class="date">${item.date}</p>
                  </div>`;
              });

              document.querySelector('#cardList').innerHTML = cardHTML;
          };

          // 페이지네이션 버튼 렌더링
          const renderPagination = () => {
              const totalPages = Math.ceil(totalItems / itemsPerPage);
              let paginationHTML = '';

              paginationHTML += `<button class="pagination_button_1" ${currentPage === 1 ? 'disabled' : ''}>이전</button>`;

              for (let i = 1; i <= totalPages; i++) {
                  paginationHTML += `<button class="pagination_button ${currentPage === i ? 'active' : ''}" ${currentPage === i ? 'disabled' : ''}>${i}</button>`;
              }

              paginationHTML += `<button class="pagination_button_2" ${currentPage === totalPages ? 'disabled' : ''}>다음</button>`;

              document.querySelector('.pagination_section div').innerHTML = paginationHTML;
          };

          // 페이지 이동
          const goToPage = (page) => {
              currentPage = page;
              renderCards();
              renderPagination();
          };

          // 초기 데이터 필터링 및 첫 페이지 렌더링
          filterData();
          renderCards();
          renderPagination();

          // 페이지네이션 버튼 클릭 이벤트
          document.querySelector('.pagination_section').addEventListener('click', (e) => {
              if (e.target.classList.contains('pagination_button')) {
                  const page = parseInt(e.target.textContent);
                  goToPage(page);
              } else if (e.target.classList.contains('pagination_button_1')) {
                  goToPage(currentPage - 1);
              } else if (e.target.classList.contains('pagination_button_2')) {
                  goToPage(currentPage + 1);
              }
          });
      })
      .catch((error) => {
          console.log('Error:', error);
      });
};
