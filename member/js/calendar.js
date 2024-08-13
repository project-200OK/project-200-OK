// 탈퇴하기 화면 작업 할 사항
// 1.모든데이터를 입력하였을때만 수정하기 버튼에 색이 바뀌도록 하고싶음
//   ㄴ 입력안했을경우 비활성화시키기

// ========== 하단 버튼 영역 ==========
// const _MemberSubmitBtn = document.querySelector('.member_btn');  // 탈퇴하기
// _MemberSubmitBtn.addEventListener('click', (event) => {
//   // 탈퇴하겠습니다. 정상입력여부 판단.
//   let ipValue = document.getElementById('user_resign').value; // 탈퇴인풋값 가져오기
//   if(ipValue === "탈퇴하겠습니다.") {
//     const result = confirm("정말 탈퇴하시겠습니까? 탈퇴시 복구 불가합니다.");
//     if(result) {
//       alert("그동안 이용해주셔서 감사합니다.\n탈퇴 완료되었습니다.");
//       event.preventDefault(); // 폼제출 방지
//       window.location.href = '../index.html';
//     }else {
//       return;
//     }
//   }else{
//     alert("입력내용이 일치하지않습니다. 다시입력해주세요.");
//     event.preventDefault(); // 폼제출 방지
//   }
// });

const fullCalendarElement = document.querySelector('full-calendar')

fullCalendarElement.options = {
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek,dayGridDay'
  }
}