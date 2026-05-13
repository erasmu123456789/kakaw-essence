<?php
// CONFIGURACIÓN
$destinatario = "info.kakaw.essence@gmail.com";   // 
$asunto_base = "Nuevo mensaje desde Kakaw-essence";
-
// Sanitizar datos
function limpiar($dato) {
    return htmlspecialchars(stripslashes(trim($dato)));
}

// Recibir datos del formulario
$nombre   = limpiar($_POST['nombre'] ?? '');
$email    = limpiar($_POST['email'] ?? '');
$asunto   = limpiar($_POST['asunto'] ?? '');
$mensaje  = limpiar($_POST['mensaje'] ?? '');

// Validación básica
if (!$nombre || !$email || !$mensaje) {
    echo "ERROR: Faltan campos obligatorios.";
    exit;
}

// Construir mensaje
$cuerpo  = "Has recibido un nuevo mensaje desde la web Kakaw-essence:\n\n";
$cuerpo .= "Nombre: $nombre\n";
$cuerpo .= "Email: $email\n";
$cuerpo .= "Asunto: $asunto\n\n";
$cuerpo .= "Mensaje:\n$mensaje\n\n";
$cuerpo .= "------------------------\n";
$cuerpo .= "Enviado desde el formulario de contacto.";

// Cabeceras
$headers  = "From: info@kakaw-essence.cat\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Enviar correo
if (mail($destinatario, $asunto_base . " - " . $asunto, $cuerpo, $headers)) {
    echo "OK";
} else {
    echo "ERROR: No se pudo enviar el mensaje.";
}
?>
