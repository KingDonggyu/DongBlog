---
date: "2022-03-20T15:00"
title: "[JavaScript] Closure"
category: "Language"
categoryColor: "#25e5bd"
tags: ["JS"]
thumbnail: "./images/JavaScript.png"
---

자바스크립트는 **함수 지향 언어**이다.

이런 특징은 개발자에게 많은 자유를 준다. 

함수를 동적으로 생성할 수 있고, 생성한 함수를 다른 함수에 인수로 넘길 수 있으며, 생성된 곳이 아닌 곳에서 함수를 호출할 수도 있기 때문이다.

<br />

그런데 함수가 생성된 이후에 외부 변수가 변경되면 어떤 일이 발생할까?

함수는 새로운 값을 가져올까? 아니면 생성 시점 이전의 값을 가져올까?

매개변수를 통해 함수를 넘기고 이 함수를 저 멀리 떨어진 코드에서 호출할 땐 어떤 일이 발생할까? 

함수는 호출되는 곳을 기준으로 외부 변수에 접근할까?

<br />

# 중첩 함수

함수 내부에서 선언한 함수는 **‘중첩(nested)’ 함수**라고 부른다.

중첩 함수는 아래와 같이 코드를 정돈하는데 사용할 수 있다.

```js
function sayHiBye(firstName, lastName) {

  function getFullName() {
    return firstName + " " + lastName;
  }

  console.log( "Hello, " + getFullName() );
  console.log( "Bye, " + getFullName() );
}
```

중첩 함수는 새로운 객체의 프로퍼티 형태나 중첩 함수 그 자체로 반환될 수 있다.

이렇게 반환된 중첩 함수는 `getFullName()`과 같이 **어디서든 호출해 사용할 수 있다.**

물론 이때도 외부 변수에 접근할 수 있다는 사실은 변함없다.

<br />

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1
console.log( counter() ); // 2
```

위 함수 `makeCounter`는 호출될 때마다 다음 숫자를 반환해주는 ‘카운터’ 함수이다.

그런데 만약 **`counter`를 여러 개 만들었을 때, 이 함수들은 서로 독립적일까?** 

**함수와 중첩 함수 내 `count` 변수엔 어떤 값이 할당될까?**

<br />

# 렉시컬 환경

### **단계 1. 변수**

자바스크립트에선 실행 중인 함수, 코드 블록 `{...}`, 스크립트 전체는 **렉시컬 환경(Lexical Environment)** 이라 불리는 **내부 숨김 연관 객체(internal hidden associated object)** 를 갖는다.

렉시컬 환경 객체는 두 부분으로 구성된다.

- **환경 레코드(Environment Record)** : 모든 지역 변수를 프로퍼티로 저장하고 있는 객체이다. `this` 값과 같은 기타 정보도 여기에 저장된다.

- **외부 렉시컬 환경(Outer Lexical Environment)에 대한 참조** : 외부 코드와 연괸된다.

<br />

**’변수’는 특수 내부 객체인 환경 레코드의 프로퍼티일 뿐이다.**

**'변수를 가져오거나 변경’하는 것은 '환경 레코드의 프로퍼티를 가져오거나 변경’함을 의미한다.**

<br />

```js
let phrase = "Hello";
console.log(phrase)
```

위 두 줄짜리 코드엔 렉시컬 환경이 하나만 존재한다.

이렇게 스크립트 전체와 관련된 렉시컬 환경은 **전역 렉시컬 환경(global Lexical Environment)** 이라고 한다.

**전역 렉시컬 환경은 외부 참조를 갖지 않기에,** 외부 렉시컬 환경에 대한 참조는 `null`을 가리킨다.

그럼 좀 더 긴 코드를 보자.

```js
//execution start   // (1)
let phrase;         // (2)
phrase = "Hello";   // (3)
phrase = "Bye";     // (4)
```

(1) 스크립트가 시작되면 스크립트 내에서 선언한 변수 전체가 렉시컬 환경에 올라간다(pre-populated).

- 이때 변수의 상태는 특수 내부 상태(special internal state)인 **'uninitialized’** 가 된다. 

- 자바스크립트 엔진은 uninitialized 상태의 변수를 인지하긴 하지만, `let`을 만나기 전까진 이 변수를 참조할 수 없다.

(2) `let phrase`가 나타났다. 아직 값을 할당하기 전이기 때문에 프로퍼티 값은 `undefined`이다.

- 이제 `phrase`는 이 시점 이후부터 사용할 수 있다.

(3) `phrase`에 값이 할당되었다.

(4) `phrase`에 값이 변경되었다.

> '렉시컬 환경’은 자바스크립트가 어떻게 동작하는지 설명하는 데 쓰이는 ‘이론상의’ 객체이다. 따라서 코드를 사용해 직접 렉시컬 환경을 얻거나 조작하는 것은 불가능하다. <br /><br /> 자바스크립트 엔진들은 엔진 고유의 방법을 사용해 렉시컬 환경을 최적화한다. 사용하지 않는 변수를 버려 메모리를 절약하거나 다양한 내부 트릭을 써서..

### **단계 2. 함수 선언문**

함수는 변수와 마찬가지로 값이다.

**다만 함수 선언문(function declaration)으로 선언한 함수는 일반 변수와는 달리 바로 초기화된다는 점에서 차이가 있다.**

즉, **함수 선언문으로 선언한 함수는 렉시컬 환경이 만들어지는 즉시 사용할 수 있다.** 

(`let`을 만나 선언이 될 때까지 사용할 수 없는 변수와 달리..)

선언되기 전에도 함수를 사용할 수 있는 것은 바로 이 때문이다.

<br />

이런 동작 방식은 **함수 선언문으로 정의한 함수에만 적용된다.**

`let say = function(name)...` 같이 함수를 변수에 할당한 **함수 표현식(function expression)은 해댱하지 않는다.**

<br />

### 단계 3. 내부와 외부 렉시컬 환경

**함수를 호출해 실행하면 새로운 렉시컬 환경이 자동으로 만들어진다.** 

이 렉시컬 환경엔 함수 호출 시 넘겨받은 **매개변수와 함수의 지역 변수가 저장된다.**

```js
let phrase = "Hello";

function say(name) {
    console.log(`${phrase}, ${name}`);
}

say("Peter");  // Hello, Peter
```

위 `say("John")`를 호출하면 내부 변화가 일어난다. 

함수가 호출 중인 동안엔 호출 중인 함수를 위한 **내부 렉시컬 환경**과 **내부 렉시컬 환경이 가리키는 외부 렉시컬 환경**을 갖게 된다.

- 예시의 내부 렉시컬 환경은 현재 실행 중인 함수인 `say`에 상응한다. 

  내부 렉시컬 환경엔 함수의 인자인 `name`으로부터 유래한 프로퍼티 하나만 있고,
  
  `say("Peter")`을 호출했기 때문에 `name`의 값은 `"Peter"`가 된다.

- 예시의 외부 렉시컬 환경은 전역 렉시컬 환경이므로, `phrase`와 함수 `say`를 프로퍼티로 갖는다.

- 그리고 내부 렉시컬 환경은 외부 렉시컬 환경에 대한 참조를 갖는다.

미흡하지만 아래의 그림을 참고하면 이해가 더 잘될 것이다.

```
|| name: "Peter" || -> || say: function    || -> || null ||
||               ||    || phrease: "Hello" ||    ||      ||
```

<br />

❗️ **코드에서 변수에 접근할 땐, 먼저 내부 렉시컬 환경을 검색 범위로 잡는다.** 

❗️ **내부 렉시컬 환경에서 원하는 변수를 찾지 못하면 검색 범위를 내부 렉시컬 환경이 참조하는 외부 렉시컬 환경으로 확장한다.** 

❗️ **이 과정은 검색 범위가 전역 렉시컬 환경으로 확장될 때까지 반복된다.**

<br />

이 변수 검색 과정을 위 예시 코드를 통해 다시 정리해 보자.

**(1)** 함수 `say` 내부의 `console.log`에서 변수 `name`에 접근할 땐, **먼저 내부 렉시컬 환경을 살펴본다.** 

  - 내부 렉시컬 환경에서 변수 `name`을 찾는다.

**(2)** `console.log`에서 변수 `phrase`에 접근하려는데, `phrase`에 상응하는 **프로퍼티가 내부 렉시컬 환경엔 없다.** 

  - 따라서 **검색 범위는 외부 렉시컬 환경으로 확장된다.** 
  
  - 외부 렉시컬 환경에서 `phrase`를 찾는다.

> 전역 렉시컬 환경에 도달할 때까지 변수를 찾지 못하면 엄격 모드에선 에러가 발생한다. 참고로 비 엄격 모드에선 정의되지 않은 변수에 값을 할당하려고 하면 에러가 발생하는 대신 새로운 전역 변수가 만들어지는데, 이는 하위 호환성을 위해 남아있는 기능이다.

<br />

### 단계 4. 함수를 반환하는 함수

`makeCounter` 예시로 돌아가 보자.

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
```

`makeCounter()`를 호출하면 호출할 때마다 새로운 렉시컬 환경 객체가 만들어지고 여기에 `makeCounter`를 실행하는데 필요한 변수들이 저장된다.

위쪽에서 살펴본 `say("Peter")` 예시와 마찬가지로` makeCounter()`를 호출할 때도 두 개의 렉시컬 환경이 만들어진다.

<br />

그런데 위쪽에서 살펴본 `say("Peter")` 예시와 `makeCounter()` 예시에는 차이점이 하나 있다!

`makeCounter()`가 실행되는 도중엔 본문(`return count++`)이 한줄 짜리인 중첩 함수가 만들어진다는 점이다. 

<br />

❗️ 여기서 중요한 사실 하나! **모든 함수는 함수가 생성된 곳의 렉시컬 환경을 기억한다!!**

❗️ **함수는 `[[Environment]]`라 불리는 숨김 프로퍼티를 갖는데, 여기에 함수가 만들어진 곳의 렉시컬 환경에 대한 참조가 저장된다.**

<br />

따라서 **`counter.[[Environment]]`엔 `{count: 0}`이 있는 렉시컬 환경에 대한 참조가 저장된다.** 

호출 장소와 상관없이 함수가 자신이 태어난 곳을 기억할 수 있는 건 바로 이 `[[Environment]]` 프로퍼티 덕분이다.

**`[[Environment]]`는 함수가 생성될 때 딱 한 번 값이 세팅되고 영원히 변하지 않는다!**

그렇기에 `counter()`를 호출하면 각 호출마다 새로운 렉시컬 환경이 생성되고, 이 렉시컬 환경은 `counter.[[Environment]]`에 저장된 렉시컬 환경을 외부 렉시컬 환경으로서 참조한다.

<br />

실행 흐름이 중첩 함수의 본문으로 넘어오면 `count` 변수가 필요한데, **먼저 자체 렉시컬 환경에서 변수를 찾는다.** 

**익명 중첩 함수엔 지역변수가 없기 때문에** 이 렉시컬 환경은 비어있는 상황이다(`<empty>`).

그런 다음 `counter()`의 렉시컬 환경이 참조하는 외부 렉시컬 환경에서 `count`를 찾는다.

<br />

이제 `count++`가 실행되면서 `count` 값이 `1` 증가해야하는데, **변숫값 갱신은 변수가 저장된 렉시컬 환경에서 이뤄진다.**

따라서 실행이 종료된 후의 상태는 다음 그림과 같다.

```
|| <empty> || -> || count: 1 || -> || makeCounter: function || -> null
||         ||    ||          ||    || counter: function     ||
```

`counter()`를 여러 번 호출하면 `count` 변수가 2, 3으로 증가하는 이유가 바로 여기에 있다!!

<br />

# 클로저

**'클로저(closure)'는 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수를 의미한다.**

몇몇 언어에선 클로저를 구현하는 게 불가능하거나 특수한 방식으로 함수를 작성해야 클로저를 만들 수 있다.

하지만 자바스크립트에선 모든 함수가 자연스럽게 클로저가 된다. 

(예외가 하나 있지만 이는 다음에 다루도록 하겠다..)

<br />

자바스크립트의 함수는 숨김 프로퍼티인 `[[Environment]]`를 이용해 자신이 어디서 만들어졌는지를 기억한다. 

함수 본문에선 `[[Environment]]`를 사용해 외부 변수에 접근한다.

<br />

❗️ 즉, **클로저는 반환된 내부함수가 자신이 선언됐을 때의 환경(렉시컬 환경)인 스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도 그 환경(스코프)에 접근할 수 있는 함수를 말한다.**

❗️ **이를 조금 더 간단히 말하면 클로저는 자신이 생성될 때의 환경(렉시컬 환경)을 기억하는 함수다라고 말할 수 있겠다.**

<br />

# 가비지 컬렉션

**함수 호출이 끝나면 함수에 대응하는 렉시컬 환경이 메모리에서 제거된다.**

즉, 함수와 관련된 변수들이 이때 모두 사라진다.

함수 호출이 끝나면 관련 변수를 참조할 수 없는 이유가 바로 여기에 있다!!

<br />

자바스크립트에서 모든 객체는 도달 가능한 상태일 때만 메모리에 유지된다.

그런데 호출이 끝난 후에도 여전히 도달 가능한 중첩 함수가 있을 수 있다.

이때는 이 **중첩함수의 `[[Environment]]` 프로퍼티에 외부 함수 렉시컬 환경에 대한 정보가 저장된다.** 

**도달 가능한 상태가 되는 것!!**

함수 호출은 끝났지만 렉시컬 환경이 메모리에 유지되는 이유는 바로 이 때문이다.

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f();
```

`g.[[Environment]]`에 `f()` 호출 시 만들어지는 렉시컬 환경 정보가 저장된다.

그런데 이렇게 중첩함수를 사용할 때는 주의할 점이 있다!

`f()`를 여러 번 호출하고 그 결과를 어딘가에 저장하는 경우, 호출 시 만들어지는 각 렉시컬 환경 모두가 메모리에 유지된다는 점이다.

```js
function f() {
  let value = Math.random();

  return function() { alert(value); };
}

let arr = [f(), f(), f()];
```

위 예시를 실행하면 3개의 렉시컬 환경이 만들어지는데, 각 렉시컬 환경은 메모리에서 삭제되지 않는다.

(배열 안의 세 함수는 각각 `f()`를 호출할 때 생성된 렉시컬 환경과 연관 관계를 맺는다.)

렉시컬 환경 객체는 다른 객체와 마찬가지로 도달할 수 없을 때 메모리에서 삭제된다. 

그렇기에 해당 렉시컬 환경 객체를 참조하는 중첩 함수가 하나라도 있으면 사라지지 않는다..

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); 

g = null; 
```

위 예시 같이 중첩 함수가 메모리에서 삭제되고 난 후에야, 이를 감싸는 렉시컬 환경(그리고 그 안의 변수인 `value`)도 메모리에서 제거된다.

<br />

### 최적화 프로세스

앞에서 보았듯이, 함수가 살아있는 동안엔 이론상으론 **모든 외부 변수 역시 메모리에 유지된다.**

그러나 실제로는 자바스크립트 엔진이 이를 지속해서 최적화한다.

**자바스크립트 엔진은 변수 사용을 분석하고 외부 변수가 사용되지 않는다고 판단되면 이를 메모리에서 제거한다.**

<br />

**디버깅 시, 최적화 과정에서 제거된 변수를 사용할 수 없다는 점은 V8 엔진(Chrome, Opera에서 쓰임)의 주요 부작용이다.**

이런 외부 변수 최적화는 흥미로운 디버깅 이슈를 발생시키곤 한다.

아래 예시를 실행해 의도한 변수 대신 같은 이름을 가진 다른 외부 변수가 출력되는 걸 확인해 보자.

```js
let value = "이름이 같은 다른 변수";

function f() {
  let value = "가장 가까운 변수";

  function g() {
    debugger;
  }

  return g;
}

let g = f();
g();
```

콘솔에 `alert(value);`를 입력하면 `'이름이 같은 다른 변수'`가 출력된다.

이런 V8만의 부작용을 미리 알아 놓는 것이 좋다. 

Chrome이나 Opera에서 디버깅하는 경우라면 언젠간 이 이슈를 만나게 될 테니까..

미래에 이 부작용이 변경될 수도 있겠지?

<br />
<br />

후.. 이번 개념은 꽤 어려웠다.

클로저에 대한 더 심화적인 내용을 나중에 또 다루도록 해야겠다.

<br />

## ※ Source

🖥 ko.javascript.info

🖥 poiemaweb.com