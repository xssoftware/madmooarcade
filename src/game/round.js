'use strict';

function Round(stage){
	this.ducksSpawned = 0;
	this.ducksPerRound = 5;
	this.pointsTotal = 0;
	this.dog = new Dog(1,350);
	this.stage = stage;
	this.away = new game.Sprite('fly away.png');
	this.text = new game.PIXI.Text(0);
	this.text.position.x = 1;
	this.text.position.y = 1;
	this.text.style.fill = 'white';
	this.text.style.font = 'bold 50px Arial';
    this.stage.addChild(this.text);
	this.coords = [
	[
		{x:1, y:300}, 
		{x:275, y:100}, 
		{x : 1, y:-80}
	],
	[
		{x : Math.floor(Math.random()*250)+50, y:275}, 
		{x:250, y:150}, 
		{x:-90, y:1}
	],
	[
		{x:Math.floor(Math.random()*250)+250, y:275}, 
		{x:450, y:200}, 
		{x : new game.System().width +90, y : 50}
	]
	];

	this.scoring = function(){
		var scores;
   		var scoresTmp;
		   if(game.storage.has('scores')===false){
		    scores = [0,0,0,0,this.pointsTotal];
		    game.storage.set('scores', scores);
		   }
		   else{
		    scoresTmp = game.storage.get('scores');
		    scores = [];
		    for(var i = 1; i < scoresTmp.length; i++){
		     scores.push(scoresTmp[i]);
		    };
		    scores.push(this.pointsTotal);
		    game.storage.set('scores', scores);
		   }
		};
}


Round.prototype.start = function(){
	var self = this;
	this.stage.addChild(this.dog.viewObject);
	this.dog.walkTo(new game.System().width / 2, this.dog.y);
	//var duck = new Duck(self.coords[Math.floor((Math.random() * self.coords.length))]);
	//var duck = new Duck(self.coords[0]);
	//this.stage.addChild(duck.viewObject);
	
	this.dog.eventEmitter.registerEvent('arrived', function(){
		self.dog.foundDuck();
	});
	
	this.dog.eventEmitter.registerEvent('foundDuck', function(){
		self.dog.jump();
	});
	
	this.dog.eventEmitter.registerEvent('jumped', function(){
	    game.audio.playSound('duck', 1);   
		//here we create the ducks and send them on their way
		if(self.ducksSpawned<self.ducksPerRound){
		    var duck = new Duck(self.coords[Math.floor((Math.random() * self.coords.length))]);
		    self.stage.addChild(duck.viewObject);
		    self.ducksSpawned++;
			duck.fly();
		}
		else{
			self.scoring();
		};


		duck.eventEmitter.registerEvent('goneOffscreen', function(){
		game.audio.stopSound('duck');
			self.dog.laugh();
		});

		duck.eventEmitter.registerEvent('shotDuck', function(){
			duck.shot();
		});

		duck.eventEmitter.registerEvent('falling',function(){
		game.audio.stopSound('duck');
		    game.audio.playSound('fall');
			duck.falling();
		});
		duck.eventEmitter.registerEvent('duckFound',function(){
		game.audio.stopSound('fall');
			//game.audio.playSound('drop');
		    game.audio.playSound('end round');
			self.dog.duckFound();
			self.pointsTotal += 50;
			self.text.setText(self.pointsTotal);
		});
	});
	/*this.dog.eventEmitter.registerEvent('duckFound', function(){
		self.dog.duckFound();
	});*/
};




