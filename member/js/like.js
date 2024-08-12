document.addEventListener("DOMContentLoaded", () => {
    const guideCardList = document.getElementById("guideCardList");
    const boardList = document.getElementById("board-list");
    const guidePagination = document.getElementById("guide-pagination");
    const postPagination = document.getElementById("post-pagination");

    const guideTab = document.getElementById("guideTab");
    const postTab = document.getElementById("postTab");

    const guideItemsPerPage = 16;  // 가이드의 페이지당 아이템 수
    const postItemsPerPage = 15;   // 게시물의 페이지당 아이템 수
    let currentGuidePage = 1;
    let currentPostPage = 1;
    let allItems = [];
    let allPosts = [];

    // Load guide data
    axios.get('http://localhost:5500/json/guide.json')
        .then((response) => {
            const data = response.data;
            filterGuideData(data);
            renderGuideCards();
            renderGuidePagination();
            guideTab.textContent = `가이드 (${allItems.length})`; // 가이드 갯수 표시
        })
        .catch((error) => {
            console.error("Error loading JSON:", error);
        });

    // Load post data
    axios.get('http://localhost:5500/json/community.json')
        .then((response) => {
            allPosts = response.data.posts;
            renderPosts(currentPostPage);
            renderPostPagination();
            postTab.textContent = `게시물 (${allPosts.length})`; // 게시물 갯수 표시
        })
        .catch((error) => {
            console.error("Error loading JSON:", error);
        });

    function filterGuideData(data) {
        allItems = [];
        data.categories.forEach((category, guideIndex) => {
            category.subcategories.forEach((subcategory, keywordIndex) => {
                subcategory.items.forEach((item, itemIndex) => {
                    if (item.like === "1") { // like 값이 1인 항목만 추가
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

    function renderGuideCards() {
        let cardHTML = '';
        const startIndex = (currentGuidePage - 1) * guideItemsPerPage;
        const endIndex = startIndex + guideItemsPerPage;
        const itemsToShow = allItems.slice(startIndex, endIndex);

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
                <img src="/images/icons/redLike.png" alt="좋아요" class="like_icon" onclick="removeCard(this, event)">
                <div class="clickable-area" onclick="window.location.href='${detailUrl}'"></div> <!-- 클릭 가능한 영역 -->
            </div>`;
        });

        guideCardList.innerHTML = cardHTML;
    }

    function renderPosts(page) {
        boardList.innerHTML = `
            <div class="board-header">
                <span class="col-category">카테고리</span>
                <span class="col-title ta-center">제목</span>
                <span class="col-author">작성자</span>
                <span class="col-date">작성일</span>
            </div>
        `;

        const start = (page - 1) * postItemsPerPage;
        const end = start + postItemsPerPage;
        const paginatedPosts = allPosts.slice(start, end);

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

    function renderGuidePagination() {
        guidePagination.innerHTML = "";
        const totalPages = Math.ceil(allItems.length / guideItemsPerPage);

        const createPageButton = (pageNumber) => {
            const pageButton = document.createElement("button");
            pageButton.textContent = pageNumber;
            pageButton.className = pageNumber === currentGuidePage ? "active" : "";
            pageButton.addEventListener("click", () => {
                currentGuidePage = pageNumber;
                renderGuideCards();
                renderGuidePagination(); // Update pagination styling
            });
            guidePagination.appendChild(pageButton);
        };

        const prevButton = document.createElement("button");
        prevButton.textContent = "이전";
        prevButton.disabled = currentGuidePage === 1;
        prevButton.addEventListener("click", () => {
            if (currentGuidePage > 1) {
                currentGuidePage--;
                renderGuideCards();
                renderGuidePagination(); // Update pagination styling
            }
        });
        guidePagination.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            createPageButton(i);
        }

        const nextButton = document.createElement("button");
        nextButton.textContent = "다음";
        nextButton.disabled = currentGuidePage === totalPages;
        nextButton.addEventListener("click", () => {
            if (currentGuidePage < totalPages) {
                currentGuidePage++;
                renderGuideCards();
                renderGuidePagination(); // Update pagination styling
            }
        });
        guidePagination.appendChild(nextButton);
    }

    function renderPostPagination() {
        postPagination.innerHTML = "";
        const totalPages = Math.ceil(allPosts.length / postItemsPerPage);

        const createPageButton = (pageNumber) => {
            const pageButton = document.createElement("button");
            pageButton.textContent = pageNumber;
            pageButton.className = pageNumber === currentPostPage ? "active" : "";
            pageButton.addEventListener("click", () => {
                currentPostPage = pageNumber;
                renderPosts(currentPostPage);
                renderPostPagination(); // Update pagination styling
            });
            postPagination.appendChild(pageButton);
        };

        const prevButton = document.createElement("button");
        prevButton.textContent = "이전";
        prevButton.disabled = currentPostPage === 1;
        prevButton.addEventListener("click", () => {
            if (currentPostPage > 1) {
                currentPostPage--;
                renderPosts(currentPostPage);
                renderPostPagination(); // Update pagination styling
            }
        });
        postPagination.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            createPageButton(i);
        }

        const nextButton = document.createElement("button");
        nextButton.textContent = "다음";
        nextButton.disabled = currentPostPage === totalPages;
        nextButton.addEventListener("click", () => {
            if (currentPostPage < totalPages) {
                currentPostPage++;
                renderPosts(currentPostPage);
                renderPostPagination(); // Update pagination styling
            }
        });
        postPagination.appendChild(nextButton);
    }

    window.showTab = (tab) => {
        if (tab === 'guide') {
            guideTab.classList.add("active");
            postTab.classList.remove("active");
            document.getElementById("guideSection").classList.remove("hidden");
            document.getElementById("postSection").classList.add("hidden");
            renderGuideCards();
            renderGuidePagination();
        } else if (tab === 'post') {
            guideTab.classList.remove("active");
            postTab.classList.add("active");
            document.getElementById("guideSection").classList.add("hidden");
            document.getElementById("postSection").classList.remove("hidden");
            renderPosts(currentPostPage);
            renderPostPagination();
        }
    };
});
