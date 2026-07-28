const container = document.getElementById("shelfContainer");

let shelf = JSON.parse(localStorage.getItem("books")) || [];

if (shelf.length === 0) {

    container.innerHTML = `
    <h2>No books saved yet.</h2>
    `;

} else {

    displayBooks();

}

function displayBooks() {

    container.innerHTML = "";

    shelf.forEach((book, index) => {

        const info = book.volumeInfo;

        container.innerHTML += `

        <div class="card">

        <img src="${info.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}">

        <h3>${info.title}</h3>

        <p>${info.authors ? info.authors.join(", ") : "Unknown"}</p>

        <button onclick="removeBook(${index})">
        Remove
        </button>

        </div>

        `;

    });

}

function removeBook(index) {

    shelf.splice(index, 1);

    localStorage.setItem("books", JSON.stringify(shelf));

    displayBooks();

}