---
date: '2022-04-07T14:30'
title: '[JavaScript] async와 await'
category: 'Language'
categoryColor: '#25e5bd'
tags: ['JS']
---

`async`와 `await`!

프로젝트시 서버와의 통신에서 사용했던 경험이 있다.

그땐 자세히 알고있는 상태에서 사용한 것이 아니었다.. 프로미스도 몰랐는데 뭐..

이번엔 제대로 알아보자!

<br />

`async`와 `await`라는 특별한 문법을 사용하면 프로미스를 좀 더 편하게 사용할 수 있다.

# async

```js
async function f() {
  return 1;
}

f().then(alert); // 1
```

이처럼 `async`는 `function` 앞에 위치한다.

**`function` 앞에 `async`를 붙이면 해당 함수는 반드시 프로미스를 반환한다.**

**프로미스가 아닌 값을 반환하더라도 이행 상태의 프로미스(resolved promise)로 값을 감싸 이행된 프로미스가 반환되도록 한다.**

명시적으로 프로미스를 반환하는 것도 가능한데, 결과는 동일하다.

```js
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

<br />

💡 **즉, `async`가 붙은 함수는 반드시 프로미스를 반환하고, 프로미스가 아닌 것은 프로미스로 감싸 반환한다.**

그런데 `async`가 제공하는 기능은 이 뿐만이 아니다!

또 다른 키워드 **`await`는 `async` 함수 안에서만 동작한다.**

<br />

# await

```js
// 해당 코드는 async 안에 있다.
let value = await promise;
```

💡 **자바스크립트는 `await` 키워드를 만나면 프로미스가 처리(settled)될 때까지 기다린 후 결과가 반환된다.**

1초 후 이행되는 프로미스를 예시로 사용하여 `await`가 어떻게 동작하는지 살펴보자.

```js
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('완료!'), 1000);
  });

  let result = await promise;

  alert(result); // "완료!"
}

f();
```

함수를 호출하고, 함수 본문이 실행되는 도중에 `await` 줄에서 실행이 잠시 중단 되었다가 프로미스가 처리되면 실행이 재개된다.

이때 프로미스 객체의 `result` 값이 변수 `result`에 할당된다.

따라서 위 예시를 실행하면 1초 뒤에 `완료!`가 출력된다.

<br />

정리하자면, `await`는 말 그대로 프로미스가 처리될 때까지 함수 실행을 기다리게 만든다.

프로미스가 처리되면 그 결과와 함께 실행이 재개되는 것이다.

❗️ **프로미스가 처리되길 기다리는 동안엔 엔진이 다른 일(다른 스크립트를 실행, 이벤트 처리 등)을 할 수 있기 때문에, CPU 리소스가 낭비되지 않는다.**

<br />

이처럼 `await`는 `promise.then`보다 좀 더 세련되게 프로미스의 `result` 값을 얻을 수 있도록 해주는 문법이다.

`promise.then`보다 가독성이 좋고 쓰기도 쉽다.

다시 한번 말하지만, 일반 함수엔 `await`을 사용할 수 없다. `async` 함수에서만 가능!

<br />

그럼 프로미스 체이닝을 `async/await`을 사용해 구현해보자!

```js
async function showAvatar() {
  // JSON 읽기
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // github 사용자 정보 읽기
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // 아바타 보여주기
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = 'promise-avatar-example';
  document.body.append(img);

  // 3초 대기
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

<a href="/220404-js-promise">프로미스(1)</a> 포스트에서 작성한 프로미스 체이닝 코드에 비해 깔끔해지고 읽기도 쉬워졌다.

<br />

주의사항! `await`는 최상위 레벨 코드(top-level code)에서 작동하지 않는다.

```js
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

위와 같은 코드가 동작하지 않는 것이다.

하지만 아래처럼 **익명 `async` 함수**로 코드를 감싸면 최상위 레벨 코드에도 `await`를 사용할 수 있다.

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

> 클래스에서도 메스서드 이름 앞에 `async`를 추가하면 `async` 클래스 메서드를 선언할 수 있다.

## 에러 핸들링

프로미스가 정상적으로 이행되면 `await promise`는 프로미스 객체의 `result`에 저장된 값을 반환한다.

반면 프로미스가 거부되면 마치 `throw`문을 작성한 것처럼 에러가 던져진다.

```js
async function f() {
  await Promise.reject(new Error("에러 발생!"));
}
```

```js
async function f() {
  throw new Error("에러 발생!");
}
```

위 두 코드는 동일하다.

실제 상황에서 프로미스가 거부 되기 전에 약간의 시간이 지체되는 경우가 있다.

이런 경우엔 `await`가 에러를 던지기 전에 지연이 발생한다.

```js
async function f() {
  try {
    let response = await fetch('http://유효하지-않은-주소');
    let user = await response.json();
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
```

이처럼 `await`가 던진 에러는 `throw`가 던진 에러를 잡을 때처럼 `try..catch`를 사용해 잡을 수 있다!

위 코드의 `catch`에서 `fetch`와 `response.json`에서 발행한 에러 모두 잡는다.

<br />

`try..catch`가 없으면 아래 예시의 `async` 함수 `f()`를 호출해 만든 프로미스가 거부 상태가 된다.

`f()`에 `.catch`를 추가하면 거부된 프로미스를 처리할 수 있다.

```js
async function f() {
  let response = await fetch('http://유효하지-않은-url');
}

f().catch(alert); // TypeError: failed to fetch 
```

<br />

`.catch`를 추가하는 걸 잊으면? 

전역 이벤트 핸들러 `unhandledrejection`! 알고있쥬?

<br />

`async/await`을 사용하면 `await`가 대기를 처리해주기 때문에 `.then`이 거의 필요하지 않는다.

여기에 더하여 `.catch` 대신 일반 `try..catch`를 사용할 수 있다는 장점도 생긴다.

항상 그러한 것은 아니지만, `promise.then`을 사용하는 것보다 `async/await`를 사용하는 것이 대개는 더 편리하다!

<br />

그런데 문법 제약 때문에 `async`함수 바깥의 최상위 레벨 코드에선 `await`를 사용할 수 없다..

그렇기 때문에 관행처럼 `.then/catch`를 추가해 최종 결과나 처리되지 못한 에러를 다룬다.

> **여러 개의 프로미스가 모두 처리되길 기다려야 하는 상황이라면** 이 프로미스들을 `Promise.all`로 감싸고 여기에 `await`를 붙여 사용할 수 있다. <p>`let results = await Promise.all([ ... ]);`<p /> 실패한 프로미스에서 발생한 에러는 보통 에러와 마찬가지로 `Promise.all`로 전파된다. 에러 때문에 생긴 예외는 `try..catch`로 감싸 잡을 수 있다.

<br />
<br />

이로써 프로미스에 대한 개념 정리는 끝이 났다! (아마도..?)

<a href="/220404-js-promise">프로미스(1)</a> 포스트부터 이번 포스트까지 너무 중요한 개념들이다.

그만큼 쉽지는 않기에 반복해서 해당 개념들을 학습해야겠다.

화이팅 🔥

<br />

## ※ Source

🖥 ko.javascript.info