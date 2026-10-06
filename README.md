# QuickNotes

QuickNotes is a simple browser-based note-taking app built with HTML, CSS and vanilla JavaScript. It lets users create categorized notes, search their notes instantly, delete individual notes, validate note length, and keep notes saved in the browser with localStorage so they remain available after a page refresh.

## Features

- Add notes with Personal, Work or Study categories
- Validate empty notes and notes longer than 200 characters
- Display notes as clean category-based cards
- Search notes without case sensitivity
- Delete individual notes
- Show an accurate note count for zero, one or many notes
- Save notes to localStorage and restore them on page load
- Responsive layout for smaller screens
- Semantic HTML structure and accessible labels

## How to Run Locally

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` with the Live Server extension, or open the file directly in a modern web browser.
4. Add a few notes, refresh the page, and confirm that the notes remain saved.

## What I Learned

- I learned how to build a semantic HTML page using elements such as `header`, `main`, `section` and `footer`.
- I learned how to use CSS Flexbox, category classes and media queries to create a responsive interface.
- I learned how JavaScript arrays of objects can be used to manage application data and how DOM methods such as `createElement` and `textContent` can safely build dynamic content.
- I learned how `localStorage`, `JSON.stringify()` and `JSON.parse()` can persist application data between page refreshes.
- I learned how event listeners can connect form submission, deletion and live search to an interactive web application.
