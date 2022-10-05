const newTack = document.querySelector('.new-tack__input');
const tackList = document.querySelector('.tack-list');
const newTackAdd = document.querySelector('.new-tack__add');
const categoriesList = document.querySelector('.todo-categories__list');

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
  <select class="tack-item__select" ${item.check ? 'disabled' : ''}>
    <option  value="All">Без категории</option>
    <option ${
      item.category == 'Groceries' ? 'selected' : ''
    } value="Groceries" >Продукты</option>
    <option ${
      item.category == 'Payments' ? 'selected' : ''
    } value="Payments">Платежи</option>
    <option ${
      item.category == 'College' ? 'selected' : ''
    } value="College">Колледж</option>
  </select>
  <div class="tack-item__delete"></div>
</div>
`;
    tacksDOM += tackDOM;
  });
  tackList.innerHTML = tacksDOM;
}
// изменение check
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
    }
    addTacksDOM(arrTack);
  });
}
// Удаление задачи
tackList.addEventListener('click', e => {
  if (e.target.closest('.tack-item__delete')) {
    const tackItem = e.target.closest('.tack-item__delete').parentElement;

    deleteTack(tackItem, arrTack);
  }
});

// Функция удаления задачи из массива
function deleteTack(tack, arr) {
  arr.forEach((item, index) => {
    if (item.id == tack.id) {
      arr.splice(index, 1);
    }
  });
  addTacksDOM(arrTack);
}

//Изменение категории
tackList.addEventListener('click', e => {
  const selectDOM = e.target.closest('select');
  if (selectDOM) {
    const tackItem = selectDOM.parentElement;

    selectTack(tackItem, arrTack, selectDOM);
  }
});

//Функция изменения категории в массиве
function selectTack(tack, arr, select) {
  arr.forEach(item => {
    if (item.id == tack.id) {
      item.category = select.value;
    }
  });
}

//Фильтрация категорий
categoriesList.addEventListener('click', e => {
  const link = '.todo-categories__link';
  const linkActive = '.todo-categories__link_active';
  if (!e.target.closest(linkActive) && e.target.closest(link)) {
    categoriesList
      .querySelector(linkActive)
      .classList.remove('todo-categories__link_active');
    const categoryClicked = e.target.closest(link);

    categoryClicked.classList.add('todo-categories__link_active');

    filterTack(arrTack, categoryClicked);
  }
});

//Функция фильтрация задач по категории
function filterTack(arr, category) {
  if (category.id !== 'All') {
    const filterArr = arr.filter(item => item.category == category.id);
    addTacksDOM(filterArr);
  } else {
    addTacksDOM(arr);
  }
}

//функция бургер меню
const menu = document.querySelector('.menu-burger');
const categories = document.querySelector('.todo-categories');

menu.addEventListener('click', e => {
  categories.classList.add('todo-categories_active');
});
categories.addEventListener('click', e => {
  categories.classList.remove('todo-categories_active');
});
