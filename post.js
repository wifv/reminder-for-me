const post = document.getElementById('post');

post.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(post);
  const formDataObj = Object.fromEntries(formData.entries());

  fetch('http://localhost:3000/write', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formDataObj)
  })
  .then(response => {
    if(response.status === 200) {
      alert('The reminder has been saved')
    }
  })
});
