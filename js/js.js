'use strict';

const range = document.querySelector('#rng'); // Ползунок который меняет колличество вопросов
const rangeValue = document.querySelector('#rangeValue'); // Вывод колличества вопросов
const questionTitle = document.querySelector('.question');
const answers = document.querySelectorAll('.answer');
const generateQuestionsBtn = document.querySelector('.generateQuestions');
const mainScreen = document.querySelector('.mainScreen');
const startScreen = document.querySelector('.startScreen');
const resultOfMan = document.querySelector('.resultOfMan');

const checkboxLangCSS = document.querySelector("#checkboxLangCSS");
const checkboxLangJS = document.querySelector("#checkboxLangJS");
const checkboxLangHTML = document.querySelector("#checkboxLangHTML");

// Записываем колличество правильных ответов
let result = 0;

// Какой вопрос из массива обрабатывается
let questionId = 0;

let filteredQuestions;

function changeAnswers() {
     if (questionId === 0) {
          filteredQuestions = questions.filter(item => {
               if (item.type === "css" && checkboxLangCSS.checked) {
                    return true;
               } else if (item.type === "es6" && checkboxLangJS.checked) {
                    return true;
               } else if (item.type === "html" && checkboxLangHTML.checked) {
                    return true; 
               } else {
                    return false;
               }
          });
     }

     if (filteredQuestions[questionId] === undefined) {
          alert(`Правильных ответов: ${result}`)
          return window.location.reload(true);
     }

     questionTitle.textContent = filteredQuestions[questionId].question;

     answers.forEach((item, index) => {
          item.textContent = filteredQuestions[questionId].answers[index];
          item.style.backgroundColor = '';
     });

     // for (let i = 0; i < answers.length; i++) {
     // answers[i].textContent = questions[questionId].answers[i];
     // answers[i].style.backgroundColor = '';
     // }
}

// При нажатии на кнопку Генерировать 
generateQuestionsBtn.addEventListener('click', () => {
     startScreen.style.display = 'none';
     mainScreen.style.display = 'flex';
     changeAnswers();
});

for (let i = 0; i < answers.length; i++) {
     answers[i].addEventListener('click', (event) => {
          if (event.target.textContent === filteredQuestions[questionId].rightAnswer) {
               ++questionId;
               resultOfMan.textContent = `Правильных ответов: ${++result}`;
               event.target.style.backgroundColor = 'green';
               setTimeout(changeAnswers, 500);
          } else {
               questionId++;
               event.target.style.backgroundColor = 'red';
               setTimeout(changeAnswers, 500);
          }
     });
}


// При изменении значения value ползунка range, данные value передаются в output .
const changeRangeValue = () => {
     rangeValue.value = range.value;
};