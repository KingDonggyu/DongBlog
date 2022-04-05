---
date: '2022-04-05T11:00'
title: '[JavaScript] 프로미스(2)'
category: 'Language'
categoryColor: '#25e5bd'
tags: ['JS']
---

지난 포스트에 이어 프로미스에 대해 더 살펴보도록 하겠다.

프로미스를 통한 **에러 핸들링**, 프로미스의 **다섯 메서드**와 **프로미스화**에 대해 차례로 알아보자.

# 프로미스와 에러 핸들링

<hr />

프로미스가 거부되면 제어 흐름이 제일 가까운 rejection 핸들러로 넘어가기 때문에, 프로미스 체인을 사용하면 에러를 쉽게 처리할 수 있다.

이는 실무에서 아주 유용한 기능이다.

다음 예시를 보자.

```js
fetch('https://no-such-server.blabla') // 거부
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: Failed to fetch
```

예시에서 보듯 `.catch`는 첫번째 핸들러일 필요가 없고, 하나 혹은 여러 개의 `.then` 뒤에 올 수 있다.

이번엔 사이트에는 아무런 문제가 없지만 응답으로 받은 JSON의 형식이 잘못된 경우를 살펴보자.

(가장 쉬운 에러 처리 방법은 **체인 끝에 `.catch`를 붙이는 것**이다.)

```js
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
  .catch(error => alert(error.message));
```

정상적인 경우라면 `.catch`는 절대 트리거 되지 않는다. 

그런데 네트워크 문제, 잘못된 형식의 JSON 등으로 인해 위쪽 프로미스 중 **하나라도 거부되면 `.catch`에서 에러를 잡게된다.**

<br />

## 암시적 try..catch

프로미스 executor와 프로미스 핸들러 코드 주위엔 **'보이지 않는(암시적) `try..catch`'** 가 있다. 

예외가 발생하면 암시적 `try..catch`에서 예외를 잡고 이를 `reject`처럼 다룬다.

```js
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
}).catch(alert); // Error: 에러 발생!
```

```js
new Promise((resolve, reject) => {
  reject(new Error("에러 발생!"));
}).catch(alert); // Error: 에러 발생!
```

위 두 예시는 똑같이 동작한다.

executor 주위의 '암시적 `try..catch`'는 스스로 에러를 잡고, 에러를 거부상태의 프로미스로 변경시킨다.

<br />

이런 일은 executor 함수뿐만 아니라 핸들러에서도 발생한다. 

`.then` 핸들러 안에서 `throw`를 사용해 에러를 던지면, 이 자체가 거부된 프로미스를 의미하게 된다. 

따라서 제어 흐름이 가장 가까운 에러 핸들러로 넘어간다.

```js
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
  throw new Error("에러 발생!"); // 프로미스가 거부됨
}).catch(alert); // Error: 에러 발생!
```

`throw`문이 만든 에러뿐만 아니라 모든 종류의 에러가 암시적 `try..catch`에서 처리된다. 

암시적 `try..catch`가 프로그래밍 에러를 어떻게 처리하는지 살펴보자.

```js
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
  blabla(); // 존재하지 않는 함수
}).catch(alert); // ReferenceError: blabla is not defined
```

마지막 `.catch`는 이렇게 명시적인 거부 뿐만 아니라 핸들러 위쪽에서 발생한 비정상 에러 또한 잡는다.

<br />

그럼 아래 예시에서 `.catch`가 트리거될까?

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("에러 발생!");
  }, 1000);
}).catch(alert);
```

**❌ `.catch`는 트리거 되지 않는다.**

위에서 언급했듯이, 암시적 `try..catch`가 함수 코드를 감싸고 있으므로 

❗️ **모든 동기적 에러는 암시적 `try..catch`에서 처리된다.**

하지만 여기에서 에러는 executor가 실행되는 동안이 아니라 나중에 발생한다. 따라서 프로미스는 에러를 처리할 수 없다!

원하는대로 동작하려면?

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    reject(new Error("에러 발생!"));
  }, 1000);
}).catch(alert);
```

`throw`를 `reject`로 변경했다!

<br />

## 다시 던지기

체인 마지막의 `.catch`는 `try..catch`와 유사한 역할을 한다. 

앞서 보았듯이, `.then` 핸들러를 원하는 만큼 사용하다 **마지막에 `.catch` 하나만 붙이면 `.then` 핸들러에서 발생한 모든 에러를 처리할 수 있다!**

또한, 일반 `try..catch`에서 처리할 수 없는 에러라 판단되면 에러를 다시 던질 때가 있는 것처럼, 프로미스에도 유사한 일을 할 수 있다.

<br />

**`.catch` 안에서 `throw`를 사용하면 제어 흐름이 가장 가까운 곳에 있는 에러 핸들러로 넘어간다.** 

**여기서 에러가 성공적으로 처리되면, 가장 가까운 곳에 있는 `.then` 핸들러로 제어 흐름이 넘어가 실행이 이어진다.**

```js
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
}).catch(function(error) {
  alert("에러가 잘 처리되었습니다. 정상적으로 실행이 이어집니다.");
}).then(() => alert("다음 핸들러가 실행됩니다."));
```

위 예시에서 `.catch` 블록이 정상적으로 종료되었기 때문에 다음 성공 핸들러 `.then`이 호출된 것을 확인할 수 있다.

.catch를 활용한 또 다른 사례를 살펴보자. 

`(*)`로 표시한 핸들러에서 에러를 잡는데, 여기서는 에러를 처리하지 못하기 때문에 (`URIError` 처리 방법만 알고 있음) 에러를 다시 던진다.

```js
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
}).catch(function(error) { // (*)
  if (error instanceof URIError) {
    // 에러 처리
  } else {
    alert("처리할 수 없는 에러");
    throw error; // 에러 다시 던지기
  }
}).then(function() {
  /* 여기는 실행되지 않는다. */
}).catch(error => { // (**)
  alert(`알 수 없는 에러가 발생함: ${error}`);
  // 반환값이 없음 => 실행이 계속됨
});
```

실행 흐름이 첫 번째 `(*)`로 넘어갔다가 다음 `(**)`로 이어지는 것을 확인할 수 있다. (`catch` -> `catch`)

<br />

## 처리되지 못한 거부

에러를 처리하지 못하면 무슨 일이 생길까? 체인 끝에 `.catch`를 추가하지 못하는 경우처럼 말이다.

에러가 발생하면 프로미스는 거부상태가 되고, 실행 흐름은 가장 가까운 rejection 핸들러로 넘어간다. 

그런데 예외를 처리해 줄 핸들러가 없어서 에러가 ‘갇혀버린다’. 에러를 처리할 코드가 없기 때문에..

<br />

이런 식으로 코드에 처리하지 못한 에러가 남게 되면 실무에선 끔찍한 일이 발생한다 😨

일반적인 에러가 발생하고 이를 `try..catch`에서 처리하지 못하는 경우를 생각해보자. 

스크립트가 죽고 콘솔 창에 메시지가 출력될 것이다. 거부된 프로미스를 처리하지 못했을 때도 유사한 일이 발생한다.

<br />

**자바스크립트 엔진은 프로미스 거부를 추적하다가 위와 같은 상황이 발생하면 전역 에러를 생성한다.**

콘솔창을 열고 에러를 처리하지 못하는 프로미스 코드를 실행하면 전역 에러를 확인할 수 있다.

<br />

브라우저 환경에선 이런 에러를 `unhandledrejection` 이벤트로 잡을 수 있다!

```js
window.addEventListener('unhandledrejection', function(event) {
  alert(event.promise); // [object Promise] - 에러를 생성하는 프로미스
  alert(event.reason); // Error: 에러 발생! - 처리하지 못한 에러 객체
});

new Promise(function() {
  throw new Error("에러 발생!");
}); // 에러 처리 핸들러, catch가 없음
```

`unhandledrejection` 이벤트는 HTML 명세서에 정의된 표준 이벤트이다.

브라우저 환경에선 에러가 발생했는데 `.catch`가 없으면 `unhandledrejection` 핸들러가 트리거 된다. 

`unhandledrejection` 핸들러는 에러 정보가 담긴 `event` 객체를 받기 때문에 이 핸들러 안에서 원하는 작업을 할 수 있다.

<br />

대개 이런 에러는 회복할 수 없기 때문에, 최선의 방법은 사용자에게 문제 상황을 알리고 가능하다면 서버에 에러 정보를 보내는 것이다.

(Node.js같은 기타 호스트 환경에도 처리하지 못한 에러를 다루는 방법을 여러 가지 제공한다.)

**즉, 브라우저 환경에선 `unhandledrejection` 이벤트 핸들러를 사용해 처리되지 않은 에러를 추적하고, 이를 사용자(혹은 서버에)에게 알려서 애플리케이션이 아무런 설명도 없이 ‘그냥 죽는걸’ 방지하자!**

<br />

# 프로미스 API

<hr />

자 그럼 이번엔 프로미스의 메서드들에 대해 알아보자!

**`Promise` 클래스에는 5가지 정적 메서드가 있다.**

<br />

## Promise.all

여러 개의 프로미스를 동시에 실행시키고 모든 프로미스가 준비될 때까지 기다린다고 해보자.

복수의 URL에 동시에 요청을 보내고, 다운로드가 모두 완료된 후에 콘텐츠를 처리할 때 이런 상황이 발생한다.

`Promise.all`은 이럴 때 사용할 수 있다.

<br />

`Promise.all`은 요소 전체가 프로미스인 배열(엄밀히 따지면 이터러블 객체이지만, 대개는 배열임)을 받고 새로운 프로미스를 반환한다.

**배열 안 프로미스가 모두 처리되면 새로운 프로미스가 이행되는데, 배열 안 프로미스의 결괏값을 담은 배열이 새로운 프로미스의 `result`가 된다.**

```js
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1, 2, 3
```

위 예시의 `Promise.all`은 3초 후에 처리되고, 반환되는 프로미스의 `result`는 배열 `[1, 2, 3]`이 된다.

배열 `result`의 요소 순서는 `Promise.all`에 전달되는 프로미스 순서와 상응한다는 점에 주목해보자. 

**`Promise.all`의 첫 번째 프로미스는 가장 늦게 이행되더라도 처리 결과는 배열의 첫 번째 요소에 저장된다!**

<br />

작업해야 할 데이터가 담긴 배열을 프로미스 배열로 매핑하고, 이 배열을 `Promise.all`로 감싸는 트릭은 자주 사용된다.

URL이 담긴 배열을 `fetch`를 써서 처리하는 예시를 살펴보자.

```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];


let requests = urls.map(url => fetch(url));

Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
// https://api.github.com/users/iliakan: 200
// https://api.github.com/users/remy: 200
// https://api.github.com/users/jeresig: 200
```

먼저, `fetch`를 사용해 `url`을 프로미스로 매핑한다.

그런다음 `Promise.all`은 모든 작업이 이행될 때까지 기다린다.

<br />

한가지 주의사항❗️ 

**`Promise.all`에 전달되는 프로미스 중 하나라도 거부되면, `Promise.all`이 반환하는 프로미스는 에러와 함께 바로 거부된다!**

```js
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: 에러 발생!
```

2초 후 두 번째 프로미스가 거부되면서 `Promise.all` 전체가 거부되고, `.catch`가 실행된다. 

그렇게 거부 에러는 `Promise.all` 전체의 결과가 된다.

> **프로미스가 하나라도 거부되면 `Promise.all`은 즉시 거부되고** 배열에 저장된 다른 프로미스의 결과는 완전히 잊힌다. 이행된 프로미스의 결과도 무시된다. <br /> **하지만 하나가 실패하더라도 호출은 계속 일어난다.** 그렇더라도 `Promise.all`은 다른 호출을 더는 신경 쓰지 않는다. 프로미스가 처리되긴 하겠지만 그 결과는 무시된다.

## Promise.allSettled

`Promise.all`은 프로미스가 하나라도 거절되면 전체를 거절한다.

따라서, 프로미스 결과가 모두 필요할 때 같이 ‘모 아니면 도’ 일 때 유용하다.

반면, **`Promise.allSettled`는 모든 프로미스가 처리될 때까지 기다린다.** 

반환되는 배열은 다음과 같은 요소를 갖는다.

- **응답이 성공할 경우** : `{status:"fulfilled", value:result}`

- **에러가 발생한 경우** : `{status:"rejected", reason:error}`

<br />

`fetch`를 사용해 여러 사람의 정보를 가져오고 있다고 해보자. 

여러 요청 중 하나가 실패해도 다른 요청 결과는 여전히 있어야 한다.

```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
// https://api.github.com/users/iliakan: 200
// https://api.github.com/users/remy: 200
// https://no-such-url: TypeError: Failed to fetch
```

`Promise.allSettled`를 사용하면 이처럼 **각 프로미스의 상태와 값 또는 에러를 받을 수 있기에,** 이에 따른 유연한 처리가 가능하다.

<br />

`Promise.allSettled` 스펙에 추가된 지 얼마 안 된 문법이다. 따라서, 구식 브라우저는 폴리필이 필요하다.

아래는 폴리필을 구현한 예시이다.

```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      status: 'fulfilled',
      value
    }), reason => ({
      status: 'rejected',
      reason
    }))));
  };
}
```

여기서 `promises.map`은 입력값을 받아 `p => Promise.resolve(p)`로 입력값을 프로미스로 변화시킨다(프로미스가 아닌 값을 받은 경우). 

그리고 모든 프로미스에 `.then` 핸들러가 추가된다.

`then` 핸들러는 **성공한 프로미스**의 결과값 `value`를 `{status:'fulfilled', value}`로, **실패한 프로미스**의 결과값 `reason`을 `{status:'rejected', reason}`으로 변경한다. `Promise.allSettled`의 구성과 동일하게!

<br />

## Promise.race

`Promise.race`는 `Promise.all`과 비슷하다. 

다만 **가장 먼저 처리되는 프로미스의 결과(혹은 에러)를 반환한다.**

```js
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

첫 번째 프로미스가 가장 빨리 처리상태가 되기 때문에 첫 번째 프로미스의 결과가 `result` 값이 된다. 

이렇게 `Promise.race`를 사용하면 '경주(race)의 승자’가 나타난 순간 다른 프로미스의 결과 또는 에러는 무시된다.

> `Promise.all`에서의 거부와 같이 가장 빨리 처리한 프로미스가 나타나더라도, 다른 프로미스의 호출은 계속 일어난다.

## Promise.resolve/reject

프로미스 메서드 `Promise.resolve`와 `Promise.reject`는 `async/await` 문법(다음 포스트에서 다루겠다)이 생긴 후로 쓸모없어졌기 때문에 근래에는 거의 사용하지 않는다.

- **`Promise.resolve`**

`Promise.resolve(value)`는 결과값이 `value`인 이행 상태 프로미스를 생성한다.

즉, 아래 코드와 동일한 일을 수행한다.

```js
let promise = new Promise(resolve => resolve(value));
```

아래는 이를 활용한 예시이다.

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

`loadCached`는 인수로 받은 URL을 대상으로 `fetch`를 호출하고, 그 결과를 기억(cache)한다. 

나중에 동일한 URL을 대상으로 `fetch`를 호출하면 캐시에서 호출 결과를 즉시 가져오는데, 이때 `Promise.resolve`를 사용해 캐시 된 내용을 프로미스로 만들어 반환 값이 항상 프로미스가 되게 한다.

따라서, `loadCached`를 호출하면 **프로미스가 반환된다는 것이 보장되기 때문에**, `loadCached(url).then(…)`을 사용할 수 있다. 

(*)로 표시한 줄에서 `Promise.resolve`를 사용한 이유가 바로 여기에 있다.

<br />

- **`Promise.reject`**

`Promise.reject(error)`는 결괏값이 `error`인 거부 상태 프로미스를 생성한다.

즉, 아래 코드와 동일한 일을 수행한다.

```js
let promise = new Promise((resolve, reject) => reject(error));
```

<br />

# 프로미스화

<hr />

프로미스화를 끝으로 이번 포스트를 마무리하겠다.

**콜백을 받는 함수를 프로미스를 반환하는 함수로 바꾸는 것을 '프로미스화(promisification)'라고 한다.**

콜백보다는 프로미스가 더 편리하기 때문에, 구현을 하다 보면 콜백 기반 함수와 라이브러리를 프로미스를 반환하는 함수로 바꾸는 게 좋은 경우가 종종 생긴다.

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

  document.head.append(script);
}

let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script);
    });
  })
}

// 사용법:
// loadScriptPromise('path/script.js').then(...)
```

예시에서 볼 수 있듯이, `loadScriptPromise`는 `loadScript`에 모든 일을 **위임한다.**

`loadScript`의 콜백은 스크립트 로딩 상태에 따라 이행 혹은 거부상태의 프로미스를 반환하게 된다.

<br />

그런데 실무에선 함수 하나가 아닌 여러 개의 함수를 프로미스화 해야 할 것이다.

헬퍼 함수를 만들어, 프로미스화를 적용 할 함수 `f`를 받고 래퍼 함수를 반환하는 함수 `promisify(f)`를 만들어보자.

```js
function promisify(f) {
  return function (...args) { // 래퍼 함수를 반환
    return new Promise((resolve, reject) => {
      function callback(err, result) { // f에 사용할 커스텀 콜백
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // 위에서 만든 커스텀 콜백을 함수 f의 인수 끝에 추가
      f.call(this, ...args); // 기존 함수를 호출
    });
  };
};

// 사용법:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

위 예시는 프로미스화 할 함수가 인수가 두 개(`(err, result)`)인 콜백을 받을 것이라 가정하고 작성되었다. 

십중팔구 이런 상황일 것이고, 커스텀 콜백은 이 상황에 딱 들어맞다. `promisify`가 잘 동작하는 것은 말할 것도 없다.

그런데 함수 `f`가 두 개를 초과하는 인수를 가진 콜백, `callback(err, res1, res2, ...)`을 받는다면 어떤 일이 발생할까?

<br />

이런 경우를 대비하여 좀 더 진화한 `promisify`를 만들어 보자. 

`새롭게 만든 함수를 promisify(f, true)`형태로 호출하면, 프로미스 결과는 콜백의 성공 케이스(`results`)를 담은 배열, `[res1, res2, ...]`이 된다.

```js
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) { // f에 사용할 커스텀 콜백
        if (err) {
          reject(err);
        } else {
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);
      f.call(this, ...args);
    });
  };
};

// 사용법:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```

`callback(result)`같이 `err`가 없는 형태나 지금까지 언급하지 않은 형태의 이색적인 콜백도 있을 수 있는데, 이런 경우엔 헬퍼 함수를 사용하지 않고 직접 프로미스화 하면 된다.

>  설명한 헬퍼 함수보다 더 유용한 형태의 프로미스화를 도와주는 함수를 제공하는 모듈도 많다. **es6-promisify**가 대표적인 예이다. Node.js에선 내장 함수 `util.promisify`를 사용해 프로미스화를 할 수 있다.

프로미스화는 곧 살펴볼 `async/await`와 함께 사용하면 더 좋다.

다만, 콜백을 완전히 대체하지는 못한다는 사실을 기억하자..

프로미스는 하나의 결과만 가질 수 있지만, 콜백은 여러 번 호출할 수 있기 때문이다.

따라서 **프로미스화는 콜백을 단 한 번 호출하는 함수에만 적용하자.**

**프로미스화한 함수의 콜백을 여러 번 호출해도, 두 번째부터는 무시된다.**

<br />
<br />

이렇게 프로미스에 대한 내용을 마치겠다.

아, 사실 다음 포스트에서도 프로미스에 관련된 내용을 다룰 것이다..

프로미스 핸들링의 비동기 처리 동작을 '마이크로태스크 큐'를 통해 살펴보자.

<br />

## ※ Source

🖥 ko.javascript.info