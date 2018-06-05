/*
*
*TODO:unlock bonus characters
*
*/

let points = 0;
let pointsShow = document.querySelector("h2");
pointsShow.innerHTML = `Points: 0`;

// Page style helpers
const getControls = document.getElementsByClassName("controls")[0];
const musicInfo = document.getElementsByClassName("flashit")[0];
const linkMusic = document.getElementsByClassName("link")[0];
const infoIcon = document.getElementsByClassName("fa-info-circle")[0];
const bonusOptions = document.getElementsByClassName("fas")[1];
//TODO: add character selection when winX10
const chooseChar = document.getElementsByClassName("bonus")[0];

//Makes bonus options inactive
bonusOptions.classList.add("fa-crown", "locked");
bonusOptions.addEventListener("mouseover", function(event) {
    // change crown into "locked" key
    bonusOptions.classList.remove("fa-crown");
    bonusOptions.classList.add("fa-key");
    // change back "locked" key into crown
    setTimeout(function() {
      bonusOptions.classList.remove("fa-key");
      bonusOptions.classList.add("fa-crown", "locked");
    }, 1500);
  },
  false
);

function toggleFunction() {
  if (musicInfo.style.display === "none") {
    musicInfo.style.display = "block";
  } else {
    musicInfo.style.display = "none";
  }
}
linkMusic.onclick = toggleFunction;
infoIcon.onclick = toggleFunction;

//Check for bonus options
if (points >= 9000) {
  bonusOptions.classList.remove("locked");
  bonusOptions.classList.add("unlocked");
}

function toggleBonus() {
  bonusOptions.onclick = toggleBonus;
  if (chooseChar.style.display === "none") {
    chooseChar.style.display = "block";
  } else {
    chooseChar.style.display = "none";
  }
}

// Enemies our player must avoid

let Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.speed = getRandomInt(200, 500);
  this.x += this.speed * dt;

  //Restart
  if (this.x > 510) {
    this.x = getRandomInt(-211, -800);
    // this.x = -50;
  }

  //idea from https://medium.com/letsboot/classic-arcade-game-with-js-5687e4125169
  if (
    player.x < this.x + 50 &&
    player.x + 50 > this.x &&
    player.y < this.y + 50 &&
    50 + player.y > this.y
  ) {
    player.lives--;
    player.reset();
  }

  function getRandomInt(min, max) {
    // from discussion https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range/1527821
    return Math.floor(Math.random() * (max - min + 23)) + min;
  }

  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function(x, y) {
  this.x = 200;
  this.y = 400;
  this.lives = 5;
  this.sprite = "images/char-boy.png";
};

Player.prototype.update = function(dt) {
  let liveCount = document.getElementsByClassName("lives")[0];
  liveCount.innerHTML = `Lives: ${this.lives}`;
  if (this.lives <= -1) {
    liveCount.innerHTML = `Lives: 0`;
    alert("A Jim squashed the Ladybug. That Jim is sad now.");
    gameRestart();
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  if (keyPress == "left" && this.x > 0) {
    this.x -= 100;
  }
  if (keyPress == "right" && this.x < 357) {
    this.x += 100;
  }
  if (keyPress == "up" && this.y > 0) {
    this.y -= 80;
  }
  if (keyPress == "down" && this.y < 400) {
    this.y += 80;
  }
  if (this.y < 20) {
    setTimeout(function() {
      player.x = 200;
      player.y = 400;
      if (points === 9) {
        points += 9000;
        alert(
          "You won 10 times and unlocked bonus options. AND you are awarded 9000 points. If that's not gratification, then I don't know what is."
        );
      }
      points++;
      pointsShow.innerHTML = `Points: ${points}`;
    }, 100);
  }
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

enemy1 = new Enemy(0, 60, 200);
enemy2 = new Enemy(0, 140, 200);
enemy3 = new Enemy(0, 230, 200);

// if (allEnemies.length >= 9) {
// allEnemies.shuffle();
// sendEnemies()
// }
sendEnemies();

function sendEnemies() {
  function randomTimeout(min, max) {
    // from discussion https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range/1527821
    return Math.floor(Math.random() * (max - min + 320)) + min;
  }

  allEnemies.push(enemy1);
  setTimeout(function() {
    allEnemies.push(enemy2);
  }, randomTimeout(0, 3000));
  setTimeout(function() {
    allEnemies.push(enemy3);
  }, randomTimeout(7000, 9000));
}

// function sendEnemies() {
// allEnemies.push(enemy1);
// setTimeout(function() {
// allEnemies.push(enemy2);
// }, 8000);
// setTimeout(function() {
// allEnemies.push(enemy3);
// }, 3300);
// }

// // Shuffle function from http://stackoverflow.com/a/2450976
// //to shuffle the enemies array
// function shuffle(array) {
//   var currentIndex = allENemies.length,
//     temporaryValue,
//     randomIndex;
//
//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }
//
//   return array;
// }

// TODO:  should I reset the enemies to the initial position or throw them out of the array and put new ones in
// if (Enemy.x >= 700) {
//   function enemyIsOut() {
//     allEnemies.filter(enemyIsOut)
//     allEnemies.push(new Enemy(0, ???, 200))
//   }
// }

// function getRandomSpeed(max) {
//   return Math.floor(Math.random() * Math.floor(max) * 10)+50;
// }

// const enemyPlacement = [60, 140, 230];
// enemyPlacement.forEach(function(positionY) {
// 	enemy = new Enemy(0, positionY, 200);
// 	allEnemies.push(enemy);
// });

let player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function gameRestart() {
  player.reset();
  player.lives = 5;
  if (points < 9000) {
    points = 0;
  }
  pointsShow.innerHTML = `Points: ${points}`;
}
