---
date: "2021-09-17"
title: "[React] 컴포넌트 스타일링"
category: "Web"
categoryColor: "mediumpurple"
tags: ["React", "CSS"]
thumbnail: "./images/React.png"
---

React에서 컴포넌트를 스타일링 할 때는 다양한 방식을 사용할 수 있다.

여러 방식 중에서 딱히 정해진 방식이란 없다.

회사마다 요구하는 스펙이 다르고, 개발자마다 각자 취향에 따라 선택하기 때문이다.

<br />

- **일반 CSS** : 컴포넌트를 스타일링하는 가장 기본적인 방식이다.

- **Sass** : 자주 사용하는 CSS 전처리기(pre-processor) 중 하나로 확장된 CSS 문법을 사용하여 CSS 코드를 더욱 쉽게 작성할 수 있도록 해준다.

- **CSS Module** : 스타일을 작성할 때 CSS 클래스가 다른 CSS 클래스의 이름과 절대 충돌하지 않도록 파일마다 고유한 이름을 자동으로 생성해 주는 옵션이다.

- **styled-components** : 스타일을 자바스크립트 파일에 내장시키는 방식으로 스타일을 작성함과 동시에 해당 스타일이 적용된 컴포넌트를 만들 수 있게 해준다.

<br />

# 가장 흔한 방식, 일반 CSS

React 프로젝트는 일반 CSS 방식으로 만들어져 있다.

기존의 CSS 스타일링이 딱히 불편하지 않고 새로운 기술을 배울 필요가 없다고 생각되면, 일반 CSS를 계속 사용해도 상관없다.

실제로도 소규모 프로젝트를 개발하고 있다면 새로운 스타일링 시스템을 적용하는 것이 불필요할 수도 있다.

<br />

**CSS를 작성할 때 가장 중요한 점은 CSS 클래스를 중복되지 않게 만드는 것이다.**

CSS 클래스가 중복되는 것을 방지하는 여러 가지 방식이 있는데, 그 중 하나는 이름을 지을 때 **특별한 규칙**을 사용하여 짓는 것이고, 또 다른 하는 **CSS Selector**를 활용하는 것이다.

<br />

- ### **이름을 짓는 규칙**

프로젝트에 자동 생성된 **App.css**를 읽어 보면 클래스 이름이 **컴포넌트 이름-클래스 형태**로 지어져 있다. (예: App-header)

**클래스 이름에 컴포넌트 이름을 포함시킴으로써 다른 컴포넌트에서 실수로 중복되는 클래스를 만들어 사용하는 것을 방지할 수 있다.**

<br />

비슷한 방식으로 **BEM 네이밍**이라는 방식도 있다.

BEM 네이밍은 CSS 방법론 중 하나로, 이름을 지을 때 일종의 규칙을 준수하여 **해당 클래스가 어디에서 어떤 용도로 사용되는지 명확하게 작성하는 방식**이다.

예를 들어 `.card__title-primary` 처럼 말이다.

<br />

- ### **CSS Selector**

CSS Selector를 사용하면 **CSS 클래스가 특정 클래스 내부에 있는 경우에만 스타일을 적용할 수 있다.**

예를 들어 .APP 안에 들어 있는 .logo에 스타일을 적용하고 싶다면 다음과 같이 작성하면 된다.

```css
.App .logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
}
```

이런 식으로 컴포넌트 최상위 html 요소에는 컴포넌트의 이름으로 클래스 이름을 짓고(.App), 그 내부에서는 소문자를 입력하거나(.logo), header 같은 태그를 사용하여 클래스 이름이 불필요한 경우에는 아예 생략할 수도 있다.

<br />

# Sass 사용하기

**Sass(Syntactically Awesome Style Sheets)** 는 CSS 전처리기로 복잡한 작업을 쉽게 할 수 있도록 해 주고, 스타일 코드의 재활용성을 높여 줄 뿐만 아니라 코드의 가독성을 높여서 유지 보수를 더욱 쉽게 해준다.

<br />

Sass에서는 두 가지 확장자 **.scss**와 **.sass**를 지원한다. **.scss**의 문법과 **.sass**의 문법은 꽤 다르다.

```scss
/* .sass */

$font-stack: Helvetica, sans-serif
$primary-color: #333

body
	font: 100% $font-stack
	color: $primary-color
```

```scss
/* .scss */

$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

주요 차이점을 살펴보면, **.sass 확장자는 중괄호와 세미콜론을 사용하지 않는다.**

반면 .scss 확장자는 기존 CSS를 작성하는 방식과 비교해서 문법이 크게 다르지 않다. 보통 .scss 문법이 더 자주 사용된다.

Sass를 사용하기 위해서는 **node-sass**라는 라이브러리를 설치해 주어야 한다.

이 라이브러리는 Sass를 CSS로 변환해 준다.

<br />

```scss
// SassComponent.scss

// 변수 사용하기
$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;

// 믹스인 만들기(재사용되는 스타일 블록을 함수처럼 사용할 수 있음)
@mixin square($size) {
  $calculated: 32px * $size;
  width: $calculated;
  height: $calculated;
}

.SassComponent {
  display: flex;
  .box {
    // 일반 CSS에서는 .SassComponent .box 와 마찬가지
    background: red;
    cursor: pointer;
    transition: all 0.3s ease-in;
    &.red {
      // .red 클래스가 .box와 함께 사용되었을 때
      background: $red;
      @include square(1);
    }
    &.orange {
      background: $orange;
      @include square(2);
    }
    &.yellow {
      background: $yellow;
      @include square(3);
    }
    &.green {
      background: $green;
      @include square(4);
    }
    &.blue {
      background: $blue;
      @include square(5);
    }
    &.indigo {
      background: $indigo;
      @include square(6);
    }
    &.violet {
      background: $violet;
      @include square(7);
    }
    &:hover {
      // .box에 마우스를 올렸을 때
      background: black;
    }
  }
}
```

```jsx
// SassComponent.js

import React from "react";
import "./SassComponent.scss";

const SassComponent = () => {
  return (
    <div className="SassComponent">
      <div className="box red" />
      <div className="box orange" />
      <div className="box yellow" />
      <div className="box green" />
      <div className="box blue" />
      <div className="box indigo" />
      <div className="box violet" />
    </div>
  );
};

export default SassComponent;
```

<br />

- ### **utils 함수 분리하기**

여러 파일에서 사용될 수 있는 Sass 변수 및 믹스인은 **다른 파일로 따로 분리하여 작성한 뒤 필요한 곳에서 쉽게 불러와 사용할 수 있다.**

**src** 디렉터리에 **styles**라는 디렉터리를 생성하고, 그 안에 **utils.scss** 파일을 만든 후

위 코드 **SassCompon ents.scss**에 작성했던 변수와 믹스인을 잘라내서 이동시킨 결과가 다음과 같다.

```scss
// src/styles/utils.scss

// 변수 사용하기
$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;

// 믹스인 만들기 (재사용되는 스타일 블록을 함수처럼 사용할 수 있음)
@mixin square($size) {
  $calculated: 32px * $size;
  width: $calculated;
  height: $calculated;
}
```

```scss
// SassComponent.scss
@import './styles/utils'

.SassComponent {
	display: flex;
	.box {
		background: red;
		cursor: pointer;
		transition: all 0.3s ease-in;

		...

	}
}
```

<br />

- ### **sass-loader 설정 커스터마이징하기**

이 작업은 Sass를 사용할 때 반드시 해야 하는 것은 아니지만, 해 두면 유용하다.

예를 들어 위 SassCompo nent에서 utils를 불러올 때 `@import './styles/utils';` 형태로 불러왔는데,

만약 프로젝트에 디렉터리를 많이 만들어서 구조가 깊어졌다면 (예: src/components/somefeature/ThisComponent.scss)

해당 파일에서는 `@import '../../../styles/utils';` 형태와 같이 상위 폴더로 한참 거슬러 올라가야 한다는 단점이 있다.

<br />

이 문제점은 웹팩에서 Sass를 처리하는 sass-loader의 설정을 커스터마이징하여 해결할 수 있다.

변경사항을 커밋한 후, `npm run eject` 명령어를 실행한다.

그러면 프로젝트 디렉터리에 **config**라는 디렉터리가 생성될 것이다.

그 디렉터리 안에 들어 있는 **webpack.config.js**를 열어 `sassRegex`라는 키워드를 찾는다.

```jsx
// webpack.config.js - sassRegex

{
	test: sassRegex,
	exclude: sassModuleRegex,
	use: getStyleLoaders(
		{
			importLoaders: 2,
			sourceMap: isEnvProduction && shouldUseSourceMap,
		},
		'sass-loader'
	),
	sideEffects: true,
},
```

여기서 use: 에 있는 'sass-loader' 부분을 지우고, 뒷부분에 concat을 통해 커스터마이징된 sass-loader 설정을 넣어 준다.

```jsx
// webpack.config.js - sassRegex

{
	test: sassRegex,
	exclude: sassModuleRegex,
	use: getStyleLoaders({
			importLoaders: 2,
			sourceMap: isEnvProduction && shouldUseSourceMap,
		}).concat({
			loader: require.resolve('sass-loader'),
			options: {
				sassOptions: {
					includePaths: [paths.appSrc + '/styles'],
				},
				sourceMap: isEnvProduction && shouldUseSourceMap,
			}
	}),
	sideEffects: true,
},
```

설정 파일을 저장한 후, 서버를 켰다가 재시작하면 이제 utils.scss 파일을 불러올 때 현재 수정하고 있는 scss 파일 경로가 어디에 위치하더라고 앞부분에 상대 경로를 입력할 필요 없이 styles 디렉터리 기준 절대 경로를 사용하여 불러올 수 있다.

⇒ `@import 'utils.scss';`

<br />

하지만 새 파일을 생성할 때마다 utils.scss를 매번 이렇게 포함시키는 것도 귀찮을 수 있다.

이에 대한 해결 방법은 sass-loader의 **data** 옵션을 설정하면 된다.

data 옵션을 설정하면 Sass 파일을 불러올 때마다 코드의 맨 윗부분에 특정 코드를 포함시켜 준다.

```jsx
// webpack.config.js - sassRegex

{
	test: sassRegex,
	exclude: sassModuleRegex,
	use: getStyleLoaders({
			importLoaders: 2,
			sourceMap: isEnvProduction && shouldUseSourceMap,
		}).concat({
			loader: require.resolve('sass-loader'),
			options: {
				sassOptions: {
					includePaths: [paths.appSrc + '/styles'],
				},
				sourceMap: isEnvProduction && shouldUseSourceMap,
				**prependData: `@import 'utils';`**
			}
	}),
	sideEffects: true,
},
```

<br />

- ### **node_modules에서 라이브러리 불러오기**

Sass의 장점 중 하나는 **라이브러리를 쉽게 불러와서 사용할 수 있다**는 점이다.

`@import '../../../node_modules/library/styles';`

하지만 이러한 구조는 스타일 파일이 깊숙한 디렉터리에 위치할 경우 ../ 를 매우 많이 적어야 하니 번거롭다.

이보다 더 쉬운 방법이 있는데, 바로 물결 문자 (~) 를 사용하는 방법이다.

`@import '~library/styles';`

<br />

유용한 Sass 라이브러리 예로 반응형 디자인을 쉽게 만들어주는 **include-media**와 매우 편리한 색상 팔레트인 **open-color**가 있다.

Sass 라이브러리를 불러올 때는 node_modules 내부 라이브러리 경로 안에 들어 있는 scss 파일을 불러와야 한다.

보통 scss 파일 경로가 어디에 위치하고 있는지를 라이브러리의 공식 매뉴얼에서 알려 주지 않을 때가 많으니, 직접 경로로 들어가서 확인하는 것이 좋다.

```scss
// utils.scss

@import '~include-media/dist/include-media';
@import '~open-color/open-color';

...
```

```scss
// SassComponent.scss

.SassComponent {
	display: flex;
	background: $oc-gray-2;
	@include media('<768px') {
		background: $oc-gray-9;
	}

	...

}
```

<br />

# CSS Module

**CSS Module**은 CSS를 불러와서 사용할 때 클래스 이름을 고유한 값, 즉 `[파일이름]]\_[클래스 이름]\_[해시값]` 형태로 자동으로 만들어서 컴포넌트 스타일 클래스 이름이 중첩되는 현상을 방지해 주는 기술이다.

v2 버전 이상부터는 **.module.css** 확장자로 파일을 저장하기만 하면 CSS Module이 적용된다.

```jsx
// CSSModule.js

import React from "react";
import styles from "./CSSModule.module.css";

const CSSModule = () => {
  return (
    <div className={style.wrapper}>
      안녕하세요, 저는 <span className="somethig">CSS Module!</span>
    </div>
  );
};
```

<br />

CSS Module이 적용된 스타일 파일을 불러오면 객체를 하나 전달받게 되는데 CSS Module에서 사용한 클래스 이름과 해당 이름을 고유화한 값이 키-값 형태로 들어 있다.

예를 들어 위 코드에서 console.log(styles)를 한다면 지정한 클래스 이름 앞뒤로 파일 이름과 해시값이 붙은

`{ wrapper: "CSSModule_wrapper__1SbdQ" }` 와 같은 결과가 나타난다.

<br />

이 고유한 클래스 이름을 사용하려면 클래스를 적용하고 싶은 JSX 엘리먼트에 **className={styles.[클래스 이름]}** 형태로 전달해 주면 된다.

`:global`을 사용하여 전역적으로 선언한 클래스의 경우 평상시 해 왔던 것처럼 그냥 문자열로 넣어 준다.

<br />

- ### **classnames**

classnames는 CSS 클래스를 조건부로 설정할 때 매우 유용한 라이브러리이다.

또한 CSS Module을 사용할 때 이 라이브러리를 사용하면 여러 클래스를 적용할 때 매우 편리하다.

⇒ `npm install classnames`

```jsx
import classNames from "classnames";

classNames("one", "two"); // 'one two'
classNames("one", { two: true }); // 'one two'
classNames("one", { two: false }); // 'one'
classNmaes("one", ["two", "three"]); // 'one two three'

const myClass = "hello";
classNames("one", myClass, { myCondition: true }); // 'one hello myCondition'
```

**이런 식으로 여러 가지 종류의 파라미터를 조합해 CSS 클래스를 설정할 수 있기 때문에 컴포넌트에서 조건부로 클래스를 설정할 때 매우 편하다.**

예를 들어 props 값에 따라 다른 스타일을 주기가 쉬워진다.

<br />

```jsx
const MyComponent = ({ highlighted, theme }) => {
  <div className={classNames("MyConponent", { highlighted }, theme)}>
    Hello
  </div>;
};
```

이렇게 할 경우, 위 엘리먼트의 클래스에 highlighted 값이 true이면 highlighted 클래스가 적용되고, false이면 적용되지 않는다.

추가로 theme으로 전달받는 문자열은 내용 그대로 클래스에 적용된다.

이런 라이브러리의 도움을 받지 않는다면 다음과 같은 형식으로 처리해야 한다. 가독성이 떨어진다.

```jsx
const MyComponent = ({ highlighted, theme }) => {
  <div className={`MyComponent ${theme} ${highlighted ? "highlighted" : ""}`}>
    Hello
  </div>;
};
```

<br />

CSS Module과 함께 사용하면 CSS Module 사용이 훨씬 쉬워진다.

classnames에 내장되어 있는 **bind** 함수를 사용하면 클래스를 넣어 줄 때마다 **styles.[클래스 이름]** 형태를 사용할 필요가 없다.

사전에 미리 styles에서 받아 온 후 사용하게끔 설정해두고 `cx('클래스 이름', '클래스 이름2')` 형태로 사용할 수 있다.

```jsx
import React from "react";
import classNames from "classname/bind";
import styles from "./CSSModule.moduls.css";

const cx = classNames.bind(styles); // 미리 styles에서 클래스를 받아 오도록 설정

const CSSModule = () => {
  return (
    <div className={cx("wrapper", "inverted")}>
      안녕하세요, 저는 <span className="somethig">CSS Module!</span>
    </div>
  );
};
```

**CSS Module을 사용할 때 클래스를 여러 개 설정하거나, 또는 조건부로 클래스를 설정할 때 classnmaes와 bind를 사용하면 훨씬 편리하게 작성할 수 있다.**

<br />

Sass를 사용할 때도 파일 이름 뒤에 **.module.scss** 확장자를 사용해 주면 CSS Module로 사용할 수 있다.

또한, CSS Module이 아닌 파일에서 CSS Module을 사용할 수 있다.

CSS Module이 아닌 일반 .css/.scss 파일에서도 `:local`을 사용하여 CSS Module을 사용할 수 있다.

```jsx
:local .wrapper {

	...

}
:local {
	.wrapper {

		...

	}
}
```

<br />

# styled-components

컴포넌트 스타일링의 또 다른 패러다임은 자바스크립트 파일 안에 스타일을 선언하는 방식이다.

이 방식을 **CSS-in-JS**라고 부르는데, 이와 관련된 라이브러리는 정말 많다.

(라이브러리 종류는 이 [링크](https://github.com/MicheleBertoli/css-in-js)에서 확인할 수 있다.)

이러힌 CSS-in-JS 라이브러리 중에서 개발자들이 가장 선호하는 라이브러리가 바로 **styled-components**이다.

<br />

⇒ **npm install styled-components**

```jsx
import React from "react";
import styled, { css } from "styled-components";

const Box = styled.div`
  /* props로 넣어 준 값을 직접 전달해 줄 수 있다. */
  background: ${(props) => props.color || "blue"};
  padding: 1rem;
  display: flex;
`;

const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  /* & 문자를 사용하여 Sass처럼 자기 자신 선택 가능 */
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  /* 다음 코드는 inverted 값이 true일 때 특정 스타일을 부여해 준다. */
  ${(props) =>
    props.inverted &&
    css`
      background: none;
      border: 2px solod white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `}
  & + button {
    margin-left: 1rem;
  }
`;

const StyledComponent = () => {
  <Box color="black">
    <Button>안녕하세요</Button>
    <Button inverted={true}>테두리만</Button>
  </Box>;
};

export default StyledComponent;
```

<br />

styled-components와 일반 classNames를 사용하는 CSS/Sass를 비교했을 때, 가장 큰 장점은

**props** 값으로 전달해 주는 값을 실제 스타일에 적용할 수 있다는 것이다.

(VS code의 마켓플레이스에서 vscode-styled-components를 설치하면 색상이 입혀진다.)

<br />

- ### **Tagged 템플릿 리터럴**

스타일을 작성할 때 **`** 을 사용하여 만든 문자열에 스타일 정보를 넣어주는데, 이 문법을 **Tagged 템플릿 리터럴**이라고 부른다.

CSS Module에서 쓰인 템플릿 리터럴과 다른 점은 **템플릿 안에 자바스크립트 객체나 함수를 전달할 때 온전히 추출할 수 있다**는 것이다.

<br />

```jsx
`hello ${{ foo: "bar" }} ${() => "world"}!`;
// 결과: "hello [object Object] () => 'world'!"
```

템플릿에 객체를 넣거나 함수를 넣으면 형태를 잃어 버리게 된다.

객체는 `[object Object]`로 변환되고, 함수는 함수 내용이 그대로 문자열화되어 나타난다.

**Tagged 템플릿 리터럴을 사용하면 이렇게 템플릿 사이사이에 들어가는 자바스크립트 객체나 함수의 원본 값을 그대로 추출할 수 있다.**

styped-components는 이러한 속성을 사용하여 styled-components로 만든 컴포넌트의 **props를 스타일 쪽에서 쉽게 조회할 수 있도록 해준다.**

<br />

- ### **스타일링된 엘리먼트 만들기**

styled-components를 사용하여 스타일링된 엘리먼트를 만들 때는 컴포넌트 파일의 상단에서 styled를 불러오고, **styled.태그명**을 사용하여 구현한다.

하지만 사용해야 할 태그명이 유동적이거나 특정 컴포넌트 자체에 스타일링해 주고 싶다면 다음과 같은 형태로 구현할 수 있다.

```jsx
// 태그의 타입을 styled 함수의 인자로 전달
const MyInput = styled("input")`
  background: gray;
`;

// 아예 컴포넌트 형식의 값을 넣어 줌
const StyledLink = styled(Link)`
  color: blue;
`;
```

<br />

컴포넌트를 styled의 파라미터에 넣는 경우에는 해당 컴포넌트에 className props를 최상위 DOM의 className 값으로 설정하는 작업이 내부적으로 되어 있어야 한다.

```jsx
const Sample = ({ className }) => {
  return <div className={className}>Sample</div>;
};

const StyledSample = styled(Sample)`
  font-size: 2rem;
`;
```

<br />

- ### **반응형 디자인**

브라우저 가로 크기에 따라 다른 스타일을 적용하기 위해서는 일반 CSS를 사용할 때와 똑같이 **media** 쿼리를 사용하면 된다.

```jsx
const Box = styled.div`
  
  ...

  /* 기본적으로는 가로 크기 1024px에 가운데 정렬을 하고 
    가로 크기가 작아짐에 따라 크기를 줄이고 
    768px 미만이 되면 꽉 채운다. */

  width: 1024px;
  margin: 0 auto;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
```

<br />

그런데 이러한 작업을 여러 컴포넌트에서 반복해야 한다면 조금 귀찮을 수도 있다. 

그럴 때는 이 작업을 함수화하여 간편하게 사용할 수 있다. 

styled-components 매뉴얼에서 제공하는 유틸 함수를 따라 사용하자.

(참고: [](http://www.styled-components.com/doc/advanced#media-templates)[http://www.styled-components.com/docs/advanced#media-templates](http://www.styled-components.com/docs/advanced#media-templates))

<br />

```jsx
const sizes = {
  desktop: 1024,
  tablet: 768,
};

// 위에 있는 size 객체에 따라 자동으로 media 쿼리 함수를 만들어 준다.
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

const Box = styled.div`
	
	...

	width: 1024px;
	margin: 0 auto;
	${media.desktop`width: 768px;`};
	${media.tablet`width: 100%;`};
`;
```

media를 한번 선언하고 나니까 이를 사용할 때 스타일 쪽의 코드가 훨씬 간단해졌다. 

실제로 사용한다면 아예 다른 파일로 모듈화한 뒤 여기저기서 불러와 사용하는 방식이 훨씬 편할 것이다.

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
