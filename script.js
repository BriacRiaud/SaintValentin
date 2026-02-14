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

const text = "Joéline..... j'ai créé quelque chose juste pour toi...";
const typewriterElement = document.getElementById('text');
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typewriterElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Démarrer l'animation après un petit délai
setTimeout(typeWriter, 500);

const music = document.getElementById("music");

document.addEventListener("click", () => {
  music.play();
}, { once: true });

// Créer les étoiles
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
}

// Créer les coeurs flottants
const heartsContainer = document.getElementById('floatingHearts');
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = ['❤️', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

setInterval(createHeart, 500);

// Compteur de temps (à personnaliser avec votre date)
function updateTimeCounter() {
    // CHANGEZ CETTE DATE pour la date où vous vous êtes rencontrés
    const startDate = new Date('2024-02-29'); // Format: YYYY-MM-DD
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    
    let displayText = '';
    if (diffMonths > 0) {
        displayText = `${diffMonths} mois, ${diffDays % 30} jours`;
    } else {
        displayText = `${diffDays} jours`;
    }
    
    document.getElementById('timeCounter').textContent = displayText;
}

updateTimeCounter();
setInterval(updateTimeCounter, 86400000); // Update every day

// Navigation vers les autres pages
function goToPage(page) {
    // Décommentez cette ligne quand vos pages seront créées
    // window.location.href = page;
    
    // Pour l'instant, affiche une alerte
    alert(`Cette page (${page}) n'est pas encore créée. Remplacez cette alerte par: window.location.href = '${page}';`);
}

// ==========================================
// SYSTÈME DE PROGRESSION DES MINI-JEUX
// ==========================================

window.addEventListener('DOMContentLoaded', function() {
    // Vérifier si GameProgress existe (si progress.js est chargé)
    if (typeof GameProgress !== 'undefined') {
        updateMinigamesProgress();
    }
});

function updateMinigamesProgress() {
    const progress = GameProgress.getProgress();
    
    // Mettre à jour les badges des mini-jeux
    if (progress.test_compatibilite) {
        document.getElementById('badge-test').textContent = '✅';
        document.getElementById('badge-test').classList.add('completed');
        document.getElementById('status-test').textContent = '✅';
        document.getElementById('progress-test').classList.add('completed');
    }
    
    if (progress.jeu_coeurs) {
        document.getElementById('badge-aim').textContent = '✅';
        document.getElementById('badge-aim').classList.add('completed');
        document.getElementById('status-aim').textContent = '✅';
        document.getElementById('progress-aim').classList.add('completed');
    }
    
    if (progress.jeu_quiz) {
        document.getElementById('badge-quiz').textContent = '✅';
        document.getElementById('badge-quiz').classList.add('completed');
        document.getElementById('status-quiz').textContent = '✅';
        document.getElementById('progress-quiz').classList.add('completed');
    }
    
    // Vérifier si le jeu suprême est débloqué
    if (GameProgress.isSupremeUnlocked()) {
        unlockSecretGame();
    }
}

function unlockSecretGame() {
    const secretLocked = document.getElementById('secretLocked');
    const secretUnlocked = document.getElementById('secretUnlocked');
    const secretGameCard = document.getElementById('secretGameCard');
    
    // Cacher la version verrouillée
    secretLocked.classList.add('hidden');
    
    // Afficher la version débloquée avec animation
    secretUnlocked.classList.remove('hidden');
    secretGameCard.classList.add('unlocked');
    
    // Animation de célébration
    createCelebrationEffect();
}

function createCelebrationEffect() {
    const secretSection = document.getElementById('secretGameSection');
    
    // Créer des confettis/cœurs qui explosent
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'celebration-heart';
        confetti.textContent = ['💖', '✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 5)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.fontSize = (Math.random() * 20 + 20) + 'px';
        
        const angle = (Math.PI * 2 * i) / 50;
        const distance = 200 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        confetti.style.setProperty('--tx', tx + 'px');
        confetti.style.setProperty('--ty', ty + 'px');
        
        secretSection.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}