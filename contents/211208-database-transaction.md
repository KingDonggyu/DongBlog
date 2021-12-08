---
date: "2021-12-08"
title: "[Database] Transaction"
category: "Data Science"
categoryColor: "seagreen"
tags: ["DB", "SQL"]
thumbnail: "./images/DB.png"
---

> "정확성과 일관성"을 보장하기 위해 전체에서 완료해야 하는 데이터베이스 처리의 논리적(분할할 수 없는 작업) 단위를 Transaction이라 한다. 일반적으로 검색, 삽입, 삭제 및 업데이트와 같은 데이터베이스 commands가 포함된다.

데이터베이스 트랜잭션을 실행하는 "대규모 데이터베이스" 및 "수백 명의 동시 사용자"가 있는 시스템을 **트랜잭션 처리 시스템**이라 한다.

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144976532-f61797ac-e86f-4bfd-98e1-6018a102ba58.png" width="600px">
</div>

(Scenario: 박지성 wants to send some money to 김연아.)

## Terminology

### 트랜젝션의 유형

- **Read-only** transaction: 데이터베이스를 업데이트할 수 없다. (Lock이 필요없음)

- **Read-write** transaction: 데이터베이스를 업데이트할 수 있다. (Lock이 필요함)

### 트랜잭션 처리 개념의 주요 용어

- **Data item**: "데이터베이스 레코드"(튜플), "디스크 블록", "필드 값", "전체 파일" 또는 "전체 데이터베이스"

  - 각 데이터 항목을 고유하게 식별하는 수단으로 사용되는 고유한 이름을 가진다.

- **Granularity**: 데이터 항목의 크기로, 이에 따라 얼마나 정교한 Lock을 수행하는지 결정된다.

- **Database**: "named data items" 모음

### 트랜잭션에 포함될 수 있는 데이터베이스 접근 작업

- `read_item(X)`: 데이터 항목 X를 프로그램 변수(x)로 읽는다.

- `write_item(X)`: x의 값을 X라는 데이터 항목에 쓴다.

<br />

# 트랜잭션 및 시스템 개념, 트랜잭션의 바람직한 속성

<hr />

## Transaction States (트랜잭션 상태)

(복구 관리자) DBMS는 다음 작업(**start**, **terminate**, **commit**, and/or **abort**)을 추적해야 한다.

`BEGIN_TRANSACTION`: 트랜잭션 실행의 **시작**

`READ` or `WRITE`: 데이터베이스 항목에 대한 **읽기** 또는 **쓰기**

`END_TRANSACTION`: `READ` 또는 `WRITE`의 트랜잭션 작업이 **종료**

- 해당 트랜잭션의 상태를 확인하는 데 필요하다: **committed** 또는 **aborted**.

`COMMIT_TRANSCATION`: 트랜잭션의 **성공적인 종료**. (영구적으로 기록된 변경 사항)

`ROLL_BACK` (or `ABORT`): 트랜잭션이 **비성공적으로 종료**. (실행을 취소해야 함)

<br/>

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144978343-60718ef7-b3c2-4cc2-aa91-4dff7bb1a4fd.png" width="700px">
</div>

<br />

**Partially committed:**

- **하나의 트랜젝션이 아니므로 real time으로 판단하여 작업을 선택해야 한다. 이로 인해 사용자에 대한 빠른 응답을 제공한다.**

- DBMS는 각 트랜잭션이 아닌 디스크의 변경 사항을 한 번에 반영한다.

- 일부 **concurrency control** (동시성 제어) 프로토콜은 커밋 가능성을 추가로 확인한다.

- 일부 **recovery (복구) 프로토콜**은 실패 및 데이터베이스에 대한 영향을 확인한다.

**Failed:**

- check 중 하나가 실패하거나 트랜잭션이 중단된 경우이다.

- 실패하거나 중단된 트랜잭션은 사용자에 의해 또는 자동으로 다시 시작될 수 있다.

**Terminated:**

- 트랜잭션이 시스템을 떠난다.

<br />

## Why Recovery Is Needed?

트랜잭션이 실행을 위해 DBMS에 제출되면 해당 트랜잭션의 터미널 상태는 DBMS에 의해 결정되며 두가지 경우, **Committed**와 **Aborted**가 있다.

트랜잭션이 일부 작업을 실행한 후 **모든 작업을 실행하기 전에 실패하면 이미 실행된 작업을 취소해야 하며 지속 효과가 없어야 한다.**

### Types of failures

1. **컴퓨터 장애**: 거래 실행 중 컴퓨터 시스템에 하드웨어/소프트웨어/네트워크 오류가 발생한 경우 메모리 충돌
2. **트랜잭션 또는 시스템 오류**: 정수 오버플로, 0으로 나누기 등 또는 사용자 인터럽트
3. **로컬 오류** 또는 **트랜잭션에 의해 감지된 예외 조건**: 잔액 부족과 같은 예외 조건
4. **동시성 제어 강제**: 직렬성 위반 또는 교착 상태 감지로 인한 것
5. **디스크 장애**: 디스크 블록의 오작동
6. **신체적 문제 및 재난**: 화재, 도난, 정전 ...

**➡️ DBMS는 유형 1-4 장애(다른 것보다 일반적임)로부터 신속하게 복구할 수 있도록 충분한 정보를 유지해야 한다.**

<br />

## System Log (시스템 로그)

> 장애 복구를 위해 DBMS에서 유지 관리하며, 데이터베이스 항목의 값에 영향을 미치는 트랜잭션 작업을 추적한다.

(디스크에 저장되는 **sequential**한 **append-only** 파일은 디스크 또는 치명적인 오류를 제외하고 안전하다.)

**Log buffer**: 로그를 기록하는 데 사용되는 하나 이상의 메인 메모리 버퍼

- 로그 항목이 가득 차면 디스크의 로그 파일 "끝"에 추가된다.

**로그 파일은 archival(기록) 스토리지에 주기적으로 백업됨으로, 치명적인 장애에 대비한다.**

<br/>

### Types of “Log Records”:

<div >
  <img src="https://user-images.githubusercontent.com/33220404/144980402-1c5ef275-1e2f-4c7c-a7d0-089276a8452f.png" width="600px">
</div>

<br />

시스템이 **충돌**하는 경우 로그를 검사하고 **ARIES**와 같은 복구 기술을 사용하여 일관된 데이터베이스 상태로 복구할 수 있다.

<br />

### UNDO operations: X를 old_value로 복원

- **backward**로 추적하여 T의 WRITE 작업의 효과를 취소한다.

### REDO operations: X를 new_value로 업데이트

- 트랜잭션의 업데이트가 로그에 기록되었지만 new_value를 데이터베이스에 기록하기 전에 오류가 발생한 경우 수행할 수 있다.

- ARIES에서 **forward** action을 취하는 데 사용된다.

<br />

## Commit Point of Transaction T

> 데이터베이스에 액세스하는 모든 작업이 성공적으로 완료되고 작업의 효과가 로그에 기록될 때 발생한다. T는 커밋되었다고 한다.

**T는 [commit, T] 커밋 레코드를 로그에 쓴다.**

<br />

장애가 발생했을 때,

**1. T에 커밋 레코드가 있으면** 로그 레코드에서 데이터베이스에 대한 **redo effect**

**2. T에 커밋 레코드가 없지만** `start_transaction` 레코드가 있는 경우 복구 프로세스 동안 데이터베이스에 대한 **undo effect** (**rollback**)

<br />

**Force-writing**: **트랜잭션을 커밋하기 전에 디스크에 로그 버퍼를 flush한다.**

- 트랜잭션이 커밋 지점에 도달하기 전에 아직 디스크에 기록되지 않은 로그 부분을 디스크에 쓰는 것을 나타낸다.

- 복구 중에 디스크에 저장된 로그 항목만 고려할 수 있다.

<br />

## ACID Properties of Transaction

**Atomicity** (원자성): <u>recovery subsystem</u>의 책임

- 트랜잭션은 처리의 **원자 단위**이다(all or nothing).

**Consistency** (일관성): <u>프로그래머의</u> 책임

- 트랜잭션은 **일관성을 유지**해야 한다: 간섭이 없는 경우 일관성 있는 데이터베이스

**Isolation** (격리): <u>동시성 제어 subsystem</u>에 의해 시행

- 트랜잭션은 다른 **트랜잭션과 분리되어 실행**되는 것처럼 나타나야 한다. 실행이 다른 사람에 의해 중단되어서는 안 된다.

**Durability** (내구성): <u>recovery subsystem의</u> 책임

- 커밋된 트랜잭션에 의해 적용된 변경 사항은 데이터베이스에서 지속되어야 한다. 즉, 어떤 실패로 인해 손실되지 않아야 한다.

**➡️ 이 네 가지 속성은 모든 트랜잭션이 소유해야 한다(MUST).**

<br />

# Characterizing Schedules Based on Serializability

<hr />

트랜젝션 작업을 ordering한다. 다른 트랜젝션의 작업은 **Schedule**에서 **serial** 또는 **interleaved**될 수 있다.

- 두 트랜잭션 T1 및 T2를 "**interleaving**"하는 Schedule(S)의 예:

  **S**: <span style="color:blue;">r1(X); </span> <span style="color:red;">w2(X); </span><span style="color:blue;">w1(X); </span><span style="color:blue;">r1(Y); </span><span style="color:red;">w2(X); </span><span style="color:blue;">w1(Y); </span>

**S의 전체 작업 순서**는 S의 두 작업에 대해 하나의 작업이 다른 작업보다 먼저 발생해야 하며, **S의 부분 작업 순서**는 특정 작업 사이의 시간 순서가 시스템에 의해 결졍되지 않은 경우 지정한다.

<br />

## Serial Schedule

S의 모든 트랜잭션 T에 대해 T의 모든 작업이 다른 작업의 interleaved 작업 없이 **연속적으로 실행되는 경우** Schedule S는 **serial**이다. 그렇지 않으면 **nonserial**이라고 한다.

모든 serial schedule은 **정확하지만**, 작업의 인터리빙을 금지하여 concurrency(동시성)을 제한하며, 다른 트랜젝션이 완료될 때까지 기다릴 수 없다.

**Solution** ➡️ serial schedule과 **"equivalent"** 한 schedule을 결정하고 해당 schedule이 발생하도록 허용한다. **그러나 어느 것이 equivalent하다고 판단하기는 쉽지 않다.**

<br />

## Conflicting Operations in a (Nonserial) Schedule

**Schedule의 두 operations은 다음과 같은 경우 충돌한다.**

**1. Operations은 서로 다른 트랜잭션에 속한다.**

**2. Operations은 동일한 항목 X에 access한다.**

**3. Operations 중 적어도 하나는 `write_item(X)` 이다.**

**(위의 세 가지 조건이 모두 충족되어야 충돌이 발생한다.)**

<br />

직관적으로, 순서를 변경하면 다른 결과가 발생하는 경우 두 operations이 충돌한다. 충돌의 두가지 유형으로 **1) read-write** or **2) write-write** 충돌이 있다.

- ex) **S**: <span style="color:blue;">r1(X); </span> <span style="color:red;">w2(X); </span><span style="color:blue;">w1(X); </span><span style="color:blue;">r1(Y); </span><span style="color:red;">w2(X); </span><span style="color:blue;">w1(Y); </span>

따라서 이러한 충돌뿐만 아니라 "others"을 해결하기 위해 정교한 **Concurrency Control(동시성 제어)** 기술이 필요하다.

<br />

## Why Concurrency Control Needed in a Schedule

### Types of Problems (1)

동시에 실행할 수 있는 다음 트랜잭션을 고려한다.

<br />

<div style="text-align:center">
  <img src="https://user-images.githubusercontent.com/33220404/145139932-79220725-ffc3-485f-87a1-70fed1f6e0d3.png" width="500px">
</div>

### Types of Problems (2)

<br />

<div style="text-align:center">
  <img src="https://user-images.githubusercontent.com/33220404/145140104-d97ec821-d34b-4bda-9836-74e0270ea1ee.png" width="700px">
</div>

### Types of Problems (3)

**The lost update (갱신 손실) problem**

- "동일한" 데이터베이스 항목에 액세스하는 두 트랜잭션이 일부 데이터베이스 항목의 값을 **부정확하게 만드는 방식으로 작업이 인터리브되는 경우 발생**한다.

<br />

<div style="text-align:center">
  <img src="https://user-images.githubusercontent.com/33220404/145140348-842bc566-9a90-4151-b550-2856d9205217.png" width="700px">
</div>

### Types of Problems (4)

**The dirty read (or temporary update) problem**

- 한 트랜잭션이 데이터베이스 항목을 업데이트한 다음 어떤 이유로 트랜잭션이 **실패할 때 발생**한다.

- 한편, 업데이트된 항목은 원래 값으로 변경(or **rolled back**)되기 전에 다른 트랜잭션에서 읽는다.

<br />

<div style="text-align:center">
  <img src="https://user-images.githubusercontent.com/33220404/145140596-71eae105-e0da-44a8-905c-48777fb66d70.png" width="700px">
</div>

### Types of Problems (5)

**The incorrect summary problem (called phantom read)**

- 한 트랜잭션이 여러 데이터베이스 항목에 대한 **aggregate summary(집계 요약) 기능을 계산하는 동안** 다른 트랜잭션이 이러한 항목 중 일부를 업데이트하는 경우 발생.

  - 집계 함수는 값이 업데이트되기 전후에 요약을 계산할 수 있다.

<br />

<div style="text-align:center">
  <img src="https://user-images.githubusercontent.com/33220404/145140828-f95ee818-c78f-401e-b2d2-44417e90c65a.png" width="700px">
</div>

### Types of Problems (6)

**The unrepeatable(반복 불가능한) read problem**

- 트랜잭션 T가 동일한 항목을 두 번 읽고 두 읽기 사이에 다른 트랜잭션 T'에 의해 항목이 변경된 경우 발생한다. 따라서 T는 **두 읽기에 대해 다른 값을 받는다.**

> **이러한 문제를 해결하고 nonserial하지만 serializable schedule을 생성하려면 우수한 동시성 제어가 필요하다.**

<br />

## Serializable (직렬 가능한) Schedule

동일한 n개 트랜잭션의 일부 serial schedule과 동일하다.

동시 트랜잭션을 직렬로 배치한다.

- S1이 직렬 스케줄(T1;T2 | T2;T1)이고 S2가 비직렬 스케줄이라고 가정한다.

- 만약, S1과 S2가 데이터베이스의 **동일한** 최종 상태를 생성하면 S1과 S2가 동일할 수 있다.

  - 이때, S2는 **Serializable** (직렬화 가능) 하다고 한다.

**동시 트랜잭션이 실행될 때 항상 올바른 것으로 간주된다. 이는 동시 실행의 이점을 제공한다.**

<br />

[주의] 초기값 X = 100에 대해 결과가 동일하지만 일반적으로 결과가 동일하지 않은 두 개의 스케줄

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145141723-daca9ae5-81a2-41ce-9a5a-03cc391c9a45.png" width="300px">
</div>

<br />

### 예시

<div style="text-align:center">
  <img src="https://user-images.githubusercontent.com/33220404/145141921-28654368-56a1-4e10-a8bf-e45ebfe87109.png" width="800px">
</div>

<br />

## How to Ensure Serializablity?

### **Use concurrency control (CC) protocols:**

- **Two-phase locking (2PL)** : 가장 일반적인 기술.

  - 동시 트랜잭션이 서로 간섭하지 않도록 데이터 항목을 **Lock**한다.

    - 잠금은 세 가지 주요 문제를 나타낸다. **1) 높은 overhead** (lock 요청 후 read 또는 write), **2) Deadlock**, and **3) Starvation**

  - Two phases: **growing** (acquiring) and **shrinking** (releasing) phases on locks 

  - 직렬성을 보장하는 추가 조건을 적용하지만, **Deadlock(교착 상태)** 를 방지할 수는 없다.

    - **Deadlock**은 집합의 각 트랜잭션 T가 집합의 다른 트랜잭션 T'에 의해 **locked 일부 항목을 기다리고 있을 때 발생한다.**

    <div style="text-align:center">
      <img src="https://user-images.githubusercontent.com/33220404/145142666-86b226b6-46d9-4152-ad3c-30543649e798.png" width="600px">
    </div>

- **Snapshot isolation** : 일부 DBMS에서 사용 (2PL보다 적은 overhead)

  - 트랜잭션은 시작될 때 데이터베이스 스냅샷에 있는 항목의 커밋된 값을 기반으로 읽은 데이터 항목을 본다.

  - phantom 레코드 문제가 발생하지 않도록 한다.

- **Timestamp ordering**

  - 각 트랜잭션에는 고유한 timestamp가 할당되며, 프로토콜은 충돌하는 작업이 트랜잭션 timestamp 순서대로 실행되도록 한다.

- **Multiversion concurrent control (MVCC) protocols**

  - 여러 버전의 데이터 항목 유지 관리 기반으로 한다.

- **Optimistic protocols**

  - 트랜잭션이 종료된 후 커밋이 허용되기 전에 직렬화 가능성 위반 가능성을 확인한다.

<br />

# Transaction Support In SQL

<hr />

일반적으로 명시적인 `Begin_Transaction` 문이 없다. 대신 모든 트랜잭션에는 명시적인 종료 문이 있다.

- `COMMIT` | `ROLLBACK`

모든 트랜잭션에는 관련된 특정 특성이 있다. 

- **isolation level**으로 지정할 수 있다.

- SQL에서 **isolation level**을 지정하는 방법 : `ISOLATION LEVEL <isolation>`

  - isolation = `READ UNCOMMITTED` | `READ COMMITTED` (by default in **Oracle**)

  - isolation = `REPEATABLE READ` | `SERIALIZABLE` (by default in **most DBMSes**)

<br />

## What Happens if Serializability is Violated?

트랜잭션이 `SERIALIZABLE` 보다 lowel level에서 실행되는 경우, 다음 세 가지 위반 사항 중 하나 이상이 발생할 수 있다.

### Dirty read (오손 읽기)

- T1은 아직 커밋되지 않은 T2의 업데이트를 읽을 수 있다.

- T2가 중단되면 존재하지 않고 잘못된 값을 읽었을 것이다.

### Nonrepeatable read (반복 불가능)

- T1은 테이블에서 주어진 값을 읽을 수 있다.

- T2가 나중에 해당 값을 업데이트하면 T1이 해당 값을 다시 읽고 T1은 다른 값을 보게 된다.

### Phantoms (유령 데이터)

- T1은 SQL `WHERE` 절에 지정된 일부 조건에 따라 테이블에서 rows 집합을 읽을 수 있다.

- T2는 조건을 만족하는 새 레코드를 삽입한다.

- T1은 **phantom**이라고 하는 새 레코드를 동일한 테이블로 볼 수도 있다.

- T1은 시작할 때 레코드를 보지 못했다.

<br />

### **SQL에 정의된 isolation levels에 따라 가능한 violation(위반)**

<div>
  <img src="https://user-images.githubusercontent.com/33220404/145144009-a911b98d-caa0-425f-ac79-1e771e91b650.png" width="700px">
</div>

**위 표의 명시되어 있는 Isolation Level이 낮아질수록 Conccruency가 높아지며, 높아질수록 성능이 높아진다.**

<br/>