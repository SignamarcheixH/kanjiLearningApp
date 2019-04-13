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

function validateAnswers() {
	let kanjiList = JSON.parse(data);
	let ref = document.getElementsByClassName("text-placeholder")[0].innerHTML;
	for (i in kanjiList) {
		if(kanjiList[i].drawing == ref) {   //we get the right kanji in order to check
			console.log(kanjiList[i]);
			let kunInput = document.getElementById("kunyomi");
			let onInput = document.getElementById("onyomi");
			let meaningInput = document.getElementById("meaning");
			meaning.classList.remove("is-success", "is-wrong");
			kunInput.classList.remove("is-success", "is-wrong");
			onInput.classList.remove("is-success", "is-wrong");
			kunInput.classList.add((kunInput.value == kanjiList[i].kunyomi[0]) ? "is-success" : "is-wrong");
			onInput.classList.add((onInput.value == kanjiList[i].onyomi[0]) ? "is-success" : "is-wrong");
			meaningInput.classList.add((meaningInput.value == kanjiList[i].meaning) ? "is-success" : "is-wrong");
		}
	}
}


document.addEventListener("DOMContentLoaded", ()=> {
	setKanji();
	let checkButton = document.getElementsByClassName("check-button")[0];
	checkButton.addEventListener("click", () => {
		validateAnswers();
	});
	let nextButton = document.getElementsByClassName("next-button")[0];
	nextButton.addEventListener("click", () => {
		window.location.reload();
	});  
});

