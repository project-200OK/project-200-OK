window.onload = ()=>{

  // 배너 슬라이드
  function Slider(target, type) {
    // 상태
    let index = 1;
    let isMoved = true;
    const speed = 1000; // ms

    // 방향
    const transform = "transform " + speed / 1000 + "s";
    let translate = (i) => "translateX(-" + 100 * i + "%)";
    if (type === "V") {
      translate = (i) => "translateY(-" + 100 * i + "%)";
    }

    // 슬라이더
    const slider = document.querySelector(target);
    const sliderRects = slider.getClientRects()[0];
    slider.style["overflow"] = "hidden";

    // 슬라이더 화면 컨테이너
    const container = document.createElement("div");
    container.style["display"] = "flex";
    container.style["flex-direction"] = type === "V" ? "column" : "row";
    container.style["width"] = sliderRects.width + "px";
    container.style["transform"] = translate(index);

    // 슬라이더 화면 목록
    let boxes = [].slice.call(slider.children);
    boxes = [].concat(boxes[boxes.length - 1], boxes, boxes[0]);
    
    // 슬라이더 화면 스타일
    const size = boxes.length;
    for (let i = 0; i < size; i++) {
      const box = boxes[i];    
      box.style["flex"] = "none";
      box.style["flex-wrap"] = "wrap";
      box.style["height"] = "100%";
      box.style["width"] = "100%";
      container.appendChild(box.cloneNode(true));
    }

    // 처음/마지막 화면 눈속임 이벤트
    container.addEventListener("transitionstart", function () {
      isMoved = false;
      setTimeout(() => {
        isMoved = true;
      }, speed);
    });
    container.addEventListener("transitionend", function () {
      // 처음으로 순간이동
      if (index === size - 1) {
        index = 1;
        container.style["transition"] = "none";
        container.style["transform"] = translate(index);
      }
      // 끝으로 순간이동
      if (index === 0) {
        index = size - 2;
        container.style["transition"] = "none";
        container.style["transform"] = translate(index);
      }
    });

    // 슬라이더 붙이기
    slider.innerHTML = "";
    slider.appendChild(container);

    return {
      move: function (i) {
        if (isMoved === true) {
          index = i;
          container.style["transition"] = transform;
          container.style["transform"] = translate(index);
        }
      },
      next: function () {
        if (isMoved === true) {
          index = (index + 1) % size;
          container.style["transition"] = transform;
          container.style["transform"] = translate(index);
        }
      },
      prev: function () {
        if (isMoved === true) {
          index = index === 0 ? index + size : index;
          index = (index - 1) % size;
          container.style["transition"] = transform;
          container.style["transform"] = translate(index);
        }
      }
    };
  }
  
  // 배너슬라이드 선언
  const s1 = new Slider("#bannerList", "H");
  
  // 배너슬라이드 호출
  setInterval(() => {
    s1.next();
  }, 3000)
  
  
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
    let keywords = res.data;
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

    keywordList.style.height = '210px';
    main.style.height = '1200px'
    document.querySelector('.keyword_arrow').textContent = 'v';
  } else {
    keywordList.style.height = '280px';
    main.style.height = '1470px'
    document.querySelector('.keyword_arrow').textContent = '^';

  }
});
};