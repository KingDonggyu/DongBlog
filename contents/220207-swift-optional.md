---
date: "2022-02-07"
title: "[Swift] Optional"
category: "Language"
categoryColor: "#25e5bd"
tags: ["Swift"]
thumbnail: "./images/Swift.png"
---

스위프트의 🌸 이라 하면 **옵셔널(Optional)** 이라 할 수 있다.

스위프트를 처음 접했을 때 가장 이해하기 힘들었던 개념이다..

## 정의 

옵셔널은 `nil`을 사용할 수 있는 타입과 없는 타입을 구분하기 위해 사용하며,

`nil`을 사용할 수 있는 타입을 **Optional Type** 이라 부른다.

```swift
var number: Int?
```

이 옵셔널 타입을 선언할 땐 타입 옆에 `?` 를 붙인다

<br />

그렇다면, **`nil`** 이란 무엇일까? ➡️ 바로, **값이 없음**을 뜻한다.

프로그램의 안정성을 위해 오류를 내지 않는 대신 `nil`을 돌려주는 형식으로 사용한다.

즉, 원하는 결과가 없다고 Crash를 발생시키는 것이 아닌, `nil`을 발생시킨다.

때문에 **옵셔널은 스위프트의 안정성을 위해 사용되는 것이다.**

<br />

## Non-Optional Type vs Optional Type

`nil`은 특수한 값이기 때문에 일반적으로 쓰이는 자료형은 이를 담지 못한다.

**`nil`을 담을 수 있는 건 오로지 옵셔널로 선언된 자료형 뿐이다.**

<br />

**Non-Optional Type**은 <u>1)Type Inference(선언과 동시에 초기화)</u>를 해주거나, <u>2)Type Annotation</u>을 사용해야 한다.

```swift
// 1)
var number = 123
// 2)
var name: String
name = "kim"
```

Non-Optional Type은 **무조건 값을 가져야 한다!!** 없을 경우 에러가 남.

<br />

이제 **Optional Type**에 대해 알아보겠다.

**1. Type Annotation 이용**

다음과 같이 자료형의 뒤에 `?`를 붙여준다.

```swift
var name: String?
name = nil  // ?로 선언된 변수에는 nil 값을 저장할 수 있음
```

**2. Type Inference 이용**

```swift
var a: Int?  = nil
let b = a
```

위 코드처럼 이미 옵셔널 타입의 값인 `a`를 `b`에 선언과 동시에 초기화 해주면 `b`도 옵셔널 타입으로 선언된다.

<br />

## Optional Unwrapping

```swift
var name: String?
```

위 코드의 `name`은 `String` 타입일까?

```swift
var name: String?
var name2: String
name2 = "Kim"

print(type(of: name))
print(type(of: name2))
```

위의 두 타입 값의 자료형을 출력해보면 

```
String
Optional<String>
```

다르다!!!

`String?` 타입 값의 자료형은 `String`을 옵셔널로 한번 감싼 타입으로, **Optional String Type (옵셔널 스트링 타입)** 이라 부른다. (`Int?` 라면 Optional Int Type)

일반 `String` 타입과 엄연히 다른 타입이다.

이처럼 옵셔널 타입은 기존 자료형을 **`Optional`로 한번 감싸버리기 때문에** 옵셔널 타입의 값을 사용할 때는, **`Optional`이란 포장지를 풀고 사용해야 한다.**

이를 **Optional Unwrapping** 이라 한다.

<br />

이에 대해서는 다음 스위프트 포스트에 자세히 다루도록 하겠다.