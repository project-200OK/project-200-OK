// url의 값을 받아옴.
// main의 nav 메뉴에서는 'value' 값만 받아서 이동하기 때문에 
// 'name' 값이 없을 경우 0으로 고정.
// main의 하단 키워드를 클릭했을 경우 'value', 'name' 값 둘다 받아옴.
const params = new URLSearchParams(location.search);

// 무슨 가이드를 클릭했는지
// 0:생활팁, 1:부동산, 2:세금, 3:복지
const guideIndex = params.get('value');
// 무슨 키워드를 클릭했는지
let keywordIndex = params.get('name');

// 키워드로 접근한 게 아닌 가이드를 클릭해서 접근 한 경우
// (내비바 가이드 서브메뉴, 홈화면 가이드 카드 클릭 시)
if(params.get('name') == undefined){
  window.onload = () => {
    axios.get('http://localhost:5500/json/guide.json')
    .then((res) => {
      // 키워드 박스 생성을 위한 html 변수
      let keywordsHTML = '';
      // 카드 박스 생성을 위한 html 변수
      let cardHTML = '';
      let data = res.data;
      const guideName = data.categories[guideIndex];
      document.title = `${guideName.guide}`;
      document.getElementById('guideName').innerText = guideName.guide;
      
      // 클릭한 가이드의 키워드들 가져오기
      for(let i = 0; i < guideName.subcategories.length; i++){
        keywordsHTML += `
        <div class="keywordBox" onclick="getKeyword(this)">${guideName.subcategories[i].keyword}</div>`;
      }
      
      // 클릭한 가이드의 모든 글
      for(let j = 0; j < guideName.subcategories.length; j++){
        for(let i = 0; i < guideName.subcategories[j].items.length; i++){
          // 좋아요 여부 가져오기
          let isLike = (guideName.subcategories[j].items[i].like == "1") ? "/images/icons/redLike.png" : "/images/icons/emptyLike.png";
          
          cardHTML += `
          <div class="guideCard">
          <div class="guideCardTop" onclick='sendParam(this, guideIndex)'>
          <input class="index" type="hidden" value=${i}></input>
          <input class="index2" type="hidden" value=${j}></input>
          <div class="guideCardName">${guideName.guide}</div>
          <div class="guideCardKeyword">${guideName.subcategories[j].keyword}</div>
          <div class="guideCardTitle">${guideName.subcategories[j].items[i].title}</div>
          </div>
          <p class="guideCardDate">${guideName.subcategories[j].items[i].date}</p>
          <span>
          <img
          src=${isLike}
          alt="좋아요"
          class="guideCardLike"
          onclick="setLike(this)"
          />
          </span>
          </div>`;
        }
      }
      document.querySelector('#keywordList').innerHTML = keywordsHTML;
      document.querySelector('#guideCardList').innerHTML = cardHTML;
      })
  }
  // 키워드를 클릭한 경우
} else {
// 해당 키워드의 글만 출력
window.onload = () => {
  axios.get('http://localhost:5500/json/guide.json')
  .then((res) => {
    // 키워드 박스 생성을 위한 html 변수
    let keywordsHTML = '';
    // 카드 박스 생성을 위한 html 변수
    let cardHTML = '';
    let data = res.data;
    const guideName = data.categories[guideIndex];
    const keywordName = guideName.subcategories[keywordIndex];
    document.title = `${guideName.guide}-${keywordName.keyword}`;
    document.getElementById('guideName').innerText = guideName.guide;

    // 클릭한 가이드의 키워드들 가져오기
    for(let i = 0; i < guideName.subcategories.length; i++){
      if(i == keywordIndex){
        keywordsHTML += `
<div class="keywordBox nowKeyword" onclick="getKeyword(this)">${guideName.subcategories[i].keyword}</div>`;
      } else {
        keywordsHTML += `
<div class="keywordBox" onclick="getKeyword(this)">${guideName.subcategories[i].keyword}</div>`;
      }
    }

    // 초기 카드 내용은 
    // 클릭한 가이드의 첫번째 키워드의 내용들
    for(let i = 0; i < keywordName.items.length; i++){
      // 좋아요 여부 가져오기
      let isLike = (keywordName.items[i].like == '1') ? "/images/icons/redLike.png" : "/images/icons/emptyLike.png";
      cardHTML += `
<div class="guideCard">
  <div class="guideCardTop" onclick='sendParam(this, guideIndex)'>
    <input class="index" type="hidden" value=${i}></input>
    <input class="index2" type="hidden" value=${keywordIndex}></input>
    <div class="guideCardName">${guideName.guide}</div>
    <div class="guideCardKeyword">${keywordName.keyword}</div>
    <div class="guideCardTitle">${keywordName.items[i].title}</div>
  </div>
  <p class="guideCardDate">${keywordName.items[i].date}</p>
  <span>
    <img
      src=${isLike}
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
}
}

// 키워드를 클릭했을때
function getKeyword(object) {
  axios.get('http://localhost:5500/json/guide.json')
  .then((res) => {
    let data = res.data;
    const guideName = data.categories[guideIndex];
    let nowKeyword = object.innerText;
    
    // 클릭한 키워드 판별
    for(let i = 0; i < guideName.subcategories.length; i++){
      if(guideName.subcategories[i].keyword == nowKeyword){
        keywordIndex = i;
        break;
      }
    }

    // 해당 가이드, 키워드의 인덱스를 들고 페이지 새로고침
    window.location.href = `board.html?value=${guideIndex}&name=${keywordIndex}`;
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
    object.src = "/images/icons/redLike.png";
  } 
  // 빨간하트면 빈 하트로
  else {
    object.src = "/images/icons/emptyLike.png";
  }
}

// onclick 이벤트로 실행할 함수
// guideIndex, keywordIndex, itemIndex 값을 가지고
// detail.html 페이지로 이동한다.
function sendParam(object, guideIndex) {
  let itemIndex = object.querySelector('.index').value;
  keywordIndex = object.querySelector('.index2').value;
  let setIndex = `guideIndex=${guideIndex}&keywordIndex=${keywordIndex}&itemIndex=${itemIndex}`;
  window.location.href = `detail.html?${setIndex}`;
}