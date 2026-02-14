// ========================================
// SYSTÈME DE PROGRESSION DES MINI-JEUX
// ========================================

// Ce fichier doit être inclus dans TOUTES tes pages
// <script src="progress.js"></script>

// Objet pour gérer la progression
const GameProgress = {
    
    // Récupérer la progression sauvegardée
    getProgress: function() {
        const saved = localStorage.getItem('minigames_progress');
        if (saved) {
            return JSON.parse(saved);
        }
        // Progression par défaut
        return {
            test_compatibilite: false,  // Test de compatibilité (prénoms spéciaux)
            jeu_coeurs: false,          // Jeu attrape les cœurs (score >= 30)
            jeu_quiz: false,            // Quiz (score 10/10)
            supreme_unlocked: false     // Mini-jeu suprême débloqué
        };
    },
    
    // Sauvegarder la progression
    saveProgress: function(progress) {
        localStorage.setItem('minigames_progress', JSON.stringify(progress));
    },
    
    // Marquer un jeu comme complété
    completeGame: function(gameName) {
        const progress = this.getProgress();
        progress[gameName] = true;
        
        // Vérifier si tous les jeux sont complétés
        if (progress.test_compatibilite && progress.jeu_coeurs && progress.jeu_quiz) {
            progress.supreme_unlocked = true;
        }
        
        this.saveProgress(progress);
        return progress;
    },
    
    // Vérifier si un jeu est complété
    isGameCompleted: function(gameName) {
        const progress = this.getProgress();
        return progress[gameName] || false;
    },
    
    // Vérifier si le jeu suprême est débloqué
    isSupremeUnlocked: function() {
        const progress = this.getProgress();
        return progress.supreme_unlocked || false;
    },
    
    // Réinitialiser toute la progression (pour debug)
    reset: function() {
        localStorage.removeItem('minigames_progress');
    }
};

// ========================================
// EXEMPLES D'UTILISATION
// ========================================

/*

1. DANS TON TEST DE COMPATIBILITÉ (test.html) :
   Quand le joueur termine avec succès, ajoute ceci :

   function showSpecialResult(name1, name2, percentage) {
       // ... ton code existant ...
       
       // À la fin de la fonction, marquer le jeu comme complété
       GameProgress.completeGame('test_compatibilite');
   }


2. DANS TON JEU DE CŒURS (aim.html) :
   Quand le joueur atteint un score minimum, ajoute ceci :

   function endGame() {
       // ... ton code existant ...
       
       // Si le score est suffisant, marquer comme complété
       if (score >= 20) {  // Par exemple, score minimum de 20
           GameProgress.completeGame('jeu_coeurs');
       }
   }


3. DANS TON 3ÈME MINI-JEU :
   Pareil, quand complété :

   GameProgress.completeGame('jeu_3');


4. DANS TA PAGE D'ACCUEIL (index.html) :
   Afficher ou cacher le lien du jeu suprême :

   window.addEventListener('DOMContentLoaded', function() {
       const supremeButton = document.getElementById('supremeGameButton');
       
       if (GameProgress.isSupremeUnlocked()) {
           supremeButton.style.display = 'block';
           supremeButton.classList.add('unlocked');
       } else {
           supremeButton.style.display = 'none';
       }
       
       // Optionnel : afficher la progression
       const progress = GameProgress.getProgress();
       console.log('Jeux complétés:', progress);
   });


5. AFFICHER DES BADGES/CHECKMARKS :
   
   window.addEventListener('DOMContentLoaded', function() {
       // Pour chaque jeu, afficher un badge si complété
       if (GameProgress.isGameCompleted('test_compatibilite')) {
           document.getElementById('badge-test').textContent = '✅';
       }
       if (GameProgress.isGameCompleted('jeu_coeurs')) {
           document.getElementById('badge-aim').textContent = '✅';
       }
       if (GameProgress.isGameCompleted('jeu_3')) {
           document.getElementById('badge-jeu3').textContent = '✅';
       }
   });


6. POUR DÉBUGGER / RÉINITIALISER :
   Dans la console du navigateur, tu peux taper :
   
   GameProgress.reset();  // Réinitialiser toute la progression
   GameProgress.getProgress();  // Voir la progression actuelle

*/