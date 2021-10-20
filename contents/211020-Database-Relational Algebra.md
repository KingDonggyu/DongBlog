---
date: "2021-10-20"
title: "[Database] Relational Algebra"
category: "Data Science"
categoryColor: "mediumseagreen"
tags: ["DB"]
thumbnail: "./images/DB.png"
---

> Relational Algebra(관계 대수)는 '어떻게 query를 수행할 것인가'를 명시하는 절차적 언어이다.

**DBMS들에서 널리 사용되는 SQL의 이론적인 기초이다.**

**SQL을 구현하고 최적화하기 위해 DBMS의 내부 언어로서도 사용된다.**

<br />

- **관계 대수가 왜 중요할까?**

1. **관계형 모델** 작업을 위한 공식 기반을 제공한다.

2. **RDBMS**의 필수적인 부분인 **쿼리 처리** 및 최적화 모듈에서 **쿼리를 구현하고 최적화하기 위한 기반**으로 사용된다.

<br />

> **기존의 관계들로부터 새로운 관계를 생성한다.**

- **관계**나 **관계 대수식**에 **연산자들을 적용**하여 보다 **복잡한 관계 대수식**을 점차적으로 만들 수 있다.

- 기본적인 연산자들의 집합으로 이루어져 있다.

- 산술 연산자와 유사하게 단일 관계나 두 개의 관계를 입력으로 받아 하나의 결과 관계를 생성한다.

- 결과 관계는 또 다른 관계 연산자의 입력으로 사용될 수 있다.

<br />

**관계 연산자는 크게 두가지로 나눌 수 있다.**

- **G1)** 수학적 집합 이론의 집합 연산을 포함한다.

  - **UNION**(∪), **INTERSECTION**(∩), **SET DIFFERENCE**(-), **CROSS (CARTESIAN) PRODUCT**(X)

- **G2)** 관계형 데이터베이스에 대한 작업으로 구성된다.

  - **Unary operations** (단항 연산) : **SELECT**(σ), **PROJECT**(π), **RENAME**(ρ)

  - **Binary operations** (이진 연산) : **JOIN**, **DIVISION**

<br />

# UNARY RELATIONAL OPERATIONS (단항 관계 연산)

<hr />

## SELECT (σ)

> 한 관계에서 **selection condition**을 만족하는 튜플들의 부분집합을 생성한다.

- **selection condition**은 일반적으로 관계의 임의의 속성과 상수, =, <>, <=, <, >=, > 등의 비교연산자, AND, OR, NOT 등의 논리연산자를 포함한다.

- **ex)**

  - "부서 번호가 4인 EMPLOYEE 튜플을 선택합니다." ➡️ **σ Dno=4(EMPLOYEE)**

  - "급여가 $30,000보다 큰 EMPLOYEE 튜플을 선택합니다." ➡️ **σ Salary>30000(EMPLOYEE)**

  - **σ Dno=4 AND Salary>25000(EMPLOYEE)**

    ```sql
    -- An SQL Query
    SELECT *
    FROM EMPLOYEE
    WHERE Dno=4 AND Salary>25000;

    -- σ는 일반적으로 WHERE 절에 지정된다.
    ```

<br />

## PROJECT (π)

> **한 관계의 속성들의 부분 집합을 구한다.**

- 결과로 생성되는 관계는 속성 리스트에 명시된 속성들만 가진다.

- **SELECT**의 결과와 달리 **PROJECT** 연산의 결과 관계에는 **중복된 튜플들이 존재할 수 있다.**

  ➡️ **π**는 모든 중복 튜플을 제거한다.

- **ex)**

  - **π LNAME, FNAME, SALARY (EMPLOYEE)**

    ```sql
    SELECT Lname, Fname, Salary
    FROM EMPLOYEE;
    ```

  - **π Sex, Salary (EMPLOYEE)**

    ```sql
    SELECT DISTINCT Sex, Salary
    FROM EMPLOYEE
    ```

  - **π LNAME, FNAME, SALARY (σ Dno=5(EMPLOYEE))**

    ```sql
    SELECT Lname, Fname, Salary
    FROM EMPLOYEE
    WHERE Dno = 5;
    ```

<br />

## RENAME(ρ)

> **관계의 속성 또는 관계 이름 또는 둘 모두를 변경한다..**

- **JOIN**을 포함하는 복잡한 쿼리에 유용하다.

**ρ B1, B2, ..., Bn (R)** : 관계의 속성 이름을 변경한다.

**ρ S (R)** : 관계 이름을 변경한다.

**ρ S(B1, B2, ..., Bn) (R)** : 둘 모두를 변경한다.

<br />
<br />

# 집합 이론의 Relational Algebra 연산

<hr />

## UNION (∪)

> 두 관계 R과 S의 합집합, 즉 R 또는 S에 있거나 R과 S 모두에 속한 튜플들로 이루어진 관계를 구한다.

- 결과 관계에서 중복된 튜플은 제외된다.

- **ex)**

  **DEP5_EMPS** ⬅️ σ Dno=5 (EMPLOYEE)

  **RESULT1** ⬅️ π Ssn (**DEP5_EMPS**)

  **RESULT2**(Ssn) ⬅️ π Super*ssn (**DEP5_EMPS**) *-- Renaming: Super*ssn to Ssn*

  **RESULT** ⬅️ **RESULT1** ∪ **RESULT2**

<br />

## INTERSECTION (∩)

> 두 관계 R과 S의 교집합, 즉 R과 S 모두에 속한 튜플들로 이루어진 관계를 구한다.

<br />

## SET DIFFERENCE (EXCEPT) (-)

> 두 관계 R과 S의 차집합(R-S), 즉 R에는 속하지만 S에는 속하지 않은 튜플들로 튜플들로 이루어진 관계를 구한다.

<br />

## CARTESIAN (or CROSS) PRODUCT (X)

> 두 관계 R과 S의 튜플들의 모든 가능한 조합으로 이루어진 관계를 구한다.

- 카디널리티가 n인 관계 R(A1, A2, ..., An)과 카디널리티가 m인 관계 S(B1, B2, ..., Bn)의 **R X S**는 **차수**가 n+m이고, **카디널리티**가 n\*m이다.

- **Cartesian Product**의 결과 관계의 **크기가 매우 클 수 있으며**, 사용자가 실제로 원하는 것은 결과 관계의 일부인 경우가 대부분이므로 유용한 연산자는 아니다.

<br />

<div style="text-align: center;">
    <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbmD2q3%2FbtqJbxG1PN8%2Fvr60G3oKhzG5scLxLKRWmK%2Fimg.png">
</div>

<br />
<br />

# Binary Relational (이진 관계 연산)

<hr />

## JOIN (⋈)

> 두 관계로부터 연관된 튜플들을 결합한다.

- 두 관계의 관련 튜플을 하나의 **더 긴** 튜플로 결합하는데 사용된다.

- 관계 간의 관계를 처리할 수 있다는 의미에서 매우 매우 중요하다.

- **ex)** **DEPT_MGR ⬅️ DEPARTMENT ⋈ Mgr_ssn = Ssn EMPLOYEE**

<br />

**JOIN의 일반적인 경우를 **Theta join**이라고 한다.**

- **여기서 θ(theta)는 결합 조건이다.**

- θ는 R 및 S의 속성에 대한 모든 일반 **Boolean 표현식**일 수 있다.

  **ex) θ => (R.Ai < S.Bj AND (R.Ak = S.Bl OR R.Ap < S.Bq))**

- 대부분의 조인 조건에는 **equijoin**이라고 하는 하나 이상의 **같음 조건**이 포함된다. (**AND**와 함께)

  **ex) θ => (R.Ai = S.Bj AND (R.Ak = S.Bl OR R.Ap = S.Bq))**

<br />

### EQUIJOIN

가장 많이 사용되는 join이다.

> 같음 조건(=)가 있는 조인 조건만 포함하는 join을 EQUIJOIN이라 한다.

- **EQUIJOIN의 결과에서 항상 모든 튜플에서 동일한 값을 갖는 하나 이상의 속성 쌍을 갖는다.**

  - 그러나 속성의 이름이 동일할 필요는 없다.

<br />

<div style="text-align: center"> 
    <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FQy5W2%2FbtqI2Fz3l6s%2FvWgtkAHEPC2TfcCODbhdx1%2Fimg.png">
</div>

<br />

### NATURAL JOIN (\*)

> EQUIJOIN 조건에서 두 번째 속성을 제거하기 위한 join이다. 동일한 값을 가진 각 속성 쌍 중 하나는 불필요하기 때문이다.

**두 조인의 속성은 두 관계에서 동일한 이름을 가져야 한다.**

- **ex)** NATURAL JOIN on PROJECT and DEPARTMENT

  **DEPT ⬅️ ρ (Dname, Dnum, Mgr_ssn, Mgr_start_date) (DEPARTMENT)**

  **PROJ_DEPT ⬅️ PROJECT \* DEPT**

- **ex)**

<div style="text-align: center"> 
    <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FSz0IS%2FbtqJbxG1YJd%2FTxDc0klvCCnpxMKmi8XhpK%2Fimg.png">
</div>

<br />
<br />

## DIVISION (➗)

> 두 관계 R과 S가 있을 때, S에 속하는 모든 튜플 u에 대하여 튜플 tu(튜플 t와 튜플 u을 결합한 것)가 R에 존재하는 튜플 t들의 집합을 구한다.

<div style="display: flex; justify-content: space-around;">
<table
    border="1"
    width="10%"
    style="border-collapse: collapse;"
>
<caption><strong>R</strong></caption>  
    <thead>
        <tr>
            <th style="background-color: aliceblue;">A</th>
            <th style="background-color: aliceblue;">B</th>
        </tr>
    </thead>
    <tbody style="text-align: center;">
        <tr>
            <td>a1</td>
            <td>b1</td>
        </tr>
         <tr>
            <td>a2</td>
            <td>b1</td>
        </tr>
         <tr>
            <td>a3</td>
            <td>b1</td>
        </tr>
        <tr>
            <td>a4</td>
            <td>b1</td>
        </tr>
        <tr>
            <td>a1</td>
            <td>b2</td>
        </tr>
        <tr>
            <td>a3</td>
            <td>b2</td>
        </tr>
        <tr>
            <td>a2</td>
            <td>b3</td>
        </tr>
        <tr>
            <td>a3</td>
            <td>b3</td>
        </tr>
        <tr>
            <td>a4</td>
            <td>b3</td>
        </tr>
         <tr>
            <td>a1</td>
            <td>b4</td>
        </tr>
         <tr>
            <td>a2</td>
            <td>b4</td>
        </tr>
         <tr>
            <td>a3</td>
            <td>b4</td>
        </tr>
    </tbody>
</table>

<table
    border="1"
    width="5%"
    style="border-collapse: collapse;"
>
<caption><strong>S</strong></caption>  
    <thead>
        <tr>
            <th style="background-color: aliceblue;">A</th>
        </tr>
    </thead>
    <tbody style="text-align: center;">
        <tr>
            <td>a1</td>
        </tr>
        <tr>
            <td>a2</td>
        </tr>
        <tr>
            <td>a3</td>
        </tr>
    </tbody>
</table>

<table
    border="1"
    width="5%"
    style="border-collapse: collapse;"
>
<caption><strong>T</strong></caption>  
    <thead>
        <tr>
            <th style="background-color: aliceblue;">T</th>
        </tr>
    </thead>
    <tbody style="text-align: center;">
        <tr>
            <td>b1</td>
        </tr>
        <tr>
            <td>b4</td>
        </tr>
    </tbody>
</table>
</div>