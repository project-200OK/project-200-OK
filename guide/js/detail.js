// url 에서 가이드, 키워드, 아이템의 index 받아오기
const detailParams = new URLSearchParams(location.search);
const guideIndex = detailParams.get('guideIndex');
const keywordIndex = detailParams.get('keywordIndex');
let itemIndex = detailParams.get('itemIndex');
let itemLength;

// json 에서 값 받아와서 출력
window.onload = () => {
  axios.get('http://localhost:5500/json/guide.json')
  .then((res) => {
    const data = res.data;
    const guideName = data.categories[guideIndex];
    const keywordName = guideName.subcategories[keywordIndex];
    const itemName = keywordName.items[itemIndex];
    const isLike = (itemName.like == '1') ? "/images/icons/redLike.png" : "/images/icons/emptyLike.png"; 
    const content = itemName.contentURL;
    itemLength = keywordName.items.length;
    let sourceHTML = '';

    document.getElementById('guideName').innerText = guideName.guide;
    document.getElementById('cardTitle').innerText = itemName.title;
    document.getElementById('root').innerText = `${guideName.guide} > ${keywordName.keyword} > ${itemName.title}`;
    document.getElementById('like').src = isLike;
    document.getElementById('imgs').src = content;

    for(let i = 0; i < itemName.source.length; i++){
      let addHTML = `<p><a href="${itemName.source[i].url}" class="links" target='_blank'>${itemName.source[i].list}</a></p>`;
      sourceHTML += addHTML;
    }

    document.querySelector('#sources').innerHTML = sourceHTML;
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
      window.location.href = `board.html?value=${guideIndex}&name=${keywordIndex}`;
      break;
  }
}