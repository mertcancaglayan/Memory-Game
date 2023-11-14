const eerieBtnElement = document.querySelector("#eerie");
const ladiesBtnElement = document.querySelector("#ladies");
const containerElement = document.querySelector(".container");
const gallery = document.createElement("div");
gallery.classList.add("gallery");

function flipCard() {
    this.classList.toggle("flip")

}

function getImgNumbers(max) {
	return Array.from({ length: max }, (_, index) => index + 1);
}

function createGameInfo(category) {
	const gameInfo = document.createElement("div");
	gameInfo.classList.add("gameInfo");

	const timeInfo = document.createElement("div");
	timeInfo.classList.add("timeInfo");
	timeInfo.innerText = "Time: 100";
	gameInfo.appendChild(timeInfo);

	const gameTitle = document.createElement("h1");
	gameTitle.classList.add("gameTitle");
	gameTitle.style.fontFamily = category;
	gameTitle.innerText = category === "eerie" ? "Creep It Real" : "FemmeMe-Mory";
	gameInfo.appendChild(gameTitle);

	const score = document.createElement("p");
	score.classList.add("score");
	score.innerText = "10";
	gameInfo.appendChild(score);

	containerElement.appendChild(gameInfo);

	return gameInfo;
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function generateRandomImages(category, maxImages) {
    containerElement.appendChild(gallery);

    const imgNumbers = getImgNumbers(maxImages / 2);
    const shuffledImgNumbers = shuffleArray([...imgNumbers, ...imgNumbers]);

    for (let i = 0; i < shuffledImgNumbers.length; i++) {
        const imgSrc = `assets/images/${category}/img (${shuffledImgNumbers[i]}).jpg`;

        const card = document.createElement("div");
        card.classList.add("memory-card");
        const frontDiv = document.createElement("div");
        frontDiv.classList.add("front-face");
        const frontImg = document.createElement("img");
        frontImg.src = "assets/images/front-face.png";
        frontDiv.appendChild(frontImg);

        
        const backDiv = document.createElement("div")
        backDiv.classList.add("back-face");

        const imgElement = document.createElement("img");
        imgElement.src = imgSrc;
        backDiv.appendChild(imgElement);

        card.appendChild(frontDiv);
        card.appendChild(backDiv);
        gallery.appendChild(card);
    }

    let cards = document.querySelectorAll(".memory-card");
    console.log(cards);

    cards.forEach(card => card.addEventListener("click", flipCard));
}


function generateRandomNumbers() {
	const randomArray = [];

	while (randomArray.length < 16) {
		const randomNum = Math.floor(Math.random() * 99) + 1;
		if (!randomArray.includes(randomNum)) {
			randomArray.push(randomNum);
		}
	}

	return randomArray;
}

eerieBtnElement.addEventListener("click", () => {
	startGame("eerie", 16);
});

ladiesBtnElement.addEventListener("click", () => {
	startGame("ladies", 16);
});

function startGame(category, maxImages) {
	containerElement.innerHTML = "";
	gallery.innerHTML = "";

	const gameInfo = createGameInfo(category);
	generateRandomImages(category, maxImages);
}


