---
date: "2021-10-25"
title: "[Machine Learning] Decision Tree"
category: "Data Science"
categoryColor: "seagreen"
tags: ["AI", "ML"]
thumbnail: "./images/ML.png"
---
> Decision Tree (결정 트리)는 트리와 같은 결정 모델을 사용하는 결정 지원 도구이다. 조건부 제어 문을 포함하는 알고리즘을 표시한다.

**Decision tree learning**

- 분류 및 회귀에 사용되는 지도 학습 방법.

- 데이터 기능에서 추론된 간단한 결정 규칙을 학습하여 대상 변수의 값을 예측하는 모델을 만든다.

<br />

**결정 트리의 장점**

- 구현하기 쉽다. C++ 및 Java와 같은 다른 언어로 이식 가능하다.
- 적은 데이터 준비, 즉 데이터 전처리가 거의 필요하지 않다.

<br />

<div style="text-align: center">
    <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2OTZc%2FbtqFLsxkm5X%2F1H5C5cmigjBmeSyq80wfs0%2Fimg.jpg" width="300">
</div>

**위 봇꽃의 품종을 분류하는 결정 트리가 예측하는 방법**

- **루트 노트**가 꽃잎의 길이가 2.45cm보다 짧다면, 왼쪽 자식 노드로 이동.

  - 이 노드가 **리프 노트**(자식 노드를 가지지 않는 노드)이므로 Iris-Setosa 클래스로 예측.

- 루트 노드에서 꽃잎의 길이가 2.45cm보다 길다면, 오른쪽 자식 노드로 이동.

  - 이 노드는 리프 노드가 아니므로 추가로 검사.

  - 꽃잎의 너비가 1.75cm보다 작다면 Iris-Versicolor 클래스로 예측. 그렇지 않다면 Iris-virginica 클래스로 예측.

<br />

**노드의 속성**

- **sample 속성** : 얼마나 많은 훈련 샘플이 적용되었는가.

- **value 속성** : 노드에서 각 클래스에 얼마나 많은 훈련 샘플이 있는가.

- **gini 속성** : 불순도 측정.

  - 한 노드의 모든 샘플이 같은 클래스에 속해 있다면 이 노드를 순수(gini = 0)하다고 한다.

  - Gini impurity(Gini 불순도)

    <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb2ND8Z%2FbtqYmIagVfD%2FEw0O2ipdL0fFkPrfGOamkK%2Fimg.png">

<br />

## CART 훈련 알고리즘

**사이킷런(scikit-learn)** 은 결정 트리를 훈련시키기 위해 (트리를 성장시키기 위해) **CART(Classification And Regression Tree)** 알고리즘을 사용한다.

- 훈련 세트를 하나의 **특성 k**의 **임계값 t_k**를 사용해 **두 개의 subset으로 나눈다.** (ex. 꽃잎의 길이 <= 2.45cm)

- 그런 다음, **CART**는 (크기에 따라 가중치가 적용된) **가장 순수한(gini = 0 에 가까운) subset으로 나눌 수 있는 (k, t_k) pair을 찾는다.**

- **CART** 알고리즘이 훈련 세트를 성공적으로 둘로 나누었다면, 같은 방식으로 subset을 또 나누고, **subset의 subset을 나누는 방식으로 반복한다.**

  - 이 과정은 **최대 깊이(max_depth)가 되면 중지하거나**, **불순도를 줄이는 분할을 찾을 수 없을 때 멈추게 된다.**

  - **max_depth** 외에도 **min_samples_split, min_samples_leaf, min_weight_fraction_leaf, max_leaf_nodes**와 같은 매개변수도 중지 조건에 관여한다.

<br />

**CART 알고리즘은 greedy(탐욕) 알고리즘이다.**

- 맨 위 루트 노드에서 **최적의 분할**을 찾으며 이어지는 각 단계에서 이 과정을 반복한다.

- 현재 단계의 분할이 몇 단계를 거쳐 가장 낮은 불순도로 이어질 수 있을지 없을지 **고려하지 않는다.**

- **즉, 최적의 솔루션을 보장하지 않는다.**

<br />

- **결정 트리는 훈련 데이터에 대한 제약 사항이 거의 없다.** (linear regression은 데이터가 선형일거라 가정하는 반면)

- 제약이 없는 상태로 두면(DT에서 가능하다) 트리가 훈련 데이터에 아주 가깝게 맞추려 해 **overfitting일 가능성이 높다**.

  - 결정 트리는 모델 파라미터가 없는 것이 아니라(보통 많다) **훈련되기 전에 파라미터 수가 결정되지 않는다.**

  - **훈련되기 전에 파라미터 수가 결정되지 않는다** => **Nonparametric case**

    모델 구조가 데이터에 맞춰져서 고정되지 않고 자유롭다.

<br />

## Regularization Hyperparameters (규제 매개변수)

> 훈련 데이터에 대한 overfitting을 피하기 위해 학습할 때 결정 트리의 자유도를 정규화(규제)를 통해 제한할 필요가 있다.

- 규제 매개변수는 사용하는 알고리즘에 따라 다르지만, 적어도 **결정 트리의 최대 깊이는 제어 가능하다.**

  - 사이킷런의 **max_depth** 매개변수 (Default=None, 제한 없음)

  - **max_depth를 줄이면 overfitting의 위험 감소**

<br />

- **결정 트리의 형태를 제한하는 매개변**수들

  - **min_samples_split** : 노드가 분할되기 전에 가져야 하는 최소 샘플 수
  - **min_samples_leaf** : 리프 노드가 가져야 하는 최소 샘플 수
  - **max_features** : 각 노드에서 분할에 사용할 특성의 최대 수

    **=> min\_\* 매개변수를 늘리거나 max\_\* 매개변수를 줄이면 모델의 규제가 커진다.**

<br />

## Regression (회귀)

**결정 트리를 회귀 문제에 사용할 수 있다.**

**Regression tree**

- **사이킷런**의 **DecisionTreeRegressor**를 사용해, **noisy 섞인 2차 함수 형태의 데이터셋**에서 훈련

<br />

<div style="text-align: center">
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbhTNWW%2FbtqSbaKU1kg%2FI3TvJoqyKN3JRYEIbKMk01%2Fimg.png" width="500">
</div>

**각 노드에서 클래스를 예측하는 대신 어떤 값을 예측한다.**

- **x1 = 0.6**인 샘플의 **target 값을 예측**한다고 가정

  - 루트 노드로부터 시작해 트리를 순회하면 **value=0.111**인 리프 노드에 도달하게 된다.

  - 이 리프 노드에 있는 110개의 훈련 샘플의 **평균 target값이 예측값이 됨**

  - 이 예측값을 사용해 110개 샘플에 대한 **MSE(평균제곱오차)를 계산하면 0.015가 된다.**

정리하면, **각 영역의 예측값은 항상 그 영역에 있는 target 값의 평균이 된다.**

알고리즘은 **예측값과 가능한 한 많은 샘플이 가까이 있도록 영역을 분할한다.**

- 즉, 훈련 세트를 불순도를 최소화하는 방향으로 분할하는 대신, **평균제곱오차(MSE)를 최소화하도록 분할한다.**

- **CART 알고리즘**은 훈련세트를 불순도를 최소화하는 방향으로 분할하는 대신 **평균제곱오차(MSE)를 최소화하도록 분할하는 것**을 제외하고는 앞서 설명한 것과 비슷하게 작동한다.

<br />

**회귀 문제에서도 결정 트리가 overfitting되기 쉽다.**

- 이러한 **overfitting** 문제를 해결하기 위해서 모델에 대한 **Regularization(규제)** 가 필요하다.

<div style="text-align: center">
    <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FqvdOy%2FbtqVAHqlYFN%2Fk9U5tMz5hSDq3LMn7ja3Bk%2Fimg.png" width="600">
</div>

<br />

## Pros and Cons of DT

**Pros**

- 이해 및 해석하기 쉽다.

- 사용하기 쉽다.

- Versatile(다목적)

- Powerful - 뛰어난 성능

<br />

**Cons - 불안정성**

- 결정 트리는 **계단 모양의 결정 경계(decision boundary)** 를 만든다.

  => **훈련 세트의 회전에 민감하다.**

  예를 들어 데이터셋을 45˚ 회전하게 되면 결정 트리는 다음 오른쪽처럼 불필요하게 구불구불해진다.

  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fbbaydk%2FbtqVvNSqP8q%2FGHZzwjc6CbEGsQsEn1HSe1%2Fimg.png" width="600">

  두 결정 트리 모두 훈련 세트를 완벽하게 학습하지만 위처럼 **선형으로 구분될 수 있는 왼쪽 데이터셋**과 달리 오른쪽 모델은 잘 일반화되지 않을 것이다.


- 결정 트리는 **훈련 데이터에 있는 작은 변화에 매우 민감하다.**
    
<br />
<br />

**Source:**

📖 핸즈온머신러닝, 2/E, 2020 (번역)