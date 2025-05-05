////////////////////////////////////////////////////////////////////////////////////
// Переключение темной и светлой темы
////////////////////////////////////////////////////////////////////////////////////

let dark = false;
let pageCalc = document.querySelector('.page');
let titleCalc = document.querySelector('.calc__title');
let containerCalc = document.querySelector('.calc__container');
let displayCalc = document.querySelector('.calc__display');
let allBtnCalc = document.querySelectorAll('.calc__btn');
let allBtnOperationCalc = document.querySelectorAll('.calc__btn_type_operation');
let btnResetCalc = document.querySelector('.calc__btn_type_reset');
let toggleBtn = document.querySelector('.calc__toggle-btn');

function darkLight() {
  // если темная тема не активна
  if (!dark) {
    // добавляем класс с темной темой ко всей странице
    pageCalc.classList.add('page_theme_dark');

    titleCalc.classList.add('calc__title_theme_dark');
    containerCalc.classList.add('calc__container_theme_dark');
    displayCalc.classList.add('calc__display_theme_dark');
    toggleBtn.classList.add('calc__toggle-btn_theme_dark');
    btnResetCalc.classList.add('calc__btn_type_reset_theme_dark');
    // проходим по всем элементам объекта класса NodeList и добавляем класс темной темы
    for (const btn of allBtnCalc) {
      btn.classList.add('calc__btn_theme_dark');
    }
    for (btn of allBtnOperationCalc) {
      btn.classList.add('calc__btn_type_operation_theme_dark');
    }

    // меняет надпись переключателя
    toggleBtn.textContent = 'Включить светлую тему';

    // если на экране ошибка, меняем стиль ошибки
    if (strMathResult.classList.contains('calc__math-result_type_error')) {
      strMathResult.classList.remove('calc__math-result_type_error');
      strMathResult.classList.add('calc__math-result_type_error_theme_dark');
    }
  // если темная тема не активна
  } else {
    // убираем класс с темной темой на всей странице
    pageCalc.classList.remove('page_theme_dark');

    titleCalc.classList.remove('calc__title_theme_dark');
    containerCalc.classList.remove('calc__container_theme_dark');
    displayCalc.classList.remove('calc__display_theme_dark');
    toggleBtn.classList.remove('calc__toggle-btn_theme_dark');
    btnResetCalc.classList.remove('calc__btn_type_reset_theme_dark');
    // проходим по всем элементам объекта класса NodeList и удаляем класс темной темы
    for (const btn of allBtnCalc) {
      btn.classList.remove('calc__btn_theme_dark');
    }
    for (btn of allBtnOperationCalc) {
      btn.classList.remove('calc__btn_type_operation_theme_dark');
    }

    // меняет надпись переключателя
    toggleBtn.textContent = 'Включить темную тему';

    // если на экране ошибка, меняем стиль ошибки
    if (strMathResult.classList.contains('calc__math-result_type_error_theme_dark')) {
      strMathResult.classList.remove('calc__math-result_type_error_theme_dark');
      strMathResult.classList.add('calc__math-result_type_error');
    }
  }
  dark = !dark;
}
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
// Математические вычисления
////////////////////////////////////////////////////////////////////////////////////

///////// Функционал кнопки сброса
// Переменная для поля вывода результата на дисплее калькулятора
let strMathResult = document.querySelector('.calc__math-result');
// Переменная для поля вывода математических операций на дисплее калькулятора
let strMathOperation = document.querySelector('.calc__math-operation');
let shouldResetDisplay = false; // Новый флаг для контроля сброса дисплея

function clearDisplay() {
  strMathResult.textContent = '';
  strMathResult.classList.remove('calc__math-result_type_error');
  strMathResult.classList.remove('calc__math-result_type_error_theme_dark');
  strMathOperation.textContent = '';
  result = '';
  shouldResetDisplay = false; // Сбрасываем флаг при очистке
}

///////// Функционал смены знака у числа
function plusMinus(a) {
  a = strMathResult.textContent;

  if (a.startsWith('-')) {
    a = a.slice(1);
    strMathResult.textContent = parseFloat(a);
  } else {
    strMathResult.textContent = parseFloat(a)*(-1);
  }
}

///////// Функционал подключения стиля ошибки в зависимости от темы страницы
function addClassError() {
  if (toggleBtn.textContent === 'Включить светлую тему') {
    strMathResult.classList.add('calc__math-result_type_error_theme_dark');
  } else {
    strMathResult.classList.add('calc__math-result_type_error');
  }
}

///////// Функционал вычисления квадратного корня
function mathCalcSquare(value) {
  const currentDisplay = strMathResult.textContent;
  const currentDisplayNum = parseFloat(currentDisplay);

  if (currentDisplay === '') {
    addClassError();
    strMathResult.textContent = 'Использован недопустимый формат'
  } else if (currentDisplayNum < 0) {
    strMathOperation.textContent = value + '(' + currentDisplay + ') =';
    addClassError();
    strMathResult.textContent = 'Нельзя вывести кв. корень из отрицательного числа!';
  } else {
    strMathOperation.textContent = value + '(' + currentDisplay + ') =';
    result = +(Math.sqrt(currentDisplayNum)).toFixed(9);
    strMathResult.textContent = result;
    shouldResetDisplay = true; // Устанавливаем флаг после вычисления
  }
}

///////// Вывод символов на дисплей калькулятора (при нажатии мышкой на кнопки экрана)
let result = ''; //объявляем переменную результат (объявляю тут, а не в теле функции mathCalc, т.к. дальше нужно для очистки дисплея калькулятора)

function addTooDisplay(value) {
  if (strMathResult.textContent === 'Использован недопустимый формат' 
    || 
    strMathResult.textContent === 'Нельзя вывести кв. корень из отрицательного числа!'
    || 
    strMathResult.textContent === 'Нельзя делить на ноль!') {
      clearDisplay();
  }

  const currentDisplay = strMathResult.textContent;

  // Если вводится цифра
  if (!isNaN(value)) {
    if (shouldResetDisplay || currentDisplay === '0' || currentDisplay === '') {
      strMathResult.textContent = value;
      shouldResetDisplay = false;
    } else {
      strMathResult.textContent += value;
    }
    return;
  }
  
  // Если вводится точка
  if (value === '.') {
    // Разбиваем текущее выражение по операторам
    const parts = currentDisplay.split(/([+\-*/%])/);
    const lastPart = parts[parts.length - 1];
    
    // Если нужно сбросить дисплей или это начало нового числа
    if (shouldResetDisplay || lastPart === '') {
      strMathResult.textContent += '0.';
      shouldResetDisplay = false;
    } 
    // Если в текущем числе еще нет точки
    else if (!lastPart.includes('.')) {
      strMathResult.textContent += '.';
    }
    return;
  }

  // Если вводится оператор
  if (['+', '-', '*', '/', '%'].includes(value)) {
    if (currentDisplay === '') {
      addClassError();
      strMathResult.textContent = 'Использован недопустимый формат';
      return;
    }
    
    // Заменяем последний оператор, если он есть
    const lastChar = currentDisplay.slice(-1);
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
      strMathResult.textContent = currentDisplay.slice(0, -1) + value;
    } else {
      strMathResult.textContent += value;
    }
    shouldResetDisplay = false;
    return;
  }
}

///////// Вычисление математического выражения
let btnEquals = document.querySelector('.calc__btn_type_equals');

function mathCalc() {
  let firstInputStr = strMathResult.textContent;
  strMathOperation.textContent = firstInputStr + ' =';
  let b = firstInputStr.match(/\%|\+|-|\*|\/|[0-9]*[.]?[0-9]+/g); //матчим

// let result = 0; //объявляем переменную результат

  // // работает! но только выполняет операции по порядку поступления
  // for (let i=0; i < b.length; i++) //крутимся пока индекс элемента массива меньше чем количество элементов массива
  //   {
  //     if (i===0) {
  //       result = parseFloat(b[i]);
  //     }
  //     console.log(result);
  //     if (b[i] === '%') {
  //       strMathOperation.textContent = b[i-1] + '%*' + b[i+1] + ' =';
  //       result = (parseFloat(b[i-1])/100)*parseFloat(b[i+1]);
  //     } else if (b[i] === '/') {
  //       if (b[i+1] === '0') {
  //         addClassError();
  //         result = 'Нельзя делить на ноль!';
  //         ++i;
  //       } else {
  //         result = parseFloat(b[i-1])/parseFloat(b[i+1]);
  //         ++i;
  //       }
  //     } else if (b[i] === '*') {
  //       result = result * parseFloat(b[i+1]);
  //       ++i;
  //     } else if (b[i] === '+') {
  //       result = result + parseFloat(b[i+1]);
  //       ++i;
  //     } else if (b[i] === '-') {
  //       result = result - parseFloat(b[i+1]);
  //       ++i;
  //     }             
  //   }

    if (b.includes('*') || b.includes('/')) {
      let arrayCalc = [];
      for (let i=0; i < b.length; i++)
      {
        if (b[i] === '*' || b[i] === '/') {
          if (b[i] === '*') {
            arrayCalc.splice(arrayCalc.length-1, 1, +(parseFloat(b[i-1])*parseFloat(b[i+1])).toFixed(9));
            ++i;
          } else {
            if (b[i+1] === '0') {
              addClassError();
              result = 'Нельзя делить на ноль!';
              arrayCalc = [];
              arrayCalc.push(result);
              ++i;
            } else {
              arrayCalc.splice(arrayCalc.length-1, 1, +(parseFloat(b[i-1])/parseFloat(b[i+1])).toFixed(9));
              ++i;
            }
          }
        } else {
          arrayCalc.push(b[i]);
        }
        for (let i=0; i < arrayCalc.length; i++) //крутимся пока индекс элемента массива меньше чем количество элементов массива
        {
          if (arrayCalc[i] === 'Нельзя делить на ноль!') {
            result = arrayCalc[i];
          } else {
            if (i===0) {
              if (arrayCalc[i] === '-') {
                result = parseFloat((-1)*arrayCalc[i+1]);
                ++i;
              } else {
                result = parseFloat(arrayCalc[i]);
              }
            }
            if (arrayCalc[i] === '+') {
              result = +(result + parseFloat(arrayCalc[i+1])).toFixed(9);
              ++i;
            } else if (arrayCalc[i] === '-') {
              result = +(result - parseFloat(arrayCalc[i+1])).toFixed(9);
              ++i;
            }  
          }            
        }
      }
    } else {
      for (let i=0; i < b.length; i++) //крутимся пока индекс элемента массива меньше чем количество элементов массива
      {
        if (i===0) {
          if (b[i] === '-') {
            result = parseFloat((-1)*b[i+1]);
            ++i;
          } else {
            result = parseFloat(b[i]);
          }
        }
        if (b[i] === '%') {
          strMathOperation.textContent = b[i-1] + '%*' + b[i+1] + ' =';
          result = (parseFloat(b[i-1])/100)*parseFloat(b[i+1]);
        } else if (b[i] === '+') {
          result = +(result + parseFloat(b[i+1])).toFixed(9);
          ++i;
        } else if (b[i] === '-') {
          result = +(result - parseFloat(b[i+1])).toFixed(9);
          ++i;
        }              
      }
    }
    strMathResult.textContent = result;
    shouldResetDisplay = true; // Устанавливаем флаг после вычисления
    return result;
}
