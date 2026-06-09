<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

$mail = new PHPMailer(true);

try {
    // Configuración SMTP Dinahosting
    $mail->isSMTP();
    $mail->Host = 'kakaw-essence-cat.correoseguro.dinaserver.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@kakaw-essence.cat';   
    $mail->Password = 'Duko@XD843990332007';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    // Remitente
    $mail->setFrom('info@kakaw-essence.cat', 'Kakaw Essence');

    // Destinatario
    $mail->addAddress('info@kakaw-essence.cat');

    // Datos del formulario
    $nombre = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $asunto = $_POST['asunto'] ?? 'Sin asunto';
    $mensaje = $_POST['mensaje'] ?? '';

    $mail->isHTML(true);
    $mail->Subject = "Nuevo mensaje de contacto: $asunto";
    $mail->Body = "
        <h2>Nuevo mensaje desde el formulario</h2>
        <p><strong>Nombre:</strong> $nombre</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Asunto:</strong> $asunto</p>
        <p><strong>Mensaje:</strong><br>$mensaje</p>
    ";

    $mail->send();
    echo "OK";
} catch (Exception $e) {
    echo "Error: {$mail->ErrorInfo}";
}



