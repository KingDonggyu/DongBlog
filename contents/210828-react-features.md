---
date: "2021-08-28"
title: "[React] React의 특징"
category: "Web"
categoryColor: "mediumpurple"
tags: ["React"]
thumbnail: "./images/React.png"
---

어떤 데이터가 변할 때마다 어떤 변화를 줄지 고민하는 것이 아니라 그냥 기존 view를 날려 버리고 **처음부터 새로 렌더링**(사용자 화면에서 view를 보여 주는 것)하는 방식. → 이렇게 하면 Application 구조가 매우 간단하고, 작성해야 할 코드 양도 줄어든다.

<br />

하지만 웹 브라우저에서 이 방식대로 하면 **DOM은 느리기 때문에** CPU 점유율이 크게 증가할 것이고, 메모리도 많이 사용할 것이다. 그리고 사용자가 Input box에 text를 입력할 때 기존에 랜더링된 것은 사라지고, 새로 렌더링하면 끊김 현상이 발생하게 된다.

**⇒ 최대한 성능을 아끼고 편안한 User experience를 제공하면서 구현하고자 개발한 것이 바로 React이다.**

<br />

> React는 구조가 MVC, MVW 등인 프레임워크와 달리, **오직 View만 신경 쓰는 라이브러리**이다.

## component

React 프로젝트에서 특정 부분이 어떻게 생길지 정하는 선언체가 있는데, 이를 **component**라고 한다.

- component는 다른 프레임워크에서 user interface를 다룰 때 사용하는 템플릿과는 다른 개념이다. 템플릿은 보통 data set이 주어지면 HTML tag 형식을 문자열로 반환하는데, 이와 달리 component는 좀 더 복합적인 개념이다.

- component는 **재사용이 가능한 API**로 수많은 기능들을 내장하고 있으며, component 하나에서 해당 component의 생김새와 작동 방식을 정의한다.

## Rendering

React에서는 렌더링을 다루는 **render** 함수가 있다. 이 함수는 component가 어떻게 생겼는지 정의하는 역할을 한다. 이 함수는 html 형식의 문자열로 반환하지 않고, view가 어떻게 생겼고 어떻게 작동하는지에 대한 정보를 지닌 객체를 반환한다.

- component 내부에는 또 다른 component들이 들어갈 수 있다. 이때 render 함수를 실행하면 그 내부에 있는 component들도 재귀적으로 렌더링한다.

- 최상위 component의 렌더링 작업이 끝나면 지니고 있는 정보들을 사용하여 HTML markup 을 만들고, 이를 우리가 정하는 실제 페이지의 DOM 요소 안에 주입한다.

## View Update

React에서 view를 업데이트하여 component에서 data에 변화가 있을 때 우리가 보기에는 변화에 따라 view가 변형되는 것처럼 보이지만, 사실은 새로운 요소를 갈아 끼우기 때문이다. → 이 작업 또한 render 함수가 맡아서 한다.

- component는 data를 업데이트했을 때 단순히 업데이트한 값을 수정하는 것이 아니라, 새로운 data를 가지고 render 함수를 또 다시 호출한다. 그렇게 그 data를 지닌 view를 생성해 낸다.

- 하지만 이 때 render 함수가 반환하는 결과를 곧바로 DOM에 반영하지 않고, **이전에 render 함수가 만들었던 component 정보와 현재 render 함수가 만든 component 정보를 비교한다.**

  ⇒ JavaScript를 사용하면 두 가지 view를 최소한의 연산으로 비교한 후, 둘의 차이를 알아내 최소한의 연산으로 DOM tree를 업데이트하는 것이다.

## Virtual DOM

DOM이란?

- DOM은 Document Object Model의 약어이다. 즉, 객체로 문서 구조를 표현하는 방법으로 XML이나 HTML로 작성한다.

- DOM은 tree 형태라서 특정 node를 찾거나 수정, 제거, 삽입할 수 있다.

<div style='text-align: center'>
    <img src="https://blog.kakaocdn.net/dn/TlI8v/btqJlrNH1AP/DuqFSsbSFWKS9LAkdIch7K/img.png" width="300">
</div>

<br />

Virtual DOM을 사용하면 실제 DOM에 접근하여 조작하는 대신, 이를 추상화한 JavaScript 객체를 구성하여 사용한다. 마치 **실제 DOM의 가벼운 사본**과 비슷하다.

<br />

React에서 data가 변하여 웹 브라우저에 실제 DOM을 업데이트할 때는 다음 세 가지 절차를 밟는다.

1. data를 업데이트하면 전체 UI를 Virtual DOM에 리렌더링한다.
2. 이전 Virtual DOM에 있던 내용과 현재 내용을 비교한다.
3. **바뀐 부분만 실제 DOM에 적용한다.**

<div style='text-align: center'>
    <img src="https://miro.medium.com/max/1133/1*7TbnSCNbeUf4CofnJ6_rlA.png" width="500">
</div>

<br />

**⇒ DOM 업데이트를 추상화함으로써 DOM 처리 횟수를 최소화하고 효율적으로 진행한다.**

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
