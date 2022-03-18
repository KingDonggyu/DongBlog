---
date: "2022-02-15"
title: "[Swift] Stored Property"
category: "Language"
categoryColor: "#25e5bd"
tags: ["Swift"]
thumbnail: "./images/Swift.png"
---

이번엔 옵셔널이 아닌 프로퍼티에 관하여 학습해보려 한다.

옵셔널에 대한 내용이 아직 많지만, 최근 GongDon iOS 앱 개발(https://github.com/Gong-Don/iOS) 수행 중에 `lazy` 의 개념에 대해 깊이 알고 싶어졌다.

궁금증을 먼저 해소한 뒤 옵셔널로 다시 돌아가겠다..

<br />

## 프로퍼티란?

Swift에서는 프로퍼티가 총 3가지 형태로 존재한다.

**1. Stored Property : 저장 프로퍼티**

**2. Computed Property : 연산 프로퍼티**

**3. Type Property : 타입 프로퍼티**

이번 포스팅에 대한 내용이 바로 **Stored Property**, 즉 **저장 프로퍼티**이다.

연산 프로퍼티와 타입 프로퍼티에 대해서는 다음, 그 다음 포스트에서 다루도록 하겠다.

<br />

## 저장 프로퍼티(Stored Property)

💡 **클래스와 구조체에서만 사용할 수 있고, 값을 저장하기 위해 선언되는 상수/변수**

먼저 클래스와 구조체의 차이에 대해 설명하겠다.

```swift
class Human {
    let name: String = "unknown"
    var age: Int = 0
}
 
struct Person {
    let name: String = "unknown"
    var age: Int = 0
}
```

`Human` 클래스와 `Person` 구조체에 저장된 **`name` 상수, `age` 변수 모두 저장 프로퍼티**이다.

<br />

### 클래스 인스턴스를 let/var으로 선언

아래와 같이 `peter`란 옵셔널 **상수**로 **Human** 클래스 인스턴스를 만들었다.

(선언 위치는 **지역변수**라 가정)

```swift
let peter: Human? = .init()
```

그리고 나서 `peter` 인스턴스를 통해 저장 프로퍼티인 `name`과 `age`를 각각 변경해보면,

**`name` 값 변경은 에러가 나고, `age` 값 변경은 문제가 없다.**

`peter` 인스턴스를 `let`, 즉 **상수**로 선언 했는데, 어떻게 `age` 저장 프로퍼티가 `var`라 해도 변경할 수 있을까?

<br />

**클래스**는 **참조타입**이기 때문에, 메모리에

❗️ **지역 상수 `peter`는 스택에 할당 되고, 실제 `Human` 인스턴스는 힙에 할당된다.**

- 스택에 있는 `peter`는 힙 영역에 있는 인스턴스를 참조하고 있는 형태이다.

- 따라서 `peter` 안에는 힙에 할당된 인스턴스의 주소값이 들어있다.

따라서, **클래스의 경우 인스턴스 생성 당시 `let`으로 선언하든 `var`로 선언하든 클래스의 저장 프로퍼티에 접근하는 것엔 아무 영향을 주지 않는다!**

<br />

### 구조체 인스턴스를 let/var으로 선언

아래와 같이 `peter`란 옵셔널 **상수**로 **Person** 구조체 인스턴스를 만들었다.

(Swift에선 클래스, 구조체 모두 인스턴스라 한다.)

```swift
let peter: Person? = .init()
```

그리고 나서 `peter` 인스턴스를 통해 저장 프로퍼티인 `name`과 `age`를 각각 변경해보면,

이번엔 **`name` 상수도, `age` 변수도 모두 값 변경을 하지 못한다며 에러가 발생한다.**

<br />

**구조체는 값타입**이기 때문에, 메모리에

❗️ **구조체의 저장 프로퍼티들도 모두 스택에 같이 올라간다.**

- 클래스처럼 힙에 할당된 인스턴스를 참조하는 것이 아니다.

따라서, **구조체 인스턴스를 `let`으로 선언한 순간 구조체의 모든 프로퍼티를 변경할 수 없다!**

<br />

## 지연 저장 프로퍼티(Lazy Stored Property)

💡 **프로퍼티가 호출되기 전까지는 선언만 될 뿐 초기화되지 않고 있다가, 프로퍼티가 호출되는 순간에 초기화 되는 저장 프로퍼티**

```swift
class Contacts {
   var email: String = ""
   var address: String = ""
 
    init() { print("Contacts Init") }
}
 
class Human {
   var name: String = "unknown"
   var contacts: Contacts = .init()
}
```

```swift
let peter: Human = .init()
```

위와 같은 `Contacts`를 저장 프로퍼티로 가지는 `Human`이란 클래스를 정의한 다음,

`peter`란 클래스 인스턴스를 만들고 초기화했다.

<br />

원래 **클래스건 구조체건 인스턴스를 생성할 경우 초기화 구문(initializer)이 불리는 순간 모든 프로퍼티가 초기화 되어야 한다!**

(기본값을 가지든, 생성자를 통해 초기화 하든)

따라서 `peter` 인스턴스를 만들고 `init`을 호출한 순간,

**`Human` 인스턴스 내에 있는 모든 프로퍼티들이 초기화되며, `contacts`란 프로퍼티도 초기화된다.**

(`Contacts Init` 이 출력된다.)

이게 정상인데..

<br />

**만약 `contacts`란 저장 프로퍼티 앞에 `lazy`란 키워드를 붙이면?**

```swift
class Contacts {
   var email: String = ""
   var address: String = ""
 
    init() { print("Contacts Init") }
}
 
class Human {
   var name: String = "unknown"
   lazy var contacts: Contacts = .init()
}
```

`Contacts Init` 이 출력되지 않는다!! **lazy! 지연되기 때문이다!**

선언만 됐을 뿐 `contacts`란 변수 자체가 초기화 되지 않는 것이다.

다음과 같이 `contacts`란 변수에 처음으로 접근하고자 하면

```swift
sodeul.contacts.address = "none"
```

**이때 `contacts`란 변수가 초기화** 되면서, `Contacts Init` 가 출력된다.

<br />

### 지연 저장 프로퍼티의 특징

**인스턴스가 초기화와 상관 없이, 처음 사용될 때 개별적으로 초기화된다.**

➡️ 따라서 항상 **변수**로 선언되어야 한다.

`let`으로 선언될 경우 우리가 필요한 시점에 초기화를 진행할 수 없기 때문이다.

(이미 메모리에 올라는 가 있지만, 필요한 시점에 내가 원하는 값으로 초기화 되어야 하니..)

<br />

**그럼 지연 저장 프로퍼티는 어떨 때 쓸까?**

만약 `Contacts`란 클래스에 100,000개의 Element를 갖는 `email`이란 저장 프로퍼티를 선언했다.

```swift
class Contacts {
    var email: [String] = .init(repeating: "", count: 100000)
    var address: String = ""
 
    init() { print("Contacts Init") }
}
 
class User {
    let name: String = "unknown"
    lazy var contacts: Contacts = .init()
}
```

이때 `Contacts`에 대한 정보가 있는 유저도 있고, 없는 유저도 있을 것이다.

**`lazy`로 선언하지 않는다면, `Contacts`란 인스턴스가 유저 수만큼 10,000개 생겨 버린다..**

<br />

그런데 **`lazy`로 선언할 경우,**

`Contacts`란 인스턴스가 `contacts`란 프로퍼티에 접근하는 유저 수인 5,000개 만큼만 생기고,

접근하지 않는 유저 수인 5,000개는 초기화 되지 않아 생기지 않을 것이다!!

<br />

이처럼, **`lazy`를 잘 사용할 경우 성능도 향상되고, 메모리 낭비도 줄일 수 있다.**

- 계산된 결과를 저장하므로 속성에 대한 후속 액세스가 작업을 다시 실행하지 않기 때문에, **성능 UP**

- 반복적으로 사용할 경우 값이 캐시되므로, **성능 UP**

<br />

### 하지만❗️ 모든 곳에 `lazy`를 사용해야하는 것은 아니다!! (내가 궁금했던 부분)

`lazy` 프로퍼티보다 **연산 프로퍼티를 선호**하는 경우는 다음과 같다.

- **`lazy` 프로퍼티를 사용하면 예상치 못한 작업이 실수로 생성될 수 있다.**

    예를 들어, 게임을 빌드하고 복잡한 `lazy` 프로퍼티에 처음으로 액세스하면 게임 속도가 느려질 수 있으므로, 미리 느린 작업을 수행하고 방해가 되지 않도록 하는 것이 훨씬 좋다.

- **`lazy` 프로퍼티는 항상 결과를 저장한다.**

    이 결과는 불필요하거나(다시 사용하지 않기 때문) 무의미할 수 있다. (자주 다시 계산해야 하므로)

- **`lazy` 프로퍼티는 연결된 기본 개체를 변경하므로 `let` 구조에서는 사용할 수 없다.**

    코드를 최적화하려고 할때, 일반적으로 `lazy` 프로퍼티와 같은 것을 조기에 분산시키는 것보다 최적화 해야하는 문제가 실제로 발생할 때까지 기다리는 것이 좋다.

<br />

이상으로 저장 프로퍼티에 관한 내용을 마치겠다.

iOS 개발에 무분별하게 사용한 `lazy` 프로퍼티에 고민하고 불필요한 것은 수정하러 가보겠다..😅