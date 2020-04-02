<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Тесты">
    <title>Тесты HTML\CSS\JS</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <main>
        <div class="container">
            <div class="startScreen">
                <div class="mainPreview">
                    <form method="post" action="/add.php" class="addNewQuestion">
                        <span>Вопрос: </span><input required="required" type="text" name="question" id="question">
                        <span>Вариант ответа 1: </span><input type="text" required="required" name="answer_one" id="answer_one">
                        <span>Вариант ответа 2: </span><input type="text" required="required" name="answer_two" id="answer_two">
                        <span>Вариант ответа 3: </span><input type="text" required="required" name="answer_three" id="answer_three">
                        <span>Вариант ответа 4: </span><input type="text" required="required" name="answer_four" id="answer_four">
                        <span>Правильный ответ, №: </span>
                        <select name="right_answer" id="">
                            <option>1</optin>
                            <option>2</optin>
                            <option>3</option>
                            <option>4</option>
                        </select>
                        <span>Категория: </span>
                        <select name="type" id="">
                            <option>css</optin>
                            <option>js</optin>
                            <option>html5</option>
                        </select>
                        <span>Подсказка: </span><input type="text" name="hint" required="required">
                        <button type="submit" class='newQuestion'>Добавить вопрос</button>
                    </form>
                </div>
                <div class="controlPanel">
                    <span class="topicTest">Темы: </span>
                    <div class="lang">
                        <div class="langCSS">
                            <input type="checkbox" id="checkboxLangCSS">
                            <span>CSS</span>
                            <span id="countQuestions" class="countQuestionsCSS">0</span>
                        </div>
                        <div class="langJS">
                            <input type="checkbox" id="checkboxLangJS">
                            <span>JS</span>
                            <span id="countQuestions" class="countQuestionsJS">0</span>
                        </div>
                        <div class="langHTML">
                            <input type="checkbox" id="checkboxLangHTML">
                            <span>HTML5</span>
                            <span id="countQuestions" class="countQuestionsHTML">0</span>
                        </div>
                    </div>
                    <div class="countQuestion">
                        <input type="range" id="rng" value="1" step="1" min="1" max="100" oninput="changeRangeValue()">
                        <p>Колличество вопросов: <output id="rangeValue">1</output></p>
                    </div>
                    <button type="submit" class="generateQuestions">Генерировать</button>
                </div>
            </div>

            <div class="mainScreen">
                <div class="main-content">
                    <div class="questionTitle">
                        <h2 class="question"></h2>
                        <hr>
                        <br>
                    </div>
                    <div class="answers">
                        <button class="answer" id="1"></button>
                        <button class="answer" id="2"></button>
                        <button class="answer" id="3"></button>
                        <button class="answer" id="4"></button>
                    </div>
                    <div class="hint">
                        <div class='iconHint'>
                            <img src="./icons/info.ico" alt="" class='icon'>
                        </div>

                        <span class='infoHint'></span>
                    </div>
                    <div class="next">
                        <button type="submit" class='nextQuestion'>Следующий вопрос</button>
                    </div>
                </div>
                <div class="resultationPanel">
                    <div class="resultationPlus">
                        <span class="plusResult"></span>
                    </div>
                    <div class="resultationMinus">
                        <span class="minusResult"></span>
                    </div>
                </div>
            </div>
        </div>

    </main>
    <!-- Запрашиваем вопросы из БД -->
    <script type="text/javascript">
        <?php 
        $mysql = new mysqli('localhost', 't92212k1_q', '1qazXSW@', 't92212k1_q');
        $mysql->query('set names utf8');
        $questions = [];
        $result = $mysql->query('SELECT id, question, answer_one, answer_two, answer_three, answer_four, right_answer, type, hint FROM questions');
        while ($obj = $result->fetch_assoc()) {
            $questions[] = $obj;
        }

        echo 'const questionsFromDB = '.json_encode($questions).';';
        ?>

    </script>
    <script src="js/js.js"></script>
</body>

</html>