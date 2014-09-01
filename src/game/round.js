'use strict';

function Round(stage){
	this.ducksSpawned = 0;
	this.ducksPerRound = 10;
	this.dog = new Dog(1,350);
	this.stage = stage;

	this.coords = [
	[1, Math.floor(Math.random()*100), 275, 200, new game.System().width - 150, -80],
	[Math.floor(Math.random()*250)+50, 275, 250, 150, -90, 1],
	[Math.floor(Math.random()*250)+250, 275, 450, 200, new game.System().width +90, 50],
	[1, Math.floor(Math.random()*250)+100, 250, 50, new game.System().width, -80],
	[new game.System().width, Math.floor(Math.random()*200), new game.System().width/2, 150, -90, Math.floor(Math.random()*100)],
	[1, Math.floor(Math.random()*300), new game.System().width/2, 150, new game.System().width+90, Math.floor(Math.random()*100)]
	]
}


Round.prototype.start = function(){
	var self = this;
	this.stage.addChild(this.dog.viewObject);
	this.dog.walkTo(new game.System().width / 2, this.dog.y);
	var duck = new Duck(self.coords[Math.floor((Math.random() * self.coords.length))]);
	this.stage.addChild(duck.viewObject);
	
	this.dog.eventEmitter.registerEvent('arrived', function(){
		self.dog.foundDuck();
	});
	
	this.dog.eventEmitter.registerEvent('foundDuck', function(){
		self.dog.jump();
	});
	
	this.dog.eventEmitter.registerEvent('jumped', function(){
		//here we create the ducks and send them on their way
		duck.fly();
	});
	
	
};




