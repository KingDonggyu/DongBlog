---
date: "2021-10-26"
title: "[Machine Learning] PCA"
category: "Data Science"
categoryColor: "seagreen"
tags: ["AI", "ML"]
thumbnail: "./images/ML.png"
---

# Dimensionality Reduction (차원 축소)

<hr />

## 차원의 저주

특성(feature)은 얼핏 보면 데이터의 다양한 측면을 보여주기 때문에 많을 수록 좋은 것 같다.

실제로 마주하는 머신러닝 문제에서는 Training set의 feature가 수백만 개까지 가지고 있는 경우가 있다.

> 이런 많은 특성은 훈련을 느리게 하기도 하고, 때론 좋은 솔루션을 찾는데 방해하기도 한다. 이를 차원의 저주(curse of dimensionality)라고 한다.

- **고차원의 데이터셋은 보통 데이터들끼리 멀리 떨어져 가능성이 높다는 걸 유추해볼 수 있다.**

- 이러한 경우 예측을 위한 훨씬 더 많은 외삽(**extrapolation : 관찰이 어려운 데이터에 대해 추측하는 것**)을 요구하기 때문에 불안정해진다.

**➡️ 고차원일수록 Overfitting 위험이 크다.**

- 이를 해결하기 위한 이론적인 해결법은 **고차원에서도 데이터 끼리의 거리가 가까울 수 있도록 즉 밀도가 높아질 때까지 dataset의 크기를 키우는 것이다.**

- **그러나 일정한 밀도에 도달하기까지 필요한 데이터 수는 차원 수가 커짐에 따라 기하급수적으로 늘어나기 때문에 현실적으로 어렵다.**

<br />

## 차원 축소를 위한 접근 방법

Dimension Reduction 알고리즘을 이해하기 위해서는 **투영(projection)** 과 **매니폴드 학습(Manifold Learning)** 두가지 접근법을 이해해야 한다.

### 투영(projection)

dataset은 모든 차원에 대해 균일하게 퍼져있지 않다. **많은 feature들 중 특정 feature들끼리 강한 연관을 가지는 경우가 많다.**

**➡️ 즉 모든 data들이 고차원 공간 안에서(많은 feature들이 있지만) 저차원 subspace에 놓여있다(특정 feature들끼리 강한 연관을 가지는 경우가 많다).**

<br />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FDALcI%2FbtqVTGzCmTE%2FO5aPKwBBKGzrUsZaxPW9dK%2Fimg.png">
</div>

- 예를 들어 위와같은 **3차원 데이터셋**을 살펴볼 때, 모든 data들이 거의 **평면 형태**로 놓여있는데 이것이 바로 **3차원 공간에 있는 저차원(2차원) subspace**이다.

- 여기서 **모든 data를 2차원 subspace에 투영**하면 아래와 같은 2차원 데이터셋을 얻는데, 이것으로 데이터셋의 차원을 3에서 2차원으로 줄였다고 할 수 있다.

- 그리고 이에 따라 데이터는 새로운 feature인 **z_1**과 **z_2**에 대응된다.

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FGTccc%2FbtqVV3H7wsq%2FV0tnZrD2ccvbkKeW2JbmUk%2Fimg.png">
</div>

<br />
<br />

**Limit of projection**

다음 그림에서 표현된 **스위스 롤 데이터셋**에선 **투영**이 그다지 좋은 방법은 아니다.

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcBrimb%2FbtqVZSsLQDR%2FcvWNJvWKjJN6WoCvpuyFy0%2Fimg.png">
</div>

- 만약 이것을 **feature x_3**을 버리고 평면에 투영시키면, 다음 그림의 왼쪽처럼 스위스 롤의 층이 뭉개진다.

- 원하는 것은 오른쪽처럼 스위스 롤을 펼친 형태의 2차원 데이터이다.

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcDtjsX%2FbtqV198lyDR%2F5V6Dvrcw6KRNnHytq4bBK0%2Fimg.png">
</div>

<br />
<br />

### 매니폴드 학습(Manifold Learning)

앞서 설명한 **스위스 롤은 2D 매니폴드의 한 가지 예시**였다.

**즉, 스위스 롤을 펴게 되면 평면이기 때문에 3차원에서 휘어지고 뒤틀려있는 스위스 롤은 2D 매니폴드로 보는 것이다.**

> 많은 차원 축소 알고리즘은 이러한 꼬여있는 매니폴드를 풀어헤친 형태를 모델링하는 식으로 작동하는데, 이를 매니폴드 학습(manifold learning)이라고 한다.

매니폴드 학습이 많이 활용되는 가장 큰 이유는 **Classification이나 Regression같은 작업 시 저차원 매니폴드 형태로 데이터를 표현하면 훨씬 더 간단해질거라고 가정하기 때문이다.**

그러나 다음 그림을 보면 매번 간단해지는 것은 아니라는 걸 알 수 있다. (더 많은 경계가 필요하다.)

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcZnIkr%2FbtqV2VB61Vp%2F7aOYmfpnzgasAIHYYCf2k1%2Fimg.png">
</div>

<br />
<br />

# PCA

<hr />

> PCA(Principal Component Analysis)-주성분 분석 은 가장 보편적인 차원 축소 알고리즘 중 하나인데, 데이터의 분포를 최대한 유지하려 하면서 저차원에 투영시킨다.

## 분산 보존 (Preserving the Variance)

> 저차원의 초평면(hyperplane)에 dataset을 투영시키기 위해 가장 중요한 것은 데이터 분포를 유지하는 것, 즉 분산을 보존해야한다.

예를 들어 2차원 데이터셋을 1차원 축에 투영한 아래 그래프 결과를 볼 때, 첫번재 실선이 분산을 가장 잘 보존하고, 세번째 점선이 분산을 매우 적게 보존한다는 걸 알 수 있다.

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FADJ8g%2FbtqVSvrzaCL%2FHfv7FQmKmQxoK4cuN9Cjk0%2Fimg.png">
</div>

분산이 최대로 보존되는 1차원 축을 선택해야 정보가 가장 적게 손실되기 때문에 합리적이다.

**➡️ 투영 되기 전 데이터와 투영된 데이터 간 평균 제곱 거리를 최소화하는 축을 선택해야한다.**

<br />

## PC(주성분)

**PCA가 하는 작업**

- 주어진 원본 데이터에 대해서 **분산을 가장 많이 보존하는 축**부터 찾으면서 임의의 n개의 축을 찾는다.

  ➡️ 이때 이 축들을 **주성분(PC : principal componet)** 라고 한다.

- **투영할 저차원이 d차원이라면 분산을 가장 많이 보존하는 축부터 d개의 축을 선택한 후** 이 축들로 이뤄진 d차원 공간에 원본 데이터를 투영시킨다.

- 앞에서 본 예시에서는 첫번째 실선이 **첫번째 PC**이고, 두번째 선이 **두번째 PC**가 되며, 이 **두 PC가 만들어낸 평면과 수직한 축이 세번째 PC가 된다.**

<br />

**PC는 어떻게 찾을까?**

- **SVD(singular value decomposition)** 이라는 표준 행렬 분해 기술을 이용한다.

- 행렬 A를 **A = UΣV^T** 와 같이 분해할 수 있는데 이때 분해된 **V^T** 를 전치시켜 **V** 를 구하면 여기에 찾고자하는 모든 PC의 단위 벡터가 담겨있다.

아래는 **sklearn**에서 **PCA를 적용하여 데이터셋을 2차원으로 줄이는 코드**이다.

```python
from sklearn.decomposition import PCA

pca = PCA(n_components = 2)
X2D = pca.fit_transform(X)
```

<br />

## 적절한 차원 수 선택하기

> 축소할 차원 수는 임의로 정하기 보다는 1) 각 PC별로 표현하는 데이터 분산의 합이 충분할 때까지(ex. 95% 이상) 필요한 PC의 개수로 차원 수를 선택하는 것이 좋다.

(데이터 시각화를 위해 차원을 축소하는 경우는 보통 2, 3차원을 쓴다.)

```python
pca = PCA()
pca.fit(X_train)
cumsum = np.cumsum(pca.explained_variance_ratio_)
d = np.argmax(cumsum >= 0.95) + 1
```

PCA를 계산한 후 원본 데이터셋의 분산을 95%로 유지하는데 필요한 최소한의 PC 개수 즉 차원 수를 계산한다.

```python
pca = PCA(n_components=0.95)
X_reduced = pca.fit_transform(X_train)
```

그 후 `n_components` 를 설정하여 PCA를 다시 실행하는 인자로 보존할 분산의 비율을 넣어주면 된다.



> 축소할 차원 수는 임의로 정하기 보다는 2) 보존되는 분산의 비율을 차원 수에 대한 함수로 그리는 것이 좋다.

**그래프에는 보존되는 분산의 비율이 빠르게 성장하다 멈추는 변곡점이 있는데, 이걸로 축소할 차원 수를 결정할 수 있다.**

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FddG1cg%2FbtqVV3VFeDK%2FGzdxn1ASnIb0ibgtfiXkPK%2Fimg.png">
</div>

<br />

## 압축을 위한 PCA

- **차원 축소는 dataset의 크기를 줄인다.**

- 이러한 **압축은 SVM과 같은 Classification 알고리즘의 속도를 크게 높인다.**

- 반대로 **압축된 데이터셋에 PCA 투영의 변환을 반대로 적용하여 다시 원래의 차원으로 되돌릴 수 있다.**

- 다만 **축소에서 일부 정보를 잃어버렸기 때문에 완벽한 원본 데이터셋을 얻을 순 없지만 매우 비슷하다.**

아래는 **차원 축소 후 다시 복원**하는 코드이다.

```python
pca = PCA(n_components = 154)
X_reduced = pca.fit_transform(X_train)
X_recovered = pca.inverse_transform(X_reduced)
```

아래는 **MNIST 데이터셋**에 대하여 원본 데이터셋과 압축 후 복원된 결과를 비교한 그림이다.

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcBtDtz%2FbtqVV3uDeqp%2FGClc5hWhrgK6rNMxUzBxuK%2Fimg.png">
</div>

- 이미지의 품질이 손상되긴 했지만 숫자의 모양은 온전한 것을 확인할 수 있다.

<br />

# Nonlinear Dimensionality Reduction Techniques

<hr />

## Locally Linear Embedding (LLE)

> 지역 선형 임베딩이라 부르는 LLE(locally linear embedding)는 강력한 non-linear dimensionally reduction(NLDR) 기술로 투영이 아닌 매니폴드 학습이다.

- **LLE는 각 data가 가장 가까운 이웃에 얼마나 선형적으로 연관되어 있는지 측정한다.**

- 그 후 **매니폴드가 가장 잘 보존될 원본 데이터의 저차원 표현을 찾는다.**

- 이 방법은 **Noise가 많지 않다면, 꼬인 매니폴드를 펼치는데 잘 작동한다**.

<br />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FlHUov%2FbtqV2WVht2J%2FN7kvZ1r6PIvWHNBDwlfmZk%2Fimg.png">
</div>

- 위 예시로 보아 스위스 롤이 잘 펴지고 샘플 간 거리도 잘 보존되어있는 듯 하지만, 거시적으로 보면 **샘플 간 거리가 잘 유지되지 않는다.**

- 그렇지만 **LLE는 매니폴드를 펼치는데 잘 동작한다.**

<br />

## Others for NLDR

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2F1nG9m%2FbtqV2VPCcok%2FBBk4JeUIye9DRnVKIGSvEK%2Fimg.png">
</div>

### Kernel PCA

**커널 트릭을 사용하여 고차원 기능 공간에서 선형으로 변환한다.**

(**커널 SVM**에서와 같이)

- **Kernel PCA는 기존의 샘플데이터 뿐만 아니라 새로운 샘플데이터가 와도 모두 메모리에 저장하고 있어야 새로운 데이터에 대한 PC 계산이 가능해지므로 메모리 기반 방식이다.**

- 그러다 보니 **메모리측면에서 부담이 큰 알고리즘**이다.

- (그러나 SVM의 경우, support vector만 필요한 경우도 있기 때문에 Kernel PCA보다 메모리 측면에서 효과적이다.)

- **PCA에 커널 트릭을 적용**하고자 할 경우, 아래의 전처리/가정이 있을 때보다 효율적으로 커널 트릭을 계산하고 적용할 수 있다. 

  - 전처리: 원 데이터를 원점 중심으로 옮기는 전처리를 먼저 진행함.

  - 가정: 데이터들이 원점을 중심으로 분포되었다고 추정하는 변환 공간이 있다고 가정한 이후에 커널 트릭을 적용.

```python
from sklearn.decomposition import KernelPCA

rbf_pca = KernelPCA(n_components = 2, kernel="rbf", gamma=0.04)
X_reduced = rbf_pca.fit_transform(X)
```

### t-Distributed Stochastic Neighbor Embedding (t-SNE)

**유사한 인스턴스를 가깝게 유지하고 유사하지 않은 인스턴스를 분리하는 동안 차원을 줄인다.**

**주로 시각화에 사용된다.**

<br />
<br />

**Source:**

📖 핸즈온머신러닝, 2/E, 2020 (번역)

📖 기계학습, 오일석, 2017

📖 Python machine learning, 2/E, 2019 (번역)→“머 신러닝 교과서 with 파이썬, ...” 2019
