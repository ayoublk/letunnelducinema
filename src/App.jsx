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

const RulesModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black border-2 border-white p-8 rounded-lg w-[800px] max-h-[80vh] overflow-y-auto text-white">
        <h2 className="text-3xl font-bold mb-6">Règles du jeu</h2>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold mb-2">But du jeu</h3>
            <p>Être le premier joueur à atteindre 25 points.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-2">Structure des points</h3>
            <ul className="list-disc list-inside">
              <li>Questions 1, 2, 3 : 1 point chacune</li>
              <li>Questions 4, 5, 6 : 2 points chacune</li>
              <li>Questions 7, 8, 9 : 3 points chacune</li>
              <li>Question 10 : 4 points</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-2">Déroulement d'un tour</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Le joueur choisit une catégorie</li>
              <li>Une question lui est posée</li>
              <li>Après une bonne réponse, le joueur a deux choix :
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>"Creuser plus profond" : continuer avec la question suivante pour gagner plus de points</li>
                  <li>"Banquer" : sécuriser ses points et passer la main au joueur suivant</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-2">Réponses</h3>
            <ul className="list-disc list-inside">
              <li>Les réponses sont sensibles aux accents (ex: "théâtre" n'est pas équivalent à "theatre")</li>
              <li>Pour les noms communs, ne pas inclure d'article dans la réponse (ex: pour "Quel est l'animal qui miaule ?", répondre "chat" et non "le chat")</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-2">Fin de partie</h3>
            <ul className="list-disc list-inside">
              <li>Le jeu se termine lorsqu'un joueur atteint ou dépasse 25 points</li>
              <li>En cas de blocage, utilisez le bouton "Terminer la partie" pour désigner le(s) gagnant(s)</li>
              <li>En cas d'égalité, plusieurs joueurs peuvent être déclarés vainqueurs</li>
            </ul>
          </section>
        </div>

        <Button 
          onClick={onClose}
          className="w-full mt-6 bg-white text-black hover:bg-gray-200"
        >
          Fermer
        </Button>
      </div>
    </div>
  );
};

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
  "SPIDER-MAN": [
    {
      question: "Quel acteur joue Spider-man dans la trilogie 'Homecoming', 'Far From Home' et 'No Way Home' réalisés par Jon Watts ?",
      answer: "Tom Holland",
      difficulty: 1,
    },
    {
      question: "Comment s'appelle le Spider-man incarné par Tobey McGuire, Andrew Garfield et Tom Holland ? (prénom + nom)",
      answer: "Peter Parker",
      difficulty: 1,
    },
    {
      question: "Comment s'appelle le Spider-man Afro-Portoricain qu'on peut retrouver dans la saga Spider-Verse ?",
      answer: "Miles Morales",
      difficulty: 1,
    },
    {
      question: "Dans quelle ville évolue le personnage de Spider-man ?",
      answer: "New York",
      difficulty: 2,
    },
    {
      question: "Quel symbiote se place pour la première fois en Spider-man avant d'intégrer le corps d'Eddie Brock incarné au cinéma par Tom Hardy ?",
      answer: "Venom",
      difficulty: 2,
    },
    {
      question: "Quelle est la première destination du voyage scolaire dans Spider-man : Far From Home ?",
      answer: "Venise",
      difficulty: 2,
    },
    {
      question: "Quel est le nom de la paire de lunettes high-tech que Tony Stark alias Iron Man donne à Peter Parker ?",
      answer: "Edith",
      difficulty: 3,
    },
    {
      question: "Qui est le premier grand amour de Spider-man dans The Amazing Spider-man, incarné par Emma Stone au cinéma (prénom + nom) ?",
      answer: "Gwen Stacy",
      difficulty: 3,
    },
    {
      question: "Quel célèbre scénariste de bande dessinée a créé le personnage de Spider-man ?",
      answer: "Stan Lee",
      difficulty: 3,
    },
    {
      question: "Dans quel journal le Peter Parker incarné par Tobey McGuire est-il photographe ?",
      answer: "Daily Bugle",
      difficulty: 4,
    },
  ],
  "FILMS DE CHANTEURS": [
    {
      question: "Quel chanteur français, interprète de La Bohème, a vu sa vie portée à l'écran en 2024 dans un biopic où il est incarné par Tahar Rahim ? (prénom + nom)",
      answer: "Charles Aznavour",
      difficulty: 1,
    },
    {
      question: "Quel rappeur américain interprétant la chanson 'Lose Yourself' le film 8 Mile met-il en scène ?",
      answer: "Eminem",
      difficulty: 1,
    },
    {
      question: "Qui va incarner Johnny Hallyday dans un biopic réalisé par Cédric Jimenez et prévu pour 2027 ?",
      answer: "Raphaël Quenard",
      difficulty: 2,
    },
    {
      question: "Quel est le titre du biopic d'Elton John, incarné par Taron Egerton ?",
      answer: "Rocketman",
      difficulty: 2,
    },
    {
      question: "Qui est l'acolyte d'Orelsan dans Comment c'est loin ?",
      answer: "Gringe",
      difficulty: 2,
    },
    {
      question: "Quel acteur incarne Freddie Mercury du groupe Queen dans Bohemian Rhapsody ?",
      answer: "Rami Malek",
      difficulty: 3,
    },
    {
      question: "Qui joue le rôle d'Aline dans le film éponyme qui est une fiction inspirée de la vie de Céline Dion ?",
      answer: "Valérie Lemercier",
      difficulty: 3,
    },
    {
      question: "Quel est le titre international de 'La Môme' où Marion Cotillard incarne Edith Piaf ?",
      answer: "La Vie en Rose",
      difficulty: 3,
    },
    {
      question: "Quel est le prénom de l'homme à qui Amy Winehouse a dédié sa chanson Back to Black, dont la vie a inspiré un film éponyme sorti en 2024 ?",
      answer: "Blake",
      difficulty: 3,
    },
    {
      question: "Qui joue Claude François dans le film Cloclo, sorti en 2012 et réalisé par Florent-Emilio Siri ?",
      answer: "Jérémie Renier",
      difficulty: 4,
    },
  ],
  "HARRY POTTER": [
    {
      question: "Qui est le grand méchant 'dont on ne doit pas prononcer le nom' dans Harry Potter, joué par Ralph Fiennes ?",
      answer: "Voldemort",
      difficulty: 1,
    },
    {
      question: "Comment s'appelle le premier film Harry Potter ?",
      answer: "Harry Potter à l'école des sorciers",
      difficulty: 1,
    },
    {
      question: "Quel acteur jouant dans Twilight peut-on apercevoir dans Harry Potter et la Coupe de feu ?",
      answer: "Robert Pattinson",
      difficulty: 1,
    },
    {
      question: "Comment s'appelle l'acteur d'Harry Potter ?",
      answer: "Daniel Radcliffe",
      difficulty: 2,
    },
    {
      question: "Qui est le parrain d'Harry Potter ? (prénom + nom)",
      answer: "Sirius Black",
      difficulty: 2,
    },
    {
      question: "Quelle est la marque du premier balai de course d'Harry Potter offert par le professeur McGonagall ?",
      answer: "Nimbus 2000",
      difficulty: 2,
    },
    {
      question: "Comment s'appelle la plante magique qui ressemble à un bébé fripé dans un pot et qui crie très très très fort ?",
      answer: "Mandragore",
      difficulty: 3,
    },
    {
      question: "Quel est le prénom du cousin d'Harry Potter ?",
      answer: "Dudley",
      difficulty: 3,
    },
    {
      question: "Dans l'univers d'Harry Potter, quel animal fantastique est Buck ?",
      answer: "Hippogriffe",
      difficulty: 3,
    },
    {
      question: "Combien de points sont attribués à l'équipe qui attrape le Vif d'or au Quidditch ?",
      answer: "150",
      difficulty: 4,
    },
  ],
  "NETFLIX": [
    {
      question: "Qui joue Lupin dans la série Netflix du même nom ? (prénom + nom)",
      answer: "Omar Sy",
      difficulty: 1,
    },
    {
      question: "Quel atroce film français diffusé en exclusivité sur Netflix et réalisé par Xavier Gens met en scène des requins qui rôdent dans la Seine ?",
      answer: "Sous la Seine",
      difficulty: 1,
    },
    {
      question: "Dans quelle série peut-on découvrir des histoires traitant des dérives que peuvent produire l'utilisation de nos écrans (et les nouvelles technologies en général) au quotidien ?",
      answer: "Black Mirror",
      difficulty: 1,
    },
    {
      question: "Quelle est la première série 'Netflix Originals' sortie en 2013 et mettant en scène Kevin Spacey dans le rôle de Franck Underwood ?",
      answer: "House Of Cards",
      difficulty: 2,
    },
    {
      question: "Quelle série met en avant la traque de Pablo Escobar et du cartel de drogue de Medellin en Colombie ?",
      answer: "Narcos",
      difficulty: 2,
    },
    {
      question: "Quelle série sortie en 2024 est une adaptation d'une trilogie de romans de SF chinois écrits par Liu Cixin ?",
      answer: "Le Problème à Trois Corps",
      difficulty: 2,
    },
    {
      question: "Quel artiste espagnol est représenté sur les masques de la série La Casa de Papel ? (prénom + nom)",
      answer: "Salvador Dali",
      difficulty: 3,
    },
    {
      question: "Quel est le nom de famille du duo ayant créé la série Sense 8 ?",
      answer: "Watchowski",
      difficulty: 3,
    },
    {
      question: "Quel film d'horreur SF sorti en 2018 avec Sandra Bullock peut-on voir l'humanité qui est attaquée par une entité invisible provoquant des visions suicidaires ?",
      answer: "Bird Box",
      difficulty: 3,
    },
    {
      question: "Comment s'appelle l'agence française dans laquelle Emily de Emily in Paris travaille dans la ville de Paris ?",
      answer: "Savoir",
      difficulty: 4,
    },
  ],
  "STUDIO GHIBLI": [
    {
      question: "Qui est le fondateur et le réalisateur de nombreux films du Studio Ghibli prénommé Hayao ? (nom de famille)",
      answer: "Miyazaki",
      difficulty: 1,
    },
    {
      question: "Dans quel film peut-on voir une fillette de 10 ans entrer dans le monde des esprits, après la transformation de ses parents en porcs ?",
      answer: "Le Voyage de Chihiro",
      difficulty: 1,
    },
    {
      question: "Dans quel film peut-on retrouver San, une jeune fille sauvage élevée par des loups ?",
      answer: "Princesse Mononoké",
      difficulty: 1,
    },
    {
      question: "Dans quel pays se déroule Porco Rosso ?",
      answer: "Italie",
      difficulty: 2,
    },
    {
      question: "Quel est le dernier film en date du Studio Ghibli, sorti en 2023 ?",
      answer: "Le Garçon et le Héron",
      difficulty: 2,
    },
    {
      question: "Comment s'appellent les petites boules de suie noires qui apparaissent dans Mon voisin Totoro et Le Voyage de Chihiro ? (en français)",
      answer: "Noiraudes",
      difficulty: 2,
    },
    {
      question: "Dans le Château Ambulant, comme s'appelle le démon du feu ressemblant à une flamme orange et qui fait fonctionner le château d'Hauru ?",
      answer: "Calcifer",
      difficulty: 3,
    },
    {
      question: "Au printemps de quelle année débute l'histoire du Tombeau des lucioles ?",
      answer: "1945",
      difficulty: 3,
    },
    {
      question: "Quel est le premier film du Studio Ghibli (sorti en 1986) ?",
      answer: "Le Château dans le ciel",
      difficulty: 3,
    },
    {
      question: "Qui est le cofondateur du Studio Ghibli ? (prénom + nom)",
      answer: "Isao Takahata",
      difficulty: 4,
    },
  ],
  "CHRISTIAN CLAVIER": [
    {
      question: "Dans quel film sorti en 1993 Christian Clavier incarne-t-il Jacquouille la Fripouille ?",
      answer: "Les Visiteurs",
      difficulty: 1,
    },
    {
      question: "Dans quelle série de 3 films comiques Christian Clavier incarne-t-il Jérôme Tarayre au côté notamment de Michel Blanc ou Gérard Jugnot ?",
      answer: "Les Bronzés",
      difficulty: 1,
    },
    {
      question: "Quel rôle Christian Clavier a-t-il dans Astérix et Obélix : Mission Cléopâtre ?",
      answer: "Astérix",
      difficulty: 1,
    },
    {
      question: "Quelle comédie, plus gros succès au box office 2014 avec plus de 12 millions d'entrée, est réalisée par Phillipe de Chauveron ?",
      answer: "Qu'est-ce qu'on a fait au bon dieu",
      difficulty: 2,
    },
    {
      question: "A quel film appartient ce synopsis ? 'Sur le point de se marier, Alice et François décident de réunir leurs deux familles. Pour l'occasion, ils réservent à leurs parents un cadeau original : des tests ADN pour que chacun puisse découvrir les origines de ses ancêtres. Mais la surprise va virer au fiasco quand les Bouvier-Sauvage, grande famille aristocrate, et les Martin, beaucoup plus modestes, découvrent les résultats, pour le moins... inattendus !'",
      answer: "Cocorico",
      difficulty: 2,
    },
    {
      question: "Dans quel film interprète-t-il le personnage de Katia en 1982 ?",
      answer: "Le père Noël est une ordure",
      difficulty: 2,
    },
    {
      question: "Dans quel film sorti en 2019 réalisé par James Huth incarne-t-il Julien, un présentateur télé sur le déclin au côté de Mickaël Youn ?",
      answer: "Rendez-vous chez les Malawas",
      difficulty: 3,
    },
    {
      question: "Dans quelle saga Christian Clavier incarne-t-il Le Jurisconsulte ?",
      answer: "Kaamelott",
      difficulty: 3,
    },
    {
      question: "Avec quel acteur Christian Clavier forme-t-il un duo dans le film L'Enquête Corse en 2004 ?",
      answer: "Jean Reno",
      difficulty: 3,
    },
    {
      question: "Quelle est la matière enseignée par le Professeur Cutiro, interprété par Christian Clavier dans Les Profs en 2013 ?",
      answer: "Mathématiques",
      difficulty: 4,
    },
  ],
  "FILMS AVANT 1980": [
    {
      question: "Qui a réalisé et joué dans le film muet Les Temps Modernes en 1936 ?",
      answer: "Charlie Chaplin",
      difficulty: 1,
    },
    {
      question: "Quel film réalisé par Francis Ford Coppola en 1972 raconte les luttes de pouvoir au sein de la mafia New-Yorkaise ?",
      answer: "Le Parrain",
      difficulty: 1,
    },
    {
      question: "Dans quel film Jack Nicholson incarne R. P. McMurphy, un homme qui se fait interner dans un hôpital psychiatrique ?",
      answer: "Vol au-dessus d'un nid de coucou",
      difficulty: 1,
    },
    {
      question: "Quel film français ayant eu un énorme succès au box office met en scène Louis de Funès et Bourvil dans la France occupée au temps de la Seconde Guerre Mondiale ?",
      answer: "La Grande Vadrouille",
      difficulty: 2,
    },
    {
      question: "Comment se nomme le film américain en huis clos sorti en 1957 avec Henry Fonda et réalisé par réalisé par Sidney Lumet ?",
      answer: "Douze hommes en colère",
      difficulty: 2,
    },
    {
      question: "Quel film japonais, souvent cité comme meilleur film de tous les temps, se passe dans le Japon de l'époque Edo ?",
      answer: "Harakiri",
      difficulty: 2,
    },
    {
      question: "Qui a réalisé Apocalypse Now ?",
      answer: "Francis Ford Coppola",
      difficulty: 3,
    },
    {
      question: "Quel film adapté du conte des frères Grimm est le premier long métrage produit par Disney en 1937 ?",
      answer: "Blanche-Neige et les Sept Nains",
      difficulty: 3,
    },
    {
      question: "Pour quelle comédie française Pierre Bachelet a-t-il écrit la chanson nommée 'Just Because Of You' en 1979 ?",
      answer: "Les Bronzés font du ski",
      difficulty: 3,
    },
    {
      question: "Quel film adapté d'un roman d'Anthony Burgess met en scène Malcolm McDowell dans le rôle du sociopathe Alex DeLarge ?",
      answer: "Orange Mécanique",
      difficulty: 4,
    },
  ],
  "FILMS DE CHRISTOPHER NOLAN": [
    {
      question: "Quel film de Christopher Nolan avec Leonardo Dicaprio et Marion Cotillard, explore les rêves et le subconscient ?",
      answer: "Inception",
      difficulty: 1,
    },
    {
      question: "Quelle film de Christophe Nolan porte le nom d'une ville française ?",
      answer: "Dunkerque",
      difficulty: 1,
    },
    {
      question: "Qui est l'acteur principal de Oppenheimer ?",
      answer: "Cillian Murphy",
      difficulty: 1,
    },
    {
      question: "Quelle pièce de la maison est utilisée comme relais de communication avec la petite Murphy à la fin d'Interstellar ?",
      answer: "Chambre",
      difficulty: 2,
    },
    {
      question: "Qui compose la musique de The Dark Knight Rises ?",
      answer: "Hans Zimmer",
      difficulty: 2,
    },
    {
      question: "Comment s'appelle le prochain film de Christopher Nolan qui sortira en 2026 ?",
      answer: "The Odyssey",
      difficulty: 2,
    },
    {
      question: "Dans Le Prestige, quel scientifique invente une machine très convoitée par Robert Angier (Hugh Jackman) ? (prénom + nom)",
      answer: "Nikola Tesla",
      difficulty: 3,
    },
    {
      question: "Qui est le scénariste de Tenet ?",
      answer: "Christopher Nolan",
      difficulty: 3,
    },
    {
      question: "Combien de niveaux de rêves au maximum sont atteints simultanément dans Inception ?",
      answer: "4",
      difficulty: 3,
    },
    {
      question: "Qui joue l'inspecteur Will Dormer dans Insomnia ?",
      answer: "Al Pacino",
      difficulty: 4,
    },
  ],
};

const VictoryModal = ({ winners, players, onRestart }) => {
  const getTitle = () => {
    if (winners.length > 1) return "Égalité !";
    return "Victoire !";
  };

  const getMessage = () => {
    if (winners.length === 3) return "Incroyable ! Les trois joueurs sont à égalité !";
    if (winners.length === 2) return `${winners[0].name} et ${winners[1].name} sont à égalité !`;
    return `${winners[0].name} a gagné !`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black border-2 border-white p-8 rounded-lg w-96 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">{getTitle()}</h2>
        <p className="text-2xl text-white mb-8">{getMessage()}</p>
        
        <div className="space-y-4 mb-8">
          {players.map(player => (
            <div 
              key={player.id}
              className={`p-4 rounded border ${
                winners.includes(player) 
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
  const [winners, setWinners] = useState([]);
  const [showRules, setShowRules] = useState(false);




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
    
    if (newPlayers[currentPlayer].score >= 20) {
      playSound('victory');
      setShowConfetti(true);
      setWinners([newPlayers[currentPlayer]]); // Ajout de cette ligne
      setShowVictoryModal(true);
    } else {
      setCurrentPoints(0);
      setSelectedCategory(null);
      setIsAnswerCorrect(null);
      setUserAnswer('');
      setCurrentPlayer((currentPlayer + 1) % players.length);
    }
  };

  const handleEndGame = () => {
    // Trier les joueurs par score (du plus haut au plus bas)
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    
    // Trouver tous les joueurs avec le score le plus élevé
    const highestScore = sortedPlayers[0].score;
    const winners = players.filter(player => player.score === highestScore);
  
    setWinners(winners); // Ajoutez cet état
    setShowVictoryModal(true);
    setShowConfetti(true);
    playSound('victory');
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
              <CardTitle className="text-white text-2xl">Le Tunnel du Cinéma - Le 7ème Stream</CardTitle>
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
  
      {/* Bouton Terminer */}
      <div className="fixed bottom-8 right-8 flex gap-4">
  <Button 
    onClick={() => setShowRules(true)}
    className="bg-white text-black hover:bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
  >
    ?
  </Button>
  <Button 
    onClick={handleEndGame}
    className="bg-red-500 text-white hover:bg-red-600 px-6 py-3"
  >
    Terminer la partie
  </Button>
</div>
  
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}

      {/* Modal de victoire */}
      {showVictoryModal && (
        <VictoryModal 
          winners={winners}
          players={players}
          onRestart={() => window.location.reload()}
        />
      )}
    </div>
  );
}
export default App;