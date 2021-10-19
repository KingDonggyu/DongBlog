---
date: "2021-10-18"
title: "[SQL] Basic SQL (2) - INSERT, DELETE, UPDATE"
category: "Data Science"
categoryColor: "mediumseagreen"
tags: ["DB", "SQL", "Oracle"]
thumbnail: "./images/SQL.png"
---

# INSERT, DELETE, AND UPDATE STATEMENTS IN SQL

<hr />

**Commands for Database Modification**

- **INSERT** : 일반적으로 관계(테이블)에 튜플(행)을 삽입한다.

- **UPDATE** : 조건을 만족하는 관계(테이블)에서 튜플(행)의 수를 업데이트할 수 있다. (DELETE + INSERT로 구현 가능)

- **DELETE** : 조건을 만족하는 관계(테이블)및 여러 튜플(행)을 삭제할 수 있다.

<br />

## INSERT Command

> 가장 단순한 형태로 테이블에 **하나 이상의 행을 추가**하는 데 사용된다.

- 속성 값은 CREATE TABLE 명령에 **지정된 속성과 동일한 순서로 나열되어야 한다.**

- 데이터 유형에 대한 **제약 조건**은 자동으로 관찰된다.

  - **목록에 잘못된 값이 있는 경우 삽입이 거부된다.**

- **DDL 문의 일부로 무결성 제약 조건이 적용된다.**

  - ex) Key, entity, not-null, unique, ...

<br />

튜플에 대한 관계 이름과 값 목록을 지정한다. 이 때, **NULL을 포함한 모든 값을 제공해야 한다.**

```sql
INSERT INTO EMPLOYEE
VALUES ('Richard', 'K', 'Marini', '653298653',
    '1962-12-30', '98 Oak Forest Katy, TX', 'M', 37000, '653298653', 4);
```

<br />

사용자가 command에 제공된 값에 해당하는 **명시적 속성 이름을 지정할 수 있다.**

ex) 직원의 이름, 성, 부서 번호 및 SSN만 알고 있는 경우 이러한 튜플을 EMPLOYEE에 입력하는 방법은 무엇입니까?

```sql
INSERT INTO EMPLOYEE (Fname, Lname, Dno, Ssn)
VALUES ('Richard', 'Marini', 4, '653298653');
```

**=> 지정되지 않은 속성은 DEFAULT 값 또는 NULL로 설정된다.**

<br />

**아래 코드는 쿼리 결과에서 값을 로드하는 새 테이블에 여러 튜플을 삽입한다.**

```sql
CREATE TABLE WORKS_ON_INFO (
    Emp_name VARCHAR(15),
    Proj_name VARCHAR(15),
    Hours_week DECIMAL(3, 1)
);
INSERT INTO WORKS_ON_INFO (Emp_name, Proj_name, Hours_week)
    SELECT E.Lname, P.Pname, W.Hours
    FROM PROJECT P, WORKS_ON W, EMPLOYEE E
    WHERE P.Pnumber, = W.Pno AND W.Essn = E.Ssn;
```

<div style="text-align: center;">⬇</div>

```sql
-- WORK_ON_INFO가 없을 때
CREATE TABLE WORKS_ON_INFO AS
    SELECT E.Lname, P.Pname, W.Hours
    FROM PROJECT P, WORKS_ON W, EMPLOYEE E
    WHERE P.Pnumber, = W.Pno AND W.Essn = E.Ssn;
```

많은 튜플을 테이블로 "bulk-loading"(대용량)할 때 사용한다.

syntax에서 **LIKE** 및 **WITH DATA**를 사용하여 **기존 테이블(ex. EMPLOYEE)과 동일한 속성으로 새 테이블(ex. D5EMPS)을 생성할 수 있다.**

- **전체 데이터를 로드할 수도 있다.**

```sql
CREATE TABLE D5EMPS LIKE EMPLOYEE
(
    SELECT E.*
    FROM EMPLOYEE E
    WHERE E.Dno = 5
) WITH DATA;
```

<br />
<br />

## DELETE Command

> 관계에서 튜플을 제거한다.

- **WHERE**-clause을 포함하여 제거할 튜플을 선택한다.

- 튜플은 한 번에 하나의 테이블에서만 삭제된다.

- **참조 무결성**을 시행해야 한다.

  - **CASCADE**가 참조 무결성 제약 조건에 지정되면 **삭제할 튜플을 참조하는 모든 튜플도 제거된다.**

- **누락된 WHERE 절**: 테이블의 모든 행이 삭제되어 빈 테이블이 되도록 지정한다.

- 삭제할 튜플은 **WHERE-clause을 만족하는 테이블의 행 수**에 따라 다르다.

```sql
DELETE FROM EMPLOYEE
WHERE Lname = 'Brown';

DELETE FROM EMPLOYEE
WHERE Ssn = '123456789';

DELETE FROM EMPLOYEE
WHERE Dno = 5;

DELETE FROM EMPLOYEE;
```

<br />
<br />

## UPDATE Command

> 하나 이상의 선택된 튜플의 속성 값을 수정하는 데 사용된다.

- 각 command는 **동일한 관계**에서 튜플을 수정한다.

- **WHERE**-clause은 수정할 튜플을 선택한다.

- **SET**-clause은 **수정할 속성과 새 값을 지정한다.**

  - 이러한 참조 트리거 작업이 **DDL의 참조 무결성 제약 조건에 지정된 경우 PK 값 업데이트는 다른 테이블에 있는 튜플의 FK 값으로 전파될 수 있다.**

ex) 프로젝트 번호 10의 위치 및 제어 부서 번호를 각각 'Bellare' 및 5로 변경합니다.

```sql
UPDATE PROJECT P
SET P.Plocation = 'Bellaire', P.Dnum = 5
WHERE P.Pnumber = 10
```