const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const tamanho = 20;

let snake, direcao, comida, pontos, fase, velocidade, jogo;
let obstaculos = [];
let ranking = [];

function iniciar(){

    snake = [{x:200,y:200}];
    direcao = "right";
    comida = gerarComida();
    pontos = 0;
    fase = 1;
    velocidade = 200;
    obstaculos = [];

    atualizarPainel();

    clearInterval(jogo);
    jogo = setInterval(loop, velocidade);
}

function gerarComida(){
    return {
        x: Math.floor(Math.random()*20)*tamanho,
        y: Math.floor(Math.random()*20)*tamanho
    }
}

function desenhar(){
    ctx.clearRect(0,0,400,400);

    // comida
    ctx.fillStyle = "red";
    ctx.fillRect(comida.x, comida.y, tamanho, tamanho);

    // obstáculos
    ctx.fillStyle = "gray";
    obstaculos.forEach(o=>{
        ctx.fillRect(o.x, o.y, tamanho, tamanho);
    });

    // snake
    ctx.fillStyle = "lime";
    snake.forEach(s=>{
        ctx.fillRect(s.x, s.y, tamanho, tamanho);
    });
}

function mover(){
    let head = {...snake[0]};

    if(direcao==="right") head.x += tamanho;
    if(direcao==="left") head.x -= tamanho;
    if(direcao==="up") head.y -= tamanho;
    if(direcao==="down") head.y += tamanho;

    snake.unshift(head);

    if(head.x===comida.x && head.y===comida.y){
        pontos += 10;
        comida = gerarComida();

        // sobe fase a cada 50 pontos
        if(pontos % 50 === 0){
            fase++;
            velocidade -= 20;
            adicionarObstaculo();

            clearInterval(jogo);
            jogo = setInterval(loop, velocidade);
        }

    }else{
        snake.pop();
    }
}

function adicionarObstaculo(){
    obstaculos.push({
        x: Math.floor(Math.random()*20)*tamanho,
        y: Math.floor(Math.random()*20)*tamanho
    });
}

function colisao(){
    let head = snake[0];

    // parede
    if(head.x<0 || head.y<0 || head.x>=400 || head.y>=400){
        return true;
    }

    // corpo
    for(let i=1;i<snake.length;i++){
        if(head.x===snake[i].x && head.y===snake[i].y){
            return true;
        }
    }

    // obstáculos
    for(let o of obstaculos){
        if(head.x===o.x && head.y===o.y){
            return true;
        }
    }

    return false;
}

function gameOver(){
    alert("Game Over! Pontos: " + pontos);

    ranking.push(pontos);
    ranking.sort((a,b)=>b-a);

    atualizarRanking();

    clearInterval(jogo);
}

function atualizarPainel(){
    document.getElementById("pontos").innerText = pontos;
    document.getElementById("fase").innerText = fase;
}

function atualizarRanking(){
    let ul = document.getElementById("ranking");
    ul.innerHTML = "";

    ranking.slice(0,5).forEach(p=>{
        let li = document.createElement("li");
        li.innerText = p + " pts";
        ul.appendChild(li);
    });
}

function loop(){
    mover();

    if(colisao()){
        gameOver();
        return;
    }

    desenhar();
    atualizarPainel();
}

document.addEventListener("keydown",(e)=>{
    if(e.key==="ArrowRight" && direcao!=="left") direcao="right";
    if(e.key==="ArrowLeft" && direcao!=="right") direcao="left";
    if(e.key==="ArrowUp" && direcao!=="down") direcao="up";
    if(e.key==="ArrowDown" && direcao!=="up") direcao="down";
});
