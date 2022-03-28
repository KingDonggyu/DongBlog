---
date: "2022-03-28T14:30"
title: "[JavaScript] 프로토타입"
category: "Language"
categoryColor: "#25e5bd"
tags: ["JS"]
---

처음 자바스크립트를 접하고 학습했을 때 프로토타입에 대해 배운적이 있는데..

하나도 기억이 안난다 🤣

이번엔 제대로 배워보자!

# 프로토타입 상속

**자바스크립트 객체는 `[[Prototype]]` 이라는 숨김 프로퍼티를 갖는다.**

이 숨김 프로퍼티 값은 `null`이거나 다른 객체에 대한 참조가 되는데,

다른 객체를 참조하는 경우 참조 대상을 **'프로토타입(prototype)'** 이라 부른다.

```
object -----------------> prototype object
         [[Prototype]]
```

프로토타입의 동작 방식은 '신비스러운' 면이 있다.

**`object`에서 프로퍼티를 읽으려고 할 때 해당 프로퍼티가 없으면, 자바스크립트는 자동으로 프로토타입에서 프로퍼티를 찾는다!**

프로그래밍에선 이런 동작 방식을 **'프로토타입 상속'** 이라 부른다.

<br />

`[[Prototype]]` 프로퍼티는 내부 프로퍼티이면서 숨김 프로퍼티이지만 다양한 방법을 사용해 값을 설정할 수 있다.

```js
let animal = {
  eats: true
  walk() {
    alert("동물이 걷습니다.");
  }
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal;

alert( rabbit.eats ); // true
alert( rabbit.jumps ); // true
rabbit.walk(); // 동물이 걷습니다.
```

위 예시처럼 `__proto__`을 사용하면 값을 설정할 수 있다.

`rabbit`의 프로토타입은 `animal`이다. 즉, `rabbit`은 `animal`을 상속받는다.

그렇기에 `rabbit`에서도 `animal`에 구현된 유용한 프로퍼티와 메서드를 사용할 수 있게 되는데,

이렇게 프로토타입에서 상속받은 프로퍼티를 **'상속 프로퍼티(inherited property)'** 라고 한다.

> ❗️ `__proto__`는 `[[Prototype]]`과 다르다. **`__proto__`는 `[[Prototype]]`의 getter이자 setter이다.** <br />하휘 호환성 때문에 여전히 `__proto__`를 사용할 순 있지만 비교적 근래에 작성된 스크립트에선 `__proto__` 대신 함수 `Object.getPrototypeOf`나 `Object.setPrototypeOf`을 써서 프로토타입을 획득(get)하거나 설정(set)한다. <br /> 이에 대해서는 좀있다 다루도록 하겠다.

또한, 아래 예시처럼 프로토타입 체인을 구현할 수 있다.

```js
let animal = {
  eats: true,
  walk() {
    alert("동물이 걷습니다.");
  },
};

let rabbit = {
  jumps: true,
  __proto__: animal,
};

let longEar = {
  earLength: 10,
  __proto__: rabbit,
};

longEar.walk(); // 동물이 걷습니다.
alert(longEar.jumps); // true
```

메서드 `walk`는 프로토타입 체인을 통해 상속 받았다.

<br />

이러한 프로토타입 체이닝엔 두 가지 제약사항이 있다.

**1. 순환 참조(circular reference)는 허용되지 않는다.** `__proto__`를 이용해 닫힌 형태로 다른 객체를 참조하면 에러가 발생한다.

**2. `__proto__`의 값은 객체나 `null`만 가능하다.** 다른 자료형은 무시된다.

여기에 더하여 객체엔 **오직 하나의 `[[Prototype]]`만 있을 수 있다**는 당연한 제약도 있다.

**객체는 두 개의 객체를 상속받지 못한다.**

<br />

### 프로토타입은 읽기 전용이다!

프로토타입은 프로퍼티를 읽을 때만 사용한다.

프로퍼티를 추가, 수정하거나 지우는 연산은 객체에 직접 해야 한다.

```js
let animal = {
  eats: true,
  walk() {
    ...
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.walk = function() {
  alert("토끼가 깡충깡충 뜁니다.");
};

rabbit.walk(); // 토끼가 깡충깡충 뜁니다.
```

`rabbit.walk()`를 호출하면 프로토타입에 있는 메서드가 실행되지 않고, 객체 `rabbit`에 **직접 추가한 메서드가 실행**된다.

이번엔 위 예시와는 조금 다르게 동작하는 아래 예시를 보자.

```js
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

let admin = {
  __proto__: user,
  isAdmin: true,
};

alert(admin.fullName); // John Smith

admin.fullName = "Alice Cooper";

alert(admin.fullName); // Alice Cooper
alert(user.fullName); // John Smith
```

접근자 프로퍼티(accessor property)는 setter 함수를 사용해 프로퍼티에 값을 할당하므로,

접근자 프로퍼티에 값을 할당하면 객체(`admin`)에 프로퍼티(`fullName`)가 추가되는게 아니라 setter 함수가 호출된다.

<br />

잠깐, 그런데 위 예시의 setter 함수의 `this`엔 어떤 값이 들어가는거지?

프로퍼티 `this.name`과 `this.surname`에 값을 쓰면 그 값이 `user`에 저장될까? `admin`에 저장될까?

간단하다. `this`는 프로토타입에 영향을 받지 않는다.

<br />

**메서드를 객체에서 호출했든 프로토타입에서 호출했든 상관없이 `this`는 언제나 `.` 앞에 있는 객체이다.**

즉, `admin.fullName=`으로 setter 함수를 호출할 때, `this`는 `user`가 아닌 `admin`이 된다.

<br />

```js
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`동물이 걸어갑니다.`);
    }
  },
  sleep() {
    this.isSleeping = true;
  },
};

let rabbit = {
  name: "하얀 토끼",
  __proto__: animal,
};

rabbit.sleep();
alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined
```

`rabbit`에 새로운 프로퍼티 `isSleeping`을 추가하고 그 값을 `true`로 변경한다.

프로토타입에는 `isSleeping`이라는 프로퍼티가 없기 때문에 `undefined`가 출력된다.

이처럼 **상속받은 메서드를 사용하더라도 객체는 프로토타입이 아닌 자신의 상태를 수정한다.**

<br />

### for..in 반복문

**`for..in`은 상속 프로퍼티도 순회대상에 포함시킨다.**

```js
let animal = {
  eats: true,
};

let rabbit = {
  jumps: true,
  __proto__: animal,
};

alert(Object.keys(rabbit)); // jumps
for (let prop in rabbit) alert(prop); // jumps, eats
```

`Object.keys`는 객체 자신의 키만 반환하지만, `for..in`은 객체 자신의 키와 상속 프로퍼티의 키 모두를 순회한다.

이때, `obj.hasOwnProperty(key)`를 이용하면 상속 프로퍼티를 순회 대상에서 제외할 수 있다.

- 이 내장 메서드는 `key`에 대응하는 프로퍼티가 상속 프로퍼티가 아니고 `obj`에 직접 구현되어있는 프로퍼티일 때만 `true`를 반환한다.

> `hasOwnProperty` 메서드는 `Object.prototype.hasOwnProperty`에서 왔다. 하지만 `for..in` 구문에서 상속 프로퍼티인 `hasOwnProperty`가 출력되지 않는 이유는 `hasOwnProperty`는 열거 가능한(enumerable) 프로퍼티가 아니기 때문이다. ❗️ **`Object.prototype`에 있는 모든 메서드의 enumerable 플래그는 `false`이다.**

# 함수의 prototype 프로퍼티

생성자 함수를 사용해 객체를 만든 경우에는 프로토타입이 어떻게 동작할까?

생성자 함수로 객체를 만들었을 때 리터럴 방식과 다른점은, 생성자 함수의 프로토타입이 객체인 경우에 `new` 연산자를 사용해 만든 객체는 **생성자 함수의 프로토타입 정보를 사용해 `[[Prototype]]`을 설정한다**는 것이다.

> ❗️ 생성자 함수(`F`)의 프로토타입을 의미하는 `F.prototyp`e에서 `prototype`은 `F`에 정의된 일반 프로퍼티라는 점에 주의해야 한다. 앞에서 배운 '프로토타입’과 비슷하게 들리겠지만 이름만 같을 뿐 실제론 다른 일반적인 프로퍼티이다.

```js
let animal = {
  eats: true,
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("흰 토끼");

alert(rabbit.eats); // true
```

`Rabbit.prototype = animal`은 **"`new Rabbit`을 호출해 만든 새로운 객체의 `[[Prototype]]`을 `animal`로 설정하라."** 는 것을 의미한다.

> ❗️ `F.prototype`은 `new F`를 호출할 때만 사용된다. `new F`를 호출할 때 만들어지는 새로운 객체의 `[[Prototype]]`을 할당해 준다.

우리가 특별히 할당하지 않더라도 모든 함수는 기본적으로 `prototype` 프로퍼티를 갖는다.

default 프로퍼티 `prototype`은 `constructor` 프로퍼티 하나만 있는 객체를 가리키는데, 여기서 `constructor` 프로퍼티는 함수 자신을 가리킨다.

```js
function Rabbit() {} // default prototype => Rabbit.prototype = { constructor: Rabbit };
```

<br />

특별한 조작을 가하지 않았다면 `new Rabbit`을 실행해 만든 객체 모두에서 `constructor` 프로퍼티를 사용할 수 있는데, 이때 `[[Prototype]]`을 거친다.

```js
function Rabbit() {}

let rabbit = new Rabbit();

alert(rabbit.constructor == Rabbit); // true ([[Prototype]]을 거쳐 접근함)
```

또한, `constructor` 프로퍼티는 기존에 있던 객체의 `constructor`를 사용해 새로운 객체를 만들때 사용할 수 있다.

```js
function Rabbit(name) {
  this.name = name;
  alert(name); // 흰 토끼, 검정 토끼
}

let rabbit = new Rabbit("흰 토끼");
let rabbit2 = new rabbit.constructor("검정 토끼");
```

<br />

`constructor`를 이야기 할 때 가장 중요한 점은 **자바스크립트는 알맞은 `constructor` 값을 보장하지 않는다는 점**이다.

함수엔 기본으로 `prototype`이 설정된다라는 사실 그게 전부이다.

`constructor`와 관련해서 벌어지는 모든 일은 전적으로 개발자에게 달려있다.

그렇기에 `constructor`의 기본 성질을 제대로 활용하려면 `prototype`에 뭔가를 하고 싶을 때 `prototype` 전체를 덮어쓰지 말고 디폴트 `prototype`에 원하는 프로퍼티를 추가, 제거해야 한다. (덮어쓰면 `constructor`가 사라진다..)

<br />

# 내장 객체의 프로토타입

`prototype` 프로퍼티는 자바스크립트 내부에서도 광범위하게 사용된다.

모든 내장 생성자 함수에서 `prototype` 프로퍼티를 사용한다.

```js
let obj = {};

alert(obj.__proto__ === Object.prototype); // true

alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true
```

**`new Object()`를 호출하거나 리터럴 문법 `{...}`을 사용해 객체를 만들 때, 새롭게 생성된 객체의 `[[Prototype]]`은 `Object.prototype`을 참조한다.**

따라서 `obj.toString()`을 호출하면 `Object.prototype`에서 해당 메서드를 가져오게 된다.

<br />

마찬가지로 `Array`, `Date`, `Function`을 비롯한 내장 객체들 역시 프로토타입에 메서드를 저장해 놓는다.

```js
let arr = [1, 2, 3];

alert(arr.__proto__ === Array.prototype); // true
alert(arr.__proto__.__proto__ === Object.prototype); // true
alert(arr.__proto__.__proto__.__proto__); // null
```

`arr`은 `Array.prototype`과 `Object.prototype`을 상속받은 것을 볼 수 있다.

그리고 체인 맨 위엔 `null`이 있다.

<br />

체인 상의 프로토타입엔 중복 메서드가 있을 수 있다.

`Array.prototype`엔 요소 사이에 쉼표를 넣어 요소 전체를 합친 문자열을 반환하는 자체 메서드 `toString`가 있다.

그런데 `Object.prototype`에도 메서드 `toString`이 있다.

이렇게 **중복 메서드가 있을 때는 체인 상에서 가까운 곳에 있는 메서드가 사용된다.**

따라서, 생성한 배열의 `toString`을 사용하면 `Array.prototype`이 체인 상에서 더 가깝기 때문에 `Array.prototype`의 `toString`이 사용된다.

<br />

### 원시값

원시 타입 값의 프로퍼티에 접근하려고 하면 내장 생성자 `String`, `Number`, `Boolean을` 사용하는 임시 래퍼(wrapper) 객체가 생성된다.

래퍼 객체는 보이지 않는 곳에서 만들어지는데 엔진에 의해 최적화가 이뤄진다. (임시 래퍼 객체는 이런 메서드를 제공하고 난 후에 사라진다.)

그런데 각 자료형에 해당하는 래퍼 객체의 메서드를 프로토타입 안에 구현해 놓고 `String.prototype`, `Number.prototype`, `Boolean.prototype`을 사용해 쓰도록 규정한다.

> `null`과 `undefined`에 대응하는 래퍼 객체는 없다. 따라서 프로토타입도 물론 사용할 수 없다.

### 네이티브 프로토타입 변경하기

네이티브 프로토타입은 수정할 수 있다.

```js
String.prototype.show = function () {
  alert(this);
};

"BOOM!".show(); // BOOM!
```

오.. 그렇다면 개발할 때 새로운 내장 메서드를 만들어서 사용하면 정말 편하겠는걸?

하지만! 이는 좋지 않은 방법이다..

❗️ 프로토타입은 전역으로 영향을 미치기 때문에 프로토타입을 조작하면 기존 코드와 충돌이 날 가능성이 크다.

- 두 라이브러리에서 동시에 `String.prototype.show` 메서드를 추가하면 한 라이브러리의 메서드가 다른 라이브러리의 메서드를 덮어쓴다.

<br />

**모던 프로그래밍에서 네이티브 프로토타입 변경을 허용하는 경우는 딱 하나뿐이다. 바로 폴리필을 만들 때!**

> 폴리필은 자바스크립트 명세서에 있는 메서드와 동일한 기능을 하는 메서드 구현체를 의미한다.

폴리필을 직접 구현하고 난 후, 폴리필을 내장 프로토타입에 추가할 때만 네이티브 프로토타입을 변경하자.

<br />

### 프로토타입에서 메서드 빌려오기

한 객체의 메서드를 다른 객체로 복사할 때 이 기법이 사용된다.

```js
let obj = {
  0: "Hello",
  1: "world!",
  length: 2,
};

alert(obj.join); // undefined

obj.join = Array.prototype.join;

alert(obj.join(",")); // Hello,world!
```

내장 메서드 `join`의 내부 알고리즘은 제대로 된 인덱스가 있는지와 `length` 프로퍼티가 있는지만 확인하기 때문에 예시는 에러 없이 의도한 대로 동작한다.

호출 대상이 진짜 배열인지는 상관없다. 다수의 내장 메서드가 이런 식으로 동작한다..

<br />

메서드 빌리기 말고도 `obj.__proto__`를 `Array.prototype`으로 설정해 배열 메서드를 상속받는 방법이 있다!

이렇게 하면 `obj`에서 모든 `Array` 메서드를 사용할 수 있게 된다.

그런데 자바스크립트는 단일 상속만 허용하기 때문에 이 방법은 `obj`가 다른 객체를 상속받고 있을 때는 사용할 수 없다.

<br />

# 프로토타입 메서드와 **proto**가 없는 객체

아~까 프로토타입을 설정하기 위한 모던한 방법에 대해 잠깐 언급했다.

(좀있다 알아보자고 했었던 그거..)

`__proto__`는 브라우저를 대상으로 개발하고 있다면 다소 구식이기 때문에 더는 사용하지 않는 것이 좋다.

표준에도 관련 내용이 명시되어있다.

대신 아래와 같은 모던한 메서드들을 사용하는 것이 좋다.

- **`Object.create(proto, [descriptors])`** – `[[Prototype]]`이 `proto`를 참조하는 빈 객체를 만든다.

  - 이때 프로퍼티 설명자를 추가로 넘길 수 있다.

- **`Object.getPrototypeOf(obj)`** – `obj`의 `[[Prototype]]`을 반환한다.

- **`Object.setPrototypeOf(obj, proto)`** – `obj`의 [`[Prototype]]`이 `proto`가 되도록 설정한다.

<br />

```js
let animal = {
  eats: true
};

let rabbit = Object.create(animal);

alert(rabbit.eats); // true
alert(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // rabbit의 프로토타입을 {}으로 바꾼다.
```

위 예시처럼 `__proto__` 대신 메서드를 사용하자.

<br />

`Object.create`를 사용하면 `for..in`을 사용해 프로퍼티를 복사하는 것보다 더 효과적으로 객체를 복제할 수 있다.

```js
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

`Object.create`를 호출하면 `obj`의 모든 프로퍼티를 포함한 완벽한 사본이 만들어진다.

사본엔 열거 가능한 프로퍼티와 불가능한 프로퍼티, 데이터 프로퍼티, getter, setter 등 모든 프로퍼티가 복제된다.

`[[Prototype]]`도!

> ❗️ **속도가 중요하다면 기존 객체의 [[Prototype]]을 변경하지 말자!** <br /> 대개는 객체를 생성할 때만 `[[Prototype]]`을 설정하고 이후엔 수정하지 않는다. `Object.setPrototypeOf`나 `obj.__proto__=`을 써서 프로토타입을 그때그때 바꾸는 연산은 **객체 프로퍼티 접근 관련 최적화를 망치기 때문에 성능에 나쁜 영향을 미치기 때문이다.** 그러므로 `[[Prototype]]`을 바꾸는 것이 어떤 결과를 초래할지 확실히 알거나 속도가 전혀 중요하지 않은 경우가 아니라면 `[[Prototype]]`을 바꾸지 말자.

<br />
<br />

자바스크립트의 프로토타입에 대해서 자세히 알아보았다!

이정도면 다시 기억이 나지 않을 일은 없겠지? (기억이 안나면 포스팅한거 보면 되니까 😆)

<br />

## ※ Source

🖥 ko.javascript.info