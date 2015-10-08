/*
 * Playing Instructions
 *
 * Your goal is to cross the road and reach the water without being run over by
 * a bug. The bugs are your enemies.
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
        para1: ['Your goal is to cross the road and reach the water',
                'without being run over by a bug. The bugs are ',
                'your enemies.'],
        para2: ['Each time you reach the water, you score a point.'],
        para3: ['Each time you get squashed by a bug, you lose',
                'a life.'],
        para4: ['You start with ' + Player.LIVES + ' lives.']
    };

    window.UserText = {
        text: text
    };
})(window);
