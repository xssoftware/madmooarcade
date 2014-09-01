'use strict';

function Duck([x,y,x1,y1,x2,y2]){
	this.x = x;
	this.y = y;
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
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

Duck.prototype.animationChoice = function(x,y,x1,y1){
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

};

Duck.prototype.fly = function(x,y,x1,y1,x2,y2){
	var tween1 = new game.Tween(this.viewObject.position);
	var tween2 = new game.Tween(this.viewObject.position);
	var self = this;
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
	});
};


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
	


