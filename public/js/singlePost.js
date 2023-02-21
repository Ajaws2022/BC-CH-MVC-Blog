const session = require("express-session");

const newComment = async (event) => {
    event.preventDefault();

    const content = document.getElementById('comment-content').value.trim();

    const user_id = session.user_id;

    const post_id = document.querySelector('#postTitle').id;

    if(content && user_id && post_id){
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({content, user_id, post_id}),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if(response.ok) {
            location.reload();
        } else {
            alert('Failed to post comment')
        }
    }

};

const form = document.querySelector('#comment-form');

const addBtn = document.querySelector('.addComment');

addBtn.addEventListener('click', function () {
    form.setAttribute('class', 'comment-form-open')
})

document.querySelector('.submitButton').addEventListener('click', newComment);