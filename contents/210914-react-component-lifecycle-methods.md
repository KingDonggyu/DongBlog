---
date: "2021-09-14"
title: "[React] 컴포넌트의 라이프사이클 메서드"
category: "Web"
categoryColor: "mediumpurple"
tags: ["React"]
thumbnail: "./images/React.png"
---

모든 React 컴포넌트에는 **라이프사이클**(수명 주기)이 존재한다.

**컴포넌트 수명은 페이지에 렌더링되기 전인 준비 과정에서 시작하여 페이지에서 사라질 때 끝난다.**

React 프로젝트를 진행하다 보면 가끔 컴포넌트를 처음으로 렌더링할 때 어떤 작업을 처리해야 하거나 컴포넌트를 업데이트하기 전후로 어떤 작업을 처리해야 할 수도 있고, 또 불필요한 업데이트를 방지해야 할 수도 있다.

<br />

이 때는 컴포넌트의 라이프사이클 메서드를 사용한다.

라이프사이클 메서드는 **클래스형 컴포넌트**에서만 사용할 수 있다.

함수형 컴포넌트에서는 사용할 수 없는데, 그 대신에 **Hooks** 기능을 사용하여 비슷한 작업을 처리할 수 있다.

<br />

# 라이프사이클 메서드의 이해

라이프사이클은 총 세 가지, **마운트, 업데이트, 언마운트** 카테고리로 나눈다.

<br />

<div style="text-align: center">
    <img src="https://media.vlpt.us/images/whdvkf92/post/00857de6-0258-4b14-ad9b-3f653dca1553/%EB%A6%AC%EC%95%A1%ED%8A%B8%20%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4.JPG" width="300px">
</div>

<br />

- ### **마운트**

**DOM이 생성되고 웹 브라우저상에 나타나는 것을 마운트(mount)라고 한다.**

이 때 호출하는 메서드는 다음과 같다.

<br />

**컴포넌트 만들기 → constructor → getDerivedStateFromProps → render → componentDidMount**

<br />

- **constructor**: 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드

- **getDerivedStateFromProps**: props에 있는 값을 state에 넣을 때 사용하는 메서드

- **render**: 준비한 UI를 렌더링하는 메서드

- **componentDidMount**: 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드

<br />

- ### **업데이트**

컴포넌트는 다음과 같은 총 네 가지 경우에 업데이트한다.

1. **props가 바뀔 때**

2. **state가 바뀔 때**

3. **부모 컴포넌트가 리렌더링될 때**

4. this.forceUpdate로 강제로 렌더링을 트리거할 때

<br />

이렇게 컴포넌트를 업데이트할 때는 다음 메서드를 호출한다.

<br />

<div style="text-align: center">

**업데이트를 발생**시키는 요인 (props 변경, state 변경, 부모 컴포는트 리렌더링)

**↓**

**getDerivedStateFromProps**

**↓**

**shouldComponentUpdate** (true 반환 시 render 호출, false 반환 시 여기서 작업 취소)

**↓**

**render** (<< forceUpdate)

**↓**

**getSnapshotBeforeUpdate** (웹 브라우저상의 실제 DOM 변화)

**↓**

**componentDidUpdate**

</div>

<br />
<br />

**getDerivedStateFromProps**:

이 메서드는 마운트 과정에서도 호출되며, 업데이트가 시작하기 전에도 호출된다.

props의 변화에 따라 state 값에도 변화를 주고 싶을 때 사용한다.

<br />

**shouldComponentUpdate**:

컴포넌트가 리렌더링을 해야 할지 말아야 할지를 결정하는 메서드이다.

이 메서드에서는 true 혹은 false 값을 반환해야 하며,

true를 반환하면 다음 라이프사이클 메서드를 계속 실행하고, false 를 반환하면 작업을 중지한다.

즉, 컴포넌트가 리렌더링되지 않는다.

만약 특정 함수에서 this.forceUpdate() 함수를 호출한다면 이 과정을 생략하고 바로 render 함수를 호출한다.

<br />

**render**:

컴포넌트를 리렌더링한다.

<br />

**getSnapshotBeforeUpdate**:

컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드이다.

<br />

**componentDidUpdate**:

컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드이다.

<br />

- ### **언마운트**

마운트의 반대 과정. 즉 컴포넌트를 DOM에서 제거하는 것을 언마운트(unmount)라고 한다.

**언마운트하기 → componentWillUnmount**

**componentWillUnmount**: 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드이다.

<br />

# 라이프사이클 메서드 살펴보기

- ### **_render() 함수_**

컴포넌트 모양새를 정의한다.

이 메서드 안에서는 이벤트 설정이 아닌 곳에서 setState를 사용하면 안되며, 브라우저의 DOM에 접근해서도 안된다.

DOM 정보를 가져오거나 state에 변화를 줄 때는 **componentDidMount**에서 처리해야 한다.

<br />

- ### **_constructor 메서드_**

`constructor(props) { ... }`

컴포넌트의 생성자 메서드로 **컴포넌트를 만들 때 처음으로 실행된다.**

이 메서드에서는 초기 state를 정할 수 있다.

<br />

- ### **_getDerivedStateFromProps 메서드_**

props로 받아 온 값을 state에 동기화시키는 용도로 사용하며, **컴포넌트가 마운트될 때와 업데이트될 때 호출된다.**

```jsx
static getDerivedFromProps(nextProps, prevState) {
  if(nextProps.value !== prevState.value) { // 조건에 따라 특정 값 동기화
    return { value: nextProps.value };
  }
  return null; // state를 변경할 필요가 없다면 null 반환
}
```

<br />

- ### **_componentDidMount 메서드_**

`componentDidMount() { ... }`

**컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행한다.**

이 안에서 다른 자바스크립트 라이브러리 또는 프레임워크의 함수를 호출하거나 이벤트 등록, setTimeout, setInterval, 네트워크 요청 같은 비동기 작업을 처리하면 된다.

<br />

- ### **_shouldComponentUpdate 메서드_**

`shouldComponentUpdate(nextProps, nextState) { ... }`

**props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드이다.**

이 메서드에서는 반드시 true 값 또는 false 값을 반환해야 한다.

컴포넌트를 만들 때 이 메서드를 따로 생성하지 않으면 기본적으로 언제나 true 값을 반환한다.

**이 메서드가 false 값을 반환한다면 업데이트 과정은 여기서 중지된다.**

새로 설정될 props 또는 state는 nextProps와 nextState로 접근할 수 있다.

프로젝트 성능을 최적화할 때, 상황에 맞는 알고리즘을 작성하여 리렌더링을 방지할 때는 false 값을 반환하게 한다.

<br />

- ### **_getSnapshotBeforeUpdate 메서드_**

**render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출된다.**

이 메서드에서 반환하는 값은 **componentDidUpdate**에서 세번째 파라미터인 snapshot 값으로 전달받을 수 있는데,

주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용된다.

(예: 스크롤바 위치 유지)

```jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
  if(prevState.array !== this.state.array) {
    const { scrollTop, scrollHeight } = this.list;
    return { scrollTop, scrollHeight };
  }
}
```

<br />

- ### **_componentDidUpdate 메서드_**

`componentDidUpdate(prevProps, prevState, snapshot) { ... }`

**렌더링을 완료한 후 실행한다.**

업데이트가 끝난 직후이므로, DOM 관련 처리를 해도 무방하다.

여기서는 prevProps 또는 prevState를 사용하여 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있다.

또 **getSnapShotBeforeUpdate**에서 반환한 값이 있다면 여기서 snapshot 값을 전달받을 수 있다.

<br />

- ### **_componentWillUnmount 메서드_**

`componentWillUnmount() { ... }`

**컴포넌트를 DOM에서 제거할 때 실행한다.**

**componentDidMount**에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거 작업을 해야 한다.

<br />

- ### **_componentDidCatch 메서드_**

**컴포넌트 렌더링 도중에 에러가 발생했을 때** 애플리케이션이 먹통이 되지 않고 오류 UI를 보여줄 수 있게 해준다.

```jsx
componentDidCatch(error, info) {
  this.setState({
    error: true
  });
  console.log({ error, info });
}
```

여기서 error는 파라미터에 어떤 에러가 발생했는지 알려 주며, info 파라미터는 어디에 있는 코드에서 오류가 발생했는지에 대한 정보를 준다.

console.log가 아닌 서버 API를 호출하여 따로 수집할 수도 있다.

그러나 이 메서드를 사용할 때는 컴포넌트 자신에게 발생하는 에러를 잡아낼 수 없고 자신의 **this.props.children으로 전달되는 컴포넌트에서 발생하는 에러만 잡아낼 수 있다.**

<br />

# 라이프사이클 메서드 사용하기

```jsx
// LifeCycleSample.js

import React, { Component } from "react";

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  };

  myRef = null; // ref를 설정할 부분

  constructor(props) {
    super(props);
    console.log("constructor");
  }

  // 부모에게서 받은 color 값을 state에 동기화
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링하지 않는다.
    return nextState.number % 10 !== 4;
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  // DOM에 변화가 일어나기 직전의 색상 속성을 반환
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevProps, prevState);
    if (snapshot) {
      console.log("업데이트되기 직전 색상: ", snapshot);
    }
  }

  render() {
    console.log("render");

    const style = {
      color: this.props.color,
    };

    return (
      <div>
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;
```

```jsx
// app.js

import React, { Component, component } from "react";
import LifeCycleSample from "./LifeCycleSample";

// 랜덤 색상을 생성
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
  state = {
    color: "#000000",
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <LifeCycleSample color={this.state.color} />
      </div>
    );
  }
}

export default App;
```

<br />

- ### **에러 잡아내기**

```jsx
// lifeCycleSample.js의 render 함수 (의도적으로 에러 발생)

  render() {
    console.log("render");

    const style = {
      color: this.props.color,
    };

    return (
      <div>
        {this.props.missing.value}
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
```

**존재하지 않는 props**인 missing 객체의 value를 조회해서 렌더링해 주려고 할 때 에러가 발생한다.

개발 서버에서는 어디서 에러가 발생했는지 알 수 있는 정보가 나타나지만, 만약 사용자가 웹 서비스를 실제로 사용할 때 흰 화면만 나타나면 어리둥절할 것이다.

이럴 때는 에러가 발생했다고 사용자에게 인지시켜 주어야 한다.

<br />

```jsx
// ErrorBoundary.js

import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };
  componentDidCatch(error, info) {
    this.setState({
      error: true,
    });
    console.log({ error, info });
  }
  render() {
    if (this.state.error) return <div>에러가 발생했습니다!</div>;
    return this.props.childeren;
  }
}

export default ErrorBoundary;
```

에러가 발생하면 **componentDidCatch** 메서드가 호출되며, 이 메서드는 this.state.error 값을 true로 업데이트해 준다.

그리고 render 함수는 this.state.error 값이 true라면 에러가 발생했음을 알려 주는 문구를 보여 준다.

<br />

```jsx
// app.js

import React, { Component, component } from "react";
import LifeCycleSample from "./LifeCycleSample";
import ErrorBoundary from "./ErrorBoundary";

// 랜덤 색상을 생성
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
  state = {
    color: "#000000",
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <ErrorBoundary>
          <LifeCycleSample color={this.state.color} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
```

<br />

# 정리

<br />

<div style="text-align: center">
 <img src="https://changrea.io/static/da20f7b888dd251666eeb7ab9d6769cc/fcda8/LifeCycle-lifecycle.png" width="600px">
</div>

<br />

라이프사이클 메서드는 컴포넌트 상태에 변화가 있을 때마다 실행되는 메서드이다.

이 메서드들은 서드파티 라이브러리를 사용하거나 DOM을 직접 건드려야 하는 상황에서 유용하다.

**추가로 컴포넌트 업데이트의 성능을 개선할 때는 _shouldComponentUpdate_ 가 중요하게 사용된다.**

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
