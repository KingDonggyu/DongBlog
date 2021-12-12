---
date: "2021-12-12"
title: "[Deep Learning] Famous CNN Architectures"
category: "Data Science"
categoryColor: "seagreen"
tags: ["AI", "DL"]
thumbnail: "./images/DL.jpeg"
---

# 기존 CNN Archi.

<hr />

## LeNet-5

가장 널리 알려진 MNIST을 위한 CNN 아키텍처이다.

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145699264-1f4f88e8-1867-4362-aa13-90ee8b3e0de0.png" width="500">
</div>

입력 레이어는 **제로 패딩**을 추가하며 (Through MNIST = 28\*28), 다른 레이어는 패딩을 사용하지 않는다.

**Avg pooling**은 보통보다 복잡하다. 이를 위해서는 더 많은 weights/bias가 필요하다. (!=recent avg pooling)

출력 레이어는 **Euclidian distance**를 계산한다. (지금은 **cross-entropy**를 더 선호한다. - 더 큰 기울기 생성 및 더 빠르게 수렴)

<br />

## AlexNet, 2012 (Univ. of Toronto)

**ReLU** 활성화 함수를 사용하며, Local response **normalization** scheme이다.

**Max pooling**을 사용한 **Overlapping(중첩) pooling**을 적용한다. (커널 크기 > 스트라이드)

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145699443-88dda09e-9696-4224-ab03-dd0725a6f5cb.png" width="500">
</div>

LeNet-5와 유사하며, 훨씬 더 크고 깊다.

**각 컨볼루션 레이어 위에 풀링 레이어를 쌓는 대신, 컨볼루션 레이어를 서로의 맨 위에 직접 쌓은 최초의 제품이다.**

과적합을 줄이기 위해 두 가지 정규화 기술을 사용한다.

- **Dropout** : In layers F9 and F10

- **Data augmentation(증식)** : 다양한 오프셋으로 훈련 이미지를 무작위로 이동, 수평으로 뒤집기, 조명 조건 변경 등 **레이블이 같은 데이터를 더 증식한다.**

<br />

## VGGNet, 2014

**매우 간단**하고(이해하고 구현하기) 고전적인 아키텍처로, **2 또는 3개의 컨볼루션 레이어 + 풀링 레이어** 패턴을 반복한다.

<br />

# Network in Network

<hr />

## GoogLeNet, 2014 (Inception-v1)

**Inceotion module** 이라는 subnetworks를 통해 이전의 구조보다 효과적으로 파라티머를 사용한다.

**GoogLeNet은 실제로 AlexNet보다 10배 적은 매개변수를 갖지만 훨씬 더 깊다. 즉, 더 복잡하지만 가볍다.**

<br />

### Inception module

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145699705-4aecb893-a667-47cb-8ae3-4539a0055056.png" width="500">
</div>

- 3 × 3 + 1(S)는 레이어가 3 × 3 커널, 스트라이드 1 및 "same" 패딩을 사용함을 의미한다.

- 처음에 입력 신호가 복사되어 네 개의 다른 레이어에 주입된다.

- 두 번째 컨불루션 레이어는 각기 다른 커널 크기(1\*1, 3\*3, 5\*5)를 사용하여 다른 크기의 패턴을 잡는다.

- 모든 층은 스트라이드 1과 same 패딩을 사용하므로 **출력의 높이와 너비가 모두 같다.** **따라서 모든 출력을 깊이 연결 레이어에서 깊이 방향으로 연결할 수 있다.**(위쪽 네 개의 컨볼루션 레이어에서 feature maps을 쌓는다.)

<br />

그렇다면 **1x1+1** 컨볼루션 레이어가 필요한 이유는 무엇일까?

- 깊이 차원을 따라 놓인 패턴을 잡을 수 있다.

- **입력보다 더 적은 feature maps를 출력**하므로 **bottleneck(병목) layer** 역할을 담당한다 (차원⬇️). 이는 연산 비용과 파라미터 개수를 줄여 훈련 속도를 높이고 일반화 성능을 향상시킨다.

- 컨볼루션 레이어의 쌍([1x1 and 3x3] or [1x1 and 5x5])이 더 복잡한 패턴을 감지할 수 있는 한 개의 강력한 컨볼루션 레이어처럼 작동한다.

**➡️ 여러 크기의 복잡한 패턴이 담긴 feature maps를 출력하는 컨볼루션 레이어의 역할 (차원 축소 담당)**

<br />

### Architecture

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145700051-add1ed37-8bd7-47c4-85bb-e9b1fb090012.png" width="500">
</div>

<br />

<span style="color: red;">Part A</span>

- **1st two layers**:

  - Reduce w & h by 4(totally by 16)

  - Use large kernel(7\*7)

- **LRN** 사용

  (경쟁적인 정규화 단계, 가장 강하게 활성화된 뉴런이 다른 특성 맵에 있는 같은 위치의 뉴런을 억제한다. 특성 맵을 각기 특별하게 다른 것과 구분되게 하고, 더 넓은 시각에서 특징을 탐색하도록 해 일반화 성능을 향상시킨다.)

- **2nd Conv layers**:

  - bottleneck layer처럼 작동한다.

  - 쌍을 하나의 더 스마트한 컨볼루션 레이어라 생각하면 된다.

- **LRN** 사용

- **Max pool**

  - Reduces size w/ kernel 2

  - For acceleration(가속)

<br />

<span style="color: purple;">Part B</span>

- 9 **inception modules**

- **Global avg pool**

  - 큰 공간 정보를 삭제한다. = dimensionality reduction.

- Totally, 4 max pool + 1 conv w/ stride 2

  - 224 x 224 ➡️ 7 x 7, 감소된 매개변수로 과적합이 제한되고, 밀도가 낮은 레이어를 가질 수 있다 (Sparse net).

- Last: Dropout, Dense, Softmax

<br />

# Residual Learning

<hr />

## ResNet, 2015 (Microsoft Research)

더 적은 파라미터를 사용해 더 깊은 네트워크로 모델을 구성하는 트렌드를 만들었다.

**깊은 네트워크를 훈련시킬 수 있는 핵심 요소는 skipping connections로 의한 residual(잔차=차이값) learning이다.**

<br />

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145700404-2a0eb781-0dee-4ba4-87b0-07dd7bfc94b0.png" width="500">
</div>

본래 신경망을 훈련시킬 때 목적함수 h(x)를 모델링하는 것이 목표이다. **residual learning은 입력 x를 네트워크 출력에 더하여(스키핑 연결 추가) 네트워크는 h(x) 대신 f(x) = h(x) - x 를 학습하게 만든다.**

- 일반적인 신경망을 초기화할 때는 가중치가 0에 가깝기 때문에 네트워크도 0에 가까운 값을 출력한다.

- **스키핑 연결을 추가하면** 신경망 초기화시 네트워크는 입력과 같은 값을 출력하게 된다.

- 즉, 잔차 학습에서 얻고자 하는 출력값은 **f(x) = h(x) - x** 이고, 모든 레이어에서 **그레디언트가 (f'(x)+1 이기 때문에) 최소 1 이상은 갖게된다.**

  ➡️ **gradient vanishing 문제 해결**

- 목적 함수가 identity(항등) 함수에 매우 가깝다면 훈련 속도가 매우 빨라진다.

<br />

<div style="text-align:center">
  <img src="https://user-images.githubusercontent.com/33220404/145700633-6f207c11-60db-4bb5-a3bb-43d502b3e657.png" width="700">
</div>

(위 이미지는 일반적인 심층 신경망(왼쪽)과 심층 잔차 네트워크(오른쪽)을 나타낸다)

- 스키핑 연결을 많이 추가하면 일부 층이 학습되지 않았더라도 트레이닝이 시작 가능하다.

- 스키핑 연결로 입력 신호가 전체 네트워크에 쉽게 영향을 미친다.

- **심층 잔차 네트워크는 스키핑 연결을 가진 작은 신경망인 residual units(RUs)를 쌓은 것이다.**

<br />

### Architecture

<div style="text-align:center">
  <img src="https://user-images.githubusercontent.com/33220404/145700762-30ee0ac5-8969-44b2-98c2-d87c33e9e6a2.png" width="600">
</div>

- 드롭아웃 레이어 제외 GoogLeNet과 똑같지만, 중간에 단순한 잔차 유닛을 깊게 쌓았다.

- **각 RU는 Batch Norm, ReLU, 3\*3 커널을 사용하고 공간 정보를 유지하는 (스트라이드 1, 제로패딩) 두 개의 컨볼루션 레이어로 이루어져있다.**

문제점으로, 몇 개의 RU마다 feature map 수는 두 배로 늘어나고 높이, 너비는 절반이 된다 (스트라이드 2). 이는 입력과 출력의 크기가 다르기 때문에 입력이 RU의 출력에 바로 더해질 수 없다.

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145700919-be13bbc9-84eb-4edf-9db0-201c8b4dd86f.png" width="400">
</div>

**feature map 크기 및 깊이를 변경할 때 스키핑 연결에 대한 솔루션으로, 스트라이드가 2인 1\*1 컨볼루션 레이어를 통해 입력을 전달한다.**

<br />

# Squeeze + Excitation

<hr />

(Excitation: 들뜬상태(에너지가 높은 준위로 옮아가는 현상))

## SENet

inception 네트워크와 ResNet 같은 기존 구조를 확장한 것으로, 원래 구조에 있는 모든 유닛(모든 인셉션 모듈이나 모든 잔차 유닛)에 **SE block이라는 신경망을 추가했다.**

**SE block의 역할은 유익한 feature을 선택적으로 강조하면서, 덜 유용한 feature를 억제하는 것이다.**

<div style="text-align:center">
  <img src="https://user-images.githubusercontent.com/33220404/145701094-dd5fb256-8826-4145-930c-e6dff4a1f9ed.png" width="500">
</div>

- SE 블록이 추가된 부분의 유닛의 출력을 깊이 차원에 초점을 맞추어 분석한다.

- **어떤 feature가 일반적으로 동시에 가장 크게 활성화되는지 학습한다.**

- 그 후 이 정보를 사용하여 feature maps을 보정한다.

- 예를 들어, SE 블록이 그림의 입, 코, 눈을 학습할 수 있을때, 그림에서 입과 코를 보았다면 눈도 볼 수 있다고 기대하여 입과 코 feature map이 강하게 활성화되고 눈 feature map만 크게 활성화되지 않았다면 이 블록이 눈 feature map의 출력을 높인다. (= 관련없는 feature map 값을 줄인다.)

<br />

### SE block architecture (three layers)

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145701207-0b87f702-01ec-4f14-98d7-1fc3a6ca29d3.png" width="300">
</div>

하나의 SE 블록은 3개의 레이어로 구성되어 있다.

- **Global Avg Pooling Layer**

  - 각 피처 맵에 대한 평균 활성화 값을 계산한다. 256개의 피처 맵을 가진 입력이라면, 각 필터의 전반적인 응답 수준을 나타내는 256개의 숫가자 출력된다.

- **ReLU 활성화 함수를 사용하는 Dense Hidden Layer**

  - 이전보다 훨씬 더 적은 뉴런을 가진 레이어로, 압축이 계속 일어난다. 일반적으로 feature 맵 개수보다 16배 적어, 256개의 숫자가 작은 벡터로 압축된다.

  - 이 저차원 벡터(하나의 임베딩)는 feature 응답의 분포를 표현한다. SE 블록이 feature 조합에 대한 일반적인 표현을 학습하게 된다.

  **➡️ Squeeze**

- **Sigmoid 활성화 함수를 사용하는 Dense Output Layer**

  - 이전 레이어에서의 임베딩을 받아 feature 맵마다 (시그모이드를 통해) 0~1 사이의 하나의 숫자를 담은 보정된 벡터를 출력한다.

  - 그 다음 feature 맵과 이 보정된 벡터를 곱해 관련 없는 feature값을 낮추고 관련있는 feature값은 그대로 유지한다. **즉, 채널들의 중요도에 따라 scaling한다.**

  **➡️ Excitation**, 이 과정에서 관련없는 feature값을 낮춤으로써 성능 향상을 이룰 수 있다.

<br />
<br />

**Source:**

📖 핸즈온머신러닝, 2/E, 2020 (번역)
