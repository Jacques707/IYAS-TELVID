document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit-button');
    const videoUrlInput = document.getElementById('video-url');
    const messageDiv = document.getElementById('message');

    submitButton.addEventListener('click', function() {
        const url = videoUrlInput.value.trim();

        if (url) {
            fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url }),
            })
            .then(response => response.json())
            .then(data => {
                messageDiv.textContent = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
                messageDiv.textContent = 'Une erreur est survenue.';
            });
        } else {
            messageDiv.textContent = 'Veuillez entrer une URL.';
        }
    });
})
