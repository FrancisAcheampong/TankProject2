module scenes {
  export class StartScene extends objects.Scene {
    // Private Instance Variables
    private _welcomeLabel: objects.Label;
    private _welcomeLabel2: objects.Label;
    private _startButton: objects.Button;

    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods
    private _startButtonClick():void {
      objects.Game.currentScene = config.Scene.PLAY1;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._welcomeLabel = new objects.Label("- Tank Game - ", "80px", "Consolas", "#000000", 750, 250, true);
      this._welcomeLabel2 = new objects.Label("- Basic Movements Presentation -", "40px", "Consolas", "#000000", 750, 350, true);
      this._startButton = new objects.Button(this.assetManager, "startButton", 750, 450);
      this.Main();
    }

    public Update(): void {

    }

    // This is where the fun happens
    public Main(): void {
      // add the welcome label to the scene
      this.addChild(this._welcomeLabel);
      this.addChild(this._welcomeLabel2);

      // add the startButton to the scene
      this.addChild(this._startButton);

      this._startButton.on("click", this._startButtonClick);
    }
  }
}
