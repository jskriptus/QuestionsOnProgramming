'use strict';

const range = document.querySelector('#rng'), // Ползунок который меняет колличество вопросов
     rangeValue = document.querySelector('#rangeValue'), // Вывод колличества вопросов
     questionTitle = document.querySelector('.question'),
     answers = document.querySelectorAll('.answer'),
     generateQuestionsBtn = document.querySelector('.generateQuestions'),
     mainScreen = document.querySelector('.mainScreen'),
     startScreen = document.querySelector('.startScreen'),
     plusResultText = document.querySelector('.plusResult'),
     minusResultText = document.querySelector('.minusResult'),
     hint = document.querySelector('.hint'),
     infoHint = document.querySelector('.infoHint'),
     nextQuestion = document.querySelector('.nextQuestion'),

     form = document.querySelector('form'),

     checkboxLangCSS = document.querySelector("#checkboxLangCSS"),
     checkboxLangJS = document.querySelector("#checkboxLangJS"),
     checkboxLangHTML = document.querySelector("#checkboxLangHTML");

// Записываем колличество правильных ответов
let plusResult = 0;

// Записываем колличество не правильных ответов
let minusResult = 0;

// Какой вопрос из массива обрабатывается
let questionId = 0;

// Храним отфильтрованые вопросы
let filterQuestions;


form.addEventListener('change', (e) => {
     let target = e.target;
     if (target.tagName === 'INPUT') {
          addToLocal(target);
     }
});

let obj = {
     question: "",

}

const addToLocal = (input) => {
     if (input.id === 'question') {
          return obj.question = input.value;
     } else if (input.id === 'answer_one') {
          return localStorage.setItem('answers', input.value);
     } else if (input.id === 'answer_two') {
          return localStorage.setItem('answers', input.value);
     } else if (input.id === 'answer_three') {
          return localStorage.setItem('answers', input.value);
     }
};

console.log(obj);

// localStorage.setItem('questions', JSON.stringify(questions));
// let storageQuestions = JSON.parse(localStorage.getItem("questions"));
// console.log(storageQuestions);



const filteredQuestions = () => {
     filterQuestions = questions.filter(item => {
          const checkedCheckboxCSS = (item.type === "css" && checkboxLangCSS.checked);
          const checkedCheckboxJS = (item.type === "es6" && checkboxLangJS.checked);
          const checkedCheckboxHTML = (item.type === "html" && checkboxLangHTML.checked);

          if (checkedCheckboxCSS || checkedCheckboxJS || checkedCheckboxHTML) {
               return true;
          } else {
               return false;
          }
     });
};



function changeAnswers() {

     filteredQuestions();

     if (filterQuestions[questionId] === undefined) {
          if (plusResult === 0 && minusResult === 0) {
               return window.location.reload();
          } else {
               alert(`Правильных ответов: ${plusResult} \nНеправильных ответов: ${minusResult} `);
               return window.location.reload();
          }
     }

     questionTitle.textContent = filterQuestions[questionId].question;

     answers.forEach((item, index) => {
          item.textContent = filterQuestions[questionId].answers[index];
          item.style.backgroundColor = '';
          hint.style.display = 'none';
     });
}

// При нажатии на кнопку Генерировать скрывать стартовую страницу и показывать основную
generateQuestionsBtn.addEventListener('click', () => {
     startScreen.style.display = 'none';
     mainScreen.style.display = 'flex';
     changeAnswers();
});

for (let i = 0; i < answers.length; i++) {
     answers[i].addEventListener('click', (event) => {
          if (event.target.textContent === filterQuestions[questionId].rightAnswer) {
               plusResultText.textContent = `Правильных ответов: ${++plusResult} `;
               event.target.style.backgroundColor = 'green';
               questionId++;
          } else {
               minusResultText.textContent = `Неправильных ответов: ${++minusResult}`;
               event.target.style.backgroundColor = 'red';
               hint.style.display = 'block';
               infoHint.textContent = filterQuestions[questionId].hint;
               questionId++;
          }
     });
}

nextQuestion.addEventListener('click', changeAnswers);

// При изменении значения value ползунка range, данные value передаются в output .
const changeRangeValue = () => {
     rangeValue.value = range.value;
};