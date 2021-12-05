---
date: "2021-10-26"
title: "[Machine Learning] SVM"
category: "Data Science"
categoryColor: "seagreen"
tags: ["AI", "ML"]
thumbnail: "./images/ML.png"
---

> SVM(Support Vector Machine)은 데이터를 선형으로 분리하는 최적의 선형 결정 경계를 찾는 알고리즘이다 (Margin을 이용한 일반화 능력 향상 기법).

**Optimal Hyperplane**: "**두 클래스의 벡터 사이에 최대 margin을 갖는 선형 결정 함수.**"

이를 위해 필요한 것은 **margin**을 결정하는 **Suport Vectors**이다.

- 매우 강력하고 선형이나 비선형 분류, 회귀, 이상치 탐색에도 사용할 수 있는 다목적 머신러닝 모델이다.

- 복잡한 분류 문제에 적합하다.

- 작거나 중간 크기의 데이터 셋에 적합하다.

<br />

# Linear SVM

<hr />

<br />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbJ94nS%2FbtqVswQG566%2FPoG3gehEDlfxFkCi2ibpu0%2Fimg.png">
</div>

위 데이터셋은 서로 다른 종류의 붓꽃들을 모아놓은 데이터셋이다. 이 둘을 **직선 하나만 그어서 같은 클래스의 데이터들만 모여있도록 구역을 나눌 수 있을까?**

- 이것을 **선형적으로** 구분이 가능하다고 한다. 그러나 왼쪽 그래프의 빨간색이나 자주색 선이 두 클래스를 잘 구분하는 듯 하지만 **경계가 너무 데이터에 가깝기 떄문에 좋은 성능을 보일 것이라 장담하지 못한다.**

- 즉, 오른쪽처럼 두 클래스를 나눌 때 **최대한 큰 마진(margin)을 갖도록 경계를 정하면 그만큼 성능이 높아진다는 것이다.**

  ➡️ 이렇게 마치 최대한 폭이 넓은 도로를 찾는 듯 분류하는 것이 **Large Margin Classfication**이라고 한다.

  ➡️ 도로 밖에 data를 추가하더라도 경계는 변하지 않으며, 오른쪽 그래프의 두 점선처럼 도로의 경계에 영향을 미치는 데이터를 **Support Vector**라 한다.

  ➡️ 이렇게 경계를 정하여 데이터를 분류하는데 사용하는 모델을 **SVM(Support Vector Machine)** 이라고 한다.

<br />
<br />

**SVM을 다룰 때 feature의 Scale(범위)을 조정하는 것이 중요하다.**

<br />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FdcxQ2Z%2FbtqVug7FSjz%2FBpbOwqzqjwocQM3kKm1tC1%2Fimg.png">
</div>

- 왼쪽 그래프는 x_1과 x_0의 Scale이 달라 Margin이 거의 없는 경계가 생성되었다.

- 반대로 이 feature들의 스케일을 조정하면 오른쪽처럼 경계가 훨씬 좋아진다.

<br />

## Margin Classification

**Margin Classification**에는 **Hard**와 **Soft** 두가지가 있다.

<br />

### **모든 데이터가 도로의 바깥쪽에 올바르게 분류되어 있으면 Hard Margin Classification이라 한다.**

- 이는 **데이터가 선형적으로 분류가 가능해야하고, 변칙적으로 튀는 이상치(Anomaly data)에 민감하다.**

  이상치마저도 완벽하게 분류하려하니 **경계가 좋은 성능을 지닐 수가 없다.**

<br />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FuvGbV%2FbtqVdNT8d61%2FikwKSUNa0TqxDY5tXJPjv0%2Fimg.png">
</div>

<br />

- 따라서 왼쪽 그래프처럼 **이상치가 존재하는 경우 Hard하게 분류하는 것은 불가능하다.**

- 오른쪽처럼 **분류할 수 있다하더라도 완벽하게 분류하기 위해선 margin이 거의 없는 경계를 만들어야하는 상황이 발생하게 된다.**

<br />

### **Soft Margin Classification은 분류가 조금 틀리더라도 성능 좋은 경계를 만들 수 있다.**

- 이는 **도로의 Margin의 크기와 잘못 분류하는 Margin violation(마진 오류)에 대한 트레이드 오프 관계에서 균형을 잘 잡아야 한다.**

<br />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FdfbpsP%2FbtqVvOpyHbV%2FNVIs0nm0K0RqLEKJMhXKFk%2Fimg.png">
</div>

<br />

- **sklearn의 SVM 모델의 하이퍼 파라미터중 하나인 C는 이러한 트레이드 오프를 정하는데 사용된다.**

- 이 **C가 높을수록 모델은 Margin Violation을 허용하지 않으려 한다.**

- 반대로 **C가 낮으면 Margin Violation은 높아지겠지만 일반화가 더 잘될 것이다.**

```python
import numpy as np
from sklearn import datasets
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVC

iris = datasets.load_iris()
X = iris["data"][:, (2, 3)]  # 꽃잎 길이, 꽃잎 너비
y = (iris["target"] == 2).astype(np.float64)  # Iris virginica

svm_clf = Pipeline([
        ("scaler", StandardScaler()),
        ("linear_svc", LinearSVC(C=1, loss="hinge", random_state=42)),
    ])

svm_clf.fit(X, y)

...

```

<br />

# Nonlinear SVM

<hr />

> 선형 SVM 분류기가 많은 경우에 잘 작동하지만, 선형적으로 분류할 수 없는 데이터셋들 또한 많다. 이 같은 비선형 데이터셋은을 다루는 방법은 Polynomial Feature과 같은 feature를 추가하는 것이다.

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fn7ETO%2FbtqVkLnB0AI%2FdK54MjR9JrlTOkqInwuaKk%2Fimg.png">
</div>

- 왼쪽 그래프는 **x_1**이라는 하나의 feature만 가지는 데이터셋으로 선형적으로 분류가 안되지만, **x_2=(x_1)^2**라는 새로운 특성을 추가하면 오른쪽처럼 완벽하게 선형적으로 분류가 가능하다.

<br />
<br />

**sklearn**에서는 다음과 같이 적용해볼 수 있다. 사용된 데이터는 **moon dataset**이다.

```python
from sklearn.datasets import make_moons
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import PolynomialFeatures

polynomial_svm_clf = Pipeline([
        ("poly_features", PolynomialFeatures(degree=3)),
        ("scaler", StandardScaler()),
        ("svm_clf", LinearSVC(C=10, loss="hinge", random_state=42))
    ])

polynomial_svm_clf.fit(X, y)
```

<div style="text-align: center">⬇️</div>

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbxRhnq%2FbtqVqFUIuhw%2FlXVDC7xyjjwro5pWMJIKw0%2Fimg.png">
</div>

<br />

# SVM을 이용한 Regression

<hr />

> SVM은 Classification 뿐 아니라 Regression에도 이용될 수 있다. Regression에서는 도로 경계안에 최대한 많은 데이터들을 담아 데이터를 대표하려고 하면 된다.

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb6m7io%2FbtqVe8DM4WI%2FF4BRiML81390rKJQdKaeH0%2Fimg.png">
</div>

ε-insensitive

<br />

- **일정한 Margin Violation 아래에서 가능한 많은 데이터가 마진 내부에 들어가도록 학습한다.**

  → 즉, **SVC(Support Vector Machine Classifier)의 목표와 반대로 하는 것이다.**

- 이때 도로의 폭인 **Margin은 아래와 같이 하이퍼파라미터로 조절 가능하다.**

- 아래는 **sklearn의 LinearSVR을 이용한 선형 SVM Regression을 적용**하는 코드이다.

  ```python
  from sklearn.svm import LinearSVR

  svm_reg = LinearSVR(epsilon=1.5, random_state=42)
  svm_reg.fit(X, y)
  ```

- 아래는 **2차 Polynomial Kernel을 사용한 SVM Regression**이다.

  ```python
  from sklearn.svm import SVR

  svm_poly_reg = SVR(kernel="poly", degree=2, C=100, epsilon=0.1, gamma="scale")
  svm_poly_reg.fit(X, y)
  ```

  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2F953Fs%2FbtqVdNfrHev%2FKv6jayi1xQy2nCKSzy0K60%2Fimg.png">

<br />
<br />

# SVM with kernel

<hr />

## Kernel Trick

> 공간 변환은 ML의 핵심 연산 작업이다. 원래 특징 공간을 목적 달성에 더 유리한 새로운 공간으로 변환한다.

### 공간변환을 위한 커널 기법 (kernel method)

**커널기법이 필요한 이유**

- ex) **원래 특징 공간 𝓛**을 **새로운 특징 공간 𝓗**로 변환하여 <u>선형에 가까운 데이터 분포</u>를 만든다.

<div style="text-align:center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXMdiMVtCE3Mn2kNGfFLexuspm8aAjiGXqfA&usqp=CAU">
</div>

- **𝓗**는 매우 높은 차원이라 **실제 변환은 불가능하다.**

  **→ 커널 트릭을 사용하여 실제 변환하지 않고도 마치 변환을 하고 계산한 듯한, 변환 효과를 거둔다.**

- **원 특징공간이 매우 고차원인 경우 필요**하다. (ex. MNIST: 28\*28 = 784차원, ILSVRC: 224\*224 = 50176차원)

(**제약사항**: 𝓗공간에서의 연산이 **내적(dotproduct)** 으로 표현할 수 있어야 한다.)

<br />
<br />

**Source:**

📖 핸즈온머신러닝, 2/E, 2020 (번역)

📖 기계학습, 오일석, 2017
