class Particle
{
	constructor(mass , radius, color)
	{

		this.mass = mass;
		this.radius = radius;
		this.color = color;
		this.velocity = {x: 0, y:0};
		this.acceleration = {x:0 , y:0};
		
		this.container = new PIXI.Container();
		this.graphics = new PIXI.Graphics();
	
		this.container.addChild(this.graphics);
				
		this.container.pivot.x = this.container.width / 2;
		this.container.pivot.y = this.container.height / 2;
	}

	setPosition(x,y)
	{
		
		this.container.x = x;
		this.container.y = y;
		
	}
	
	getPosition()
	{
		
		return { x : this.container.x , y : this.container.y };
		
	}
	
	setVelocity(velX , velY)
	{
		
		this.velocity.x = velX;
		this.velocity.y = velY;
		
	}
	
	setAcceleration( accX , accY)
	{
		
		this.acceleration.x = accX;
		this.acceleration.y = accY;
		
	}
	
	getVelocity()
	{
		
		return this.velocity;
		
	}
	
	
	draw()
	{
		
		this.graphics.lineStyle(0);
		this.graphics.beginFill(0xFFFF0B);
		this.graphics.drawCircle(0, 0, this.radius);
		this.graphics.endFill();
	
	}

	addTo(container)
	{
	
		container.addChild(this.container);
	
	}
}