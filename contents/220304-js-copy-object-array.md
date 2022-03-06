---
date: "2022-03-04"
title: "[JavaScript] 객체의 복사 / 배열의 복사"
category: "Language"
categoryColor: "darkorchid"
tags: ["JS"]
thumbnail: "./images/JavaScript.png"
---

이전 생각 포스팅에서 말했듯이 본격적으로 프론트엔드 학습을 시작한다.

우선 자바스크립트 지식부터 탄탄히 쌓자!

# 객체의 복사

💡 **원시 자료형과는 달리 객체를 복사할 때는 참조 방식이 쓰인다.**

```js
const car = {
  color: "red",
};
const secondCar = car;
```

위 코드에서 `secondCar`는 그 자체로 객체가 아니라 `car`에 대한 **참조, 즉 주소를 저장한다.**

`car.color`를 `"blue"`로 바꾸면? `secondCar` 또한 변경된다~ 이말이다.

<br />

```js
console.log(car == secondCar);  // true
console.log(car === secondCar); // true
```

위 코드와 같이 두 객체를 비교해보면 흥미로운 사실을 알 수 있다.

항등 연산자(`==`)를 사용하든, 완전 항등 연산자(`===`)를 사용하든 `true`가 반환된다.

즉, **두 객체가 동일**하다는 의미!

<br />

```js
const emptyObj1 = {};
const emptyObj2 = {};

console.log(emptyObj1 == emptyObj2);  // false
console.log(emptyObj1 === emptyObj2); // false

const emptyObj3 = {x: 2};
const emptyObj4 = {x: 2};

console.log(emptyObj1 == emptyObj2);  // false
console.log(emptyObj1 === emptyObj2); // false
```

반면, 위 코드와 같이 **빈 객체끼리 비교**하거나, **동일한 속성을 가진 객체끼리 비교**할 때는 `false`가 반환된다.

❗️ 동일한 객체를 비교할 때만 `ture`를 반환받을 수 있음을 볼 수 있다.

<br />

그렇다면 객체의 복사본을 어떻게 만들지..?

바로 **`Object.assign()`을 사용하는 방법이 있다!**

```js
const car = {
  color: "red",
};
const secondCar = Object.assign({}, car);

car.wheels = 4;

console.log(car);           
// {color: 'red', wheels: 4}
console.log(secondCar);
// {color: 'red'}
```

이렇게 하면 두 객체가 서로 영향을 주지 않는다.

<br />

`Object.assign()`를 사용할 때는, 

**첫 번째 인수**에 **복사본에 해당하는 객체**를 넣고, **두 번째 인수**에 **원본에 해당하는 객체**를 넣는다.

<br />

## 중첩 객체 복사

지금까진 객체의 모든 프로퍼티가 **원시값**인 경우만 가정했다.

**그런데 프로퍼티는 다른 객체에 대한 참조 값일 수도 있다!**

```js
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, 같은 객체이다.

user.sizes.width++;      
alert(clone.sizes.width); // 51
```

`user`와 `clone`는 `sizes`를 공유한다.

이 경우는 어떻게 할까..?

❗️ **이 문제를 해결하려면 `user[key]`의 각 값을 검사하면서, 그 값이 객체인 경우 객체의 구조도 복사해주는 반복문을 사용해야한다.**

이러한 방식을 **깊은 복사(deep cloning)** 이라 한다.

<br />

깊은 복사 시 사용되는 표준 알고리즘인 **Structured cloning algorithm**을 사용하면 위 사례를 비롯한 다양한 상황에서 객체를 복제할 수 있다.

자바스크립트 라이브러리 **lodash**의 메서드인 `_.cloneDeep(obj)`을 사용하면 **이 알고리즘을 직접 구현하지 않고도 깊은 복사를 처리할 수 있다!**

# 배열의 복사

```js
const veggie = ["tomato", "cucumber", "beans"];
const newVeggie = veggie;
```

위에서 `veggie` 배열의 복사본을 생성한 것처럼 보이지만, 아래 코드를 추가해 보자.

```js
veggie.push("peas");
console.log(veggie);
// ["tomato", "cucumber", "beans", "peas"]
console.log(newVeggie);
// ["tomato", "cucumber", "beans", "peas"]
```

기존 배열을 수정하자 새 배열도 변경되었다. 왜..?

💡 **실제로 복사본을 만든 것이 아니라, 새 배열은 단순히 이전 배열을 참조하기 때문이다!**

<br />

배열 또한 객체와 같이 방법이 다~ 있다.

먼저 ES5 및 이전 버전에서 일반적으로 배열의 복사본을 만드는 방법이다.

```js
const veggie = ["tomato", "cucumber", "beans"];
const newVeggie = [].concat(veggie);

veggie.push("peas");
console.log(veggie);
// ["tomato", "cucumber", "beans", "peas"]
console.log(newVeggie);
// ["tomato", "cucumber", "beans"]
```

**빈 배열을 새로 생성하고, `concat()`으로 기존 배열의 값을 새 배열에 이어 붙인다.**

<br />

**스프레드 문법**을 사용하면 동일한 결과를 얻을 수 있다.

```js
const veggie = ["tomato", "cucumber", "beans"];
const newVeggie = [...veggie];

veggie.push("peas");
console.log(veggie);
// ["tomato", "cucumber", "beans", "peas"]
console.log(newVeggie);
// ["tomato", "cucumber", "beans"]
```

**우선 배열을 할당하고, 그 내부에 스프레드 연산자를 통해 기존 배열의 모든 원소를 넣었다.**

<br />
<br />

JS에 대해 공부하면 할수록 객체 및 배열 복사에 대해 중요한 개념이 계속 나온다..

그래서 이 포스트에 내용을 몇번이나 더 추가한지 모르겠다.

그만큼 중요한 개념인 거겠지?

<br />
<br />

## ※ Source

📖 모던 자바스크립트 핵심 가이드