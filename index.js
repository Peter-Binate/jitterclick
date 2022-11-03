let score;
let gameDuration = 10; //Temps de jeu en seconde
let startTime; //En milliSecondes
let ended = true;

//Elements html
let pseudoText = document.getElementById("pseudo");
let timerText = document.getElementById("timer");
let scoreText =document.getElementById("score");
let clicksText =document.getElementById("clicks");
let startBtn =document.getElementById("start");
let clickArea =document.getElementById("click-area");

let pseudo = prompt("Insérez votre pseudo:");
pseudoText.innerHTML = pseudo;

let show = function(element) {
    element.style.display = 'inline';
}
let hide = function(element) {
    element.style.display = 'none';
}

// Lancement du jeu
function startGame() {
    //On cache le bouton start
    hide(startBtn);
    score = -1;
    ended = false;
    startTime = new Date().getTime();

    //Création du timer avec la fonction setInterval
    let timerId = setInterval(function() {
        let total = (new Date().getTime() - startTime) / 1000;

        // Tant que total est inférieur à gameDuration on update timer + clicks/s
        if (total < gameDuration) {
            timerText.textContent = total.toFixed(3);
            clicksText.textContent = (score / total).toFixed(2);
        } else{
            ended = true;
            clearInterval(timerId);
            endGame();
        }
    }, 1);
}

function endGame() {
    // On affiche le score final
    let clickBySec = (score / gameDuration).toFixed(2);
    timerText.textContent = gameDuration.toFixed(2);
    clicksText.textContent = clickBySec;

    // On affiche le bouton start si le joueur veut rejouer
    show(startBtn);

    // on affiche un message à l'user dans 10ms pour update le DOM
    setTimeout(function(){
        alert('Vous avez fait: ' + score + ' cliques en ' + gameDuration + ' secondes. C\'est ' + clickBySec + ' cliques par secondes. Essayez encore!');
    }, 10);
}

// on lie la fonction startGame avec le bouton 
startBtn.addEventListener("click", function (event) {
    startGame();
});

//on update le score du joueur pendant qu'il clique
clickArea.addEventListener("click", function(event) {
    if (!ended) {
        score++;
        scoreText.textContent = score;// update du score
    }
});