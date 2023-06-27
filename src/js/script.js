'use strict';

const favoriteBooks = [];
const filters = [];
const forms = document.querySelector('.filters');
const booksList = document.querySelector('.books-list');

function render() {
  for (let key in dataSource.books) {
    const book = dataSource.books[key];
    const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    const generatedHTML = template(book);
    const element = utils.createDOMFromHTML(generatedHTML);
    const bookRatingElem = element.querySelector('.book__rating__fill');
    console.log(book.rating);
    bookRatingElem.style.width = `${book.rating * 10}%`;
    let background = '';
    if (book.rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (book.rating >6 && book.rating<=8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (book.rating >8 && book.rating <=9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }
    else if (book.rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    bookRatingElem.style.background = background;
    booksList.appendChild(element);
  }
}

function filterBooks(){
  for(let book in dataSource.books){
    const bookElement = booksList.querySelector(`[data-id="${dataSource.books[book].id}"]`);
    let hide = false;
    for (const i in filters) {
      if(dataSource.books[book].details[filters[i]]) {
        hide = true;
      }
    }
    hide? bookElement.classList.add('hidden'):bookElement.classList.remove('hidden');
    if (filters.length == 0) {
      bookElement.classList.remove('hidden');
    }
  }
}


function initActions(){
  const bookList = document.querySelector('.books-list');
  bookList.addEventListener('dblclick', function(event) {
    event.preventDefault();
    if (!event.target.parentNode.parentNode.classList.contains('book__image')) return;
    event.target.parentNode.parentNode.classList.toggle('favorite');
    const id = event.target.parentNode.parentNode.getAttribute('data-id');
    if (event.target.parentNode.parentNode.classList.contains('favorite')) {
      favoriteBooks.push(id);
    } else {
      const index = favoriteBooks.indexOf(id);
      if (index > -1) favoriteBooks.splice(index, 1);
    }
  });

  forms.addEventListener('click', function(event){
    if (event.target.tagName != 'INPUT' || event.target.getAttribute('type') != 'checkbox' || event.target.getAttribute('name') != 'filter') return;
    if (event.target.checked) {
      filters.push(event.target.value);
    } else {
      const index = filters.indexOf(event.target.value);
      if (index > -1) filters.splice(index, 1);
    }
    filterBooks();
  });
}

render();
initActions();






