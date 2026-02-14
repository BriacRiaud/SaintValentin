// ==========================================
        // BASE DE DONNÉES DES QUESTIONS (JSON)
        // ==========================================
        // Pour ajouter une question, copiez-collez l'objet et modifiez les valeurs
        // correctAnswer : index de la bonne réponse (0, 1, 2 ou 3)
        // answers : chemins vers vos images (mettez vos images dans le même dossier ou un sous-dossier)
        
        const questionsDatabase = [
            {
                question: "Quelle est mon chanteur préféré?",
                answers: [
                    "images/gims.jpeg", 
                    "images/jacksons.jpg",
                    "images/thermomix.jpg",
                    "images/wejdene.jpg"
                ],
                correctAnswer: 2 
            },
            {
                question: "Qu'est ce qui m'a le plus marqué au premier rendez-vous?",
                answers: [
                    "images/29.jpg",
                    "images/palmier.jpg",
                    "images/payer-restau.avif",
                    "images/tinder.jpg"
                ],
                correctAnswer: 1
            },
            {
                question: "D'après toi, je suis dans quel maison d'harry potter? ",
                answers: [
                    "images/serpentard.webp",
                    "images/poufsouffle.jpeg",
                    "images/serdaigle.jpeg",
                    "images/griffondor.jpeg"
                ],
                correctAnswer: 3
            },
            {
                question: "Qui est le goat de breaking bad/better call saul d'après moi?",
                answers: [
                    "images/walter.png",
                    "images/lalo.webp",
                    "images/jessie.jpg",
                    "images/saul.jpg"
                ],
                correctAnswer: 0
            },
            {
                question: "Quel est la voiture de mes rêves?",
                answers: [
                    "images/voiture1.jpg",
                    "images/voiture3.jpg",
                    "images/voiture2.jpg",
                    "images/spark.png"
                ],
                correctAnswer: 3
            },
            {
                question: "Qui est mon joueur de fléchettes préférée?",
                answers: [
                    "images/chauve.jpg",
                    "images/stephen.webp",
                    "images/obese.webp",
                    "images/littler.jpg"
                ],
                correctAnswer: 1,
                specialMusic: true  // Marqueur pour cette question spéciale
            },
            {
                question: "C'est qui mon brainrot préféré?",
                answers: [
                    "images/tralala.jpg",
                    "images/tung.webp",
                    "images/brr.jpeg",
                    "images/chimp.jpg"
                ],
                correctAnswer: 2
            },
            {
                question: "Quand j'étais petit, je voulais être:",
                answers: [
                    "images/golf.jpg",
                    "images/train.webp",
                    "images/chat.jpg",
                    "images/grutier.webp"
                ],
                correctAnswer: 0
            },
            {
                question: "C'est quel skin de gnar que j'utilise tout le temps?",
                answers: [
                    "images/gnar2.jpg",
                    "images/gnar3.webp",
                    "images/gnar4.jpg",
                    "images/gnar1.webp"
                ],
                correctAnswer: 3
            },
            {
                question: "Quel est la meilleure plage de loinnnnn?",
                answers: [
                    "images/plage1.webp",
                    "images/plage 2.webp",
                    "images/frejus.jpg",
                    "images/plage3.jpeg"
                ],
                correctAnswer: 2
            }
        ];

        // ==========================================
        // VARIABLES DU JEU
        // ==========================================
        let selectedQuestions = [];
        let currentQuestionIndex = 0;
        let score = 0;
        let canAnswer = true;

        // Variables pour la musique
        let mainMusic = null;
        let dartsMusic = null;
        let currentMusic = null;

        // ==========================================
        // FONCTIONS DU JEU
        // ==========================================

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

        // Initialiser les musiques
        function initMusic() {
            // Musique principale du quiz
            mainMusic = new Audio('music/up.mp3');
            mainMusic.loop = true;
            
            // Musique pour la question des fléchettes
            dartsMusic = new Audio('music/titanium.mp3');
            dartsMusic.loop = true;
            
            currentMusic = mainMusic;
        }

        // Changer de musique
        function switchMusic(toMusic) {
            if (currentMusic === toMusic) return;
            
            // Faire un fondu sur la musique actuelle
            let fadeOut = setInterval(() => {
                if (currentMusic.volume > 0.1) {
                    currentMusic.volume -= 0.1;
                } else {
                    currentMusic.volume = 0;
                    currentMusic.pause();
                    clearInterval(fadeOut);
                    
                    // Démarrer la nouvelle musique
                    currentMusic = toMusic;
                    currentMusic.volume = 0;
                    currentMusic.play();
                    
                    // Faire un fondu sur la nouvelle musique
                    let fadeIn = setInterval(() => {
                        if (currentMusic.volume < 0.9) {
                            currentMusic.volume += 0.1;
                        } else {
                            currentMusic.volume = 1;
                            clearInterval(fadeIn);
                        }
                    }, 100);
                }
            }, 100);
        }

        // Démarrer le quiz
        function startQuiz() {
            // Initialiser et lancer la musique
            initMusic();
            mainMusic.play();
            
            // Cacher l'écran de démarrage
            document.getElementById('startScreen').classList.add('hidden');
            
            // Sélectionner 10 questions aléatoires
            selectedQuestions = selectRandomQuestions(questionsDatabase, 10);
            
            // Réinitialiser les variables
            currentQuestionIndex = 0;
            score = 0;
            canAnswer = true;
            
            // Afficher la section quiz
            document.getElementById('quizSection').classList.add('active');
            
            // Afficher la première question
            displayQuestion();
        }

        // Sélectionner des questions aléatoires
        function selectRandomQuestions(database, count) {
            const shuffled = [...database].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, Math.min(count, database.length));
        }

        // Afficher une question
        function displayQuestion() {
            if (currentQuestionIndex >= selectedQuestions.length) {
                showResults();
                return;
            }

            const question = selectedQuestions[currentQuestionIndex];
            
            // Changer la musique si c'est la question des fléchettes
            if (question.specialMusic) {
                switchMusic(dartsMusic);
            } else if (currentMusic === dartsMusic) {
                // Revenir à la musique principale après la question des fléchettes
                switchMusic(mainMusic);
            }
            
            // Mettre à jour la progression
            document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
            document.getElementById('currentScore').textContent = score;
            document.getElementById('progressBar').style.width = ((currentQuestionIndex + 1) / 12 * 100) + '%';
            
            // Afficher la question
            document.getElementById('questionText').textContent = question.question;
            
            // Afficher les réponses
            for (let i = 0; i < 4; i++) {
                const answerElement = document.getElementById('answer' + i);
                const answerOption = answerElement.parentElement;
                
                // Réinitialiser les styles
                answerOption.classList.remove('correct');
                
                // Si l'image existe, l'afficher, sinon afficher un placeholder
                if (question.answers[i]) {
                    answerElement.innerHTML = `<img src="${question.answers[i]}" alt="Réponse ${i + 1}" onerror="this.parentElement.innerHTML='Image ${i + 1}<br>(à remplacer)'">`;
                } else {
                    answerElement.innerHTML = `Image ${i + 1}<br>(à ajouter)`;
                }
            }
            
            canAnswer = true;
        }

        // Sélectionner une réponse
        function selectAnswer(answerIndex) {
            if (!canAnswer) return;
            
            canAnswer = false;
            
            const question = selectedQuestions[currentQuestionIndex];
            const answerOption = document.getElementById('answer' + answerIndex).parentElement;
            
            // Vérifier si la réponse est correcte
            if (answerIndex === question.correctAnswer) {
                score++;
                answerOption.classList.add('correct');
            }
            
            // Passer à la question suivante après un court délai
            setTimeout(() => {
                currentQuestionIndex++;
                displayQuestion();
            }, 800);
        }

        // Afficher les résultats
        function showResults() {
            
            // Cacher la section quiz
            document.getElementById('quizSection').classList.remove('active');
            
            // Afficher le score final
            document.getElementById('finalScore').textContent = score;
            
            // Déterminer le message selon le score
            const resultIcon = document.getElementById('resultIcon');
            const resultMessage = document.getElementById('resultMessage');
            
            if (score === 10) {
                // Score parfait : déclencher l'animation spéciale
                GameProgress.completeGame('jeu_quiz');
                resultIcon.textContent = '❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️';
                resultMessage.innerHTML = '<strong>WOW !</strong><br> bravo tient pour ton magnifique score:';
                
                // Afficher brièvement la section résultat
                document.getElementById('resultSection').classList.add('active');
                
                // Après 2 secondes, lancer le fondu au noir et la vidéo
                setTimeout(() => {
                    showWeddingVideo();
                }, 2000);
            } else if (score >= 5) {
                resultIcon.textContent = '🏆💕🎉';
                resultMessage.innerHTML = 'Fais le 10/10 sinon guez ';
                document.getElementById('resultSection').classList.add('active');
            } else {
                resultIcon.textContent = '💀💀💀';
                resultMessage.innerHTML = '<strong>POURRI MAUVAIS ÉCLATÉ NAZE CLAQUÉ PATHÉTIQUE MINABLE RIDICULE LAMENTABLE PITTOYABLE MÉDIOCRE FAIBLE INUTILE NULISSIME ZÉRO ARCHI-NUL CATASTROPHIQUE DÉSASTREUX HONTEUX MISÉRABLE FOIREUX POURAVE CRAIGNOS BIDON À CHIER DÉGEULASSE IMMONDE POURRAVE NULOS NULARD LOOSER ÉCLATAX ÉCLATÉ AU SOL ÉCLATÉ PAR TERRE ZÉRO ABSOLU FIASCO ÉCHEC TOTAL FLOP NAVRANT AFFLIGEANT NULLARD DE MERDE !</strong>';
                document.getElementById('resultSection').classList.add('active');
            }
        }

        // Afficher la vidéo de mariage avec fondu au noir
        function showWeddingVideo() {
            // Créer l'overlay de fondu au noir
            const overlay = document.createElement('div');
            overlay.id = 'weddingOverlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: black;
                z-index: 9999;
                opacity: 0;
                transition: opacity 2s ease;
            `;
            document.body.appendChild(overlay);
            
            // Déclencher le fondu au noir
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 100);
            
            // Après le fondu au noir complet, afficher la vidéo
            setTimeout(() => {
                // Créer le conteneur vidéo
                const videoContainer = document.createElement('div');
                videoContainer.id = 'videoContainer';
                videoContainer.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 3s ease;
                `;
                
                // Créer l'élément vidéo
                const video = document.createElement('video');
                video.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                `;
                video.controls = true;
                video.autoplay = true;
                
                // IMPORTANT: Remplacez ce chemin par le chemin de votre vidéo
                video.src = 'images/mariagevrai.mp4';
                
                videoContainer.appendChild(video);
                document.body.appendChild(videoContainer);
                
                // Faire apparaître la vidéo en fondu
                setTimeout(() => {
                    videoContainer.style.opacity = '1';
                }, 100);
                
                // Ajouter un bouton de fermeture
                const closeBtn = document.createElement('button');
                closeBtn.innerHTML = '✕ Fermer';
                closeBtn.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10001;
                    padding: 15px 30px;
                    background: rgba(255, 255, 255, 0.9);
                    border: none;
                    border-radius: 50px;
                    font-size: 1.2rem;
                    font-weight: bold;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease;
                `;
                closeBtn.onmouseover = () => {
                    closeBtn.style.background = 'white';
                    closeBtn.style.transform = 'scale(1.05)';
                };
                closeBtn.onmouseout = () => {
                    closeBtn.style.background = 'rgba(255, 255, 255, 0.9)';
                    closeBtn.style.transform = 'scale(1)';
                };
                closeBtn.onclick = () => {
                    videoContainer.remove();
                    overlay.remove();
                    closeBtn.remove();
                };
                document.body.appendChild(closeBtn);
                
            }, 2000);
        }

        // Recommencer le quiz
        function restartQuiz() {
            // Arrêter les musiques
            if (mainMusic) mainMusic.pause();
            if (dartsMusic) dartsMusic.pause();
            
            // Cacher la section résultat
            document.getElementById('resultSection').classList.remove('active');
            
            // Afficher l'écran de démarrage
            document.getElementById('startScreen').classList.remove('hidden');
        }

        // Retour à l'accueil
        function goHome() {
            // Arrêter les musiques
            if (mainMusic) mainMusic.pause();
            if (dartsMusic) dartsMusic.pause();
            
            window.location.href = 'index.html';
        }