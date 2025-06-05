export class BookController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.handleInputSort = this.handleInputSort.bind(this);
        this.handleClearButton = this.handleClearButton.bind(this);
        this.handleAddButton = this.handleAddButton.bind(this);

        view.bindInputSort(this.handleInputSort);
        view.bindClearButton(this.handleClearButton);
        view.bindAddButton(this.handleAddButton);
    }
    handleInputSort(author)
    {
        let tempBooks = [...this.model.getBooks()];
        tempBooks = tempBooks.filter(b => b.author.includes(author));
        this.view.renderBooks(tempBooks);
    }
    handleClearButton()
    {
        this.model.clearBooks();
        this.renderBooks();
    }
    handleAddButton(author, title)
    {
        this.model.addBook(title, author);
        this.renderBooks();
    }
    renderBooks()
    {
        this.view.renderBooks(this.model.getBooks())
    }
}