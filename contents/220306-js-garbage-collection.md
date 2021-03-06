---
date: "2022-03-06"
title: "[JavaScript] Garbage Collection"
category: "Language"
categoryColor: "#25e5bd"
tags: ["JS"]
thumbnail: "./images/JavaScript.png"
---

❗️ **자바스크립트는 눈에 보이지 않는 곳에서 메모리 관리를 수행한다.**

원시값, 객체, 함수 등 모든 것은 메모리를 차지한다.

그렇다면 더는 쓸모 없게 된 것들은 어떻게 처리될까?

<br />

**자바스크립트는 도달 가능성(reachability) 이라는 개념을 사용해 메모리 관리를 수행한다.**

> ‘도달 가능한(reachable)’ 값은 쉽게 말해 어떻게든 접근하거나 사용할 수 있는 값을 의미한다. 도달 가능한 값은 메모리에서 삭제되지 않는다.

아래 값들은 태생부터 도달 가능하기 때문에, 명백한 이유 없이는 삭제되지 않는다.

- **현재 함수의 지역 변수와 매개변수**

- **중첩 함수의 체인에 있는 함수에서 사용되는 변수와 매개변수**

- **전역 변수**

이런 값들을 **루트(root)** 라고 부른다.

<br />

**루트가 참조하는 값이나 체이닝으로 루트에서 참조할 수 있는 값은 도달 가능한 값이 된다.**

- 전역 변수에 객체가 저장되어 있다고 가정했을 때, 이 **객체의 프로퍼티가 또 다른 객체를 참조하고 있다면**, 프로퍼티가 참조하는 객체는 도달 가능한 값이 된다.

<br />

자바스크립트 엔진 내에서 **가비지 컬렉터(garbage collector)** 가 끈임없이 동작한다.

**가비지 컬렉터는 모든 객체를 모니터링하고, 도달할 수 없는 객체는 삭제한다.**

```js
let user = {
  name: "John",
};

user = null;
```

처음에 `user`엔 객체 참조 값이 저장되었다.

하지만 `user`의 값을 `null`이라는 다른 값으로 덮어쓰게 되었기 때문에, **기존에 참조된 객체는 이제 도달할 수 없는 상태가 된다.**

➡️ 따라서 **가비지 컬렉터는 해당 객체에 저장된 데이터를 삭제하고, 객체를 메모리에서 삭제한다.**

(만약 해당 **객체 참조가 두 개일 때**는 모든 참조가 사라지지 않는 한, 객체는 메모리에서 삭제되지 않는다.)

<br />

❗️ **외부에서 들어오는 참조만이 도달 가능한 상태에 영향을 준다.**

`A(Object) -> B(Object)` (화살표는 가리키는 객체를 참조한다는 뜻이다.) 일 때,

`B` 객체 만이 참조에 영향을 받는다는 것이다.

그렇기에 `A`는 들어오는 참조가 없기 때문에 도달 가능한 상태에서 벗어난다!

<br />

그림을 그리면 더 알아보기 쉽게 설명이 가능하겠지만, 귀찮다..😅

<br />

## 알고리즘

이러한 가비지 컬렉션의 기본 **알고리즘**인 **'mark-and-sweep'** 에 대해 알아보겠다.

- **가비지 컬렉터는 루트(root) 정보를 수집하고 이를 mark(기억) 한다.**

- **루트가 참조하고 있는 모든 객체를 방문하고 이것들을 mark 한다.**

- **mark 된 모든 객체에 방문하고 그 객체들이 참조하는 객체도 mark 한다.**

  - 한번 방문한 객체는 전부 mark 하기 때문에 같은 객체를 다시 방문하는 일은 없다.

- **루트에서 도달 가능한 모든 객체를 방문할 때까지 위 과정을 반복한다.**

- **mark 되지 않은 모든 객체를 메모리에서 삭제한다.**

<br />

음.. 마치 **BFS** 같다. (아니면 말고..)

<br />

또한, 자바스크립트 엔진은 실행에 영향을 미치지 않으면서 가비지 컬렉션을 더 빠르게 하는 다양한 **최적화 기법**을 적용한다.

- **generational collection(세대별 수집)**

  - 객체를 '새로운 객체’와 '오래된 객체’로 나눈다.

  - 객체 상당수는 생성 이후 제 역할을 빠르게 수행해 금방 쓸모가 없어지는데, 이런 객체를 '새로운 객체’로 구분한다.

  - 가비지 컬렉터는 이런 객체를 공격적으로 메모리에서 제거한다.

  - **일정 시간 이상 동안 살아남은 객체는 '오래된 객체’로 분류하고, 가비지 컬렉터가 덜 감시한다.**

- **incremental collection(점진적 수집)**

  - 방문해야 할 객체가 많다면 모든 객체를 한 번에 방문하고 mark 하는데 상당한 시간이 소모된다.

  - **가비지 컬렉션을 여러 부분으로 분리한 다음, 각 부분을 별도로 수행한다.**

  - 작업을 분리하고, 변경 사항을 추적하는 데 추가 작업이 필요하긴 하지만, **긴 지연을 짧은 지연 여러 개로 분산시킬 수 있다는 장점**이 있다.

- **idle-time collection(유휴 시간 수집)**

  - 가비지 컬렉터는 **실행에 주는 영향을 최소화하기 위해 CPU가 유휴 상태일 때에만 가비지 컬렉션을 실행한다.**

<br />

이 외에도 다양한 최적화 기법과 가비지 컬렉션 알고리즘이 있다. 

하지만.. 굳이 다루지 않겠다. (이 정도면 충분하겠지 😅)

<br />

이번 개념은 처음 알게된 부분이라 학습하는데 꽤 재밌었다.

아닌가..? 학교 운영체제 수업에서 배웠던거 같기도 하고..😑

<br />

## ※ Source

🖥 ko.javascript.info