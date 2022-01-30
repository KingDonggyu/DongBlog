---
date: "2022-01-31"
title: "[iOS] Notification"
category: "Mobile"
categoryColor: "dimgray"
tags: ["iOS"]
thumbnail: "./images/iOS.jpeg"
---

<div style="text-align: center">
  <img src="https://cphinf.pstatic.net/mooc/20180125_47/1516853007741u8yHh_PNG/114_0.png" width="700">
</div>

# Notification

**<u>등록된 노티피케이션에 노티피케이션 센터를 통해 정보를 전달하기 위한 구조체이다.</u>**

### 주요 프로퍼티

- `name` : 알림을 식별하는 태그

```swift
var name: Notification.Name
```

- `object` : 발송자가 옵저버에게 보내려고 하는 객체. 주로 발송자 객체를 전달하는 데 쓰인다.

```swift
var object: Any?
```

- `userInfo` : 노티피케이션과 관련된 값 또는 객체의 저장소

```swift
var userInfo: [AnyHashable: Any]?
```

<br />

**특정 행동으로 인해 작업이 시작되거나 완료되는 시점에 다른 인스턴스로 노티피케이션 발생 시 필요한 데이터를 같이 넘겨 줄 수 있다.**

예를 들어, 네트워킹을 이용하는 애플리케이션이라면 네트워킹이 시작 및 완료되는 시점, 음악 및 동영상 재생 등에도 재생이 끝나는 시점에 관련 정보를 넘겨 줄 수 있다.

<br />

# NotificationCenter

**<u>등록된 옵저버에게 동시에 노티피케이션을 전달하는 클래스이다.</u>**

**NotificationCenter** 클래스는 노티피케이션을 발송하면 노티피케이션 센터에서 메세지를 전달한 옵저버가 처리할 때까지 대기한다.

즉, **동기적으로 흘러간다.** 노티피케이션을 비동기적으로 사용하려면 **NotificationQueue**를 사용하면 된다.

<br />

### 기본 Notification Center 얻기

- `default` : 애플리케이션의 기본 노티피케이션 센터이다.

```swift
class var default: NotificationCenter { get }
```

<br />

### 옵저버 추가 및 제거

- `addObserver(forName:object:queue:using:)` : 노티피케이션을 노티피케이션 큐와 큐에 추가할 블록(스위프트의 클로저), 노티피케이션 이름을 노티피케이션 센터의 메서드를 가리키는 장소(디스패치 테이블, Dispatch Table)에 이름을 추가한다.

  - 여기서 object에 특정 객체를 명시하면 명시한 객체가 발송한 노티피케이션일 때에만 해당 이름의 노티피케이션을 수신한다.

```swift
func addObserver(forName name: NSNotification.Name?,
                    object obj: Any?,
                    queue: OperationQueue?,
                    using block: @escaping (Notification) -> Void) -> NSObjectProtocol
```

- `addObserver(_:selector:name:object:)` : 노티피케이션을 노티피케이션 센터의 메서드를 가리키는 장소에 이름을 추가한다.

```swift
 func addObserver(_ observer: Any,
                    selector aSelector: Selector,
                    name aName: NSNotification.Name?,
                    object anObject: Any?)
```

- `removeObserver(_:name:object:)` : 노티피케이션 센터의 메서드를 가리키는 장소에서 일치하는 이름을 제거한다.

```swift
func removeObserver(_ observer: Any,
                        name aName: NSNotification.Name?,
                        object anObject: Any?)
```

- `removeObserver(_:)` : 노티피케이션 센터의 메서드를 가리키는 장소에서 모든 이름을 제거한다.

```swift
 func removeObserver(_ observer: Any)
```

<br />

### Notification 발송

- `post(_:)` : 지정된 노티피케이션을 노티피케이션 센터에 발송한다.

```swift
func post(_ notification: Notification)
```

- `post(name:object:userInfo:)` : 지정된 이름, 보낸 객체, 보낼 정보로 노티피케이션을 만들어 노티피케이션 센터에 발송한다.

```swift
func post(name aName: NSNotification.Name,
            object anObject: Any?,
 	        userInfo aUserInfo: [AnyHashable : Any]? = nil)
```

- `post(name:object:)` : 지정된 이름, 보낸 객체로 노티피케이션을 만들어 노티피케이션 센터에 발송한다.

```swift
func post(name aName: NSNotification.Name, object anObject: Any?)
```

<br />

# 예제

### 일반 Notification

- 옵저버 등록

```swift
NotificationCenter.default.addObserver(self, selector: #selector(didRecieveTestNotification(_:)), name: NSNotification.Name("TestNotification"), object: nil)

 @objc func didRecieveTestNotification(_ notification: Notification) {
         print("Test Notification")
 }
```

- 발송자

```swift
NotificationCenter.default.post(name: NSNotification.Name("TestNotification"), object: nil, userInfo: nil)
```

### User Info 정보를 담은 Notification

- 옵저버 등록

```swift
NotificationCenter.default.addObserver(self, selector: #selector(didReceiveTestNotification(_:)), name: NSNotification.Name("TestNotification"), object: nil)

@objc func didReceiveTestNotification(_ notification: Notification) {
 		guard let testString: String = notification.userInfo?["TestString"] as? String else { return }
         print("testString :", testString)
 }
```

- 발송자

```swift
let userInfo: [AnyHashable: Any] = ["TestString":"Hi"]

NotificationCenter.default.post(name: NSNotification.Name("TestNotification"), object: nil, userInfo: userInfo)
```

<br />

# 테스트

아래는 필자가 작성한 **Notification** 코드이다.

<u>ViewContoller.swift</u> 에서 **NotificationCenter**를 통해 <u>Request.swift</u> 로부터 정보를 받는다.

```swift
// ViewController.swift

...

override func viewDidLoad() {
    super.viewDidLoad()

    self.tableView.dataSource = self
    self.tableView.delegate = self

    // Notification을 받을 것이라고 NoficificationCenter에 알림
    NotificationCenter.default.addObserver(self,
                                            selector: #selector(self.didReceiveFriendsNotification(_:)),
                                            name: DidReceiveFriendsNotification,
                                            object: nil)
}

override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)

    requestFreiend()
}

// 수신
@objc func didReceiveFriendsNotification(_ noti: Notification) {

    guard let friends: [Friend] = noti.userInfo?["friends"] as? [Friend] else {
        return
    }

    self.friends = friends

    // 보내는 쪽 스레드와 같은 스레드에서 동작하기 때문에 메인 스레드로 가져와 수행
    DispatchQueue.main.async {
        self.tableView.reloadData()
    }
}

...

```

```swift
// Request.swift

// Notification 이름 생성
let DidReceiveFriendsNotification: Notification.Name = Notification.Name("DidReceiveFriends")

// 서버에 데이터 요청
func requestFreiend() {

    guard let url: URL = URL(string: "https://randomuser.me/api/?results=20&inc=name,email,picture") else {
        return
    }

    let session: URLSession = URLSession(configuration: .default)

    // 백그라운드에서 수행
    let dataTask: URLSessionDataTask = session.dataTask(with: url) {
        (data: Data?, response: URLResponse?, error: Error?) in

        if let error = error {
            print(error.localizedDescription)
            return
        }

        guard let data = data else {
            return
        }

        do {
            let apiResponse: APIResponse = try JSONDecoder().decode(APIResponse.self, from: data)
            // 발송
            NotificationCenter.default.post(name: DidReceiveFriendsNotification, object: nil, userInfo: ["friends":apiResponse.results])
        } catch (let err) {
            print(err.localizedDescription)
        }
    }

    dataTask.resume()   // dataTask 시행
}
```

<br />
<br />

**Notification 은 이벤트에 대해 여러 리스너가 있을 때 사용하면 좋다.**

예를 들어 UI 가 특정 이벤트를 기반으로 정보를 표시하는 방법을 notification 으로 **브로드 캐스팅**하여 변경하거나 문서 창을 닫을 때 문서의 객체가 상태를 저장하는지 확인하는 방법으로 notification 을 사용할 수 있다.

Notification 의 일반적인 목적은 다른 객체에 이벤트를 알리면 적절하게 응답 할 수 있지만, notification 을 받는 객체는 이벤트가 발생한 후에만 반응 할 수 있다.

이처럼 **NotificationCenter**는 잘 활용하면 좋은 기술이지만, 여러 코드가 분산되므로 잘못하게 되면 굉장히 헷갈릴 수 있다고 한다..😂
