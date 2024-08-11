// 상수 및 변수 설정
const COUNT_PER_PAGE = 10; // 한 페이지에 표시할 항목 수
let posts = []; // 게시물 데이터
let guides = []; // 가이드 데이터
let currentPostPage = 1; // 현재 게시물 페이지
let currentGuidePage = 1; // 현재 가이드 페이지
let keyword = ''; // 필터링할 키워드

// 전체 목록 수를 저장할 변수 추가
let totalPostCount = 0;
let totalGuideCount = 0;

// 페이지네이션 버튼 생성 함수
const setPageButtons = (totalPages, containerId, pageType) => {
  const container = document.querySelector(containerId);
  container.innerHTML = ''; // 페이지 번호 wrapper 내부를 비워줌

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('span');
    button.className = 'number_button';
    button.innerText = i;
    button.addEventListener('click', () => {
      if (pageType === 'post') {
        currentPostPage = i;
        showPosts(i);
      } else if (pageType === 'guide') {
        currentGuidePage = i;
        showGuides(i);
      }
    });
    if ((pageType === 'post' && i === currentPostPage) || (pageType === 'guide' && i === currentGuidePage)) {
      button.classList.add('active'); // 현재 페이지 표시
    }
    container.appendChild(button);
  }
};

// 게시물 데이터를 페이지네이션하여 표시하는 함수
const showPosts = (page) => {
  const filteredPosts = posts.filter(post => post.keyword.includes(keyword));
  totalPostCount = filteredPosts.length; // 전체 게시물 수 저장
  const start = (page - 1) * COUNT_PER_PAGE;
  const end = start + COUNT_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(start, end);

  let postHTML = '';
  for (const post of paginatedPosts) {
    postHTML += `
    <a href="/community/detail.html">
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
  }

  document.querySelector('#postCount').innerText = totalPostCount;
  document.querySelector('#postList').innerHTML = postHTML;
  setPageButtons(Math.ceil(totalPostCount / COUNT_PER_PAGE), '.number_button_box', 'post');
};

// 가이드 데이터를 페이지네이션하여 표시하는 함수
const showGuides = (page) => {
  const filteredGuides = guides.filter(guide => guide.keyword.includes(keyword));
  totalGuideCount = filteredGuides.length; // 전체 가이드 수 저장
  const start = (page - 1) * COUNT_PER_PAGE;
  const end = start + COUNT_PER_PAGE;
  const paginatedGuides = filteredGuides.slice(start, end);

  let guideHTML = '';
  for (const guide of paginatedGuides) {
    guideHTML += `
    <a href="/community/board.html">
      <div class="guide_list_form">
        <div class="guide_content_box">
          <div class="guide_title_box">
            <div class="guide_headline">${guide.headline}</div>
            <div class="guide_title">${guide.title}</div>
          </div>
          <div class="guide_info_box">
            <div class="guide_writer">${guide.author}</div>
            <div class="guide_date">${guide.date}</div>
          </div>
        </div>
        <div class="guide_keyword_box">
          <div class="guide_keyword">${guide.keyword}</div>
        </div>
      </div>
      <div class="guide_line"></div>
    </a>`;
  }

  document.querySelector('#guideCount').innerText = totalGuideCount;
  document.querySelector('#guideList').innerHTML = guideHTML;
  setPageButtons(Math.ceil(totalGuideCount / COUNT_PER_PAGE), '.number_button_box', 'guide');
};

// 데이터 로드 및 페이지네이션 설정
window.onload = () => {
  // URL에서 쿼리 파라미터 추출
  const urlParams = new URLSearchParams(window.location.search);
  keyword = urlParams.get('keyword') || '';

  // 게시물 내용
  axios.get('http://localhost:5500/search/json/searchPost.json')
    .then((res) => {
      posts = res.data;
      showPosts(currentPostPage); // 초기 페이지 로드
    })
    .catch((error) => {
      console.log('error 발생 : ' + error);
    });

  // 가이드 내용
  axios.get('http://localhost:5500/guide/json/guides.json')
    .then((res) => {
      guides = res.data.categories.flatMap(cat =>
        cat.subcategories.flatMap(subcat => subcat.items.map(item => ({
          ...item,
          headline: cat.guide,
          keyword: subcat.keyword
        })))
      );
      showGuides(currentGuidePage); // 초기 페이지 로드
    })
    .catch((error) => {
      console.log('error 발생 : ' + error);
    });
};

// 버튼 클릭 이벤트
document.addEventListener('DOMContentLoaded', () => {
  const textPostButton = document.getElementById('textPost');
  const textGuideButton = document.getElementById('textGuide');
  const postSection = document.getElementById('postSection');
  const guideSection = document.getElementById('guideSection');

  textPostButton.addEventListener('click', () => {
    postSection.style.display = 'block';
    guideSection.style.display = 'none';
    showPosts(currentPostPage); // 게시물 페이지 로드
  });

  textGuideButton.addEventListener('click', () => {
    postSection.style.display = 'none';
    guideSection.style.display = 'block';
    showGuides(currentGuidePage); // 가이드 페이지 로드
  });
});