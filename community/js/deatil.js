function toggleHeart(buttonId) {
  var heartButton = document.getElementById(buttonId);
  var likeCountSpan = document.getElementById('like-count-' + buttonId);
  var likeCount = parseInt(likeCountSpan.textContent);

  if (heartButton.src.includes('emptyLike.png')) {
      heartButton.src = '/images/communityimg/redLike.png';
      likeCount += 1; // 좋아요 증가
  } else {
      heartButton.src = '/images/communityimg/emptyLike.png';
      likeCount -= 1; // 좋아요 감소
  }

  likeCountSpan.textContent = likeCount; // 카운트 업데이트
}
/* ------------------------------------------------- */
document.getElementById('replyButton').addEventListener('click', function() {
  // 새로운 div 요소 생성
  const newReply = document.createElement('div');
  newReply.className = 'comment-container';

  // 고유한 ID 생성
  const uniqueId = 'heart-button-' + Date.now(); // 예: heart-button-1623456789012
  
  // 새로운 답글의 HTML 구조 정의
  newReply.innerHTML = `
      <div class="comment-avatar"></div>
      <div class="comment-body">
          <div class="comment-nickname">닉네임</div>
          <div class="comment-content">이곳에 답글 내용을 작성하세요.</div>
          <div class="comment-footer">
              <div class="comment-date">2024.08.08. 00:00</div>
              <div class="like-section">
                  <img id="${uniqueId}" src="../images/icnos/emptyLike.png" alt="하트 버튼" onclick="toggleHeart('${uniqueId}')">
                  <span id="like-count-${uniqueId}">0</span>
              </div>
              <button class="reply-button">답글쓰기</button>
          </div>
      </div>
  `;
  
  // 새로운 답글을 replySection에 추가
  document.getElementById('replySection').appendChild(newReply);
});
/* -------------------------------------------------- */