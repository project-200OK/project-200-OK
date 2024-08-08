const urlParams = new URLSearchParams(window.location.search);
const guideIndex = urlParams.get('guideIndex');
const keywordIndex = urlParams.get('keywordIndex');


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
    for(let i = 0; i < data.categories[guideIndex].subcategories[nowIndex].items.length; i++){
      cardHTML += `
<div class="guideCard">
  <div class="guideCardTop" onclick='sendParam(guideIndex, nowIndex)'>
    <div class="guideCardName">${data.categories[guideIndex].guide}</div>
    <div class="guideCardKeyword">${data.categories[guideIndex].subcategories[nowIndex].keyword}</div>
    <div class="guideCardTitle">${data.categories[guideIndex].subcategories[nowIndex].items[i].title}</div>
  </div>
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
    document.querySelector('#keywordList').innerHTML = keywordsHTML;
    document.querySelector('#guideCardList').innerHTML = cardHTML;
  })
  .catch((error) => {
    console.log('error : ' + error);
  });
}