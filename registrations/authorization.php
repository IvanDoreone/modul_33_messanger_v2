<?php
//session_start();

    $hashed = password_hash($_POST['pass'], PASSWORD_BCRYPT);

    // проверка  логин и пароль
    $login = $_POST['login'];
    //$_SESSION['login'] = $login;
    $req = "SELECT `password_hash` FROM `users2` WHERE `login`='$login'";
    $res = $db->query($req);
    $data = $res->Fetch(PDO::FETCH_ASSOC);

    

if ( $data && password_verify($_POST['pass'], $data['password_hash'])) {
    
    echo "Введенные логин и пароль подтверждены!";
    
    if (isset($_POST["cookie1"])) {
        $cookie_hash = md5(random_int(0,9999999)."solemio");
        if (empty($_COOKIE['user_hash_cookie'])) {
            setcookie('user_hash_cookie', $cookie_hash, ['expires'=>time() + 3600*24*30, 'samesite'=>'lax']);
            
};

    if (empty($_SESSION['cookie']) && empty($_COOKIE['user_hash_cookie'])) {
    $_SESSION['cookie'] = $cookie_hash;
    }
    
if(isset($_SESSION['cookie'])) {
            $newcookie = $_SESSION['cookie'];
}
            $login = $_POST['login'];
            $update_cookie->execute();

    
    } else {
        setcookie('user_hash_cookie', '',['expires'=>time(), 'samesite'=>'lax']);
        $newcookie = NULL;
        $login = $_POST['login'];
        $update_cookie->execute();
    }

    $req = "SELECT `login`, `user_hash_cookie` FROM `users2` WHERE `login`='$login'";
    $res = $db->query($req);
    $data = $res->Fetch(PDO::FETCH_ASSOC);
    
    
    if (empty($_COOKIE['login'])) {
        setcookie('login', $data['login'], ['expires'=>time() + 3600*24*30, 'samesite'=>'lax'] );
        };
    
        $_SESSION['login'] = $login;


} else {
// запись попыток неудачной авторизации в auuthorization_errors.log
    $file = 'registrations/authtorization_errors.log';
    $time = date('Y-m-d H:i:s',time());
    $pass = $_POST['pass'];
    $ip = $_SERVER['SERVER_ADDR'];
$current = 'time:  '. $time.'  login:  ' .$login.'  password:  '.$pass.' ip: '.$ip.PHP_EOL;
file_put_contents($file, $current, FILE_APPEND);

    ?>
    <h3>Пароль или Логин не верные, вернитесь назад</h3>
    
<div class="container pt-4">
<form method="post" action="">

<input type="hidden" name="session_exit" value="session_exit"> <br/>
<input type="submit" value="Вернуться назад" class="btn btn-primary">
</form>
<div>
    <?php
if (isset($_POST["session_exit"])) {
session_destroy();
setcookie('user_hash_cookie', '',['expires'=>time(), 'samesite'=>'lax']);
setcookie('login', '',['expires'=>time(), 'samesite'=>'lax']);
unset($login);
header('location: index.php');
}

}