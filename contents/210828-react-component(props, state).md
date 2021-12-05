---
date: "2021-08-29"
title: "[React] 컴포넌트 (props, state)"
category: "Web"
categoryColor: "indianred"
tags: ["React"]
thumbnail: "./images/React.png"
---

컴포넌트의 기능은 단순한 템플릿 이상이다. 데이터가 주어졌을 때 이에 맞추어 UI를 만들어 주는 것은 물론이고, **라이프사이클 API**를 이용하여 컴포넌트가 화면에서 나타날 때, 사라질 때, 변화가 일어날 때 주어진 작업들을 처리할 수 있으며, 임의 method를 만들어 특별한 기능을 붙여 줄 수 있다.

## 클래스형 컴포넌트 vs 함수형 컴포넌트

- 클래스형 컴포넌트와 함수형 컴포넌트의 차이점은 **클래스형 컴포넌트**의 경우 state 기능 및 라이프사이클 기능을 사용할 수 있다는 것과 임의 method를 정의할 수 있다는 것이다.

<br />

- **어느 상황에 함수형 컴포넌트를 사용해야 할까?**

  - **장점 :**

    메모리 자원을 클래스형 컴포넌트보다 덜 사용한다.

    프로젝트를 완성하여 빌드한 후 배포할 때결과물의 파일 크기가 더 작다.

    (함수형과 클래스형은 성능과 파일 크기 면에서 사실상 별 차이가 없다.)

  - **단점 :**

    state와 라이프사이클 API의 사용이 불가능하다. **(이는 React v16.8 업데이트 이후 Hooks라는 기능이 도입되면서 해결되었다.)**

    ⇒ React 공식 매뉴얼에서는 컴포넌트를 새로 작성할 때 **함수형 컴포넌트와 Hooks를 사용하도록 권장하고 있다.** 하지만 그렇다고 해서 클래스형 컴포넌트가 사라지는 것은 아니므로 클래스형 컴포넌트의 기능은 꼭 알아 두어야 한다.

## props

props는 properties를 줄인 표현으로 컴포넌트 속성을 설정할 때 사용하는 요소이다. **props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정할 수 있다.**

<br />

- **defaultProps : props 기본값을 설정한다.**

```jsx
const Test = (props) => {
  return <div>Hello! My name is {props.name}</div>;
};

Test.defaultProps = {
  name: "react",
};

export default Test;
```

<br />

- **children : tag 사이의 내용을 보여 준다.**

```jsx
const App = () => {
  return <Test>react</Test>;
};
```

```jsx
const Test = (props) => {
  return (
    <div>
      Hello! My name is {props.name} <br />
      children is {props.children}!
    </div>
  );
};

Test.defaultProps = {
  name: "react",
};

export default Test;
```

<br />

- **propTypes : 컴포넌트의 필수 props를 지정하거나 props의 type을 지정할 때 사용한다.**

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const Test = ({name, children}) => {
	return ( ... );
}

Test.defaultProps = {
	name: 'react'
}

Test.propTypes = {
	name: PropTypes.string
	favoriteNumber: PropTypes.number.isRequired
}

export default Test;
```

위 코드처럼 propTypes를 설정해 주면 name 값은 무조건 string 형태로 전달해야 된다는 것을 의미한다.

또, **isRequired**를 붙여 주면 위 코드의 favoriteNumber를 설정하지 않았을 경우 경고가 나타난다.

<br />

> defaultProps와 propTypes는 컴포넌트의 필수 사항이 아니므로 꼭 사용할 필요가 없다. 하지만 React를 사용하여 큰 규모의 프로젝트를 진행할 때, 협업 시 해당 컴포넌트에 어떤 props가 필요한지 쉽게 알 수 있다.

## State

React에서 **state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미한다.** props는 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값이며, 컴포넌트 자신은 해당 **props를 읽기 전용으로만 사용할 수 있다.**

React에는 두 가지 종류의 state가 있다. 하나는 클래스형 컴포넌트가 지니고 있는 state이고, 다른 하나는 함수형 컴포넌트에서 **useState**라는 함수를 통해 사용하는 state이다.

### 클래스형 컴포넌트의 state

```jsx
import React, { Component } from 'react';

class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			num = 0;
		}
	}

	render() {
		const { num } = this.state;

		return (
			<div>
				<h1>{num}</h1>
				<button onClick={() => {
						this.setState({ num: num + 1 });
					}}
				>
					+1
				</button>
			</div>
		);
	}
}

export default Test;
```

컴포넌트에 state를 설정할 때는 **constructor** 메서드를 작성하여 설정한다. 이는 컴포넌트의 생성자 메서드인데, **클래스형 컴포넌트에서 constructor를 작성할 때는 반드시 super(props)를 호출해 주어야 한다.** 이 함수가 호출되면 현재 클래스형 컴포넌트가 상속받고 있는 리액트의 Component 클래스가 지닌 생성자 함수를 호출해 준다.

**(constructor 메서드를 선언하지 않고도 state 초기값을 설정할 수 있다. this를 제외한 state 형식으로 선언하면 된다.)**

> setState 함수는 state 값을 바꿀 수 있게 해준다.

- **this.setState에 객체 대신 함수 인자 전달하기**

  : this.setState를 사용하여 state 값을 업데이트할 때는 상태가 **비동기적**으로 업데이트된다.

  ```jsx
  onClick{() => {
  	this.setState({ num: num + 1 });
  	this.setState({ num: this.state.num + 1 });
  }}
  ```

  코드를 위와 같이 작성하면 this.setState를 두 번 사용하는 것임에도 불구하고 버튼을 클릭할 때 숫자가 1씩 더해진다. **this.setState를 사용한다고 해서 state 값이 바로 바뀌지는 않기 때문이다.**

  → 이에 대한 해결책은 this.setState를 사용할 때 **객체 대신에 함수를 인자로 넣어 주는 것이다.** this.setState의 인자로 함수를 넣어 줄 때는 코드를 다음과 같은 형식으로 작성한다.

  ```jsx
  this.setState((prevState, props) => {
    return {
      // 업데이트하고 싶은 내용
    };
  });
  ```

  여기서 prevState는 기존 상태이고, props는 현재 지니고 있는 props를 가리킨다. 만약 업데이트하는 과정에서 props가 필요하지 않다면 생략해도 된다.

  ```jsx
  <button
    onClick={() => {
      this.setState((prevState) => {
        return {
          num: prevState.num + 1,
        };
      });
      // 위 코드와 아래 코드는 완전히 똑같은 기능을 한다.
      // 아래 코드는 함수에서 바로 객체를 반환한다는 의미이다.
      this.setState((prevState) => ({
        num: prevState.num + 1,
      }));
    }}
  >
    +1
  </button>
  // 버튼 클릭 시 숫자가 2씩 올라간다.
  ```

  (화살표 함수에서 값을 바로 반환하고 싶다면 코드 블록 { } 를 생략하면 된다.)

<br />

- **this.setState가 끝난 후 특정 작업 실행하기**

  : setState를 사용하여 값을 업데이트하고 난 다음에 특정 작업을 하고 싶을 때는 setState의 두 번째 파라미터로 callback 함수를 등록하여 작업을 처리할 수 있다.

  ```jsx
  <button
    onClick={() => {
      this.setState(
        {
          num: num + 1,
        },
        () => {
          console.log("방금 setState가 호출되었습니다.");
        }
      );
    }}
  ></button>
  ```

### 함수형 컴포넌트에서 useState 사용하기

- **배열 비구조화 할당**

  : 배열 안에 들어 있는 값을 쉽게 추출할 수 있도록 해 주는 문법이다.

  ```jsx
  const arr = [1, 2];
  const one = arr[0];
  const two = arr[1];

  // 위 코드를 배열 비구조화 할당을 사용하면 아래와 같이 표현할 수 있다.

  const arr = [1, 2];
  const [one, two] = arr;
  ```

<br />

- **useState 사용하기**

  ```jsx
  import React, { useState } from "react";

  const Test = () => {
    const [msg, setMsg] = useState("");
    const onClickEnter = () => setMsg("안녕하세요!");
    const onCLickLeave = () => setMsg("안녕히 가세요!");

    return (
      <div>
        <button onClick={onClickEnter}>입장</button>
        <button onClick={onClickLeave}>퇴장</button>
      </div>
    );
  };

  export default Test;
  ```

  useState 함수의 인자에는 상태의 초기값을 넣어준다. 클래스형 컴포넌트에서의 state 초기값은 객체 형태를 넣어 주어야 하는데, useState에서는 반드시 객체가 아니어도 상관없다. 값의 형태는 자유이다.

  함수를 호출하면 배열이 반환되는데, 배열의 첫 번째 원소는 현재 상태이고, 두 번째 원소는 상태를 바꾸어 주는 함수이다. 이 함수를 **Setter 함수**라고 부른다. 그리고 배열 비구조화 할당을 통해 이름을 자유롭게 정해줄 수 있다.

### state를 사용할 때 주의 사항

**클래스형 컴포넌트든 함수형 컴포넌트든 state 값을 바꾸어야 할 때는 setState 혹은 useState를 통해 전달받은 Setter 함수를 사용해야 한다.**

그렇다면 배열이나 객체를 업데이트해야 할 때는 어떻게 해야 할까? 이런 상황에서는 배열이나 객체 사본을 만들고 그 사본에 값을 업데이트한 후, 그 사본의 상태를 setState 혹은 Setter 함수를 통해 업데이트한다.

```jsx
// 객체 다루기
const object = { a: 1, b: 2, c: 3 };
const nextObject = { ...object, b: 2 }; // 사본을 만들어서 b 값만 덮어 쓰기

// 배열 다루기
const array = [
  { id: 1, value: true },
  { id: 2, value: true },
  { id: 3, value: false },
];
let nextArray = array.concat({ id: 4 }); // 새 항목 추가
nextArray.filter((item) => item.id !== 2); // id가 2인 항목 제거
nextArray.map((item) => (item.id === 1 ? { ...item, value: false } : item));
// id가 1인 항목의 value를 false로 설정
```

**객체에 대한 사본을 만들 때는 spread 연산자라 불리는 ... 을 사용하여 처리하고, 배열에 대한 사본을 만들 때는 배열의 내장 함수들을 활용한다.**

## 정리

props와 state는 둘 다 컴포넌트에서 사용하거나 렌더링할 데이터를 담고 있으므로 비슷해 보일 수 있지만, 그 역할은 매우 다르다. props는 부모 컴포넌트가 설정하고, state는 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값을 업데이트할 수 있다.

<br />

**props를 사용하다고 해서 값이 무조건 고정적이지는 않다. 부모 컴포넌트의 state를 자식 컴포넌트의 props로 전달하고, 자식 컴포넌트에서 특정 이벤트가 발생할 때 부모 컴포넌트의 메서드를 호출하면 props도 유동적으로 사용할 수 있다.**

<br />

useState는 코드가 더 간결해질 뿐만 아니라, React 개발 팀이 함수형 컴포넌트와 Hooks를 사용하는 것이 주요 컴포넌트 개발 방식이 될 것이라 공지했기 때문에 **useState를 사용한 컴포넌트가 권장된다.**

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
