const formTitle = document.querySelector('#mytitle');
const formAuthor = document.querySelector('#myauthor');
class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  // Add static modifies so as to avoid instanciating the class
  static reset() {
    document.querySelector('#mytitle').value = '';
    document.querySelector('#myauthor').value = '';
  }

  /* Add book method within class book capturing the value only
that is the book titile and author */
  addbook() {
    const book = {
      title: this.title.value,
      author: this.author.value,
    };

    const books = []; // create empty books array
    if (JSON.parse(localStorage.getItem('mybooks')) === null) { // get from local storage
      books.push(book);
      localStorage.setItem('mybooks', JSON.stringify(books));
    } else {
      const newbooks = JSON.parse(localStorage.getItem('mybooks'));
      newbooks.push(book);
      localStorage.setItem('mybooks', JSON.stringify(newbooks));
    }
  }

  static retrieve() {
    const booklist = document.querySelector('.list');
    const data = JSON.parse(localStorage.getItem('mybooks'));

    let str = '';
    if (data === null || data.length === 0) {
      str = '<p class="list-item">No more books!</p>';
    } else {
      data.forEach((book) => {
        str += `<li class="list-item">
          <p>${book.title} by ${book.author}</p>
          <a href="" class="remove-btn" id="erase"><button class="bt">Remove</button></a>
        </li>`;
      });
    }
    booklist.innerHTML = str;
  }

  static dellbooks(id) {
    let data = JSON.parse(localStorage.getItem('mybooks'));
    const selectedbook = data[id];
    const filteredBooks = data.filter((item) => item !== selectedbook);
    localStorage.setItem('mybooks', JSON.stringify(filteredBooks));
    const newData = JSON.parse(localStorage.getItem('mybooks'));
    data = newData;
  }
}

const alfred = new Books(formTitle, formAuthor); // instantiate class Books with alfred object

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  alfred.addbook();
  Books.reset();
  Books.retrieve();
});

Books.retrieve();
document.querySelectorAll('#erase').forEach((button, id) => {
  button.addEventListener('click', () => {
    Books.dellbooks(id);
    Books.retrieve();
  });
});