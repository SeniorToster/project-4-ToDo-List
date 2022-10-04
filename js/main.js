const newTack = document.querySelector('.new-tack__input');
const tackList = document.querySelector('.tack-list');
const newTackAdd = document.querySelector('.new-tack__add');
const arrTack = [];

newTackAdd.addEventListener('click', e => {
  const value = newTack.value;
  if (checkValueTack(value, arrTack)) {
    addTackArr(value, arrTack);
    addTacksDOM(arrTack);
  }
});

// Функция проверки пустой задачи и одинаковой
function checkValueTack(text, arr) {
  if (!text) {
    alert('Пустое значение');
    return false;
  }
  if (arr.find(item => item.text === text)) {
    alert('Задача уже есть');
    return false;
  }
  return true;
}

// Функция добавления задачи в массив
function addTackArr(text, arr) {
  const tack = {
    id: Date.now(),
    text,
    check: false,
    isCategoryDisabled: false,
    category: 'all',
  };
  arr.push(tack);
}

// Функция добавления задач в ДОМ дерево
function addTacksDOM(arr) {
  let tacksDOM = '';

  arr.forEach(item => {
    const tackDOM = `
<div class="tack-item" id='${item.id}'>
  <label class="tack-item__wrapper">
    <input type="checkbox" class="tack-item__checkbox" ${
      item.check ? 'checked' : ''
    } />
    <span class="tack-item__checkmark"></span>
    <div class="tack-item__text">${item.text}</div>
  </label>
  <select class="tack-item__select" ${
    item.isCategoryDisabled ? 'disabled' : ''
  }>
    <option value="all">Без категории</option>
    <option value="Groceries">Продукты</option>
    <option value="Payments">Платежи</option>
    <option value="College">Колледж</option>
  </select>
  <div class="tack-item__delete"></div>
</div>
`;
    tacksDOM += tackDOM;
  });
  tackList.innerHTML = tacksDOM;
}

tackList.addEventListener('click', e => {
  if (e.target.closest('.tack-item__checkbox')) {
    const tackItem = e.target.closest('.tack-item__checkbox').parentElement
      .parentElement;

    checkTack(tackItem, arrTack);
  }
});

// Функция добавления check в массив
function checkTack(tack, arr) {
  arr.forEach(item => {
    if (item.id == tack.id) {
      item.check = !item.check;
      item.isCategoryDisabled = !item.isCategoryDisabled;
    }
  });
  addTacksDOM(arrTack);
}

// Функция удаления из массива
