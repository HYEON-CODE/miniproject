const SERVER_URL="http://127.0.0.1:8000"

async function postCategory(category) {
    let token = getCookie('access_token'); // 쿠키를 가져와서
    let response = await fetch(`${SERVER_URL}/blog/category`, {
      method: 'POST',
      body: category,
      headers: {
        'Authorization': `Bearer ${token}`, // 헤더에 지정
      }
    });
    let data = await response.json();
    return data;
}

async function submitCategory() {
    let formElement = document.getElementById('form');
    let category = new FormData(formElement);
    let result = await postCategory(category);
    console.log(result);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }