'use strict';

function Round(stage){
	this.ducksSpawned = 0;
	this.ducksPerRound = 10;
	this.dog = new Dog(1,350);
	this.stage = stage;
	this.duck1 = new Duck(250,275);
	//this.duck2 = new Duck(450,275);
	//this.duck3 = new Duck(1,1);

}


Round.prototype.start = function(){
	var self = this;
	this.stage.addChild(this.dog.viewObject);
	this.stage.addChild(this.duck1.viewObject);
	//this.stage.addChild(this.duck2.viewObject);
	//this.stage.addChild(this.duck3.viewObject);
	this.dog.walkTo(new game.System().width / 2, this.dog.y);
	
	this.dog.eventEmitter.registerEvent('arrived', function(){
		self.dog.foundDuck();
	});
	
	this.dog.eventEmitter.registerEvent('foundDuck', function(){
		self.dog.jump();
	});
	
	this.dog.eventEmitter.registerEvent('jumped', function(){
		//here we create the ducks and send them on their way
		self.duck1.flyVertically();
		//self.duck2.flyDiagonally();
		//self.duck3.flyHorizontally();
	});
	
	
};




