import { BookView } from "./view.js";
import { BookModel } from "./model.js";
import { BookController } from "./controller.js";


const books = 
[
    {author:'author1', title: 'title1'},
    {author:'author2', title: 'title2'},
    {author:'author3', title: 'title3'},
    {author:'author4', title: 'title4'},
    {author:'author5', title: 'title5'},
]
const booksModel = new BookModel(books);
booksModel.addBook('t11', 'a11')
booksModel.deleteBook('title2')

const bookView = new BookView();

const bookController = new BookController(booksModel, bookView);

bookController.renderBooks()