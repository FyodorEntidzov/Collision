class Collision
{
	constructor()
	{
		
	}
	
	checkCollision(particles)
	{
		let pos1 , pos2 , horizontalDist , verticalDist , distance , radiusSum ;
		
		for(let i = 0 ; i < particles.length -1 ; i++)
		{
			
			for(let j = i+1 ; j < particles.length ; j++)
			{
				
				pos1 = particles[i].getPosition();
				pos2 = particles[j].getPosition();
				
				horizontalDist = pos2.x - pos1.x ;
				verticalDist = pos2.y - pos1.y ;
				
				distance = distance = Math.sqrt( horizontalDist*horizontalDist + verticalDist*verticalDist);
				radiusSum = particles[i].radius + particles[j].radius;
				
				if( distance <= radiusSum)
				{
					
					let horOffset = (horizontalDist/distance)*(radiusSum-distance),
						vertOffset = (verticalDist/distance)*(radiusSum-distance);
					
					let totalMomentumXI = particles[i].mass*particles[i].getVelocity().x ,
						totalMomentumYI = particles[i].mass*particles[i].getVelocity().y ,
						totalMomentumXJ = particles[j].mass*particles[j].getVelocity().x ,
						totalMomentumYJ = particles[j].mass*particles[j].getVelocity().y ;

					let dotProductI = this.dotProduct( horizontalDist , verticalDist , totalMomentumXI , totalMomentumYI ) ,
						dotProductJ = this.dotProduct( horizontalDist , verticalDist , totalMomentumXJ , totalMomentumYJ) ;
				
				//computing momentum in a direction of a vector ( horizontalDist , verticalDist) for each particle
				
					let momentum1XI = (horizontalDist/distance)*( dotProductI / distance),
						momentum1YI = (verticalDist/distance)*( dotProductI / distance ),

						momentum1XJ = (horizontalDist/distance)*( dotProductJ / distance ),
						momentum1YJ = (verticalDist/distance)*( dotProductJ /distance );

				//computing velocities in a direction perpendicular to ( horizontalDist , verticalDist)
				
					let velXI = (totalMomentumXI - momentum1XI) / particles[i].mass,
						velYI = (totalMomentumYI - momentum1YI)/ particles[i].mass,
						
						velXJ = (totalMomentumXJ - momentum1XJ) / particles[j].mass,
						velYJ = (totalMomentumYJ - momentum1YJ)/ particles[j].mass;
						

				//computing total momentum in a direction of ( horizontalDist , verticalDist) and dividing by the sum of masses so that we have velocity of the system in that direction
				
					let vel2X = (momentum1XI + momentum1XJ) / (particles[i].mass + particles[j].mass),
						vel2Y = (momentum1YI + momentum1YJ) / (particles[i].mass + particles[j].mass);
							
				//finally changing the velocity of two particles

				particles[i].setVelocity( velXI + vel2X - 0.5*horOffset , velYI + vel2Y - 0.5*vertOffset );
				particles[j].setVelocity( velXJ +vel2X + 0.5*horOffset , velYJ + vel2Y + 0.5*vertOffset);
					
				}
								
			}
			
		}
		
	}
	
	dotProduct( uX , uY , vX ,vY)
	{
		
		return uX*vX + uY*vY;
		
	}
	
	walls( particles , width , height)//width and height of screen
	{
		
		for( let i = 0 ; i < particles.length ; i++)
		{
			
			if( particles[i].getPosition().x <= particles[i].radius )//|| particles[i].getPosition().x >= width - particles[i].radius)
			{
				
				particles[i].setPosition( particles[i].radius , particles[i].getPosition().y);
				particles[i].setVelocity( -particles[i].getVelocity().x , particles[i].getVelocity().y);
				
			}
			if(particles[i].getPosition().x >= width - particles[i].radius)
			{
				
				particles[i].setPosition( width - particles[i].radius , particles[i].getPosition().y);
				particles[i].setVelocity( -particles[i].getVelocity().x , particles[i].getVelocity().y);
				
			}
			if( particles[i].getPosition().y <= particles[i].radius)// || particles[i].getPosition().y >= height - particles[i].radius )
			{
				
				particles[i].setPosition( particles[i].getPosition().x , particles[i].radius );
				particles[i].setVelocity( particles[i].getVelocity().x ,-particles[i].getVelocity().y);
				
			}
			if(particles[i].getPosition().y >= height - particles[i].radius)
			{
				
				particles[i].setPosition( particles[i].getPosition().x , height - particles[i].radius );
				particles[i].setVelocity( particles[i].getVelocity().x ,-particles[i].getVelocity().y);
			}
			
		}
		
	}
	
	reposition(particle)
	{
		
		particle.setPosition( particle.container.x + particle.getVelocity().x ,  particle.container.y + particle.getVelocity().y);
		
	}
}