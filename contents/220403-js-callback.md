---
date: '2022-04-03T15:10'
title: '[JavaScript] 콜백'
category: 'Language'
categoryColor: '#25e5bd'
tags: ['JS']
---

자바스크립트 호스트 환경이 제공하는 여러 함수를 사용하면 **비동기(asynchronous) 동작을 스케줄링**할 수 있다! (비동기 동작의 한가지 예시로 스크립트나 모듈을 로딩하는 것이 있다)

즉, 원하는 때에 동작이 시작하도록 할 수 있다.

<br />

아래 예시(`src`에 있는 스크립트를 읽어오는 함수)로 비동기 동작 처리가 어떻게 일어나는지 살펴보자.

```js
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}

loadScript('/my/script.js');
...
```

즉, 함수 `loadScript(src)`는 `<script src="…">`를 동적으로 만들고 이를 문서에 추가한다.

브라우저는 자동으로 태그에 있는 스크립트를 불러오고, 로딩이 완료되면 스크립트를 실행한다.

그런데 이때 스크립트는 **비동기적으로** 실행된다. 로딩은 지금 당장 시작되더라도 실행은 함수가 끝난 후에야 되기 때문이다.

따라서 `loadScript('/my/script.js');` 아래에 있는 코드들은 스크립트 로딩이 종료되는 걸 기다리지 않는다.

<br />

스크립트 로딩이 끝나자마자 이 스크립트를 사용해 무언가를 해야만 한다고 가정해보자.

스크립트 안에 다양한 함수가 정의되어 있고, 이 함수를 실행하길 원하는 상황이다.

그런데 `loadScript(...)`를 호출하자마자 내부 함수를 호출하면 원하는대로 작동하지 않는다..

<br />

왜?

브라우저가 스크립트를 읽어올 수 있는 시간을 충분히 확보하지 못했으니까!

그렇기에 아직 존재하지 않는 스크립트 내부 함수를 호출하면 당연히 에러!

원하는 대로 스크립트 안의 함수나 변수를 사용하려면? 스크립트 로딩이 끝났는지 여부를 알 수 있어야 한다.

<br />

아래 예시에서는 `loadScript`의 두번째 인수로, **스크립트 로딩이 끝난 후 실행될 함수인 `콜백(callback) 함수`** 를 추가했다.

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript(
  'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js',
  (script) => {
    alert(`${script.src}가 로드되었습니다.`);
    alert(_); // 스크립트에 정의된 함수
  }
);
```

이제 **새롭게 불러온 스크립트에 있는 함수를 콜백 함수 안에서 호출하면 원하는대로 외부 스크립트 안의 함수를 사용할 수 있다!**

이런 방식을 **‘콜백 기반(callback-based)’ 비동기 프로그래밍**이라고 한다.

❗️ **무언가를 비동기적으로 수행하는 함수는, 함수 내 동작이 모두 처리된 후 실행되어야 하는 함수가 들어갈 콜백을 인수로 반드시 제공해야 한다.**

<br />

## 콜백 속 콜백

그럼 스크립트가 두 개 있는 경우에는, 어떻게 하면 두 스크립트를 순차적으로 불러올 수 있을까?

이때 두 번째 스크립트 로딩은 첫 번째 스크립트의 로딩이 끝난 이후가 되길 원한다.

가장 자연스러운 해결 방법은 아래와 같이 콜백 함수 안에서 두 번째 `loadScript`를 호출하는 것이다.

```js
loadScript('/my/script.js', function (script) {
  alert(`${script.src}을 로딩했습니다. 이젠, 다음 스크립트를 로딩합시다.`);

  loadScript('/my/script2.js', function (script) {
    alert(`두 번째 스크립트를 성공적으로 로딩했습니다.`);
  });
});
```

이렇게 중첩 콜백을 만들면 바깥에 위치한 `loadScript`가 완료된 후, 안쪽 `loadScript`가 실행된다.

그런데 여기에 더하여 스크립트를 하나 더 불러오고 싶다면 어떻게 해야 할까?

```js
loadScript('/my/script.js', function (script) {
  loadScript('/my/script2.js', function (script) {
    loadScript('/my/script3.js', function (script) {
      // 세 스크립트 로딩이 끝난 후 실행됨
    });
  });
});
```

위와 같이 모든 새로운 동작이 콜백 안에 위치하게 작성하면 된다.

하지만! 이렇게 콜백 안에 콜백을 넣는 것은 수행하려는 동작이 단 몇 개뿐이라면 괜찮지만, 동작이 많은 경우엔 좋지 않다..

이것에 대해 다른 방식으로 코드를 작성하는 방법은 좀있다 알아보겠다.

<br />

## 에러 핸들링

지금까지 살펴본 예시들은 스크립트 로딩이 실패하는 경우 등의 에러를 고려하지 않고 작성되었다.

스크립트 로딩이 실패할 가능성은 언제나 있다. 물론 **콜백 함수는 이런 에러를 핸들링할 수 있어야 한다.**

```js
unction loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생했습니다.`));

  document.head.append(script);
}
```

이제 `loadScript`는 스크립트 로딩에 성공하면 `callback(null, script)`을, 실패하면 `callback(error)`을 호출한다.

`loadScript`의 사용법은 다음과 같다.

```js
loadScript('/my/script.js', function (error, script) {
  if (error) {
    // 에러 처리
  } else {
    // 스크립트 로딩이 성공적으로 끝남
  }
});
```

이렇게 에러를 처리하는 방식은 흔히 사용되는 패턴이다.

이런 패턴은 **'오류 우선 콜백(error-first callback)'** 이라고 불린다.

<br />

오류 우선 콜백은 다음 관례를 따른다.

- `callback`의 **첫 번째 인수**는 에러를 위해 남겨둔다.

  에러가 발생하면 이 인수를 이용해 `callback(err)`이 호출된다.

- **두 번째 인수**(필요하면 인수를 더 추가할 수 있음)는 에러가 발생하지 않았을 때를 위해 남겨둔다.

  원하는 동작이 성공한 경우엔 `callback(null, result1, result2...)`이 호출된다.

이러한 오류 우선 콜백 스타일을 사용하면, 단일 콜백 함수에서 에러 케이스와 성공 케이스 모두를 처리할 수 있다.

<br />

## 콜백 지옥

콜백 기반 비동기 처리는 언뜻 봤을 때 꽤 쓸만해 보이고, 실제로도 그렇다. 한 개 혹은 두 개의 중첩 호출이 있는 경우는 보기에도 나쁘지 않다.

하지만! 꼬리에 꼬리를 무는 비동기 동작이 많아지면 아래와 같은 코드 작성이 불가피해진다.

```js
loadScript('1.js', function (error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function (error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function (error, script) {
          if (error) {
            handleError(error);
          } else {
            // (*)
          }
        });
      }
    });
  }
});
```

위 코드는 다음과 같이 동작한다.

1. js를 로드한다. 그 후 에러가 없으면,

2. js를 로드한다. 그 후 에러가 없으면,

3. js를 로드한다. 그 후 에러가 없으면 `(*)`로 표시한 줄에서 또 다른 작업을 수행한다.

<br />

호출이 계속 중첩되면서 코드가 깊어지고 있다.. 

본문 중간중간 `...`로 표시한 곳에 반복문과 조건문이 있는 코드가 들어가면 관리는 특히나 더 힘들어질 것이다.

이렇게 깊은 중첩 코드가 만들어내는 패턴은 **‘콜백 지옥(callback hell)’** 혹은 **'멸망의 피라미드(pyramid of doom)'** 라고 불린다.


<br />

비동기 동작이 하나씩 추가될 때마다 중첩 호출이 만들어내는 '피라미드’는 오른쪽으로 점점 커진다. 그렇게 곧 손쓸 수 없는 지경이 되어버린다..

따라서 이런 코딩 방식은 좋지 않다.

그러니 **각 동작을 독립적인 함수로** 만들어 위와 같은 문제를 완화해 보자.

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // (*)
  }
};
```

새롭게 작성한 위 코드는 각 동작을 분리해 최상위 레벨의 함수로 만들었기 때문에 깊은 중첩이 없다!

그리고 콜백 기반 스타일 코드와 동일하게 동작한다.

그런데 이렇게 작성하면 동작상의 문제는 없지만, 코드가 찢어진 종잇조각 같아 보인다는 문제가 생긴다..

**읽는 것도 어려워**져, 코드에 익숙지 않아 눈을 어디로 옮겨야 할지 모르면 더욱더 불편할 것이다.

게다가! 게다가 `step*`이라고 명명한 함수들은 콜백 지옥을 피하려는 용도만으로 만들었기 때문에 **재사용이 불가능**하다 😨 

<br />
<br />

이것도 안되면 콜백 지옥을 어떻게 피하란 거야..

몇 가지 방법이 있다! 그 중 가장 좋은 방법 중 하나가 바로 **'프로미스(promise)'** 를 사용하는 것이다!

이는 다음 포스트에서 다루도록 하겠다 😄

<br />

## ※ Source

🖥 ko.javascript.info