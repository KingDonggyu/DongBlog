---
date: "2022-01-16"
title: "[Swift] Codable"
category: "Language"
categoryColor: "darkorchid"
tags: ["Swift"]
thumbnail: "./images/Swift.png"
---

**<u>스위프트에서는 인스턴스를 다른 데이터 형태로 변환하고 그 반대의 역할을 수행하는 방법을 제공한다.</u>**

<br />

스위프트의 인스턴스를 다른 데이터 형태로 변환할 수 있는 기능을 **Encodable 프로토콜**로 표현하고, 그 반대의 역할을 할 수 있는 기능을 **Decodable 프로토콜**로 표현한다. ➡️ <u>이 둘을 합한 타입을 **Codable**로 정의한다.</u>

```swift
typealias Codable = Decodable & Encodable
```

**Codable**은 다양한 상황에서 사용할 수 있다.

JSON 형식으로 서버와 애플리케이션에 통신한다면 Codable 프로토콜을 용해 편리하게 인코딩 및 디코딩할 수 있다.

<div style="text-align: center">
  <img src="https://cphinf.pstatic.net/mooc/20180126_246/1516908685472NXsW5_PNG/127_0.png" width="700">
</div>

<br />

```swift
struct Coordinate: Codable {
	var latitude: Double
	var longitude: Double
}

struct Landmark: Codable {
    var name: String
    var foundingYear: Int
    var vantagePoints: [Coordinate]
    var metadata: [String: String]
    var website: URL?
}
```

위 코드는 `Corrdinate` 타입과 `Landmark` 타입의 인스턴스를 다른 데이터 형식으로 변환하기 위해 **Codable** 프로토콜을 준수하도록 했다.

Codable 타입의 프로퍼티는 모두 Codable 프로토콜을 준수하는 타입이어야 한다. 스위프트 기본 타입은 대부분 Codable 프로톨을 준수한다.

## CodingKey

자주 사용하게 될 JSON 형태의 데이터로 상호 변환하고자 할 때는 기본적으로 인코딩/디코딩할 JSON 타입의 키와 애플리케이션 사용자정의 프로퍼티가 일치해야 한다.

만약 JSON 키 이름을 구조체 프로퍼티의 이름과 다르게 표현하려면 타입 내부에 **String** 타입의 원시값을 갖는 `CodigKeys` 라는 이름의 열거형을 선언하고 **CodingKey 프로토콜**을 준수하도록 하면 된다.

`CodingKeys` 열거형 케이스의 이름은 해당 프로퍼티의 이름과 일치해야 한다. 그리고 프로퍼티의 열거형 케이스의 값으로 매칭할 JSON 타입의 키를 할당하면 된다. 

(만약, JSON 타입의 키와 프로퍼티 이름이 일치한다면 값을 할당하지 않아도 무방하다.)

```swift
struct Landmark: Codable {
    var name: String
    var foundingYear: Int
    var location: Coordinate
    var vantagePoints: [Coordinate]
    
    enum CodingKeys: String, CodingKey {
        case name = "title"
        case foundingYear = "founding_date"
        
        case location
        case vantagePoints
    }
}
```

<br />

## JSONEncoder / JSONDecoder

**JSONEncoder / JSONDecoder**가 **Codable** 프로토콜을 지원하기 때문에 **JSONEncoder / JSONDecoder**와 **Codable** 프로톨을 이용해 손쉽게 JSON 형식으로 인코딩 및 디코딩할 수 있다.

### JSONEncoder

```swift
struct GroceryProduct: Codable {
    var name: String
    var points: Int
    var description: String?
}

let pear = GroceryProduct(name: "Pear", points: 250, description: "A ripe pear.")

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted  // 들여쓰기를 통해 가독성이 좋게 출력해준다.

do {
	let data = try encoder.encode(pear)
	print(String(data: data, encoding: .utf8)!)
} catch {
	print(error)
}

// ----- 출력
 {
   "name" : "Pear",
   "points" : 250,
   "description" : "A ripe pear."
 }
```

<br />

### JSONDecoder

```swift
struct GroceryProduct: Codable {
    var name: String
    var points: Int
    var description: String?
}

let json = """
{
    "name": "Durian",
    "points": 600,
    "description": "A fruit with a distinctive scent."
}
""".data(using: .utf8)!

let decoder = JSONDecoder()

do {
	let product = try decoder.decode(GroceryProduct.self, from: json)
	print(product.name)
} catch {
	print(error)
}
// ----- 출력 
"Durian"
```

<br />
<br />

**※ Source :**

🍎 Apple 공식 문서: https://developer.apple.com/documentation/swift/codable

🍎 Apple 공식 문서: https://developer.apple.com/documentation/foundation/jsonencoder

🍎 Apple 공식 문서: https://developer.apple.com/documentation/foundation/jsondecoder
