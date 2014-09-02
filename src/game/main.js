game.module(
    'game.main'
)
.body(function() {

game.addAsset('logo.png');
game.addAsset('duck-hunt.png');
game.addAsset('duckhunt_various_sheet.png');
game.addAsset('duck-hunt-start.png');

game.addAudio('duck.ogg', 'duck');
game.addAudio('Game_Start.mp3', 'gameStart');
game.addAudio('dog bark.ogg', 'bark');
game.addAudio('Title_Theme.ogg', 'title');




game.SceneMenu = game.Scene.extend({
    backgroundColor: 0xb9bec7,

    init: function() {
		game.audio.playSound('title');
		var background2 = new game.Sprite('duck-hunt-start.png').addTo(this.stage);
		background2.interactive = true;
		background2.click = function(){
		game.system.setScene(game.SceneGame);
		};
		//var text = new game.PIXI.Text('Start Game');
		//text.interactive = true;
		//text.position = {x:150, y:150};
		//text.click = function(){
		//	game.system.setScene(game.SceneGame);
		//};
		
		

		//this.stage.addChild(text);
	
    }
});

game.SceneGame = game.Scene.extend({
    backgroundColor: 0xb9bec7,

    init: function() {
	    game.audio.stopSound('title');
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


game.start(game.SceneMenu);
	
});
