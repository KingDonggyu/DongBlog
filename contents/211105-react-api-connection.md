---
date: "2021-11-05"
title: "[React] 외부 API 연동하기 - 비동기 처리"
category: "Web"
categoryColor: "mediumpurple"
tags: ["React", "JS", "axios"]
thumbnail: "./images/React.png"
---

# 비동기 작업의 이해

<hr />

웹 애플리케이션을 만들다 보면 처리할 때 시간이 걸리는 작업이 있다. 예를 들어 웹 애플리케이션에서 서버 쪽 데이터가 필요할 때는 **Ajax** 기법을 사용하여 서버의 API를 호출함으로써 데이터를 수신한다. 이렇게 **서버의 API를 사용해야 할 때는 네트워크 송수신 과정에서 시간이 걸리기 때문에 작업이 즉시 처리되는 것이 아니라, 응답을 받을 때까지 기다렸다가 전달받은 응답 데이터를 처리한다.** 이 과정에서 해당 작업을 **비동기적**으로 처리하게 된다.

<br />

**만약 작업을 동기적으로 처리한다면 요청이 끝날 때까지 기다리는 동안 중지 상태가 되기 때문에 다른 작업을 할 수 없다.**

그리고 요청이 끝나야 비로소 그 다음 예정된 작업을 할 수 있다.

> 하지만 이를 비동기적으로 처리한다면 웹 애플리케이션이 멈추지 않기 때문에 동시에 여러 가지 요청을 처리할 수 있고, 기다리는 과정에서 다른 함수도 호출할 수 있다.

이렇게 서버 API를 호출할 때 외에도 작업을 비동기적으로 처리할 때가 있는데, 바로 **`setTimeout` 함수를 사용하여 특정 작업을 예약**할 때이다.

다음 코드는 3초 후에 `printMe` 함수를 호출한다.

```jsx
function printMe() {
  console.log("Test");
}
setTimeout(printMe, 3000);
console.log("대기 중...");
```

`setTimeout`이 사용되는 시점에서 코드가 3초 동안 멈추는 것이 아니라, 일단 코드가 외부부터 아래까지 다 호출되고 3초 뒤에 지정해 준 `printMe`가 호출되고 있다.

**자바스크립트에서 비동기 작업을 할 때 가장 흔히 사용하는 방법은 콜백 함수를 사용하는 것이다.**

위 코드처럼 `printMe`가 3초 뒤에 호출되도록 `printMe` 함수 자체를 `setTimeout` 함수의 인자로 전달해 주었는데, 이런 함수를 **콜백 함수**라 한다.

<br />

## 콜백 함수

아래 코드는 파라미터 값이 주어지면 1초 뒤에 10을 더해서 반환하는 함수가 있고, 해당 함수가 처리된 직후 어떠한 작업을 수행한다.

```jsx
function increase(number, callback) {
  setTimeout(() => {
    const result = number + 10;
    if (callback) {
      callback(result);
    }
  }, 1000);
}

increase(0, (result) => {
  console.log(result);
  increase(0, (result) => {
    console.log(result);
    increase(0, (result) => {
      console.log(result);
      increase(0, (result) => {
        console.log(result);
      });
    });
  });
});

// 10
// 20
// 30
// 40
```

이렇게 **콜백 안에 또 콜백을 넣어서 구현할 수 있는데, 너무 여러 번 중첩되니까 코드의 가독성이 나빠졌다.**

이러한 형태를 코드의 **콜백 지옥**이라고 한다. 웬만하면 지양해야 할 형태의 코드다.

<br />

## Promise

**Promise**는 **콜백 지옥** 같은 코드가 형성되지 않게 하는 방안으로 ES6에 도입된 기능이다.

바로 위에서 본 코드를 **Promise**를 사용하여 구현해 보겠다.

```jsx
function increase(number) {
  const promise = new Promise((resolve, reject) => {
    // resolve는 성공, reject는 실패
    setTimeout(() => {
      const result = number + 10;
      if (result > 50) {
        // 50보다 높으면 에러 발생시키기
        const e = new Error("NumberTooBig");
        return reject(e);
      }
      resolve(result);  // number 값에 +10 후 성공 처리
    }, 1000);
  });
  return promise;
}

increase(0)
.then((number) => {
    // Promise에서 resolve된 값은 .then을 통해 받아 올 수 있음
    console.log(number);
    return increase(number);  // Promise를 리턴하면
});
.then((number) => {
    // 또 .then으로 처리 가능
    console.log(number);
    return increase(number);
});
.then((number) => {
    console.log(number);
    return increase(number);
});
.then((number) => {
    console.log(number);
    return increase(number);
});
.then((number) => {
    console.log(number);
    return increase(number);
});
.catch(e => {
    // 도중에 에러가 발생한다면 .catch를 통해 알 수 있음
    console.log(e);
});
```

여러 작업을 연달아 처리한다고 해서 함수를 여러 번 감싸는 것이 아니라 `.then`을 사용하여 그 다음 작업을 설정하기 때문에 **콜백 지옥이 형성되지 않는다.**

<br />

## async/await

**async/await**는 **Promise**를 더욱 쉽게 사용할 수 있도록 해주는 ES2017(ES8) 문법이다.

이 문법을 사용하려면 함수의 앞부분에 `async` 키워드를 추가하고, 해당 함수 내부에서 `Promise`의 앞부분에 `await` 키워드를 사용한다.

이렇게 하면 `Promise`가 끝날 때까지 기다리고, 결과 값을 특정 변수에 담을 수 있다.

```jsx
function increase(number) {
  const promise = new Promise((resolve, reject) => {
    // resolve는 성공, reject는 실패
    setTimeout(() => {
      const result = number + 10;
      if (result > 50) {
        // 50보다 높으면 에러 발생시키기
        const e = new Error("NumberTooBig");
        return reject(e);
      }
      resolve(result);
    }, 1000);
  });
  return promise;
}

async function runTasks() {
  try {
    // try/catch 구문을 사용하여 에러를 처리한다.
    let result = await increase(0);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
```

<br />

# axios로 API 호출해서 데이터 받아 오기

<hr />

> axios는 현재 가장 많이 사용되고 있는 자바스크립트 HTTP 클라이언트이다. 이 라이브러리의 특지은 HTTP 요청을 Promise 기반으로 처리한다는 점이다.

```
npm install axios
```

```jsx
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);
  const onClick = () => {
    axios
      .get("http://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        setData(response.data);
      });
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          ros={7}
          value={JSON.stringfy(data, null, 2)}
          readonly={true}
        />
      )}
    </div>
  );
};

export default App;
```

위 코드는 불러오기 버튼을 누르면 JSONPlaceholder(http://jsonplaceholder.typicode.com/) 에서 제공하는 가짜 API를 호출하고 이에 대한 응답을 컴포넌트 상태에 넣어서 보여 주는 예제이다.

`onClick` 함수에서 `axios.get` 함수를 사용했다. **이 함수는 파라미터로 전달된 주소에 GET 요청을 해준다.**

그리고 이에 대한 결과는 `.then`을 통해 비동기적으로 확인할 수 있다.

<br />

아래는 위 코드에 `async`를 적용한 코드이다.

```jsx
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get(
        "http://jsonplaceholder.typicode.com/todos/1"
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          ros={7}
          value={JSON.stringfy(data, null, 2)}
          readonly={true}
        />
      )}
    </div>
  );
};

export default App;
```

화살표 함수에 **async/await**를 적용할 때는 `async () => {}`와 같은 형식으로 적용한다.

<br />

# 데이터 연동하기

<hr />

> 컴포넌트가 화면에 보이는 시점에 API를 요청해볼 때는 `useEffect`를 사용하여 컴포넌트가 처음 렌더링되는 시점에 API를 요청하면 된다.

**여기서 주의할 점은 `useEffect`에 등록하는 함수에 `async`를 붙이면 안된다는 것이다.**

`useEffect`에서 반환해야 하는 값은 뒷정리 함수이기 때문이다.

따라서 `useEffect` 내부에서 `async/await`를 사용하고 싶다면, **함수 내부에 `async` 키워드가 붙은 또 다른 함수를 만들어서 사용해 주어야 한다.**

```jsx

...

const [loading, setLoading] = useState(false);

useEffect(() => {
  // async를 사용하는 함수 따로 선언
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://newsapi.org/v2/top-headlines?country=kr&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f',
      );
      setArticles(response.data.articles);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  fetchData();
}, []);

// 대기 중일 때
if (loading) {
  return <NewsListBlock>대기 중...</NewsListBlock>;
}

// 아직 articles 값이 설정되지 않았을 때
if(!articles) {
  return null;
}

...

```

<br />

# usePromise 커스텀 Hook 만들기

<hr />

> 컴포넌트에서 API 호출처럼 `Promise`를 사용해야 하는 경우 더욱 간결하게 코드를 작성할 수 있도록 해 주는 **커스텀 Hook**을 만들어서 적용할 수 있다.

```jsx
import { useState, useEffect } from "react";

export default function usePromise(promiseCreator, deps) {
  // 대기 중/완료/실패에 대한 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, error];
}
```

프로젝트의 다양한 곳에서 사용될 수 있는 유틸 함수들은 보통 이렇게 **src** 디렉터리에 **lib** 디렉터리를 만든 후 그 안에 작성한다.

위 `usePromise` Hook은 `Promise`의 대기 중, 완료 결과, 실패 결과에 대한 상태를 관리하며, `usePromise`의 의존 배열 `deps`를 파라미터로 받아온다.

파라미터로 받아 온 `deps` 배열은 `usePromise` 내부에서 사용한 `useEffect`의 의존 배열로 설정되는데, 이 배열을 설정하는 부분에서 **ESlint** 경고가 나타난다.

이 경고를 무시하려면 특정 줄에서만 ESLint 규칙을 무시하도록 주석을 작성해 주어야 한다.

<br />

아래는 위에서 만든 `usePromise` Hook을 이용한 코드이다.

```jsx

...

const [loading, response, error] = usePromise(() => {
  const query = category = 'all' ? '' : `category=${category}`;
  return axios.get(
    `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`,
  );
}, [category]);

...

```

`usePromise`와 같이 **커스텀 Hook**을 통해 **상태관리**와 `useEffect` 설정을 직접 하지 않아도 되므로 **코드가 훨씬 간결해진다.**

요청 상태를 관리할 때 무조건 커스텀 Hook을 만들어서 사용해야 하는 것은 아니지만, 상황에 따라 적절히 사용하면 좋은 코드를 만들어 갈 수 있다.

<br />

# 정리

<hr />

- 리액트 컴포넌트에서 API를 연동하여 개발할 때 절대 잊지 말아야 할 유의 사항은 `useEffect`에 등록하는 함수는 `async`로 작성하면 안 된다는 점이다.

  - 대신 **함수 내부에 `async`함수를 따로 만들어 주어야 한다.**

<br />

- 사용해야 할 **API의 종류가 많아지면 요청을 위한 상태 관리를 하는 것이 번거로워질 수 있다.**

  - **리덕스**와 **리덕스 미들위어**를 활용하면 좀 더 쉽게 요청에 대한 상태를 관리할 수 있다.

  - 이는 이후 포스트에서 다루도록 하겠다.

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
