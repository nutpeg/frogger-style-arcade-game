/**
 * This module's two main functions are to show the user:
 * - instructions at the start of game play
 * - the game over screen
 */
(function() {

  /**
   * @description Shows instructions for the game. It is only shown once, so
   *              if the player elects to play again, then the instructions
   *              are not shown.
   * @param {boolean} firstPlay - Indicates whehter this is the first round of
   *                  play.
   */
  function showInstructions(firstPlay) {
    if (!firstPlay) {
      init();
    } else {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, 505, 606);
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.font = '48px "Comic Sans MS", "Comic Sans", cursive';
      ctx.fillText(UserText.text.heading, 252, 80);
      ctx.font = '20px sans-serif';
      ctx.textAlign = 'left';
      createLine(UserText.text.para1, 20, 150);
      createLine(UserText.text.para2, 20, 200);
      createLine(UserText.text.para3, 20, 345);
      createLine(UserText.text.para4, 20, 450);
      ctx.fillStyle = 'red';
      ctx.fillRect(183, 480, 138, 48);
      ctx.textAlign = 'center';
      ctx.font = '24px "Comic Sans MS", "Comic Sans", cursive';
      ctx.fillStyle = 'white';
      ctx.fillText('Start!', 252, 512);
      ctx.canvas.addEventListener('click', handleStartClick, false);
      document.addEventListener('keyup', handleStartGameKeyPress, false);
    }
  }

  /**
   * @description Handles the 'click' event on the 'Start' button. Initiates
   *              the game.
   * @param {Event} e
   */
  function handleStartClick(e) {
    var position = getCursorPosition(e);
    if ((position.x > 182 && position.x < 323) && (position.y > 450 && position.y < 588)) {
      ctx.canvas.removeEventListener('click', handleStartClick, false);
      firstPlay = false;
      init();
    }
  }

  /**
   * @description Handles the 'keypress' event on the instructions page. Initiates the
   *              game.
   * @param {Event} e
   */
  function handleStartGameKeyPress(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      document.removeEventListener('keyup', handleStartGameKeyPress, false);
      init();
    }
  }

  /**
   * @description Utility function to put text onto canvas. Takes lines from array
   *              and draws each line on canvas, appropriately spaced.
   * @param {Array} textArr - Array of text lines.
   * @param {number} x - x coordinate of text
   * @param {number} y - y cooordinate of text line.
   */
  function createLine(textArr, x, y) {
    textArr.forEach(function(line, i) {
      ctx.fillText(line, x, i*30 + y);
    });
  }

  /**
   * @description Presents the 'Game over' screen, giving the option to
   *              play again.
   */
  function gameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(20, 70, 466, 500);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = '48px "Comic Sans MS", "Comic Sans", cursive';
    ctx.fillText('Game Over!', 252, 200);
    ctx.font = '24px sans-serif';
    ctx.fillText('You\'ve lost all your lives.', 252, 250);
    ctx.fillStyle = 'red';
    ctx.fillRect(183, 300, 138, 48);
    ctx.fillStyle = 'white';
    ctx.fillText('Play again', 252, 330);
    ctx.canvas.addEventListener('click', handleRestartGameClick, false);
    document.addEventListener('keyup', handleStartGameKeyPress, false);
  }

  /**
   * @description Handles the click event on the 'Play again' button on the
   *              'Game over' screen. Will restart the game.
   * @param {Event} e
   */
  function handleRestartGameClick(e) {
    var position = getCursorPosition(e);
    if ((position.x > 182 && position.x < 323) && (position.y > 300 && position.y < 348)) {
      ctx.canvas.removeEventListener('click', handleRestartGameClick, false);
      init();
    }
  }

  /**
   * @description  Calculates the position of a click on the canvas.
   *               It returns x and y click coordinates relevant to the canvas.
   * @param {Event} e
   * @returns {Object} Object containing x and y coordinates of click.
   */
  function getCursorPosition(e) {
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
      x = e.pageX;
      y = e.pageY;
    }
    else {
      x = e.clientX + document.body.scrollLeft +
          document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop +
          document.documentElement.scrollTop;
    }
    x -= ctx.canvas.offsetLeft;
    y -= ctx.canvas.offsetTop;

    return {x: x, y: y};
  }

  // Make available to other modules.
  window.Instructions = {
    showInstructions: showInstructions,
    gameOver: gameOver
  }
})();