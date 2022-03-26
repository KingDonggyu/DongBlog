---
date: "2021-10-06"
title: "[React] React Router로 SPA 개발하기 (2)"
category: "Web"
categoryColor: "mediumpurple"
tags: ["React"]
thumbnail: "./images/React.png"
---

# Route 하나에 여러 개의 path 설정하기

**Route 하나에 여러 개의 path**를 지정하는 것은 최신 버전의 **리액트 라우터 v5**부터 적용된 기능이다.

이전 버전에서는 여러 개의 path에 같은 컴포넌트를 보여 주고 싶다면 다음과 같이 해야 했다.

```jsx
import React from "react";
import { Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";

const App = () => {
  return (
    <div>
      <Route path="/" component={Home} exact={true} />
      <Route path="/about" component={About} />
      <Route path="/info" component={About} />
    </div>
  );
};

export default App;
```

> Route를 두 번 사용하는 대신, **path props**를 배열로 설정해 주면 여러 경로에서 같은 컴포넌트를 보여줄 수 있다.

```jsx

...

    <Route path={['/about', '/info']} component={About} />

...

```

<br />
<br />

# URL 파라미터와 쿼리

**페이지 주소를 정의할 때 가끔은 유동적인 값을 전달해야 할 때도 있다.** 이는 **파라미터**와 **쿼리**로 나눌 수 있다.

- **파라미터 예시:** /profile/kdg
- **쿼리 예시:** /about?details=true

**유동적인 값**을 사용해야 하는 상황에서 **파라미터**를 써야 할지 **쿼리**를 써야 할지 정할 때, 무조건 따라야 하는 규칙은 없다.

다만 일반적으로 **파라미터는 특정 아이디 혹은 이름을 사용하여 조회할 때 사용**하고, **쿼리는 우리가 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때 사용**한다.

### URL 파라미터

Profile 페이지에서 **파라미터**를 사용해 보자. **/profile/kdg**와 같은 형식으로 뒷부분에 유동적인 **props**로 받아 와서 조회하는 방법을 알아보겠다.

```jsx
//Profile.js

import React from "react";

const data = {
  kdg: {
    name: "KimDonggyu",
    descriprion: "리액트를 좋아하는 개발자",
  },
  gildong: {
    name: "홍길동",
    description: "고전 소설 홍길동전의 주인공",
  },
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;
```

> **URL 파라미터**를 사용할 때는 **라우트**로 사용되는 컴포넌트에서 받아 오는 **match**라는 객체 안의 **params** 값을 참조한다. **match** 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정보가 들어있다.

이제 App 컴포넌트에서 Profile 컴포넌트를 위한 **라우트**를 정의해 보자.

이번에 사용할 **path** rbclrdpsms **/profile/:username**이라고 넣어주면 된다. 이렇게 설정하면 **match.params.username** 값을 통해 현재 **username** 값을 조회할 수 있다.

```jsx
// App.js

import React from "react";
import { Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Profile from "./Profile";

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profile/kdg">kdg 프로필</Link>
        </li>
        <li>
          <Link to="/profile/gildong">gildong 프로필</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact={true} />
      <Route path={["/about", "/info"]} component={About} />
      <Route path="/profile/:username" component={Profile} />
    </div>
  );
};

export default App;
```

### URL 쿼리

이번에는 About 페이지에서 **쿼리**를 받아 오겠다.

> **쿼리**는 **location** 객체에 들어 있는 **search** 값에서 조회할 수 있다. location 객체는 라우트로 사용된 컴포넌트에게 props로 전달되며, 웹 어플리케이션의 현재 주소에 대한 정보를 지니고 있다.

**location**의 형태는 다음과 같다.

```jsx
// http://localhost:3000/about?detaul=true 주소로 들어갔을 때의 값

{
    "pathname": "/about",
    "search": "?detail=true",
    "hash": ""
}
```

**URL 쿼리**를 읽을 때는 위 객체가 지닌 값 중에서 **search** 값을 확인해야 한다. 이 값은 **문자열 형태**로 되어있다.

**URL 쿼리**는 `?detail=true&another=1`과 같이 문자열에 여러 가지 값을 설정해 줄 수 있다.

**search** 값에서 특정 값을 읽어 오기 위해서는 이 문자열을 객체 형태로 변환해 주어야 한다.

<br />

```
npm install qs --save
```

> 쿼리 문자열을 객체로 변환할 때는 **qs**라는 라이브러리를 사용한다.

```jsx
// About.js

import React from "react";
import qs from "qs";

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true, // 이 설정을 통해 문자열 맨 앞의 ?를 생략한다.
  });
  const showDetail = query.detail === "true"; // 쿼리의 파싱 결과 값은 문자열이다.
  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
      {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
    </div>
  );
};

export default About;
```

**쿼리**를 사용할 때는 쿼리 문자열을 객체로 파싱하는 과정에서 결과 값은 언제나 **문자열**이라는 점에 주의하자. `?value=1` 혹은 `?value=true`와 같이 숫자나 논리 자료형(boolean)을 사용한다고 해서 해당 값이 우리가 원하는 형태로 변환되는 것이 아니라, **"1"**, **"true"** 와 같이 문자열 형태로 받아진다.

그렇기 때문에 숫자를 받아 와야 하면 **parseInt** 함수를 통해 꼭 숫자로 변환해 주고, 지금처럼 논리 자료형 값을사용해야 하는 경우에는 정확히 **"true"** 문자열이랑 일치하는지 비교해 주자.

<br />
<br />

# 서브 라우트

> 서브 라우트는 라우트 내부에 또 라우트를 정의하는 것을 의미한다.

이 작업은 그렇게 복잡하지 않다. **그냥 라우트로 사용되고 있는 컴포넌트 내부에 Route 컴포넌트를 또 사용하면 된다.**

```jsx
// Profiles.js

// Profiles 라우트 컴포넌트를 따로 만들고, 그 안에서 Profile 컴포넌트를 서브 라우트로 사용

import React from "react";
import { Link, Route } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <Link to="/profiles/kdg">kdg</Link>
        </li>
        <li>
          <Link to="/profiles/gildong">gildong</Link>
        </li>
      </ul>

      <Route
        path="/profiles"
        exact
        render={() => <div>사용자를 선택해 주세요.</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default Profiles;
```

이 코드에서 첫 번째 **Route** 컴포넌트에는 **component** 대신 **render**라는 **props**를 넣어 주었다. **컴포넌트 자체를 전달하는 것이 아니라, 보여 주고 싶은 JSX를 넣어줄 수 있다.** 지금처럼 따로 컴포넌트를 만들기 애매한 상황에 사용해도 되고, 컴포넌트에 **props**를 별도로 넣어 주고 싶을 때도 사용할 수 있다.

JSX에서 **props**를 설정할 때 값을 생략하면 자동으로 **true**로 설정된다. 예를 들어 현재 Profile 컴포넌트의 첫 번째 **Route**에서 `exact={true}` 대신 그냥 `exact`라고만 적어 주었는데 이는 같은 의미이다.

<br />
<br />

# 리액트 라우터 부가 기능

### history

> **history** 객체는 라우트로 사용된 컴포넌트에 **match, location**과 함께 전달되는 **props** 중 하나로, 이 객체를 통해 컴포넌트 내에 구현하는 메서드에서 라우터 API를 호출할 수 있다.

예를 들어, 특정 버튼을 눌렀을 때 뒤로 가거나, 로그인 후 화면을 전환하거나, 다른 페이지로 이탈하는 것을 방지할 때 **history**를 활용한다.

```jsx
import React, { Component } from "react";

class HistorySample extends Component {
  // 뒤로 가기
  handleGoBack = () => {
    this.props.history.goBack();
  };

  // 홈으로 이동
  handleGoHome = () => {
    this.props.history.push("/");
  };

  componentDidMount() {
    // 이것을 설정하고 나면 페이지에 변화가 생기려고 할 때마다 정말 나갈 것인지를 질문함
    this.unblock = this.props.history.block("정말 떠나실 건가요?");
  }

  componentWillUnmount() {
    // 컴포넌트가 언마운트되면 질문을 멈춤
    if (this.unblock) {
      this.unblock();
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleGoBack}>뒤로</button>
        <button onClick={this.handleGoHome}>홈으로</button>
      </div>
    );
  }
}
```

### withRouter

**withRouter** 함수는 **HOC(Higher-order Component)** 이다.

> 라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 접근할 수 있게 해준다.

```jsx
import React from "react";
import { withRouter } from "react-router-dom";

const withRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>location</h4>
      <textarea
        value={JSON.stringify(location, null, 2)}
        row={7}
        readOnly={true}
      />
      <textarea
        value={JSON.stringify(match, null, 2)}
        row={7}
        readOnly={true}
      />
      <button onClick={() => history.push("/")}>홈으로</button>
    </div>
  );
};

export default withRouter(withRouterSample);
```

이 코드처럼 **withRouter**를 사용할 때는 컴포넌트를 내보내 줄 때 함수로 감싸준다.

`JSON.stringify`의 두 번째 파라미터와 세 번째 파라미터를 위와 같이 null, 2로 설정해 주면 JSON에 들여쓰기가 적용된 상태로 문자열이 만들어진다.

<br />

**\*withRouter를 사용하면 현재 자신을 보여 주고 있는 라우트 컴포넌트를 기준으로 **math**가 전달된다.\***

자신을 보여 주고 있는 컴포넌트(ex. Profiles)를 위한 라우트를 설정할 때 `path="/profiles"`라고만 입력한다면 파라미터를 읽어 오지 못하는 상태이므로 **match** 객체의 **params**가 비어있게 된다.

### Switch

> **Switch** 컴포넌트는 여러 Route를 감싸서 그 중 일치하는 단 하나의 라우트만을 렌더링시켜 준다.

**Switch**를 사용하면 아래 코드와 같이 모든 규칙과 일치하지 않을때 보여 줄 **Not Found** 페이지도 구현할 수 있다.

```jsx
import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Profiles from "./Profile";

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path={["/about", "/info"]} component={About} />
        <Route path="/profiles" component={Profiles} />
        <Route
          // path를 따로 정의하지 않으면 모든 상황에 렌더링됨
          render={({ location }) => (
            <div>
              <h2>이 페이지는 존재하지 않습니다:</h2>
              <p>{location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
```

### NavLink

**NavLink**는 **Link**와 비슷하다.

> 현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 CSS 클래스를 적용할 수 있는 컴포넌트이다.

**NavLink**에서 링크가 호라성화되었을 때의 스타일을 적용할 때는 **activeStyle** 값을, CSS 클래스를 적용할 때는 **activeClassName** 값을 **props**로 넣어주면 된다.

```jsx
import React from "react";
import { NavLink, Route } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
  const activeStyle = {
    background: "black",
    color: "white",
  };
  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/kdg">
            kdg
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/gildong">
            gildong
          </NavLink>
        </li>
      </ul>
      
      ...

    </div>
  );
};

export default Profiles;
```

현재 선택되어 있는 경우(사용자 목록에 있는 링크를 클릭했을 때) 스타일을 적용한다. 

<br />
<br />

# 정리

큰 규모의 프로젝트를 진행하다 보면 한 가지 문제가 발생한다. 

바로 웹 브라우저에서 사용할 컴포넌트, 상태 관리를 하는 로직, 그 외 여러 기능을 구현하는 함수들이 점점 쌍히면서 최종 결과물인 **JavaScript 파일의 크기가 매우 커진다는 점**이다.

예를 들어 사용자가 **/about** 페이지에 들어왔을 때 지금 당장 필요하지 않은 **Profile 컴포넌트**까지 불러온다.

**라우트에 따라 필요한 컴포넌트만 불러오고, 다른 컴포넌트는 다른 페이지를 방문하는 등의 필요한 시점에 불러오면 더 효율적일 것이다.**

이를 해결해 주는 기술이 바로 **코드 스플리팅**이다. 이에 대해서는 후에 다루도록 하겠다. 

<br />
<br />

**Source:**

📖 리액트를 다루는 기술 (김민준)
