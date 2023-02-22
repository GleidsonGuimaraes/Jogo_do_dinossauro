let imgs = [], imgAtual = 1;
let imgs1 = [], imgAtual1 = 1;
let imgs2 = [], imgAtual2 = 1;
let animar, criar, gameOverMovimento;
let saltando = false, fimDeJogo = false, inicioDeJogo = false;
let posicaoY = 230;
let contador = 0, pontuacaoMaxima = 0, pontuacao;

const mega = document.getElementById("mega");
const background = document.querySelector(".background");
const gOver = document.createElement('div');
const divPontuacao = document.getElementById('point');
const divMaxPontuacao = document.getElementById('maxPoint');

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

function aperteSetaCima(event) {
  if (event.code === 'ArrowUp' || event.code === 'Space'){
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

function aperteParaIniciar(event){
  if(event.code === 'Enter'){
    if(fimDeJogo){
      fimDeJogo = false;
      clearInterval(gameOverMovimento);
      background.removeChild(gOver);
      clearInterval(animar);
      background.style.animation = "slideright 600s infinite linear";
      if(!inicioDeJogo){
        divPontuacao.innerText = contador;
        iniciar();
        inicioDeJogo = true;
      }
      background.appendChild(mega);
    }else{
      if(!inicioDeJogo){
        divPontuacao.innerText = contador;
        iniciar();
        inicioDeJogo = true;
      }
    }
  }
}

function pontuar(){
  contador++;
  divPontuacao.innerText = contador;
}

function pular() {
  
  let upInterval = setInterval(() => {
      if (posicaoY >= 480){
          clearInterval(upInterval);
          let downInterval = setInterval(() => {
              if(posicaoY <= 230){
                  clearInterval(downInterval);
                  saltando = false;
                  clearInterval(animar);
                  animar = setInterval(correr, 80);            
              } else {
                  posicaoY -= 15;
                  mega.style.bottom = `${posicaoY}px`;
              }
          }, 20);
      } else {
          posicaoY += 20;
          mega.style.bottom = `${posicaoY}px`;
      }
  }, 20);
}

function gameOver(){
  clearInterval(pontuacao);
  if(contador > pontuacaoMaxima){
    pontuacaoMaxima = contador;
  }
  divMaxPontuacao.innerText = pontuacaoMaxima;
  contador = 0;
  inicioDeJogo = false;
  fimDeJogo = true;
  background.style.animation = "none";
  gOver.innerText = "Game Over!";
  gOver.setAttribute('id', 'game-over');
  background.appendChild(gOver);

  let movDireita = true;
  let posicaoX = 500;

  gameOverMovimento = setInterval(()=>{
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
  pontuacao = setInterval(pontuar,250);
  window.addEventListener("keydown", aperteSetaCima);
}

window.addEventListener("keydown", aperteParaIniciar);