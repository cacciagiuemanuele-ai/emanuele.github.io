const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const bearImg = document.getElementById("bear-img");
const question = document.getElementById("question");

let fontSize = 18;
const phrase = [
    "No",
    "Sei sicura?",
    "Ma proprio sicura sicura?",
    "Ti pregooo",
    "Dai dì di siiii",
    "Guarda che il sì è più bello",
    "🥺"
];
let phraseIndex = 0;
noBtn.addEventListener("click", () => {
    //Ingrandisci tasto Sì
    fontSize+=40;
    yesBtn.style.fontSize = fontSize + "px";
    yesBtn.style.padding = (fontSize/2) + "px " + fontSize + "px";
    //Cambia tasto No
    phraseIndex = (phraseIndex+1)%phrase.length;
    noBtn.innerText = phrase[phraseIndex];
});
yesBtn.addEventListener("click", () => {
    //Cambia testo e bottoni
    question.innerText = "Evvivaaaa!!💖💖";
    bearImg.src="bear-kiss-bear-kisses.gif";
    document.querySelector(".buttons").style.display = "none";

// 2. Lancia l'effetto cuoricini!
    const duration = 5 * 1000; // Dura 5 secondi
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Lancio da sinistra
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff0000', '#ff69b4', '#ff1493'], // Colori rosso e rosa
            shapes: ['heart'] // Questa libreria supporta le forme!
        });
        
        // Lancio da destra
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff0000', '#ff69b4', '#ff1493'],
            shapes: ['heart']
        });
    }, 250);
});
