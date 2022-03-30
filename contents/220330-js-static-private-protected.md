---
date: "2022-03-30T15:40"
title: "[JavaScript] static / private, protected"
category: "Language"
categoryColor: "#25e5bd"
tags: ["JS"]
---

지난 포스트에 이어서 클래스에 대한 학습을 하겠다.

이번엔 클래스의 `static`, `private`, `protected`에 대해 알아보겠다.

<br />

# static

**`prototype`이 아닌, 클래스 함수 자체에 메서드를 설정할 수도 있다!**

이러한 메서드를 정적(static) 메서드라 한다.

정적 메서드는 `static` 키워드를 붙여 만들 수 있다.

```js
class User {
  static staticMethod() {
    alert(this === User);
  }
}

User.staticMethod(); // true
```

<br />

**정적 메서드는 메서드를 프로퍼티 형태로 직접 할당하는 것과 동일한 일을 한다.**

```js
class User {}

User.staticMethod = function () {
  alert(this === User);
};

User.staticMethod(); // true
```

`User.staticMethod()`가 호출될 때 `this`의 값은 클래스 생성자인 `User`(점 앞의 객체) 자체가 된다.

<br />

💡 **정적 메서드는 어떤 특정한 객체가 아닌 클래스에 속한 함수를 구현하고자 할 때 주로 사용된다.**

객체 `Article`이 여러 개 있고 이들을 비교해줄 함수가 필요하다고 가정해보자.

가장 먼저 아래와 같이 `Article.compar`e를 추가하는 방법이 떠오를 것이다.

```js
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
}

let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1)),
];

articles.sort(Article.compare);

alert(articles[0].title); // CSS
```

여기서 `Article.compare`는 글을 비교해주는 수단으로, 글 전체를 **위에서** 바라보며 비교를 수행한다.

`Article.compare`가 글 하나의 메서드가 아닌 클래스의 메서드여야 하는 이유가 여기에 있다.

<br />

또 다른 예시를 보자.

```js
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static createTodays() {
    // this는 Article이다.
    return new this("Today's digest", new Date());
  }
}

let article = Article.createTodays();

alert(article.title); // Today's digest
```

클래스의 정적 메서드를 통해, 매개변수 `title`, `date` 등 관련 정보가 담긴 `article`을 생성자를 통해 생성한다.

그리하여 Today’s digest 라는 글이 필요할 때마다 `Article.createTodays()`를 호출하면 된다.

다시 한번 말하자면, `Article.createTodays()`는 `article`의 메서드가 아닌 전체 클래스의 메서드인 것이다.

<br />

```js
Article.remove({ id: 12345 });
```

정적 메서드는 위 예시와 같이 항목 검색, 저장, 삭제 등을 수행해주는 데이터베이스 관련 클래스에도 사용된다.

<br />

### 정적 프로퍼티

정적 프로퍼티도 물론 만들 수 있다.

```js
class Article {
  static publisher = "Ilya Kantor";
}

alert(Article.publisher); // Ilya Kantor
```

위 예시는 아래와 같이 `Article`에 프로퍼티를 직접 할당한 것과 동일하게 동작한다.

```js
Article.publisher = "Ilya Kantor";
```

<br />

### 정적 프로퍼티와 메서드 상속

정적 프로퍼티와 메서드는 상속된다.

```js
class Animal {
  static planet = "지구";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    alert(`${this.name}가 속도 ${this.speed}로 달립니다.`);
  }

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name}가 숨었습니다!`);
  }
}

let rabbits = [new Rabbit("흰 토끼", 10), new Rabbit("검은 토끼", 5)];

rabbits.sort(Rabbit.compare);
rabbits[0].run(); // 검은 토끼가 속도 5로 달립니다.
alert(Rabbit.planet); // 지구
```

`Animal.compare`와 `Animal.planet`은 상속되어서 각각 `Rabbit.compare`와 `Rabbit.planet`에서 접근할 수 있다.

**이게 가능한 이유는 프로토타입 때문이다.**

`extends` 키워드는 `Rabbit`의 `[[Prototype]]`이 `Animal`을 참조하도록 해준다.

<br />

<div>
  <img src="https://user-images.githubusercontent.com/31977543/91174501-55a0f800-e71a-11ea-8d9f-5ad06d6c7948.png">
</div>

<br />

**따라서 `Rabbit extends Animal`은 두 개의 `[[Prototype]]` 참조를 만들어 낸다.**

- 함수 `Rabbit`은 프로토타입을 통해 함수 `Animal`을 상속받는다.

- `Rabbit.prototype`은 프로토타입을 통해 `Animal.prototype`을 상속받는다.

<br />

코드로 확인해보자.

```js
class Animal {}
class Rabbit extends Animal {}

// 정적 메서드
alert(Rabbit.__proto__ === Animal); // true

// 일반 메서드
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
```

<br />

# private, protected

이번엔 private, protected 프로퍼티와 메서드에 대해 알아보자.

객체 지향 프로그래밍에서 가장 중요한 원리 중 하나는 **'내부 인터페이스와 외부 인터페이스를 구분 짓는 것’** 이다.

그렇기에 객체 지향 프로그래밍에서 프로퍼티와 메서드는 아래 두 그룹으로 분류된다.

- **내부 인터페이스(internal interface)** : 동일한 클래스 내의 다른 메서드에선 접근할 수 있지만, 클래스 밖에선 접근할 수 없는 프로퍼티와 메서드.

- **외부 인터페이스(external interface)** : 클래스 밖에서도 접근 가능한 프로퍼티와 메서드.

<br />

내부 인터페이스의 세부사항들은 서로의 정보를 이용하여 객체를 동작시키며, **내부 인터페이스의 기능은 외부 인터페이스를 통해야만 사용할 수 있다.**

이런 특징 때문에 외부 인터페이스만 알아도 객체를 가지고 무언가를 할 수 있다.

객체 안이 어떻게 동작하는지 알지 못해도 괜찮다는 점은 큰 장점으로 작용한다.

<br />

자바스크립트에는 아래와 같은 **두 가지 타입의 객체 필드(프로퍼티와 메서드)** 가 있다.

- **public** : 어디서든지 접근할 수 있으며 외부 인터페이스를 구성한다. 지금까지 다룬 프로퍼티와 메서드는 모두 `public`이다.

- **private** : 클래스 내부에서만 접근할 수 있으며 내부 인터페이스를 구성할 때 쓰인다.

<br />

**자바스크립트 이외**의 다수 언어에서는 클래스 자신과 자손 클래스에서만 접근을 허용하는 **protected** 필드를 지원한다.

protected 필드는 private와 비슷하지만, 자손 클래스에서도 접근이 가능하다는 점이 다르다.

그렇기에 protected 필드는 private 필드보다 조금 더 광범위하게 사용된다.

이러한 protected 필드도 내부 인터페이스를 만들 때 유용하다. 그래서 이를 모방해서 사용하는 경우가 많다.

그러한 경우에 대해 먼저 살펴보자.

<br />

### 프로퍼티 보호하기

protected 프로퍼티 명 앞엔 밑줄 `_`이 붙는다.

자바스크립트에서 강제한 사항은 아니지만, 밑줄은 프로그래머들 사이에서 외부 접근이 불가능한 프로퍼티나 메서드를 나타낼 때 쓴다.

암묵적 약속? 

<br />

프로퍼티를 생성할 때만 값을 할당할 수 있고, 그 이후에는 값을 절대 수정하지 말아야 하는 경우가 종종 있는데, 이럴 때 **읽기 전용 프로퍼티**를 활용할 수 있다.

읽기 전용 프로퍼티를 만들려면 setter(설정자)는 만들지 않고 getter(획득자)만 만들어야 한다.

아래 예시에서 `power` 프로퍼티는 읽기만 가능하다.

```js
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  get power() {
    return this._power;
  }

  constructor(power) {
    this._power = power;
  }
}

let coffeeMachine = new CoffeeMachine(100);
coffeeMachine.waterAmount = -10; // Error
```

get, set 문법을 사용해서 getter와 setter 함수를 만들었지만, 대부분은 아래와 같이 `get.../set...` 형식의 함수가 선호된다.

```js
class CoffeeMachine {
  _waterAmount = 0;

  setWaterAmount(value) {
    if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
    this._waterAmount = value;
  }

  getWaterAmount() {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

다소 길어보이긴 하지만, 이렇게 함수를 선언하면 다수의 인자를 받을 수 있기 때문에 좀 더 유연하다. 

반면 `get`, `set` 문법을 사용하면 코드가 짧아진다는 장점이 있다. 

어떤걸 사용해야 한다는 규칙은 없으므로 원하는 방식을 선택해서 사용하면된다.

> `class MegaMachine extends CoffeeMachine`로 클래스를 상속받으면, 새로운 클래스의 메서드에서 `this._waterAmount`나 `this._power`를 사용해 프로퍼티에 접근할 수 있다.

### private 프로퍼티

private 프로퍼티와 메서드는 제안(proposal) 목록에 등재된 문법으로, 명세서에 등재되기 직전 상태이다.

private 프로퍼티와 메서드는 `#`으로 시작한다. **`#`이 붙으면 클래스 안에서만 접근할 수 있다.**

```js
class CoffeeMachine {
  #waterLimit = 200;

  #checkWater(value) {
    if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
    if (value > this.#waterLimit) throw new Error("물이 용량을 초과합니다.");
  }

}

let coffeeMachine = new CoffeeMachine();

coffeeMachine.#checkWater(); // Error
coffeeMachine.#waterLimit = 1000; // Error
```

위 예시에서 볼 수 있듯이 `private` 필드는 클래스 외부나 자손 클래스에서 접근할 수 없다.

> private 필드는 public 필드와 상충하지 않는다. private 프로퍼티 `#waterAmount`와 public 프로퍼티 `waterAmount`를 동시에 가질 수 있다.

>  보통은 `this[name]`을 사용해 필드에 접근할 수 있지만, private 필드는 `this[name]`으로 접근할 수 없다. 이런 문법적 제약은 필드의 보안을 강화하기 위해 만들어졌다.

protected 필드와 달리, private 필드는 언어 자체에 의해 강제된다는 점이 장점이다.

그런데 `CoffeeMachine`을 상속받는 클래스에선 `#waterAmount`에 직접 접근할 수 없다. 

`#waterAmount`에 접근하려면 `waterAmount`의 `getter`와 `setter`를 통해야 한다.

`CoffeeMachine`을 상속받는 클래스에선 `CoffeeMachine`의 내부에 접근해야 하는 정당한 사유가 있을 수 있기에, 언어 차원에서 `protected` 필드를 지원하지 않아도 더 자주 쓰이는 이유가 바로 여기에 있다.

<br />
<br />

객체 지향 프로그래밍에서 내부 인터페이스와 외부 인터페이스를 구분하는 것을 **캡슐화(encapsulation)** 라 한다.

캡슐화의 이점으로 외부에서의 의도치 않은 클래스 조작을 방지하기 위해 정보를 은닉할 수 있다.

예전에 자바 공부할 때 배운 객체 지향 프로그래밍의 특징들이 조금씩 기억나는 것 같다 😁

<br />

## ※ Source

🖥 ko.javascript.info
