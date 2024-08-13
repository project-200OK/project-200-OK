// url 에서 가이드, 키워드, 아이템의 index 받아오기
const detailParams = new URLSearchParams(location.search);
let communityIndex = detailParams.get("index");
console.log("index = " + communityIndex);

let itemIndex = detailParams.get("itemIndex");
let itemLength = 0;

// json 에서 값 받아와서 출력
window.onload = () => {
  axios
    .get("http://localhost:5500/json/community.json")
    .then((res) => {
      console.log(res);

      const data = res.data;
      const headline = data.posts[communityIndex].headline;
      const title = data.posts[communityIndex].title;
      const content = data.posts[communityIndex].content;
      const author = data.posts[communityIndex].author;
      const created_at = data.posts[communityIndex].created_at;
      const keywords = data.posts[communityIndex].keywords;
      const comments = data.posts[communityIndex].comments;
      const like = data.posts[communityIndex].like;

      itemLength = data.posts.length;

      document.getElementById("headline").innerText = '커뮤니티';
      document.getElementById("title").innerText = title;
      document.getElementById("root").innerText = `커뮤니티 > ${headline} > ${title}`;
      document.getElementById("mainText").innerText = content;
      document.getElementById("author").innerText = `작성자 : ${author}`;
      document.getElementById(
        "created_at"
      ).innerText = `작성일 : ${created_at}`;
      // 키워드
      for (let i = 0; i < keywords.length; i++) {
        const div = document.createElement("div");
        div.className = "keyword";
        div.innerText = keywords[i];
        document.getElementById("keywords").appendChild(div);
      }

      for (let i = 0; i < comments.length; i++) {
        const comment_box = document.querySelector(".comments_box");        
        let comment = document.createElement("div");
        comment.className = "comment";

        const comment_author = document.createElement("div");
        comment_author.className = "comment_author";
        comment_author.innerText = comments[i].author;
        comment.appendChild(comment_author);

        const comment_created_at = document.createElement("div");
        comment_created_at.className = "comment_created_at";
        comment_created_at.innerText = comments[i].created_at;
        comment.appendChild(comment_created_at);

        const comment_content = document.createElement("div");
        comment_content.className = "comment_content";
        comment_content.innerText = comments[i].content;
        comment.appendChild(comment_content);

        comment_box.appendChild(comment);
        
      }
      if (like) {
        document.querySelector('.like_img').src = '/images/icons/redLike.png'
      } else {
        document.querySelector('.like_img').src = '/images/icons/emptyLike.png'
      }

    })
    .catch((error) => {
      console.log("error : " + error);
    });
};

// 좋아요 기능
function setLike(object) {
  // 빈 하트면 빨간하트로
  if (object.src.length == 48) {
    object.src = "/images/icons/redLike.png";
  }
  // 빨간하트면 빈 하트로
  else {
    object.src = "/images/icons/emptyLike.png";
  }
}

// 무슨 버튼 눌린지 파악 후 기능 구현하는 함수
function buttonWorks(object) {
  // id 값은 prev, next, list 가 있음
  const mod = object.getAttribute("id");
  console.log(mod);

  // id 값에 따라 기능 다르게
  switch (mod) {
    case "prev":
      // 첫번째 원소면 제한, 나머지는 index--
      if (communityIndex == 0) alert("첫번째 글입니다.");
      else {
        communityIndex--;
        window.location.href = `detail.html?index=${communityIndex}`;
      }

      break;
    case "next":
      // 마지막 원소면 제한, 나머지는 index++
      if (communityIndex == itemLength - 1) alert("마지막 글입니다.");
      else {
        communityIndex++;
        window.location.href = `detail.html?index=${communityIndex}`;
      }
      break;
    case "list":
      window.location.href = `board.html`;
      break;
  }
}
