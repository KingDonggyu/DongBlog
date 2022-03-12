---
date: "2022-03-07"
title: "[JavaScript] Optional Chaining"
category: "Language"
categoryColor: "darkorchid"
tags: ["JS"]
thumbnail: "./images/JavaScript.png"
---

옵셔널! 이전에 포스팅한 스위프트의 🌸 이다.

스위프트 학습 과정에서 공부했기에 이번에 다룰 옵셔널 체이닝을 이해하는데 어려움이 없었다 😁

그럼에도 불구하고! 에러를 에러로 받아들이지 않고 안전하게 해주는 우리 옵셔널을 한번 더 정리해보겠다.

<br />

💡 **옵셔널 체이닝(optional chaining)을 사용하면 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있다!**

이 옵셔널 체이닝은 `?.`으로 사용하는데, 이는 연산자가 아니다.

대괄호와 함께 동작하는 특별한 문법 구조체(syntax construct)이다.

<br />

그렇다면 옵셔널 체이닝은 왜 필요할까?

만약, 사용자가 여러 명 있는데 그 중 몇 명은 주소 정보를 가지고 있지 않을 수도 있다.

```js
const user = {};
console.log(user.address.street); // Error
```

이럴 때, 위처럼 없는 정보에 접근하면 에러가 발생하게 된다.

페이지에 존재하지 않는 요소의 정보를 가져오려 하거나 할 때도 마찬가지이다.

<br />

이러한 문제를 해결하기 위해 `&&` 연산자를 사용하곤 했다.

```js
let user = {}; 
console.log(user && user.address && user.address.street);
```

나도 여태껏 리액트를 이용한 프론트엔드 개발에서 `&&`를 통해 잘못된 접근을 방지했었다.

하지만 이는 코드가 아주 길어질 수 있다는 단점이 있다..

그래서 뭐를 쓴다? 

<br />

옵셔널 체이닝을 사용하자!

💡 **`?.`은 바로 앞의 평가 대상이 `undefined`나 `null`이면 평가를 멈추고 `undefined`를 반환한다.**

```js
const user = {};
console.log(user?.address?.street);
```

이렇게 하면 `user`와 `user.address` 객체가 존재하지 않더라도 에러가 발생하지 않는다.

똘한 `&&`를 사용한 것보다 훨씬 코드가 짧아진 것을 볼 수 있다.

단, `?.`은 바로 앞 평가 대상에만 동작된다. (위 예시에서 `?.`를 두번 사용했다.)

<br />

**`?.`는 왼쪽 평가대상에 값이 없으면 즉시! 평가를 멈춘다.** 

즉, 함수 호출을 비롯한 `?.` 오른쪽에 있는 부가 동작은 `?.`의 평가가 멈췄을 때 더는 일어나지 않는다.

이를 **단락 평가(short-circuit)** 라 부른다.

<br />

이러한 `?.`는 읽거나 삭제하는 기능과 조합해 사용하면 좋다!

```js
delete user?.name;
```

`user`가 존재하면 `user.name`을 삭제한다.

이때 주의해야 할 점이 있다!

<br />

❗️ **`?.`은 읽기나 삭제하기에는 사용할 수 있지만 쓰기에는 사용할 수 없다.**

아래는 `user`가 존재할 경우 `user.name`에 값을 쓰려는 의도로 작성한 코드이다.

```js
user?.name = "Peter"; // SyntaxError: Invalid left-hand side in assignment
```

에러가 발생한 이유는 `undefined = "Peter"` 이 되기 때문이다.

즉, `?.`은 할당 연산자 왼쪽에서 사용할 수 없다.

<br />

## **옵셔널 체이닝을 남용하지 말자!** 

❗️ **`?.`는 존재하지 않아도 괜찮은 대상에만 사용해야 한다.**

사용자 주소를 다루는 위 예시에서 논리상 `user`는 반드시 있어야 하지만 `address`는 필수값이 아니다. 

그러므로 `user.address?.street`를 사용하는 것이 바람직하다.

<br />

실수로 `user`에 값을 할당하지 않았다면 **바로 알아낼 수 있도록 해야한다.**

그렇지 않으면 **에러를 조기에 발견하지 못하고 디버깅이 어려워진다..**

<br />

## ?.() / ?.[]

그렇다면, **존재 여부가 확실치 않은 함수를 호출**할 때는 어떻게 해야할까?

`?.()`를 사용하면 된다!

```js
let user1 = {
  admin() {
    alert("관리자 계정입니다.");
  }
}
let user2 = {};

user1.admin?.(); // 관리자 계정입니다.
user2.admin?.();
```

`user2`엔 `admin`이 정의되어 있지 않았음에도 메서드를 호출하면 **에러 없이 평가가 멈추는 것을 확인할 수 있다.**

<br />

그럼.. 객체 프로퍼티에 접근하는 경우에는?

`?.[]`를 사용할 수 있다!

위 예시와 마찬가지로 `?.[]`를 사용하면 **객체 존재 여부가 확실치 않은 경우에도 안전하게 프로퍼티를 읽을 수 있다.**

```js
let user1 = {
  firstName: "Peter"
};
let user2 = null;

let key = "firstName";

alert( user1?.[key] ); // Peter
alert( user2?.[key] ); // undefined
```

<br />

## ※ Source

🖥 ko.javascript.info
