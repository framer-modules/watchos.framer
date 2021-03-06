# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: "Apple Watch"
	author: "Ho.s (Jungho song)"
	twitter: "threeword"
	description: "WatchOS"

Framer.Extras.ShareInfo.enable()

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

# ------------------------------------------------------------------
# 컨트롤러 : 알림보내기, 시계설정
# ------------------------------------------------------------------
# 컨트롤러
if Utils.isDesktop() and not Utils.isLocalUrl(document.URL)
	# 컨트롤러 : 생성 : 라벨
	createPanelLabel = (options = {}) ->
		label = new Layer _.defaults options, 
			html: ""
			style:
				fontSize: "38px", fontWeight: "500"
				lineHeight: "1"
			color: "rgba(0,0,0,.8)"
			backgroundColor: ""
		Util.text.autoSize label
		
		label
		
	# 컨트롤러 : 생성 : 버튼
	createPanelButton = (options = {}) ->
		options.backgroundColor ?= "rgba(158,158,158,1)"
		bgColor = new Color options.backgroundColor
		
		button = new Layer _.defaults options,
			html: "버튼"
			style:
				fontSize: "25px", fontWeight: "400"
				lineHeight: "1"
				padding: "10px 17px"
			color: "rgba(255,255,255,.9)"
			backgroundColor: bgColor
			borderRadius: 5
		Util.text.autoSize button
		
		button.states = 
			normal: backgroundColor: bgColor
			pressed: backgroundColor: bgColor.darken 10
			
		button.onMouseDown -> @stateSwitch 'pressed'
		button.onMouseUp -> @stateSwitch 'normal'
		button.onMouseOut -> @stateSwitch 'normal'
		
		button
	
	# 간격
	SCALE = .95
	SPACE = 
		HORIZONTAL: 10
		VERTICAL: 
			PANEL: 50
			GROUP: 25
			INNER: 10
	
	# 컨트롤러 : 패널
	controlPanel = new Layer
		y: Align.center
		width: 450, height: 800
		parent: Framer.Device.background
		scale: Framer.Device.hands.scale / SCALE, originX: 1
		backgroundColor: ""
		
	# 컨트롤러 : 패널 : 알림
	controlPanel.noti = new Layer
		html: "알림 보내기"
		style:
			fontSize: "50px", fontWeight: "600"
			lineHeight: "1"
		color: "rgba(0,0,0,.8)"
		backgroundColor: ""
		parent: controlPanel
	Util.text.autoSize controlPanel.noti
	
	# 알림 : 기본
	controlPanel.noti.default = createPanelLabel 
		y: controlPanel.noti.maxY + SPACE.VERTICAL.GROUP
		html: "기본"
		parent: controlPanel
	controlPanel.noti.default.default = createPanelButton 
		y: controlPanel.noti.default.maxY + SPACE.VERTICAL.INNER
		html: "DEFAULT"
		parent: controlPanel
	controlPanel.noti.default.icon = createPanelButton 
		x: controlPanel.noti.default.default.maxX + SPACE.HORIZONTAL, y: controlPanel.noti.default.default.y
		html: "ICON"
		parent: controlPanel
		
	# 알림 : Short looks
	controlPanel.noti.shortLooks = createPanelLabel 
		y: controlPanel.noti.default.default.maxY + SPACE.VERTICAL.GROUP
		html: "Short looks 옵션"
		parent: controlPanel
	# 알림 : Short looks : Accent color
	controlPanel.noti.shortLooks.accentColor = createPanelButton 
		y: controlPanel.noti.shortLooks.maxY + SPACE.VERTICAL.INNER
		html: "앱 이름 색상 : AccentColor"
		backgroundColor: "#f9df32"
		parent: controlPanel
		
	# 알림 : Long looks
	controlPanel.noti.longLooks = createPanelLabel 
		y: controlPanel.noti.shortLooks.accentColor.maxY + SPACE.VERTICAL.GROUP
		html: "Long looks 옵션"
		parent: controlPanel
	# 알림 : Long looks : 배경
	controlPanel.noti.longLooks.bg = createPanelButton 
		y: controlPanel.noti.longLooks.maxY + SPACE.VERTICAL.INNER
		html: "배경 : RED"
		backgroundColor: "rgba(219,76,63,1)"
		parent: controlPanel
	# 알림 : Long looks : 샤시
	controlPanel.noti.longLooks.sash = createPanelButton 
		x: controlPanel.noti.longLooks.bg.maxX + SPACE.HORIZONTAL, y: controlPanel.noti.longLooks.bg.y
		html: "샤시 : BLUE"
		backgroundColor: "rgba(43,150,246,1)"
		parent: controlPanel
	# 알림 : Long looks : 샤시 레이블 색
	controlPanel.noti.longLooks.sashlabel = createPanelButton 
		y: controlPanel.noti.longLooks.bg.maxY + SPACE.VERTICAL.INNER
		html: "샤시 레이블 : YELLOW"
		backgroundColor: "#f9df32"
		parent: controlPanel
	# 알림 : Long looks : 첨부내용
	controlPanel.noti.longLooks.attach = createPanelButton 
		y: controlPanel.noti.longLooks.sashlabel.maxY + SPACE.VERTICAL.INNER
		html: "첨부내용 추가"
		parent: controlPanel
	# 알림 : Long looks : 버튼 추가
	controlPanel.noti.longLooks.buttonsDefault = createPanelButton 
		y: controlPanel.noti.longLooks.attach.maxY + SPACE.VERTICAL.INNER
		html: "버튼 추가"
		parent: controlPanel
	# 알림 : Long looks : 버튼 명
	controlPanel.noti.longLooks.buttonsLabel = createPanelButton 
		x: controlPanel.noti.longLooks.buttonsDefault.maxX + SPACE.HORIZONTAL, y: controlPanel.noti.longLooks.attach.maxY + SPACE.VERTICAL.INNER
		html: "버튼 명"
		parent: controlPanel
	# 알림 : Long looks : 버튼 스타일
	controlPanel.noti.longLooks.buttonsStyle = createPanelButton 
		x: controlPanel.noti.longLooks.buttonsLabel.maxX + SPACE.HORIZONTAL, y: controlPanel.noti.longLooks.attach.maxY + SPACE.VERTICAL.INNER
		html: "버튼 스타일"
		parent: controlPanel
	# 알림 : Long looks : 버튼 배경색
	controlPanel.noti.longLooks.buttonsBg = createPanelButton 
		y: controlPanel.noti.longLooks.buttonsDefault.maxY + SPACE.VERTICAL.INNER
		html: "버튼 배경"
		parent: controlPanel
	# 알림 : Long looks : 버튼 레이블 색상
	controlPanel.noti.longLooks.buttonsLabelColor = createPanelButton 
		x: controlPanel.noti.longLooks.buttonsBg.maxX + SPACE.HORIZONTAL, y: controlPanel.noti.longLooks.buttonsDefault.maxY + SPACE.VERTICAL.INNER
		html: "버튼 레이블"
		parent: controlPanel
	# 알림 : Long looks : 버튼 햅틱
	controlPanel.noti.longLooks.buttonsHaptic = createPanelButton 
		x: controlPanel.noti.longLooks.buttonsLabelColor.maxX + SPACE.HORIZONTAL, y: controlPanel.noti.longLooks.buttonsDefault.maxY + SPACE.VERTICAL.INNER
		html: "버튼 햅틱"
		parent: controlPanel
	
	# 컨트롤러 : 패널 : 시계화면
	controlPanel.clockface = new Layer
		y: controlPanel.noti.longLooks.buttonsHaptic.maxY + SPACE.VERTICAL.PANEL
		html: "시계화면 변경하기"
		style:
			fontSize: "50px", fontWeight: "600"
			lineHeight: "1"
		color: "rgba(0,0,0,.8)"
		backgroundColor: ""
		parent: controlPanel
	Util.text.autoSize controlPanel.clockface
	
	# 컨트롤러 : 패널 : 시계화면 : Circular
	controlPanel.clockface.utilitarianBtn = createPanelButton
		y: controlPanel.clockface.maxY + SPACE.VERTICAL.GROUP
		html: "Utilitarian"
		parent: controlPanel
		
	# 컨트롤러 : 패널 : 시계화면 : Utilitarian
	controlPanel.clockface.modularBtn = createPanelButton
		x: controlPanel.clockface.utilitarianBtn.maxX + SPACE.HORIZONTAL, y: controlPanel.clockface.utilitarianBtn.y
		html: "Modular"
		parent: controlPanel
	
	# 컨트롤러 : 패널 : 시계화면 : Modular
	controlPanel.clockface.circularBtn = createPanelButton
		x: controlPanel.clockface.modularBtn.maxX + SPACE.HORIZONTAL, y: controlPanel.clockface.utilitarianBtn.y
		html: "Circular"
		parent: controlPanel
	
	# 타입명
	Noti = {}
	Noti.Default = "notiDefault"
	Noti.Icon = "notiIcon"
	Noti.ShortLooks = {}
	Noti.ShortLooks.AccentColor = "notiShortLooksAccentColor"
	Noti.LongLooks = {}
	Noti.LongLooks.Bg = "notiLongLooksBg"
	Noti.LongLooks.Sash = "notiLongLooksSash"
	Noti.LongLooks.SashLabel = "notiLongLooksSashLabel"
	Noti.LongLooks.Attach = "notiLongLooksAttach"
	Noti.LongLooks.ButtonsDefault = "notiLongLooksButtonsDefault"
	Noti.LongLooks.ButtonsLabel = "notiLongLooksButtonsLabel"
	Noti.LongLooks.ButtonsStyle = "notiLongLooksButtonsStyle"
	Noti.LongLooks.ButtonsBg = "notiLongLooksButtonsBg"
	Noti.LongLooks.ButtonsLabelColor = "notiLongLooksButtonsLabelColor"
	Noti.LongLooks.ButtonsHaptic = "notiLongLooksButtonsHaptic"
		
	ClockFace = {}
	ClockFace.Circular = "clockFaceCircular"
	ClockFace.Utilitarian = "clockFaceUtilitarian"
	ClockFace.Modular = "clockFaceModular"
	
	# 이벤트 : 클릭
	controlPanel.noti.default.default.onClick -> controlPanel.emit Noti.Default, @
	controlPanel.noti.default.icon.onClick -> controlPanel.emit Noti.Icon, @
	controlPanel.noti.shortLooks.accentColor.onClick -> controlPanel.emit Noti.ShortLooks.AccentColor, @
	controlPanel.noti.longLooks.bg.onClick -> controlPanel.emit Noti.LongLooks.Bg, @
	controlPanel.noti.longLooks.sash.onClick -> controlPanel.emit Noti.LongLooks.Sash, @
	controlPanel.noti.longLooks.sashlabel.onClick -> controlPanel.emit Noti.LongLooks.SashLabel, @
	controlPanel.noti.longLooks.attach.onClick -> controlPanel.emit Noti.LongLooks.Attach, @
	controlPanel.noti.longLooks.buttonsDefault.onClick -> controlPanel.emit Noti.LongLooks.ButtonsDefault, @
	controlPanel.noti.longLooks.buttonsLabel.onClick -> controlPanel.emit Noti.LongLooks.ButtonsLabel, @
	controlPanel.noti.longLooks.buttonsStyle.onClick -> controlPanel.emit Noti.LongLooks.ButtonsStyle, @
	controlPanel.noti.longLooks.buttonsBg.onClick -> controlPanel.emit Noti.LongLooks.ButtonsBg, @
	controlPanel.noti.longLooks.buttonsLabelColor.onClick -> controlPanel.emit Noti.LongLooks.ButtonsLabelColor, @
	controlPanel.noti.longLooks.buttonsHaptic.onClick -> controlPanel.emit Noti.LongLooks.ButtonsHaptic, @
	
	controlPanel.clockface.circularBtn.onClick -> controlPanel.emit ClockFace.Circular, @
	controlPanel.clockface.utilitarianBtn.onClick -> controlPanel.emit ClockFace.Utilitarian, @
	controlPanel.clockface.modularBtn.onClick -> controlPanel.emit ClockFace.Modular, @
	
	hasValue = (obj, value) ->
		return typeof value is 'string'
		
		for v, i in _.values obj
			if typeof v is 'object'
				return hasValue(v, value)
			else if typeof v is 'string'
				return v is value
			else 
				return false
	
	# 이벤트 헬퍼
	controlPanel.onNotificaion = (type, cb) -> if hasValue(Noti, type) then @on type, cb 
	controlPanel.onClockFace = (type, cb) -> if hasValue(ClockFace, type) then @on type, cb 
	
	# 이벤트 : 윈도우 리사이즈
	Events.wrap(window).addEventListener "resize", resizeListener = () ->
		# 
		Framer.Device.hands.x += 250
		#
		controlPanel.props = 
			maxX: Framer.Device.background.midX, y: Align.center
			scale: Framer.Device.hands.scale / SCALE
			
	resizeListener()
	
if Utils.isDesktop() and not Utils.isLocalUrl(document.URL)
	## 기본
	controlPanel.onNotificaion Noti.Default, -> watchOS.showNotification()
			
	## 기본 : 아이콘
	controlPanel.onNotificaion Noti.Icon, ->
		watchOS.showNotification
			appName: "카카오증권"
			icon: "images/appicon.png"
			title: "지정가 알림"
			message: "카카오<br/>지정가 도달,<br/>현재 81,000원"
	
	## Short looks : 액센트 색상
	controlPanel.onNotificaion Noti.ShortLooks.AccentColor, ->
		watchOS.showNotification
			title: "ShortLooks"
			message: "Accent color 변경"
			accentColor: "#f9df32"
			
	## Long looks : 배경 색상
	controlPanel.onNotificaion Noti.LongLooks.Bg, ->
		watchOS.showNotification
			title: "LongLooks"
			message: "Long looks의 배경색 변경"
			bgColor: "rgba(255,0,0,.14)"
			
	## Long looks : 샤시 색상
	controlPanel.onNotificaion Noti.LongLooks.Sash, ->
		watchOS.showNotification
			title: "LongLooks"
			message: "Long looks의 상단색 변경"
			sashColor: "rgba(43,150,246,.1)"
			
	## Long  looks : 샤시 레이블 색상
	controlPanel.onNotificaion Noti.LongLooks.SashLabel, ->
		watchOS.showNotification
			title: "LongLooks"
			message: "Long looks의 상단 레이블 색 변경"
			sashLabelColor: "rgba(249,223,50,1)"
			
	## Long looks : 첨부내용 추가
	controlPanel.onNotificaion Noti.LongLooks.Attach, ->
		watchOS.showNotification
			title: "LongLooks"
			message: "Long looks의 첨부내용 추가"
			attach: 
				new Layer
					width: 200, height: 200
					html: "첨부내용"
					style: fontSize: "42px", textAlign: "center", lineHeight: "200px"
					backgroundColor: ""
			
	## Long looks : 버튼 추가
	controlPanel.onNotificaion Noti.LongLooks.ButtonsDefault, ->
		watchOS.showNotification
			title: "LongLooks"
			message: "Long looks의 버튼 추가"
			buttons: [ {}, {}, {} ]
			
	## Long looks : 버튼 명
	controlPanel.onNotificaion Noti.LongLooks.ButtonsLabel, ->
		watchOS.showNotification 
			title: "LongLooks"
			message: "Long looks의 버튼명 변경"
			buttons: [ { label: "수락" }, { label: "모름" }, { label: "더보기" } ]
	
	## Long looks : 버튼 스타일
	controlPanel.onNotificaion Noti.LongLooks.ButtonsStyle, ->
		watchOS.showNotification
			title: "LongLooks"
			message: "Long looks의 버튼 스타일 변경"
			buttons: [ { label: "Destructive", style: Notification.Button.Style.Destructive } ]
	
	## Long looks : 버튼 배경
	controlPanel.onNotificaion Noti.LongLooks.ButtonsBg, ->
		watchOS.showNotification
			title: "LongLooks"
			message: "Long looks의 버튼 배경색 변경"
			buttons: [ { bgColor: "rgba(249,223,50,.14)" } ]
	
	## Long looks : 버튼 레이블
	controlPanel.onNotificaion Noti.LongLooks.ButtonsLabelColor, ->
		watchOS.showNotification
			title: "LongLooks"
			message: "Long looks의 버튼 레이블색 변경"
			buttons: [ { labelColor: "rgba(249,223,50,1)" } ]
			
	## Long looks : 버튼 햅틱
	controlPanel.onNotificaion Noti.LongLooks.ButtonsHaptic, ->
		watchOS.showNotification
			title: "LongLooks"
			message: "Long looks의 버튼 선택 시 햅틱 피드백"
			buttons: [ { isHaptic: true } ]
			
	# Clockface
	controlPanel.onClockFace ClockFace.Utilitarian, -> watchOS.setClockface 0
	controlPanel.onClockFace ClockFace.Modular, -> watchOS.setClockface 1
	controlPanel.onClockFace ClockFace.Circular, -> watchOS.setClockface 2