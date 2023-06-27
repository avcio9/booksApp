'use strict';

const select = {
  filters: '.filters',
  booksList: '.books-list',
};

class BooksList {
  constructor(){
    const thisBooksList = this;
    thisBooksList.getElements();
    thisBooksList.render();
    thisBooksList.initActions();
  }
  getElements(){
    const thisBooksList = this;
    thisBooksList.favoriteBooks = [];
    thisBooksList.filters = [];
    thisBooksList.list = {};
    thisBooksList.dom = {};
    thisBooksList.dom.booksListElem = document.querySelector(select.booksList);
    thisBooksList.dom.filters = document.querySelector(select.filters);
  }

  render() {
    const thisBooksList = this;
    for (let key in dataSource.books) {
      const book = new Book(dataSource.books[key]);
      thisBooksList.list[book.id] = book;
      thisBooksList.dom.booksListElem.appendChild(book.element);
    }
  }
  
  initActions(){
    const thisBooksList = this;
    const bookList = document.querySelector(select.booksList);
    bookList.addEventListener('dblclick', function(event) {
      event.preventDefault();
      if (!event.target.parentNode.parentNode.classList.contains('book__image')) return;
      event.target.parentNode.parentNode.classList.toggle('favorite');
      const id = event.target.parentNode.parentNode.getAttribute('data-id');
      if (event.target.parentNode.parentNode.classList.contains('favorite')) {
        thisBooksList.favoriteBooks.push(id);
      } else {
        const index = thisBooksList.favoriteBooks.indexOf(id);
        if (index > -1) thisBooksList.favoriteBooks.splice(index, 1);
      }
    });
  
    thisBooksList.dom.filters.addEventListener('click', function(event){
      if (event.target.tagName != 'INPUT' || event.target.getAttribute('type') != 'checkbox' || event.target.getAttribute('name') != 'filter') return;
      if (event.target.checked) {
        thisBooksList.filters.push(event.target.value);
      } else {
        const index = thisBooksList.filters.indexOf(event.target.value);
        if (index > -1) thisBooksList.filters.splice(index, 1);
      }
      thisBooksList.filterBooks();
    });
  }

  filterBooks(){
    const thisBooksList = this;
    for(let book in thisBooksList.list){
      const bookElement = thisBooksList.dom.booksListElem.querySelector(`[data-id="${book}"]`);
      let hide = false;
      for (const i in thisBooksList.filters) {
        if(thisBooksList.list[book].details[thisBooksList.filters[i]]) {
          hide = true;
        }
      }
      hide? bookElement.classList.add('hidden'):bookElement.classList.remove('hidden');
      if (thisBooksList.filters.length == 0) {
        bookElement.classList.remove('hidden');
      }
    }
  }
}

class Book {
  constructor(data){
    const thisBook = this;
    thisBook.getElements(data);
    thisBook.getStyles();
  }
  getElements(data){
    const thisBook = this;
    Object.assign(thisBook, data);
    const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    const generatedHTML = template(thisBook);
    thisBook.element = utils.createDOMFromHTML(generatedHTML);
  }
  getStyles(){
    const thisBook = this;
    thisBook.styles = {};
    thisBook.styles.width = `${thisBook.rating * 10}%`;
    if (thisBook.rating < 6) {
      thisBook.styles.background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (thisBook.rating >6 && thisBook.rating<=8) {
      thisBook.styles.background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (thisBook.rating >8 && thisBook.rating <=9) {
      thisBook.styles.background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }
    else if (thisBook.rating > 9) {
      thisBook.styles.background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    const bookRatingElem = thisBook.element.querySelector('.book__rating__fill');
    bookRatingElem.style.width = thisBook.styles.width;
    bookRatingElem.style.background = thisBook.styles.background;
  }
}

const app = {
  init: function(){
    app.bookList = new BooksList();
  }
};

app.init();