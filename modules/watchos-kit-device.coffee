'''
watchOS : Device

@auther ho.s
@since 2016.11.23
'''
class exports.Device extends Framer.BaseClass

	# Events defined
	Events.DigitalCrown = 'digitalCrown'
	Events.Side = 'side'

	# Haptic type
	HapticType = 
		Notification: "haptics-notification"
		DirectionUp: "haptics-directionUp"
		DirectionDown: "haptics-directionDown"
		Success: "haptics-success"
		Failure: "haptics-failure"
		Retry: "haptics-retry"
		Start: "haptics-start"
		Stop: "haptics-stop"
		Click: "haptics-click"

	@define "HapticType", @simpleProperty("HapticType", HapticType)

	# this.HapticType = HapticType

	# Device : Apple Watch 42mm
	@define "width", @simpleProperty("width", 312)
	@define "height", @simpleProperty("height", 390)
	@define "ratio", @simpleProperty("ratio", undefined)

	# Constructor
	constructor: (options = {}) ->
		super options

		#
		@ratio = Screen.width / @width
		Framer.Device.contentScale = @ratio

		# Phychical
		if Framer.Device.deviceType.indexOf("watch") isnt -1
			x; y
			if Framer.Device.deviceType.indexOf("38mm") isnt -1
				x = -5; y = 88
			else if Framer.Device.deviceType.indexOf("42mm") isnt -1
				x = 5; y = 100
					
			# Digital Crown
			@digitalCrown = new Layer
				name: "DigitalCrown"
				x: Align.right(x), y: Align.center(-y)
				width: 50, height: 100
				backgroundColor: "rgba(255,0,0,0)"
				parent: Framer.Device.phone
				
			# Side button
			@side = new Layer
				name: "Side"
				x: Align.right(x-13), y: Align.center(y-20)
				width: 32, height: 150
				backgroundColor: "rgba(255,0,0,0)"
				parent: Framer.Device.phone

			if Utils.isDesktop() and not Utils.isLocalUrl(document.URL)
				@digitalCrown.guide = createGuide html: "Digital Crown", parent: @digitalCrown
				@side.guide = createGuide html: "Side Button", parent: @side
				
			# 이벤트
			@digitalCrown.onClick -> @emit Events.DigitalCrown, @
			@side.onClick -> @emit Events.Side, @

	createGuide = (options = {})->
		guide = new Layer _.extend options,
			name: ".guide"
			style:
				fontWeight: "400"
				fontSize: "25px"
				textTransform: "uppercase"
				letterSpacing: "-1.5px"
				paddingLeft: "30px"
			color: "gray"
			backgroundColor: ""
		Util.text.autoSize guide
		guide.props = x: guide.parent.width + 10, y: Align.center

		arrow = new Layer 
			name: ".arrow"
			y: Align.center
			size: 16
			rotation: 45
			style: 
				borderStyle: "hidden hidden solid solid"
			borderColor: "gray", 
			borderWidth: 3
			backgroundColor: ""
			parent: guide

		arrow.line = new Layer
			point: Align.center(1.5)
			width: 21, height: 3
			rotation: -45
			backgroundColor: "gray"
			parent: arrow

		return guide

	# Play haptic feedback
	playHaptic: (type = HapticType.Success) ->

		# Count
		repeat = 0
		switch type
			when HapticType.Success then repeat = 2

		# Tap
		Framer.Device.phone.rotation = .5
		Framer.Device.phone.animate 
			rotation: 0, 
			options:
				time: .1
				repeat: repeat
				curve: "spring(1000,20,0)"

		# Audio
		@playAudio type

	# Play audio feedback
	playAudio: (type) ->
		unless @audioLayer
			@audioLayer = new Layer size: 0, visible: false
			@player = document.createElement("audio")
			@player.setAttribute("webkit-playsinline", "true")
			@player.setAttribute("preload", "auto")
			@player.volume ?= 0.75
			@audioLayer._element.appendChild(@player)

		@player.src = "audio/#{type}.mp3"
		@player.play()

	# 이벤트 헬퍼
	onDigitalCrown: (cb) => @digitalCrown.on Events.DigitalCrown, cb
	onSide: (cb) => @side.on Events.Side, cb