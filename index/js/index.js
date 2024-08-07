window.onload = ()=>{
  axios.get('http://localhost:5500/index.json')
  .then((res)=>{
    let guides = res.data
    let guideHTML = '';
  for(let i = 0; i < guides.length; i++) {
    let guide = guides[i];
    guideHTML +=  `
    <div class="guide_card">
        <li>
            <a href="${guide.guide_url}">
                <img class="${guide.img_class}" src="${guide.img_url}" alt="${guide.img_name}">${guide.guide_name}
            </a>
        </li>
    </div>`;
  }

  document.querySelector('.guide_list').innerHTML = guideHTML;
  })
  .catch((error)=>{
    console.log('error 발생 : ' + error)
  });

}