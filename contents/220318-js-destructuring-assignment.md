---
date: "2022-03-18T16:34"
title: "[JavaScript] 구조 분해 할당"
category: "Language"
categoryColor: "#25e5bd"
tags: ["JS"]
thumbnail: "./images/JavaScript.png"
---

요즘 코드를 작성할 때 평소보다 가독성에 신경을 쓰는 편이다!

예전에는 최대한 코드를 짧게, 가능한 한 줄로 작성하는게 마냥 좋은 줄로만 알았다.

하지만, 이는 때에 따라 가독성이 매우 떨어진다는 것을 깨달았다..

이번 포스트에서 살펴볼 **구조 분해 할당(destructuring assignment**)은 코드를 더 줄여주며 가독성 또한 높여준다!

<br />

개발을 하다 보면 함수에 객체나 배열을 전달해야 하는 경우가 자주 생긴다. 

가끔은 객체나 배열에 저장된 데이터 전체가 아닌 일부만 필요한 경우가 생기기도 한다.

이럴 때! **객체나 배열을 변수로 '분해’할 수 있게 해주는 특별한 문법**인 구조 분해 할당을 사용할 수 있다!

이 외 함수의 매개변수가 많거나 매개변수의 기본값이 필요한 경우 등에서 그 진가를 발휘한다.

<br />

# 배열 분해하기

```js
let arr = ["Bora", "Lee"]
let [firstName, surname] = arr;

console.log(firstName); // Bora
console.log(surname);  // Lee
```

인덱스를 이용하지 않고 변수로 이름과 성을 사용했다.

(`split` 같은 반환 값이 배열인 메서드를 함께 활용해도 좋다.)

```js
let arr = ["Bora", "Lee", "Kim"]
let [firstName, , surname] = arr;

console.log(firstName); // Bora
console.log(surname);  // Kim
```

위처럼 쉼표를 사용하여 원하지 않는 요소를 무시할 수도 있다.

<br />

배열 뿐만 아니라 모든 이터러블에 구조 분해 할당을 사용할 수 있다.

또한, 아래와 같이 할당 연산자 좌측엔 할당할 수 있는 것이라면 어떤 것이든지 올 수 있다.

```js
let user = {};
[user.name, user.surname] = "Bora Lee".split(' ');

console.log(user.name); // Bora
```

> 두 변수에 저장된 값을 교환할 때 구조 분해 할당을 사용할 수 있다. `[guest, admin] = [admin, guest];`

### 나머지 요소 가져오기

배열 앞쪽에 위치한 값 몇 개만 필요하고 그 이후 이어지는 나머지 값들은 한데 모아서 저장하고 싶을 때가 있다. 

이럴 때는 **점 세 개 `...`를 붙인 매개변수 하나를 추가하면 나머지(rest) 요소를 가져올 수 있다.**

```js
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

console.log(name1); // Julius
console.log(name2); // Caesar

console.log(rest[0]); // Consul
console.log(rest[1]); // of the Roman Republic
console.log(rest.length); // 2
```

<br />

### 기본값

할당하고자 하는 변수의 개수가 분해하고자 하는 배열의 길이보다 크더라도 에러가 발생하지 않는다.

왜냐? **할당할 값이 없으면 `undefined`로 취급되기 때문이다!**

```js
let [firstName, surname] = [];

console.log(firstName); // undefined
console.log(surname); // undefined
```

<br />

또한, **`=`을 이용하면 할당할 값이 없을 때 기본으로 할당해 줄 값인 '기본값(default value)'을 설정할 수 있다.**

```js
let [name = "Guest", surname = "Anonymous"] = ["Julius"];

console.log(name);    // Julius 
console.log(surname); // Anonymous (기본값)
```

위와 같은 간단한 값이 말고도 복잡한 표현식이나 함수 호출도 기본값이 될 수 있다. 

```js
let [surname = prompt('성을 입력하세요.'), name = prompt('이름을 입력하세요.')] = ["김"];

alert(surname); // 김 
alert(name);    // prompt에서 받아온 값
```

(이건 처음 알았다.. 와우..)

<br />

# 객체 분해하기

객체 분해 또한 가능!

할당 연산자 우측엔 분해하고자 하는 객체를, 좌측엔 상응하는 객체 프로퍼티의 '패턴’을 넣는다.

```js
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

let {title, width, height} = options;

console.log(title);  // Menu
console.log(width);  // 100
console.log(height); // 200
```

프로퍼티 `options.title`과 `options.width`, `options.height`에 저장된 값이 상응하는 변수에 할당된 것을 확인할 수 있다.

❗️ **순서는 중요하지 않다!**

```js
...

let {width: w, height: h, title} = options;

console.log(title);  // Menu
console.log(w);  // 100
console.log(h); // 200
```

이런식으로 좌측 패턴에 콜론(:)을 사용해 객체 프로퍼티를 프로퍼티 키와 다른 이름을 가진 변수에 저장할 수도 있다.

```js
let {width = 100, height = 200, title} = options;

alconsole.logert(title);  // Menu
console.log(width);  // 100
console.log(height); // 200
```

위처럼 배열에서와 같이 기본값 설정도 당연히 가능~

복잡한 표현식이나 함수 호출도 기본값이 될 수 있는 것 또한 마찬가지.

<br />

그리고 프로퍼티가 많은 복잡한 객체에서 원하는 정보만 뽑아오는 것도 가능하다!

```js
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

let { title } = options;

console.log(title); // Menu
```

<br />

### 나머지 요소 가져오기

분해하려는 객체의 프로퍼티 개수가 할당하려는 변수의 개수보다 많다면 어떨까? 

배열에서 했던 것처럼 '나머지’를 어딘가에 할당하면 되지!

> 모던 브라우저는 나머지 패턴을 지원하지만, IE를 비롯한 몇몇 구식 브라우저는 나머지 패턴을 지원하지 않으므로 주의해서 사용해야 한다. 물론 바벨(Babel)을 이용하면 된다.

```js
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

let {title, ...rest} = options;

console.log(rest.height);  // 200
console.log(rest.width);   // 100
```

> `let`으로 새로운 변수를 선언하지 않고 기존에 있던 변수에 분해한 값을 할당할 수도 있는데, 이때는 주의할 점이 있다. 자바스크립트는 표현식 안에 있지 않으면서 주요 코드 흐름 상에 있는 `{...}`를 코드 블록으로 인식한다. 따라서 이를 해결하려면 **`{...}` 할당문을 괄호`(...)`로 감싸 코드 블록이 아닌 표현식으로 해석되도록 한다.** <br /> ex) `({title, width, height} = {title: "Menu", width: 200, height: 100});`

<br />

# 중첩 구조 분해

객체나 배열이 다른 객체나 배열을 포함하는 경우, 좀 더 복잡한 패턴을 사용하면 중첩 배열이나 객체의 정보를 추출할 수 있다. 

이를 **중첩 구조 분해(nested destructuring)** 라 부른다.

```js
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

let {
  size: { 
    width,
    height
  },
  items: [item1, item2], 
  title = "Menu" 
} = options;

console.log(title);  // Menu
console.log(width);  // 100
console.log(height); // 200
console.log(item1);  // Cake
console.log(item2);  // Donut
```

위 구조 분해 부분과 같이 코드를 여러 줄에 걸쳐 작성해 의도하는 바를 명확히 드러내야 한다.

`title`처럼 분해하려는 객체에  프로퍼티가 없으면 기본값을 사용할 수 있다.

<br />

## 함수 매개변수 다루기

함수에 매개변수가 많은데 이중 상당수는 선택적으로 쓰이는 경우가 종종 있다.

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

위처럼 함수를 작성하면 넘겨주는 인수의 순서가 틀려 문제가 발생할 수 있다.

또한, 대부분의 매개변수에 기본값이 설정되어 있어 굳이 인수를 넘겨주지 않아도 되는 경우에 문제가 발생한다..

```js
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

기본값을 사용해도 괜찮은 경우 위와 같이 `undefined`를 여러 개 넘겨줘야 한다.

지저분하고, 매개변수가 많아질수록 가독성은 더 떨어질 것이다..

<br />

이럴 때! 구조 분해는 구세주가 된다.

```js
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
  alconsole.logert( `${title} ${width} ${height}` ); // My Menu 200 100
  console.log( items ); // Item1, Item2
}

showMenu(options);
```

위 코드로 리팩토링함으로써, 매개변수 모두를 객체에 모아 함수에 전달해, 함수가 전달받은 객체를 분해하여 변수에 할당하고 원하는 작업을 수행할 수 있게된다!

중첩 객체와 콜론을 조합하면 좀 더 복잡한 구조 분해도 가능하다. 아래처럼!

```js
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

function showMenu({
  title = "Untitled",
  width: w = 100,  
  height: h = 200, 
  items: [item1, item2] 
}) {
  console.log( `${title} ${w} ${h}` ); // My Menu 100 200
  console.log( item1 ); // Item1
  console.log( item2 ); // Item2
}

showMenu(options);
```

<br />

❗️ 이렇게 함수 매개변수를 구조 분해할 땐, **반드시 인수가 전달된다고 가정되고 사용된다는 점**에 유의해야 한다!

```js
showMenu({}); // 모든 인수에 기본값이 할당된다.

showMenu(); // 에러가 발생할 수 있다.
```

위처럼 **모든 인수에 기본값을 할당해 주려면 빈 객체를 명시적으로 전달해야 한다.**

이 문제를 예방하려면 빈 객체 `{}`를 인수 전체의 기본값으로 만들면 된다.

```js
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  console.log( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

이렇게 **인수 객체의 기본값을 빈 객체 `{}`로 설정하면 어떤 경우든 분해할 것이 생겨서 함수에 인수를 하나도 전달하지 않아도 에러가 발생하지 않는다!!**

<br />
<br />

리액트를 다룰 때 구조 분해 할당을 많이 사용했었다. (잘 알지도 못하면서..)

이번 학습으로 몰랐던 부분에 대해서도 알게되었다 😊

배웠던 것들을 이용해 코드의 가독성도 더 높일 수 있을 것 같아 좋다!

<br />

## ※ Source

🖥 ko.javascript.info