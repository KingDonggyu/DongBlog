---
date: "2022-02-09"
title: "[Swift] Implicitly Unwrapped Optional"
category: "Language"
categoryColor: "darkorchid"
tags: ["Swift"]
thumbnail: "./images/Swift.png"
---

이전 포스트에서 보았던 Optional Unwrapping에는 **강제 추출, 옵셔널 바인딩**이 있었다.

이번에 보는 **Implicitly Unwrapped Optional**는 뭘까?

<br />

**IUO(Implicitly Unwrapped Optional)**, 우리 말로 **암시적 옵셔널 추출**이다.

**별도의 추출하는 과정을 거치지 않아도 자동으로 옵셔널이 해제되는 것이다!!**

```swift
var x: Int!
```

위 코드처럼 변수를 생성할 때 기존 옵셔널 타입을 선언할 때처럼 Type뒤에 `?`를 붙이는 것이 아닌, **`!`를 붙인다.**

**IUO도 옵셔널 타입으로 선언하는 방법 중 하나**이기에, 위 코드의 `x`의 타입은 마찬가지로 `Optional<Int>`이다.

<br />

기존 옵셔널 타입과 달리 **Non-Optional Type으로 처리되어야 할 때 값을 자동으로 추출해준다.**

그러면 옵셔널 바인딩을 왜쓰지? IUO 쓰면 안되나??

<br />

```swift
var x: Int! = 67
print(x)  // Optional(67)
```

위 코드를 시행하면 `Optional(67)`이 출력된다..

왜냐하면 IUO는 **아무 때나 자동 추출하지 않는다. 특정 조건일 때만 강제 추출한다!**

<br />

```swift
// 기존 Optional Type
var x: Int? = 2
var y: Int = x  // error 발생

// IUO
var a: Int! = 2
var b: Int = a
```

위 코드를 보면,

기존 옵셔널 선언은 에러를 뱉어낸다. **Optional Type을 Non-Optional Type에 대입하고 있으니까!**

(Optional Binding을 통해서 넣어야 한다.)

<br />

**하지만 IUO는 가능하다.**

❗️ IUO를 사용한다고 원하는 때에 다 자동으로 값이 Unwrapping이 되는 것이 아니다.

**Optional Type을 Non-Optional Type에 대입할 때 별도의 추출 과정 없이 대입이 가능한 것이다!!**

<br />

## IUO = 강제 추출

암묵적 추출이라 하더라도 얘도 강제 추출이다.

```swift
var x: Int! = nil
var y: Int = x  // error 발생
```

따라서, 위 코드와 같이 `nil`인 경우 암묵적 추출을 하려고 하면 에러가 발생한다.

그렇다면 IUO 왜 사용하는거지..?

<br />

## 언제, 왜 사용할까?

```swift
@IBOutlet weak var tableView: UITableView!
```

iOS 개발 시 `IBOultet`을 사용할 때 바로 IUO를 사용한다!!

**프로퍼티 지연 초기화**를 하기 위해 사용한다 한다.

(사실 이게 뭔지 아직 잘 모른다.. 후에 학습한 뒤 포스팅하도록 하겠다.)

<br />

우리가 직접 IUO를 코딩할 일은 거의 없다..

**1. IBOutlet**

**2. API에서 IUO를 return 한 경우**

위 두 경우 외엔 **그냥 안전하게 Optional Binding을 쓰는 것이 좋다.**

강제 추출이라는 위험성이 없으니까!

