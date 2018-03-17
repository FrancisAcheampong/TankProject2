var managers;
(function (managers) {
    var NewKeyboard = /** @class */ (function () {
        // constructors
        function NewKeyboard(up, down, left, right, fire) {
            this.enabled = true;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
            this.controlSet = new config.Movement();
            this.controlSet.set_AllKeys(up, down, left, right, fire);
        }
        // private methods
        // public methods
        NewKeyboard.prototype.onKeyDown = function (event) {
            switch (event.keyCode) {
                case this.controlSet.UP:
                    this.moveForward = true;
                    break;
                case this.controlSet.LEFT:
                    this.moveLeft = true;
                    break;
                case this.controlSet.DOWN:
                    this.moveBackward = true;
                    break;
                case this.controlSet.RIGHT:
                    this.moveRight = true;
                    break;
                case this.controlSet.SHOOT:
                    this.shoot = true;
                    break;
            }
        };
        NewKeyboard.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                case this.controlSet.UP:
                    this.moveForward = false;
                    break;
                case this.controlSet.LEFT:
                    this.moveLeft = false;
                    break;
                case this.controlSet.DOWN:
                    this.moveBackward = false;
                    break;
                case this.controlSet.RIGHT:
                    this.moveRight = false;
                    break;
                case this.controlSet.SHOOT:
                    this.shoot = false;
                    break;
            }
        };
        return NewKeyboard;
    }());
    managers.NewKeyboard = NewKeyboard;
})(managers || (managers = {}));
//# sourceMappingURL=newkeyboard.js.map