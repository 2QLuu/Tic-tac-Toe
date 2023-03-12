const cell_boxConst = "cell_box";
const frontTextConst = "headText";
const cellConst = "cell";
const playerConst = "player";
const computerConst = "computer";
const overlayConst = "overlay";
const overlayTextConst = "overlay-text";
const overlayButtonConst = "overlay-button";
const visibileConst = "visibile";

const cell_box = document.querySelector("." + cell_boxConst);
const headText = document.querySelector("." + frontTextConst);
const overlay = document.querySelector("." + overlayConst);
const overlayText = document.querySelector("." + overlayTextConst);
const overlayButton = document.querySelector("." + overlayButtonConst);

const cells = document.querySelectorAll("." + cellConst);

const winningConstilations = [
  [cells[0], cells[1], cells[2]],
  [cells[3], cells[4], cells[5]],
  [cells[6], cells[7], cells[8]],
  [cells[0], cells[3], cells[6]],
  [cells[1], cells[4], cells[7]],
  [cells[2], cells[5], cells[8]],
  [cells[0], cells[4], cells[8]],
  [cells[2], cells[4], cells[6]],
];

let activeClass;

overlayButton.addEventListener("click", startGame);

startGame();

function move(event) {
  if (activeClass === computerConst) {
    return;
  }
  const cell = event.target;
  if (makeMove(cell) === true) {
       endMove();
  }
}

function makeMove(cell) {
  if (
       cell.classList.contains(playerConst) ||
       cell.classList.contains(computerConst)
  ) {
    return false;
  }

  cell.classList.add(activeClass);
  cell.disabled = true;
  return true;
}

function startGame() {
  overlay.classList.remove(visibileConst);
  overlayText.classList.remove(playerConst, computerConst);
  activeClass = null;

  for (const cell of cells) {
    cell.classList.remove(playerConst, computerConst);
    cell.disabled = false;
    cell.addEventListener("click", move);
  }
  endMove();
}

function endMove() {
  if (checkWin() === true) {
    spielBeenden(false);
    return;
  }

  if (checkDraw() === true) {
    spielBeenden(true);
    return;
  }

  if (activeClass === playerConst) {
       activeClass = computerConst;
  } else if (activeClass === computerConst) {
       activeClass = playerConst;
  } else {
       activeClass = Math.random() < 0.5 ? playerConst : computerConst;
  }

  refresh();

  if (activeClass === computerConst) {
    setTimeout(computerMakesMove, 750);
  }
}

function refresh() {
  headText.classList.remove(playerConst, computerConst);

  if (activeClass === playerConst) {
    headText.innerText = "Your Turn";
  } else {
    headText.innerText = "Enemys Turns";
  }
  headText.classList.add(activeClass);
}

function checkWin() {
  for (const kombination of winningConstilations) {
    const wonTheGame = kombination.every(function (cell) {
      return cell.classList.contains(activeClass);
    });

    if (wonTheGame === true) {
      return true;
    }
  }
  return false;
}

function spielBeenden(unentschieden) {

  if (unentschieden === true) {
    overlayText.innerText = "Draw!";
  } else if (activeClass === playerConst) {
    overlayText.innerText = "You WON!";
    overlayText.classList.add(playerConst);
  } else {
    overlayText.innerText = "The Enemy Won!";
    overlayText.classList.add(computerConst);
  }

  overlay.classList.add(visibileConst);
}

function checkDraw() {

  for (const cell of cells) {
    if (
      !cell.classList.contains(playerConst) &&
      !cell.classList.contains(computerConst)
    ) {

      return false;
    }
  }

  return true;
}

function computerMakesMove() {

  const randomizer = Math.floor(Math.random() * 9);

  if (makeMove(cells[randomizer]) === true) {
    endMove();
  } else {
       computerMakesMove();
  }
}