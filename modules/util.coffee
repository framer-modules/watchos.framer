# Utilitis
Util = {}

# Text
Util.text = {}
#
Util.text.size = (layer, padding = {}, constraints={}) ->
	style = layer.style
	text = layer.html
	sizeAffectingStyles =
		lineHeight: style["line-height"]
		fontSize: style["font-size"]
		fontWeight: style["font-weight"]
		padding: style["padding"]
		paddingTop: style["padding-top"]
		paddingRight: style["padding-right"]
		paddingBottom: style["padding-bottom"]
		paddingLeft: style["padding-left"]
		textTransform: style["text-transform"]
		borderWidth: style["border-width"]
		letterSpacing: style["letter-spacing"]
		fontFamily: style["font-family"]
		fontStyle: style["font-style"]
		fontVariant: style["font-variant"]

	return Utils.textSize text, sizeAffectingStyles, constraints

#
Util.text.autoSize = (layer, padding = {}, constraints = {}) -> layer.size = Util.text.size layer, padding, constraints
Util.text.autoFontSize = (layer, constraints = {}, align = {}) ->
	Util.text.autoSize layer

	# Alignment
	layer.x = align.x if _.has align, "x"
	layer.y = align.y if _.has align, "y"

	layer.style.paddingLeft = "0px" if _.isNaN(parseInt(layer.style.paddingLeft)) 
	layer.style.paddingRight = "0px" if _.isNaN(parseInt(layer.style.paddingRight))

	if _.has constraints, "width"
		while layer._elementHTML.offsetWidth + parseInt(layer.style.paddingLeft) + parseInt(layer.style.paddingRight) > constraints.width
			layer.style.fontSize = "#{parseInt(layer.style.fontSize) - 1}px"
			Util.text.autoSize layer

			# Alignment
			layer.x = align.x if _.has align, "x"
			layer.y = align.y if _.has align, "y"

	if _.has constraints, "height"
		while parseInt(layer._elementHTML.offsetHeight) > constraints.height
			layer.style.fontSize = "#{parseInt(layer.style.fontSize) - 1}px"
			layer.style.lineHeight = layer.style.fontSize
			Util.text.autoSize layer, {}, constraints

			# Alignment
			layer.x = align.x if _.has align, "x"
			layer.y = align.y if _.has align, "y"

# Ani
Util.ani = {}
# 
Util.ani.shake = (layer, range = 10) ->
	x = layer.x
	layer.animate properties: { x: x + range }, time: .08, curve: "spring(500,26,5)"
	Utils.delay .07, ->
		layer.animateStop()
		layer.animate properties: { x: x - range }, time: .08, curve: "spring(500,26,5)"
		Utils.delay .07, ->
			layer.animateStop()
			layer.animate properties: { x: x }, time: .2, curve: "spring(500,26,52)"

# Date
Util.date = {}
Util.date.getTime = ->
	daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	dateObj = new Date()
	month = monthsOfTheYear[dateObj.getMonth()]
	date = dateObj.getDate()
	day = daysOfTheWeek[dateObj.getDay()]
	hours = dateObj.getHours()
	mins = dateObj.getMinutes()
	secs = dateObj.getSeconds()
	return {
		month:month
		date:date
		day:day
		hours:hours
		mins:mins
		secs:secs
	}

Util.date.timeDelegate = (layer, clockType = true) ->
	@time = Util.date.getTime()
	Utils.delay 60 - @time.secs, ->
		layer.html = Util.date.timeFormatter @time = Util.date.getTime(), clockType
		Utils.interval 60, ->
			@time = Util.date.getTime()
			layer.html = Util.date.timeFormatter @time = Util.date.getTime(), clockType

Util.date.timeFormatter = (timeObj, clockType = true) ->
	if clockType == false
		if timeObj.hours > 12
			timeObj.hours = timeObj.hours - 12
		if timeObj.hours == 0 then timeObj.hours = 12
	if timeObj.mins < 10
		timeObj.mins = "0" + timeObj.mins
	return timeObj.hours + ":" + timeObj.mins


# Graphic
Util.graphic = {}

# Set blur
Util.blur = (layer, size = 20) ->
	layer.style = _.extend layer.style,
		"-webkit-backdrop-filter": "blur(#{size}px)"
		"backdrop-filter": "blur(#{size}px)"
Util.graphic.blur = (layer, size = 20) -> Util.blur layer, size

# Load image
Util.graphic.loadImage = (url, callback, context) ->
	element = new Image
	
	context ?= Framer.CurrentContext
	context.domEventManager.wrap(element).addEventListener "load", (event) -> callback(event)
	context.domEventManager.wrap(element).addEventListener "error", (event) -> callback(true)
		
	element.src = url

# Load image data url
Util.graphic.imageToDataURL = (image) ->
	w = image.width
	h = image.height
	
	canvas = document.createElement('canvas')
	canvas.width = w
	canvas.height = h
	
	canvasContext = canvas.getContext("2d")
	canvasContext.drawImage(image, 0, 0, w, h)
	
	dataURL = canvas.toDataURL("image/png")

	return width: w, height: h, image: dataURL


# svg 
Util.graphic.svg = (svg, scaleWidth, scaleHeight) ->
	# Find String
	startIndex = svg.search("<svg width=")
	endIndex = svg.search(" viewBox")
	string = svg.slice(startIndex, endIndex)

	#Find width
	wStartIndex = string.search("=") + 2
	wEndIndex =  string.search("px")
	width = string.slice(wStartIndex, wEndIndex)
	scaleWidth ?= width
	newWidth = scaleWidth

	# Find Height
	heightString = string.slice(wEndIndex + 4, string.length)
	hStartIndex = heightString.search("=")+ 2
	hEndIndex = heightString.search("px")
	height = heightString.slice(hStartIndex, hEndIndex)
	scaleHeight ?= height
	newHeight = scaleHeight

	#Create new string
	newString = string.replace(width, newWidth)
	newString = newString.replace(height, newHeight)

	#Replace strings
	svg = svg.replace(string, newString)

	return {
		svg: svg
		width: newWidth
		height: newHeight
	}

# Changes the fill and storke of an SVG
Util.graphic.changeSVGColor = (layer, fillColor, strokeColor) ->
	parser = new DOMParser()
	doc = parser.parseFromString(layer.html, "image/svg+xml")
	paths = doc.querySelectorAll('path')
	# if _.isArray(paths) && !_.isEmpty(paths)
	for path in paths
		path.setAttribute("fill", fillColor)
		path.setAttribute("stroke", strokeColor)
	layer.html = (new XMLSerializer()).serializeToString(doc)
		# doc.querySelectorAll("path").forEach (path) -> 
		# 	path.setAttribute("fill", fillColor)
		# 	path.setAttribute("stroke", strokeColor)
		# layer.html = (new XMLSerializer()).serializeToString(doc)

module.exports = Util if module?
Framer.Util = Util