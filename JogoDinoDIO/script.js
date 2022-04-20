//variaveis de controle e de seleção de objetos
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

//detecta tecla presionada no teclado para iniciar o jogo
function handKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

//funcao de pulo e controle de pulo e descida
function jump(){
    isJumping = true;

    //funcao para o pulo do elemento
    let upInterval = setInterval(() => {
        if(position >= 200){
            clearInterval(upInterval);

            //funcao para a descida do elemento
            let dowInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(dowInterval);
                    isJumping = false;
                }else{
                    position -= 30;
                    dino.style.bottom = position + 'px';
                }
            }, 30);
        }else{
            //subindo
            position += 40;
            dino.style.bottom = position + 'px';
        }
        
    }, 30);
}

//criar os cactos
function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);
    let randomTime = Math.random() * 6000;

    //intervalo entre as gerações dos cactos
    let leftInteval = setInterval(() => {
        if(cactusPosition < -60){
            clearInterval(leftInteval);
            background.removeChild(cactus);
        }else if(cactusPosition > 0 &&cactusPosition < 60 && position < 60){

            clearInterval(leftInteval);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    //espelhando a funcao nela mesma
    setTimeout(createCactus, randomTime);
}

//chama as funcoes para o inicio do jogo
createCactus();
document.addEventListener('keyup', handKeyUp);