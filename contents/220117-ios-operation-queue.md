---
date: "2022-01-17"
title: "[iOS] Operation Queue"
category: "Mobile"
categoryColor: "dimgray"
tags: ["iOS"]
thumbnail: "./images/iOS.jpeg"
---

iOS 환경 **동시성 프로그래밍** 지원 종류로 **Grand Central Dispatch (GCD)**, **Operation Queue**, **Thread**가 있다.

- **Grand Central Dispatch (GCD)** : 멀티 코어와 멀티 프로세싱 환경에 최적화된 프로그래밍을 할 수 있도록 애플이 개발한 기술.

- **Operation Queue** : 비동기적으로 실행되어야 하는 작업을 객체 지향적인 방법으로 사용.

- **Thread** : 멀티스레드 프로그래밍을 위한 애플에서 제공하는 스레드 클래스.

**<u>이 중 연산(Opertaion)의 실행을 관리하고 대기열의 동작관리를 하는 Operation Queue에 대해 알아보겠다.</u>**

<br />

# Operation Queue

**Operation**은 태스크와 관련된 코드와 데이터를 나타내는 추상 클래스이다.

**Operation Queue**는 연산의 실행을 관리한다.

- 큐에 추가한 동작은 직접 제거할 수 없다. 연산은 작업이 끝날 때까지 큐에 남아있다.

- 연산을 큐에서 제거하는 방법은 **연산을 취소**하는 방법 뿐이다.

  - **연산 객체(Opertaion Object)** 의 `cancel()` 메서드를 호출하거나 **Opertaion Queue**의 `cancelAllOperations()` 메서드를 호출하여 대기열에 있는 모든 연산을 취소하는 방법이 있다.

  - 그리고 실행 중인 연산의 경우 연산 객체의 취소 상태를 확인하고 실행 중인 연산을 중지하여 완료 상태로 변경된다.

> **Operation Object** 란? 애플리케이션에서 수행하려는 연산을 캡슐화하는데 사용하는 **Foundation** 프레임워크의 **Operation** 클래스 인스턴스.

# OperationQueue의 주요 Methods/Properties

## 특정 Operation Queues 가져오기

- `current` : 현재 작업을 시작한 **Operatino Queue**를 반환한다.

```swift
class var current: OperationQueue? { get }
```

- `main` : 메인 스레드와 연결된 **Operation Queue**를 반환한다.

```swift
class var main: OperationQueue { get }
```

## Queue에서 Operation 관리

- `addOperation(_:)` : 연산 객체(Operation Object)를 대기열(Queue)에 추가한다.

```swift
func addOperation(_ op: Operation)
```

- `addOperations(_:waitUntilFinished:)` : 연산 객체(Operation Object) 배열을 대기열(Queue)에 추가한다.

```swift
func addOperations(_ ops: [Operation], waitUntilFinished wait: Bool)
```

- `addOperation(_:)` : 전달한 클로저를 연산 객체(Operation Object)에 감싸서 대기열(Queue)에 추가한다.

```swift
func addOperation(_ block: @escaping () -> Void)
```

- `cancelAllOperations()` : 대기 중이거나 실행 중인 모든 연산(Operation)을 취소한다.

```swift
func cancelAllOperations()
```

- `waitUntilAllOperationsAreFinished()` : 대기 중인 모든 연산(Operation)과 실행 중인 연산(Operation)이 모두 완료될 때까지 현재 스레드로의 접근을 차단한다.

```swift
func waitUntilAllOperationsAreFinished()
```

## Operation 실행 관리

- `maxConcurrentOperationCount` : 동시에 실행할 수 있는 연산(Operation)의 최대 수.

```swift
var maxConcurrentOperationCount: Int { get set }
```

- `qualityOfService` : 대기열 작업을 효율적으로 수행할 수 있도록 여러 우선순위 옵션을 제공한다.

```swift
 var qualityOfService: QualityOfService { get set }
```

## Operation 중단

- `isSuspended` : 대기열(Queue)의 연산(Operation) 여부를 나타내기 위한 부울 값이다.

  - `false`인 경우 대기열(Queue)에 있는 연산(Operation)을 실행하고, `true`인 경우 대기열(Queue)에 대기 중인 연산(Operation)을 실행하진 않지만 이미 실행 중인 연산(Operation)은 계속 실행된다.

```swift
var isSuspended: Bool { get set }
```

## Queue의 구성

- `name` : Operation Queue의 이름

```swift
var name: String? { get set }
```

<br />

## 테스트 

아래는 필자가 작성한 **비동기 프로그래밍** 테스트 코드이다.

IBAction와 연결된 버튼 클릭 시 큰 데이터 이미지를 URL을 통해 다운로드하여 이미지 뷰에 셋팅한다.

```swift
@IBAction func touchUpDownloadButton(_ sender: UIButton) {
    // 이미지 참조 주소: https://www.qs.com/wp-content/uploads/2019/11/power-shifts-global-image.jpg
    
    // 백그라운드 스레드에서 수행
    OperationQueue().addOperation {
        let imageURL: URL = URL(string: "https://www.qs.com/wp-content/uploads/2019/11/power-shifts-global-image.jpg")!
        let imageDate: Data = try! Data.init(contentsOf: imageURL)
        let image: UIImage = UIImage(data: imageDate)!
        
        // UI에 영향을 미치는 동작은 메인 스레드에서 수행
        OperationQueue.main.addOperation {
            self.imageView.image = image
        }
    }
}
```

- 데이터를 가져오는 동안 앱이 Freeze 되는 것을 해결하기 위해 <u>**Operation Queue**를 통해 **메인 스레드**가 아닌 **백그라운드 스레드**에서 수행하도록 한다.</u>

- **<u>UI에 영향을 미치는 동작은 메인 스레드에서 수행하도록 한다.</u>**

  - 위 코드에서 **백그라운드에서 작업이 끝난 후 메인스레드로 수행**하는 것을 확인할 수 있다.

<br/>

**💡 <u>다양한 리소스에 접근하기 위해 백그라운드와 메인 스레드를 왔다갔다하며 적절히 처리를 해주어야 할 필요가 있다!</u>**

<br />
<br />

**※ Source :**

🍎 Apple 공식 문서: https://developer.apple.com/documentation/foundation/operation

🍎 Apple 공식 문서: https://developer.apple.com/documentation/foundation/operationqueue
