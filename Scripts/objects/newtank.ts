module objects {
    export class NewTank extends objects.GameObject {
        // private instance variables
        private assetManager : createjs.LoadQueue;
        private fuelConsumeRate : number = 10; // 10 default
        /////////////////////////////////////////////////////////////////////////////
        // PUBLIC PROPERTIES
        /////////////////////////////////////////////////////////////////////////////
        public fuel : number ;
        public health : number ;
        public score : number ;

        // BULLETS
        public _bullets : Array<objects.NewBullet> = new Array<objects.NewBullet>();  // all its bullets are already instantiated
        public nextBulletCounter : number =0; // Its a counter to delay the shooting process
        public _NextBullet:number = 30; // Its the delayer, where the nextBulletCounter have to reach before shoot 
        // TANK CONTROL
        public control : managers.NewKeyboard;
        public _up: number;
        public _down: number;
        public _left: number;
        public _right: number;
        public _fire: number;
                

        // Constructor
        constructor(assetManager: createjs.LoadQueue, tankNumber : number,  x:number , y:number, ammoQty:number ) {
                    super(assetManager, "tank");
            this.assetManager = assetManager;
            this.x=x;
            this.y=y;
            let counter : number =0;
            this.name = this.name + tankNumber;
            for(counter=0; counter<ammoQty; counter ++){
                this._bullets.push(new objects.NewBullet(this.assetManager, this.name));
            }
            
            switch(tankNumber){
                case 1:
                    this._up = config.KeyCode.Up_Arrow;
                    this._down = config.KeyCode.Down_Arrow;
                    this._left = config.KeyCode.Left_Arrow;
                    this._right = config.KeyCode.Right_Arrow;
                    this._fire =  config.KeyCode.Space_Bar;
                    break;
                case 2:
                    this._up = config.KeyCode.W;
                    this._down = config.KeyCode.S;
                    this._left = config.KeyCode.A;
                    this._right = config.KeyCode.D;
                    this._fire =  config.KeyCode.Q;
                    break;
                case 3:
                    this._up = config.KeyCode.Up_Arrow;
                    this._down = config.KeyCode.Down_Arrow;
                    this._left = config.KeyCode.Left_Arrow;
                    this._right = config.KeyCode.Right_Arrow;
                    this._fire =  config.KeyCode.Numpad_0;
                    break;
                default:
                    this._up = config.KeyCode.Up_Arrow;
                    this._down = config.KeyCode.Down_Arrow;
                    this._left = config.KeyCode.Left_Arrow;
                    this._right = config.KeyCode.Right_Arrow;
                    this._fire =  config.KeyCode.Space_Bar;
            }
    
            this.control = new managers.NewKeyboard(this._up, this._down, this._left, this._right, this._fire);

            this.Start();

        }
    
        // private methods
    
        // public methods
    
        // Initializes variables and creates new objects
        public Start():void {
            this.fuelConsumeRate =10;
            this.fuel = 100000;
            this.health=10;
            this.score=0;
        }
    
        // updates the game object every frame
        public UpdateTank():void {
            // tank's previous position in order to be able to retrieve in case of new position's collision
            let tank_previous_x = this.x; 
            let tank_previous_y = this.y; 

            this.shoot(); // change the status (bullet.fired) of the next available bullet from false to true
            this.Move();  // updates the tank movment 
            this.checkTankCollision(tank_previous_x, tank_previous_y); // checks whether there was a tank collision when it assumes its new position (x,y)
            this.CheckBounds(); // checks whether the tank is on the screen boundaire 
            this.bulletsMovement(this); // update this tank's the bullets movements on the screen
        }
    
        // reset the objects location to some value
        public Reset():void {
    
        }
    
        // move the object to some new location
        public Move():void {
            let pace = 5;
            if(this.fuel <= 0){
                pace = 0;
            }
            if((this.control.moveLeft && this.control.moveForward) ||
                (this.control.moveRight && this.control.moveForward) || 
                (this.control.moveLeft && this.control.moveBackward) ||
                (this.control.moveRight && this.control.moveBackward)){
                    return;
                }

            // Keyboard Controls
            if(this.control.moveLeft){
                this.fuel -= this.fuelConsumeRate;
                this.x-=pace;
                this.rotation =270;
            }
            if(this.control.moveRight){
                this.fuel -= this.fuelConsumeRate;
                this.x+=pace;
                this.rotation =90;
            }
            if(this.control.moveBackward){
                this.fuel -= this.fuelConsumeRate;
                this.y+=pace;
                this.rotation =180;
            }
            if(this.control.moveForward){
                this.fuel -= this.fuelConsumeRate;
                this.y-=pace;
                this.rotation =0;
            }
        }
    
        // check to see if some boundary has been passed
        public CheckBounds():void {

            // right boundary
            if(this.x >= 1500 -  this.halfWidth) {
            this.x = 1500 - this.halfWidth;
            }
            // left boundary
            if(this.x <= this.halfWidth) {
            this.x = this.halfWidth;
            }
            
            // bottom boundary
            if(this.y >= 800 -  this.halfHeight) {
            this.y = 800 - this.halfHeight;
            }
    
            // top boundary
            if(this.y <= this.halfHeight) {
            this.y = this.halfHeight;
            }
        }

        public getAngle():number{

            if(this.rotation/90<=1) {
                return 90-this.rotation;
            } 
            else if (this.rotation/90 <=2) {
                return 270+180-this.rotation;
            }
            else if (this.rotation/90 <=3) {
                return 180+270-this.rotation;
            } else {
                return 90+360-this.rotation;
            }
            
        }

               
        public shoot():void{
            this.nextBulletCounter++;
            if(!this.control.shoot) return;
            if(this.nextBulletCounter>=this._NextBullet){
                if(this.control.shoot){
                    let bullet : NewBullet;
                    for(bullet of this._bullets){
                        if(!bullet.isFired){
                            bullet.fire(this.x , this.y,this.getAngle());
                            break;
                        }
                    }
                }
                this.nextBulletCounter=0;
            }

        }

        private checkTankCollision(previous_x : number , previous_y : number):void{
            // Checks all the objects registered for collision check 
            let objectDetected : objects.GameObject;
            for(objectDetected  of objects.Game.objectsMap){
                if ( objectDetected != this){
                    if(objectDetected.name.toUpperCase() !="BULLET" || (objectDetected.name.toUpperCase() =="POWERUP" &&
                        objectDetected.visible==true)){
                        managers.Collision.Check(objectDetected, this);
                        if(this.isColliding && objectDetected != this) break;
                    }
                }
            }
            
            if(this.isColliding){
                this.x =  previous_x;
                this.y =  previous_y; 
                this.isColliding = false;
            }
        }

        private bulletsMovement(tank: objects.NewTank){
            this._bullets.forEach(bullet=>{
                if(bullet.isFired) bullet.bulletMovement(tank);
                
            });
        }

    }
}