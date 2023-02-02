const SERVER_URL = "http://127.0.0.1:8000"

async function postArticle(article) {
    let token = getCookie('access_token'); // 쿠키를 가져와서
    let response = await fetch(`${SERVER_URL}/blog/article`, {
      method: 'POST',
      body: article,
      headers: {
        'Authorization': `Bearer ${token}`, // 헤더에 지정
      }
    });
    let data = await response.json();
    return data;
  }
  async function submitArticle() {
    let formElement = document.getElementById('form');
    let article = new FormData(formElement);
    let result = await postArticle(article);
    console.log(result);
  }

  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }