function addPostToBoard(category, title, author) {
  const date = new Date().toLocaleString();
  let views = 0;

  const boardMain = document.querySelector('.CommunityBoard-Main');

  const postDiv = document.createElement('div');
  postDiv.className = 'post';

  const categoryDiv = document.createElement('div');
  categoryDiv.className = 'CommunityHeadline Guide';
  categoryDiv.innerHTML = `<div class="inner-box">${category}</div>`;
  postDiv.appendChild(categoryDiv);

  const titleDiv = document.createElement('div');
  titleDiv.className = 'CommunityTitleName';
  titleDiv.innerHTML = `<a href="#">${title}</a>`;
  postDiv.appendChild(titleDiv);

  const authorDiv = document.createElement('div');
  authorDiv.className = 'CommunityAuthorMember';
  authorDiv.textContent = author;
  postDiv.appendChild(authorDiv);

  const dateDiv = document.createElement('div');
  dateDiv.className = 'CommunityPostDataInput';
  dateDiv.textContent = date;
  postDiv.appendChild(dateDiv);

  const viewsDiv = document.createElement('div');
  viewsDiv.className = 'CommunityViewsData';
  viewsDiv.textContent = `${views}`;
  viewsDiv.addEventListener('click', function() {
    views++;
    viewsDiv.textContent = `${views}`;
  });
  postDiv.appendChild(viewsDiv);

  boardMain.appendChild(postDiv);
}

document.addEventListener('DOMContentLoaded', function() {
  const postData = JSON.parse(localStorage.getItem('newPost'));
  console.log('Loaded post data from localStorage:', postData); // 디버그 로그

  if (postData) {
    addPostToBoard(postData.category, postData.title, postData.author);
    localStorage.removeItem('newPost');
  }
});