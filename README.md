# 📚 BookNest – Book Finder & Reading Tracker

BookNest is a responsive web application that helps users discover books using the Google Books API, explore book information, and maintain a personal reading shelf. The project is built with **HTML, CSS, and JavaScript** without using any frontend frameworks.

---

## 🚀 Features

### ✅ Completed

* 🔍 Search books by title, author, or keyword using the Google Books API
* 📖 Display book title, author, publisher, and cover image
* ⏳ Loading indicator while fetching data
* ⚠️ Error handling for failed API requests
* 📭 "No Results Found" message for empty searches
* ✅ Client-side search form validation
* 📱 Responsive design for desktop, tablet, and mobile devices
* 🎨 Consistent UI with reusable styles
* 🧭 Navigation across all project pages

---

## 🚧 In Progress

* 📖 Detailed book information page
* 📚 My Shelf page
* ⭐ Add books to "Want to Read" and "Finished"
* 💾 Local Storage integration for reading shelf
* 📊 Reading progress tracking

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Google Books API
* Local Storage

---

## 📂 Project Structure

```text
BookNest/
│── index.html
│── search.html
│── details.html
│── shelf.html
│
├── css/
│   ├── style.css
│   ├── search.css
│   ├── details.css
│   └── shelf.css
│
├── js/
│   ├── search.js
│   ├── details.js
│   └── shelf.js
│
├── assets/
│   └── images/
│
└── README.md
```

---

## 👥 Team Members

* **Thillai Eswari T**
* **Varshaa A.S**

---

## 📋 Work Distribution

### Thillai Eswari T

* Designed and developed the Home page
* Developed the Search page
* Integrated the Google Books API
* Implemented search functionality using `fetch()`
* Added loading, error, and no-results states
* Implemented search form validation
* Built responsive search result cards
* Maintained responsive UI and shared styling

### Varshaa A.S

* Developed the Book Details page
* Developed the My Shelf page
* Implemented Local Storage
* Added reading shelf management
* Developed reading progress tracking

---

## 🔗 Google Books API

API Endpoint:

```text
https://www.googleapis.com/books/v1/volumes?q={searchTerm}
```

No API key is required for basic book searches.

---

## ▶️ How to Run

1. Clone the repository.
2. Open the project folder.
3. Open `index.html` in your browser.
4. Navigate to the Search page.
5. Search for any book using the Google Books API.

---

## 📌 Project Status

### Completed

* ✅ Home Page
* ✅ Search Page
* ✅ Google Books API Integration
* ✅ Loading State
* ✅ Error Handling
* ✅ No Results State
* ✅ Form Validation
* ✅ Responsive Design
* ✅ Shared Navigation and Styling

### Remaining

* 🚧 Book Details Page
* 🚧 My Shelf
* 🚧 Local Storage Integration
* 🚧 Reading Progress Tracking

---

## 🔮 Future Enhancements

* Search by category
* Search by author filters
* Favorites feature
* Pagination for search results
* Dark mode
* Reading statistics dashboard
* User authentication

---
## 🧪 Testing Checklist

- ✅ Book search using Google Books API
- ✅ Loading state displayed while fetching data
- ✅ Error message displayed when the API request fails
- ✅ No results message shown for empty searches
- ✅ Responsive layout tested on different screen sizes
---

## 🌐 Deployment

The project is deployed on **Vercel**.

**Live URL:** https://booknest-brown.vercel.app

## 📄 License

This project was developed as part of the **ZyoraByte Internship Program** for educational and learning purposes.
