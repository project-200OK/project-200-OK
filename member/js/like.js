document.addEventListener("DOMContentLoaded", () => {
    const guideCardList = document.getElementById("guideCardList");
    const itemsPerPage = 16;
    let currentPage = 1;
    let allItems = [];

    axios.get('http://localhost:5500/member/json/like.json')
        .then((response) => {
            const data = response.data;
            filterData(data);
            renderCards();
            renderPagination();
        })
        .catch((error) => {
            console.error("Error loading JSON:", error);
        });

    function filterData(data) {
        allItems = [];
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
    }

    function renderCards() {
        let cardHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToShow = allItems.slice(startIndex, endIndex);

        itemsToShow.forEach(item => {
            cardHTML += `
            <div class="guide_card">
                <div class="guide_card_top">
                    <p class="horse_head">${item.guide}</p>
                    <p class="keyword">${item.keyword}</p>
                </div>
                <div class="guide_title">${item.title}</div>
                <div class="author">${item.author}</div>
                <div class="date">${item.date}</div>
                <img src="/images/icons/redLike.png" alt="좋아요" class="like_icon" onclick="removeCard(this)">
            </div>`;
        });

        guideCardList.innerHTML = cardHTML;
    }

    function renderPagination() {
        const totalPages = Math.ceil(allItems.length / itemsPerPage);
        let paginationHTML = '';

        paginationHTML += `<button class="pagination_button_1" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">이전</button>`;

        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `<button class="pagination_button ${currentPage === i ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        }

        paginationHTML += `<button class="pagination_button_2" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">다음</button>`;

        document.getElementById('paginationContainer').innerHTML = paginationHTML;
    }

    window.goToPage = function(page) {
        if (page >= 1 && page <= Math.ceil(allItems.length / itemsPerPage)) {
            currentPage = page;
            renderCards();
            renderPagination();
        }
    }

    window.removeCard = function(element) {
        const card = element.closest(".guide_card");
        card.remove();
    }

    window.showTab = function(tab) {
        const guideTab = document.getElementById("guideTab");
        const postTab = document.getElementById("postTab");
        const guideSection = document.getElementById("guideSection");
        const postSection = document.getElementById("postSection");

        if (tab === 'guide') {
            guideTab.classList.add("active");
            postTab.classList.remove("active");
            guideSection.classList.remove("hidden");
            postSection.classList.add("hidden");
        } else if (tab === 'post') {
            guideTab.classList.remove("active");
            postTab.classList.add("active");
            guideSection.classList.add("hidden");
            postSection.classList.remove("hidden");
        }
    }
});
