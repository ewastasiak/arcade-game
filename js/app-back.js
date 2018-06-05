/*
readme - how to load and play the game

app.js
implement Player and Enemy classes (OO) part of the enemy is ready

the enemy function (initiates enemy by loading the image by setting this.sprite PROVIDED
and by

IMPLEMENT DIS:
setting the enemy initial location
the update method for the enemy (IS IT DERE?)
updates for the enemy location
handle collision with the Player


Player class
Player function which initiates the Player by

loading the image by setting this.sprite to the appropriate image in the image folder (enemy code as an example
setting the player initial locationupdate method for the player (can be similar for the enemy one)
render method for the player
handleinput method should receive user inpud, allowed-Keys (the key that was pressed) and move the player according to the input
l,r,u,data

no moving off screen

reset on reaching the water (separate reset palyer method?)

---------
instantiate by
creating a new player object
creating several enemies and placing in allENemies array
*/




// Page styling
const musicInfo = document.getElementsByClassName('flashit')[0];
const linkMusic = document.getElementsByClassName('link')[0];
const soundIcon = document.getElementsByClassName('fa-info-circle')[0];

function toggleFunction() {
    if (musicInfo.style.display === "none") {
        musicInfo.style.display = "block";
    } else {
        musicInfo.style.display = "none";
    }
  }
linkMusic.onclick = toggleFunction;
soundIcon.onclick = toggleFunction;

// Enemies our player must avoid
var Enemy = function(y, speed) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = 0;
	this.y = y;
	this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	//???
	this.x += this.speed*dt;
  if (this.x > 500) { //600
    this.x = -50;
    this.speed = randomSpeed(5); //10
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
//WHY


class Player {
	constuctor() {
		this.x = 0;
		this.y = 0;
		this.sprite = 'images/char-boy.png';
    this.radius = 10; //20
	}
	update() {

        //console.log('y');
    }

	render() {
	  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//get?
	}

	handleInput() { //zerżnięte
    if (win === false) {
       if (e === 'left' && player.x > 0) {
           player.x = player.x -= 100;
         }
         if (e === 'right' && player.x < 400) {
           player.x = player.x += 100;
         }
         if (e === 'up' && player.y > 0) {
           player.y = player.y -= 100;
         }
         if (e === 'down' && player.y < 400) {
           player.y = player.y += 100;
         }
       };
	}
}


const player = new Player();
let enemyCount = 0;

function getEnemies() { //spawnEnemies
  enemyCount++;
  const enemy = new Enemy(enemyCount);
  allEnemies.push(enemy);

  if (enemyCount >= 5) { //10
    enemyCount = 0;
  };
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player





const allEnemies = [];




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


window.onload = function() {
  initGame();
}


function initGame() {
  getEnemTimer(); //spawnTimer

  player.x = 200;
  player.y = 400;
};


  function getEnemTimer () {
  spawnTime = setInterval(getEnemies, 1000);
};
