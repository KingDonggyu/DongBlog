---
date: "2022-03-23T16:30"
title: "[JavaScript] 호출 스케줄링"
category: "Language"
categoryColor: "#25e5bd"
tags: ["JS"]
thumbnail: "./images/JavaScript.png"
---

이번엔 자바스크립트의 호출 스케줄링에 대해 알아보자.

**일정 시간이 지난 후에 원하는 함수를 예약 실행(호출)할 수 있게 하는 것을 '호출 스케줄링(scheduling a call)'이라고 한다.**

호출 스케줄링을 구현하는 방법은 두 가지가 있다.

- **`setTimeout`을 이용해 일정 시간이 지난 후에 함수를 실행하는 방법**

- **`setInterval`을 이용해 일정 시간 간격을 두고 함수를 실행하는 방법**

<br />

# setTimeout

먼저 `setTimeout`에 대해 알아보겠다.

아래는 `setTimeout`의 문법이다.

```js
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
```

- `func|code` : 실행하고자 하는 코드로, 함수 또는 문자열 형태이다. 대개는 이 자리에 함수가 들어간다.

  (하위 호환성을 위해 문자열도 받을 수 있게 해놓았지만 추천하진 않는다.)

- `delay` : 실행 전 대기 시간으로, 단위는 밀리초(millisecond, 1000밀리초 = 1초)이며 기본값은 0이다.

- `arg1`, `arg2`… : 함수에 전달할 인수들로, IE9 이하에선 지원하지 않는다.

<br />

```js
function sayHi() {
  console.log('안녕하세요.');
}

setTimeout(sayHi, 1000);
```

위 코드를 실행하면 1초 후에 `sayHi()`가 호출된다.

```js
function sayHi(who, phrase) {
  console.log( who + ' 님, ' + phrase );
}

setTimeout(sayHi, 1000, "홍길동", "안녕하세요."); // 홍길동 님, 안녕하세요.
```

함수에 인수를 넘겨줄 수도 있다.

```js
setTimeout("console.log('안녕하세요.')", 1000);
```

위처럼 문자열을 이용한 함수도 정상적으로 동작한다.

하지만, 이렇게 문자열로 사용하는 방법은 추천되지 않는다. 

다음 예시와 같이 익명 화살표 함수가 권장된다.

```js
setTimeout(() => console.log('안녕하세요.'), 1000);
```

> ❗️ **`setTimeout`에 함수를 넘길 때, 함수 뒤에 `()` 을 붙이는 실수를 하지 말아야 한다.** <br /> `setTimeout`은 함수의 참조 값을 받도록 정의되어 있는데 `sayHi()`를 인수로 전달하면 함수 실행 결과가 전달되어 버린다. 그런데 `sayHi()`엔 반환문이 없으므로, 호출 결과는 `undefined`가 된다. 따라서 `setTimeout`은 스케줄링할 대상을 찾지 못해, 원하는 대로 코드가 동작하지 않는다.

<br />

- ### clearTimeout으로 스케줄링 취소하기

**`setTimeout`을 호출하면 '타이머 식별자(timer identifier)'가 반환된다.**

스케줄링을 취소하고 싶을 땐 이 식별자(아래 예시에서 `timerId`)를 사용하면 된다.

```js
let timerId = setTimeout(() => alert("아무런 일도 일어나지 않습니다."), 1000);
alert(timerId); 

clearTimeout(timerId);
alert(timerId);
```

위 예시는 함수 실행을 계획해 놓았다가, 계획해 놓았던 것을 취소한 상황을 코드로 표현하고 있다.

`alert` 결과를 확인하면 취소 후에도 타이머 식별자의 값이 `null`이 되지 않고 그대로인 것을 볼 수 있다.

> 다른 호스트 환경에선 타이머 식별자가 숫자형 이외의 자료형일 수 있다. Node.js에서 `setTimeout`을 실행하면 타이머 객체가 반환된다.

# setInterval

`setInterval` 메서드는 `setTimeout`과 동일한 문법을 사용한다.

```js
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
```

인수 역시 동일하지만, `setTimeout`이 함수를 단 한 번만 실행하는 것과 달리 **`setInterval`은 함수를 주기적으로 실행하게 만든다.**

함수 호출을 중단하려면 `clearInterval(timerId)`을 사용하면 된다.

<br />

```js
let timerId = setInterval(() => alert('째깍'), 2000);

setTimeout(() => { clearInterval(timerId); alert('정지'); }, 5000);
```

위 예시를 실행하면 메시지가 2초 간격으로 보이다가 5초 이후에는 정지된다.

> ❗️ `alert` 창이 떠 있더라도 타이머는 멈추지 않는다. 위 예시를 실행하고 첫 번째 `alert` 창이 떴을 때 몇 초간 기다렸다가 창을 닫으면, 두 번째 `alert` 창이 바로 나타나는 것을 보고 이를 확인할 수 있다. 이런 이유로 `alert` 창은 명시한 지연 시간인 2초보다 더 짧은 간격으로 뜨게 된다.

# 중첩 setTimeout

무언가를 일정 간격을 두고 실행하는 방법에는 크게 2가지가 있다.

하나는 `setInterval`을 이용하는 방법이고, 다른 하나는 아래 예시와 같이 중첩 `setTimeout`을 이용하는 방법이다.

```js
let timerId = setTimeout(function tick() {
  alert('째깍');
  timerId = setTimeout(tick, 2000); 
}, 2000);

/*
let timerId = setInterval(() => alert('째깍'), 2000);
*/
```

첫번째 줄의 `setTimeout`은 세번째 줄의 실행이 종료되면 다음 호출을 스케줄링한다.

<br />

중첩 `setTimeout`을 이용하는 방법은 `setInterval`을 사용하는 방법보다 유연하다. 

호출 결과에 따라 다음 호출을 원하는 방식으로 조정해 스케줄링 할 수 있기 때문이다.

<br />

5초 간격으로 서버에 요청을 보내 데이터를 얻는다고 가정해 보자. 

**서버가 과부하 상태**라면 요청 간격을 10초, 20초, 40초 등으로 증가시켜주는 게 좋을 것이다.

아래는 이를 구현한 의사 코드이다.

```js
let delay = 5000;

let timerId = setTimeout(function request() {
  ...요청 보내기...

  if (서버 과부하로 인한 요청 실패) {
    // 요청 간격을 늘립니다.
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```

**CPU 소모가 많은 작업을 주기적으로 실행하는 경우**에도 `setTimeout`을 재귀 실행하는 방법이 유용하다.

작업에 걸리는 시간에 따라 다음 작업을 유동적으로 계획할 수 있기 때문이다.

<br />

**중첩 `setTimeout`을 이용하는 방법은 지연 간격을 보장하지만 `setInterval`은 이를 보장하지 않는다.**

```js
// (1) setInterval 예시

let i = 1;
setInterval(function() {
  func(i++);
}, 100);
```

```js
// (2) setTimeout 예시

let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
```

첫 번째 예시에선, 내부 스케줄러가 `func(i++)`를 100밀리초마다 실행한다.

그런데 사실 `setInterval`을 사용하면 `func`호출 사이의 지연 간격이 실제 명시한 간격(100ms)보다 짧아진다!

```
------- | func(1) ------- | func(2) ------- | func(3) -------  
       100               200               300
```

위 그림과 같이 **`func`을 실행하는 데 소모되는 시간도 지연 간격에 포함시키기 때문이다!!** 

지극히 정상적인 동작이다.

<br />

**그렇다면 `func`을 실행하는 데 걸리는 시간이 명시한 지연 간격보다 길 때 어떤 일이 발생할까?**

이런 경우는 엔진이 `func`의 실행이 종료될 때까지 기다려준다. 

`func`의 실행이 종료되면 엔진은 스케줄러를 확인하고, 지연 시간이 지났으면 다음 호출을 바로 시작한다.

❗️ **따라서 함수 호출에 걸리는 시간이 매번 `delay` 밀리초보다 길면, 모든 함수가 쉼 없이 계속 연속 호출된다!!**

<br />

한편, 중첩 `setTimeout`을 이용하면 다음과 같이 실행 흐름이 이어진다.

```
------- | func(1) ----------- | func(2) ----------- | func(3) ----------- 
                 100       200         200       300         300       400   
```

**중첩 `setTimeout`을 사용하면 명시한 지연(여기서는 100ms)이 보장된다!!**

이렇게 지연 간격이 보장되는 이유는 **이전 함수의 실행이 종료된 이후에 다음 함수 호출에 대한 계획이 세워지기 때문이다.**

<br />

# 가비지 컬렉션과 setInterval · setTimeout

`setInterval`이나 `setTimeout`에 함수를 넘기면, 함수에 대한 내부 참조가 새롭게 만들어지고 이 참조 정보는 스케줄러에 저장된다.

**따라서 해당 함수를 참조하는 것이 없어도 `setInterval`과 `setTimeout`에 넘긴 함수는 가비지 컬렉션의 대상이 되지 않는다.**

```js
setTimeout(function() {...}, 100);
```

스케줄러가 함수를 호출할 때까지 함수는 메모리에 유지된다.

`setInterval`의 경우는, `clearInterval`이 호출되기 전까지 함수에 대한 참조가 메모리에 유지된다.

<br />

그런데 이런 동작 방식에는 부작용이 하나 있다..

외부 렉시컬 환경을 참조하는 함수가 있다고 가정해 보자.

이 함수가 메모리에 남아있는 동안엔 외부 변수 역시 메모리에 남아있기 마련이다.

❗️ 이렇게 되면 **실제 함수가 차지했어야 하는 공간보다 더 많은 메모리 공간이 사용된다..!**

이런 부작용을 방지하고 싶다면 **스케줄링할 필요가 없어진 함수는 아무리 작더라도 취소하도록 해야한다!**

<br />

# 대기 시간이 0인 setTimeout

`setTimeout(func, 0)`이나 `setTimeout(func)`을 사용하면 `setTimeout`의 대기 시간을 0으로 설정할 수 있다.

이렇게 **대기 시간을 0으로 설정하면 `func`을 가능한 한 빨리 실행할 수 있다.** 

다만, 이때 스케줄러는 현재 실행 중인 스크립트의 처리가 종료된 이후에 스케줄링한 함수를 실행한다.

이런 특징을 이용하면 **현재 스크립트의 실행이 종료된 ‘직후에’ 원하는 함수가 실행될 수 있게 할 수 있다!**

<br />

```js
setTimeout(() => console.log("World"));

console.log("Hello");
```

위 예시를 실행하면 `"Hello"`와 `"World"`가 순서대로 출력되는 것을 확인할 수 있다.

예시에서 첫 번째 줄은 '0밀리초 후에 함수 호출하기’ 라는 할 일을 '계획표에 기록’ 해주는 역할을 한다.

그런데 스케줄러는 현재 스크립트(`console.log` 함수)의 실행이 종료되고 나서야 '계획표에 어떤 할 일이 적혀있는지 확인’ 하므로, `"Hello"`가 먼저, `"World"`은 그다음에 출력된다.

<br />

❗️ **브라우저 환경에서 실제 대기 시간은 0이 아니다.** 

브라우저는 HTML5 표준에서 정한 중첩 타이머 실행 간격 관련 제약을 준수한다. 

해당 표준엔 "다섯 번째 중첩 타이머 이후엔 대기 시간을 최소 4밀리초 이상으로 강제해야 한다."라는 제약이 명시되어있다. 

<br />

```js
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // 이전 호출이 끝난 시점과 현재 호출이 시작된 시점의 시차를 기록

  if (start + 100 < Date.now()) alert(times); // 지연 간격이 100ms를 넘어가면, array를 얼럿창에 띄워줌
  else setTimeout(run); // 지연 간격이 100ms를 넘어가지 않으면 재스케줄링함
});

// 출력창 예시:
// 1,3,4,5,10,15,20,25,30,35,40,45,49,54,59,64,69,74,79,84,89,94,99,10
```

위 예시 내 `setTimeout`은 지연 없이 함수 `run`을 다시 호출할 수 있게 스케줄링 되어 있다. 

배열 `times`에는 실제 지연 간격에 대한 정보가 기록되도록 해놓았는데, 배열 `times`에 어떤 값이 저장되는지 보니,

앞쪽 타이머들은 스펙에 적힌 것처럼 지연 없이 바로 실행되지만, **다섯 번째 중첩 타이머 이후엔 지연 간격이 4밀리초 이상이 되어** `10, 15, 20, 25...`와 같은 값이 저장되는 것을 확인할 수 있다!!

<br />

이런 제약은 `setTimeout`뿐만 아니라 `setInterval`에도 적용된다. 

`setInterval(f)`도 처음 몇 번은 함수 `f`를 지연 없이 실행하지만, 나중엔 지연 간격을 4밀리초 이상으로 늘려버린다.

> 한편, 서버 측엔 이런 제약이 없다! **Node.js**의 `process.nextTick`과 `setImmediate`를 이용하면 비동기 작업을 지연 없이 실행할 수 있다. 

<br />
<br />

브라우저 환경에서 다섯 번째 중첩 타이머 이후엔 지연 간격이 늘어나다니..😨

처음 알게 된 개념이다. (사실 전체적으로 거의 처음 알았다 😅)

이러한 내용을 모른채 호출 스케줄링을 이용하여 개발했다면, 내가 구현한 기능에 원인 모를 문제가 발생했었을 것이다!

<br />

## ※ Source

🖥 ko.javascript.info