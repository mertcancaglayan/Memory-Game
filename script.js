eerieBtnElement = document.querySelector("#eerie");
ladiesBtnElement = document.querySelector("#ladies");
containerElement = document.querySelector(".container");

function getImgNumber(max) {
	return Math.floor(Math.random() * max) + 1;
}

eerieBtnElement.addEventListener("click", () => {
	startGame("eerie", 26);
});

ladiesBtnElement.addEventListener("click", () => {
	startGame("ladies", 16);
});

function startGame(category, maxImages) {
	containerElement.innerHTML = "";

    let gameInfo = document.createElement("div")
    gameInfo.classList.add("gameInfo")

    let timeInfo = document.createElement("div")
    timeInfo.classList.add("timeInfo")
    timeInfo.innerText = "Time: 100"
    gameInfo.appendChild(timeInfo)

    let gameTitle = document.createElement("h1")
    gameTitle.classList.add("gameTitle")
    gameTitle.style.fontFamily = category
    if (category === "eerie"){
        gameTitle.innerText = "Creep It Real"
    } else if (category === "ladies") {
        gameTitle.innerText = "FemmeMe-Mory"
    }
    gameInfo.appendChild(gameTitle)

    let score = document.createElement("p")
    score.classList.add = "score"
    score.innerText = "10"
    gameInfo.appendChild(score)

    containerElement.appendChild(gameInfo)


    let gallery = document.createElement("div")
    gallery.classList.add("gallery")
    containerElement.appendChild(gallery)


	const selectedImages = [];

	while (selectedImages.length < 16) {
		const imgNumber = getImgNumber(maxImages);
		const imgSrc = `assets/images/${category}/img (${imgNumber}).jpg`;

		if (!selectedImages.includes(imgSrc)) {
			selectedImages.push(imgSrc);
			const imgElement = document.createElement("img");
			imgElement.src = imgSrc;
			gallery.appendChild(imgElement);
		}
	}
}
