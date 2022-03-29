---
date: "2022-03-29T15:00"
title: "[JavaScript] 클래스 상속"
category: "Language"
categoryColor: "#25e5bd"
tags: ["JS"]
---

클래스의 🌸 상속!

클래스 상속을 사용하면 클래스를 다른 클래스로 확장할 수 있다!

기존에 존재하던 기능을 토대로 새로운 기능을 만들 수 있는 것이다.

<br />

먼저 `Animal` 클래스를 만들어보겠다.

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} 은/는 속도 ${this.speed}로 달립니다.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} 이/가 멈췄습니다.`);
  }
}

let animal = new Animal("동물");
```

이때, 클래스 `Animal`과 `new Animal`(`animal`)의 `prototype` 프로퍼티는 `Animal.prototype` 객체를 가리킨다.

다음 다른 클래스 `Rabbit` 만들어보겠다.

```js
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} 이/가 숨었습니다!`);
  }
}

let rabbit = new Rabbit("흰 토끼");

rabbit.run(5); // 흰 토끼 은/는 속도 5로 달립니다.
rabbit.hide(); // 흰 토끼 이/가 숨었습니다!
```

**클래스 확장 문법 `class Child extends Parent`를 사용해 클래스를 확장했다.**

클래스 `Rabbit`을 사용해 만든 객체는 `rabbit.hide()` 같은 `Rabbit`에 정의된 메서드에도 접근할 수 있고, `rabbit.run()` 같은 `Animal`에 정의된 메서드에도 접근할 수 있다!

<br />

**이때, 키워드 `extends`는 프로토타입을 기반으로 동작한다.**

- `extends`는 `Rabbit.prototype.[[Prototype]]`을 `Animal.prototype`으로 설정한다.

- 그렇기 때문에 `Rabbit.prototype`에서 메서드를 찾지 못하면 `Animal.prototype`에서 메서드를 가져온다.

아래는 이를 표현한 그림이다.

<br />

<div style="text-align:center">
  <img src="https://user-images.githubusercontent.com/31977543/91142203-5a01ec80-e6eb-11ea-9ee5-bac6b2ca57e6.png">
</div>

<br />

위 그림과 같이 엔진은 다음 절차를 따라 메서드 `rabbit.run`의 존재를 확인한다.

1. 객체 `rabbit`에 `run`이 있나 확인한다.

2. `rabbit`의 프로토타입인 `Rabbit.prototype`에 메서드가 있나 확인한다.

3. `extends`를 통해 관계가 만들어진 `Rabbit.prototype`의 프로토타입, `Animal.prototype`에 메서드가 있나 확인한다.

<a href="/220328-js-prototype/">[JavaScript] 프로토타입</a>에서 알아본 것처럼 자바스크립트 내장 객체는 프로토타입을 기반으로 상속 관계를 맺는다.

<br />

💡 `extends` 뒤에 표현식이 올 수도 있다.

```js
function f(phrase) {
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}

class User extends f("Hello") {}

new User().sayHi(); // Hello
```

이 방법은 조건에 따라 다른 클래스를 상속받고 싶을 때 유용하다.

조건에 따라 다른 클래스를 반환하는 함수를 만들고, 함수 호출 결과를 상속받게 하면 된다.

<br />

## 메서드 오버라이딩

이제 한발 더 나아가 메서드를 오버라이딩 해보자.

특별한 사항이 없으면 `class Rabbit`은 `class Animal`에 있는 메서드를 ‘그대로’ 상속받는다.

그런데 `Rabbit`에서 `stop()` 등의 메서드를 자체적으로 정의하면, 상속받은 메서드가 아닌 자체 메서드가 사용된다.

<br />

가끔 **부모 메서드 전체를 교체하지 않고, 부모 메서드를 토대로 일부 기능만 변경하거나 기능을 확장하고 싶을 때가 생긴다.**

이럴 때 커스텀 메서드를 만들어 작업하게 되는데, 이미 커스텀 메서드를 만들었더라도 이 과정 전·후에 부모 메서드를 호출하고 싶을 때가 있다.

<br />

키워드 `super`는 이럴 때 사용한다.

- `super.method(...)`는 부모 클래스에 정의된 메서드, `method`를 호출한다.

- `super(...)`는 부모 생성자를 호출하는데, 자식 생성자 내부에서만 사용 할 수 있다.

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    alert(`${this.name}가 속도 ${this.speed}로 달립니다.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name}가 멈췄습니다.`);
  }
}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name}가 숨었습니다!`);
  }

  stop() {
    super.stop(); // 부모 클래스의 stop을 호출해 멈추고,
    this.hide(); // 숨습니다.
  }
}

let rabbit = new Rabbit("흰 토끼");

rabbit.run(5); // 흰 토끼가 속도 5로 달립니다.
rabbit.stop(); // 흰 토끼가 멈췄습니다. 흰 토끼가 숨었습니다!
```

`Rabbit`은 이제 실행 중간에 부모 클래스에 정의된 메서드 `super.stop()`을 호출하는 `stop`을 가지게 되었다.

<br />

## 생성자 오버라이딩

생성자 오버라이딩은 좀 더 까다롭다.

지금까진 `Rabbit`에 자체 `constructor`가 없었다.

클래스가 다른 클래스를 상속받고 `constructor`가 없는 경우엔 아래처럼 **비어있는** `constructor`가 만들어진다.

```js
class Rabbit extends Animal {
  constructor(...args) {
    super(...args);
  }
}
```

보이다시피 생성자는 기본적으로 부모 `constructor`를 호출한다.

이때 부모 `constructor`에도 인수를 모두 전달한다.

**클래스에 자체 생성자가 없는 경우**엔 이런 일이 모두 자동으로 일어나는 것이다.

이제 `Rabbit`에 커스텀 생성자를 추가해보겠다.

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {
  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }
  // ...
}

let rabbit = new Rabbit("흰 토끼", 10); // Error
```

에러 발생..? 무엇이 잘못된 것일까..

이유는 다음과 같다.

<br />

**상속 클래스의 생성자에선 반드시 `super(...)`를 호출해야 하는데, `super(...)`를 호출하지 않아 에러가 발생했다.**

**`super(...)`는 `this`를 사용하기 전에 반드시 호출해야 한다.**

왜? 왜 해줘야 함?

<br />

상속 클래스의 생성자가 호출될 때 어떤 일이 일어나는지 알아보며 이유를 찾아보자.

- **자바스크립트는 상속 클래스의 생성자 함수(derived constructor)와 그렇지 않은 생성자 함수를 구분한다.**

  - 상속 클래스의 생성자 함수엔 특수 내부 프로퍼티인 `[[ConstructorKind]]:"derived"`가 이름표처럼 붙는다.

- 일반 클래스의 생성자 함수와 상속 클래스의 생성자 함수 간 차이는 `new`와 함께 드러난다.

  - 일반 클래스가 new와 함께 실행되면, 빈 객체가 만들어지고 this에 이 객체를 할당한다.

  - 반면, 상속 클래스의 생성자 함수가 실행되면, 일반 클래스에서 일어난 일이 일어나지 않는다.

  - **상속 클래스의 생성자 함수는 빈 객체를 만들고 `this`에 이 객체를 할당하는 일을 부모 클래스의 생성자가 처리해주길 기대한다.**

이런 차이 때문에 상속 클래스의 생성자에선 `super`를 호출해 부모 생성자를 실행해 주어야 한다.

그렇지 않으면 `this`가 될 객체가 만들어지지 않아 에러가 발생하는 것이다.

<br />

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }
  // ...
}

let rabbit = new Rabbit("흰 토끼", 10);
alert(rabbit.name); // 흰 토끼
alert(rabbit.earLength); // 10
```

이제 에러 없이 동작한다!

<br />

❗️ 주의사항! **부모 생성자는 자식 클래스에서 오버라이딩한 값이 아닌, 부모 클래스 안의 필드 값을 사용한다.**

```js
class Animal {
  name = 'animal'
  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';
}

new Animal(); // animal
new Rabbit(); // animal
```

상속을 받고 필드 값을 오버라이딩했는데 새로운 값 대신 부모 클래스 안에 있는 기존 필드 값을 사용하다니.. 

이 상황을 메서드와 비교해 생각해보자.

```js
class Animal {
  showName() { 
    alert('animal');
  }

  constructor() {
    this.showName();
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit');
  }
}

new Animal(); // animal
new Rabbit(); // rabbit
```

위와 같이 자식 클래스에서 부모 생성자를 호출하면 오버라이딩한 메서드가 실행되어야 한다. 이게 우리가 원하던 결과!

그런데 클래스 필드는 자식 클래스에서 필드를 오버라이딩해도 부모 생성자가 오버라이딩한 필드 값을 사용하지 않았다. 

**부모 생성자는 항상 부모 클래스에 있는 필드의 값을 사용한다.**

왜???

<br />

**이유는 필드 초기화 순서 때문이다!**

클래스 필드는 다음과 같은 규칙에 따라 초기화 순서가 달라진다.

- **아무것도 상속받지 않는 베이스 클래스는 생성자 실행 이전에 초기화된다.**

- **부모 클래스가 있는 경우엔 super() 실행 직후에 초기화된다.**

<br />

위 예시에서 `Rabbit`은 하위 클래스이고 `constructor()`가 정의되어 있지 않다. 이런 경우 앞서 설명한 바와 같이 생성자는 비어있는데 그 안에 `super(...args)`만 있다고 보면 된다.

따라서 `new Rabbit()`을 실행하면 `super()`가 호출되고 그 결과 부모 생성자가 실행된다.

그런데 이때 하위 클래스 필드 초기화 순서에 따라 하위 클래스 `Rabbit`의 필드는 `super()` 실행 후에 초기화된다.

**부모 생성자가 실행되는 시점에 `Rabbit`의 필드는 아직 존재하지 않고, 이런 이유로 필드를 오버라이딩 했을 때 `Animal`에 있는 필드가 사용된 것이다.**

<br />

다행히도 이런 문제는 오버라이딩한 필드를 부모 생성자에서 사용할 때만 발생한다.

💡 **그러니 개발하다가 필드 오버라이딩이 문제가 되는 상황이 발생하면 필드 대신 메서드를 사용하거나 getter나 setter를 사용해 해결하면 된다!**

<br />

## super 키워드와 [[HomeObject]]

`super`에 대해서 좀 더 깊이 파보자.

지금까지 살펴본 내용만으론 `super`가 제대로 동작하지 않는다.

- 객체 메서드가 실행되면 현재 객체가 `this`가 된다. 

- 이 상태에서 `super.method()`를 호출하면 엔진은 현재 객체의 프로토타입에서 `method`를 찾아야 한다.

그런데 이 과정은 어떻게 일어나는 것일까?

<br />

엔진은 현재 객체 `this`를 알기 때문에 `this.__proto__.method`를 통해 부모 객체의 `method`를 찾을 수 있을 것 같다.

하지만 이는 정확히 아니다..

```js
let animal = {
  name: "동물",
  eat() {
    alert(`${this.name} 이/가 먹이를 먹습니다.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "토끼",
  eat() {
    this.__proto__.eat.call(this); 
  }
};

rabbit.eat(); // 토끼 이/가 먹이를 먹습니다.
```

`eat`을 프로토타입(`animal`)에서 가져오고 현재 객체의 컨텍스트에 기반하여 `eat`을 호출한다.

여기서 주의해서 봐야 할 부분은 `.call(this)`이다. 

`this.__proto__.eat()` 있으면 현재 객체가 아닌 프로토타입의 컨텍스트에서 부모 `eat`을 실행하기 때문에 `.call(this)`가 있어야 한다.

그럼 이제 체인에 객체를 하나 더 추가해보겠다.

```js
let animal = {
  name: "동물",
  eat() {
    alert(`${this.name} 이/가 먹이를 먹습니다.`);
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    this.__proto__.eat.call(this); // (1)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    this.__proto__.eat.call(this); // (2)
  }
};

longEar.eat(); // Error
```

에러!!!

(1)과 (2)에서 `this`는 현재 객체인 `longEar`가 된다.

여기에 핵심이 있다. 모든 객체 메서드는 프로토타입 등이 아닌 현재 객체를 `this`로 갖는다.

따라서 (1)과 (2)의 `this.__proto__`엔 정확히 같은 값 `rabbit`이 할당된다.

**체인 위로 올라가지 않고 양쪽 모두에서 `rabbit.eat`을 호출하기 때문에 무한 루프에 빠지게 되는 것이다.**

<br />

정리해보자.

1. `longEar.eat()` 내부의 (2)로 표시한 줄에서 `rabbit.eat`을 호출하는데, 이때 `this`는 `longEar`이다.

2. `rabbit.eat` 내부의 (1)로 표시한 줄에서 체인 위쪽에 있는 호출을 전달하려 했으나 `this`가 `longEar` 이기 때문에 또다시 `rabbit.eat`이 호출된다.

3. 이런 내부 동작 때문에 `rabbit.eat`은 체인 위로 올라가지 못하고 자기 자신을 계속 호출해 무한 루프에 빠지게 된다.

그렇기에 이런 문제는 `this`만으론 해결할 수 없다.. 그럼 어떡함..?

<br />

자바스크립트엔 이런 문제를 해결할 수 있는 함수 전용 특수 내부 프로퍼티가 있다. 바로 `[[HomeObject]]`!!

클래스이거나 객체 메서드인 함수의 `[[HomeObject]]` 프로퍼티는 해당 객체가 저장된다.

**`super`는 `[[HomeObject]]`를 이용해 부모 프로토타입과 메서드를 찾는다.**

```js
let animal = {
  name: "동물",
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} 이/가 먹이를 먹습니다.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "토끼",
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "귀가 긴 토끼",
  eat() {         // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  }
};

longEar.eat();  // 귀가 긴 토끼 이/가 먹이를 먹습니다.
```

`[[HomeObject]]`의 메커니즘 덕분에 메서드가 의도한 대로 동작하는 것을 확인할 수 있다.

이렇게 `longEar.eat`같은 객체 메서드는 `[[HomeObject]]`를 알고 있기 때문에 `this` 없이도 프로토타입으로부터 부모 메서드를 가져올 수 있다.

<br />

자바스크립트에서 함수는 대개 객체에 묶이지 않고 자유롭다. 

이런 자유성 때문에 `this`가 달라도 객체 간 메서드를 복사하는 것이 가능하다.

그런데 `[[HomeObject]]`는 그 존재만으로도 함수의 자유도를 파괴한다. 

메서드가 객체를 기억하기 때문이다. 

`[[HomeObject]]`를 변경할 방법은 없기 때문에 한 번 바인 딩된 함수는 더이상 변경되지 않는다.

<br />

다행인 점은 `[[HomeObject]]`는 오직 `super` 내부에서만 유효하다는 것이다.

그렇기 때문에 메서드에서 `super`를 사용하지 않는 경우엔 메서드의 자유성이 보장된다.

객체 간 복사 역시 가능하디. 하지만 메서드에서 `super`를 사용하면 이야기가 달라진다.

<br />

아래는 객체 간 메서드를 잘못 복사한 경우에 `super`가 제대로 동작하지 않는 예시이다.

```js
let animal = {
  sayHi() {
    console.log(`나는 동물입니다.`);
  }
};

let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    console.log("나는 식물입니다.");
  }
};

let tree = {
  __proto__: plant,
  sayHi: rabbit.sayHi
};

tree.sayHi();  // 나는 동물입니다.
```

`tree.sayHi()`를 호출하니 `"나는 동물입니다."`가 출력되었다.

원인은 아래와 같다.

- `tree.sayHi`는 중복 코드를 방지하기 위해 `rabbit`에서 메서드를 복사해왔다.

- 그런데 복사해온 메서드는 `rabbit`에서 생성했기 때문에 이 메서드의 `[[HomeObject]]`는 `rabbit`이다.

- `tree.sayHi()`의 코드 내부엔 `super.sayHi()`가 있다. 

  `rabbit`의 프로토타입은 `animal`이므로 `super`는 체인 위에있는 `animal`로 올라가 `sayHi`를 찾는다.

<br />

## 함수 프로퍼티가 아닌 메서드 사용하기

`[[HomeObject]]`는 클래스와 일반 객체의 메서드에서 정의된다.

그런데 객체 메서드의 경우 `[[HomeObject]]`가 제대로 동작하게 하려면 메서드를 반드시 `method()` 형태로 정의해야 한다. 

`"method: function()"` 형태로 정의하면 안된다.

메서드 문법이 아닌(non-method syntax) 함수 프로퍼티를 사용해 예시를 작성해 보면 다음과 같다.

```js
let animal = {
  eat: function() { 
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};

rabbit.eat(); // Error
```

`[[HomeObject]]` 프로퍼티가 설정되지 않기 때문에 상속이 제대로 동작하지 않는 것을 확인할 수 있다.

<br />
<br />

어렵다..

클래스 상속, 이미 알고 있던 개념이기 때문에 별거 없겠지 했는데, 아니였다.

내가 모르고 있던 개념이 많았고, 너무 얕은 지식만 알고 있었다.

이번 내용들을 한번 더 곱씹어 학습해야겠다.

## ※ Source

🖥 ko.javascript.info