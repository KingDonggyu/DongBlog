---
date: "2021-09-17"
title: "[React] Hooks"
category: "Web"
categoryColor: "mediumpurple"
tags: ["React"]
thumbnail: "./images/React.png"
---

> Hooks는 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 렌더링 직후 작업을 설정하는 useEffect 등의 기능을 제공하여 기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 해준다.

(useState는 생략하겠다.)

# useEffect

> useEffect는 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook이다.

클래스형 컴포넌트의 **componeneDidMount**와 **componentDidupdate**를 합친 형태로 보아도 무방하다.

```jsx
useEffect(() => {
  console.log("렌더링이 완료되었습니다!");
  console.log({
    name,
    nickName,
  });
});

// 맨 처음 렌더링될 때 한번, 업데이트될 때 한번 출력되는 결과를 볼 수 있다.
```

<br />

- **마운트될 때만 실행하고 싶을 때**

  useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트될 때는 실행하지 않으려면 함수의 두번 째 파라미터로 비어 있는 배열을 넣어 주면 된다.

  ```jsx
  useEffect(() => {
    console.log("마운트될 때만 실행됩니다.");
  }, []);
  ```

<br />

- **특정 값이 업데이트될 때만 실행하고 싶을 때**

  useEffect의 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어 주면 된다.

  ```jsx
  useEffect(() => {
    console.log(name);
  }, [name]);
  ```

  배열 안에는 useState를 통해 관리하고 있는 상태를 넣어 주어도 되고, props로 전달받은 값을 넣어 주어도 된다.

<br />

- **cleanup**

  useEffect는 기본적으로 렌더링되고 난 직후마다 실행되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라진다.

  컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면 useEffect에서 cleanup 함수를 반환해 주어야 한다.

  ```jsx
  useEffect(() => {
    console.log("effect");
    console.log(name);
    return () => {
      console.log("cleanup");
      console.log(name); // 업데이트되기 직전의 값을 보여준다.
    };
  }, [name]);

  // 컴포넌트가 나타날 때 콘솔에 effect가 나타나고, 사라질 때 cleanup이 나타난다.
  ```

  **오직 언마운트될 때만 cleanup 함수를 호출하고 싶다면 useEffect 함수의 두 번째 파라미터에 비어있는 배열을 넣으면 된다.**

# useReducer

> useReducer는 useState보다 더 **다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트해 주고 싶을 때 사용하는 Hook**이다.

**Reducer는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 action 값을 전달받아 새로운 상태를 반환하는 함수이다.**

Reducer 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜주어야 한다.

```jsx
function reducer(state, action) {
	return { ... };  // 불변성을 지키면서 업데이트한 새로운 상태를 반환한다.
}

/*
	action 값은 주로 다음과 같은 형태로 이루어져 있다.
	{
		type: 'INCREMENT',
		(다른 값들이 필요하다면 추가로 들어감)
	}
*/
```

**redux**에서 사용하는 action 객체에는 어떤 action인지 알려 주는 type 필드가 꼭 있어야 하지만, **useReducer**에서 사용하는 action 객체는 반드시 type을 지니고 있을 필요가 없다. 심지어 객체가 아니라 문자열이나 숫자여도 상관없다.

<br />

- **구현하기**

  ```jsx
  // Counter.js

  import React, { useReducer } from "react";

  function reducer(state, action) {
    switch (action.type) {
      case "INCREMENT":
        return { value: state.value + 1 };
      case "DECREMENT":
        return { value: state.value - 1 };
      default:
        return state;
    }
  }

  const Counter = () => {
    const [state, dispatch] = useReducer(reducer, { value: 0 });

    return (
      <div>
        <p>
          현재 카운터 값은 <b>{state.value}</b>입니다.
        </p>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
      </div>
    );
  };

  export default Counter;
  ```

  useReducer의 첫 번째 파라미터에는 reducer 함수를 넣고, 두 번째 파라미터에는 해당 reducer서의 기본값을 넣어준다. 이 Hook을 사용하면 state 값과 dispatch 함수를 받아 오는데, 여기서 state는 현재 가리키고 있는 상태고 dispatch는 action을 발생시키는 함수이다. dispatch(action)과 같은 형태로, 함수 안에 파라미터로 action 값을 넣어 주면 reducer서 함수가 호출되는 구조이다.

  **useReducer를 사용했을 때 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 것이다.**

<br />

- **인풋 상태 관리하기**

  기존에는 인풋이 여러 개여서 useState를 여러번 사용했지만, **useReducer를 사용하면 기존에 클래스형 컴포넌트에서 input 태그에 name 값을 할당하고 e.target.name을 참조하여 setState를 해 준 것과 유사한 방식으로 작업을 처리할 수 있다.**

  ```jsx
  import React, { useReducer } from "react";

  function reducer(state, action) {
    return {
      ...state,
      [action.name]: action.value,
    };
  }

  const Info = () => {
    const [state, dispatch] = useReducer(reducer, {
      name: "",
      nickname: "",
    });
    const { name, nickname } = state;

    const onChange = (e) => {
      dispatch(e.target);
    };

    return (
      <div>
        <div>
          <input name="name" value={name} onChange={onChange} />
          <input name="nickname" value={nickname} onChange={onChange} />
        </div>
        <div>
          <div>
            <b>이름:</b> {name}
          </div>
          <div>
            <b>닉네임:</b> {nickname}
          </div>
        </div>
      </div>
    );
  };

  export default Info;
  ```

  useReducer에서의 action 그 어떤 값도 사용 가능하다. 그래서 이런 식으로 인풋을 관리하면 아무리 인풋의 개수가 많아져도 코드를 짧고 깔끔하게 유지할 수 있다.

# useMemo

> useMemo를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있다.

```jsx
// Average.js

import React, { useState } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };

  const onInsert = () => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {getAverage(list)}
      </div>
    </div>
  );
};

export default Average;
```

위 코드는 숫자를 등록할 때뿐만 아니라 인풋 내용이 수정될 때도 getAverage 함수가 호출되는 것을 확인할 수 있다. 인풋 내용이 바뀔 때는 평균값을 다시 계산할 필요가 없는데, 이렇게 **렌더링할 때마다 계산하는 것은 낭비다.**

useMemo Hook을 사용하면 이러한 작업을 최적화할 수 있다. **렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행**하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식이다.

```jsx
// Average.js

import React, { useState, useMemo } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };

  const onInsert = () => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```

useMemo를 사용한 위 코드에서는 **list 배열의 내용이 바뀔 때만 getAverage 함수가 호출된다.**

# useCallback

useCallback은 useMemo와 상당히 비슷한 함수이다.

> 주로 렌더링 성능을 최적화해야 하는 상황에서 사용하는데, 이 Hook을 사용하면 만들어 놨던 함수를 재사용할 수 있다.

useMemo 파트에서의 Average 컴포넌트에서 onChange와 onInsert라는 함수를 선언해 주었는데, 이렇게 선언하면 컴포넌트가 리렌더링될 때마다 새로 만들어진 함수를 사용하게 된다. 대부분의 경우 이러한 방식은 문제가 없지만, **컴포넌트의 렌더링이 자주 발생하거나 렌더링해야 할 컴포넌트의 개수가 많아지면 이 부분을 최적화해 주는 것이 좋다.**

```jsx
// Average.js

import React, { useState, useMemo, useCallback } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = useCallback(e => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  }, [number, list]); // number 혹은 list가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```

**useCallback의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째 파라미터에는 배열을 넣으면 된다. 이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시해야 한다.**

onChange처럼 비어 있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 만들었던 함수를 계속해서 재사용하게 되며, onInsert처럼 배열 안에 number와 list를 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가될 때 새로 만들어진 함수를 사용하게 된다.

**함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함시켜 주어야 한다.** 예를 들어 onChange의 경우 기존의 값을 조회하지 않고 바로 설정만 하기 때문에 배열이 비어 있어도 상관없지만, onInsert는 기존의 number와 list를 조회해서 nextList를 생성하기 때문에 배열 안에 number와 list를 꼭 넣어주여야 한다.

# useRef

> useRef Hook은 함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해준다.

```jsx
// Average.js

import React, { useState, useMemo, useCallback, useRef } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const inputEl = useRef(null);

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(
    (e) => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber("");
      inputEl.current.focus();
    },
    [number, list]
  ); // number 혹은 list가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```

등록 버튼을 눌렀을 때 포커스가 인풋 쪽으로 넘어가도록 한다.

useRef를 사용하여 ref를 설정하면 useRef를 통해 만든 객체 안의 **current** 값이 실제 엘리먼트를 가리킨다.

<br />

- **로컬 변수 사용하기**

  추가로 컴포넌트 **로컬 변수를 사용해야 할 때도 useRef를 활용할 수 있다.** 여기서 로컬 변수란 렌더링과 상관없이 바뀔 수 있는 값을 의미한다.

  ```jsx
  // 클래스 형태로 작성된 컴포넌트의 경우 로컬 변수 사용

  import React, { Component } from "react";

  class MyComponent extends Component {
    id = 1;
    setId = (n) => {
      this.id = n;
    };
    printId = () => {
      console.log(this.id);
    };

    render() {
      return <div>MyComponent</div>;
    }
  }

  export default MyComponent;
  ```

  이러한 코드를 함수형 컴포넌트로 작성한다면 다음과 같이 할 수 있다.

  ```jsx
  // 함수 형태로 작성된 컴포넌트의 경우 로컬 변수 사용

  import React, { useRef } from "react";

  const RefSample = () => {
    const id = useRef(1);
    const setId = (n) => {
      id.current = n;
    };
    const printId = () => {
      console.log(id.current);
    };

    return <div>refSample</div>;
  };

  export default RefSample;
  ```

  이렇게 **ref 값이 바뀌어도 컴포넌트가 렌더링되지 않는다**는 점에 주의해야 한다.

  **렌더링과 관련되지 않은 값을 관리할 때만 이러한 방식으로 코드를 작성해야 한다.**

# 커스텀 Hooks 만들기

> 여러 컴포넌트에서 비슷한 기능을 공유할 경우, 이를 나만의 Hook으로 작성하여 로직을 재사용할 수 있다.

```jsx
// useInputs.js

import { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = (e) => {
    dispatch(e.target);
  };
  return [state, onChange];
}
```

```jsx
// Info.js

import React from "react";
import useInputs from "./useInputs";

const Info = () => {
  const [state, onChange] = useInputs({
    name: "",
    nickname: "",
  });
  const { name, nickname } = state;

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```

다른 개발자가 만든 Hooks도 라이브러리로 설치하여 사용할 수 있다.

다른 개발자가 만든 다양한 Hooks 리스트는 다음 링크에서 확인할 수 있다.

[http://nikgraf.github.io/react-hooks/](http://nikgraf.github.io/react-hooks/)

[http://github.com/rehooks/awesome-react-hooks](http://github.com/rehooks/awesome-react-hooks)

# 정리

React에서 Hooks 패턴을 사용하면 클래스형 컴포넌트를 작성하지 않고도 대부분의 기능을 구현할 수 있다.

React 매뉴얼에서는 새로 작성하는 컴포넌트의 경우 함수형 컴포넌트와 Hooks를 사용할 것을 권장하고 있다. 

앞으로 프로젝트를 개발할 때는 함수형 컴포넌트의 사용을 첫 번째 옵션으로 두고, 꼭 필요한 상황에서만 클래스형 컴포넌트를 구현하는 것이 좋을거 같다.

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
