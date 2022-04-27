---
date: '2022-04-27T20:00'
title: '[JavaScript] 이벤트'
category: 'Language'
categoryColor: '#25e5bd'
tags: ['JS']
---

이벤트(event)는 무언가 일어났다는 신호이다.

모든 DOM 노드는 이런 신호를 만들어 낸다.

아래는 자주 사용되는 유용한 DOM 이벤트이다.

<br />

## 이벤트 핸들러

이벤트에 반응하려면 **이벤트가 발생했을 때 실행되는 함수인 핸들러(handler)** 를 할당해야 한다.

핸들러는 사용자의 행동에 어떻게 반응할지를 자바스크립트 코드로 표현한 것이다.

- **HTML 속성으로 할당**

```html
<input value="클릭해 주세요." onclick="alert('클릭!')" type="button" />
```

<br />

- **DOM 프로퍼티**

```html
<input id="elem" type="button" value="클릭해 주세요." />
<script>
  elem.onclick = function () {
    alert('클릭!');
  };
</script>
```

핸들러를 제거하고 싶다면 `elem.onclick = null` 같이 `null`을 할당하면 된다.

<br />

❗️ 주의사항

이미 존재하는 함수를 직접 핸들러에 할당하는 예시를 보자.

```js
function sayThanks() {
  alert('감사합니다!');
}

// 올바른 방법
elem.onclick = sayThanks;

// 틀린 방법
elem.onclick = sayThanks();
```

이때 함수는 `sayThanks`처럼 할당해야 한다.

`sayThanks()`를 할당하면 동작하지 않는다!

<br />

핸들러에서 `this`로 요소에 접근할 수도 있다.

```html
<button onclick="alert(this.innerHTML)">클릭해 주세요.</button>
<!-- 클릭해 주세요. -->
```

<br />


## addEventListener

HTML 속성과 DOM 프로퍼티를 이용한 이벤트 핸들러 할당 방식엔 근본적인 문제가 있다..

바로, 하나의 이벤트에 복수의 핸들러를 할당할 수 없다는 것!

이때, `addEventListener` 메서드를 사용하면 핸들러를 여러개 할당할 수 있다.

```js
element.addEventListener(event, handler, [options]);
```

- `event` : 이벤트 이름(예: "click")

- `handler` : 핸들러 함수

- `options` : 아래 프로퍼티를 갖는 객체

  - `once` : `true`이면 이벤트가 트리거 될 때 리스너가 자동으로 삭제된다.

  - `capture` : 어느 단계에서 이벤트를 다뤄야 하는지를 알려주는 프로퍼티이다. 

  - `passive` : `true`이면 리스너에서 지정한 함수가 `preventDefault()`를 호출하지 않는다. 

  해당 프로퍼티들에 대해서는 후에 자세히 알아보도록 하자.

<br />

그럼 `addEventListener` 를 사용한 예시를 보자.

```html
<input id="elem" type="button" value="클릭해 주세요."/>

<script>
  function handler1() {
    alert('감사합니다!');
  };

  function handler2() {
    alert('다시 한번 감사합니다!');
  }

  elem.onclick = () => alert("안녕하세요.");
  elem.addEventListener("click", handler1); 
  elem.addEventListener("click", handler2); 
</script>
```

이렇게 하면, 총 `alert` 창이 3개 뜰 것이다.

여러 이벤트 핸들러를 적용하게 된 것!

> ❗️ 어떤 이벤트는 `addEventListener`를 써야만 동작한다. 문서를 읽고 DOM 트리 생성이 완료되었을 때 트리거되는 이벤트인 `DOMContentLoaded`가 대표적인 예다.

## 이벤트 객체

이벤트가 발생하면 브라우저는 **이벤트 객체(event object)** 라는 것을 만든다. 

여기에 **이벤트에 관한 상세한 정보를 넣은 다음, 핸들러에 인수 형태로 전달한다.**

```html
<input type="button" value="클릭해 주세요." id="elem">

<script>
  elem.onclick = function(event) {
    alert(event.type + " 이벤트가 " + event.currentTarget + "에서 발생했습니다.");
    alert("이벤트가 발생한 곳의 좌표는 " + event.clientX + ":" + event.clientY +"입니다.");
  };
  // click 이벤트가 [object HTMLInputElement]에서 발생했습니다.
  // 이벤트가 발생한 곳의 좌표는 44:17입니다.
</script>
```

위 예시에서 사용된 프로퍼티 외에도 이벤트 객체에서 지원하는 프로퍼티는 다양하다.

또한, 이벤트 타입에 따라 이벤트 객체에서 제공하는 프로퍼티는 다르다! 

모두 암기해야 할 필요는 없으므로, 필요에 따라 찾아서 사용하자.

<br />


## 객체 형태의 핸들러와 handleEvent

`addEventListener`를 사용하면 함수뿐만 아니라 객체를 이벤트 핸들러로 할당할 수 있다. 

이벤트가 발생하면 객체에 구현한 `handleEvent` 메서드가 호출된다.

```html
<button id="elem">클릭해 주세요.</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " 이벤트가 " + event.currentTarget + "에서 발생했습니다.");
    }
  };

  elem.addEventListener('click', obj);
</script>
```

보다시피 `addEventListener`가 인수로 객체 형태의 핸들러를 받으면 이벤트 발생 시 `obj.handleEvent(event)`가 호출된다.

클래스를 사용할 수도 있다! 

```html
<button id="elem">클릭해 주세요.</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "마우스 버튼을 눌렀습니다.";
    }

    onMouseup() {
      elem.innerHTML += " 그리고 버튼을 뗐습니다.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

위 예시처럼 여러 이벤트를 처리하고 싶을 경우, `onMousedown`, `onMouseup` 처럼 요소에 타입을 정확히 명시해 주어 사용할 수 있다!

<br />
<br />

자바스크립트의 브라우저 이벤트 기초에 대해 알아보았다.

다음 포스트에서는 이벤트 버블링, 캡처링, 위임에 대해서 다루어보자.

<br />

## ※ Source

🖥 ko.javascript.info