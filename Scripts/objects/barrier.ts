module objects {
    export class Barrier extends objects.GameObject {
        // private instance variables
        private assetManager : createjs.LoadQueue;
        

        // Constructor
        constructor(assetManager: createjs.LoadQueue, x:number , y:number) {
            super(assetManager, "barrier");
            this.x=x;
            this.y=y;
            this.Start();
            this.health=3;
        }

        //Public Methods
        public Start():void {
        }

        public Update():void {
        }
    }
}