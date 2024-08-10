// url 에서 가이드, 키워드, 아이템의 index 받아오기
const detailParams = new URLSearchParams(location.search);
const guideIndex = detailParams.get('guideIndex');
const keywordIndex = detailParams.get('keywordIndex');
let itemIndex = detailParams.get('itemIndex');
let itemLength = 0;

// json 에서 값 받아와서 출력
window.onload = () => {
  axios.get('http://localhost:5500/guide/json/guides.json')
  .then((res) => {
    const data = res.data;
    const guideName = data.categories[guideIndex].guide;
    const keywordName = data.categories[guideIndex].subcategories[keywordIndex].keyword;
    const itemName = data.categories[guideIndex].subcategories[keywordIndex].items[itemIndex].title;
    const content = data.categories[guideIndex].subcategories[keywordIndex].items[itemIndex].content;
    const summary = data.categories[guideIndex].subcategories[keywordIndex].items[itemIndex].summary;
    const imgurl = data.categories[guideIndex].subcategories[keywordIndex].items[itemIndex].imgUrl;
    const sourceurl = data.categories[guideIndex].subcategories[keywordIndex].items[itemIndex].link;
    itemLength = data.categories[guideIndex].subcategories[keywordIndex].items.length;

    document.getElementById('guideName').innerText = guideName;
    document.getElementById('cardTitle').innerText = itemName;
    document.getElementById('root').innerText = `${guideName} > ${keywordName} > ${itemName}`
    document.getElementById('summary').innerHTML = `핵심요약 <br>${summary}`;
    document.getElementById('mainText').innerHTML = content;
    
    if(imgurl !== 'none'){
      document.getElementById('imgs').src = imgurl;
      console.log('success');
    }
    
    document.getElementById('source').src = sourceurl;
    
  })
  .catch((error) => {
    console.log('error : ' + error);
  });
}

// 좋아요 기능
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

// 무슨 버튼 눌린지 파악 후 기능 구현하는 함수
function buttonWorks(object){
  // id 값은 prev, next, list 가 있음
  const mod = object.getAttribute('id');

  // id 값에 따라 기능 다르게
  switch(mod){
    case 'prev':
      // 첫번째 원소면 제한, 나머지는 index--
      if(itemIndex == 0)
        alert('첫번째 글입니다.');
      else {
        itemIndex--;
        window.location.href = `detail.html?guideIndex=${guideIndex}&keywordIndex=${keywordIndex}&itemIndex=${itemIndex}`;
      }
      break;
    case 'next':
      // 마지막 원소면 제한, 나머지는 index++
      if(itemIndex == itemLength - 1)
        alert('마지막 글입니다.');
      else {
        itemIndex++;
        window.location.href = `detail.html?guideIndex=${guideIndex}&keywordIndex=${keywordIndex}&itemIndex=${itemIndex}`;
      }
      break;
    case 'list':
      window.location.href = `board.html?value=${guideIndex}`;
      break;
  }
}