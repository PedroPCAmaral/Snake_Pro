let score = 0;
let record = 0;
let level = 1;
let secretNumber = 0;

function updateUI() {
    document.getElementById("score").innerText = score;
    document.getElementById("record").innerText = record;
    document.getElementById("level").innerText = level;
}

function nextLevel() {
    level++;
    if (level > 10) {
        alert("🏁 Você zerou o jogo!");
        level = 1;
        if (score > record) record = score;
        score = 0;
    }
    updateUI();
}

function startGame(game) {

    let area = document.getElementById("gameArea");

    if (game === 1) {
        secretNumber = Math.floor(Math.random() * (10 + level)) + 1;

        area.innerHTML = `
            <h2>Adivinhe o número (1 até ${10 + level})</h2>
            <input type="number" id="guess">
            <button onclick="checkGuess()">Chutar</button>
            <p id="hint"></p>
        `;
    }

    if (game === 2) {
        area.innerHTML = `
            <h2>Pedra Papel Tesoura</h2>
            <button onclick="playRPS('pedra')">Pedra</button>
            <button onclick="playRPS('papel')">Papel</button>
            <button onclick="playRPS('tesoura')">Tesoura</button>
            <p id="result"></p>
        `;
    }

    if (game === 3) {
        area.innerHTML = `
            <h2>Tabuada</h2>
            <input type="number" id="num">
            <button onclick="showTable()">Mostrar</button>
            <pre id="table"></pre>
        `;
    }

    if (game === 4) {
        area.innerHTML = `
            <h2>Triângulo</h2>
            <input type="number" id="lines">
            <button onclick="drawTriangle()">Desenhar</button>
            <pre id="triangle"></pre>
        `;
    }

    if (game === 5) {
        area.innerHTML = `
            <h2>Soma da Série</h2>
            <input type="number" id="terms">
            <button onclick="calcSeries()">Calcular</button>
            <p id="series"></p>
        `;
    }
}

function checkGuess() {
    let guess = Number(document.getElementById("guess").value);
    let hint = document.getElementById("hint");

    if (guess === secretNumber) {
        score += 10 * level;
        hint.innerText = "🎉 Acertou!";
        nextLevel();
    } else if (guess > secretNumber) {
        hint.innerText = "🔽 Menor!";
    } else {
        hint.innerText = "🔼 Maior!";
    }
    updateUI();
}

function playRPS(user) {
    const options = ["pedra", "papel", "tesoura"];
    let cpu = options[Math.floor(Math.random() * 3)];
    let result = "";

    if (user === cpu) result = "Empate";
    else if (
        (user === "pedra" && cpu === "tesoura") ||
        (user === "papel" && cpu === "pedra") ||
        (user === "tesoura" && cpu === "papel")
    ) {
        result = "Você venceu!";
        score += 5 * level;
        nextLevel();
    } else {
        result = "Você perdeu!";
    }

    document.getElementById("result").innerText = `CPU: ${cpu} | ${result}`;
    updateUI();
}

function showTable() {
    let num = Number(document.getElementById("num").value);
    let out = "";

    for (let i = 1; i <= 10; i++) {
        out += `${num} x ${i} = ${num * i}\n`;
    }

    document.getElementById("table").innerText = out;
    score += 2 * level;
    nextLevel();
    updateUI();
}

function drawTriangle() {
    let lines = Number(document.getElementById("lines").value);
    let out = "";

    for (let i = 1; i <= lines; i++) {
        out += "*".repeat(i) + "\n";
    }

    document.getElementById("triangle").innerText = out;
    score += 2 * level;
    nextLevel();
    updateUI();
}

function calcSeries() {
    let terms = Number(document.getElementById("terms").value);
    let sum = 0;
    let num = "";
    let expr = "";

    for (let i = 1; i <= terms; i++) {
        num += "1";
        sum += Number(num);
        expr += num + (i < terms ? " + " : "");
    }

    document.getElementById("series").innerText =
        `${expr}\nA soma é: ${sum}`;

    score += 3 * level;
    nextLevel();
    updateUI();
}

updateUI();
