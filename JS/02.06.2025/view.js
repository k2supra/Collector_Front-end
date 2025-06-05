export class BookView {
    constructor() {
        this.input = document.getElementById('filter');
        this.clearButton = document.getElementById('clearButton');
        this.authorInput = document.getElementById('author');
        this.titleInput = document.getElementById('title');
        this.addButton = document.getElementById('add');
        this.ul = document.querySelector('ul');
        this.counter = document.getElementById('booksCounter');
    }
    #getInputValue()
    {
        return this.input.value;
    }
    renderBooks(books)
    {
        this.ul.innerHTML = '';
        books.forEach(book => {
            this.ul.insertAdjacentHTML('beforeend', `<li class='bookItem'>${book.author}: ${book.title}</li>`)
        });
        this.counter.textContent = books.length;
    }
    bindInputSort(handler)
    {
        this.input.addEventListener('input', ()=>
        {

            handler(this.#getInputValue().trim())
        })
    }
    bindClearButton(handler)
    {
        this.clearButton.addEventListener('click', handler)
    }
    bindAddButton(handler)
    {
        this.addButton.addEventListener('click', (e)=>
        {
            e.preventDefault();
            handler(this.authorInput.value, this.titleInput.value)
        });
    }
}