const _ipUserPass = document.querySelector('#user_pass');    // password input 박스
const _imgPassEye = document.querySelector('#pass_eye');      // password input 박스 내 눈 표시 아이콘

// 패스워드 눈 아이콘 클릭시 이벤트 발생
_imgPassEye.addEventListener('click', () => {
  console.log("이미지 클릭이벤트 발생");
  if(_imgPassEye.classList.contains('pass_hide')) {
    // 비밀번호 숨김 > 보여줌으로 변경
    _imgPassEye.classList.replace('pass_hide', 'pass_show');
    _imgPassEye.src = "../images/icons/free-icon-eye.png";
    _ipUserPass.type = 'text';
  }else if(_imgPassEye.classList.contains('pass_show')) {
    // 비밀번호 보여줌 > 숨김으로 변경
    _imgPassEye.classList.replace('pass_show', 'pass_hide');
    _imgPassEye.src = "../images/icons/free-icon-eye-hidden.png";
    _ipUserPass.type = 'password';
  }
});

// 로그인 버튼 클릭시
// json 에 입력된 아이디와 비밀번호를 비교해서 일치하지않을경우
// 아이디 또는 비밀번호가 일치하지않습니다. 라고 멘트 띄우기
const _MemberSubmitBtn = document.querySelector('.member_btn');  // 로그인
_MemberSubmitBtn.addEventListener('click', (event) => {
  event.preventDefault(); // 폼제출 방지  
  const ipId = document.getElementById('user_id').value;      // 입력 ID
  const ipPass = document.getElementById('user_pass').value;  // 입력 Password

  // 회원정보 data 들고오기
  axios.get('/json/user.json')
  .then((res) => {
    let userInfo = res.data.users[0];
    let usesrId = userInfo.email;       // 사용자ID
    let usesrPass = userInfo.password;  // 사용자Password

    if(ipId !== usesrId || ipPass !== usesrPass) {
      document.getElementById('msg_pass').style.display = 'block';
    }else {
      document.getElementById('msg_pass').style.display = 'none';
      window.location.href = '/index2.html';
    }
  });
})
