---
date: "2022-03-27T15:30"
title: "[JavaScript] 객체 프로퍼티"
category: "Language"
categoryColor: "#25e5bd"
tags: ["JS"]
---

객체 프로퍼티를 단순히 '키-값' 쌍의 관점에서만 다루었지만, 사실 프로퍼티는 더 유연하고 강력한 자료구조이다.

이번 포스트에선 **객체 프로퍼티 추가 구성 옵션** 몇 가지와 이 옵션들을 이용해 손쉽게 **getter**나 **setter** 함수를 만드는 법을 알아보겠다.

<br />

# 프로퍼티 플래그

객체 프로퍼티는 값(value) 과 함께 **플래그(flag)** 라 불리는 **특별한 속성 세 가지**를 갖는다.

- **`writable`** : `true`이면 값을 수정할 수 있다. 그렇지 않다면 읽기만 가능하다.

- **`enumerable`** : `true`이면 반복문을 사용해 나열할 수 있다. 그렇지 않다면 반복문을 사용해 나열할 수 없다.

- **`configurable`** : `true`이면 프로퍼티 삭제나 플래그 수정이 가능하다. 그렇지 않다면 프로퍼티 삭제와 플래그 수정이 불가능하다.

지금까지 해왔던 '평범한 방식’으로 프로퍼티를 만들면 해당 프로퍼티의 플래그는 모두 `true`가 된다. 

이렇게 `true`로 설정된 플래그는 언제든 수정할 수 있다.

<br />

### 플래그 얻기

그렇다면 플래그는 어떻게 얻을 수 있을까?

**`Object.getOwnPropertyDescriptor` 메서드를 사용하면 특정 프로퍼티에 대한 정보를 모두 얻을 수 있다!**

```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

- `obj` : 정보를 얻고자 하는 객체

- `propertyName` : 정보를 얻고자 하는 객체 내 프로퍼티

메서드를 호출하면 **프로퍼티 설명자(descriptor)** 라고 불리는 객체가 반환되는데, 여기에는 **프로퍼티 값과 세 플래그에 대한 정보가 모두 담겨있다.**

```js
let user = {
  name: "Peter"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "Peter",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

<br />

### 플래그 수정하기

얻는 건 알았고.. 플래그 수정하는 방법은?

**메서드 `Object.defineProperty`를 사용하면 플래그를 변경할 수 있다.**

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj, propertyName` : 설명자를 적용하고 싶은 객체와 객체 프로퍼티

`descriptor` : 적용하고자 하는 프로퍼티 설명자

<br />

`defineProperty`메서드는 객체에 해당 프로퍼티가 있으면 플래그를 원하는 대로 변경해준다.

**프로퍼티가 없으면 인수로 넘겨받은 정보를 이용해 새로운 프로퍼티를 만든다.** 

**이때 플래그 정보가 없으면 플래그 값은 자동으로 `false`가 된다.**

<br />

```js
let user = {};

Object.defineProperty(user, "name", {
  value: "Peter"
});

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "Peter",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */
```

위 예시를 보면 프로퍼티 `name`이 새로 만들어지고, 모든 플래그 값이 `false`가 된 것을 확인할 수 있다.

`defineProperty`를 이용해 프로퍼티를 만든 경우, 플래그 값을 `true`로 설정하려면 `descriptor`에 `true`라고 명시해 주어야 한다.

<br />

또한, `Object.defineProperties(obj, descriptors)` 메서드를 사용하면 **프로퍼티 여러 개를 한 번에 정의할 수도 있다!**

```js
Object.defineProperties(user, {
  name: { value: "Peter", writable: false },
  surname: { value: "Kim", writable: false },
  // ...
});
```

<br />

`Object.getOwnPropertyDescriptors(obj)` 메서드를 사용하면 프로퍼티 설명자를 전부 한꺼번에 가져올 수 있는데,

이 메서드를 `Object.defineProperties`와 함께 사용하면 **객체 복사 시 플래그도 함께 복사할 수 있다!**

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

위 예시는 **심볼형 프로퍼티를 포함한 프로퍼티 설명자 전체를 복사한다.**

지금까진 `for..in`을 통한 할당 연산자를 사용해 프로퍼티를 복사하는 방법으로 객체를 복사해 왔지만, 

이 방법은 플래그와 심볼형 프로퍼티는 복사하지 않는다..

<br />

### configurable 플래그

(`writable`, `enumerable` 플래그는 맨 위에서 설명한 것으로 충분하기에 더이상 다루지 않겠다.)

`configurable` 플래그는 위에서 보았듯이 `false`이면 프로퍼티 삭제와 플래그 수정이 불가능하다.

즉, `configurable` 플래그를 `false`로 설정하면 돌이킬 방법이 없다. 

`defineProperty`를 써도 값을 `true`로 되돌릴 수 없다..

<br />

`configurable:false`가 만들어내는 구체적인 제약사항은 아래와 같다.

1. `configurable` 플래그를 수정할 수 없음

2. `enumerable` 플래그를 수정할 수 없음.

3. `writable`: `false`의 값을 `true`로 바꿀 수 없음(`true`를 `false`로 변경하는 것은 가능함).

4. 접근자 프로퍼티 `get/set`을 변경할 수 없음(새롭게 만드는 것은 가능함).

이런 특징을 이용하면 **'영원히 변경할 수 없는'** 프로퍼티를 만들 수 있다!

> `configurable` 플래그가 `false`이더라도 `writable` 플래그가 `true`이면 프로퍼티 값을 변경할 수 있다. `configurable: false`는 플래그 값 변경이나 프로퍼티 삭제를 막기 위해 만들어졌지, 프로퍼티 값 변경을 막기 위해 만들어진 게 아니다.

# getter와 setter

객체의 프로퍼티는 두 종류로 나뉜다.

첫 번째 종류는 **데이터 프로퍼티(data property)** 이다. (지금까지 사용한 모든 프로퍼티는 데이터 프로퍼티이다.)

두 번째는 **접근자 프로퍼티(accessor property)** 라 불리는 새로운 종류의 프로퍼티이다.

접근자 프로퍼티의 본질은 함수인데, 이 함수는 값을 **획득(get)하고 설정(set)하는 역할**을 담당한다.

그런데 외부 코드에서는 함수가 아닌 일반적인 프로퍼티처럼 보인다.

<br />

접근자 프로퍼티는 **'getter(획득자)'와 ‘setter(설정자)’** 메서드로 표현된다.

객체 리터럴 안에서 getter와 setter 메서드는 `get`과 `set`으로 나타낼 수 있다.

```js
let obj = {
  get propName() {
    // getter, obj.propName을 실행할 때 실행되는 코드
  },

  set propName(value) {
    // setter, obj.propName = value를 실행할 때 실행되는 코드
  }
};
```

getter 메서드는 `obj.propName`을 사용해 프로퍼티를 읽으려고 할 때 실행되고, setter 메서드는 `obj.propName = value`으로 프로퍼티에 값을 할당하려 할 때 실행된다.

<br />

```js
let user = {
  name: "Peter",
  surname: "Kim",

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

console.log(user.fullName); // Peter Kim
```

바깥 코드에선 접근자 프로퍼티를 일반 프로퍼티처럼 사용할 수 있다. 접근자 프로퍼티는 이런 아이디어에서 출발했다.

**접근자 프로퍼티를 사용하면 함수처럼 호출 하지 않고**, 일반 프로퍼티에서 값에 접근하는 것처럼 평범하게 `user.fullName`을 사용해 프로퍼티 값을 얻을 수 있다. 

나머지 작업은 getter 메서드가 뒷단에서 처리해준다.

한편, 위 예시의 `fullName`은 getter 메서드만 가지고 있기 때문에 `user.fullName=`을 사용해 값을 할당하려고 하면 에러가 발생한다.

<br />


```js
let user = {
  name: "Peter",
  surname: "Kim",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

user.fullName = "John Park";

console.log(user.name); // John
console.log(user.surname); // Park
```

이렇게 getter와 setter 메서드를 구현하면 객체엔 `fullName`이라는 **'가상’의 프로퍼티**가 생긴다. 

**가상의 프로퍼티는 읽고 쓸 순 있지만 실제로는 존재하지 않는다.**

<br />

### 접근자 프로퍼티 설명자

데이터 프로퍼티의 설명자와 접근자 프로퍼티의 설명자는 다르다.

접근자 프로퍼티엔 설명자 `value`와 `writable`가 없는 대신에 `get`과 `set`이라는 함수가 있다.

따라서 접근자 프로퍼티는 다음과 같은 설명자를 갖는다.

- `get` : 인수가 없는 함수로, 프로퍼티를 읽을 때 동작

- `set` : 인수가 하나인 함수로, 프로퍼티에 값을 쓸 때 호출

- `enumerable` : 데이터 프로퍼티와 동일

- `configurable` : 데이터 프로퍼티와 동일

<br />

### getter와 setter 똑똑하게 활용하기

getter와 setter를 **‘실제’ 프로퍼티 값을 감싸는 래퍼(wrapper)처럼 사용하면**, 프로퍼티 값을 원하는 대로 통제할 수 있다.

```js
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      console.log("네 글자 이상으로 구성된 이름을 입력하세요.");
      return;
    }
    this._name = value;
  }
};

user.name = "Peter";
alert(user.name); // Peter

user.name = ""; // 네 글자 이상으로 구성된 이름을 입력하세요.
```

위 예시에서 `name`을 위한 setter를 만들어 `user`의 이름이 너무 짧아지는 걸 방지하고 있다. 

실제 값은 별도의 프로퍼티 `_name`에 저장된다.

즉, `user`의 이름은 `_name`에 저장되고, 프로퍼티에 접근하는 것은 getter와 setter를 통해 이뤄진다.

> 기술적으론 외부 코드에서 `user._name`을 사용해 이름에 바로 접근할 수 있다. 그러나 밑줄 `"_"` 로 시작하는 프로퍼티는 객체 내부에서만 활용하고, 외부에서는 건드리지 않는 것이 관습이다.

### 호환성을 위해 사용하기

접근자 프로퍼티는 언제 어느 때나 getter와 setter를 사용해 **데이터 프로퍼티의 행동과 값을 원하는 대로 조정할 수 있게 해준다**는 점에서 유용하다.

데이터 프로퍼티 `name`과 `age`를 사용해서 사용자를 나타내는 객체를 구현한다고 가정해보자.

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let peter = new User("Peter", 24);

console.log( peter.age ); // 24
```

그런데 곧 요구사항이 바뀌어서 `age` 대신에 `birthday`를 저장해야 한다고 해보자.

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let peter = new User("Peter", new Date(1998, 8, 19));
```

이렇게 생성자 함수를 수정하면 기존 코드 중 프로퍼티 `age`를 사용하고 있는 코드도 수정해 줘야 한다.

`age`가 사용되는 부분을 모두 찾아서 수정하는 것도 가능하지만, 시간이 오래 걸린다..😰

게다가 여러 사람이 `age`를 사용하고 있다면 모두 찾아 수정하는 것 자체가 힘들기도 하고..

<br />

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
}

let peter = new User("Peter", new Date(1998, 8, 19));

console.log( peter.birthday ); // 1998-09-18T15:00:00.000Z 
console.log( peter.age ); // 24
```

`age`를 위한 getter를 추가해서 문제를 해결했다!! 이제 `birthday`와 `age` 모두 사용할 수 있다.

<br />
<br />

객체 프로퍼티에 이러한 속성이 있다니.. 태어나서 처음 알았다. 너무 신기했다.

마지막 내용('호환성을 위해 사용하기')과 같이 잘 적용하면 더 유연한 코드를 작성할 수 있겠다 😆

<br />

## ※ Source

🖥 ko.javascript.info