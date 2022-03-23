---
date: "2021-09-12"
title: "[React] 컴포넌트 반복"
category: "Web"
categoryColor: "indianred"
tags: ["React"]
thumbnail: "./images/React.png"
---

이번 포스팅에선 **React 프로젝트에서 반복적인 내용을 효율적으로 보여 주고 관리하는 방법**에 대해 알아보겠다.

<br />

# 자바스크립트 배열의 map() 함수

자바스크립트 배열 객체의 내장 함수인 **map** 함수를 사용하여 반복되는 컴포넌트를 렌더링할 수 있다.

map 함수는 파라미터로 전달된 함수를 사용해서 배열 내 각 요소를 원하는 규칙에 따라 변환한 후 그 결과로 **새로운 배열을 생성한다.**

<br />

- ### **문법**
    
```jsx
arr.map(callback, [thisArg]);
```

**callback**: 새로운 배열의 요소를 생성하는 함수로 파라미터는 다음 세 가지이다.

- **currentValue**: 현재 처리하고 있는 요소

- **index**: 현재 처리하고 있는 요소의 index 값

- **array**: 현재 처리하고 있는 원본 배열

**thisArg**(선택 항목): callback 함수 내부에서 사용할 this 레퍼런스

<br />

```jsx
const num = [1, 2, 3, 4, 5];
const result = num.map(num => num * num);
console.log(result); // [1, 4, 9, 16, 25]
```

<br />

- ### **컴포넌트 배열 사용하기**

```jsx
import React from 'react';

const IterationSample = () => {
    const names = ['눈사람', '얼음', '눈', '바람'];
    const nameList = names.map(name => <li>{name}</li>);
    return <ul>{nameList}</ul>;
};

export default IterationSample;
```

**map 함수에서 JSX를 작성할 때는 DOM 요소를 작성해도 되고, 컴포넌트를 사용해도 된다.**

<br />

# key

React에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용한다. 

예를 들어 유동적인 데이터를 다룰 때는 원소를 새로 생성할 수도, 제거할 수도, 수정할 수도 있다. 

**key가 없을 때는 Virtual DOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지한다.** 

하지만 **key가 있다면 이 값을 사용하여 어떤 변화가 일어났는지 더욱 빠르게 알아낼 수 있다.**

<br />

- ### **key 설정**

key 값을 설정할 때는 map 함수의 인자로 전달되는 함수 내부에서 컴포넌트 props를 설정 하듯이 설정하면 된다. 

**key 값은 언제나 유일해야 한다.** 따라서 데이터가 가진 고유한 값을 key 값으로 설정해야 한다.

```jsx
import React from 'react';

const IterationSample = () => {
    const names = ['눈사람', '얼음', '눈', '바람'];
    const nameList = names.map((name, index) => <li key={index}>{name}</li>);
    return <ul>{nameList}</ul>;
};

export default IterationSample;
```

**고유한 값이 없을 때만 index 값을 key로 사용해야 한다.**

**index를 key로 사용하면 배열이 변경될 때 효율적으로 리렌더링하지 못한다.**

<br />

## 정리

컴포넌트 배열을 렌더링할 때는 key 값 설정에 항상 주의해야 한다. 

또 key 값은 언제나 유일해야 한다. 

key 값이 중복된다면 렌더링 과정에서 오류가 발생한다. 

<br />

상태 안에서 배열을 변형할 때는 배열에 직접 접근하여 수정하는 것이 아니라 concat, filter 등의 **배열 내장 함수를 사용하여 새로운 배열을 만든 후 이를 새로운 상태로 설정해 주어야 한다.**

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
