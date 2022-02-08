---
date: "2022-02-08"
title: "[Swift] Optional Unwrapping"
category: "Language"
categoryColor: "darkorchid"
tags: ["Swift"]
thumbnail: "./images/Swift.png"
---

## Optional Unwraaping

지난 포스트에서 설명했듯이, 스위프트에서는 `nil`이라는 **'값 없음'** 을 사용하려면 **Optional(옵셔널)** 이라는 것을 사용해야 한다.

그리고 Optional로 선언된 자료형은 **일반 자료형이 아닌** `Optional`로 한번 포장된 **Optional 자료형**이다.

```swift
let num: Int?
print(type(of: num)) // Optinal<Int>
```

이 Optional 자료형을 사용하기 위해서는 `Optional`이란 포장지를 벗겨주고 사용해야 한다.

이 작업을 바로 **Optional Unwraaping** 이라 한다.

<div style="text-align:center">
  <img src="https://blog.kakaocdn.net/dn/baE992/btqFC95pGP2/NUb9vHQNKZoHfvWIEePDSk/img.png" width="600">
</div>

위 그림처럼 **Optional Unwraaping을 하면 Optional Type을 Non-Optional Type으로 변환할 수 있다.**

> **❗️ 주의사항**: Optional Unwrapping을 할 때 절대 Unwrapping 하고자 하는 변수가 `nil`이면 안 된다.

**`nil`은 값이 아니다!!** `Optional`은 값을 포장하는 것이지 값이 없음을 뜻하는 `nil`을 감싸지 않는다.

```swift
var x: Int? = nil
var y: Int? = 67
print(x) // nil
print(y) // Optional(67)
```

위 코드를 보면 두 결과가 다른 것을 볼 수 있다.

`nil`은 `Optional`이란 포장지가 없기에 포장지를 까는 Unwrapping도 하면 안된다. (에러가 발생한다.)

<br />

## 강제 추출(Forced Unwrapping)

'강제 추출' 이라는 말 그대로 **옵셔널에 값이 `nil`이건 말건 그냥 강제로 옵셔널을 벗겨버리는 것이다.**

이 강제 추출 연산자는 `!`를 사용한다.

```swift
var x: Int? = 67
print(x!) // 67
```

그럼 앞으로 모든 옵셔널에 `!`를 붙여서 사용할 때마다 강제 추출해버리면 되겠다!

라고 생각할 수 있지만 위에서 설명했듯 **`nil` 일 경우에도 옵셔널을 강제로 해제한다.**

그렇기에 이는 위험한 짓이다..

<br />

## 옵셔널 바인딩(Optional Binding)

**Optional Binding**은 Optional을 Unwrapping 하는 방법 중 하나로, **안전하게 Optional의 값을 Unwrapping 할 수 있다.**

어떻게? 다음 세 가지 Syntax를 통해!!

```swift
if let x: Type = OptionalExpression {

}

while let x: Type = OptionalExpression {

}

guard let x: Type = OptionalExpression else {

}
```

위 방식들의 공통점은

**1. 옵셔널의 표현식을 먼저 평가한다.**

**2. 값이 있는 경우(`nil`이 아님) 정의된 상수(`x`)에 옵셔널이 해제된 값을 저장하고 `true`를 반환한다.**

**3. 값이 없는 경우(`nil`) `false`를 반환한다.**

**4. 타입 추론이 되므로 Type Annotation은 대부분 생략한다.**

<br />

`while`을 이용한 방법은 거의 사용되지 않기 때문에 이는 제외하고 알아보겠다.

<br />

## 옵셔널 바인딩 - if let

```swift
if let nonOptionalNum = optionalNum {
    print(nonOptionalNUm)
} else {
    print(optionalNum)  // nil
}
```

표현식이 `nil`인지 아닌지 판별하여, `nil`이 아닌 경우 옵셔널 타입을 **Unwapping한 값**을 지정한 상수에 대입한다. 

<br />

❗️ **주의할 점**

**1. if 문 밖에서는 Unwrapping한 값을 대입한 상수에 접근할 수 없다.**

**2. 옵셔널 표현식을 Unwrapping한 값을 대입한 것일 뿐, Unwrapping한 변수(위 코드에서 `optionalNum`)는 여전히 옵셔널 타입이다.**

<br />

💡 **Tip**

1. 옵셔널 바인딩을 사용하다 보면 바인딩 될 **Non Optional Type**의 이름을 짓는 것이 굉장히 귀찮고 난해할 수 있다.

   ➡️ **그럴 땐 그냥 Optional Type의 이름을 그대로 똑같이 써도 된다!**

2. **한번에 여러 개의 옵셔널 타입을 바인딩 할 수도 있다!**

   ```swift
   if let x = x, let y = y {

   }
   ```

   `x`, `y` 모두 `nil`이 아니여야 `if`구문이 `true`가 된다.

3. **condition을 넣어줄 수 있다!**

   ```swift
   if let x = x, let y = y, y > 5 {

   }
   ```

<br />

## 옵셔널 바인딩 - guard let

`guard`문은 **특성상 함수(메서드)에서만 쓰이며**, `guard` 구문의 조건을 만족하지 못하면 `else`문으로 빠져서 **함수의 실행을 종료 시킬 때 사용**한다.(`return`)

```swift
guard let nonOptionalNum = optionalNum else {
    return
}

print(nonOptionalNum)
``` 

표현식이 `nil`인지 아닌지 판별하여 `nil`이 아닌 경우, `guard`문을 실행시키던 scope(`print(nonOptionalNum)`)로 돌아온다.

**즉, `Optional`이 해제된 값을 `guard` 구문 밖에서 사용할 수 있다!!**

이것이 `if let` 과 다른 부분이다.

<br />

❗️ **주의할 점**

**옵셔널 바인딩된 값을 받은 상수의 Scope는 `guard` 구문 밖이다. 따라서 `else`문에서는 해당 상수를 사용할 수 없다!**

<br />

💡 **Tip**

1. `if let` 구문 같은 경우는 언제든 옵셔널 타입과 논 옵셔널 타입의 **이름을 같게 선언해줘도 됐었지만**,

`guard`문은 **함수(메서드)의 매개변수로 들어온 표현식에 한해서만 가능하다!**

```swift
func test(_ x: Int?) {
    guard let x = x else {
        return
    }
    print(x)
}
```

위의 경우엔 바인딩 되는 표현식의 이름을 같게 해줘도 된다.

2. `if let`과 마찬가지로 옵셔널 바인딩을 **하나의 `gurad`문에서 연속으로 할 수도 있고, condition을 넣을 수 있다.**

<br />

### **그럼 언제 `if let`을 쓰고 언제 `guard let`을 쓸까?**

- **`if let` :** 단순히 옵셔널 처리 값에 대한 피드백만 주고 싶을 때 **(값이 있으면 이렇게 처리하고 `nil`이면 이렇게 처리해!)**

- **`guard let` :** 옵셔널 처리 값이 `nil`인 경우 무조건 함수의 실행을 종료시킬 때 **(값이 없으면 함수에서 나가!)**

<br />
<hr />

이렇게 옵셔널을 정복했다! 싶었지만.. 

옵셔널에 대한 개념이 아직 남았다 😂 (다음 포스트에서 다루도록 하겠다.)

그래도 스위프트를 공부할 수록 이 언어에 대한 매력이 느껴져서 좋다.