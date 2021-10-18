---
date: "2021-10-17"
title: "[SQL] Basic SQL (1) - CREATE, SELECT"
category: "Data Science"
categoryColor: "mediumseagreen"
tags: ["DB", "SQL"]
thumbnail: "./images/SQL.png"
---

# SQL 데이터 정의 및 데이터 유형

<hr />

> 관계형 데이터베이스 관리를 위한 포괄적인 언어를 SQL이라 한다.

## SQL의 스키마와 카탈로그 개념 (Data Definition Language: DDL)

### **SQL schema (called a database in some systems)**

- 동일한 데이터베이스에 속한 테이블/기타 구성을 함께 그룹화하기 위해 통합되었다.

- 스키마 이름으로 식별된다. (ex. ‘university’)

- 스키마를 소유한 사용자 또는 계정을 나타내는 권한 부여 식별자 및 스키마의 각 요소에 대한 설명자를 포함한다.

- 스키마 요소에는 다음이 포함된다.

  - **Tables, constraints, views, domains 등**

- 스키마를 만드는 방법? **CREATE SCHEMA** statement

  - 모든 스키마 요소의 정의를 포함할 수 있다.

  - ex) **CREATE SCHEMA COMPANY AUTHORIZATION ‘Joshua’**

- 그러나 모든 사용자에게 스미카 및 스키마 요소를 생성할 수 있는 권한이 부여되는 것은 아니다.

  - 스키마, 테이블 및 기본 구성을 생성할 수 있는 권한은 **DBA가** 관련 사용자 계정에 명시적으로 부여해야 한다.

<br />

### **Catalog: a named collection of schemas**

- 항상 **INFORMATION_SCHEMA**라는 특수 스키마를 포함한다.

  - 카탈로그의 모든 스키마와 이러한 스키마의 모든 요소 설명자에 대한 정보를 제공한다.

    - **무결성 제약 조건**은 **동일한 카탈로그 내** 스키마에 존재하는 경우에만 관계 간에 정의할 수 있다.

    - 동일한 카탈로그 내에서 스키마는 유형/도메인 정의와 같은 특정 요소를 **공유할 수 있다.**

<br />
<br />

## The CREATE TABLE Command in SQL

- **CREATE TABLE** 문법 SYNTAX

```sql
CREATE TABLE 테이블이름(
    컬럼명 데이터타입 조건,
    컬럼명 데이터타입 조건,
    ...
    컬럼명 데이터타입 조건
);
```

<br />

- 데이터타입 종류

  - **CHAR** : 특정 문자열 개수를 지정할 때 사용되는 데이터타입. (ex. CHAR(10) : 10자리 문자열)
  - **VARCHAR2** : 가변 길이의 문자열을 저장할 때 사용되는 데이터타입. 최대 길이를 지정.
  - **NUMBER** : 숫자에 사용되는 데이터타입. 소수점 저장 가능.
  - **DECIMAL** : 숫자에 사용되는 데이터타입. 소수점 저장 가능. (Oracle에서 내부적으로 NUMBER로 변환되어 사용됨)
  - **DATE** : 날짜에 사용되는 데이터타입

<br />

- 제약조건

  - **NOT NULL** : 값이 꼭 입력되어야 할 때 사용. NULL을 허용하지 않음. **_“Attribute” Constraints_**
  - **UNIQUE** : 해당 컬럼에 중복 값을 허용하고 싶지 않을 때 사용. **_“Key” Constraints_**
  - **PRIMARY KEY** : 기본키를 지정할 때 사용. 테이블 당 한 개의 PK만 생성 가능. **_“Key” Constraints_**
  - **FOREGIN KEY** : 외래키를 지정할 때 사용. (REFERENCES 키워드와 같이 쓰임.) **_“Referential Integrity” Constraints_**
  - **CHECK** : 컬럼에 입려되는 데이터를 체크해 특정 조건애 맞는 데이터만 입력받고 싶을 때 사용. **_“Attribute” Constraints_**
  - **DEFAULT** : 만약 값이 없이 입력되면 DEFAULT에 지정된 값으로 입력. **_“Attribute” Constraints_**
  - **INDEX** : 인덱스를 지정할 때 사용.

<br />

- 테이블 생성 예시

  ```sql
  CREATE TABLE DEPARTMENT (
    Dname VARCHAR(15) NOT NULL,
    Dnumber INT NOT NULL CHECK(Dnumber > 0 and Dnumber < 21),
    Mgr_ssn CHAR(9) NOT NULL,
    Mgr_start_date DATE,
    PRIMARY KEY (Dnumber),
    UNIQUE (Dname),
    FOREIGN KEY (Mgr_ssn) REFERENCES EMPLOYEE(Ssn)
  );
  ```

  <br />

- 일부 외래키는 오류를 일으킬 수 있다.

  - Circular references (순환 참조)

  - 아직 생성되지 않은 테이블을 참조

  → **ALTER TABLE statement**

  필요에 따라 나중에 기본키를 선언할 수 있다.

  ```sql
  ALTER TABLE EMPLOYEE ADD FOREIGN KEY (Super_ssn) REFERENCES EMPLOYEE(Ssn);
  ALTER TABLE EMPLOYEE ADD FOREIGN KEY (Dno) REFERENCES DEPARTMENT(Dnumber);
  ```

<br />

# SQL의 기본 검색 Query

<hr />

## **Basic SQL Query Block**

```sql
SELECT  <attribute list>
FROM    <relation list>
[WHERE  <condition>]
-- for aggregates
[GROUP BY   <attribute list>]
[HAVING     <condition>]
[ORDER BY   <attribute list> [DESC]];
```

<br/>

**예시**

```sql
SELECT Bdate, Address
FROM EMPLOYEE
WHERE Fname = 'John' AND Minit = 'B' AND Lname = 'Smith';
```

> SQL 질의는 어떻게 데이터를 찾아오라고 하지 않고 무슨 데이터를 검색하기 원하는지 기술할 수 있게 함. 그래서 비절차적, 선언적 (non-procedural, declarative)임

<br />

## **두 개 이상의 속성의 이름이 동일할 경우?**

```sql
SELECT Fname, EMPLOYEE.Name, Address
FROM EMPLOYEE, DEPARTMENT
WHERE DEPARTMENT.Name = 'Research' AND DEPARTMENT.Dnumber = EMPLOYEE.Dnumber;
```

또는

- **Alias-naming/Renaming**

```sql
SELECT E.Fname, E.Lame, S.Fname, S.Lname
FROM EMPLOYEE E, EMPLOYEE S
WHERE E.Super_ssn = S.ssn;
```

<br />
<br />

## SQL의 집합(다중 집합)으로서의 테이블

- **SQL에서 중복 튜플을 제거하지 않는다.**

  1. 중복 제거는 비용이 많이 드는 작업이다. (튜플을 먼저 정렬한 다음 중복을 제거한다.)

  2. 사용자는 쿼리 결과에서 중복 튜플을 보기 원할 수 있다.

  3. 튜플에 집계함수(sum, avg, max, distinct, ...)를 적용할 때 대부분의 경우 중복 제거를 원하지 않는다.

  만약 중복 제거를 원할 경우 아래와 같은 코드를 작성하면 된다.

  ```sql
  SELECT DISTINCT Salary
  FROM EMPLOYEE;
  ```

<br />

- **Set operations** : **UNION** (set union), **EXCEPT** (set difference), **INTERSECT** (set intersection)

  - **Corresponding multiset operations**: **UNION ALL**, **EXCEPT ALL** (or **MINUS**), **INTERSECT ALL**

  - 이러한 집합 작업을 유효하게 하려면 두 (결과 집합) 테이블이 해당 Type과 호환되어야 한다.

    - **Type-compatible** (Type 호환)

      1. 두 관계는 동일한 속성(이름)을 가져야 한다.

      2. 속성은 두 관계에서 동일한 순서로 나타나야 한다.

<div style="display: flex; justify-content: space-around;">
<table
    border="1"
    width="5%"
    style="border-collapse: collapse;"
>
<caption><strong>R</strong></caption>  
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
            <td>a4</td>
        </tr>
        <tr>
            <td>a5</td>
        </tr>
    </tbody>
</table>
<table
    border="1"
    width="5%"
    style="border-collapse: collapse;"
>
    <caption><strong>T1</strong></caption>
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
            <td>a1</td>
        </tr>
        <tr>
            <td>a2</td>
        </tr>
         <tr>
            <td>a2</td>
        </tr>
         <tr>
            <td>a2</td>
        </tr>
        <tr>
            <td>a3</td>
        </tr>
         <tr>
            <td>a4</td>
        </tr>
        <tr>
            <td>a5</td>
        </tr>
    </tbody>
</table>
<table
    border="1"
    width="5%"
    height="100"
    style="border-collapse: collapse;"
>
    <caption><strong>T2</strong></caption>
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
    </tbody>
</table>
<table
    border="1"
    width="5%"
    height="100"
    style="border-collapse: collapse;"
>
    <caption><strong>T3</strong></caption>
    <thead>
        <tr>
            <th style="background-color: aliceblue;">A</th>
        </tr>
    </thead>
    <tbody style="text-align: center;">
        <tr>
            <td>a2</td>
        </tr>
        <tr>
            <td>a3</td>
        </tr>
    </tbody>
</table>
</div>

<br />

**T1** : R(A) **UNION ALL** S(A)

**T2** : R(A) **INTERSECT ALL** S(A)

**T3** : R(A) **EXCEPT ALL** S(A)

<br />

- **A Query Example**

  “직원이나 프로젝트를 통제하는 부서의 관리자로서 성이 'Smith'인 직원과 관련된 프로젝트의 모든 프로젝트 번호 목록을 만드십시오.”

  ```sql
  (
      SELECT DISTINCT Pnumber
      FROM PROJECT, WORKS_ON, EMPLOYEE
      WHERE Pnumber = Pno AND Essn = Ssn AND Lname = 'Smith'
  )
  UNION
  (
      SELECT DISTINCT Pnumber
      FROM PROJECT, DEPARTMENT, EMPLOYEE
      WHERE Dnum = Dnumber AND Mgr_ssn = Ssn AND Lname = 'Smith'
  );
  ```

<br />
<br />

## SQL의 몇 가지 추가 기능

- **Substring Pattern Matching (부분 문자열 패턴 매칭)**

  ex) "주소가 텍사스 휴스턴인 모든 직원을 검색합니다."

  ```sql
  SELECT Fname, Lname
  FROM EMPLOYEE
  WHERE Address LIKE '%Houston, TX%'
  ```

  ex) "1990년대에 태어난 모든 남성 직원을 검색합니다."

  ```sql
  SELECT Fname, Lname
  FROM EMPLOYEE
  WHERE Bdate LIKE '199_____-1______'
  ```

  ('%' 또는 '\_'가 포함된 속성 값을 찾을 때는 앞에 \를 추가한다.)

<br />

- **Arithmetic Operations (산술 연산)**

  - **표준 산술 연산자**: +, -, \*, /

    ex) "'ProductX' 프로젝트에 참여하는 모든 직원이 10% 인상된 경우 결과 급여를 표시합니다."

    ```sql
    SELECT E.Fname, E.Lname, 1.1 * E.Salary AS Increased_sql
    FROM EMPLOYEE AS E, WORKS_ON AS W, PROJECT AS P
    WHERE E.Ssn = W.Essn AND W.Pno = P.Pnumber AND P.Pname = 'ProductX';
    ```

  - **BETWEEN 비교 연산자**:

    ```sql
    SELECT *
    FROM EMPLOYEE
    WHERE (Salary BETWEEN 30000 AND 40000) AND Dno = 5;
    ```

<br />
<br />

### Ordering of Query Results (질의 결과 정렬)

- **DESC** 키워드는 지정된 속성 값의 **내림차순**으로 결과를 확인한다.

- **ASC** 키워드는 지정된 속성 값의 **오름차순**으로 결과를 확인한다. (Default)

```sql
SELECT D.Dname, E.Lname, E.Fname, P.Pname
FROM DEPARTMENT D, EMPLOYEE E, WORKS_ON W, PROJECT P
WHERE D.Dnumber = E.Dno AND E.Ssn = W.Essn AND W.Pno = P.Pnumber
ORDER BY D.Dname DESC, E.Lname ASC, E.Fname ASC;
```