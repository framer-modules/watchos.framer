# Disable hints
Framer.Extras.Hints.disable()

'''
watchOS

@auther ho.s
@since 2016.11.24
'''
class exports.WatchOS extends Framer.BaseClass
	'''
	options:
		appInfo: 
			name: "카카오증권"
			icon: "images/appicon.png"
			app: kakaostocks
		complications:
			utilitarian: [
			]
			modular: [
				new Complication().modularSmall().simpleText("카카오증권")
			]
			circular: [
			]
	'''
	# Constructor
	constructor: (options={}) ->
		super

		options.appInfo ?= {}

		@appInfo = options.appInfo
		@app = @appInfo.app

		@complications = options.complications

		# Background
		@bg = new Layer name: "Background", backgroundColor: "black"

		# Clockface (Complication)
		@clockfaces = new ClockFaces 
			width: Device.width, height: Device.height
			complications: @complications
		# Docks
		@docks = new Docks 
			width: Device.width, height: Device.height
		# Apps
		@apps = new Apps 
			width: Device.width, height: Device.height
			clockfaces: @clockfaces
			appInfo: @appInfo

		# Event : Digital Crown
		Device.onDigitalCrown =>
			currentScreen = @_getCurrentScreen()
			return unless currentScreen
			
			# Clockface
			if currentScreen is @clockfaces
				# Clockface : change mode
				if @clockfaces.isChangeMode then @clockfaces.selected()
				# Clockface : normal mode
				else @apps.show @clockfaces
			# App
			else if currentScreen is @app
				@apps.show @app
			# Apps
			else if currentScreen is @apps
				@apps.dismiss @clockfaces
			# Docks
			else if currentScreen is @docks
				@docks.dismiss true
			# Notification
			else if currentScreen is @notification
				@notification.dismiss()

		# Event : Side button
		Device.onSide =>
			currentScreen = @_getCurrentScreen()
			return unless currentScreen
				
			# Docks
			if currentScreen is @docks then @docks.dismiss()
			else
				# App
				if currentScreen is @app
					@docks.addRecentDock @appInfo
					@apps.init()
				# Not App
				else @docks.show()

	# ------------------------------------------------------------
	# Public
	# ------------------------------------------------------------

	# Notify notification
	showNotification: (options = {}) ->
		@notification.destroy() if @notification
		@notification = new Notification options

	# Set clockface
	setClockface: (index) -> @clockfaces.setClockface index

	# ------------------------------------------------------------
	# Private
	# ------------------------------------------------------------

	# Get current screen layer (first layer)
	_getCurrentScreen: ->
		return if _.isEmpty(@bg.siblings)
		layers = _.sortBy(@bg.siblings, 'index').reverse()
		return layers[0]