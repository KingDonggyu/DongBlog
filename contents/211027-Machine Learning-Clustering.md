---
date: "2021-10-27"
title: "[Machine Learning] 비지도학습 - Clustering"
category: "Data Science"
categoryColor: "seagreen"
tags: ["AI", "ML"]
thumbnail: "./images/ML.png"
---

아전 포스트까지는 대부분 레이블(label-y)이 존재하는 데이터에 대해 다루었다. 하지만 우리가 사용하는 대부분의 데이터는 레이블이 없다. 시스템을 학습시키기 위해 데이터를 마련하는 건 쉬울지 몰라도 이것들에 각각 결함과 정상을 판단하여 레이블링을 하는 것은 높은 cost를 요한다.

이번 포스트에서는 사람의 도움없이 **알고리즘이 레이블이 없는 데이터를 바로 사용하는 비지도 학습**에 대해 살펴보겠다.

> 유사한 샘플을 모아 같은 그룹으로 묶는 일을 군집(clustering)이라고 한다. 그리고 이때 만들어진 그룹을 Cluster라고 한다.

**Clustering은 결국 각각의 데이터를 하나의 Cluster에 할당하는 작업이다.**

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FQNvpE%2FbtqV36RfCZ9%2FqWEQYYSentNT24mUbKzyN0%2Fimg.png">
</div>

위 그림은 동일한 붓꽃 데이터셋에 대해서 한쪽은 **레이블링**이 되어있고, 다른 한쪽은 그렇지 않은 데이터를 시각화한 것이다.

- 왼쪽은 **레이블링 되어있는 덕분에 Logistic Regression, SVM 등의 Classification 알고리즘이 잘 맞다.**

- 오른쪽은 **레이블링이 없기 때문에 Clustering 알고리즘이 필요하다.**

<br />

# K-Means

<hr />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbbdxbH%2FbtqVTHZ2fzf%2F2QWKJDhpqm9pKJDTX4Dodk%2Fimg.png">
</div>

위에 보이는 데이터셋은 레이블이 없고, 육안으로 볼때 샘플 덩어리 5개가 잘 구분되어있는 것을 확인할 수 있다.

> Clustering 알고리즘인 k-means 알고리즘은 몇번의 반복으로 이런 종류의 데이터셋을 효율적으로 Cluster로 묶을 수 있다.

## **sklearn 코드**

```python
from sklearn.cluster import KMeans

k = 5
kmeans = KMeans(n_clusters=k, random_state=42)
y_pred = kmeans.fit_predict(X)
```

- 첫번째로는 알고리즘이 찾을 **클러스터 개수 k**를 지정해야 한다.

  (지금은 육안으로 보고 **5**라고 설정하였지만, 실제로는 이런 방식으로 정하지 못하는데 이 부분은 좀 있다가 다루겠다.)

<br />

- `k=5` 라고 할당이 되었다면 **각각의 데이터는 5개의 클러스터 중 하나에 할당되는데**, 바로 할당되는 **클러스터의 index가 데이터의 레이블이 된다**.

  (Classification의 클래스 레이블과는 분명히 다르다.)

<br />

- 다음 코드처럼 `labels_` 변수를 이용하면 훈련된 데이터의 레이블을 확인할 수 있다.

  ```python
  y_pred  # array([0, 4, 1, ..., 2, 1, 4], dtype=int32)

  y_pred is kmeans.labels_  # True
  ```

<br />

- 다음 코드에서는 알고리즘이 찾은 다섯 개의 **센트로이드**를 나열한다.

  **센트로이드는 하나의 클러스터 내 데이터들의 중심이 되는 점이다.**

  ```python
  kmeans.cluster_centers_

  '''
  array([[-2.80037642,  1.30082566],
         [ 0.20876306,  2.25551336],
         [-2.79290307,  2.79641063],
         [-1.46679593,  2.28585348],
         [-2.80389616,  1.80117999]])
  '''
  ```

<br />

- **만약 새로운 데이터가 들어온다면**, 다음과 같이 **해당 위치에서 가장 가까운 센트로이드가 속해있는 클러스터에 할당할 수 있다.**

  ```python
  X_new = np.array([[0, 2], [3, 2], [-3, 3], [-3, 2.5]])
  kmeans.predict(X_new)  # array([1, 1, 2, 2], dtype=int32)
  ```

<br />

- 그리고 **클러스터의 결정 경계**를 그리면 다음과 같은 다이어그램을 얻을 수 있다.

  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbbkNbz%2FbtqV08WEZeT%2FA0WAkEkEpGXQKOwvHk186k%2Fimg.png">

  이때 센트로이드는 **X** 로 표시되어있다.

  대부분의 데이터는 잘 할당이 되어있는데, **클러스터의 경계 부근** 특히 핑크색과 노란색 클러스터 사이의 데이터 몇개는 잘못된 레이블이 부여되어있다.

<br />

이렇게 각각의 데이터를 하나의 Cluster에 할당하는 방식을 **Hard Clustering**이라고 한다.

그리고 각각의 데이터마다 모든 클러스터마다 점수를 부여해 이중 하나를 선택하는 방식은 **Soft Clustering**이라고 한다.

<br />

## K-Means Algorithm

센트로이드가 주어진다면, 각 데이터별로 가장 가까운 센트로이드의 클러스터에 할당하면 된다.

반대로 샘플의 레이블이 주어져있다면, 평균을 계산하여 모든 센트로이드를 구할 수도 있다.

그러나 둘다 주어지지 않는다면?

⬇️

**1. 센트로이드을 무작위로 배치하여 시작한다.**

**2. 그런 다음 인스턴스에 레이블을 지정하고 센트로이드을 업데이트한다.**

**3. 센트로이드이 이동하면**

• Go back to Step 2

• 그렇지 않으면(중심이 이동을 멈춤) 종료한다.

<br />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FdKGtyh%2FbtqV09usA7j%2FzKWUELsyZvC5KnGzD5daI1%2Fimg.png">
</div>

이 알고리즘은 제한된 횟수안에 수렴함을 보장한다.

그러나 반드시 최적의 솔루션인 것은 아니다. 이것의 성공 여부는 **센트로이드의 초기화**에 달려있다.

<br />

## Problem 1: 센트로이드 초기화 방법

**어떻게 센트로이드를 초기화하느냐에 따라 알고리즘의 성능에 큰 영향을 미친다.**

- **첫번째 방법**은 `n_init = 1` 로 설정하고, 하나의 numpy 배열로 **센트로이드 리스트를 초기화**하는 것이다.

  ```python
  good_init = np.array([[-3, 3], [-3, 2], [-3, 1], [-1, 2], [0, 2]])
  kmeans = KMeans(n_clusters=5, init=good_init, n_init=1)
  ```

<br />

- **두 번째 방법**은 매번 다른 **랜덤 초기화를 하여 여러 번 알고리즘을 실행하고, 이중 가장 좋은 솔루션을 채택하는 것이다.**

  `n_init` 이 바로 **랜덤 초기화 횟수를 지정하는 변수이며 기본 값은 10이다.**

<br />

가장 좋은 솔루션이라고 판단하는 성능 지표는 무엇일까?

그것은 **각 데이터와 센트로이드 사이의 평균 제곱 거리로 도출한 모델의 이너셔(inertia)이다.**

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fd9QQr5%2FbtqVV3V4CpA%2FOnQFI9WuSyfkv4UNtx9tMk%2Fimg.png">
</div>

- 위 그림에서 왼쪽 솔루션의 이너셔는 223.3, 오른쪽은 237.5이다.

➡️ **KMeans 클래스**는 `n_init` 번 실행하여 **이너셔가 가장 낮은 모델을 리턴**한다.

`inertia_` 변수로 해당 모델의 이너셔를 확인할 수 있다.

```python
kmeans.inertia_  # 211.62337889822362
```

`score()` 메서드는 이너셔의 음숫값을 반환한다. 이것은 **"큰 값이 좋은 것이다" 라는 sklearn의 규칙을 따르기 위해 더 좋은 모델이 높은 값을 갖도록 하기 위함**이다.

```python
kmeans.score(X)  # -211.62337889822362
```

<br />

## Problem 2: K-Means 속도 개선과 mini-batch

**Complexity issue**

- **Time**: K-Means는 training 중 각 반복에서 전체 데이터 세트를 사용해야 하므로 느리다.

- **Memory**는 모든 세트를 저장해야 한다.

➔ 클러스터가 커지면 이러한 문제가 더욱 중요해진다.

<br />

**Solution: training 중 mini-batch 사용**

```python
from sklearn.cluster import MiniBatchKMeans

minibatch_kmeans = MiniBatchKMeans(n_clusters=5, random_state=42)
minibatch_kmeans.fit(X)
```

**mini-batch K-Means 알고리즘은 속도는 빠르나 이너셔는 조금 더 나쁘다**. 특히 클러스터의 개수가 증가할 때 그렇다.

아래 그림의 왼쪽 그래프는 **클러스터 개수 k** 에 따른 **mini-batch k-means와 k-means의 이너셔를 비교**한 것이다.

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FRBKlP%2FbtqWn1oh1kN%2FYA9jUl3F44Lg3HgVHSK6v1%2Fimg.png">
</div>

왼쪽 그래프의 경우 곡선의 차이가 일정하게 유지되는 듯 보이지만, **클러스터의 개수가 늘어날 수록 이너셔가 점점 줄어들기 때문에, 차이가 차지하는 비율은 점점 커진다.**

그러나 오른쪽 그래프를 보면 **mini-batch K-Means가 일반적인 알고리즘보다 훨씬 빠르다**는 것을 확인할 수 있다.

<br />

## other problems: 최적의 클러스터 개수 찾기

**클러스터의 개수는 K-Means 알고리즘의 성능을 결정짓는 매우 중요한 요소이다.**

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fu5uyZ%2FbtqWsIvbaH6%2FZFz8NQMSM5NdQz5IXjmlAk%2Fimg.png">
</div>

위와 같이 **클러스터의 개수가 너무 적다면 여러 클러스터가 합쳐지고**, 그렇다고 **너무 많다면 하나의 클러스터가 여러 개로 나눠질 수도 있다.**

그렇다고 가장 적은 이너셔를 가진 모델을 선택하면, 아래와 같이 **k=3** 일 때 이너셔는 **653.2** 이고, **k** 가 **늘어날 수록 이너셔는 점점 작아지기 때문에 이너셔가 그다지 좋은 성능 지표가 아니라는 걸 알 수 있다.**

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fbuwjpf%2FbtqWjpCYNBL%2FEfyuYGcfmHhcsqkoWOk3rK%2Fimg.png">
</div>

- **클러스터가 늘어날 수록 각각의 데이터는 가까운 센트로이드에 가까워지기 때문**에 이너셔가 작아지는 건 당연한 결과이다.

- **k = 4** 까지는 빠르게 이너셔가 감소하는걸 확인할 수 있다.

  이를 **Elbow**라 칭하는데, 보통 이 지점을 넘어서면 **이너셔가 줄어드는 속도가 매우 줄어들기 때문**에 **4** 를 넘어선 클러스터의 개수는 크게 도움이 되지 않는다.

- 따라서 보통 **Elbow를 최적의 클러스터 개수로 고르게 된다.**

<br />

## K-Means의 한계

K-Means 알고리즘는 몇 가지 단점이 있다.

**1. 최적의 솔루션을 도출하기 위해 여러번 알고리즘을 실행해야 한다.**

**2. 클러스터 개수를 지정해야 한다.**

**3. 클러스터의 크기나 밀집도가 서로 다르거나, 원형이 아닐 경우 잘 작동하지 않는다.**

아래 그림은 **크기, 밀집도, 방향이 다른 세 개의 타원형 클러스터를 가진 데이터에 대해 K-Means**를 적용한 결과이다.

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FNL9k4%2FbtqV2aNY5lD%2FNBkKgZqy9KltOtUKQbCrbk%2Fimg.png">
</div>

- 둘 다 좋은 솔루션은 아니다. 즉 **데이터의 형태에 따라 K-Means가 아닌 다른 알고리즘들도 고려해야할 시점이 온 것이다.**

- 이 경우 잘 작동하는 것은 **가우시안 혼합 모델(Gaussian Mixture Model)** 이다. (이에 대해서는 다음 포스트에서 다루도록 하겠다.)

<br />
<br />

# 클러스터링을 사용한 전처리(Preprocessing)

<hr />

> 클러스터링은 Supervised Learning을 위한 전처리 단계로 사용할 수 있다. 이는 차원 축소에 대한 효율적인 접근 방식이 될 수 있다.

**ex)** MNIST-like dataset (8x8 image with 0 to 9 digits)

- 우선 데이터를 받아온다.

  ```python
  from sklearn.datasets import load_digits

  X_digits, y_digits = load_digits(return_X_y=True)
  ```

- 이를 Training과 Test set으로 나눕니다

  ```python
  from sklearn.model_selection import train_test_split

  X_train, X_test, y_train, y_test = train_test_split(X_digits, y_digits, random_state=42)
  ```

- 그 후 **Logistic Regression 모델**을 훈련한다.

  ```python
  from sklearn.linear_model import LogisticRegression

  log_reg = LogisticRegression(multi_class="ovr", solver="lbfgs", max_iter=5000, random_state=42)
  log_reg.fit(X_train, y_train)
  ```

- Test set에서 정확도를 평가했을 때, 우선 별도의 전처리 없이 $96.9%$ 정확도를 얻었다.

  ```python
  log_reg.score(X_test, y_test)  # 0.9688888888888889
  ```

- 이제 **K-Means를 전처리로 사용하여 성능이 더 좋아지는지 확인해보겠다.**

  우선 Training set을 50개의 클러스터로 나누고, 이미지를 50개 클러스터까지 거리로 바꾼다.

  ```python
  from sklearn.pipeline import Pipeline

  pipeline = Pipeline([
      ("kmeans", KMeans(n_clusters=50, random_state=42)),
      ("log_reg", LogisticRegression(multi_class="ovr", solver="lbfgs", max_iter=5000, random_state=42)),
  ])
  pipeline.fit(X_train, y_train)  # 0.98
  ```

  정확도도 상당히 개선된 것을 확인할 수 있다.

➡️ **클러스터링은 데이터셋의 Dimension을 64에서 50으로 감소시켰지만, 성능이 향상된 이유는 원본보다 변환된 데이터셋이 더 잘 구분할 수 있기 때문이다.**

- 이번엔 **GridSearchCV를 사용해 최적의 클러스터 개수를 찾은 후 다시 적용해보겠다.**

  ```python
  from sklearn.model_selection import GridSearchCV

  param_grid = dict(kmeans__n_clusters=range(2, 100))
  grid_clf = GridSearchCV(pipeline, param_grid, cv=3, verbose=2)
  grid_clf.fit(X_train, y_train)
  ```

  - 이제 최선의 k값과 파이프라인의 성능을 확인해보겠다.

    ```python
    grid_clf.best_params_  # {'kmeans__n_clusters': 57}

    grid_clf.score(X_test, y_test)  # 0.98
    ```

    **k = 99** 일 때 정확도가 크게 향상되고, Test set에서 98.22%를 달성했다.

<br />

## 클러스터링을 사용한 Semi-Supervised Learning

> 준지도학습(Semi-Supervised Learning)은 레이블이 없는 데이터가 많고, 레이블이 있는 데이터는 적을 때 사용한다.

MNIST 데이터셋에서 레이블된 50개의 데이터에 50개 데이터에 Logistic Regression을 훈련시켜보겠다.

```python
n_labeled = 50
log_reg = LogisticRegression(multi_class="ovr", solver="lbfgs", random_state=42)
log_reg.fit(X_train[:n_labeled], y_train[:n_labeled])
log_reg.score(X_test, y_test)  # 0.8333333333333334
```

- 83.3%의 정확도로, 전체 데이터셋이 아닌 일부만 사용했기에 나온 당연한 결과이다.

- 이를 개선하기 위해, 우선 Training set을 50개의 클러스터로 모은 후, 각 클러스터에서 센트로이드에 가장 가까운 이미지를 찾는다.

  ```python
  k = 50
  kmeans = KMeans(n_clusters=k, random_state=42)
  X_digits_dist = kmeans.fit_transform(X_train)
  representative_digit_idx = np.argmin(X_digits_dist, axis=0)
  X_representative_digits = X_train[representative_digit_idx]
  ```

  ```python
  log_reg = LogisticRegression(multi_class="ovr", solver="lbfgs", max_iter=5000, random_state=42)
  log_reg.fit(X_representative_digits, y_representative_digits)
  log_reg.score(X_test, y_test)  # 0.9244444444444444
  ```

  성능은 분명 좋아졌다. 문제는 각 클러스터 내 데이터들은 해당 클러스터의 대표 이미지의 레이블이 부여되어있다.

  **이렇게 되면 클러스터 경계에 가깝게 위치한 데이터가 포함되어 있고, 잘못 레이블이 부여되어있을 확률이 농후하다.**

- 따라서 모든 데이터가 아닌 각 클러스터에서 센트로이드에 가까운 20%의 데이터에만 대표 이미지의 레이블을 부여해볼 경우, 레이블된 데이터 50개만으로 92%의 정확도를 얻을 수 있다.

  (이는 그만큼 잘 레이블된 데이터를 사용했기 때문이다.)

<br />
<br />

# GMM(Gaussian mixture model)

<hr />

> 가우시안 혼합 모델(Gaussian mixture model, 이하 GMM)은 샘플이 파라미터가 알려지지 않은 여러 개의 혼합된 가우시안 분포(정규 분포)에서 생성되었다고 가정하여 군집화를 수행하는 방식이다.

**하나의 가우시안 분포에서 생성된 모든 샘플은 하나의 클러스터를 형성하며, 일반적으로 이 클러스터는 타원형이다.**

**K-means 알고리즘의 단점을 보완해줄 수 있는 모델이다.**

- GMM은 k-means보다 유연하게 다양한 데이터 셋에 잘 적용될 수 있다. (그러나 수행 시간이 오래 걸림)

- **이상치 탐지(Anomaly Detection)** 에도 사용할 수 있다.

**사이킷런의 GaussianMixture 클래스**를 사용해서 구현이 가능하다.

- 단, GMM의 경우 **cluster 개수(k)를 지정해주어야 한다.**

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile7.uf.tistory.com%2Fimage%2F99BC00385AC75F9A03072C">
</div>

복잡한 형태의 확률 분포를 위 그림과 같이 **K개의 Gaussian distribution을 혼합하여 표현하자는 것이 GMM의 기본 아이디어이다.**

**➡️ 하나의 가우시안 분포로 표현하기 어려운 데이터는 여러개의 가우시안 분포를 합쳐서 표현할 수 있다.**

<br />

## Expectation-Maximization(기댓값-최대화) - EM 알고리즘

> 클러스터 파라미터를 랜덤하게 초기화하고 수렴할 때까지 두 단계를 반복한다. 먼저, 샘플을 클러스터에 할당(기댓값 단계), 그다음 클러스터를 업데이트(최대화 단계)한다.

K-Means 알고리즘과 공통점이 많지만, **K-Means와는 달리 EM은 하드 클러스터 할당이 아니라 소프트 클러스터 할당을 사용한다.**

**GMM의 모수를 추정하기 위해 사용하는 알고리즘이다.**

- 여기서 말하는 **모수 추정**은 대표적으로 다음의 2가지를 추정하는 것이다.

  - **개별 정규 분포의 평균과 분산**

  - **각 데이터가 어떤 정규분포에 해당되는지의 확률**

<br />

**1. Expectation**

- 개별 데이터 각각에 대해서 **특정 정규 분포에 소속될 확률**을 구하고, **가장 높은 확률을 가진 정규분포에 소속**시킨다.

- <u>**가우시안으로 샘플의 소속 정보 개선**</u>

<br />

**2. Maximization**

- 데이터들이 특정 정규분포로 소속되면, **다시 해당 정규분포의 평균(모수)과 분산(모수)을 구한다.**

- <u>**샘플의 소속 정보로 가우시안 개선**</u>

<br />

**3.**

- 개별 정규분포의 모수인 **평균과 분산이 더 이상 변경되지 않고** 각 개별 데이터들의 이전 **정규분포 소속이 더 이상 변경되지 않으면**, 그것으로 **최종 군집화를 결정**한다.

- 그렇지 않으면 계속 **EM 반복**을 수행한다.

<br />
<br />

**특성이나 클러스터가 많거나 샘플이 적을 때**는 EM이 최적의 솔루션으로 수렴하기 어렵다.

- 이런 작업의 어려움을 줄이려면 **알고리즘이 학습할 파라미터 개수를 제한**해야 한다.

  ex) 클러스터의 모양과 방향의 범위를 제한하는 것이다.

<br />

### GM 코드

```python
from sklearn.mixture import GaussianMixture

gm = GaussianMixture(n_components=3, n_init=10, random_state=42)
gm.fit(x)
```

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdnU1EP%2FbtraHr1JqIh%2FVzMHNrbKm4kljfMj5dIkPK%2Fimg.png">
</div>

위 이미지는 모델의 클러스터 평균, 결정 경계(빨간 파선), 밀도 등고선을 보여준다.

<br />
<br />

# Anomaly Detection(이상치 탐지)

<hr />

> Anomaly Detection(이상치 탐지)는 보통과 많이 다른 샘플을 감지하는 작업이다.

가우시안 혼합 모델을 이상치 탐지에 사용하는 방법은 **밀도가 낮은 지역에 있는 모든 샘플을 이상치로 간주**하는 것이다.

**➡️ 사용할 밀도 임계값을 정해야 한다.**

<br />

```python
densities = gm.score_samples(X)
density_threshold = np.percentile(densities, 4) # 밀도 낮은 지역에 있는 샘플의 4% 획득
anomalies = X[densities < density_threshold]
```

<br />

<div style="text-align: center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fo8lhx%2FbtraFFGccCi%2Fi9PXuzdez6PchGvS8t2eyk%2Fimg.png">
</div>

위 이미지는 가우시안 혼합 모델을 사용한 이상치 탐지이다.

<br />

**GMM은 이상치를 포함해 모든 데이터에 맞추려고 한다.**

- 따라서 **이상치가 너무 많으면** 모델이 정상치를 바라보는 시각이 편향되고 일부 이상치를 정상으로 잘못 생각할 수 있다.

- 이를 방지하기 위해선 먼저 **한 모델을 훈련하고 가장 크게 벗어난 이상치를 제거한다.** 그다음 정제된 데이터셋에서 **모델을 다시 훈련**한다.

<br />

## Others for Anomaly Detection

### PCA

**보통 샘플의 재구성 오차(reconstruction error)와 이상치의 재구성 오차를 비교**하면 일반적으로 후자가 훨씬 크다.

매우 효과적인 이상치 탐지 기법이다.

### Isolation Forest

**고차원 데이터셋**에서 이상치 감지를 위한 효율적인 알고리즘이다.

**무작위로 성장한 결정 트리로 구성된 랜덤 포레스트를 만든다.**

- 여기서 각 노드에서 특성을 랜덤하게 선택한 다음 랜덤한 임계값을 골라 데이터셋을 둘로 나눈다.

- 데이터셋은 점차 분리되어 모든 샘플이 다른 샘플과 격리될 때까지 진행한다.

- **이상치는 일반적으로 다른 샘플과 멀리 떨어져 있으므로 정상 샘플과 적은 단계에서 추리할 수 있다.**

<br />
<br />

**Source:**

📖 핸즈온머신러닝, 2/E, 2020 (번역)

📖 기계학습, 오일석, 2017
