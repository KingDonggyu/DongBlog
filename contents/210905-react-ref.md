---
date: "2021-09-05"
title: "[React] ref: DOM에 이름 달기"
category: "Web"
categoryColor: "indianred"
tags: ["React"]
thumbnail: "./images/React.png"
---

일반 HTML에서 DOM 요소에 이름을 달 때는 **id**를 사용한다. 

특정 DOM 요소에 어떤 작업을 해야 할 때 요소에 id를 달면 CSS에서 특정 id에 특정 스타일을 적용하거나 자바스크립트에서 해당 id를 가진 요소를 찾아서 작업할 수 있다.

<br />

이렇게 HTML에서 id를 사용하여 DOM에 이름을 다는 것처럼 React 프로젝트 내부에서 DOM에 이름을 다는 방법이 있다. 

바로 **ref (reference의 줄임말)** 개념이다.

<br />

**React 컴포넌트 안에서 id를 사용하는 것은 권장되지 않는다.** 

예를 들어 같은 컴포넌트를 여러 번 사용한다고 가정할 때 HTML에서 DOM의 id는 unique해야 하는데, 

이런 상황에서는 중복 id를 가진 DOM이 여러 개 생기니 잘못된 사용이다.

<br />

ref는 **전역적으로 작동하지 않고 컴포넌트 내부에서만 작동**하기 때문에 이런 문제가 생기지 않는다. 

대부분은 id를 사용하지 않고도 원하는 기능을 구현할 수 있지만, 다른 라이브러리나 프레임워크와 함께 id를 사용해야 하는 상황이 발생할 수 있다. 

이런 상황에서는 컴포넌트를 만들 때마다 id 뒷부분에 추가 텍스트를 붙여서 (ex. button01, button02, button03 ... ) 중복 id가 발생하는 것을 방지해야 한다.

<br />

## ref는 어떤 상황에서 사용해야 할까?

대체 어떤 작업을 할 때 ref를 사용해야할까? 

바로 **'DOM을 꼭 직접적으로 건드려야 할 때'** 이다. 

예를 들어 일반 순수 자바스크립트 및 jQuery로 만든 웹 사이트에서 input을 검증할 때는 다음과 같이 특정 id를 가진 input에 클래스를 설정해 준다.

```html
<html>
  <head>
    ...

    <style>
      .success {
        backgroud-color: green;
      }
      .failure {
        backgroud-color: red;
      }
    </style>
    <script>
      fuction validate() {
      	var input = document.getElementById('password');
      	input.className = '';
      	if(input.value = === '0000') input.className = 'success';
      	else iniput.className = 'failure';
      }
    </script>
  </head>
  <body>
    <input type="password" id="password" />
    <button onclick="validate()">Validate</button>
  </body>
</html>
```

하지만 React에서 이런 작업은 굳이 DOM에 접근하지 않아도 **state로 구현할 수 있다.**

```jsx
// Validation.css
.success {
	backgroud-color: green;
}
.failure {
	backgroud-color: red;
}

// Validation.js

...

state = {
	password: '',
	clicked: false,
	validated: false
}

handleChange = (e) => {
	this.setState({
		password: e.target.value;
	})
}

handleButtonClick = () => {
	this.setState({
		clicked: true,
		validated: this.state.password === '0000'
	})
}

render() {
	return (
		...

		<input
			type="password"
			value={this.state.password}
			onChange={this.handleChange}
			className={this.state.clicked ? (this.state.validated ? 'success'
				: 'failure') : ''}
		/>
		<button onClick={this.handleButtonClick}>검증하기</button>

		...

	);
}

...
```

<br />

- **DOM을 꼭 사용해야 하는 상황**

  : 앞 예제에서는 state를 사용하여 필요한 기능을 구현했지만, 가끔 **state만으로 해결할 수 없는 기능이 있다.**

  → 특정 input에 포커스 주기

  → 스크롤 박스 조작하기

  → Canvas 요소에 그림 그리기 등

  ⇒ 이 때는 어쩔 수 없이 DOM에 직접적으로 접근해야 하는데, 이를 위해 바로 **ref**를 사용한다.

<br />

## ref 사용

- **콜백 함수를 통한 ref 설정**

  ref를 만드는 가장 기본적인 방법은 **콜백 함수**를 사용하는 것이다. 
  
  ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달해 주면 된다. 
  
  이 콜백 함수는 ref 값을 파라미터로 전달받는다. 
  
  그리고 함수 내부에서 파라미터로 받은 ref를 컴포넌트의 멤버 변수로 설정해 준다.

  ```jsx
  <input
    ref={(ref) => {
      this.input = ref;
    }}
  />
  ```

  이렇게 하면 앞으로 this.input은 input 요소의 DOM을 카리킨다. 
  
  ref의 **이름은 원하는 것으로 자유롭게 지정**할 수 있다. 
  
  DOM의 타입과 관계없이 this.superman = ref 처럼 마음대로 지정 가능하다.

<br />

- **createRef를 통한 ref 설정**

  ref를 만드는 또 다른 방법은 **React에 내장되어 있는 createRef라는 함수**를 사용하는 것이다. 
  
  이 함수를 사용해서 만들면 더 적은 코드로 쉽게 사용할 수 있다.

  ```jsx
  class RefSample extends Component {
    input = React.createRef();

    handleFocus = () => {
      this.input.current.focus();
    };

    render() {
      return (
        <div>
          <input ref={this.input} />
        </div>
      );
    }
  }

  export default RefSample;
  ```

  createRef를 사용하여 ref를 만들려면 우선 컴포넌트 내부에서 멤버 변수로 React.createRef()를 담아 주어야 한다. 
  
  그리고 해당 멤버 변수를 ref를 달고자 하는 요소에 ref props로 넣어 주면 ref 설정이 완료된다.

  설정한 뒤 나중에 ref를 설정해 준 DOM에 접근하려면 this.input.current를 조회하면 된다. 
  
  콜백 함수를 사용할 때와 다른 점은 이렇게 뒷부분에 **.current**를 넣어 주어야 한다는 것이다.

<br />

## 컴포넌트에 ref 달기

React에서는 **컴포넌트에도 ref를 달 수 있다.** 

이 방법은 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 쓴다. 

컴포넌트에 ref를 다는 방법은 DOM에 ref를 다는 방법과 똑같다.

<br />

- **사용법**

```jsx
<MyComponent ref={(ref) = > {this.myComponent=ref}} />
```

이렇게 하면 MyComponent **내부의 메서드 및 멤버 변수에도 접근할 수 있다.** 

즉, **내부 ref에도 접근할 수 있다.**

(예: myComponent.handleClick, myComponent.input 등)

<br />

- **예시**

```jsx
// ScrollBox.js
import React, { Component } from 'react';

class ScrollBox extends Component {

	scrollToBottom = () => {
		const { scrollHeight, clientHeight } = this.box;
		/* 창 사이즈 읽어오는 DOM 노드가 가진 값
			 scrollTop: 세로 스크롤바 위치
			 scrollHeight: 스크롤이 있는 박스 안의 div 높이
			 clientHeight: 스크롤이 있는 박스의 높이
		*/
		this.box.scrollTop = scrollHeight - clientHeight;
	}

	render() {
		const style = {
					...
		}

		const innerStyle = {
					...
		}

		<div
			style={style}
			ref={(ref) => {this.box=ref}}>
			<div style={innerStyle} />
		</div>
	}
}

export default ScrollBox;
```

```jsx
// App.js
import React, { Component } from "react";
import ScrollBox from "./ScrollBox";

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox ref={(ref) => (this.scrollBox = ref)} />
        <button onClick={() => this.scrollBox.scrollToBottom()}>
          맨 밑으로
        </button>
      </div>
    );
  }
}

export default App;
```

문법상으로는 onClick = {this.scrollBox.scrollToBottom} 과 같은 형식으로 작성해도 틀린 것은 아니다. 

하지만 컴포넌트가 **처음 렌더링될 때는 this.scrollBox 값이 undefined이므로** this.scrollBox.scrollToBottom 값을 읽어오는 과정에서 오류가 발생한다.

<br />

**화살표 함수 문법을 사용하여 아예 새로운 함수를 만들고 그 내부에서 this.scrollBox.scrollToBottom 메서드를 실행**하면, 버튼을 누를 때 (이미 한 번 렌더링을 해서 this.scrollBox를 설정한 시점) this.scrollBox.scrollToBo ttom 값을 읽어 와서 실행하므로 오류가 발생하지 않는다.

<br />

## 정리

컴포넌트 내부에서 DOM에 직접 접근해야 할 때는 ref를 사용한다. 

(먼저 ref를 사용하지 않고도 원하는 기능을 구현할 수 있는지 반드시 고려한 후에 활용하자!)

<br />

**서로 다른 컴포넌트끼리 데이터를 교류할 때 ref를 사용한다면 이는 잘못 사용된 것이다.** 물론 할 수 있다. 

컴포넌트에 ref를 달고 그 ref를 다른 컴포넌트로 전달해, 다른 컴포넌트에서 ref로 전달받은 컴포넌트의 메서드를 실행하면 된다. 

<br />

하지만 이 방법은 React 사상에 어긋난 설계이다. 

앱 규모가 커지면 마치 스파게티처럼 구조가 꼬여 버려서 유지 보수가 불가능하다. 

**컴포넌트끼리 데이터를 교류할 때는 언제나 데이터를 부모 ↔ 자식 흐름으로 교류해야 한다.** 

(**Redux** 혹은 **Context API**를 사용하여 효율적으로 교류할 수 있다)

<br />

**함수형 컴포넌트에서는 useRef라는 Hook 함수를 사용한다.** 사용법은 React.createRef와 유사하다. 이는 후에 알아보겠다.

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
