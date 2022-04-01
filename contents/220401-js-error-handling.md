---
date: "2022-04-01T15:30"
title: "[JavaScript] 에러 핸들링"
category: "Language"
categoryColor: "#25e5bd"
tags: ["JS"]
---

3월 초에 프론트엔드 개발자가 될 것을 결심하고, 한달 내내 자바스크립트를 학습했다.

그렇게 벌써 4월이다.. 이번 달도 화이팅하자.

<br />

오늘은 에러 핸들링! 중요하다.

아무리 프로그래밍에 능한 사람이더라도 에러가 있는 스크립트를 작성할 수 있다.

실수, 예상치 못한 사용자 입력, 잘못된 서버 응답 등의 수천만 가지 이유가 있을 것이다.

이러한 에러가 발생하면 스크립트는 죽고(즉시 중단되고), 콘솔에 에러가 출력된다.

<br />

예상치 못한 에러로 인해 스크립트가 갑자기 죽어버리는 것을 방지해야겠지?

에러를 대비해 적절한 조치를 취해두어야 한다!

<br />

# try..catch

<hr />

`try..catch` 문법을 사용하면 스크립트가 죽는 걸 방지하고, 에러를 잡아서(catch) 더 합당한 무언가를 할 수 있게 된다.

`try…catch` 동작 알고리즘은 다음과 같다.

1. 먼저, `try {...}` 안의 코드가 실행된다.

2. 에러가 없다면, `try` 안의 마지막 줄까지 실행되고, `catch` 블록은 건너뛴다.

3. 에러가 있다면, `try` 안 코드의 실행이 중단되고, `catch(err)` 블록으로 제어 흐름이 넘어간다. 변수 `err`(아무 이름이나 사용 가능)는 무슨 일이 일어났는지에 대한 설명이 담긴 에러 객체를 포함한다.

<br />

❗️ **`try..catch`는 오직 런타임 에러에만 동작한다.**

자바스크립트 엔진은 코드를 읽고 난 후 코드를 실행한다.

코드를 읽는 중에 발생하는 에러는 **'parse-time 에러’** 라고 부르는데, 엔진은 이 코드를 이해할 수 없기 때문에 parse-time 에러는 코드 안에서 복구가 불가능하다.

따라서, 실행 가능한(runnable) 코드에서 발생하는 에러만 처리할 수 있다. (실행 가능한 코드 = 유효한 자바스크립트 코드)

이러한 에러를 **‘런타임 에러(runtime error)’** 혹은 **'예외(exception)'** 라고 부른다.

<br />

❗️ **`try..catch`는 동기적으로 동작한다.**

`setTimeout`처럼 ‘스케줄 된(scheduled)’ 코드에서 발생한 예외는 `try..catch`에서 잡아낼 수 없다.

```js
try {
  setTimeout(function () {
    noSuchVariable; // 스크립트는 여기서 죽는다.
  }, 1000);
} catch (e) {
  alert("작동 멈춤");
}
```

`setTimeout`에 넘겨진 익명 함수는 엔진이 `try..catch`를 떠난 다음에서야 실행되기 때문이다!

스케줄 된 함수 내부의 예외를 잡으려면, `try..catch`를 반드시 함수 내부에 구현해야 한다. 아래처럼.

```js
setTimeout(function () {
  try {
    noSuchVariable; // 이제 try..catch에서 에러를 핸들링 할 수 있다.
  } catch {
    alert("에러를 잡았습니다!");
  }
}, 1000);
```

<br />

## 에러 객체

에러가 발생하면 자바스크립트는 에러 상세내용이 담긴 객체를 생성한다.

그 후, `catch` 블록에 이 객체를 인수로 전달한다.

이러한 내장 에러 전체와 에러 객체는 두 가지 주요 프로퍼티를 가진다.

- **`name` : 에러 이름.** 정의되지 않은 변수 때문에 발생한 에러라면 `"ReferenceError"`가 이름이 된다.

- **`message` : 에러 상세 내용을 담고 있는 문자 메시지.**

표준은 아니지만, `name`과 `message` 이외에 대부분의 호스트 환경에서 지원하는 프로퍼티도 있다.

`stack`은 가장 널리 사용되는 비표준 프로퍼티 중 하나이다.

- **`stack` : 현재 호출 스택.** 에러를 유발한 중첩 호출들의 순서 정보를 가진 문자열로 디버깅 목적으로 사용된다.

<br />

```js
try {
  lalala; // Error!
} catch (err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at ... (호출 스택)

  alert(err); // ReferenceError: lalala is not defined
}
```

위 예시는 `try` 내에서 변수가 정의되지 않음으로 인한 에러가 발생한 것을 보여준다.

마지막 `alert(err);`는 에러 전체를 보여주는데, `"name: message"` 형태의 문자열로 반환된다.

> 에러에 대한 자세한 정보가 필요하지 않으면, `catch`에서 에러 객체를 생략할 수 있다. <br /> 이를 **선택적 ‘catch’ 바인딩**이라 한다.

## 직접 에러를 만들어 던지기

먼저 아래 예시를 보자.

```js
let json = '{ "age": 30 }';

try {
  let user = JSON.parse(json);
  alert(user.name); // undefined
} catch (e) {
  alert("실행되지 않습니다.");
}
```

`json`이 문법적으로 잘못되진 않았지만, 스크립트 내에서 사용 중인 필수 프로퍼티 `name`을 가지고 있지 않다.

그렇기에 `JSON.parse`는 정상적으로 실행되었지만 `name`이 없는 건 에러를 유발해야 하는 상황이다.

하지만 위 예시를 실행해보면 `undefined`가 출력되며 에러를 캐치하지 않는다..

<br />

이때 사용하는 것! **`throw`**!

**`throw` 연산자는 에러를 생성한다.**

<br />

이론적으로는 숫자, 문자열 같은 원시형 자료를 포함한 어떤 것이든 에러 객체(error object)로 사용할 수 있다.

하지만 내장 에러와의 호환을 위해 되도록 에러 객체에 `name`과 `message` 프로퍼티를 넣어주는 것을 권장한다.

자바스크립트는 `Error`, `SyntaxError`, `ReferenceError`, `TypeError` 등의 표준 에러 객체 관련 생성자를 지원한다.

이 생성자들을 이용해 에러 객체를 만들 수도 있다. 아래와 같이.

```js
let error = new Error(message);
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...
```

<br />

일반 객체가 아닌 내장 생성자를 사용해 만든 내장 에러 객체의 `name` 프로퍼티는 생성자 이름과 동일한 값을 갖는다.

프로퍼티 `message`의 값은 인수에서 가져온다.

```js
let error = new Error("이상한 일이 발생했습니다.");

alert(error.name); // Error
alert(error.message); // 이상한 일이 발생했습니다.
```

<br />

그럼 아까 예시에서 에러를 처리하지 못한 것을 예외 처리해보자.

```js
let json = '{ "age": 30 }';

try {
  let user = JSON.parse(json);
  if (!user.name) {
    throw new SyntaxError("불완전한 데이터: 이름 없음");
  }
  alert(user.name);
} catch (e) {
  alert("JSON Error: " + e.message); // JSON Error: 불완전한 데이터: 이름 없음
}
```

`throw` 연산자는 `message`를 이용해 `SyntaxError`를 생성한다.

에러 생성 방식은 자바스크립트가 자체적으로 에러를 생성하는 방식과 동일하다.

에러가 발생했으므로 `try`의 실행은 즉시 중단되고 제어 흐름이 `catch`로 넘어간 것을 얼럿 창을 통해 확인할 수 있다.

(`alert( user.name );`이 실행되지 않는다)

<br />

## 에러 다시 던지기

```js
let json = '{ "age": 30 }'; // 불완전한 데이터

try {
  user = JSON.parse(json);
  // ...
} catch (err) {
  alert("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined
}
```

`user` 앞에 `let`을 붙이는 것을 잊어, 에러 메시지가 얼럿 창을 통해 출력되었다.

하지만 실제론 `"JSON Error"`가 아니다.

이렇게 에러 종류와 관계없이 동일한 방식으로 에러를 처리하는 것은 디버깅을 어렵게 만들기 때문에 좋지 않다.

이런 문제를 피하고자 **‘다시 던지기(rethrowing)’** 기술을 사용한다.

<br />

**`catch`는 알고 있는 에러만 처리하고 나머지는 ‘다시 던져야’ 한다.**

1. `catch`가 모든 에러를 받는다.

2. `catch(err) {...}` 블록 안에서 에러 객체 `err`를 분석한다.

3. 에러 처리 방법을 알지 못하면 `throw err`를 한다.

<br />

보통 에러 타입을 `instanceof` 명령어로 체크한다.

이를 통해 에러를 다시 던져서 `catch` 블록에선 `SyntaxError`만 처리되도록 해보자.

```js
function readData() {
  let json = '{ "name" : "Peter", "age": 30 }';

  try {
    let user = JSON.parse(json);
    if (!user.name) {
      throw new SyntaxError("불완전한 데이터: 이름 없음");
    }
    blabla(); // 예상치 못한 에러
    alert(user.name);
  } catch (e) {
    if (e instanceof SyntaxError) {
      alert("JSON Error: " + e.message);
    } else {
      throw e; // 알 수 없는 에러 다시 던지기
    }
  }

  try {
    readData();
  } catch (e) {
    alert("External catch got: " + e);
    // External catch got: ReferenceError: blabla is not defined
  }
}
```

이렇게 하면 catch 블록에선 어떻게 다룰지 알고 있는 에러만 처리하고, 알 수 없는 에러는 건너뛰거나 따로 처리할 수 있다.

위 예시에선 `try..catch`를 하나 더 만들어 에러를 따로 처리했다.

`readData`는 `SyntaxError`만 처리할 수 있지만, **함수 바깥의 `try..catch`에서는 예상치 못한 에러도 처리**할 수 있게 되었다.

<br />

## try..catch..finally

에러 핸들링은 여기서 끝이 아니다.

`try..catch`는 `finally`라는 코드 절을 하나 더 가질 수 있다.

`finally`안의 코드는 다음과 같은 상황에서 실행된다.

- **에러가 없는 경우:** `try` 실행이 끝난 후

- **에러가 있는 경우:** `catch` 실행이 끝난 후

```js
try {
   ... 코드를 실행 ...
} catch(e) {
   ... 에러 핸들링 ...
} finally {
   ... 항상 실행 ...
}
```

즉, 항상 실행된다.

**그렇기에 `finally` 절은 무언가를 실행하고, 실행 결과에 상관없이 실행을 완료하고 싶을 경우 사용된다.**

> ❗️ **`try..catch..finally` 안의 변수는 지역 변수이다.** 따라서 `try` 블록 안에서 선언한 변수는 블록 안에서만 유효한 변수가 된다.

> ❗️ `finally` 절은 `try..catch` 절을 빠져나가는 어떤 경우에도 실행된다. `return`을 사용해 명시적으로 빠져나가려는 경우도 마찬가지이다. 만약 `try` **블록 안에 `return`이 있다면, 값이 바깥 코드로 반환되기 전에 `finally`가 실행된다.**

> 💡 `catch` 절이 없는 `try..finally` 구문도 상황에 따라 유용하게 쓸 수 있다. `try..finally` 안에선 에러를 처리하고 싶지 않지만, 시작한 프로세스가 마무리되었는지 확실히 하고 싶은 경우에 사용한다. **`finally`는 스크립트가 죽더라도 완료되기 때문이다.**

## 전역 catch

(이 절은 코어 자바스크립트에 관한 내용이 아니다.)

`try..catch` 바깥에서 치명적인 에러가 발생해 스크립트가 죽었다고 상상해보자.

대처 방법은 무엇이 있을까?

어딘가에 에러 내역을 기록해 놓거나 사용자에게 에러가 발생했음을 알려주는 행위를 할 수 있을 것이다.

<br />

자바스크립트 명세서에는 이런 치명적인 에러에 대응하는 방법이 적혀있지 않다.

하지만 `try..catch`에서 처리하지 못한 에러를 잡는 것은 아주 중요하기 때문에, 자바스크립트 호스트 환경 대다수는 자체적으로 에러 처리 기능을 제공한다.

<br />

**Node.js**의 `process.on("uncaughtException")`이 그 예이다.

**브라우저 환경**에선 `window.onerror`를 이용해 에러를 처리할 수 있다. `window.onerror` 프로퍼티에 함수를 할당하면, 예상치 못한 에러가 발생했을 때 이 함수가 실행된다.

```html
<script>
  // message: 에러 메시지
  // url: 에러가 발생한 스크립트의 URL
  // line, col: 에러가 발생한 곳의 줄과 열 번호
  // error: 에러 객체
  window.onerror = function (message, url, line, col, error) {
    alert(`${message}\n At ${line}:${col} of ${url}`);
  };

  function readData() {
    badFunc(); // 에러가 발생한 장소
  }

  readData();
</script>
```

그런데 전역 핸들러 `window.onerror`는 죽어버린 스크립트를 복구하려는 목적으로는 잘 사용하지 않는다.

프로그래밍 에러가 발생한 경우 `window.onerror`만으로 스크립트를 복구하는 건 사실상 불가능하다..

`window.onerror`는 개발자에게 에러 메시지를 보내는 용도로 사용한다.

<br />

# 커스텀 에러와 에러 확장

<hr />

개발을 하다 보면 자체 에러 클래스가 필요한 경우가 종종 생긴다. (`HttpError`, `DbError`, `NotFoundError` 등)

직접 에러 클래스를 만든 경우, 이 에러들은 `message`이나 `name`, 가능하다면 `stack` 프로퍼티를 지원해야 한다.

물론 이런 프로퍼티 이외에도 다른 프로퍼티를 지원할 수 있다.

`HttpError` 클래스의 객체에 `statusCode` 프로퍼티를 만들고 `404`나 `403`, `500` 같은 숫자를 값으로 지정할 수 있다.

<br />

앞서 배운 바와 같이 `throw`의 인수엔 아무런 제약이 없기 때문에 커스텀 에러 클래스는 반드시 `Error`를 상속할 필요가 없다.

그렇지만 `Error`를 상속받아 커스텀 에러 클래스를 만들게 되면 `obj instanceof Error`를 사용해서 에러 객체를 식별할 수 있다는 장점이 생긴다.

이런 장점 때문에 맨땅에서 커스텀 에러 객체를 만드는 것보다 `Error`를 상속받아 에러 객체를 만드는 것이 낫다.

그렇기에 애플리케이션 크기가 점점 커지면 커스텀 에러 클래스들은 자연스레 계층 구조를 형성하게 된다. `HttpTimeoutError`는 `HttpError`를 상속받는 식으로.

<br />

## 에러 확장하기

먼저 `Error` 클래스가 어떻게 생겼는지 살펴보자.

```js
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // name은 내장 에러 클래스마다 다르다.
    this.stack = <call stack>; // stack은 표준은 아니지만, 대다수 환경이 지원한다.
  }
}
```

이제 `Error` 클래스를 상속받아보겠다.

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function test() {
  throw new ValidationError("에러 발생!");
}

try {
  test();
} catch (err) {
  alert(err.message); // 에러 발생!
  alert(err.name); // ValidationError
  alert(err.stack); // 각 행 번호가 있는 중첩된 호출들의 목록
}
```

자바스크립트에서는 자식 생성자 안에서 `super`를 반드시 호출해야 한다. 기억나쥬?

`message` 프로퍼티는 부모 생성자에서 설정되며, `name` 프로퍼티도 원하는 값으로 재설정해주었다.

그럼 이를 활용해보자.

```js
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    alert("Invalid data: " + err.message); // Invalid data: No field: name
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // 알려지지 않은 에러는 재던지기 한다.
  }
}
```

이제 `try..catch` 블록에서 커스텀 에러 `ValidationError`와 `JSON.parse`에서 발생하는 `SyntaxError` 둘 다를 처리할 수 있게 되었다.

> 에러 유형 확인은 `instanceof` 말고 `err.name`을 사용해도 가능하다. 그렇지만 에러 유형 확인은 `instanceof`를 사용하는 게 훨씬 좋다. 나중에 `ValidationError`를 확장하여 `PropertyRequiredError` 같은 새로운 확장 에러를 만들게 되면, `instanceof`는 새로운 상속 클래스에서도 동작하기 때문이다.

## 더 깊게 상속하기

앞서 만든 `ValidationError` 클래스는 너무 포괄적이어서 뭔가 잘못될 확률이 있다.

꼭 필요한 프로퍼티가 누락되거나, `age`에 문자열 값이 들어가는 것처럼 형식이 잘못된 경우를 처리할 수 없다.

필수 프로퍼티가 없는 경우에 대응할 수 있도록 좀 **더 구체적인 클래스** `PropertyRequiredError`를 만들어 보겠다.

`PropertyRequiredError`엔 누락된 프로퍼티에 대한 추가 정보를 담는다.

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    alert("Invalid data: " + err.message); // Invalid data: No property: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err;
  }
}
```

위 출력 결과 `"Invalid data: No property: name"`와 같이 더 구체적인 예외 처리를 수행한다.

<br />

## 예외 감싸기

함수 `readUser`는 ‘사용자 데이터를 읽기’ 위한 용도로 만들어졌다.

그런데 사용자 데이터를 읽는 과정에서 다른 오류가 발생할 수 있다.

지금 당장은 `SyntaxError`와 `ValidationError`를 사용해 에러를 처리하고 있는데, 앞으로 `readUser`가 더 커지면 다른 커스텀 에러 클래스를 만들어야 할 것이다.

<br />

따라서, `readUser`를 호출하는 곳에선 **새롭게 만들어질 커스텀 에러들을 처리할 수 있어야 한다.**

그런데 지금은 `catch` 블록 안에 `if`문 여러 개를 넣어 종류를 알 수 있는 에러를 처리하고, 그렇지 않은 에러는 다시 던지기를 해 처리하고 있다..

`readUser`의 기능이 커지면서 에러 종류가 많아질 텐데, 그때마다 에러 종류에 따른 `if`문을 매번 추가해야 한다고..?

<br />

**'예외 감싸기(wrapping exception)'** 에러 처리 기술을 사용하자.

1. '데이터 읽기’와 같은 포괄적인 에러를 대변하는 새로운 클래스 `ReadError`를 만든다.

2. 함수 `readUser` 발생한 `ValidationError`, `SyntaxError` 등의 에러는 `readUser` 내부에서 잡고 이때 `ReadError`를 생성한다.

3. `ReadError` 객체의 `cause` 프로퍼티엔 실제 에러에 대한 참조가 저장된다.

이렇게 예외 감싸기 기술을 써 스키마를 변경하면 `readUser`를 호출하는 코드에선 `ReadError`만 확인하면 된다.

데이터를 읽을 때 발생하는 에러 종류 전체를 확인하지 않아도 되죠. 추가 정보가 필요한 경우엔 `cause` 프로퍼티를 확인하면 된다.

<br />

이해가 안된다고? 사실 내가 그렇다..

다음 예시를 통해 알아보자.

```js
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ReadError";
  }
}

class ValidationError extends Error {
  /*...*/
}
class PropertyRequiredError extends ValidationError {
  /* ... */
}

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
  }

  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
  }
}

try {
  readUser("{잘못된 형식의 json}");
} catch (e) {
  if (e instanceof ReadError) {
    alert(e);
    alert("Original error: " + e.cause);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
  } else {
    throw e;
  }
}
```

`Syntax` 에러나 `Validation` 에러가 발생한 경우 해당 에러 자체를 다시 던지기 하지 않고 `ReadError`를 던지게 된다.

이렇게 되면, `readUser`를 호출하는 바깥 코드에선 `instanceof ReadError` 딱 하나만 확인하면 된다. 

에러 처리 분기문을 여러 개 만들 필요가 없어지는 것이다.

<br />

즉, **'예외 감싸기’ 란 종류별 에러를 좀 더 추상적인 에러, `ReadError`에 하나로 모아(wrap) 처리하는 것이다.** 

이런 기법은 객체 지향 프로그래밍에서 널리 쓰이는 패턴이다.

아아.. 그러니까 하나로 감싸서 한번에.. 오케이.

<br />
<br />

이렇게 에러 핸들링에 대한 내용을 마치겠다. 긴 예시 코드가 많아서 그런지 내용이 꽤 많아보이네..

<br />

## ※ Source

🖥 ko.javascript.info