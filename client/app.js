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
    return alert("Login field can't be empty");
  }

  userName = userNameInput.value;

  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
};

const sendMessage = (e) => {
  e.preventDefault();

  if (!messageContentInput.value) {
    return alert("Message field can't be empty");
  }

  addMessage(userName, messageContentInput.value);
  messageContentInput.value = '';
};

const addMessage = (userName, message) => {
  console.log('userName: ', userName);
  console.log('add message: ', message);
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
