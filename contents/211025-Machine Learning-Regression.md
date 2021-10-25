---
date: "2021-10-25"
title: "[Machine Learning] Regression (회귀)"
category: "Data Science"
categoryColor: "seagreen"
tags: ["AI", "ML"]
thumbnail: "./images/ML.png"
---

# Linear Regression (선형 회귀)

<hr />

- **독립 변수** : ‘x값이 변함에 따라 y값도 변한다’는 이 정의 안에서, 독립적으로 변할 수 있는 x값

- **종속 변수** : 독립변수에 따라 종속적으로 변하는 값

> 선형회귀란 독립 변수 x를 사용해 종속 변수 y의 움직임을 예측하고 설명하는 작업을 말한다.

- **단순 선형 회귀(simple linear regression)** : 하나의 x값 만으로도 y값을 설명할 수 있을 때

- **다중 선형 회귀(multiple linear regression)** : x값이 여러 개 필요할 때

## 단순선형회귀 예시

<br />

<table>
 <thead>
    <tr align="center">
        <th style="background-color: lightgray;">공부한 시간</th>
        <th style="background-color: lightgray;">2시간</th>
        <th style="background-color: lightgray;">4시간</th>
        <th style="background-color: lightgray;">6시간</th>
        <th style="background-color: lightgray;">8시간</th>
    </tr>
 </thead>
 <tbody>
    <tr align="center">
        <td>성적</td>
        <td>81점</td>
        <td>93점</td>
        <td>91점</td>
        <td>97점</td>
    </tr>
 </tbody>
</table>

- 여기서 공부한 시간을 x라 하고 성적을 y라 할 때 집합 X와 집합 Y를 다음과 같이 표현할 수 있다.

  **X = {2, 4, 6, 8}**

  **Y = {81, 93, 91, 97}**

<br />

- **최소 제곱법** (method of least squares)

  **a = (x - x평균)(y - y평균)의 합 / (x - x의 평균)의 제곱의 합**

  ➡️ 46 / 20 = **2.3**

<br />

- **y절편인 b를 구하는 공식**

  b = y의 평균 - (x의 평균 X 기울기 a)

  ➡️ b = 90.5 - (5 X 2.3) = 79

  ➡️ y = 2.3x + 79

<br />

<table>
 <thead>
    <tr align="center">
        <th style="background-color: lightgray;">공부한 시간</th>
        <th style="background-color: lightgray;">2시간</th>
        <th style="background-color: lightgray;">4시간</th>
        <th style="background-color: lightgray;">6시간</th>
        <th style="background-color: lightgray;">8시간</th>
    </tr>
 </thead>
 <tbody>
    <tr align="center">
        <td>성적</td>
        <td>81점</td>
        <td>93점</td>
        <td>91점</td>
        <td>97점</td>
    </tr>
    <tr align="center">
        <td>예측 값</td>
        <td>83.6</td>
        <td>88.2</td>
        <td>92.8</td>
        <td>97.4</td>
    </tr>
 </tbody>
</table>

<br />

<div style="text-align:center">
<img src="https://i.ibb.co/SmR9ky8/2021-10-25-3-16-11.png" width="500">
</div>

<br />

## 오차수정 (잘못 그은 선 바로잡기)

- 일단 선을 그리고 ➡️ 조금씩 수정해 나가기

- 언제까지? **오차가 최소가 될 때까지**

- 기울기를 너무 작게 잡았을 때의 오차 예시

    <div>
    <img src="https://i.ibb.co/Kq8PH4p/2021-10-25-3-26-55.png" width="500">
    </div>

  **오차 = 예측 값 – 실제 값**

> 적절한 기울기를 찾았을 때 오차가 최소화된다.

### **학습률(learning rate)**

> 선을 어느 만큼 이동시킬지를 신중히 결정해야 하는데, 이때 이동 거리를 정해주는 것

- 학습률을 크게 설정하면 최적의 값을 제대로 찾지 못한다.

- 그렇다고 학습률을 작게 설정하면 최적의 값으로 수렴할 때까지 시간이 오래 걸린다.

- 모델을 학습시킬 때는 효율적으로 파라미터를 조정하면서도 결국 최적의 값을 찾아 수렴할 수 있을 수준으로 최적의 학습률을 찾는 게 중요하다.

### **경사하강법**

> 오차의 변화에 따라 이차 함수 그래프를 만들고 적절한 학습률을 설정해 미분 값이 0인 지점을 구하는 것

- 파라미터를 임의로 정한 다음에 조금씩 변화시켜가며 손실을 점점 줄여가는 방법으로 최적의 파라미터를 찾아간다.

- 미분을 사용한다.

<br />

# Polynomial Regression (다항 회귀)

<hr />

> 항이 여러 개인 가설 함수로 결과를 예측하는 회귀 분석 방법이다.

**항은 제곱근이나 2차항, 3차항 등 다양하게 있으며 함수의 형태가 nonlinear인 특징이 있다.**

- 해당 data 분포 함수의 degree보다 크게 높은 degree는 **overfitting**이 발생하고, 낮은 degree는 **underfitting**이 발생할 수 있다.

  - 그러한 결과를 확인한 경우 **더 복잡한 모델**을 사용하거나 **더 나은 features**를 제공해야 한다. (**underfitting**의 경우 **training examples**을 더 추가해도 도움이 되지 않는다.)

<br />

## reduce overfitting - Regularization (규제, 정규화)

- **overfitting**을 줄이는 방법은 모델을 **정규화**하는 것이다.

- 더 적은 자유도 (Degrees of freedom)는 데이터를 과적합하기 더 어려워진다.

> **다항식 모델을 정규화하는 간단한 방법은 다항식 차수의 수를 줄이는 것이다.**

<br />

### **Ridge Regression**

- 선형 회귀의 정규화된 버전이다.

- 비용 함수에 정규화 항&nbsp;&nbsp;<span><img src="https://yganalyst.github.io/assets/images/ML/chap3/ridge1.png"></span>&nbsp;&nbsp;이 추가된다.

<br />

<div style="text-align: center">
    <img src="https://yganalyst.github.io/assets/images/ML/chap3/ridge2.png" width="300">
</div>

<br />

### Lasso Regression

- 릿지 회귀처럼 비용함수에 규제항을 더하지만 **ℓ2norm의 제곱을 2로 나눈 것 대신 가중치 벡터의 ℓ1norm을 사용한다.**

<br />

<div style="text-align: center">
    <img src="https://yganalyst.github.io/assets/images/ML/chap3/lasso1.png" width="300">
</div>

- **Lasso Regression**의 중요한 특징은 덜 중요한 변수의 가중치를 완전히 제거하려고 한다는 점이다.

<br />

## reduce overfitting - Early Stopping

> 반복 학습 알고리즘(예: Gradient Descent)을 정규화하는 매우 다른 방법은 유효성 검사 오류가 최소값에 도달하는 즉시 학습을 중지하는 것이다.

<div style="text-align: center">
    <img src="https://www.oreilly.com/library/view/hands-on-machine-learning/9781491962282/assets/mlst_0415.png" width="500">
</div>

<br />

# Logistic Regression (로지스틱 회귀)

<hr />

> 로지스틱 회귀는 회귀를 사용하여 데이터가 어떤 범주에 속할 확률을 0에서 1 사이의 값으로 예측하고 그 확률에 따라 가능성이 더 높은 범주에 속하는 것으로 분류해주는 지도 학습 알고리즘이다.

어떤 메일을 받았을 때 그것이 스팸일 확률이 0.5 이상이면 스팸으로 분류하고, 확률이 0.5보다 작은 경우 일반 메일로 분류하는 것이다. 이렇게 **데이터가 2개의 범주 중 하나에 속하도록 결정하는 것**을 **이진 분류(binary classification)** 라고 한다.

- **ex)** "공부한 시간이 적으면 시험에 통과 못하고, 공부한 시간이 많으면 시험에 통과한다" 

    <div style="text-align: center">
    <img src="https://hleecaster.com/wp-content/uploads/2019/12/logreg02.png" width="700">
    </div>

## Decision Boundary (결정 경계)

> Decision Boundary란 결과값 y를 클래스에 대하여 두 개의 집합으로 나누는 기준선이다.

<div style="text-align: center">
    <img src="https://www.oreilly.com/library/view/hands-on-machine-learning/9781491962282/assets/mlst_04in07.png" width="700">
</div>

<br />

## Softmax Regression

> Softmax Regression은 두 가지 이상의 클래스를 분류하는데 사용하는 Logistic Regression이다.

- 데이터가 주어지면 Softmax Regression 모델은 해당 데이터가 각 클래스에 대한 점수를 계산한다.

- softmax 함수를 이용하여 이 점수를 확률값으로 바꾸게 되고, 가장 높은 확률값을 가진 클래스로 데이터 x를 분류하게 된다.

<div style="text-align: center">
    <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F0cqKW%2FbtqJZmxTeIG%2FmqXqrqFjAXbvmpvk35wRCk%2Fimg.png" width="700">
</div>

<br />
<br />

**Source:**

📖 핸즈온머신러닝, 2/E, 2020 (번역)

📖 모두의 딥러닝, 2/E, 2020
