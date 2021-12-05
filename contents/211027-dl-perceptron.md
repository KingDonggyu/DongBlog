---
date: "2021-10-27"
title: "[Deep Learning] Perceptron"
category: "Data Science"
categoryColor: "seagreen"
tags: ["AI", "DL"]
thumbnail: "./images/DL.jpeg"
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

  - **가중치(weight)** 는 입력신호가 결과 출력에 주는 영향도를 조절하는 매개변수이다.

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

# MLP in detail

<hr />

## Perceptron

> 퍼셉트론은 **TLU(threshold logic unit) 또는 LTU(linear threshold unit)라고 불리는 조금 다른 형태의 인공 뉴런을 기반**으로 한다.

**TLU는 입력의 가중치 합을 계산(z = w_1x_1 + w_2x_2 + ... + w_nx_n = x⊺w)한 뒤 계산된 합에 계단 함수(step function)을 적용하여 결과를 출력한다.**

**➡️ h_w(x) = step(z), where z = x⊺w**

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbnmHg3%2FbtrcELRv1Ww%2FV39eULjiT58TqWxmX62uYK%2Fimg.png" width="350">
</div>

<br />

퍼셉트론은 층이 하나뿐인 TLU로 구성되며, **각 TLU는 모든 입력에 연결되어 있다.**

한 층에 있는 모든 뉴런이 이전 층의 모든 뉴런과 연결되어 있을 때, 이를 **완전 연결 층(fully connected layer) 또는 밀집 층(dense layer)** 라고 한다.

<br />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FBp0zL%2FbtrcHd7BycZ%2FKwo7xRCfw4fUV99ysCIiGk%2Fimg.png" width="500">
</div>

<br />

입력층에 보통 편향 특성이 더해지며, 이는 **항상 1을 출력하는 특별한 종류의 편향 뉴런(bias neuron)으로 표현된다.**

- **편향은 학습 데이터(Input)가 가중치와 계산되어 넘어야 하는 임계점으로 이 값이 높으면 높을 수록 그만큼 분류의 기준이 엄격하다는 것을 의미한다.**

- 편향이 낮으면 **underfitting**, 높으면 **overfitting** 위험이 발생한다.

➡️ 편향(bias)은 뉴런(또는 노드; x를 의미)이 얼마나 쉽게 활성화(1로 출력; activation)되느냐를 조정하는 매개변수이다.

<br />

한 번에 여러 샘플에 대해 인공 뉴런 층의 출력을 효율적으로 계산하는 식은 아래와 같다. **(Perceptron with bias neuron)**

**➡️ h_w,b (X) = ϕ(XW + b)**

- **X : 입력 특성 행렬**(행 -> 샘플, 열 -> 특성)

- **W : 가중치 행렬**(행 -> 입력 뉴런, 열 -> 출력층 인공 뉴런)

  편향 뉴런을 제외한 모든 연결 가중치 포함

- **ϕ : 활성화 함수**(activation function)

<br />

## How is Perceptron trained?

퍼셉트론에 한 번에 한 개의 샘플이 주입되면 각 샘플에 대해 예측이 만들어진다.

> **잘못된 예측을 하는 모든 출력 뉴런에 대해 올바른 예측을 만들 수 있도록 입력에 연결된 가중치를 강화시킨다.**

가중치를 업데이트하는 수식은 아래와 같다.

**➡️ w_i,j (nextstep) = w_i,j + η(y_i = ^y_j)x_i**

- **w_i,j** : i번째 입력 뉴런과 j번째 출력 뉴런 사이를 연결하는 가중치

- **x_i** : 현재 훈련 샘플의 i번째 뉴런의 입력값

- **^y_j** : 현재 훈련 샘플의 j번째 출력 뉴런의 출력값

- **y_j**: 현재 훈련 샘플의 j번째 출력 뉴런의 타깃값

- **η** : 학습률

<br />

## Multilayer Perceptron (MLP)

> 퍼셉트론을 여러 개 쌓아올리면 **일부 제약을 줄일 수 있는데, 이런 인공 신경망을 다층 퍼셉트론(Multi-layer perceptron, 이하 MLP)이라 한다.**

**MLP는 XOR 문제를 풀 수 있는데** 아래 이미지를 참고하자.

- 입력이 (0, 0)이나 (1, 1)일 때 네트워크가 0을 출력하고, 입력이 (0, 1)이나 (1, 0)일 때 1을 출력한다.

<br />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FWJU8A%2FbtrcMZPDTfM%2FItBu5NO6Bxh5nB0kRZMsNk%2Fimg.png" width="600">
</div>

<br />

**MLP는 입력층(input layer)와 은닉층(hidden layer), 출력층(output layer)으로 구성된다.**

<br />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FvUNll%2FbtrcMEx8SvA%2FxycijjxNRQPDgtDBluBsTK%2Fimg.jpg" width="400">
</div>

<br />

- 위 MLP 경우 신호가 입력에서 출력으로 한 방향으로만 흐르며, 이런 구조는 **피드포워드 신경망(feedforward neural network)** 에 속한다.

- **출력을 제외한 모든 레이어는 다음 레이어에 완전히 연결된다.**

<br />

## DNN

> 은닉층을 여러 개 쌓아 올린 인공 신경망을 심층 신경망(deep neural network, 이하 DNN)이라 한다.

### Back Propogation

**MLP를 훈련하는 방법은 오차 역전파(Back Propogation, BP) 알고리즘을 사용한다.**

<br />

<div style="border: 1px dotted; padding: 10px;">

- 1. **한 번에 하나의 미니배치씩 진행하여 전체 훈련 세트를 처리한다.**

  - 이 과정을 여러 번 반복하는데 각 반복을 **에포크(epoch)** 라 부른다.

- 2. **각 미니배치는 네트워크의 입력층으로 전달되어 첫 번째 은닉층으로 보내진다.**

  - 그다음 (미니배치에 있는 모든 샘플에 대해) **해당 층에 있는 모든 뉴런의 출력을 계산**한다.

  ➡️ 이 결과는 다음 층으로 전달된다. 다시 이 층의 출력을 계산하고 결과는 다음 층으로 전달된다. 이것이 **정방향 계산(forward pass)** 이다.

- 3. **알고리즘이 네트워크의 출력 오차를 측정한다.**

- 4. **각 출력 연결이 이 오차에 기여하는 정도를 계산한다.**

  - 미적분에서 기본 규칙이 되는 **연쇄 법칙(chain rule)** 을 적용하면 빠르고 정확하게 수행할 수 있다.

  **➡️ 입력층에 도달할 때까지 역방향으로 계속된다.**

- 5. **경사 하강법을 수행하여 방금 계산한 오차 그레이디언트를 사용해 네트워크에 있는 모든 연결 가중치를 수정한다.**

</div>

<br />

- **은닉층의 연결 가중치를 랜덤하게 초기화하는 것이 중요하다.** 예를 들어 가중치와 편향을 모두 0으로 초기화하면 층의 모든 뉴런이 완전히 같아지므로 훈련의 의의가 없다.

<br />

- 이 알고리즘이 제대로 작동하려면 MLP 아키텍처에 대한 주요 변경 사항이 필요하다.

  ➡️ 역전파 알고리즘을 더 업그레이드하기 위해 **계단 함수를 로지스틱(시그모이드) 함수로 교체한다.**

  **σ(z) = 1 / (1 + exp(–z))**

  - **계단 함수는 두 가지 단점 때문에 실제 신경망에 사용되지는 않는다.**

    - **불연속(Discontinuous)이다.** 임계값 지점에서 **불연속점을 갖게 되는데 이 점에서 미분이 불가능하기 때문에** 학습이 필요한 신경망에 사용할 수 없다.

    - **그레이디언트가 0이 된다.** **역전파 과정에서 미분값을 통해 학습을 하게 되는데 이 값이 0이 되어버리면 제대로 된 학습이 안된다.**

    - 그에 비해 **로지스틱 함수는 어디서든지 0이 아닌 그레이디언트가 잘 정의되어 있다.**

<br />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCcLyC%2FbtrcNmjxIqK%2F2MHtBGoVtf80QupIvB0ok1%2Fimg.png" width="650">
</div>

<br />

계단함수, 로지스틱 함수 외에도 널리 쓰이는 두 개의 활성화 함수가 있다.

- 하이퍼볼릭 탄젠트 함수

- ReLU 함수

위 이미지처럼 **비선형 활성화 함수가 있는 충분히 큰 DNN은 이론적으로 어떤 연속 함수(continuous function)도 근사할 수 있다.**

<br />
<br />

**Source:**

📖 모두의 딥러닝, 2/E, 2020

📖 핸즈온머신러닝, 2/E, 2020 (번역)