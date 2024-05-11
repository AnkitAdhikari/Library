'use strict'
class Library {
    // starting class implementation
}
const newBookform = document.querySelector(".new-book-from")
const addBookBtn = document.querySelector('.add-book');
const submitBtn = document.getElementById('confirmBtn');
const titleEl = document.getElementById('title');
const authorEl = document.getElementById('author');
const pagesEl = document.getElementById('pages');
const haveReadEl = document.getElementById('read')
const closeBtn = document.querySelector('.cancel');
const dialogBox = document.querySelector('#book-dialog')
const bookContainer = document.querySelector('.book-container');
let readingBtns = document.querySelectorAll('.reading');
let removeBtns = document.querySelectorAll('.remove');



// arry of objects
const myLibrary = [
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

function updateBtns() {
    readingBtns = document.querySelectorAll('.reading');
    removeBtns = document.querySelectorAll('.remove');
    readingBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            console.log(btn)
            btn.classList.toggle('off');
            myLibrary[btn.dataset.id].isRead = !(myLibrary[btn.dataset.id].isRead)
            console.log(myLibrary[btn.dataset.id])
        })
    })

    removeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            btn.closest('.book').style.display = 'none';
            myLibrary.splice(btn.dataset.id, 1)
            console.log(myLibrary)
        })
    })
}

function loadBookMarkpup() {
    myLibrary.forEach((book, id, _) => {
        bookContainer.insertAdjacentHTML('beforeend', `<div class="book">
        <div class="title">${book.title}</div>
        <div class="author">${book.author}</div>
        <div class="page-info"><span class="pages">${book.pages}</span> pages</div>
        <div class="book-action">
          <button data-id=${id} class="${book.isRead ? '' : 'off'} reading" type="button">Have Read</button>
          <button data-id=${id} class="remove" type="button">Remove</button>
        </div>
      </div>`)
    })
    updateBtns();
}

loadBookMarkpup()

function Book(title, author, pages, isRead) {
    // the constructor
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
    // this.comments = anyComments;
}

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    console.log(myLibrary)
    let newId = myLibrary.length - 1;
    bookContainer.insertAdjacentHTML('beforeend', `<div class="book">
    <div class="title">${book.title}</div>
    <div class="author">${book.author}</div>
    <div class="page-info"><span class="pages">${book.pages}</span> pages</div>
    <div class="book-action">
      <button data-id=${newId} class="${book.isRead ? '' : 'off'} reading" type="button">Have Read</button>
      <button data-id=${newId} class="remove" type="button">Remove</button>
    </div>
  </div>`)
    updateBtns();
}

newBookform.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary(titleEl.value, authorEl.value, Number(pagesEl.value), haveReadEl.checked)
    dialogBox.close()
})

closeBtn.addEventListener('click', () => {
    dialogBox.close()
})

addBookBtn.addEventListener("click", (e) => {
    dialogBox.show();
})