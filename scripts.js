const myLibrary = [];

const addBookButton = document.querySelector("#addBookButton");
const modal = document.querySelector("#modal");

addBookButton.addEventListener("click", () => {
    modal.showModal();
})

const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", submitBook);

document.querySelector("tbody").addEventListener("click", deleteBook);

function deleteBook(event) {
    console.log(`Event target: ${event.target.tagName}`);
    if (event.target.tagName === "BUTTON") {
        let targetBookId = event.target.parentElement.dataset.bookId;
        myLibrary.splice(myLibrary.indexOf(myLibrary.find((book) => book.id === targetBookId)), 1);
    }
    displayBooks()
}

function submitBook(event) {
    event.preventDefault();

    let bookName = document.querySelector("#bookName").value;
    let author = document.querySelector("#author").value;
    let pageCount = document.querySelector("#pageCount").value;
    let isRead = document.querySelector("#isRead").checked;

    addBookToLibrary(bookName, author, pageCount, isRead);
    displayBooks();
    modal.close();
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
        let button = document.createElement("button");
        button.textContent = "Delete Book";
        button.classList.add("deleteButton");
        tableRow.appendChild(button);
        table.appendChild(tableRow);
    }
}
