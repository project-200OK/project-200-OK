// 다른 페이지에서 무슨 가이드를 눌렀는지 가져오는값
let guideIndex = 0;
let keywordIndex = 0;
let itemIndex = 0;

window.onload = ()=>{
  // 게시물 내용
  axios.get('http://localhost:5500/search/json/searchBoard.json')
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
          <div class="post_keyword">청년 주택</div>
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
