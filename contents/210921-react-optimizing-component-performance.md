---
date: "2021-09-21"
title: "[React] 컴포넌트 성능 최적화"
category: "Web"
categoryColor: "mediumpurple"
tags: ["React"]
thumbnail: "./images/React.png"
---

컴포넌트는 다음과 같은 상황에서 **리렌더링**이 발생한다.

1. **자신이 전달받은 props가 변경될 때**
2. **자신의 state가 바뀔 때**
3. **부모 컴포넌트가 리렌더링될 때**
4. **forceUpdate 함수가 실행될 때**

한 컴포넌트의 **state**가 변경되면 해당 컴포넌트가 리렌더링된다. 그에 따라 부모 컴포넌트가 리렌더링되었으니 그 안의 무수한 컴포넌트들도 리렌더링된다.

**모든 컴포넌트가 리렌더링을 안 해도 되는 상황인데 무수히 많은 컴포넌트 모두가 리렌더링되면 성능이 저하된다.**

즉, 리렌더링이 불필요할 때는 리렌더링을 방지해 주어야 한다.

# React.memo를 사용하여 컴포넌트 성능 최적화

컴포넌트의 리렌더링을 방지할 때는 **shouldComponentUpdate** 라는 라이프사이클을 사용하면 된다.
그런데 함수형 컴포넌트에서는 라이프사이클 메서드를 사용할 수 없다. 그 대신 **React.memo** 라는 함수를 사용한다.

> 컴포넌트의 **props**가 바뀌지 않았다면, 리렌더링하지 않도록 설정하여 함수형 컴포넌트의 리렌더링 성능을 최적화해 줄 수 있다.

```jsx
import React from 'react';

const Test = ({ todo, onRemove, onToggle }) => {

    ...

};

export default React.memo(Test);
```

위 컴포넌트는 `todo`, `onRemove`, `onToggle`이 바뀌지 않으면 리렌더링을 하지 않는다.

<br />

**React.memo**를 사용하는 것만으로 컴포넌트 최적화가 끝나지는 않는다. 위 코드에서 `todo` 배열이 업데이트되면 `onRemove`와 `onToggle` 함수도 새롭게 바뀌기 때문이다.

`onRemove`와 `onToggle` 함수는 배열 상태를 업데이트하는 과정에서 최신 상태의 `todo`를 참조하기 때문에 `todo` 배열이 바뀔 때마다 함수가 새로 만들어진다.

이렇게 함수가 계속 만들어지는 상황을 방지하는 방법은 두 가지가 있다.

1. **useState의 함수형 업데이트 기능 사용**
2. **useReducer 사용**

# useState의 함수형 업데이트 사용

> **useState**로 설정한 setState를 사용할 때 새로운 상태를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의해주는 업데이트 함수를 넣을 수도 있다. 이를 **함수형 업데이트**라고 부른다.

```jsx
const [number, setNumber] = useState(0);
// prevNumber는 현재 number 값을 가리킨다.
const onIncrease = useCallback(
  () => setNumber((prevNumber) => prevNumber + 1),
  []
);
```

`setNumber(number+1)`을 하는 것이 아니라, 위 코드처럼 어떻게 업데이트할지 정의해 주는 업데이트 함수를 넣어 준다.
그러면 **useCallback**을 사용할 때 두 번째 파라미터로 넣는 배열에 `number`를 넣지 않아도 된다.

# useReducer 사용하기

**useState**의 함수형 업데이트를 사용하는 대신, **useReducer**를 사용해도 문제를 해결할 수 있다.

```jsx
...

const [todo, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

...

```

**useReducer**를 사용할 때는 원래 두 번째 파라미터에 초기 상태를 넣어 주어야 한다.

> 그 대신 두 번째 파라미터에 undefined를 넣고, 세 번째 파라미터에 초기 상태를 만들어주는 함수를 넣어주면 컴포넌트가 맨 처음 렌더링될 때만 함수(`createBulkTodos`)가 호출된다.

<br />
<br />

**useReducer**를 사용하는 방법은 기존 코드를 많이 고쳐야 한다는 단점이 있지만, 상태를 업데이트하는 로직을 모아서 컴포넌트 바깥에 둘 수 있다는 장점이 있다.

성능상으로는 **useState의 함수형 업데이트 기능 사용**과 **useReducer 사용**, 이 두 가지 방법이 비슷하기 때문에 취향에 따라 결정하면 된다.

# 불변성의 중요성

React 컴포넌트에서 상태를 업데이트할 때 불변성을 지키는 것은 매우 중요하다.

```jsx
const onToggle = useCallback((id) => {
  setTodos((todos) =>
    todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    )
  );
}, []);
```

기존 데이터를 수정할 때 직접 수정하지 않고, **새로운 배열을 만든 다음에 새로운 객체를 만들어서 필요한 부분을 교체해 주는 방식**으로 구현한 코드이다.

업데이트가 필요한 곳에서는 아예 새로운 배열 혹은 새로운 객체를 만들기 때문에, **React.memo**를 사용했을 때 **props**가 바뀌얶는지 혹은 바뀌지 않았는지를 알아내서 리렌더링 성능을 최적화해 줄 수 있다.

> 이렇게 기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어 내는 것을 '불변성을 지킨다'고 한다.

```jsx
const array = [1, 2, 3, 4, 5];

const nextArrayBad = array; // 배열을 복사하는 것이 아니라 똑같은 배열을 가리킨다.
nextArrayBad[0] = 100;
console.log(array === nextArrayBad); // 완전히 같은 배열이기 때문에 true

const nextArrayGood = [...array]; // 배열 내부의 값을 모두 복사한다.
nextArrayGood[0] = 100;
console.log(array === nextArrayGood); // 다른 배열이기 때문에 false

const object = {
  foo: "bar",
  value: 1,
};

const nextObjectBad = object; // 객체가 복사되지 않고, 똑같은 객체를 가리킨다.
nextObjectbad.value = nextObjectBad + 1;
console.log(object === nextObjectBad); // 같은 객체이기 때문에 true

const nextObjectGood = {
  ...object, // 기존에 있던 내용을 모두 복사해서 넣는다.
  value: object.value + 1, // 새로운 값을 덮어쓴다.
};
console.log(object === nextObjectGood); // 다른 객체이기 때문에 false
```

***불변성이 지켜지지 않으면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못한다. 그러면 **React.memo**에서 서로 비교하여 최적화하는 것이 불가능해진다.***

추가로 **전개 연산자**(... 문법)를 사용하여 객체나 배열 내부의 값을 복사할 때는 **얕은 복사**(shallow copy)를 하게 된다. 즉, 내부의 값이 완전이 새로 복사되는 것이 아니라 가장 바깥쪽에 있는 값만 복사된다. **따라서 내부의 값이 객체 혹은 배열이라면 내부의 값 또한 따로 복사해 주어야 한다.**

다음 코드를 보면 쉽게 이해할 수 있다.

```jsx
const todos = [
  { id: 1, checked: true },
  { id: 2, checked: true },
];
const nextTodos = [...todos];

nextTodos[0].checked = false;
console.log(todos[0] === nextTodos[0]); // 아직까지는 똑같은 객체를 가리키고 있기 때문에 true

nextTodos[0] = {
  ...nextTodos[0],
  checked: false,
};
console.log(todos[0] === nextTodos[0]); // 새로운 객체를 할당해 주었기에 false
```

만약 **객체 안에 있는 객체**라면 불변성을 지키면서 새 값을 할당해야 하므로 다음과 같이 해주어야 한다.

```jsx
const nextComplexObject = {
  ...complexObject,
  objectInside: {
    ...complexObject.objectInside,
    enable: false,
  },
};
console.log(complexObject === nextComplexObject); // false
console.log(complexObject.objectInside === nextComplexObject.objectInside); // false
```

배열 혹은 객체의 구조가 정말 복잡해진다면 이렇게 불변성을 유지하면서 업데이트하는 것도 까다로워진다. 이렇게 복잡한 상황일 경우 **immer** 라는 라이브러리의 도움을 받으면 정말 편하게 작업할 수 있는데, 이에 대한 내용은 다음에 알아보도록 하겠다.

# react-virtualized를 사용한 렌더링 최적화

지금까지 React 컴포넌트 리렌더링 성능을 최적화하는 방법을 알아보았다. 리렌더링 성능을 최적화할 때는 필요할 때만 리렌더링하도록 설정해 주었다.

이번에는 또 다른 렌더링 성능 최적화 방법을 알아보겠다.

일정 관리 애플리케이션에 초기 데이터가 2,500개 등록되어 있는데, 실제 화면에 나오는 항목은 아홉 개뿐일 때 나머지는 **스크롤해야만** 볼 수 있다.
현재 컴포넌트가 맨 처음 렌더링될 때 2,500개 컴포넌트 중 2,491개 컴포넌트는 스크롤하기 전에는 보이지 않음에도 불구하고 렌더링이 이루어진다. **비효율적이다.**

그리고 나중에 **배열에 변동이 생길 때**도 컴포넌트 내부의 **map** 함수에서 배열의 처음부터 끝까지 컴포넌트로 변환해 주는데, 이중에서 2,491개는 보이지 않으므로 **시스템 자원 낭비**이다.

> react-virtualized를 사용하면 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게끔 할 수 있다.

그리고 만약 스크롤되면 해당 스크롤 위치에서 보여 주어야 할 컴포넌트를 자연스럽게 렌더링시킨다.

이 라이브러리를 사용하면 **낭비되는 자원을 아주 쉽게 아낄 수 있다.**

<br />

- **최적화 준비**

  ```
  npm install react-virtualized --save
  ```

  **react-virtualized**에서 제공하는 **List** 컴포넌트를 사용하여 컴포넌트의 성능을 최적화할 수 있다.

  최적화를 수행하려면 사전에 먼저 해야 하는 작업이 있는데, 바로 각 항목의 실제 크기를 **px 단위**로 알아내는 것이다.

<br />

- **예시**

```jsx

import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss'
...

const TodoList = ({ todos, onRemove, onToggle }) => {
    const rowRenderer = useCallback(
        ({ index, key, style }) => {
            const todo = todos[index];
            return (
                <TodoListItem
                  todo={todo}
                  key={key}
                  onRemove={onRemove}
                  onToggle={onToggle}
                  style={style}
                />
            );
        },
        [onRemove, onToggle, todos],
    );
    return (
        <List
          className="TodoList"
          width={512}  // 전체 크기
          height={513}  // 전체 높이
          rowCount={todos.length} // 항목 개수
          rowHeight={57} // 항목 높이
          rowRenderer={rowRenderer}  // 항목을 렌더링할 때 쓰는 함수
          list={todos}  // 배열
          style={{ outline: 'none' }}  // List에 기본 적용되는 outline 스타일 제거
        />
    );
};

export default React.memo(TodoList);
```

**List** 컴포넌트를 사용하기 위해 **rowRenderer**라는 함수를 새로 작성해 주었다. 이 함수는 react-virtualized의 List 컴포넌트에서 각 `TodoItem`을 렌더링할 때 사용하며, 이 함수를 List 컴포넌트의 **props**로 설정해 주어야 한다. 이 함수는 파라미터에 **index**, **key**, **style** 값을 객체 타입으로 받아 와서 사용한다.

> **List** 컴포넌트를 사용할 때는 해당 리스트의 전체 크기와 각 항목의 높이, 각 항목을 렌더링할 때 사용해야 하는 함수, 그리고 배열을 **props**로 넣어 주어야 한다. 그러면 이 컴포넌트가 전달받은 **props**를 사용하여 자동으로 최적화해 준다.

# 정리

React 애플리케이션에 많은 데이터를 렌더링하는 리스트로 인해 지연이 유발되고, 이를 해결하는 방법을 알아보았다.

React 컴포넌트의 렌더링은 기본적으로 빠르기 때문에 컴포넌트를 개발할 때 최적화 작업에 대해 너무 큰 스트레스를 받거나 모든 컴포넌트에 일일이 **React.memo**를 작성할 필요는 없다.

단, **리스트와 관련된 컴포넌트를 만들 때 보여 줄 항목이 100개 이상이고 업데이트가 자주 발생한다면**, 여러 방식을 사용하여 꼭 최적화하는 것이 좋다.

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
