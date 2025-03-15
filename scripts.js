const myLibrary = [];

const modal = document.querySelector("#modal");
const addBookButton = document.querySelector("#addBookButton");
const submitButton = document.querySelector("#submit");
const cancelButton = document.querySelector(".cancel");
submitButton.addEventListener("click", submitBook);

cancelButton.addEventListener("click", () => {
    modal.close(); // Close the modal when cancel button is clicked
});

addBookButton.addEventListener("click", () => {
    modal.showModal();
})

document.querySelector("tbody").addEventListener("click", deleteBook);

function deleteBook(event) {
    console.log(`Event target: ${event.target.tagName}`);
    if (event.target.tagName === "BUTTON" && event.target.classList.contains("deleteButton")) {
        let targetBookId = event.target.parentElement.dataset.bookId;
        myLibrary.splice(myLibrary.indexOf(myLibrary.find((book) => book.id === targetBookId)), 1);
    }
    displayBooks()
}

function submitBook(event) {
    event.preventDefault();

    if (document.querySelector("#bookForm").reportValidity()) {
        let bookName = document.querySelector("#bookName").value;
        let author = document.querySelector("#author").value;
        let pageCount = document.querySelector("#pageCount").value;
        let isRead = document.querySelector("#isRead").checked;
    
        addBookToLibrary(bookName, author, pageCount, isRead);
        displayBooks();
        modal.close();
    }
}

function Book(title, author, pageCount, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = `By ${author}`;
    this.pageCount = `${pageCount} pages`;
    if (isRead) {
        this.isRead = "Read";
    } else {
        this.isRead = "Not yet read";
    }
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.isRead}`;
    }
}

function addBookToLibrary(title, author, pageCount, isRead) {
    const book = new Book(title, author, pageCount, isRead);
    myLibrary.push(book);
}

function displayBooks() {
    const propertiesToDisplay = ["title","author","pageCount","isRead"];
    const table = document.querySelector("#bookTable > tbody");
    table.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        const currentBook = myLibrary[i]
        const tableRow = document.createElement("tr");
        tableRow.setAttribute("data-book-id", currentBook.id)

        // Iterate the keys in current book, if they key is
        // a desired key, add it to the table row.
        for (const key in currentBook) {
            if (currentBook.hasOwnProperty(key) && propertiesToDisplay.includes(key)) {
                const columnVal = document.createElement("td");
                columnVal.textContent = currentBook[key];
                columnVal.classList.add(key)
                tableRow.appendChild(columnVal);
            }
        }

        // CHATGPT CHATGPT CHATGPT CHATGPT CHATGPT CHATGPT CHATGPT CHATGPT

        /*
        PROMPT:
            Change this code to allow toggling of books being read or unread.
        Please don't change my code, just add new lines.
        If the book is read, have the button say "Mark book as unread" if the book isn't read have the button say "Mark book as read".
        Don't delete the book, just toggle it's isRead status.
        */

        // Create a toggle read/unread button
        let toggleReadButton = document.createElement("button");
        toggleReadButton.classList.add("toggleReadButton");
        toggleReadButton.textContent = currentBook.isRead === "Read" ? "Mark book as unread" : "Mark book as read";
        toggleReadButton.addEventListener("click", () => {
            // Toggle the isRead status
            currentBook.isRead = currentBook.isRead === "Read" ? "Not yet read" : "Read";
            // Update the button text
            toggleReadButton.textContent = currentBook.isRead === "Read" ? "Mark book as unread" : "Mark book as read";
        });

        // Append the toggle read/unread button
        tableRow.appendChild(toggleReadButton);

        // CHATGPT CHATGPT CHATGPT CHATGPT CHATGPT CHATGPT CHATGPT CHATGPT

        let button = document.createElement("button");
        button.textContent = "Delete Book";
        button.classList.add("deleteButton");
        tableRow.appendChild(button);

        table.appendChild(tableRow);
    }
}
