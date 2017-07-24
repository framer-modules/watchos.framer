'''
watchOS : Notification

@auther Jungho song (threeword.com)
@since 2016.11.23
'''
class exports.Notification extends Layer

	# Button
	Button = {}

	# Button : Style
	Button.Style = {}
	Button.Style.Default = "buttonStyle.default"
	Button.Style.Destructive = "buttonStyle.destructive"

	# Static
	this.Button = Button

	'''
	appName: 앱이름 [require]
	icon: 아이콘 이미지 경로 [require]
	accentColor: 대표 색상 (Shrot looks의 앱이름 색상이 됨)
	title: 제목
	message: 내용
	attach: 첨부 내용 (Layer)
	sashColor: 샤시 색상 (Long looks의 상단 색상)
	sashLabelColor: 샤시의 앱이름 색상 (Long looks의 상단레이블 색상)
	bgColoc: 배경 색상 (Long looks의 배경 색상)
	buttons:
		label: "상세보기" [require]
		style: Button.Style.Default
		bgColor: "rgba(242,244,255,.14)"
		labelColor: "white"
		isHaptic: false
	'''
	# Constructor
	constructor: (options = {}) ->
		options.name = "Notification"
		options.width ?= Device.width
		options.height ?= Device.height
		options.backgroundColor ?= ""
		super options

		options.buttons ?= []
		options.appName ?= "App"
		options.icon ?= ""
		options.accentColor ?= "white"
		options.title ?= "Title"
		options.message ?= "Message"
		options.sashColor ?= "rgba(255,255,255,.1)"
		options.bgColor ?= "rgba(255,255,255,.14)"
		options.sashLabelColor ?= "white"
		
		title = options.title
		message = options.message
		buttons = options.buttons
		appName = options.appName
		icon = options.icon
		accentColor = options.accentColor
		sashColor = options.sashColor
		bgColor = options.bgColor	
		
		# bg
		@bg = new Layer
			name: ".bg"
			width: @width, height: @height
			backgroundColor: "rgba(0,0,0,.6)"
			opacity: 0
			parent: @
		Util.blur @bg
		
		# Short looks
		@short = new Layer
			name: ".short"
			width: @width, height: @height
			backgroundColor: ""
			parent: @
		
		# Short looks : Icon
		@short.icon = new Layer
			name: ".short.icon"
			x: Align.center, y: Align.top(41)
			size: 196
			image: icon
			borderRadius: 98
			shadowY: 2, shadowBlur: 8, shadowColor: "rgba(0,0,0,.3)"
			backgroundColor: "white"
			parent: @short
		
		# Short looks : Title
		@short.title = new Layer
			name: ".short.title"
			x: Align.center, y: @short.icon.maxY + 18
			html: title
			style:
				fontSize: "38px", fontWeight: 400, lineHeight: 1
				letterSpacing: "-0.42px"
				textAlign: "center"
			backgroundColor: ""
			parent: @short
		Util.text.autoSize @short.title
		@short.title.centerX()
		
		# Short looks : App name
		@short.appName = new Layer
			name: ".short.appName"
			x: Align.center, y: @short.title.maxY + 9
			html: appName
			style:
				fontSize: "28px", fontWeight: 400, lineHeight: 1
				letterSpacing: "0.22px"
				textAlign: "center"
				textTransform: "uppercase"
			color: accentColor
			backgroundColor: ""
			parent: @short
		Util.text.autoSize @short.appName
		@short.appName.centerX()
		
		# Lonf looks
		@long = new Scroll
			name: ".long"
			width: @width, height: @height
			backgroundColor: ""
			contentInset:
				top: 42, bottom: 14
			parent: @

		@long.confirm = new Layer
			html: "확인"
			style:
				fontWeight: "400"
				fontSize: "24px"
				paddingBottom: "25px"
				textAlign: "center"
			backgroundColor: ""
			color: "#8d8d8d"
			parent: @long
		Util.text.autoSize @long.confirm
		@long.confirm.props = x: Align.center, y: -(@long.contentInset.top + 32)

		@long.confirm.bar = new Layer
			x: Align.center, y: Align.bottom
			width: 80, height: 5
			backgroundColor: ""
			parent: @long.confirm
		@long.confirm.bar.left = new Layer
			x: Align.left, y: Align.bottom
			width: 43, height: 5
			originX: 0, originY: 0
			borderRadius: 5
			backgroundColor: "#8d8d8d"
			parent: @long.confirm.bar
		@long.confirm.bar.right = new Layer
			x: Align.right, y: Align.bottom
			width: 43, height: 5
			originX: 1, originY: 0
			borderRadius: 5
			backgroundColor: "#8d8d8d"
			parent: @long.confirm.bar

		@long.confirm.changeMode = (mode=false) ->
			@isChangeMode = mode
			color = if mode then "white" else "#8d8d8d"
			rotation = if mode then 10 else 0
			options = time: .15, curve: "spring(500,50,0)"
			@animate color: color, options: options
			@bar.left.animate rotation: rotation, backgroundColor: color, options: options
			@bar.right.animate rotation: -rotation,backgroundColor: color, options: options
			
		# Lonf looks : Time
		@long.time = new Layer
			name: ".long.time"
			x: Align.right(-4), y: Align.top(1)
			width: 150, height: 38
			html: Util.date.timeFormatter Util.date.getTime()
			style:
				fontSize: "32px", fontWeight: 400, lineHeight: "38px"
				textAlign: "right"
			color: "#ABABAB"
			backgroundColor: ""
			parent: @long
		
		# Lonf looks : Message
		@long.message = createMessage options
		@long.message.parent = @long.content
		
		# Action buttons
		@long.buttons = []
		# Create buttons
		if buttons
			for button, i in buttons
				actionBtn = createActionButton button
				actionBtn.y += @long.content.contentFrame().height + 8
				@long.content.addChild actionBtn
				
				@long.buttons.push actionBtn
				
		# Button : Close
		@long.dismissBtn = createActionButton label: "닫기", bgColor: "rgba(242,244,255,.2)"
		@long.dismissBtn.y += @long.content.contentFrame().height + 24
		@long.content.addChild @long.dismissBtn
		@long.buttons.push @long.dismissBtn
		
		#
		@short.visible = true
		@long.visible = false
		
		# Show background
		@bg.show = =>
			@bg.animate
				opacity: 1
				options:
					time: .3
					curve: "linear"
		# Dismiss background
		@bg.dismiss = =>	
			@bg.animate
				opacity: 0
				options:
					time: 1
					curve: "linear"
					delay: .2
					
		# Show Short looks
		@short.show = =>
			@short.y = @maxY
			@short.animate 
				y: 0
				options:
					time: 4
					curve: "spring(200,20,0)"
		# Dismiss Short looks
		@short.dismiss = =>
			@short.removeChild @short.icon
			@short.icon.parent = @long
			
			@short.animate
				y: @short.y - 250
				opacity: 0
				options:
					time: .07
					curve: "spring(500,50,0)"
			@short.once Events.AnimationEnd, => @short.destroy()
				
			@short.icon.animate
				x: -32, y: -49
	# 			x: 22, y: 5
				options:
					time: .4
					curve: "spring(200,20,0)"
					
			@short.icon.animate
				scale: 88/@short.icon.width
	# 			width: 88, height: 88
				options:
					time: .46
					curve: "ease-in-out"
					
		# Show Long looks
		@long.show = =>
			@long.visible = true
			@long.content.y = @maxY
			
			@long.content.animate
				y: @long.contentInset.top
				options:
					time: 1
					curve: "spring(200,20,0)"
					
			@long.time.opacity = 0
			@long.time.animate 
				opacity: 1
				options:
					time: 1
			
			# Event : Animation end
			@long.content.once Events.AnimationEnd, =>
				# Event : Scroll
				@short.icon.startY = @short.icon.y
				@long.time.startY = @long.time.y
				@long.confirm.startY = @long.confirm.y
				@long.onMove =>
					posY = @long.scrollY
					@short.icon.y = @short.icon.startY - posY

					# print posY
					
					@long.time.y = @long.time.startY - posY
					if posY < 0 then @long.time.y = @long.time.startY
					@long.time.opacity = 1 + (posY / 40)

					@long.confirm.y = @long.confirm.startY - posY
					if @long.confirm.startY - posY < 0
						@long.confirm.changeMode false
					else 
						@long.confirm.changeMode true

				@long.onScrollEnd =>
					@close() if @long.confirm.isChangeMode

				# Event : Action buttons
				for button in @long.buttons
					button.onClick => @dismiss() 
		
		# Dismiss Long looks
		@long.dismiss = =>
			@long.animate
				opacity: 0
				options:
					time: .3
					curve: "ease"

		@long.close = =>
			@long.content.draggable.animateStop()
			@long.content.animateStop()
			@long.content.animate y: @maxY * 1.3, options: { time: .15, curve: "spring(500,50,0)" }
			
		# 알림 
		@show()

	# Show
	show: ->
		@bringToFront()
		@bg.show()
		@short.show()
		
		Utils.delay 1.3, =>
			@short.dismiss()
			@long.show()
			
	# Dismiss
	dismiss: ->
		@bg.dismiss()
		@long.dismiss()
		
		Utils.delay 1.3, => @destroy()

	# Close
	close: ->
		@bg.dismiss()
		@long.close()

		Utils.delay .3, => @destroy()

	# 버튼 생성 
	createActionButton = (options = {}) ->
		options.label ?= "Action"
		options.style ?= Button.Style.Default
		options.bgColor ?= "rgba(242,244,255,.14)"
		options.labelColor ?= "white"
		options.isHaptic ?= false
		
		label = options.label
		style = options.style
		bgColor = options.bgColor
		labelColor = options.labelColor
		isHaptic = options.isHaptic

		# 버튼
		button = new Layer
			name: ".notification.button-#{label}"
			x: Align.left(2)
			width: 308, height: 80
			html: label
			style:
				fontSize: "32px", fontWeight: 400, lineHeight: "80px"
				textAlign: "center"
				letterSpacing: "-0.1px"
			color: if style is Button.Style.Destructive then "#FF3B30" else labelColor
			borderRadius: 15
			backgroundColor: bgColor
		# 버튼 : 상태
		button.states =
			pressed: 
				scale: .95
				opacity: .8
				animationOptions:
					time: .15
					curve: "spring(500,50,0)"
			normal:
				scale: 1
				opacity: 1
				animationOptions:
					time: .20
					curve: "spring(500,50,0)"
		
		# 버튼 효과
		button.onMouseDown -> @animate "pressed"
		button.onMouseUp -> @animate "normal"
		button.onMouseOut -> @animate "normal"
		button.onTap -> Device.playHaptic() if isHaptic
		
		return button

	# 메시지 생성
	createMessage = (options = {}) ->
		# 컨텐츠
		content = new Layer
			name: ".notification.content"
			x: Align.left(2)
			width: 308, height: 232
			backgroundColor: options.bgColor
			borderRadius: 15
			
		# 헤더
		content.header = new Layer
			name: ".header"
			width: content.width, height: 60
			html: options.appName
			style: 
				fontSize: "28px", fontWeight: 400, lineHeight: "34px"
				letterSpacing: "0.5px"
				textAlign: "right"
				padding: "12px 21px 14px 0px"
				textTransform: "uppercase"
				borderRadius: "15px 15px 0px 0px"
			color: options.sashLabelColor
			backgroundColor: options.sashColor
			parent: content
		
		# 타이틀
		content.title = new Layer
			name: ".title"
			x: Align.left(15), y: content.header.maxY + 25
			width: 278
			html: options.title
			style: fontSize: "32px", fontWeight: 600, lineHeight: 1
			backgroundColor: ""
			parent: content
		Util.text.autoSize content.title, {}, { width: content.title.width }
		
		# 메시지
		content.message = new Layer
			name: ".message"
			x: content.title.minX, y: content.title.maxY + 2
			width: content.title.width
			html: options.message
			style: 
				fontSize: "32px", fontWeight: 400, lineHeight: "37px"
				letterSpacing: "-0.2px"
			backgroundColor: ""
			parent: content
		Util.text.autoSize content.message, {}, { width: content.message.width }

		# 추가내용
		if options.attach
			content.attach = new Layer
				name: ".attach"
				x: content.message.x, y: content.message.maxY + 2
				width: content.message.width
				backgroundColor: ""
				parent: content
			content.attach.addChild options.attach
			options.attach.point = Align.center
			content.attach.height = content.attach.contentFrame().y + content.attach.contentFrame().height
		
		# 컨텐츠 높이 조정 : 하단 여백 추가
		content.height = content.contentFrame().height + 33
		
		return content