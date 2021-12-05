---
date: "2021-10-15"
title: "[Database] ER Model"
category: "Data Science"
categoryColor: "seagreen"
tags: ["DB"]
thumbnail: "./images/DB.png"
---

> ER(Entity-Relationship) Model은 데이터베이스를 디자인하기 위해 이용되는 모델링 기법으로, 데이터베이스에 대한 요구사항을 그래픽적으로 표현하는 방법이다.

요구사항으로부터 얻어낸 정보들을 **Entity, Attribute, Relation**으로 기술하는 데이터 모델을 말한다.

# Entity

> **Entity**란 ER Model의 기본 개념으로, **단독**으로 존재하는 **객체**를 의미한다.

**ex.** 물리적 존재(사람, 자동차, 집 등) 또는 개념적 존재(회사, 직업, 대학과정 등)

- **Entity Type** : 동일한 기본 Attribute (**Schema**)을 가진 Entity의 Type (ex. EMPLOYEE, COMPANY)
- **Entity Set** : 특정 시점(상태)에 데이터베이스에 있는 특정 **Entity Type**의 모든 Entity 모음 (ex. EMPLOYEE: e1, e2, ..., )

ER 다이어그램에서 **Entity Type**은 **사각형**으로 표현한다.

### Weak Entity

> Entity가 가진 Attribute로는 자신을 고유하게 정의할 수 없는 Entity를 말한다. 즉, 자기 자체로 존재 불가하다.

**특정 Entity와 관련되어 식별된다.** 자기 자신을 위한 **Key Attribute**를 갖지 않는 **Entity Type**이다. (Key Attribute 등 Attribute에 대한 사항은 앞서 다루도록 하겠다.)

**ex.** class - instance (in Java), EMPLOYEE - DEPENDENT

<br />
<br />

# Attribute

> Entity가 갖는 특정 속성을 의미한다.

**ex.** Name, SSN(Social Security Number), address, sex

<br />

- **Composite (합성) Attribute**

  **Attribute**는 여러 Attribue로 구성될 수 있다.

  <div style="text-align: center">
      <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FblZNcq%2FbtqC3PnZXRq%2FjKcMetCrjgkSV4pkuCKPB0%2Fimg.png">
  </div>

<br />

- **Multi-valued (다중 값) Attribute**

  **Entity**는 해당 Attribute에 대해 여러 값을 가질 수 있다.

  **ex.** STUDENT Entity의 PreviousDegrees는 Bachelor, Master's, Ph.D. 등 여러 값을 가질 수 있다.

  위의 예의 경우 **{PreviousDegrees}** 로 표현한다.

<br />

- **Derived (파생) Attribute**

  **저장된 Attribute**에서 값을 파생할 수 있는 Attribute이다.

  **ex.** Number_of_employees of a DEPARTMENT Entity

  **ER 다이어그램에서 원을 점선으로 표현한다.**

<br />

- **Key Attribute**

  각 Entity는 **고유한 값**을 가져야 하는데 이 때, **고유하게 식별**될 수 있는 Attribute이다. **주로 Entity를 식별하는데 사용된다.**

  (Entity Type에 둘 이상의 Key Attribute가 있을 수 있다.)

  **ex.** SSN of EMPLOYEE, Stident_number of STUDENT

  **ER 다이어그램에서는 원에 밑줄로 표시한다.**

### Attribute Domain (Value Set)

각 Attribute는 **Domain**(Value Set)으로 정의된다.

<br />

- 예시

  - **Date**는 **MM-DD-YYYY**로 구성된 값을 가지며, 여기서 각 문자는 **정수**에 해당한다.

  - **Age**는 **16에서 70 사이의 값**을 가진다.

  - **LastName(성)**은 **최대 15자까지** 가능하다.

**Domain**은 대부분의 프로그래밍 언어에서 사용할 수 있는 기본 데이텨 유형과 유사하다. **integer, string, double, ...**

<br />
<br />

# Relation

> 관계를 맺는 두 Entity Type에 대해, 한 Entity가 얼마나 많은 다른 Entity와 관련될 수 있는 지를 나타내는 제약 조건을 뜻한다.

**ex.** EMPLOYEE 홍길동 **works_on** the SpaceX PROJECT, EMPLOYEE 이순신 **works for** the R&D DEPARTEMENT.

위 예시에서 **works_on**과 **works for**는 **Relation Type**이라 하며 이 역시 **Attribute**를 가질 수 있다.

**ER 다이어그램에서 Relation은 마름모로 표현한다.**

<br />

- **Role Name**

  Entity Type의 Entity가 각 관계 인스턴스에서 수행하는 역할에 의미를 부여한다. **이는 관계가 의미하는 바를 설명하는 데 도움이 된다.**

  **ex.** **works for** Relation Type의 경우, **EMPLOYEE**의 역할: 직원 또는 근로자, **DEPARTMENT**의 역할: 부서 또는 고용주

### Structural Constraints on Binary Relation Types (이진 관계 유형의 구조적 제약조건)

1. **Cardinality ratio**

   관계를 맺는 두 **Entity Type**에 대해 **한 개체가 얼마나 많은 다른 개체와 관련될 수 있는지를 나타내는 제약조건**을 뜻한다.

   **1 : 1** : 두 개 Entity Type의 개체들은 서로 일대일로 대응한다.

   **1 : N** : 하나의 개체가 다른 Entity Type의 많은 개체들과 관련된다. 역은 성립하지 않는다.

   **M : N** : 하나의 개체가 다른 Entity Type의 많은 개체들과 관련된다. **역이 성립한다.**

    <div style="text-align: center">
       <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FN038Q%2FbtqC7rsrPgf%2FtrCAmpTfCoo8v1lnankK01%2Fimg.png">
   </div>

<br />

2. **Participation constraint**

   관계를 맺는 두 Entity Type에 대해 **한 개체의 존재가 다른 개체의 존재에 의존하는지 여부를 나타내는 제약조건**을 뜻한다.

   어떤 Relation Type에 대해 어떤 Entity가 존재하려면, 또 다른 Entity와 (전체적으로/부분적으로) 관계되어야 한다.

   **Total Participation** : 하나 또는 그 이상의 개체가 참여

   **Partial Participation** : 선택적인 참여

   **ER 모델에서 전체 참여는 두 개의 실선으로 부분 참여는 한 개의 실선으로 표현한다.**

   **ex.** 학생은 과목을 꼭 수강할 필요가 없지만 과목은 항상 수강생이 있어야 한다.

    <div style="text-align: center">
       <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FE9iqD%2FbtqC6mymhHH%2FnWoYt6HzalfVsnuvcCpVd1%2Fimg.png">
   </div>

<br />

- **Structural Constraints**

  앞서 살펴본 두개의 제약조건을 **Structural Constraints**라 한다. 이 두개의 제약 조건과 다르게 관계를 맺는 두 Entity Type에 1 , N , M을 표시하거나 한 줄 또는 두 줄을 표시하지 말고 ( **MIN, MAX** ) 방식으로 두 제약조건을 한 번에 표현할 수 있다.

  **ex.** 학생은 최소 3개, 최대 6개의 강의를 수강할 수 있으며, 강의는 최소 10명 최대 100명의 학생들이 들을 수 있을 때, 이를 ER 다이어그램으로 표현하면 다음과 같다.

    <div style="text-align: center">
       <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcsicN8%2FbtqC4tSwiej%2Fu2ZrL7e1Ogkf4rhwN3GrrK%2Fimg.png">
   </div>

<br />
<br />

# ER Diagram

- **Notation for ER Diagram**

<br />

<div style="text-align: center">
       <img src="https://t1.daumcdn.net/cfile/tistory/99766E365A77C87A1A">
</div>

<br />
<br />

- **Example of ER Diagram**

<br />

<div style="text-align: center">
       <img src="https://t1.daumcdn.net/cfile/tistory/273864395389E78525">
</div>