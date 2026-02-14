// Éléments DOM
const mysteryScreen = document.getElementById('mysteryScreen');
const lockContainer = document.getElementById('lockContainer');
const lockIcon = document.getElementById('lockIcon');
const revealScreen = document.getElementById('revealScreen');
const messageContainer = document.getElementById('messageContainer');
const typewriterText = document.getElementById('typewriterText');
const celebrationMusic = document.getElementById('celebrationMusic');

// État du déverrouillage
let isUnlocked = false;

// TON MESSAGE ICI - Personnalise-le !
const message = "Bravo Joéline, tu mérites clairement d'être ma femme, je t'ai fais un petit cadeau que tu vas adorer de fou";

// Clic sur le cadenas
lockContainer.addEventListener('click', unlockSecret);

function unlockSecret() {
    if (isUnlocked) return;
    isUnlocked = true;
    
    // 1. ANIMATION DU CADENAS
    lockIcon.classList.add('unlocking');
    
    // 2. LANCER LA MUSIQUE AVEC UN DÉLAI DE 3 SECONDES
    setTimeout(() => {
        celebrationMusic.play().catch(error => {
            console.log('Autoplay bloqué, la musique se lancera quand même');
            // Essayer de relancer après une interaction utilisateur
            setTimeout(() => {
                celebrationMusic.play().catch(err => {
                    console.log('Impossible de lancer la musique automatiquement');
                });
            }, 100);
        });
    }, 2400); // 3000ms = 3 secondes de délai
    
    // 3. FAIRE DISPARAÎTRE L'ÉCRAN MYSTÈRE
    setTimeout(() => {
        mysteryScreen.classList.add('fade-out');
    }, 1500);
    
    // 4. AFFICHER L'ÉCRAN DE RÉVÉLATION
    setTimeout(() => {
        mysteryScreen.classList.add('hidden');
        revealScreen.classList.remove('hidden');
        revealScreen.classList.add('active');
    }, 2500);
    
    // 5. FAIRE APPARAÎTRE LE CONTAINER DU MESSAGE
    setTimeout(() => {
        messageContainer.classList.add('show');
    }, 2500);
    
    // 6. LANCER L'ANIMATION D'ÉCRITURE DU MESSAGE
    setTimeout(() => {
        startTypewriter();
    }, 4000);
}

// Fonction typewriter (comme dans ta page principale)
function startTypewriter() {
    let i = 0;
    
    function typeWriter() {
        if (i < message.length) {
            typewriterText.textContent += message.charAt(i);
            i++;
            setTimeout(typeWriter, 200); // Vitesse d'écriture (100ms par lettre)
        }
    }
    
    typeWriter();
}

// Retour à l'accueil
function goHome() {
    // Arrêter la musique
    celebrationMusic.pause();
    celebrationMusic.currentTime = 0;
    
    // Rediriger
    window.location.href = 'index.html';
}

// Gestion du volume (optionnel - pour ne pas être trop fort)
celebrationMusic.volume = 0.7;

// Créer des particules scintillantes sur l'écran mystère
function createMysteryParticles() {
    const mysteryBg = document.querySelector('.mystery-background');
    
    setInterval(() => {
        if (isUnlocked) return;
        
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(255, 215, 0, 0.8);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFade 3s ease-out forwards;
            pointer-events: none;
        `;
        
        mysteryBg.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }, 500);
}

// Ajouter l'animation CSS pour les particules
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFade {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-50px);
        }
    }
`;
document.head.appendChild(style);

// Lancer les particules
createMysteryParticles();