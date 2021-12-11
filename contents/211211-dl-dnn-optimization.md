---
date: "2021-12-11"
title: "[Deep Learning] DNN Optimization"
category: "Data Science"
categoryColor: "seagreen"
tags: ["AI", "DL"]
thumbnail: "./images/DL.jpeg"
---

# Vanishing Gradients Problem

<hr />

> 알고리즘이 하위 계층으로 진행됨에 따라 gradients가 점점 작아지는 경우가 많다. 결과적으로 Gradient Descent 업데이트는 하위 레이어의 연결 가중치를 거의 변경하지 않은 상태로 유지한다. (Training은 결코 좋은 solution으로 수렴되지 않는다.)

<div style="text-align:center">
  <img src="https://user-images.githubusercontent.com/33220404/145667179-b905408e-8da7-4ad2-adad-a78465d722ea.png" width="500">
</div>

Gradient Descent의 예

- **시그모이드 활성화 함수 사용 시**, 입력의 절대값이 커지면 함수값이 0이나 1로 수렴하는데, 이때 기울기가 0에 매우 가까워진다.

- 그레디언트는 최상위층에서부터 역전파가 진행되면서 점차 약해져서 하위 층에는 아무것도 도달하지 않게 된다.

<br />

## Solution - ReLU (Rectified Linear Unit)

> **Nonsaturating** 활성화 함수인 **Relu**를 사용한다. **양수 값에 대해서 수렴하지 않는다. 그리고 계산이 빠르다.**

**ReLU(z) = max(0, z)**

<br />

<div style="text-align:center">
  <img src="https://user-images.githubusercontent.com/33220404/145667458-d8a07aa6-2a8d-4d30-93c1-10da46334804.png" width="700">
</div>

<br />

그러나 **dying ReLUs**로 알려진 문제가 있다. 훈련하는 동안 일부 뉴런이 0 이외의 값을 출력하지 않는 것으로, 훈련 중에 일부 뉴런이 죽는다.

- 모든 샘플에 대해 입력의 가중합이 음수 = 뉴런 죽음

  input의 가중합이 음수이면 ReLU 함수의 그레디언트가 0이 되므로 경사 하강법이 더는 작동하지 않는다.

이러한 문제의 해결을 위해 ReLU의 변종들을 사용한다.

<br />

### Leaky ReLU

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145668183-eff6b6fb-51cb-40bc-bd7e-7e58f1372dc4.png" width="500">
</div>

**LeakyReLU(Z) = max(αz, z)**

하이퍼 파라미터 α(z < 0 일 때 함수의 기울기)가 함수의 "leaks"를 결정한다. 일반적으로 α = 0.01(조금 통과), 0.2(많이 통과)를 사용한다.

<br />

### Parametric leaky ReLU (PReLU)

훈련하는 동안 α가 학습된다. 하이퍼파라미터가 되는 대신 다른 파라미터와 마찬가지로 역전파로 수정할 수 있는 파라미터가 된다.

**PReLU**는 대규모 이미지 데이터 세트에서 ReLU보다 훨씬 우수한 성능을 보이는 것으로 알려져 있다.

하지만, **더 작은 데이터 세트는 훈련 세트에 과적합될 위험이 있다.**

<br />

### Exponential linear unit (ELU)

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145668591-4d615af4-8c54-4728-b26f-00c93aed2218.png" width="400">
  <img src="https://user-images.githubusercontent.com/33220404/145668555-37c3860d-a5c2-40bf-9c0c-fe15131b4e8c.png" width="500">
</div>

**z < 0**일 때 음수 값이 output 되므로 활성화 함수의 평균적인 출력값이 0에 더 가까워진다. 이는 그레디언트 소실 문제를 완화해 준다.

- α는 z가 큰 음수 값일 때 ELU에서 수렴할 값을 정의한다. (보통 1로 설정)

**z < 0**에 대해 그레디언트가 0이 아니므로 죽은 뉴런을 만들지 않는다.

- α가 1이면 이 함수는 z = 0 에서 급격히 변동하지 않으므로, 모든 구간에서 매끄러워 경사하강법의 속도를 높여준다.

주요 단점으로, **지수함수를 사용**하므로 ReLU나 다른 변종들보다 계산이 느리다는 단점이 있다.

<br />

### Scaled ELU (SELU)

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145668834-d1b031de-24c8-4d83-9b6f-4dfbc6c5c461.png" width="500">
</div>

**스케일이 조정된 ELU 함수**로, 특정 조건 하에 네트워크의 **Self-normalization(자기 정규화)** 를 보장한다.

- **Self-normalization**

  **훈련하는 동안 각 층의 output이 평균 0과 표준편차 1을 유지**하는 경향이 있다. 이는 그레디언트 소실과 폭주를 방지한다.

  - 조건:

    - 입력 기능은 표준화되어야 한다.

    - 모든 은닉층의 가중치는 LeCun 일반 초기화로 초기화해야 한다.

    - 네트워크 아키텍처는 순차적이어야 한다.

결과적으로, SELU 활성화 함수는 깊은 신경망에 대한 다른 활성화 함수보다 성능이 훨씬 뛰어난다.

<br />

## Batch Normalization (BN)

> 입력을 원점에 맞추고 정규화한 뒤, 각 층에서 scale 파라미터와 offset 파라미터를 이용해 scale을 조정하고 이동시킨다. 이는 각 층의 활성화 함수 출력값이 정규분포를 이루도록 데이터를 변환한다. 

이 기법은 각 은닉층의 활성화 함수 직전 또는 직후에 모델에 연산을 추가하는 것으로 구성된다.

<br />

### BN layers within DNN

```python
model = keras.models.Sequential([
    keras.layers.Flatten(input_shape=[28, 28]),
    keras.layers.BatchNormalization(),  # 매 레이어마다 유독 튀는 sample을 잡기 위해
    keras.layers.Dense(300, activation="relu")
    keras.layers.BatchNormalization(),  
    keras.layers.Dense(100, activation="relu")
    keras.layers.BatchNormalization(), 
    keras.layers.Dense(10, activation="softmax")
])
```

<br />

# Faster Optimizers

<hr />

## Another problem in training DNN

매우 큰 심층 신경망을 훈련하는 것은 고통스러울 정도로 느릴 수 있다. (ReLU를 사용하더라도)

이를 해결하기 위해, 일반 Gradient Descent Optimizer보다 빠른 Optimizer를 사용하여 속도를 크게 향상시킨다.

- **Momentum optimization**, Nesterov, Accelerated Gradient, AdaGrad, **RMSProp**, **Adam** 및 Nadam.

<br />

## Momentum Optimization

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145669352-0b16cb28-6a06-4c46-89d2-48b8cf01ba68.png" width="500">
</div>

**모멘텀 최적화는 이전 기울기가 무엇인지에 대해 많은 관심을 기울인다.** 이전 상태 값에 영향을 받는 **모멘텀 벡터를 사용**하여 최적점에 도달시까지 빠르게 가속한다.

- 각 반복에서 운동량 벡터 m(학습률 η를 곱한 값)에서 로컬 기울기를 뺀다. 그리고 이 **모멘텀 벡터를 추가**하여 가중치를 업데이트한다.

- 하이퍼 파라미터 β를 사용하여 최적점 근처에서 진동을 줄여 빠르게 수렴되도록 한다. 

<br />

## RMSprop

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145669531-59b121c1-745b-44d1-af26-5980fa752c0b.png" width="300">
</div>

**RMSprop 알고리즘**은 지수 가중 이동 평균을 이용하여 이전 **그레디언트의 영향력을 지수적으로 감소**시킨다.

**RMSProp 알고리즘은 가장 최근 반복의 기울기만 누적한다.**

- 첫 번째 단계에서 지수 decay(감쇠)를 사용하여 수행한다.

- 감쇠율 β는 일반적으로 0.9로 설정된다.

<br />

## Adam

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145669683-f73404f2-d699-49d7-a17c-bddfd0c7f084.png" width="700">
</div>

**Adaptive moment estimation (Adam)은 모멘텀 최적화와 RMSprop의 아이디어를 합친 것이다.** (가속도, 스케일링 개념을 모두 사용)

- **모멘텀 최적화**와 마찬가지로 **past gradients**의 기하급수적으로 감소하는 평균을 추적한다.

- **RMSprop**과 마찬가지로 **past squared gradients**의 기하급수적으로 감소하는 평균을 추적한다.

<br />

# Avoiding Overfitting by Regularization

> 심층 신경망은 수만 개, 수백만 개의 파라미터를 가지고 있어 **자유도가 매우 높아** 복잡한 데이터셋을 학습할 수 있다. 그렇기에 네트워크를 훈련 세트에 **Overfitting(과적합)** 되기 쉽게 만든다. ➡️ **Regularization(규제)** 의 필요성

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145669788-8c19ac93-c89a-440c-b396-4cb0280dd801.png" width="700">
</div>

선형 모델에 적용하듯이 신경망의 연결 가중체 제한을 위해서라도 l1, l2 규제를 사용할 수 있다.

- l1 loss = |θ1| + |θ2|

- l2 loss = θ1^2 + θ2^2

➡️ 다른 쪽 파라미터를 0으로 만들려는 습성으로 파라미터를 줄인다.

<br />

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/145669840-f26a01c8-8d7f-432d-93da-2214dd9a5bee.png" width="600">
</div>

<br />

## Dropout

> 매 훈련 단게에서 모든 뉴런들에 대해 일정 확률 p로 훈련에서 제외시키고 나머지 뉴런들로만 훈련하는 방식이다.

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/145669917-b5183c68-8a7d-42a5-b38b-11c134a861e9.png" width="400">
</div>

하이퍼 파라미터인 드롭아웃 비율 p는 보통 10 ~ 50% 사이로 지정한다. 

**제외된 뉴런들의 출력값을 0으로 하여 일부러 학습을 시키지 않는다. 이는 정확도가 낮아지지만 과적합을 낮춘다.**

훈련 종료 후 예측, 테스트 시에는 적용되지 않는다.

<br />

# Find Best Model: 학습 조기중단(Early stopping)

<hr />

```python
model = Sequential()
model.add(Dense(30, input_dim=12, activation='relu'))
model.add(Dense(12, activation='relu'))
model.add(Dense(8, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# 모델 업데이트 및 저장
modelpath = "./model"
checkpointer = tf.keras.callbacks.ModelCheckpoint(
    filepath=modelpath,
    monitor='val_accuracy',
    save_best_only=True 
)

# 자동 중단 설정
early_stopping_callback = EarlyStopping(monitor='val_loss', patience=100)

# 모델 실행
model.fit(X, Y validation_split=0.2, epochs=2000, batch_size=500, callbacks=[early_stopping_callback])
```

## 결과(모델저장)

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145670195-d8b5a8a4-83c7-451a-80e9-9b9d12f63722.png" width="700">
</div>

## 결과(조기중단)

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145670224-258c1ed1-3ad8-416a-adea-ca19d602f2cc.png" width="700">
</div>

**➡️ 과적합을 방지한다.**

<br />
<br />

**Source:**

📖 모두의 딥러닝, 2/E, 2020

📖 핸즈온머신러닝, 2/E, 2020 (번역)
