game.module(
    'game.main'
)
.body(function() {

game.addAsset('logo.png');
game.addAsset('duck-hunt.png');
game.addAsset('duckhunt_various_sheet.png');

game.addAudio('duck.ogg', 'duck');
game.addAudio('Game_Start.mp3', 'gameStart');
game.addAudio('dog bark.ogg', 'bark');


/*game.addAudio('sounds/Game_Over_1.mp3', 'over1');
game.addAudio('sounds/Game_Over_2.mp3', 'over2');

game.addAudio('sounds/Perfect_Round.mp3', 'perfect');
game.addAudio('sounds/Shot_Duck.mp3', 'duckShot');
game.addAudio('sounds/Stage_Clear.mp3', 'clear');
game.addAudio('sounds/Title_Theme.mp3', 'title'); */

game.SceneMenu = game.Scene.extend({
    backgroundColor: 0xb9bec7,

    init: function() {
     
	
    }
});

game.SceneGame = game.Scene.extend({
    backgroundColor: 0xb9bec7,

    init: function() {
	    game.audio.playSound('gameStart',null, null, function(){
		game.audio.playSound('bark');
		});
		
		
        var background = new game.Sprite('duck-hunt.png').addTo(this.stage);

		var round = new Round(this.stage);
		round.start();
		
    }
});


game.SceneScores = game.Scene.extend({
    backgroundColor: 0xb9bec7,

    init: function() {
     
	
    }
});


game.start(game.SceneGame);
	
});
