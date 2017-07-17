'''
watchOS : Scroll

@auther ho.s
@since 2016.11.23
'''
class exports.Scroll extends ScrollComponent

	'''
	scrollbar:
		y:
	'''
	defaultScrollbar = 
		y: 42

	# Constructor
	constructor: (options = {}) ->
		options.scrollHorizontal = false
		super options

		# Bar
		@scrollbar = new Layer
			name: "ScrollBar"
			x: Align.right(-5), y: Align.top(@_contentInset.top)
			width: 12, height: 75
			borderRadius: 10
			backgroundColor: "rgba(255,255,255,.25)"
			opacity: 0
			parent: @
		@scrollbar.states =
			show: opacity: 1, animationOptions: { time: .15 }

		# Thumb
		@scrollbar.thumb = new Layer
			name: ".thumb"
			x: Align.center, y: Align.top(1)
			width: 10, height: 36
			borderRadius: 10
			backgroundColor: "white"
			parent: @scrollbar
			
		# Event : Scroll Start - visible bar
		@onScrollStart => 
			unless @scrollbar.thumb.height is 73 
				@scrollbar.animateStop()
				@scrollbar.animate "show" 
		# Event : Scroll End - invisible bar
		@onScrollAnimationDidEnd => 
			unless @scrollbar.thumb.height is 73
				@scrollbar.animateStop()
				@scrollbar.animate "default"

		# Event : Move
		@onMove =>
			min = 0
			max = @content.height - @height + (@_contentInset.top + @_contentInset.bottom)
			
			@scrollbar.thumb.y = Utils.modulate @scrollY, [min, max], [1, 74 - @thumbHeight]
			# Anchor bottom
			if @scrollY <= min
				@scrollbar.thumb.height = Utils.clamp @thumbHeight + @scrollbar.thumb.y, 12, @thumbHeight
				@scrollbar.thumb.y = 1
			# Anchor top
			else if @scrollY >= max
				@scrollbar.thumb.height = Utils.clamp 74 - @scrollbar.thumb.y, 12, @thumbHeight
				@scrollbar.thumb.y = 74 - 12 if @scrollbar.thumb.height <= 12
			else
				@scrollbar.thumb.height = @thumbHeight

	# Update content
	updateContent: =>
		super
		
		return unless @scrollbar
		#
		@thumbHeight = Utils.clamp (@scrollbar.height * @height / @content.draggable.constraints.height), 12, 73