---
date: "2021-11-05"
title: "[React] Context API"
category: "Web"
categoryColor: "mediumpurple"
tags: ["React"]
thumbnail: "./images/React.png"
---

> Context API는 리액트 프로젝트에서 전역적으로 사용할 데이터가 있을 때 유용한 기능이다.

이를테면 사용자 로그인 정보, 애플리케이션 환경 설정, 테마 등 여러 종류가 있다.

**리덕스, 리액트 라우터, styled-components 등의 라이브러리는 Context API를 기반으로 구현되어 있다.**

# Context API를 사용한 전역 상태 관리 흐름 이해하기

<hr />

프로젝트 내에서 환경 설정, 사용자 정보와 같은 전역적으로 필요한 상태를 관리해야 할 때는 어떻게 해야 할까?

리액트에서는 컴포넌트 간에 데이터를 **props**로 전달하기 때문에 컴포넌트 여기저기서 필요한 데이터가 있을 때는 주로 최상위 컴포넌트인 **App의 state**에 넣어서 관리한다.

하지만 이러한 방법은 **App ➡️ A ➡️ B ➡️ C** 흐름과 같이 데이터를 복잡하게 여러 번 거쳐서 전달해야 한다.

**실제 리액트 프로젝트에서는 많은 컴포넌트를 거쳐야 할 때도 있고 다루어야 하는 데이터가 훨씬 많아질 수도 있으므로, 이런 방식을 사용하면 유지 보수성이 낮아질 가능성이 있다.**

<br />

그렇기 때문에 **리덕스**나 **MobX** 같은 **상태 관리 라이브러리**를 사용하여 **전역 상태 관리 작업**을 더 편하게 처리하기도 하는데, 리액트 v16.3 업데이트 이후에는 **Context API**가 많이 개선이 되었끼 떄문에 별도의 라이브러리를 사용하지 않아도 전역 상태를 손쉽게 관리할 수 있다.

<br />

# Context API 사용법 익히기

<hr />

## 새 Context 만들기

```jsx
import { createContext } from "react";

const ColorContext = createContext({ color: "black" });

export default ColorContext;
```

새 **Context**를 만들 때는 `createContext` 함수를 사용한다.

**파라미터에는 해당 Context의 기본 상태를 지정한다.**

<br />

## Consumer 사용하기

```jsx
import React from "react";
import { createContext } from "react";

const ColorBox = () => {
  return (
    <ColorContext.Consumer>
      {(value) => (
        <div
          style={{ width: "64px", height: "64px", background: value.color }}
        />
      )}
    </ColorContext.Consumer>
  );
};

export default ColorBox;
```

`Consumer` 사이에 중 괄호를 열어서 그 안에서 함수를 넣어 주었다.

이러한 패턴을 **Function as a child**, 혹은 **Render Props**라고 한다.

컴포넌트의 **children**이 있어야 할 자리에 일반 JSX 혹은 문자열이 아닌 **함수를 전달**하는 것이다.

<br />

## Provider

`Provider`를 사용하면 Context의 value를 변경할 수 있다.

```jsx
import React from "react";
import ColorBox from "./components/ColorBox";
import ColorContext from "./contexts/color";

const App = () => {
  return (
    <ColorContext.Provider value={{ color: "red" }}>
      <div>
        <ColorBox />
      </div>
    </ColorContext.Provider>
  );
};

export default App;
```

만약 `Provider`를 사용했는데 **value**를 명시하지 않는다면 오류가 발생한다.

<br />

# 동적 Context 사용하기

<hr />

앞서 알아본 내용으로는 고정적인 값만 사용할 수 있다. 이번에는 **Context**의 값을 업데이트해야 하는 경우 어떻게 해야 하는지 알아보겠다.

## Context 파일 수정하기

Context의 value에는 무조건 상태 값만 있어야 하는 것은 아니다. **함수를 전달해 줄 수도 있다.**

(아래 코드는 오류가 발생한다. 해당 오류는 나중에 수정해 볼 것이다.)

```jsx
import React, { createContext, useState } from "react";

const ColorContext = createContext({
  state: { color: "black", subcolor: "red" },
  action: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("black");
  const [subcolor, setSubcolor] = useState("red");

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );

  // const ColorConsumer = ColorContext.Consumer 와 같은 의미
  const { Consumer: ColorConsumer } = ColorContext;

  // ColorProvider와 ColorConsumer 내보내기
  export { ColorProvider, ColorConsumer };

  export default ColorContext;
};
```

위 코드에서 `ColorProvider`라는 컴포넌트를 새로 작성해 주었다. 그리고 그 컴포넌트에서는 `ColorContext.Provider`를 렌더링하고 있다.

이 **Provider**의 **value**에 상태는 `state`로, 업데이트 함수는 `actions`로 묶어서 전달하고 있다.

Context에서 값을 동적으로 사용할 때 반드시 묶어 줄 필요는 없지만, 이렇게 `state`와 `actions` 객체를 따로따로 분리해 주면 나중에 다른 컴포넌트에서 Context의 값을 사용할 때 편하다.

<br />

추가로 `createContext`를 사용할 때 기본값으로 사용할 객체도 수정했다.

createContext`의 기본값은 실제 **Provider**의 **value**에 넣는 객체의 형태와 일치시켜 주는 것이 좋다.

그렇게 하면 Context 코드를 볼 때 내부 값이 어떻게 구성되어 있는지 파악하기도 쉽고, 실수로 **Provider**를 사용하지 않았을 때 리액트 애플리케이션에서 에러가 발생하지 않는다.

<br />

## Context를 프로젝트에 반영하기

위 코드를 App 컴포넌트에 반영해 보겠다.

```jsx
import React from "react";
import ColorBox from "./components/ColorBox";
import { ColorProvider } from "./contexts/color";

const App = () => {
  return (
    <ColorProvider>
      <div>
        <ColorBox />
      </div>
    </ColorProvider>
  );
};

export default App;
```

<br />

마찬가지로 `ColorProvider`의 하위 컴포넌트 또한 반영해 보겠다.

```jsx
import React from "react";
import { ColorConsumer } from "../contexts/color";

const ColorBox = () => {
  return (
    <ColorConsumer>
      {({ state }) => {
        <>
          <div
            style={{ width: "64px", height: "64px", background: state.color }}
          />
          <div
            style={{
              width: "32px",
              height: "32px",
              background: state.subcolor,
            }}
          />
        </>;
      }}
    </ColorConsumer>
  );
};

export default ColorBox;
```

<br />

## 색상 선택 컴포넌트 만들기

이번에는 Context의 `actions`에 넣어 준 함수를 호출하는 컴포넌트를 만들어 보겠다.

```jsx
import React from "react";
import { ColorConsumer } from "../contexts/color";

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

const SelectColors = () => {
  return (
    <div>
      <h2>색상을 선택하세요.</h2>
      <ColorConsumer>
        {({ state }) => (
          <div style={{ display: "flex" }}>
            {colors.map((color) => (
              <div
                key={color}
                style={{
                  width: "64px",
                  height: "64px",
                  background: color,
                  cursor: "pointer",
                }}
                onClick={() => actions.setColor(color)}
                onContextMenu={(e) => {
                  e.preventDefault(); // 마우스 오른쪽 버튼 클릭 시 메뉴가 뜨는 것을 무시함
                  actions.setSubcolor(color);
                }}
              />
            ))}
          </div>
        )}
      </ColorConsumer>
      <hr />
    </div>
  );
};

export default SelectColors;
```

**마우스 오른쪽 버튼 클릭 이벤트**는 `onContextMenu`를 사용하면 된다.

오른쪽 클릭 시 원래 브라우저 매뉴가 나타나지만, 여기서 `e.preventDefault()`를 호출하면 메뉴가 뜨지 않는다.

<br />

# Consumer 대신 Hook 또느 static contextType 사용하기

<hr />

## useContext Hook 사용하기

> 리액트에 내장되어 있는 Hook 중에서 `useContext`라는 Hook을 사용하면, 함수형 컴포넌트에서 Context를 아주 편하게 사용할 수 있다.

```jsx
import React, { useContext } from "react";
import ColorContext from "../contexts/color";

const ColorBox = () => {
  const { state } = useContext(ColorContext);
  return (
    <>
      <div style={{ width: "64px", height: "64px", background: state.color }} />
      <div
        style={{ width: "32px", height: "32px", background: state.subcolor }}
      />
    </>
  );
};

export default ColorBox;
```

이전보다 훨씬 간결해졌다. 만약 **children**에 함수를 전달하는 **Render Props** 패턴이 불편하다면, `useContext` Hook을 사용하면 훨씬 편하게 Context 값을 조회할 수 있다.

<br />

## static contextType 사용하기

> 클래스형 컴포넌트에서 Context를 좀 더 쉽게 사용하고 싶다면 `static contextType`을 정의하는 방법이 있다.

```jsx
import React, { Component } from "react";
import ColorContext from "../contexts/color";

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

class SelectColors extends Component {
  static contextType = ColorContext;

  handleSetColor = (color) => {
    this.context.actions.setColor(color);
  };

  handleSetSubcolor = (subcolor) => {
    this.context.actions.setSubcolor(subcolor);
  };

  render() {
    return (
      <div>
        <h2>색상을 선택하세요.</h2>
        <div style={{ display: "flex" }}>
          {colors.map((color) => (
            <div
              key={color}
              style={{
                width: "64px",
                height: "64px",
                background: color,
                cursor: "pointer",
              }}
              onClick={() => this.handleSetColor(color)}
              onContextMenu={(e) => {
                e.preventDefault();
                this.handleSetSubcolor(color);
              }}
            />
          ))}
        </div>
        <hr />
      </div>
    );
  }
}
```

클래스 상단에 `static contextType` 값을 지정해 준다.

이렇개 해 주면 `this.context`를 조회했을 때 현재 Context의 value를 가리키게 된다.

**클래스 메서드에서도 Context에 넣어 둔 함수를 호출할 수 있다는 장점**이 있다.

**단점이라면, 한 클래스에서 하나의 Context밖에 사용하지 못한다는 것이다.**

<br />

# 정리

<hr />

- 기존에는 컴포넌트 간에 상태를 교류해야 할 때 무조건 **부모 ➡️ 자식 흐름으로 props를 통해 전달**해 주었다.

  - 이제는 **Context API를 통해 더욱 쉽게 상태를 교류할 수 있다.**

<br />

- 프로젝트의 컴포넌트 구조가 꽤 간단하고 다루는 상태의 종류가 그다지 많지 않다면, 굳이 Context를 사용할 필요는 없다.

  - 하지만 **전역적으로 여기저기서 사용되는 상태가 있고 컴포넌트의 개수가 많은 상황**이라면, Context API를 사용하는 것을 권한다.

<br />

- 다음 포스트에서 **리덕스라는 상태 관리 라이브러리**를 다루어 볼 것이다.

  - 이 라이브러리는 **Context API 기반**으로 만들어져 있으며, 마찬가지로 전역 상태 관리를 도와준다.

  - 단순한 전역 상태 관리라면 Context API로 리덕스를 대체할 수 있다.

  - 하지만 **리덕스는 더욱 향상된 성능과 미들웨어 기능, 강력한 개발자 도구, 코드의 높은 유지 보수성을 제공**하기 때문에 Context API가 모든 상황에 대체가 가능하지는 않다.

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
