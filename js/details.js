// ===============================
// Elements
// ===============================

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const bookDetails = document.getElementById("bookDetails");

const cover = document.getElementById("bookCover");
const title = document.getElementById("title");
const author = document.getElementById("author");
const publisher = document.getElementById("publisher");
const publishedDate = document.getElementById("publishedDate");
const category = document.getElementById("category");
const pages = document.getElementById("pages");
const language = document.getElementById("language");
const rating = document.getElementById("rating");
const description = document.getElementById("description");

const wantBtn = document.getElementById("wantBtn");
const finishBtn = document.getElementById("finishBtn");

const toast = document.getElementById("toast");

// ===============================
// Get Book ID
// ===============================

const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

// Current Book

let currentBook = null;

// ===============================
// Fetch Book
// ===============================

async function loadBook() {

    if (!bookId) {
        showError();
        return;
    }

    try {

        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes/${bookId}`
        );

        if (!response.ok) {
            throw new Error("Book not found");
        }

        const data = await response.json();

        currentBook = data;

        displayBook(data);

    }

    catch (err) {

        console.error(err);

        showError();

    }

}

// ===============================
// Display Book
// ===============================

function displayBook(book) {

    const info = book.volumeInfo;

    loading.classList.add("hidden");

    bookDetails.classList.remove("hidden");

    cover.src =
        info.imageLinks?.thumbnail ||
        "https://via.placeholder.com/250x360?text=No+Cover";

    title.textContent = info.title || "Unknown";

    author.textContent =
        info.authors?.join(", ") || "Unknown";

    publisher.textContent =
        info.publisher || "Not Available";

    publishedDate.textContent =
        info.publishedDate || "Not Available";

    category.textContent =
        info.categories?.join(", ") || "General";

    pages.textContent =
        info.pageCount || "N/A";

    language.textContent =
        (info.language || "N/A").toUpperCase();

    rating.textContent =
        info.averageRating
            ? `${info.averageRating} ⭐`
            : "No Rating";

    description.innerHTML =
        info.description || "No description available.";

}

// ===============================
// Show Error
// ===============================

function showError() {

    loading.classList.add("hidden");

    error.classList.remove("hidden");

}

// ===============================
// Local Storage
// ===============================

function getShelf() {

    return JSON.parse(localStorage.getItem("myShelf")) || [];

}

function saveShelf(data) {

    localStorage.setItem("myShelf", JSON.stringify(data));

}

// ===============================
// Add Book
// ===============================

function addBook(status) {

    if (!currentBook) return;

    let shelf = getShelf();

    const exists = shelf.find(
        book => book.id === currentBook.id
    );

    if (exists) {

        exists.status = status;

    } else {

        shelf.push({

            id: currentBook.id,

            status: status,

            title: currentBook.volumeInfo.title,

            authors: currentBook.volumeInfo.authors || [],

            image:
                currentBook.volumeInfo.imageLinks?.thumbnail || "",

            publisher:
                currentBook.volumeInfo.publisher || "",

            description:
                currentBook.volumeInfo.description || ""

        });

    }

    saveShelf(shelf);

    showToast(
        status === "want"
            ? "Added to Want to Read!"
            : "Marked as Finished!"
    );

}

// ===============================
// Toast
// ===============================

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

// ===============================
// Events
// ===============================

wantBtn.addEventListener("click", () => {

    addBook("want");

});

finishBtn.addEventListener("click", () => {

    addBook("finished");

});

// ===============================
// Start
// ===============================

loadBook();