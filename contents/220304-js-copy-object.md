---
date: "2022-03-04"
title: "[JavaScript] 객체의 복사"
category: "Language"
categoryColor: "darkorchid"
tags: ["JS"]
thumbnail: "./images/JavaScript.png"
---

이전 생각 포스팅에서 말했듯이 본격적으로 프론트엔드 학습을 시작한다.

우선 자바스크립트 지식부터 탄탄히 쌓자!

<br />

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

당연하지만 중요한 개념! 첫 JS 포스팅이므로 가볍게 시작해본다 😁

어서 리액트도 다시 깊게 공부하고 싶다..

<br />
<br />

## ※ Source

📖 모던 자바스크립트 핵심 가이드