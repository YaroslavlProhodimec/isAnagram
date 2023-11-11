let firstWord = "Mary";
let secondWord = "Army";
function isAnagram(first, second) {
  let arr = [first, second];
  let newMap = {};

  return (
    first.toLowerCase().split("").sort().join() ===
    second.toLowerCase().split("").sort().join()
  );
}

console.log(isAnagram(firstWord, secondWord));
isIsomorphic("egg", "add"); // true
isIsomorphic("paper", "title"); // true
isIsomorphic("kick", "side"); // false

function isIsomorphic(firstString, secondString) {
  // проверка длины строк
  if (firstString.length !== secondString.length) return false;

  let letterMap = {};

  for (let i = 0; i < firstString.length; i++) {
    let letterA = firstString[i],
      letterB = secondString[i];

    // если такой буквы еще не было, сохранить ее в объекте
    // и поставить в соответствие с соответствующей буквой второго слова
    if (letterMap[letterA] === undefined) {
      letterMap[letterA] = letterB;
    } else if (letterMap[letterA] !== letterB) {
      // если соответствие для буквы уже установлено
      // и буква второго слова не соответствует
      // то строки не изоморфны
      return false;
    }
  }

  return true;
}

let str = "privet";
const upper = (input) => {
  let tmp = input[0].toUpperCase();
  return tmp + input.slice(1);
};
console.log(upper(str));
console.log("start");

const promise1 = new Promise((resolve, reject) => {
  console.log(1);
});

console.log("end");

function work(a, b) {
  // calls:function f() {
  //   return
  // }
  return console.log(a + b); // произвольная функция или метод
}

function spy(input) {
  // let hash = 0;
  function wrapper(...args) {
    wrapper.call.push(args);
    return input.apply(this, args);
  }
  wrapper.call = [];
  return wrapper;
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.call) {
  console.log("call:" + args.join()); // "call:1,2", "call:4,5"
}

intersection(firstArray, secondArray); // [2, 1]

function intersection(firstArray, secondArray) {
  let resultArr = {};
  let newArr = [];
  for (let i = 0; i < firstArray.length; i++) {
    let char = firstArray[i];
    resultArr[char] = resultArr[char] ? resultArr[char] : char;
  }
  for (let i = 0; i < secondArray.length; i++) {
    let char = secondArray[i];
    let count = resultArr[char];
    if (count && count > 0) {
      newArr.push(count);
    }
  }
  return [...new Set(newArr)];
}

let firstArray = [2, 2, 4, 1];
let secondArray = [1, 2, 0, 2];
function intersection(firstArray, secondArray) {
  let newArr = [];
  for (let i = 0; i < firstArray.length; i++) {
    let charOne = firstArray[i];
    let found = false;
    for (let j = 0; j < secondArray.length; j++) {
      let charTwo = secondArray[j];
      if (charOne === charTwo) {
        found = true;
        break;
      }
    }
    if (!found) {
      newArr.push(charOne);
    }
  }
  for (let i = 0; i < secondArray.length; i++) {
    let charOne = secondArray[i];
    let found = false;
    for (let j = 0; j < firstArray.length; j++) {
      let charTwo = firstArray[j];
      if (charOne === charTwo) {
        found = true;
        break;
      }
    }
    if (!found) {
      newArr.push(charOne);
    }
  }
  return [...new Set(newArr)];
}

console.log(intersection(firstArray, secondArray));

function fullName() {
  return "Hello, this is " + this.first + " " + this.last;
}

console.log(fullName());

function fullName() {
  return "Hello, this is " + this.first + " " + this.last;
}

console.log(fullName()); // => Hello this is

// привязка контекста
var person = { first: "Foo", last: "Bar" };
console.log(fullName.bind(person)()); // => Hello this is Foo Bar

function f(x) {
  console.log(x);
}

// const delay = (func, time) => {
//   function f1(x) {
//     return setTimeout(func.bind(this, x), time);
//   }
//   return f1;
// };

// создаём обёртки

const delay = (func, time) => {
  return function f1() {
    setTimeout(() => func.apply(this, arguments), 1000);
  };
};

let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // показывает "test" после 1000 мс
f1500("test"); // показывает "test" после 1500 мс

function debounce(func, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

let user = {
  firstName: "Вася",
  sayHi() {
    console.log(`Привет, ${this.firstName}!`);
  },
};

let sayHi1 = user.sayHi(); // (*)

sayHi1(); // Привет, Вася!

setTimeout(sayHi, 1000); // Привет, Вася!

function partial(func, ...argsBound) {
  return function (...args) {
    // (*)
    return func.call(this, ...argsBound, ...args);
  };
}

// использование:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  },
};

// добавляем частично применённый метод с фиксированным временем
user.sayNow = partial(
  user.say,
  new Date().getHours() + ":" + new Date().getMinutes(),
);

user.sayNow("Hello");
// Что-то вроде этого:
// [10:00] John: Hello!

function askPassword(ok, fail) {
  let password = "rockstar";
  if (password == "rockstar") ok();
}

let user = {
  name: "Вася",

  loginOk() {
    console.log(`${this.name} logged in`);
  },
};

// let privet = askPassword(user.loginOk, user.loginFail);
askPassword(user.loginOk);

function askPassword(ok, fail) {
  let password = "rockstar";
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: "John",

  login(result) {
    console.log(this.name + (result ? " logged in" : " failed to log in"));
  },
};

askPassword(user.login.call(user, true), user.login.call(user, false)); // ?
