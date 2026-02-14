let score = 0;
let timeLeft = 30; // Durée du jeu en secondes
let gameActive = false;
let gameInterval;
let heartInterval;
let glitchIntervals = [];

let gameMusic = null;

// Éléments DOM
const startScreen = document.getElementById('startScreen');
const gameContainer = document.getElementById('gameContainer');
const gameArea = document.getElementById('gameArea');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const endScreen = document.getElementById('endScreen');
const finalScoreElement = document.getElementById('finalScore');
const backgroundVideo = document.getElementById('backgroundVideo');

// Effets glitch
const glitchOverlay = document.getElementById('glitchOverlay');
const spinningEmoji = document.getElementById('spinningEmoji');
const screenFlash = document.getElementById('screenFlash');
const randomText = document.getElementById('randomText');
const zoomEffect = document.getElementById('zoomEffect');

// Textes randoms qui peuvent apparaître
const RANDOM_TEXTS = [
    '💕 BEBOU 💕',
    '😍 HIHIHIUHIULHUL 😍',
    '💖 ViER 💖',
    '💗 VAILLANT 💗',
    '✨ HFHGJGFJBKNNGBFJKLHGFHJKLHGFJKLHKGFJKLHGFJKLHKGJKNNHGB ✨',
    '💝 CRAPULE 💝',
    '😘 THERMOMIX 😘',
];

// Emojis qui peuvent tourner
const SPINNING_EMOJIS = ['💕', '😍', '💖', '🥰', '💗', '😘', '💝', '💓', '🔥', '✨'];

// Démarrer le jeu
function startGame() {
    // Cacher l'écran de démarrage
    if (!gameMusic) {
    gameMusic = new Audio('music/harry.mp3');
    gameMusic.currentTime = 46; 
    gameMusic.loop = true;
}
gameMusic.play();

    startScreen.style.display = 'none';
    gameContainer.classList.add('active');
    
    // Démarrer la vidéo
    if (backgroundVideo.duration) {
        // Si la durée est déjà connue, on peut directement définir un timestamp aléatoire
        const randomTime = Math.random() * backgroundVideo.duration;
        backgroundVideo.currentTime = randomTime;
    } else {
        // Sinon, attendre que les métadonnées soient chargées
        backgroundVideo.addEventListener('loadedmetadata', function() {
            const randomTime = Math.random() * backgroundVideo.duration;
            backgroundVideo.currentTime = randomTime;
        }, { once: true });
    }
    backgroundVideo.play();
    
    // Réinitialiser les variables
    score = 0;
    timeLeft = 30;
    gameActive = true;
    
    // Mettre à jour l'affichage
    updateScore();
    updateTimer();
    
    // Démarrer le timer
    gameInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    // Faire apparaître les cœurs
    spawnHeart();
    heartInterval = setInterval(spawnHeart, 500);
    
    // DÉMARRER LES EFFETS RANDOMS QUI DÉRANGENT
    startGlitchEffects();
}

// SYSTÈME D'EFFETS GLITCH RANDOMS
function startGlitchEffects() {
    // Effets à intervalles randoms
    const effects = [
        triggerGlitchOverlay,
        triggerSpinningEmoji,
        triggerScreenFlash,
        triggerRandomText,
        triggerZoomEffect,
        triggerScreenRotate,
        triggerColorInvert,
        triggerMultipleEffects
    ];
    
    // Planifier des effets randoms tout au long du jeu
    for (let i = 0; i < 8; i++) {
        const randomDelay = Math.random() * 25000 + 2000; // Entre 2s et 27s
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        
        const timeout = setTimeout(() => {
            if (gameActive) {
                randomEffect();
            }
        }, randomDelay);
        
        glitchIntervals.push(timeout);
    }
}

// Effet 1: Overlay glitch
function triggerGlitchOverlay() {
    glitchOverlay.classList.add('active');
    setTimeout(() => {
        glitchOverlay.classList.remove('active');
    }, 1000 + Math.random() * 1000); // Entre 1 et 2 secondes
}

// Effet 2: Emoji géant qui tourne
function triggerSpinningEmoji() {
    const emoji = SPINNING_EMOJIS[Math.floor(Math.random() * SPINNING_EMOJIS.length)];
    spinningEmoji.textContent = emoji;
    spinningEmoji.style.left = (Math.random() * 80 + 10) + '%';
    spinningEmoji.style.top = (Math.random() * 80 + 10) + '%';
    spinningEmoji.classList.add('active');
    
    setTimeout(() => {
        spinningEmoji.classList.remove('active');
    }, 2000);
}

// Effet 3: Flash d'écran blanc
function triggerScreenFlash() {
    screenFlash.classList.add('active');
    setTimeout(() => {
        screenFlash.classList.remove('active');
    }, 500);
}

// Effet 4: Texte random géant
function triggerRandomText() {
    const text = RANDOM_TEXTS[Math.floor(Math.random() * RANDOM_TEXTS.length)];
    randomText.textContent = text;
    randomText.style.left = '50%';
    randomText.style.top = (Math.random() * 60 + 20) + '%';
    randomText.classList.add('active');
    
    setTimeout(() => {
        randomText.classList.remove('active');
    }, 1500);
}

// Effet 5: Zoom fou
function triggerZoomEffect() {
    zoomEffect.classList.add('active');
    gameArea.style.transform = 'scale(1.5)';
    
    setTimeout(() => {
        zoomEffect.classList.remove('active');
        gameArea.style.transform = 'scale(1)';
    }, 1000);
}

// Effet 6: Rotation de l'écran
function triggerScreenRotate() {
    gameArea.classList.add('rotate');
    setTimeout(() => {
        gameArea.classList.remove('rotate');
    }, 2000);
}

// Effet 7: Inversion des couleurs
function triggerColorInvert() {
    gameArea.classList.add('invert');
    setTimeout(() => {
        gameArea.classList.remove('invert');
    }, 1500);
}

// Effet 8: Plusieurs effets en même temps (CHAOS TOTAL)
function triggerMultipleEffects() {
    triggerGlitchOverlay();
    setTimeout(() => triggerSpinningEmoji(), 200);
    setTimeout(() => triggerRandomText(), 400);
    setTimeout(() => triggerScreenFlash(), 600);
}

// Créer un cœur
function spawnHeart() {
    if (!gameActive) return;
    
    const heart = document.createElement('div');
    heart.className = 'heart-target';
    heart.textContent = ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)];
    
    // Position aléatoire (en évitant les bords)
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 200;
    const minY = 100;
    
    heart.style.left = Math.random() * maxX + 'px';
    heart.style.top = (Math.random() * (maxY - minY) + minY) + 'px';
    
    // Taille aléatoire
    const size = Math.random() * 30 + 50; // Entre 50px et 80px
    heart.style.fontSize = size + 'px';
    
    // Ajouter l'événement de clic
    heart.addEventListener('click', (e) => hitHeart(e, heart));
    
    gameArea.appendChild(heart);
    
    // Supprimer le cœur après un certain temps s'il n'est pas cliqué
    setTimeout(() => {
        if (heart.parentElement) {
            heart.remove();
        }
    }, 1500);
}

// Quand on clique sur un cœur
function hitHeart(e, heart) {
    if (!gameActive) return;
    
    // Augmenter le score
    score++;
    updateScore();
    
    // Effet de clic réussi
    const hitEffect = document.createElement('div');
    hitEffect.className = 'hit-effect';
    hitEffect.textContent = '+1 💕';
    hitEffect.style.left = e.pageX + 'px';
    hitEffect.style.top = e.pageY + 'px';
    gameArea.appendChild(hitEffect);
    
    setTimeout(() => hitEffect.remove(), 800);
    
    // Créer des particules
    createParticles(e.pageX, e.pageY);
    
    // Retirer le cœur
    heart.remove();
}

// Créer des particules de cœur
function createParticles(x, y) {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = '💖';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Direction aléatoire
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        gameArea.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Mettre à jour le score
function updateScore() {
    scoreElement.textContent = score;
}

// Mettre à jour le timer
function updateTimer() {
    timerElement.textContent = timeLeft;
    
    // Changer la couleur si le temps est presque écoulé
    if (timeLeft <= 10) {
        timerElement.style.color = '#ff1493';
    }
}

// Terminer le jeu
function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(heartInterval);
    
    // Arrêter tous les effets glitch planifiés
    glitchIntervals.forEach(timeout => clearTimeout(timeout));
    glitchIntervals = [];
    
    // Retirer tous les effets actifs
    glitchOverlay.classList.remove('active');
    spinningEmoji.classList.remove('active');
    screenFlash.classList.remove('active');
    randomText.classList.remove('active');
    zoomEffect.classList.remove('active');
    gameArea.classList.remove('rotate', 'invert');
    gameArea.style.transform = 'scale(1)';
    
    // Pause de la vidéo
    backgroundVideo.pause();
    
    // Retirer tous les cœurs restants
    const hearts = document.querySelectorAll('.heart-target');
    hearts.forEach(heart => heart.remove());
    
    // Retirer toutes les particules et effets
    const particles = document.querySelectorAll('.particle, .hit-effect');
    particles.forEach(particle => particle.remove());
    
    // Afficher le score final
    finalScoreElement.textContent = score;
    
    // Déterminer et afficher la récompense
    showReward();
    
    // Afficher l'écran de fin
    endScreen.classList.add('active');
}

// Système de récompenses basé sur le score
function showReward() {
    const rewardIcon = document.getElementById('rewardIcon');
    const rewardTitle = document.getElementById('rewardTitle');
    const rewardMessage = document.getElementById('rewardMessage');
    
    // Définir les paliers de récompenses
    if (score >= 30) {
        rewardIcon.textContent = '👑';
        GameProgress.completeGame('jeu_coeurs');//------------------------------------------------------------------------------------------
        rewardTitle.textContent = 'Pointeur Fou';
        rewardMessage.textContent = 'Tu cliques plus vite que ton ombre waww ';
    } else if (score >= 15) {
        rewardIcon.textContent = '💀';
        rewardTitle.textContent = 'SEmi-nul';
        rewardMessage.textContent = 'Fais 30 pour une super suprise de fou malade';
    } else {
        rewardIcon.textContent = '💀💀💀';
        rewardTitle.textContent = 'Nullos';
        rewardMessage.textContent = 'Tu es vraiment nul à chier tu pues wow chokbar de bz';
    }
}

// Rejouer
function restartGame() {
    // Réinitialiser l'affichage
    endScreen.classList.remove('active');
    timerElement.style.color = '#fff';
    
    // Redémarrer le jeu
    startGame();
}

// Retour à l'accueil
function goHome() {
    // Arrêter la vidéo si elle tourne encore
    backgroundVideo.pause();
    backgroundVideo.currentTime = 0;
    
    // Redirection vers la page d'accueil
    window.location.href = 'index.html';
}