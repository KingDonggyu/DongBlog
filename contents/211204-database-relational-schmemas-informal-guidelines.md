---
date: "2021-12-04"
title: "[Database] Informal Guidelines For Relational Schemas"
category: "Data Science"
categoryColor: "seagreen"
tags: ["DB"]
thumbnail: "./images/DB.png"
---

> Informal Guidelines For Relational Schemas는 관계 스키마 설계의 quality를 결정하는 척도로 사용 가능하다.

- 속성의 의미(semanitcs) 확인

- 튜플의 중복 정보 줄이기

- 튜플에서 NULL 값 줄이기

- 비논리적(illogical) 튜플 생성 가능성 허용하지 않기

**이러한 조치는 항상 독립적이지는 않다.**

# G1) 관계의 속성에 명확한 의미 부여

<hr />

> **Guidenline 1: 비공식적으로(Informally) 관계의 각 튜플은 하나의 엔터티 또는 관계 인스턴스를 나타내야 한다.** (개별 관계 및 해당 속성에 적용된다.)

- 서로 다른 엔터티의 속성은 동일한 관계에서 혼합되어서는 안된다.

- 다른 엔터티를 참조하려면 외래 키(foreign keys)만 사용해야 한다.

- 엔터티 및 관계 속성은 가능한 한 멀리 떨어져 있어야 한다.

➡️ **관계별로 쉽게 설명할 수 있는 스키마를 설계한다.**

➡️ **속성의 의미는 해석하기 쉬워야 한다.**

<br />

ex) A **simplified** COMPANY relational database schema

<div>
  <img src="https://user-images.githubusercontent.com/33220404/144704894-70f36ea4-d074-498f-8446-ce20a8629a1d.png" width="300px">
</div>

<br />

# G2) 튜플의 중복 정보 최소화 및 이상 현상 업데이트

<hr />

> Guideline 2: Insertion, Deletion, Update Anomalies(이상)을 겪지 않는 스키마를 설계한다. (이상이 있는 경우 애플리케이션에서 이를 고려할 수 있도록 기록한다.)

**base 관계 및 해당 파일에서 사용하는 저장 공간을 최소화한다.** (초점은 가상 관계가 아닌 파일로, 물리적으로 저장된 기본 관계에 있다.)

- 정보가 **중복(redundantly)** 저장되는 경우 스토리지를 낭비하고, 더 근본적으로 **update anomalies(갱신 이상)** 문제를 일으킨다.

  - **Modification (or update) anomalies** (수정 이상)
  - **Insertion anomalies** (삽입 이상)
  - **Deletion anomalies** (삭제 이상)

<br />

## Example of an <u>Modification Anomaly</u>

EMP_PROJ라는 이름의 관계 고려한다. (**NATURAL JOIN**을 EMP., PROJ., WOR에 적용한 후 Projection 결과)

<br />

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/144705343-092853ed-85ce-4003-81f1-2dbec7cc01eb.png" width="400px">
</div>

<div style="text-align: center;">
  (FD: Function Dependency)
</div>

<br />

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/144705452-b3965bf8-f396-4c0b-af78-4b0bb4b90ef4.png" width="600px">
</div>

<br />

- 프로젝트 번호 10의 이름을 "Computerization"에서 "Customer-Accounting"으로 변경

  - 이 업데이트를 "모든" 직원을 대상으로 해야할 수 있다. (ex. '333...', '999...', '987...', 프로젝트 번호 10에서 작업 중)

  ➡️ **하나를 수정하면 다른 튜플들도 찾아 전부 수정해줘야 한다.**

<br />

## Example of an <u>Insert Anomaly</u>

EMP_PROJ라는 이름의 관계를 고려한다. (**NATURAL JOIN**을 EMP., PROJ., WOR에 적용한 후 Projection 결과)

<br />

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/144705623-9947b84b-60c9-4c20-80cd-bdc0f762d21d.png" width="400px">
</div>

<br />

- 한편으로 직원이 할당되지 않는 프로젝트를 삽입할 수 없다. (Ssn 모름)

- 반대로 프로젝트에 배정되지 않는 한 직원을 삽입할 수 없다. (Pnumber 모름)

➡️ **엔티티 무결성 제약조건에 위배된다.**

<br />

## Example of an <u>Delete Anomaly</u>

EMP_PROJ라는 이름의 관계를 고려한다. (**NATURAL JOIN**을 EMP., PROJ., WOR에 적용한 후 Projection 결과)

<br />

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/144705623-9947b84b-60c9-4c20-80cd-bdc0f762d21d.png" width="400px">
</div>

<br />

- 프로젝트가 삭제되면 해당 (특정) 프로젝트에서 작업하는 "모든" 직원이 삭제된다.

- 또는 직원이 프로젝트의 "유일한" 직원인 경우 해당 직원을 삭제하면 해당 프로젝트가 삭제된다.

➡️ **종속성 문제**

<br />

## Another Example Suffering from the <u>Update Anomalies</u>: EMP_DEPT=EMP.\*DEPT.

<br />

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/144705866-a5c7985f-4dfd-4012-838b-6a1969c29534.png" width="700px">
</div>

<br />

그러나 EMP_DEPT 및 EMP_PROJ는 **성능상의 이유로 base 관계로 저장될 수 있다.**

- 예를 들어, **매번 join하는 것은 시간이 많이 걸리므로 Single Table Scan으로 성능을 높일 수도 있다.**

<br />

# G3) 튜플에서 NULL 값을 아껴서 사용

<hr />

> Guideline 3: 속성이 가능한 한 적은 NULL 값을 갖도록 관계를 할당해야 한다. (NULL이 자주 발생하는 속성이 불가피한 경우 PK와 별도의 관계에 배치할 수 있다.)

NULL의 이유는 다음과 같다.

**1) 적용할 수 없는 속성(또는 유효하지 않음)**: 예를 들어 'visa_status'는 한국 학생에게 적용되지 않는다.

**2) 알 수 없는 속성 값(존재할 수 있음)**: 예를 들어 아직 어떤 부서에도 할당되지 않은 직원이 있을 수 있다.

**3) 존재하는 것으로 알려져 있지만 사용할 수 없는(또는 부재) 속성 값**: 예를 들어 home_phone_number가 아직 데이터베이스에 기록되지 않았을 수 있다.

<br />

# G4) Lossless Join 조건 충족

<hr />

> Guideline 4: Lossless(무손실) Join 조건을 충족하도록 관계 스키마를 설계한다.

**관계는 적절하게 관련된 (PK, FK) pairs인 속성에 대한 동등 조건으로 조인되어야 한다.**

- 그렇지 않으면, **Spurious(가짜) 튜플이 생성될 수 있다.**

**어떤 (분해된) 관계의 NATURAL JOIN을 수행하여 가짜 튜플을 생성해서는 안된다.**

<br />

## Generation of Spurious Tuples: Poor Design

<br />

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/144706297-674061bd-39a5-4330-aab9-dfb624891eb1.png" width="700px">
</div>

<br />

Ssn = "123456789"인 직원에 대해서만 **EMP_PROJ1**과 **EMP_LOCS**의 **NATURAL JOIN** 결과

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/144706440-54ab7770-c52b-42a8-8d28-22f8eb48bd9e.png" width="600px">
</div>

<br />

➡️ **같은 Ssn의 서로 다른 정보 발생. 가짜 튜플 생성.**

EMP_PROJ를 EMP_LOCS 및 EMP_PROJ1로 분해하는 것은 바람직하지 않다.

- EMP_LOCS의 경우 EMP_PROJ1은 잘못된 원본 정보를 생성한다.

- Plocation은 둘 중 하나에서 PK도 FK도 아니다.

  - 이는 **PK 또는 FK에 대해 올바른 속성을 선택하는 것이 중요함**을 의미한다.

관계형 데이터베이스에 대한 잘못된 설계는 특정 JOIN 작업에 대해 잘못된 결과를 초래할 수 있다.

➡️ **따라서 join 작업에 대한 의미 있는 결과를 보장하기 위해 "Lossless Join" 조건을 적용해야 한다.**

<br />

## 관계 "decompositions(분해)"의 두 가지 중요한 성질

(이에 대해서는 다음 포스트에서 깊게 다루겠다.)

**1) 해당 조인의 Non-addictive(비중독성) 또는 Lossless(무손실)**

- 특정 조인이 가짜 튜플을 생성하지 않도록 보장하는 **형식적인 조건이 존재**한다.

- **이는 매우 중요하므로 희생하거나 타협할 수 없다.** (사실이 아닌 정보를 만들어내기 때문)

**2) functional dependencies(기능적 종속성) 보존**

- 덜 엄격하므로, 어떠한 이유로 인해서 희생될 수 있다.
