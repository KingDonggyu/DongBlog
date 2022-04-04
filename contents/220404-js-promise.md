---
date: '2022-04-04T15:32'
title: '[JavaScript] 프로미스'
category: 'Language'
categoryColor: '#25e5bd'
tags: ['JS']
---

지난 포스트에서 콜백 지옥에 대해 살펴보았다.

이번 포스트에서는 콜백 지옥을 피할 수 있는 가장 좋은 방법 중 하나인 **프로미스(promise)** 에 대해 알아보겠다.

먼저 **프로미스의 기본 개념과 문법**에 대해 살펴본 후, 콜백 지옥의 해결법인 **프로미스 체이닝**을 학습해보자.

# 프로미스 기본

<hr />

- **'제작 코드(producing code)'** 는 원격에서 스크립트를 불러오는 것 같은 시간이 걸리는 일을 한다.

- **'소비 코드(consuming code)'** 는 '제작 코드’의 결과를 기다렸다가 이를 소비한다 이때 소비 주체(함수)는 여럿이 될 수 있다.

프로미스(promise) 는 이러한 '제작 코드’와 '소비 코드’를 연결해 주는 특별한 자바스크립트 객체이다.

프로미스는 시간이 얼마나 걸리든 상관없이 약속한 결과를 만들어 내는 '제작 코드’가 준비되었을 때, 모든 소비 코드가 결과를 사용할 수 있도록 해준다.

이러한 프로미스엔 더 많은 기능이 있고, 한계가 있다.

<br />

`promise` 객체는 아래와 같은 문법으로 만들 수 있다.

```js
let promise = new Promise(function (resolve, reject) {
  // executor (제작 코드)
});
```

`new Promise`에 전달되는 함수는 executor(실행자, 실행 함수) 라고 부른다.

executor는 `new Promise`가 만들어질 때 자동으로 실행되는데, 결과를 최종적으로 만들어내는 제작 코드를 포함한다.

executor의 인수 **`resolve`와 `reject`는 자바스크립트에서 자체 제공하는 콜백이다.**

따라서 `resolve`와 `reject`를 신경 쓰지 않고 executor 안 코드만 작성하면 된다.

대신! executor에선 결과를 즉시 얻든 늦게 얻든 상관없이 상황에 따라 **인수로 넘겨준 콜백 중 하나를 반드시 호출해야 한다.**

<br />

- **`resolve(value)`** : 일이 성공적으로 끝난 경우 그 결과를 나타내는 `value`와 함께 호출

- **`reject(error)`** : 에러 발생 시 에러 객체를 나타내는 `error`와 함께 호출

executor는 자동으로 실행되는데 여기서 원하는 일이 처리된다.

처리가 끝나면 executor는 처리 성공 여부에 따라 `resolve`나 `reject`를 호출한다.

<br />

한편, `new Promise` 생성자가 반환하는 `promise` 객체는 다음과 같은 내부 프로퍼티를 갖는다.

- **`state`** : 처음엔 `"pending"`이었다 `resolve`가 호출되면 `"fulfilled"`, `reject`가 호출되면 `"rejected"`로 변한다.

- **`result`** : 처음엔 `undefined`이었다 `resolve(value)`가 호출되면 `value`로, `reject(error)`가 호출되면 `error`로 변한다.

따라서 executor는 아래 그림과 같이 `promise`의 상태를 둘 중 하나로 변화시킨다.

```js
new Promise(executor)
|-------------------|                   |--------------------|
| state: "pending"  | ----------------> | state: "fulfilled" |
| result: undefined |  resolve(value)   | result: value      |
|-------------------|                   |--------------------|
          |
          |
          |                             |--------------------|
          |---------------------------> | state: "rejected"  |
                       reject(error)    | result: error      |
                                        |--------------------|
```

<br />

그럼 `promise` 생성자와 간단한 executor 함수로 만든 예시를 살펴보자.

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve('done'), 1000);
});
```

1. executor는 `new Promise`에 의해 자동으로 그리고 즉각적으로 호출된다.

2. executor는 인자로 `resolve`와(또는) `reject` 함수를 받는다.

그렇기에 프로미스가 만들어지면 executor 함수는 자동으로 실행되고 1초 후, `resolve("done")`이 호출되고 결과가 생성된다.

( = `result`가 `'done'`이 된다. 만약 1초 후 `reject(new Error())`가 호출되었다면 `result`는 `error`가 된다.)

이처럼 일이 성공적으로 처리되었을 때의 프로미스는 **'fulfilled promise(약속이 이행된 프로미스)'** 라고 불린다.

또한, 이행(resolved) 혹은 거부(rejected) 상태의 프로미스는 **‘처리된(settled)’ 프로미스** 라고 부르며, 반대되는 프라미스로 **'대기(pending)'상태의 프로미스** 가 있다.

<br />

❗️ **프로미스는 성공 또는 실패만 한다.**

executor는 `resolve`나 `reject` 중 하나를 반드시 호출해야 하며, 이때 변경된 상태는 더 이상 변하지 않는다.

따라서, 아래와 같이 이미 처리가 끝난 프라미스에 `resolve`와 `reject`를 호출하면 무시된다.

```js
let promise = new Promise(function (resolve, reject) {
  resolve('done');

  reject(new Error('…')); // 무시
  setTimeout(() => resolve('…')); // 무시
});
```

이렇게 executor에 의해 처리가 끝난 일은 결과 혹은 에러만 가질 수 있다는 것이다.

여기에 더하여 `resolve`나 `reject`는 인수를 하나만 받고(혹은 아무것도 받지 않음) 그 이외의 인수는 무시한다는 특성도 있다.

> 무언가 잘못된 경우, executor는 `reject`를 호출해야 한다. 이때 인수는 `resolve`와 마찬가지로 어떤 타입도 가능하지만 `Error` 객체 또는 `Error`를 상속받은 객체를 사용할 것을 추천한다. 이유는 뒤에서 설명하겠다.

## then, catch, finally

프로미스 객체는 executor와 결과나 에러를 받을 소비 함수를 이어주는 역할을 한다.

그리고 소비함수는 `.then`, `.catch`, `.finally` 메서드를 사용해 등록된다.

<br />

- ### then

`.then`은 프로미스에서 가장 중요하고 기본이 되는 메서드이다. 문법은 다음과 같다.

```js
promise.then(
  function (result) {
    /* 결과(result)를 다룬다 */
  },
  function (error) {
    /* 에러(error)를 다룬다 */
  }
);
```

아래는 이를 활용한 예시이다.

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve('done!'), 1000);
});

promise.then(
  (result) => alert(result), // 1초 후 "done!"을 출력
  (error) => alert(error) // 실행되지 않음
);
```

`resolve` 함수는 `.then`의 첫 번째 함수를 실행한다.

만약 `resolve`가 아닌 `reject` 함수가 호출되었다면, `.then`의 두 번째 함수가 실행된다.

```js
promise.then(alert); // 1초 뒤 "done!" 출력
```

작업이 성공적으로 처리된 경우만 다루고 싶다면, 위 코드처럼 `.then`에 인수를 하나만 전달하면 된다.

<br />

- ### catch

에러가 발생한 경우만 다루고 싶다면 `.then(null, errorHandlingFunction)`같이 `null`을 첫 번째 인수로 전달하면 된다.

`.catch(errorHandlingFunction)`를 써도 되는데, `.catch`는 `.then`에 `null`을 전달하는 것과 동일하게 작동한다.

<br />

- ### finally

`try {...} catch {...}`에 `finally` 절이 있는 것처럼, 프로미스에도 `finally`가 있다.

프로미스가 처리되면(이행이나 거부) `f`가 항상 실행된다는 점에서 `.finally(f) `호출은 `.then(f, f)`과 유사하다.

쓸모가 없어진 로딩 인디케이터(loading indicator)를 멈추는 경우 같이, 결과가 어떻든 마무리가 필요하면 `finally`가 유용하다.

```js
new Promise((resolve, reject) => {
  /* 시간이 걸리는 어떤 일을 수행하고, 그 후 resolve, reject를 호출함 */
})
  // 성공·실패 여부와 상관없이 프라미스가 처리되면 실행됨
  .finally(() => 로딩 인디케이터 중지)
  .then(
      result => alert(result), 
      error => alert(error)
  ;)   
```

<br />

그런데 `finally`는 `.then(f, f)`과 완전히 같진 않다. 차이점은 다음과 같다.

- `finally` 핸들러엔 인수가 없다. 그렇기에 `finally`에선 프라미스가 이행되었는지, 거부되었는지 알 수 없다.

  `finally`에선 절차를 마무리하는 ‘보편적’ 동작을 수행하기 때문에 **성공·실패 여부를 몰라도 된다.**

- **`finally` 핸들러는 자동으로 다음 핸들러에 결과와 에러를 전달한다.** (위 예시코드를 보면 알 수 있다)

- `.finally(f)`는 함수 `f`를 중복해서 쓸 필요가 없기 때문에 `.then(f, f)`보다 문법 측면에서 더 편리하다.

> 프로미스가 대기 상태일 때, `.then/catch/finally` 핸들러는 프라미스가 처리되길 기다린다. 반면, 프로미스가 이미 처리상태라면 핸들러가 즉각 실행된다.

## 예시

```js
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

    document.head.append(script);
  });
}
```

콜백 함수 대신, 스크립트 로딩이 완전히 끝났을 때 이행되는 프라미스 객체를 만들고, 이를 반환한다. 

사용법은 다음과 같다.

```js
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src}을 불러왔습니다!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('또다른 핸들러...'));
```

이처럼 프로미스에 원하는 만큼 `.then`을 호출할 수 있다.

프라미스를 사용하면 흐름이 자연스럽고 유연한 코드를 작성할 수 있다.

<br />
<br />

# 프로미스 체이닝

<hr />

자, 그럼 콜백 지옥 문제를 이제 해결해보자.

스크립트를 불러오는 것과 같이 순차적으로 처리해야 하는 비동기 작업이 여러 개 있다고 가정해보자. 

어떻게 해야 이런 상황을 코드로 풀어낼 수 있을까?

<br />

프로미스를 사용하면 여러 가지 해결책을 만들 수 있다.

이번 포스트에선 **프라미스 체이닝(promise chaining)** 을 이용한 비동기 처리에 대해 다루도록 하겠다.

프로미스 체이닝은 아래와 같이 생겼다.

```js
new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000); 
}).then(function(result) { 
  alert(result); // 1
  return result * 2;
}).then(function(result) { 
  alert(result); // 2
  return result * 2;
}).then(function(result) {
  alert(result); // 4
  return result * 2;
});
```

위 예시는 아래와 같은 순서로 실행된다.

1. 1초 후 최초 프라미스가 이행된다. 

2. 이후 첫번째 `.then` 핸들러가 호출된다. 

3. 2에서 반환한 값은 다음 `.then` 핸들러에 전달된다.

4. 이런 과정이 계속 이어진다.

<br />

이러한 프로미스 체이닝이 가능한 이유는 `promise.then`을 호출하면 프로미스가 반환되기 때문이다. 

반환된 프로미스에서도 당연히 `.then`을 호출할 수 있다.

<br />

## 프로미스 반환하기

`.then(handler)`에 사용된 핸들러가 프로미스를 생성하거나 반환하는 경우도 있다.

이 경우 이어지는 핸들러는 프로미스가 처리될 때까지 기다리다가 처리가 완료되면 그 결과를 받는다.

```js
new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
}).then(function(result) {
  alert(result); // 1
  return new Promise((resolve, reject) => { 
    setTimeout(() => resolve(result * 2), 1000);
  });
}).then(function(result) { 
  alert(result); // 2
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });
}).then(function(result) {
  alert(result); // 4
});
```

첫 번째 `.then`은 `1`을 출력하고 `new Promise(…)`를 반환한다.

1초 후 이 프라미스가 이행되고 그 결과(`resolve`의 인수인 `result * 2`)는 두 번째 `.then`으로 전달된다. 

두 번째 핸들러는 `2`를 출력하고 동일한 과정이 반복된다.

따라서, 얼럿 창 사이에 1초의 딜레이가 생긴다.

이렇게 핸들러 안에서 프라미스를 반환하는 것도 비동기 작업 체이닝을 가능하게 해준다.

<br />

## 예시 계선하기

'프로미스 개념' 부분의 '예시' 를 개선해보자.

```js
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) { // (*)
    one();
    two();
    three();
  });
```

불러온 스크립트 안에 정의된 함수를 호출해 (`(*)` 부분), 실제로 스크립트들이 정상적으로 로드되었는지 확인한다.

스크립트를 정상적으로 불러왔기 때문에 스크립트 내의 함수를 호출할 수 있다.

화살표 함수를 사용하면 다음과 같이 코드를 줄일수도 있다.

```js
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    one();
    two();
    three();
  });
```

<br />

`loadScript`를 호출할 때마다 프로미스가 반환되고 다음 `.then`은 이 프로미스가 이행되었을 때 실행된다.

이후에 다음 스크립트를 로딩하기 위한 초기화가 진행된다. 스크립트는 이런 과정을 거쳐 순차적으로 로드된다.

체인에 더 많은 비동기 동작을 추가할 수도 있는데, **추가 작업이 많아져도 코드가 오른쪽으로 길어지지 않고 아래로만 증가해서 콜백 지옥이 만들어지지 않는다!**

<br />

아래와 같이 각 `loadScript`에 `.then`을 바로 붙일 수도 있다.

```js
loadScript("/article/promise-chaining/one.js").then(script1 => {
  loadScript("/article/promise-chaining/two.js").then(script2 => {
    loadScript("/article/promise-chaining/three.js").then(script3 => {
      one();
      two();
      three();
    });
  });
});
```

이렇게 `.then`을 바로 붙여도 동일한 동작(스크립트 세 개를 순차적으로 불러오는 작업)을 수행한다. 

하지만 코드가 **오른쪽으로** 길어졌다. 콜백에서 언급한 문제와 동일한 문제가 발생했다..

그러나 중첩 함수에서 외부 스코프에 접근할 수 있기 때문에 위 예시처럼 `.then`을 바로 쓰는 게 괜찮은 경우도 있다. 

위 예제에서 가장 깊은 곳에 있는 중첩 콜백은 `script1`, `script2`, `script3` 안에 있는 변수 모두에 접근할 수 있다. 

<br />

## fetch와 체이닝 함께 응용하기

프론트 단에선, 네트워크 요청 시 프로미스를 자주 사용한다. 

메서드 `fetch`를 사용해 원격 서버에서 사용자 정보를 가져오는 예시를 다루어보자.

(`fetch`엔 다양한 선택 매개변수가 있는데 자세한 내용은 별도의 포스트에서 다루겠다.)

```js
let promise = fetch(url);
```

위 코드를 실행하면 `url`에 네트워크 요청을 보내고 프로미스를 반환한다. 

원격 서버가 헤더와 함께 응답을 보내면, 프로미스는 `response` 객체와 함께 이행된다. 

그런데 이때 `response` 전체가 완전히 다운로드되기 전에 프로미스는 이행 상태가 되어버린다.

<br />

응답이 완전히 종료되고, 응답 전체를 읽으려면 메서드 `response.text()`를 호출해야 한다. 

`response.text()`는 원격 서버에서 전송한 텍스트 전체가 다운로드되면, 이 텍스트를 `result` 값으로 갖는 이행된 프라미스를 반환한다.

<br />

아래 코드를 실행하면 `user.json`에 요청이 가고 서버에서 해당 텍스트를 불러온다.

```js
fetch('/article/promise-chaining/user.json')
  // 원격 서버가 응답하면 .then 아래 코드가 실행된다.
  .then(function(response) {
    // response.text()는 응답 텍스트 전체가 다운로드되면
    // 응답 텍스트를 새로운 이행 프라미스를 만들고, 이를 반환한다.
    return response.text();
  })
  .then(function(text) {
    // 원격에서 받아온 파일의 내용
    alert(text); // {"name": "iliakan", "isAdmin": true}
  });
```

주석을 보면 위 코드의 흐름을 알 수 있다.

그런데 메서드 `response.json()` 를 쓰면 원격에서 받아온 데이터를 읽고 JSON으로 파싱할 수 있다. 

예시엔 이 메서드가 더 적합하므로 기존에 작성한 코드를 약간 변경해 보겠다.

```js
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan, got user name
```

<br />

이번엔 좀 더 복잡한 예시를 살펴보자.

```js
// user.json에 요청을 보낸다.
fetch('/article/promise-chaining/user.json')
  // 응답받은 내용을 json으로 불러온다.
  .then(response => response.json())
  // GitHub에 요청을 보낸다.
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // 응답받은 내용을 json 형태로 불러온다.
  .then(response => response.json())
  // 3초간 아바타 이미지(githubUser.avatar_url)를 보여준다.
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
```

코드는 주석에 적은 대로 잘 동작한다. 

그런데 위 코드엔 프로미스를 다루는데 잠재적 문제가 내재돼 있다.

`(*)`로 표시한 줄을 보자. 만약 아바타가 잠깐 보였다가 사라진 이후에 무언가를 하고 싶으면 어떻게 해야 할까? 

사용자 정보를 수정할 수 있게 해주는 폼을 보여주는 것 같은 작업을 추가하는 경우같이 말이다. 

지금으로선 방법이 없다..

<br />

체인을 확장할 수 있도록 만들려면 아바타가 사라질 때 이행 프라미스를 반환해줘야 한다.

아래와 같이!

```js
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser); 
    }, 3000);
  }))
  // 3초 후 동작
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

`(*)`로 표시한 곳의 `.then` 핸들러는 이제 `setTimeout`안의 `resolve(githubUser)`를 호출했을 때, 

처리상태가 되는 `new Promise`를 반환한다. 그록 체인의 다음 `.then`은 이를 기다린다.

<br />

이처럼 **비동기 동작은 항상 프라미스를 반환하도록 하는 것이 좋다.** 

지금은 체인을 확장할 계획이 없더라도 이렇게 구현해 놓으면 **나중에 체인 확장이 필요한 경우 손쉽게 체인을 확장할 수 있다.**

<br />

이제 코드를 재사용 가능한 함수 단위로 분리해 마무리하겠다 👏👏👏

```js
function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json());
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
  // ...
```

<br />
<br />

네트워크 요청시 자주 사용되므로 아~주 중요한 개념이다!

마음만 같아선 이번 포스트에 프로미스에 관한 내용을 전부 다루고 싶지만..

오늘은 이만 마치겠다. 이미 충분히 내용이 많다 😅

다음 포스트에서도 프로미스에 관한 내용들을 다루도록 하겠다.

<br />

## ※ Source

🖥 ko.javascript.info