---
date: '2022-04-21T17:40'
title: '[JavaScript] DOM 조작하기'
category: 'Language'
categoryColor: '#25e5bd'
tags: ['JS']
---

생동감 있는 웹페이지를 만들기 위한 핵심은 바로! **DOM 조작**에 있다.

적시에 요소를 새롭게 생성하는 방법과 페이지에 있는 기존 콘텐츠를 어떻게 수정할 수 있는지 알아보자.

## 요소 생성하기

DOM 노드를 만들때 사용하는 메서드는 두 가지이다.

- `document.createElement(tag)` : 태그 이름을 사용해 새로운 요소 노드를 만든다.

```js
let div = document.createElement('div');
```

- `document.createTextNode(text)` : 주어진 텍스트를 사용해 새로운 텍스트 노드를 만든다.

```js
let textNode = document.createTextNode('안녕하세요.');
```

<br />

그럼 요소를 생성해보자.

```js
// 1. <div> 요소 만들기
let div = document.createElement('div');

// 2. 만든 요소의 클래스를 'alert' 으로 설정
div.className = 'alert';

// 3. 내용 채워넣기
div.innerHTML = '<strong>안녕하세요!</strong> 중요 메시지를 확인하셨습니다.';
```

이렇게 세 단계를 거치면 요소가 만들어진다.

그런데 요소를 만들긴 했지만, 아직 이 요소는 `div`라는 이름을 가진 변수에 불과하기 때문에 페이지엔 나타나지 않는다.

<br />

## 삽입 메서드

`div`가 페이지에 나타나게 하려면 `document` 내 어딘가에 `div`를 넣어줘야 한다.

`document.body`로 참조할 수 있는 `<body>`안 같은 곳에.

**요소 삽입 메서드 `append`** 를 사용한 코드 `document.body.append(div)`를 사용해 직접 새롭게 만든 요소 노드를 페이지에 나타나도록 해보자.

```html
<script>
  let div = document.createElement('div');
  div.className = 'alert';
  div.innerHTML = '<strong>안녕하세요!</strong> 중요 메시지를 확인하셨습니다.';

  document.body.append(div);
</script>
```

여기서는 `document.body`에서 `append`를 호출했지만 다른 요소에도 `append` 메서드를 호출해 요소를 넣을 수 있다.

`div.append(anotherElement)`를 호출해 `<div>`에 무언가를 추가하는 것처럼!

<br />

자바스크립트에서 지원하는 노드 삽입 메서드는 다음과 같다.

적절한 메서드를 선택하면 직접 삽입 위치를 지정할 수 있다.

- `node.append(노드나 문자열)` : 노드나 문자열을 `node` 끝에 삽입한다.

- `node.prepend(노드나 문자열)` : 노드나 문자열을 `node` 맨 앞에 삽입한다.

- `node.before(노드나 문자열)` : 노드나 문자열을 `node` 이전에 삽입한다.

- `node.after(노드나 문자열)` : 노드나 문자열을 `node` 다음에 삽입한다.

- `node.replaceWith(노드나 문자열)` : `node`를 새로운 노드나 문자열로 대체한다.

<br />

예시를 보자.

```html
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before'); // <ol> 앞에 문자열 'before'를 삽입
  ol.after('after'); // <ol> 뒤에 문자열 'after를 삽입

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // <ol>의 첫 항목으로 liFirst를 삽입

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // <ol>의 마지막 항목으로 liLast를 삽입
</script>
```

위 예시의 결과는 아래와 같다.

```html
before
<ol id="ol">
  <li>prepend</li>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>append</li>
</ol>
after
```

<br />

또한, 이러한 삽입 메서드들을 사용하면 **복수**의 노드와 문자열을 한 번에 넣을 수도 있다!

```html
<div id="div"></div>
<script>
  div.before('<p>안녕하세요</p>', document.createElement('hr'));
</script>
```

삽입 메서드에 문자열을 넘겨 텍스트 노드를 만들 땐 인수로 넘긴 문자열이 **HTML이 아닌 문자열** 그 형태로 삽입된다는 점에 주의해야 한다.

`<`, `>` 같은 특수문자는 이스케이프 처리된다!!

따라서 위 예시의 결과는 아래와 같다.

```html
&lt;p&gt;안녕하세요&lt;/p&gt;
<hr />
<div id="div"></div>
```

삽입 메서드를 사용하면 문자열은 `elem.textContent`를 사용한 것처럼 안전한 방법으로 삽입되는 것이다.

따라서 **노드 삽입 메서드는 DOM 노드나 문자열을 삽입할 때만 사용할 수 있다.**

그런데 만약 `elem.innerHTML`을 사용한 것처럼 태그가 정상적으로 동작할 수 있게 문자열 형태의 **HTML 그 자체**를 삽입하고 싶다면 어떻게 해야 할까?

<br />

## insertAdjacentHTML/Text/Element

`elem.insertAdjacentHTML(where, html)`를 사용하면 가능하다!

첫 번째 매개변수는 `elem`을 기준으로 하는 상대 위치로, 다음 값 중 하나여야 한다.

- 'beforebegin' : `elem` 바로 앞에 `html`을 삽입한다.

- 'afterbegin' : `elem`의 첫 번째 자식 요소 바로 앞에 `html`을 삽입한다.

- 'beforeend' : `elem`의 마지막 자식 요소 바로 다음에 `html`을 삽입한다.

- 'afterend' : `elem` 바로 다음에 `html`을 삽입한다.

💡 두 번째 매개변수는 HTML 문자열인데, 이 HTML은 **이스케이프 처리되지 않고 그대로 삽입된다!!**

```html
<div id="div"></div>
<script>
  div.insertAdjacentHTML('beforebegin', '<p>안녕하세요.</p>');
  div.insertAdjacentHTML('afterend', '<p>안녕히 가세요.</p>');
</script>
```

위 예시의 결과는 다음과 같다.

```html
<p>안녕하세요.</p>
<div id="div"></div>
<p>안녕히 가세요.</p>
```

따라서 임의의 HTML을 페이지에 삽입할 땐 이 방법을 사용하면 된다.

아까 살펴본 삽입 메서드들과 HTML을 삽입한다는 점만 다르고, 삽입 지점은 정확히 같다는 것을 볼 수 있다.

<br />

## 노드 삭제하기

`node.remove()` 사용하면 노드를 삭제할 수도 있다!

일 초 후 메시지가 사라지게 해보자.

```html
<script>
  let div = document.createElement('div');
  div.className = 'alert';
  div.innerHTML = '<strong>안녕하세요!</strong> 중요 메시지를 확인하셨습니다.';

  document.body.append(div);
  setTimeout(() => div.remove(), 1000);
</script>
```

쉽죠?

여기서 주의사항!

❗️ 요소 노드를 다른 곳으로 옮길 때 기존에 있던 노드를 지울 필요가 없다!

**모든 노드 삽입 메서드는 자동으로 기존에 있던 노드를 삭제하고 새로운 곳으로 노드를 옮기기 때문이다.**

예시를 보자.

```html
<div id="first">First</div>
<div id="second">Second</div>
<script>
  second.after(first);
</script>
```

`id`가 `second`인 노드를 가져오고, 해당 노드의 뒤에 `id`가 `first`인 노드를 삽입한다.

즉, 요소의 위치를 바꾼다고 생각하면 된다!

<br />

## cloneNode로 노드 복제하기

만약 메시지 창을 하나 만들었는데 유사한 창을 하나 더 띄워주어야 하는 상황이 오면?

창을 만들어주는 함수를 하나 더 사용하면 된다. 이 방법 말고 또 있다!

기존에 만들었던 `div` 를 복제하고 필요하다면 안에 있는 텍스트를 수정하는 방법이 있다.

이 방법은 복제하려는 요소가 클 때는 함수를 만드는 대신 복제를 사용하는 방법이 빠르고 간단할 수 있다.

<br />

`elem.cloneNode(true)`을 호출하면 `elem`의 **깊은 복제**본이 만들어진다. 속성 전부와 자손 요소 전부가 복사되는 것이다.

`elem.cloneNode(false)`을 호출하면 **자식 노드 복사 없이** `elem`만 복제된다.

<br />

그럼 이를 이용한 예시를 보자

```html
<div class="alert" id="div">
  <strong>안녕하세요!</strong> 중요 메시지를 확인하셨습니다.
</div>

<script>
  let div2 = div.cloneNode(true);
  div2.querySelector('strong').innerHTML = '안녕히 가세요!';

  div.after(div2);
</script>
```

메시지 창을 복제하고, 복제한 창의 내용을 수정했다.

그리고 복제한 메시지 창을 기존 창 다음에 보여주도록 했다.

<br />

## DocumentFragment

`DocumentFragment`는 특별한 DOM 노드 타입으로, 여러 노드로 구성된 그룹을 감싸 다른 곳으로 전달하게 해주는 **래퍼(wrapper)처럼 동작**한다.

문서에 있는 다른 노드를 `DocumentFragment`에 추가할 수 있는데, `DocumentFragment`를 문서 어딘가에 삽입하면 **`DocumentFragment`는 사라지고 `DocumentFragment`에 추가한 노드만 남는다!**

예시를 살펴보자.

```html
<ul id="ul"></ul>

<script>
  function getListContent() {
    let fragment = new DocumentFragment();

    for (let i = 1; i <= 3; i++) {
      let li = document.createElement('li');
      li.append(i);
      fragment.append(li);
    }

    return fragment;
  }

  ul.append(getListContent()); // (*)
</script>
```

결과는 아래와 같다.

```js
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

`DocumentFragment`를 직접 사용할 일은 흔지 않다. 아래 에시처럼 노드가 담긴 배열을 직접 만들어 반환할 수 있기 때문!

```html
<ul id="ul"></ul>

<script>
  function getListContent() {
    let result = [];

    for (let i = 1; i <= 3; i++) {
      let li = document.createElement('li');
      li.append(i);
      result.push(li);
    }

    return result;
  }

  ul.append(...getListContent());
</script>
```

<br />

## 구식 삽입·삭제 메서드

하위 호환성을 유지하기 위해 남아있는 ‘구식(old school)’ DOM 조작 메서드도 있다.

아주 오래전에 만들어진 이 메서드들은 요즘에는 잘 사용하지 않는다.

앞서 배운 모던한 메서드 `append`, `prepend`, `before`, `after`, `remove`, `replaceWith`를 사용하는 것이 좀 더 유연하기 때문!

<br />

그럼에도 알아야겠지? 구식 메서드들은 여전히 많이 발견되니까.

(나도 최근 프로젝트에서 `appendChild`를 썼었다..)

<br />

- `parentElem.appendChild(node)` : `parentElem`의 마지막 자식으로 `node`를 추가한다.

- `parentElem.insertBefore(node, nextSibling)` :  `node`를 `parentElem`안의 `nextSibling`앞에 추가한다.

- `parentElem.replaceChild(node, oldChild)` : `parentElem`의 자식 노드 중 `oldChild`를 `node`로 교체한다.

- `parentElem.removeChild(node)` :  `node`가 `parentElem`의 자식 노드라는 가정 하에 `parentElem`에서 `node`를 삭제한다.

<br />

💡 이 메서드들은 모두 삽입하거나 삭제한 노드를 반환한다!

그런데 반환된 값을 사용할 일이 거의 없기 때문에 메서드를 그냥 실행만 하는 편이다..

<br />
<br />

최근 학교 중간시험도 있었고, 개인 프로젝트도 진행하다 보니 오랜만에 학습하고 기록하는 것 같다 😅

꾸준히만 하자!

<br />

## ※ Source

🖥 ko.javascript.info