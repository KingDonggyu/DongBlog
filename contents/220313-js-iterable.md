---
date: "2022-03-13"
title: "[JavaScript] Iterable"
category: "Language"
categoryColor: "#25e5bd"
tags: ["JS"]
thumbnail: "./images/JavaScript.png"
---

💡 **반복 가능한(iterable, 이터러블) 객체는 배열을 일반화한 객체이다.**

이터러블 이라는 개념을 사용하면 **어떤 객체에든 `for..of` 반복문을 적용할 수 있다.**

<br />

배열은 대표적인 이터러블이다. 

배열 외에도 다수의 내장 객체가 반복 가능하다. (문자열 역시 이터러블의 예이다)

**배열이 아닌 객체가 있는데,** 이 객체가 어떤 것들의 컬렉션(목록, 집합 등)을 나타내고 있는 경우, 

`for..of` 문법을 적용할 수만 있다면 컬렉션을 순회하는데 유용할 것이다!

이게 가능하도록 하려면 어떻게 해야할까?

<br />

## Symbol.iterator

```js
let range = {
  from: 1,
  to: 5
};

// 목표: for(let num of range) ... num = 1,2,3,4,5
```

위 `range`를 이터러블로 만들려면, 즉 **`for..of`가 동작하도록 하려면** 객체에 `Symbol.iterator`(특수 내장 심볼)라는 메서드를 추가해야 한다.

그렇게 하면 아래와 같은 일이 벌어진다.

<br />

**1. `for..of`가 시작되자마자 `for..of`는 `Symbol.iterator`를 호출한다.**

- `Symbol.iterator`가 없으면 에러가 발생한다.

- `Symbol.iterator`는 반드시 이터레이터(iterator, 메서드 `next`가 있는 객체)를 반환해야 한다.

**2. 이후 `for..of`는 반환된 객체(이터레이터)만을 대상으로 동작한다.**

**3. `for..of`에 다음 값이 필요하면, `for..of`는 이터레이터의 `next()`를 호출한다.**

**4. `next()`의 반환 값은 `{done: Boolean, value: any}`와 같은 형태여야 한다.**

- `done = true`는 반복이 종료되었음을 의미한다.

- `done = false` 일땐 `value`에 다음 값이 저장된다.

<br />

```js
let range = {
    from: 1,
    to: 5
};

range[Symbol.iterator] = function() {
    return {
        current: this.from,
        last: this.to,

        next() {
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
        }
    };
};

for (let num of range) {
    console.log(num);  // 1, 2, 3, 4, 5
}
```

이터러블 객체의 핵심은 **'관심사의 분리(Separation of concern, SoC)'** 에 있다.

- `range`엔 메서드 `next()`가 없다.

- 대신 `range[Symbol.iterator]()`를 호출해서 만든 이터레이터 객체와 이 객체의 메서드 `next()`에서 반복에 사용될 값을 만들어낸다.

<br />

이렇게 하면 이터레이터 객체와 반복 대상인 객체를 분리할 수 있다!

아래와 같이 이터레이터 객체와 반복 대상 객체를 합쳐서 `range` 자체를 이터레이터로 만들면 코드가 더 간단해진다.

```js
let range ={
    from: 1,
    to: 5,

    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },

    next() {
        if (this.current <= this.to) {
            return { done: false, value: this.current++ }
        } else {
            return { done: true };
        }
    }
};

for (let num of range) {
    console.log(num);
}
```

이제 `range[Symbol.iterator]()`가 객체 `range` 자체를 반환한다.

**반환된 객체엔 필수 메서드인 `next()`가 있고,** `this.current`에 반복이 얼마나 진행되었는지를 나타낸는 값도 저장되어 있다.

하지만!

단점은 두 개의 `for..of` 반복문을 하나의 객체에 동시에 사용할 수 없다..

**이터레이터(객체 자신)가 하나뿐이어서 두 반복문이 반복 상태를 공유하기 때문이다.**

> `range.to`에 `Infinity`를 할당하면 무한 반복도 가능하다.

<br />

## iterator를 명시적으로 호출하기

```js
let str = "Hello";
let iterator = str[Symbol.iterator]();

while(true) {
    let result = iterator.next();
    if (result.done) break;
    console.log(result.value);  // H, e, l, l, o
}
```

이터레이터를 명시적으로 호출하는 경우는 거의 없지만,

**이 방법을 사용하면 `for..of`를 사용하는 것보다 반복 과정을 더 잘 통제할 수 있다는 장점이 있다.**

- 반복을 시작했다가 잠시 멈춰 다른 작업을 하다가 다시 반복을 시작하는 것과 같이 반복 과정을 여러 개로 쪼개는 것이 가능하다.

<br />

## iterable과 유사 배열

- **이터러블(iterable)** : 위에서 설명한 바와 같이 메서드 `Symbol.iterator`가 구현된 객체이다.

- **유사 배열(array-like)** : 인덱스와 `length` 프로퍼티가 있어서 배열처럼 보이는 객체이다.

위 두 용어는 비슷해보이지만 아주 다르다. (헷갈리지 않으려면 잘 이해하자..)

<br />

브라우저 등의 호스트 환경에서 자바스크립트를 사용해 문제를 해결할 때 이터러블 객체나 유사 배열 객체 또는 둘 다인 객체를 만날 수 있다!

이터러블 객체(`for..of` 를 사용할 수 있음)이면서 유사배열 객체(숫자 인덱스와 `length` 프로퍼티가 있음)인 **문자열**이 대표적인 예다.

<br />

이터러블 객체라고 해서 유사 배열 객체는 아니다.

유사 배열 객체라고 해서 이터러블 객체인 것도 아니다.

- 위 예시의 `range`는 이터러블 객체이긴 하지만 인덱스도 없고 `length` 프로퍼티도 없으므로 유사 배열 객체가 아니다.

- (아래 예시의 객체는 유사 배열 객체이긴 하지만 이터러블 객체가 아니다.)

```js
let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
};

for (let item of arrayLike) {}
```

`arrayLike` 객체에 `Symbol.iterator`가 없으므로 에러가 발생한다.

<br />

이터러블과 유사 배열은 대게 배열이 아니기 때문에 `push`, `pop` 등의 메서드를 지원하지 않는다.

어떻게 하면 이터러블과 유사 배열에 배열 메서드를 적용할 수 있을까..?

<br />

## Array.from

**`Array.from`는 이터러블이나 유사 배열을 받아 '진짜' `Array`를 만들어준다!**

이 과정을 거치면 이터러블과 유사 배열에 배열메서드를 사용할 수 있다.

```js
let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
};

let arr = Array.from(arrayLike);
console.log(arr.pop());  // World
```

**`Array.from`은 객체를 받아 이터러블이나 유사 배열인지 조사한다.**

- 넘겨 받은 인수가 이터러블이나 유사 배열인 경우, 새로운 배열을 만들고 객체의 모든 요소를 새롭게 만든 배열로 복사한다.

<br />

아래는 이터러블을 인수로 사용한 예시이다.

```js
let range ={
    from: 1,
    to: 5,

    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },

    next() {
        if (this.current <= this.to) {
            return { done: false, value: this.current++ }
        } else {
            return { done: true };
        }
    }
};

let arr = Array.from(range);
console.log(arr);  // 1, 2, 3, 4, 5 
```

<br />

또, `Array.fom`엔 매핑(mapping) 함수를 선택적으로 넘겨줄 수 있다.

```js
let arr = Array.from(range, num => num * num);
console.log(arr); // 1,4,9,16,25
```

<br />
<br />

## ※ Source

🖥 ko.javascript.info