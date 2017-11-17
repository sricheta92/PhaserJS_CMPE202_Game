var hero ; 
const shoot = function(hero1) {
	hero = hero1;
};

var bulletTime = 0 ;
var time ;
var bullets ;
var direction ; 

shoot.prototype.getName  =  function(){return 'shoot'}

shoot.prototype.perform = function(time1 , bullets1 , direction ){
	time = time1 ; 
	bullets = bullets1 ; 
	new ObjectHandler().startHandler(direction) ; 
}



//CHain of Responsibility
var Handler = function(direction , velocityDirection , speed ) {
    this.direction = direction;
    this.next = null;
}

Handler.prototype = {
	handleDirection : function(direction){
		if(this.direction == direction){
			if(time > bulletTime){
		        bullet = bullets.getFirstExists(false);

		        if(bullet){
		          
		          bullet.reset(hero.x+50 , hero.y+50);
		          if(this.direction == 'right'){
		          	bullet.body.velocity.x = +200 ; 
		          }else if(this.direction == 'up'){
		          	bullet.body.velocity.y = -200 ; 
		          }else if(this.direction == 'down'){
		          	bullet.body.velocity.y = +200 ; 
		          }else if(this.direction == 'left'){
		          	bullet.body.velocity.x = -200 ; 
		          }
				  bulletTime = time + 1000 ; 
		        }
		      }
		}else{
			this.next.handleDirection(direction) ; 
		}
	},

	setSuccessor : function(handler){
		this.next = handler ; 
	}
}


var ObjectHandler = function(){
	var rightHandler = new Handler('right');
	var leftHandler = new Handler('left'  );
	var upHandler = new Handler('up'  );
	var downHandler = new Handler('down' );

	rightHandler.setSuccessor(leftHandler);
	leftHandler.setSuccessor(upHandler);
	upHandler.setSuccessor(downHandler);

	this.startObjectHandler = rightHandler ; 
}


ObjectHandler.prototype.startHandler = function(direction){
	this.startObjectHandler.handleDirection(direction) ; 
}