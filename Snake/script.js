window.onload = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    //Variáveis
    snake = [];
    positionX = 10;
    positionY = 10;
    foodX = 15;
    foodY = 15;
    velX = 0;
    velY = 0;
    grid = 20;
    tam = 3;
    score = 0;

    //Chamando a função jogo a cada 100 milisegundos
    setInterval(jogo, 100);

    //Controles
    document.addEventListener("keydown", function(e){
      switch(e.key){
        //Seta pra direita
        case"ArrowRight":
          velX = 1;
          velY = 0;
          break;
        //Seta pra esquerda
        case"ArrowLeft":
          velX = -1;
          velY = 0;
          break;
        //Seta pra cima
        case"ArrowUp":
          velX = 0;
          velY = -1;
          break;
        //Seta pra baixo
        case"ArrowDown":
          velX = 0;
          velY = 1;
          break;
      }
    })
}

function jogo(){
  //Configuração da tela
  ctx.fillStyle = "#2980B9";
  //Distância da borda horizontal, vertical, largura e altura
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //Movimentação da cobra
  positionX += velX;
  positionY += velY;

  //Configurando a cobra
  ctx.fillStyle = "#00f102";
  for(let i = 0; i < snake.length; i++){
    ctx.fillRect(snake[i].x*grid, snake[i].y*grid, grid - 1, grid - 1)
    if(snake[i].x == positionX && snake[i].y == positionY){
      tam = 3, score = 0;
    }
  }

  //Posicionando a cobra
  snake.push({x: positionX, y: positionY});

  //Espelhamento
  if(positionX < 0){
    positionX = grid;
  }
  if(positionX > grid){
    positionX = 0;
  }
  if(positionY < 0){
    positionY = grid;
  }
  if(positionY > grid){
    positionY = 0;
  }


  //Apagando rastro da cobra
  while(snake.length > tam){
    snake.shift();
  }

  //Configurando a comida
  ctx.fillStyle = "#F1C40F";
  ctx.fillRect(foodX*grid, foodY*grid, grid - 1, grid - 1);

  //Comendo
  if(positionX == foodX && positionY == foodY){
    tam++, score++;
    foodX = Math.floor(Math.random()*grid);
    foodY = Math.floor(Math.random()*grid);
  }

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Placar: " + score, 0, canvas.height - 0);
}