const correctWord = 'APPLE';  // Palavra correta do jogo
let currentRow = 0;  // Linha atual de tentativa
let currentGuess = '';  // Chute atual do jogador
const maxAttempts = 6;  // Máximo de tentativas permitidas
let gameActive = true;

// Captura as teclas do teclado físico
document.addEventListener('keydown', function(event) {
    const letter = event.key; // Converte a tecla para maiúscula

    // Filtra as teclas válidas (letras de A a Z, Enter e Backspace)
    if (letter === 'Enter' && gameActive) {
        handleKeyPress('Enter');

    }else if(letter ==='Backspace' && gameActive){
        handleKeyPress('Backspace');


    
    }else if(/^[a-zA-Z]$/.test(letter) && gameActive){
        handleKeyPress(letter.toUpperCase());
    
    }

});

// Função para processar a entrada de teclas
function handleKeyPress(letter) {
    if (letter === 'Enter' && currentGuess.length === 5) {
        checkGuess();
    } else if (currentGuess.length < 5 && /^[A-Z]$/.test(letter)) {
        currentGuess += letter;
        updateGrid();

    } else if(letter === 'Backspace' && currentGuess.length>0){
    currentGuess = currentGuess.slice(0,-1);
        updateGrid();

    }
}

// Atualiza a grade com a tentativa atual
function updateGrid() {
    const row = document.querySelectorAll('.row')[currentRow];
    const letters = row.querySelectorAll('.letter');

    // Limpa os campos da linha atual
    letters.forEach(letterBox => letterBox.value = '');

    for (let i = 0; i < currentGuess.length; i++) {
        letters[i].value = currentGuess[i];
    }
}

// Verifica se o chute está correto
function checkGuess() {
    const row = document.querySelectorAll('.row')[currentRow];
    const letters = row.querySelectorAll('.letter');

    for (let i = 0; i < 5; i++) {
        const letter = currentGuess[i];

        if (letter === correctWord[i]) {
            letters[i].classList.add('correct');
        } else if (correctWord.includes(letter)) {
            letters[i].classList.add('wrong-position');
        } else {
            letters[i].classList.add('wrong');
        }
    }

    if (currentGuess === correctWord) {
        alert("Parabéns! Você acertou a palavra!");
        gameActive=false;
        button.disabled = true;
    } else if (currentRow === maxAttempts - 1) {
        alert("Você esgotou suas tentativas! A palavra correta era: " + correctWord);
    }

    currentRow++;
    currentGuess = '';
    if (currentRow >= maxAttempts) {
        document.querySelectorAll('.key').forEach(button => {
            button.disabled = true;
        });
    }
}

    // Adiciona eventos ao teclado virtual
    document.querySelectorAll('.key').forEach(button => {
        button.addEventListener('click', () => {
            const letter = button.textContent;
            handleKeyPress(letter);
        });
    });

    // Captura o botão de reiniciar e adiciona o evento de clique
document.getElementById('restart-button').addEventListener('click', resetGame);

function resetGame() {
    // Reinicia as variáveis do jogo
    currentRow = 0;
    currentGuess = '';
    gameActive = true;

    // Limpa as classes das teclas do teclado virtual
    document.querySelectorAll('.key').forEach(button => {
        button.classList.remove('used', 'correct');
        button.disabled = false;  // Habilita todas as teclas novamente
    });

    // Limpa as letras e as classes da grid
    document.querySelectorAll('.letter').forEach(letterBox => {
        letterBox.value = '';
        letterBox.classList.remove('correct', 'wrong', 'wrong-position');
    });

    // Habilita o jogo e permite novas tentativas
    alert('O jogo foi reiniciado! Boa sorte!');
}

