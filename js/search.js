// =============================
// DOM Elements
// =============================
const form = document.getElementById("searchForm");
const searchInput = document.getElementById("bookSearch");
const results = document.getElementById("results");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const noResults = document.getElementById("noResults");
const searchButton = form.querySelector("button");
const validationMessage = document.getElementById("validationMessage");
// =============================
// Search Event
// =============================
form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Clear previous messages and results
    validationMessage.textContent = "";
    results.innerHTML = "";
    error.classList.add("hidden");
    noResults.classList.add("hidden");
    const query = searchInput.value.trim();
    if (query === "") {
        validationMessage.textContent =
            "Please enter a book title or author.";
        return;
    }
    searchBooks(query);
});
// =============================
// Fetch Books
// =============================
async function searchBooks(query) {
    loading.classList.remove("hidden");
    searchButton.disabled = true;
    searchButton.textContent = "Searching...";
    try {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch books.");
        }
        const data = await response.json();
        loading.classList.add("hidden");
        if (!data.items || data.items.length === 0) {
            noResults.classList.remove("hidden");
            return;
        }
        displayBooks(data.items);
    } catch (err) {
        loading.classList.add("hidden");
        error.classList.remove("hidden");
    } finally {
        searchButton.disabled = false;
        searchButton.textContent = "Search Books";
    }
}
// =============================
// Display Books
// =============================
function displayBooks(books) {
    books.forEach(book => {
        const info = book.volumeInfo;
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <img
                src="${info.imageLinks?.thumbnail || "https://via.placeholder.com/200x300?text=No+Cover"}"
                alt="${info.title}"
            >
            <div class="book-content">
                <h3>${info.title}</h3>
                <p>
                    <strong>Author:</strong>
                    ${info.authors ? info.authors.join(", ") : "Unknown"}
                </p>
                <p>
                    <strong>Publisher:</strong>
                    ${info.publisher || "Unknown"}
                </p>
                <a href="details.html?id=${book.id}">
                    View Details
                </a>
            </div>
        `;
        results.appendChild(card);
    });
}