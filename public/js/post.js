const newFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#new-comment').value.trim();
    const post_id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
	];

    if (content) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ post_id, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to publish comment.');
        }
    }
};

document
.querySelector('.new-comment-form')
.addEventListener('submit', newFormHandler);