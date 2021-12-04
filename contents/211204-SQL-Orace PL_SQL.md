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

<br />

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144583847-d7ba8d95-7f88-4b2e-bbdd-71824bf181db.png"  width="700px">
</div>

<br />

- ### Processing Steps of Explicit Cursor

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144584282-47cfec1c-058d-426c-94f4-d2dd3cec508c.png"  width="800px">
</div>

<br />

- ### SQL

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144584137-d6c19e4c-6e5f-4268-9cef-86464215bf15.png"  width="600px">
</div>

<br />

```sql
DECLARE
    v_deptno DEPARTMNET.Dnumber%TYPE;
    v_dname DEPARTMNET.Dname%TYPE;
    v_mgrssn DEPARTMNET.Mgr_ssn%TYPE;
    CURSOR C1  -- Cursor 이름을 지정 => Explicit Cursor
    IS
        SELECT dnumber, dname, mgr_ssn
        FROM DEPARTMENT;
BEGIN
    OPEN C1;
    LOOP
        FETCH C1 INTO v_deptno, v_dname, v_mgrssn;
        EXIT WHEN C1%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(v_deptno || ' ' || v_dname || ' ' || v_mgrssn);
    END LOOP;
    CLOSE C1;
END;
/
```

<br />

- ### Cursor `FOR LOOP` Statement

<br />

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144699104-53a20c64-6a47-46ae-b3c3-31e9b53c803f.png"  width="600px">
</div>

<br />

```sql
DECLARE
    CURSOR C1
    IS
        SELECT dnumber, dname, mgr_ssn
        FROM DEPARTMENT;
BEGIN
    FOR d_record IN C1 LOOP
        EXIT WHEN C1%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(d_record.dnumber || ' ' || d_record.dname || ' ' || d_record.mgr_ssn);
    END LOOP;
END;
/
```

<br />

# Stored Procedure (저장 프로시저)

<hr />

- PL/SQL에서 프로그램 Logic을 구현한다.

- 객체로 존재하며 DBMS에서 사용된다.

- GPL의 기능과 유사하며, **실행 중인 작업 순서가 지정된 독립 프로그램**을 나타낸다.

- `PROCEDURE`, `FUNCTION` 및 `TRIGGER`를 포함한다.

- **한번 정의되면 DBMS에 저장된다.**

  - 이것이 저장 프로시저 또는 영구 저장 모듈이라고 불리는 이유이다.

  - **재컴파일할 필요가 없고, 여러 번 호출 가능하다.**

- **`RETURN`을 통해 결과를 반환하거나 하지 않는다.** (항상 반환값을 갖는 DBMS 함수와 달리)

<br />

## CREATE PROCEDURE Statement

<br />

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144700167-9b87e803-926b-4905-83a1-39530b55ec51.png"  width="600px">
</div>

<br />

1.

```sql
CREATE OR REPLACE PROCEDURE InsertDept(
    deptName        IN VARCHAR2,  -- IN: 입력, OUT: 출력, IN OUT: 입/출력
    deptNumber      IN NUMBER,
    mgrSsn          IN VARCHAR2,
    mgrStartDate    IN DATE)
AS
BEGIN -- BEGIN에서는 변수와 매개변수를 선언한다.
    INSERT INTO DEPARTMENT VALUES(deptName, deptNumber, mgrSsn, mgrStartDate);
    DECLARE
    CURSOR C1
    IS
        SELECT * FROM DEPARTMENT ORDER BY Dnumber;
    BEGIN
        FOR vdept IN C1 LOOP
            EXIT WHEN C1%NOTFOUND;
            DBMS_OUTPUT.PUT_LINE(vdept.Dname || '|' || vdept.Dnumber ||
                 '|' || vdept.Mgr_ssn || '|' || vdept.Mgr_start_date || '|');
        END LOOP;
    END;
END;  -- END에서는 특정 프로그램 Logic(Procedural actions)가 구현된다.
/

EXEC InsertDept('Human Resources', 7, '888665555', to_date('2018/10/01', 'yyyy-dd-mm'));  -- Execution

DROP PROCEDURE InsertDept;  -- Drop
```

<br />

2. Procedure for Returning a Scalar Value

```sql
CREATE OR REPLACE PROCEDURE ComputeAvgSal (
    AvgSal OUT NUMBER)
AS
BEGIN
    SELECT AVG(Salary) INTO AvgSal
    FROM EMPLOYEE;
END;

DECLARE
 AvgSal NUMBER;  -- A variable to store a return value
BEGIN
 ComputeAvgSal(AvgSal);
 DBMS_OUTPUT.PUT_LINE('Avg. Salary: $' || AvgSal);
END;
/

--output: Avg. Salary: $35125
```

<br />

## CREATE TRIGGER Statement

<br />

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144700471-2fdcade9-38fd-4ccc-a43b-c5ed7467bd55.png"  width="600px">
</div>

<br />

## CREATE FUNCTION Statement

<br />

- **user-definded function을 정의한다.**

- 본문에서 값을 계산하고 수학 함수에서와 같이 반환한다.

- 일반적으로 SQL문 또는 다른 Procedure에서 호출된다.

<br />

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144700535-7d658981-2ce1-4e79-87d7-2b099d2f13dd.png"  width="600px">
</div>

<br />

```sql
CREATE OR REPLACE FUNCTIOn fnc_NewSalary(
    Salary NUMBER)
RETURN INT
IS
    newSal INT;
BEGIN
    IF (Salary < 25000) THEN
        newSal := Salary*1.05;
    ELSIF (Salary < 50000) THEN
        newSal := Salary*1.10;
    ELSE
        newSal := Salary*1.20;
    END IF;
    RETURN newSal;
END;
/

SELECT ssn, fnc_NewSalary(Salary) AS NewSalary
FROM EMPLOYEE;
```

<br />

## Comparison of Procedure, Trigger, and Function in Oracle

<br />

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144700664-6b0e312a-e737-4e08-bbb5-7725312ebaa9.png"  width="800px">
</div>

<br />

# Comparing the Three Approaches

<hr />

## 1. Embedded SQL Approach

**Advantages**

- query text가 프로그램 소스 코드 자체의 일부이다.

  - **syntax errors를 확인하고 컴파일 시 데이터베이스 스키마에 대해 유효성을 검사할 수 있다.**

- **프로그램을 읽기 쉽게 만든다.**

  - 쿼리를 소스 코드에서 쉽게 볼 수 있기 때문이다.

- **쿼리가 미리 알려져 있기 때문에 쿼리 결과를 저장할 프로그램 변수를 선택하는 것이 간단한 작업이다.**

  - 따라서 애플리케이션의 프로그래밍이 일반적으로 더 쉽다.

<br />

**Disadvantages**

- **런타임에 쿼리를 변경할 때 유연성이 저하된다.**

  - 쿼리에 대한 모든 변경 사항은 **전체 재컴파일 프로세스를 거쳐야 한다.**

- 런타임에 쿼리를 생성해야 하는 복잡한 애플리케이션의 경우 함수 호출 방식이 더 적합하다.

- **쿼리가 엄청나게 길어 복잡해 디버깅이 어렵다.**

- **쿼리가 동적으로 바뀐다.**

<br />

## 2. Library of Classes and Function Calls Approach

**Advantages**

- **필요한 경우 런타임에 쿼리를 생설할 수 있으므로 더 높은 유연성을 제공한다.**

<br />

**Disadvantages**

- **런타임 쿼리 생성은 쿼리 결과의 column과 일치하는 프로그램 변수를 미리 알 수 없기 때문에 프로그래밍이 더 복잡해진다.**

  - 쿼리가 함수 호출 내에서 **명령문 문자열로 전달되기 때문에 컴파일 시 검사가 수행되지 않는다.**

- **모든 syntax 검사 및 쿼리 유효성 검사는 쿼리를 준비하여 런타임에 수행해야 한다.**

  - 프로그래머는 프로그램 코드 내에서 가능한 추가 런타임 오류를 확인하고 평가해야 한다.

<br />

## 2. Database Programming Language Approach (ex. PL/SQL)

**Advantages**

- **프로그래밍 언어 데이터 타입이 DB 데이터 타입과 동일하므로 임피던스 불일치 문제가 없다.**

<br />

**Disadvantages**

- 프로그래머는 **새로운 프로그래밍 언어를 배워야 한다.**

  - 일부 DB 프로그래밍 언어(PL/SQL, T-SQL, etc.)는 공급업체에 따라 다르지만 general-purpose 언어(Java, Python, etc.)는 여러 공급업체의 시스템에서 쉽게 작동할 수 있다.