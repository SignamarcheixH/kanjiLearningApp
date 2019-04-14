
function initList(){
	let kanjiList = document.getElementsByClassName("kanji-list")[0];
	let allKanji = JSON.parse(data);
	for(kanji of allKanji) {
		let node = document.createElement("LI");
		node.dataset.kanji=kanji.drawing;
		node.innerHTML = kanji.drawing;
		node.classList.add("kanji-thumb");
		kanjiList.appendChild(node);
		node.addEventListener("click", (event) => {
			showInfo(node.dataset.kanji, event);		
		})
	}
}

function showInfo(refKanji, event) {
	let allKanji = JSON.parse(data);
	console.log(event.clientX);
	let infoCard = document.getElementsByClassName("info-card")[0];
	if(event.clientX > 611) {
		infoCard.style.left = '10%';
	} else {
		infoCard.style.left = '60%';
	}
	for (kanji of allKanji) {
		if(kanji.drawing == refKanji) {
			infoCard.style.opacity = 1;
			infoCard.getElementsByClassName("card-placeholder")[0].innerHTML = kanji.drawing;
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
		infoCard.style.opacity = 0;
	})
});