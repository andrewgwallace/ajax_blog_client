window.addEventListener('load', event => {
  // Variables
  const baseURL = 'http://localhost:3000';
  const allTitles = document.querySelector('.all-titles');
  const mainContent = document.querySelector('.main')
  const postActions = document.createElement('div')
  postActions.classList.add('.post-actions')
  postActions.innerHTML = `
  <button class="btn btn-primary edit">Edit</button>
  <button class="btn btn-danger delete">Delete</button>
  `
  let postId;

  //New Post Button
  const newPostBtnDiv = document.querySelector('.new-post-button');
  const newPostBtn = document.createElement('button')
  newPostBtn.classList.add('btn', 'btn-success', 'new-post-btn');
  newPostBtn.innerHTML = "Create New Post";
  newPostBtnDiv.appendChild(newPostBtn);

  // New post form
  const newPostForm = () => {
    mainContent.innerHTML = '';
    const form = document.createElement('form')
    form.innerHTML = `
      <div class="form-group">
        <label>Title:</label><br>
        <input type="text" id="postTitle"><br>
        <label>Body:</label><br>
        <textarea type="text" id="postContent"></textarea>
      </div>
      <button class="btn btn-primary" id="submit-post">Submit</button>
      `
    mainContent.appendChild(form);
    const submitPostBtn = document.querySelector("#submit-post");
    submitPostBtn.addEventListener('click', (event) => {
      let postTitle = document.querySelector("#postTitle").value
      let postContent = document.querySelector("#postContent").value
      const postData = {
        title: postTitle,
        content: postContent
      };
      submitNewPost(postData, event);
    });
  }
  newPostBtn.addEventListener('click', newPostForm);


  //Show Posts

  const showPosts = () => {
    allTitles.innerHTML = '';
    const postsListEl = document.createElement('ul')
    postsListEl.classList.add('list-group')
    allTitles.appendChild(postsListEl);
    axios.get(`${baseURL}/posts/`)
      .then(response => {
        postsListEl.innerHTML = '';
        let posts = response.data;
        posts.forEach(post => {
          const li = document.createElement("li");
          li.classList.add('list-group-item');
          li.innerHTML = `${post.title}`;
          postsListEl.appendChild(li);
          li.addEventListener('click', () => {
            mainContent.innerHTML = '';
            const p = document.createElement("p");
            p.innerHTML = `${post.content}`
            mainContent.appendChild(p)
            mainContent.appendChild(postActions)
            const id = post.id;
            // document.querySelector('.delete').addEventListener('click', (event) => {
            // const id = post.id
            // axios.delete(`${baseURL}/posts/${id}`)
            // .then ( response => {
            //   showPosts();
            // })
            //   event.preventDefault();
            // });
            document.querySelector('.delete').addEventListener('click', (event) => {
              deletePost(id, event);
            });
            document.querySelector('.edit').addEventListener('click', () => {
            console.log("You clicked Edit")
            });
            // console.log(post.id);
        });
      });
    })
  }
  showPosts();


// Create New Post
const submitNewPost = (obj, event) => {
  axios.post(`${baseURL}/posts`, obj)
  .then( response => {
    showPosts();
  })
    event.preventDefault();
}


// Delete Post
const deletePost = (id, event) => {
  axios.delete(`${baseURL}/posts/${id}`)
  .then ( response => {
    showPosts();
  })
  event.preventDefault();
}


});
