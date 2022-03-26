---
date: "2022-03-26T17:00"
title: "[Browser] 브라우저 환경"
category: "Web"
categoryColor: "mediumpurple"
tags: ["Browser", "JS"]
---

여태껏 호스트 환경에 종속되지 않는 코어 자바스크립트만을 다루었다.

이번 포스트를 시작으로 브라우저에서 동작하는 자바스크립트도 함께 병행하여 학습할 생각이다.

시작~

<br />

자바스크립트가 돌아가는 플랫폼은 **호스트(host)** 라고 불린다.

호스트는 브라우저, 웹서버, 심지어는 커피 머신이 될 수도 있다.

각 플랫폼은 해당 플랫폼에 특정되는 기능을 제공하는데, 

자바스크립트 명세서에선 이를 **호스트 환경(host environment)** 이라고 부른다.

<br />

호스트 환경은 랭귀지 코어(ECMAScript)에 더하여 플랫폼에 특정되는 객체와 함수를 제공한다. 

웹브라우저는 웹페이지를 제어하기 위한 수단을 제공하고, Node.js는 서버 사이드 기능을 제공해주는 것처럼..

아래 그림은 **호스트 환경이 웹 브라우저일 때 사용할 수 있는 기능**을 개괄적으로 보여준다.

<br />

<div style="text-align: center">
  <img src="https://media.vlpt.us/images/palza4dev/post/578448bd-f23f-41db-a26e-6485f13b1b9c/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-08-23%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.23.33.png" width="400">
</div>

<br />

최상단에 `window`라 불리는 루트 객체가 있다. 이 `window` 객체는 2가지 역할을 한다.

**1. 자바스크립트 코드의 전역 객체이다.**

```js
function sayHi() {
  alert("안녕하세요.");
}

window.sayHi();
```

위 예시에서 `window` 객체를 전역 객체로 사용하고 있다.

따라서, 전역 함수 `sayHi`는 전역 객체 `window`의 메서드가 된다.

<br />

**2. 브라우저 창(browser window)을 대변하고, 이를 제어할 수 있는 메서드를 제공한다.**

```js
alert(window.innerHeight);
```

위 예시에서 `window` 객체가 브라우저 창을 대변하고 있으며, 이를 이용해 창의 높이를 출력한다.

이처럼 `window` 객체엔 다양한 프로퍼티와 메서드가 있는데, 이는 추후 살펴보겠다.

<br />

## 문서 객체 모델(DOM)

드디어 떴다! DOM!!

**문서 객체 모델(Document Object Model, DOM)은 웹 페이지 내의 모든 콘텐츠를 객체로 나타내준다.**

이 객체는 수정 가능하다! 

<br />

**`document` 객체는 페이지의 기본 ‘진입점’ 역할을 한다.**

`document` 객체를 이용해 페이지 내 그 무엇이든 변경할 수 있고, 원하는 것을 만들 수도 있다.

```js
document.body.style.background = "red";

setTimeout(() => document.body.style.background = "", 1000);
```

위 예시에서 `document` 객체를 통해 배경을 붉은색으로 변경하고, 1초 후 원상태로 복구한다.

문서 객체 모델은 예시에서 소개한 `document.body.style` 외에도 수많은 기능을 제공한다.

> 💡 **DOM은 브라우저만을 위한 모델이 아니다.** <br /> DOM 명세서엔 문서의 구조와 이를 조작할 수 있는 객체에 대한 설명이 담겨있다. 그런데 브라우저가 아닌 곳에서도 DOM을 사용하는 경우가 있다. <br /> HTML 페이지를 다운로드하고 이를 가공해주는 서버 사이드 스크립트에서도 DOM을 사용한다. 이런 스크립트에선 명세서 일부만을 지원하겠지만..

> 💡 **스타일링을 위한 CSSOM** <br /> CSS 규칙과 스타일시트(stylesheet)는 HTML과는 다른 구조를  띤다. 따라서 CSS 규칙과 스타일시트를 객체로 나타내고 이 객체를 어떻게 읽고 쓸 수 있을지에 대한 설명을 담은 별도의 명세서, **CSS 객체 모델(CSS Object Model, CSSOM)** 이 존재한다. <br /> CSSOM은 문서에 쓰이는 스타일 규칙을 수정할 때 DOM과 함께 쓰인다. 자바스크립트를 이용해 CSS 규칙을 추가 혹은 제거해야 하는 경우는 극히 드물긴 하지만, 이때 CSSOM이 사용된다.

## 브라우저 객체 모델(BOM)

**브라우저 객체 모델(Browser Object Model, BOM)은 문서 이외의 모든 것을 제어하기 위해 브라우저(호스트 환경)가 제공하는 추가 객체를 나타낸다.**

아래 두 예시를 보자.

- `navigator` 객체는 브라우저와 운영체제에 대한 정보를 제공한다.

  - 객체엔 다양한 프로퍼티가 있는데, 가장 잘 알려진 프로퍼티는 현재 사용 중인 브라우저 정보를 알려주는 `navigator.userAgent`와 브라우저가 실행 중인 운영체제(Windows, Linux, Mac 등) 정보를 알려주는 `navigator.platform`이다.

- `location` 객체는 현재 URL을 읽을 수 있게 해주고 새로운 URL로 변경(redirect)할 수 있게 해준다.

```js
alert(location.href); 
if (confirm("동블로그 페이지로 가시겠습니까?")) {
  location.href = "https://dongblog.netlify.app"; 
}
```

위 예시에서 `location` 객체를 이용해 현재 URL을 보여주고, 새로운 페이지로 넘어간다.

<br />

`alert` / `confirm` / `prompt` 역시 BOM의 일부이다.

문서와 직접 연결되어 있지 않지만, 사용자와 브라우저 사이의 커뮤니케이션을 도와주는 순수 브라우저 메서드이다.

> 💡 **HTML 명세서** <br /> BOM은 HTML 명세서의 일부이다. BOM에 관련된 명세가 따로 있지는 않다. <br /> HTML 명세서는 태그, HTML 속성(attribute) 같은 ‘HTML’ 뿐만 아니라 다양한 객체와 메서드, 브라우저에서만 사용되는 DOM 확장을 다룬다. 이 모든 것이 HTML 기술에 속하기 때문이다. 

<br />
<br />

최근 DOM 표준을 읽고 직접 구현해보는 것에 관심이 생겼다.

그렇기에 DOM! 더 깊게 봐야겠지?

<br />

## ※ Source

🖥 ko.javascript.info