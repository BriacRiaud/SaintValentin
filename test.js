 const btn = document.getElementById('musicBtn');
        const audio = document.getElementById('monAudio');
        let isPlaying = false;

        btn.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                btn.textContent = '🔇';
                btn.classList.remove('playing');
            } else {
                audio.play();
                btn.textContent = '🔊';
                btn.classList.add('playing');
            }
            isPlaying = !isPlaying;
        });

// Créer les étoiles
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
}

// Messages de chargement
const loadingMessages = [
    "Analyse des prénoms...",
    "Consultation des étoiles...",
    "Calcul des vibration...",
    "Mélange des énergies...",
    "Lecture du destin...",
    "Finalisation de l'analyse..."
];

// PRÉNOMS SPÉCIAUX - à personnaliser selon tes besoins !
const SPECIAL_COUPLES = [
    { name1: 'briac', name2: 'joeline' },
    { name1: 'briac', name2: 'joéline'  },
    { name1: 'a', name2: 'z'  },
    // Ajoute ici tes prénoms spéciaux
];

// URL de l'image à afficher à la fin (tu devras mettre ton image)
const FINAL_IMAGE_URL = 'images/jostonks.jpg';

let currentMessageIndex = 0;

function startCalculation() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();

    // Validation
    if (!name1 || !name2) {
        alert('⚠️ Veuillez entrer les deux prénoms !');
        return;
    }

    if (name1.toLowerCase() === name2.toLowerCase()) {
        alert('😅 Entre deux prénoms différents !');
        return;
    }

    // Vérifier si c'est un couple spécial
    const isSpecial = checkSpecialCouple(name1, name2);

    // Cacher le formulaire
    document.getElementById('formSection').classList.add('hidden');
    
    // Afficher le chargement
    const loadingSection = document.getElementById('loadingSection');
    loadingSection.classList.add('active');

    // Afficher les messages de chargement
    currentMessageIndex = 0;
    showLoadingMessage();
    const messageInterval = setInterval(() => {
        currentMessageIndex++;
        if (currentMessageIndex < loadingMessages.length) {
            showLoadingMessage();
        }
    }, 600);

    // Calculer le pourcentage
    let percentage;
    if (isSpecial) {
        // Pour les couples spéciaux : nombre énorme aléatoire
        percentage = Math.floor(Math.random() * 50000) + 20000; // Entre 20000 et 70000%
    } else {
        // Pour les autres : nombre normal entre 0 et 100
        percentage = Math.floor(Math.random() * 101); // Entre 0 et 100
    }

    // Attendre puis afficher le résultat
    setTimeout(() => {
        clearInterval(messageInterval);
        if (isSpecial) {
            showSpecialResult(name1, name2, percentage);
        } else {
            showResult(name1, name2, percentage);
        }
    }, 4000);
}

function checkSpecialCouple(name1, name2) {
    const n1 = name1.toLowerCase();
    const n2 = name2.toLowerCase();
    
    return SPECIAL_COUPLES.some(couple => 
        (couple.name1 === n1 && couple.name2 === n2) ||
        (couple.name1 === n2 && couple.name2 === n1)
    );
}

function showLoadingMessage() {
    const messagesElement = document.getElementById('calculatingMessages');
    messagesElement.style.opacity = '0';
    setTimeout(() => {
        messagesElement.textContent = loadingMessages[currentMessageIndex];
        messagesElement.style.opacity = '1';
    }, 100);
}

// RÉSULTAT NORMAL
function showResult(name1, name2, percentage) {
    // Cacher le chargement
    document.getElementById('loadingSection').classList.remove('active');

    // Afficher les prénoms
    document.getElementById('displayName1').textContent = name1;
    document.getElementById('displayName2').textContent = name2;

    // Afficher la section résultat
    const resultSection = document.getElementById('resultSection');
    resultSection.classList.add('active');

    // Animer la barre de progression
    setTimeout(() => {
        const progressBar = document.getElementById('progressBar');
        const progressPercentage = document.getElementById('progressPercentage');
        const percentageDisplay = document.getElementById('percentageDisplay');
        
        progressBar.style.width = percentage + '%';
        
        // Animer le compteur
        let current = 0;
        const increment = percentage / 50;
        const counterInterval = setInterval(() => {
            current += increment;
            if (current >= percentage) {
                current = percentage;
                clearInterval(counterInterval);
            }
            const displayValue = Math.round(current);
            progressPercentage.textContent = displayValue + '%';
            percentageDisplay.textContent = displayValue + '%';
        }, 40);

    }, 100);

    // Afficher le message
    setTimeout(() => {
        showResultMessage(percentage);
    }, 2500);
}

// RÉSULTAT SPÉCIAL AVEC ANIMATIONS FOLLES
function showSpecialResult(name1, name2, percentage) {
    // Cacher le chargement
    document.getElementById('loadingSection').classList.remove('active');

    // Afficher les prénoms
    document.getElementById('displayName1').textContent = name1;
    document.getElementById('displayName2').textContent = name2;

    // Afficher la section résultat
    const resultSection = document.getElementById('resultSection');
    resultSection.classList.add('active');

    // Shake de l'écran
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);

    // ANIMATION DE LA BARRE QUI DEVIENT FOLLE
    setTimeout(() => {
        const progressBar = document.getElementById('progressBar');
        const progressPercentage = document.getElementById('progressPercentage');
        const percentageDisplay = document.getElementById('percentageDisplay');
        
        progressBar.classList.add('extreme');
        percentageDisplay.classList.add('extreme');
        
        // Animation du nombre qui monte comme un fou
        let current = 0;
        const increment = percentage / 60;
        const counterInterval = setInterval(() => {
            current += increment;
            if (current >= percentage) {
                current = percentage;
                clearInterval(counterInterval);
                
                // Démarrer les animations folles après que le nombre soit affiché
                setTimeout(() => {
                    startCrazyAnimations();
                }, 500);
            }
            const displayValue = Math.round(current);
            progressPercentage.textContent = displayValue + '%';
            percentageDisplay.textContent = displayValue + '%';
        }, 30);

    }, 100);

    // Message spécial
    setTimeout(() => {
        const resultIcon = document.getElementById('resultIcon');
        const resultMessage = document.getElementById('resultMessage');
        
        resultIcon.textContent = '💖✨🌟💕🔥👑💝🎆';
        resultMessage.innerHTML = '<strong>🚨 AMOUR LÉGENDAIRE DÉTECTÉ 🚨</strong><br>LES COMPTEURS ONT EXPLOSÉ ! Votre amour dépasse toutes les limites connues de l\'univers ! 🌌💫';
    }, 2500);
}

// ANIMATIONS FOLLES
function startCrazyAnimations() {
    const specialAnimation = document.getElementById('specialAnimation');
    specialAnimation.classList.add('active');
    GameProgress.completeGame('test_compatibilite'); //---------------------------------------------------------------------------------------------------------------------------------
    
    // 1. EXPLOSION DE CŒURS
    createHeartExplosion();
    
    // 2. EMOJIS VOLANTS
    setTimeout(() => {
        createFlyingEmojis();
    }, 500);
    
    // 3. TEXTE ARC-EN-CIEL
    setTimeout(() => {
        const rainbowText = document.getElementById('rainbowText');
        rainbowText.classList.add('active');
    }, 1500);
    
    // 4. PLUS D'EXPLOSIONS
    setTimeout(() => {
        createHeartExplosion();
    }, 2000);
    
    // 5. ENCORE PLUS D'EMOJIS
    setTimeout(() => {
        createFlyingEmojis();
    }, 2500);
    
    // 6. SHAKE SUPPLÉMENTAIRE
    setTimeout(() => {
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 500);
    }, 3000);
    
    // 7. IMAGE FINALE
    setTimeout(() => {
        showFinalImage();
    }, 4000);
}

function createHeartExplosion() {
    const container = document.getElementById('explosionHearts');
    const emojis = ['💖', '💕', '💗', '💝', '💘', '💓', '💞', '❤️', '🧡', '💛', '💚', '💙', '💜'];
    
    for (let i = 0; i < 100; i++) {
        const heart = document.createElement('div');
        heart.className = 'explosion-heart';
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        const angle = (Math.PI * 2 * i) / 30;
        const distance = 300 + Math.random() * 200;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

function createFlyingEmojis() {
    const container = document.getElementById('flyingEmojis');
    const emojis = ['💖', '✨', '🌟', '💫', '⭐', '🎆', '🎇', '💝', '🔥', '👑', '💕', '💗'];
    
    for (let i = 0; i < 15; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'flying-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.top = Math.random() * 100 + '%';
        emoji.style.animationDelay = Math.random() * 2 + 's';
        emoji.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        container.appendChild(emoji);
        
        setTimeout(() => {
            emoji.remove();
        }, 5000);
    }
}

function showFinalImage() {
    const container = document.getElementById('finalImageContainer');
    const img = document.getElementById('finalImage');
    
    img.src = FINAL_IMAGE_URL;
    container.classList.add('active');
    
    // Shake final !
    setTimeout(() => {
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 500);
    }, 500);
}

function showResultMessage(percentage) {
    const resultIcon = document.getElementById('resultIcon');
    const resultMessage = document.getElementById('resultMessage');

    if (percentage >= 90) {
        resultIcon.textContent = '💖✨👑';
        resultMessage.innerHTML = 'pas loin du 100% mais guezzzzzzzzz';
    } else if (percentage >= 80) {
        resultIcon.textContent = '💕🔥💫';
        resultMessage.innerHTML = 'toujours moins bien que bien ah oui hein oui';
    } else if (percentage >= 70) {
        resultIcon.textContent = '💗💖💓';
        resultMessage.innerHTML = 'pas mal mais guez quand même';
    } else if (percentage >= 60) {
        resultIcon.textContent = '☠️';
        resultMessage.innerHTML = 'pas ouf ';
    } else if (percentage >= 40) {
        resultIcon.textContent = '☠️☠️☠️';
        resultMessage.innerHTML = 'ah non hein';
    } else if (percentage >= 20) {
        resultIcon.textContent = '☠️☠️☠️☠️☠️☠️☠️☠️';
        resultMessage.innerHTML = 'déchet';
    } else {
        resultIcon.textContent = '☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️';
        resultMessage.innerHTML = 'Merde humaine';
    }
}

function resetTest() {
    // Réinitialiser les champs
    document.getElementById('name1').value = '';
    document.getElementById('name2').value = '';

    // Réinitialiser l'affichage
    document.getElementById('formSection').classList.remove('hidden');
    document.getElementById('loadingSection').classList.remove('active');
    document.getElementById('resultSection').classList.remove('active');
    document.getElementById('specialAnimation').classList.remove('active');
    document.getElementById('rainbowText').classList.remove('active');
    document.getElementById('finalImageContainer').classList.remove('active');

    // Reset les classes
    document.getElementById('progressBar').classList.remove('extreme');
    document.getElementById('percentageDisplay').classList.remove('extreme');
    
    // Reset la barre
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('progressBar').style.transform = '';
    
    // Vider les containers d'animation
    document.getElementById('explosionHearts').innerHTML = '';
    document.getElementById('flyingEmojis').innerHTML = '';
}

function goHome() {
    window.location.href = 'index.html';
}

// Permettre la soumission avec Enter
document.getElementById('name1').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('name2').focus();
    }
});

document.getElementById('name2').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        startCalculation();
    }
});