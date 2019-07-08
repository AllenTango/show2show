let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let startButton = document.getElementById('start');
let currentlyPlaying = true;
// 再次加载 路径是需要绝对路径么？ 2019-06-05 同源策略
let closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
let botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
let numClosedDoors = 3;
let score = 0;
let highScore = 0;
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');
let openDoor1, openDoor2, openDoor3;

currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * 3);

  switch (choreDoor) {
    case 0:
      openDoor1 = botDoorPath;
      openDoor2 = spaceDoorPath;
      openDoor3 = beachDoorPath;
      break;
    case 1:
      openDoor1 = beachDoorPath;
      openDoor2 = botDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 2:
      openDoor1 = spaceDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = botDoorPath;
      break;
  }
};

const playDoor = door => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(door)) {
    gameOver('lose');
    currentlyPlaying = false;
  }
};

const isBot = door => door.src === botDoorPath ? true : false;

const isClicked = door => door.src === closedDoorPath ? false : true;

const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = '好运哟！❤️';
  currentlyPlaying = true;
  randomChoreDoorGenerator();
};

const saveScore = () => {
  score++;
  currentStreak.innerHTML = score;
  if (score > highScore) {
    highScore = score;
    bestStreak.innerHTML = highScore;
  }
};

const gameOver = (status) => {
  if (status === 'win') {
    startButton.innerHTML = '你赢啦！再试一次？❤️';
    saveScore();
  } else {
    startButton.innerHTML = '被扫出门啦，再试一次？🤔️';
    score = 0;
    currentStreak.innerHTML = score;
  }
  currentlyPlaying = false;
};

doorImage1.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
};
doorImage2.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};
doorImage3.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

startButton.onclick = startRound;
startRound();