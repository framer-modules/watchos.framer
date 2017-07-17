'''
watchOS : Apps

@auther ho.s
@since 2016.11.23
'''
class exports.Apps extends Layer
	clockSize = 84
	clockScale = 1

	appSize = clockSize - 10
	appScale = 1

	# Constructor
	constructor: (options = {}) ->
		options.name ?= "Apps"
		options.image ?= "images/apps.jpg"
		super options

		clockScale = clockSize / Math.sqrt( Math.pow(@width, 2) + Math.pow(@height, 2) )
		appScale = appSize / Math.sqrt( Math.pow(@width, 2) + Math.pow(@height, 2) )

		@_clockfaces = options.clockfaces
		@_appInfo = options.appInfo
		@_app = @_appInfo.app

		@aniOptionsShow = time: .3, curve: "ease-out"
		@aniOptionsDismiss = time: .25, curve: "ease-in"

		@clockface = new App
			name: "clockfaces"
			point: Align.center
			size: clockSize
			parent: @
		@clockface.onClick => @dismiss @_clockfaces

		# Exist app
		if @_app
			@app = new App
				name: "app"
				x:Align.center(90), y: Align.center
				size: appSize
				html: "APP"
				style:
					fontSize: "20px", fontWeight: "600"
					lineHeight: "#{appSize}px"
					textAlign: "center"
					borderStyle: "dashed"
				borderRadius: appSize/2, borderWidth: 1, borderColor: "white"
				parent: @

			if @_appInfo.icon
				@app.props = 
					html: ""
					borderWidth: 0
					image: @_appInfo.icon
					
			@app.onClick => @dismiss @_app

		@scale = 1 / clockScale
		@sendToBack()

	init: ->
		@props = visible: true,	scale: 1, point: Align.center

	show: (app) ->
		return if @isAnimating
		
		# ClockFace
		if app is @_clockfaces
			@props = scale: 1 / clockScale, point: Align.center
			@animate scale: 1, options: @aniOptionsShow
			
			@clockface.addContent @_clockfaces, clockScale
			@_clockfaces.timeStop()

			@visible = true
			@bringToFront()
			
			@clockface.show()

			@_clockfaces.animateStop()
			@_clockfaces.animate scale: clockScale * 2/3
			
		# App (Kakaostock)
		else if app is @_app
			@props = scale: 1 / appScale, x: Align.center(-90 / appScale), y: Align.center
			@animate scale: 1, x: Align.center, y: Align.center, options: @aniOptionsShow
			
			@app.addContent @_app, appScale

			@visible = true
			@bringToFront()
			
			@app.show()
			
			@_app.animateStop()
			@_app.animate scale: appScale * 2/3

	dismiss: (app) ->
		return if @isAnimating

		# ClockFace
		if app is @_clockfaces
			return if @_clockfaces.isAnimating

			@animate scale: 1 / clockScale, options: @aniOptionsDismiss
			
			@clockface.dismiss()

			@_clockfaces.visible = true
			@_clockfaces.animate scale: clockScale, options: { time: .8 }
			Utils.delay .9, =>
				@clockface.removeContent @_clockfaces
				@_clockfaces.timeStart()

				@visible = false
			
		# App (Kakaostock)
		else if app is @_app
			return if @_app.isAnimating

			#
			if _.isEmpty(@app.content.children)
				@app.addContent @_app, appScale 

			@animate scale: 1 / appScale, x: Align.center(-90 / appScale), y: Align.center, options: @aniOptionsDismiss
			
			@app.dismiss()

			@_app.visible = true
			@_app.animate scale: appScale, options: { time: .8 }
			Utils.delay .9, =>
				@app.removeContent @_app

				@visible = false

# App
class App extends Layer
	# Constructor
	constructor: (options = {}) ->
		options.backgroundColor ?= ""
		options.clip ?= true
		super options

		@iconSize = options.size

		@startPoint = @point

		@bg = new Layer
			name: ".bg"
			point: Align.center
			size: @iconSize
			backgroundColor: "black"
			borderRadius: 42
			opacity: 0
			parent: @

		@content = new Layer
			name: "content"
			point: Align.center
			size: 0
			backgroundColor: "black"
			borderRadius: 42
			clip: true
			parent: @

		@content.on "change:size", =>
			@content.center()

			return unless app = @content.children[0]
			app.props = x: (@content.width - app.width) / 2, y: (@content.height - app.height) / 2

		@aniOptionsShow = time: .3, curve: "ease-out"
		@aniOptionsDismiss = time: .25, curve: "ease-in"

	init: ->
		@bg.opacity = 0
		@content.size = 0

	show: ->
		return if @bg.isAnimating

		@bg.opacity = 1
		@content.size = @iconSize
		@bg.animate opacity: 0, options: @aniOptionsShow
		@content.animate width: 0, height: 0, options: @aniOptionsShow

	dismiss: ->
		return if @bg.isAnimating

		@bg.animate opacity: 1, options: @aniOptionsDismiss
		@content.animate width: @iconSize, height: @iconSize, options: @aniOptionsDismiss

	addContent: (layer, scale) ->
		if layer
			@content.addChild layer
			layer.props = point: Align.center, scale: scale, clip: true
	
	removeContent: (layer) ->
		if layer
			@content.removeChild layer 
			layer.props = point: 0, scale: 1, clip: false
			layer.bringToFront()

			@init()
