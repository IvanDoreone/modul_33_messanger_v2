// Функция для работы с данными на сайте
$(function() {
    // Включаем socket.io и отслеживаем все подключения
    var socket = io.connect(':3000');
    //console.log(socket);

    let $my_contact_1 = $my_contact_1_to;
    let $name_to_write_1 = $name_to_write_1_to;
    let $room_1 = $room_1_to;

    // Задаем переменную массив с названием комнаты для сообщений
    room_new = [];
    room_new.push(name_to_push);
    room_new.push($room_1);
    room_new.push('private');
    str = room_new.toString();
    room = str;

    
        
    // Задаем название комната (кому пишем)
        $('#current_addresat').text($room_1);
        chat_ids.push($my_id);
        chat_ids.push($my_contact_1);
        name_to_write = $name_to_write_1;
        $("#message_private").val($name_to_write_1);
        
        
    
    // Передаем согласие на соединение с комнатой (если задан контакт выбором из списка контактов )	
    socket.emit('agree to join room', {room: str, chat_ids: chat_ids});




   // БЛОК Отправка Сообщений
   $('#megganger_transit').on('click', function() {
    
    
    //console.log(chat_ids);
    let text_to_regg = $textarea.val();
if (text_to_regg.match(/[a-zA-Z,.?!;:+=-{}()&%$#!~'"а-яА-Я0-9]/) && !text_to_regg.match(/</) && !text_to_regg.match(/>/)) {
    let text_to_regg = $textarea.val();
} else{
    let text_to_regg = '';
    alert('пожалуйста используйте в тексте буквы цифры и знаки препинания, не скрипт;)');
}
socket.emit('send mess', {mess: text_to_regg, name: $name, className: alertClass, adress: $message_private.val(), room: room, adressant: $('#current_addresat').text(), foto: my_foto_send, people: people, my_id: $my_id, chat_ids: chat_ids, my_id_my: message_toresend  });
        
        $all_messages.prepend("<div name = '"+ number +"' oncontextmenu='return false' id ='new_message' class='alert alert-secondary'><div class='dropdown'><button name = '"+ number +"' style='width: 1px; height: 1px; opacity: 0;' class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'></button><div class='dropdown-menu' aria-labelledby='dropdownMenuButton'><a id = 'delete' my_id_my = '"+ message_toresend +"' my_id = '" + $my_id +"' address = '" + $message_private.val() +"'   name1 = 'message_id' name2 = '"+ $my_id +"'  name_adresant = '"+ $('#current_addresat').text() +"' name3 = '"+ $textarea.val() +"' name_foto = '"+ my_foto_send +"' name_name = '" + $name + "' name_class = '"+ alertClass +"' class='dropdown-item' href='#'>Delete</a><a id = 'edit' my_id_my = '"+ message_toresend +"' my_id = '" + $my_id +"' address = '" + $message_private.val() +"' name1 = 'message_id' name2 = '"+ $my_id +"' name3 = '"+ $textarea.val() +"' name_foto = '"+ my_foto_send +"' name_name = '" + $name + "' name_class = '"+ alertClass +"' class='dropdown-item' href='#'>Edit</a><a id = 'resend' name1 = 'message_id' name2 = '"+ $my_id +"' name3 = '"+ $textarea.val() +"' name_foto = '"+ my_foto_send +"' name_name = '" + $name + "' name_class = '"+ alertClass +"' class='dropdown-item' href='#'>Resend</a></div><img src='"+ my_foto_send +"' width = '10%' alt='аватарка'><b> Я: </b><span id = 'message_span' name = '" + number + "'>" + $('#message').val() + "</span></div> </div>");
        $textarea.val('');
        
    //Блок дл обработки пересылки удаления и редактирования новых сообщений;
        number++;
        var mess = document.querySelectorAll('#new_message')
mess.forEach(function(mes) {
        
        mes.oncontextmenu = function(){
        let message_id = mes.getAttribute('name');
          
        let child1 = document.querySelectorAll('#new_message  div  button')

    for( let i = 0; i < child1.length; i++) {

    if (child1[i].getAttribute('name') == message_id) {
    child1[i].click();
    }
    let delete_buttons = document.querySelectorAll('#new_message  div  button ~ .dropdown-menu #delete');
    let edit_buttons = document.querySelectorAll('#new_message  div  button ~ .dropdown-menu #edit');
    let resend_buttons = document.querySelectorAll('#new_message  div  button ~ .dropdown-menu #resend');


    // Блок для Удаления сообщений
    delete_buttons.forEach(function(delete_button) {
        delete_button.onclick = () => {
        var text_to_delete = delete_button.getAttribute('name3');
        var name_name = delete_button.getAttribute('name_name');
        var name_adresant = $('#current_addresat').text();
        var my_id_my = delete_button.getAttribute('my_id_my');
        var address = delete_button.getAttribute('address');
        var name_foto = delete_button.getAttribute('name_foto');
        var name_class = delete_button.getAttribute('name_class'); 
        var spans_to_delete = document.querySelectorAll('#all_mess  div');
        spans_to_delete.forEach(function(span_to_delete) {
        if (span_to_delete.getAttribute('name') == message_id) {
        span_to_delete.remove();
        socket.emit('delete new message', {sender_name: name_name, text_to_delete: text_to_delete, adresant_name: name_adresant, sender_id: my_id_my, address: address, name_foto: name_foto, name_class: name_class});
        }
    })
        
        }
    })



    // Блок для управления редактированием сообщений
    
    edit_buttons.forEach(function(edit_button) {
        edit_button.onclick = () => {
        var text_to_edit = edit_button.getAttribute('name3');
        var name_name = edit_button.getAttribute('name_name');
        var name_adresant = $('#current_addresat').text();
        var my_id_my = edit_button.getAttribute('my_id_my');
        var address = edit_button.getAttribute('address');
        var name_foto = edit_button.getAttribute('name_foto');
        var name_class = edit_button.getAttribute('name_class'); 
        $('#text_to_edit').val(text_to_edit);
        $('#edit_message').click();
        (document.querySelector('#edit_message_one')).onclick = () => {
        var new_text_eddited = $('#text_to_edit').val();
        var spans_to_edit = document.querySelectorAll('#new_message  div #message_span'); 
        spans_to_edit.forEach(function(span_to_edit) {
        if (span_to_edit.getAttribute('name') == message_id) {
        
        span_to_edit.textContent = new_text_eddited;
        if (span_to_edit.textContent.match(/[a-zA-Z,.?!;:+=-{}()&%$#!~'"а-яА-Я0-9]/) && !span_to_edit.textContent.match(/</) && !span_to_edit.textContent.match(/>/)) {
    text_to_send = span_to_edit.textContent;
} else{
    text_to_send = text_to_edit;
    alert('пожалуйста используйте в тексте буквы цифры и знаки препинания, не скрипт;)');
}

        socket.emit('edit new message', {sender_name: name_name, text_to_edit: text_to_edit, new_text_eddited: text_to_send, adresant_name: name_adresant, sender_id: my_id_my, address: address, name_foto: name_foto, name_class: name_class});
        }
    })
}		
    }
})



// Блок для пересылки сообщений
resend_buttons.forEach(function(resend_button) {
resend_button.onclick = () => {
var id_message_toresend = resend_button.getAttribute('name1');


//console.log(resend_button.getAttribute('name3'));
var message_sender_id = resend_button.getAttribute('name3');
var name_foto = resend_button.getAttribute('name_foto');
var name_name = resend_button.getAttribute('name_name');
var name_class = resend_button.getAttribute('name_class');
var button_choose_resend = document.querySelector('#button_choose_resend');
button_choose_resend.click();
let choose_buttons = document.querySelectorAll('#choose #toresend  p #connact_to_resend');
    choose_buttons.forEach(function(choose_button) {

    choose_button.onclick = () => {  
var socket_id_resend = choose_button.getAttribute('name_socket_id');
var id_resend = choose_button.getAttribute('name_id');
var name_adessant = choose_button.getAttribute('name_adessant');

    socket.emit('resend message', {socket_id_resend: socket_id_resend, id_resend: id_resend, id_message_toresend: id_message_toresend, message_toresend: message_toresend, message_sender_id: message_sender_id, name_name: name_name, name_foto: name_foto, name_class: name_class, name_adessant: name_adessant});
    document.querySelector('#exampleModalScrollable').click();
    }
})

    }
})
    }

                    
    return false
        }

    })
    });
    

    // Блок отображения входящих сообщений
    socket.on('add mess', function(data) {
        
        // Встраиваем полученное сообщение в блок с сообщениями
        // У блока с сообщением будет тот класс, который соответвует пользователю что его отправил
        if (data.marker !=='marker') {
        $all_messages.prepend(now + "<div  oncontextmenu='return false' id ='new_message' class='alert alert-" + data.className + "'><img src='" + data.foto +"' width = '10%' alt='аватарка'> <b>" + data.name + " </b>: " + data.mess + "</div>");
        } 
        if (data.marker ==='marker') {
        $all_messages.prepend(data.name + " </b>: Отключился </b>");
        
        if(document.querySelector('#current_addresat').textContent == data.name) {
            document.querySelector('#current_addresat').textContent = '';
            room ='';
            chat_ids = [];
        }
        }
        
        let mutecont = document.querySelector('#formute').textContent;
        mutecont.includes(data.name)
        if( !mutecont.includes(data.name) && mute_check_now !== true) {
        soundClick();
        }
        var mess = document.querySelectorAll('#new_message')
        mess.forEach(function(mes) {
        mes.addEventListener('click', function(e) {

      })
      })		
    });



// Блок добавления пересланного сообщения 
    socket.on('add mess resend', function(data) {
        
        $all_messages.prepend(now + "<div id ='new_message' class='alert alert-" + data.className + "'><img src='" + data.foto +"' width = '10%' alt='аватарка'> <b>" + data.name + " </b>: " + data.mess + "</div>");
        var mess = document.querySelectorAll('#new_message')

    mess.forEach(function(mes) {
        
        // Вешаем событие клик
        mes.addEventListener('click', function(e) {

         
      })
      })		
    });


  // Блок добавления новых контактов
    var mess = document.querySelectorAll('#new_message');

    // Блок событий при подключении к серверу сокетов
    socket.on('connec', function(data) {
    
        if (!$my_id[0]){
        $my_id[0] = data;
        people.push($my_id[0]);
        $socket_id = $my_id[0];
        } else {
        $next_id[0] = data;
        people.push($next_id[0]);
        $socket_id = $next_id[0];
        let $socket_new = data;
        }


        if (!$my_id[1]){
        socket.emit('set name', {name: $name, foto: my_foto_send, socket_id: $socket_id, next_id: my_id_send});
        $my_id[1] = $name;
        people.push($my_id[1]);
        } else {
        socket.on('give name', function(data) {

        $next = data.name;
        $next_id = data.next_id;
        $next_foto = data.foto;
        if ( $next) {
        
        if (!people.includes($next, 0)) {
        people.push($next);
        var $next_next_id = $next_id[0];
        var icons = document.querySelectorAll('#all_varns p')
        var icons2 = document.querySelectorAll('#chat p')
         icons.forEach (function(icon) {
            if (icon.getAttribute('name_to') == $next) {
            icon.remove();
            }
         });
         icons2.forEach (function(icon) {
            if (icon.getAttribute('name_to') == $next) {
            icon.remove();
            }
         });


         let mutecont = document.querySelector('#formute').textContent;
         let checked = '';
         let hidden = '';
         (mutecont.includes($next)) ? checked = 'checked' : checked = '';
         (mutecont.includes($next)) ? hidden = '' : hidden = 'hidden';
        // Блок добавления новых контактов (не из БД) - залогинившихся после нашего входа в систему
        $all_varns.append("<div id ='"+ $next + "'><p class='"+ data.socket_id + "'><img class='"+  data.socket_id + "' src='" + $next_foto + "' width = '25%' alt='аватарка' ><button class='"+  data.socket_id + "' id = 'people' name = 'choose_contact' style='color: green;' value = '" + $next_id + "' data-toggle='collapse' href='#collapseExample2' role='button' aria-expanded='false' aria-controls='collapseExample2'>" + $next + "</button><b><span hidden class = 'span' id = 'span_"+ $next + "' style= 'color: red'></span></b><img src = 'images/mute.png' width = 10% id = 'mute' name='"+ $next + "' " + hidden + "><span id = 'mutee' name='"+ $next + "'" + hidden + ">mute</span></p></div>");
        $chat.append("<div id ='"+ $next + "'><p class='"+ data.socket_id + "'><img class='"+ data.socket_id + "' src='" + $next_foto + "' width = '25%' alt='аватарка'><button class='"+ data.socket_id + "' id = 'chat3' name = 'choose_contact' style='color: green;' value = '" + $next_id + "'>" + $next + "</button></p></div>"); 

        }}
        });
        }
        $mymyid = people[0];
        });

    


    // Блок действий при отключении от сервера сокетов
    /*
    socket.on('disconnec', function(data) {	
    let name_dickonect = data['name_disconected'];
    let socket_dickonect = data['socket_id'];
    //console.log(data);
        var icons = document.querySelectorAll('.'+ socket_dickonect);
        
       // var icon1 = document.querySelector('.'+ socket_dickonect);
        
         icons.forEach (function(icon) {
            
            //icon.style.color = 'grey';
            
            
         });


        var index = people.indexOf(socket_dickonect);
        
        });
*/


        // Скрипт для создания чата
        var btns_chat = document.querySelectorAll('#chat3')
        // Проходим по массиву
        btns_chat.forEach(function(btn) {
          
          btn.addEventListener('click', function(e) {
        (!chat_name.includes($name)) ? chat_name.push($name) : chat_name;
        (!chat_to_write.includes(e.target.classList[0])) ? chat_to_write.push(e.target.classList[0]) : chat_to_write;
        (!chat_name.includes(e.target.innerText)) ? chat_name.push(e.target.innerText) : chat_name;
        (!chat_ids.includes(e.target.value)) ? chat_ids.push(e.target.value) : chat_ids;
        
        let str = chat_name.toString();
        var start_chat = document.getElementById('start_chat');
        start_chat.addEventListener('click', function() {
        let chat_name_x = '';
        let chat_to_write_x = [];
        chat_name_x = chat_name.toString();
        chat_to_write_x = chat_to_write
        room = str;
        var leave_chat = document.getElementById('leave_chat');
        if (room.indexOf('private') < 0) {
        leave_chat.removeAttribute("hidden");
        }
        start_chat.setAttribute("hidden", "true");
        var collapse = document.getElementById('collapse');
        collapse.click();
        
        $('#current_addresat').text(str);
        socket.emit('create chat', {name: chat_to_write_x, room: chat_name_x, writer: $name, chat_ids: chat_ids});
        })
        
          })
        })



        // Скрипт для выбора контакта для переписки
        var btns = document.querySelectorAll('#people')
        btns.forEach(function(btn) {
          btn.addEventListener('click', function(e) {
        chat_ids = [];
        let name_to_write = '';
        $all_mess.html('');
        socket.emit('leave room', {room: room, name: $name});
           room = '';
        $('#current_addresat').text(e.target.innerText);
        var pars = parseInt(message_toresend);
        chat_ids[0] = pars;
        chat_ids[1] = parseInt(e.target.value);
        name_to_write = e.target.classList[0];
        $("#message_private").val(name_to_write);
        let room_new = [];
        room_new.push(name_to_push);
        room_new.push(e.target.innerText);
        room_new.push('private');
        let str = room_new.toString();
        room = str;
        socket.emit('create room', {name: e.target.classList[0], room: room, writer: $name, chat_ids: chat_ids});
        var leave_chat = document.getElementById('leave_chat');
        leave_chat.setAttribute("hidden", "true");
          })


    // Блок ответа на запрос присоединения к комнате - присоединяется автоматически по запросу без подтверждения
        socket.on('join room', function(data) {
        socket.emit('agree to join room', {room: data.room, writer: data.writer, chat_ids: data.chat_ids});
        if (data.room.indexOf('private') > 0) {
        room = data.room;
        
        $('#current_addresat').text(data.writer);
        } else {
        $('#current_addresat').text(data.room);
        }


        var leave_chat = document.getElementById('leave_chat');
        if (room.indexOf('private') <= 0) {
            leave_chat.removeAttribute("hidden");
        start_chat.setAttribute("hidden", "true");
        }

        
        if (data.room.indexOf(',') > -1) {
        room = data.room;
        chat_ids = data.chat_ids;
        
        var leave_chat = document.getElementById('leave_chat');
        if (room.indexOf('private') <= 0) {
            leave_chat.removeAttribute("hidden");
        start_chat.setAttribute("hidden", "true");
        }
        }
    });
    })


// Скрипт для выхода из чата
leave_chat.addEventListener('click', function() {
socket.emit('leave chat', {room: room, name: $name});
chat_name = [];
chat_to_write = [];
$all_mess.html('');
room = '';
chat_ids = [];
$('#current_addresat').text('не выбран');
leave_chat.setAttribute("hidden", "true");			
start_chat.removeAttribute("hidden");
})



// Блок для Удаления, пересылки и редактирования собщений из истории сообщений
var mess2 = document.querySelectorAll('#new_message3')
console.log('mess2');
console.log(mess2);
mess2.forEach(function(mes2) {
        
        mes2.oncontextmenu = function(){
            
          console.log('mes.className');
          console.log(mes2.className);
          let message_id2 = mes2.className;
          //console.log(mes.getAttribute('value'));
          //console.log(mes.getAttribute('name'));
          let mess_name2 = mes2.getAttribute('name');
if(message_toresend == mess_name2 || mess_name2.indexOf(message_toresend) > 0) {

let child2 = document.querySelectorAll('#new_message3  div  button')
for( let i = 0; i < child2.length; i++) {

if(child2[i].getAttribute('name') == message_id2) {
child2[i].click();
let delete_buttons2 = document.querySelectorAll('#new_message3  div  button ~ .dropdown-menu #delete');
let edit_buttons2 = document.querySelectorAll('#new_message3  div  button ~ .dropdown-menu #edit');
let resend_buttons2 = document.querySelectorAll('#new_message3  div  button ~ .dropdown-menu #resend');



// Блок для Удаления сообщений
//console.log('delete_buttons');
    
    delete_buttons2.forEach(function(delete_button2) {
        delete_button2.onclick = () => {
        var text_to_delete2 = delete_button2.getAttribute('name3');
        var sender_messege_to_delete2 = delete_button2.getAttribute('name2');
        var id_message_to_delete2 = delete_button2.getAttribute('name1');
        var name_name2 = delete_button2.getAttribute('name_name');
        var name_adresant2 = $('#current_addresat').text();
        var my_id2 = delete_button2.getAttribute('my_id');
        var my_id_my2 = delete_button2.getAttribute('my_id_my');
        var address2 = delete_button2.getAttribute('address');
        var name_foto2 = delete_button2.getAttribute('name_foto');
        var name_class2 = delete_button2.getAttribute('name_class'); 

        var spans_to_delete2 = document.querySelectorAll('#new_message3');
        
        spans_to_delete2.forEach(function(span_to_delete2) {
        if (span_to_delete2.classList[0] == message_id2) {
        span_to_delete2.remove();
        socket.emit('delete message', {id_mess: message_id2, sender_name: name_name2, text_to_delete: text_to_delete2, adresant_name: name_adresant2, sender_id: my_id_my2, address: address2, name_foto: name_foto2, name_class: name_class2});
        }})
        
        }})


// Блок для управления редактированием сообщений
    edit_buttons2.forEach(function(edit_button2) {
        edit_button2.onclick = () => {
        var text_to_edit2 = edit_button2.getAttribute('name3');
        var sender_messege_to_edit2 = edit_button2.getAttribute('name2');
        var id_message_to_edit2 = edit_button2.getAttribute('name1');
        var name_name2 = edit_button2.getAttribute('name_name');
        
        $('#text_to_edit').val(text_to_edit2);
        $('#edit_message').click();
        //console.log(document.querySelector('#edit_message_one'));
        (document.querySelector('#edit_message_one')).onclick = () => {
            
        var new_text_eddited2 = $('#text_to_edit').val();
        var spans_to_edit2 = document.querySelectorAll('#new_message3  div #message_span');
        spans_to_edit2.forEach(function(span_to_edit2) {
        if (span_to_edit2.getAttribute('name') == id_message_to_edit2) {
        
        span_to_edit2.textContent = new_text_eddited2;
        if (span_to_edit2.textContent.match(/[a-zA-Z,.?!;:+=-{}()&%$#!~'"а-яА-Я0-9]/) && !span_to_edit2.textContent.match(/</) && !span_to_edit2.textContent.match(/>/)) {
    text_to_send2 = span_to_edit2.textContent;
} else{
    text_to_send2 = text_to_edit2;
    alert('пожалуйста используйте в тексте буквы цифры и знаки препинания, не скрипт;)');
}

        socket.emit('edit message', {id_message_to_edit: id_message_to_edit2, sender_messege_to_edit: sender_messege_to_edit2, text_to_edit: text_to_edit2, new_text_eddited: text_to_send2, name_name: name_name2});
        }
    })
}		
    }
})


// Блок для управления пересылкой сообщений
resend_buttons2.forEach(function(resend_button2) {
    resend_button2.onclick = () => {
var id_message_toresend2 = resend_button2.getAttribute('name1');

var message_toresend3 = resend_button2.getAttribute('name2');

var message_sender_id2 = resend_button2.getAttribute('name3');
var name_foto2 = resend_button2.getAttribute('name_foto');
var name_name2 = resend_button2.getAttribute('name_name');
var name_class2 = resend_button2.getAttribute('name_class');
var button_choose_resend2 = document.querySelector('#button_choose_resend');
button_choose_resend2.click();
//var connact_to_resend2;
let choose_buttons2 = document.querySelectorAll('#choose #toresend  p #connact_to_resend');

choose_buttons2.forEach(function(choose_button2) {
choose_button2.onclick = () => {
    
var socket_id_resend2 = choose_button2.getAttribute('name_socket_id');
var id_resend2 = choose_button2.getAttribute('name_id');
var name_adessant2 = choose_button2.getAttribute('name_adessant');

socket.emit('resend message', {socket_id_resend: socket_id_resend2, id_resend: id_resend2, id_message_toresend: id_message_toresend2, message_toresend: message_toresend3, message_sender_id: message_sender_id2, name_name: name_name2, name_foto: name_foto2, name_class: name_class2, name_adessant: name_adessant2});
document.querySelector('#exampleModalScrollable').click();
}})
}})
}

}}   
  return false
}
})	

});