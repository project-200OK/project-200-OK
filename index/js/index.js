window.onload = ()=>{
  // 배너 이미지
  axios.get('http://localhost:5500/index/json/bannerIndex.json')
  .then((res)=>{
    let banners = res.data
    let bannerHTML = '';
  for(let i = 0; i < banners.length; i++) {
    let banner = banners[i];
    bannerHTML +=  `
    <div class="banner"><img class="banner_img" src="${banner.imageUrl}" alt="배너"></div>`;
  }
  document.querySelector('#bannerList').innerHTML = bannerHTML;
  })
  .catch((error)=>{
    console.log('error 발생 : ' + error)
  });

    
  // 가이드 카드
  axios.get('http://localhost:5500/index/json/guideIndex.json')
  .then((res)=>{
    let guides = res.data
    let guideHTML = '';
  for(let i = 0; i < guides.length; i++) {
    let guide = guides[i];
    guideHTML +=  `
    <div class="guide_card">
      <a href="${guide.url}">
        <img class="guide_img" src="${guide.imgUrl}" alt="${guide.imgName}">
        <div class="guide_list_text">${guide.name}</div>
      </a>
    </div>`;
  }
  document.querySelector('.guide_list').innerHTML = guideHTML;
  })
  .catch((error)=>{
    console.log('error 발생 : ' + error)
  });


  // 키워드
  axios.get('http://localhost:5500/index/json/keywordIndex.json')
  .then((res)=>{
    let keywords = res.data
    let keywordHTML = '';
  for(let i = 0; i < keywords.length; i++) {
    let keyword = keywords[i];
    keywordHTML +=  `
    <div>
        <a href="${keyword.url}?value=${keyword.headline}&name=${keyword.number}">
            <div class="keyword_box">${keyword.name}</div>
        </a>
    </div>`;
  }
  document.querySelector('.keyword_list').innerHTML = keywordHTML;
  })
  .catch((error)=>{
    console.log('error 발생 : ' + error)
  });

  // 키워드 리스트 길이 조절
  const keywordList = document.querySelector('.keyword_list');
  const main = document.querySelector('.main');
 document.querySelector('.keyword_arrow').addEventListener('click', () => {
  const isCollapsed = document.querySelector('.keyword_arrow').textContent === 'v';
  if (!isCollapsed) {

    keywordList.style.height = '170px';
    main.style.height = '1200px'
    document.querySelector('.keyword_arrow').textContent = 'v';
  } else {
    keywordList.style.height = '450px';
    main.style.height = '1470px'
    document.querySelector('.keyword_arrow').textContent = '^';

  }
});
};



