class Mineral {
  constructor({ id, name, hp, maxHp, fragCost, imgSrc }) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.maxHp = maxHp;
    this.fragCost = fragCost;
    this.imgSrc = imgSrc;
  }

  mine(power) {
    this.hp -= power;
    if (this.hp <= 0) {
      const earned = this.fragCost;
      this.hp = this.maxHp;
      return earned;
    }
    return 0;
  }
}

// Реси
let mineralsStore = [
  new Mineral({
    id: 0,
    name: 'Камінь',
    hp: 5,
    maxHp: 5,
    fragCost: 1,
    imgSrc: 'img/stone.jpg'
  }),
  new Mineral({
    id: 1,
    name: 'Вугілля',
    hp: 20,
    maxHp: 20,
    fragCost: 5,
    imgSrc: 'img/coal.jpg'
  }),

  // ---- Нові ресурси ---- //

  new Mineral({
    id: 4,
    name: 'Залізо',
    hp: 50,
    maxHp: 50,
    fragCost: 15,
    imgSrc: 'img/iron.jpg'
  }),

  new Mineral({
    id: 5,
    name: 'Мідь',
    hp: 55,
    maxHp: 55,
    fragCost: 20,
    imgSrc: 'img/copper.jpg'
  }),

  new Mineral({
    id: 6,
    name: 'Срібло',
    hp: 70,
    maxHp: 70,
    fragCost: 25,
    imgSrc: 'img/silver.jpg'
  }),
  new Mineral({
    id: 2,
    name: 'Золото',
    hp: 100,
    maxHp: 100,
    fragCost: 40,
    imgSrc: 'img/gold.jpg'
  }),


  new Mineral({
    id: 7,
    name: 'Титан',
    hp: 150,
    maxHp: 150,
    fragCost: 80,
    imgSrc: 'img/titan.jpg'
  }),  
  new Mineral({
    id: 3,
    name: 'Уран',
    hp: 120,
    maxHp: 100,
    fragCost: 50,
    imgSrc: 'img/uran.jpg'
  }),

  new Mineral({
    id: 8,
    name: 'Платина',
    hp: 250,
    maxHp: 250,
    fragCost: 120,
    imgSrc: 'img/platinum.jpg'
  }),

  new Mineral({
    id: 9,
    name: 'Алмаз',
    hp: 400,
    maxHp: 400,
    fragCost: 200,
    imgSrc: 'img/diamond.jpg'
  }),
];

let activeMineralId = 0;
let activeMineral = mineralsStore[activeMineralId];

// Змінні гри які якщо торкнути станеться ядерний вибух
let score = 0;
let pickaxe = 1;
let people = 1;
let zav = 0;

// DOM-елементи
const Pbtn = document.querySelector('.btn');
const sD = document.querySelector('#sD');
const BPbtn = document.querySelector('.Bbtn');
const HPbtn = document.querySelector('.Hbtn');
const BZbtn = document.querySelector('.Zbtn');

const zel = document.querySelector('#zel');
const pers = document.querySelector('#pe');
const pix = document.querySelector('#pi');

Pbtn.onclick = sc;
BPbtn.onclick = buyP;
HPbtn.onclick = HireP;
BZbtn.onclick = zavod;

// Перемикання ресурсів
function nextMineral() {
  activeMineralId = (activeMineralId + 1) % mineralsStore.length;
  activeMineral = mineralsStore[activeMineralId];
  updateDisplay();
}

function prevMineral() {
  activeMineralId = (activeMineralId - 1 + mineralsStore.length) % mineralsStore.length;
  activeMineral = mineralsStore[activeMineralId];
  updateDisplay();
}

// Ігрові дії?
function sc() {
  let pp = Math.min(pickaxe, people)+zav*5;
  let earned = activeMineral.mine(pp);
  score += earned;
  score += zav * 10;
  updateDisplay();
}

function buyP() {
  if (score >= 100) {
    pickaxe += 1;
    score -= 100;
    updateDisplay();
  }
}

function HireP() {
  if (score >= 100) {
    people += 1;
    score -= 100;
    updateDisplay();
  }
}

function zavod() {
  if (score >= 10000) {
    zav += 1;
    score -= 10000;
    updateDisplay();
  }
}

// Відображення повної хуйні (не лізти,поламаєш нахєр)
function updateDisplay() {
  sD.textContent = '💎 ' + score;
  pix.textContent = '⛏️ ' + pickaxe;
  pers.textContent = '👨‍🔧 ' + people;
  zel.textContent = '🏢 ' + zav;

  const mineralInfo = document.querySelector('#mineralInfo');
  const percent = (activeMineral.hp / activeMineral.maxHp) * 100;

  mineralInfo.innerHTML = `
    <div>
      <img src="${activeMineral.imgSrc}" alt="${activeMineral.name}">
      <div class="progress-bar">
        <div class="progress-fill" style="width:${percent}%"></div>
      </div>
      <div>${activeMineral.name} (${activeMineral.hp}/${activeMineral.maxHp})</div>
    </div>
  `;

  Pbtn.src = activeMineral.imgSrc;
  Pbtn.alt = activeMineral.name;
}

//  Збереження... наче
function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function saveAll() {
  setCookie("score", score, 1000000);
  setCookie("pickaxe", pickaxe, 1000000);
  setCookie("people", people, 1000000);
  setCookie("zav", zav, 1000000);
}

// Завантаження гри
window.onload = function () {
  score = parseInt(getCookie("score")) || 0;
  pickaxe = parseInt(getCookie("pickaxe")) || 1;
  people = parseInt(getCookie("people")) || 1;
  zav = parseInt(getCookie("zav")) || 0;
  updateDisplay();
};
