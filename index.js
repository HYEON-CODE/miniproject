const SERVER_URL = 'http://127.0.0.1:8000'

let modal = document.getElementById('modal');

// 글 리스트 조회
async function getPosts() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let data = await response.json();
    return data
}

async function insertPosts() {
    let posts = await getPosts();
    document.body.innerHTML=`
    <div>
    <h1 class="text-center">리스트 페이지</h1>
    <button class="btn btn-outline-primary" onclick="">카테고리 선택하기</button>
    <button class="btn btn-outline-secondary" onclick="postModal()">글쓰기</button>
    </div>
    `
    posts.forEach(post => {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="${post.id}">
                <h1 class="modal-title">${post.title}</h1>
                <p>${post.content}</p>
                <button class="btn btn-primary" onclick="showModaldetail(${post.id})">상세보기</button>
            </div>
        `)
    })
    console.log(posts);
}

// 글 1개 조회
async function getPost(id) {
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`);
    let data = await response.json();
    return data
}

// 상세보기 페이지
async function showModaldetail(id) {
    let post = await getPost(id);
    document.body.innerHTML=`
        <h1>상세보기 페이지</h1>
        <div id="${post.id}">
        <h1>${post.title}</h1>
        <p>${post.content}</p>
        <p>${post.category}</p>
        <p>${post.name}</p>
        <p>${post.image}</p>
        <p>${post.author}</p>
        <button class="btn btn-danger" onclick="deletePost(${post.id})">삭제하기</button>
        <button class="btn btn-success" onclick="putModal()">수정하기</button>
        <button class="btn btn-secondary" onclick="insertPosts()">뒤로가기</button>
    `
}

// 수정하기 페이지
async function putModal() {
    document.body.innerHTML=`
    <form id="form">
        <h1>수정하기 페이지</h1>
        <input name="title">
        <input name="content">
        <input name="category">
        <input type="file" name="image">
        <button class="btn btn-success" onclick="summitPost()">수정하기</button>
        <button class="btn btn-secondary" onclick="insertPosts()">뒤로가기</button>
    </form>
    `
}

// 글쓰기 페이지
async function postModal() {
    document.body.innerHTML=`
        <form id="form">
            <h1>글쓰기 페이지</h1>
            <input name="title">
            <input name="content">
            <input name="category">
            <input type="file" name="image">
        </form>
        <button class="btn btn-success" onclick="submitArticle()">작성하기</button>
        <button class="btn btn-secondary" onclick="insertPosts()">뒤로가기</button>
    `
}

// 삭제하기 기능
async function deletePost(id) {
    let token = getCookie('access_token'); 
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    let data = await response.json();
    console.log(data);
    insertPosts()
  }

// 글 등록하기
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

// 수정하기 기능
  async function updatePost(post, id) {
    let token = getCookie('access_token'); 
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`,{
      method: 'PUT',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    let data = await response.json();
    return data;
  }
  async function summitPost(id) {
    let post = {
      title: document.getElementById('title').value,
      content: document.getAnimations('content').value
    }
    let result = updatePost(post, id);
    console.log(result);
  }


  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  function setCookie(name, value) {
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/";
    document.cookie = updatedCookie;
}
  
insertPosts()