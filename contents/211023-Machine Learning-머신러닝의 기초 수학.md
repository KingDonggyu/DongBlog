---
date: "2021-10-23"
title: "[Machine Learning] 머신러닝의 기초 수학"
category: "Data Science"
categoryColor: "seagreen"
tags: ["AI", "ML"]
thumbnail: "./images/ML.png"
---

# 선형대수

<hr />

## 벡터

- **샘플을 특징 벡터(feature vector)로 표현한다.**

- **ex)** **Iris 데이터**에서 **꽃받침의 길이**, **꽃받침의 너비**, **꽃잎의 길이**, **꽃잎의 너비**라는 4개의 특징이 각각 **5.1**, **3.5**, **1.4**, **0.2**인 샘플

<div style="text-align: center">
<img src="https://latex.codecogs.com/png.latex?\dpi{100}&space;\bg_white&space;\fn_cm&space;\large&space;x&space;=&space;\begin{pmatrix}&space;x_{1}\\&space;x_{2}\\&space;x_{3}\\&space;x_{4}&space;\end{pmatrix}&space;=&space;\begin{pmatrix}&space;5.1\\&space;3.5\\&space;1.4\\&space;0.2&space;\end{pmatrix}" title="\large x = \begin{pmatrix} x_{1}\\ x_{2}\\ x_{3}\\ x_{4} \end{pmatrix} = \begin{pmatrix} 5.1\\ 3.5\\ 1.4\\ 0.2 \end{pmatrix}" width="200" />
</div>

<br />

- 여러 개의 특징 벡터를 첨자로 구분한다.

<br />

<div style="text-align: center">
<img src="https://latex.codecogs.com/gif.latex?\fn_cm&space;\large&space;x_{1}&space;=&space;\begin{pmatrix}&space;5.1\\&space;3.5\\&space;1.4\\&space;0.2&space;\end{pmatrix}&space;,\,&space;x_{2}&space;=&space;\begin{pmatrix}&space;4.9\\&space;3.0\\&space;1.4\\&space;0.2&space;\end{pmatrix}&space;,\,&space;x_{3}&space;=&space;\begin{pmatrix}&space;4.7\\&space;3.2\\&space;1.3\\&space;0.2&space;\end{pmatrix}&space;,&space;...\,&space;,\,&space;x_{150}&space;=&space;\begin{pmatrix}&space;5.9\\&space;3.0\\&space;5.1\\&space;1.8&space;\end{pmatrix}" title="\large x_{1} = \begin{pmatrix} 5.1\\ 3.5\\ 1.4\\ 0.2 \end{pmatrix} ,\, x_{2} = \begin{pmatrix} 4.9\\ 3.0\\ 1.4\\ 0.2 \end{pmatrix} ,\, x_{3} = \begin{pmatrix} 4.7\\ 3.2\\ 1.3\\ 0.2 \end{pmatrix} , ...\, ,\, x_{150} = \begin{pmatrix} 5.9\\ 3.0\\ 5.1\\ 1.8 \end{pmatrix}" />
</div>

<br />

## 행렬

- **여러 개의 벡터를 담는다.**

- **ex)** **Iris 데이터**에 있는 150개의 샘플을 **설계 행렬 X로 표현**

<div style="text-align: center">
<img src="https://i.ibb.co/ByqmK1Z/2021-10-24-3-05-30.png" width="500">
</div>

<br />

### **전치행렬(Transpose)**

- **ex)**

    <div style="display: flex;align-items: center;">
    <span><img src="https://latex.codecogs.com/gif.latex?\fn_cm&space;\large&space;A&space;=&space;\begin{pmatrix}&space;3&space;&&space;4&space;&&space;1\\&space;0&space;&&space;5&space;&&space;2&space;\end{pmatrix}" title="\large A = \begin{pmatrix} 3 & 4 & 1\\ 0 & 5 & 2 \end{pmatrix}" /></span>
    &nbsp;&nbsp;&nbsp;라면&nbsp;&nbsp;&nbsp;
    <span><img src="https://latex.codecogs.com/gif.latex?\fn_cm&space;\large&space;A^{T}&space;=&space;\begin{pmatrix}&space;3&space;&&space;0\\&space;4&space;&&space;5\\&space;1&space;&&space;2&space;\end{pmatrix}" title="\large A^{T} = \begin{pmatrix} 3 & 0\\ 4 & 5\\ 1 & 2 \end{pmatrix}" /></span>
    </div>

<br />

# 확률과 통계

<hr />

## 베이즈 정리

> 두 확률 변수의 사전 확률과 사후 확률 사이의 관계를 나타내는 정리로, 사건의 원인들 중 어느 것이 얼마의 확률을 나타내는 결과를 불러일으키는 것인지 궁금할 때 새로운 근거가 제시될 때의 특정 확률을 계산할 때 적용된다

<br />

<img src="https://latex.codecogs.com/gif.latex?\large&space;P(y,&space;x)&space;=&space;P(x|y)P(y)&space;=&space;P(x,&space;y)&space;=&space;P(y|x)P(x)" title="\large P(y, x) = P(x|y)P(y) = P(x, y) = P(y|x)P(x)"  width="400"/>

<br />

<div style="display: flex;align-items: center;font-size: 30px;">
➡️&nbsp;&nbsp;&nbsp;&nbsp;
<span><img src="https://latex.codecogs.com/gif.latex?\large&space;P(y|x)&space;=&space;\frac{P(x|y){(y)}}{P(x)}" title="\large P(y|x) = \frac{P(x|y){(y)}}{P(x)}" width="200"/></span>
</div>

<br />

사후확률 P(y|x)를 직접 추정하는 일은 아주 단순한 경우를 빼고 불가능하다.

따라서 베이즈 정리를 이용하여 추정한다.

- **ex)** "하얀 공이 나왔다는 사실만 알고 어느 병에서 나왔는지 모르는데, 어느 병인지 추정하라."

    <img src="https://i.ibb.co/g9Wtzdq/2021-10-24-3-40-55.png" width="700">

<br />

## 정보이론

> 잘 일어나지 않는 사건의 정보는 자주 발생할만한 사건보다 정보량이 많다고 하는 것이다.

- **ex)** “고비 사막에 눈이 왔다” 와 “대관령에 눈이 왔다” 라는 두 메시지 중 어느 것이 더 많은 정보를 가지나?

### 자기 정보 (self information)

- **사건(메시지) <span><img src="https://latex.codecogs.com/gif.latex?\large&space;e_{j}" title="\large e_{j}" width="15" /></span>&nbsp;의 정보량 (단위: bit)**

    <br />

    <img src="https://latex.codecogs.com/gif.latex?\large&space;h(e_{j})&space;=&space;-log_{2}P(e_{j})&space;\,&space;\,&space;\,&space;\,&space;or&space;\,&space;\,&space;\,&space;\,&space;h(e_{j})&space;=&space;-log_{e}P(e_{j})" title="\large h(e_{j}) = -log_{2}P(e_{j}) \, \, \, \, or \, \, \, \, h(e_{j}) = -log_{e}P(e_{j})" width="400"/>

<br />

### 엔트로피

- **확률변수 x의 불확실성을 나타낸다.**

- 이산확률분포

    <br />

    <img src="https://latex.codecogs.com/gif.latex?\large&space;H(x)&space;=&space;-\sum_{i=1,&space;k}&space;P(e_{i})log_{2}P(e_{i})&space;\,&space;\,&space;\,&space;\,&space;or&space;\,&space;\,&space;\,&space;\,&space;H(x)&space;=&space;-\sum_{i=1,&space;k}&space;P(e_{i})log_{e}P(e_{i})" title="\large H(x) = -\sum_{i=1, k} P(e_{i})log_{2}P(e_{i}) \, \, \, \, or \, \, \, \, H(x) = -\sum_{i=1, k} P(e_{i})log_{e}P(e_{i})" width="500"/>

<br />

- 연속확률분포

    <br />

    <img src="https://latex.codecogs.com/gif.latex?\large&space;H(x)&space;=&space;-\int_{R}&space;P(x)log_{2}P(x)&space;\,&space;\,&space;\,&space;\,&space;or&space;\,&space;\,&space;\,&space;\,&space;H(x)&space;=&space;-\int_{R}&space;P(x)log_{e}P(x)" title="\large H(x) = -\int_{R} P(x)log_{2}P(x) \, \, \, \, or \, \, \, \, H(x) = -\int_{R} P(x)log_{e}P(x)" width="500"/>

<br />

# 최적화

<hr />

- **순수 수학 최적화와 기계 학습 최적화의 차이**

  - 순수 수학의 최적화의 예)&nbsp;&nbsp;&nbsp; <span><img src="https://latex.codecogs.com/gif.latex?\large&space;f(x_{1},&space;x_{2})&space;=&space;-(cos(x_{1}^2)&space;&plus;&space;sin(x_{2}^2))^2" title="\large f(x_{1}, x_{2}) = -(cos(x_{1}^2) + sin(x_{2}^2))^2" /></span>&nbsp;&nbsp;&nbsp;의 최저점을 찾아라.

  - 기계 학습의 최적화는 단지 **훈련집합**이 주어지고, 훈련집합에 따라 정해지는 목적함수의 최저점을 찾아야 한다.

    - 데이터로 **미분**하는 과정 필요 ➡️ 오류 역전파 알고리즘

    - 주로 스토캐스틱 경사 하강법(SGD) 사용

- 기계 학습이 사용하는 전형적인 탐색 알고리즘 - **J(θ)를 최소로 하는 최적해 θ^을 찾아라.**

  ```python

  입력: 훈련집합 X와 Y, 학습률 p
  출력: 최적해 θ^
  ----------------------------
  1 난수를 생성하여 초기해 θ를 설정한다.
  2 repeat
  3   J(θ)가 작아지는 방향 d(θ)를 구한다.
  4   θ = θ + dθ
  5 until(멈춤 조건)
  6 θ^ = θ
  ```

## 미분에 의한 최적화

- 1차 도함수 f`(x) 는 함수의 기울기, 즉 값이 커지는 방향을 지시한다.

- 따라서 -f`(x) 방향에 목적함수의 최저점이 존재한다. (**경사 하강 알고리즘의 핵심 원리**)

### 편미분

- **변수가 여러 개인 함수의 미분**

- 미분값이 이루는 벡터를 **그레디언트**라 부른다.

- **ex)**

    <img src="https://i.ibb.co/RTzYj5F/2021-10-24-4-17-29.png" width="700">

## 경사하강알고리즘

> 함수의 기울기를 구하고 경사의 절댓값이 낮은 쪽으로 계속 이동시켜 극값에 이를 때까지 반복시키는 것이다.

- ### **배치 경사 하강 알고리즘 (BGD)**

  **샘플의 그레디언트를 평균한 후 한꺼번에 갱신한다.**

  ```python

  입력: 훈련집합 X와 Y, 학습률 p
  출력: 최적해 θ^
  ----------------------------
  1 난수를 생성하여 초기해 θ를 설정한다.
  2 repeat
  3   X에 있는 샘플의 그래디언트 ∇_1, ∇_2, ..., ∇_n 을 계산한다.
  4   그레디언트 평균을 계산한다.
  5   θ = θ - p∇_total
  6 until(멈춤 조건)
  7 θ^ = θ
  ```

<br />

- ### **스토캐스틱 경사 하강 (SGD) 알고리즘**

  **한 샘플의 그레디언트를 계산한 후 즉시 갱신한다.**

  ```python

  입력: 훈련집합 X와 Y, 학습률 p
  출력: 최적해 θ^
  ----------------------------
  1 난수를 생성하여 초기해 θ를 설정한다.
  2 repeat
  3   X의 샘플의 순서를 섞는다.
  4   for(i=1 to n)
  5        i번째 샘플에 대한 그레디언트 ∇_i 을 계산한다.
  6        θ = θ - p∇_i
  7 until (멈춤 조건)
  8 θ^ = θ
  ```

  (라인 3~6을 한 번 반복하는 일을 한 세대라 부름)

<br />
<br />

**Source:**

📖 기계학습, 오일석, 2017

📖 케라스 창시자에게 배우는..., 2018 (번역)