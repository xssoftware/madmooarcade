game.module(
    'game.main'
)
.body(function() {

game.addAsset('logo.png');
game.addAsset('duck-hunt.png');
game.addAsset('duckhunt_various_sheet.png');

game.SceneMenu = game.Scene.extend({
    backgroundColor: 0xb9bec7,

    init: function() {
     
	
    }
});

game.SceneGame = game.Scene.extend({
    backgroundColor: 0xb9bec7,

    init: function() {
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
