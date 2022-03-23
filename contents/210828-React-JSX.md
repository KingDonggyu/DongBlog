---
date: "2021-08-28"
title: "[React] JSX"
category: "Web"
categoryColor: "indianred"
tags: ["React"]
thumbnail: "./images/React.png"
---

JSX는 JavaScript의 확장 문법이며 XML과 매우 비슷하게 생겼다. 이런 형식으로 작성한 code는 브라우저에서 실행되기 전에 코드가 번들링되는 과정에서 **Babel을 사용하여 일반 JavaScript 형태의 코드로 변환된다.**

<br />

```jsx
function App() {
  return (
    <div>
      Hello <b>react</b>
    </div>
  );
}
```

이렇게 작성된 코드는 다음과 같이 변환된다.

```jsx
function App() {
  return React.createElement(
    "div",
    null,
    "Hello ",
    React.createElement("b", null, "react")
  );
}
```

만약 component를 렌더링할 때마다 JSX 코드를 작성하는 것이 아니라 위 코드처럼 매번 React.createElement 함수를 사용해야 한다면 매우 불편할 것이다.

<br />

## JSX 문법

**1. 감싸인 요소**

React component에서 요소 여러 개를 왜 하나의 요소로 꼭 감싸 주어야 할까?

→ Virtual DOM에서 component 변화를 감지해 낼 때 효율적으로 비교할 수 있도록 component 내부는 **하나의 DOM 트리 구조로 이루어져야 한다는 규칙**이 있기 때문이다.

- **Fragment**

  ```jsx
  import React, { Fragment } from "react";

  function App() {
    return (
      <Fragment>
        <h1>Hi</h1>
        <h2>React</h2>
      </Fragment>
    );
  }
  ```

  의미 없는 div를 피할 수 있다. (<> ... </> 이렇게 써도 된다.)

<br />

**2. 자바스크립트 표현**

- 자바스크립트 표현식을 작성하려면 JSX 내부에서 코드를 **{ }로 감싸면 된다.**

- **If문 대신 조건부 연산자**

  → **JSX 내부의 자바스크립트 표현식에서 if문을 사용할 수는 없다.** 하지만 조건에 따라 다른 내용을 렌더링해야 할 때는 JSX 밖에서 if문을 사용하여 사전에 값을 설정하거나 { } 안에 조건부 연산자(삼항 연산자)를 사용하면 된다.

- **AND 연산자**(&&)를 사용한 조건부 렌더링

  → 특정 조건을 만족할 때 내용을 보여주고, 만족하지 않을 때 아무것도 렌더링하지 않아야 하는 상황에 사용한다. (0은 예외적으로 화면에 나타난다.)

- **undefined를 렌더링하지 않기**

  → React component에서는 함수에서 undefined만 반환하여 렌더링하는 상황이 생기면 오류를 발생시킨다. 어떤 값이 undefined일 수도 있다면, **OR(||) 연산자를 사용하면 오류를 방지할 수 있다.**

  (JSX 내부에서 undefined를 렌더링하는 것은 괜찮다.)

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
