---
date: "2021-10-16"
title: "[Database] Relational Model"
category: "Data Science"
categoryColor: "mediumseagreen"
tags: ["DB"]
thumbnail: "./images/DB.png"
---

# Relational Model 개념

> Relational Model은 실제 세계의 데이터를 '관계' 라는 개념을 사용해 표현한 데이터 모델이다.

## Informal

<br />

<table
    border="1"
    width="50%"
    height="200"
    style="margin: auto"
>
    <caption><strong>STUDENT</strong></caption>
    <thead>
        <tr align="center">
            <th style="background-color: lightgray;">Name</th>
            <th style="background-color: lightgray;">Student_number</th>
            <th style="background-color: lightgray;">Class</th>
            <th style="background-color: lightgray;">Major</th>
        </tr>
    </thead>
    <tbody>
        <tr align="center">
            <td>Smith</td>
            <td>17</td>
            <td>1</td>
            <td>CS</td>
        </tr>
        <tr align="center">
            <td>Brown</td>
            <td>8</td>
            <td>2</td>
            <td>CS</td>
        </tr>
    </tbody>
</table>

<br />

- **Relation**

  "sets (element들의 집합)"에 기반한 수학적 개념.

  Relational Model에서 데이터베이스는 **Relation의 모음**이다.

  Relation은 값의 **Table** (informal) 처럼 보인다.

<br />

- **rows**

  Relation은 일련의 **rows**를 포함한다.

  각 row의 데이터 요소는 실제 Entity 또는 Relation에 해당하는 특정 **facts**를 나타낸다.

  formal model에서 row를 **tuple**이라 한다.

<br />

- **column**

  각 **column**에는 데이터 항목의 의미를 전달하는 **column header** (informal) 가 있다.

  formal model에서 column를 **attribute**라 한다.

<br />

- **Key of a Relation**

  각 **row**에는 테이블에서 해당 행을 고유하게 식별하는 **Key**라고 하는 데이터 elment 값이 있다.

  경우에 따라 **row id** 또는 **sequential number**를 Key로 사용할 수 있으며, 단순히 Table의 row를 식별하기 위해 **surrogate(or artificail) Key**라고 한다.

<br />

## Formal

<br />

<div style="text-align: center">
    <img src="https://platanus.org/stack/wp-content/uploads/2021/02/250576c5660c4eb393c679bff5b8274e-1024x369.png" width=700>
</div>

<br />

- **Schema**

  - **Relation의 Schema** : _R(A1, A2, ... , An)_

    _R_ : Relation name

    _A1, A2, ... , An_ : List of Attribute

  Relation을 설명하는 데 사용한다.

<br />

- **Domain**

  분할할 수 없는 값의 집합이다. **Data Type** 또는 **Data Format**이 정의되어 있다.

  **ex.** Korea_cell_phone_numbers”는 01로 시작하는 유효한 11자리 전화번호 set을 나타낸다.

  **ex.** Date는 yyyy-mm-dd 또는 dd/mm/yy/ 등의 format을 가진다.

  - **Attribute(cloumn)은 Relation(Table)에서 Domain 역할을 한다.**

    해당 Attribute에 해당하는 데이터 요소의 의미를 해석하는데 사용된다.

    **ex.** Domain Date는 "Invoice-date" 또는 "Payment-date"라는 두 가지 Attribute을 서로 다른 의미로 정의하는 데 사용할 수 있다.

<br />

- **Tuple**

  **정렬된 집합**이다. '< ... >' 로 표현된다.

  Tuple의 각 값은 적절한 **Domain**에서 파생된다.

  **ex.** <632895, “홍길동”, “대구 북구 대학로 80 IT-5 41566", “053-950-6372">

  **Relation(Table)는 이러한 Tuples(rows)의 집합이다.**

<br />

- **State**

  - **Relation State** : Attribute Domain의 Cartesian product1(데카르트 곱1)의 subset이다.

  각 Domain에는 Attribute가 가져올 수 있는 모든 가능한 값 set이 포함되어 있다.

<br />

- **Summary**

  - **Relation R(A1, A2, ... , An)** : r(R) ⊆ dom(A1) x dom(A2) x ... x dom(An)

  - **R(A1, A2, ... , An)**: the schema of the relation

    • **R**: the name of the relation

    • **A1, A2, ... , An**: the attributes of the relation

  - **r(R)**: a specific state (or “value” or “population”) of the relation R

    • A set of tuples (rows) in R.

    • **r(R) = {t1, t2, ..., tm}**, where ti is an n-tuple.

    • **ti = <v1, v2, ..., vn>**, where each vj is an element of dom(Aj).

<br />
<br />

<table
    border="1"
    width="70%"
    height="200"
    style="margin: auto"
>
    <caption><strong>Definition Summary</strong></caption>
    <thead>
        <tr>
            <th style="background-color: aliceblue;">Informal Terms</th>
            <th style="background-color: aliceblue;">Formal Terms</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Table</td>
            <td>Relation</td>
        </tr>
        <tr>
            <td>Column Headerrown</td>
            <td>Attribute</td>
        </tr>
         <tr>
            <td>All possible values in a column</td>
            <td>Domain</td>
        </tr>
         <tr>
            <td>Row</td>
            <td>Tuple</td>
        </tr>
         <tr>
            <td>Table Definition</td>
            <td>Schema (intension) of a Relation</td>
        </tr>
         <tr>
            <td>Populated (Loaded) Table</td>
            <td>State (extension) of the Relation</td>
        </tr>
    </tbody>
</table>

<br />
<br />

# Relation Model Constraints (제약조건)

> Constraints (제약조건)은 허용되는 값과 데이터베이스에 없는 값을 결정한다.

**1. Inherent or implicit constraints**

• 데이터 모델 자체를 기반으로 결정된다.

• ex) Relation Model은 list를 Attribute 값으로 허용하지 않는다.

<br />

**2. Schema-based or explicit constraints**

• 데이터 모델 Schema에 직접 표현한다.

• ex) Unique Constaint

<br />

**3. Application-based or semantic constraints**

• Application Program에 의해 시행된다. 데이터 모델로 설명할 수 없다.

• If age > 65 and hours > 40, 총 급여는 2배.

<hr />

## Relational Integrity Constraints

> constraint는 모든 유요한 Relation States를 유지해야 하는 조건을 말한다. (No exception)

## 1. Key constraints (키 제약조건): Unique constraints (유일 제약조건)

정의에 따라 Relation의 모든 **Tuple**은 구별되어야 한다.

  <br />

- ### Superkey (SK)

  한 Relation 내에 있는 **Attribute들의 집합으로 구성**된 Key이다.

  r(R)에 있는 두 개의 Tuple은 **SK**에 대해 동일한 값을 갖지 않아야 한다.

  즉 r(R)의 Tuple t1과 t2에 대해 **t1[SK] ≠ t2[SK]** 이다.

  <br />

- ### Key

  **A "minimal" Superkey**

  **모든 Key는 Superkey이다. 하지만 반대의 경우는 아니다.**

  '학생' Relation에서 '학번', '주민번호', '학번 + 주민번호', '학번 + 주민번호 + 성명' 등 으로 Superkey를 구성할 수 있다.
  이 때 '학번 + 주민번호 + 성명' Superkey인 경우 3개의 Attribute 조합을 통해 다른 Tuple과 구별이 가능하지만, '성명' Attribute를 단독적으로 Superkey로 사용했을 때는 구별이 가능하지 않기 때문에 **'minimal'** 을 만족시키지 못한다. **즉, 뭉쳤을 경우 유일성이 생기고, 흩어지면 몇 개의 Attribute들은 단독적으로 유일성이 있는 Key로 사용할 수 없다.**

  <br />

- ### Candidate Key

  Relation을 구성하는 Attribute들 중에서 **Tuple을 유일하게 식별할 수 있는 Attribute들의 부분집합**을 의미한다.

  모든 Relation은 반드시 하나 이상의 Candidate Key를 가져야 한다.

  Candidate Key들 중 하나를 **Primary Key로 임의로 선택한다.**

  <br />

- ### Primary Key (PK)

  **Candidate Key** 중에서 선택한 Main Key이다.

  **한 Relation에서 특정 Tuple을 유일하게 구별할 수 있는 Attribute이다.** (Tuple ID)

  다른 Tuple에서 Tuple을 참조한다. 참조 관계에서 **Foreign Key**로 지정된다.

  null 값을 가질 수 없다. (**Entity integrity constraints**)

  Primary Key로 정의된 Attribute에는 동일한 값이 중복되어 저장될 수 없다. (**Entity integrity constraints**)

  <br />

- ### Foreign Key (FK)

  Relation R1, R2에서 R1이 참조하고 있는 **R2의 Primary Key와 같은 R1 Attribute**

  Foreign Key는 참조되는 Relation의 Primary Key와 대응되어 Relation 간에 참조 관계를 표현하는데 중요한 도구로 사용된다.

  Foreign Key로 지정되면 참조 테이블의 Primary Key에 없는 값은 입력할 수 없습니다. (**Referential integrity constraints**)

<br />

## 2. Entity integrity constraints (엔티티 무결성 제약조건)

각 Relation Schema R의 **Primary Key Attribute (PK)는 r(R) Tuple에서 NULL 값을 가질 수 없다.**

PK에 여러 Attribute가 포함된 경우 **NULL은 어느 것에도 허용되지 않는다.**

<br />

## 3. Referential integrity constraints (참조 무결성 제약조건)

두 Relation에서 Tuple 간의 **일관성**을 유지하는데 사용된다.

Relationa R1의 Tuple t1이 R2의 Tuple t2를 참조할 때, **t1은 t2의 PK를 FK로 가지고 있어야 한다.**

**ex)** 모든 EMPLOYEE Tuple의 값 EMPLOYEE의 **Dno** (각 직원이 근무하는 부서 번호)는 DEPARMENT Relation에 있는 일부 Tuple의 **Dnumber** 값과 일치해야 한다.

## 4. Domain constraint

• Tuple의 모든 값은 해당 Attribute의 Domain에서 가져와야한다.

• 해당 Attribute에 대해 허용되는 경우 값은 **null**일 수 있다.

<br />

# 업데이트 작업 및 제약 조건 위반 처리

Relation에 대한 **Update** 작업

1. INSERT
2. DELETE
3. MODIFY(Update) a tuple

> 이러한 작업이 적용될 때 마다 관계형 DB에서 무결성 제약조건 위반이 발생하지 않아야 한다.

- 여러 업데이트 작업을 함께 **그룹화**해야 할 수 있다.
- **업데이트가 전파되어 다른 업데이트가 자동으로 발생**할 수 있다.

  - 이것은 무결성 제약 조건을 유지하기 위해 필요할 수 있다.

  - ex) 신입 사원이 오면 전체 사원 수가 1씩 증가한다.

<br />

무결성 위반의 경우 몇 가지 조치를 취할 수 있다.

**1. 위반을 유발하는 작업을 취소한다**

• **RESTRICT** (no action) 또는 **REJECT** 옵션 -> (많은 DBMS에서 사용)

<br />

**2. 작업을 수행하되 위반 사실을 사용자에게 알린다**

• 대부분의 DBMS에서 하지는 않는다.

<br />

**3. 위반 사항이 수정되도록 추가 업데이트를 Trigger한다**

• **CASCADE** (갱신이 전파됨)

• **SET NULL** 또는 **SET DEFAULT** 옵션

<br />

**4. 사용자 지정 오류 수정 루틴을 실행한다**

• 프로그램을 작성해야 한다.
