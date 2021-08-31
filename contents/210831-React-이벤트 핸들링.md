---
date: "2021-08-31"
title: "[React] 이벤트 핸들링"
category: "Web"
categoryColor: "indianred"
tags: ["React"]
thumbnail: "./images/React.png"
---

## React의 이벤트 시스템

- **이벤트를 사용할 때 주의 사항**

  <br />

  1. 이벤트 이름은 **카멜 표기법**으로 작성한다.

  <br />

  2. 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, **함수 형태의 값을 전달한다.**

  → HTML에서 이벤트를 설정할 때는 큰따옴표 안에 실행할 코드를 넣었지만, React에서는 함수 형태의 객체를 전달한다.

  <br />

  3. **DOM 요소에만 이벤트를 설정할 수 있다.**

  → div, button, input, form, span 등의 DOM 요소에는 이벤트를 설정할 수 있지만, 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없다. 예를 들어 만든 컴포넌트에 onClick 값을 설정한다면 이벤트 함수를 실행하는 것이 아니라, 그냥 이름이 onClick인 **props를 하위 컴포넌트에 전달해 줄 뿐이다.**

## 이벤트 핸들링 익히기

- **onChange 이벤트 핸들링**

  ```jsx
  onChange={
  	(e) => {
  		console.log(e);
  	}
  }
  ```

  여기서 console에 기록되는 e 객체는 SyntheticEvent로 웹 브라우저의 네이티브 이벤트를 감싸는 객체이다. SyntheticEvent는 네이티브 이벤트와 달리 **이벤트가 끝나고 나면 이벤트가 초기화되므로 정보를 참조할 수 없다.** 예를 들어, 0.5초 뒤에 e 객체를 참조하면 e 객체 내부의 모든 값이 비워지게 된다.

  > 만약 비동기적으로 이벤트 객체를 참조할 일이 있다면 e.persist() 함수를 호출해 주어야 한다.

  ```jsx
  onChange={
  	(e) => {
  		this.setState({
  			message: e.target.value
  		})
  	}
  }
  ```

<br />

- **임의 메서드 만들기**

  : 성능상으로는 차이가 거의 없지만, 가독성이 훨씬 높다.

  (하지만 상황에 따라 렌더링 메서드 내부에서 함수를 만드는 것이 더 편할 때도 있다.)

  ```jsx
  ...

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  ...

  <input
    type="text"
    name="message"
    placeholder="아무거나 입력해 보새요"
    value={this.state.message}
    onChange={this.handleChange}
  />

  ...
  ```

  함수가 호출될 때 this는 호출부에 따라 결정되므로, 클래스의 임의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서 메서드와 this의 관계가 끊어져 버린다. 이 때문에 임의 메서드가 이벤트가 등록되어도 this를 컴포넌트 자신으로 제대로 가리키기 위해서는 메서드를 **this와 바인딩하는 작업**이 필요하다. **만약 바인딩하지 않는 경우라면 this가 undefined를 가리키게 된다.**

  <br />

  **Property Initializer Syntax를 사용한 메서드 작성**

  — 메서드 바인딩은 생성자 메서드에서 하는 것이 정석이다. 하지만 새 매서드를 만들 때마다 constructor를 수정해야 하기 때문에 이 작업이 불편할 수도 있다. 이 작업을 좀 더 간단하게 방법이 있는데 바로 바벨의 **transform-class-properties 문법을 사용하여 화살표 함수 형태로 메서드를 정의**하는 것이다.

  ```jsx
  handleChange = (e) => {
    this.setState({
      message: e.target.value,
    });
  };
  ```

## input 여러 개 다루기

input이 여러 개일 때 어떻게 작업할까? 메서드를 여러 개 만들어야 할까? 이것도 하나의 해법이기는 하지만, 더 쉽게 처리하는 방법이 있다.

> 바로 event 객체를 활용하는 것이다. e.target.name 값을 사용하면 된다.

```jsx
...

handleChange = (e) => {
	this.setState({
		[e.target.name]: e.target.value
	})
}

...

<input
	type="text"
	name="username"
	placeholder="사용자명"
	value={this.state.username}
	onChange={this.handleChange}
/>
<input
	type="text"
	name="message"
	placeholder="아무거나 입력해 보세요"
	value={this.state.message}
	onChange={this.handleChange}
/>

...
```

객체 안에서 key를 [ ] 로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key 값으로 사용된다.

아래 코드는 예시이다.

```jsx
const name = "testKey";
const object = {
  [name]: "value",
};
```

## 함수형 컴포넌트로 구현해 보기

```jsx
// 클래스형 컴포넌트
...

handleChange = (e) => {
	this.setState({
		[e.target.name]: e.target.value
	})
}

...

<input
	type="text"
	name="username"
	placeholder="사용자명"
	value={this.state.username}
	onChange={this.handleChange}
/>
<input
	type="text"
	name="message"
	placeholder="아무거나 입력해 보세요"
	value={this.state.message}
	onChange={this.handleChange}
/>

...

// 함수형 컴포넌트 (위 클래스형 컴포넌트를 함수형 컴포넌트로 변환한 것이다.)
...
const [form, setForm] = useState({
	username: '',
	message: ''
});
const { username, message } = form;

const handleChange = (e) => {
	const nextForm = {
		...form, // 기존의 form 내용을 이 자리에 복사한 뒤
		[e.target.name] = e.target.value // 원하는 값을 덮어 씌우기
	};
	setForm(nextForm);
};

...

<input
	type="text"
	name="username"
	placeholder="사용자명"
	value={username}
	onChange={handleChange}
/>
<input
	type="text"
	name="message"
	placeholder="아무거나 입력해 보세요"
	value={message}
	onChange={handleChange}
/>

...

```

## 정리

React에서 이벤트를 다루는 것은 순수 자바스크립트 또는 jQuery를 사용한 웹 애플리케이션에서 이벤트를 다루는 것과 비슷하다. 

따라서 **기존 HTML DOM Event**를 알고 있다면 React의 컴포넌트 이벤트도 쉽게 다룰 수 있을 것이다.

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
