# watchOS Kit
애플워치의 기본동작을 구현하여 애플워치 프로토타입 시 실제 디바이스의 사용성을 유지하기 위해 WatchOS의 HIG(Human Interface Guidelines)에 맞춰 구현. (**WatchOS 3.0 버전**)  
> [Apple Watch HIG 참고](https://developer.apple.com/watchos/human-interface-guidelines/visual-design/)  

<br/>

데모 : https://framer-modules.github.io/watchos.framer/  
> **알림 및 독의 백그라운드 블러효과는 사파리에서만 확인 할수 있습니다.**

<br/>

## 미리보기
> https://vimeo.com/226708566 - "Full version Preview"  

### Default
|![app](https://media.giphy.com/media/xTkcEJ9tZZcLF1a1eU/giphy.gif)|
| :-: |
| Watchface + Apps + Dock |

### Notification
#### Default & Short looks
|![default](https://media.giphy.com/media/3oeHLmwV3YzGCgJsbe/giphy.gif)|
| :-: |
| Default |

#### Long looks
|![longlooks_01](preview-longlooks_1.gif)|![longlooks_02](preview-longlooks_2.gif)|
| :-: | :-: |
| Color | Buttons |

### Watchface
|![watchface](https://media.giphy.com/media/xTkcEwC8Hdw4ttz1ss/giphy.gif)|
| :-: |
| Watchface |

<br/>

## 기능
- ClockFace 제공 (Modular, Utilitarian, Circular)
- Complication 템플릿 제공
- Docks 제공
- Apps 목록
- Notification 제공
- Scroll 제공
- Device 버튼 동작 (Digital Crown, Side Button)

<br/>

## 설치
해당 소스를 전체 다운받아 앱 영역만 추가적으로 구현해서 사용  
> 모듈 사용에 대한 자세한 내용은 [FramerJS Docs - Modules](https://framer.com/docs/#modules.modules) 참고

<br/>

## APIs 
- [App](https://github.com/framer-modules/watchos.framer/wiki/1.-App) : 앱 관련
- [WatchOS](https://github.com/framer-modules/watchos.framer/wiki/2.-WatchOS) : 워치의 기본 레이아웃 관련 
- [Complication](https://github.com/framer-modules/watchos.framer/wiki/3.-Complication) : 컴플리케이션 화면 관련 
- [Notifiaction](https://github.com/framer-modules/watchos.framer/wiki/4.-Notification) : 알림 관련 
- [Scroll](https://github.com/framer-modules/watchos.framer/wiki/5.-Device): 스크롤 관련
- [Device](https://github.com/framer-modules/watchos.framer/wiki/6.-Device) : 장치 관련 

> 각 API의 상세한 사용법은 [위키페이지](https://github.com/framer-modules/watchos.framer/wiki) 참고

<br/>

## 예제코드
```coffeescript
# ------------------------------------------------------------------
# 모듈
# ------------------------------------------------------------------
require 'watchos-kit'
 
# ------------------------------------------------------------------
# 앱
# ------------------------------------------------------------------
app = new App
    html: "App"
    style:
        fontSize: "50px"
        lineHeight: "#{Device.height}px"
        textAlign: "center"
        textTransform: "uppercase"
     
app.onToDock -> print "to dock"
app.onFromDock -> print "from dock"
  
# ------------------------------------------------------------------
# 애플워치
# ------------------------------------------------------------------
watchOS = new WatchOS
    appInfo:
        name: "APP"
        icon: ""
        app: app
    complications:
        utilitarian: [
            new Complication().utilitarianSmallFlat
                imageProvider: onePieceImage: "images/complication-utilitarian-arrow-down.png"
                textProvider: label: "NIKE"
            new Complication().utilitarianSmall().square
                imageProvider: onePieceImage: "images/complication-ring-image.png"
            new Complication().utilitarianLarge
                imageProvider: onePieceImage: "images/complication-utilitarian-arrow-down.png"
                textProvider: label: "NIKE 51.02 -0.27"
        ]
        modular: [
            new Complication().modularSmall().ringImage
                imageProvider: onePieceImage: "images/complication-ring-image.png", tintColor: "#FF3B30"
                fillFraction: .5
            new Complication().modularSmall().dummy "images/complication-modular-small-simple-image.png"
            new Complication().modularSmall().simpleText
                textProvider: label: "7°", tintColor: "#5ac8fa"
            new Complication().modularSmall().dummy "images/complication-modular-small-stack-image.png"
            new Complication().modularLarge().tallBody
                headerTextProvider: label: "NIKE -0.27", tintColor: "#2094F9"
                bodyTextProvider: label: "1,158,000"
        ]
        circular: [
            new Complication().circularSmall().ringImage
                imageProvider: onePieceImage: "images/complication-ring-image.png"
                fillFraction: .5
            new Complication().circularSmall().smallFlat
                imageProvider: onePieceImage: "images/complication-utilitarian-arrow-down.png"
                textProvider: label: "NIKE"
            new Complication().circularSmall().smallFlat
                imageProvider: onePieceImage: "images/complication-utilitarian-arrow-up.png"
                textProvider: label: "KAKAO"
            new Complication().circularSmall().simpleImage
                imageProvider: onePieceImage: "images/complication-ring-image.png"
        ]
```
