---
date: "2021-09-27"
title: "[React] React Router로 SPA 개발하기 (1)"
category: "Web"
categoryColor: "mediumpurple"
tags: ["React"]
thumbnail: "./images/React.png"
---

# SPA란?

**SPA**는 **Single Page Application**의 약어이다. 말 그대로 한 개의 페이지로 이루어진 애플리케이션이라는 의미이다.

전통적인 웹 페이지는 다음과 같이 여러 페이지로 구성되어 있다.

<div style="text-align: center">
    <img src="https://joie-kim.github.io/assets/201230/original_web.jpeg" width="600px">
</div>

기존에는 사용자가 다른 페이지로 이동할 때마다 새로운 html을 받아 오고, 페이지를 로딩할 때마다 서버에서 리소스를 전달받아 해석한 뒤 화면에 보여 주었다.
이렇게 **사용자에게 보이는 화면은 서버 측에서 준비했다.**

요즘은 웹에서 제공되는 정보가 정말 많기 때문에 새로운 화면을 보여 주어야 할 때마다 서버 측에서 모든 뷰를 준비한다면 트래픽이 너무 많이 나오거나, 사용자가 몰려 서버에 높은 부하가 쉽게 걸릴 수 있는 등
**성능상의 문제**가 발생할 수 있다.

<br />
<br />

그래서 **React** 같은 라이브러리 혹은 프레임워크를 사용하여 **뷰 렌더링을 사용자의 브라우저가 담당**하도록 하고, 애플리케이션을 브라우저에 불러와서 실행시킨 후에 사용자와의 인터랙션이 발생하면
**필요한 부분만 JavaScript를 사용하여 업데이트해 준다.**

**_아래와 같이 새로운 데이터가 필요하다면 서버 API를 호출하여 필요한 데이터만 새로 불러와 애플리케이션에서 사용할 수 있다._**

<div style="text-align: center">
    <img src="https://joie-kim.github.io/assets/201230/spa_web.jpeg" width="600px">
</div>

> **SPA**의 경우 서버에서 사용자에게 제공하는 페이지는 한 종류이지만, 해당 페이지에서 로딩된 JavaScript와 현재 사용자 브라우저의 주소 상태에 따라 다양한 화면을 보여줄 수 있다.

<hr />

다른 주소에 다른 화면을 보여주는 것을 **Routing**이라고 한다.

React 라이브러리 자체에 이 기능이 내장되어 있지는 않다. 그 대신 브라우저의 API를 직접 사용하여 이를 관리하거나, 라이브러리를 사용하여 이 작업을 더욱 쉽게 구현할 수 있다.

**React Routing** 라이브러리는 **리액트 라우터(react-router)**, **리치 라우터(reach-router)**, **Next.js** 등 여러 가지가 있다.

이번 포스트에는 그 중 역사가 가장 길고 사용 빈도가 가장 높은 **리액트 라우터**에 대해 알아보겠다.

> **리액트 라우터**는 클라이언트 사이드에서 이루어지는 라우팅을 아주 간단하게 구현할 수 있도록 해 준다. 더 나아가 서버 사이드 렌더링을 할 때도 라우팅을 도와주는 컴포넌트를 제공해 준다.

<br />

- **SPA의 단점**

  **SPA의 단점은 앱의 규모가 커지면 JavaScript 파일이 너무 커진다는 것이다.** 페이지 로딩 시 사용자가 실제로 방문하지 않을 수도 있는 페이지의 스크립트도 불러오기 떄문이다.

  ➡️ 하지만 **code splitting**을 사용하면 라우트 별로 파일들을 나누어서 트래픽과 로딩 속도를 개선할 수 있다.

  <br />

  **리액트 라우터처럼 브라우저에서 JavaScript를 사용하여 라우팅을 관리하는 것**은 JavaScript를 실행하지 않는 일반 크롤러에서는 페이지의 정보를 제대로 수집해 가지 못한다는 잠재적인 단점이 따른다. 그렇기 때문에 구글, 네이버, 다음 같은 검색 엔진의 검색 결과에 페이지가 잘 나타나지 않을 수도 있다. 또한, JavaScrip가 실행될 때까지 페이지가 비어 있기 때문에 JavaScript 파일이 로딩되어 실행되는 짧은 시간 동안 흰 페이지가 나타날 수 있다는 단점도 있다.

  ➡️ 이러한 문제들은 **server-side rendering**을 통해 모두 해결할 수 있다.

  (**code splitting**과 **server-side rendering**에 대해서는 나중에 다루도록 하겠다.)

# 리액트 라우터의 기본적인 사용법

- **라이브러리 설치**

  ```
  npm install react-router-dom --save
  ```

<br />

- **프로젝트에 라우터 적용**

  프로젝트에 **리액트 라우터**를 적용할 때는 **src/index.js** 파일에서 **react-router-dom**에 내장되어 있는 **BrowserRouter**라는 컴포넌트를 사용하여 감싸면 된다.

  이 컴포넌트는 웹 애플리케이션에 HTML5의 **History API**를 사용하여 페이지를 새로고침하지 않고도 주소를 변경하고, 현재 주소에 관련된 정보를 **props**로 쉽게 조회하거나 사용할 수 있도록 해준다.

  ```jsx
  // src/index.js

  import React from "react";
  import ReactDOM from "react-dom";
  import { BrowserRouter } from "react-router-dom";
  import App from "./App";

  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
  ```

<br />

- **페이지 만들기**

  > Route 컴포넌트로 특정 주소에 컴포넌트를 연결할 수 있다.

  ```jsx
  // App.js

  import React from "react";
  import { Route } from "react-router-dom";
  import About from "./About";
  import Home from "./Home";

  const App = () => {
    return (
      <div>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </div>
    );
  };

  export default App;
  ```

  **/about** 경로로 들어가면 About 컴포넌트만 나오기를 기대했지만, 예상과 다르게 두 컴포넌트가 모두 나타난다.

  **/about 경로가 / 규칙에도 일치하기 때문에 발생한 현상이다.**

  이를 수정하려면 Home을 위한 **Route 컴포넌트**를 사용할 때 **exact**라는 **props**를 **true**로 설정하면 된다.

  ```jsx
  // App.js

  import React from "react";
  import { Route } from "react-router-dom";
  import About from "./About";
  import Home from "./Home";

  const App = () => {
    return (
      <div>
        <Route path="/" component={Home} exact={true} />
        <Route path="/about" component={About} />
      </div>
    );
  };

  export default App;
  ```

  위 코드로 다시 브라우저를 확인하면 컴포넌트가 하나만 잘 나타난다.

<br />

- **Link 컴포넌트를 사용하여 다른 주소로 이동하기**

  > Link 컴포넌트는 클릭하면 다른 주소로 이동시켜 주는 컴포넌트이다.

  일반 웹 애플리케이션에서는 **a 태그**를 사용하여 페이지를 전환하는데, **리액트 라우터를 사용할 때는 이 태그를 직접 사용하면 안된다.** 이 태그는 **페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 애플리케이션이 들고 있던 상태들을 모두 날려 버리게 된다.** (렌더링된 컴포넌트들도 모두 사라지고 다시 처음부터 렌더링하게 된다.)

  ```jsx
  <Link to="주소">내용</Link>
  ```

  **Link 컴포넌트**를 사용하여 페이지를 전환하면, 페이지를 새로 불러오지 않고 애플리케이션은 그대로 유지한 상태에서 **HTML5 History API**를 사용하여 페이지의 주소만 변경해준다.

  (Link 컴포넌트 자체는 a 태그로 이루어져 있지만, 페이지 전환을 방지하는 기능이 내장되어 있다.)

  ```jsx
  import React from "react";
  import { Route, Link } from "react-router-dom";
  import About from "./About";
  import Home from "./Home";

  const App = () => {
    return (
      <div>
        <ul>
          <li><Link to="/">홈</Link></li>
          <li><Link to="about">소개</Link></li>
        </ul>
        <hr />
        <Route path="/" component={Home} exact={true} />
        <Route path="/about" component={About} />
      </div>
    );
  };

  export default App;
  ```

# 정리

리액트 라우터를 사용하여 주소 경로에 따라 다양한 페이지를 보여 주는 방법을 알아보았다.

아직 이에 대해 학습할 부분이 많이 남았다..

**URL 파라미터와 쿼리**, **서브 라우트**, **리액트 라우터 부가 기능** 등 리액트 라우터에 대해 다음 포스트에서 깊게 다루도록 하겠다.

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
