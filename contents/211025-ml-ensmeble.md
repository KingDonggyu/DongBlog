---
date: "2021-10-25"
title: "[Machine Learning] Ensemble Learning"
category: "Data Science"
categoryColor: "seagreen"
tags: ["AI", "ML"]
thumbnail: "./images/ML.png"
---

> predictor(예측기)의 group으로부터 예측을 수집하면 가장 좋은 모델 하나보다 더 좋은 예측을 얻을 수 있다. 이 때의 예측기의 group을 Ensemble이라고 하기 때문에 이를 Ensemble Learning(앙상블 학습)이라 한다. (집단지성)

**앙상블 방법의 예**

- **훈련 세트로부터 무작위로 각기 다른 서브셋을 만들어 일련의 결정 트리 Classifier(분류기)를 훈련한다.**

- **모든 개별 트리의 예측을 구한다.**

- **가장 많은 선택을 받은 클래스를 예측으로 삼는다.**

- 이러한 결정 트리의 앙상블을 **Random Forest(랜덤포레스트)** 라고 한다.

<br />

# Voting Classifiers

<hr />

## Hard Voting

> Logistic Regression, SVM, Random Forest 등 여러 개의 분류기를 훈련시킨 후 각 분류기의 에측을 모아서 가장 많이 선택된 클래스로 예측하는 방법으로, 이렇게 다수결 투표로 정해지는 분류기를 말한다.

<div style="text-align: center">
    <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcDHr43%2FbtqVvOSJws0%2FmqkOrWDPlP7fJPkZTMs23K%2Fimg.png">
</div>

- **다수결 투표 분류기가 앙상블에 포함된 개별 분류기 중 가장 뛰어난 것보다 정확도가 높을 경우가 많다.**

- **각 분류기가 weak learner(약한 학습기 - 랜덤 추측보다 조금 더 높은 성능을 내는 분류기)일지라도 충분히 많고 다양하다면 앙상블은 strong learner(강한 학습기)가 될 수 있다.**

- 사이킷런에서 **VotingClassifer** 클래스 사용 시 **voting='hard'** 로 지정한다.

<br />

## Soft Voting

> 모든 분류기가 클래스의 확률을 예측할 수 있으면 개별 분류기의 예측을 평균내어 확률이 가장 높은 클래스를 예측하는 것을 Soft Voting이라 한다.

- **확률이 높은 투표에 비중을 더 두기 때문에 hard voting 방식보다 성능이 높다.**

- 사이킷런에서 **VotingClassifer** 클래스 사용 시 **voting='soft'** 로 지정한다.

- 모든 분류기가 클래스의 확률을 추정해야 하므로, **SVC(SVM Classifier)** 같이 클래스 확률을 제공하지 않는 경우 **probability 매개변수를 True로 지정한다.**

<br />

# Bagging과 Pasting

<hr />

> 다양한 분류기를 만드는 또 다른 방법으로 같은 알고리즘을 사용하고 훈련 세트의 서브셋을 무작위로 구성하여 분류기를 각기 다르게 학습시키는 방법이다.

- **Bagging (배깅)**

  > 훈련 세트에서 중복을 허용하는 샘플링하는 방식이다.

- **Pasting (페이스팅)**

  > 훈련 세트에서 중복을 허용하지 않고 샘플링하는 방식이다.

<div style="text-align: center">
    <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb2j3Jn%2FbtqVAIqH6Tz%2FfpOOHn3DvYAE8c2TWLGyaK%2Fimg.png">
</div>

- **분류기와 같은 모든 예측기가 학습을 마치면, 앙상블은 이들의 예측을 모아 새로운 data에 대한 예측을 만든다.**

- 이때 최종 예측을 하는 **수집함수**는 **Classification(분류)** 일 땐, **Hard Voting Classifier처럼 가장 많은 예측 결과를 따르고**, **Regression에 대해선 평균을 계산한다.**

- 원본 데이터 전체이 아닌, subset을 학습한 개별 분류기는 **크게 편향이 되어있지만(Underfit),** 수집 함수를 통과하면 편향과 분산이 모두 감소한다.

- 그리고 앙상블의 결과는 원본 데이터로 하나의 예측기를 훈련시킬 때보다, **편향은 비슷하지만 분산은 줄어든다. (Overfitting이 덜 된다).**

- 병렬로 학습 및 병렬로 예측을 수행할 수 있기 때문에(확장성 덕분에) 배깅, 페이스팅의 인기가 높다.

<br />

## Bias(편향)/Variance(분산) trade-off

**모델의 generalization(일반화) 오류는 매우 다른 세 가지 오류의 합으로 표현될 수 있다.**

- **Bias(편향)**

  이 부분은 **잘못된 가정** 때문이다. (ex. 데이터가 실제로 2차일 때 선형이라고 가정)

  **높은 편향 모델은 훈련 데이터에 underfit(과소 적합)할 가능성이 가장 크다.**

- **Variance(분산)**

  이 부분은 **훈련 데이터의 작은 변화에 대한 모델의 과도한 민감도** 때문이다.

  **자유도가 높은 모델(예: 고차 다항식 모델)은 분산이 높아 훈련 데이터에 overfit(과적합)될 가능성이 높다.**

- **Irreducible error**

  이 부분은 **데이터 자체의 노이즈** 때문이다.

  **오류의 이 부분을 줄이는 유일한 방법은 데이터를 정리(clean-up)하는 것이다.** (ex. 깨진 센서와 같은 데이터 소스 수정, 이상값 감지 및 제거)

<br />

## sklearn의 Bagging과 Pasting

**사이킷런(sklearn)** 에서는 **Bagging**과 **Pasting**을 위해 **BaggingClassifier**(회귀의 경우 **BaggingRegressor**)를 제공한다.

- 아래는 **Decision Tree** 500개로 구성로 구성된 앙상블을 훈련시키는 코드이다. 각 Classifier는 **Bagging**으로 훈련된다.

  ```python
  from sklearn.ensemble import BaggingClassifier
  from sklearn.tree import DecisionTreeClassifier

  bag_clf = BaggingClassifier(
      DecisionTreeClassifier(random_state=42), n_estimators=500,
      max_samples=100, bootstrap=True, n_jobs=-1, random_state=42)
  bag_clf.fit(X_train, y_train)
  y_pred = bag_clf.predict(X_test)
  ```

  - **Pasting**을 사용하려면 `bootstrap = False` 로 지정한다.

  - `n_jobs` 는 sklearn에서 훈련과 예측에 사용할 **CPU 코어 수**를 지정하는데, **-1로 설정 시 가용한 모든 코어를 사용한다.**
  - **BaggingClassifier**는 앙상블에 사용되는 Classifier가 **Decision Tree처럼 클래스 확률을 추정할 수 있다면, Soft Voting 방식을 사용한다.**

- 아래는 **Decision Tree의 결정 경계**와 앞서 본 코드로 학습한 **Bagging 앙상블의 결정 경계**를 비교한 것이다.

  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FsRhPl%2FbtqVyV5bOtA%2FsCZ0JRHW722xUybCzSJZh0%2Fimg.png">

  - 트레이닝 세트의 오차 수는 서로 비슷할지 모르나, **경계가 덜 불규칙한 앙상블의 예측이 훨씬 더 일반화를 잘할 것**이라고 볼 수 있다.

  - **Bootstrapping 즉 Bagging의 중복을 허용하는 특성 상** subset에 다양성을 증가시키므로 편향이 좀 더 높다.(**More Underfitting**)

  - 그러나 다양성을 추가한다는 것은 예측기 간 상관관계를 줄이므로 앙상블의 분산을 감소시킨다.(**Less Overfitting**)

  - 이러한 탓에 일반적으로는 **Bagging을 더 많이 선호한다.**

<br />

# Random Forests

<hr />

> Random Forests(랜덤 포레스트)는 Bagging 혹은 Pasting을 적용한 Decision Tree의 앙상블이다.

- 예를 들어 Feature가 30개라고 할 때, 30개의 Feature를 기반으로 하나의 결정 트리를 만든다면 트리의 가지가 많아질 것이고, 이는 **Overfitting의 결과를 야기할 수 있다.**

- 하지만 30개의 Feature 중 **랜덤으로 5개의 Feature만 선택해서 하나의 결정 트리를 만들고**, 또 30개 중 랜덤으로 5개의 Feature를 선택해서 또 다른 결정 트리를 만들고 ... **이렇게 계속 반복하여 여러 개의 결정 트리를 만들 수 있다.** 

- **결정 트리 하나마다 예측 값을 내놓을 것이고, 여러 결정 트리들이 내린 예측 값들 중 가장 많이 나온 값을 최종 예측값으로 정한다.** 

- 이렇게 **의견을 통합하거나 여러 가지 결과를 합치는 방식인 앙상블(Ensemble)을 이용하기 위해, 하나의 거대한 (깊이가 깊은) 결정 트리를 만드는 것이 아니라 여러 개의 작은 결정 트리를 만드는 것이다.** 

- 여러 개의 작은 결정 트리가 예측한 값들 중 **가장 많은 값(분류일 경우)-<u>Hard Voting</u> 혹은 평균값(회귀일 경우)-<u>Soft Voting</u>을 최종 예측 값으로 정한다.**

<br />

```python
from sklearn.ensemble import RandomForestClassifier

rnd_clf = RandomForestClassifier(n_estimators=500, max_leaf_nodes=16, n_jobs=-1, random_state=42)
rnd_clf.fit(X_train, y_train)
y_pred_rf = rnd_clf.predict(X_test)
```

- 일부만 사용할 **Training set의 크기는 max_samples로 지정한다.**

- Random Forest 알고리즘은 트리의 노드를 분할할 때, 전체 feature 중 최선의 feature를 찾는 대신 **무작위로 선택한 feature 후보들 중 최적의 feature를 찾음으로써 무작위성을 더 주입한다.**

- 이러한 무작위성은 트리를 더욱 다양하게 만들고, 이러한 **다양성은 편향을 감소시키지만(More Underfitting)** , **분산을 낮추어(Less Overfitting)** 더 훌륭한 모델을 만들어낸다.

<br />

## Feature Importance (특성 중요도)

> Random forest의 또 다른 장점은 어떤 feature가 예측에 중요한 비중을 차지하는지 상대적인 중요도를 측정하기 쉽다는 것이다.

**이러한 특징은 이미지를 Classification하는데 모델이 어느 곳을 중점적으로 보는지 판단하는데 활용될 수 있다.**

- 다음은 MNIST 데이터셋에서 Random Forest Classifier를 학습하고 각 픽셀의 중요도를 그래프로 나타낸 결과이다.

  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FqT1HN%2FbtqVzSf1qKv%2FsCkkDVDamGpBGWdH0URYm0%2Fimg.png">

<br />

# Boosting

<hr />

> Boosting(부스팅)은 약한 학습기를 여러 개 연결하여 강한 학습기를 만드는 앙상블 방법을 말한다. 여기에는 AdaBoost와 Gradient Boosting이 있다.

## AdaBoost

> AdaBoost는 이전 모델이 Underfitting했던 training data의 가중치를 더 높이며 새로운 모델을 만든다. 이렇게 하면 새로운 예측기는 학습하기 어려운 샘플에 점점 더 맞춰지게 된다.

<div style="text-align: center">
    <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcHXzW1%2FbtqVAIxuVlA%2Fr0nNHyAjDRctj0DV9omkd0%2Fimg.png">
</div>

- AdaBoost Classifier를 만들 때 먼저 Decision tree와 같은 첫 번째 Classifier를 Training set에서 훈련시키고 예측을 만든다. **그 다음 알고리즘이 잘못 분류했던 Training data의 가중치를 높인다.**

- 이것이 반영된 두번째 Classifier에서는 **업데이트된 가중치로 Training set을 학습하고 예측하고, 나머지 과정은 반복되는 식이다.**

- 다음은 **AdaBoost방식으로 갱신되어 가는 다섯개의 연속된 예측기의 결정 경계**이다.

  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FPlvPn%2FbtqVCcZpoRf%2FLeDCMcMpNKKDKHD9L5dnK1%2Fimg.png">

  - moons 데이터셋을 사용하였고, 모델은 규제를 강하게 한 RBF 커널 SVM Classifier이다.

  - Classifier의 성능이 가면 갈 수록 좋아지는 것을 확인할 수 있다.

<br />

## Gradient Boosting

> Gradient Boosting도 이전까지의 오차를 보정한 예측기가 순차적으로 앙상블에 추가된다. 다만 AdaBoost처럼 데이터의 가중치를 갱신하는 대신 이전 예측기가 만든 잔여 오차(residual error)를 새로운 예측기에 학습시킨다.

- 간단한 회귀 문제를 풀어보겠다. 이때 사용되는 모델을 **Gradient tree boosting 혹은 GBRT**라고 한다. 우선 **DecisionTreeRegressor**에 Training set을 학습시키겠다.

  ```python
  from sklearn.tree import DecisionTreeRegressor

  tree_reg1 = DecisionTreeRegressor(max_depth=2, random_state=42)
  tree_reg1.fit(X, y)
  ```

  - 이제 **Residual Error를 두번째 DecisionTreeRegressor에 훈련시킨다.**

  ```python
  y2 = y - tree_reg1.predict(X)  # residual errors

  tree_reg2 = DecisionTreeRegressor(max_depth=2, random_state=42)
  tree_reg2.fit(X, y2)
  ```

  - 다음도 두번째와 같다.

  ```python
  y3 = y2 - tree_reg2.predict(X)  # residual error

  tree_reg3 = DecisionTreeRegressor(max_depth=2, random_state=42)
  tree_reg3.fit(X, y3)
  ```

  - 새로운 데이터에 대한 예측은 **모든 트리의 예측을 더하면 된다.**

  ```python
  y_pred = sum(tree.predict(X_new) for tree in (tree_reg1, tree_reg2, tree_reg3))
  ```

  - 다음 그림에서 왼쪽 열은 **앙상블 내 세 트리의 예측**이고, 오른쪽 열은 **앙상블의 예측**이다.

    <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fr41LL%2FbtqVIJoB4AR%2FpAD6sH2lUqfc2FDZ8olv51%2Fimg.png">

    - 첫번째 행은 앙상블에 하나의 트리만 있기 때문에 첫 번째 트리의 예측과 완전히 같다.

    - 두번째 행의 앙상블은 첫 번째 트리의 잔여 오차를 학습하였다. 직관적으로 보면 앙상블의 예측이 h_2(x_1)와 잔여 오차를 더한 값임을 볼 수 있다.

    **이처럼 트리가 앙상블에 추가될 수록 앙상블의 예측은 더욱 좋아진다.**

<br />

# Stacking

<hr />

> 앙상블에 속한 모든 예측기의 예측을 취합하는 간단한 함수(Hard Voting 등)을 사용하는 대신, 취합하는 모델 자체를 훈련 시키고자 하는 방법이다.

### **새로운 샘플에 회귀 작업을 수행하는 앙상블 (블렌딩 예측기를 사용한 예측 취합)**

<br />

<div style="text-align: center">
  <img src="https://yganalyst.github.io/assets/images/ML/chap6/stacking1.png" width="500">
</div>

<br />

- **세 예측기는 각각 다른 값을 예측하고, 마지막 예측기(블렌더)가 이 예측을 입력으로 받아 최종 예측을 만든다.**

<br />

### **마지막 예측기(블렌더)를 학습시키는 일반적인 방법은 홀드 아웃(hold-out) 세트를 사용한다.**

<br />

<div style="text-align: center">
  <img src="https://yganalyst.github.io/assets/images/ML/chap6/stacking2.png" width="500">
</div>

<br />

- 먼저 training set을 2개의 subset으로 나눈다.

- **subset1은 첫번째 레이어의 예측기들을 훈련시키는데 사용한다.**

<br />

<div style="text-align: center">
  <img src="https://yganalyst.github.io/assets/images/ML/chap6/stacking3.png" width="500">
</div>

<br />

- **훈련된 첫번째 레이어의 예측기로 subset2에 대한 예측을 생성 (첫 번째 레이어 훈련하기)**

  - **subset이지만 훈련에 사용이 안됐으므로 test셋처럼 사용 가능하다.**

  - **hold-out 세트의 각 샘플들에 대해 세 개의 예측값이 있다.**

<div style="text-align: center">
⬇️
</div>

<div style="border: 1px dotted;padding: 10px;">

**1. 세개의 예측값 생성**

**2. 타깃값(y)은 그대로 쓰고 앞에서 예측한 3개의 값(y_hat)을 입력 변수로 사용하는 새로운 훈련세트 생성**

(즉, 새로운 훈련세트는 3차원이 된다)

**3. 블렌더가 새로운 훈련 세트로 학습**

(즉, 첫번째 레이어의 예측 3개를 이용해 y를 예측하도록 학습되는 것이다.)

</div>

<br />

### **블렌더를 여러 개 훈련시킬 수 있다.** (ex. 하나는 선형 회귀, 다른 하나는 렌덤포레스트 회귀로   )

<br />

<div style="text-align: center">
  <img src="https://yganalyst.github.io/assets/images/ML/chap6/stacking4.png" width="500">
</div>

<br />

- **블렌더만의 레이어가 만들어진다.**

1. 훈련 세트를 **세 개의 subset**으로 나눈다.

2. **첫 번째 세트**는 **첫 번째 레이어**를 훈련시키는 데 사용한다.

3. **두 번째 세트**는 **첫 번째 레이어의 예측기**로 **두 번째 레이어**를 훈련시키기 위한 훈련 세트를 만드는 데 사용한다.

4. **세 번째 세트**는 **두 번째 레이어의 예측기**로 **세 번째 레이어**를 훈련시키기 위한 훈련 세트를 만드는 데 사용한다.

5. 작업이 끝나면 각 레이어를 차례대로 실행해 새로운 샘플에 대한 예측을 만들 수 있다.

<br />
<br />

**Source:**

📖 핸즈온머신러닝, 2/E, 2020 (번역)