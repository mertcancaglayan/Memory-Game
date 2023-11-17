const eerieBtnElement = document.querySelector("#eerie");
const ladiesBtnElement = document.querySelector("#ladies");
const containerElement = document.querySelector(".container");
const gallery = document.createElement("div");
gallery.classList.add("gallery");

const restartButton = document.createElement("button");
restartButton.classList.add("restartBtn");
restartButton.innerText = "Restart";

let points = 0;
let score;
let currentCategory;

function checkMatch() {
	const isMatch = firstCard.querySelector(".back-face img").src === secondCard.querySelector(".back-face img").src;

	if (isMatch) {
		points++;
		score.innerText = `${points}/8`;

		if (points === 8) {
			restartButton.style.display = "flex";
			restartButton.addEventListener("click", () => {
				startGame(currentCategory, 16);
			});
		}

		disableCards();
	} else {
		disableBoard = true;

		setTimeout(() => {
			firstCard.classList.remove("flip");
			secondCard.classList.remove("flip");

			disableBoard = false;
		}, 2000);
	}
}

function disableCards() {
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);
}

let hasFlippedCard = false;
let disableBoard = false;
let firstCard, secondCard;

function flipCard() {
	if (disableBoard) return;
	if (this === firstCard) return;
	this.classList.toggle("flip");

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
	} else {
		hasFlippedCard = false;
		secondCard = this;

		checkMatch();
	}
}

function getImgNumbers(max) {
	return Array.from({ length: max }, (_, index) => index + 1);
}

function createGameInfo(category) {
	const gameInfo = document.createElement("div");
	gameInfo.classList.add("gameInfo");

	const backBtnElement = document.createElement("div");
	backBtnElement.classList.add("backBtn");
	backBtnElement.innerHTML = `<i class="fa-solid fa-backward"></i>`;
	gameInfo.appendChild(backBtnElement);

	backBtnElement.addEventListener("click", () => {
		location.reload();
	});

	const gameTitle = document.createElement("h1");
	gameTitle.classList.add("gameTitle");
	gameTitle.style.fontFamily = category;
	gameTitle.innerText = category === "eerie" ? "Creep It Real" : "FemmeMe-Mory";
	gameInfo.appendChild(gameTitle);

	score = document.createElement("p");
	score.classList.add("score");
	score.innerText = `${points}/8`;
	gameInfo.appendChild(score);

	containerElement.appendChild(gameInfo);
	containerElement.appendChild(restartButton);

	return gameInfo;
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function generateRandomImages(category, maxImages = 16) {
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

		const backDiv = document.createElement("div");
		backDiv.classList.add("back-face");

		const imgElement = document.createElement("img");
		imgElement.src = imgSrc;
		backDiv.appendChild(imgElement);

		card.appendChild(frontDiv);
		card.appendChild(backDiv);
		gallery.appendChild(card);
	}

	let cards = document.querySelectorAll(".memory-card");

	cards.forEach((card) => card.addEventListener("click", flipCard));
}

eerieBtnElement.addEventListener("click", () => {
	startGame("eerie");
});

ladiesBtnElement.addEventListener("click", () => {
	startGame("ladies");
});

function startGame(category, maxImages) {
	currentCategory = category;
	points = 0;
	restartButton.style.display = "none"

	containerElement.innerHTML = "";
	gallery.innerHTML = "";

	const gameInfo = createGameInfo(category);
	generateRandomImages(category, maxImages);
}
