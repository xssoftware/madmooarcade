'use strict';

function Dog(x, y){
	this.x = x;
	this.y = y;
	this.eventEmitter = new EventEmitter();
	this.viewObject = new game.Container();
	
	this.viewObject.x = x;
	this.viewObject.y = y;
	
	this.texture = game.PIXI.BaseTexture.fromImage('media/duckhunt_various_sheet.png');
	
	this.currentAnimation = null;
	this.width = 140;
	this.height = 110;
	
	this.animationFrames = {
		walk : [
			{ x : 1, y : 1, width : this.width, height : this.height},
			{ x : 140, y : 1, width : this.width, height : this.height},
			{ x : 280, y : 1, width : this.width, height : this.height}
		],
		foundDuck : [
			{ x : 1, y : 140, width : this.width, height : this.height},
		],
		jump : [
			{ x : 140, y : 125, width : this.width, height : this.height},
			{ x : 280, y : 125, width : this.width, height : this.height}
		],
		isLaughing : [
			{x : 425, y : 125, width : this.width, height : this.height},
			{x : 565, y : 125, width : this.width, height : this.height}
		],
		oneDuck : [
			//frames description
		],
		twoDuck : [
			//frames description
		]
	};
	
	this.animationSpeeds = {
		walk : 0.1,
		foundDuck : 0.01,
		jump : 0.08,
		isLaughing : 0.1,
		oneDuck : 0.1
	};
	
	console.log(this.texture);
	
}


Dog.prototype.setAnimation = function(animation, loop, onComplete){
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


Dog.prototype.walkTo = function(x, y){
	var tween = new game.Tween(this.viewObject.position);
	var self = this;
	tween.to({x:x}, 3500);
	this.x = x;
	this.y = y;
	
	tween.onComplete(function(){
		self.eventEmitter.emit('arrived');
	});
	
	this.setAnimation('walk');
	tween.start();
	
};


Dog.prototype.foundDuck = function(){
	var self = this;
	this.setAnimation('foundDuck', false, function(){
		self.eventEmitter.emit('foundDuck');
	});
	
};

Dog.prototype.jump = function(){
var self = this;
	var tween = new game.Tween(this.viewObject.scale);
	var tween2 = new game.Tween(this.viewObject.position);
	

	tween.to({x : 0.5, y: 0.5}, 1000);
	tween2.to({x : (this.x + this.width / 2)}, 1000);
	
	tween.start();
	tween2.start();
	this.setAnimation('jump', false, function(){
		self.currentAnimation.visible = false;
		self.eventEmitter.emit('jumped');
	});
	
};

Dog.prototype.laugh = function(){
	var self = this;
	this.x = new game.System().width/2;
	var tween = new game.Tween(this.viewObject.position);
	tween.to({x : (this.x + this.width / 2), y : 300}, 1500);
	tween.start();
	this.setAnimation('isLaughing');
	game.audio.playSound('l');
	tween.onComplete(function(){
		self.currentAnimation.visible = false;
		self.eventEmitter.emit('jumped');
	});
};