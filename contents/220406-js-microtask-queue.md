---
date: '2022-04-06T22:00'
title: '[JavaScript] 마이크로태스크'
category: 'Language'
categoryColor: '#25e5bd'
tags: ['JS']
---

**프로미스 핸들러 `.then/catch/finally`는 항상 비동기적으로 실행된다.**

그러나 **프로미스가 즉시 이행되더라도 `.then/catch/finally` 아래에 있는 코드는 이 핸들러들이 실행되기 전에 실행된다.**

아래 예시를 보자.

```js
let promise = Promise.resolve();

promise.then(() => alert("프로미스 성공!"));

alert("코드 종료"); // 이 얼럿 창이 가장 먼저 나타납니다.
```

위 예시를 실행하면 '코드 종료’가 먼저, '프로미스 성공!'이 나중에 출력되는 것을 볼 수 있다.

프로미스는 즉시 이행상태가 되었는데도..?

왜 `.then`이 나중에 트리거 되었을까? 그 이유에 대해 알아보자!

<br />

## 마이크로태스크 큐

비동기 작업을 처리하려면 적절한 관리가 필요하다. 

이를 위해 ECMA에선 `PromiseJobs`라는 내부 큐(internal queue)를 명시한다. 

V8 엔진에선 이를 **'마이크로태스크 큐(microtask queue)'** 라고 부르기 때문에 이 용어가 좀 더 선호된다.

<br />

명세서엔 다음과 같이 설명되어있다.

- **마이크로태스크 큐는 먼저 들어온 작업을 먼저 실행한다(FIFO, first-in-first-out).**

- **실행할 것이 아무것도 남아있지 않을 때만 마이크로태스크 큐에 있는 작업이 실행되기 시작한다.**

<br />

💡 요약하면, 어떤 프로미스가 준비되었을 때 이 프로미스의 `.then/catch/finally` 핸들러가 큐에 들어간다고 생각하면 된다!

**이때 핸들러들은 실행되지 않는다. 현재 코드에서 자유로운 상태가 되었을 때에서야 자바스크립트 엔진은 큐에서 작업을 꺼내 실행한다.**

위 예시에서 '코드 종료’가 먼저 출력되는 이유가 바로 여기에 있다!

```js
promise.then(handler);             ⏳ * handler enqueued *
...                                |
alert('code finished');            | 
--------------------------         |
script execution finished          v   

* queued handler runs *
```

<br />

프로미스 핸들러는 항상 내부 큐를 통과하게 된다.

여러 개의 `.then/catch/finally`를 사용해 만든 체인의 경우, 각 핸들러는 비동기적으로 실행된다.

❗️ **큐에 들어간 핸들러 각각은 현재 코드가 완료되고, 큐에 적제된 이전 핸들러의 실행이 완료되었을 때 실행된다.**

<br />

그렇다면! 위 예시에서 '프라미스 성공!'을 먼저, '코드 종료’를 나중에 출력되게 하려면 어떻게 해야 할까?

실행 순서가 중요한 경우엔 이런 요구사항이 충족되도록 코드를 작성해야 한다.

방법은 쉽다!

```js
Promise.resolve()
  .then(() => alert("프라미스 성공!"))
  .then(() => alert("코드 종료"));
```

그냥 `.then`을 사용해 큐에 넣으면 된다 😜

이렇게 하면 의도한 대로 순서가 변경된다.

<br />

## 처리되지 못한 거부

이전 포스트(<a href="/220405-js-promise-2/">프로미스(2)</a>)의 '프로미스와 에러 핸들링' 부문에서 '처리되지 못한 거부'로 인한 에러를 잡기 위한 `unhandledrejection` 이벤트를 살펴보았다.

이제 자바스크립트 엔진이 어떻게 처리되지 못한 거부(unhandled rejection)를 찾는지 정확히 알 수 있다!

❗️ **’처리되지 못한 거부’는 마이크로태스크 큐 끝에서 프라미스 에러가 처리되지 못할 때 발생한다.**

<br />

정상적인 경우라면 에러가 생길 것을 대비하여 프로미스 체인에 `.catch`를 추가해 에러를 처리한다.

**그런데 `.catch`를 추가해주는 걸 잊은 경우, 엔진은 마이크로태스크 큐가 빈 이후에 `unhandledrejection` 이벤트를 트리거 한다.**

```js
let promise = Promise.reject(new Error("프로미스 실패!"));
// promise.catch(err => alert('잡았다!')); <- 코드가 있으면 addEventListener 가 실행되지 않는다.

window.addEventListener('unhandledrejection', event => alert(event.reason));
// Error: 프로미스 실패!
```

<br />

그런데 만약 아래와 같이 `setTimeout`을 이용해 에러를 나중에 처리하면 어떤 일이 생길까?

```js
let promise = Promise.reject(new Error("프로미스 실패!"));
setTimeout(() => promise.catch(err => alert('잡았다!')), 1000);

window.addEventListener('unhandledrejection', event => alert(event.reason));
```

예시를 실행하면 `프라미스 실패!` 가 먼저, `잡았다!` 가 나중에 출력되는 걸 확인할 수 있다.

`unhandledrejection`은 마이크로태스크 큐에 있는 작업 모두가 완료되었을 때 생성된다. 

엔진은 프라미스들을 검사하고 이 중 하나라도 ‘거부(rejected)’ 상태이면 `unhandledrejection` 핸들러를 트리거 한다. 

이로써 에러를 잡았는데도 `unhandledrejection` 핸들러가 실행되는 것이다.

<br />

위 예시를 실행하면 `setTimeout`을 사용해 추가한 `.catch` 역시 트리거 된다. 

다만 `.catch`는 `unhandledrejection`이 발생한 이후에 트리거 되므로 `프라미스 실패!` 가 출력된다.

<br />
<br />

오.. 재밌는 개념이었다.

후에 '이벤트 루프와 매크로·마이크로태스크' 에 관한 포스팅을 통해, 이번에 학습한 내용에 대한 지식을 더 확장해보자!

<br />

## ※ Source

🖥 ko.javascript.info