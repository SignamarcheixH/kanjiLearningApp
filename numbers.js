
function string2kanji(number) {
	switch(number) {
		case '0':
			return("0");
			break;
		case '1':
			return('一');
			break;		
		case '2':
			return('ニ');
			break;
		case '3':
			return('三');		
			break;
		case '4':
			return('四');		
			break;
		case '5':
			return('五');		
			break;										
		case '6':
			return('六');		
			break;
		case '7':
			return('七');		
			break;
		case '8':
			return('八');		
			break;
		case '9':
			return('九');		
			break;
	}
}

function getRandomKanji() {
	let number = Math.floor(Math.random() * 9999).toString();
	let kanjiNumber = "";
	let allPacks = ['十','百','千'];
	let utilPacks = allPacks.slice(0,number.length-1);
	utilPacks.unshift('');
	for(i = 0 ; i < number.length; i++) {
		let value = string2kanji(number[i]);
		if (value == 0 ) {
			dumpValue = utilPacks.pop();
		} else {
			kanjiNumber += value;
			kanjiNumber += utilPacks.pop();
		}
	}
	return kanjiNumber;
}

function getRandomArabic(){
	let number = Math.floor(Math.random() * 9999).toString();
	return number;
}

function setQuestion() {
	let mode = Math.floor(Math.random() * 2);
	let number;
	if( mode == 0) {  //arabic2kanji
		number = getRandomArabic();
	} else {       //kanji2arabic
		number = getRandomKanji();
		changeDisplay();
	}
	document.getElementsByClassName("text-placeholder")[0].innerHTML = number;
}


function changeDisplay() {
	let pad = document.getElementsByClassName("answer-pad")[0];
	let buttons = [...pad.getElementsByClassName("answer-button")];
	for( i = 0; i<buttons.length; i++) {
		let tmp = buttons[i].dataset.value;
		buttons[i].dataset.value = buttons[i].innerHTML;
		buttons[i].innerHTML = tmp;
		console.log(tmp);
	}
	let packs = document.getElementsByClassName("answer-packs")[0];
	packs.innerHTML = '<button class="answer-button zero-button">0</button>';
}


document.addEventListener("DOMContentLoaded", ()=> {
	setQuestion();
	let checkButton = document.getElementsByClassName("check-button")[0];
	checkButton.addEventListener("click", () => {
		validateAnswers();
	});	
	let showButton = document.getElementsByClassName("show-button")[0];
	showButton.addEventListener("click", () => {
		showAnswers();
	});
	let nextButton = document.getElementsByClassName("next-button")[0];
	nextButton.addEventListener("click", () => {
		window.location.reload();
	});  
});
