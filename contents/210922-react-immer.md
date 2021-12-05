---
date: "2021-09-22"
title: "[React] immer를 사용하여 더 쉽게 불변성 유지하기"
category: "Web"
categoryColor: "indianred"
tags: ["React"]
thumbnail: "./images/React.png"
---

**전개 연산자**와 **배열의 내장 함수**를 사용하면 간단하게 배열 혹은 객체를 복사하고 새로운 값을 덮어 쓸 수 있다.

하지만 **객체의 구조가 엄청나게 깊어지면 불변성을 유지하면서 이를 업데이트하는 것이 매우 힘들다.**

값 하나를 업데이트하기 위해 코드를 열 줄 정도 작성해야 한다. 전개 연산자를 자주 사용한 것은 기존에 가지고 있던 다른 값은 유지하면서 원하는 값을 새로 지정하기 위해서다. 그럴 때마다 전개 연산자를 여러 번 사용하는 것은 꽤 번거로운 작업이고 가독성 또한 좋지 않다.

<br />

<div style="text-align: center">
    <img src="https://www.etatvasoft.com/blog/wp-content/uploads/2020/08/Immer.png" width="300">
</div>

> 이러한 상황에 immer라는 라이브러리를 사용하면, 구조가 복잡한 객체도 매우 쉽고 짧은 코드를 사용하여 불면성을 유지하면서 업데이트해 줄 수 있다.

# immer 사용법

```
npm install immer --save
```

**immer**를 사용하면 불변성을 유지하는 작업을 매우 간단하게 처리할 수 있다. 이 라이브러리의 사용법은 다음과 같다.

```jsx
import produce from "immer";
const nextState = produce(originalState, (draft) => {
  // 바꾸고 싶은 값 바꾸기
  draft.somewhere.deep.inside = 5;
});
```

**produce**라는 함수는 두 가지 파라미터를 받는다. 첫 번째 파라미터는 **수정하고 싶은 상태**이고, 두 번째 파라미터는 상태를 **어떻게 업데이트할지 정의하는 함수**이다.

두 번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면, **produce** 함수가 불변성 유지를 대신해 주면서 새로운 상태를 생성해 준다.

이 라이브러리의 핵심은 **불변성에 신경 쓰지 않는 것처럼 코드를 작성하되 불변성 관리는 제대로 해 주는 것**이다. 단순히 깊은 곳에 위치하는 값을 바꾸는 것 외에 배열을 처리할 때도 매우 쉽고 편하다.

다음 코드는 좀 더 복잡한 데이터를 불변성을 유지하면서 업데이트하는 예시이다.

```jsx
import produce from "immer";

const originalState = [
  {
    id: 1,
    todo: "공부하기",
    checked: true,
  },
  {
    id: 2,
    todo: "축구하기",
    checked: false,
  },
];

const nextState = produce(originalState, (draft) => {
  // id가 2인 항목의 checked 값을 true로 설정
  const todo = draft.find((t) => t.id === 2); // id로 항목 찾기
  todo.checked = true; // 혹은 draft[1].checked = true;

  // 배열에 새로운 데이터 추가
  draft.push({
    id: 3,
    todo: "쇼핑하기",
    checked: false,
  });

  // id = 1인 항목을 제거하기
  draft.splice(
    draft.findIndex((t) => t.id === 1),
    1
  );
});
```

**immer**를 사용하여 컴포넌트 상태를 작성할 때는 객체 안에 있는 값을 직접 수정하거나, 배열에 직접적인 변화를 일으키는 **push**, **splice** 등의 함수를 사용해도 무방하다. 그렇기 때문에 불변성 유지에 익숙하지 않아도 자바스크립트에 익숙하다면 컴포넌트 상태에 원하는 변화를 쉽게 반영시킬 수 있다.

**immer를 사용한다고 해서 무조건 코드가 간결해지지는 않는다.** 항목을 삭제하는 경우에는 배열 내장 함수 **filter**를 사용하는 것이 코드가 더 깔끔하므로, 굳이 **immer**를 사 적용할 필요가 없다.

**_immer는 불변성을 유지하는 코드가 복잡할 때만 사용해도 충분하다._**

<br />
<br />

- **useState의 함수형 업데이트와 immer 함께 쓰기**

  > immer에서 제공하는 produce 함수를 호출할 때, 첫 번째 파라미터가 함수 형태라면 업데이트 함수를 반환한다.

  ```jsx
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(
      produce((drft) => {
        draft[name] = value;
      })
    );
  }, []);
  ```

  **produce** 함수의 파라미터를 함수 형태로 사용하면 코드가 더욱 깔끔해진다.

<br />

# 정리

**immer** 라이브러리는 컴포넌트의 상태 업데이트가 조금 까다로울 때 사용하면 매우 좋다.

상태 관리 라이브러리인 **Redux**를 사용할 때도 **immer**를 쓰면 코드를 매우 쉽게 작성할 수 있다.

이러한 라이브러리는 편의를 위한 것이므로 꼭 필요하지는 않지만, 사용한다면 생산성을 크게 높일 수 있다. 

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
