const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messageList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName;

const login = (e) => {
  e.preventDefault();

  if (!userNameInput.value) {
    return alert("Field can't be empty");
  }

  userName = userNameInput.value;

  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
};

loginForm.addEventListener('submit', (e) => login(e));
