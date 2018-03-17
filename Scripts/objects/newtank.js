var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var NewTank = /** @class */ (function (_super) {
        __extends(NewTank, _super);
        // Constructor
        function NewTank(assetManager, tankNumber, x, y, ammoQty) {
            var _this = _super.call(this, assetManager, "tank") || this;
            _this.fuelConsumeRate = 10; // 10 default
            // BULLETS
            _this._bullets = new Array(); // all its bullets are already instantiated
            _this.nextBulletCounter = 0; // Its a counter to delay the shooting process
            _this._NextBullet = 30; // Its the delayer, where the nextBulletCounter have to reach before shoot 
            _this.assetManager = assetManager;
            _this.x = x;
            _this.y = y;
            var counter = 0;
            _this.name = _this.name + tankNumber;
            for (counter = 0; counter < ammoQty; counter++) {
                _this._bullets.push(new objects.NewBullet(_this.assetManager, _this.name));
            }
            switch (tankNumber) {
                case 1:
                    _this._up = config.KeyCode.Up_Arrow;
                    _this._down = config.KeyCode.Down_Arrow;
                    _this._left = config.KeyCode.Left_Arrow;
                    _this._right = config.KeyCode.Right_Arrow;
                    _this._fire = config.KeyCode.Space_Bar;
                    break;
                case 2:
                    _this._up = config.KeyCode.W;
                    _this._down = config.KeyCode.S;
                    _this._left = config.KeyCode.A;
                    _this._right = config.KeyCode.D;
                    _this._fire = config.KeyCode.Q;
                    break;
                case 3:
                    _this._up = config.KeyCode.Up_Arrow;
                    _this._down = config.KeyCode.Down_Arrow;
                    _this._left = config.KeyCode.Left_Arrow;
                    _this._right = config.KeyCode.Right_Arrow;
                    _this._fire = config.KeyCode.Numpad_0;
                    break;
                default:
                    _this._up = config.KeyCode.Up_Arrow;
                    _this._down = config.KeyCode.Down_Arrow;
                    _this._left = config.KeyCode.Left_Arrow;
                    _this._right = config.KeyCode.Right_Arrow;
                    _this._fire = config.KeyCode.Space_Bar;
            }
            _this.control = new managers.NewKeyboard(_this._up, _this._down, _this._left, _this._right, _this._fire);
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        NewTank.prototype.Start = function () {
            this.fuelConsumeRate = 10;
            this.fuel = 100000;
            this.health = 10;
            this.score = 0;
        };
        // updates the game object every frame
        NewTank.prototype.UpdateTank = function () {
            // tank's previous position in order to be able to retrieve in case of new position's collision
            var tank_previous_x = this.x;
            var tank_previous_y = this.y;
            this.shoot(); // change the status (bullet.fired) of the next available bullet from false to true
            this.Move(); // updates the tank movment 
            this.checkTankCollision(tank_previous_x, tank_previous_y); // checks whether there was a tank collision when it assumes its new position (x,y)
            this.CheckBounds(); // checks whether the tank is on the screen boundaire 
            this.bulletsMovement(this); // update this tank's the bullets movements on the screen
        };
        // reset the objects location to some value
        NewTank.prototype.Reset = function () {
        };
        // move the object to some new location
        NewTank.prototype.Move = function () {
            var pace = 5;
            if (this.fuel <= 0) {
                pace = 0;
            }
            if ((this.control.moveLeft && this.control.moveForward) ||
                (this.control.moveRight && this.control.moveForward) ||
                (this.control.moveLeft && this.control.moveBackward) ||
                (this.control.moveRight && this.control.moveBackward)) {
                return;
            }
            // Keyboard Controls
            if (this.control.moveLeft) {
                this.fuel -= this.fuelConsumeRate;
                this.x -= pace;
                this.rotation = 270;
            }
            if (this.control.moveRight) {
                this.fuel -= this.fuelConsumeRate;
                this.x += pace;
                this.rotation = 90;
            }
            if (this.control.moveBackward) {
                this.fuel -= this.fuelConsumeRate;
                this.y += pace;
                this.rotation = 180;
            }
            if (this.control.moveForward) {
                this.fuel -= this.fuelConsumeRate;
                this.y -= pace;
                this.rotation = 0;
            }
        };
        // check to see if some boundary has been passed
        NewTank.prototype.CheckBounds = function () {
            // right boundary
            if (this.x >= 1500 - this.halfWidth) {
                this.x = 1500 - this.halfWidth;
            }
            // left boundary
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
            // bottom boundary
            if (this.y >= 800 - this.halfHeight) {
                this.y = 800 - this.halfHeight;
            }
            // top boundary
            if (this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        NewTank.prototype.getAngle = function () {
            if (this.rotation / 90 <= 1) {
                return 90 - this.rotation;
            }
            else if (this.rotation / 90 <= 2) {
                return 270 + 180 - this.rotation;
            }
            else if (this.rotation / 90 <= 3) {
                return 180 + 270 - this.rotation;
            }
            else {
                return 90 + 360 - this.rotation;
            }
        };
        NewTank.prototype.shoot = function () {
            this.nextBulletCounter++;
            if (!this.control.shoot)
                return;
            if (this.nextBulletCounter >= this._NextBullet) {
                if (this.control.shoot) {
                    var bullet = void 0;
                    for (var _i = 0, _a = this._bullets; _i < _a.length; _i++) {
                        bullet = _a[_i];
                        if (!bullet.isFired) {
                            bullet.fire(this.x, this.y, this.getAngle());
                            break;
                        }
                    }
                }
                this.nextBulletCounter = 0;
            }
        };
        NewTank.prototype.checkTankCollision = function (previous_x, previous_y) {
            // Checks all the objects registered for collision check 
            var objectDetected;
            for (var _i = 0, _a = objects.Game.objectsMap; _i < _a.length; _i++) {
                objectDetected = _a[_i];
                if (objectDetected != this) {
                    if (objectDetected.name.toUpperCase() != "BULLET" || (objectDetected.name.toUpperCase() == "POWERUP" &&
                        objectDetected.visible == true)) {
                        managers.Collision.Check(objectDetected, this);
                        if (this.isColliding && objectDetected != this)
                            break;
                    }
                }
            }
            if (this.isColliding) {
                this.x = previous_x;
                this.y = previous_y;
                this.isColliding = false;
            }
        };
        NewTank.prototype.bulletsMovement = function (tank) {
            this._bullets.forEach(function (bullet) {
                if (bullet.isFired)
                    bullet.bulletMovement(tank);
            });
        };
        return NewTank;
    }(objects.GameObject));
    objects.NewTank = NewTank;
})(objects || (objects = {}));
//# sourceMappingURL=newtank.js.map