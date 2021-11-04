const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

let gameNivel = 25; // nivel inicial de velocidade dos cactus
let controleNivel = 0; // controle dos niveis

// verificando o valor recebido pelo dispositivo de entrada
function handleKeyUp(event) {
    if (event.keyCode === 32){
        if(!isJumping) {
            jump();
        }
    }
}

function jump() {
    
    isJumping = true;
    
    let upInterval = setInterval(() => {
        if (position >= 150){ // definindo um limite de altura para o salto
            clearInterval(upInterval);
            
            // Descendo
            let downInterval = setInterval(() => {
                if(position <= 0){ // verificando um limite para a base do dino
                    clearInterval(downInterval);
                    isJumping = false;              
                } else {
                    // reduzindo a altura do pulo até chegar em 0
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 30); // velocidade de descida
            
        } else {
            // Subindo
            // aumentando a altura do pulo até o limite definido na condicional anterior
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20); // velocidade de subida
}

function createCactus() {
    const cactus = document.createElement('div'); // criando uma div no html
    let cactusPosition = 1150; // controle de posicionamento
    let randomTime = Math.random() * 3000; // definindo um intervalo de tempo para criação de um cactus
    
    cactus.classList.add('cactus'); // adicionando uma classe cactus ao elemento definido na const cactus
    cactus.style.left = 1150 + 'px'; // definindo o posicionamento de exibição do elemento na tela
    background.appendChild(cactus); // inserindo dentro da <div class='cactus'> na <div class='background'>

    
    let leftInterval = setInterval(() => { // definindo um intervalo de movimento dos cactus
        
        if(cactusPosition < 0) { // removendo o cactus, caso ele passe do limite definido
            controleNivel++;
            clearInterval(leftInterval);
            background.removeChild(cactus);
            if(controleNivel === 5 && gameNivel > 5){ // condição para aumentar o nivel do game
                gameNivel -= 5;
                controleNivel = 0;
            }
            console.log(gameNivel, controleNivel);
        } else if(cactusPosition > 155 && cactusPosition < 205 && position < 60){
            // condição para conferir se é game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class = "game-over">Fim de jogo</h1>';
        } else {
            // Define o movimento dos cactus
            cactusPosition -= 8;
            cactus.style.left = cactusPosition + 'px';
        }
    }, gameNivel);
    

    // condição para evitar que apareçam cactus muito próximos uns aos outros
    if(controleNivel === 4){
        setTimeout(createCactus, 3000);
    } else if(randomTime >= 750) {
        setTimeout(createCactus, randomTime);
    } else {
        setTimeout(createCactus, 750);
    }
}

// chamando a função
createCactus();
// recebendo o evento keyup e passando para a função
document.addEventListener('keyup', handleKeyUp);