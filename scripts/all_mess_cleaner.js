// Очистка поля сообщений

var $form = $("#messForm"); // Форму сообщений
$form.submit(function(event) {
    event.preventDefault();
    $old_mess.empty();
});
