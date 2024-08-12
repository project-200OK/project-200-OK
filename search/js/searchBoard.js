// 상수 및 변수 설정
const COUNT_PER_PAGE = 10; // 한 페이지에 표시할 항목 수
let posts = []; // 게시물 데이터
let guides = []; // 가이드 데이터
let currentPostPage = 1; // 현재 게시물 페이지
let currentGuidePage = 1; // 현재 가이드 페이지
let keyword = ''; // 필터링할 키워드

// 전체 목록 수를 저장할 변수 추가
let totalPostCount = 0; // 전체 게시물 수
let totalGuideCount = 0; // 전체 가이드 수

// 페이지네이션 버튼 생성 함수
const setPageButtons = (totalPages, containerId, pageType) => {
  const container = document.querySelector(containerId); // 페이지 버튼을 추가할 컨테이너 선택
  container.innerHTML = ''; // 기존 버튼들 제거

  // 페이지 버튼 생성
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('span'); // 새로운 페이지 버튼 요소 생성
    button.className = 'number_button'; // 버튼의 클래스 설정
    button.innerText = i; // 버튼 텍스트 설정 (페이지 번호)
    button.addEventListener('click', () => { // 버튼 클릭 시 페이지 변경
      if (pageType === 'post') {
        currentPostPage = i;
        showPosts(i); // 게시물 페이지 로드
      } else if (pageType === 'guide') {
        currentGuidePage = i;
        showGuides(i); // 가이드 페이지 로드
      }
    });
    // 현재 페이지에 해당하는 버튼에 'active' 클래스 추가
    if ((pageType === 'post' && i === currentPostPage) || (pageType === 'guide' && i === currentGuidePage)) {
      button.classList.add('active');
    }
    container.appendChild(button); // 버튼을 컨테이너에 추가
  }
};

// 게시물 데이터를 페이지네이션하여 표시하는 함수
const showPosts = (page) => {
  // 키워드에 따라 게시물 필터링
  const filteredPosts = posts.filter(post => post.keyword.includes(keyword));
  totalPostCount = filteredPosts.length; // 전체 게시물 수 업데이트
  const start = (page - 1) * COUNT_PER_PAGE; // 현재 페이지에서 시작 인덱스 계산
  const end = start + COUNT_PER_PAGE; // 현재 페이지에서 끝 인덱스 계산
  const paginatedPosts = filteredPosts.slice(start, end); // 페이지에 해당하는 게시물 추출

  // 페이지 번호 조정 (페이지가 1보다 작거나 총 페이지 수를 초과하면 페이지를 1로 설정)
  if (totalPostCount === 0) {
    currentPostPage = 1;
  } else if (page < 1 || page > Math.ceil(totalPostCount / COUNT_PER_PAGE)) {
    currentPostPage = 1;
  } else {
    currentPostPage = page;
  }

  // 게시물 HTML 생성
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

  // 게시물 수와 게시물 목록 업데이트
  document.querySelector('#postCount').innerText = totalPostCount;
  document.querySelector('#postList').innerHTML = postHTML;
  setPageButtons(Math.ceil(totalPostCount / COUNT_PER_PAGE), '.number_button_box', 'post'); // 페이지 버튼 설정
};

// 가이드 데이터를 페이지네이션하여 표시하는 함수
const showGuides = (page) => {
  // 키워드에 따라 가이드 필터링
  const filteredGuides = guides.filter(guide => guide.keyword.includes(keyword));
  totalGuideCount = filteredGuides.length; // 전체 가이드 수 업데이트
  const start = (page - 1) * COUNT_PER_PAGE; // 현재 페이지에서 시작 인덱스 계산
  const end = start + COUNT_PER_PAGE; // 현재 페이지에서 끝 인덱스 계산
  const paginatedGuides = filteredGuides.slice(start, end); // 페이지에 해당하는 가이드 추출

  // 페이지 번호 조정 (페이지가 1보다 작거나 총 페이지 수를 초과하면 페이지를 1로 설정)
  if (totalGuideCount === 0) {
    currentGuidePage = 1;
  } else if (page < 1 || page > Math.ceil(totalGuideCount / COUNT_PER_PAGE)) {
    currentGuidePage = 1;
  } else {
    currentGuidePage = page;
  }

  // 가이드 HTML 생성
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

  // 가이드 수와 가이드 목록 업데이트
  document.querySelector('#guideCount').innerText = totalGuideCount;
  document.querySelector('#guideList').innerHTML = guideHTML;
  setPageButtons(Math.ceil(totalGuideCount / COUNT_PER_PAGE), '.number_button_box', 'guide'); // 페이지 버튼 설정
};

// 데이터 로드 및 페이지네이션 설정
window.onload = () => {
  // URL에서 쿼리 파라미터 추출
  const urlParams = new URLSearchParams(window.location.search);
  keyword = urlParams.get('keyword') || ''; // 쿼리 파라미터에서 'keyword' 값을 가져옴

  // 게시물 내용 로드
  axios.get('http://localhost:5500/search/json/searchPost.json')
    .then((res) => {
      posts = res.data; // 게시물 데이터 저장
      showPosts(currentPostPage); // 초기 페이지 로드
    })
    .catch((error) => {
      console.log('error 발생 : ' + error); // 오류 발생 시 콘솔에 오류 출력
    });

  // 가이드 내용 로드
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
      console.log('error 발생 : ' + error); // 오류 발생 시 콘솔에 오류 출력
    });
};

// 버튼 클릭 이벤트
document.addEventListener('DOMContentLoaded', () => {
  const textPostButton = document.getElementById('textPost'); // 게시물 탭 버튼 선택
  const textGuideButton = document.getElementById('textGuide'); // 가이드 탭 버튼 선택
  const postSection = document.getElementById('postSection'); // 게시물 섹션 선택
  const guideSection = document.getElementById('guideSection'); // 가이드 섹션 선택

  // 게시물 버튼 클릭 시 게시물 섹션 표시 및 가이드 섹션 숨기기
  textPostButton.addEventListener('click', () => {
    postSection.style.display = 'block';
    guideSection.style.display = 'none';
    showPosts(currentPostPage); // 게시물 페이지 로드
  });

  // 가이드 버튼 클릭 시 가이드 섹션 표시 및 게시물 섹션 숨기기
  textGuideButton.addEventListener('click', () => {
    postSection.style.display = 'none';
    guideSection.style.display = 'block';
    showGuides(currentGuidePage); // 가이드 페이지 로드
  });

// 이전 버튼 클릭 시 페이지 변경
const prevButton = document.getElementById('prevButton');
prevButton.addEventListener('click', () => {
  if (postSection.style.display === 'block') {
    // 게시물 섹션이 보일 때
    if (currentPostPage > 1) { // 현재 페이지가 1보다 크면
      currentPostPage--; // 페이지 번호를 1 줄임
      showPosts(currentPostPage); // 변경된 페이지의 게시물 표시
    }
  } else if (guideSection.style.display === 'block') {
    // 가이드 섹션이 보일 때
    if (currentGuidePage > 1) { // 현재 페이지가 1보다 크면
      currentGuidePage--; // 페이지 번호를 1 줄임
      showGuides(currentGuidePage); // 변경된 페이지의 가이드 표시
    }
  }
});

// 다음 버튼 클릭 시 페이지 변경
const nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', () => {
  let maxPages; // 최대 페이지 수를 저장할 변수
  
  if (postSection.style.display === 'block') {
    // 게시물 섹션이 보일 때
    maxPages = Math.ceil(totalPostCount / COUNT_PER_PAGE); // 최대 페이지 수 계산
    if (currentPostPage < maxPages) { // 현재 페이지가 최대 페이지 수보다 작으면
      currentPostPage++; // 페이지 번호를 1 올림
      showPosts(currentPostPage); // 변경된 페이지의 게시물 표시
    }
  } else if (guideSection.style.display === 'block') {
    // 가이드 섹션이 보일 때
    maxPages = Math.ceil(totalGuideCount / COUNT_PER_PAGE); // 최대 페이지 수 계산
    if (currentGuidePage < maxPages) { // 현재 페이지가 최대 페이지 수보다 작으면
      currentGuidePage++; // 페이지 번호를 1 올림
      showGuides(currentGuidePage); // 변경된 페이지의 가이드 표시
    }
  }
});
});