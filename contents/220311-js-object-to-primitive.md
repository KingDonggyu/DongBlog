---
date: "2022-03-11"
title: "[JavaScript] 객체의 형 변환"
category: "Language"
categoryColor: "darkorchid"
tags: ["JS"]
thumbnail: "./images/JavaScript.png"
---

**함수와 연산자에 전달되는 값은 대부분 적절한 자료형으로 변환한다.**

이러한 과정을 **"형 변환(type conversion)"** 이라 한다.

<br />

**원시형 자료는 문자, 숫자, 논리형으로 변환될 수 있다.**

예를 들어, `alert`이 전달받은 값의 자료형과 관계없이 이를 문자열로 자동 변환하여 보여주는 것이나,

수학 관련 연산자가 전달받은 값을 숫자로 변환하는 경우가 있다.

(이 외에, 전달받은 값을 의도를 갖고 원하는 타입으로 **변환(명시적 변환)** 해 주는 경우도 형 변환이라고 할 수 있다.)

<br />

그렇다면, 객체 또한 형 변환이 될까?

- `obj1 + obj2`처럼 객체끼리 더하는 연산을 하거나, `obj1 - obj2`처럼 객체끼리 빼는 연산을 하면 어떤 일이 일어날까?

- `alert(obj)`로 객체를 출력할 때는 무슨 일이 발생할까?

**이 모든 경우에 자동 형 변환이 일어난다! 객체는 원시값으로 변환되고, 그 후 의도한 연산이 수행된다.**

<br />

1. 객체는 논리 평가 시 단 하나의 **예외 없이 `true`를 반환한다.**

- 따라서 **객체는 숫자형이나 문자형으로만 형 변환이 일어난다.**

2. **숫자형으로의 형 변환**은 객체끼리 **빼는 연산**을 할 때나 **수학 관련 함수**를 적용할 때 일어난다.

- 예를 들어, 객체 `Date`끼리 차감하면 (`date1 - date2`) 두 날짜의 시간 차이가 반환된다.

3. **문자형으로의 형 변환**은 대개 `alert(obj)`같이 객**체를 출력**하려고 할 때 일어난다.

<br />

## ToPrimitive

특수 객체 메서드를 사용하면 숫자형이나 문자형으로의 형 변환을 원하는 대로 조절할 수 있다.

**객체 형 변환은 세 종류로 구분**되는데, **hint** 라 불리는 값이 구분 기준이 된다.

> hint = '목표로 하는 자료형'

- **hint가 `string`일 때**

`alert` 함수같이 문자열을 기대하는 연산을 수행할 때 (객체 - 문자형 변환)

```js
// 객체를 출력
alert(obj);

// 객체를 프로퍼티 키로 사용
anotherObj[obj] = 123;
```

<br />

- **hint가 `number`일 때**

수학 연산을 적용하려 할 때 (객체 - 숫자형 변환)

```js
// 명시적 형 변환
let num = Number(obj);

// (이항 덧셈 연산을 제외한) 수학 연산
let n = +obj;
let delta = date1 - date2;

// 대소 비교
let greater = user1 > user2;
```

<br />

- **hint가 `default`일 때**

연산자가 기대하는 자료형이 **확실치 않을 때** (아주 드물게 발생한다)

ex) **이항 덧셈 연산자 `+`** 는 피연산자의 자료형에 따라 **문자열을 합치는 연산을 할 수도 있고 숫자를 더해주는 연산을 할 수도 있다.** 따라서 `+`의 인수가 객체일 때는 hint가 `default`가 된다.

ex) **동등 연산자 `==`** 를 사용해 객체-문자형, 객체-숫자형, 객체-심볼형끼리 비교할 때, **객체를 어떤 자료형으로 바꿔야 할지 확신이 안 서므로** hint가 `default`가 된다.

```js
// 이항 덧셈 연산
let total = obj1 + obj2;

// obj == number 연산
if (user == 1) { ... };
```

비교 연산자 `<`, `>` 도 피연산자에 문자형과 숫자형 둘 다 허용하지만, 이 연산자들은 **hint를 `number`로 고정한다.**

이는 하위 호환성 때문에 정해진 규칙이다.

> `Date` 객체를 제외한 모든 내장 객체는 hint가 `default`인 경우와 `number`인 경우를 동일하게 처리한다.

> `boolean` hint는 존재하지 않는다. 게다가 내장 객체에 사용되는 규칙을 따지면, **결국엔 두 종류의 형 변환(객체-문자형, 객체-숫자형)만 남게 된다.**

<br />

자바스크립트는 형 변환이 필요할 때, 아래와 같은 **알고리즘에 따라 원하는 메서드를 찾고 호출한다.**

1. 객체에 `obj[Symbol.toPrimitive](hint)`메서드가 있는지 찾고, 있다면 메서드를 호출한다.

- `Symbol.toPrimitive`는 시스템 심볼로, 심볼형 키로 사용된다.

2. 1에 해당되지 않고 hint가 `String`이라면,

- `obj.toString()`이나 `obj.valueOf()`를 호출한다. (존재하는 메서드만 실행됨)

3. 1과 2에 해당하지 않고, hint가 `number`나 `default`라면

- `obj.valueOf()`나 `obj.toString()`을 호출한다. (존재하는 메서드만 실행됨)

<br />

## Symbol.toPrimitive

첫번째 메서드부터 살펴보자.

자바스크립트엔 `Symbol.toPrimitive`라는 **내장 심볼**이 존재하는데, 이 심볼은 아래와 같이 목표로 하는 자료형(hint)을 명명하는 데 사용된다.

```js
obj[Symbol.toPrimitive] = function (hint) {
  // 반드시 원시값을 반환
  // hint는 "string", "number", "default" 중 하나
};
```

아래는 `user` 객체에 **객체-원시형 변환 메서드** `obj[Symbol.toPrimitive](hint)`를 구현한 것이다.

```js
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  },
};

alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

이렇게 메서드를 구현해 놓으면 `user`는 hint에 따라 문자열로 변환되기도 하고, 숫자로 변환되기도 한다.

`user[Symbol.toPrimitive]`를 사용하면 메서드 하나로 모든 종류의 형 변환을 다룰 수 있다.

<br />

## toString과 valueOf

`toString`과 `valueOf`는 심볼이 생기기 이전부터 존재해 왔던 ‘평범한’ 메서드이다.

이 메서드를 이용하면 '구식’이긴 하지만 형 변환을 직접 구현할 수 있다.

**객체에 `Symbol.toPrimitive`가 없으면 자바스크립트는 아래 규칙에 따라 `toString`이나 `valueOf`를 호출한다.**

- **hint가 `string`인 경우**: `toString` -> `valueOf` 순

  (`toString`이 있다면 `toString`을 호출, `toString`이 없다면 `valueOf`를 호출)

- **그 외**: `valueOf` -> `toString` 순

<br />

**이 메서드들은 반드시 원시값을 반환해야한다.**

`toString`이나 `valueOf`가 객체를 반환하면 그 결과는 무시된다. (마치 메서드가 처음부터 없었던 것처럼)

**일반 객체는 기본적으로 `toString`과 `valueOf`에 적용되는 다음 규칙을 따른다.** 

- `toString`은 문자열 `"[object Object]"`을 반환.

- `valueOf`는 객체 자신을 반환.

```js
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

이런 이유 때문에 `alert`에 객체를 넘기면 `[object Object]`이 출력되는 것이다.

`valueOf`는 객체 자신을 반환하기 때문에 그 결과가 무시된다. (그냥 이 메서드가 존재하지 않는다고 생각하면 된다)

<br />

아래는 이 메서드들을 사용한 예시이다.

```js
let user = {
  name: "John",
  money: 1000,

  // hint가 "string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // hint가 "number"나 "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

출력 결과가 `Symbol.toPrimitive`를 사용한 예제와 완전히 동일하다는 걸 확인할 수 있다.

<br />

그런데 간혹 모**든 형 변환을 한 곳에서 처리해야 하는 경우**도 생긴다.. 

이럴 땐 `toString`만 구현해 주면 된다!

<br />

## 반환 타입

위에서 설명한 세 개의 메서드는 **hint에 명시된 자료형으로의 형 변환을 보장해 주지 않는다.**

무슨 말이냐~ 하면!

<br />

`toString()`이 항상 문자열을 반환하리라는 보장이 없고, `Symbol.toPrimitive`의 hint가 `number`일 때 항상 숫자형 자료가 반환되리라는 보장이 없다는 것이다.

확신할 수 있는 단 한 가지는 **객체가 아닌 원시값을 반환해 준다는 것** 뿐이다.

> `toString`이나 `valueOf`가 객체를 반환해도 에러가 발생하지 않는다. 다만 이때는 **반환 값이 무시되고, 메서드 자체가 존재하지 않았던 것처럼 동작한다.** 이유는 과거 자바스크립트엔 '에러’라는 개념이 잘 정립되어있지 않았기 때문이다.

(`Symbol.toPrimitive`는 무조건 원시자료를 반환해야 한다. 그렇지 않으면 에러가 발생한다.)

<br />

## 추가 형 변환

지금까지 살펴본 바와 같이 상당수의 연산자와 함수가 피연산자의 형을 변환시킨다. 

ex) 곱셈을 해주는 연산자 `*`는 피연산자를 숫자형으로 변환시킨다.

<br />

**객체가 피연산자일 때**는 다음과 같은 단계를 거쳐 형 변환이 일어난다.

1. 객체는 원시형으로 변환된다. 

2. **변환 후 원시값이 원하는 형이 아닌 경우엔 또 다시 형 변환이 일어난다.**

```js
let obj = {
  // 다른 메서드가 없으면 toString에서 모든 형 변환을 처리
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4
```

1. `obj * 2`에선 **객체가 원시형으로 변화**되므로 `toString`에 의해 `obj`는 문자열 `"2"`가 된다.

2. 곱셈 연산은 **문자열은 숫자형으로 변환**시키므로 `"2" * 2`는 `2 * 2`가 된다.

<br />
<br />

이러한 자유로운 형 변환은 오히려 의도하지 않은 에러를 발생시킬 수 있지 않을까?

그래서 타입스크립트를 사용하는 것인가..?

언제쯤 타입스크립트를 공부해볼 수 있을까..

<br />

## ※ Source

🖥 ko.javascript.info