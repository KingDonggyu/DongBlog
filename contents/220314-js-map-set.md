---
date: "2022-03-14"
title: "[JavaScript] Map과 Set"
category: "Language"
categoryColor: "#25e5bd"
tags: ["JS"]
thumbnail: "./images/JavaScript.png"
---

- **객체** : 키가 있는 컬렉션을 저장

- **배열** : 순서가 있는 컬렉션을 저장

여태껏 위와 같은 복잡한 자료구조를 학습했다.

하지만 현실 세계를 반영하기엔 이 두 자료구조 만으로는 부족해서 **맵(Map)** 과 **셋(Set)** 이 등장하게 되었다.

<br />

# Map

**맵(Map)은 키가 있는 데이터를 저장한다는 점에서 객체와 유사하다.**

다만, 맵은 **키에 있는 자료형을 허용한다는 점에서 차이가 있다.**

<br />

맵에는 다음과 같은 주요 메서드와 프로퍼티가 있다.

- `new Map()` : 맵을 생성

- `map.set(key, value)` : `key`를 이용해 `value`를 저장

- `map.get(key)` : `key`에 해당하는 값을 반환 (`key`가 존재하지 않으면 `undefined`를 반환)

- `map.has(key)` : `key`가 존재하면 `true`, 존재하지 않으면 `false`를 반환

- `map.delete(key)` : `key`에 해당하는 값을 삭제

- `map.clear()` : 맵 안의 모든 요소를 제거

- `map.size` : 요소의 개수를 반환

<br />

```js
let map = new Map();

map.set('1', 'str1');   
map.set(1, 'num1');    
map.set(true, 'bool1'); 

console.log( map.get(1)   ); // 'num1'
console.log( map.get('1') ); // 'str1'
console.log( map.size ); // 3
```

**맵은 객체와 달리 키를 문자형으로 반환하지 않는다. (키에 자료형 제약이 없다)**

위 예시에서 문자형, 숫자형, 불린형 키를 모두 사용한 것을 볼 수 있다.

<br />

map.set을 호출할 때마다 맵 자신이 반환된다. 

이를 이용하면 map.set을 '체이닝(chaining)'할 수 있다.

아래는 위 예시의 `map.set` 부문을 체이닝한 것이다.

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```


<br />

❗️ `map[key]`는 `Map`을 쓰는 바른 방법이 아니다. 

`map[key] = 2`로 값을 설정하는 것 같이 `map[key]`를 사용할 수 있긴 하지만, 이 방법은 **`map`을 일반 객체처럼 취급하게 된다.**

따라서 여러 제약이 생기게 된다..

그러니 `map`을 사용할 땐 `map`전용 메서드 `set`, `get` 등을 사용하자.

<br />

**맵은 키로 객체 또한 허용한다!**

```js
let john = { name: "John" };
let visitsCountMap = new Map();

visitsCountMap.set(john, 123);
console.log( visitsCountMap.get(john) ); // 123
```

위처럼 객체를 키로 사용할 수 있다는 점은 맵의 가장 중요한 기능 중 하나이다.

객체에는 문자열 키를 사용할 수 있지만 객체 키는 사용할 수 없다..

```js
let peter = { name: "Peter" };
let visitsCountObj = {};

visitsCountObj[peter] = 123;
console.log( visitsCountObj["[object Object]"] ) // 123
```

위 예시와 같이 객체에 객체 키를 사용하게 되면, 원하는 값을 얻기 위해 `"[object Object]"`를 써줘야한다..

<br />

> 맵은 **SameValueZero**라 불리는 알고리즘을 사용해 값의 등가 여부를 확인한다. 이 알고리즘은 일치 연산자 `===`와 거의 유사하지만, `NaN`과 `NaN`을 같다고 취급하는 것에서 일치 연산자와 차이가 있다. **따라서 맵에선 `NaN`도 키르 쓸 수 있다.**

### map의 반복

- `map.keys()` : 각 요소의 키를 모은 반복 가능한(iterable, 이터러블) 객체를 반환

- `map.values()` : 각 요소의 값을 모은 이터러블 객체를 반환

- `map.entries()` : 요소의 [키, 값]을 한 쌍으로 하는 이터러블 객체를 반환 

위 세 가지 메스드를 사용해 **맵의 각 요소에 반복 작업을 할 수 있다.**

<br />

❗️ 그리고 우리 맵은! 삽입 순서를 기억한다!!

**맵은 값이 삽입된 순서대로 순회를 실시한다. (객체는 프로퍼티 순서를 기억하지 못한다)**

그리고 또! 맵은 배열과 유사하게 내장 메서드 `forEach`도 지원한다 🤭

<br />

### Object.entries: 객체를 맵으로 바꾸기

평범한 객체를 가지고 맵을 만들고 싶다면 내장 메서드 `Object.entries(obj)`를 활용해야 한다.

이 메서드는 객체의 키-값 쌍을 요소(`[key, value]`)로 가지는 배열을 반환한다.

```js
let obj = {
  name: "John",
  age: 30
};

let map = new Map(Object.entries(obj));

console.log( map.get('name') ); // John
```

`Object.entries`를 사용해 객체 `obj`를 배열 `[ ["name", "John"], ["age", 30] ]`로 바꾸고, 이 배열을 이용해 새로운 맵을 만든 것이다.

<br />

여기서 한가지 의문점이 들것이다!

배열로 새로운 맵을 만들 수 있다고..?

<br />

**각 요소가 키-값 쌍인 배열이나 이터러블 객체를 초기화 용도로 맵에 전달해 새로운 맵을 만들 수 있다!**

```js
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

console.log( map.get('1') ); // str1
```


<br />

### Object.fromEntries: 맵을 객체로 바꾸기

`Object.fromEntries` 메서드를 사용하면 각 요소가 `[키, 값]` 쌍인 배열을 객체로 바꿔준다.

```js
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]); 
// prices = { banana: 1, orange: 2, meat: 4 }

console.log(prices.orange); // 2
```

<br />

그럼 이 메서드를 사용해서 맵도 객체로 바꿔보자!

```js
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map.entries()); 
// obj = { banana: 1, orange: 2, meat: 4 }

alconsole.logert(obj.orange); // 2
```

`map.entries()`를 호출하면 맵의 `[키, 값]`을 요소로 가지는 이터러블을 반환한다.

반환된 이터러블을 통해 `Object.fromEntries`로 객체를 생성하는 것이다.

> **`.entries()`를 생략해도 된다.** 꼭 배열을 전달해줄 필요는 없으며, `map`에서의 일반적인 반복은 `map.entries()`를 사용했을 때와 같은 키-값 쌍을 반환한다. 따라서 `map`과 동일한 키-값을 가진 일반 객체를 얻게 된다.

**자료가 맵에 저장되어있는데, 서드파티 코드에서 자료를 객체형태로 넘겨받길 원할 때 이 방법을 사용할 수있다!**

<br />

### Object vs Map

얼마 전에 알고리즘 문제를 풀다 객체를 이용했는데 너무 느린 성능이 나왔다.

그 때, 객체 대신 맵을 이용했더니 시간이 대폭 줄었었다.

그렇다면 객체와 맵 중 언제 무엇을 써야할까?

- **Object**

  - 데이터를 저장하기 위한 간단한 구조이며, `Key`가 `String`이거나 `integer`(또는 `Symbol`)인 경우

    - Map을 생성하는 것보다 기본 오브젝트를 생성하는 데 훨씬 적은 시간이 걸린다.

  - 각각의 property/element가 별도의 로직이 적용되어야 하는 경우 

  - JSON으로/에서 변환해야 하는 경우 (`Map`은 현재 지원하지 않음)

- **Map**

  - 키의 추가/삭제가 빈번한 경우

    - Map은 순수한 Hash이고, Object는 그보다 복잡하기 때문에 속도가 Map이 더 뛰어나다.

    - Object property를 삭제하는 delete 연산은 몇 가지 성능 이슈가 존재한다.

  - 키의 순서가 보장되어야 하는 경우

    - Map은 iteration 기반으로 만들어졌기 때문에 기본적으로 순서를 유지한다.

  - 데이터의 크기가 큰 경우 (Object에 비해 더 나은 성능을 보임)

  - 런타임 시점까지 `key`가 정해지지 않은 경우 

  - `key`와 `value`가 각각 같은 타입일 경우 

<br />

위 내용을 참고해 경우에 따른 선택으로 더 나은 성능의 코드를 구현하자!

자, 그럼 다음으로 set에 대해 알아보겠다.

<br />

# Set

**셋(Set)은 중복을 허용하지 않는 값을 모아놓은 특별한 컬렉션이다.**

셋에는 키가 없는 값이 저장된다.

<br />

주요 메서드는 다음과 같다.

- `new Set(iterable)` : 셋을 생성 

  - 이터러블 객체를 전달받으면(대개 배열을 전달받음) 그 안의 값을 복사해 셋에 넣어준다.

- `set.add(value)` : 값을 추가하고 셋 자신을 반환

- `set.delete(value)` : 값을 제거 

  - 호출 시점에 셋 내에 값이 있어서 제거에 성공하면 true, 아니면 false를 반환

- `set.has(value)` : 셋 내에 값이 존재하면 true, 아니면 false를 반환

- `set.clear()` : 셋을 비움

- `set.size `: 셋이 가지고 있는 값의 수 반환

<br />

```js
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

console.log( set.size ); // 3

for (let user of set) {
  console.log(user.name); // // John, Pete, Mary
}
```

위처럼 셋 내에 동일한 값이 있다면 `set.add(value)`을 아무리 많이 호출하더라도, 셋 내의 값에 중복이 없다.

> 중복 값 여부는 배열 메서드인 `arr.find`를 이용해 확인할 수도 있다. 하지만 **`arr.find`는 배열 내 요소 전체를 뒤져 중복 값을 찾기 때문에, 셋보다 성능 면에서 떨어진다. 반면, 셋은 값의 유일무이함을 확인하는데 최적화되어있다.**

<br />

### set의 반복

셋 또한 `for..of`나 `forEach`를 사용하면 셋의 값을 대상으로 반복 작업을 수행할 수 있다.

```js
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) console.log(value);

set.forEach((value, valueAgain, set) => {
  console.log(value);
});
```

위의 `forEach`에 쓰인 콜백 함수를 보면 이상한 점이 보인다..

`forEach`에 쓰인 콜백 함수는 세 개의 인수를 받는데, 첫 번째는 값, 두 번째도 같은 값인 `valueAgain`을 받고 있다. (세 번째는 목표하는 객체(셋)) 

**동일한 값이 인수에 두 번 등장하고 있다!**

<br />

이렇게 구현된 이유는 맵과의 호환성 때문이다.

**맵의 `forEach`에 쓰인 콜백이 세 개의 인수를 받을 때를 위해서!**

(사실 아직은 잘 이해가지 않는다..)

그렇기 때문에 **맵을 셋으로, 셋을 맵으로 교체하기 쉽다.**

<br />

아래는 셋의 반복 작업을 위한 메서드이다.

- `set.keys()` : 셋 내의 모든 값을 포함하는 이터러블 객체를 반환

- `set.values()` : `set.keys`와 동일한 작업을 함

  - 맵과의 호환성을 위해 만들어진 메서드이다.

- `set.entries()` : 셋 내의 각 값을 이용해 만든 `[value, value]` 배열을 포함하는 이터러블 객체를 반환 

  -  맵과의 호환성을 위해 만들어졌다.

<br />
<br />

이제 자바스크립트의 4가지 자료구조에 대해 다루었다!

상황에 따라 더 효과적인 자료구조를 선택하여 좋은 코드를 작성하자 😎

## ※ Source

🖥 ko.javascript.info

🖥 kellis.tistory.com/129
