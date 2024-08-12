const _ipUserPass = document.querySelector('#user_pass');               // password input 박스
const _imgPassEye = document.querySelector('#pass_eye');                // password input 박스 내 눈 표시 아이콘

const _ipUserPassCheck = document.querySelector('#user_pass_check');    // password check input 박스
const _imgPassEyeCheck = document.querySelector('#pass_eye_check');     // password check input 박스 내 눈 표시 아이콘

const _ipUserId = document.querySelector('#user_id');                   // 사용자정보-아이디
const _ipUserNickName = document.querySelector('#user_nickName');       // 사용자정보-닉네임
const _ipUserRegion = document.querySelector('#user_region');       // 사용자정보-닉네임

let isPass = false;   // 비밀번호 일치여부 체크

// 회원정보 수정화면 작업 할 사항
// 1.모든데이터를 입력하였을때만 수정하기 버튼에 색이 바뀌도록 하고싶음
//   ㄴ 입력안했을경우 비활성화시키기

// 회원정보 불러오기 > 불러온 정보 input에 넣어주기
axios.get('/json/user.json')
.then((res) => {
  let userInfo = res.data.users[0];
    let usesrId = userInfo.email;             // 사용자 ID
    let usesrNickName = userInfo.nickname;    // 사용자 닉네임
    let userRegion = userInfo.region;         // 거주지
    _ipUserId.value = usesrId;
    _ipUserNickName.value = usesrNickName;
    _ipUserRegion.value = userRegion;
});

// ========== 패스워드 영역 이벤트 ==========
// 패스워드 숨김/보임 아이콘 이벤트
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

// 패스워드 & 패스워드 확인 일치여부 확인
_ipUserPass.addEventListener('input',() => {
  let pass1 = document.getElementById('user_pass').value;
  let pass2 = document.getElementById('user_pass_check').value;
  if( pass1 != pass2 ) {
    document.getElementById('msg_pass').style.display = 'block';
    isPass = false;
  }else {
    document.getElementById('msg_pass').style.display = 'none';
    isPass = true;
  }
});
_ipUserPassCheck.addEventListener('input',() => {
  let pass1 = document.getElementById('user_pass').value;
  let pass2 = document.getElementById('user_pass_check').value;
  if( pass1 != pass2 ) {
    document.getElementById('msg_pass').style.display = 'block';
    isPass = false;
  }else {
    document.getElementById('msg_pass').style.display = 'none';
    isPass = true;
  }
});


// ========== 지역명 Select Box 영역 ==========
const _selUserRegion = document.querySelector('#user_region'); //select태그(부모)
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

// 부모안에 option 값 넣기
regions.forEach((region, index) => {
  let option = document.createElement('option');
  option.value = region.val;
  option.textContent = region.name;
  _selUserRegion.appendChild(option);
});
                 

// ========== 하단 버튼 영역 ==========
const _MemberSubmitBtn = document.querySelector('.member_btn');  // 수정하기
_MemberSubmitBtn.addEventListener('click', (event) => {
  event.preventDefault(); // 폼제출 방지

  const select = document.getElementById('user_region');
  const selectedValue = select.options[select.selectedIndex].value;

  if(!isPass) {
    alert('비밀번호가 일치하지않습니다.\n정확히 입력해주세요.');
  }else if(selectedValue === "no") {
    alert('거주지를 선택해주세요.');
  }else {
    window.location.href = 'update.html';
  }
});