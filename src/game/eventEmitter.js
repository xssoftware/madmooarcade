'use strict';

function EventEmitter(){
	this.events = {};
};

EventEmitter.prototype.registerEvent = function(type, handler){
	this.events[type] = handler;
};

EventEmitter.prototype.unRegisterEvent = function(type, handler){
	delete this.events[type];
};

EventEmitter.prototype.emit = function(type, data){
	var self = this;
	data = data || {};
	if(this.events[type]){
		setTimeout(function(){
			self.events[type](data);
		}, 0);
		
	}
};