---
date: "2021-12-04"
title: "[SQL] Oracle PL/SQL"
category: "Data Science"
categoryColor: "seagreen"
tags: ["DB", "SQL", "Oracle"]
thumbnail: "./images/SQL.jpeg"
---

# PL/SQL

<hr />

> 'Procedural Language/Structured Query Language'의 약자로 DB applocation 프로그램에 사용되는 Oracle 전용 언어이다.

- 여러 SQL 문을 **단일 블록으로 그룹화**하고 단일 호출을 통해 전체 블록을 데이터베이스 서버에 전송하여 **성능을 향상시킨다.**

- 변수, 루프, 제어 구조가 general-purpose language(GPL)에서와 같이 지원된다.

  - **SQL만으로는 처리할 수 없는 문제를 해결할 수 있다.**

- 실행 중 예외 처리가 지원된다.

- 특정 기능을 수행하기 위한 **procedures** 또는 **function**을 구축하는 기능을 제공한다.

- **PL/SQL 프로그램은 모든 코드가 DBMS 내부에서 생성되고 처리되기 때문에 JDBC와 같은 GPL 프로그램보다 훨씬 빠르다.**

<br />

## Block in PL/SQL

**Block**은 프로그램에서 논리적으로 나눌 수 있는 기본 단위이다. 즉, 이러한 Block은 PL/SQL에서 처리하기 위한 최소 단위이다.

<br />

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144577838-621d04ac-7afa-48c8-a0fa-f9a4156af692.png"  width="600px">
</div>

<br />

## Variables and Types in PL/SQL

GPL과 동일한 개념으로, `DECLARE` 섹션에서 선언하고 실행 섹션에서 사용해야 한다.

<br />

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144578136-1d7a80e8-13d6-4017-87d8-5da3fcf3efd0.png"  width="600px">
</div>

<br />

```sql
SET SERVEROUTPUT ON;  -- To show the output on sqlplus
DECLARE
    vempssn EMPLOYEE.Ssn%TYPE;  -- Referencing the data type associated with EMPLOYEE.Ssn
    vefname EMPLOYEE.Fname%TYPE;
    velname EMPLOYEE.Lname%TYPE;
    vemp    EMPLOYEE%ROWTYPE;  -- Referencing every column type and size of EMPLOEE
BEGIN
    SELECT Ssn, Fname, Lname
    INTO vempssn, vefname, velname
    FROM EMPLOYEE
    WHERE Ssn = '888665555';
    DMBS_OUTPUT.PUT_LINE(vempssn || ', ' || vefname || ' ' || velname);
END;
/  -- MUST be specified to execute a PL/SQL statement.

-- output: 888665555, James Borg
```

<br />

## Control Flow: IF Statement Family

GPL에서 `IF(THEN ELSE)`문 사용과 유사하다.

<br />

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144579420-32e5876f-0ada-4b09-9fa0-c23a79e34d78.png"  width="600px">
</div>

<br />

```sql
DECLARE
    vdname  DEPARTMENT.dname%TYPE;
    vempssn EMPLOYEE.ssn%TYPE; 
    vename  EMPLOYEE.lname%TYPE;
    vsal    EMPLOYEE.salary%TYPE;
    vlabel  VARCHAR2(10);
BEGIN
    ...

    IF (vsal < 20000) THEN
        vlabel := 'LOW';
    ELSIF (vsal < 40000) THEN
        vlabel := 'MEDIUM 1';
    ELSIF (vsal < 60000) THEN
        vlabel := 'MEDIUM 2';
    ELSE
        vlabel := 'HIGH';
    END IF;

    ...
END:
/
```

<br />

## ControlFlow: CASE-WHEN Statement

SQL의 `CASE-WHEN`과 유사하다.

<br />

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144580485-1b72f0c0-dd8d-42aa-afa6-d50f3db815e0.png"  width="600px">
</div>

<br />

```sql
DECLARE
    vgrade CHAR(1)  := 'B';
    vmsg   VARCHAR(20);
BEGIN 
    vmsg := 
        CASE vgrade
            WHEN 'A' THEN 'Excellent'
            WHEN 'B' THEN 'So So'
            WHEN 'C' THEN 'Bad'
            WHEN 'D' THEN 'Pretty bad'
            ELSE 'Worst'
        END;

    ...
END;
/
``` 

<br />

## ControlFlow: LOOP Statement

GPL에서 `do-while`문 사용과 유사하다.

<br />

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144581242-885f3a5c-6fa1-458d-8c75-6a7fd1710d9b.png"  width="600px">
</div>

<br />

```sql
DECLARE 
    num NUMBER(2) := 1;
BEGIN
    LOOP
        DBMS_OUTPUT.PUT_LINE('Hello');
        num := num + 1;
        EXIT WHEN num > 4;
    END LOOP;
END;
/

-- output:
-- Hello
-- Hello
-- Hello
-- Hello
```

<br />

## ControlFlow: WHILE Statement

GPL에서 `WHILE`문 사용과 유사하다.


<br />

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144581762-dc145415-afd8-49e7-95ff-601b2a54d390.png"  width="600px">
</div>

<br />

```sql
DECLARE 
    num NUMBER(2) := 1;
BEGIN 
    WHILE num < 5 LOOP
        DBMS_OUTPUT.PUT_LINE('Hello');
        num := num + 1;
    END LOOP;
END;
/
```

<br />

## ControlFlow: FOR Statement

GPL에서 `FOR`문 사용과 유사하다.

<br />

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144582180-1746a201-43b9-40ab-9318-560e1ab133cd.png"  width="600px">
</div>

<br />

```sql
BEGIN
    FOR counter IN 1..4 LOOP
        DBMS_OUTPUT.PUT_LINE('Hello' || counter);
    END LOOP;
END;
/
```

```sql
BEGIN
    FOR counter IN REVERSE 1..4 LOOP
        DBMS_OUTPUT.PUT_LINE('Hello' || counter);
    END LOOP;
END;
/
```

<br />
<br />

# Cursor in PL/SQL

<hr />

> SQL 문이 실행될 때마다 Oracle DBMS는 해석 및 처리된 명령문의 결과를 저장하기 위해 특수 메모리 영역을 사용한다. 이 때, Cursor는 해당 영역을 참조한다.

## Implicit cursor

- **하나의 행** 또는 모든 DML 문을 반환하는 `SELECT` 문에 대해 PL/SQL에 의해 자동으로 선언된다.

- 이 유형의 커서는 지금까지 표시된 출력에 사용된다.

<br />

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144582991-2b8c1dd7-dfdd-4552-89be-ccd310228352.png"  width="700px">
</div>

<br />

## Explicit cursor

- **여러 행**을 반환하는 `SELECT` 문에 대해 사용자에 의해 선언된다.

