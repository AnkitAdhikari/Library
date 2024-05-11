'use strict'
class Library {
    #library;
    constructor() {
        this.#library = [
            {
                title: "Atomic Habits",
                author: "James Clear",
                pages: 320,
                isRead: true,
            },
            {
                title: "Deep Work",
                author: "Cal Newport",
                pages: 304,
                isRead: false,
            },
            {
                title: "The Alchemist",
                author: "Paulo Coelho",
                pages: 182,
                isRead: false,
            }];
        this.cacheDom();
        this.render();
    }

    render() {
        this.emptyBookContainer();
        this.#library.forEach((book, i, _) => {
            this.bookContainer.insertAdjacentHTML('beforeend', `<div class="book">
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="page-info"><span class="pages">${book.pages}</span> pages</div>
            <div class="book-action">
              <button data-id=${i} class="${book.isRead ? '' : 'off'} reading" type="button">Have Read</button>
              <button data-id=${i} class="remove" type="button">Remove</button>
            </div>
          </div>`)
        })
        this.bindevents();
    }

    cacheDom() {
        this.addBookBtn = document.querySelector('.add-book');
        this.dialogBox = document.getElementById('book-dialog')
        this.submitBtn = document.getElementById('confirmBtn');
        this.titleEl = document.getElementById('title');
        this.authorEl = document.getElementById('author');
        this.pagesEl = document.getElementById('pages');
        this.haveReadEl = document.getElementById('read')
        this.closeBtn = document.querySelector('.cancel');
        this.bookContainer = document.querySelector('.book-container');
        this.newBookform = document.querySelector(".new-book-from")
    }

    bindevents() {
        this.addBookBtn.addEventListener('click', this.showDialogBox.bind(this))
        this.newBookform.addEventListener('submit', this.newBook.bind(this))
        this.closeBtn.addEventListener('click', this.closeDialogBox.bind(this));
        document.querySelectorAll('.reading').forEach(el => {
            el.addEventListener('click', this.updateReading.bind(this, el.dataset.id))
        })
        document.querySelectorAll('.remove').forEach(el => {
            el.addEventListener('click', this.removeBook.bind(this, el.dataset.id))
        })
    }

    emptyBookContainer() {
        this.bookContainer.innerHTML = '';
    }

    getNewBookInfo() {
        return {
            title: this.titleEl.value,
            author: this.authorEl.value,
            pages: Number(this.pagesEl.value),
            isRead: this.haveReadEl.checked,
        }
    }

    newBook(e) {
        e.preventDefault();
        this.#library.push(this.getNewBookInfo());
        console.log(this.#library);
        this.titleEl.value = '';
        this.authorEl.value = '';
        this.pagesEl.value = '';
        this.dialogBox.close();
        this.render();
    }

    updateReading(index) {
        this.#library[index].isRead = !this.#library[index].isRead
        this.#library
        this.render();
    }

    removeBook(index) {
        this.#library.splice(index, 1);
        console.log(this.#library)
        this.render();
    }

    showDialogBox() {
        this.dialogBox.show();
    }
    closeDialogBox() {
        this.dialogBox.close();
    }

}

new Library();