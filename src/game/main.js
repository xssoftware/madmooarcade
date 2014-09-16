game.module(
    'game.main'
)
.body(function() {

game.addAsset('logo.png');
game.addAsset('duck-hunt.png');
game.addAsset('duckhunt_various_sheet.png');
game.addAsset('duck-hunt-start.png');
game.addAsset('fly away.png');
game.addAsset('scene3.png');

game.addAudio('duck.ogg', 'duck2');
game.addAudio('Game_Start.mp3', 'gameStart');
game.addAudio('dog bark.ogg', 'bark');
game.addAudio('Title_Theme.ogg', 'title');
game.addAudio('laugh.ogg', 'l');
game.addAudio('blast.ogg', 'b');
game.addAudio('end_duck_round.ogg', 'end round');
game.addAudio('duckFall.ogg', 'fall');
game.addAudio('duckDrop.ogg', 'drop');
game.addAudio('duck_wing_flap_and_quack.ogg', 'duck');




game.SceneMenu = game.Scene.extend({
    backgroundColor: 0xb9bec7,

    init: function() {
		game.audio.playSound('title');
		var background2 = new game.Sprite('duck-hunt-start.png').addTo(this.stage);
		background2.interactive = true;
		background2.click = function(){
		game.system.setScene(game.SceneScores);
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
		background.interactive = true;
		background.click = function()
		{		
		     game.audio.playSound('b');		
		};
		round.start();
		
    }
});


game.SceneScores = game.Scene.extend({
    backgroundColor: 0xb9bec7,

    init: function() {
		var background3 = new game.Sprite('scene3.png').addTo(this.stage);
	var newgame = new game.PIXI.Text('New Game');
	newgame.interactive = true;
	newgame.position = {x:374, y:120};
	
	var highScores = new game.PIXI.Text('High Scores');
	highScores.interactive.true;
	highScores.position = {x:374, y:160};
	
	newgame.click = function()
	{
	   game.system.setScene(game.SceneGame);
	};
	
     this.stage.addChild(newgame);
	 this.stage.addChild(highScores);
     
	
    }
});


game.start(game.SceneMenu);
	
});
