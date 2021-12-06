---
date: "2021-12-06"
title: "[Database] Physical Database Design"
category: "Data Science"
categoryColor: "seagreen"
tags: ["DB"]
thumbnail: "./images/DB.png"
---

> 데이터 구성 데이터베이스의 모음은 일부 컴퓨터 저장 매체에 물리적으로 저장되어야 한다. DBMS(예: Oracle) 소프트웨어는 필요에 따라 이 데이터를 검색, 업데이트 및 처리할 수 있다.

# Storage Hierarchy

<hr />

> 컴퓨터 저장 매체는 Storage Hierarchy (저장 계층) 구조를 형성한다.

- **Primary Storage**: 중앙처리장치(CPU)에 의해 운영

  - CPU Cache Memory, RAM(Random Access Memory)

- **Secondary Storage**: non-volatile(비휘발성)-보존 가능, 기본 스토리지보다 저렴

  - Hard Disk Drives(HDD), (USB) Flash Memory, Solid-State Drives (SSDs)

- **Tertiary storage**: 가장 저렴하지만 가장 느림

  - Removable(이동식) media: Tapes, Optical Disks (CD-ROMs, DVDs, ...)

<br />

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/144797137-85bea255-f4cb-496a-b1d9-e2672449d4f6.png" width="500px">
</div>

<br />

## Storage Organization of Databases

### **Persistent data (nonvolatile)**

- 대부분의 데이터베이스는 일반적으로 장기간 지속되는 대용량 데이터를 저장한다.

- magnetic(자기) 및/또는 SSD 디스크의 **Secondary 스토리지**에 저장된다.

  - 일반적으로 DB는 너무 커서 메인 메모리 전체에 담기 어렵다.

  - **비휘발성** - 전원이 꺼진 후 사라지지 않는다.

  - 데이터 단위당 스토리지 비용: **Primary 스토리지보다 10배 저렴하다.**

- 데이터의 일부는 처리를 위해 디스크에서 RAM으로 로드되고 디스크에 다시 기록된다.

- 디스크에 저장된 데이터는 **레코드 파일**로 구성된다.

  - **각 레코드는 ER에 대한 사실을 나타내는 데이터 값의 모음이다.**

  - **레코드는 효율적인 액세스를 위해 디스크에 잘 배치되어야 한다.**

### **Transient data (volatile)**: Persistent data와 대조된다.

- 프로그램 실행 중에만 존재한다. (ex. malloc())

<br />
<br />

### **Primary file organizations**

- 파일 레코드가 디스크에 물리적으로 배치되는 방식을 결정한다.

- 레코드에 액세스할 수 있는 방식을 결정한다.

- **Heap file** (unordered file)

  - **파일 끝에 새 레코드를 추가하여 특정 순서 없이** 디스크에 레코드를 배치한다.

- **Sorted file** (sequential file)

  - **sort key field의 값으로 레코드 순서를 유지한다.**

  - 유지보수 비용이 Heap file에 비해 발생한다.

- **Hashed file**

  - 디스크에서의 배치를 결정하기 위해 **hasy key field**에 적용된 **hash function**를 사용한다.

  - field 별로 조직 가능하다.

  - **Range Search에는 적합하지 않다.**

- **Tree-structured file** (B-trees)

  - **Range Search에는 적합하다**

- **Column-based file**

  - column 단위로 레코드를 저장한다.

  - **꼭 필요한 column을 찾기 쉽다.**

### **Secondary organization** (or auxiliary access structure)

- Primary file organization에 사용된 필드와 다른 **대체 필드**를 기반으로 파일 레코드에 효율적으로 액세스할 수 있다.

- 이들 중 대부분은 **indexes**가 존재한다.

<br />

# Secondary Storage Devices

<hr />

## Disk Storage

### **Disk: 랜덤 액세스 주소 지정 장치**

- **디스크 block(sector x 8) 단위로 RAM에서 데이터 전송**

- block(또는 sector) 주소는 다음으로 구성된다.

  - cylinder 번호, track 번호(within the platter), block 번호(within the track)(또는 sector 번호(within the block))

- 블록 주소는 **디스크 I/O 컨트롤러**에 제공된다.

- 많은 최신 디스크 드라이브에서 **LBA(Logical Block Address)** 라는 단일 번호가 **컨트롤러에 의해 자동으로 올바른 블록에 매핑된다.**

<br />

### **Disk read**

- LBA가 있는 원하는 디스크 블록이 디스크 드라이브 **buffer**에 복사된다. ➡️ 효율성 증가

- 컨트롤러는 buffer에 없는 것들을 찾으라 disk head에 명령한다.

### **Disk write**

- buffer의 내용은 LBA를 사용하여 디스크 블록에 복사된다.

**disk는 read와 write의 성능이 거의 같다. 하지만, 느리다.**

<br />
<br />

### **Internal Architecture**

<br />

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/144800749-538c04cc-d5f2-4558-8378-3eb4a55d8c04.png" width="300px">
</div>

<br />

- 디스크는 **magnetic platters** 의 stack이다.

- 각 **platters**의 표면은 여러 **tracks**으로 구성되며, track은 **sectors**로 나뉜다.

- **Sector**: 저장의 기본 단위로 다음과 같이 구성되어 있다.

  - Sector ID, 데이터(일반적으로 512bytes), 오류 수정 코드, sync fields 또는 gaps(다음 sector의 sector 번호)

- **Block**(or **Page**): Sector group (일반적으로 4K bytes)

- **spindle이 원하는 sectors를 찾기 위해 회전하는 동안 디스크 head는 원하는 track(동일한 cylinder 내)으로 이동한다.**

<br />

## Disk Access Time

**세 가지 주요 구성 요소**

- Seek time: 디스크 헤드를 원하는 트랙으로 이동하는 데 걸리는 시간이다.

- Rotational delay: 원하는 섹터가 (읽기/쓰기) 헤드 아래로 올 때까지 회전할 때까지 기다리는 데 소요된다.

  - 일반적으로 전체 회전 시간의 절반으로 간주된다.

- Transfer time: 디스크 비트 블록을 전송하는 데 소요된다.

  - 섹터 크기, 회전 속도 및 기록 밀도의 함수

**다른 액세스가 존재할 때 queuing delays와 디스크 컨트롤러 overhead로 인해 "더 많은 대기 시간"이 있을 수 있다.**

- **컨트롤러의 스케줄링**

  - sequential한 구간은 keep한다. (대기 시간이 그렇게 크지 않기 때문)

  - 하지만 overhead가 존재한다.

<br />

## 효율적인 데이터 액세스를 위한 기술

**데이터 Buffering (in main memory)**

- 새 데이터는 이전 데이터가 처리되는 동안 버퍼에 보관될 수 있다.

**디스크상 데이터의 적절한 구성**

- 관련 데이터를 연속 블록에 보관한다. (데이터 블록을 head에 가깝게 배치)

**요청보다 먼저 데이터 읽기: Prefetching**

- 디스크 읽기의 경우 나머지 트랙의 블록도 읽을 수 있다.

**I/O 요청의 적절한 스케줄링**

- 총 액세스 시간을 최소화하는 것을 목표로 한다.

- Arms은 한 방향으로만 움직인다: 엘리베이터 알고리즘이라고 한다.

**일시적으로 쓰기를 보류하기 위한 log 디스크 사용**

- 기록될 모든 블록은 탐색 시간을 없애기 위해 하나의 log 디스크로 이동한다.

**SSD 사용**

- 기계 부품의 지연이 없으나 비싸다.

- 읽기와 쓰기가 async하다.

<br />

# Buffering of Blocks

<hr />

## Interleaved Concurrency (on Single CPU) vs. Parallel Execution (on multi-CPUs)

<br />

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/144803797-28d52ba5-f054-4610-81e1-479e5a09065f.png" width="600px">
</div>

<br />

## Double Buffering

> 별도의 디스크 I/O 프로세서를 사용할 수 있거나 여러 개의 CPU 프로세서가 존재하여 Buffering은 프로세스가 동시에 병렬로 실행될 수 있을 때 가장 유용하다.

- 블록 전송이 완료되면 CPU는 해당 블록 처리를 시작할 수 있다.

- 동시에 디스크 I/O 컨트롤러(프로세서)는 다음 블록을 읽고 다른 버퍼로 전송할 수 있다.

- 연속적인 블록 스트림을 읽는 데 사용할 수 있다.

<br />

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/144804103-939a462b-5634-43a5-a11e-71bb19a7a0e1.png" width="700px">
</div>

<br />

위 이미지는 처리 시간이 다음 블록을 읽고 버퍼를 채우는 시간(I/O 시간)보다 짧을 때 읽기 및 처리가 어떻게 진행될 수 있는지 보여준다.

<br />

## Buffer Management (BM) of a DBMS

- 데이터 요청에 응답한다.

- **사용할 버퍼와 새 페이지(or 디스크 블록)를 수용하기 위해 대체할 페이지를 결정한다.**

- 사용 가능한 main memory 스토리지를 **buffer pool**로 본다.

- 각 페이지에 대한 두 가지 유형의 정보를 유지한다. (**대체할 페이지를 찾기 위해 사용된다.**)

  - **1. Pin-count**: 해당 페이지가 요청된 횟수(or 해당 페이지의 동시 사용자 수) - initially 0

    - Pinning: Pin 수 증가

      - **0으로 떨어지면 unpinned. 그렇지 않으면 연결된 페이지를 제거할 수 없다.**

  - **2. Dirty bit**: 초기에는 0이지만 프로그램에 의해 해당 페이지가 **없데이트될 때마다 1로 설정된다.**

    - 메모리에는 data의 변경이 적용되었지만, 디스크에는 아직 적용되지 않았을 때를 dirty라 표현한다.

    - dirty시 buffer가 사라짐을 방지하기 위해 dirty bit가 이용된다.

<br />

## 특정 Page 요청 시..

**버퍼 관리자(buffer manager)는 요청된 페이지가 이미 buffer pool의 버퍼에 있는지 확인한다.**

- 페이지가 존재하면 관리자는 핀 수를 늘리고 페이지를 해제한다.

- 그렇지 않은 경우 관리자는 다음 작업을 수행한다.

  - a) **replacement policy**을 사용하여 교체할 페이지를 선택하고 **핀 수를 증가**시킨다.

  - b) 교체 페이지의 **더티 비트가 ON이면 관리자는 해당 페이지를 디스크에 쓴다**(디스크의 이전 복사본을 교체하여).

  - c) 요청된 블록을 방금 해제된 (clean) 페이지로 읽는다.

  - d) 새 페이지의 main memory 주소가 요청자에게 전달된다.

**unpinned 페이지가 없고 요청된 페이지를 buffer pool에서 사용할 수 없는 경우 관리자는 (페이지를 사용할 수 있을 때까지) 기다려야 한다.**

<br />
<br />

## Buffer Replacement Strategies (Popular)

### Least recently used (LRU) (most common)

- **가장 오랫동안 사용하지 않은 페이지는 버린다.**

### First-in-first-out (FIFO)

- **가장 오래 사용된 페이지를 교체한다.**

- 인덱스의 root 블록은 버려질 수 있지만 대부분 다시 가져올 가능성이 있다.

- 사실 DB에서 쓰이지 않는다.

### Clock policy: a round-robin variant of LRU

- (각 버퍼는 0(미사용) 또는 1(사용) 값을 가질 수 있다고 가정한다.)

- 이때, **round-robin 방식으로 값이 0인 flag가 있는 버퍼를 찾는다.**

  - clock hand는 "current buffer"에 있다.

  - 새 블록에 대한 버퍼가 요청되면 **BM은 0의 버퍼를 찾을 때까지 clock hand를 회전하고 이를 사용하여 새 블록을 읽고 배치한다.**

    - clock이 버퍼를 1로 전달하면 버퍼를 0으로 설정한다.

    - clock hand가 회전을 완료하고 다시 돌아와 마지막으로 설정된 0을 가진 블록을 찾을 때까지 액세스되지 않은 경우에만 버퍼에서 블록이 대체된다.

<br />

# Placing File Records on Disk

<hr />

## Records and Record Type

**Record: "관련" 데이터 값 또는 항목의 collection**

<div>
  <img src="https://user-images.githubusercontent.com/33220404/144818522-797311d6-2d23-4745-b357-de569aec9cac.png" width="700px">
</div>

- 값은 레코드 필드(or 튜플 속성)에 해당된다.

**Record type (format): 필드 이름 및 해당 데이터 유형의 collection**

- Data types: numeric, string, boolean, date/time ...

- BLOB(Binary Large Object): unstructured objects(이미지, 비디오 또는 오디오 스트림)

  - BLOB 데이터 항목: 디스크 block pool에 해당 레코드와 별도로 저장된다. (레코드에 보관된 BLOB에 대한 포인터)

- CLOB(Character Large Objects): for storing free text

<br />

## Files, Fixed-Length Records, and Variable-Length Records

### File: a sequence of records.

<div>
  <img src="https://user-images.githubusercontent.com/33220404/144819544-3fbb6416-8557-488f-8b35-e92fa9b5b628.png" width="300px">
</div>

- header에는 file의 모든 meta 정보가 있다.

### Fixed-length records

- 파일의 모든 레코드는 정확히 같은 크기(byptes)를 갖는다.

### Variable-length records

- 파일의 레코드마다 크기가 다르다.

- 1. 하나 이상의 필드에 **가변 길이가 있다.** (예: VARCHAR 2)

- 2. 하나 이상의 필드가 **반복된다.**

<div>
  <img src="https://user-images.githubusercontent.com/33220404/144820097-6de396e5-6ad3-499b-92d5-53b07aa33af0.png" width="300px">
</div>

- 3. 하나 이상의 필드는 **선택 사항이다.**

- 4. 파일에 다양한 유형의 레코드가 포함되어 있다.

<br />

## Variable-length records file의 record format을 위한 세 가지 옵션 (ex. EMPLOYEE)

### 1. 6개의 필드와 71바이트 크기의 <u>fixed-length</u> 레코드: easy location

<br />

<div>
  <img src="https://user-images.githubusercontent.com/33220404/144820571-83ff7652-78d2-48b6-a6b0-b0acdaa03d7c.png" width="800px">
</div>

- 구현하기 쉽다.

- Search시 해당 레코드에 바로 갈 수 있다.

- 하지만, 낭비가 심하다. (필요없는 공간이 생김)

### 2개의 variable-length 필드와 3개의 fixed-length 필드가 있는 레코드: for variable-length

<br />

<div>
  <img src="https://user-images.githubusercontent.com/33220404/144821186-7474e4cc-b6d9-4f4e-a6d8-d3e8bdccff01.png" width="800px">
</div>

- **Separator Characters**를 위해 매번 check해야 한다. (시작과 끝)

- 길이가 다르기 때문에 구현이 힘들다.

### 3가지 types의 separator character가 있는 variable-field 레코드: with optional fields

<br />

<div>
  <img src="https://user-images.githubusercontent.com/33220404/144821209-adfb2db2-e7a5-4cbd-a64f-9dba9766e161.png" width="800px">
</div>

- 해킹 위험이 발생한다.

<br />

## Record Blocking and Spanned vs. Unspanned Records

**파일의 레코드는 디스크 블록에 할당되어야 한다.**

- Why? 블록은 디스크와 메모리 간의 데이터 전송 단위이다.

- |block| >= |record| 일때, 각 블록에는 수많은 레코드가 포함된다.

### Spanned records

<br />

<div>
  <img src="https://user-images.githubusercontent.com/33220404/144822262-74136ab6-0243-421f-9e0a-7bcf43549aa9.png" width="600px">
</div>

- 단일 블록보다 크다(페이지: 4K 또는 8K)

- 블록 이상에 걸쳐 있을 수 있다.

- 첫 번째 블록 끝에 있는 pointer는 나머지 레코드를 포함하는 블록을 가리킨다.

- **space 낭비는 없지만 pointer로 인한 disk I/O가 더욱 발생한다.**

### Unspanned records

<br />

<div>
  <img src="https://user-images.githubusercontent.com/33220404/144822291-aafac0ba-2a84-490c-99fa-5efb6c6a7067.png" width="600px">
</div>

- 레코드가 블록보다 작을 때 사용한다.

- 블록 경계를 넘을 수 없다.

- **pointer가 없어 disk block access에 드는 비용이 없다. 하지만 space 낭비가 생긴다.**

<br />

### Blocking factor: avg. # of records per block for the file

- **일부 사용되지 않은 공간 = B – (bfr \* R) bytes**

  - B: block size, R: record size, bfr: blocking factor for the file

- **bfr은 r개 레코드 파일에 필요한 블록 수, 즉 b를 계산하는 데 사용할 수 있다.**

  - b = ceiling((r / bfr)) blocks

    - r: 파일에 대한 레코드 수

<br />

## Allocating File Blocks on Disk

### 1. Contiguous allocation

- **파일 블록을 연속된 디스크 블록에 할당한다.**

- 더블 버퍼링으로 전체 파일을 빠르게 읽을 수 있지만 확장하기 어렵다.

  - 저장할 레코드가 있는데 남은 연속적 공간이 없을 때 사용하지 못한다.

  - 유연성 저하. Fregmentation 발생.

### 2. Linked allocation

- **각 파일 블록은 다음 파일 블록에 대한 포인터를 포함한다.**

- **확장은 쉽지만 전체 파일을 읽는 속도가 느리다.**

  - Fragmentation이 발생하지 않지만, Random Access가 많이 발생한다.

### 3. Cluster allocation

- **1. Contiguous allocation**과 **2. Linked allocation**의 조합이다. (긱 장점 극대화)

- 연결된 Cluseters 또는 호출된 파일 segments 또는 extents를 할당한다.

### Indexed allocation

- 하나 이상의 인덱스 블록은 실제 파일 블록에 대한 포인터를 포함한다. (ex. hash file)

- record가 어디에 있는지 알아내기 위해 또다른 index file을 생성한다.

<br />

# Operations on Files

<hr />

## File Organization (vs. Access Method)

파일 데이터를 레코드, 블록 및 액세스 구조로 구성하는 것을 말한다.

레코드와 블록이 디스크에 배치되고 상호 연결되는 방식을 포함한다.

### How to organize records in files?

- **Heap**: 공간이 있는 파일의 아무 곳에나 레코드를 배치할 수 있다.

- **Sequential**: 각 레코드의 검색 키 값(=> 정렬된 파일 관련)을 기준으로 레코드를 순차적으로 저장한다.

- **Hashing**: 각 레코드의 일부 속성에서 계산된 해시 함수를 사용한다. 결과는 레코드를 배치해야 하는 파일의 블록을 지정한다.

- **Multitable clustering file organization**: 여러 다른 관계의 레코드를 동일한 파일에 저장할 수 있다.
  
    - **I/O를 최소화하기 위해** 동일한 블록에 관련 레코드를 저장한다.

    - 즉, 서로 다른 relation에 있는 튜플들을 하나의 필드에 넣는 것이다. (join 줄임)

    - denomalization에 활용될 수 있다.

<br />

## Access Method (vs. File Organization)

**파일에 적용할 수 있는 operations 그룹을 제공한다.**

- Open, Find, FindNext, Read, Delete, Modify, Insert, Close, Scan.

특정 organization을 이용하여 정리한 파일에 여러 access method을 적용할 수 있다.

일부 access method은 특정 방식으로 정리된 파일에만 적용할 수 있다.

- ex) 인덱스가 없는 파일은 인덱스 접근 방식을 적용할 수 없다.

<br/>

# Files of Unordered Records (Heap Files)

<hr />

> 가장 단순하고 기본적인 조직 유형으로, **레코드는 삽입된 순서대로 파일에 배치된다.** 즉, 파일 끝에 새 레코드가 삽입된다.

### Insert

**새 레코드의 "Insertion"은 매우 효율적이다.**

- 파일의 마지막 디스크 블록이 버퍼에 복사되어 새 레코드가 추가된다.

- 그런 다음 블록이 디스크에 다시 기록된다.

  - 마지막 파일 블록의 주소는 파일 버퍼에 보관된다.

### Search

**그러나 레코드 "Searching"은 linear search로 인해 비효율적이다.**

- 평균적으로 (b / 2) - b: 파일의 블록 수.

- 최악의 경우 b 파일 블록을 방문한다.

### Delete

**기록을 "Delete"하는 한 가지 방법**

- 먼저 블록을 찾고, 블록을 버퍼에 복사한다.

- 버퍼에서 레코드를 삭제하고 마지막으로, 블록을 디스크에 다시 쓴다.

**Another way: deletion marker를 사용하는 방법**

- 각 레코드와 함께 추가 비트 또는 바이트가 저장된다.

- marker를 특정 값으로 설정하면 레코드가 삭제된다. 

- marker의 다른 값은 유효한 레코드를 나타낸다. (검색은 블록의 유효한 레코드만 고려한다.)

- **단점으로, 스토리지 공간이 낭비된다.**

➡️ 두 접근 방식 모두 삭제된 레코드의 사용되지 않은 공간을 회수하기 위해 **파일을 주기적으로 재구성해야 한다.** (삭제되지 않은 기존 레코드 packing)

**Third way: 삭제된 레코드의 공간을 삽입용으로 사용하는 방법**

<br />

# File of Ordered Records (Sorted Files)

<hr />

> 물리적으로 디스크에 있는 파일의 레코드를 정렬 필드라고 하는 해당 필드 중 하나의 값을 기반으로 정렬한다.

- **Ordering key**: Ordering 필드가 파일의 키 필드인 경우 (ex. name, id, job ...)

### **장점 (heap files에 비해)**

- Ordering key로 레코드를 읽는 것은 매우 효율적이다.

  - No sorting required. 키의 검색/범위 조건에 강하다.

- 다음 레코드를 찾는 데 해당 레코드가 블록의 마지막 레코드가 아닌한, 추가 블록 액세스가 필요하지 않다.

- **binary search** 기술을 사용하여 ordering key 값에 대한 검색을 수행할 수 있으므로 더 빠른 액세스가 가능하다.

### Deletion: pointer chains 또는 deletion marker 활용

### Insertion: 레코드를 삽입할 위치를 찾는다.

<br />

<div>
  <img src="https://user-images.githubusercontent.com/33220404/144830427-c3a8f489-e0bd-4117-94ed-f54332e9d03f.png" width="400px">
</div>

- free space가 있으면 거기에 삽입한다.

- **free space가 없으면 "overflow(또는 transaction) block"에 레코드를 삽입한다.**

- **두 경우 모두 pointer chain을 업데이트해야 한다.**

**➡️ 순차적인 순서를 복원하기 위해 때때로 파일을 재구성해야 한다.**

<br />

### 기본 file organizations에서 b blocks의 파일에 대한 평균 access times

<br />

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/33220404/144831013-7f54b9af-284c-414e-ac86-64230621f282.png" width="700px">
</div>

<br />