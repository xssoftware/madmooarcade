'use strict';

function Round(stage){
	this.ducksSpawned = 0;
	this.ducksPerRound = 5;
	this.pointsTotal = 0;
	this.dog = new Dog(1,350);
	this.stage = stage;
	this.scores = [0,0,0,0,0];

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
	    //game.audio.playSound('duck', 1);   
		//here we create the ducks and send them on their way
		if(self.ducksSpawned<self.ducksPerRound){
	    var duck = new Duck(self.coords[Math.floor((Math.random() * self.coords.length))]);
	    self.stage.addChild(duck.viewObject);
	    self.ducksSpawned++;
		duck.fly();
		}
		else{
			if(game.storage.has('scores')===false){
				game.storage.set('scores',self.pointsTotal);
				self.scores[(self.scores.length)-1]=game.storage.get('scores');
				console.log("Hello");
			}
			else{
				game.storage.set('scores',self.pointsTotal);
				for(var i = 0; i<self.scores.length; i++){
					if(i<self.scores.length-1){
						self.scores[i] = self.scores[i+1]; 
						}
					else{
						self.scores[i] = game.storage.get('scores');
						};
				};
			};
			console.log("Your score for this round was " + game.storage.get('scores'));
			console.log(self.scores);
		};


		duck.eventEmitter.registerEvent('goneOffscreen', function(){
			self.dog.laugh();
		});

		duck.eventEmitter.registerEvent('shotDuck', function(){
			duck.shot();
		});

		duck.eventEmitter.registerEvent('falling',function(){
			duck.falling();
		});
		duck.eventEmitter.registerEvent('duckFound',function(){
			self.dog.duckFound();
			self.pointsTotal += 50;
			console.log(self.pointsTotal);
		});
	});
	/*this.dog.eventEmitter.registerEvent('duckFound', function(){
		self.dog.duckFound();
	});*/
};




