'''
watchOS : App

@auther Jungho song (threeword.com)
@since 2016.11.24
'''
class exports.App extends Layer

	# Events
	Events.ToDock = "toDock"
	Events.FromDock = "fromDock"

	# Constructor
	constructor: (options = {}) ->
		options.name ?= "App"
		options.width ?= Device.width
		options.height ?= Device.height
		options.clip ?= true
		options.backgroundColor ?= "black"
		super options

		options.accentColor ?= "#aeb4bf"
		accentColor = options.accentColor

	# ------------------------------------------------------------
	# Public
	# ------------------------------------------------------------

	toDock: ->
		if @header
			@header.time.animate opacity: 0, options: { time: .20, delay: .3 }

		@emit Events.ToDock, @

	fromDock: ->
		if @header
			@header.time.animate opacity: 1, options: { time: .15, delay: .2 }

		@emit Events.FromDock, @

	# ------------------------------------------------------------
	# Private
	# ------------------------------------------------------------

	# ------------------------------------------------------------
	# Event Helper
	# ------------------------------------------------------------
	onToDock: (cb) -> @on Events.ToDock, cb
	onFromDock: (cb) -> @on Events.FromDock, cb