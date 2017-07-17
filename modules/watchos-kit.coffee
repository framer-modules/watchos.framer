'''
watchOS kit

@auther Jungho song (threeword.com)
@since 2016.11.23
'''

# Watch OS
WatchOSKit = {}

# Utils
WatchOSKit.Util = (require 'util')
#
_.extend(window, WatchOSKit) if window

#
WatchOSKit.Device = new (require 'watchos-kit-device').Device
#
_.extend(window, WatchOSKit) if window


WatchOSKit.ClockFaces = (require 'watchos-kit-clockfaces').ClockFaces
WatchOSKit.Complication = (require 'watchos-kit-clockfaces').Complication
WatchOSKit.Apps = (require 'watchos-kit-apps').Apps
WatchOSKit.Docks = (require 'watchos-kit-docks').Docks
WatchOSKit.Notification = (require 'watchos-kit-notification').Notification
WatchOSKit.Scroll = (require 'watchos-kit-scroll').Scroll
WatchOSKit.App = (require 'watchos-kit-app').App
WatchOSKit.WatchOS = (require 'watchos').WatchOS

#
_.extend(window, WatchOSKit) if window
window.WatchOSKit = WatchOSKit if window