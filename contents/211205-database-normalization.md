---
date: "2021-12-05"
title: "[Database] Nomalization of Relations"
category: "Data Science"
categoryColor: "seagreen"
tags: ["DB"]
thumbnail: "./images/DB.png"
---

> Normalization(정규화)는 관계를 취하고 그 관계가 normal form(정규형)을 만족하는지 확인하기 위해 일련의 테스트를 실행한다. 불만족스러운 "bad" 관계의 속성을 "smaller" 관계로 분해하는 과정이다.

**결과 설계의 품질이 우수하고 <u>(1) 중복 최소화</u> 및 <u>(2) 업데이트 이상 현상 최소화</u>를 충족하도록 실제로 수행한다.**

**Denormalization(비정규화)** 는 상위 정규형 관계의 join을 하위 정규형의 기본 관계로 저장하는 과정이다.

<br />

# Normal Form (NF)

<hr />

> 관계의 스키마가 특정 정규 형식인지 여부를 인증하기 위해 해당 관계의 키와 FD를 사용하는 관계의 조건을 의미한다.

- 관계가 충족하는 가장 높은(정규 형식) 조건을 나타낸다.

- 관계가 "정규화"된 정도를 나타낸다.

<br />

**The level of NF**

- 1NF, 2NF, 3NF 및 Boyce-Codd NF(BCNF)(3NF의 더 강력한 정의): 관계 스키마의 키 및 FD 기반

- (4NF, 5NF도 있지만 생략하겠다.)

<br />

데이터베이스 설계자는 **가능한 가장 높은 정규화 형식으로 정규화할 필요가 없다**(성능으로 인해).

- 실제로는 일반적으로 최대 3NF 및 BCNF가 사용되고, 4(5)NF는 거의 사용되지 않는다.

<br />

# First Normal Form (1NF)

<hr />

> 기본(평면) 관계형 모델에서 관계의 형식적 정의의 일부로 간주된다. Primary Key를 이용하여 관련 데이터의 각 집합을 고유하게 식별할 수 있어야 한다.

다음을 금지한다.

- **Composite attributes**

- **Multi-valued attributes (MVAs)**

- **Nested relations (NRs)**

  - 개별 튜플의 값이 **non-atomic**인 속성: 단일 튜플에 대한 값 집합, 값 튜플 또는 둘의 조합

  - 관계 내의 관계 또는 튜플 내의 속성 값으로서의 관계

**대부분의 RDBMS는 1NF에 있는 관계만 정의할 수 있다.**

<br />

## Normalization into 1NF for (1) an MVA - Example

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144735154-5605f25b-f325-488c-939d-1d6c9354df73.png" width="800px">
</div>

<br />

**1. 1NF를 위반하는 속성 Dlocations를 제거하고 별도의 관계에 배치한다.**

<br />

<div>
  <img src="https://user-images.githubusercontent.com/33220404/144735312-78f18396-008f-451e-b1c4-dd881c71ba10.png" width="200px">
</div>

<br />

- 가장 좋은 것으로 간주된다. ➡️ **튜플들 간 중복 최소화**

<br />

**2. DEPARTMENT의 각 위치에 대해 원래 DEPARTMENT 관계에 별도의 튜플이 있도록 키를 확장한다.**

- {Dnumber, Dlocation}: 기본 키 역할을 한다.

- 권장되지는 않는다.

<br />

**3. 속성에 대해 최대 값(예: m)이 알려진 경우 속성을 m 속성으로 대체한다.**

- ex) At most 3 locations -> Dloc1, Dloc2, Dloc3 attributes

- 권장되지는 않는다.

<br />

## Normalization for (2) Nested Relations - Example

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144735360-ae444eb7-6dcf-485a-9edc-7e9546d71312.png" width="800px">
</div>

<br />

## (Non)Prime Attributes - 2NF를 알아보기 전 참고

관계 스키마에 하나 이상의 (**super**) **key**가 있는 경우 각각을 **candidate key**라고 한다.

- **Key**: r(R)에서 t1[SK] ≠ t2[SK]와 같은 **minimal superkey**(SK)

**Primary Key**: candidate 키 중에서 임의로 지정

- **Secondary keys**: 다른 candidate 키

<br />

**Prime Attribute**: 일부 **candidate key의 구성원**이어야 한다.

**Nonprime Attribute**: Prime Attribute이 아니다. 즉, candidate key의 구성원이 아니다.

<br />

# Second Normal Form (2NF)

<hr />

> full functional dependency의 개념을 기반으로 한다. 모든 속성이 full functional dependency을 만족해야 한다.

**FD X ➡️ Y는 X에서 속성 A를 제거하는 것이 종속성이 더 이상 유지되지 않는다는 것을 의미하는 경우 full functional dependency(완전 기능 종속성)이다.**

- **Full dependency(완전 종속성)** : 즉, X는 (X – {A})인 경우 기능적으로 Y를 결정하지 않는다.

- **Partial dependency(부분 종속성)** : X에서 일부 속성을 제거할 수 있는 경우에도 종속성이 여전히 유지되는 경우이다.

<br />

**<u>relation R의 모든 nonprime 속성 A가 R의 기본 키에 완전히 기능적으로 종속되어 있으면 관계 R은 2NF에 있다.</u>**

<br />

## Normalizing into 2NF

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144736443-1b9debf9-dfdc-4e2f-80c2-0c81d5f70537.png" width="700px">
</div>

<br />

“**Normalization of 2NF”: decomposed into 2NF relations**

<br />

# Third Normal Form (3NF)

<hr />

> transitive functional dependency 개념을 기반으로 한다. Primary Key가 아닌 속성들은 Primary Key에만 의존해야 한다.

R의 FD X ➡️ Z는 X ➡️ Y, Y ➡️ Z의 두 FD에서 파생될 수 있다.

- Y(속성 집합): 후보 키도 아니고 R 키의 하위 집합도 아니다.

<br />

**<u>관계 R은 2NF를 만족하고 R의 nonprime 속성이 R의 기본 키에 이행적으로(transitively) 종속되지 않는 경우 3NF이다.</u>**

<br />

## Normalizing into 3NF

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144736714-670b36a0-7b05-4ae2-b487-f0103cd03ee5.png" width="700px">
</div>

<br />

**“Normalization of 3NF”: decomposed into 3NF relations**

<br />

# Normal Forms Defined Informally

<hr />

**1NF**

- 키 일부 또는 전체에 대해서 의존한다.

- FD가 없다.

<br />

**2NF**

- 키 전체에 대해서 의존한다.

- 단, transitive property에 의해, 다른 nonprime attribute에 대한 의존성 있을 수 있다.

<br />

**3NF**

- 모든 속성이 키 외에 의존하는 것이 없다.

<br/>

\*좌변이 PK의 일부이거나 키가 아닌 속성인 모든 FD는 문제가 된다.

**➡️ 이 문제는 원래 관계를 새로운 관계로 분해하여 2NF와 3NF의 정규화에서 해결할 수 있다.**

<br />

# Boyce-Codd Normal Form(BCNF)

<hr />

> FD X ➡️ A가 R에 있을 때마다 X가 R의 수퍼키인 경우, 관계 R은 BCNF에 있다.

각 normal form은 이전 형식보다 엄격하게 강하다.

- 모든 2NF 관계는 1NF에 있다.
- 모든 3NF 관계는 2NF에 있다.
- 모든 BCNF 관계는 3NF에 있다.

<br />

**관계 디자인의 목표는 BCNF(또는 3NF)에서 각 관계를 갖는 것이다.**

<br />

## Example of BCNF Normalization

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144737465-e06b329c-c7ab-4498-a60c-c5e7ae1d0ed7.png" width="700px">
</div>

<br />

**BCNF 정규화를 통해** LOTS1A의 여러 튜플에서 동일한 정보(from ... Country_name|...|Area)를 **반복하는 중복성을 줄일 수 있다.**

<br />

## Another Example of a Relation in 3NF But Not in BCNF

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144737733-68c9873e-c326-4656-af0b-a4a63bab1885.png" width="350px">
</div>

<br />

- TEACH에는 2개의 FD가 있다.

  - FD1: {Student, Course} ➡️ {Instructor}
  - FD2: {Instructor} ➡️ {Course}

<br />

- {Student, Course}: **TEACH의 후보 키(수퍼키)** 이다.

  - Instructor: **non-prime** 속성.

  - 그래서 transitive(전이) FD가 존재한다.

<br />

- **BCNF에 속하지 않는 관계는 BCNF의 속성에 맞도록 분해되어야 한다.**

<br />

**How to Achieve BCNF? Decomposition!**

- 관계 TEACH에 대한 세 가지 가능한 분해:

  - D1) R1(Student, Instructor) and R2(Student, Course)
  - D2) R1(Course, Instructor) and R2(Course, Student)
  - D3) R1(Instructor, Course) and R2(Instructor, Student)

  => 그러나 세 FD 모두 FD1을 잃었다. **BCNF에서 만들기 위해 여러 FD가 있는 경우 FD 보존을 희생해야 한다.**

  - 그러면 어떤 분해를 선택해야 할까?

    - 정규화 과정에서 두 가지 분해 속성을 보존하기 위해 하나를 선택한다.

      => non-additive (lossless) join property (희생할 수 없음)과 기능적 종속성 보존 속성

  - D3) **NJB(Nonadditive Join Test for Binary Decomposition)를 통과하면 원하는 분해가 된다.**

<br />

## NJB (Non-additive Join Test for Binary Decompositions)

> R의 분해 D = {R1, R2}는 R에서 FD의 집합 F에 대해 lossless(non-additive) join 속성을 가진다.

- The FD ((R1 ∩ R2) ➡️ (R1 – R2)) is in F+, or

- The FD ((R1 ∩ R2) ➡️ (R2 – R1)) is in F+,

- 여기서 F+는 F가 암시하는 모든 FD를 포함한다.

<br />

D1) **R1(Student, Instructor)** and **R2(Student, Course)** 

- Both `Student ➡️ Instructor` and `Student ➡️ Course` are **false**. 

D2) **R1(Course, Instructor)** and **R2(Course, Student)**

- Both `Course ➡️ Instructor` and `Course ➡️ Student` are **false**. 

D3) **R1(Instructor, Course)** and **R2(Instructor, Student)**

- `Instructor ➡️ Course` (= FD2) ⊆ F+

- **NJB 속성이 만족된다. 따라서 D3는 non-additive decomposition으로 선택된다.**

<br />

## BCNF Decomposition Algorithm

1. Let R be the relation not in BCNF.

2. Let X ⊆ R.

3. Let X ➡️ A be the FD, **causing a violation of BCNF.**

4. 그러면 R은 두 가지 관계로 분해될 수 있다. 

<div>
  <img src="https://user-images.githubusercontent.com/33220404/144738726-d7d25224-3b76-4d55-9eb3-478370e27e2c.png" width="350px">
</div>

5. (i) 또는 (ii)가 **BCNF에 없으면 분해 과정을 반복**한다. 그렇지 않으면 알고리즘을 종료한다.

<br />

# The Hierarchy of Normal Forms

<hr />

<div style="text-align:center">
  <img src="https://user-images.githubusercontent.com/33220404/144739037-8f9192d1-fb36-4bcc-adbe-9a6e5f46d369.png" width="700px">
</div>

<br />

**Denormalization은 성능 여부 때문에 이용될 수 있다.**
