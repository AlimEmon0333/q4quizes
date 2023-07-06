// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  push,} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCks4KYWln2y1ya8OhGeKGLcW6aKecltuc",
  authDomain: "q4quizes.firebaseapp.com",
  projectId: "q4quizes",
  storageBucket: "q4quizes.appspot.com",
  messagingSenderId: "989922620819",
  appId: "1:989922620819:web:b687d7c7f2ae5a294aa466",
  measurementId: "G-RN8XV6BL2P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

var question = document.getElementById("question");
var option = document.getElementById("option");
var optionparent = document.getElementById("optionparent");
var correctAnswerElem = document.getElementById("correctAnswer");

var options = [];
var correctAnswer;

function renderOption() {
  optionparent.innerHTML = "";
  for (var i = 0; i < options.length; i++) {
    optionparent.innerHTML += `<li onclick="setCorrectAnswer('${options[i]}')" class="p-2 bg-light fs-5 rounded shadow my-2">${options[i]}</li>`;
  }
}

window.addoption = function () {
  options.push(option.value);
  console.log(options);
  renderOption();
};

window.setCorrectAnswer = function (a) {
  correctAnswer = a;
  correctAnswerElem.innerHTML = correctAnswer;
};

window.submitquestion = function () {
  var obj = {
    question: question.value,
    options: options,
    correctAnswer: correctAnswer,
  };
  obj.id = push(ref(db , 'questions/' )).key  
  const reference = ref(db,`questions/${obj.id}`)
  set(reference , obj)
  console.log(obj);
};
