// ======================================
// BookNest - My Shelf
// ======================================

// DOM Elements
const wantShelf = document.getElementById("wantShelf");
const finishedShelf = document.getElementById("finishedShelf");

const totalBooks = document.getElementById("totalBooks");
const wantCount = document.getElementById("wantCount");
const finishedCount = document.getElementById("finishedCount");

const emptyShelf = document.getElementById("emptyShelf");

// ======================================
// Local Storage
// ======================================

function getShelf() {
    return JSON.parse(localStorage.getItem("myShelf")) || [];
}

function saveShelf(shelf) {
    localStorage.setItem("myShelf", JSON.stringify(shelf));
}

// ======================================
// Render Shelf
// ======================================

function renderShelf() {

    const shelf = getShelf();

    wantShelf.innerHTML = "";
    finishedShelf.innerHTML = "";

    // Counters

    totalBooks.textContent = shelf.length;

    const wantBooks = shelf.filter(book => book.status === "want");

    const finishedBooks = shelf.filter(book => book.status === "finished");

    wantCount.textContent = wantBooks.length;

    finishedCount.textContent = finishedBooks.length;

    // Empty Shelf

    if (shelf.length === 0) {

        emptyShelf.classList.remove("hidden");

    } else {

        emptyShelf.classList.add("hidden");

    }

    // Render Want

    wantBooks.forEach(book => {

        wantShelf.appendChild(createCard(book));

    });

    // Render Finished

    finishedBooks.forEach(book => {

        finishedShelf.appendChild(createCard(book));

    });

}

// ======================================
// Create Book Card
// ======================================

function createCard(book) {

    const card = document.createElement("div");

    card.className = "book-card";

    const readButton = book.readUrl
        ? `<button class="read-btn" onclick="openReadLink('${encodeURIComponent(book.readUrl)}')">
            📖 Read
        </button>`
        : "";

    card.innerHTML = `

        <img src="${book.image || 'https://via.placeholder.com/250x350?text=No+Cover'}"
             alt="${book.title}">

        <div class="book-content">

            <h3>${book.title}</h3>

            <p><strong>Author:</strong>
            ${book.authors.join(", ")}</p>

            <p><strong>Publisher:</strong>
            ${book.publisher}</p>

            <span class="status ${book.status}">
                ${book.status === "want"
                    ? "Want to Read"
                    : "Finished"}
            </span>

            <div class="actions">

                <button class="move-btn"
                    onclick="toggleStatus('${book.id}')">

                    ${book.status === "want"
                        ? "✓ Finished"
                        : "↩ Want"}

                </button>

                <button class="delete-btn"
                    onclick="deleteBook('${book.id}')">

                    Delete

                </button>

                ${readButton}

            </div>

        </div>

    `;

    return card;

}

function openReadLink(encodedUrl) {

    const url = decodeURIComponent(encodedUrl);

    if (!url) return;

    window.open(url, "_blank", "noopener,noreferrer");

}

// ======================================
// Move Book
// ======================================

function toggleStatus(id) {

    const shelf = getShelf();

    const book = shelf.find(item => item.id === id);

    if (!book) return;

    if (book.status === "want") {

        book.status = "finished";

    } else {

        book.status = "want";

    }

    saveShelf(shelf);

    renderShelf();

}

// ======================================
// Delete Book
// ======================================

function deleteBook(id) {

    const confirmDelete = confirm(
        "Remove this book from your shelf?"
    );

    if (!confirmDelete) return;

    let shelf = getShelf();

    shelf = shelf.filter(book => book.id !== id);

    saveShelf(shelf);

    renderShelf();

}

// ======================================
// Search (Optional)
// ======================================

function searchShelf(keyword) {

    const shelf = getShelf();

    return shelf.filter(book =>
        book.title.toLowerCase().includes(keyword.toLowerCase())
    );

}

// ======================================
// Initial Load
// ======================================

renderShelf();