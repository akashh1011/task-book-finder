📚 Book Finder
Book Finder is a responsive React + TailwindCSS web app that allows users to quickly search books using the Open Library API.
The app lets you search by Title, Author, or Year with a clean UI, error handling, and smooth user experience.

//FEATURES

-> Search by Title, Author, or Year (dropdown selector)
-> Fast API requests with Axios
-> Modern UI with TailwindCSS and gradient background
-> Responsive Design – works across mobile, tablet, and desktop
-> Loading states & error handling
-> No results message for unmatched searches
-> Interactive hover effects on book cards


// TECH STACK
-> Tech Stack
-> React.js – Frontend framework
-> TailwindCSS – Styling and responsiveness
-> Axios – API requests
-> Open Library API – Book search data

//PROJECT STRUCTURE

book-finder/
│── src/
│   ├── App.jsx       # Main React component
│   ├── index.css    # Tailwind setup
│   └── ...          # Other config files
│
│── package.json      # Dependencies & scripts
│── tailwind.config.js
│── README.md


//Installation & Setup

-> Clone the repository
git clone https://github.com/akashh1011/book-finder.git
cd book-finder

->Install dependencies
npm install

-> Run the app

npm run dev

//API Reference

https://openlibrary.org/search.json?title={bookTitle}
https://openlibrary.org/search.json?author={authorName}
https://openlibrary.org/search.json?first_publish_year={year}


//Future Enhancements

-> Pagination (Next/Prev pages for results)
-> Save favorite books to local storage
-> Show book cover images


