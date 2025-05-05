document.addEventListener("DOMContentLoaded", () => {
    const commentForm = document.getElementById("comment-form");
    const nameInput = document.getElementById("name");
    const commentInput = document.getElementById("comment");
    const commentsContainer = document.getElementById("comments-container");

    const API_URL = "http://localhost:3000/api/comments"; 

    // Funzione per caricare i commenti dal backend
    function loadComments() {
        fetch(API_URL)
            .then(response => response.json())
            .then(comments => {
                commentsContainer.innerHTML = ""; 
                comments.forEach(comment => {
                    const commentDiv = document.createElement("div");
                    commentDiv.classList.add("comment");
                    commentDiv.innerHTML = `
                        <strong>${comment.nome}</strong>
                        <p>${comment.commento}</p>
                        <small>${new Date(comment.data_commento).toLocaleString()}</small>
                        <hr>
                    `;
                    commentsContainer.appendChild(commentDiv);
                });
            })
            .catch(error => console.error("Errore nel caricamento dei commenti:", error));
    }


    console.log("Form trovato:", commentForm);
console.log("Input Nome:", nameInput);
console.log("Input Commento:", commentInput);

    // Funzione per inviare un nuovo commento
    commentForm.addEventListener("submit", (event) => {
        event.preventDefault();
         // Evita il ricaricamento della pagina

        const newComment = {
            nome: nameInput.value,
            commento: commentInput.value,
            data_commento: new Date().toISOString()

        };
        
        console.log("Form inviato!");  


        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComment)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Commento aggiunto:", data);
            nameInput.value = "";
            commentInput.value = "";
            loadComments(); 
            // Ricarica i commenti aggiornati
        })
        .catch(error => console.error("Errore nell'invio del commento:", error));
    });

    // Carica i commenti iniziali
    loadComments();
});
