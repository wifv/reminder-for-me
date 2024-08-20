const post = document.getElementById('post');
const reminderSection = document.getElementById('reminder-section');
const reminderElement =
`
<div class="reminder">
  <h2 class="reminder-text">text</h2>
  <h3 class="reminder-time">time</h3>
</div>
`;

Notification.requestPermission()


fetch('http://localhost:3000/read', {
  method: 'GET'
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      reminderSection.innerHTML += reminderElement
      reminderSection.children[i].firstElementChild.innerText = data[i].content
      reminderSection.children[i].lastElementChild.innerText = data[i].time
    }
  });

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
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
