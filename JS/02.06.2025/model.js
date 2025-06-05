export class BookModel {
    constructor(books = [])
    {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            this.books = JSON.parse(storedBooks);
        } else {
            this.books = books;
            localStorage.setItem('books', JSON.stringify(this.books));
        }
    }
    addBook(title, author)
    {
        const duplicate = this.books.some(book =>
        {
            return book.title.toLowerCase() === title.toLowerCase().trim() &&
            book.author.toLowerCase() === author.toLowerCase().trim()
        }
        )
        console.log("++++");
        
        if (duplicate) {
            throw new Error('This book is exists')
        }
        const book = 
        {
            title,
            author
        }
        this.books.push(book);
        this.sortByABC();
        localStorage.setItem('books', JSON.stringify(this.books));
    }
    deleteBook(title)
    {
        this.books = this.books.filter(b => b.title !== title)
    }
    clearBooks()
    {
        this.books = [];
    }
    getBooks() {return this.books;}
    sortByABC()
    {
        this.books.sort((a, b) => a.title.localeCompare(b.title))
    }
}