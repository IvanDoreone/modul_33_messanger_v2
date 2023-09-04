var socket = io.connect(':3000');
var mutes = document.querySelectorAll('#mute_check');
const mute_contact = [];

// Блок для обработки отключения звука в списке контактов (с занесением в БД)
mutes.forEach(function(e) {
    if (e.checked) {
        (mute_contact.indexOf(e.name) <0) ? mute_contact.push(e.name) : mute_contact;
    } 

   e.onclick = () => {

var dinos = document.querySelectorAll('#mute')
dinos.forEach(function(i) {

   var mutees = document.querySelectorAll('#mutee')

   //console.log(e)
   if (e.checked) {
   if(e.name == i.name) {
   i.removeAttribute('hidden');

   muted = true;
   (mute_contact.indexOf(e.name) <0) ? mute_contact.push(e.name) : mute_contact;
   }

} else {
//console.log('checkbox not checked')
if(e.name == i.name) {
i.setAttribute('hidden', 'true');
//console.log('mute_contact.indexOf(e)');
//console.log(mute_contact.indexOf(e.name));
mute_contact.splice(mute_contact.indexOf(e.name), 1);
} 
}
})

socket.emit('set mute', {my_id: my_id_emit, mute:  mute_contact})
//console.log('mute_contact');

}

})

// Отключение звука в текущемм чате (без записи в БД)
var mute_check_now = false;
				let current_mute = document.querySelector('.current_mute');
				//console.log(document.querySelector('.current_mute'));
				current_mute.addEventListener('change', function() {
  				if (this.checked) {
    			//console.log("Checkbox is checked..");
				mute_check_now = true;
  				} else {
    			//console.log("Checkbox is not checked..");
				mute_check_now = false;
  				}
				});



				function soundClick() {
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = 'audio/u_edomlenie-9.mp3'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}
