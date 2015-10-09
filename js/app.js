/**
 * @description Represents an Enemy
 * @constructor
 * @param {number} y - Starting y coordinate (vertical placement)
 */

// Enemies our player must avoid
var Enemy = function(y) {
    // Set useful 'constants'
    // x-coordinate at which enemies will (re)join canvas (off screen)
    this.STARTING_X = -131;
    // x-coordinate at which enemies leave canvas
    this.MAX_X = 505;
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    // Calculate where to initially position enemy horizontally.
    this.x = this.getStartingX();
    this.y = y;
    // Calculate initial randomised velocity factor - equates to pixels moved
    // per frame (later modified by delta value)
    this.velocity = this.getNewVelocity();
};


/**
 * @description Calculates new velocity factor for enemy
 * @returns {number} Randomised velocity factor between 150 and 500
 */
Enemy.prototype.getNewVelocity = function() {
    return 150 + 350 * Math.random();
};

/**
 * @description Update the enemy's x position.
 * @param {number} dt - a time delta between ticks to eliminate differences
 *                      between computers.
 * @returns {undefined}
 */
Enemy.prototype.update = function(dt) {
    // Multiplies any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Update position using velocity. If position is off screen
    // to the right, then reset position to start.
    if (this.x >= this.MAX_X) {
        // Reset starting x position
        this.x = this.getStartingX();
        // Give the enemy a different speed
        this.velocity = this.getNewVelocity();
    } else {
        // Move enemy to the right.
        this.x += this.velocity * dt;
    }
};

/**
 * @description Draw the enemy on the canvas
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Position enemy to starting point off screen
 * @returns {number} A negative number of pixels
 */
Enemy.prototype.getStartingX = function() {
    // Calculate a random number of pixels between 0 and 2000 before
    // the off-canvas starting point
    return this.STARTING_X - Math.random() * 2000;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/**
 * @description Represents a Player. Uses image avatar.
 * @constructor
 */
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = this.getStartingX();
    this.y = this.getStartingY();
    this.lives = this.resetLives();
    this.score = this.resetScore();
};

/**
 * Set constants for correct positioning of Player within canvas.
 * MAX_X - maximum possible x coordinate of Player sprite.
 * MIN_X - minimum possible x coordinate of Player sprite.
 * MAX_Y - maximum possible y coordinate of Player sprite.
 * MIN_Y - minimum possible y coordinate of Player sprite.
 * OFFSET_Y - adjustment to y coordinate of Player sprite to improve look.
 * LIVES - the number of lives a Player should have at start of play.
 */
Player.MAX_X = 404;
Player.MIN_X = 0;
Player.OFFSET_Y = 20;
Player.MAX_Y = 415 - Player.OFFSET_Y;
Player.MIN_Y = 0 - Player.OFFSET_Y;
Player.LIVES = 5;

/**
 * @description Set where new player position is prior to next render
 * @param {number} dx - how far player should move in x direction
 * @param {number} dy - how far player should move in y direction
 */
Player.prototype.update = function(dx, dy) {
    // check for out of bounds
    if ((this.y + dy >= Player.MIN_Y) && (this.y + dy <= Player.MAX_Y)) {
        this.y = this.y + dy;
    }
    if ((this.x + dx >= Player.MIN_X) && (this.x + dx <= Player.MAX_X)) {
        this.x = this.x + dx;
    }
    // check successfully reached water
    if (this.reachedFinishPoint()) {
        this.score += 1;
        this.goBackToStart();
    }
};

/**
 * @description Draw the player on the canvas
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Get x-axis starting position for player.
 * @returns {number} x-coordinate in pixels
 */
Player.prototype.getStartingX = function() {
    return 202;
};

/**
 * @description Get y-axis starting position for player.
 * @returns {number} y-coordinate in pixels.
 */
Player.prototype.getStartingY = function() {
    return Player.MAX_Y;
};

/**
 * @description Get player's current score.
 * @returns {number} Current score.
 */
Player.prototype.getScore = function() {
    return this.score;
};

Player.prototype.resetScore = function() {
    this.score = 0;
};

Player.prototype.resetLives = function() {
    this.lives = Player.LIVES;
};

/**
 * @description Get player's remaining lives.
 * @returns {number} Number of lives remaining.
 */
Player.prototype.getLives = function() {
    return this.lives;
};

/**
 * @description Checks if player has reached water by analysing y coordinate
 * @returns {boolean}
 */
Player.prototype.reachedFinishPoint = function() {
    return this.y === Player.MIN_Y;
};

/**
 * @description Returns player to starting point.
 */
Player.prototype.goBackToStart = function() {
    this.x = this.getStartingX();
    this.y = this.getStartingY();
};

/**
 * @description Update player state if collides with enemy
 */
Player.prototype.looseLife = function() {
    this.lives -= 1;
    this.goBackToStart();
};

/**
 * @description Calculates appropriate distance to move along x and y axes
 *              depending on key pressed.
 * @param {string} pressedKey - String representing the key pressed.
 */
Player.prototype.handleInput = function(pressedKey) {
    var tileHeight = 83;
    var tileWidth = 101;
    var dx = 0;
    var dy = 0;
    switch (pressedKey) {
        case 'left':
            dx = dx - tileWidth;
            break;
        case 'up':
            dy = dy - tileHeight;
            break;
        case 'right':
            dx = dx + tileWidth;
            break;
        case 'down':
            dy = dy + tileHeight;
            break;
        default:
            return;
    }
    this.update(dx, dy);
};

/**
 * @description Represents the game Scoreboard.
 * @constructor
 * @param {Player} player
 */
var Scoreboard = function(player) {
    this.player = player;
    this.lives = player.getLives();
    this.score = player.getScore();
};

/**
 * @description Getter for player's score
 * @returns {number}
 */
Scoreboard.prototype.getScore = function() {
    return this.player.getScore();
};

/**
 * @description Gets the number of lives the player has remaining.
 * @returns {number}
 */
Scoreboard.prototype.getLives = function() {
    return this.player.getLives();
};

/**
 * @description Updates the scoreboard's current score and lives,
 *              sourced from the player.
 */
Scoreboard.prototype.update = function() {
    this.score = this.player.getScore();
    this.lives = this.player.getLives();
};

/**
 * @description Renders the scores to the canvas.
 */
Scoreboard.prototype.render = function() {
    var scoreText = "SCORE: " + this.getScore();
    var livesText = "LIVES: " + this.getLives();
    ctx.textAlign = 'left';
    ctx.font = "bold 24px sans-serif";

    ctx.fillStyle = "rgb(5, 100, 0)";
    ctx.fillRect(0, 545, 505, 50);
    ctx.fillStyle = "rgb(122, 220, 99)";
    ctx.fillText(scoreText, 15, 578);
    ctx.fillText(livesText, 380, 578);
};

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies.
var allEnemies = [];
// Place the player object in a variable called player.
var player = new Player();
// Create a scoreboard object for the newly created player.
var scoreboard = new Scoreboard(player);
// Create as many enemies as you like.
createEnemies(12);

/**
 * @description Create new enemies.
 * @param {number} total - total number of enemies to create.
 */
function createEnemies(total) {
  for (var i = 0; i < total; i++) {
      var y = 63 + 83 * (i % 3);
      allEnemies.push(new Enemy(y));
  }
}



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
