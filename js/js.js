'use strict';

const range = document.querySelector('#rng'); // Ползунок который меняет колличество вопросов
const rangeValue = document.querySelector('#rangeValue'); // Вывод колличества вопросов
const questionTitle = document.querySelector('.question');
const answers = document.querySelectorAll('.answer');
const generateQuestionsBtn = document.querySelector('.generateQuestions');
const mainContent = document.querySelector('.main-content');
const mainPreview = document.querySelector('.mainPreview');
const controlPanel = document.querySelector('.controlPanel');
const resultationPanel = document.querySelector('.resultationPanel');
const resultOfMan = document.querySelector('.resultOfMan');

const questions = [
     {
          id: 0,
          question: "Какой css-селектор отвечает за цвет заливки?",
          answers: {
               0: "color",
               1: "bg-color",
               2: "background-color",
               3: "fill-color"
          },
          rightAnswer: 'background-color',
          type: "css"
     },
     {
          id: 1,
          question: "Какой метод массива используется для преобразования элементов массива?",
          answers: {
               0: "map",
               1: "reduce",
               2: "filter",
               3: "forEach"
          },
          rightAnswer: "map",
          type: "es6"
     },
     {
          id: 2,
          question: "Какой метод массива используется для преобразования элементов массива?",
          answers: {
               0: "map",
               1: "reduce",
               2: "filter",
               3: "forEach"
          },
          rightAnswer: "map",
          type: "es6"
     }
];
// Записываем колличество правильных ответов
let result = 0;

     // Какой вопрос из массива обрабатывается
     let questionId = 0;

     function changeAnswers() {
          for (let i = 0; i < answers.length; i++) {
               if (questions[questionId] === undefined) {
                    window.location.reload(true);
               } else {
                    answers[i].textContent = questions[questionId].answers[i];
                    questionTitle.textContent = questions[questionId].question;
               }

          }
          
     }

     // При нажатии на кнопку Генерировать 
     generateQuestionsBtn.addEventListener('click', () => {
          
          // скрывать Начальный блок и показывать блок с Вопросом и ответами
          mainPreview.style.display = 'none';
          mainContent.style.display = 'inline-block';
          changeAnswers();
          // Убираем панель настройки вопросов и добавляем результат ответов на вопросы
          controlPanel.style.display = 'none';
          resultOfMan.style.display = 'block';
          
     });

     
          
          for (let i = 0; i < answers.length; i++){
               answers[i].addEventListener('click', (event) => {
                    if (event.target.textContent === questions[questionId].rightAnswer) {
                         ++questionId;
                         resultOfMan.textContent = `Правильных ответов: ${++result}`;
                         event.target.style.backgroundColor = 'green';
                         
                         setTimeout(changeAnswers, 1000);
                         
                    } else {
                         questionId++;
                         event.target.style.backgroundColor = 'red';
                         changeAnswers();
                    }
               });
          }


// При изменении значения value ползунка range, данные value передаются в output .
const changeRangeValue = () => {
     rangeValue.value = range.value;
};  
















