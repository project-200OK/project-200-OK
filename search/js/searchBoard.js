window.onload = ()=>{
  // 게시물 내용
  axios.get('http://localhost:5500/search/json/searchPost.json')
  .then((res)=>{
    let posts = res.data
    let postHTML = '';
    let postCount = 0;
  for(let i = 0; i < posts.length; i++) {
    let post = posts[i];
    postHTML +=  `
    <a href="/community/board.html">
      <div class="post_list_form">
        <div class="post_content_box">
          <div class="post_title_box">
            <div class="post_headline">${post.headline}</div>
            <div class="post_title">${post.title}</div>
          </div>
          <div class="post_info_box">
            <div class="post_writer">${post.writer}</div>
            <div class="post_date">${post.date}</div>
            <div class="post_view">${post.view}</div>
          </div>
        </div>
        <div class="post_keyword_box">
          <div class="post_keyword">${post.keyword}</div>
        </div>
      </div>
      <div class="post_line"></div>
    </a>`;
    
    postCount++
  }
  document.querySelector('#postList').innerHTML = postHTML;
  document.querySelector('#postCount').innerHTML = postCount;
  })
  .catch((error)=>{
    console.log('error 발생 : ' + error)
  });

  // 가이드 내용
  axios.get('http://localhost:5500/guide/json/guides.json')
  .then((res)=>{
    const guides = res.data
    let guideCount = 0;
    let guideHTML = '';
    let guideIndex = '';
    let keywordIndex = '';
  for(let i = 0; i < guides.categories.length; i++) {
    for(let j = 0; j < guides.categories[i].subcategories.length; j++) {
      if(guides.categories[i].subcategories[j].keyword == '자취') {
        guideIndex = i;
        keywordIndex = j;
        break;
      }
    }

    for(let i = 0; i < guides.categories[guideIndex].subcategories[keywordIndex].items.length; i++) {
      guideHTML +=  `
        <a href="/community/board.html">
          <div class="guide_list_form">
            <div class="guide_content_box">
              <div class="guide_title_box">
                <div class="guide_headline">${guides.categories[guideIndex].guide}</div>
                <div class="guide_title">${guides.categories[guideIndex].subcategories[keywordIndex].items[i].title}</div>
              </div>
              <div class="guide_info_box">
                <div class="guide_writer">${guides.categories[guideIndex].subcategories[keywordIndex].items[i].author}</div>
                <div class="guide_date">${guides.categories[guideIndex].subcategories[keywordIndex].items[i].date}</div>
              </div>
            </div>
            <div class="guide_keyword_box">
              <div class="guide_keyword">${guides.categories[guideIndex].subcategories[keywordIndex].keyword}</div>
            </div>
          </div>
          <div class="guide_line"></div>
        </a>`;
    
    guideCount++
  }
}
document.querySelector('#guideList').innerHTML = guideHTML;
  document.querySelector('#guideCount').innerHTML = guideCount;
  })
  .catch((error)=>{
    console.log('error 발생 : ' + error)
  });

  // 페이지네이션 설정
  const itemsPerPage = 5;
  let currentPostPage = 1;
  let currentGuidePage = 1;
  let posts = [];
  let guides = [];

  function renderItems(items, listContainerId, paginationContainerId, currentPage, renderItemCallback) {
    const listContainer = document.querySelector(listContainerId);
    const paginationContainer = document.querySelector(paginationContainerId);
    listContainer.innerHTML = '';
    paginationContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    currentItems.forEach(item => {
      listContainer.innerHTML += renderItemCallback(item);
    });

    const pageCount = Math.ceil(items.length / itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
      const pageButton = document.createElement('button');
      pageButton.innerText = i;
      pageButton.classList.add('page-button');
      if (i === currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', () => {
        if (listContainerId === '#postList') {
          currentPostPage = i;
          renderItems(posts, '#postList', '#postPagination', currentPostPage, renderPost);
        } else {
          currentGuidePage = i;
          renderItems(guides, '#guideList', '#guidePagination', currentGuidePage, renderGuide);
        }
      });
      paginationContainer.appendChild(pageButton);
    }
  }
};



document.addEventListener('DOMContentLoaded', () => {
  const textPostButton = document.getElementById('textPost');
  const textGuideButton = document.getElementById('textGuide');
  const postSection = document.getElementById('postSection');
  const guideSection = document.getElementById('guideSection');

  textPostButton.addEventListener('click', () => {
    postSection.style.display = 'block';
    guideSection.style.display = 'none';
  });

  textGuideButton.addEventListener('click', () => {
    postSection.style.display = 'none';
    guideSection.style.display = 'block';
  });
});
