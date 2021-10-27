---
date: "2021-10-27"
title: "[Deep Learning] Perceptron"
category: "Data Science"
categoryColor: "seagreen"
tags: ["AI", "DL"]
thumbnail: "./images/DL.png"
---

어떻게 컴퓨터로 인간의 지능을 구현해 낼 수 있을까?

이는 인간의 뇌 구조와 굉장히 비슷하다. 인간의 뇌는 약 천억 개의 뉴런으로 이루어져서 각각의 뉴런은 자극을 받고 그 자극이 **어느 정도의 임계값을 넘기면** 다음 뉴런으로 전달한다. 이렇게 계속 수많은 뉴런으로 뻗어나가 인간은 지능을 가지고 생각을 하게 된다.

AI는 바로 여기서 출발한다. 자극을 받아 임계값이 넘어가면 전달하는 뉴런은 바로 **로지스틱 함수의 구조**와 매우 유사하다고 볼 수 있다.

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FnMnxQ%2FbtqEu6nEvJ4%2FkkshogxDJUjgLuswOwjGq0%2Fimg.png" width="500">
</div>

<bt />

> 로지스틱 함수를 이용하는 퍼셉트론(Perceptron)을 생성하고, 이를 여러 겹 만들어 인간의 뇌 구조와 비슷하게 구현한다. 이것이 바로 인공 신경망(Artificial Neural Network)이다.

> 퍼셉트론은 인공 신경망에 있어서 가장 작은 기본단위가 된다.

**하나의 퍼셉트론 안에는 활성화 함수가 있어야 한다.**

- **퍼셉트론은 로지스틱 회귀를 이용한 분류 알고리즘이기 때문에 활성화 함수는 "시그모이드 함수" 함수들을 이용해서 가중합의 결과로 1 또는 0의 출력 값을 내놓는다.**

<br />

# Perceptron: the limit

<hr />

초기 퍼셉트론에는 한계점이 있었다.

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbDTxkw%2FbtqEuW6PpCO%2FnBQOnKkUDkDANMktk1kJK0%2Fimg.png">
</div>

위 평면 위에 검은점과 흰점을 독립시키는 하나의 직선을 그을 수 없다.

**➡️ AND, OR는 가능하지만 XOR에서 한계에 부딪친 것이다.**

- 이 문제를 **XOR 문제**라고 칭하며 이때 AI의 겨울이라고 불리는 인공지능의 침체기가 온다.

- 10여 년의 침체기 끝에 XOR문제를 해결할 수 있었는데, 바로 퍼셉트론 층을 추가시키는 **다층 퍼셉트론**이다.

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTRt2f%2FbtqEu7f4TZ0%2FDSvuoWXGY99qoXNmin7pN1%2Fimg.png" width='700'>
</div>

- 위 이미지처럼 평면을 휘어주기 위해 **퍼셉트론을 여러 개를 이용해서 공간을 왜곡시키는 것**이다.

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbOIGVF%2FbtqEt5DjFfr%2FOQ3jnOkWRvc24BMt0xwsc0%2Fimg.png" width='700'>
</div>

**➡️ 퍼셉트론 사이에 은닉층(Hidden layer)을 넣어준다.**

<br />

# Multi-layer Perceptron (MLP)

<hr />

**다층 퍼셉트론은 입력층 은닉층과 출력층으로 설계한다.**

<br />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb0J1ob%2FbtqEwIsw1Ki%2FSSnlhA5VNaGMI4mZlieQ6K%2Fimg.png" width='600'>
</div>

- **입력값**에서 4개의 가중치와 2개의 바이어스를 생성하면, 그것이 **은닉층**에서 n1, n2값을 이루고, 다시 2개의 가중치와 1개의 바이어스를 n1, n2와 조합해 최종적인 출력값을 생성한다.

- (**σ** <- 이 기호는 **활성화 함수 시그모이드 함수**를 표현하는 것이다.)

- 위 표를 보면 **n1에서는 AND 게이트의 반대 NAND 게이트가 출력됐고, n2에서는 OR게이트가 마지막 출력값에서는 XOR 게이트가 출력된 것을 보아 XOR 문제가 해결됨을 확인할 수 있다.**

<br />

# Back-propagation (BP)

<hr />

> 오차 역전파(Back-propagation)는 신경망의 가중치들을 출력층부터 반대로 거슬로 올라가면서 최적의 가중치들로 수정해나가는 방식을 말한다.

- **신경망의 성능을 높이는 핵심 개념으로, 경사 하강법의 확장 개념이다.**

<br />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbRGh4z%2FbtqEKPZg0JG%2FSK9okw4tyCJP3dhsk0h4Q1%2Fimg.png" width='500'>
</div>

<br />

**1. 임의의 초기 가중치(W)를 준 뒤 결과(Y)를 계산한다.**

**2. 계산 결과와 우리가 원하는 값 사이의 오차를 구한다.**

- 이 오차가 최소인 지점으로 계속해서 조금씩 이동한다.

**3. 경사 하강법을 이용해 바로 앞 가중치를 오차가 작아지는 방향으로 업데이트한다.**

**4. 위 과정을 더 이상 오차가 줄어들지 않을 때까지 반복한다.**

- **오차가 최소가 되는 점(미분했을 때 기울기가 0이 되는 지점)** 을 찾으면 그것이 바로 알고자 하는 답이다.

<br />

<div style="text-align: center">
  <img src="https://thebook.io/img/080228/118.jpg" width="400">
</div>

위의 식을 이용해 **가중치를 최적화**시켜 나가는데, **미분하여 경사 하강법을 이용**한다.

<br />

### 신경망 학습 과정

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGSPV2%2FbtqEITBXgdA%2FmGSTKwbx0LxcHEewj3bWy0%2Fimg.png" width="400">
</div>

1. **환경변수 지정** : 인공 신경망을 설계할 각종 파라미터들을 지정해 준다.

2. **신경망 실행** : 초깃값(임의의 값)을 대입하여 Y_out 을 뽑아낸다.

3. **결과를 실제 값과 비교** : 오차를 측정한다.

4. **역전파 실행** : 출력층과 은닉층의 가중치를 수정한다.

5. **결과 출력**

<br />
<br />

**Source:**

📖 모두의 딥러닝, 2/E, 2020
