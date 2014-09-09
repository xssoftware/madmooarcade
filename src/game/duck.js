'use strict';

function Duck(path){
	
	
	this.path = path;
	this.pathProgress = 0;
	
	this.eventEmitter = new EventEmitter();
	this.viewObject = new game.Container();
	
	this.x = this.path[this.pathProgress].x;
	this.y = this.path[this.pathProgress].y;

	this.viewObject.x = this.path[this.pathProgress].x;
	this.viewObject.y = this.path[this.pathProgress].y;
    this.viewObject.interactive = true;

	this.texture = game.PIXI.BaseTexture.fromImage('media/duckhunt_various_sheet.png');
	
	this.currentAnimation = null;
	this.width = 90;
	this.height = 80;

	this.animationFrames = {

		flyHorizontally : [
			{ x : 1, y : 270, width : this.width, height : this.height},
			{ x : 90, y : 270, width : this.width, height : this.height},
			{ x : 180, y : 270, width : this.width, height : this.height}
		],
		flyDiagonally : [
			{ x : 1, y : 360, width : this.width, height : this.height},
			{ x : 90, y : 360, width : this.width, height : this.height},
			{ x : 180, y : 360, width : this.width, height : this.height}
		],
		flyVertically : [
			{ x : 1, y : 460, width : this.width, height : this.height},
			{ x : 90, y : 460, width : this.width, height : this.height},
			{ x : 180, y : 460, width : this.width, height : this.height}
		],
		shot : [
			{x : 1, y : 542, width : this.width, height : this.height}
		],
		falling : [
			{x : 90, y : 542, width : this.width, height : this.height}
		]
	};

	this.animationSpeeds = {
		flyHorizontally : 0.1,
		flyDiagonally : 0.1,
		flyVertically : 0.1,
		shot : 0.1,
		falling : 0.1
	};

	console.log(this.texture);

}

Duck.prototype.setAnimation = function(animation, loop, onComplete){
  
	
	
	var self = this;
	var textures = [], i, frame, rect;
	loop = (loop === undefined ? true : loop);
	
	if(this.currentAnimation){
		this.currentAnimation.stop();
		this.viewObject.removeChild(this.currentAnimation);
	}
	
	for(i = 0; i < this.animationFrames[animation].length; i++){
		frame = this.animationFrames[animation][i];
		rect = new game.PIXI.Rectangle(frame.x, frame.y, frame.width, frame.height);
		textures.push(new game.Texture(this.texture, rect));
	}

	this.currentAnimation = new game.Animation(textures);
	this.currentAnimation.animationSpeed = this.animationSpeeds[animation];
	this.currentAnimation.loop = loop;
	this.viewObject.scale.x = 1;
	this.viewObject.scale.y = 1;
	this.currentAnimation.visible = true;
	
	if(typeof onComplete === 'function'){
		self.currentAnimation.onComplete = onComplete;
	}
	
	
	this.viewObject.addChild(this.currentAnimation);
	this.currentAnimation.play();
};

Duck.prototype.animationChoice = function(){
	var currentPos, nextPos;
	currentPos = this.path[this.pathProgress];
	nextPos = this.path[this.pathProgress + 1];
	
	console.log(this.path[this.pathProgress], this.path[this.pathProgress+1]);
	
	if(currentPos.y === nextPos.y){
		this.setAnimation('flyHorizontally');
		this.viewObject.scale.x = (nextPos.x < currentPos.x) ? -1 : 1;
 
	} else	if(currentPos.y < nextPos.y && currentPos.x === nextPos.x){
		this.setAnimation('flyVertically');
	} else {
		this.setAnimation('flyDiagonally');
		this.viewObject.scale.x = (nextPos.x < currentPos.x) ? -1 : 1;
	}
	

	/*
	if (this.x!==this.x1 && this.y===this.y1) {
		console.log("Chose horizontally");
		return this.setAnimation('flyHorizontally');
	}
	else if (this.x===this.x1 && this.y!==this.y1){
		console.log("Chose vertically");
		return this.setAnimation('flyVertically');
	}
	else {
		console.log("Chose diagonally");
		return this.setAnimation('flyDiagonally');
	}
	*/

};

Duck.prototype.fly = function(){

	var tween = new game.Tween(this.viewObject.position);
	var self = this;
	var nextPos = this.path[self.pathProgress + 1];
	var currentPos = this.path[self.pathProgress];
	var tweenTime = (Math.sqrt(Math.pow((nextPos.x - currentPos.x),2) + Math.pow((nextPos.y - currentPos.y),2)))/0.2;
	console.log(tweenTime);
	this.animationChoice();
	tween.to({x: nextPos.x, y: nextPos.y}, tweenTime);
	tween.start();
	this.viewObject.click = function(){
	game.audio.playSound('b');
		tween.stop();
		self.currentAnimation.visible = false;
		self.eventEmitter.emit('shotDuck');
	};
	tween.onComplete(function(){
		self.pathProgress++;
		if(self.path[self.pathProgress + 1]){
			self.fly();
		} else {
			//the duck has left the field
			self.eventEmitter.emit('goneOffscreen');
		}
		
	});
};

Duck.prototype.shot = function(){
	var self = this;
	this.setAnimation('shot', false, function(){
		self.eventEmitter.emit('falling');
	});
	
};

Duck.prototype.falling = function(){
	var self = this;
	var tween = new game.Tween(this.viewObject.position);
	tween.to({ y:300}, 1000);
	this.setAnimation('falling');
	tween.start();
	tween.onComplete(function(){
		self.currentAnimation.visible = false;
		self.eventEmitter.emit('duckFound');
	});
};
	/*
	var tween1 = new game.Tween(this.viewObject.position);
	var tween2 = new game.Tween(this.viewObject.position);
	
	console.log(x,y,x1,y1,x2,y2);
	tween1.to({x: this.x1, y: this.y1},2500);
	tween2.to({x: this.x2, y: this.y2},2500);
	console.log(this.x,this.y,this.x1,this.y1,this.x2,this.y2);
	this.animationChoice(this.x,this.y,this.x1,this.y1);
	tween1.start();
	tween1.onComplete(function(){
		self.animationChoice(self.x1,self.y1,self.x2,self.y2);
		console.log("Chaining tweens");
		tween1.chain(tween2);
	});

	tween2.onComplete(function(){
		self.eventEmitter.emit('destinationReached');
	});*/



/*Duck.prototype.flyVertically = function(x,y){
	var tween = new game.Tween(this.viewObject.position);
	var self = this;
	tween.to({y: -80}, 3500);
	this.x = x;
	this.y = y;

	tween.onComplete(function(){
		self.eventEmitter.emit('destinationReached');
	});

	this.setAnimation('flyVertically');
	tween.start();
};

Duck.prototype.flyDiagonally = function(x,y){
	var tween = new game.Tween(this.viewObject.position);
	var self = this;
	tween.to({x: new game.System().width, y: 1},2500);
	this.x = x;
	this.y = y;

	tween.onComplete(function(){
		self.eventEmitter.emit('destinationReached');
	});

	this.setAnimation('flyDiagonally');
	tween.start();
};

Duck.prototype.flyHorizontally = function(x, y){
	var tween = new game.Tween(this.viewObject.position);
	var self = this;
	tween.to({x: new game.System().width}, 3500);
	this.x = x;
	this.y = y;
	
	tween.onComplete(function(){
		self.eventEmitter.emit('destinationReached');
	});
	
	this.setAnimation('flyHorizontally');
	tween.start();*/
	


