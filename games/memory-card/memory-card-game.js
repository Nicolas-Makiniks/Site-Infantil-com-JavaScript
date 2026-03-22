const icons = ["💻", "🤖", "🚀", "🧠", "🔒", "🌐", "📚", "⚡"];
const victoryScreen = document.getElementById("memory-game-win");
//const wrongSound = new Audio("src/sounds/wrong.wav");
//const winSound = new Audio("src/sounds/win.wav");

//Repetindo os elementos para pares perfeitos, também me possibilita alterar
//os dados em outro momento a partir de uma única variável que no momento é constante
let cards = [...icons, ...icons];

// variáveis de controle e estado
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

const board = document.getElementById("memory-game");

function randomCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatchCards();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function checkForMatchCards() {
  let isMatch = firstCard.dataset.icon === secondCard.dataset.icon; //Comparando os datasets e retornando true ou false

  if (isMatch) {
    disableCards();
    matchedPairs++;

    //Já que comparo duplas basta usar o tamanho do array de fonte de dados
    if (matchedPairs === icons.length) {
      setTimeout(() => {
        victoryScreen.classList.remove("win");
      }, 500);
    }
  } else {
    unflipCards();
  }
}

function createBoard() {
  const randomizedCards = randomCards(cards);

  randomizedCards.forEach((icon) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("memory-card");
    cardElement.dataset.icon = icon;

    cardElement.innerHTML = `
    <div class="face front">${icon}</div>
    <div class="face back">?</div>
    `;
    cardElement.addEventListener("click", flipCard);
    board.appendChild(cardElement);
  });
}

createBoard();
