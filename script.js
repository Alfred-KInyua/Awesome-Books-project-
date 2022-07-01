const listSection = document.querySelector('.list-section');
const addsection = document.querySelector('.add-section');
const contactSection = document.querySelector('.contact-section');
const firstMenu = document.querySelector('#top-list');
const secondMenu = document.querySelector('#top-Add');
const thirdMenu = document.querySelector('#top-contact');
document.querySelectorAll('.menu-items').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    firstMenu.addEventListener('click', () => {
      listSection.style.display = 'flex';
      listSection.style.flexDirection = 'column';
      listSection.style.justifyContent = 'center';
      addsection.style.display = 'none';
      contactSection.style.display = 'none';
    });
    secondMenu.addEventListener('click', () => {
      listSection.style.display = 'none';
      addsection.style.display = 'block';
      contactSection.style.display = 'none';
    });
    thirdMenu.addEventListener('click', () => {
      listSection.style.display = 'none';
      addsection.style.display = 'none';
      contactSection.style.display = 'flex';
      contactSection.style.flexDirection = 'column';
      contactSection.style.alignItems = 'center';
    });
  });
});
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
      str = '<div class="list-item"><h3>No more books!</h3></div>';
    } else {
      data.forEach((book) => {
        str += `<table class="list-item ">
          <tr><td class ="cud">${book.title} </td><td>by</td> <td>${book.author}</td>
         <td><a href="" class="remove-btn" id="erase"><button>Remove</button></a></td></tr>
        </table>`;
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