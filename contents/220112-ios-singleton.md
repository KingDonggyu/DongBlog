---
date: "2022-01-12"
title: "[iOS] Singleton"
category: "Mobile"
categoryColor: "lightpink"
tags: ["iOS"]
thumbnail: "./images/iOS.png"
---

싱글턴은 **'특정 클래스의 인스턴스가 오직 하나임을 보장하는 객체'** 를 의미한다.

싱글턴은 애플리케이션이 요청한 횟수와는 관계없이 **이미 생성된 같은 인스턴스를 반환한다.**

**즉, 애플리케이션 내에서 특정 클래스의 인스턴스가 딱 하나만 있기 때문에 다른 인스턴스들이 공유해서 사용할 수 있다.**

<div>
  <img src="https://cphinf.pstatic.net/mooc/20171230_233/1514576463497K9Uh6_PNG/74_0.png">
</div>

## Cocoa 프레임워크에서의 싱글턴 디자인 패턴

Cocoa 프레임워크에서 싱글턴 디자인 패턴을 활용하는 대표적인 클래스를 소개한다.

싱그턴 인스턴스를 반환하는 팩토리 메서드나 프로퍼티는 일반적으로 `shared` 라는 이름을 사용한다.

- `FileManager`

  - 애플리케이션 파일 시스템을 관리하는 클래스이다.

  - `FileManager.default`

- `URLSession`

  - URL 세션을 관리하는 클래스이다.

  - `URLSession.shared`

- `NotificationCenter`

  - 등록된 알림의 정보를 사용할 수 있게 해주는 클래스이다.

  - `NotificationCenter.default`

- `UserDefaults`

  - Key-Value 형태로 간단한 데이터를 저장하고 관리할 수 있는 인터페이스를 제공하는 데이터베이스 클래스이다.

  - `UserDefaults.standard`

- `UIApplication`

  - iOS에서 실행되는 중앙제어 애플리케이션 객체이다.

  - `UIApplication.shared`

<br />

싱글턴 디자인 패턴은 애플리케이션 내의 특정 클래스의 인스턴스가 하나만 존재하기 때문에 **객체가 불필요하게 여러 개 만들어질 필요가 없는 경우에 많이 사용한다.**

예를 들면 환경설정, 네트워크 연결처리, 데이터 관리 등이 있다. 

하지만 **멀티 스레드 환경**에서 동시에 싱글턴 객체를 참조할 경우 원치 않은 결과를 가져올 수 있으니 주의해야 한다.