---
date: "2021-12-04"
title: "[Database] Functional Dependencies"
category: "Data Science"
categoryColor: "seagreen"
tags: ["DB"]
thumbnail: "./images/DB.png"
---

# Functinoal Dependency

<hr />

> DB의 두 속성 집합 간의 제약으로, 데이터 속성의 의미와 상호관계에서 파생된다. 관게형 DB 설계의 "좋음"에 대한 공식 측정을 지정하는 데 사용된다.

**Keys는 관계에 대한 normal forms을 정의하는 데 사용된다.**

**속정 집합 X는 X값이 Y에 대한 "unique" 값을 결정하는 경우 <u>기능적으로</u> 속성 집합 Y를 결정한다.**

- 즉, X라는 값을 알면 Y라는 값들의 유일성을 알 수 있다.

- "functionally" ≡ "uniquely"

<br />

Definition: R의 하위 집합인 두 집합 속성 X와 Y 사이의 X ➡️ Y로 표시되는 **Functional Dependency(FD, 기능적 종속성)** 은 **R = {A1, A2, ..., An}**

- t1[X] = t2[X]를 갖는 r(R)의 t1 및 t2 튜플에 대해 t1[Y] = t2[Y]도 있어야 한다.

  - X: FD의 왼쪽, Y: FD의 오른쪽

- **r에 있는 튜플의 Y 구성 요소 값이 X 구성 요소의 값에 의존(또는 결정)된다는 것을 의미한다.**

- X ➡️ Y는 두 튜플이 **X에 대해 동일한 값을 가질 때마다 Y에 대해 동일한 값을 가져야 하는 경우 유지된다.**

- FD는 속성에 대한 real-world 제약 조건에서 파생된다.

<br />

## Example of FD Constraints

- social security number는 employee name을 결정

  - Ssn ➡️ Ename (특정 Ssn x가에서 여러가지 Ename이 있다면 종속성에 해당되지 않는다.)

- project number는 project name과 location을 결정

  - Pnumber ➡️ {Pname, Plocation}

- employee social security number과 project number는 employee가 일하는 hours per week를 결정

  - {Ssn, Pnumber} ➡️ {Hours}

<br />

- FD: 스키마 R의 속성 property

- 제약 조건은 "모든" 관계 인스턴스 r(R)을 유지해야 한다(MUST).

- K가 R의 키인 경우 **K는 기능적으로 R의 모든 속성을 결정한다.** 

  - **동일한 값을 갖는 두 개의 "고유한" 튜플이 없어야 하기 때문이다.** t1[K] = t2[K]

  - **K가 R의 candidate key이면 K ➡️ R**

- **X ➡️ Y라고 해도 R에서 Y ➡️ X인지 아닌지는 말하지 않는다.**

- 요약하면, FD의 주요 용도는 **항상** 보유해야 하는 속성에 대한 제약을 지정하여 관계 스키마 R을 "추가"로 설명하는 것이다.

<br />

## What FDs May Exist?

<br />

<div>
  <img src="https://user-images.githubusercontent.com/33220404/144733815-e62b97c3-e9fd-4bbe-94d7-f478030f8ac4.png" width="400px">
</div>

<br />

B ➡️ C

C ➡️ B

{A, B} ➡️ C

{A, B} ➡️ D

<br />

## Diagrammatic Notation for FDs

<br />

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/144733737-ba52ed07-80bd-4cb3-8319-6f64d973379e.png" width="700px">
</div>