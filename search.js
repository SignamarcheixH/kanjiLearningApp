
function initList(){
	let kanjiList = document.getElementsByClassName("kanji-list")[0];
	let allKanji = JSON.parse(data);
	for(kanji of allKanji) {
		let node = document.createElement("LI");
		node.dataset.kanji=kanji.drawing;
		node.innerHTML = kanji.drawing;
		if(kanji.drawing.length >= 3) { node.style.fontSize = '35px'; }
		node.classList.add("kanji-thumb");
		kanjiList.appendChild(node);
		node.addEventListener("click", (event) => {
			showInfo(node.dataset.kanji, event);		
		})
	}
	let totalPlaceholder = document.getElementsByClassName("total-placeholder")[0];
	totalPlaceholder.innerHTML = allKanji.length;
}

function showInfo(refKanji, event) {
	let allKanji = JSON.parse(data);
	let infoCard = document.getElementsByClassName("info-card")[0];
	if(event.clientX > 611) {
		infoCard.style.left = '10%';
	} else {
		infoCard.style.left = '60%';
	}
	for (kanji of allKanji) {
		if(kanji.drawing == refKanji) {
			infoCard.classList.add("is-active");
			infoCard.getElementsByClassName("card-placeholder")[0].innerHTML = kanji.drawing;
			if (kanji.drawing.length >= 3 ) { 
				infoCard.getElementsByClassName("card-placeholder")[0].style.fontSize = '100px';
				infoCard.getElementsByClassName("card-placeholder")[0].style.paddingTop = '30px';
				infoCard.getElementsByClassName("card-placeholder")[0].style.paddingBottom = '30px';
			}
			infoCard.getElementsByClassName("card-meaning")[0].innerHTML = kanji.meaning;
			infoCard.getElementsByClassName("card-kunyomi")[0].innerHTML = kanji.kunyomi;
			infoCard.getElementsByClassName("card-onyomi")[0].innerHTML = kanji.onyomi;
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	initList();
	let closeIcon = document.getElementsByClassName("icon-close")[0];
	let infoCard = document.getElementsByClassName("info-card")[0];
	closeIcon.addEventListener("click", () => {
		infoCard.classList.remove("is-active");
	})
});