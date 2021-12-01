'use strict';

// DOM Elements

const closeControlsBtn      = document.getElementById('closeControlsBtn');
const closeSettingsBtn      = document.getElementById('closeSettingsBtn');
const colorRadios           = document.getElementsByName('color');
const controlsDisplay       = document.getElementById('controlsDisplay');
const gameOverDisplay       = document.getElementById('gameover');
const holdGrid              = document.querySelectorAll('.hold div');
const levelDisplay          = document.getElementById('levelDisplay');
const linesDisplay          = document.getElementById('linesDisplay');
const musicRadios           = document.getElementsByName('music');
const openControlsBtn       = document.getElementById('openControlsBtn');
const openSettingsBtn       = document.getElementById('openSettingsBtn');
const pauseBtn              = document.getElementById('pauseBtn');
const pauseScreen           = document.getElementById('pauseScreen');
const playAgainBtn          = document.getElementById('playAgainBtn');
const previewGrid           = document.querySelectorAll('.preview div');
const settingsDisplay       = document.getElementById('settingsDisplay');
const sfxRadios           = document.getElementsByName('soundeffects');
const squares               = document.querySelectorAll('.grid div');
const startBtn              = document.getElementById('startBtn');
const startScreen           = document.getElementById('startScreen');
const settingsBtn           = document.getElementById('settingsBtn');
const themeRadios           = document.querySelectorAll('select option');


// Game Init

let gameStarted         = false;
let level               = 1;
let nextShapes          = [];
let nbrOfLinesCompleted = 0;
let paused              = false;
let row                 = 10;   // Number of squares in a row
let sp                  = 4;    // starting position of all shapes
let swapPossible        = true; // swaping a piece is possible only once per round
let currentRotation;
let currentShape;
let shapeOnHold;
let timer;
let colors = ['Tshape', 'Oshape', 'Lshape', 'Ishape', 'Jshape', 'Sshape', 'Zshape']


//Theme & Music Init

let currentColor = 'blue';
let currentTheme = 'neon';
let music = false;
let soundEffect = true;
let song = new Audio('audio/music.mp3');
let moveSFX = new Audio('audio/move.ogg');
let dropSFX = new Audio('audio/drop.ogg');
let holdSFX = new Audio('audio/hold.ogg');
let lineBreakSFX = new Audio('audio/linebreak.ogg');
let gameOverSFX = new Audio('audio/gameover.mp3');
song.loop = true;