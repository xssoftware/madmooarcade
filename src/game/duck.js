'use strict';

function Duck(x,y){
	this.x = x;
	this.y = y;
	this.eventEmitter = new EventEmitter();
	this.viewObject = new game.Container();

	this.viewObject.x = x;
	this.viewObject.y = y;

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
		]
		//Death animations
	};

	this.animationSpeeds = {
		flyHorizontally : 0.1,
		flyDiagonally : 0.1,
		flyVertically : 0.1
		//more animationSpeeds
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


Duck.prototype.flyVertically = function(x,y){
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
	tween.start();
	
};

