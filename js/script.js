let imgs = [], imgAtual = 1;
let imgs1 = [], imgAtual1 = 1;
let imgs2 = [], imgAtual2 = 1;
let animar;
let criar;
let saltando = false;
let posicaoY = 230;

const mega = document.getElementById("mega");
const background = document.querySelector(".background");

function preCarregarImgs1(){
  for(let i = 1; i < 10; i++){
    imgs[i] = new Image();
    imgs[i].src = `img/${i}.png`;
  };
  for(let i = 1; i < 8; i++){
    imgs1[i] = new Image();
    imgs1[i].src = `img/ms${i}.png`;
  };
  for(let i = 1; i < 3; i++){
    imgs2[i] = new Image();
    imgs2[i].src = `img/v${i}.png`;
  }
}

function aperteSetaCima(event) {
  if (event.code === 'ArrowUp'){
      if(!saltando) {
        saltando = true;
        if(saltando){
          clearInterval(animar);
          pular();
          animar = setInterval(megaSaltando, 90);
        }
      }
  }
}

function pular() {
  
  let upInterval = setInterval(() => {
      if (posicaoY >= 480){ // definindo um limite de altura para o salto
          clearInterval(upInterval);
          
          // Descendo
          let downInterval = setInterval(() => {
              if(posicaoY <= 230){ // verificando um limite para a base do dino
                  clearInterval(downInterval);
                  saltando = false;
                  clearInterval(animar);
                  animar = setInterval(correr, 80);            
              } else {
                  posicaoY -= 15;
                  mega.style.bottom = `${posicaoY}px`;
              }
          }, 20); // velocidade de descida
      } else {
          // Subindo
          posicaoY += 20;
          mega.style.bottom = `${posicaoY}px`;
      }
  }, 20); // velocidade de subida
}

function correr(){
  if(imgAtual > imgs.length-1){
    imgAtual = 1;
  }
  mega.style.backgroundImage = `url(${imgs[imgAtual].src})`;
  imgAtual++;
}

function megaSaltando(){
  if(imgAtual1 > imgs1.length-1){
    imgAtual1 = 1;
  }
  mega.style.backgroundImage = `url(${imgs1[imgAtual1].src})`;
  imgAtual1++;
}

function gameOver(){
  background.style.animation = "none";
  const gOver = document.createElement('div');
  gOver.innerText = "Game Over!";
  gOver.setAttribute('id', 'game-over');
  background.appendChild(gOver);

  let movDireita = true;
  let posicaoX = 500;

  let gameOverMovimento = setInterval(()=>{
    if(movDireita){
      posicaoX += 2;
      gOver.style.left = `${posicaoX}px`;
      if(posicaoX >= 580){
        movDireita = false;
      }
    }else if(!movDireita){
      posicaoX -= 2;
      gOver.style.left = `${posicaoX}px`;
      if(posicaoX <= 500){
        movDireita = true;
      }
    }
  }, 25);

  console.log(gOver);
}

function inimigos(){
  let posicaoIni = 1360;

  const ini = document.createElement('div');
  ini.classList.add('inimigo');
  ini.style.width = "180px";
  ini.style.height = "150px";
  ini.style.position = "absolute";
  ini.style.bottom = "230px";
  background.appendChild(ini);

  let animarVileDash = setInterval(()=>{
    if(imgAtual2 > imgs2.length-1){
      imgAtual2 = 1;
    }
    ini.style.background = `url(${imgs2[imgAtual2].src})`;
    imgAtual2++;
  }, 50);
  
  let movEsquerda = setInterval(()=>{
    if(posicaoIni < -180){
      clearInterval(animarVileDash);
      clearInterval(movEsquerda);
      background.removeChild(ini);
    }else if(posicaoIni > 100 && posicaoIni < 200 && posicaoY < 400){
      clearInterval(animarVileDash);
      clearInterval(movEsquerda);
      clearInterval(criar);
      clearInterval(animar);
      background.removeChild(ini);
      background.removeChild(mega);
      gameOver();
      console.log("GameOver");
    }else{
      posicaoIni -= 20;
      ini.style.left = posicaoIni + "px";
    }
  }, 25);
}

function iniciar(){
  preCarregarImgs1();
  animar = setInterval(correr, 80);
  criar = setInterval(inimigos, 5000);
  window.addEventListener("keydown", aperteSetaCima);
}

window.addEventListener("load",iniciar);