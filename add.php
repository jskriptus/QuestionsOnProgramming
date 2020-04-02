<?php 

$mysql = new mysqli('localhost', 't92212k1_q', '1qazXSW@', 't92212k1_q');
$mysql->query('set names utf8');

if ($_POST['question'])
{
	$question = $mysql->real_escape_string($_POST['question']);
	$answer_one = $mysql->real_escape_string($_POST['answer_one']);
	$answer_two = $mysql->real_escape_string($_POST['answer_two']);
	$answer_three = $mysql->real_escape_string($_POST['answer_three']);
	$answer_four  = $mysql->real_escape_string($_POST['answer_four']);
    $right_answer = $mysql->real_escape_string($_POST['right_answer']);
    $type = $mysql->real_escape_string($_POST['type']);
    $hint = $mysql->real_escape_string($_POST['hint']);


	$mysql->query('INSERT INTO questions SET question = "'.$question.'", answer_one = "'.$answer_one.'", answer_two = "'.$answer_two.'", answer_three = "'.$answer_three.'", answer_four = "'.$answer_four.'", right_answer = "'.$right_answer.'", type = "'.$type.'", hint = "'.$hint.'"');

	header('location: /index.php');
	exit;
}
?>