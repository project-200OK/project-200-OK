// 다른 페이지에서 무슨 가이드를 눌렀는지 가져오는값
let guideIndex = 0;

// 처음 뿌려줄 값
window.onload = () => {
  axios.get('http://localhost:5500/guide/json/guides.json')
  .then((res) => {
    let keywordsHTML = '';
    let cardHTML = '';
    let data = res.data;
    let guideName = data.categories[guideIndex].guide;

    document.getElementById('guideName').innerText = guideName;

    // 클릭한 가이드의 키워드들 가져오기
    for(let i = 0; i < data.categories[guideIndex].subcategories.length; i++){
      keywordsHTML += `
<div class="keywordBox" onclick="getKeyword(this)">${data.categories[guideIndex].subcategories[i].keyword}</div>`;
    }

    // 초기 카드 내용은 
    // 클릭한 가이드의 첫번째 키워드의 내용들
    for(let i = 0; i < data.categories[guideIndex].subcategories[0].items.length; i++){
      cardHTML += `
<div class="guideCard">
  <p class="guideCardName">${data.categories[guideIndex].guide}</p>
  <p class="guideCardKeyword">${data.categories[guideIndex].subcategories[0].keyword}</p>
  <p class="guideCardTitle">${data.categories[guideIndex].subcategories[0].items[i].title}</p>
  <p class="guideCardAuthor">${data.categories[guideIndex].subcategories[0].items[i].author}</p>
  <p class="guideCardDate">${data.categories[guideIndex].subcategories[0].items[i].date}</p>
  <span>
    <img
      src="/images/icnos/emptyLike.png"
      alt="좋아요"
      class="guideCardLike"
      onclick="setLike(this)"
      />
  </span>
</div>`;
    }
    document.querySelector('#keywordList').innerHTML = keywordsHTML;
    document.querySelector('#guideCardList').innerHTML = cardHTML;
  })
  .catch((error) => {
    console.log('error : ' + error);
  });
}

// 키워드를 클릭했을때
function getKeyword(object) {
  axios.get('http://localhost:5500/guide/json/guides.json')
  .then((res) => {
    let guideCardHTML = '';
    let data = res.data;
    let nowKeyword = object.innerText;
    let nowIndex = 0;

    // 클릭한 키워드 판별
    for(let i = 0; i < data.categories[guideIndex].subcategories.length; i++){
      if(data.categories[guideIndex].subcategories[i].keyword == nowKeyword){
        nowIndex = i;
        break;
      }
    }

    // 해당 키워드의 내용으로 카드 갱신
    for(let i = 0; i < data.categories[guideIndex].subcategories[nowIndex].items.length; i++){
      guideCardHTML += `
<div class="guideCard">
  <p class="guideCardName">${data.categories[guideIndex].guide}</p>
  <p class="guideCardKeyword">${data.categories[guideIndex].subcategories[nowIndex].keyword}</p>
  <p class="guideCardTitle">${data.categories[guideIndex].subcategories[nowIndex].items[i].title}</p>
  <p class="guideCardAuthor">${data.categories[guideIndex].subcategories[nowIndex].items[i].author}</p>
  <p class="guideCardDate">${data.categories[guideIndex].subcategories[nowIndex].items[i].date}</p>
  <span>
    <img
      src="/images/icnos/emptyLike.png"
      alt="좋아요"
      class="guideCardLike"
      onclick="setLike(this)"
      />
  </span>
</div>`;
    }
    document.querySelector('#guideCardList').innerHTML = guideCardHTML;
  })
  .catch((error) => {
    console.log('error : ' + error);
  });
}

// 좋아요 버튼을 클릭했을때
/**
 * JSON 파일값을 axios로 가져와서
 * 자바스크립트에서 사용할수는 있지만 
 * 역으로 자바스크립트의 수정내용을
 * JSON 파일에 반영하는 방법 몰라유ㅠ
 * 그래서 좋아요 기능은 
 * 빨간하트 빈하트 변경하는 로직까지만 구현..
 */
function setLike(object) {
  // 빈 하트면 빨간하트로
  if(object.src.length == 48) {
    object.src = "/images/icnos/redLike.png";
  } 
  // 빨간하트면 빈 하트로
  else {
    object.src = "/images/icnos/emptyLike.png";
  }
}