const booktitle = document.querySelector('#mytitle');
const authorname = document.querySelector('#myauthor');

document.querySelector('form').addEventListener('submit', () => {
  const book = {
    title: booktitle.value,
    author: authorname.value,
  };

  const books = [];
  if (JSON.parse(localStorage.getItem('mybooks')) === null) {
    books.push(book);
    localStorage.setItem('mybooks', JSON.stringify(books));
  } else {
    const newbooks = JSON.parse(localStorage.getItem('mybooks'));
    newbooks.push(book);
    localStorage.setItem('mybooks', JSON.stringify(newbooks));
  }
});

const booklist = document.querySelector('.list');
let data = JSON.parse(localStorage.getItem('mybooks'));

let str = '';
if (JSON.parse(localStorage.getItem('mybooks')) === null || data.length === 0) {
  str = '<li class="display-list">No book stored!</li>';
} else {
  /* eslint-disable-next-line no-unused-vars */
  const arr = data.map((obj) => {
    str += `<li class="display-list">
         <p> Book Title: ${obj.title}  Book author :${obj.author}</p>
       <a href="" class="remove-btn" id="remove-book">Remove</a>
     </li>`;

    return str;
  });
}
booklist.innerHTML = str;

document.querySelectorAll('#remove-book').forEach((button, id) => {
  button.addEventListener('click', () => {
    const selectedbook = data[id];
    const filteredBooks = data.filter((item) => item !== selectedbook);
    localStorage.setItem('mybooks', JSON.stringify(filteredBooks));
    const newData = JSON.parse(localStorage.getItem('mybooks'));
    data = newData;
  });
});
