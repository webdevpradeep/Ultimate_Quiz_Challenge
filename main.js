const questions = [
  {
    q: 'What is the capital of France?',
    options: ['Berlin', 'Paris', 'Madrid', 'London'],
    answer: 1,
  },
  {
    q: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Earth', 'Mars', 'Jupiter'],
    answer: 2,
  },
  {
    q: 'Who developed the theory of relativity?',
    options: ['Newton', 'Einstein', 'Tesla', 'Darwin'],
    answer: 1,
  },
  {
    q: 'What is the chemical symbol for water?',
    options: ['O2', 'H2O', 'CO2', 'NaCl'],
    answer: 1,
  },
  {
    q: 'Which language is used for web apps?',
    options: ['Python', 'JavaScript', 'C', 'Swift'],
    answer: 1,
  },
  {
    q: 'What is 12 x 12?',
    options: ['124', '144', '132', '112'],
    answer: 1,
  },
  {
    q: 'Which is the largest mammal?',
    options: ['Elephant', 'Blue Whale', 'Shark', 'Giraffe'],
    answer: 1,
  },
  {
    q: 'Who painted the Mona Lisa?',
    options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Rembrandt'],
    answer: 1,
  },
  {
    q: 'Which gas do humans need to breathe?',
    options: ['Oxygen', 'Hydrogen', 'Nitrogen', 'Carbon'],
    answer: 0,
  },
  {
    q: 'Which continent is the Sahara Desert in?',
    options: ['Asia', 'Africa', 'Australia', 'Europe'],
    answer: 1,
  },
  {
    q: 'Which year did WW2 end?',
    options: ['1942', '1945', '1939', '1950'],
    answer: 1,
  },
  {
    q: 'What is the capital of Japan?',
    options: ['Beijing', 'Seoul', 'Tokyo', 'Osaka'],
    answer: 2,
  },
  {
    q: 'Which organ pumps blood?',
    options: ['Lungs', 'Brain', 'Heart', 'Kidneys'],
    answer: 2,
  },
  {
    q: 'Which is the smallest prime number?',
    options: ['0', '1', '2', '3'],
    answer: 2,
  },
  {
    q: 'What is the freezing point of water?',
    options: ['0°C', '100°C', '-10°C', '50°C'],
    answer: 0,
  },
  {
    q: 'Who invented the light bulb?',
    options: ['Edison', 'Newton', 'Tesla', 'Bell'],
    answer: 0,
  },
  {
    q: 'Which ocean is the largest?',
    options: ['Atlantic', 'Pacific', 'Indian', 'Arctic'],
    answer: 1,
  },
  { q: 'What is 25 + 36?', options: ['61', '62', '60', '63'], answer: 0 },
  {
    q: 'Which country is famous for pizza?',
    options: ['France', 'Italy', 'Spain', 'USA'],
    answer: 1,
  },
  {
    q: 'What is the tallest mountain?',
    options: ['K2', 'Everest', 'Fuji', 'Kilimanjaro'],
    answer: 1,
  },
];

let shuffledQuestions = [];
let currentQ = 0;
let score = 0;
let answered = false;

const questionEl = document.querySelector('.question');
const optionsEl = document.querySelector('.options');
const scoreEl = document.getElementById('score');
const startBtn = document.getElementById('start');
const nextBtn = document.getElementById('next');
const restartBtn = document.getElementById('restart');

// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadQuestion() {
  answered = false;
  const q = shuffledQuestions[currentQ];
  questionEl.textContent = q.q;
  optionsEl.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(i) {
  if (answered) return;
  answered = true;
  const q = shuffledQuestions[currentQ];
  if (i === q.answer) {
    score++;
    scoreEl.textContent = score;
    optionsEl.children[i].style.background = '#16a34a';
  } else {
    optionsEl.children[i].style.background = '#dc2626';
    optionsEl.children[q.answer].style.background = '#16a34a';
  }
  nextBtn.disabled = false;
}

startBtn.onclick = () => {
  shuffledQuestions = shuffle([...questions]); // randomize every game
  currentQ = 0;
  score = 0;
  scoreEl.textContent = score;
  loadQuestion();
  nextBtn.disabled = true;
};

nextBtn.onclick = () => {
  if (currentQ < shuffledQuestions.length - 1) {
    currentQ++;
    loadQuestion();
    nextBtn.disabled = true;
  } else {
    questionEl.textContent =
      '🎉 Quiz Finished! Your Score: ' + score + '/' + shuffledQuestions.length;
    optionsEl.innerHTML = '';
    nextBtn.disabled = true;
  }
};

restartBtn.onclick = () => {
  currentQ = 0;
  score = 0;
  scoreEl.textContent = score;
  questionEl.textContent = 'Press Start to begin!';
  optionsEl.innerHTML = '';
  nextBtn.disabled = true;
};
