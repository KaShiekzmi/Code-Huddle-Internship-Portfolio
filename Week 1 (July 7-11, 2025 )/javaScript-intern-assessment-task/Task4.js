class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.isAvailable = true;
    }

    borrow() {
        if (this.isAvailable) {
            this.isAvailable = false;
            return "Book borrowed";
        } else {
            return "Book not available";
        }
    }

    return() {
        this.isAvailable = true;
        return "Book returned";
    }

    getInfo() {
        return "Book " + this.title + " was written by " + this.author;
    }
}

class Member {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.history = [];
    }

    borrowBook(book) {
        if (book.isAvailable) {
            book.borrow();
            this.history.push({ book: book.title, date: new Date() });
            return "Borrowed: " + book.title;
        } else {
            return "Book not available";
        }
    }
}

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
        this.members = [];
        this.borrowedBooks = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(isbn) {
        this.books = this.books.filter(function (b) {
            return b.isbn !== isbn;
        });
    }

    findBook(isbn) {
        const book = this.books.find(function (b) {
            return b.isbn === isbn;
        });
        return book;
    }

    registerMember(member) {
        this.members.push(member);
    }

    borrowBook(memberId, isbn) {
        var member = this.members.find((m) => {
            return m.id === memberId;
        });

        var book = this.findBook(isbn);

        if (!member) {
            return "Member not found";
        }

        if (!book) {
            return "Book not found";
        }

        if (!book.isAvailable) {
            return "Book not available";
        }

        book.borrow();
        this.borrowedBooks.push({ memberId: memberId, isbn: isbn, date: new Date() });
        member.history.push({ book: book.title, date: new Date() });

        return "Book borrowed successfully";
    }

    getOverdueBooks() {
        var now = new Date();
        var overdues = [];

        for (var i = 0; i < this.borrowedBooks.length; i++) {
            var borrowDate = this.borrowedBooks[i].date;
            var days = Math.floor((now - borrowDate) / (1000 * 60 * 60 * 24));

            if (days > 14) {
                overdues.push(this.borrowedBooks[i]);
            }
        }

        return overdues;
    }
}


var lib = new Library("COMSATS Library");

var book1 = new Book("Steve Job", "Walter", "1");
var book2 = new Book("The Panama Papers", "Bastian and Frederik", "2");

lib.addBook(book1);
lib.addBook(book2);

var member1 = new Member("Kashif Abbas Kazmi", 1);
lib.registerMember(member1);

console.log(lib.borrowBook(1, "1"));
console.log(lib.borrowBook(1, "2"));

console.log(lib.getOverdueBooks());
console.log(lib)
