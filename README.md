# 📚 BookNest – Book Finder & Reading Tracker

BookNest is a simple and responsive web application that allows users to search for books using the Google Books API, explore book details, and maintain a personal reading shelf. The application is built using HTML, CSS, and JavaScript without any frameworks.

## 🚀 Features

- 🔍 Search books using the Google Books API
- 📖 View book title, author, cover image, and description
- ⏳ Loading indicator while fetching data
- ⚠️ Error handling for failed requests
- 📭 No results message when no books are found
- 📚 Book details page
- ⭐ Add books to "Want to Read" or "Finished"
- 💾 Save reading list using Local Storage
- 📊 Reading progress counter
- 📱 Fully responsive design

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Google Books API
- Local Storage

## 📂 Project Structure

```
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

## 👥 Team Members

- **Thillai Eswari T**
- **Varshaa A.S**

## 📋 Work Distribution

### Thillai Eswari T
- Search Page
- Search Results
- Google Books API Integration
- Loading & Error Handling
- Responsive Search Result Cards

### Varshaa A.S
- Book Details Page
- My Shelf Page
- Add to Shelf (Want to Read / Finished)
- Local Storage
- Reading Progress Counter

## 🔗 Google Books API

```
https://www.googleapis.com/books/v1/volumes?q={searchTerm}
```

No API key is required.

## ▶️ How to Run

1. Clone the repository.
2. Open the project folder.
3. Open `index.html` in your browser.
4. Search for any book and explore the application.

## 📌 Future Enhancements

- Search filters by author and category
- Dark mode
- Pagination
- Favorites
- User authentication
- Reading statistics

## 📄 License

This project was developed as part of the **ZyoraByte Internship Program** for educational purposes.
