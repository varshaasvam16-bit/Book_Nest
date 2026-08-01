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
const readBtn = document.getElementById("readBtn");
const readMessage = document.getElementById("readMessage");

const toast = document.getElementById("toast");

// ===============================
// Get Book ID
// ===============================

const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

// Current Book

let currentBook = null;
let readUrl = "";

// ===============================
// Fetch Book
// ===============================

async function loadBook() {

    if (!bookId) {
        showError();
        return;
    }

    try {

        let data;

        if (bookId.startsWith("/")) {
            data = await fetchOpenLibraryBook(bookId);
        } else {
            data = await fetchGoogleBook(bookId);
        }

        const readInfo = await resolveReadLink(data);

        currentBook = data;
        readUrl = readInfo?.url || "";
        currentBook.readUrl = readUrl;
        currentBook.readable = Boolean(readUrl);

        displayBook(data);
        updateReadButton();

    }

    catch (err) {

        console.error(err);

        showError();

    }

}

async function fetchGoogleBook(bookId) {

    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
    );

    if (!response.ok) {
        throw new Error("Google Books request failed");
    }

    const data = await response.json();

    return {
        id: data.id,
        volumeInfo: {
            title: data.volumeInfo?.title || "Unknown",
            authors: data.volumeInfo?.authors || ["Unknown"],
            publisher: data.volumeInfo?.publisher || "Unknown",
            publishedDate: data.volumeInfo?.publishedDate || "Unknown",
            categories: data.volumeInfo?.categories || ["General"],
            pageCount: data.volumeInfo?.pageCount || "N/A",
            language: data.volumeInfo?.language || "N/A",
            averageRating: data.volumeInfo?.averageRating || null,
            description: data.volumeInfo?.description || "No description available.",
            imageLinks: data.volumeInfo?.imageLinks || {}
        }
    };

}

async function fetchOpenLibraryBook(bookId) {

    const response = await fetch(
        `https://openlibrary.org${bookId}.json`
    );

    if (!response.ok) {
        throw new Error("Open Library request failed");
    }

    const data = await response.json();

    const description = typeof data.description === "string"
        ? data.description
        : data.description?.value || "No description available.";

    return {
        id: bookId,
        volumeInfo: {
            title: data.title || "Unknown",
            authors: data.authors?.map(author => author.name || "Unknown") || ["Unknown"],
            publisher: data.publishers?.[0] || "Unknown",
            publishedDate: data.first_publish_date || "Unknown",
            categories: [],
            pageCount: data.number_of_pages || "N/A",
            language: "EN",
            averageRating: null,
            description,
            imageLinks: {
                thumbnail: data.covers?.[0]
                    ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`
                    : ""
            }
        }
    };

}

async function resolveReadLink(book) {

    const title = book.volumeInfo?.title || "";
    const authors = book.volumeInfo?.authors || [];
    const authorText = authors.join(" ").trim();
    const query = [title, authorText].filter(Boolean).join(" ");

    if (!query) return null;

    try {

        const response = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        const result = (data.docs || []).find(doc => doc.key) || (data.docs || [])[0];

        if (!result) {
            return null;
        }

        const archiveUrl = result.ia?.[0]
            ? `https://archive.org/details/${result.ia[0]}`
            : null;

        const openLibraryUrl = result.key
            ? `https://openlibrary.org${result.key}`
            : null;

        return {
            url: archiveUrl || openLibraryUrl || null
        };

    } catch (err) {

        console.warn("Could not resolve reading link.", err);
        return null;

    }

}

function updateReadButton() {

    if (!readBtn || !readMessage) return;

    if (readUrl) {

        readBtn.disabled = false;
        readMessage.classList.add("hidden");
        readMessage.textContent = "";

    } else {

        readBtn.disabled = true;
        readMessage.textContent = "This book is not available for online reading.";
        readMessage.classList.remove("hidden");

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
                currentBook.volumeInfo.description || "",

            readUrl: currentBook.readUrl || ""

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

readBtn.addEventListener("click", () => {

    if (!readUrl) {

        readMessage.textContent = "This book is not available for online reading.";
        readMessage.classList.remove("hidden");
        return;

    }

    window.open(readUrl, "_blank", "noopener,noreferrer");

});

// ===============================
// Start
// ===============================

loadBook();