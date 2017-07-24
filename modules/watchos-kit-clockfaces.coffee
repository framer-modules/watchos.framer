'''
watchOS : ClockFaces

@auther Jungho song (threeword.com)
@since 2016.11.23
'''
class exports.ClockFaces extends Layer
	'''
	complications:
		utilitarian: []
		modular: []
		circular: []
	'''
	# Constructor
	constructor: (options = {}) ->
		options.name ?= "ClockFaces"
		options.backgroundColor ?= "black"
		super options

		options.complications ?= {}
		complications = _.defaults(options.complications, {	utilitarian: [], modular: [], circular: [] })

		# Page
		@page = new PageComponent
			name: "page"
			width: @width, height: @height
			scrollVertical: false
			backgroundColor: ""
			clip: false
			parent: @
		@page.content.clip = false
		@page.states =
			change: y: -13, scale: 284 / @height
			selected: y: 0, scale: 1

		# Clockface : Utilitarian
		@utilitarian = new ClockFace(width: @width, height: @height).utilitarian complications.utilitarian
		# Clockface : Modular
		@modular = new ClockFace(width: @width, height: @height).modular complications.modular
		# Clockface : Circular
		@circular = new ClockFace(width: @width, height: @height).circular complications.circular

		# Add page
		@page.addPage @utilitarian
		@page.addPage @modular
		@page.addPage @circular
		# Snap page
		@page.snapToPage @modular, false

		# Customize
		@customize = new Layer
			name: "customize"
			x: Align.center, y: @page.maxY + 10
			width: 157, height: 57
			html: "사용자화"
			style:
				fontSize: "32px", fontWeight: "400"
				lineHeight: "57px"
				textAlign: "center"
			borderRadius: 15
			backgroundColor: "#333333"
			scale: 1 / 0.7, originY: 0
			parent: @page
		@customize.sendToBack()

		# 시계화면 : 이벤트
		@isChangeDone = false
		@isChangeMode = false

		# Events
		for child in @page.content.children
			child.onClick => @selected()

		# Long-Press(ForceTouch) : Start
		@page.onLongPressStart =>
			return if @isChangeMode
			#
			child.modeChange() for child, i in @page.content.children
			@page.animate "change"

		# Long-Press(ForceTouch) : End
		@page.onLongPressEnd =>
			return if @isChangeMode
			#
			@isChangeMode = true
			Utils.delay .3, => @isChangeDone = true

		# Screen.on Events.EdgeSwipeLeftStart, (event) ->
		# 	print "start : #{event.point.x}"
		# Screen.on Events.EdgeSwipeLeft, (event) ->
		# # 	print event
		# Screen.on Events.EdgeSwipeLeftEnd, (event) ->
		# 	print "end : #{event.point}"

	# Selected
	selected: () ->
		return unless @isChangeMode
		return unless @isChangeDone
		
		#
		for child, i in @page.content.children
			child.modeChange false 
		@page.animate "selected"

		#
		@isChangeMode = false
		@isChangeDone = false

	# Time start
	timeStart: -> page.clock.start() for page in @page.content.children
		
	# Time stop
	timeStop: -> page.clock.stop() for page in @page.content.children

	# Set clock face
	setClockface: (index) ->
		return if _.isEmpty(@page.content.children)
		return if _.size(@page.content.children) - 1 < index

		@page.snapToPage @page.content.children[index]

'''
Complication Images : https://developer.apple.com/watchos/human-interface-guidelines/icons-and-images/

Family:
	modularSmall
	modularLarge
	utilitarianSmall
	utilitarianSmallFlat
	utilitarianLarge
	circularSmall
	extraLarge

Template:
	tintColor: "색상"
	columnAlignment: "leading" or "tailing"

Circular:
	SmallSimpleText: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplatecircularsmallsimpletext)
		textProvider: "문자열" (https://developer.apple.com/reference/clockkit/clktextprovider)
	SmallRingImage: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplatecircularsmallringimage)
		imageProvider: "이미지" (https://developer.apple.com/reference/clockkit/clkimageprovider)
		ringStyle: "closed" or "open" (https://developer.apple.com/reference/clockkit/clkcomplicationringstyle)
		fillFraction: 채우기 비율

Utilitarian:
	SmallFlat: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplateutilitariansmallflat)
		textProvider: "문자열" (https://developer.apple.com/reference/clockkit/clktextprovider)
		imageProvider: "이미지" (https://developer.apple.com/reference/clockkit/clkimageprovider)
	LargeFlat: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplateutilitarianlargeflat)
		textProvider: "문자열" (https://developer.apple.com/reference/clockkit/clktextprovider)
		imageProvider: "이미지" (https://developer.apple.com/reference/clockkit/clkimageprovider)
	SmallRingImage: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplateutilitariansmallringimage)
		imageProvider: "이미지" [require] (https://developer.apple.com/reference/clockkit/clkimageprovider)
		ringStyle: "closed" or "open" (https://developer.apple.com/reference/clockkit/clkcomplicationringstyle)
		fillFraction: 채우기 비율
	SmallSquare: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplateutilitariansmallsquare)
		imageProvider: "이미지" [require] (https://developer.apple.com/reference/clockkit/clkimageprovider)

Modular:
	SmallStackText: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplatemodularsmallstacktext)
		line1TextProvider: "1라인 문자열" (https://developer.apple.com/reference/clockkit/clktextprovider)
		line2TextProvider: "2라인 문자열" (https://developer.apple.com/reference/clockkit/clktextprovider)
		highlightLine2: Boolean
	SmallRingImage: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplatemodularsmallringimage)
		imageProvider: "이미지" [require] (https://developer.apple.com/reference/clockkit/clkimageprovider)
		ringStyle: "closed" or "open" (https://developer.apple.com/reference/clockkit/clkcomplicationringstyle)
		fillFraction: 채우기 비율
	LargeTallBody: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplatemodularlargetallbody)
		headerTextProvider: "헤더 문자열" (https://developer.apple.com/reference/clockkit/clktextprovider)
		bodyTextProvider: "바디 문자열" (https://developer.apple.com/reference/clockkit/clktextprovider)

ExtraLarge:


textProvider:
	label: 라벨명
	tintColor: 틴트색상

imageProvider:
	onePieceImage: 첫번째 이미지
	twoPieceImageBackground: 두번째 뒷 이미지
	twoPieceImageForeground: 두번째 앞 이미지
	tintColor: 틴트색상
'''
# Complication
class exports.Complication extends Layer

	Events.ColumnAlignment = "columnAlignment"
	Events.TintColor = 'tintColor'

	Family = {}
	Family.ModularSmall = "modularSmall"
	Family.ModularLarge = "modularLarge"
	Family.UtilitarianSmall = "utilitarianSmall"
	Family.UtilitarianSmallFlat = "utilitarianSmallFlat"
	Family.UtilitarianLarge = "utilitarianLarge"
	Family.CircularSmall = "circularSmall"
	Family.ExtraLarge = "extraLarge"

	Template = {}
	Template.SimpleImage = "simpleImage"
	Template.SimpleText = "simpleText"
	Template.RingImage = "ringImage"
	Template.RingText = "ringText"
	Template.StackText = "stackText"
	Template.StackImage = "stackImage"
	Template.ColumnsText = "columnsText"
	Template.Columns = "columns"
	Template.StandardBody = "standardBody"
	Template.Table = "table"
	Template.TallBody = "tallBody"
	Template.Flat = "flat"
	Template.Square = "square"

	RingStyle = {}
	RingStyle.Closed = "closed"
	RingStyle.Open = "open"

	ColumnAlignment = {}
	ColumnAlignment.Leading = "leading"
	ColumnAlignment.Trailing = "trailing"

	this.Family = Family
	this.Template = Template
	this.RingStyle = RingStyle
	this.ColumnAlignment = ColumnAlignment

	@define 'columnAlignment',
		get: () -> @_columnAlignment
		set: (value) -> @emit("change:#{Events.ColumnAlignment}", @_columnAlignment = value)

	@define 'tintColor',
		get: () -> @_tintColor
		set: (value) -> @emit("change:#{Events.TintColor}", @_tintColor = value)		

	# Constructor
	constructor: (options = {}) ->
		options.backgroundColor ?= ""
		super options

		options.family ?= Family.ModularSmall
		options.template ?= Template.SimpleText

		@family = options.family
		@template = options.template

	# ----------------------------------------------------------------------
	# Family
	# ----------------------------------------------------------------------

	# Modular : Small
	modularSmall: () ->
		@family = Family.ModularSmall
		@size = 100

		@tintColor = "white"

		return this

	# Modular : Large
	modularLarge: () ->
		@family = Family.ModularLarge
		@props = width: 312, height: 126

		@tintColor = "white"

		return this

	# Utilitarian : Small
	utilitarianSmall: () ->
		@family = Family.UtilitarianSmall
		@size = 51

		@tintColor = "white"

		return this

	# Utilitarian : Small flat
	utilitarianSmallFlat: (options = {}) ->
		@family = Family.UtilitarianSmallFlat
		@props = width: 120, height: 36

		@tintColor = "white"

		# Parameters
		options.imageProvider ?= {}
		options.textProvider ?= {}

		imageProvider = _.defaults(options.imageProvider, { twoPieceImageBackground: "", twoPieceImageForeground: "", tintColor: "white" })
		textProvider = _.defaults(options.textProvider, { tintColor: "white" })

		image = new Layer
			x: Align.left, y: Align.center
			size: 20
			image: imageProvider.onePieceImage
			backgroundColor: ""
			parent: @

		text = new Layer
			html: textProvider.label
			style: 
				fontSize: "28px", fontWeight: "400"
				lineHeight: "#{@height}px"
				letterSpacing: "-0.2px"
				textAlign: "left"
			color: textProvider.tintColor
			backgroundColor: ""
			parent: @
		Util.text.autoFontSize text, { height: @height }, { x: image.maxX + 3, y: Align.center }

		if @contentFrame().width > @width
			Util.text.autoFontSize text, { width: @width - image.width, height: @height }, { x: image.maxX + 3, y: Align.center }

		# Event : Change column alignment
		@on "change:#{Events.ColumnAlignment}", ->
			if @columnAlignment is ColumnAlignment.Leading
				image.props = x: Align.left, midY: text.midY
				text.x = image.maxX + 3
			else if @columnAlignment is ColumnAlignment.Trailing
				image.props = x: Align.right, midY: text.midY
				text.x = image.x - text.width - 3
				
		return this

	# Utilitarian : Large
	utilitarianLarge: (options = {}) ->
		@family = Family.UtilitarianLarge
		@props = width: 312, height: 36

		@tintColor = "white"

		# Parameters
		options.imageProvider ?= {}
		options.textProvider ?= {}

		imageProvider = _.defaults(options.imageProvider, { twoPieceImageBackground: "", twoPieceImageForeground: "", tintColor: "white" })
		textProvider = _.defaults(options.textProvider, { tintColor: "white" })

		image = new Layer
			x: Align.left, y: Align.bottom
			size: 20
			image: imageProvider.onePieceImage
			backgroundColor: ""
			parent: @

		text = new Layer
			html: textProvider.label
			style: 
				fontSize: "28px", fontWeight: "400"
				lineHeight: "1"
				letterSpacing: "-0.2px"
				textAlign: "left"
			color: textProvider.tintColor
			backgroundColor: ""
			parent: @
		Util.text.autoFontSize text, { height: @height }, { x: image.maxX + 3, y: Align.bottom }

		if @contentFrame().width > @width
			Util.text.autoFontSize text, { width: @width - image.width, height: @height }, { x: image.maxX + 3, y: Align.bottom }

		image.props = x: @midX - @contentFrame().width / 2, midY: text.midY
		text.x = image.maxX + 3

		return this

	# Circular : Small
	circularSmall: () ->
		@family = Family.CircularSmall
		@size = 68
		@scale = 51/68

		@tintColor = "#b3b3b3"

		return this

	# ExtraLarge
	extraLarge: () ->
		@family = Family.ExtraLarge

		@tintColor = "white"

		return this

	# ----------------------------------------------------------------------
	# Template
	# ----------------------------------------------------------------------

	# Simple text
	simpleText: (options = {}) ->
		@template = Template.SimpleText

		# Parameters
		options.textProvider ?= {}

		textProvider = _.defaults(options.textProvider, { tintColor: @tintColor })

		height = @height
		text = new Layer
			html: textProvider.label
			style: 
				fontSize: "67px", fontWeight: "400"
				lineHeight: "#{height}px"
				letterSpacing: "-0.5px"
				textAlign: "center"
			color: textProvider.tintColor
			backgroundColor: ""
			parent: @
		Util.text.autoFontSize text, { width: @width, height: height }, { x: Align.center, y: Align.center }

		return this

	# Stack text
	stackText: (options = {}) ->
		@template = Template.StackText

		# Parameters
		options.line1TextProvider ?= {}
		options.line2TextProvider ?= {}
		options.highlightLine2 ?= false

		line1TextProvider = _.defaults(options.line1TextProvider, { tintColor: @tintColor })
		line2TextProvider = _.defaults(options.line2TextProvider, { tintColor: @tintColor })
		highlightLine2 = options.highlightLine2

		line1TextHeight = 30
		line1Text = new Layer
			html: line1TextProvider.label
			style: 
				fontSize: "67px", fontWeight: "500"
				lineHeight: "1"
				letterSpacing: "-0.4px"
				padding: "0px 8px"
				textAlign: "center"
			color: line1TextProvider.tintColor
			backgroundColor: ""
			parent: @
		Util.text.autoFontSize line1Text, { width: @width, height: line1TextHeight }, { x: Align.center, y: Align.bottom(-55) } #Align.center( -@height * 1/3 * 1/2 )

		line2TextHeight = 35
		line2Text = new Layer
			html: line2TextProvider.label
			style: 
				fontSize: "67px", fontWeight: "500"
				lineHeight: "1"
				letterSpacing: "-0.4px"
				padding: "0px 3.5px"
				textAlign: "center"
			color: line2TextProvider.tintColor
			backgroundColor: ""
			parent: @
		Util.text.autoFontSize line2Text, { width: @width, height: line2TextHeight }, { x: Align.center, y: Align.bottom(-18) } #line1Text.maxY - 10

		return this

	# Simple image
	simpleImage: (options = {}) ->
		@template = Template.SimpleImage

		# Parameters
		options.imageProvider ?= {}

		imageProvider = _.defaults(options.imageProvider, { twoPieceImageBackground: "", twoPieceImageForeground: "", tintColor: @tintColor })

		size = 100
		switch @family
			when Family.ModularSmall then size = 58 * 1.6
			when Family.UtilitarianSmall then size = 44
			when Family.CircularSmall then size = 36 * (1/@scale)
				
		image = new Layer
			point: Align.center
			size: size
			image: imageProvider.onePieceImage
			backgroundColor: ""
			parent: @

		if @family is Family.CircularSmall
			image.brightness = 0
			image.contrast = 50
			image.invert = 100

		return this

	# Square
	square: (options = {}) -> 
		@simpleImage options
		@template = Template.Square

		return this

	# Ring image
	ringImage: (options = {}) ->
		@template = Template.RingImage

		# Parameters
		options.imageProvider ?= {}
		options.fillFraction ?= 0
		options.ringStyle ?= RingStyle.Closed

		imageProvider = _.defaults(options.imageProvider, { twoPieceImageBackground: "", twoPieceImageForeground: "", tintColor: @tintColor })
		fillFraction = options.fillFraction
		ringStyle = options.ringStyle

		imageSize = 38; ringSize = 58; ringWidth = 5
		switch @family
			when Family.ModularSmall 
				imageSize = 38
				ringSize = 58
				ringWidth = 5
			when Family.UtilitarianSmall
				imageSize = 28
				ringSize = 47
				ringWidth = 4
			when Family.CircularSmall
				imageSize = 44
				ringSize = 64
				ringWidth = 6
			when Family.ExtraLarge
				imageSize = 133

		image = new Layer
			point: Align.center
			size: imageSize
			image: imageProvider.onePieceImage
			backgroundColor: ""
			parent: @
		if @family is Family.CircularSmall
			image.brightness = 0
			image.contrast = 50
			image.invert = 100

		ring = new CircularProgressComponent
			point: Align.center
			size: ringSize
			parent: @

		ringColor = new Color(imageProvider.tintColor)
		ring.strokeWidth = ringWidth
		ring.progressColor = ringColor
		ring.railsColor = ringColor.alpha(.3)
		ring.setProgress fillFraction, false

		return this

	# Tall body
	tallBody: (options = {})->
		@template = Template.TallBody

		# Parameters
		options.headerTextProvider ?= {}
		options.bodyTextProvider ?= {}

		headerTextProvider = _.defaults(options.headerTextProvider, { tintColor: @tintColor })
		bodyTextProvider = _.defaults(options.bodyTextProvider, { tintColor: @tintColor })

		headerTextHeight = 46
		headerText = new Layer
			html: headerTextProvider.label
			style: 
				fontSize: "33px", fontWeight: "400"
				lineHeight: "#{headerTextHeight}px"
				letterSpacing: "0.1px"
				padding: "0px 12px"
				textAlign: "left"
			color: headerTextProvider.tintColor
			backgroundColor: ""
			parent: @
		Util.text.autoFontSize headerText, { width: @width, height: headerTextHeight }, { x: Align.left, y: Align.top } 

		bodyTextHeight = 80
		bodyText = new Layer
			html: bodyTextProvider.label
			style: 
				fontSize: "80px", fontWeight: "400"
				lineHeight: "#{bodyTextHeight}px"
				letterSpacing: "-0.5px"
				padding: "0px 12px"
				textAlign: "left"
			color: bodyTextProvider.tintColor
			backgroundColor: ""
			parent: @
		Util.text.autoFontSize bodyText, { width: @width, height: bodyTextHeight }, { x: Align.left, y: headerText.maxY }

		return this

	# Small flat
	smallFlat: (options = {}) ->
		@Template = Template.Flat
		@props = width: 120, height: 36, scale: 1

		# Parameters
		options.imageProvider ?= {}
		options.textProvider ?= {}

		imageProvider = _.defaults(options.imageProvider, { twoPieceImageBackground: "", twoPieceImageForeground: "", tintColor: @tintColor })
		textProvider = _.defaults(options.textProvider, { tintColor: @tintColor })

		image = new Layer
			x: Align.left, y: Align.center
			size: 20
			image: imageProvider.onePieceImage
			brightness: 0, contrast: 50, invert: 100
			backgroundColor: ""
			parent: @

		text = new Layer
			html: textProvider.label
			style:
				fontSize: "28px", fontWeight: "500"
				lineHeight: "#{@height}px"
				letterSpacing: "-0.2px"
				textAlign: "left"
			color: textProvider.tintColor
			backgroundColor: ""
			parent: @
		Util.text.autoFontSize text, { height: @height }, { x: image.maxX + 3, y: Align.center }

		if @contentFrame().width > @width
			Util.text.autoFontSize text, { width: @width - image.width, height: @height }, { x: image.maxX + 3, y: Align.center }

		# Event : Change column alignment
		@on "change:#{Events.ColumnAlignment}", ->
			if @columnAlignment is ColumnAlignment.Leading
				image.x = Align.left
				text.x = image.maxX + 3
			else if @columnAlignment is ColumnAlignment.Trailing
				image.x = Align.right
				text.x = image.x - text.width - 3
				
		return this

	# Dummy
	dummy: (imageUrl = "") ->
		@template = Template
		@image = imageUrl

		return this

# ClockFace
class ClockFace extends Layer
	# Constructor
	constructor: (options = {}) ->
		options.backgroundColor ?= "rgba(255,255,255,.2)"
		super options

		# Background
		@bg = new Layer
			name: ".bg"
			width: @width, height: @height
			backgroundColor: "black"
			borderRadius: 12
			parent: @
		@bg.frame = Utils.frameInset @bg, 10

		# Complication
		@complication = new Layer
			name: ".complication"
			width: @width, height: @height
			backgroundColor: "black"
			parent: @

		# Label
		@label = new Layer
			name: ".label"
			html: @name
			style: 
				fontSize: "#{24 * 1/0.7*284/272}px", fontWeight: "400"
				lineHeight: "1"
				textAlign: "center"
			backgroundColor: ""
			parent: @

		@label.on "change:html", ->
			Util.text.autoSize @
			@props =	x: Align.center(-7), maxY: -13

	# Change mode
	modeChange: (type = true) ->
		if type
			@props =
				borderRadius: 15
				scale: 273 / 285
			@complication.props =
				borderRadius: 12
				scale: 239 / 273
		else 
			@props =
				borderRadius: 0
				scale: 1
			@complication.props =
				borderRadius: 0
				scale: 1

	# Circular
	circular: (complications = []) ->
		@label.html = @name = "심플"
		@clock = new AnalogClock width: @width, height: @height, parent: @complication

		for complication, i in complications
			if complication
				@complication.addChild complication
				switch i
					when 0
						complication.props = x: Align.left, y: Align.top, originX: 0, originY: 0
						complication.columnAlignment = exports.Complication.ColumnAlignment.Leading
					when 1 
						complication.props = x: Align.right, y: Align.top, originX: 1, originY: 0
						complication.columnAlignment = exports.Complication.ColumnAlignment.Trailing
					when 2 
						complication.props = x: Align.left, y: Align.bottom, originX: 0, originY: 1
						complication.columnAlignment = exports.Complication.ColumnAlignment.Leading
					when 3
						complication.props = x: Align.right, y: Align.bottom, originX: 1, originY: 1
						complication.columnAlignment = exports.Complication.ColumnAlignment.Trailing

		return this

	# Utilitarian
	utilitarian: (complications = []) ->
		@label.html = @name = "유틸리티"
		@clock = new AnalogClock width: @width, height: @height, parent: @complication

		for complication, i in complications
			if complication
				@complication.addChild complication
				switch i
					when 0 
						complication.props = x: Align.left, y: Align.top
						complication.columnAlignment = exports.Complication.ColumnAlignment.Leading
					when 1
						complication.props = x: Align.right, y: Align.top
						complication.columnAlignment = exports.Complication.ColumnAlignment.Trailing
					when 2 then complication.props = x: Align.center, y: Align.bottom

		return this

	# Modular
	modular: (complications = []) ->
		@label.html = @name = "모듈"
		@clock = new DigitalClock width: @width, height: @height, parent: @complication

		for complication, i in complications
			if complication
				@complication.addChild complication
				switch i
					when 0 then complication.props = x: Align.left, y: Align.top(38)
					when 1 then complication.props = x: Align.left, y: Align.bottom
					when 2 then complication.props = x: Align.center, y: Align.bottom
					when 3 then complication.props = x: Align.right, y: Align.bottom
					when 4 then complication.props = x: Align.center, y: Align.center(19)
					
		return this


# Clock
class Clock extends Layer
	# Constructor
	constructor: (options = {}) ->
		options.backgroundColor ?= ""
		super options

	# Start time
	start: (timer) -> @timer = timer
	# Stop time
	stop: -> clearInterval @timer if @timer


# Clock : Digital
class DigitalClock extends Clock
	# Constructor
	constructor: (options = {}) ->
		options.name = "DigitalClock"
		options.html = Util.date.timeFormatter Util.date.getTime()
		options.style =
			fontSize: "85px", fontWeight: "300"
			lineHeight: "1"
			textAlign: "right"
			letterSpacing: "-3px"
		super options

		Util.text.autoSize @
		@props = x: Align.right(-12), y: Align.top(43)

		# Start time
		@start()

	start: ->
		super
		@time = Util.date.getTime()
		@html = Util.date.timeFormatter @time = Util.date.getTime()
		Utils.delay 60 - @time.secs, => 
			@html = Util.date.timeFormatter @time = Util.date.getTime()
			@timer = Utils.interval 60, => @html = Util.date.timeFormatter @time = Util.date.getTime()
			super @timer


# Clock : Analog
class AnalogClock extends Clock
	# Constructor
	constructor: (options = {}) ->
		super options

		@borderRadius = @width/2

		# Edge
		@edge = new Layer
			name: ".edge"
			point: Align.center
			size: @width
			backgroundColor: ""
			parent: @

		secAngle = 360 / 60
		for i in [1..60]
			# Hour
			if i%%5 is 0
				hourBar = new Layer
					name: ".edge.hour"
					html: i / 5
					style:
						fontSize: "40px", fontWeight: "400"
						lineHeight: "1"
						textAlign: "center"
					color: "white"
					backgroundColor: ""
					parent: @edge
				Util.text.autoSize hourBar
				a = (-90 + (secAngle * i)) * (Math.PI / 180)
				r = @edge.width/2 - hourBar.height + 3
				hourBar.props = 
					x: @edge.width/2 - hourBar.width/2 + Math.cos(a) * r
					y: @edge.height/2 - hourBar.height/2 + Math.sin(a) * r
			
			# Minute
			if i %% 5 is 0
				minBar = new Layer
					name: ".edge.min"
					html: if i < 10 then "0#{i}" else i
					style:
						fontSize: "13px", fontWeight: "400"
						lineHeight: "1"
						textAlign: "center"
						letterSpacing: "-1px"
					color: "white"
					backgroundColor: ""
					parent: @edge
				Util.text.autoSize minBar
				a = (-90 + (secAngle * i)) * (Math.PI / 180)
				r = @edge.width/2 - minBar.height + 9
				r -= 2 if i is 15 or i is 45
				minBar.props = 
					x: @edge.width/2 - minBar.width/2 + Math.cos(a) * r
					y: @edge.height/2 - minBar.height/2 + Math.sin(a) * r
			# Second
			else
				secBar = new Layer
					name: ".sec"
					x: Align.center, y: Align.bottom(-@edge.width/2 + 8)
					width: 2, height: 8
					backgroundColor: "rgba(255,255,255,.5)"
					parent: new Layer name: ".edge.sec.parent", point: Align.center, size: 1, originX: .5, originY: 1, rotation: secAngle * i, backgroundColor: "", parent: @edge

		# Arrow : Minute
		@min = new Layer
			name: ".min"
			point: Align.center
			size: 12
			borderRadius: 7
			backgroundColor: "white"
			parent: @
		@min.bottom = new Layer
			name: ".min.bottom"
			x: Align.center, y: Align.bottom(-@min.width/2 + 2)
			width: 4, height: 20 + 2
			borderRadius: 2
			backgroundColor: "white"
			parent: @min
		@min.top = new Layer
			name: ".min.top"
			x: Align.center, maxY: @min.bottom.minY + 5
			width: 10, height: @width/2 - 10 - 20 + 5
			borderRadius: 5
			backgroundColor: "white"
			parent: @min


		# Arrow : Hour
		@hour = @min.copy()
		@hour.parent = @
		@hour.children[1].height -= 50
		@hour.children[1].maxY = @hour.children[0].minY + 5

		@min.sendToBack()
		@hour.sendToBack()

		# Arrow : Second
		@sec = new Layer
			name: ".sec"
			point: Align.center
			size: 8
			borderRadius: 7
			backgroundColor: "orange"
			parent: @
		@sec.bar = new Layer
			name: ".sec.bar"
			x: Align.center, y: Align.bottom(18)
			width: 2, height: @width/2 + 22
			backgroundColor: @sec.backgroundColor
			parent: @sec
		@sec.dot = new Layer
			name: ".sec.dot"
			point: Align.center
			size: 2
			borderRadius: 2
			backgroundColor: "black"
			parent: @sec

		# Events
		animationEnd = -> @rotation = 0 if @rotation is 360
		@sec.onAnimationEnd animationEnd
		@min.onAnimationEnd animationEnd
		@hour.onAnimationEnd animationEnd

		# Start time
		@start()

	update: (animate = true) =>
		time = Util.date.getTime()
		
		time.secs = 60 if time.secs is 0
		time.mins = 60 if time.mins is 0
		time.hours = time.hours - 12 if time.hours > 12
		time.hours = 12 if time.hours is 0
		
		secAngle = (360 / 60) * time.secs
		minAngle = (360 / 60) * time.mins
		minAngle += (360 / 60 / 60) * time.secs unless time.secs is 60
		hourAngle = (360 / 12) * time.hours
		hourAngle += (360 / 12 / 60) * time.mins unless time.mins is 60
		
		@sec.animateStop()
		@min.animateStop()
		@hour.animateStop()
		
		if animate
			@sec.animate rotation: secAngle, options: { time: .98, curve: "linear" }
			@min.animate rotation: minAngle, options: { curve: "linear" }
			@hour.animate rotation: hourAngle, options: { curve: "linear" }
		else 
			@sec.rotation = secAngle
			@min.rotation = minAngle
			@hour.rotation = hourAngle

	start: ->
		@update false
		@timer = Utils.interval 1, @update
		super @timer