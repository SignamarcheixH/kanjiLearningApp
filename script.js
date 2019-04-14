function resizeKanji(kanji, placeholder) {
	switch(kanji.length){
		case 1:
			placeholder.style.fontSize = "310px";
			break;
		case 2:
			placeholder.style.fontSize = "300px";
			break;
		case 3:
			placeholder.style.fontSize = "180px";
			placeholder.style.paddingTop = "12%";
			break;
		case 4:
			placeholder.style.fontSize = "150px";
			placeholder.style.paddingTop = "15%";
			break;
		case 5:
			placeholder.style.fontSize = "110px";
			placeholder.style.paddingTop = "19%";
			break;
		case 6:
			placeholder.style.fontSize = "90px";
			placeholder.style.paddingTop = "20%";
			break;
	}
	placeholder.innerHTML = kanji;
}

function setKanji() {
	let kanjiList = JSON.parse(data);  //imported in body with <script src="kanji.json"></script>
	let index = Math.floor(Math.random() * kanjiList.length);
	let kanji = kanjiList[index].drawing;
	let placeholder = document.getElementsByClassName("text-placeholder")[0];
	resizeKanji(kanji, placeholder);
}

function showAnswers() {
	let kanjiList = JSON.parse(data);
	let ref = document.getElementsByClassName("text-placeholder")[0].innerHTML;
	for (i in kanjiList) {
		if(kanjiList[i].drawing == ref) {   //we get the right kanji in order to check
			let kunInput = document.getElementById("kunyomi");
			let onInput = document.getElementById("onyomi");
			let meaningInput = document.getElementById("meaning");
			kunInput.value = kanjiList[i].kunyomi;
			onInput.value = kanjiList[i].onyomi;
			meaningInput.value = kanjiList[i].meaning;
		}	
	}
}

function validateAnswers() {
	let kanjiList = JSON.parse(data);
	let ref = document.getElementsByClassName("text-placeholder")[0].innerHTML;
	for (i in kanjiList) {
		if(kanjiList[i].drawing == ref) {   //we get the right kanji in order to check
			let kunInput = document.getElementById("kunyomi");
			let onInput = document.getElementById("onyomi");
			let meaningInput = document.getElementById("meaning");
			meaning.classList.remove("is-success", "is-wrong", "is-partial");
			kunInput.classList.remove("is-success", "is-wrong", "is-partial");
			onInput.classList.remove("is-success", "is-wrong", "is-partial");
			let kunList = kanjiList[i].kunyomi;
			let onList = kanjiList[i].onyomi;
			let kunAnswer = kunInput.value.split(";");
			let onAnswer = onInput.value.split(";");
			switch(checkReadings(kunList, kunAnswer)) {
				case "red":
					kunInput.classList.add("is-wrong");
					break;
				case "orange":
					kunInput.classList.add("is-partial");
					break;
				case "green" :
					kunInput.classList.add("is-success");
					break;
			}
			switch(checkReadings(onList, onAnswer)) {
				case "red":
					onInput.classList.add("is-wrong");
					break;
				case "orange":
					onInput.classList.add("is-partial");
					break;
				case "green" :
					onInput.classList.add("is-success");
					break;
			}
			meaningInput.classList.add((meaningInput.value == kanjiList[i].meaning) ? "is-success" : "is-wrong");
		}
	}
}

function checkReadings(refList, answerList) {
	//console.log(refList, answerList);
	let refLength = refList.length;
	let answerLength = (answerList[0] == "") ? 0 : answerList.length;
	if (answerLength == 0 ) { return "red"; } //case no answer was written
		for (let answer of answerList ) {
			let boolIN = false
			for (ref of refList) {
				if (answer == ref) {　boolIN = true;　}
			}
			if (!boolIN){　return "red";}
		}
		return (answerLength == refLength) ? "green" : "orange";
}


document.addEventListener("DOMContentLoaded", ()=> {
	setKanji();
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

