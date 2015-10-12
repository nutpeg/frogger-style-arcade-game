/*
 * Playing Instructions
 *
 * To start the game, open 'index.html' in your browser.
 *
 * Your goal is to cross the road and reach the water without being run over by
 * a bug. The bugs are your enemies. To move your character, use the left, right,
 * up and down arrows.
 *
 * Each time you reach the water, you score a point.
 *
 * Each time you get squashed by a bug, you lose a life.
 *
 * You start with 5 lives.
 *
 */

(function(window) {
    var text = {
        heading: 'Playing Instructions',
        para1: ['To start the game, open "index.html" in your browser.'],
        para2: ['Your goal is to cross the road and reach the water',
                'without being run over by a bug. The bugs are ',
                'your enemies. To move your character, use the left,',
                'right, up and down arrows.'],
        para3: ['Each time you reach the water, you score a point.',
                'Each time you get squashed by a bug, you lose',
                'a life.'],
        para4: ['You start with 5 lives.']
    };

    window.UserText = {
        text: text
    };
})(window);
