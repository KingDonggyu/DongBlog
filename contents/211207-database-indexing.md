---
date: "2021-12-07"
title: "[Database] Indexing Structures for Files"
category: "Data Science"
categoryColor: "seagreen"
tags: ["DB"]
thumbnail: "./images/DB.png"
---

> Indexes(색인)는 특정 검색 조건에 대한 응답으로 레코드 검색 속도를 높이는 데 사용된다.

> Index structures는 secondary access paths를 제공하는 "디스크의 추가 파일"이다. 이는 디스크의 기본 데이터 파일에 있는 레코드의 물리적 배치에 영향을 주지 않고 레코드에 access할 수 있는 대체 방법을 제공하며, indexes를 구성하는 데 사용되는 indexing 필드를 기반으로 레코드에 <u>효율적으로 access</u>할 수 있다.

**인덱스를 만드는 데 모든 필드를 사용할 수 있다.**

- 서로 다른 필드에 여러 인덱스를 구성할 수 있다.

- 여러 필드에 대한 (multi-level) 인덱스를 구성할 수 있다.

  - **동일한** 파일에 대한 두 가지 유형의 인덱스

**인덱싱 필드의 검색 조건을 기반으로 데이터 파일에서 레코드를 찾으려면?**

- 인덱스 파일이 검색되어 필요한 레코드가 있는 데이터 파일의 하나 이상의 **디스크 블록에 대한 포인터를 안내한다.**

**index를 구성하려면?**

- 대부분의 인덱스는 정렬된 파일(single-level indexes)을 기반으로 하며 tree 데이터 구조(multi-level indexes, ex. B+ tree)를 사용한다.

<br />

# Types of Single-Level Ordered Indexes

<hr />

## Ordered Index (정렬 색인)

**Indexing field (attribute)**

- 인덱스 구조가 일반적으로 정의되는 <u>single field of a file</u>

- **인덱스 필드의 각 값은 해당 필드 값을 가진 레코드를 포함하는 모든 디스크 블록에 대한 포인터 목록과 함께 인덱스 파일에 저장된다.**

<br />

**인덱스의 값은 "ordered" 또는 "sorted"이다.**

- Why? **인덱스에서 binary search(linear search가 아닌)을 수행한다.**

**인덱스 파일은 데이터 파일보다 훨씬 작다.**

- Why? **key와 pointer만 보유하기 때문이다.**

<br />

## Several Types of Ordered Index

### Primary index

- 정렬된 레코드 파일의 **ordering key** 필드에 지정된다.

### Clustering index

- **non-key ordering** 필드에 지정된다. (여러 레코드의 필드에 대해 **동일한 값을 가질 수 있다.**)

  - 즉, 중복 가능한 필드로 만든 index이다.

  - (물리적) 데이터 파일을 **clustered 파일**이라고 한다.

- **파일은 최대 하나의 물리적 순서 필드를 가질 수 있으므로** **최대 하나의 primary 인덱스 또는 하나의 clustering 인덱스를 가질 수 있지만 둘 다 가질 수는 없다.**

### Secondary index

- **non-ordering** 필드에 지정된다.

  - 정렬 상관없이 지정한 필드에 대한 모든 index이다.

- 데이터 파일에는 여러 개의 secondary 인덱스가 있을 수 있다.

<br />

## Primary Indexes (주요 색인)

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144964117-c26b81ce-c96d-436a-a567-8abcdb41cb00.png" width="500px">
</div>

<br />

- Index file은 **각 block의 첫번째 record에 대한** **primary key value**와 **block pointer**를 가진다.

  - **이미 primary key field가 정렬되어 있기 때문에, 첫번째 value만 알면 나머지는 쉽게 찾을 수 있다.**

- Index file의 key를 이용하여 전체를 **binary search**한 후, 연결된 block 안에서도 **binary search**를 하여 search key를 발견한다.

> > Index는 **dense**하거나 **sparse**하다. **Dense index**에는 데이터 파일의 **모든 검색 키 값(모든 레코드)** 에 대한 인덱스 항목이 있다. **Sparse index**에는 **일부** 검색 값에 대한 항목만 있다.

➡️ **Primary index는 sparse하다.** (field의 first record에 대한 index 항목만 가지기 때문)

<br />

**Primary 인덱스의 인덱스 파일은 데이터 파일보다 훨씬 작은 공간을 차지한다.**

- 1. 데이터 파일에 있는 레코드보다 인덱스 항목이 더 적다.

- 2. 각 인덱스 항목은 두 개의 필드 또는 (key, block address)만 있기 때문에 일반적으로 데이터 레코드보다 크기가 작다.

➡️ **따라서 인덱스 파일에 대한 binary search은 데이터 파일에 대한 binary search보다 더 적은 수의 블록 액세스가 필요하다.**

<br />

### Priblems

주요 문제: **records의 insertion 및 deletion**

- 데이터 파일의 "올바른" 위치에 레코드를 삽입하려고 하면,

  - 새 레코드를 위한 공간을 만들기 위해 **레코드를 이동**할 뿐만 아니라

  - 또한 일부 **index entries을 변경**해야 한다.

  - 레코드를 이동하면 일부 블록의 블록 anchors가 변경된다.

**Insertion 문제를 해결하는 방법**

- **unordered overflow file**을 사용한다.

- 데이터 파일의 각 블록에 대해 **overflow 레코드의 linked list**을 사용한다.

  - hashing 기술에서 overflow 레코드를 처리하는 것과 유사하다.

  - 검색 시간을 단축하려면 각 블록과 해당 overflow linked list 내의 레코드를 정렬한다.

**Deletion 문제를 해결하는 방법**

- **deletion markers**를 사용한다.

<br />

## Clustering Indexes (군집 색인)

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144967953-d1d3ea5d-0379-4235-b8d8-1898804b559d.png" width="500px">
</div>

<br />

- non-key field에 대해 정렬한 후, **distinct한 값 즉, 각기 다른 값들 가지로 index file을 만든다.**

  - Index 파일의 record는 **데이터 파일의 discticnt한 vlaue를 가지고 있는 최초의 record가 속하는 block에 대한 Clustring field value와 Block pointer만을 가진다.**

- 만든 index record를 정렬시켜 binary search를 적용한다.

➡️ **따라서 Clustering Index의 record들은 unique하다.**

<br />

### Problems

주요 문제: **records의 insertion 및 deletion**

- **Physically ordering** 때문에

**Insertion/Deletion 문제를 해결하는 방법**

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144968469-2b975e3a-defc-4e74-8cd2-7c4fdbbbcae5.png" width="500px">
</div>

- overflow block list로 record를 추가하고, pointer를 업데이트한다.

- 이렇게 하면 고유한 값을 가진 모든 레코드가 (동일한) 블록(또는 블록 클러스터)에 배치된다.

  - Insertion/Deletion가 비교적 간단해진다.

<br />

## Secondary Indexes (보조 색인)

**데이터 파일에 액세스하는 보조 (추가적인) 수단을 제공한다.**

- 일부 기본 액세스가 존재한다.

- 데이터 레코드를 정렬하는 것은 중요하지 않다.

**모든 레코드에 고유한 값이 있는 키 필드** 및 **중복 값이 있는 키가 아닌 필드**에 생성할 수 있다. 또한, 같은 데이터 파일에 대해 여러 Secondery 인덱스를 생성할 수 있다.

<br />

### Secondary Index on a Key Field

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144969169-03c1a534-d479-4c81-aade-90ee987be74f.png" width="500px">
</div>

<br />

**Key Field: 모든 레코드에 대해 고유한 값을 가진다.**

- **secondary key**라고 한다. 이 경우 **데이터 파일의 각 레코드에 대해 하나의 인덱스 항목이 있다.**

- Index 파일의 record는 각각 **record field의 값과 record를 포함하는 block 또는 record 자체에 대한 pointer를 가진다.**

- **dense**하다.

<br />

### Problems

**Secondary 인덱스는 일반적으로 Primary 인덱스보다 더 많은 저장 공간과 더 긴 검색 시간이 필요하다.**

- 대신 독단적인 레코드에 대한 검색 시간이 개선된다. (아무 field에 대해 만들 수 있기 때문에 query가 general하다.)

<br />

## Summary of Index Types

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144970082-5a26ac33-8f25-43c7-9690-1dbb1fccb64e.png" width="800px">
</div>

<br />

# Multilevel Indexes

<hr />

> 검색 시 남은 검색 공간을 크게 줄이도록 설계한다. 인덱스 블록에서 blocking factor (fanout)을 증가시킨다.

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144971209-60a8d09e-4b60-4c4d-a402-8cf8d59c1976.png" width="500px">
</div>

<br />

- **A two-level primary index**

  - static structure의 **ISAM(Indexed Sequential Access Method)**

<br />

# Dynamic Multilevel Indexes

<hr />

## Why Dynamic?

**ISAM: 여전히 인덱스 삽입 및 삭제를 처리하는 문제에 직면**

- 1. 모든 인덱스 수준은 물리적으로 정렬된 파일이며 **삽입/삭제 시 구조가 이후에 변경되지 않는다.**

- 2. **오버플로 페이지로 인한 성능이 저하된다.**

**이러한 inflexibility(경직성)을 해결하기 위해,**

- **새 항목을 삽입하기 위해 각 인덱스 블록에 약간의 공간을 남겨 둔다.**

- 데이터 파일이 늘어나고 줄어들 때 새 인덱스 블록을 생성/삭제하기 위해 **적절한 삽입/삭제 알고리즘을 사용한다.**

**➡️ 따라서, Tree 데이터 구조를 기반으로 Dynamic Multilevel Index를 이용한다.**

<br />

## Review of Tree Data Structure

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144971775-3739f86f-d013-4f50-943e-13dd7cf0d7a1.png" width="600px">
</div>

<br />

- **unbalanced** 트리를 보여주는 트리 데이터 구조

  - 어느 부분은 빠르고, 어느 부분은 느린 현상이 발생한다. (**Search Performance guarantee 되지 않는다.**)

  - **모든 경로의 코스를 똑같이 만들어 어느 경로를 접근하더라도 Leaf Node만 도달할 수 있으면 성능을 높일 수 있다.**

<br />

## B+ Tree Structures

- **삽입/삭제는 log_p N 비용으로 수행 가능하다.**

  - (**p** = fanout (한 노드 안의 몇개의 index entriesfmf 넣을 수 있는가), **N** = # leaf pages)

- **트리 height-balanced를 유지한다.**

- **fanout을 최소 50% 점유해야 한다**(루트 제외). - Rull!

- 각 노드는 d <= m <= 2d 항목을 포함한다.

  - 매개변수 d를 트리의 차수라고 한다.

- **equality** 및 **range-seraches**을 효율적으로 지원한다.

> > Search를 Guide하는 node를 **Internal nodes**라 하며, pointer를 통해 실제 record에 접근 가능한 node를 **Leaf nodes**라 한다.

- Leaf nodes는 각기 연결되어 있는데, 이로 인해 Internal node를 다시 search할 필요가 없다.

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144972778-f1adc83e-8904-4595-94a5-b3b8de917ca0.png" width="600px">
</div>

<br />

## Inserting an Index Entry into a B+ Tree

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144972917-ebfd5b53-77a5-4506-a34c-cfce9f9a81f8.png" width="600px">
</div>

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144973031-69a7fb15-383e-4652-bd6f-12ad89f30def.png" width="600px">
</div>

(위 이미지는 8\* 을 inserting하는 과정이다.)

- 먼저 올바른 Leaf L을 찾은 후, 인덱스 항목을 L에 넣는다.

- 이때, 공간이 충분하면 완료되지만, 그렇지 않으면 L을 **Spilt**해야 한다. (L과 새 노드 L2로)

  - entries를 균등하게 재분배하고 middle key를 **Copy Up** 한다.

  - 그리고 L2를 가리키는 인덱스 항목을 L의 부모에 삽입한다.

  - 이것은 **재귀적**으로 발생할 수 있다.

- split은 트리를 "grow"하게 한다. 더 넓어지거나 높아진다.

  - 이때, **re-distribiting을 통해 분할을 피할 수 있다.**

    - hight를 높이지 않고 기존에 옆에 있는 sibiling을 찾아 비어있는 공간을 채운다.

    - 이로 인해, 평균 점유을이 향상된다.

    - 하지만, 이것은 일반적으로 실제 수행되지 않는다.

      - **빈 공간을 채우는 것은 새로운 disk block에 대한 access가 필요하므로, 차라리 height를 높이는 것이 I/O가 증가하는 것보다 효율적이다.**

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144974167-c28a21bd-8974-47d3-a4e1-f769414783cf.png" width="600px">
</div>

<br />

## Deleting an Index Entry from a B+ Tree

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144974307-199f66ee-d592-4bf2-8a4f-29293ddfcee8.png" width="600px">
</div>

(위 이미지는 19\*와 20\*을 삭제한 전/후 결과이다.)

- 먼저 루트에서 시작하여 entry가 속한 leaf L을 찾아 제거한다.

- 이때, 제거한 L이 최소 절반이 차있으면 완료되지만, 그렇지 않은 경우 (L에 d-1 항목만 찬 경우) **sibling에서 빌려 re-distribute(재배포)한다.**

<br />

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/33220404/144975412-f6856aab-4763-4d5b-b4f2-82a63799912d.png" width="600px">
</div>

(위 이미지는 19\*와 20\*, 24\*을 삭제한 전/후 결과이다.)

- **재배포에 실패하면 L과 sibling을 merge한다.**

  - **merge가 발생하면 L의 상위 항목을 삭제해야 한다.**

  - merge가 루트로 전파되어 **높이가 감소**될 수 있다.

    - 루트 노드가 가리키는게 잘못되어버림으로, **Pull down**하게 된다.

    - search cost가 감소된다.

  - 이는 상당한 I/O가 발생한다.
