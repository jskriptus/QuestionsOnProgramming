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

// Записываем колличество неправильных ответов
let minusResult = 0;

// Какой вопрос из массива обрабатывается
let questionId = 0;

// Храним отфильтрованые вопросы
let filterQuestions;

// Преобразуем полученные из базы вопросы, в удобный формат
const questions = questionsFromDB.map((item) => {

     // Тут мы оборачиваем все ответы в объект
     const modifyItem = {
          ...item,
          rightAnswer: item.right_answer,
          answers: {
               1: item.answer_one,
               2: item.answer_two,
               3: item.answer_three,
               4: item.answer_four,
          }
     };

     // Тут мы избавляемся от старых ответов, не обернутых в объект
     const { answer_one, answer_two, answer_three, answer_four, right_answer, ...newItem } = modifyItem;

     return newItem;
});

const filteredQuestions = () => {
     filterQuestions = questions.filter(item => {
          const checkedCheckboxCSS = (item.type === "css" && checkboxLangCSS.checked);
          const checkedCheckboxJS = (item.type === "js" && checkboxLangJS.checked);
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

     answers.forEach((item) => {
          item.textContent = filterQuestions[questionId].answers[item.id];
          item.style.backgroundColor = '';
          hint.style.display = 'none';
     });
};

// При нажатии на кнопку Генерировать скрывать стартовую страницу и показывать основную
generateQuestionsBtn.addEventListener('click', () => {
     startScreen.style.display = 'none';
     mainScreen.style.display = 'flex';
     changeAnswers();
});

for (let i = 0; i < answers.length; i++) {
     answers[i].addEventListener('click', (event) => {
          if (event.target.id === filterQuestions[questionId].rightAnswer) {
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
};

nextQuestion.addEventListener('click', changeAnswers);

// При изменении значения value ползунка range, данные value передаются в output .
const changeRangeValue = () => {
     rangeValue.value = range.value;
};