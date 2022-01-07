---
date: "2022-01-07"
title: "[iOS] Control Event"
category: "Mobile"
categoryColor: "dimgray"
tags: ["iOS", "UIKit"]
thumbnail: "./images/iOS.jpeg"
---

최근 모바일 앱 개발에 흥미가 생겨 **Swift**를 학습 후 iOS 앱 개발 트레이닝을 수행하고 있다.

**컨트롤 이벤트**에 대해 보던 중 이에 대해 간략히 정리해두면 도움이 될거 같아 본 포스트를 작성한다.

## 컨트롤 이벤트와 액션과의 관계

**UIKit**에는 **UIButton**, **UISwitch**, **UIStepper** 등 **UIContol**을 상속받은 다양한 컨트롤 클래스가 있다.

그러한 컨트롤 객체에 발생한 다양한 이벤트 종류를 특정 액션 메서드에 연결할 수 있다.

즉, 컨트롤 객체에서 특정 이벤트가 발생하면, 미리 지정해 둔 타겟의 액션을 호출하게 된다.

## 컨트롤 이벤트의 종류

컨트롤 이벤트는 **UIControl**에 **Event**라는 타입으로 정의되어 있다.

아래는 컨트롤 객체에 발생할 수 있는 이벤트의 종류이다.

<br />

**touchDown**

: 컨트롤을 터치했을 때 발생하는 이벤트

`UIControl.Event.touchDown`

<br />

**touchDownRepeat**

: 컨트롤을 연속 터치할 때 발생하는 이벤트

`UIControl.Event.touchDownRepeat`

<br />

**touchDragInside**

: 컨트롤 범위 내에서 터치한 영역을 드래그 할 때 발생하는 이벤트

`UIControl.Event.touchDragInside`

<br />

**touchDragOutside**

: 터치 영역이 컨트롤의 바깥쪽에서 드래그 할 때 발생하는 이벤트

`UIControl.Event.touchDragOutside`

<br />

**touchDragEnter**

: 터치 영역이 컨트롤의 일정 영역 바깥쪽으로 나갔다가 다시 들어왔을 때 발생하는 이벤트

`UIControl.Event.touchDragEnter`

<br />

**touchDragExit**

: 터치 영역이 컨트롤의 일정 영역 바깥쪽으로 나갔을 때 발생하는 이벤트

`UIControl.Event.touchDragExit`

<br />

**touchUpInside**

: 컨트롤 영역 안쪽에서 터치 후 뗐을때 발생하는 이벤트

`UIControl.Event.touchUpInside`

<br />

**touchUpOutside**

: 컨트롤 영역 안쪽에서 터치 후 컨트롤 밖에서 뗐을때 이벤트

`UIControl.Event.touchUpOutside`

<br />

**touchCancel**

: 터치를 취소하는 이벤트 (touchUp 이벤트가 발생되지 않음)

`UIControl.Event.touchCancel`

<br />

**valueChanged**

: 터치를 드래그 및 다른 방법으로 조작하여 값이 변경되었을때 발생하는 이벤트

`UIControl.Event.valueChanged`

<br />

**primaryActionTriggered**

: 버튼이 눌릴때 발생하는 이벤트 (iOS보다는 tvOS에서 사용)

`UIControl.Event.primaryActionTriggered`

<br />

**editingDidBegin**

: UITextField에서 편집이 시작될 때 호출되는 이벤트

`UIControl.Event.editingDidBegin`

<br />

**editingChanged**

: UITextField에서 값이 바뀔 때마다 호출되는 이벤트

`UIControl.Event.editingChanged`

<br />

**editingDidEnd**

: UITextField에서 외부객체와의 상호작용으로 인해 편집이 종료되었을 때 발생하는 이벤트

`UIControl.Event.editingDidEnd`

<br />

**editingDidEndOnExit**

: UITextField의 편집상태에서 키보드의 return 키를 터치했을 때 발생하는 이벤트

`UIControl.Event.editingDidEndOnExit`

<br />

**allTouchEvents**

: 모든 터치 이벤트

`UIControl.Event.allTouchEvents`

<br />

**allEditingEvents**

: UITextField에서 편집작업의 이벤트

`UIControl.Event.allEditingEvents`

<br />

**applicationReserved**

: 각각의 애플리케이션에서 프로그래머가 임의로 지정할 수 있는 이벤트 값의 범위

`UIControl.Event.applicationReserved`

<br />

**systemReserved**

: 프레임워크 내에서 사용하는 예약된 이벤트 값의 범위

`UIControl.Event.systemReserved`

<br />

**allEvents**

: 시스템 이벤트를 포함한 모든 이벤트

`UIControl.Event.allEvents`

<br />
<br />

**※ Source :**

🍎 Apple 공식 문서: https://developer.apple.com/documentation/uikit/uicontrol/event

