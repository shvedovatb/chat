"use strict";
	var users = require('./data/users');  // Подключение самостоятельно созданного модуля "users"

function currentTime() {
	var locTime=new Date();
	var hours=locTime.getHours();
	var minutes=locTime.getMinutes();
	minutes=checkTime(minutes);
	var currentStr='Your local time  is: '+hours+"h "+minutes+'m';
	return currentStr;
}
function checkTime(i){
	if (i<10) {
		i="0" + i;
	}
	return i;
}
function onlineTime() {
	var lastTime=new Date();
	var myTime=lastTime-startTime;
	var hours, minutes;
	hours = Math.floor(myTime/(1000*60*60));
	hours = (hours > 24) ? hours%24 : hours;
	minutes = Math.floor(myTime/(1000*60));
	minutes = (minutes > 60) ? minutes%60 : minutes;
	minutes = checkTime(minutes);
	var onlineStr='You are online for: '+hours+'h '+minutes+'m';
	return onlineStr;
}
function setMyTime() {
	document.getElementById('localTime').innerHTML=currentTime();
	document.getElementById('onlineTime').innerHTML=onlineTime();
	setTimeout('setMyTime()', 10000);
}

function counter(string, reg) {
	var count = (string.match(reg)!=null) ? string.match(reg).length : 0;
	return count;
}

function sendMessage() {	
	var input = document.getElementById('messageInput')
	var text = input.value;
	var author = document.getElementById('myName').value;
	if (!author) {
		author = 'MySelf';
	}
	var content = document.querySelectorAll('.current')[0];
	content.insertAdjacentHTML("beforeEnd", "<p><b>"+author+": </b>"+text+"</p>");
	input.value = "";
	document.getElementById('chars').innerHTML='0';
	document.getElementById('letters').innerHTML='0';
	document.getElementById('spaces').innerHTML='0';
	document.getElementById('puncts').innerHTML='0';
}

function selectTab() {
	var tabs = document.querySelectorAll('.tab');
	var conts = document.querySelectorAll('.cont');
	//alert( tabs.length);
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('click', function(e) { 
			for (var k = 0; k < tabs.length; k++) {
				if (this == tabs[k]) {
					conts[k].classList.add('current');
					tabs[k].classList.add('active');
				} else {
					conts[k].classList.remove('current');
					tabs[k].classList.remove('active');
				}
			}
		})
	}
}

function companionsOnline() {
	var count = document.getElementById('companions').getElementsByTagName('li').length;
	document.getElementById('companionsOnline').innerHTML = 'Online: '+count;
	setTimeout('companionsOnline()', 10000);
}

function tagAdd(obj, str1, str2) {  
    if(document.selection) {                                                                          // Для IE 
        var s = document.selection.createRange(); 
        if (s.text) { 
        s.text = str1 + s.text + str2 
        } else { 
            obj.value = obj.value + str1 + str2 
        } 
    } 
    else if (typeof(obj.selectionStart) == "number") {                                      // Opera, FireFox, Chrome 
        if (obj.selectionStart != obj.selectionEnd) { 
            var start = obj.selectionStart; 
            var end = obj.selectionEnd; 
            s = obj.value.substr(start,end-start); 
            obj.value = obj.value.substr(0, start) + str1 + s + str2 + obj.value.substr(end) 
        } else { 
            obj.value = obj.value + str1 + str2 
        } 
    } 
}
function usersData() {
	users.data.forEach(
  function (obj) {
    var ul = document.getElementById('companions');
    ul.innerHTML += `<li class="${obj.status}"><a>${obj.name}</a></li>`;
  }
)

}

var startTime=new Date();
window.onload = function(){	
	setMyTime();	
	selectTab();
	usersData();
	companionsOnline();
};
var msgInput = document.getElementById('messageInput')
document.getElementById('bold').onclick=function(){
	tagAdd(msgInput, '<b>', '</b>');
};
document.getElementById('italic').onclick=function(){
	tagAdd(msgInput, '<i>', '</i>');
};
document.getElementById('underline').onclick=function(){
	tagAdd(msgInput, '<u>', '</u>');
};
document.getElementById('link').onclick=function(){
	tagAdd(msgInput, '<a>', '</a>');
};

document.getElementsByName('sendMessage')[0].onclick = sendMessage;

msgInput.oninput = function () {
	var string=this.value;
	var regLetters=/[a-zA-Z0-9а-яА-ЯёЁ']/g;
	var regSpaces=/\s/g;
	var regPuncts=/[-!;:()\?\.\,\"]/g;
	document.getElementById('chars').innerHTML=string.length;
	document.getElementById('letters').innerHTML=counter(string, regLetters);
	document.getElementById('spaces').innerHTML=counter(string, regSpaces);
	document.getElementById('puncts').innerHTML=counter(string, regPuncts);
}
