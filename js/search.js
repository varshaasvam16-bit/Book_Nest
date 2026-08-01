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
        const googleBooks = await fetchGoogleBooks(query);

        if (googleBooks.length > 0) {
            displayBooks(googleBooks);
            return;
        }
    } catch (err) {
        console.warn("Google Books search failed, trying Open Library.", err);
    }

    try {
        const openLibraryBooks = await fetchOpenLibraryBooks(query);

        if (openLibraryBooks.length > 0) {
            displayBooks(openLibraryBooks);
        } else {
            noResults.classList.remove("hidden");
        }
    } catch (err) {
        console.error(err);
        error.classList.remove("hidden");
    } finally {
        loading.classList.add("hidden");
        searchButton.disabled = false;
        searchButton.textContent = "Search Books";
    }
}

async function fetchGoogleBooks(query) {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Google Books request failed");
    }

    const data = await response.json();

    return (data.items || []).map(book => ({
        id: book.id,
        title: book.volumeInfo?.title || "Untitled",
        authors: book.volumeInfo?.authors || ["Unknown"],
        publisher: book.volumeInfo?.publisher || "Unknown",
        image: book.volumeInfo?.imageLinks?.thumbnail || "",
        description: book.volumeInfo?.description || "",
        source: "google"
    }));
}

async function fetchOpenLibraryBooks(query) {
    const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`
    );

    if (!response.ok) {
        throw new Error("Open Library request failed");
    }

    const data = await response.json();

    return (data.docs || []).slice(0, 8).map(book => ({
        id: book.key || "",
        title: book.title || "Untitled",
        authors: book.author_name ? book.author_name.slice(0, 2) : ["Unknown"],
        publisher: book.publisher ? book.publisher[0] : "Unknown",
        image: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "",
        description: book.first_sentence ? book.first_sentence.join(" ") : "",
        source: "openlibrary"
    }));
}

// =============================
// Display Books
// =============================
function displayBooks(books) {
    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <img
                src="${book.image || "https://via.placeholder.com/200x300?text=No+Cover"}"
                alt="${book.title}"
            >
            <div class="book-content">
                <h3>${book.title}</h3>
                <p>
                    <strong>Author:</strong>
                    ${book.authors.join(", ")}
                </p>
                <p>
                    <strong>Publisher:</strong>
                    ${book.publisher || "Unknown"}
                </p>
                <a href="details.html?id=${encodeURIComponent(book.id)}">
                    View Details
                </a>
            </div>
        `;
        results.appendChild(card);
    });
}