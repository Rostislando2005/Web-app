// ===================== Задание 1 =====================
// (1+2)*(1+2+3)*...*(1+2+...+50)
// В переменной sum храним текущую сумму 1+2+...+i,
// на каждом шаге прибавляем к ней i и умножаем результат на эту сумму.
function task1() {
    let sum = 1;           // 1
    let product = 1;       // обычное число (приближённый результат)
    let productBig = 1n;   // BigInt (точный результат, т.к. число очень большое)

    for (let i = 2; i <= 50; i++) {
        sum = sum + i;                 // 1+2, 1+2+3, ...
        product = product * sum;
        productBig = productBig * BigInt(sum);
    }

    console.log("Задание 1. Результат (Number):", product);
    console.log("Задание 1. Точный результат (BigInt):", productBig.toString());

    document.getElementById("result1").innerHTML =
        "Результат: " + product + "<br>" +
        "Точное значение: " + productBig.toString();
}


// ===================== Задание 2 =====================

// Превращаем строку "1 2 3" в массив чисел без методов Array
function parseArray(text) {
    let parts = text.trim().split(" ");
    let arr = [];
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] !== "") {
            arr[arr.length] = Number(parts[i]);
        }
    }
    return arr;
}

// Часть А: произведение элементов между первым и последним элементами,
// для которых |x - PI| <= 0.00001. Методы Array не используем.
function partA(arr) {
    let first = -1;
    let last = -1;

    for (let i = 0; i < arr.length; i++) {
        if (Math.abs(arr[i] - Math.PI) <= 1e-5) {
            if (first === -1) {
                first = i;
            }
            last = i;
        }
    }

    if (first === -1) {
        return "нет элементов, близких к π";
    }
    if (last - first < 2) {
        return "между первым (индекс " + first + ") и последним (индекс " + last + ") элементами нет других элементов";
    }

    let product = 1;
    for (let i = first + 1; i < last; i++) {
        product = product * arr[i];
    }
    return "первый подходящий индекс " + first + ", последний " + last + ", произведение = " + product;
}

// Проверка для части Б: сумма цифр чётных разрядов == сумме цифр нечётных разрядов.
// Разряды считаем справа: единицы — 1-й (нечётный), десятки — 2-й (чётный) и т.д.
function isBalanced(n) {
    let oddSum = 0;
    let evenSum = 0;
    let position = 1;

    while (n > 0) {
        let digit = n % 10;
        if (position % 2 === 1) {
            oddSum = oddSum + digit;
        } else {
            evenSum = evenSum + digit;
        }
        n = Math.floor(n / 10);
        position++;
    }
    return oddSum === evenSum;
}

// Часть Б: удаляем такие элементы с помощью метода filter
function partB(arr) {
    return arr.filter(function (x) {
        let intPart = Math.abs(Math.trunc(x));   // модуль целой части
        return !isBalanced(intPart);             // оставляем только "несбалансированные"
    });
}

function task2() {
    let arr = parseArray(document.getElementById("array").value);
    let resultA = partA(arr);
    let resultB = partB(arr);

    console.log("Задание 2. Исходный массив:", arr);
    console.log("Часть А:", resultA);
    console.log("Часть Б:", resultB);

    document.getElementById("result2").innerHTML =
        "Исходный массив: [" + arr.join(", ") + "]<br>" +
        "Часть А: " + resultA + "<br>" +
        "Часть Б: [" + resultB.join(", ") + "]";
}


// ===================== Задание 4 =====================
// Слова состоят из одних и тех же букв, если после сортировки букв они совпадают
function sameLetters(word1, word2) {
    let a = word1.toLowerCase().split("").sort().join("");
    let b = word2.toLowerCase().split("").sort().join("");
    return a === b;
}

function task4() {
    let word1 = document.getElementById("word1").value.trim();
    let word2 = document.getElementById("word2").value.trim();
    let answer;

    if (sameLetters(word1, word2)) {
        answer = "Да, слова «" + word1 + "» и «" + word2 + "» состоят из одних и тех же букв";
    } else {
        answer = "Нет, слова «" + word1 + "» и «" + word2 + "» состоят из разных букв";
    }

    console.log("Задание 4.", answer);
    document.getElementById("result4").innerHTML = answer;
}


// Кнопки
document.getElementById("btn1").onclick = task1;
document.getElementById("btn2").onclick = task2;
document.getElementById("btn4").onclick = task4;
