import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import './App.css';
import selectSound from './assets/sounds/select.mp3';
import correctSound from './assets/sounds/correct.mp3';
import wrongSound from './assets/sounds/wrong.mp3';
import coinSound from './assets/sounds/coin.mp3';
import victorySound from './assets/sounds/victory.mp3';
import Confetti from 'react-confetti';

// Créez les objets Audio
const sounds = {
  select: new Audio(selectSound),
  correct: new Audio(correctSound),
  wrong: new Audio(wrongSound),
  coin: new Audio(coinSound),
  victory: new Audio(victorySound)
};

sounds.select.volume = 1;  // 30% du volume
sounds.correct.volume = 0.1; // 50% du volume
sounds.wrong.volume = 0.03;   // 40% du volume
sounds.coin.volume = 0.1;    // 40% du volume
sounds.victory.volume = 0.06; // 60% du volume

const playSound = (soundName) => {
    sounds[soundName].currentTime = 0; // Remet le son au début
    sounds[soundName].play();
};


// Questions de démonstration (réduites)
const categories = {
  FLEURS: [
    {
      question: "Quelle est la couleur traditionnelle des roses ?",
      answer: "Rouge",
      difficulty: 1,
    },
    {
      question: "Quelle fleur symbolise l'amour ?",
      answer: "Rose",
      difficulty: 1,
    },
    {
      question: "Quelle est la fleur nationale de la France ?",
      answer: "Lys",
      difficulty: 1,
    },
    {
      question: "Quelle est la couleur traditionnelle des roses ?",
      answer: "Rouge",
      difficulty: 2,
    },
    {
      question: "Quelle fleur symbolise l'amour ?",
      answer: "Rose",
      difficulty: 2,
    },
    {
      question: "Quelle est la fleur nationale de la France ?",
      answer: "Lys",
      difficulty: 2,
    },
    {
      question: "Quelle est la couleur traditionnelle des roses ?",
      answer: "Rouge",
      difficulty: 3,
    },
    {
      question: "Quelle fleur symbolise l'amour ?",
      answer: "Rose",
      difficulty: 3,
    },
    {
      question: "Quelle est la fleur nationale de la France ?",
      answer: "Lys",
      difficulty: 3,
    },
    {
      question: "Quelle est la fleur nationale de la France ?",
      answer: "Lys",
      difficulty: 4,
    },  
  ],
  "JEUX DE SOCIÉTÉ": [
    {
      question: "Avec combien de dés joue-t-on au Yahtzee ?",
      answer: "5",
      difficulty: 1,
    },
    {
      question:
        "Quelle est la couleur des propriétés les moins chères au Monopoly ?",
      answer: "Marron",
      difficulty: 1,
    },
    {
      question: "Quel jeu utilise des pions noirs et blancs ?",
      answer: "Dames",
      difficulty: 1,
    },
    // Ajoutez les autres questions...
  ],
  "CHIENS & CHATS": [
    {
      question: "Quelle est la durée de gestation d'une chatte ?",
      answer: "63 jours",
      difficulty: 1,
    },
    {
      question: "Quelle race de chien est originaire du Tibet ?",
      answer: "Lhassa Apso",
      difficulty: 1,
    },
    {
      question: "Combien d'heures un chat dort-il en moyenne par jour ?",
      answer: "16 heures",
      difficulty: 1,
    },
    // Ajoutez les autres questions...
  ],
  "JEUX VIDÉO": [
    {
      question: "Qui est le plombier le plus célèbre des jeux vidéo ?",
      answer: "Mario",
      difficulty: 1,
    },
    {
      question: "En quelle année est sorti le premier Tetris ?",
      answer: "1984",
      difficulty: 1,
    },
    {
      question: "Quelle est la console la plus vendue de tous les temps ?",
      answer: "PlayStation 2",
      difficulty: 1,
    },
    // Ajoutez les autres questions...
  ],
  FOOTBALL: [
    {
      question:
        "En quelle année la France a-t-elle gagné sa première coupe du monde ?",
      answer: "1998",
      difficulty: 1,
    },
    {
      question: "Quel joueur a gagné le plus de Ballons d'Or ?",
      answer: "Lionel Messi",
      difficulty: 1,
    },
    {
      question: "Dans quelle ville se trouve le stade Camp Nou ?",
      answer: "Barcelone",
      difficulty: 1,
    },
    // Ajoutez les autres questions...
  ],
  NOURRITURE: [
    {
      question: "Quel est l'ingrédient principal de la ratatouille ?",
      answer: "Aubergine",
      difficulty: 1,
    },
    {
      question: "De quel pays vient le sushi ?",
      answer: "Japon",
      difficulty: 1,
    },
    {
      question: "Quelle est la capitale mondiale de la gastronomie ?",
      answer: "Lyon",
      difficulty: 1,
    },
    // Ajoutez les autres questions...
  ],
  "FILMS FRANÇAIS": [
    {
      question: "Qui a réalisé 'Le Fabuleux Destin d'Amélie Poulain' ?",
      answer: "Jean-Pierre Jeunet",
      difficulty: 1,
    },
    {
      question: "Quel acteur joue dans 'Les Visiteurs' ?",
      answer: "Jean Reno",
      difficulty: 1,
    },
    {
      question: "Quel film a gagné la Palme d'Or en 2008 ?",
      answer: "Entre les murs",
      difficulty: 1,
    },
    // Ajoutez les autres questions...
  ],
  MUSIQUE: [
    {
      question: "Quel est l'instrument de jazz le plus populaire ?",
      answer: "Saxophone",
      difficulty: 1,
    },
    {
      question: "Qui a composé 'Les Quatre Saisons' ?",
      answer: "Vivaldi",
      difficulty: 1,
    },
    {
      question: "Quel groupe a chanté 'Bohemian Rhapsody' ?",
      answer: "Queen",
      difficulty: 1,
    },
    // Ajoutez les autres questions...
  ],
};

const VictoryModal = ({ winner, players, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black border-2 border-white p-8 rounded-lg w-96 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Victoire !</h2>
        <p className="text-2xl text-white mb-8">{winner.name} a gagné !</p>
        
        <div className="space-y-4 mb-8">
          {players.map(player => (
            <div 
              key={player.id}
              className={`p-4 rounded border ${
                player.id === winner.id 
                  ? 'border-yellow-500 bg-white text-black' 
                  : 'border-white text-white'
              }`}
            >
              <p className="font-bold">{player.name}</p>
              <p className="text-xl">{player.score} points</p>
            </div>
          ))}
        </div>

        <Button 
          onClick={onRestart}
          className="bg-white text-black hover:bg-gray-200 w-full"
        >
          Nouvelle partie
        </Button>
      </div>
    </div>
  );
};

const PlayerSelection = ({ onStart }) => {
  const [players, setPlayers] = useState(Array(3).fill(null).map((_, index) => ({
    id: index + 1,
    name: `Joueur ${index + 1}`,
    isDefaultName: true // Ajout d'un flag pour suivre si c'est le nom par défaut
  })));
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);

  const handleNameChange = (id, newName) => {
    setPlayers(players.map(player => {
      if (player.id === id) {
        return {
          ...player,
          name: newName,
          isDefaultName: false // Le nom n'est plus le défaut dès qu'on le modifie
        };
      }
      return player;
    }));
  };

  // Si on change le nombre de joueurs, réinitialiser les noms pour les nouveaux joueurs
  const handlePlayerCountChange = (count) => {
    setNumberOfPlayers(count);
    setPlayers(prev => {
      const newPlayers = [...prev];
      while (newPlayers.length < count) {
        const id = newPlayers.length + 1;
        newPlayers.push({
          id,
          name: `Joueur ${id}`,
          isDefaultName: true
        });
      }
      return newPlayers;
    });
  };

  
  


  return (
    <Card className="w-full max-w-lg mx-auto bg-black text-white border-white">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Configuration de la partie</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center gap-4 mb-6">
          <Button 
            onClick={() => handlePlayerCountChange(2)}
            className={`${numberOfPlayers === 2 ? 'bg-white text-black' : 'bg-black text-white border-white border'}`}
          >
            2 Joueurs
          </Button>
          <Button 
            onClick={() => handlePlayerCountChange(3)}
            className={`${numberOfPlayers === 3 ? 'bg-white text-black' : 'bg-black text-white border-white border'}`}
          >
            3 Joueurs
          </Button>
        </div>

        <div className="space-y-4">
          {players.slice(0, numberOfPlayers).map((player) => (
            <div key={player.id} className="flex gap-4 items-center">
              <input
                type="text"
                value={player.name}
                onChange={(e) => handleNameChange(player.id, e.target.value)}
                className="w-full p-2 bg-black text-white border border-white rounded"
                placeholder={`Nom du joueur ${player.id}`}
              />
            </div>
          ))}
        </div>

        <Button 
          onClick={() => onStart(numberOfPlayers, players.slice(0, numberOfPlayers))}
          className="w-full mt-6 bg-white text-black hover:bg-gray-200"
        >
          Commencer la partie
        </Button>
      </CardContent>
    </Card>
  );
};

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [currentProgress, setCurrentProgress] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);


  const startGame = (numberOfPlayers, playersList) => {
    const newPlayers = playersList.slice(0, numberOfPlayers).map(player => ({
      ...player,
      score: 0
    }));
    setPlayers(newPlayers);
    setGameStarted(true);
  };

  const nextPlayer = () => {
    setCurrentProgress({
      ...currentProgress,
      [selectedCategory]: currentQuestion
    });
    setCurrentPoints(0);
    setSelectedCategory(null);
    setIsAnswerCorrect(null);
    setUserAnswer('');
    setCurrentPlayer((currentPlayer + 1) % players.length);
  };

  const checkAnswer = () => {
    const correctAnswer = categories[selectedCategory][currentQuestion].answer.toLowerCase();
    const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase();
    setIsAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      playSound('correct');
      const points = getPointsForQuestion(currentQuestion);
      setCurrentPoints(currentPoints + points);
    } else {
      playSound('wrong');
    }
  };

  const handleNextQuestion = () => {
    setUserAnswer('');
    setIsAnswerCorrect(null);
    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };


  const [showVictoryModal, setShowVictoryModal] = useState(false);

  const getPointsForQuestion = (questionIndex) => {
    if (questionIndex < 3) return 1;
    if (questionIndex < 6) return 2;
    if (questionIndex < 9) return 3;
    return 4;
  };

  const handleBank = () => {
    playSound('coin');
  
    setCurrentProgress({
      ...currentProgress,
      [selectedCategory]: currentQuestion + 1
    });
  
    const newPlayers = [...players];
    newPlayers[currentPlayer].score += currentPoints;
    setPlayers(newPlayers);
    
    if (newPlayers[currentPlayer].score >= 1) {
      playSound('victory');
      setShowConfetti(true);
      setShowVictoryModal(true);
    } else {
      setCurrentPoints(0);
      setSelectedCategory(null);
      setIsAnswerCorrect(null);
      setUserAnswer('');
      setCurrentPlayer((currentPlayer + 1) % players.length);
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-black p-8">
        <PlayerSelection onStart={startGame} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {showConfetti && <Confetti />}
      <div className="grid grid-cols-4 gap-8">
        {/* Zone de jeu principale */}
        <div className="col-span-3">
          <Card className="bg-black border border-white">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Le Tunnel</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Grille des catégories */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                {Object.keys(categories).map((category) => {
                  const isCategoryCompleted = currentProgress[category] === 10;
                  return (
                    <Button 
                      key={category}
                      onClick={() => {
                        if (!isCategoryCompleted) {
                          playSound('select');
                          setSelectedCategory(category);
                          setCurrentQuestion(currentProgress[category] || 0);
                          setIsAnswerCorrect(null);
                          setUserAnswer('');
                        }
                      }}
                      className={`
                        relative h-32 p-4 rounded-lg transition-all duration-200
                        ${isCategoryCompleted 
                          ? 'bg-gray-800 border-gray-500 opacity-50 cursor-not-allowed' 
                          : selectedCategory === category 
                            ? 'bg-white text-black' 
                            : 'bg-black text-white border border-white hover:bg-white hover:text-black'}
                        ${selectedCategory !== null && selectedCategory !== category ? 'opacity-50' : ''}
                      `}
                      disabled={selectedCategory !== null && selectedCategory !== category || isCategoryCompleted}
                    >
                      <span className="text-sm font-bold mb-2">{category}</span>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                        {Array(10).fill('').map((_, i) => {
                          let barColor = 'border-white';
                          if (currentProgress[category] > i) {
                            if (i < 3) barColor = 'bg-green-500 border-green-500';
                            else if (i < 6) barColor = 'bg-yellow-500 border-yellow-500';
                            else if (i < 9) barColor = 'bg-orange-500 border-orange-500';
                            else barColor = 'bg-red-500 border-red-500';
                          }
                          return (
                            <div 
                              key={i} 
                              className={`
                                w-2 h-8 border 
                                ${barColor}
                                ${currentProgress[category] > i ? '' : 'bg-transparent'}
                              `}
                            />
                          );
                        })}
                      </div>
                    </Button>
                  );
                })}
              </div>
  
              {/* Zone de question/réponse */}
              {selectedCategory && (
                <div className="space-y-6 text-white">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">{selectedCategory}</h3>
                    <span className="text-xl px-4 py-2 bg-gray-800 rounded">
                      {getPointsForQuestion(currentQuestion)} points
                    </span>
                  </div>
                  <p className="text-xl">Question {currentQuestion + 1}</p>
                  <p className="text-2xl mb-6">{categories[selectedCategory][currentQuestion].question}</p>
  
                  <div className="space-y-4">
                    {isAnswerCorrect === null ? (
                      <>
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          className="w-full p-2 bg-black text-white border border-white rounded"
                          placeholder="Votre réponse..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              checkAnswer();
                            }
                          }}
                        />
                        <Button 
                          onClick={checkAnswer} 
                          className="w-full bg-white text-black hover:bg-gray-200"
                        >
                          Valider la réponse
                        </Button>
                      </>
                    ) : isAnswerCorrect ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-green-500/20 border border-green-500 rounded">
                          <p className="text-green-500">Correct !</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Button 
                            onClick={handleNextQuestion}
                            className="bg-white text-black hover:bg-gray-200"
                            disabled={currentQuestion === 9}
                          >
                            Question suivante
                          </Button>
                          <Button 
                            onClick={handleBank}
                            className="bg-white text-black hover:bg-gray-200"
                          >
                            Banquer {currentPoints} points
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-red-500/20 border border-red-500 rounded">
                          <p className="text-red-500">Incorrect !</p>
                        </div>
                        <Button 
                          onClick={nextPlayer}
                          className="w-full bg-white text-black hover:bg-gray-200"
                        >
                          Au joueur suivant
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
  
        {/* Liste des joueurs */}
        <div className="col-span-1">
          <Card className="bg-black border border-white">
            <CardHeader>
              <CardTitle className="text-white">Tour de {players[currentPlayer]?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {players.map((player, index) => (
                  <div 
                    key={player.id} 
                    className={`
                      p-4 rounded border transition-all duration-200
                      ${currentPlayer === index 
                        ? 'bg-white text-black border-white scale-105 transform shadow-lg' 
                        : 'bg-black text-white border-white opacity-70'}
                    `}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg">
                        {player.name}
                        {currentPlayer === index && 
                          <span className="ml-2 text-xs bg-black text-white px-2 py-1 rounded">
                            En train de jouer
                          </span>
                        }
                      </h3>
                      <p className="font-bold text-xl">{player.score} pts</p>
                    </div>
                  </div>
                ))}
              </div>
              {currentPoints > 0 && (
                <div className="mt-4 p-4 border border-green-500 rounded">
                  <p className="text-green-500">Points en jeu : {currentPoints}</p>
                </div>
              )}
              
            </CardContent>
          </Card>
        </div>
      </div>
      {showVictoryModal && (
      <VictoryModal 
        winner={players[currentPlayer]}
        players={players}
        onRestart={() => window.location.reload()}
      />
    )}
    </div>

    
  );
}
export default App;