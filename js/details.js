const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const details = document.getElementById("bookDetails");

fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
.then(response => response.json())
.then(book => {

    const info = book.volumeInfo;

    details.innerHTML = `

    <img src="${info.imageLinks?.thumbnail || 'https://via.placeholder.com/250'}">

    <div class="info">

        <h2>${info.title}</h2>

        <p><strong>Author:</strong>
        ${info.authors ? info.authors.join(", ") : "Unknown"}
        </p>

        <p><strong>Publisher:</strong>
        ${info.publisher || "Not Available"}
        </p>

        <p><strong>Published:</strong>
        ${info.publishedDate || "-"}
        </p>

        <p>${info.description || "No description available."}</p>

        <button id="saveBook">
        Add to My Shelf
        </button>

    </div>

    `;

    document.getElementById("saveBook").onclick=()=>{

        let shelf=JSON.parse(localStorage.getItem("books"))||[];

        shelf.push(book);

        localStorage.setItem("books",JSON.stringify(shelf));

        alert("Book added to My Shelf!");

    };

});