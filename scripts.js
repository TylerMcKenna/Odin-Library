const myLibrary = [];

function Book(title, author, pageCount, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    if (isRead) {
        this.isRead = "Read";
    } else {
        this.isRead = "Not read";
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
    const table = document.querySelector("#bookTable");
    
    for (let i = 0; i < myLibrary.length; i++) {
        const tableRow = document.createElement("tr");
        
        // Iterate the keys in current book, if they key is
        // a desired key, add it to the table row.
        for (const key in myLibrary[i]) {
            if (myLibrary[i].hasOwnProperty(key) && propertiesToDisplay.includes(key)) {
                const columnVal = document.createElement("td");
                columnVal.textContent = myLibrary[i][key];
                tableRow.appendChild(columnVal);
            }
        }
        
        table.appendChild(tableRow);
    }
}





const addBookButton = document.querySelector("#addBookButton");
const modal = document.querySelector("#modal");

addBookButton.addEventListener("click", () => {
    modal.showModal();
})

const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", submitBook);

function submitBook(event) {
    event.preventDefault();
    let bookName = document.querySelector("#bookName").value;
    let author = document.querySelector("#author").value;
    let pageCount = document.querySelector("#pageCount").value;
    let isRead = document.querySelector("#isRead").checked;
    addBookToLibrary(bookName, author, pageCount, isRead);
    displayBooks(); // need to make this function reset upon submittal.
    modal.close();
}