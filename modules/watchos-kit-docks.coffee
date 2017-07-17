'''
watchOS : Docks

@auther ho.s
@since 2016.11.23
'''
class exports.Docks extends Layer

	# Basic apps
	appsInfo = [
		{ name: "메시지", icon: "images/ic_messages.png", image: "images/messages.png" }
		{ name: "캘린더", icon: "images/ic_calendar.png", image: "images/calendar.png" }
		{ name: "타이머", icon: "images/ic_stopwatch.png", image: "images/stopwatch.png" }
		{ name: "지도", icon: "images/ic_maps.png", image: "images/maps.png" }
		{ name: "운동", icon: "images/ic_workout.png", image: "images/workout.png" }
		{ name: "날씨", icon: "images/ic_weather.png", image: "images/weather.png" }
		{ name: "음악", icon: "images/ic_music.png", image: "images/music.png" }
	]
		
	# Constructor
	constructor: (options = {}) ->
		options.name = "Docks"
		options.backgroundColor = "rgba(255,255,255,.2)"
		options.opacity = 0
		super options

		#
		Util.blur @
		@onClick -> console.log "block"
		@sendToBack()
		
		# Page	
		@page = new PageComponent
			name: "page"
			width: @width, height: @height
			scrollVertical: false
			clip: false
			parent: @
		
		# Page : Indicator
		@page.indicator = new Indicator page: @page

		# Page : Dock
		for appInfo in appsInfo
			dock = new Dock width: @width, height: @height, info: appInfo
			@page.addPage dock
			dock.onClick => @selected()

		# Page : Label
		@page.label = new Label	page: @page
		
		# 기본 페이지 : 첫번째
		@page.snapToPage @page.content.children[0], false
		
	# Show
	show: ->
		@animateStop()
		@bringToFront()
		@opacity = 1
		@page.animate y: 5, scale: 281 / @height

		page.show() for page, i in @page.content.children

	# Dismiss
	dismiss: (forceClose = false) ->
		return if @isAnimating

		# Force close
		if forceClose then @close()
		else
			# Exist select dock
			if @selectDock
				# Select mode
				if @page.scale is 1 then @show()
				# Selected
				else @selected()
			else
				# Exsit recent dock
				if @recentDock
					# Current page is recent dock
					if @page.currentPage is @recentDock then @selected()
					else 
						@page.snapToPage @recentDock, true, time: .15
						@page.content.once Events.AnimationEnd, => @selected()
				else @close()

	# Close
	close: ->
		@animate opacity: 0
		@page.animate y: 0, scale: 1

		page.default() for page, i in @page.content.children
		
		@once Events.AnimationEnd, -> 
			@sendToBack() if @opacity is 0

		@selectDock = undefined
				
	# Selected	
	selected: ->
		return if @page.isAnimating

		@page.animate y: 0, scale: 1
		@selectDock = @page.currentPage
		@selectDock.selected()

		# Exsit recent dock
		if @recentDock and @selectDock is @recentDock
			@page.once Events.AnimationEnd, =>
				@sendToBack()
				@removeDock @recentDock
				@recentDock = undefined

	# Add recent dock
	addRecentDock: (appInfo) ->
		if @recentDock then @recentDock.addContent appInfo.app
		else
			@recentDock = new Dock width: @width, height: @height, info: appInfo
			@page.addPage @recentDock
			@recentDock.onClick (event) => @selected()
				
		@page.snapToPage @recentDock, false
		@show()

	# Remove dock
	removeDock: (layer) ->
		@page.content.removeChild layer
		@page.updateContent()

		# Snap last dock
		@page.snapToPage @page.content.children[_.size(@page.content.children) - 1], false

		# Update label
		@page.label.updateContent()
		# Update indicator
		@page.indicator.updateContent()
		

# Label
class Label extends Layer
	# Consturctor
	constructor: (options = {}) ->
		options.name ?= "label"
		options.html ?= "메시지"
		options.style = 
			fontSize: "41px", fontWeight: "400"
			lineHeight: "1"
			paddingLeft: "72px"
		options.backgroundColor ?= ""
		options.parent = options.page
		super options

		@page = options.page

		Util.text.autoSize @
		@props = x: Align.center, maxY: -9.7

		# Icon
		@icon = new Layer
			name: ".icon"
			y: Align.center
			size: 58.3
			borderRadius: 30
			parent: @

		# Events
		@page.on "change:currentPage", => @updateContent()

		#
		@updateContent()
	
	# Update	
	updateContent: ->
		currentPage = @page.currentPage

		@html = currentPage.name
		Util.text.autoSize @
		@centerX()
		@icon.image = currentPage.icon

# Indicator
class Indicator extends Layer
	# Constructor
	constructor: (options = {}) ->
		options.name = "Indicator"
		options.backgroundColor = ""
		options.parent = options.page
		options.y ?= options.page.maxY + 22
		super options

		@page = options.page

		@page.on "change:currentPage", => @changeDotState()			
		@page.content.on "change:children", => @updateContent()
	
	# Update
	updateContent: ->
		child.destroy() for child in @children
		for child, i in @page.content.children
			dot = createDot()
			dot.x += @contentFrame().width + 8 unless i is 0
			@addChild dot

		@size = @contentFrame()
		@props = x: Align.center()

		@changeDotState false

	# Change dot state
	changeDotState: (animate=true) ->
		currentPage = @page.currentPage
		pageIndex = @page.horizontalPageIndex currentPage

		if animate
			for dot, i in @children
				dot.animate if i is pageIndex then "selected" else "normal"
		else 
			for dot, i in @children
				dot.stateSwitch if i is pageIndex then "selected" else "normal"

	# Create dot	
	createDot = (options={}) ->
		dot = new Layer
			name: ".indicator.dot"
			size: 13.879
			backgroundColor: "white"
			opacity: .35
			borderRadius: 10

		dot.states =
			selected: scale: 1.2, opacity: 1, options: { time: .15 }
			normal: scale: 1, opacity: .35, options: { time: .2 }
			
		return dot

# Dock apps
class Dock extends Layer
	# Constructor
	constructor: (options = {}) ->
		options.backgroundColor = "black"
		super options

		#
		@info = options.info
		@name = @info.name
		@icon = @info.icon

		# Contents
		@content = new Layer
			name: ".content"
			width: @width, height: @height
			backgroundColor: ""
			clip: true
			parent: @

		if @info.image
			@content.image = @info.image
			@content.time = new Layer
				name: ".content.time"
				y: 3
				width: @width, height: 38
				html: Util.date.timeFormatter Util.date.getTime()
				style: 
					fontSize: "32px", fontWeight: "600"
					lineHeight: "38px"
					textAlign: "right"
				opacity: 0
				backgroundColor: ""
				parent: @content

		if @info.app
			@addContent	@info.app

	# Add content
	addContent: (layer) -> 
		@content.addChild layer
		child.ignoreEvents = true for child in layer.descendants

	removeContent: (layer) ->
		@content.removeChild layer
		child.ignoreEvents = false for child in layer.descendants
		
	# Show
	show: -> 
		@animate scale: 265 / 281, borderRadius: 15, options: { time: .15 }
		@content.animate scale: 237 / 265, options: { time: .15 }

		if @info.image
			@content.time.animate opacity: 0, options: { time: .20, delay: .3 }

		@info.app.toDock() if @info.app

	# Default
	default: -> 
		@animate scale: 1, borderRadius: 0, options: { time: .25 }
		@content.animate scale: 1, options: { time: .25 }

	# Selected
	selected: ->
		@default()
		
		if @info.image
			@content.time.html = Util.date.timeFormatter Util.date.getTime()
			@content.time.animate opacity: 1, options: { time: .15, delay: .2 }

		if @info.app
			@content.once Events.AnimationEnd, =>
				@info.app.fromDock()
				@removeContent @info.app
				@destroy()