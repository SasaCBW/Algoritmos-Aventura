
const intro = document.getElementById("intro");
const game = document.getElementById("game");
const ending = document.getElementById("ending");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const playAgainButton = document.getElementById("playAgainButton");

const chapterTitle = document.getElementById("chapterTitle");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const sceneArt = document.getElementById("sceneArt");
const sceneEmoji = document.getElementById("sceneEmoji");
const sceneTag = document.getElementById("sceneTag");
const sceneLocation = document.getElementById("sceneLocation");
const sceneTitle = document.getElementById("sceneTitle");
const sceneText = document.getElementById("sceneText");
const choicesContainer = document.getElementById("choices");
const feedback = document.getElementById("feedback");

const inventoryElement = document.getElementById("inventory");
const stageStatus = document.getElementById("stageStatus");
const itemStatus = document.getElementById("itemStatus");
const choiceStatus = document.getElementById("choiceStatus");

const endingIcon = document.getElementById("endingIcon");
const endingTitle = document.getElementById("endingTitle");
const endingText = document.getElementById("endingText");
const endingStats = document.getElementById("endingStats");

// Cada cena representa uma etapa da aventura.
// As escolhas direcionam o jogador para outras cenas ou para um final.

const story = {
  inicio: {
    chapter: 1,
    location: "ENTRADA DA FLORESTA",
    tag: "O CHAMADO",
    emoji: "🌲",
    title: "O início da jornada",
    text: "Você encontra um antigo mapa escondido dentro de um livro. Nele existe uma marca indicando um tesouro perdido no coração da Floresta Esquecida. Curioso, você decide investigar.\n\nAo chegar à entrada da floresta, encontra dois caminhos: uma trilha iluminada e uma passagem estreita entre as árvores.",
    choices: [
      {
        text: "Seguir pela trilha iluminada",
        next: "trilha"
      },
      {
        text: "Entrar pela passagem entre as árvores",
        next: "passagem"
      }
    ]
  },

  trilha: {
    chapter: 2,
    location: "TRILHA DAS PEDRAS",
    tag: "UM CAMINHO ANTIGO",
    emoji: "🪨",
    title: "As marcas no caminho",
    text: "A trilha parece segura. No chão, você encontra marcas antigas e uma pequena bolsa esquecida perto de uma árvore.\n\nDentro dela existe uma chave de metal com símbolos misteriosos.",
    choices: [
      {
        text: "Guardar a chave e continuar",
        next: "ponte",
        item: "🗝️ Chave antiga"
      },
      {
        text: "Deixar a chave e seguir sem ela",
        next: "ponte"
      }
    ]
  },

  passagem: {
    chapter: 2,
    location: "PASSAGEM SOMBRIA",
    tag: "O MISTÉRIO",
    emoji: "🦉",
    title: "O guardião das árvores",
    text: "A passagem é silenciosa. De repente, uma coruja aparece em um galho e deixa cair uma pequena pedra brilhante.\n\nA pedra parece ter algum tipo de energia. Você decide levá-la consigo.",
    choices: [
      {
        text: "Pegar a pedra brilhante",
        next: "lago",
        item: "💎 Pedra brilhante"
      },
      {
        text: "Agradecer à coruja e continuar",
        next: "lago"
      }
    ]
  },

  ponte: {
    chapter: 3,
    location: "PONTE ANTIGA",
    tag: "O PRIMEIRO DESAFIO",
    emoji: "🌉",
    title: "A ponte quebrada",
    text: "Depois de caminhar por alguns minutos, você encontra uma ponte antiga sobre um rio. Parte da estrutura está danificada.\n\nDo outro lado, uma placa indica que o templo fica naquela direção.",
    choices: [
      {
        text: "Procurar uma maneira segura de atravessar",
        next: "templo"
      },
      {
        text: "Voltar e procurar outro caminho",
        next: "lago"
      }
    ]
  },

  lago: {
    chapter: 3,
    location: "LAGO DAS ESTRELAS",
    tag: "UMA DESCOBERTA",
    emoji: "🌌",
    title: "O lago misterioso",
    text: "Você chega a um lago que reflete o céu como um espelho. No centro existe uma pequena ilha com uma construção antiga.\n\nUma luz aparece na água e aponta para uma trilha escondida que leva ao templo.",
    choices: [
      {
        text: "Seguir a luz até o templo",
        next: "templo"
      },
      {
        text: "Explorar a margem do lago",
        next: "caverna",
        item: "🧭 Bússola antiga"
      }
    ]
  },

  caverna: {
    chapter: 4,
    location: "CAVERNA DOS SEGREDOS",
    tag: "UMA PASSAGEM SECRETA",
    emoji: "🕯️",
    title: "O segredo da caverna",
    text: "Ao explorar a margem, você encontra uma abertura escondida entre as pedras. Dentro da caverna existe uma inscrição antiga.\n\nA inscrição diz: 'A verdadeira riqueza está naquilo que você escolhe proteger.' Uma passagem leva diretamente ao templo.",
    choices: [
      {
        text: "Entrar na passagem secreta",
        next: "templo"
      },
      {
        text: "Voltar para a trilha principal",
        next: "templo"
      }
    ]
  },

  templo: {
    chapter: 5,
    location: "TEMPLO ESQUECIDO",
    tag: "O GRANDE ENIGMA",
    emoji: "🏛️",
    title: "As portas do templo",
    text: "Finalmente, você encontra o templo indicado no mapa. Na entrada há uma porta de pedra com dois símbolos: uma chave e uma estrela.\n\nVocê percebe que existe um mecanismo que precisa ser ativado para abrir a passagem.",
    choices: [
      {
        text: "Usar a chave antiga, se você a encontrou",
        next: "salaTesouro",
        requires: "🗝️ Chave antiga",
        successMessage: "A chave se encaixa perfeitamente! A porta começa a se abrir."
      },
      {
        text: "Usar a pedra brilhante, se você a encontrou",
        next: "salaTesouro",
        requires: "💎 Pedra brilhante",
        successMessage: "A pedra ilumina os símbolos e ativa o mecanismo."
      },
      {
        text: "Procurar outra entrada",
        next: "salaTesouro"
      }
    ]
  },

  salaTesouro: {
    chapter: 6,
    location: "CÂMARA CENTRAL",
    tag: "A ÚLTIMA ESCOLHA",
    emoji: "✨",
    title: "O segredo revelado",
    text: "As portas se abrem e você encontra uma sala iluminada por cristais. No centro existe um grande baú e, ao lado dele, uma inscrição:\n\n'Escolha com sabedoria. O que você fará com o maior segredo desta floresta?'\n\nVocê pode levar o tesouro ou proteger o segredo para que ele continue existindo.",
    choices: [
      {
        text: "Abrir o baú e levar o tesouro",
        next: "finalTesouro"
      },
      {
        text: "Proteger o segredo da floresta",
        next: "finalGuardiao"
      },
      {
        text: "Compartilhar a descoberta com todos",
        next: "finalCompartilhar"
      }
    ]
  }
};

const endings = {
  finalTesouro: {
    icon: "💰",
    title: "O explorador do tesouro",
    text: "Você decidiu levar o tesouro. Dentro do baú havia riquezas e objetos raros que estavam escondidos há centenas de anos. Sua jornada se tornou uma história conhecida por todos. Mas o verdadeiro mistério da floresta continua esperando por outro explorador."
  },

  finalGuardiao: {
    icon: "🌳",
    title: "O guardião da floresta",
    text: "Você escolheu proteger o segredo. A floresta reconheceu sua atitude e revelou sua verdadeira magia. Você se tornou o guardião daquele lugar, garantindo que suas maravilhas continuassem protegidas por muitas gerações."
  },

  finalCompartilhar: {
    icon: "🤝",
    title: "A descoberta de todos",
    text: "Você decidiu compartilhar a descoberta. Pessoas de diferentes lugares chegaram para conhecer o templo e aprender sobre sua história. A floresta se tornou um lugar de conhecimento, união e respeito pela natureza."
  }
};

// Estado atual do jogador.

let currentScene = "inicio";
let inventory = [];
let choicesMade = 0;
let visitedScenes = [];
let gameFinished = false;

const totalStages = 6;

function startGame() {
  currentScene = "inicio";
  inventory = [];
  choicesMade = 0;
  visitedScenes = [];
  gameFinished = false;

  intro.hidden = true;
  ending.hidden = true;
  game.hidden = false;

  renderScene();
}

function renderScene() {
  const scene = story[currentScene];

  if (!scene) {
    return;
  }

  if (!visitedScenes.includes(currentScene)) {
    visitedScenes.push(currentScene);
  }

  chapterTitle.textContent = `Capítulo ${String(scene.chapter).padStart(2, "0")}`;

  sceneEmoji.textContent = scene.emoji;
  sceneTag.textContent = scene.tag;
  sceneLocation.textContent = scene.location;
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;

  updateSceneColor(currentScene);
  updateProgress();
  updateInventory();
  updateStatus();

  feedback.textContent = "";
  choicesContainer.innerHTML = "";

  scene.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";

    const label = document.createElement("span");
    label.textContent = choice.text;

    const arrow = document.createElement("span");
    arrow.className = "choice-arrow";
    arrow.textContent = "→";

    button.append(label, arrow);

    const hasRequiredItem = !choice.requires || inventory.includes(choice.requires);

    if (!hasRequiredItem) {
      button.disabled = true;
      button.title = "Você ainda não encontrou este item.";
    }

    button.addEventListener("click", () => {
      makeChoice(choice);
    });

    choicesContainer.appendChild(button);
  });
}

function makeChoice(choice) {
  if (gameFinished) {
    return;
  }

  if (choice.requires && !inventory.includes(choice.requires)) {
    feedback.textContent = "Você ainda não possui esse item.";
    return;
  }

  choicesMade++;

  if (choice.item && !inventory.includes(choice.item)) {
    inventory.push(choice.item);
  }

  if (choice.successMessage) {
    feedback.textContent = choice.successMessage;
  }

  updateInventory();
  updateStatus();

  if (endings[choice.next]) {
    showEnding(choice.next);
    return;
  }

  currentScene = choice.next;

  renderScene();
}

function updateInventory() {
  inventoryElement.innerHTML = "";

  if (inventory.length === 0) {
    const empty = document.createElement("span");
    empty.className = "empty-inventory";
    empty.textContent = "Sua mochila está vazia.";
    inventoryElement.appendChild(empty);
    return;
  }

  inventory.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "inventory-item";
    itemElement.textContent = item;
    inventoryElement.appendChild(itemElement);
  });
}

function updateProgress() {
  const progress = Math.min(
    100,
    Math.round((visitedScenes.length / totalStages) * 100)
  );

  progressFill.style.width = `${progress}%`;
  progressText.textContent = `${progress}%`;
}

function updateStatus() {
  stageStatus.textContent = String(
    story[currentScene]?.chapter || totalStages
  ).padStart(2, "0");

  itemStatus.textContent = inventory.length;
  choiceStatus.textContent = choicesMade;
}

function updateSceneColor(sceneId) {
  const colors = {
    inicio: "linear-gradient(135deg, #254d51, #152b3b)",
    trilha: "linear-gradient(135deg, #55523b, #263e38)",
    passagem: "linear-gradient(135deg, #293c4d, #111d31)",
    ponte: "linear-gradient(135deg, #415b65, #1c3447)",
    lago: "linear-gradient(135deg, #243f65, #17253f)",
    caverna: "linear-gradient(135deg, #4b403c, #211f2c)",
    templo: "linear-gradient(135deg, #65543c, #26384a)",
    salaTesouro: "linear-gradient(135deg, #68512e, #26364b)"
  };

  sceneArt.style.background = colors[sceneId] || colors.inicio;
}

function showEnding(endingId) {
  const result = endings[endingId];

  if (!result) {
    return;
  }

  gameFinished = true;
  game.hidden = true;
  ending.hidden = false;

  endingIcon.textContent = result.icon;
  endingTitle.textContent = result.title;
  endingText.textContent = result.text;

  const stats = [
    {
      value: visitedScenes.length,
      label: "CENAS VISITADAS"
    },
    {
      value: inventory.length,
      label: "ITENS ENCONTRADOS"
    },
    {
      value: choicesMade,
      label: "ESCOLHAS FEITAS"
    }
  ];

  endingStats.innerHTML = "";

  stats.forEach((stat) => {
    const element = document.createElement("div");
    element.className = "ending-stat";

    const value = document.createElement("strong");
    value.textContent = stat.value;

    const label = document.createElement("span");
    label.textContent = stat.label;

    element.append(value, label);
    endingStats.appendChild(element);
  });

  progressFill.style.width = "100%";
  progressText.textContent = "100%";
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);
