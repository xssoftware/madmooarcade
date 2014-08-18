'use strict';

function Round(stage){
	this.ducksSpawned = 0;
	this.ducksPerRound = 10;
	this.dog = new Dog(1,350);
	this.stage = stage;
	//this.duck = new Duck(250,250);

}


Round.prototype.start = function(){
	var self = this;
	this.stage.addChild(this.dog.viewObject);
	this.dog.walkTo(new game.System().width / 2, this.dog.y);
	
	this.dog.eventEmitter.registerEvent('arrived', function(){
		self.dog.foundDuck();
	});
	
	this.dog.eventEmitter.registerEvent('foundDuck', function(){
		self.dog.jump();
	});
	
	this.dog.eventEmitter.registerEvent('jumped', function(){
		//here we create the ducks and send them on their way
		//this.stage.addChild(this.duck.viewObject);
		//self.duck.flyHorizontally();
	});
	
	
};




