class Book {
    constructor(title, author, isbn, dateIssue, price) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.dateIssue = dateIssue;
        this.price = price;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');

        // create tr element
        const row = document.createElement('tr');

        // insert cols

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.dateIssue}</td>
        <td>${book.price}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);
    }
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    clearfiled() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
        document.getElementById('dateIssue').value = '';
        document.getElementById('price').value = '';
    }
    showAlert(message, className) {
        const div = document.createElement('div');

        // Add classes
        div.className = `alert ${className}`;

        // Add text
        div.appendChild(document.createTextNode(message));

        // Get parent
        const container = document.querySelector('.container');

        //get form
        const form = document.querySelector('#book-form');

        //INsert alert

        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value,
        dateIssue = document.getElementById('dateIssue').value,
        price = document.getElementById('price').value;

    // Instantiate book
    const book = new Book(title, author, isbn, dateIssue, price);

    //Instantiate UI
    const ui = new UI();

    //Validate
    if (title === '' || author === '' || isbn === '' || dateIssue === '' || price === '') {
        // Error alert
        ui.showAlert('Please filed Empty Filed', 'error');
    } else {

        //add book to list
        ui.addBookToList(book);

        // Success alert
        ui.showAlert('Book Added!', 'success');

        //clear filed
        ui.clearfiled();
    }
    e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Booked Remove!', 'success')
    e.preventDefault();
})