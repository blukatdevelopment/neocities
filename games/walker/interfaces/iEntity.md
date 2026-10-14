# iEntity

## int getEntityId()
returns entity's id, which should be generated from UTILITY.getNextEntityId().

## string getName()
Returns name for this entity

## string toString()
Returns a string representation of this entity

## void update()
Updates the entity within the game loop

## void draw()
Renders the entity onto the screen

## VECTOR2 getPosition()
Returns position in the game world.
X is horizontal position on screen
Y is vertical in a 2.5D sense
Z is vertical position on screen

## void setPosition(VECTOR2)
Setter for position

## Collider getCollider()
Returns the collider

## void setCollider(Collider)
Sets collider