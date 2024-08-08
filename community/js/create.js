document.getElementById('postForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const category = document.getElementById('category').value;
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  const postData = {
    category,
    title,
    author
  };

  console.log('Saving post data to localStorage:', postData); // 디버그 로그

  localStorage.setItem('newPost', JSON.stringify(postData));

  window.location.href = 'board.html';
});