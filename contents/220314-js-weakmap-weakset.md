---
date: "2022-03-14T18:00"
title: "[JavaScript] WeakMap과 WeakSet"
category: "Language"
categoryColor: "#25e5bd"
tags: ["JS"]
thumbnail: "./images/JavaScript.png"
---

지난 Map과 Set의 학습에 이어 이번엔 WeakMap과 WeakSet에 대해 알아보겠다.

가비지 컬렉션에서 보았듯이 **자바스크립트 엔진은 도달 가능한 (추후 사용될 가능성이 있는) 값을 메모리에 유지한다.**

💡 **자료구조를 구성하는 요소도 자신이 속한 자료구조가 메모리에 남아있는 동안 대게 도달 가능한 값으로 취급되어 메모리에서 삭제되지 않는다.**

객체의 프로퍼티나 배열의 요소, 맵이나 셋을 구성하는 요소들이 이에 해당한다.

<br />

```js
let peter = { name: "Peter" };
let array = [ peter ];

peter = null;

console.log(JSON.stringify(array[0]));  // {"name":"Peter"}
```

위 예시에서 배열에 객체 하나를 추가했다.

**이때 배열이 메모리에 남아있는 한, 배열의 요소인 이 객체도 메모리에 남아있게 된다.**

**이 객체를 참조하는 것이 아무것도 없더라도!**

<br />

```js
let peter = { name: "Peter" };
let map = new Map();
map.set(peter, "...");

peter = null;

for (let obj of map.keys()) {
    console.log(JSON.stringify(obj));  // {"name":"Peter"}
}

console.log(map.size);  // 1
```

**맵에서 객체를 키로 사용한 경우 역시, 맵이 메모리에 있는 한, 객체도 메모리에 남는다.**

즉, 가비지 컬렉터의 대상이 되지 않는 것이다.

<br />

이런 관점에서 위크맵(WeakMap)은 일반 맵과 전혀 다른 양상을 보인다.

**위크맵을 사용하면 키로 쓰인 객체가 가비지 컬랙션의 대상이 된다!**

<br />

# WeakMap

**맵과 위크맵의 첫번째 차이는 위크맵의 키가 반드시 객체여야 한다는 점이다.**

즉, 원시값은 위크맵의 키가 될 수 없다.

```js
let peter = { name: "Peter" };

let weakMap = new WeakMap();
weakMap.set(peter, "...");

peter = null; // 
```

위 예시에서 `peter`를 나타내는 객체는 오로지 위크맵의 키로만 사용되고 있으므로,

**참조를 덮어쓰게 되면 이 객체는 위크맵과 메모리에서 자동으로 삭제된다.**

<br />

**맵과 위크맵의 두번째 차이는 위크맵은 반복 작업과 `keys()`, `values()`, `entries()` 메서드를 지원하지 않는다는 점이다.**

따라서 위크맵에선 키나 값 전체를 얻는 게 불가능하다!

<br />

위크맵이 지원하는 메서드는 아래와 같이 단출하다.

- `weakMap.get(key)`

- `weakMap.set(key, value)`

- `weakMap.delete(key)`

- `weakMap.has(key)`

왜 이렇게 적은 메서드만 제공할까?

원인은 가비지 컬렉션의 동작 방식 때문이다!

위 예시의 `peter`를 나타내는 객체처럼, **객체는 모든 참조를 잃게 되면 자동으로 가비지 컬렉션의 대상이 된다.**

그런데 **가비지 컬렉션의 동작 시점은 정확히 알 수 없다.**

가비지 컬렉션이 일어나는 시점은 자바스크립트 엔진이 결정한다.

객체는 모든 참조를 잃었을 때, 그 즉시 메모리에서 삭제될 수도 있고, 다른 삭제 작업이 있을 때까지 대기하다가 함께 삭제될 수도 있다.

현재 위크맵에 요소가 몇 개 있는지 정확히 파악하는 것 자체가 불가능한 것이다..

❗️ **요약하면, 가비지 컬렉터가 한 번에 메모리를 청소할 수도 있고, 부분 부분 메모리를 청소할 수도 있으므로 위크맵의 요소(키/값) 전체를 대상으로 무언가를 하는 메서드는 동작 자체가 불가능하다.**

<br />

그럼 이러한 위크맵을 어떤 경우에 사용할까?

<br />

### Use case: 추가 데이터

**위크맵은 부차적인 데이터를 저장할 곳이 필요할 때 그 진가를 발휘한다!**

> 부차적: 주된 것이 아니라 그것에 곁딸린. 또는 그런 것.

서드파티 라이브러리와 같이 **외부 코드에 속한 객체**를 가지고 작업을 해야 한다고 가정해보자.

이 객체에 데이터를 추가해줘야 하는데, 추가해줄 데이터는 객체가 살아있는 동안에만 유효한 상황이다.

이럴 때! 위크맵을 사용할 수 있다.

<br />

위크맵에 원하는 데이터를 저장하고, 이때 키는 객체를 사용하면 된다.

이렇게 하면 객체가 가지비 컬렉션의 대상이 될 때, 데이터도 함께 사라지게 된다.

```js
weakMap.set(peter, "비밀문서");
// peter가 사망하면, 비밀문서는 자동으로 파기된다.
```

<br />

아직 이해가 안된다고? (내가 아직 이해가 안된다..)

그렇다면 좀 더 구체적인 예시를 보자!

```js
// visitsCount.js
let visitsCountMap = new Map(); 

// 사용자가 방문하면 방문 횟수를 늘리는 함수
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

위는 사용자의 방문 횟수를 세어주는 코드이다.

관련 정보는 맵에 저장하고 있는데 맵 요소의 키엔 특정 사용자를 나타내는 객체를, 값엔 해당 사용자의 방문 횟수를 저장하고 있다.

어떤 사용자의 정보를 저장할 필요가 없어지면, 즉 가지비 컬렉션의 대상이 되면 해당 사용자의 방문 횟수도 저장할 필요가 없어질 것이다!

```js
// main.js
let peter = { name: "Peter" };
countUser(peter);
peter = null;
```

위 코드로 `peter`를 나타내는 객체는 가비지 컬렉션의 대상이 되어야 하는데, `visitsCountMap`의 키로 사용되고 있어서 메모리에서 삭제되지 않는다.

특정 사용자를 나타내는 객체가 메모리에서 사라지면 해당 객체에 대한 정보(방문 횟수)도 우리가 손수 지워줘야 하는 상황이다..

귀찮지만 이렇게 하지 않으면 `visitsCountMap`이 차지하는 메모리 공간이 한없이 커질 것이다 😫

애플리케이션 구조가 복잡할 땐, 이렇게 쓸모없는 데이터를 수동으로 비워주는게 꽤 골치 아프다.

<br />

이러한 문제를 위크맵을 사용해 예방할 수 있는 것이다!

```js
// visitsCount.js
let visitsCountMap = new WeakMap(); 

function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

위 코드와 같이 위크맵을 사용하면 `visitsCountMap`의 메모리를 수동으로 비워줄 필요가 없다.

위크맵의 키(`peter`)에 대응하는 값(방문 횟수)도 자동으로 가비지 컬렉션의 대상이 된다.

<br />

### Use case: Caching

그리고 또! **위크맵은 캐싱(caching)이 필요할 때 유용하다!!**

> **캐싱은 시간이 오래 걸리는 작업의 결과를 저장해서 연산 시간과 비용을 절약해주는 기법이다.** 동일한 함수를 여러번 호출해야 할 때, 최초 호출시 반환된 값을 어딘가에 저장해 놓았다가 그 다음엔 함수를 호출하는 대신 저장된 값을 사용하는 것을 캐싱이라 할 수 있다.

아래 예시는 함수 연산 결과를 맵에 저장하고 있다.

```js
// cache.js
let cache = new Map();

function process(obj) {
  if (!cache.has(obj)) {
    let result = /* 연산 수행 */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// main.js
let obj = {/* ... 객체 ... */};

let result1 = process(obj); 
let result2 = process(obj); 

obj = null;

console.log(cache.size); // 1
```

함수 `process()`를 호출해 연산을 수행하고 그 결과를 맵(`cache`)에 저장한다.

동일한 함수를 두번째 호출할 땐, 연산을 수행할 필요없이 맵에 저장된 결과를 가져온다.

그런데!

객체가 쓸모없어졌기에 참조를 덮어썼더니, 여전히 객체가 맵에 남아있다..

객체가 필요 없어져 `cache`를 수동으로 청소해줘야하는 상황이 또 발생한 것이다.

<br />

아 그래서 위크맵을 사용하라고?

맞다. 위크맵으로 교체하면 이런 문제를 예방할 수 있다.

**객체가 메모리에서 삭제되면, 캐시에 저장된 결과(함수 연산 결과) 역시 메모리에서 자동으로 삭제되기 때문이다.**

```js
// cache.js
let cache = new WeakMap();

function process(obj) {
  if (!cache.has(obj)) {
    let result = /* 연산 수행 */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// main.js
let obj = {/* ... 객체 ... */};

let result1 = process(obj);
let result2 = process(obj);

obj = null;
```

위 예시에선 맵을 사용한 예시처럼 `cache.size`를 사용할 수 없다.

이유는 아까 설명했기에 알 것이다.

<br />

# WeakSet

이제 위크셋(WeakSet)에 대해 알아보자. 

- **위크셋은 셋과 유사한데, 객체만 저장할 수 있다는 점이 다르다.**

  즉, 원시값은 저장할 수 없다.

- **위크셋 안의 객체는 도달 가능할 때만 메모리에서 유지된다.**

- **위크셋이 지원하는 메서드는 단출하다.**

  `add`, `has`, `delete`를 사용할 수 있고, `size`, `keys()`나 반복 작업 관련 메서드는 사용할 수 없다.

<br />

위크맵과 유사하게 위크셋도 부차적인 데이터를 저장할 때 사용할 수 있다.

다만, **위크셋엔 위크맵처럼 복잡한 데이터를 저장하지 않는다.**

대신 **"예"나 "아니오" 같은 간단한 답변을 얻는 용도로 사용된다.**

```js
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); 
visitedSet.add(pete); 
visitedSet.add(john); 

console.log(visitedSet.has(john)); // true
console.log(visitedSet.has(mary)); // false

john = null;
```

`visitedSet`에서 `john`을 나타내는 객체가 자동으로 삭제될 것이다.

위에서 위크맵에 대해 자세히 다루었기 때문에 위크셋은 더이상 다루지 않겠다.

<br />
<br />

**위크맵과 위크셋의 가장 큰 단점은 반복 작업이 불가능하다는 점이다.**

위크맵이나 위크셋에 저장된 자료를 한 번에 얻는게 불가능하니까..

이런 단점은 불편함을 초래하는 것 같아 보이지만, 위크맵과 위크셋을 이용해 할 수 있는 주요 작업을 방해하진 않는다.

위크맵과 위크셋은 객체와 함께 **추가 데이터를 저장하는 용도**로 쓰면 되겠지?

<br />

## ※ Source

🖥 ko.javascript.info