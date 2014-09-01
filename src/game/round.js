'use strict';

function Round(stage){
	this.ducksSpawned = 0;
	this.ducksPerRound = 10;
	this.dog = new Dog(1,350);
	this.stage = stage;

	this.coords = [
	[
		{x:1, y:500}, 
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
}


Round.prototype.start = function(){
	var self = this;
	this.stage.addChild(this.dog.viewObject);
	this.dog.walkTo(new game.System().width / 2, this.dog.y);
	var duck = new Duck(self.coords[Math.floor((Math.random() * self.coords.length))]);
	//var duck = new Duck(self.coords[0]);
	this.stage.addChild(duck.viewObject);
	
	this.dog.eventEmitter.registerEvent('arrived', function(){
		self.dog.foundDuck();
	});
	
	this.dog.eventEmitter.registerEvent('foundDuck', function(){
		self.dog.jump();
	});
	
	this.dog.eventEmitter.registerEvent('jumped', function(){
	     //game.audio.playSound('duck', 1);
	
		//here we create the ducks and send them on their way
		duck.fly();
	});
	
	
};




