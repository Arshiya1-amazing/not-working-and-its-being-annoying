class Game {
  constructor() {
    this.resetButton = createButton("")
    this.resetTitle = createElement("h6")
    this.leaderBoardTitle = createElement("h3");
    this.leader1 = createElement("h5")
    this.leader2 = createElement("h6")
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.html("Do you want to reset? If so, press this one-of-a-kind button! Only worth your life's savings, but it's worth it if you get to play this game again!")
    this.resetTitle.class("resetText");
    this.resetTitle.position(width/2+200, 10);
    this.resetButton.class("resetButton");
    this.resetButton.position(width/2+400, 200)
    this.leaderBoardTitle.html("Who is winning in this amazing game?")
    this.leaderBoardTitle.class("resetText");
    this.leaderBoardTitle.position(width/2-630, 150);
    this.leader1.class("leadersText")
    this.leader1.position(width/2-200, 200);
    this.leader2.class("leadersText")
    this.leader2.position(width/2-200, 300);
    }

  play() {
    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          // Changing camera position in y direction
          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }
      }

      this.handlePlayerControls();

      drawSprites();
    }
  }

  handlePlayerControls() {
    // handling keyboard events
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
  }
}
