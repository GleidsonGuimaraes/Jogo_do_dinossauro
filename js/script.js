let imgs = [];
let imgAtual = 1, imgMax;

const mega = document.getElementById("mega");
const background = document.querySelector(".background");

function preCarregarImgs1(){
  for(let i = 1; i < 10; i++){
    imgs[i] = new Image();
    imgs[i].src = `img/${i}.png`;
  }
}

function correr(){
  if(imgAtual > imgMax){
    imgAtual = 1;
  }
  mega.style.backgroundImage = `url(${imgs[imgAtual].src})`;
  imgAtual++;
}

function inimigos(){
  let posicaoIni = 0;

  const ini = document.createElement('div');
  ini.classList.add('inimigo');
  ini.style.width = "150px";
  ini.style.height = "150px";
  ini.style.background = "#f00";
  ini.style.position = "absolute";
  ini.style.bottom = "320px";
  ini.style.right = posicaoIni + "px";
  background.appendChild(ini);

  let movEsquerda = setInterval(()=>{
    if(posicaoIni > 1350){
      background.removeChild(ini);
    }else{
      posicaoIni += 10;
      ini.style.right = posicaoIni + "px";
    }
  }, 25);
}

function iniciar(){
  preCarregarImgs1();
  imgMax = imgs.length-1;
  let animar = setInterval(correr, 80);
  let criar = setInterval(inimigos, 4000);
}

window.addEventListener("load",iniciar);