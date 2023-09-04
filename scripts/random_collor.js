// Блок случайного выбора цвета - класса для уведомлений в зависимости от sender
var min = 1;
var max = 6;
var random = Math.floor(Math.random() * (max - min)) + min;

// Устаналиваем класс в переменную в зависимости от случайного числа
// Эти классы взяты из Bootstrap 4
var alertClass;
switch (random) {
    case 1:
        alertClass = 'secondary';
        break;
    case 2:
        alertClass = 'danger';
        break;
    case 3:
        alertClass = 'success';
        break;
    case 4:
        alertClass = 'warning';
        break;
    case 5:
        alertClass = 'info';
        break;
    case 6:
        alertClass = 'light';
        break;
    }

