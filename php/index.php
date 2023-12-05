<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer\src\Exception.php';
require 'PHPMailer\src\SMTP.php';
require 'PHPMailer\src\PHPMailer.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send 
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'masenyuk.m.2001@gmail.com';                     //SMTP username
    $mail->Password   = 'pfhh ixlk rnjt ngep';                               //SMTP password
    $mail->SMTPSecure = 'TLS';           //Enable implicit TLS encryption
    $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('masenyuk.m.2001@gmail.com', 'Logo');
    $mail->addAddress('rbru-metrika@yandex.ru');         //Add a recipient
    $body = '<p>E-mail: '.$_POST['email'].'</p>' . '<p>Имя: '.$_POST['name'].'</p>' . '<p>Сообщение: '.$_POST['message'].'</p>';

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Проверка';
    $mail->Body    = $body;

    // $mail->send();

    if(!$mail->send()){
        $message = 'Ошибка';
     }else{
        $message = 'Данные отправлены!';
     }
     $response = ['message' => $message];
     
     header('Content-type: application/json');
     echo json_encode($response); 

    // echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
