<?php
ini_set('display_errors', '1'); 
include('db.php');
$room = '';

// Select New Name & Foto

if (isset($_SESSION['login'])) {
	$a = $_SESSION['login'];
	}
	if (!isset($_SESSION['login']) && isset($_COOKIE['user_hash_cookie'])) {
	
		$cookie_hash = $_COOKIE['user_hash_cookie'];
		$req = "SELECT `login` FROM `users2` WHERE `user_hash_cookie`='$cookie_hash'";
		$res = $db->query($req);
		$data = $res->Fetch(PDO::FETCH_ASSOC);
		$a = $data['login'];
		}
	

//запрос к БД на наличие загруженного фото профиля
$req = "SELECT `id`, `login`, `role` FROM `users2` WHERE `login`='$a'";
$res = $db->query($req);
$data = $res->Fetch(PDO::FETCH_ASSOC);

$my_id = $data['id'];
$my_id_my = $data['id'];

$req10 = "SELECT * FROM `users2` ";
$res = $db->query($req10);
$data_main = $res->FetchALL(PDO::FETCH_ASSOC);

$req9 = "SELECT `user_name`, `user_foto` FROM `user_profile` WHERE `user_id`='$my_id'";
$res = $db->query($req9);
$data = $res->Fetch(PDO::FETCH_ASSOC);

if ($data['user_name'] != '') {
    $a = $data['user_name'];
}
if ($data['user_foto'] != '') {
    $my_foto = $data['user_foto'];
}


// Запрос all контактов из БД
$req10 = " SELECT * FROM `user_status`";
$res = $db->query($req10);
$data_status = $res->fetchAll(PDO::FETCH_ASSOC);
//var_dump($data_status);

$req9 = "SELECT * FROM `user_profile` ";
$res = $db->query($req9);
$data_names = $res->fetchAll(PDO::FETCH_ASSOC);

$req11 = "SELECT `mutes` FROM `mutes` WHERE `user_id` = '$my_id_my'";
$res = $db->query($req11);
$data_mutes = $res->fetch(PDO::FETCH_ASSOC);


$my_contact = '';
$name_to_write ='';

if (isset($_POST['choose_contact'])) {
	
	$my_contact = $_POST['choose_contact'];
	$req = "SELECT * FROM `user_status` WHERE `user_id` = $my_contact";
	$res = $db->query($req);
	$data = $res->fetch(PDO::FETCH_ASSOC);
	$name_to_write = $data['socket_id'];
	$room = $data['user_name'];	
	

	$req10 = " SELECT * FROM `messages` WHERE `sender` in ('$my_id' , '$my_contact') AND `addressat` in ('$my_id' , '$my_contact') order by `timestamp` DESC";
	$res = $db->query($req10);
	$data_mess = $res->fetchAll(PDO::FETCH_ASSOC);
}



?>
<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	


<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<!-- Подключение Bootstrap -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
	<title>Чат программа</title>
	<!-- Свои стили -->
	<style>
		body {
			background: #fcfcfc;
		}
	</style>
    <link rel="stylesheet" href="styles/styles2.css">
</head>
<body>

<span  hidden id = 'formute'><?php echo $data_mutes['mutes'] ?></span>
<!-- Модальное окно для выбора контакта для пересылки сообщения -->
<button hidden id = "button_choose_resend" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable">
  Запустить модальное окно
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalScrollableTitle">Кому переслать сообщение?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    <div id = 'choose' class="modal-body">
<div id="toresend"  class="d-grid gap-2">


<?php 
	for ($i=0; $i < count($data_status); $i++) { 
	if (isset($data_names[$i]['user_name'])) {
		($data_status[$i]['status'] == 'online') ? $style = 'green' : $style = 'grey';
	?>
<p id = '<?php echo($data_names[$i]['user_name']) ?>'><img id = '<?php echo($data_names[$i]['user_name']) ?>' class='<?php echo($data_status[$i]['socket_id']) ?>' src='<?php echo($data_names[$i]['user_foto']) ?>' width = '10%' alt='аватарка'><button name_adessant = '<?php echo($data_names[$i]['user_name']) ?> ' name_socket_id = '<?php echo($data_status[$i]['socket_id']) ?>' name_id = '<?php echo($data_main[$i]['id']) ?>' class='<?php echo($data_status[$i]['socket_id']) ?>' id = 'connact_to_resend' style='color: <?php echo($style) ?>;' value = '<?php echo($data_main[$i]['id']) ?>'> <?php echo($data_names[$i]['user_name']) ?> </button></p>
	
<?php
 }}
 ?>
 
   					</div>
      </div>
      <div class="modal-footer">
        
        <button hidden id = "resend_message_one" type="button" class="btn btn-primary">переслать</button>
      </div>
    </div>
  </div>
</div>

	

<!-- Модальное окно для редактирования сообщения -->
<button hidden id = "edit_message" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable2">
  Запустить модальное окно
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModalScrollable2" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalScrollableTitle">Изменить текст сообщения:</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div id = 'edit' class="modal-body">
	  
    <input style = "height: 50px; width:100%; border: 1px solid grey;" type = text id="text_to_edit"  name = "new_text_message" class="d-grid gap-2">
   	  
      </div>
      <div class="modal-footer">
        
        <button  id = "edit_message_one" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable2">Подтвердить</button>
      </div>
    </div>
  </div>
</div>






	<!-- Блок вывода контактов для создания группового чата -->
	<div class="container">
		<div class="py-5 text-center">
			<div id = 'notes' class="py-5 text-center">
			</div>
			
		</div>
		<div class="row">
		<div class="col-md-auto"  style="width: 200px">
		<div id = "chat2">
<p><a id = "collapse" class="btn btn-success" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Создать беседу
</a>
</p>
<div class="collapse" id="collapseExample">
  	<div class="card card-body">
  	<div  id = "chat3" class="d-grid gap-2">            
   					<div id="chat"  class="d-grid gap-2">


<?php 
	for ($i=0; $i < count($data_status); $i++) { 
	if (isset($data_names[$i]['user_name'])) {
		($data_status[$i]['status'] == 'online') ? $style = 'green' : $style = 'grey';
	?>
<p name_to = '<?php echo($data_names[$i]['user_name']) ?>' id = '<?php echo($data_names[$i]['user_name']) ?>'><img id = '<?php echo($data_names[$i]['user_name']) ?>' class='<?php echo($data_status[$i]['socket_id']) ?>' src='<?php echo($data_names[$i]['user_foto']) ?>' width = '35%' alt='аватарка'><button class='<?php echo($data_status[$i]['socket_id']) ?>' id = 'chat3' style='color: <?php echo($style) ?>;' value = '<?php echo($data_main[$i]['id']) ?>'> <?php echo($data_names[$i]['user_name']) ?> </button><b><span hidden class = 'span' id = 'span_"+ $next + "' style= 'color: red'></span></b></p>
	
<?php
 }}
 ?>
 
   					</div>
                </div>
				<p><button id = 'start_chat' class="btn btn-warning" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"> Начать чат </button></p>
  	</div>
	  </div>
	</div>	
<!-- Блок выбора контактов для переписки и включения.отключения беззвучного режима -->
	<div id = "people">
	<p>
  <a id = "collapse" class="btn btn-success" data-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="true" aria-controls="collapseExample2">
    Выбрать контакт
  </a>
</p>
<div class="show" id="collapseExample2">
<form id="all_varns" method="POST" action="">
	<div id="all_varns"  class="d-grid gap-2"> 
	
	<?php 
	for ($i=0; $i < count($data_status); $i++) { 
	if (isset($data_names[$i]['user_name'])) {
		($data_status[$i]['status'] == 'online') ? $style = 'green' : $style = 'grey';
		(strpos($data_mutes['mutes'], $data_names[$i]['user_name']) !== false) ? $checked = 'checked' : $checked = '';
		(strpos($data_mutes['mutes'], $data_names[$i]['user_name']) !== false) ? $hidden = '' : $hidden = 'hidden';
	?>
<p name_to = '<?php echo($data_names[$i]['user_name']) ?>' class='<?php echo($data_status[$i]['socket_id']) ?>' id = '<?php echo($data_names[$i]['user_name']) ?>'><img id = '<?php echo($data_names[$i]['user_name']) ?>' class='<?php echo($data_status[$i]['socket_id']) ?>' src='<?php echo($data_names[$i]['user_foto']) ?>' width = '25%' alt='аватарка'><button class='<?php echo($data_status[$i]['socket_id']) ?>' id = 'people' style='color: <?php echo($style) ?>;'  name = 'choose_contact' value = '<?php echo($data_main[$i]['id']) ?>' data-toggle='collapse' href='#collapseExample2' role='button' aria-expanded='false' aria-controls='collapseExample2'> <?php echo($data_names[$i]['user_name']) ?> </button><b><span hidden class = 'span' id = 'span_"+ $next + "' style= 'color: red'></span></b> <img src = 'images\mute.png' width = 10% id = 'mute' name='<?php echo($data_names[$i]['user_name']) ?>' <?php echo($hidden) ?>><span id = 'mutee' name='<?php echo($data_names[$i]['user_name']) ?>'>mute</span><input type="checkbox" id="mute_check" name='<?php echo($data_names[$i]['user_name']) ?>' value="" <?php echo($checked) ?> > </p>
	
<?php
 }}
 ?>
</form>
    </div>
	</div>
	</div>
	</div>

			<div class="col-md-auto" style="width: 300px">
				<!-- Форма для получения сообщений и имени -->
				<h3>Форма сообщений</h3>
				<button hidden id = 'leave_chat' class="btn btn-warning"> Покинуть чат </button>
				<br>
				<form id="messForm">
					<input hidden type="text" name="name" id="name" placeholder="Введите имя" class="form-control" value = "<?php echo $a ?>">
					
					<?php
					(strpos($data_mutes['mutes'], $room) !== false) ? $check_2 = '' : $check_2 = 'hidden';
					(strpos($data_mutes['mutes'], $room) !== false) ? $check_3 = 'checked' : $check_3 = '';
					
					?>
					<p>текущий контакт: <b><span id = 'current_addresat'> <?php echo ($room) ?> <span></b> 
					
					<div id = 'current_addresat2'>
					<span id = 'mutee' name='<?php echo ($room) ?>'>отключить звук в текущем чате</span>
					<input class = 'current_mute' type='checkbox' id='mute_check' name='<?php echo ($room) ?>' value='' ></p>
					</div>
					
					<br>
					<label for="message">Сообщение</label>
					<textarea name="message" id="message" class="form-control" placeholder="Введите сообщение"></textarea>
					<br>
                    <label hidden for="message_private">Кому пишем?</label>
					<textarea hidden name="message_private" id="message_private" class="form-control" placeholder="получатель"></textarea>
					<br>
					<input type="button" value="Отправить" class="btn btn-danger" id = "megganger_transit">
					<br><br>
					<input type="submit" value="Очистить историю" class="btn btn-warning">
                    
				</form>
			</div>
			<div class="col-md-auto" style="width: 500px" >
				
			<!-- Вывод всех сообщений будет здесь -->
			<h3>Сообщения</h3>
				<div id="all_mess">
				<?php 
				if(isset($data_mess)) { ?>
				<div id="old_mess">
					<b>история сообщений:</b>
	<?php for ($i=0; $i < count($data_mess); $i++) { 
	if ($data_mess[$i]['sender'] != $data_mess[$i]['addressat'] ) {	
	?>
	<div oncontextmenu='return false' id ='new_message3'  name = '<?php echo ($data_mess[$i]['sender'])?>' value = '<?php echo ($data_mess[$i]['message'])?>' class = '<?php echo ($data_mess[$i]['id'])?>'><div  class='alert alert-<?php echo ($data_mess[$i]['sender_classname'])?>' >
  <div class="dropdown">
  <button name = '<?php echo ($data_mess[$i]['id'])?>' style='width: 1px; height: 1px; opacity: 0;' class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a id = 'delete' name1 = '<?php echo ($data_mess[$i]['id'])?>' name2 = '<?php echo ($data_mess[$i]['sender'])?>' name3 = '<?php echo ($data_mess[$i]['message'])?>' name_foto = '<?php echo ($data_mess[$i]['sender_foto'])?>' name_name = '<?php echo ($data_mess[$i]['sender_name'])?>' name_class = '<?php echo ($data_mess[$i]['sender_classname'])?>' class="dropdown-item" href="#">Delete</a>
    <a id = 'edit' name1 = '<?php echo ($data_mess[$i]['id'])?>' name2 = '<?php echo ($data_mess[$i]['sender'])?>' name3 = '<?php echo ($data_mess[$i]['message'])?>' name_foto = '<?php echo ($data_mess[$i]['sender_foto'])?>' name_name = '<?php echo ($data_mess[$i]['sender_name'])?>' name_class = '<?php echo ($data_mess[$i]['sender_classname'])?>' class="dropdown-item" href="#">Edit</a>
    <a id = 'resend' name1 = '<?php echo ($data_mess[$i]['id'])?>' name2 = '<?php echo ($data_mess[$i]['sender'])?>' name3 = '<?php echo ($data_mess[$i]['message'])?>' name_foto = '<?php echo ($data_mess[$i]['sender_foto'])?>' name_name = '<?php echo ($data_mess[$i]['sender_name'])?>' name_class = '<?php echo ($data_mess[$i]['sender_classname'])?>' class="dropdown-item" href="#">Resend</a>
  </div>
</div><span hidden id = '<?php echo ($data_mess[$i]['id'])?>'></span><img src='<?php echo ($data_mess[$i]['sender_foto'])?>' width = '10%' alt='аватарка'><span id = '<?php echo ($data_mess[$i]['timestamp'])?>'> <?php echo ($data_mess[$i]['timestamp'])?> </span> <b><?php echo ($data_mess[$i]['sender_name'])?> </b>:<span id = 'message_span' name = '<?php echo ($data_mess[$i]['id'])?>'> <?php echo ($data_mess[$i]['message'])?></span></div></div>

<?php
 }}}
 ?>
					</div>
				</div>  
			</div>
	</div>

   <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	<!-- Подключаем jQuery, а также Socket.io -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>


	<!-- Подключение к серверу socket !!! для локального теста замените на локальный ip устройства на котором будет запущен сервер (index.js) -->
	<!--<script src="http://192.168.1.77:3000/socket.io/socket.io.js"></script>-->
	<!--<script src="http://192.168.1.76:3000/socket.io/socket.io.js"></script>-->
	<script src="http://localhost:3000/socket.io/socket.io.js"></script>

	<script src="scripts/all_mess_cleaner.js"></script>
	<script src="scripts/mute.js"></script>
	<script src="scripts/random_collor.js"></script>
	<script src="scripts/message.js"></script>




	<script>
		// Делаем переменные и собирам данные из php:
    		var my_name = 'ivan';
    		var $megganger_transit = $("#megganger_transit");
    		var now = new Date().toLocaleString();
    		var chat_to_write = [];
			var chat_name = [];
			var $textarea = $("#message"); // Текстовое поле
            var $message_private = $("#message_private"); // Текстовое поле
			var $all_messages = $("#all_mess"); // Блок с сообщениями
            var $all_varns = $("#all_varns"); 
			var $chat = $("#chat");
			var $all_mess = $("#all_mess");
			var $old_mess = $("#old_mess");
            var $my_id = [];
            var $next_id = [];
            var $next = '';
            const people = [];
			var room = '';
			var $mymyid = '';
			var chat_ids = [];
			var number = 0;
			var number2 = 0;
			var text_to_send = '';
			var mutes = document.querySelectorAll('#mute_check');
			var my_id_emit = '<?php echo $my_id_my?>';
			var message_toresend = parseInt(<?php echo $my_id_my ?>);
			var my_foto_send = '<?php echo ($my_foto)?>';
			var my_id_send = '<?php echo ($my_id) ?>';
			var name_to_push = '<?php echo ($a) ?>';	
			var $my_contact_1_to = '<?php echo ($my_contact)?>';
    		var $name_to_write_1_to = '<?php echo ($name_to_write)?>';
    		var $room_1_to = '<?php echo ($room)?>';		
			var $form = $("#messForm"); // Форму сообщений
            var $name = $("#name"); 
			// дефолтное имя
            if ($("#name").val() != '') {
            $name = $("#name").val();
            } else {
            $name = 'john';
            }
	   
		
	</script>


</body>
</html>