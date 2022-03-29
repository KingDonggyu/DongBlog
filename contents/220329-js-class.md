---
date: "2022-03-29T13:15"
title: "[JavaScript] 클래스"
category: "Language"
categoryColor: "#25e5bd"
tags: ["JS"]
---

드디어 클래스다!

클래스에 대해서 이미 어느정도 잘 알고 있긴 하지만, 중요한 개념이므로 복습 겸 다루도록 하겠다.

<br />

실무에서 동일한 종류의 객체를 여러 개 생성해야 하는 경우가 많다.

이럴 때 `new function`을 사용할 수 있다.

여기에 더하여 모던 자바스크립트에 도입된 `클래스(class)`라는 문법을 사용하면 **객체 지향 프로그래밍**에서 사용되는 다양한 기능을 자바스크립트에서도 사용할 수 있다.

<br />

클래스는 다음과 같은 기본 문법을 사용해 만들 수 있다.

```js
class MyClass {
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

이렇게 클래스를 만들고, new MyClass()를 호출하면 내부에서 정의한 메서드가 들어 있는 객체가 생성된다.

객체의 기본 상태를 설정해주는 **생성자 메서드 `constructor()`** 는 new에 의해 자동으로 호출되므로, 특별한 절차 없이 객체를 초기화 할 수 있다.

```js
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}

let user = new User("Peter");
user.sayHi(); // Peter

alert(typeof User); // function
```

위 예시에서 클래스를 통해 새로운 객체를 생성하여, 넘겨받은 인수와 함께 `constructor`가 자동으로 실행되고 인수가 `this.name`에 할당된다.

그런데 여기서 이상한 점!

`User` 클래스의 타입을 출력했더니 `function`이라 나왔ㄷ..?

<br />

❗️ 사실 **자바스크립트에서 클래스는 함수의 한 종류이다.**

위 예시의 `class User {...}` 문법 구조가 진짜 하는 일은 다음과 같다.

**1. `User`라는 이름을 가진 함수를 만든다.** 

함수 본문은 생성자 메서드 `constructor`에서 가져오며, 생성자 메서드가 없으면 본문이 비워진 채로 함수가 만들어진다.

**2. `sayHi`같은 클래스 내에서 정의한 메서드를 `User.prototype`에 저장한다.**

<br />

`new User`를 호출해 객체를 만들고 객체의 메서드를 호출하면, 메서드를 `prototype` 프로퍼티를 통해 가져온다.

이 과정이 있기 때문에 객체에서 클래스 메서드에 접근할 수 있다.

`class User` 선언 결과를 그림으로 나타내면 아래와 같다.

```
 User                                  User.prototype
|-----------------------|             |-------------------|
| constructor(name) {   |  prototype  | sayHi: function   |
|     this.name = name; | ----------> | constructor: User |
| }                     |             |                   |
|-----------------------|             |-------------------|
```

아래 예시를 보면 더 이해할 수 있을 것이다!

```js
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}

alert(typeof User); // function
alert(User === User.prototype.constructor); // true
alert(User.prototype.sayHi); // alert(this.name);
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

<br />

그럼 이런 클래스 역할을 하는 함수를 그냥 선언해서 쓰면 안됨?

클래스는 그저 '편의 문법'에 불과한거 같은데?

> 기능은 동일하나 기존 문법을 쉽게 읽을 수 있게 만든 문법을 편의 문법(syntactic sugar, 문법 설탕)이라 한다.

**No! 클래스는 단순한 편의 문법이 아니다!**

**1. `class`로 만든 함수엔 특수 내부 프로퍼티인 `[[IsClassConstructor]]: true`가 이름표처럼 붙는다.**

자바스크립트는 이를 다양한 경우에 활용한다. 아래 예시를 보자.

```js
class User {
  constructor() {}
}

alert(typeof User); // fuction
User(); // Error
```

`User`의 타입은 함수이지만, 그냥 호출할 수 없다!

클래스 생성자를 `new`와 함께 호출하지 않으면 에러가 발생하는데 이 때 `[[IsClassConstructor]]: true`가 사용되는 것이다.

<br />

**2. 클래스에 정의된 메서드는 열거할 수 없다(non-enumerable).**

클래스의 `prototype` 프로퍼티에 추가된 메서드의 `enumerable` 플래그는 `false`이다.

이는 `for..in`으로 객체를 순회할 때, 메서드는 순회 대상에서 제외하고자 하는 경우가 많으므로 이 특징은 꽤 유용하다.

<br />

**3. 클래스는 항상 엄격 모드로 실행된다(`use strict`).**

클래스 생성자 안 코드 전체엔 자동으로 엄격 모드가 적용된다.

<br />

## 클래스 표현식

이렇게 그저 함수를 선언하는 방법과 차이점이 있지만, 함수처럼 클래스도 **다른 표현식 내부에서 정의, 전달, 반환, 할당할 수 있다.**

```js
let User = class MyClass {
  sayHi() {
    alert(MyClass);
  }
};
```

기명 함수 표현식(Named Function Expression)과 유사하게 클래스 표현식에도 이름을 붙일 수 있고, 이 이름은 오직 클래스 내부에서만 사용할 수 있다.

```js
function makeClass(phrase) {
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}
```

또, 필요에 따라 클래스를 동적으로 생성하는 것도 가능하다.

<br />

## getter와 setter

리터럴을 사용해 만든 객체처럼 클래스도 **getter나 setter, 계산된 프로퍼티(computed property)를 지원한다!**

```js
class User {
  constructor(name) {
    // setter 활성화
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (value.length < 4) {
      alert("이름이 너무 짧습니다.");
      return;
    }
    this._name = value;
  }
}

let user = new User("동규");
alert(user.name); // 동규

user = new User(""); // 이름이 너무 짧습니다.
```

**이때, getter와 setter는 `User.prototype`에 정의된다!!**

<br />

## 클래스 필드

지금까지 메서드만 있는 예시만 살펴보았다.

**'클래스 필드(class field)'** 라는 문법을 사용하면 **어떤 종류의 프로퍼티도 클래스에 추가할 수 있다.**

```js
class User {
  name = "동규";
  sayHi() {
    alert(`${this.name}님 안녕하세요!`);
  }
}

let user = new User();
user.sayHi(); // 동규님 안녕하세요!
alert(user.name); // 동규
alert(User.prototype.name); // undefined
```

클래스를 정의할 때 '<프로퍼티 이름> = <값>'을 써주면 간단히 클래스 필드를 만들 수 있다.

이때, 클래스 필드의 중요한 특징 중 하나는 **`User.prototype`이 아닌 개별 객체에만 클래스 필드가 설정된다**는 점이다!

<br />

## 바인딩

<a href="/220326-js-bind">[JavaScript] 함수 바인딩</a>에서 다루었듯이 자바스크립트에서 `this`는 동적으로 결정된다.

따라서 객체 메서드를 여기저기 전달해 전혀 다른 컨텍스트에서 호출하게 되면 `this`는 메서드가 정의된 객체를 참조하지 않는다.

```js
class Button {
  constructor(value) {
    this.value = value;
  }
  click() {
    alert(this.value);
  }
}

let button = new Button("안녕하세요.");
setTimeout(button.click, 1000); // undefined
```

이 문제를 해결하는 방법은 <a href="/220326-js-bind">[JavaScript] 함수 바인딩</a>에서 알아보았다.

1. `setTimeout(() => button.click(), 1000)` 같이 래퍼 함수를 전달하기

2. 생성자 안 등에서 메서드를 객체에 바인딩하기

<br />

이 두 방법 말고 **클래스 필드를 사용해도 문제를 해결할 수 있다!**

```js
class Button {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    alert(this.value);
  };
}

let button = new Button("안녕하세요.");
setTimeout(button.click, 1000); // 안녕하세요.
```

클래스 필드 `click = () => {...}`는 각 `Button` 객체마다 독립적인 함수를 만들어주고 이 함수의 `this`를 해당 객체에 바인딩시켜준다.

따라서 개발자는 `button.click`을 아무 곳에나 전달할 수 있고, `this`엔 항상 의도한 값이 들어가게 된다.

하지만! 이는 단점도 존재한다..

<br />

```js
...

alert(Object.getOwnPropertyNames(Button.prototype)); // constructor
```

위 코드 실행 시 `click` 함수는 출력되지 않았다. 원인은 아래와 같다.

<br />

❗️ **화살표함수는 기본적으로 `prototype`을 생성하지 않기에, `class명.prototype`으로 접근이 불가하다!**

이로 인해 프로토타입이 없으니 상속도 되지 않고, 테스트 케이스 작성 시에도 문제가 발생할 수 있다.

때문에 명확한 목적을 가지고 사용하는 경우를 제외하고는, 가급적 **화살표 함수의 `class` 내 사용은 지양**하는 것이 좋겠다.

<br />
<br />

클래스의 가장 기본적인 개념에 대해 알아보았다.

이번 포스팅에서 클래스 상속에 관한 내용도 함께 다루려 했지만, 상속은 중요한 개념이 너무 많다..

<br />

## ※ Source

🖥 ko.javascript.info