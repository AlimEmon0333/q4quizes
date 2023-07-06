// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
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

var loader = document.getElementById('loader')
var showQuestion = document.getElementById('showQuestion')

function getDataFromDatabase() {
loader.style.display = 'block'
showQuestion.style.display = 'none'

  const reference = ref(db, "questions/");
  onChildAdded(reference, function (data) {
    console.log(data.val());
    questions.push(data.val());
    renderQuestions();

    loader.style.display = 'none'
showQuestion.style.display = 'block'


  });
}
getDataFromDatabase();

var questions = [];
var currentQuestion = document.getElementById("currentQuestion");
var totalQuestion = document.getElementById("totalQuestion");
var question = document.getElementById("question");
var answerPerent = document.getElementById("answerPerent");

var indexNum = 0;
var score = 0;

window.checkquestion = function (a, b) {
  if (a == b) {
    score++;
    console.log(score);
  }
  nextQuestion();
};

window.nextQuestion = function () {
  if (indexNum + 1 == questions.length) {
    alert("Your Quiz is finished And Your Score is  " + score + "/" + "2");
  } else {
    indexNum++;
    renderQuestions();
  }
};


function renderQuestions() {
  currentQuestion.innerHTML = indexNum + 1;
  totalQuestion.innerHTML = questions.length;

  var obj = questions[indexNum];

  question.innerHTML = obj.question;
  answerPerent.innerHTML = "";
  for (var i = 0; i < obj.options.length; i++) {
    answerPerent.innerHTML += ` <div class="col-md-12">
    <div class="py-2">
        <button onclick="checkquestion('${obj.options[i]}','${obj.correctAnswer}')" class="btn btn-dark fs-4 rounded-pill w-100">
          ${obj.options[i]}
        </button>
    </div>
</div>`;
  }
}
renderQuestions();

