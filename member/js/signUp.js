const _ipUserPass = document.querySelector('#user_pass');               // password input 박스
const _imgPassEye = document.querySelector('#pass_eye');            // password input 박스 내 눈 표시 아이콘

const _ipUserPassCheck = document.querySelector('#user_pass_check');    // password check input 박스
const _imgPassEyeCheck = document.querySelector('#pass_eye_check'); // password check input 박스 내 눈 표시 아이콘

const _ipPassRecheck = document.querySelector('#user_pass_check'); // password check input 박스 내 눈 표시 아이콘
// 작업 할 사항
// 1.패스워드 & 패스워드 확인 값 같은지 체크
// 2.회원가입 버튼 클릭시 빈값 없는지 확인

// ========== 눈 아이콘 클릭시 이벤트 발생 ==========
// 패스워드
_imgPassEye.addEventListener('click', () => {
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
// 패스워드 확인
_imgPassEyeCheck.addEventListener('click', () => {
  if(_imgPassEyeCheck.classList.contains('pass_hide')) {
    // 비밀번호 숨김 > 보여줌으로 변경
    _imgPassEyeCheck.classList.replace('pass_hide', 'pass_show');
    _imgPassEyeCheck.src = "../images/icons/free-icon-eye.png";
    _ipUserPassCheck.type = 'text';
  }else if(_imgPassEyeCheck.classList.contains('pass_show')) {
    // 비밀번호 보여줌 > 숨김으로 변경
    _imgPassEyeCheck.classList.replace('pass_show', 'pass_hide');
    _imgPassEyeCheck.src = "../images/icons/free-icon-eye-hidden.png";
    _ipUserPassCheck.type = 'password';
  }
});
// 패스워드 일치여부 확인 이벤트
_ipPassRecheck.addEventListener();

// 지역명 for문 돌려서 option에 넣기
const regions = [
  {name : "선택하세요", val : "no"},
  {name : "서울", val : "seoul"},
  {name : "부산", val : "busan"},
  {name : "대구", val : "daegu"},
  {name : "인천", val : "incheon"},
  {name : "광주", val : "gwangju"},
  {name : "대전", val : "daejeon"},
  {name : "울산", val : "ulsan"},
  {name : "강원", val : "gangwon"},
  {name : "경기", val : "gyeonggi"},
  {name : "경남", val : "gyeongnam"},
  {name : "경북", val : "gyeongbuk"},
  {name : "전남", val : "jeonnam"},
  {name : "전북", val : "jeonbuk"},
  {name : "제주", val : "jeju"},
  {name : "충남", val : "chungnam"},
  {name : "충북", val : "chungbuk"}];

const _selUserRegion = document.querySelector('#user_region');

regions.forEach((region, index) => {
  let option = document.createElement('option');
  option.value = region.val;
  option.textContent = region.name;
  _selUserRegion.appendChild(option);
});
                 

const _btnLogin = document.querySelector('.member_btn');  // 로그인
_btnLogin.addEventListener('click', (event) => {
  event.preventDefault(); // 폼제출 방지
  window.location.href = 'login.html';
})
