require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"util":[function(require,module,exports){
'Utilities\n\n@auther Jungho song (threeword.com)\n@since 2016.11.24';
var Util;

Util = {};

Util.text = {};

Util.text.size = function(layer, padding, constraints) {
  var sizeAffectingStyles, style, text;
  if (padding == null) {
    padding = {};
  }
  if (constraints == null) {
    constraints = {};
  }
  style = layer.style;
  text = layer.html;
  sizeAffectingStyles = {
    lineHeight: style["line-height"],
    fontSize: style["font-size"],
    fontWeight: style["font-weight"],
    padding: style["padding"],
    paddingTop: style["padding-top"],
    paddingRight: style["padding-right"],
    paddingBottom: style["padding-bottom"],
    paddingLeft: style["padding-left"],
    textTransform: style["text-transform"],
    borderWidth: style["border-width"],
    letterSpacing: style["letter-spacing"],
    fontFamily: style["font-family"],
    fontStyle: style["font-style"],
    fontVariant: style["font-variant"]
  };
  return Utils.textSize(text, sizeAffectingStyles, constraints);
};

Util.text.autoSize = function(layer, padding, constraints) {
  if (padding == null) {
    padding = {};
  }
  if (constraints == null) {
    constraints = {};
  }
  return layer.size = Util.text.size(layer, padding, constraints);
};

Util.text.autoFontSize = function(layer, constraints, align) {
  var results;
  if (constraints == null) {
    constraints = {};
  }
  if (align == null) {
    align = {};
  }
  Util.text.autoSize(layer);
  if (_.has(align, "x")) {
    layer.x = align.x;
  }
  if (_.has(align, "y")) {
    layer.y = align.y;
  }
  if (_.isNaN(parseInt(layer.style.paddingLeft))) {
    layer.style.paddingLeft = "0px";
  }
  if (_.isNaN(parseInt(layer.style.paddingRight))) {
    layer.style.paddingRight = "0px";
  }
  if (_.has(constraints, "width")) {
    while (layer._elementHTML.offsetWidth + parseInt(layer.style.paddingLeft) + parseInt(layer.style.paddingRight) > constraints.width) {
      layer.style.fontSize = (parseInt(layer.style.fontSize) - 1) + "px";
      Util.text.autoSize(layer);
      if (_.has(align, "x")) {
        layer.x = align.x;
      }
      if (_.has(align, "y")) {
        layer.y = align.y;
      }
    }
  }
  if (_.has(constraints, "height")) {
    results = [];
    while (parseInt(layer._elementHTML.offsetHeight) > constraints.height) {
      layer.style.fontSize = (parseInt(layer.style.fontSize) - 1) + "px";
      layer.style.lineHeight = layer.style.fontSize;
      Util.text.autoSize(layer, {}, constraints);
      if (_.has(align, "x")) {
        layer.x = align.x;
      }
      if (_.has(align, "y")) {
        results.push(layer.y = align.y);
      } else {
        results.push(void 0);
      }
    }
    return results;
  }
};

Util.ani = {};

Util.ani.shake = function(layer, range) {
  var x;
  if (range == null) {
    range = 10;
  }
  x = layer.x;
  layer.animate({
    properties: {
      x: x + range
    },
    time: .08,
    curve: "spring(500,26,5)"
  });
  return Utils.delay(.07, function() {
    layer.animateStop();
    layer.animate({
      properties: {
        x: x - range
      },
      time: .08,
      curve: "spring(500,26,5)"
    });
    return Utils.delay(.07, function() {
      layer.animateStop();
      return layer.animate({
        properties: {
          x: x
        },
        time: .2,
        curve: "spring(500,26,52)"
      });
    });
  });
};

Util.date = {};

Util.date.getTime = function() {
  var date, dateObj, day, daysOfTheWeek, hours, mins, month, monthsOfTheYear, secs;
  daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  dateObj = new Date();
  month = monthsOfTheYear[dateObj.getMonth()];
  date = dateObj.getDate();
  day = daysOfTheWeek[dateObj.getDay()];
  hours = dateObj.getHours();
  mins = dateObj.getMinutes();
  secs = dateObj.getSeconds();
  return {
    month: month,
    date: date,
    day: day,
    hours: hours,
    mins: mins,
    secs: secs
  };
};

Util.date.timeDelegate = function(layer, clockType) {
  if (clockType == null) {
    clockType = true;
  }
  this.time = Util.date.getTime();
  return Utils.delay(60 - this.time.secs, function() {
    layer.html = Util.date.timeFormatter(this.time = Util.date.getTime(), clockType);
    return Utils.interval(60, function() {
      this.time = Util.date.getTime();
      return layer.html = Util.date.timeFormatter(this.time = Util.date.getTime(), clockType);
    });
  });
};

Util.date.timeFormatter = function(timeObj, clockType) {
  if (clockType == null) {
    clockType = true;
  }
  if (clockType === false) {
    if (timeObj.hours > 12) {
      timeObj.hours = timeObj.hours - 12;
    }
    if (timeObj.hours === 0) {
      timeObj.hours = 12;
    }
  }
  if (timeObj.mins < 10) {
    timeObj.mins = "0" + timeObj.mins;
  }
  return timeObj.hours + ":" + timeObj.mins;
};

Util.graphic = {};

Util.blur = function(layer, size) {
  if (size == null) {
    size = 20;
  }
  return layer.style = _.extend(layer.style, {
    "-webkit-backdrop-filter": "blur(" + size + "px)",
    "backdrop-filter": "blur(" + size + "px)"
  });
};

Util.graphic.blur = function(layer, size) {
  if (size == null) {
    size = 20;
  }
  return Util.blur(layer, size);
};

Util.graphic.loadImage = function(url, callback, context) {
  var element;
  element = new Image;
  if (context == null) {
    context = Framer.CurrentContext;
  }
  context.domEventManager.wrap(element).addEventListener("load", function(event) {
    return callback(event);
  });
  context.domEventManager.wrap(element).addEventListener("error", function(event) {
    return callback(true);
  });
  return element.src = url;
};

Util.graphic.imageToDataURL = function(image) {
  var canvas, canvasContext, dataURL, h, w;
  w = image.width;
  h = image.height;
  canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  canvasContext = canvas.getContext("2d");
  canvasContext.drawImage(image, 0, 0, w, h);
  dataURL = canvas.toDataURL("image/png");
  return {
    width: w,
    height: h,
    image: dataURL
  };
};

Util.graphic.svg = function(svg, scaleWidth, scaleHeight) {
  var endIndex, hEndIndex, hStartIndex, height, heightString, newHeight, newString, newWidth, startIndex, string, wEndIndex, wStartIndex, width;
  startIndex = svg.search("<svg width=");
  endIndex = svg.search(" viewBox");
  string = svg.slice(startIndex, endIndex);
  wStartIndex = string.search("=") + 2;
  wEndIndex = string.search("px");
  width = string.slice(wStartIndex, wEndIndex);
  if (scaleWidth == null) {
    scaleWidth = width;
  }
  newWidth = scaleWidth;
  heightString = string.slice(wEndIndex + 4, string.length);
  hStartIndex = heightString.search("=") + 2;
  hEndIndex = heightString.search("px");
  height = heightString.slice(hStartIndex, hEndIndex);
  if (scaleHeight == null) {
    scaleHeight = height;
  }
  newHeight = scaleHeight;
  newString = string.replace(width, newWidth);
  newString = newString.replace(height, newHeight);
  svg = svg.replace(string, newString);
  return {
    svg: svg,
    width: newWidth,
    height: newHeight
  };
};

Util.graphic.changeSVGColor = function(layer, fillColor, strokeColor) {
  var doc, i, len, parser, path, paths;
  parser = new DOMParser();
  doc = parser.parseFromString(layer.html, "image/svg+xml");
  paths = doc.querySelectorAll('path');
  for (i = 0, len = paths.length; i < len; i++) {
    path = paths[i];
    path.setAttribute("fill", fillColor);
    path.setAttribute("stroke", strokeColor);
  }
  return layer.html = (new XMLSerializer()).serializeToString(doc);
};

if (typeof module !== "undefined" && module !== null) {
  module.exports = Util;
}

Framer.Util = Util;


},{}],"watchos-kit-apps":[function(require,module,exports){
'watchOS : Apps\n\n@auther Jungho song (threeword.com)\n@since 2016.11.23';
var App,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Apps = (function(superClass) {
  var appScale, appSize, clockScale, clockSize;

  extend(Apps, superClass);

  clockSize = 84;

  clockScale = 1;

  appSize = clockSize - 10;

  appScale = 1;

  function Apps(options) {
    if (options == null) {
      options = {};
    }
    if (options.name == null) {
      options.name = "Apps";
    }
    if (options.image == null) {
      options.image = "images/apps.jpg";
    }
    Apps.__super__.constructor.call(this, options);
    clockScale = clockSize / Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
    appScale = appSize / Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
    this._clockfaces = options.clockfaces;
    this._appInfo = options.appInfo;
    this._app = this._appInfo.app;
    this.aniOptionsShow = {
      time: .3,
      curve: "ease-out"
    };
    this.aniOptionsDismiss = {
      time: .25,
      curve: "ease-in"
    };
    this.clockface = new App({
      name: "clockfaces",
      point: Align.center,
      size: clockSize,
      parent: this
    });
    this.clockface.onClick((function(_this) {
      return function() {
        return _this.dismiss(_this._clockfaces);
      };
    })(this));
    if (this._app) {
      this.app = new App({
        name: "app",
        x: Align.center(90),
        y: Align.center,
        size: appSize,
        html: "APP",
        style: {
          fontSize: "20px",
          fontWeight: "600",
          lineHeight: appSize + "px",
          textAlign: "center",
          borderStyle: "dashed"
        },
        borderRadius: appSize / 2,
        borderWidth: 1,
        borderColor: "white",
        parent: this
      });
      if (this._appInfo.icon) {
        this.app.props = {
          html: "",
          borderWidth: 0,
          image: this._appInfo.icon
        };
      }
      this.app.onClick((function(_this) {
        return function() {
          return _this.dismiss(_this._app);
        };
      })(this));
    }
    this.scale = 1 / clockScale;
    this.sendToBack();
  }

  Apps.prototype.init = function() {
    return this.props = {
      visible: true,
      scale: 1,
      point: Align.center
    };
  };

  Apps.prototype.show = function(app) {
    if (this.isAnimating) {
      return;
    }
    if (app === this._clockfaces) {
      this.props = {
        scale: 1 / clockScale,
        point: Align.center
      };
      this.animate({
        scale: 1,
        options: this.aniOptionsShow
      });
      this.clockface.addContent(this._clockfaces, clockScale);
      this._clockfaces.timeStop();
      this.visible = true;
      this.bringToFront();
      this.clockface.show();
      this._clockfaces.animateStop();
      return this._clockfaces.animate({
        scale: clockScale * 2 / 3
      });
    } else if (app === this._app) {
      this.props = {
        scale: 1 / appScale,
        x: Align.center(-90 / appScale),
        y: Align.center
      };
      this.animate({
        scale: 1,
        x: Align.center,
        y: Align.center,
        options: this.aniOptionsShow
      });
      this.app.addContent(this._app, appScale);
      this.visible = true;
      this.bringToFront();
      this.app.show();
      this._app.animateStop();
      return this._app.animate({
        scale: appScale * 2 / 3
      });
    }
  };

  Apps.prototype.dismiss = function(app) {
    if (this.isAnimating) {
      return;
    }
    if (app === this._clockfaces) {
      if (this._clockfaces.isAnimating) {
        return;
      }
      this.animate({
        scale: 1 / clockScale,
        options: this.aniOptionsDismiss
      });
      this.clockface.dismiss();
      this._clockfaces.visible = true;
      this._clockfaces.animate({
        scale: clockScale,
        options: {
          time: .8
        }
      });
      return Utils.delay(.9, (function(_this) {
        return function() {
          _this.clockface.removeContent(_this._clockfaces);
          _this._clockfaces.timeStart();
          return _this.visible = false;
        };
      })(this));
    } else if (app === this._app) {
      if (this._app.isAnimating) {
        return;
      }
      if (_.isEmpty(this.app.content.children)) {
        this.app.addContent(this._app, appScale);
      }
      this.animate({
        scale: 1 / appScale,
        x: Align.center(-90 / appScale),
        y: Align.center,
        options: this.aniOptionsDismiss
      });
      this.app.dismiss();
      this._app.visible = true;
      this._app.animate({
        scale: appScale,
        options: {
          time: .8
        }
      });
      return Utils.delay(.9, (function(_this) {
        return function() {
          _this.app.removeContent(_this._app);
          return _this.visible = false;
        };
      })(this));
    }
  };

  return Apps;

})(Layer);

App = (function(superClass) {
  extend(App, superClass);

  function App(options) {
    if (options == null) {
      options = {};
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = "";
    }
    if (options.clip == null) {
      options.clip = true;
    }
    App.__super__.constructor.call(this, options);
    this.iconSize = options.size;
    this.startPoint = this.point;
    this.bg = new Layer({
      name: ".bg",
      point: Align.center,
      size: this.iconSize,
      backgroundColor: "black",
      borderRadius: 42,
      opacity: 0,
      parent: this
    });
    this.content = new Layer({
      name: "content",
      point: Align.center,
      size: 0,
      backgroundColor: "black",
      borderRadius: 42,
      clip: true,
      parent: this
    });
    this.content.on("change:size", (function(_this) {
      return function() {
        var app;
        _this.content.center();
        if (!(app = _this.content.children[0])) {
          return;
        }
        return app.props = {
          x: (_this.content.width - app.width) / 2,
          y: (_this.content.height - app.height) / 2
        };
      };
    })(this));
    this.aniOptionsShow = {
      time: .3,
      curve: "ease-out"
    };
    this.aniOptionsDismiss = {
      time: .25,
      curve: "ease-in"
    };
  }

  App.prototype.init = function() {
    this.bg.opacity = 0;
    return this.content.size = 0;
  };

  App.prototype.show = function() {
    if (this.bg.isAnimating) {
      return;
    }
    this.bg.opacity = 1;
    this.content.size = this.iconSize;
    this.bg.animate({
      opacity: 0,
      options: this.aniOptionsShow
    });
    return this.content.animate({
      width: 0,
      height: 0,
      options: this.aniOptionsShow
    });
  };

  App.prototype.dismiss = function() {
    if (this.bg.isAnimating) {
      return;
    }
    this.bg.animate({
      opacity: 1,
      options: this.aniOptionsDismiss
    });
    return this.content.animate({
      width: this.iconSize,
      height: this.iconSize,
      options: this.aniOptionsDismiss
    });
  };

  App.prototype.addContent = function(layer, scale) {
    if (layer) {
      this.content.addChild(layer);
      return layer.props = {
        point: Align.center,
        scale: scale,
        clip: true
      };
    }
  };

  App.prototype.removeContent = function(layer) {
    if (layer) {
      this.content.removeChild(layer);
      layer.props = {
        point: 0,
        scale: 1,
        clip: false
      };
      layer.bringToFront();
      return this.init();
    }
  };

  return App;

})(Layer);


},{}],"watchos-kit-app":[function(require,module,exports){
'watchOS : App\n\n@auther Jungho song (threeword.com)\n@since 2016.11.24';
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.App = (function(superClass) {
  extend(App, superClass);

  Events.ToDock = "toDock";

  Events.FromDock = "fromDock";

  function App(options) {
    var accentColor;
    if (options == null) {
      options = {};
    }
    if (options.name == null) {
      options.name = "App";
    }
    if (options.width == null) {
      options.width = Device.width;
    }
    if (options.height == null) {
      options.height = Device.height;
    }
    if (options.clip == null) {
      options.clip = true;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = "black";
    }
    App.__super__.constructor.call(this, options);
    if (options.accentColor == null) {
      options.accentColor = "#aeb4bf";
    }
    accentColor = options.accentColor;
  }

  App.prototype.toDock = function() {
    if (this.header) {
      this.header.time.animate({
        opacity: 0,
        options: {
          time: .20,
          delay: .3
        }
      });
    }
    return this.emit(Events.ToDock, this);
  };

  App.prototype.fromDock = function() {
    if (this.header) {
      this.header.time.animate({
        opacity: 1,
        options: {
          time: .15,
          delay: .2
        }
      });
    }
    return this.emit(Events.FromDock, this);
  };

  App.prototype.onToDock = function(cb) {
    return this.on(Events.ToDock, cb);
  };

  App.prototype.onFromDock = function(cb) {
    return this.on(Events.FromDock, cb);
  };

  return App;

})(Layer);


},{}],"watchos-kit-clockfaces":[function(require,module,exports){
'watchOS : ClockFaces\n\n@auther Jungho song (threeword.com)\n@since 2016.11.23';
var AnalogClock, Clock, ClockFace, DigitalClock,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

exports.ClockFaces = (function(superClass) {
  'complications:\n	utilitarian: []\n	modular: []\n	circular: []';
  extend(ClockFaces, superClass);

  function ClockFaces(options) {
    var child, complications, j, len, ref;
    if (options == null) {
      options = {};
    }
    if (options.name == null) {
      options.name = "ClockFaces";
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = "black";
    }
    ClockFaces.__super__.constructor.call(this, options);
    if (options.complications == null) {
      options.complications = {};
    }
    complications = _.defaults(options.complications, {
      utilitarian: [],
      modular: [],
      circular: []
    });
    this.page = new PageComponent({
      name: "page",
      width: this.width,
      height: this.height,
      scrollVertical: false,
      backgroundColor: "",
      clip: false,
      parent: this
    });
    this.page.content.clip = false;
    this.page.states = {
      change: {
        y: -13,
        scale: 284 / this.height
      },
      selected: {
        y: 0,
        scale: 1
      }
    };
    this.utilitarian = new ClockFace({
      width: this.width,
      height: this.height
    }).utilitarian(complications.utilitarian);
    this.modular = new ClockFace({
      width: this.width,
      height: this.height
    }).modular(complications.modular);
    this.circular = new ClockFace({
      width: this.width,
      height: this.height
    }).circular(complications.circular);
    this.page.addPage(this.utilitarian);
    this.page.addPage(this.modular);
    this.page.addPage(this.circular);
    this.page.snapToPage(this.modular, false);
    this.customize = new Layer({
      name: "customize",
      x: Align.center,
      y: this.page.maxY + 10,
      width: 157,
      height: 57,
      html: "사용자화",
      style: {
        fontSize: "32px",
        fontWeight: "400",
        lineHeight: "57px",
        textAlign: "center"
      },
      borderRadius: 15,
      backgroundColor: "#333333",
      scale: 1 / 0.7,
      originY: 0,
      parent: this.page
    });
    this.customize.sendToBack();
    this.isChangeDone = false;
    this.isChangeMode = false;
    ref = this.page.content.children;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      child.onClick((function(_this) {
        return function() {
          return _this.selected();
        };
      })(this));
    }
    this.page.onLongPressStart((function(_this) {
      return function() {
        var i, k, len1, ref1;
        if (_this.isChangeMode) {
          return;
        }
        ref1 = _this.page.content.children;
        for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
          child = ref1[i];
          child.modeChange();
        }
        return _this.page.animate("change");
      };
    })(this));
    this.page.onLongPressEnd((function(_this) {
      return function() {
        if (_this.isChangeMode) {
          return;
        }
        _this.isChangeMode = true;
        return Utils.delay(.3, function() {
          return _this.isChangeDone = true;
        });
      };
    })(this));
  }

  ClockFaces.prototype.selected = function() {
    var child, i, j, len, ref;
    if (!this.isChangeMode) {
      return;
    }
    if (!this.isChangeDone) {
      return;
    }
    ref = this.page.content.children;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      child = ref[i];
      child.modeChange(false);
    }
    this.page.animate("selected");
    this.isChangeMode = false;
    return this.isChangeDone = false;
  };

  ClockFaces.prototype.timeStart = function() {
    var j, len, page, ref, results;
    ref = this.page.content.children;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      page = ref[j];
      results.push(page.clock.start());
    }
    return results;
  };

  ClockFaces.prototype.timeStop = function() {
    var j, len, page, ref, results;
    ref = this.page.content.children;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      page = ref[j];
      results.push(page.clock.stop());
    }
    return results;
  };

  ClockFaces.prototype.setClockface = function(index) {
    if (_.isEmpty(this.page.content.children)) {
      return;
    }
    if (_.size(this.page.content.children) - 1 < index) {
      return;
    }
    return this.page.snapToPage(this.page.content.children[index]);
  };

  return ClockFaces;

})(Layer);

'Complication Images : https://developer.apple.com/watchos/human-interface-guidelines/icons-and-images/\n\nFamily:\n	modularSmall\n	modularLarge\n	utilitarianSmall\n	utilitarianSmallFlat\n	utilitarianLarge\n	circularSmall\n	extraLarge\n\nTemplate:\n	tintColor: "색상"\n	columnAlignment: "leading" or "tailing"\n\nCircular:\n	SmallSimpleText: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplatecircularsmallsimpletext)\n		textProvider: "문자열" (https://developer.apple.com/reference/clockkit/clktextprovider)\n	SmallRingImage: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplatecircularsmallringimage)\n		imageProvider: "이미지" (https://developer.apple.com/reference/clockkit/clkimageprovider)\n		ringStyle: "closed" or "open" (https://developer.apple.com/reference/clockkit/clkcomplicationringstyle)\n		fillFraction: 채우기 비율\n\nUtilitarian:\n	SmallFlat: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplateutilitariansmallflat)\n		textProvider: "문자열" (https://developer.apple.com/reference/clockkit/clktextprovider)\n		imageProvider: "이미지" (https://developer.apple.com/reference/clockkit/clkimageprovider)\n	LargeFlat: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplateutilitarianlargeflat)\n		textProvider: "문자열" (https://developer.apple.com/reference/clockkit/clktextprovider)\n		imageProvider: "이미지" (https://developer.apple.com/reference/clockkit/clkimageprovider)\n	SmallRingImage: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplateutilitariansmallringimage)\n		imageProvider: "이미지" [require] (https://developer.apple.com/reference/clockkit/clkimageprovider)\n		ringStyle: "closed" or "open" (https://developer.apple.com/reference/clockkit/clkcomplicationringstyle)\n		fillFraction: 채우기 비율\n	SmallSquare: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplateutilitariansmallsquare)\n		imageProvider: "이미지" [require] (https://developer.apple.com/reference/clockkit/clkimageprovider)\n\nModular:\n	SmallStackText: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplatemodularsmallstacktext)\n		line1TextProvider: "1라인 문자열" (https://developer.apple.com/reference/clockkit/clktextprovider)\n		line2TextProvider: "2라인 문자열" (https://developer.apple.com/reference/clockkit/clktextprovider)\n		highlightLine2: Boolean\n	SmallRingImage: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplatemodularsmallringimage)\n		imageProvider: "이미지" [require] (https://developer.apple.com/reference/clockkit/clkimageprovider)\n		ringStyle: "closed" or "open" (https://developer.apple.com/reference/clockkit/clkcomplicationringstyle)\n		fillFraction: 채우기 비율\n	LargeTallBody: (https://developer.apple.com/reference/clockkit/clkcomplicationtemplatemodularlargetallbody)\n		headerTextProvider: "헤더 문자열" (https://developer.apple.com/reference/clockkit/clktextprovider)\n		bodyTextProvider: "바디 문자열" (https://developer.apple.com/reference/clockkit/clktextprovider)\n\nExtraLarge:\n\n\ntextProvider:\n	label: 라벨명\n	tintColor: 틴트색상\n\nimageProvider:\n	onePieceImage: 첫번째 이미지\n	twoPieceImageBackground: 두번째 뒷 이미지\n	twoPieceImageForeground: 두번째 앞 이미지\n	tintColor: 틴트색상';

exports.Complication = (function(superClass) {
  var ColumnAlignment, Family, RingStyle, Template;

  extend(Complication, superClass);

  Events.ColumnAlignment = "columnAlignment";

  Events.TintColor = 'tintColor';

  Family = {};

  Family.ModularSmall = "modularSmall";

  Family.ModularLarge = "modularLarge";

  Family.UtilitarianSmall = "utilitarianSmall";

  Family.UtilitarianSmallFlat = "utilitarianSmallFlat";

  Family.UtilitarianLarge = "utilitarianLarge";

  Family.CircularSmall = "circularSmall";

  Family.ExtraLarge = "extraLarge";

  Template = {};

  Template.SimpleImage = "simpleImage";

  Template.SimpleText = "simpleText";

  Template.RingImage = "ringImage";

  Template.RingText = "ringText";

  Template.StackText = "stackText";

  Template.StackImage = "stackImage";

  Template.ColumnsText = "columnsText";

  Template.Columns = "columns";

  Template.StandardBody = "standardBody";

  Template.Table = "table";

  Template.TallBody = "tallBody";

  Template.Flat = "flat";

  Template.Square = "square";

  RingStyle = {};

  RingStyle.Closed = "closed";

  RingStyle.Open = "open";

  ColumnAlignment = {};

  ColumnAlignment.Leading = "leading";

  ColumnAlignment.Trailing = "trailing";

  Complication.Family = Family;

  Complication.Template = Template;

  Complication.RingStyle = RingStyle;

  Complication.ColumnAlignment = ColumnAlignment;

  Complication.define('columnAlignment', {
    get: function() {
      return this._columnAlignment;
    },
    set: function(value) {
      return this.emit("change:" + Events.ColumnAlignment, this._columnAlignment = value);
    }
  });

  Complication.define('tintColor', {
    get: function() {
      return this._tintColor;
    },
    set: function(value) {
      return this.emit("change:" + Events.TintColor, this._tintColor = value);
    }
  });

  function Complication(options) {
    if (options == null) {
      options = {};
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = "";
    }
    Complication.__super__.constructor.call(this, options);
    if (options.family == null) {
      options.family = Family.ModularSmall;
    }
    if (options.template == null) {
      options.template = Template.SimpleText;
    }
    this.family = options.family;
    this.template = options.template;
  }

  Complication.prototype.modularSmall = function() {
    this.family = Family.ModularSmall;
    this.size = 100;
    this.tintColor = "white";
    return this;
  };

  Complication.prototype.modularLarge = function() {
    this.family = Family.ModularLarge;
    this.props = {
      width: 312,
      height: 126
    };
    this.tintColor = "white";
    return this;
  };

  Complication.prototype.utilitarianSmall = function() {
    this.family = Family.UtilitarianSmall;
    this.size = 51;
    this.tintColor = "white";
    return this;
  };

  Complication.prototype.utilitarianSmallFlat = function(options) {
    var image, imageProvider, text, textProvider;
    if (options == null) {
      options = {};
    }
    this.family = Family.UtilitarianSmallFlat;
    this.props = {
      width: 120,
      height: 36
    };
    this.tintColor = "white";
    if (options.imageProvider == null) {
      options.imageProvider = {};
    }
    if (options.textProvider == null) {
      options.textProvider = {};
    }
    imageProvider = _.defaults(options.imageProvider, {
      twoPieceImageBackground: "",
      twoPieceImageForeground: "",
      tintColor: "white"
    });
    textProvider = _.defaults(options.textProvider, {
      tintColor: "white"
    });
    image = new Layer({
      x: Align.left,
      y: Align.center,
      size: 20,
      image: imageProvider.onePieceImage,
      backgroundColor: "",
      parent: this
    });
    text = new Layer({
      html: textProvider.label,
      style: {
        fontSize: "28px",
        fontWeight: "400",
        lineHeight: this.height + "px",
        letterSpacing: "-0.2px",
        textAlign: "left"
      },
      color: textProvider.tintColor,
      backgroundColor: "",
      parent: this
    });
    Util.text.autoFontSize(text, {
      height: this.height
    }, {
      x: image.maxX + 3,
      y: Align.center
    });
    if (this.contentFrame().width > this.width) {
      Util.text.autoFontSize(text, {
        width: this.width - image.width,
        height: this.height
      }, {
        x: image.maxX + 3,
        y: Align.center
      });
    }
    this.on("change:" + Events.ColumnAlignment, function() {
      if (this.columnAlignment === ColumnAlignment.Leading) {
        image.props = {
          x: Align.left,
          midY: text.midY
        };
        return text.x = image.maxX + 3;
      } else if (this.columnAlignment === ColumnAlignment.Trailing) {
        image.props = {
          x: Align.right,
          midY: text.midY
        };
        return text.x = image.x - text.width - 3;
      }
    });
    return this;
  };

  Complication.prototype.utilitarianLarge = function(options) {
    var image, imageProvider, text, textProvider;
    if (options == null) {
      options = {};
    }
    this.family = Family.UtilitarianLarge;
    this.props = {
      width: 312,
      height: 36
    };
    this.tintColor = "white";
    if (options.imageProvider == null) {
      options.imageProvider = {};
    }
    if (options.textProvider == null) {
      options.textProvider = {};
    }
    imageProvider = _.defaults(options.imageProvider, {
      twoPieceImageBackground: "",
      twoPieceImageForeground: "",
      tintColor: "white"
    });
    textProvider = _.defaults(options.textProvider, {
      tintColor: "white"
    });
    image = new Layer({
      x: Align.left,
      y: Align.bottom,
      size: 20,
      image: imageProvider.onePieceImage,
      backgroundColor: "",
      parent: this
    });
    text = new Layer({
      html: textProvider.label,
      style: {
        fontSize: "28px",
        fontWeight: "400",
        lineHeight: "1",
        letterSpacing: "-0.2px",
        textAlign: "left"
      },
      color: textProvider.tintColor,
      backgroundColor: "",
      parent: this
    });
    Util.text.autoFontSize(text, {
      height: this.height
    }, {
      x: image.maxX + 3,
      y: Align.bottom
    });
    if (this.contentFrame().width > this.width) {
      Util.text.autoFontSize(text, {
        width: this.width - image.width,
        height: this.height
      }, {
        x: image.maxX + 3,
        y: Align.bottom
      });
    }
    image.props = {
      x: this.midX - this.contentFrame().width / 2,
      midY: text.midY
    };
    text.x = image.maxX + 3;
    return this;
  };

  Complication.prototype.circularSmall = function() {
    this.family = Family.CircularSmall;
    this.size = 68;
    this.scale = 51 / 68;
    this.tintColor = "#b3b3b3";
    return this;
  };

  Complication.prototype.extraLarge = function() {
    this.family = Family.ExtraLarge;
    this.tintColor = "white";
    return this;
  };

  Complication.prototype.simpleText = function(options) {
    var height, text, textProvider;
    if (options == null) {
      options = {};
    }
    this.template = Template.SimpleText;
    if (options.textProvider == null) {
      options.textProvider = {};
    }
    textProvider = _.defaults(options.textProvider, {
      tintColor: this.tintColor
    });
    height = this.height;
    text = new Layer({
      html: textProvider.label,
      style: {
        fontSize: "67px",
        fontWeight: "400",
        lineHeight: height + "px",
        letterSpacing: "-0.5px",
        textAlign: "center"
      },
      color: textProvider.tintColor,
      backgroundColor: "",
      parent: this
    });
    Util.text.autoFontSize(text, {
      width: this.width,
      height: height
    }, {
      x: Align.center,
      y: Align.center
    });
    return this;
  };

  Complication.prototype.stackText = function(options) {
    var highlightLine2, line1Text, line1TextHeight, line1TextProvider, line2Text, line2TextHeight, line2TextProvider;
    if (options == null) {
      options = {};
    }
    this.template = Template.StackText;
    if (options.line1TextProvider == null) {
      options.line1TextProvider = {};
    }
    if (options.line2TextProvider == null) {
      options.line2TextProvider = {};
    }
    if (options.highlightLine2 == null) {
      options.highlightLine2 = false;
    }
    line1TextProvider = _.defaults(options.line1TextProvider, {
      tintColor: this.tintColor
    });
    line2TextProvider = _.defaults(options.line2TextProvider, {
      tintColor: this.tintColor
    });
    highlightLine2 = options.highlightLine2;
    line1TextHeight = 30;
    line1Text = new Layer({
      html: line1TextProvider.label,
      style: {
        fontSize: "67px",
        fontWeight: "500",
        lineHeight: "1",
        letterSpacing: "-0.4px",
        padding: "0px 8px",
        textAlign: "center"
      },
      color: line1TextProvider.tintColor,
      backgroundColor: "",
      parent: this
    });
    Util.text.autoFontSize(line1Text, {
      width: this.width,
      height: line1TextHeight
    }, {
      x: Align.center,
      y: Align.bottom(-55)
    });
    line2TextHeight = 35;
    line2Text = new Layer({
      html: line2TextProvider.label,
      style: {
        fontSize: "67px",
        fontWeight: "500",
        lineHeight: "1",
        letterSpacing: "-0.4px",
        padding: "0px 3.5px",
        textAlign: "center"
      },
      color: line2TextProvider.tintColor,
      backgroundColor: "",
      parent: this
    });
    Util.text.autoFontSize(line2Text, {
      width: this.width,
      height: line2TextHeight
    }, {
      x: Align.center,
      y: Align.bottom(-18)
    });
    return this;
  };

  Complication.prototype.simpleImage = function(options) {
    var image, imageProvider, size;
    if (options == null) {
      options = {};
    }
    this.template = Template.SimpleImage;
    if (options.imageProvider == null) {
      options.imageProvider = {};
    }
    imageProvider = _.defaults(options.imageProvider, {
      twoPieceImageBackground: "",
      twoPieceImageForeground: "",
      tintColor: this.tintColor
    });
    size = 100;
    switch (this.family) {
      case Family.ModularSmall:
        size = 58 * 1.6;
        break;
      case Family.UtilitarianSmall:
        size = 44;
        break;
      case Family.CircularSmall:
        size = 36 * (1 / this.scale);
    }
    image = new Layer({
      point: Align.center,
      size: size,
      image: imageProvider.onePieceImage,
      backgroundColor: "",
      parent: this
    });
    if (this.family === Family.CircularSmall) {
      image.brightness = 0;
      image.contrast = 50;
      image.invert = 100;
    }
    return this;
  };

  Complication.prototype.square = function(options) {
    if (options == null) {
      options = {};
    }
    this.simpleImage(options);
    this.template = Template.Square;
    return this;
  };

  Complication.prototype.ringImage = function(options) {
    var fillFraction, image, imageProvider, imageSize, ring, ringColor, ringSize, ringStyle, ringWidth;
    if (options == null) {
      options = {};
    }
    this.template = Template.RingImage;
    if (options.imageProvider == null) {
      options.imageProvider = {};
    }
    if (options.fillFraction == null) {
      options.fillFraction = 0;
    }
    if (options.ringStyle == null) {
      options.ringStyle = RingStyle.Closed;
    }
    imageProvider = _.defaults(options.imageProvider, {
      twoPieceImageBackground: "",
      twoPieceImageForeground: "",
      tintColor: this.tintColor
    });
    fillFraction = options.fillFraction;
    ringStyle = options.ringStyle;
    imageSize = 38;
    ringSize = 58;
    ringWidth = 5;
    switch (this.family) {
      case Family.ModularSmall:
        imageSize = 38;
        ringSize = 58;
        ringWidth = 5;
        break;
      case Family.UtilitarianSmall:
        imageSize = 28;
        ringSize = 47;
        ringWidth = 4;
        break;
      case Family.CircularSmall:
        imageSize = 44;
        ringSize = 64;
        ringWidth = 6;
        break;
      case Family.ExtraLarge:
        imageSize = 133;
    }
    image = new Layer({
      point: Align.center,
      size: imageSize,
      image: imageProvider.onePieceImage,
      backgroundColor: "",
      parent: this
    });
    if (this.family === Family.CircularSmall) {
      image.brightness = 0;
      image.contrast = 50;
      image.invert = 100;
    }
    ring = new CircularProgressComponent({
      point: Align.center,
      size: ringSize,
      parent: this
    });
    ringColor = new Color(imageProvider.tintColor);
    ring.strokeWidth = ringWidth;
    ring.progressColor = ringColor;
    ring.railsColor = ringColor.alpha(.3);
    ring.setProgress(fillFraction, false);
    return this;
  };

  Complication.prototype.tallBody = function(options) {
    var bodyText, bodyTextHeight, bodyTextProvider, headerText, headerTextHeight, headerTextProvider;
    if (options == null) {
      options = {};
    }
    this.template = Template.TallBody;
    if (options.headerTextProvider == null) {
      options.headerTextProvider = {};
    }
    if (options.bodyTextProvider == null) {
      options.bodyTextProvider = {};
    }
    headerTextProvider = _.defaults(options.headerTextProvider, {
      tintColor: this.tintColor
    });
    bodyTextProvider = _.defaults(options.bodyTextProvider, {
      tintColor: this.tintColor
    });
    headerTextHeight = 46;
    headerText = new Layer({
      html: headerTextProvider.label,
      style: {
        fontSize: "33px",
        fontWeight: "400",
        lineHeight: headerTextHeight + "px",
        letterSpacing: "0.1px",
        padding: "0px 12px",
        textAlign: "left"
      },
      color: headerTextProvider.tintColor,
      backgroundColor: "",
      parent: this
    });
    Util.text.autoFontSize(headerText, {
      width: this.width,
      height: headerTextHeight
    }, {
      x: Align.left,
      y: Align.top
    });
    bodyTextHeight = 80;
    bodyText = new Layer({
      html: bodyTextProvider.label,
      style: {
        fontSize: "80px",
        fontWeight: "400",
        lineHeight: bodyTextHeight + "px",
        letterSpacing: "-0.5px",
        padding: "0px 12px",
        textAlign: "left"
      },
      color: bodyTextProvider.tintColor,
      backgroundColor: "",
      parent: this
    });
    Util.text.autoFontSize(bodyText, {
      width: this.width,
      height: bodyTextHeight
    }, {
      x: Align.left,
      y: headerText.maxY
    });
    return this;
  };

  Complication.prototype.smallFlat = function(options) {
    var image, imageProvider, text, textProvider;
    if (options == null) {
      options = {};
    }
    this.Template = Template.Flat;
    this.props = {
      width: 120,
      height: 36,
      scale: 1
    };
    if (options.imageProvider == null) {
      options.imageProvider = {};
    }
    if (options.textProvider == null) {
      options.textProvider = {};
    }
    imageProvider = _.defaults(options.imageProvider, {
      twoPieceImageBackground: "",
      twoPieceImageForeground: "",
      tintColor: this.tintColor
    });
    textProvider = _.defaults(options.textProvider, {
      tintColor: this.tintColor
    });
    image = new Layer({
      x: Align.left,
      y: Align.center,
      size: 20,
      image: imageProvider.onePieceImage,
      brightness: 0,
      contrast: 50,
      invert: 100,
      backgroundColor: "",
      parent: this
    });
    text = new Layer({
      html: textProvider.label,
      style: {
        fontSize: "28px",
        fontWeight: "500",
        lineHeight: this.height + "px",
        letterSpacing: "-0.2px",
        textAlign: "left"
      },
      color: textProvider.tintColor,
      backgroundColor: "",
      parent: this
    });
    Util.text.autoFontSize(text, {
      height: this.height
    }, {
      x: image.maxX + 3,
      y: Align.center
    });
    if (this.contentFrame().width > this.width) {
      Util.text.autoFontSize(text, {
        width: this.width - image.width,
        height: this.height
      }, {
        x: image.maxX + 3,
        y: Align.center
      });
    }
    this.on("change:" + Events.ColumnAlignment, function() {
      if (this.columnAlignment === ColumnAlignment.Leading) {
        image.x = Align.left;
        return text.x = image.maxX + 3;
      } else if (this.columnAlignment === ColumnAlignment.Trailing) {
        image.x = Align.right;
        return text.x = image.x - text.width - 3;
      }
    });
    return this;
  };

  Complication.prototype.dummy = function(imageUrl) {
    if (imageUrl == null) {
      imageUrl = "";
    }
    this.template = Template;
    this.image = imageUrl;
    return this;
  };

  return Complication;

})(Layer);

ClockFace = (function(superClass) {
  extend(ClockFace, superClass);

  function ClockFace(options) {
    if (options == null) {
      options = {};
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = "rgba(255,255,255,.2)";
    }
    ClockFace.__super__.constructor.call(this, options);
    this.bg = new Layer({
      name: ".bg",
      width: this.width,
      height: this.height,
      backgroundColor: "black",
      borderRadius: 12,
      parent: this
    });
    this.bg.frame = Utils.frameInset(this.bg, 10);
    this.complication = new Layer({
      name: ".complication",
      width: this.width,
      height: this.height,
      backgroundColor: "black",
      parent: this
    });
    this.label = new Layer({
      name: ".label",
      html: this.name,
      style: {
        fontSize: (24 * 1 / 0.7 * 284 / 272) + "px",
        fontWeight: "400",
        lineHeight: "1",
        textAlign: "center"
      },
      backgroundColor: "",
      parent: this
    });
    this.label.on("change:html", function() {
      Util.text.autoSize(this);
      return this.props = {
        x: Align.center(-7),
        maxY: -13
      };
    });
  }

  ClockFace.prototype.modeChange = function(type) {
    if (type == null) {
      type = true;
    }
    if (type) {
      this.props = {
        borderRadius: 15,
        scale: 273 / 285
      };
      return this.complication.props = {
        borderRadius: 12,
        scale: 239 / 273
      };
    } else {
      this.props = {
        borderRadius: 0,
        scale: 1
      };
      return this.complication.props = {
        borderRadius: 0,
        scale: 1
      };
    }
  };

  ClockFace.prototype.circular = function(complications) {
    var complication, i, j, len;
    if (complications == null) {
      complications = [];
    }
    this.label.html = this.name = "심플";
    this.clock = new AnalogClock({
      width: this.width,
      height: this.height,
      parent: this.complication
    });
    for (i = j = 0, len = complications.length; j < len; i = ++j) {
      complication = complications[i];
      if (complication) {
        this.complication.addChild(complication);
        switch (i) {
          case 0:
            complication.props = {
              x: Align.left,
              y: Align.top,
              originX: 0,
              originY: 0
            };
            complication.columnAlignment = exports.Complication.ColumnAlignment.Leading;
            break;
          case 1:
            complication.props = {
              x: Align.right,
              y: Align.top,
              originX: 1,
              originY: 0
            };
            complication.columnAlignment = exports.Complication.ColumnAlignment.Trailing;
            break;
          case 2:
            complication.props = {
              x: Align.left,
              y: Align.bottom,
              originX: 0,
              originY: 1
            };
            complication.columnAlignment = exports.Complication.ColumnAlignment.Leading;
            break;
          case 3:
            complication.props = {
              x: Align.right,
              y: Align.bottom,
              originX: 1,
              originY: 1
            };
            complication.columnAlignment = exports.Complication.ColumnAlignment.Trailing;
        }
      }
    }
    return this;
  };

  ClockFace.prototype.utilitarian = function(complications) {
    var complication, i, j, len;
    if (complications == null) {
      complications = [];
    }
    this.label.html = this.name = "유틸리티";
    this.clock = new AnalogClock({
      width: this.width,
      height: this.height,
      parent: this.complication
    });
    for (i = j = 0, len = complications.length; j < len; i = ++j) {
      complication = complications[i];
      if (complication) {
        this.complication.addChild(complication);
        switch (i) {
          case 0:
            complication.props = {
              x: Align.left,
              y: Align.top
            };
            complication.columnAlignment = exports.Complication.ColumnAlignment.Leading;
            break;
          case 1:
            complication.props = {
              x: Align.right,
              y: Align.top
            };
            complication.columnAlignment = exports.Complication.ColumnAlignment.Trailing;
            break;
          case 2:
            complication.props = {
              x: Align.center,
              y: Align.bottom
            };
        }
      }
    }
    return this;
  };

  ClockFace.prototype.modular = function(complications) {
    var complication, i, j, len;
    if (complications == null) {
      complications = [];
    }
    this.label.html = this.name = "모듈";
    this.clock = new DigitalClock({
      width: this.width,
      height: this.height,
      parent: this.complication
    });
    for (i = j = 0, len = complications.length; j < len; i = ++j) {
      complication = complications[i];
      if (complication) {
        this.complication.addChild(complication);
        switch (i) {
          case 0:
            complication.props = {
              x: Align.left,
              y: Align.top(38)
            };
            break;
          case 1:
            complication.props = {
              x: Align.left,
              y: Align.bottom
            };
            break;
          case 2:
            complication.props = {
              x: Align.center,
              y: Align.bottom
            };
            break;
          case 3:
            complication.props = {
              x: Align.right,
              y: Align.bottom
            };
            break;
          case 4:
            complication.props = {
              x: Align.center,
              y: Align.center(19)
            };
        }
      }
    }
    return this;
  };

  return ClockFace;

})(Layer);

Clock = (function(superClass) {
  extend(Clock, superClass);

  function Clock(options) {
    if (options == null) {
      options = {};
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = "";
    }
    Clock.__super__.constructor.call(this, options);
  }

  Clock.prototype.start = function(timer) {
    return this.timer = timer;
  };

  Clock.prototype.stop = function() {
    if (this.timer) {
      return clearInterval(this.timer);
    }
  };

  return Clock;

})(Layer);

DigitalClock = (function(superClass) {
  extend(DigitalClock, superClass);

  function DigitalClock(options) {
    if (options == null) {
      options = {};
    }
    options.name = "DigitalClock";
    options.html = Util.date.timeFormatter(Util.date.getTime());
    options.style = {
      fontSize: "85px",
      fontWeight: "300",
      lineHeight: "1",
      textAlign: "right",
      letterSpacing: "-3px"
    };
    DigitalClock.__super__.constructor.call(this, options);
    Util.text.autoSize(this);
    this.props = {
      x: Align.right(-12),
      y: Align.top(43)
    };
    this.start();
  }

  DigitalClock.prototype.start = function() {
    DigitalClock.__super__.start.apply(this, arguments);
    this.time = Util.date.getTime();
    this.html = Util.date.timeFormatter(this.time = Util.date.getTime());
    return Utils.delay(60 - this.time.secs, (function(_this) {
      return function() {
        _this.html = Util.date.timeFormatter(_this.time = Util.date.getTime());
        _this.timer = Utils.interval(60, function() {
          return _this.html = Util.date.timeFormatter(_this.time = Util.date.getTime());
        });
        return DigitalClock.__super__.start.call(_this, _this.timer);
      };
    })(this));
  };

  return DigitalClock;

})(Clock);

AnalogClock = (function(superClass) {
  extend(AnalogClock, superClass);

  function AnalogClock(options) {
    var a, animationEnd, hourBar, i, j, minBar, r, secAngle, secBar;
    if (options == null) {
      options = {};
    }
    this.update = bind(this.update, this);
    AnalogClock.__super__.constructor.call(this, options);
    this.borderRadius = this.width / 2;
    this.edge = new Layer({
      name: ".edge",
      point: Align.center,
      size: this.width,
      backgroundColor: "",
      parent: this
    });
    secAngle = 360 / 60;
    for (i = j = 1; j <= 60; i = ++j) {
      if (modulo(i, 5) === 0) {
        hourBar = new Layer({
          name: ".edge.hour",
          html: i / 5,
          style: {
            fontSize: "40px",
            fontWeight: "400",
            lineHeight: "1",
            textAlign: "center"
          },
          color: "white",
          backgroundColor: "",
          parent: this.edge
        });
        Util.text.autoSize(hourBar);
        a = (-90 + (secAngle * i)) * (Math.PI / 180);
        r = this.edge.width / 2 - hourBar.height + 3;
        hourBar.props = {
          x: this.edge.width / 2 - hourBar.width / 2 + Math.cos(a) * r,
          y: this.edge.height / 2 - hourBar.height / 2 + Math.sin(a) * r
        };
      }
      if (modulo(i, 5) === 0) {
        minBar = new Layer({
          name: ".edge.min",
          html: i < 10 ? "0" + i : i,
          style: {
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "1",
            textAlign: "center",
            letterSpacing: "-1px"
          },
          color: "white",
          backgroundColor: "",
          parent: this.edge
        });
        Util.text.autoSize(minBar);
        a = (-90 + (secAngle * i)) * (Math.PI / 180);
        r = this.edge.width / 2 - minBar.height + 9;
        if (i === 15 || i === 45) {
          r -= 2;
        }
        minBar.props = {
          x: this.edge.width / 2 - minBar.width / 2 + Math.cos(a) * r,
          y: this.edge.height / 2 - minBar.height / 2 + Math.sin(a) * r
        };
      } else {
        secBar = new Layer({
          name: ".sec",
          x: Align.center,
          y: Align.bottom(-this.edge.width / 2 + 8),
          width: 2,
          height: 8,
          backgroundColor: "rgba(255,255,255,.5)",
          parent: new Layer({
            name: ".edge.sec.parent",
            point: Align.center,
            size: 1,
            originX: .5,
            originY: 1,
            rotation: secAngle * i,
            backgroundColor: "",
            parent: this.edge
          })
        });
      }
    }
    this.min = new Layer({
      name: ".min",
      point: Align.center,
      size: 12,
      borderRadius: 7,
      backgroundColor: "white",
      parent: this
    });
    this.min.bottom = new Layer({
      name: ".min.bottom",
      x: Align.center,
      y: Align.bottom(-this.min.width / 2 + 2),
      width: 4,
      height: 20 + 2,
      borderRadius: 2,
      backgroundColor: "white",
      parent: this.min
    });
    this.min.top = new Layer({
      name: ".min.top",
      x: Align.center,
      maxY: this.min.bottom.minY + 5,
      width: 10,
      height: this.width / 2 - 10 - 20 + 5,
      borderRadius: 5,
      backgroundColor: "white",
      parent: this.min
    });
    this.hour = this.min.copy();
    this.hour.parent = this;
    this.hour.children[1].height -= 50;
    this.hour.children[1].maxY = this.hour.children[0].minY + 5;
    this.min.sendToBack();
    this.hour.sendToBack();
    this.sec = new Layer({
      name: ".sec",
      point: Align.center,
      size: 8,
      borderRadius: 7,
      backgroundColor: "orange",
      parent: this
    });
    this.sec.bar = new Layer({
      name: ".sec.bar",
      x: Align.center,
      y: Align.bottom(18),
      width: 2,
      height: this.width / 2 + 22,
      backgroundColor: this.sec.backgroundColor,
      parent: this.sec
    });
    this.sec.dot = new Layer({
      name: ".sec.dot",
      point: Align.center,
      size: 2,
      borderRadius: 2,
      backgroundColor: "black",
      parent: this.sec
    });
    animationEnd = function() {
      if (this.rotation === 360) {
        return this.rotation = 0;
      }
    };
    this.sec.onAnimationEnd(animationEnd);
    this.min.onAnimationEnd(animationEnd);
    this.hour.onAnimationEnd(animationEnd);
    this.start();
  }

  AnalogClock.prototype.update = function(animate) {
    var hourAngle, minAngle, secAngle, time;
    if (animate == null) {
      animate = true;
    }
    time = Util.date.getTime();
    if (time.secs === 0) {
      time.secs = 60;
    }
    if (time.mins === 0) {
      time.mins = 60;
    }
    if (time.hours > 12) {
      time.hours = time.hours - 12;
    }
    if (time.hours === 0) {
      time.hours = 12;
    }
    secAngle = (360 / 60) * time.secs;
    minAngle = (360 / 60) * time.mins;
    if (time.secs !== 60) {
      minAngle += (360 / 60 / 60) * time.secs;
    }
    hourAngle = (360 / 12) * time.hours;
    if (time.mins !== 60) {
      hourAngle += (360 / 12 / 60) * time.mins;
    }
    this.sec.animateStop();
    this.min.animateStop();
    this.hour.animateStop();
    if (animate) {
      this.sec.animate({
        rotation: secAngle,
        options: {
          time: .98,
          curve: "linear"
        }
      });
      this.min.animate({
        rotation: minAngle,
        options: {
          curve: "linear"
        }
      });
      return this.hour.animate({
        rotation: hourAngle,
        options: {
          curve: "linear"
        }
      });
    } else {
      this.sec.rotation = secAngle;
      this.min.rotation = minAngle;
      return this.hour.rotation = hourAngle;
    }
  };

  AnalogClock.prototype.start = function() {
    this.update(false);
    this.timer = Utils.interval(1, this.update);
    return AnalogClock.__super__.start.call(this, this.timer);
  };

  return AnalogClock;

})(Clock);


},{}],"watchos-kit-device":[function(require,module,exports){
'watchOS : Device\n\n@auther Jungho song (threeword.com)\n@since 2016.11.23';
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Device = (function(superClass) {
  var HapticType, createGuide;

  extend(Device, superClass);

  Events.DigitalCrown = 'digitalCrown';

  Events.Side = 'side';

  HapticType = {
    Notification: "haptics-notification",
    DirectionUp: "haptics-directionUp",
    DirectionDown: "haptics-directionDown",
    Success: "haptics-success",
    Failure: "haptics-failure",
    Retry: "haptics-retry",
    Start: "haptics-start",
    Stop: "haptics-stop",
    Click: "haptics-click"
  };

  Device.define("HapticType", Device.simpleProperty("HapticType", HapticType));

  Device.define("width", Device.simpleProperty("width", 312));

  Device.define("height", Device.simpleProperty("height", 390));

  Device.define("ratio", Device.simpleProperty("ratio", void 0));

  function Device(options) {
    var x, y;
    if (options == null) {
      options = {};
    }
    this.onSide = bind(this.onSide, this);
    this.onDigitalCrown = bind(this.onDigitalCrown, this);
    Device.__super__.constructor.call(this, options);
    this.ratio = Screen.width / this.width;
    Framer.Device.contentScale = this.ratio;
    if (Framer.Device.deviceType.indexOf("watch") !== -1) {
      x;
      y;
      if (Framer.Device.deviceType.indexOf("38mm") !== -1) {
        x = -5;
        y = 88;
      } else if (Framer.Device.deviceType.indexOf("42mm") !== -1) {
        x = 5;
        y = 100;
      }
      this.digitalCrown = new Layer({
        name: "DigitalCrown",
        x: Align.right(x),
        y: Align.center(-y),
        width: 50,
        height: 100,
        backgroundColor: "rgba(255,0,0,0)",
        parent: Framer.Device.phone
      });
      this.side = new Layer({
        name: "Side",
        x: Align.right(x - 13),
        y: Align.center(y - 20),
        width: 32,
        height: 150,
        backgroundColor: "rgba(255,0,0,0)",
        parent: Framer.Device.phone
      });
      if (Utils.isDesktop() && !Utils.isLocalUrl(document.URL)) {
        this.digitalCrown.guide = createGuide({
          html: "Digital Crown",
          parent: this.digitalCrown
        });
        this.side.guide = createGuide({
          html: "Side Button",
          parent: this.side
        });
      }
      this.digitalCrown.onClick(function() {
        return this.emit(Events.DigitalCrown, this);
      });
      this.side.onClick(function() {
        return this.emit(Events.Side, this);
      });
    }
  }

  createGuide = function(options) {
    var arrow, guide;
    if (options == null) {
      options = {};
    }
    guide = new Layer(_.extend(options, {
      name: ".guide",
      style: {
        fontWeight: "400",
        fontSize: "25px",
        textTransform: "uppercase",
        letterSpacing: "-1.5px",
        paddingLeft: "30px"
      },
      color: "gray",
      backgroundColor: ""
    }));
    Util.text.autoSize(guide);
    guide.props = {
      x: guide.parent.width + 10,
      y: Align.center
    };
    arrow = new Layer({
      name: ".arrow",
      y: Align.center,
      size: 16,
      rotation: 45,
      style: {
        borderStyle: "hidden hidden solid solid"
      },
      borderColor: "gray",
      borderWidth: 3,
      backgroundColor: "",
      parent: guide
    });
    arrow.line = new Layer({
      point: Align.center(1.5),
      width: 21,
      height: 3,
      rotation: -45,
      backgroundColor: "gray",
      parent: arrow
    });
    return guide;
  };

  Device.prototype.playHaptic = function(type) {
    var repeat;
    if (type == null) {
      type = HapticType.Success;
    }
    repeat = 0;
    switch (type) {
      case HapticType.Success:
        repeat = 2;
    }
    Framer.Device.phone.rotation = .5;
    Framer.Device.phone.animate({
      rotation: 0,
      options: {
        time: .1,
        repeat: repeat,
        curve: "spring(1000,20,0)"
      }
    });
    return this.playAudio(type);
  };

  Device.prototype.playAudio = function(type) {
    var base;
    if (!this.audioLayer) {
      this.audioLayer = new Layer({
        size: 0,
        visible: false
      });
      this.player = document.createElement("audio");
      this.player.setAttribute("webkit-playsinline", "true");
      this.player.setAttribute("preload", "auto");
      if ((base = this.player).volume == null) {
        base.volume = 0.75;
      }
      this.audioLayer._element.appendChild(this.player);
    }
    this.player.src = "audio/" + type + ".mp3";
    return this.player.play();
  };

  Device.prototype.onDigitalCrown = function(cb) {
    return this.digitalCrown.on(Events.DigitalCrown, cb);
  };

  Device.prototype.onSide = function(cb) {
    return this.side.on(Events.Side, cb);
  };

  return Device;

})(Framer.BaseClass);


},{}],"watchos-kit-docks":[function(require,module,exports){
'watchOS : Docks\n\n@auther Jungho song (threeword.com)\n@since 2016.11.23';
var Dock, Indicator, Label,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Docks = (function(superClass) {
  var appsInfo;

  extend(Docks, superClass);

  appsInfo = [
    {
      name: "메시지",
      icon: "images/ic_messages.png",
      image: "images/messages.png"
    }, {
      name: "캘린더",
      icon: "images/ic_calendar.png",
      image: "images/calendar.png"
    }, {
      name: "타이머",
      icon: "images/ic_stopwatch.png",
      image: "images/stopwatch.png"
    }, {
      name: "지도",
      icon: "images/ic_maps.png",
      image: "images/maps.png"
    }, {
      name: "운동",
      icon: "images/ic_workout.png",
      image: "images/workout.png"
    }, {
      name: "날씨",
      icon: "images/ic_weather.png",
      image: "images/weather.png"
    }, {
      name: "음악",
      icon: "images/ic_music.png",
      image: "images/music.png"
    }
  ];

  function Docks(options) {
    var appInfo, dock, j, len;
    if (options == null) {
      options = {};
    }
    options.name = "Docks";
    options.backgroundColor = "rgba(255,255,255,.2)";
    options.opacity = 0;
    Docks.__super__.constructor.call(this, options);
    Util.blur(this);
    this.onClick(function() {
      return console.log("block");
    });
    this.sendToBack();
    this.page = new PageComponent({
      name: "page",
      width: this.width,
      height: this.height,
      scrollVertical: false,
      clip: false,
      parent: this
    });
    this.page.indicator = new Indicator({
      page: this.page
    });
    for (j = 0, len = appsInfo.length; j < len; j++) {
      appInfo = appsInfo[j];
      dock = new Dock({
        width: this.width,
        height: this.height,
        info: appInfo
      });
      this.page.addPage(dock);
      dock.onClick((function(_this) {
        return function() {
          return _this.selected();
        };
      })(this));
    }
    this.page.label = new Label({
      page: this.page
    });
    this.page.snapToPage(this.page.content.children[0], false);
  }

  Docks.prototype.show = function() {
    var i, j, len, page, ref, results;
    this.animateStop();
    this.bringToFront();
    this.opacity = 1;
    this.page.animate({
      y: 5,
      scale: 281 / this.height
    });
    ref = this.page.content.children;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      page = ref[i];
      results.push(page.show());
    }
    return results;
  };

  Docks.prototype.dismiss = function(forceClose) {
    if (forceClose == null) {
      forceClose = false;
    }
    if (this.isAnimating) {
      return;
    }
    if (forceClose) {
      return this.close();
    } else {
      if (this.selectDock) {
        if (this.page.scale === 1) {
          return this.show();
        } else {
          return this.selected();
        }
      } else {
        if (this.recentDock) {
          if (this.page.currentPage === this.recentDock) {
            return this.selected();
          } else {
            this.page.snapToPage(this.recentDock, true, {
              time: .15
            });
            return this.page.content.once(Events.AnimationEnd, (function(_this) {
              return function() {
                return _this.selected();
              };
            })(this));
          }
        } else {
          return this.close();
        }
      }
    }
  };

  Docks.prototype.close = function() {
    var i, j, len, page, ref;
    this.animate({
      opacity: 0
    });
    this.page.animate({
      y: 0,
      scale: 1
    });
    ref = this.page.content.children;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      page = ref[i];
      page["default"]();
    }
    this.once(Events.AnimationEnd, function() {
      if (this.opacity === 0) {
        return this.sendToBack();
      }
    });
    return this.selectDock = void 0;
  };

  Docks.prototype.selected = function() {
    if (this.page.isAnimating) {
      return;
    }
    this.page.animate({
      y: 0,
      scale: 1
    });
    this.selectDock = this.page.currentPage;
    this.selectDock.selected();
    if (this.recentDock && this.selectDock === this.recentDock) {
      return this.page.once(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.sendToBack();
          _this.removeDock(_this.recentDock);
          return _this.recentDock = void 0;
        };
      })(this));
    }
  };

  Docks.prototype.addRecentDock = function(appInfo) {
    if (this.recentDock) {
      this.recentDock.addContent(appInfo.app);
    } else {
      this.recentDock = new Dock({
        width: this.width,
        height: this.height,
        info: appInfo
      });
      this.page.addPage(this.recentDock);
      this.recentDock.onClick((function(_this) {
        return function(event) {
          return _this.selected();
        };
      })(this));
    }
    this.page.snapToPage(this.recentDock, false);
    return this.show();
  };

  Docks.prototype.removeDock = function(layer) {
    this.page.content.removeChild(layer);
    this.page.updateContent();
    this.page.snapToPage(this.page.content.children[_.size(this.page.content.children) - 1], false);
    this.page.label.updateContent();
    return this.page.indicator.updateContent();
  };

  return Docks;

})(Layer);

Label = (function(superClass) {
  extend(Label, superClass);

  function Label(options) {
    if (options == null) {
      options = {};
    }
    if (options.name == null) {
      options.name = "label";
    }
    if (options.html == null) {
      options.html = "메시지";
    }
    options.style = {
      fontSize: "41px",
      fontWeight: "400",
      lineHeight: "1",
      paddingLeft: "72px"
    };
    if (options.backgroundColor == null) {
      options.backgroundColor = "";
    }
    options.parent = options.page;
    Label.__super__.constructor.call(this, options);
    this.page = options.page;
    Util.text.autoSize(this);
    this.props = {
      x: Align.center,
      maxY: -9.7
    };
    this.icon = new Layer({
      name: ".icon",
      y: Align.center,
      size: 58.3,
      borderRadius: 30,
      parent: this
    });
    this.page.on("change:currentPage", (function(_this) {
      return function() {
        return _this.updateContent();
      };
    })(this));
    this.updateContent();
  }

  Label.prototype.updateContent = function() {
    var currentPage;
    currentPage = this.page.currentPage;
    this.html = currentPage.name;
    Util.text.autoSize(this);
    this.centerX();
    return this.icon.image = currentPage.icon;
  };

  return Label;

})(Layer);

Indicator = (function(superClass) {
  var createDot;

  extend(Indicator, superClass);

  function Indicator(options) {
    if (options == null) {
      options = {};
    }
    options.name = "Indicator";
    options.backgroundColor = "";
    options.parent = options.page;
    if (options.y == null) {
      options.y = options.page.maxY + 22;
    }
    Indicator.__super__.constructor.call(this, options);
    this.page = options.page;
    this.page.on("change:currentPage", (function(_this) {
      return function() {
        return _this.changeDotState();
      };
    })(this));
    this.page.content.on("change:children", (function(_this) {
      return function() {
        return _this.updateContent();
      };
    })(this));
  }

  Indicator.prototype.updateContent = function() {
    var child, dot, i, j, k, len, len1, ref, ref1;
    ref = this.children;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      child.destroy();
    }
    ref1 = this.page.content.children;
    for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
      child = ref1[i];
      dot = createDot();
      if (i !== 0) {
        dot.x += this.contentFrame().width + 8;
      }
      this.addChild(dot);
    }
    this.size = this.contentFrame();
    this.props = {
      x: Align.center()
    };
    return this.changeDotState(false);
  };

  Indicator.prototype.changeDotState = function(animate) {
    var currentPage, dot, i, j, k, len, len1, pageIndex, ref, ref1, results, results1;
    if (animate == null) {
      animate = true;
    }
    currentPage = this.page.currentPage;
    pageIndex = this.page.horizontalPageIndex(currentPage);
    if (animate) {
      ref = this.children;
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        dot = ref[i];
        results.push(dot.animate(i === pageIndex ? "selected" : "normal"));
      }
      return results;
    } else {
      ref1 = this.children;
      results1 = [];
      for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
        dot = ref1[i];
        results1.push(dot.stateSwitch(i === pageIndex ? "selected" : "normal"));
      }
      return results1;
    }
  };

  createDot = function(options) {
    var dot;
    if (options == null) {
      options = {};
    }
    dot = new Layer({
      name: ".indicator.dot",
      size: 13.879,
      backgroundColor: "white",
      opacity: .35,
      borderRadius: 10
    });
    dot.states = {
      selected: {
        scale: 1.2,
        opacity: 1,
        options: {
          time: .15
        }
      },
      normal: {
        scale: 1,
        opacity: .35,
        options: {
          time: .2
        }
      }
    };
    return dot;
  };

  return Indicator;

})(Layer);

Dock = (function(superClass) {
  extend(Dock, superClass);

  function Dock(options) {
    if (options == null) {
      options = {};
    }
    options.backgroundColor = "black";
    Dock.__super__.constructor.call(this, options);
    this.info = options.info;
    this.name = this.info.name;
    this.icon = this.info.icon;
    this.content = new Layer({
      name: ".content",
      width: this.width,
      height: this.height,
      backgroundColor: "",
      clip: true,
      parent: this
    });
    if (this.info.image) {
      this.content.image = this.info.image;
      this.content.time = new Layer({
        name: ".content.time",
        y: 3,
        width: this.width,
        height: 38,
        html: Util.date.timeFormatter(Util.date.getTime()),
        style: {
          fontSize: "32px",
          fontWeight: "600",
          lineHeight: "38px",
          textAlign: "right"
        },
        opacity: 0,
        backgroundColor: "",
        parent: this.content
      });
    }
    if (this.info.app) {
      this.addContent(this.info.app);
    }
  }

  Dock.prototype.addContent = function(layer) {
    var child, j, len, ref, results;
    this.content.addChild(layer);
    ref = layer.descendants;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      results.push(child.ignoreEvents = true);
    }
    return results;
  };

  Dock.prototype.removeContent = function(layer) {
    var child, j, len, ref, results;
    this.content.removeChild(layer);
    ref = layer.descendants;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      results.push(child.ignoreEvents = false);
    }
    return results;
  };

  Dock.prototype.show = function() {
    this.animate({
      scale: 265 / 281,
      borderRadius: 15,
      options: {
        time: .15
      }
    });
    this.content.animate({
      scale: 237 / 265,
      options: {
        time: .15
      }
    });
    if (this.info.image) {
      this.content.time.animate({
        opacity: 0,
        options: {
          time: .20,
          delay: .3
        }
      });
    }
    if (this.info.app) {
      return this.info.app.toDock();
    }
  };

  Dock.prototype["default"] = function() {
    this.animate({
      scale: 1,
      borderRadius: 0,
      options: {
        time: .25
      }
    });
    return this.content.animate({
      scale: 1,
      options: {
        time: .25
      }
    });
  };

  Dock.prototype.selected = function() {
    this["default"]();
    if (this.info.image) {
      this.content.time.html = Util.date.timeFormatter(Util.date.getTime());
      this.content.time.animate({
        opacity: 1,
        options: {
          time: .15,
          delay: .2
        }
      });
    }
    if (this.info.app) {
      return this.content.once(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.info.app.fromDock();
          _this.removeContent(_this.info.app);
          return _this.destroy();
        };
      })(this));
    }
  };

  return Dock;

})(Layer);


},{}],"watchos-kit-notification":[function(require,module,exports){
'watchOS : Notification\n\n@auther Jungho song (threeword.com)\n@since 2016.11.23';
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Notification = (function(superClass) {
  var Button, createActionButton, createMessage;

  extend(Notification, superClass);

  Button = {};

  Button.Style = {};

  Button.Style.Default = "buttonStyle.default";

  Button.Style.Destructive = "buttonStyle.destructive";

  Notification.Button = Button;

  'appName: 앱이름 [require]\nicon: 아이콘 이미지 경로 [require]\naccentColor: 대표 색상 (Shrot looks의 앱이름 색상이 됨)\ntitle: 제목\nmessage: 내용\nattach: 첨부 내용 (Layer)\nsashColor: 샤시 색상 (Long looks의 상단 색상)\nsashLabelColor: 샤시의 앱이름 색상 (Long looks의 상단레이블 색상)\nbgColoc: 배경 색상 (Long looks의 배경 색상)\nbuttons:\n	label: "상세보기" [require]\n	style: Button.Style.Default\n	bgColor: "rgba(242,244,255,.14)"\n	labelColor: "white"\n	isHaptic: false';

  function Notification(options) {
    var accentColor, actionBtn, appName, bgColor, button, buttons, i, icon, j, len, message, sashColor, title;
    if (options == null) {
      options = {};
    }
    options.name = "Notification";
    if (options.width == null) {
      options.width = Device.width;
    }
    if (options.height == null) {
      options.height = Device.height;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = "";
    }
    Notification.__super__.constructor.call(this, options);
    if (options.buttons == null) {
      options.buttons = [];
    }
    if (options.appName == null) {
      options.appName = "App";
    }
    if (options.icon == null) {
      options.icon = "";
    }
    if (options.accentColor == null) {
      options.accentColor = "white";
    }
    if (options.title == null) {
      options.title = "Title";
    }
    if (options.message == null) {
      options.message = "Message";
    }
    if (options.sashColor == null) {
      options.sashColor = "rgba(255,255,255,.1)";
    }
    if (options.bgColor == null) {
      options.bgColor = "rgba(255,255,255,.14)";
    }
    if (options.sashLabelColor == null) {
      options.sashLabelColor = "white";
    }
    title = options.title;
    message = options.message;
    buttons = options.buttons;
    appName = options.appName;
    icon = options.icon;
    accentColor = options.accentColor;
    sashColor = options.sashColor;
    bgColor = options.bgColor;
    this.bg = new Layer({
      name: ".bg",
      width: this.width,
      height: this.height,
      backgroundColor: "rgba(0,0,0,.6)",
      opacity: 0,
      parent: this
    });
    Util.blur(this.bg);
    this.short = new Layer({
      name: ".short",
      width: this.width,
      height: this.height,
      backgroundColor: "",
      parent: this
    });
    this.short.icon = new Layer({
      name: ".short.icon",
      x: Align.center,
      y: Align.top(41),
      size: 196,
      image: icon,
      borderRadius: 98,
      shadowY: 2,
      shadowBlur: 8,
      shadowColor: "rgba(0,0,0,.3)",
      backgroundColor: "white",
      parent: this.short
    });
    this.short.title = new Layer({
      name: ".short.title",
      x: Align.center,
      y: this.short.icon.maxY + 18,
      html: title,
      style: {
        fontSize: "38px",
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: "-0.42px",
        textAlign: "center"
      },
      backgroundColor: "",
      parent: this.short
    });
    Util.text.autoSize(this.short.title);
    this.short.title.centerX();
    this.short.appName = new Layer({
      name: ".short.appName",
      x: Align.center,
      y: this.short.title.maxY + 9,
      html: appName,
      style: {
        fontSize: "28px",
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: "0.22px",
        textAlign: "center",
        textTransform: "uppercase"
      },
      color: accentColor,
      backgroundColor: "",
      parent: this.short
    });
    Util.text.autoSize(this.short.appName);
    this.short.appName.centerX();
    this.long = new Scroll({
      name: ".long",
      width: this.width,
      height: this.height,
      backgroundColor: "",
      contentInset: {
        top: 42,
        bottom: 14
      },
      parent: this
    });
    this.long.confirm = new Layer({
      html: "확인",
      style: {
        fontWeight: "400",
        fontSize: "24px",
        paddingBottom: "25px",
        textAlign: "center"
      },
      backgroundColor: "",
      color: "#8d8d8d",
      parent: this.long
    });
    Util.text.autoSize(this.long.confirm);
    this.long.confirm.props = {
      x: Align.center,
      y: -(this.long.contentInset.top + 32)
    };
    this.long.confirm.bar = new Layer({
      x: Align.center,
      y: Align.bottom,
      width: 80,
      height: 5,
      backgroundColor: "",
      parent: this.long.confirm
    });
    this.long.confirm.bar.left = new Layer({
      x: Align.left,
      y: Align.bottom,
      width: 43,
      height: 5,
      originX: 0,
      originY: 0,
      borderRadius: 5,
      backgroundColor: "#8d8d8d",
      parent: this.long.confirm.bar
    });
    this.long.confirm.bar.right = new Layer({
      x: Align.right,
      y: Align.bottom,
      width: 43,
      height: 5,
      originX: 1,
      originY: 0,
      borderRadius: 5,
      backgroundColor: "#8d8d8d",
      parent: this.long.confirm.bar
    });
    this.long.confirm.changeMode = function(mode) {
      var color, rotation;
      if (mode == null) {
        mode = false;
      }
      this.isChangeMode = mode;
      color = mode ? "white" : "#8d8d8d";
      rotation = mode ? 10 : 0;
      options = {
        time: .15,
        curve: "spring(500,50,0)"
      };
      this.animate({
        color: color,
        options: options
      });
      this.bar.left.animate({
        rotation: rotation,
        backgroundColor: color,
        options: options
      });
      return this.bar.right.animate({
        rotation: -rotation,
        backgroundColor: color,
        options: options
      });
    };
    this.long.time = new Layer({
      name: ".long.time",
      x: Align.right(-4),
      y: Align.top(1),
      width: 150,
      height: 38,
      html: Util.date.timeFormatter(Util.date.getTime()),
      style: {
        fontSize: "32px",
        fontWeight: 400,
        lineHeight: "38px",
        textAlign: "right"
      },
      color: "#ABABAB",
      backgroundColor: "",
      parent: this.long
    });
    this.long.message = createMessage(options);
    this.long.message.parent = this.long.content;
    this.long.buttons = [];
    if (buttons) {
      for (i = j = 0, len = buttons.length; j < len; i = ++j) {
        button = buttons[i];
        actionBtn = createActionButton(button);
        actionBtn.y += this.long.content.contentFrame().height + 8;
        this.long.content.addChild(actionBtn);
        this.long.buttons.push(actionBtn);
      }
    }
    this.long.dismissBtn = createActionButton({
      label: "닫기",
      bgColor: "rgba(242,244,255,.2)"
    });
    this.long.dismissBtn.y += this.long.content.contentFrame().height + 24;
    this.long.content.addChild(this.long.dismissBtn);
    this.long.buttons.push(this.long.dismissBtn);
    this.short.visible = true;
    this.long.visible = false;
    this.bg.show = (function(_this) {
      return function() {
        return _this.bg.animate({
          opacity: 1,
          options: {
            time: .3,
            curve: "linear"
          }
        });
      };
    })(this);
    this.bg.dismiss = (function(_this) {
      return function() {
        return _this.bg.animate({
          opacity: 0,
          options: {
            time: 1,
            curve: "linear",
            delay: .2
          }
        });
      };
    })(this);
    this.short.show = (function(_this) {
      return function() {
        _this.short.y = _this.maxY;
        return _this.short.animate({
          y: 0,
          options: {
            time: 4,
            curve: "spring(200,20,0)"
          }
        });
      };
    })(this);
    this.short.dismiss = (function(_this) {
      return function() {
        _this.short.removeChild(_this.short.icon);
        _this.short.icon.parent = _this.long;
        _this.short.animate({
          y: _this.short.y - 250,
          opacity: 0,
          options: {
            time: .07,
            curve: "spring(500,50,0)"
          }
        });
        _this.short.once(Events.AnimationEnd, function() {
          return _this.short.destroy();
        });
        _this.short.icon.animate({
          x: -32,
          y: -49,
          options: {
            time: .4,
            curve: "spring(200,20,0)"
          }
        });
        return _this.short.icon.animate({
          scale: 88 / _this.short.icon.width,
          options: {
            time: .46,
            curve: "ease-in-out"
          }
        });
      };
    })(this);
    this.long.show = (function(_this) {
      return function() {
        _this.long.visible = true;
        _this.long.content.y = _this.maxY;
        _this.long.content.animate({
          y: _this.long.contentInset.top,
          options: {
            time: 1,
            curve: "spring(200,20,0)"
          }
        });
        _this.long.time.opacity = 0;
        _this.long.time.animate({
          opacity: 1,
          options: {
            time: 1
          }
        });
        return _this.long.content.once(Events.AnimationEnd, function() {
          var k, len1, ref, results;
          _this.short.icon.startY = _this.short.icon.y;
          _this.long.time.startY = _this.long.time.y;
          _this.long.confirm.startY = _this.long.confirm.y;
          _this.long.onMove(function() {
            var posY;
            posY = _this.long.scrollY;
            _this.short.icon.y = _this.short.icon.startY - posY;
            _this.long.time.y = _this.long.time.startY - posY;
            if (posY < 0) {
              _this.long.time.y = _this.long.time.startY;
            }
            _this.long.time.opacity = 1 + (posY / 40);
            _this.long.confirm.y = _this.long.confirm.startY - posY;
            if (_this.long.confirm.startY - posY < 0) {
              return _this.long.confirm.changeMode(false);
            } else {
              return _this.long.confirm.changeMode(true);
            }
          });
          _this.long.onScrollEnd(function() {
            if (_this.long.confirm.isChangeMode) {
              return _this.close();
            }
          });
          ref = _this.long.buttons;
          results = [];
          for (k = 0, len1 = ref.length; k < len1; k++) {
            button = ref[k];
            results.push(button.onClick(function() {
              return _this.dismiss();
            }));
          }
          return results;
        });
      };
    })(this);
    this.long.dismiss = (function(_this) {
      return function() {
        return _this.long.animate({
          opacity: 0,
          options: {
            time: .3,
            curve: "ease"
          }
        });
      };
    })(this);
    this.long.close = (function(_this) {
      return function() {
        _this.long.content.draggable.animateStop();
        _this.long.content.animateStop();
        return _this.long.content.animate({
          y: _this.maxY * 1.3,
          options: {
            time: .15,
            curve: "spring(500,50,0)"
          }
        });
      };
    })(this);
    this.show();
  }

  Notification.prototype.show = function() {
    this.bringToFront();
    this.bg.show();
    this.short.show();
    return Utils.delay(1.3, (function(_this) {
      return function() {
        _this.short.dismiss();
        return _this.long.show();
      };
    })(this));
  };

  Notification.prototype.dismiss = function() {
    this.bg.dismiss();
    this.long.dismiss();
    return Utils.delay(1.3, (function(_this) {
      return function() {
        return _this.destroy();
      };
    })(this));
  };

  Notification.prototype.close = function() {
    this.bg.dismiss();
    this.long.close();
    return Utils.delay(.3, (function(_this) {
      return function() {
        return _this.destroy();
      };
    })(this));
  };

  createActionButton = function(options) {
    var bgColor, button, isHaptic, label, labelColor, style;
    if (options == null) {
      options = {};
    }
    if (options.label == null) {
      options.label = "Action";
    }
    if (options.style == null) {
      options.style = Button.Style.Default;
    }
    if (options.bgColor == null) {
      options.bgColor = "rgba(242,244,255,.14)";
    }
    if (options.labelColor == null) {
      options.labelColor = "white";
    }
    if (options.isHaptic == null) {
      options.isHaptic = false;
    }
    label = options.label;
    style = options.style;
    bgColor = options.bgColor;
    labelColor = options.labelColor;
    isHaptic = options.isHaptic;
    button = new Layer({
      name: ".notification.button-" + label,
      x: Align.left(2),
      width: 308,
      height: 80,
      html: label,
      style: {
        fontSize: "32px",
        fontWeight: 400,
        lineHeight: "80px",
        textAlign: "center",
        letterSpacing: "-0.1px"
      },
      color: style === Button.Style.Destructive ? "#FF3B30" : labelColor,
      borderRadius: 15,
      backgroundColor: bgColor
    });
    button.states = {
      pressed: {
        scale: .95,
        opacity: .8,
        animationOptions: {
          time: .15,
          curve: "spring(500,50,0)"
        }
      },
      normal: {
        scale: 1,
        opacity: 1,
        animationOptions: {
          time: .20,
          curve: "spring(500,50,0)"
        }
      }
    };
    button.onMouseDown(function() {
      return this.animate("pressed");
    });
    button.onMouseUp(function() {
      return this.animate("normal");
    });
    button.onMouseOut(function() {
      return this.animate("normal");
    });
    button.onTap(function() {
      if (isHaptic) {
        return Device.playHaptic();
      }
    });
    return button;
  };

  createMessage = function(options) {
    var content;
    if (options == null) {
      options = {};
    }
    content = new Layer({
      name: ".notification.content",
      x: Align.left(2),
      width: 308,
      height: 232,
      backgroundColor: options.bgColor,
      borderRadius: 15
    });
    content.header = new Layer({
      name: ".header",
      width: content.width,
      height: 60,
      html: options.appName,
      style: {
        fontSize: "28px",
        fontWeight: 400,
        lineHeight: "34px",
        letterSpacing: "0.5px",
        textAlign: "right",
        padding: "12px 21px 14px 0px",
        textTransform: "uppercase",
        borderRadius: "15px 15px 0px 0px"
      },
      color: options.sashLabelColor,
      backgroundColor: options.sashColor,
      parent: content
    });
    content.title = new Layer({
      name: ".title",
      x: Align.left(15),
      y: content.header.maxY + 25,
      width: 278,
      html: options.title,
      style: {
        fontSize: "32px",
        fontWeight: 600,
        lineHeight: 1
      },
      backgroundColor: "",
      parent: content
    });
    Util.text.autoSize(content.title, {}, {
      width: content.title.width
    });
    content.message = new Layer({
      name: ".message",
      x: content.title.minX,
      y: content.title.maxY + 2,
      width: content.title.width,
      html: options.message,
      style: {
        fontSize: "32px",
        fontWeight: 400,
        lineHeight: "37px",
        letterSpacing: "-0.2px"
      },
      backgroundColor: "",
      parent: content
    });
    Util.text.autoSize(content.message, {}, {
      width: content.message.width
    });
    if (options.attach) {
      content.attach = new Layer({
        name: ".attach",
        x: content.message.x,
        y: content.message.maxY + 2,
        width: content.message.width,
        backgroundColor: "",
        parent: content
      });
      content.attach.addChild(options.attach);
      options.attach.point = Align.center;
      content.attach.height = content.attach.contentFrame().y + content.attach.contentFrame().height;
    }
    content.height = content.contentFrame().height + 33;
    return content;
  };

  return Notification;

})(Layer);


},{}],"watchos-kit-scroll":[function(require,module,exports){
'watchOS : Scroll\n\n@auther Jungho song (threeword.com)\n@since 2016.11.23';
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Scroll = (function(superClass) {
  'scrollbar:\n	y:';
  var defaultScrollbar;

  extend(Scroll, superClass);

  defaultScrollbar = {
    y: 42
  };

  function Scroll(options) {
    if (options == null) {
      options = {};
    }
    this.updateContent = bind(this.updateContent, this);
    options.scrollHorizontal = false;
    Scroll.__super__.constructor.call(this, options);
    this.scrollbar = new Layer({
      name: "ScrollBar",
      x: Align.right(-5),
      y: Align.top(this._contentInset.top),
      width: 12,
      height: 75,
      borderRadius: 10,
      backgroundColor: "rgba(255,255,255,.25)",
      opacity: 0,
      parent: this
    });
    this.scrollbar.states = {
      show: {
        opacity: 1,
        animationOptions: {
          time: .15
        }
      }
    };
    this.scrollbar.thumb = new Layer({
      name: ".thumb",
      x: Align.center,
      y: Align.top(1),
      width: 10,
      height: 36,
      borderRadius: 10,
      backgroundColor: "white",
      parent: this.scrollbar
    });
    this.onScrollStart((function(_this) {
      return function() {
        if (_this.scrollbar.thumb.height !== 73) {
          _this.scrollbar.animateStop();
          return _this.scrollbar.animate("show");
        }
      };
    })(this));
    this.onScrollAnimationDidEnd((function(_this) {
      return function() {
        if (_this.scrollbar.thumb.height !== 73) {
          _this.scrollbar.animateStop();
          return _this.scrollbar.animate("default");
        }
      };
    })(this));
    this.onMove((function(_this) {
      return function() {
        var max, min;
        min = 0;
        max = _this.content.height - _this.height + (_this._contentInset.top + _this._contentInset.bottom);
        _this.scrollbar.thumb.y = Utils.modulate(_this.scrollY, [min, max], [1, 74 - _this.thumbHeight]);
        if (_this.scrollY <= min) {
          _this.scrollbar.thumb.height = Utils.clamp(_this.thumbHeight + _this.scrollbar.thumb.y, 12, _this.thumbHeight);
          return _this.scrollbar.thumb.y = 1;
        } else if (_this.scrollY >= max) {
          _this.scrollbar.thumb.height = Utils.clamp(74 - _this.scrollbar.thumb.y, 12, _this.thumbHeight);
          if (_this.scrollbar.thumb.height <= 12) {
            return _this.scrollbar.thumb.y = 74 - 12;
          }
        } else {
          return _this.scrollbar.thumb.height = _this.thumbHeight;
        }
      };
    })(this));
  }

  Scroll.prototype.updateContent = function() {
    Scroll.__super__.updateContent.apply(this, arguments);
    if (!this.scrollbar) {
      return;
    }
    return this.thumbHeight = Utils.clamp(this.scrollbar.height * this.height / this.content.draggable.constraints.height, 12, 73);
  };

  return Scroll;

})(ScrollComponent);


},{}],"watchos-kit":[function(require,module,exports){
'watchOS kit\n\n@auther Jungho song (threeword.com)\n@since 2016.11.23';
var WatchOSKit;

WatchOSKit = {};

WatchOSKit.Util = require('util');

if (window) {
  _.extend(window, WatchOSKit);
}

WatchOSKit.Device = new (require('watchos-kit-device')).Device;

if (window) {
  _.extend(window, WatchOSKit);
}

WatchOSKit.ClockFaces = (require('watchos-kit-clockfaces')).ClockFaces;

WatchOSKit.Complication = (require('watchos-kit-clockfaces')).Complication;

WatchOSKit.Apps = (require('watchos-kit-apps')).Apps;

WatchOSKit.Docks = (require('watchos-kit-docks')).Docks;

WatchOSKit.Notification = (require('watchos-kit-notification')).Notification;

WatchOSKit.Scroll = (require('watchos-kit-scroll')).Scroll;

WatchOSKit.App = (require('watchos-kit-app')).App;

WatchOSKit.WatchOS = (require('watchos')).WatchOS;

if (window) {
  _.extend(window, WatchOSKit);
}

if (window) {
  window.WatchOSKit = WatchOSKit;
}


},{"util":"util","watchos":"watchos","watchos-kit-app":"watchos-kit-app","watchos-kit-apps":"watchos-kit-apps","watchos-kit-clockfaces":"watchos-kit-clockfaces","watchos-kit-device":"watchos-kit-device","watchos-kit-docks":"watchos-kit-docks","watchos-kit-notification":"watchos-kit-notification","watchos-kit-scroll":"watchos-kit-scroll"}],"watchos":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Framer.Extras.Hints.disable();

'watchOS\n\n@auther Jungho song (threeword.com)\n@since 2016.11.24';

exports.WatchOS = (function(superClass) {
  'options:\n	appInfo: \n		name: "카카오증권"\n		icon: "images/appicon.png"\n		app: kakaostocks\n	complications:\n		utilitarian: [\n		]\n		modular: [\n			new Complication().modularSmall().simpleText("카카오증권")\n		]\n		circular: [\n		]';
  extend(WatchOS, superClass);

  function WatchOS(options) {
    if (options == null) {
      options = {};
    }
    WatchOS.__super__.constructor.apply(this, arguments);
    if (options.appInfo == null) {
      options.appInfo = {};
    }
    this.appInfo = options.appInfo;
    this.app = this.appInfo.app;
    this.complications = options.complications;
    this.bg = new Layer({
      name: "Background",
      backgroundColor: "black"
    });
    this.clockfaces = new ClockFaces({
      width: Device.width,
      height: Device.height,
      complications: this.complications
    });
    this.docks = new Docks({
      width: Device.width,
      height: Device.height
    });
    this.apps = new Apps({
      width: Device.width,
      height: Device.height,
      clockfaces: this.clockfaces,
      appInfo: this.appInfo
    });
    Device.onDigitalCrown((function(_this) {
      return function() {
        var currentScreen;
        currentScreen = _this._getCurrentScreen();
        if (!currentScreen) {
          return;
        }
        if (currentScreen === _this.clockfaces) {
          if (_this.clockfaces.isChangeMode) {
            return _this.clockfaces.selected();
          } else {
            return _this.apps.show(_this.clockfaces);
          }
        } else if (currentScreen === _this.app) {
          return _this.apps.show(_this.app);
        } else if (currentScreen === _this.apps) {
          return _this.apps.dismiss(_this.clockfaces);
        } else if (currentScreen === _this.docks) {
          return _this.docks.dismiss(true);
        } else if (currentScreen === _this.notification) {
          return _this.notification.dismiss();
        }
      };
    })(this));
    Device.onSide((function(_this) {
      return function() {
        var currentScreen;
        currentScreen = _this._getCurrentScreen();
        if (!currentScreen) {
          return;
        }
        if (currentScreen === _this.docks) {
          return _this.docks.dismiss();
        } else {
          if (currentScreen === _this.app) {
            _this.docks.addRecentDock(_this.appInfo);
            return _this.apps.init();
          } else {
            return _this.docks.show();
          }
        }
      };
    })(this));
  }

  WatchOS.prototype.showNotification = function(options) {
    if (options == null) {
      options = {};
    }
    if (this.notification) {
      this.notification.destroy();
    }
    return this.notification = new Notification(options);
  };

  WatchOS.prototype.setClockface = function(index) {
    return this.clockfaces.setClockface(index);
  };

  WatchOS.prototype._getCurrentScreen = function() {
    var layers;
    if (_.isEmpty(this.bg.siblings)) {
      return;
    }
    layers = _.sortBy(this.bg.siblings, 'index').reverse();
    return layers[0];
  };

  return WatchOS;

})(Framer.BaseClass);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RocmVld29yZC90b3kvZ2l0aHViL2ZyYW1lci1tb2R1bGVzL3dhdGNob3MuZnJhbWVyL21vZHVsZXMvd2F0Y2hvcy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aHJlZXdvcmQvdG95L2dpdGh1Yi9mcmFtZXItbW9kdWxlcy93YXRjaG9zLmZyYW1lci9tb2R1bGVzL3dhdGNob3Mta2l0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RocmVld29yZC90b3kvZ2l0aHViL2ZyYW1lci1tb2R1bGVzL3dhdGNob3MuZnJhbWVyL21vZHVsZXMvd2F0Y2hvcy1raXQtc2Nyb2xsLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RocmVld29yZC90b3kvZ2l0aHViL2ZyYW1lci1tb2R1bGVzL3dhdGNob3MuZnJhbWVyL21vZHVsZXMvd2F0Y2hvcy1raXQtbm90aWZpY2F0aW9uLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RocmVld29yZC90b3kvZ2l0aHViL2ZyYW1lci1tb2R1bGVzL3dhdGNob3MuZnJhbWVyL21vZHVsZXMvd2F0Y2hvcy1raXQtZG9ja3MuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGhyZWV3b3JkL3RveS9naXRodWIvZnJhbWVyLW1vZHVsZXMvd2F0Y2hvcy5mcmFtZXIvbW9kdWxlcy93YXRjaG9zLWtpdC1kZXZpY2UuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGhyZWV3b3JkL3RveS9naXRodWIvZnJhbWVyLW1vZHVsZXMvd2F0Y2hvcy5mcmFtZXIvbW9kdWxlcy93YXRjaG9zLWtpdC1jbG9ja2ZhY2VzLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RocmVld29yZC90b3kvZ2l0aHViL2ZyYW1lci1tb2R1bGVzL3dhdGNob3MuZnJhbWVyL21vZHVsZXMvd2F0Y2hvcy1raXQtYXBwLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RocmVld29yZC90b3kvZ2l0aHViL2ZyYW1lci1tb2R1bGVzL3dhdGNob3MuZnJhbWVyL21vZHVsZXMvd2F0Y2hvcy1raXQtYXBwcy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aHJlZXdvcmQvdG95L2dpdGh1Yi9mcmFtZXItbW9kdWxlcy93YXRjaG9zLmZyYW1lci9tb2R1bGVzL3V0aWwuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIERpc2FibGUgaGludHNcbkZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cbicnJ1xud2F0Y2hPU1xuXG5AYXV0aGVyIEp1bmdobyBzb25nICh0aHJlZXdvcmQuY29tKVxuQHNpbmNlIDIwMTYuMTEuMjRcbicnJ1xuY2xhc3MgZXhwb3J0cy5XYXRjaE9TIGV4dGVuZHMgRnJhbWVyLkJhc2VDbGFzc1xuXHQnJydcblx0b3B0aW9uczpcblx0XHRhcHBJbmZvOiBcblx0XHRcdG5hbWU6IFwi7Lm07Lm07Jik7Kad6raMXCJcblx0XHRcdGljb246IFwiaW1hZ2VzL2FwcGljb24ucG5nXCJcblx0XHRcdGFwcDoga2FrYW9zdG9ja3Ncblx0XHRjb21wbGljYXRpb25zOlxuXHRcdFx0dXRpbGl0YXJpYW46IFtcblx0XHRcdF1cblx0XHRcdG1vZHVsYXI6IFtcblx0XHRcdFx0bmV3IENvbXBsaWNhdGlvbigpLm1vZHVsYXJTbWFsbCgpLnNpbXBsZVRleHQoXCLsubTsubTsmKTspp3qtoxcIilcblx0XHRcdF1cblx0XHRcdGNpcmN1bGFyOiBbXG5cdFx0XHRdXG5cdCcnJ1xuXHQjIENvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cblx0XHRzdXBlclxuXG5cdFx0b3B0aW9ucy5hcHBJbmZvID89IHt9XG5cblx0XHRAYXBwSW5mbyA9IG9wdGlvbnMuYXBwSW5mb1xuXHRcdEBhcHAgPSBAYXBwSW5mby5hcHBcblxuXHRcdEBjb21wbGljYXRpb25zID0gb3B0aW9ucy5jb21wbGljYXRpb25zXG5cblx0XHQjIEJhY2tncm91bmRcblx0XHRAYmcgPSBuZXcgTGF5ZXIgbmFtZTogXCJCYWNrZ3JvdW5kXCIsIGJhY2tncm91bmRDb2xvcjogXCJibGFja1wiXG5cblx0XHQjIENsb2NrZmFjZSAoQ29tcGxpY2F0aW9uKVxuXHRcdEBjbG9ja2ZhY2VzID0gbmV3IENsb2NrRmFjZXMgXG5cdFx0XHR3aWR0aDogRGV2aWNlLndpZHRoLCBoZWlnaHQ6IERldmljZS5oZWlnaHRcblx0XHRcdGNvbXBsaWNhdGlvbnM6IEBjb21wbGljYXRpb25zXG5cdFx0IyBEb2Nrc1xuXHRcdEBkb2NrcyA9IG5ldyBEb2NrcyBcblx0XHRcdHdpZHRoOiBEZXZpY2Uud2lkdGgsIGhlaWdodDogRGV2aWNlLmhlaWdodFxuXHRcdCMgQXBwc1xuXHRcdEBhcHBzID0gbmV3IEFwcHMgXG5cdFx0XHR3aWR0aDogRGV2aWNlLndpZHRoLCBoZWlnaHQ6IERldmljZS5oZWlnaHRcblx0XHRcdGNsb2NrZmFjZXM6IEBjbG9ja2ZhY2VzXG5cdFx0XHRhcHBJbmZvOiBAYXBwSW5mb1xuXG5cdFx0IyBFdmVudCA6IERpZ2l0YWwgQ3Jvd25cblx0XHREZXZpY2Uub25EaWdpdGFsQ3Jvd24gPT5cblx0XHRcdGN1cnJlbnRTY3JlZW4gPSBAX2dldEN1cnJlbnRTY3JlZW4oKVxuXHRcdFx0cmV0dXJuIHVubGVzcyBjdXJyZW50U2NyZWVuXG5cdFx0XHRcblx0XHRcdCMgQ2xvY2tmYWNlXG5cdFx0XHRpZiBjdXJyZW50U2NyZWVuIGlzIEBjbG9ja2ZhY2VzXG5cdFx0XHRcdCMgQ2xvY2tmYWNlIDogY2hhbmdlIG1vZGVcblx0XHRcdFx0aWYgQGNsb2NrZmFjZXMuaXNDaGFuZ2VNb2RlIHRoZW4gQGNsb2NrZmFjZXMuc2VsZWN0ZWQoKVxuXHRcdFx0XHQjIENsb2NrZmFjZSA6IG5vcm1hbCBtb2RlXG5cdFx0XHRcdGVsc2UgQGFwcHMuc2hvdyBAY2xvY2tmYWNlc1xuXHRcdFx0IyBBcHBcblx0XHRcdGVsc2UgaWYgY3VycmVudFNjcmVlbiBpcyBAYXBwXG5cdFx0XHRcdEBhcHBzLnNob3cgQGFwcFxuXHRcdFx0IyBBcHBzXG5cdFx0XHRlbHNlIGlmIGN1cnJlbnRTY3JlZW4gaXMgQGFwcHNcblx0XHRcdFx0QGFwcHMuZGlzbWlzcyBAY2xvY2tmYWNlc1xuXHRcdFx0IyBEb2Nrc1xuXHRcdFx0ZWxzZSBpZiBjdXJyZW50U2NyZWVuIGlzIEBkb2Nrc1xuXHRcdFx0XHRAZG9ja3MuZGlzbWlzcyB0cnVlXG5cdFx0XHQjIE5vdGlmaWNhdGlvblxuXHRcdFx0ZWxzZSBpZiBjdXJyZW50U2NyZWVuIGlzIEBub3RpZmljYXRpb25cblx0XHRcdFx0QG5vdGlmaWNhdGlvbi5kaXNtaXNzKClcblxuXHRcdCMgRXZlbnQgOiBTaWRlIGJ1dHRvblxuXHRcdERldmljZS5vblNpZGUgPT5cblx0XHRcdGN1cnJlbnRTY3JlZW4gPSBAX2dldEN1cnJlbnRTY3JlZW4oKVxuXHRcdFx0cmV0dXJuIHVubGVzcyBjdXJyZW50U2NyZWVuXG5cdFx0XHRcdFxuXHRcdFx0IyBEb2Nrc1xuXHRcdFx0aWYgY3VycmVudFNjcmVlbiBpcyBAZG9ja3MgdGhlbiBAZG9ja3MuZGlzbWlzcygpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdCMgQXBwXG5cdFx0XHRcdGlmIGN1cnJlbnRTY3JlZW4gaXMgQGFwcFxuXHRcdFx0XHRcdEBkb2Nrcy5hZGRSZWNlbnREb2NrIEBhcHBJbmZvXG5cdFx0XHRcdFx0QGFwcHMuaW5pdCgpXG5cdFx0XHRcdCMgTm90IEFwcFxuXHRcdFx0XHRlbHNlIEBkb2Nrcy5zaG93KClcblxuXHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQjIFB1YmxpY1xuXHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdCMgTm90aWZ5IG5vdGlmaWNhdGlvblxuXHRzaG93Tm90aWZpY2F0aW9uOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBub3RpZmljYXRpb24uZGVzdHJveSgpIGlmIEBub3RpZmljYXRpb25cblx0XHRAbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbiBvcHRpb25zXG5cblx0IyBTZXQgY2xvY2tmYWNlXG5cdHNldENsb2NrZmFjZTogKGluZGV4KSAtPiBAY2xvY2tmYWNlcy5zZXRDbG9ja2ZhY2UgaW5kZXhcblxuXHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQjIFByaXZhdGVcblx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQjIEdldCBjdXJyZW50IHNjcmVlbiBsYXllciAoZmlyc3QgbGF5ZXIpXG5cdF9nZXRDdXJyZW50U2NyZWVuOiAtPlxuXHRcdHJldHVybiBpZiBfLmlzRW1wdHkoQGJnLnNpYmxpbmdzKVxuXHRcdGxheWVycyA9IF8uc29ydEJ5KEBiZy5zaWJsaW5ncywgJ2luZGV4JykucmV2ZXJzZSgpXG5cdFx0cmV0dXJuIGxheWVyc1swXSIsIicnJ1xud2F0Y2hPUyBraXRcblxuQGF1dGhlciBKdW5naG8gc29uZyAodGhyZWV3b3JkLmNvbSlcbkBzaW5jZSAyMDE2LjExLjIzXG4nJydcblxuIyBXYXRjaCBPU1xuV2F0Y2hPU0tpdCA9IHt9XG5cbiMgVXRpbHNcbldhdGNoT1NLaXQuVXRpbCA9IChyZXF1aXJlICd1dGlsJylcbiNcbl8uZXh0ZW5kKHdpbmRvdywgV2F0Y2hPU0tpdCkgaWYgd2luZG93XG5cbiNcbldhdGNoT1NLaXQuRGV2aWNlID0gbmV3IChyZXF1aXJlICd3YXRjaG9zLWtpdC1kZXZpY2UnKS5EZXZpY2VcbiNcbl8uZXh0ZW5kKHdpbmRvdywgV2F0Y2hPU0tpdCkgaWYgd2luZG93XG5cblxuV2F0Y2hPU0tpdC5DbG9ja0ZhY2VzID0gKHJlcXVpcmUgJ3dhdGNob3Mta2l0LWNsb2NrZmFjZXMnKS5DbG9ja0ZhY2VzXG5XYXRjaE9TS2l0LkNvbXBsaWNhdGlvbiA9IChyZXF1aXJlICd3YXRjaG9zLWtpdC1jbG9ja2ZhY2VzJykuQ29tcGxpY2F0aW9uXG5XYXRjaE9TS2l0LkFwcHMgPSAocmVxdWlyZSAnd2F0Y2hvcy1raXQtYXBwcycpLkFwcHNcbldhdGNoT1NLaXQuRG9ja3MgPSAocmVxdWlyZSAnd2F0Y2hvcy1raXQtZG9ja3MnKS5Eb2Nrc1xuV2F0Y2hPU0tpdC5Ob3RpZmljYXRpb24gPSAocmVxdWlyZSAnd2F0Y2hvcy1raXQtbm90aWZpY2F0aW9uJykuTm90aWZpY2F0aW9uXG5XYXRjaE9TS2l0LlNjcm9sbCA9IChyZXF1aXJlICd3YXRjaG9zLWtpdC1zY3JvbGwnKS5TY3JvbGxcbldhdGNoT1NLaXQuQXBwID0gKHJlcXVpcmUgJ3dhdGNob3Mta2l0LWFwcCcpLkFwcFxuV2F0Y2hPU0tpdC5XYXRjaE9TID0gKHJlcXVpcmUgJ3dhdGNob3MnKS5XYXRjaE9TXG5cbiNcbl8uZXh0ZW5kKHdpbmRvdywgV2F0Y2hPU0tpdCkgaWYgd2luZG93XG53aW5kb3cuV2F0Y2hPU0tpdCA9IFdhdGNoT1NLaXQgaWYgd2luZG93IiwiJycnXG53YXRjaE9TIDogU2Nyb2xsXG5cbkBhdXRoZXIgSnVuZ2hvIHNvbmcgKHRocmVld29yZC5jb20pXG5Ac2luY2UgMjAxNi4xMS4yM1xuJycnXG5jbGFzcyBleHBvcnRzLlNjcm9sbCBleHRlbmRzIFNjcm9sbENvbXBvbmVudFxuXG5cdCcnJ1xuXHRzY3JvbGxiYXI6XG5cdFx0eTpcblx0JycnXG5cdGRlZmF1bHRTY3JvbGxiYXIgPSBcblx0XHR5OiA0MlxuXG5cdCMgQ29uc3RydWN0b3Jcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy5zY3JvbGxIb3Jpem9udGFsID0gZmFsc2Vcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHQjIEJhclxuXHRcdEBzY3JvbGxiYXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiU2Nyb2xsQmFyXCJcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC01KSwgeTogQWxpZ24udG9wKEBfY29udGVudEluc2V0LnRvcClcblx0XHRcdHdpZHRoOiAxMiwgaGVpZ2h0OiA3NVxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsLjI1KVwiXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRAc2Nyb2xsYmFyLnN0YXRlcyA9XG5cdFx0XHRzaG93OiBvcGFjaXR5OiAxLCBhbmltYXRpb25PcHRpb25zOiB7IHRpbWU6IC4xNSB9XG5cblx0XHQjIFRodW1iXG5cdFx0QHNjcm9sbGJhci50aHVtYiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIudGh1bWJcIlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi50b3AoMSlcblx0XHRcdHdpZHRoOiAxMCwgaGVpZ2h0OiAzNlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRcdHBhcmVudDogQHNjcm9sbGJhclxuXHRcdFx0XG5cdFx0IyBFdmVudCA6IFNjcm9sbCBTdGFydCAtIHZpc2libGUgYmFyXG5cdFx0QG9uU2Nyb2xsU3RhcnQgPT4gXG5cdFx0XHR1bmxlc3MgQHNjcm9sbGJhci50aHVtYi5oZWlnaHQgaXMgNzMgXG5cdFx0XHRcdEBzY3JvbGxiYXIuYW5pbWF0ZVN0b3AoKVxuXHRcdFx0XHRAc2Nyb2xsYmFyLmFuaW1hdGUgXCJzaG93XCIgXG5cdFx0IyBFdmVudCA6IFNjcm9sbCBFbmQgLSBpbnZpc2libGUgYmFyXG5cdFx0QG9uU2Nyb2xsQW5pbWF0aW9uRGlkRW5kID0+IFxuXHRcdFx0dW5sZXNzIEBzY3JvbGxiYXIudGh1bWIuaGVpZ2h0IGlzIDczXG5cdFx0XHRcdEBzY3JvbGxiYXIuYW5pbWF0ZVN0b3AoKVxuXHRcdFx0XHRAc2Nyb2xsYmFyLmFuaW1hdGUgXCJkZWZhdWx0XCJcblxuXHRcdCMgRXZlbnQgOiBNb3ZlXG5cdFx0QG9uTW92ZSA9PlxuXHRcdFx0bWluID0gMFxuXHRcdFx0bWF4ID0gQGNvbnRlbnQuaGVpZ2h0IC0gQGhlaWdodCArIChAX2NvbnRlbnRJbnNldC50b3AgKyBAX2NvbnRlbnRJbnNldC5ib3R0b20pXG5cdFx0XHRcblx0XHRcdEBzY3JvbGxiYXIudGh1bWIueSA9IFV0aWxzLm1vZHVsYXRlIEBzY3JvbGxZLCBbbWluLCBtYXhdLCBbMSwgNzQgLSBAdGh1bWJIZWlnaHRdXG5cdFx0XHQjIEFuY2hvciBib3R0b21cblx0XHRcdGlmIEBzY3JvbGxZIDw9IG1pblxuXHRcdFx0XHRAc2Nyb2xsYmFyLnRodW1iLmhlaWdodCA9IFV0aWxzLmNsYW1wIEB0aHVtYkhlaWdodCArIEBzY3JvbGxiYXIudGh1bWIueSwgMTIsIEB0aHVtYkhlaWdodFxuXHRcdFx0XHRAc2Nyb2xsYmFyLnRodW1iLnkgPSAxXG5cdFx0XHQjIEFuY2hvciB0b3Bcblx0XHRcdGVsc2UgaWYgQHNjcm9sbFkgPj0gbWF4XG5cdFx0XHRcdEBzY3JvbGxiYXIudGh1bWIuaGVpZ2h0ID0gVXRpbHMuY2xhbXAgNzQgLSBAc2Nyb2xsYmFyLnRodW1iLnksIDEyLCBAdGh1bWJIZWlnaHRcblx0XHRcdFx0QHNjcm9sbGJhci50aHVtYi55ID0gNzQgLSAxMiBpZiBAc2Nyb2xsYmFyLnRodW1iLmhlaWdodCA8PSAxMlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAc2Nyb2xsYmFyLnRodW1iLmhlaWdodCA9IEB0aHVtYkhlaWdodFxuXG5cdCMgVXBkYXRlIGNvbnRlbnRcblx0dXBkYXRlQ29udGVudDogPT5cblx0XHRzdXBlclxuXHRcdFxuXHRcdHJldHVybiB1bmxlc3MgQHNjcm9sbGJhclxuXHRcdCNcblx0XHRAdGh1bWJIZWlnaHQgPSBVdGlscy5jbGFtcCAoQHNjcm9sbGJhci5oZWlnaHQgKiBAaGVpZ2h0IC8gQGNvbnRlbnQuZHJhZ2dhYmxlLmNvbnN0cmFpbnRzLmhlaWdodCksIDEyLCA3MyIsIicnJ1xud2F0Y2hPUyA6IE5vdGlmaWNhdGlvblxuXG5AYXV0aGVyIEp1bmdobyBzb25nICh0aHJlZXdvcmQuY29tKVxuQHNpbmNlIDIwMTYuMTEuMjNcbicnJ1xuY2xhc3MgZXhwb3J0cy5Ob3RpZmljYXRpb24gZXh0ZW5kcyBMYXllclxuXG5cdCMgQnV0dG9uXG5cdEJ1dHRvbiA9IHt9XG5cblx0IyBCdXR0b24gOiBTdHlsZVxuXHRCdXR0b24uU3R5bGUgPSB7fVxuXHRCdXR0b24uU3R5bGUuRGVmYXVsdCA9IFwiYnV0dG9uU3R5bGUuZGVmYXVsdFwiXG5cdEJ1dHRvbi5TdHlsZS5EZXN0cnVjdGl2ZSA9IFwiYnV0dG9uU3R5bGUuZGVzdHJ1Y3RpdmVcIlxuXG5cdCMgU3RhdGljXG5cdHRoaXMuQnV0dG9uID0gQnV0dG9uXG5cblx0JycnXG5cdGFwcE5hbWU6IOyVseydtOumhCBbcmVxdWlyZV1cblx0aWNvbjog7JWE7J207L2YIOydtOuvuOyngCDqsr3roZwgW3JlcXVpcmVdXG5cdGFjY2VudENvbG9yOiDrjIDtkZwg7IOJ7IOBIChTaHJvdCBsb29rc+ydmCDslbHsnbTrpoQg7IOJ7IOB7J20IOuQqClcblx0dGl0bGU6IOygnOuqqVxuXHRtZXNzYWdlOiDrgrTsmqlcblx0YXR0YWNoOiDssqjrtoAg64K07JqpIChMYXllcilcblx0c2FzaENvbG9yOiDsg6Tsi5wg7IOJ7IOBIChMb25nIGxvb2tz7J2YIOyDgeuLqCDsg4nsg4EpXG5cdHNhc2hMYWJlbENvbG9yOiDsg6Tsi5zsnZgg7JWx7J2066aEIOyDieyDgSAoTG9uZyBsb29rc+ydmCDsg4Hri6jroIjsnbTruJQg7IOJ7IOBKVxuXHRiZ0NvbG9jOiDrsLDqsr0g7IOJ7IOBIChMb25nIGxvb2tz7J2YIOuwsOqyvSDsg4nsg4EpXG5cdGJ1dHRvbnM6XG5cdFx0bGFiZWw6IFwi7IOB7IS467O06riwXCIgW3JlcXVpcmVdXG5cdFx0c3R5bGU6IEJ1dHRvbi5TdHlsZS5EZWZhdWx0XG5cdFx0YmdDb2xvcjogXCJyZ2JhKDI0MiwyNDQsMjU1LC4xNClcIlxuXHRcdGxhYmVsQ29sb3I6IFwid2hpdGVcIlxuXHRcdGlzSGFwdGljOiBmYWxzZVxuXHQnJydcblx0IyBDb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLm5hbWUgPSBcIk5vdGlmaWNhdGlvblwiXG5cdFx0b3B0aW9ucy53aWR0aCA/PSBEZXZpY2Uud2lkdGhcblx0XHRvcHRpb25zLmhlaWdodCA/PSBEZXZpY2UuaGVpZ2h0XG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gXCJcIlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdG9wdGlvbnMuYnV0dG9ucyA/PSBbXVxuXHRcdG9wdGlvbnMuYXBwTmFtZSA/PSBcIkFwcFwiXG5cdFx0b3B0aW9ucy5pY29uID89IFwiXCJcblx0XHRvcHRpb25zLmFjY2VudENvbG9yID89IFwid2hpdGVcIlxuXHRcdG9wdGlvbnMudGl0bGUgPz0gXCJUaXRsZVwiXG5cdFx0b3B0aW9ucy5tZXNzYWdlID89IFwiTWVzc2FnZVwiXG5cdFx0b3B0aW9ucy5zYXNoQ29sb3IgPz0gXCJyZ2JhKDI1NSwyNTUsMjU1LC4xKVwiXG5cdFx0b3B0aW9ucy5iZ0NvbG9yID89IFwicmdiYSgyNTUsMjU1LDI1NSwuMTQpXCJcblx0XHRvcHRpb25zLnNhc2hMYWJlbENvbG9yID89IFwid2hpdGVcIlxuXHRcdFxuXHRcdHRpdGxlID0gb3B0aW9ucy50aXRsZVxuXHRcdG1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2Vcblx0XHRidXR0b25zID0gb3B0aW9ucy5idXR0b25zXG5cdFx0YXBwTmFtZSA9IG9wdGlvbnMuYXBwTmFtZVxuXHRcdGljb24gPSBvcHRpb25zLmljb25cblx0XHRhY2NlbnRDb2xvciA9IG9wdGlvbnMuYWNjZW50Q29sb3Jcblx0XHRzYXNoQ29sb3IgPSBvcHRpb25zLnNhc2hDb2xvclxuXHRcdGJnQ29sb3IgPSBvcHRpb25zLmJnQ29sb3JcdFxuXHRcdFxuXHRcdCMgYmdcblx0XHRAYmcgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmJnXCJcblx0XHRcdHdpZHRoOiBAd2lkdGgsIGhlaWdodDogQGhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsLjYpXCJcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHBhcmVudDogQFxuXHRcdFV0aWwuYmx1ciBAYmdcblx0XHRcblx0XHQjIFNob3J0IGxvb2tzXG5cdFx0QHNob3J0ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5zaG9ydFwiXG5cdFx0XHR3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XG5cdFx0IyBTaG9ydCBsb29rcyA6IEljb25cblx0XHRAc2hvcnQuaWNvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuc2hvcnQuaWNvblwiXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLnRvcCg0MSlcblx0XHRcdHNpemU6IDE5NlxuXHRcdFx0aW1hZ2U6IGljb25cblx0XHRcdGJvcmRlclJhZGl1czogOThcblx0XHRcdHNoYWRvd1k6IDIsIHNoYWRvd0JsdXI6IDgsIHNoYWRvd0NvbG9yOiBcInJnYmEoMCwwLDAsLjMpXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRwYXJlbnQ6IEBzaG9ydFxuXHRcdFxuXHRcdCMgU2hvcnQgbG9va3MgOiBUaXRsZVxuXHRcdEBzaG9ydC50aXRsZSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuc2hvcnQudGl0bGVcIlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBAc2hvcnQuaWNvbi5tYXhZICsgMThcblx0XHRcdGh0bWw6IHRpdGxlXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0Zm9udFNpemU6IFwiMzhweFwiLCBmb250V2VpZ2h0OiA0MDAsIGxpbmVIZWlnaHQ6IDFcblx0XHRcdFx0bGV0dGVyU3BhY2luZzogXCItMC40MnB4XCJcblx0XHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcblx0XHRcdHBhcmVudDogQHNob3J0XG5cdFx0VXRpbC50ZXh0LmF1dG9TaXplIEBzaG9ydC50aXRsZVxuXHRcdEBzaG9ydC50aXRsZS5jZW50ZXJYKClcblx0XHRcblx0XHQjIFNob3J0IGxvb2tzIDogQXBwIG5hbWVcblx0XHRAc2hvcnQuYXBwTmFtZSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuc2hvcnQuYXBwTmFtZVwiXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEBzaG9ydC50aXRsZS5tYXhZICsgOVxuXHRcdFx0aHRtbDogYXBwTmFtZVxuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdGZvbnRTaXplOiBcIjI4cHhcIiwgZm9udFdlaWdodDogNDAwLCBsaW5lSGVpZ2h0OiAxXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IFwiMC4yMnB4XCJcblx0XHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRcdHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCJcblx0XHRcdGNvbG9yOiBhY2NlbnRDb2xvclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBzaG9ydFxuXHRcdFV0aWwudGV4dC5hdXRvU2l6ZSBAc2hvcnQuYXBwTmFtZVxuXHRcdEBzaG9ydC5hcHBOYW1lLmNlbnRlclgoKVxuXHRcdFxuXHRcdCMgTG9uZiBsb29rc1xuXHRcdEBsb25nID0gbmV3IFNjcm9sbFxuXHRcdFx0bmFtZTogXCIubG9uZ1wiXG5cdFx0XHR3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0Y29udGVudEluc2V0OlxuXHRcdFx0XHR0b3A6IDQyLCBib3R0b206IDE0XG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdEBsb25nLmNvbmZpcm0gPSBuZXcgTGF5ZXJcblx0XHRcdGh0bWw6IFwi7ZmV7J24XCJcblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRmb250V2VpZ2h0OiBcIjQwMFwiXG5cdFx0XHRcdGZvbnRTaXplOiBcIjI0cHhcIlxuXHRcdFx0XHRwYWRkaW5nQm90dG9tOiBcIjI1cHhcIlxuXHRcdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0Y29sb3I6IFwiIzhkOGQ4ZFwiXG5cdFx0XHRwYXJlbnQ6IEBsb25nXG5cdFx0VXRpbC50ZXh0LmF1dG9TaXplIEBsb25nLmNvbmZpcm1cblx0XHRAbG9uZy5jb25maXJtLnByb3BzID0geDogQWxpZ24uY2VudGVyLCB5OiAtKEBsb25nLmNvbnRlbnRJbnNldC50b3AgKyAzMilcblxuXHRcdEBsb25nLmNvbmZpcm0uYmFyID0gbmV3IExheWVyXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbVxuXHRcdFx0d2lkdGg6IDgwLCBoZWlnaHQ6IDVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBAbG9uZy5jb25maXJtXG5cdFx0QGxvbmcuY29uZmlybS5iYXIubGVmdCA9IG5ldyBMYXllclxuXHRcdFx0eDogQWxpZ24ubGVmdCwgeTogQWxpZ24uYm90dG9tXG5cdFx0XHR3aWR0aDogNDMsIGhlaWdodDogNVxuXHRcdFx0b3JpZ2luWDogMCwgb3JpZ2luWTogMFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA1XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiIzhkOGQ4ZFwiXG5cdFx0XHRwYXJlbnQ6IEBsb25nLmNvbmZpcm0uYmFyXG5cdFx0QGxvbmcuY29uZmlybS5iYXIucmlnaHQgPSBuZXcgTGF5ZXJcblx0XHRcdHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi5ib3R0b21cblx0XHRcdHdpZHRoOiA0MywgaGVpZ2h0OiA1XG5cdFx0XHRvcmlnaW5YOiAxLCBvcmlnaW5ZOiAwXG5cdFx0XHRib3JkZXJSYWRpdXM6IDVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjOGQ4ZDhkXCJcblx0XHRcdHBhcmVudDogQGxvbmcuY29uZmlybS5iYXJcblxuXHRcdEBsb25nLmNvbmZpcm0uY2hhbmdlTW9kZSA9IChtb2RlPWZhbHNlKSAtPlxuXHRcdFx0QGlzQ2hhbmdlTW9kZSA9IG1vZGVcblx0XHRcdGNvbG9yID0gaWYgbW9kZSB0aGVuIFwid2hpdGVcIiBlbHNlIFwiIzhkOGQ4ZFwiXG5cdFx0XHRyb3RhdGlvbiA9IGlmIG1vZGUgdGhlbiAxMCBlbHNlIDBcblx0XHRcdG9wdGlvbnMgPSB0aW1lOiAuMTUsIGN1cnZlOiBcInNwcmluZyg1MDAsNTAsMClcIlxuXHRcdFx0QGFuaW1hdGUgY29sb3I6IGNvbG9yLCBvcHRpb25zOiBvcHRpb25zXG5cdFx0XHRAYmFyLmxlZnQuYW5pbWF0ZSByb3RhdGlvbjogcm90YXRpb24sIGJhY2tncm91bmRDb2xvcjogY29sb3IsIG9wdGlvbnM6IG9wdGlvbnNcblx0XHRcdEBiYXIucmlnaHQuYW5pbWF0ZSByb3RhdGlvbjogLXJvdGF0aW9uLGJhY2tncm91bmRDb2xvcjogY29sb3IsIG9wdGlvbnM6IG9wdGlvbnNcblx0XHRcdFxuXHRcdCMgTG9uZiBsb29rcyA6IFRpbWVcblx0XHRAbG9uZy50aW1lID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5sb25nLnRpbWVcIlxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTQpLCB5OiBBbGlnbi50b3AoMSlcblx0XHRcdHdpZHRoOiAxNTAsIGhlaWdodDogMzhcblx0XHRcdGh0bWw6IFV0aWwuZGF0ZS50aW1lRm9ybWF0dGVyIFV0aWwuZGF0ZS5nZXRUaW1lKClcblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRmb250U2l6ZTogXCIzMnB4XCIsIGZvbnRXZWlnaHQ6IDQwMCwgbGluZUhlaWdodDogXCIzOHB4XCJcblx0XHRcdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcblx0XHRcdGNvbG9yOiBcIiNBQkFCQUJcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBsb25nXG5cdFx0XG5cdFx0IyBMb25mIGxvb2tzIDogTWVzc2FnZVxuXHRcdEBsb25nLm1lc3NhZ2UgPSBjcmVhdGVNZXNzYWdlIG9wdGlvbnNcblx0XHRAbG9uZy5tZXNzYWdlLnBhcmVudCA9IEBsb25nLmNvbnRlbnRcblx0XHRcblx0XHQjIEFjdGlvbiBidXR0b25zXG5cdFx0QGxvbmcuYnV0dG9ucyA9IFtdXG5cdFx0IyBDcmVhdGUgYnV0dG9uc1xuXHRcdGlmIGJ1dHRvbnNcblx0XHRcdGZvciBidXR0b24sIGkgaW4gYnV0dG9uc1xuXHRcdFx0XHRhY3Rpb25CdG4gPSBjcmVhdGVBY3Rpb25CdXR0b24gYnV0dG9uXG5cdFx0XHRcdGFjdGlvbkJ0bi55ICs9IEBsb25nLmNvbnRlbnQuY29udGVudEZyYW1lKCkuaGVpZ2h0ICsgOFxuXHRcdFx0XHRAbG9uZy5jb250ZW50LmFkZENoaWxkIGFjdGlvbkJ0blxuXHRcdFx0XHRcblx0XHRcdFx0QGxvbmcuYnV0dG9ucy5wdXNoIGFjdGlvbkJ0blxuXHRcdFx0XHRcblx0XHQjIEJ1dHRvbiA6IENsb3NlXG5cdFx0QGxvbmcuZGlzbWlzc0J0biA9IGNyZWF0ZUFjdGlvbkJ1dHRvbiBsYWJlbDogXCLri6vquLBcIiwgYmdDb2xvcjogXCJyZ2JhKDI0MiwyNDQsMjU1LC4yKVwiXG5cdFx0QGxvbmcuZGlzbWlzc0J0bi55ICs9IEBsb25nLmNvbnRlbnQuY29udGVudEZyYW1lKCkuaGVpZ2h0ICsgMjRcblx0XHRAbG9uZy5jb250ZW50LmFkZENoaWxkIEBsb25nLmRpc21pc3NCdG5cblx0XHRAbG9uZy5idXR0b25zLnB1c2ggQGxvbmcuZGlzbWlzc0J0blxuXHRcdFxuXHRcdCNcblx0XHRAc2hvcnQudmlzaWJsZSA9IHRydWVcblx0XHRAbG9uZy52aXNpYmxlID0gZmFsc2Vcblx0XHRcblx0XHQjIFNob3cgYmFja2dyb3VuZFxuXHRcdEBiZy5zaG93ID0gPT5cblx0XHRcdEBiZy5hbmltYXRlXG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOiAuM1xuXHRcdFx0XHRcdGN1cnZlOiBcImxpbmVhclwiXG5cdFx0IyBEaXNtaXNzIGJhY2tncm91bmRcblx0XHRAYmcuZGlzbWlzcyA9ID0+XHRcblx0XHRcdEBiZy5hbmltYXRlXG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOiAxXG5cdFx0XHRcdFx0Y3VydmU6IFwibGluZWFyXCJcblx0XHRcdFx0XHRkZWxheTogLjJcblx0XHRcdFx0XHRcblx0XHQjIFNob3cgU2hvcnQgbG9va3Ncblx0XHRAc2hvcnQuc2hvdyA9ID0+XG5cdFx0XHRAc2hvcnQueSA9IEBtYXhZXG5cdFx0XHRAc2hvcnQuYW5pbWF0ZSBcblx0XHRcdFx0eTogMFxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdHRpbWU6IDRcblx0XHRcdFx0XHRjdXJ2ZTogXCJzcHJpbmcoMjAwLDIwLDApXCJcblx0XHQjIERpc21pc3MgU2hvcnQgbG9va3Ncblx0XHRAc2hvcnQuZGlzbWlzcyA9ID0+XG5cdFx0XHRAc2hvcnQucmVtb3ZlQ2hpbGQgQHNob3J0Lmljb25cblx0XHRcdEBzaG9ydC5pY29uLnBhcmVudCA9IEBsb25nXG5cdFx0XHRcblx0XHRcdEBzaG9ydC5hbmltYXRlXG5cdFx0XHRcdHk6IEBzaG9ydC55IC0gMjUwXG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOiAuMDdcblx0XHRcdFx0XHRjdXJ2ZTogXCJzcHJpbmcoNTAwLDUwLDApXCJcblx0XHRcdEBzaG9ydC5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsID0+IEBzaG9ydC5kZXN0cm95KClcblx0XHRcdFx0XG5cdFx0XHRAc2hvcnQuaWNvbi5hbmltYXRlXG5cdFx0XHRcdHg6IC0zMiwgeTogLTQ5XG5cdCMgXHRcdFx0eDogMjIsIHk6IDVcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOiAuNFxuXHRcdFx0XHRcdGN1cnZlOiBcInNwcmluZygyMDAsMjAsMClcIlxuXHRcdFx0XHRcdFxuXHRcdFx0QHNob3J0Lmljb24uYW5pbWF0ZVxuXHRcdFx0XHRzY2FsZTogODgvQHNob3J0Lmljb24ud2lkdGhcblx0IyBcdFx0XHR3aWR0aDogODgsIGhlaWdodDogODhcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOiAuNDZcblx0XHRcdFx0XHRjdXJ2ZTogXCJlYXNlLWluLW91dFwiXG5cdFx0XHRcdFx0XG5cdFx0IyBTaG93IExvbmcgbG9va3Ncblx0XHRAbG9uZy5zaG93ID0gPT5cblx0XHRcdEBsb25nLnZpc2libGUgPSB0cnVlXG5cdFx0XHRAbG9uZy5jb250ZW50LnkgPSBAbWF4WVxuXHRcdFx0XG5cdFx0XHRAbG9uZy5jb250ZW50LmFuaW1hdGVcblx0XHRcdFx0eTogQGxvbmcuY29udGVudEluc2V0LnRvcFxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdHRpbWU6IDFcblx0XHRcdFx0XHRjdXJ2ZTogXCJzcHJpbmcoMjAwLDIwLDApXCJcblx0XHRcdFx0XHRcblx0XHRcdEBsb25nLnRpbWUub3BhY2l0eSA9IDBcblx0XHRcdEBsb25nLnRpbWUuYW5pbWF0ZSBcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdHRpbWU6IDFcblx0XHRcdFxuXHRcdFx0IyBFdmVudCA6IEFuaW1hdGlvbiBlbmRcblx0XHRcdEBsb25nLmNvbnRlbnQub25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PlxuXHRcdFx0XHQjIEV2ZW50IDogU2Nyb2xsXG5cdFx0XHRcdEBzaG9ydC5pY29uLnN0YXJ0WSA9IEBzaG9ydC5pY29uLnlcblx0XHRcdFx0QGxvbmcudGltZS5zdGFydFkgPSBAbG9uZy50aW1lLnlcblx0XHRcdFx0QGxvbmcuY29uZmlybS5zdGFydFkgPSBAbG9uZy5jb25maXJtLnlcblx0XHRcdFx0QGxvbmcub25Nb3ZlID0+XG5cdFx0XHRcdFx0cG9zWSA9IEBsb25nLnNjcm9sbFlcblx0XHRcdFx0XHRAc2hvcnQuaWNvbi55ID0gQHNob3J0Lmljb24uc3RhcnRZIC0gcG9zWVxuXG5cdFx0XHRcdFx0IyBwcmludCBwb3NZXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0QGxvbmcudGltZS55ID0gQGxvbmcudGltZS5zdGFydFkgLSBwb3NZXG5cdFx0XHRcdFx0aWYgcG9zWSA8IDAgdGhlbiBAbG9uZy50aW1lLnkgPSBAbG9uZy50aW1lLnN0YXJ0WVxuXHRcdFx0XHRcdEBsb25nLnRpbWUub3BhY2l0eSA9IDEgKyAocG9zWSAvIDQwKVxuXG5cdFx0XHRcdFx0QGxvbmcuY29uZmlybS55ID0gQGxvbmcuY29uZmlybS5zdGFydFkgLSBwb3NZXG5cdFx0XHRcdFx0aWYgQGxvbmcuY29uZmlybS5zdGFydFkgLSBwb3NZIDwgMFxuXHRcdFx0XHRcdFx0QGxvbmcuY29uZmlybS5jaGFuZ2VNb2RlIGZhbHNlXG5cdFx0XHRcdFx0ZWxzZSBcblx0XHRcdFx0XHRcdEBsb25nLmNvbmZpcm0uY2hhbmdlTW9kZSB0cnVlXG5cblx0XHRcdFx0QGxvbmcub25TY3JvbGxFbmQgPT5cblx0XHRcdFx0XHRAY2xvc2UoKSBpZiBAbG9uZy5jb25maXJtLmlzQ2hhbmdlTW9kZVxuXG5cdFx0XHRcdCMgRXZlbnQgOiBBY3Rpb24gYnV0dG9uc1xuXHRcdFx0XHRmb3IgYnV0dG9uIGluIEBsb25nLmJ1dHRvbnNcblx0XHRcdFx0XHRidXR0b24ub25DbGljayA9PiBAZGlzbWlzcygpIFxuXHRcdFxuXHRcdCMgRGlzbWlzcyBMb25nIGxvb2tzXG5cdFx0QGxvbmcuZGlzbWlzcyA9ID0+XG5cdFx0XHRAbG9uZy5hbmltYXRlXG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOiAuM1xuXHRcdFx0XHRcdGN1cnZlOiBcImVhc2VcIlxuXG5cdFx0QGxvbmcuY2xvc2UgPSA9PlxuXHRcdFx0QGxvbmcuY29udGVudC5kcmFnZ2FibGUuYW5pbWF0ZVN0b3AoKVxuXHRcdFx0QGxvbmcuY29udGVudC5hbmltYXRlU3RvcCgpXG5cdFx0XHRAbG9uZy5jb250ZW50LmFuaW1hdGUgeTogQG1heFkgKiAxLjMsIG9wdGlvbnM6IHsgdGltZTogLjE1LCBjdXJ2ZTogXCJzcHJpbmcoNTAwLDUwLDApXCIgfVxuXHRcdFx0XG5cdFx0IyDslYzrprwgXG5cdFx0QHNob3coKVxuXG5cdCMgU2hvd1xuXHRzaG93OiAtPlxuXHRcdEBicmluZ1RvRnJvbnQoKVxuXHRcdEBiZy5zaG93KClcblx0XHRAc2hvcnQuc2hvdygpXG5cdFx0XG5cdFx0VXRpbHMuZGVsYXkgMS4zLCA9PlxuXHRcdFx0QHNob3J0LmRpc21pc3MoKVxuXHRcdFx0QGxvbmcuc2hvdygpXG5cdFx0XHRcblx0IyBEaXNtaXNzXG5cdGRpc21pc3M6IC0+XG5cdFx0QGJnLmRpc21pc3MoKVxuXHRcdEBsb25nLmRpc21pc3MoKVxuXHRcdFxuXHRcdFV0aWxzLmRlbGF5IDEuMywgPT4gQGRlc3Ryb3koKVxuXG5cdCMgQ2xvc2Vcblx0Y2xvc2U6IC0+XG5cdFx0QGJnLmRpc21pc3MoKVxuXHRcdEBsb25nLmNsb3NlKClcblxuXHRcdFV0aWxzLmRlbGF5IC4zLCA9PiBAZGVzdHJveSgpXG5cblx0IyDrsoTtirwg7IOd7ISxIFxuXHRjcmVhdGVBY3Rpb25CdXR0b24gPSAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMubGFiZWwgPz0gXCJBY3Rpb25cIlxuXHRcdG9wdGlvbnMuc3R5bGUgPz0gQnV0dG9uLlN0eWxlLkRlZmF1bHRcblx0XHRvcHRpb25zLmJnQ29sb3IgPz0gXCJyZ2JhKDI0MiwyNDQsMjU1LC4xNClcIlxuXHRcdG9wdGlvbnMubGFiZWxDb2xvciA/PSBcIndoaXRlXCJcblx0XHRvcHRpb25zLmlzSGFwdGljID89IGZhbHNlXG5cdFx0XG5cdFx0bGFiZWwgPSBvcHRpb25zLmxhYmVsXG5cdFx0c3R5bGUgPSBvcHRpb25zLnN0eWxlXG5cdFx0YmdDb2xvciA9IG9wdGlvbnMuYmdDb2xvclxuXHRcdGxhYmVsQ29sb3IgPSBvcHRpb25zLmxhYmVsQ29sb3Jcblx0XHRpc0hhcHRpYyA9IG9wdGlvbnMuaXNIYXB0aWNcblxuXHRcdCMg67KE7Yq8XG5cdFx0YnV0dG9uID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5ub3RpZmljYXRpb24uYnV0dG9uLSN7bGFiZWx9XCJcblx0XHRcdHg6IEFsaWduLmxlZnQoMilcblx0XHRcdHdpZHRoOiAzMDgsIGhlaWdodDogODBcblx0XHRcdGh0bWw6IGxhYmVsXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0Zm9udFNpemU6IFwiMzJweFwiLCBmb250V2VpZ2h0OiA0MDAsIGxpbmVIZWlnaHQ6IFwiODBweFwiXG5cdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0XHRsZXR0ZXJTcGFjaW5nOiBcIi0wLjFweFwiXG5cdFx0XHRjb2xvcjogaWYgc3R5bGUgaXMgQnV0dG9uLlN0eWxlLkRlc3RydWN0aXZlIHRoZW4gXCIjRkYzQjMwXCIgZWxzZSBsYWJlbENvbG9yXG5cdFx0XHRib3JkZXJSYWRpdXM6IDE1XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGJnQ29sb3Jcblx0XHQjIOuyhO2KvCA6IOyDge2DnFxuXHRcdGJ1dHRvbi5zdGF0ZXMgPVxuXHRcdFx0cHJlc3NlZDogXG5cdFx0XHRcdHNjYWxlOiAuOTVcblx0XHRcdFx0b3BhY2l0eTogLjhcblx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOiAuMTVcblx0XHRcdFx0XHRjdXJ2ZTogXCJzcHJpbmcoNTAwLDUwLDApXCJcblx0XHRcdG5vcm1hbDpcblx0XHRcdFx0c2NhbGU6IDFcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHRcdHRpbWU6IC4yMFxuXHRcdFx0XHRcdGN1cnZlOiBcInNwcmluZyg1MDAsNTAsMClcIlxuXHRcdFxuXHRcdCMg67KE7Yq8IO2aqOqzvFxuXHRcdGJ1dHRvbi5vbk1vdXNlRG93biAtPiBAYW5pbWF0ZSBcInByZXNzZWRcIlxuXHRcdGJ1dHRvbi5vbk1vdXNlVXAgLT4gQGFuaW1hdGUgXCJub3JtYWxcIlxuXHRcdGJ1dHRvbi5vbk1vdXNlT3V0IC0+IEBhbmltYXRlIFwibm9ybWFsXCJcblx0XHRidXR0b24ub25UYXAgLT4gRGV2aWNlLnBsYXlIYXB0aWMoKSBpZiBpc0hhcHRpY1xuXHRcdFxuXHRcdHJldHVybiBidXR0b25cblxuXHQjIOuplOyLnOyngCDsg53shLFcblx0Y3JlYXRlTWVzc2FnZSA9IChvcHRpb25zID0ge30pIC0+XG5cdFx0IyDsu6jthZDsuKBcblx0XHRjb250ZW50ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5ub3RpZmljYXRpb24uY29udGVudFwiXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDIpXG5cdFx0XHR3aWR0aDogMzA4LCBoZWlnaHQ6IDIzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcHRpb25zLmJnQ29sb3Jcblx0XHRcdGJvcmRlclJhZGl1czogMTVcblx0XHRcdFxuXHRcdCMg7Zek642UXG5cdFx0Y29udGVudC5oZWFkZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmhlYWRlclwiXG5cdFx0XHR3aWR0aDogY29udGVudC53aWR0aCwgaGVpZ2h0OiA2MFxuXHRcdFx0aHRtbDogb3B0aW9ucy5hcHBOYW1lXG5cdFx0XHRzdHlsZTogXG5cdFx0XHRcdGZvbnRTaXplOiBcIjI4cHhcIiwgZm9udFdlaWdodDogNDAwLCBsaW5lSGVpZ2h0OiBcIjM0cHhcIlxuXHRcdFx0XHRsZXR0ZXJTcGFjaW5nOiBcIjAuNXB4XCJcblx0XHRcdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcblx0XHRcdFx0cGFkZGluZzogXCIxMnB4IDIxcHggMTRweCAwcHhcIlxuXHRcdFx0XHR0ZXh0VHJhbnNmb3JtOiBcInVwcGVyY2FzZVwiXG5cdFx0XHRcdGJvcmRlclJhZGl1czogXCIxNXB4IDE1cHggMHB4IDBweFwiXG5cdFx0XHRjb2xvcjogb3B0aW9ucy5zYXNoTGFiZWxDb2xvclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcHRpb25zLnNhc2hDb2xvclxuXHRcdFx0cGFyZW50OiBjb250ZW50XG5cdFx0XG5cdFx0IyDtg4DsnbTti4Bcblx0XHRjb250ZW50LnRpdGxlID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi50aXRsZVwiXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDE1KSwgeTogY29udGVudC5oZWFkZXIubWF4WSArIDI1XG5cdFx0XHR3aWR0aDogMjc4XG5cdFx0XHRodG1sOiBvcHRpb25zLnRpdGxlXG5cdFx0XHRzdHlsZTogZm9udFNpemU6IFwiMzJweFwiLCBmb250V2VpZ2h0OiA2MDAsIGxpbmVIZWlnaHQ6IDFcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBjb250ZW50XG5cdFx0VXRpbC50ZXh0LmF1dG9TaXplIGNvbnRlbnQudGl0bGUsIHt9LCB7IHdpZHRoOiBjb250ZW50LnRpdGxlLndpZHRoIH1cblx0XHRcblx0XHQjIOuplOyLnOyngFxuXHRcdGNvbnRlbnQubWVzc2FnZSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIubWVzc2FnZVwiXG5cdFx0XHR4OiBjb250ZW50LnRpdGxlLm1pblgsIHk6IGNvbnRlbnQudGl0bGUubWF4WSArIDJcblx0XHRcdHdpZHRoOiBjb250ZW50LnRpdGxlLndpZHRoXG5cdFx0XHRodG1sOiBvcHRpb25zLm1lc3NhZ2Vcblx0XHRcdHN0eWxlOiBcblx0XHRcdFx0Zm9udFNpemU6IFwiMzJweFwiLCBmb250V2VpZ2h0OiA0MDAsIGxpbmVIZWlnaHQ6IFwiMzdweFwiXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IFwiLTAuMnB4XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBjb250ZW50XG5cdFx0VXRpbC50ZXh0LmF1dG9TaXplIGNvbnRlbnQubWVzc2FnZSwge30sIHsgd2lkdGg6IGNvbnRlbnQubWVzc2FnZS53aWR0aCB9XG5cblx0XHQjIOy2lOqwgOuCtOyaqVxuXHRcdGlmIG9wdGlvbnMuYXR0YWNoXG5cdFx0XHRjb250ZW50LmF0dGFjaCA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiBcIi5hdHRhY2hcIlxuXHRcdFx0XHR4OiBjb250ZW50Lm1lc3NhZ2UueCwgeTogY29udGVudC5tZXNzYWdlLm1heFkgKyAyXG5cdFx0XHRcdHdpZHRoOiBjb250ZW50Lm1lc3NhZ2Uud2lkdGhcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRcdHBhcmVudDogY29udGVudFxuXHRcdFx0Y29udGVudC5hdHRhY2guYWRkQ2hpbGQgb3B0aW9ucy5hdHRhY2hcblx0XHRcdG9wdGlvbnMuYXR0YWNoLnBvaW50ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRjb250ZW50LmF0dGFjaC5oZWlnaHQgPSBjb250ZW50LmF0dGFjaC5jb250ZW50RnJhbWUoKS55ICsgY29udGVudC5hdHRhY2guY29udGVudEZyYW1lKCkuaGVpZ2h0XG5cdFx0XG5cdFx0IyDsu6jthZDsuKAg64aS7J20IOyhsOyglSA6IO2VmOuLqCDsl6zrsLEg7LaU6rCAXG5cdFx0Y29udGVudC5oZWlnaHQgPSBjb250ZW50LmNvbnRlbnRGcmFtZSgpLmhlaWdodCArIDMzXG5cdFx0XG5cdFx0cmV0dXJuIGNvbnRlbnQiLCInJydcbndhdGNoT1MgOiBEb2Nrc1xuXG5AYXV0aGVyIEp1bmdobyBzb25nICh0aHJlZXdvcmQuY29tKVxuQHNpbmNlIDIwMTYuMTEuMjNcbicnJ1xuY2xhc3MgZXhwb3J0cy5Eb2NrcyBleHRlbmRzIExheWVyXG5cblx0IyBCYXNpYyBhcHBzXG5cdGFwcHNJbmZvID0gW1xuXHRcdHsgbmFtZTogXCLrqZTsi5zsp4BcIiwgaWNvbjogXCJpbWFnZXMvaWNfbWVzc2FnZXMucG5nXCIsIGltYWdlOiBcImltYWdlcy9tZXNzYWdlcy5wbmdcIiB9XG5cdFx0eyBuYW1lOiBcIuy6mOumsOuNlFwiLCBpY29uOiBcImltYWdlcy9pY19jYWxlbmRhci5wbmdcIiwgaW1hZ2U6IFwiaW1hZ2VzL2NhbGVuZGFyLnBuZ1wiIH1cblx0XHR7IG5hbWU6IFwi7YOA7J2066i4XCIsIGljb246IFwiaW1hZ2VzL2ljX3N0b3B3YXRjaC5wbmdcIiwgaW1hZ2U6IFwiaW1hZ2VzL3N0b3B3YXRjaC5wbmdcIiB9XG5cdFx0eyBuYW1lOiBcIuyngOuPhFwiLCBpY29uOiBcImltYWdlcy9pY19tYXBzLnBuZ1wiLCBpbWFnZTogXCJpbWFnZXMvbWFwcy5wbmdcIiB9XG5cdFx0eyBuYW1lOiBcIuyatOuPmVwiLCBpY29uOiBcImltYWdlcy9pY193b3Jrb3V0LnBuZ1wiLCBpbWFnZTogXCJpbWFnZXMvd29ya291dC5wbmdcIiB9XG5cdFx0eyBuYW1lOiBcIuuCoOyUqFwiLCBpY29uOiBcImltYWdlcy9pY193ZWF0aGVyLnBuZ1wiLCBpbWFnZTogXCJpbWFnZXMvd2VhdGhlci5wbmdcIiB9XG5cdFx0eyBuYW1lOiBcIuydjOyVhVwiLCBpY29uOiBcImltYWdlcy9pY19tdXNpYy5wbmdcIiwgaW1hZ2U6IFwiaW1hZ2VzL211c2ljLnBuZ1wiIH1cblx0XVxuXHRcdFxuXHQjIENvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMubmFtZSA9IFwiRG9ja3NcIlxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDI1NSwyNTUsMjU1LC4yKVwiXG5cdFx0b3B0aW9ucy5vcGFjaXR5ID0gMFxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdCNcblx0XHRVdGlsLmJsdXIgQFxuXHRcdEBvbkNsaWNrIC0+IGNvbnNvbGUubG9nIFwiYmxvY2tcIlxuXHRcdEBzZW5kVG9CYWNrKClcblx0XHRcblx0XHQjIFBhZ2VcdFxuXHRcdEBwYWdlID0gbmV3IFBhZ2VDb21wb25lbnRcblx0XHRcdG5hbWU6IFwicGFnZVwiXG5cdFx0XHR3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiBmYWxzZVxuXHRcdFx0Y2xpcDogZmFsc2Vcblx0XHRcdHBhcmVudDogQFxuXHRcdFxuXHRcdCMgUGFnZSA6IEluZGljYXRvclxuXHRcdEBwYWdlLmluZGljYXRvciA9IG5ldyBJbmRpY2F0b3IgcGFnZTogQHBhZ2VcblxuXHRcdCMgUGFnZSA6IERvY2tcblx0XHRmb3IgYXBwSW5mbyBpbiBhcHBzSW5mb1xuXHRcdFx0ZG9jayA9IG5ldyBEb2NrIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogQGhlaWdodCwgaW5mbzogYXBwSW5mb1xuXHRcdFx0QHBhZ2UuYWRkUGFnZSBkb2NrXG5cdFx0XHRkb2NrLm9uQ2xpY2sgPT4gQHNlbGVjdGVkKClcblxuXHRcdCMgUGFnZSA6IExhYmVsXG5cdFx0QHBhZ2UubGFiZWwgPSBuZXcgTGFiZWxcdHBhZ2U6IEBwYWdlXG5cdFx0XG5cdFx0IyDquLDrs7gg7Y6Y7J207KeAIDog7LKr67KI7Ke4XG5cdFx0QHBhZ2Uuc25hcFRvUGFnZSBAcGFnZS5jb250ZW50LmNoaWxkcmVuWzBdLCBmYWxzZVxuXHRcdFxuXHQjIFNob3dcblx0c2hvdzogLT5cblx0XHRAYW5pbWF0ZVN0b3AoKVxuXHRcdEBicmluZ1RvRnJvbnQoKVxuXHRcdEBvcGFjaXR5ID0gMVxuXHRcdEBwYWdlLmFuaW1hdGUgeTogNSwgc2NhbGU6IDI4MSAvIEBoZWlnaHRcblxuXHRcdHBhZ2Uuc2hvdygpIGZvciBwYWdlLCBpIGluIEBwYWdlLmNvbnRlbnQuY2hpbGRyZW5cblxuXHQjIERpc21pc3Ncblx0ZGlzbWlzczogKGZvcmNlQ2xvc2UgPSBmYWxzZSkgLT5cblx0XHRyZXR1cm4gaWYgQGlzQW5pbWF0aW5nXG5cblx0XHQjIEZvcmNlIGNsb3NlXG5cdFx0aWYgZm9yY2VDbG9zZSB0aGVuIEBjbG9zZSgpXG5cdFx0ZWxzZVxuXHRcdFx0IyBFeGlzdCBzZWxlY3QgZG9ja1xuXHRcdFx0aWYgQHNlbGVjdERvY2tcblx0XHRcdFx0IyBTZWxlY3QgbW9kZVxuXHRcdFx0XHRpZiBAcGFnZS5zY2FsZSBpcyAxIHRoZW4gQHNob3coKVxuXHRcdFx0XHQjIFNlbGVjdGVkXG5cdFx0XHRcdGVsc2UgQHNlbGVjdGVkKClcblx0XHRcdGVsc2Vcblx0XHRcdFx0IyBFeHNpdCByZWNlbnQgZG9ja1xuXHRcdFx0XHRpZiBAcmVjZW50RG9ja1xuXHRcdFx0XHRcdCMgQ3VycmVudCBwYWdlIGlzIHJlY2VudCBkb2NrXG5cdFx0XHRcdFx0aWYgQHBhZ2UuY3VycmVudFBhZ2UgaXMgQHJlY2VudERvY2sgdGhlbiBAc2VsZWN0ZWQoKVxuXHRcdFx0XHRcdGVsc2UgXG5cdFx0XHRcdFx0XHRAcGFnZS5zbmFwVG9QYWdlIEByZWNlbnREb2NrLCB0cnVlLCB0aW1lOiAuMTVcblx0XHRcdFx0XHRcdEBwYWdlLmNvbnRlbnQub25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PiBAc2VsZWN0ZWQoKVxuXHRcdFx0XHRlbHNlIEBjbG9zZSgpXG5cblx0IyBDbG9zZVxuXHRjbG9zZTogLT5cblx0XHRAYW5pbWF0ZSBvcGFjaXR5OiAwXG5cdFx0QHBhZ2UuYW5pbWF0ZSB5OiAwLCBzY2FsZTogMVxuXG5cdFx0cGFnZS5kZWZhdWx0KCkgZm9yIHBhZ2UsIGkgaW4gQHBhZ2UuY29udGVudC5jaGlsZHJlblxuXHRcdFxuXHRcdEBvbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsIC0+IFxuXHRcdFx0QHNlbmRUb0JhY2soKSBpZiBAb3BhY2l0eSBpcyAwXG5cblx0XHRAc2VsZWN0RG9jayA9IHVuZGVmaW5lZFxuXHRcdFx0XHRcblx0IyBTZWxlY3RlZFx0XG5cdHNlbGVjdGVkOiAtPlxuXHRcdHJldHVybiBpZiBAcGFnZS5pc0FuaW1hdGluZ1xuXG5cdFx0QHBhZ2UuYW5pbWF0ZSB5OiAwLCBzY2FsZTogMVxuXHRcdEBzZWxlY3REb2NrID0gQHBhZ2UuY3VycmVudFBhZ2Vcblx0XHRAc2VsZWN0RG9jay5zZWxlY3RlZCgpXG5cblx0XHQjIEV4c2l0IHJlY2VudCBkb2NrXG5cdFx0aWYgQHJlY2VudERvY2sgYW5kIEBzZWxlY3REb2NrIGlzIEByZWNlbnREb2NrXG5cdFx0XHRAcGFnZS5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsID0+XG5cdFx0XHRcdEBzZW5kVG9CYWNrKClcblx0XHRcdFx0QHJlbW92ZURvY2sgQHJlY2VudERvY2tcblx0XHRcdFx0QHJlY2VudERvY2sgPSB1bmRlZmluZWRcblxuXHQjIEFkZCByZWNlbnQgZG9ja1xuXHRhZGRSZWNlbnREb2NrOiAoYXBwSW5mbykgLT5cblx0XHRpZiBAcmVjZW50RG9jayB0aGVuIEByZWNlbnREb2NrLmFkZENvbnRlbnQgYXBwSW5mby5hcHBcblx0XHRlbHNlXG5cdFx0XHRAcmVjZW50RG9jayA9IG5ldyBEb2NrIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogQGhlaWdodCwgaW5mbzogYXBwSW5mb1xuXHRcdFx0QHBhZ2UuYWRkUGFnZSBAcmVjZW50RG9ja1xuXHRcdFx0QHJlY2VudERvY2sub25DbGljayAoZXZlbnQpID0+IEBzZWxlY3RlZCgpXG5cdFx0XHRcdFxuXHRcdEBwYWdlLnNuYXBUb1BhZ2UgQHJlY2VudERvY2ssIGZhbHNlXG5cdFx0QHNob3coKVxuXG5cdCMgUmVtb3ZlIGRvY2tcblx0cmVtb3ZlRG9jazogKGxheWVyKSAtPlxuXHRcdEBwYWdlLmNvbnRlbnQucmVtb3ZlQ2hpbGQgbGF5ZXJcblx0XHRAcGFnZS51cGRhdGVDb250ZW50KClcblxuXHRcdCMgU25hcCBsYXN0IGRvY2tcblx0XHRAcGFnZS5zbmFwVG9QYWdlIEBwYWdlLmNvbnRlbnQuY2hpbGRyZW5bXy5zaXplKEBwYWdlLmNvbnRlbnQuY2hpbGRyZW4pIC0gMV0sIGZhbHNlXG5cblx0XHQjIFVwZGF0ZSBsYWJlbFxuXHRcdEBwYWdlLmxhYmVsLnVwZGF0ZUNvbnRlbnQoKVxuXHRcdCMgVXBkYXRlIGluZGljYXRvclxuXHRcdEBwYWdlLmluZGljYXRvci51cGRhdGVDb250ZW50KClcblx0XHRcblxuIyBMYWJlbFxuY2xhc3MgTGFiZWwgZXh0ZW5kcyBMYXllclxuXHQjIENvbnN0dXJjdG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMubmFtZSA/PSBcImxhYmVsXCJcblx0XHRvcHRpb25zLmh0bWwgPz0gXCLrqZTsi5zsp4BcIlxuXHRcdG9wdGlvbnMuc3R5bGUgPSBcblx0XHRcdGZvbnRTaXplOiBcIjQxcHhcIiwgZm9udFdlaWdodDogXCI0MDBcIlxuXHRcdFx0bGluZUhlaWdodDogXCIxXCJcblx0XHRcdHBhZGRpbmdMZWZ0OiBcIjcycHhcIlxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IFwiXCJcblx0XHRvcHRpb25zLnBhcmVudCA9IG9wdGlvbnMucGFnZVxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBwYWdlID0gb3B0aW9ucy5wYWdlXG5cblx0XHRVdGlsLnRleHQuYXV0b1NpemUgQFxuXHRcdEBwcm9wcyA9IHg6IEFsaWduLmNlbnRlciwgbWF4WTogLTkuN1xuXG5cdFx0IyBJY29uXG5cdFx0QGljb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmljb25cIlxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRzaXplOiA1OC4zXG5cdFx0XHRib3JkZXJSYWRpdXM6IDMwXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdCMgRXZlbnRzXG5cdFx0QHBhZ2Uub24gXCJjaGFuZ2U6Y3VycmVudFBhZ2VcIiwgPT4gQHVwZGF0ZUNvbnRlbnQoKVxuXG5cdFx0I1xuXHRcdEB1cGRhdGVDb250ZW50KClcblx0XG5cdCMgVXBkYXRlXHRcblx0dXBkYXRlQ29udGVudDogLT5cblx0XHRjdXJyZW50UGFnZSA9IEBwYWdlLmN1cnJlbnRQYWdlXG5cblx0XHRAaHRtbCA9IGN1cnJlbnRQYWdlLm5hbWVcblx0XHRVdGlsLnRleHQuYXV0b1NpemUgQFxuXHRcdEBjZW50ZXJYKClcblx0XHRAaWNvbi5pbWFnZSA9IGN1cnJlbnRQYWdlLmljb25cblxuIyBJbmRpY2F0b3JcbmNsYXNzIEluZGljYXRvciBleHRlbmRzIExheWVyXG5cdCMgQ29uc3RydWN0b3Jcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy5uYW1lID0gXCJJbmRpY2F0b3JcIlxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID0gXCJcIlxuXHRcdG9wdGlvbnMucGFyZW50ID0gb3B0aW9ucy5wYWdlXG5cdFx0b3B0aW9ucy55ID89IG9wdGlvbnMucGFnZS5tYXhZICsgMjJcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAcGFnZSA9IG9wdGlvbnMucGFnZVxuXG5cdFx0QHBhZ2Uub24gXCJjaGFuZ2U6Y3VycmVudFBhZ2VcIiwgPT4gQGNoYW5nZURvdFN0YXRlKClcdFx0XHRcblx0XHRAcGFnZS5jb250ZW50Lm9uIFwiY2hhbmdlOmNoaWxkcmVuXCIsID0+IEB1cGRhdGVDb250ZW50KClcblx0XG5cdCMgVXBkYXRlXG5cdHVwZGF0ZUNvbnRlbnQ6IC0+XG5cdFx0Y2hpbGQuZGVzdHJveSgpIGZvciBjaGlsZCBpbiBAY2hpbGRyZW5cblx0XHRmb3IgY2hpbGQsIGkgaW4gQHBhZ2UuY29udGVudC5jaGlsZHJlblxuXHRcdFx0ZG90ID0gY3JlYXRlRG90KClcblx0XHRcdGRvdC54ICs9IEBjb250ZW50RnJhbWUoKS53aWR0aCArIDggdW5sZXNzIGkgaXMgMFxuXHRcdFx0QGFkZENoaWxkIGRvdFxuXG5cdFx0QHNpemUgPSBAY29udGVudEZyYW1lKClcblx0XHRAcHJvcHMgPSB4OiBBbGlnbi5jZW50ZXIoKVxuXG5cdFx0QGNoYW5nZURvdFN0YXRlIGZhbHNlXG5cblx0IyBDaGFuZ2UgZG90IHN0YXRlXG5cdGNoYW5nZURvdFN0YXRlOiAoYW5pbWF0ZT10cnVlKSAtPlxuXHRcdGN1cnJlbnRQYWdlID0gQHBhZ2UuY3VycmVudFBhZ2Vcblx0XHRwYWdlSW5kZXggPSBAcGFnZS5ob3Jpem9udGFsUGFnZUluZGV4IGN1cnJlbnRQYWdlXG5cblx0XHRpZiBhbmltYXRlXG5cdFx0XHRmb3IgZG90LCBpIGluIEBjaGlsZHJlblxuXHRcdFx0XHRkb3QuYW5pbWF0ZSBpZiBpIGlzIHBhZ2VJbmRleCB0aGVuIFwic2VsZWN0ZWRcIiBlbHNlIFwibm9ybWFsXCJcblx0XHRlbHNlIFxuXHRcdFx0Zm9yIGRvdCwgaSBpbiBAY2hpbGRyZW5cblx0XHRcdFx0ZG90LnN0YXRlU3dpdGNoIGlmIGkgaXMgcGFnZUluZGV4IHRoZW4gXCJzZWxlY3RlZFwiIGVsc2UgXCJub3JtYWxcIlxuXG5cdCMgQ3JlYXRlIGRvdFx0XG5cdGNyZWF0ZURvdCA9IChvcHRpb25zPXt9KSAtPlxuXHRcdGRvdCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuaW5kaWNhdG9yLmRvdFwiXG5cdFx0XHRzaXplOiAxMy44Nzlcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRvcGFjaXR5OiAuMzVcblx0XHRcdGJvcmRlclJhZGl1czogMTBcblxuXHRcdGRvdC5zdGF0ZXMgPVxuXHRcdFx0c2VsZWN0ZWQ6IHNjYWxlOiAxLjIsIG9wYWNpdHk6IDEsIG9wdGlvbnM6IHsgdGltZTogLjE1IH1cblx0XHRcdG5vcm1hbDogc2NhbGU6IDEsIG9wYWNpdHk6IC4zNSwgb3B0aW9uczogeyB0aW1lOiAuMiB9XG5cdFx0XHRcblx0XHRyZXR1cm4gZG90XG5cbiMgRG9jayBhcHBzXG5jbGFzcyBEb2NrIGV4dGVuZHMgTGF5ZXJcblx0IyBDb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IFwiYmxhY2tcIlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdCNcblx0XHRAaW5mbyA9IG9wdGlvbnMuaW5mb1xuXHRcdEBuYW1lID0gQGluZm8ubmFtZVxuXHRcdEBpY29uID0gQGluZm8uaWNvblxuXG5cdFx0IyBDb250ZW50c1xuXHRcdEBjb250ZW50ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5jb250ZW50XCJcblx0XHRcdHdpZHRoOiBAd2lkdGgsIGhlaWdodDogQGhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRjbGlwOiB0cnVlXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdGlmIEBpbmZvLmltYWdlXG5cdFx0XHRAY29udGVudC5pbWFnZSA9IEBpbmZvLmltYWdlXG5cdFx0XHRAY29udGVudC50aW1lID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6IFwiLmNvbnRlbnQudGltZVwiXG5cdFx0XHRcdHk6IDNcblx0XHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAzOFxuXHRcdFx0XHRodG1sOiBVdGlsLmRhdGUudGltZUZvcm1hdHRlciBVdGlsLmRhdGUuZ2V0VGltZSgpXG5cdFx0XHRcdHN0eWxlOiBcblx0XHRcdFx0XHRmb250U2l6ZTogXCIzMnB4XCIsIGZvbnRXZWlnaHQ6IFwiNjAwXCJcblx0XHRcdFx0XHRsaW5lSGVpZ2h0OiBcIjM4cHhcIlxuXHRcdFx0XHRcdHRleHRBbGlnbjogXCJyaWdodFwiXG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRcdHBhcmVudDogQGNvbnRlbnRcblxuXHRcdGlmIEBpbmZvLmFwcFxuXHRcdFx0QGFkZENvbnRlbnRcdEBpbmZvLmFwcFxuXG5cdCMgQWRkIGNvbnRlbnRcblx0YWRkQ29udGVudDogKGxheWVyKSAtPiBcblx0XHRAY29udGVudC5hZGRDaGlsZCBsYXllclxuXHRcdGNoaWxkLmlnbm9yZUV2ZW50cyA9IHRydWUgZm9yIGNoaWxkIGluIGxheWVyLmRlc2NlbmRhbnRzXG5cblx0cmVtb3ZlQ29udGVudDogKGxheWVyKSAtPlxuXHRcdEBjb250ZW50LnJlbW92ZUNoaWxkIGxheWVyXG5cdFx0Y2hpbGQuaWdub3JlRXZlbnRzID0gZmFsc2UgZm9yIGNoaWxkIGluIGxheWVyLmRlc2NlbmRhbnRzXG5cdFx0XG5cdCMgU2hvd1xuXHRzaG93OiAtPiBcblx0XHRAYW5pbWF0ZSBzY2FsZTogMjY1IC8gMjgxLCBib3JkZXJSYWRpdXM6IDE1LCBvcHRpb25zOiB7IHRpbWU6IC4xNSB9XG5cdFx0QGNvbnRlbnQuYW5pbWF0ZSBzY2FsZTogMjM3IC8gMjY1LCBvcHRpb25zOiB7IHRpbWU6IC4xNSB9XG5cblx0XHRpZiBAaW5mby5pbWFnZVxuXHRcdFx0QGNvbnRlbnQudGltZS5hbmltYXRlIG9wYWNpdHk6IDAsIG9wdGlvbnM6IHsgdGltZTogLjIwLCBkZWxheTogLjMgfVxuXG5cdFx0QGluZm8uYXBwLnRvRG9jaygpIGlmIEBpbmZvLmFwcFxuXG5cdCMgRGVmYXVsdFxuXHRkZWZhdWx0OiAtPiBcblx0XHRAYW5pbWF0ZSBzY2FsZTogMSwgYm9yZGVyUmFkaXVzOiAwLCBvcHRpb25zOiB7IHRpbWU6IC4yNSB9XG5cdFx0QGNvbnRlbnQuYW5pbWF0ZSBzY2FsZTogMSwgb3B0aW9uczogeyB0aW1lOiAuMjUgfVxuXG5cdCMgU2VsZWN0ZWRcblx0c2VsZWN0ZWQ6IC0+XG5cdFx0QGRlZmF1bHQoKVxuXHRcdFxuXHRcdGlmIEBpbmZvLmltYWdlXG5cdFx0XHRAY29udGVudC50aW1lLmh0bWwgPSBVdGlsLmRhdGUudGltZUZvcm1hdHRlciBVdGlsLmRhdGUuZ2V0VGltZSgpXG5cdFx0XHRAY29udGVudC50aW1lLmFuaW1hdGUgb3BhY2l0eTogMSwgb3B0aW9uczogeyB0aW1lOiAuMTUsIGRlbGF5OiAuMiB9XG5cblx0XHRpZiBAaW5mby5hcHBcblx0XHRcdEBjb250ZW50Lm9uY2UgRXZlbnRzLkFuaW1hdGlvbkVuZCwgPT5cblx0XHRcdFx0QGluZm8uYXBwLmZyb21Eb2NrKClcblx0XHRcdFx0QHJlbW92ZUNvbnRlbnQgQGluZm8uYXBwXG5cdFx0XHRcdEBkZXN0cm95KCkiLCInJydcbndhdGNoT1MgOiBEZXZpY2VcblxuQGF1dGhlciBKdW5naG8gc29uZyAodGhyZWV3b3JkLmNvbSlcbkBzaW5jZSAyMDE2LjExLjIzXG4nJydcbmNsYXNzIGV4cG9ydHMuRGV2aWNlIGV4dGVuZHMgRnJhbWVyLkJhc2VDbGFzc1xuXG5cdCMgRXZlbnRzIGRlZmluZWRcblx0RXZlbnRzLkRpZ2l0YWxDcm93biA9ICdkaWdpdGFsQ3Jvd24nXG5cdEV2ZW50cy5TaWRlID0gJ3NpZGUnXG5cblx0IyBIYXB0aWMgdHlwZVxuXHRIYXB0aWNUeXBlID0gXG5cdFx0Tm90aWZpY2F0aW9uOiBcImhhcHRpY3Mtbm90aWZpY2F0aW9uXCJcblx0XHREaXJlY3Rpb25VcDogXCJoYXB0aWNzLWRpcmVjdGlvblVwXCJcblx0XHREaXJlY3Rpb25Eb3duOiBcImhhcHRpY3MtZGlyZWN0aW9uRG93blwiXG5cdFx0U3VjY2VzczogXCJoYXB0aWNzLXN1Y2Nlc3NcIlxuXHRcdEZhaWx1cmU6IFwiaGFwdGljcy1mYWlsdXJlXCJcblx0XHRSZXRyeTogXCJoYXB0aWNzLXJldHJ5XCJcblx0XHRTdGFydDogXCJoYXB0aWNzLXN0YXJ0XCJcblx0XHRTdG9wOiBcImhhcHRpY3Mtc3RvcFwiXG5cdFx0Q2xpY2s6IFwiaGFwdGljcy1jbGlja1wiXG5cblx0QGRlZmluZSBcIkhhcHRpY1R5cGVcIiwgQHNpbXBsZVByb3BlcnR5KFwiSGFwdGljVHlwZVwiLCBIYXB0aWNUeXBlKVxuXG5cdCMgdGhpcy5IYXB0aWNUeXBlID0gSGFwdGljVHlwZVxuXG5cdCMgRGV2aWNlIDogQXBwbGUgV2F0Y2ggNDJtbVxuXHRAZGVmaW5lIFwid2lkdGhcIiwgQHNpbXBsZVByb3BlcnR5KFwid2lkdGhcIiwgMzEyKVxuXHRAZGVmaW5lIFwiaGVpZ2h0XCIsIEBzaW1wbGVQcm9wZXJ0eShcImhlaWdodFwiLCAzOTApXG5cdEBkZWZpbmUgXCJyYXRpb1wiLCBAc2ltcGxlUHJvcGVydHkoXCJyYXRpb1wiLCB1bmRlZmluZWQpXG5cblx0IyBDb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHQjXG5cdFx0QHJhdGlvID0gU2NyZWVuLndpZHRoIC8gQHdpZHRoXG5cdFx0RnJhbWVyLkRldmljZS5jb250ZW50U2NhbGUgPSBAcmF0aW9cblxuXHRcdCMgUGh5Y2hpY2FsXG5cdFx0aWYgRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlLmluZGV4T2YoXCJ3YXRjaFwiKSBpc250IC0xXG5cdFx0XHR4OyB5XG5cdFx0XHRpZiBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUuaW5kZXhPZihcIjM4bW1cIikgaXNudCAtMVxuXHRcdFx0XHR4ID0gLTU7IHkgPSA4OFxuXHRcdFx0ZWxzZSBpZiBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUuaW5kZXhPZihcIjQybW1cIikgaXNudCAtMVxuXHRcdFx0XHR4ID0gNTsgeSA9IDEwMFxuXHRcdFx0XHRcdFxuXHRcdFx0IyBEaWdpdGFsIENyb3duXG5cdFx0XHRAZGlnaXRhbENyb3duID0gbmV3IExheWVyXG5cdFx0XHRcdG5hbWU6IFwiRGlnaXRhbENyb3duXCJcblx0XHRcdFx0eDogQWxpZ24ucmlnaHQoeCksIHk6IEFsaWduLmNlbnRlcigteSlcblx0XHRcdFx0d2lkdGg6IDUwLCBoZWlnaHQ6IDEwMFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMCwwLDApXCJcblx0XHRcdFx0cGFyZW50OiBGcmFtZXIuRGV2aWNlLnBob25lXG5cdFx0XHRcdFxuXHRcdFx0IyBTaWRlIGJ1dHRvblxuXHRcdFx0QHNpZGUgPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogXCJTaWRlXCJcblx0XHRcdFx0eDogQWxpZ24ucmlnaHQoeC0xMyksIHk6IEFsaWduLmNlbnRlcih5LTIwKVxuXHRcdFx0XHR3aWR0aDogMzIsIGhlaWdodDogMTUwXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwwLDAsMClcIlxuXHRcdFx0XHRwYXJlbnQ6IEZyYW1lci5EZXZpY2UucGhvbmVcblxuXHRcdFx0aWYgVXRpbHMuaXNEZXNrdG9wKCkgYW5kIG5vdCBVdGlscy5pc0xvY2FsVXJsKGRvY3VtZW50LlVSTClcblx0XHRcdFx0QGRpZ2l0YWxDcm93bi5ndWlkZSA9IGNyZWF0ZUd1aWRlIGh0bWw6IFwiRGlnaXRhbCBDcm93blwiLCBwYXJlbnQ6IEBkaWdpdGFsQ3Jvd25cblx0XHRcdFx0QHNpZGUuZ3VpZGUgPSBjcmVhdGVHdWlkZSBodG1sOiBcIlNpZGUgQnV0dG9uXCIsIHBhcmVudDogQHNpZGVcblx0XHRcdFx0XG5cdFx0XHQjIOydtOuypO2KuFxuXHRcdFx0QGRpZ2l0YWxDcm93bi5vbkNsaWNrIC0+IEBlbWl0IEV2ZW50cy5EaWdpdGFsQ3Jvd24sIEBcblx0XHRcdEBzaWRlLm9uQ2xpY2sgLT4gQGVtaXQgRXZlbnRzLlNpZGUsIEBcblxuXHRjcmVhdGVHdWlkZSA9IChvcHRpb25zID0ge30pLT5cblx0XHRndWlkZSA9IG5ldyBMYXllciBfLmV4dGVuZCBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCIuZ3VpZGVcIlxuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdGZvbnRXZWlnaHQ6IFwiNDAwXCJcblx0XHRcdFx0Zm9udFNpemU6IFwiMjVweFwiXG5cdFx0XHRcdHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCJcblx0XHRcdFx0bGV0dGVyU3BhY2luZzogXCItMS41cHhcIlxuXHRcdFx0XHRwYWRkaW5nTGVmdDogXCIzMHB4XCJcblx0XHRcdGNvbG9yOiBcImdyYXlcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0VXRpbC50ZXh0LmF1dG9TaXplIGd1aWRlXG5cdFx0Z3VpZGUucHJvcHMgPSB4OiBndWlkZS5wYXJlbnQud2lkdGggKyAxMCwgeTogQWxpZ24uY2VudGVyXG5cblx0XHRhcnJvdyA9IG5ldyBMYXllciBcblx0XHRcdG5hbWU6IFwiLmFycm93XCJcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0c2l6ZTogMTZcblx0XHRcdHJvdGF0aW9uOiA0NVxuXHRcdFx0c3R5bGU6IFxuXHRcdFx0XHRib3JkZXJTdHlsZTogXCJoaWRkZW4gaGlkZGVuIHNvbGlkIHNvbGlkXCJcblx0XHRcdGJvcmRlckNvbG9yOiBcImdyYXlcIiwgXG5cdFx0XHRib3JkZXJXaWR0aDogM1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IGd1aWRlXG5cblx0XHRhcnJvdy5saW5lID0gbmV3IExheWVyXG5cdFx0XHRwb2ludDogQWxpZ24uY2VudGVyKDEuNSlcblx0XHRcdHdpZHRoOiAyMSwgaGVpZ2h0OiAzXG5cdFx0XHRyb3RhdGlvbjogLTQ1XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiZ3JheVwiXG5cdFx0XHRwYXJlbnQ6IGFycm93XG5cblx0XHRyZXR1cm4gZ3VpZGVcblxuXHQjIFBsYXkgaGFwdGljIGZlZWRiYWNrXG5cdHBsYXlIYXB0aWM6ICh0eXBlID0gSGFwdGljVHlwZS5TdWNjZXNzKSAtPlxuXG5cdFx0IyBDb3VudFxuXHRcdHJlcGVhdCA9IDBcblx0XHRzd2l0Y2ggdHlwZVxuXHRcdFx0d2hlbiBIYXB0aWNUeXBlLlN1Y2Nlc3MgdGhlbiByZXBlYXQgPSAyXG5cblx0XHQjIFRhcFxuXHRcdEZyYW1lci5EZXZpY2UucGhvbmUucm90YXRpb24gPSAuNVxuXHRcdEZyYW1lci5EZXZpY2UucGhvbmUuYW5pbWF0ZSBcblx0XHRcdHJvdGF0aW9uOiAwLCBcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IC4xXG5cdFx0XHRcdHJlcGVhdDogcmVwZWF0XG5cdFx0XHRcdGN1cnZlOiBcInNwcmluZygxMDAwLDIwLDApXCJcblxuXHRcdCMgQXVkaW9cblx0XHRAcGxheUF1ZGlvIHR5cGVcblxuXHQjIFBsYXkgYXVkaW8gZmVlZGJhY2tcblx0cGxheUF1ZGlvOiAodHlwZSkgLT5cblx0XHR1bmxlc3MgQGF1ZGlvTGF5ZXJcblx0XHRcdEBhdWRpb0xheWVyID0gbmV3IExheWVyIHNpemU6IDAsIHZpc2libGU6IGZhbHNlXG5cdFx0XHRAcGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIpXG5cdFx0XHRAcGxheWVyLnNldEF0dHJpYnV0ZShcIndlYmtpdC1wbGF5c2lubGluZVwiLCBcInRydWVcIilcblx0XHRcdEBwbGF5ZXIuc2V0QXR0cmlidXRlKFwicHJlbG9hZFwiLCBcImF1dG9cIilcblx0XHRcdEBwbGF5ZXIudm9sdW1lID89IDAuNzVcblx0XHRcdEBhdWRpb0xheWVyLl9lbGVtZW50LmFwcGVuZENoaWxkKEBwbGF5ZXIpXG5cblx0XHRAcGxheWVyLnNyYyA9IFwiYXVkaW8vI3t0eXBlfS5tcDNcIlxuXHRcdEBwbGF5ZXIucGxheSgpXG5cblx0IyDsnbTrsqTtirgg7Zes7Y28XG5cdG9uRGlnaXRhbENyb3duOiAoY2IpID0+IEBkaWdpdGFsQ3Jvd24ub24gRXZlbnRzLkRpZ2l0YWxDcm93biwgY2Jcblx0b25TaWRlOiAoY2IpID0+IEBzaWRlLm9uIEV2ZW50cy5TaWRlLCBjYiIsIicnJ1xud2F0Y2hPUyA6IENsb2NrRmFjZXNcblxuQGF1dGhlciBKdW5naG8gc29uZyAodGhyZWV3b3JkLmNvbSlcbkBzaW5jZSAyMDE2LjExLjIzXG4nJydcbmNsYXNzIGV4cG9ydHMuQ2xvY2tGYWNlcyBleHRlbmRzIExheWVyXG5cdCcnJ1xuXHRjb21wbGljYXRpb25zOlxuXHRcdHV0aWxpdGFyaWFuOiBbXVxuXHRcdG1vZHVsYXI6IFtdXG5cdFx0Y2lyY3VsYXI6IFtdXG5cdCcnJ1xuXHQjIENvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMubmFtZSA/PSBcIkNsb2NrRmFjZXNcIlxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IFwiYmxhY2tcIlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdG9wdGlvbnMuY29tcGxpY2F0aW9ucyA/PSB7fVxuXHRcdGNvbXBsaWNhdGlvbnMgPSBfLmRlZmF1bHRzKG9wdGlvbnMuY29tcGxpY2F0aW9ucywge1x0dXRpbGl0YXJpYW46IFtdLCBtb2R1bGFyOiBbXSwgY2lyY3VsYXI6IFtdIH0pXG5cblx0XHQjIFBhZ2Vcblx0XHRAcGFnZSA9IG5ldyBQYWdlQ29tcG9uZW50XG5cdFx0XHRuYW1lOiBcInBhZ2VcIlxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0Y2xpcDogZmFsc2Vcblx0XHRcdHBhcmVudDogQFxuXHRcdEBwYWdlLmNvbnRlbnQuY2xpcCA9IGZhbHNlXG5cdFx0QHBhZ2Uuc3RhdGVzID1cblx0XHRcdGNoYW5nZTogeTogLTEzLCBzY2FsZTogMjg0IC8gQGhlaWdodFxuXHRcdFx0c2VsZWN0ZWQ6IHk6IDAsIHNjYWxlOiAxXG5cblx0XHQjIENsb2NrZmFjZSA6IFV0aWxpdGFyaWFuXG5cdFx0QHV0aWxpdGFyaWFuID0gbmV3IENsb2NrRmFjZSh3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IEBoZWlnaHQpLnV0aWxpdGFyaWFuIGNvbXBsaWNhdGlvbnMudXRpbGl0YXJpYW5cblx0XHQjIENsb2NrZmFjZSA6IE1vZHVsYXJcblx0XHRAbW9kdWxhciA9IG5ldyBDbG9ja0ZhY2Uod2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBAaGVpZ2h0KS5tb2R1bGFyIGNvbXBsaWNhdGlvbnMubW9kdWxhclxuXHRcdCMgQ2xvY2tmYWNlIDogQ2lyY3VsYXJcblx0XHRAY2lyY3VsYXIgPSBuZXcgQ2xvY2tGYWNlKHdpZHRoOiBAd2lkdGgsIGhlaWdodDogQGhlaWdodCkuY2lyY3VsYXIgY29tcGxpY2F0aW9ucy5jaXJjdWxhclxuXG5cdFx0IyBBZGQgcGFnZVxuXHRcdEBwYWdlLmFkZFBhZ2UgQHV0aWxpdGFyaWFuXG5cdFx0QHBhZ2UuYWRkUGFnZSBAbW9kdWxhclxuXHRcdEBwYWdlLmFkZFBhZ2UgQGNpcmN1bGFyXG5cdFx0IyBTbmFwIHBhZ2Vcblx0XHRAcGFnZS5zbmFwVG9QYWdlIEBtb2R1bGFyLCBmYWxzZVxuXG5cdFx0IyBDdXN0b21pemVcblx0XHRAY3VzdG9taXplID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImN1c3RvbWl6ZVwiXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEBwYWdlLm1heFkgKyAxMFxuXHRcdFx0d2lkdGg6IDE1NywgaGVpZ2h0OiA1N1xuXHRcdFx0aHRtbDogXCLsgqzsmqnsnpDtmZRcIlxuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdGZvbnRTaXplOiBcIjMycHhcIiwgZm9udFdlaWdodDogXCI0MDBcIlxuXHRcdFx0XHRsaW5lSGVpZ2h0OiBcIjU3cHhcIlxuXHRcdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdGJvcmRlclJhZGl1czogMTVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjMzMzMzMzXCJcblx0XHRcdHNjYWxlOiAxIC8gMC43LCBvcmlnaW5ZOiAwXG5cdFx0XHRwYXJlbnQ6IEBwYWdlXG5cdFx0QGN1c3RvbWl6ZS5zZW5kVG9CYWNrKClcblxuXHRcdCMg7Iuc6rOE7ZmU66m0IDog7J2067Kk7Yq4XG5cdFx0QGlzQ2hhbmdlRG9uZSA9IGZhbHNlXG5cdFx0QGlzQ2hhbmdlTW9kZSA9IGZhbHNlXG5cblx0XHQjIEV2ZW50c1xuXHRcdGZvciBjaGlsZCBpbiBAcGFnZS5jb250ZW50LmNoaWxkcmVuXG5cdFx0XHRjaGlsZC5vbkNsaWNrID0+IEBzZWxlY3RlZCgpXG5cblx0XHQjIExvbmctUHJlc3MoRm9yY2VUb3VjaCkgOiBTdGFydFxuXHRcdEBwYWdlLm9uTG9uZ1ByZXNzU3RhcnQgPT5cblx0XHRcdHJldHVybiBpZiBAaXNDaGFuZ2VNb2RlXG5cdFx0XHQjXG5cdFx0XHRjaGlsZC5tb2RlQ2hhbmdlKCkgZm9yIGNoaWxkLCBpIGluIEBwYWdlLmNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdEBwYWdlLmFuaW1hdGUgXCJjaGFuZ2VcIlxuXG5cdFx0IyBMb25nLVByZXNzKEZvcmNlVG91Y2gpIDogRW5kXG5cdFx0QHBhZ2Uub25Mb25nUHJlc3NFbmQgPT5cblx0XHRcdHJldHVybiBpZiBAaXNDaGFuZ2VNb2RlXG5cdFx0XHQjXG5cdFx0XHRAaXNDaGFuZ2VNb2RlID0gdHJ1ZVxuXHRcdFx0VXRpbHMuZGVsYXkgLjMsID0+IEBpc0NoYW5nZURvbmUgPSB0cnVlXG5cblx0XHQjIFNjcmVlbi5vbiBFdmVudHMuRWRnZVN3aXBlTGVmdFN0YXJ0LCAoZXZlbnQpIC0+XG5cdFx0IyBcdHByaW50IFwic3RhcnQgOiAje2V2ZW50LnBvaW50Lnh9XCJcblx0XHQjIFNjcmVlbi5vbiBFdmVudHMuRWRnZVN3aXBlTGVmdCwgKGV2ZW50KSAtPlxuXHRcdCMgIyBcdHByaW50IGV2ZW50XG5cdFx0IyBTY3JlZW4ub24gRXZlbnRzLkVkZ2VTd2lwZUxlZnRFbmQsIChldmVudCkgLT5cblx0XHQjIFx0cHJpbnQgXCJlbmQgOiAje2V2ZW50LnBvaW50fVwiXG5cblx0IyBTZWxlY3RlZFxuXHRzZWxlY3RlZDogKCkgLT5cblx0XHRyZXR1cm4gdW5sZXNzIEBpc0NoYW5nZU1vZGVcblx0XHRyZXR1cm4gdW5sZXNzIEBpc0NoYW5nZURvbmVcblx0XHRcblx0XHQjXG5cdFx0Zm9yIGNoaWxkLCBpIGluIEBwYWdlLmNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdGNoaWxkLm1vZGVDaGFuZ2UgZmFsc2UgXG5cdFx0QHBhZ2UuYW5pbWF0ZSBcInNlbGVjdGVkXCJcblxuXHRcdCNcblx0XHRAaXNDaGFuZ2VNb2RlID0gZmFsc2Vcblx0XHRAaXNDaGFuZ2VEb25lID0gZmFsc2VcblxuXHQjIFRpbWUgc3RhcnRcblx0dGltZVN0YXJ0OiAtPiBwYWdlLmNsb2NrLnN0YXJ0KCkgZm9yIHBhZ2UgaW4gQHBhZ2UuY29udGVudC5jaGlsZHJlblxuXHRcdFxuXHQjIFRpbWUgc3RvcFxuXHR0aW1lU3RvcDogLT4gcGFnZS5jbG9jay5zdG9wKCkgZm9yIHBhZ2UgaW4gQHBhZ2UuY29udGVudC5jaGlsZHJlblxuXG5cdCMgU2V0IGNsb2NrIGZhY2Vcblx0c2V0Q2xvY2tmYWNlOiAoaW5kZXgpIC0+XG5cdFx0cmV0dXJuIGlmIF8uaXNFbXB0eShAcGFnZS5jb250ZW50LmNoaWxkcmVuKVxuXHRcdHJldHVybiBpZiBfLnNpemUoQHBhZ2UuY29udGVudC5jaGlsZHJlbikgLSAxIDwgaW5kZXhcblxuXHRcdEBwYWdlLnNuYXBUb1BhZ2UgQHBhZ2UuY29udGVudC5jaGlsZHJlbltpbmRleF1cblxuJycnXG5Db21wbGljYXRpb24gSW1hZ2VzIDogaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3dhdGNob3MvaHVtYW4taW50ZXJmYWNlLWd1aWRlbGluZXMvaWNvbnMtYW5kLWltYWdlcy9cblxuRmFtaWx5OlxuXHRtb2R1bGFyU21hbGxcblx0bW9kdWxhckxhcmdlXG5cdHV0aWxpdGFyaWFuU21hbGxcblx0dXRpbGl0YXJpYW5TbWFsbEZsYXRcblx0dXRpbGl0YXJpYW5MYXJnZVxuXHRjaXJjdWxhclNtYWxsXG5cdGV4dHJhTGFyZ2VcblxuVGVtcGxhdGU6XG5cdHRpbnRDb2xvcjogXCLsg4nsg4FcIlxuXHRjb2x1bW5BbGlnbm1lbnQ6IFwibGVhZGluZ1wiIG9yIFwidGFpbGluZ1wiXG5cbkNpcmN1bGFyOlxuXHRTbWFsbFNpbXBsZVRleHQ6IChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2NvbXBsaWNhdGlvbnRlbXBsYXRlY2lyY3VsYXJzbWFsbHNpbXBsZXRleHQpXG5cdFx0dGV4dFByb3ZpZGVyOiBcIuusuOyekOyXtFwiIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa3RleHRwcm92aWRlcilcblx0U21hbGxSaW5nSW1hZ2U6IChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2NvbXBsaWNhdGlvbnRlbXBsYXRlY2lyY3VsYXJzbWFsbHJpbmdpbWFnZSlcblx0XHRpbWFnZVByb3ZpZGVyOiBcIuydtOuvuOyngFwiIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2ltYWdlcHJvdmlkZXIpXG5cdFx0cmluZ1N0eWxlOiBcImNsb3NlZFwiIG9yIFwib3BlblwiIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2NvbXBsaWNhdGlvbnJpbmdzdHlsZSlcblx0XHRmaWxsRnJhY3Rpb246IOyxhOyasOq4sCDruYTsnKhcblxuVXRpbGl0YXJpYW46XG5cdFNtYWxsRmxhdDogKGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9yZWZlcmVuY2UvY2xvY2traXQvY2xrY29tcGxpY2F0aW9udGVtcGxhdGV1dGlsaXRhcmlhbnNtYWxsZmxhdClcblx0XHR0ZXh0UHJvdmlkZXI6IFwi66y47J6Q7Je0XCIgKGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9yZWZlcmVuY2UvY2xvY2traXQvY2xrdGV4dHByb3ZpZGVyKVxuXHRcdGltYWdlUHJvdmlkZXI6IFwi7J2066+47KeAXCIgKGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9yZWZlcmVuY2UvY2xvY2traXQvY2xraW1hZ2Vwcm92aWRlcilcblx0TGFyZ2VGbGF0OiAoaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3JlZmVyZW5jZS9jbG9ja2tpdC9jbGtjb21wbGljYXRpb250ZW1wbGF0ZXV0aWxpdGFyaWFubGFyZ2VmbGF0KVxuXHRcdHRleHRQcm92aWRlcjogXCLrrLjsnpDsl7RcIiAoaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3JlZmVyZW5jZS9jbG9ja2tpdC9jbGt0ZXh0cHJvdmlkZXIpXG5cdFx0aW1hZ2VQcm92aWRlcjogXCLsnbTrr7jsp4BcIiAoaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3JlZmVyZW5jZS9jbG9ja2tpdC9jbGtpbWFnZXByb3ZpZGVyKVxuXHRTbWFsbFJpbmdJbWFnZTogKGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9yZWZlcmVuY2UvY2xvY2traXQvY2xrY29tcGxpY2F0aW9udGVtcGxhdGV1dGlsaXRhcmlhbnNtYWxscmluZ2ltYWdlKVxuXHRcdGltYWdlUHJvdmlkZXI6IFwi7J2066+47KeAXCIgW3JlcXVpcmVdIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2ltYWdlcHJvdmlkZXIpXG5cdFx0cmluZ1N0eWxlOiBcImNsb3NlZFwiIG9yIFwib3BlblwiIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2NvbXBsaWNhdGlvbnJpbmdzdHlsZSlcblx0XHRmaWxsRnJhY3Rpb246IOyxhOyasOq4sCDruYTsnKhcblx0U21hbGxTcXVhcmU6IChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2NvbXBsaWNhdGlvbnRlbXBsYXRldXRpbGl0YXJpYW5zbWFsbHNxdWFyZSlcblx0XHRpbWFnZVByb3ZpZGVyOiBcIuydtOuvuOyngFwiIFtyZXF1aXJlXSAoaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3JlZmVyZW5jZS9jbG9ja2tpdC9jbGtpbWFnZXByb3ZpZGVyKVxuXG5Nb2R1bGFyOlxuXHRTbWFsbFN0YWNrVGV4dDogKGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9yZWZlcmVuY2UvY2xvY2traXQvY2xrY29tcGxpY2F0aW9udGVtcGxhdGVtb2R1bGFyc21hbGxzdGFja3RleHQpXG5cdFx0bGluZTFUZXh0UHJvdmlkZXI6IFwiMeudvOyduCDrrLjsnpDsl7RcIiAoaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3JlZmVyZW5jZS9jbG9ja2tpdC9jbGt0ZXh0cHJvdmlkZXIpXG5cdFx0bGluZTJUZXh0UHJvdmlkZXI6IFwiMuudvOyduCDrrLjsnpDsl7RcIiAoaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3JlZmVyZW5jZS9jbG9ja2tpdC9jbGt0ZXh0cHJvdmlkZXIpXG5cdFx0aGlnaGxpZ2h0TGluZTI6IEJvb2xlYW5cblx0U21hbGxSaW5nSW1hZ2U6IChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2NvbXBsaWNhdGlvbnRlbXBsYXRlbW9kdWxhcnNtYWxscmluZ2ltYWdlKVxuXHRcdGltYWdlUHJvdmlkZXI6IFwi7J2066+47KeAXCIgW3JlcXVpcmVdIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2ltYWdlcHJvdmlkZXIpXG5cdFx0cmluZ1N0eWxlOiBcImNsb3NlZFwiIG9yIFwib3BlblwiIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2NvbXBsaWNhdGlvbnJpbmdzdHlsZSlcblx0XHRmaWxsRnJhY3Rpb246IOyxhOyasOq4sCDruYTsnKhcblx0TGFyZ2VUYWxsQm9keTogKGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9yZWZlcmVuY2UvY2xvY2traXQvY2xrY29tcGxpY2F0aW9udGVtcGxhdGVtb2R1bGFybGFyZ2V0YWxsYm9keSlcblx0XHRoZWFkZXJUZXh0UHJvdmlkZXI6IFwi7Zek642UIOusuOyekOyXtFwiIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa3RleHRwcm92aWRlcilcblx0XHRib2R5VGV4dFByb3ZpZGVyOiBcIuuwlOuUlCDrrLjsnpDsl7RcIiAoaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3JlZmVyZW5jZS9jbG9ja2tpdC9jbGt0ZXh0cHJvdmlkZXIpXG5cbkV4dHJhTGFyZ2U6XG5cblxudGV4dFByb3ZpZGVyOlxuXHRsYWJlbDog652867Ko66qFXG5cdHRpbnRDb2xvcjog7Yu07Yq47IOJ7IOBXG5cbmltYWdlUHJvdmlkZXI6XG5cdG9uZVBpZWNlSW1hZ2U6IOyyq+uyiOynuCDsnbTrr7jsp4Bcblx0dHdvUGllY2VJbWFnZUJhY2tncm91bmQ6IOuRkOuyiOynuCDrkrcg7J2066+47KeAXG5cdHR3b1BpZWNlSW1hZ2VGb3JlZ3JvdW5kOiDrkZDrsojsp7gg7JWeIOydtOuvuOyngFxuXHR0aW50Q29sb3I6IO2LtO2KuOyDieyDgVxuJycnXG4jIENvbXBsaWNhdGlvblxuY2xhc3MgZXhwb3J0cy5Db21wbGljYXRpb24gZXh0ZW5kcyBMYXllclxuXG5cdEV2ZW50cy5Db2x1bW5BbGlnbm1lbnQgPSBcImNvbHVtbkFsaWdubWVudFwiXG5cdEV2ZW50cy5UaW50Q29sb3IgPSAndGludENvbG9yJ1xuXG5cdEZhbWlseSA9IHt9XG5cdEZhbWlseS5Nb2R1bGFyU21hbGwgPSBcIm1vZHVsYXJTbWFsbFwiXG5cdEZhbWlseS5Nb2R1bGFyTGFyZ2UgPSBcIm1vZHVsYXJMYXJnZVwiXG5cdEZhbWlseS5VdGlsaXRhcmlhblNtYWxsID0gXCJ1dGlsaXRhcmlhblNtYWxsXCJcblx0RmFtaWx5LlV0aWxpdGFyaWFuU21hbGxGbGF0ID0gXCJ1dGlsaXRhcmlhblNtYWxsRmxhdFwiXG5cdEZhbWlseS5VdGlsaXRhcmlhbkxhcmdlID0gXCJ1dGlsaXRhcmlhbkxhcmdlXCJcblx0RmFtaWx5LkNpcmN1bGFyU21hbGwgPSBcImNpcmN1bGFyU21hbGxcIlxuXHRGYW1pbHkuRXh0cmFMYXJnZSA9IFwiZXh0cmFMYXJnZVwiXG5cblx0VGVtcGxhdGUgPSB7fVxuXHRUZW1wbGF0ZS5TaW1wbGVJbWFnZSA9IFwic2ltcGxlSW1hZ2VcIlxuXHRUZW1wbGF0ZS5TaW1wbGVUZXh0ID0gXCJzaW1wbGVUZXh0XCJcblx0VGVtcGxhdGUuUmluZ0ltYWdlID0gXCJyaW5nSW1hZ2VcIlxuXHRUZW1wbGF0ZS5SaW5nVGV4dCA9IFwicmluZ1RleHRcIlxuXHRUZW1wbGF0ZS5TdGFja1RleHQgPSBcInN0YWNrVGV4dFwiXG5cdFRlbXBsYXRlLlN0YWNrSW1hZ2UgPSBcInN0YWNrSW1hZ2VcIlxuXHRUZW1wbGF0ZS5Db2x1bW5zVGV4dCA9IFwiY29sdW1uc1RleHRcIlxuXHRUZW1wbGF0ZS5Db2x1bW5zID0gXCJjb2x1bW5zXCJcblx0VGVtcGxhdGUuU3RhbmRhcmRCb2R5ID0gXCJzdGFuZGFyZEJvZHlcIlxuXHRUZW1wbGF0ZS5UYWJsZSA9IFwidGFibGVcIlxuXHRUZW1wbGF0ZS5UYWxsQm9keSA9IFwidGFsbEJvZHlcIlxuXHRUZW1wbGF0ZS5GbGF0ID0gXCJmbGF0XCJcblx0VGVtcGxhdGUuU3F1YXJlID0gXCJzcXVhcmVcIlxuXG5cdFJpbmdTdHlsZSA9IHt9XG5cdFJpbmdTdHlsZS5DbG9zZWQgPSBcImNsb3NlZFwiXG5cdFJpbmdTdHlsZS5PcGVuID0gXCJvcGVuXCJcblxuXHRDb2x1bW5BbGlnbm1lbnQgPSB7fVxuXHRDb2x1bW5BbGlnbm1lbnQuTGVhZGluZyA9IFwibGVhZGluZ1wiXG5cdENvbHVtbkFsaWdubWVudC5UcmFpbGluZyA9IFwidHJhaWxpbmdcIlxuXG5cdHRoaXMuRmFtaWx5ID0gRmFtaWx5XG5cdHRoaXMuVGVtcGxhdGUgPSBUZW1wbGF0ZVxuXHR0aGlzLlJpbmdTdHlsZSA9IFJpbmdTdHlsZVxuXHR0aGlzLkNvbHVtbkFsaWdubWVudCA9IENvbHVtbkFsaWdubWVudFxuXG5cdEBkZWZpbmUgJ2NvbHVtbkFsaWdubWVudCcsXG5cdFx0Z2V0OiAoKSAtPiBAX2NvbHVtbkFsaWdubWVudFxuXHRcdHNldDogKHZhbHVlKSAtPiBAZW1pdChcImNoYW5nZToje0V2ZW50cy5Db2x1bW5BbGlnbm1lbnR9XCIsIEBfY29sdW1uQWxpZ25tZW50ID0gdmFsdWUpXG5cblx0QGRlZmluZSAndGludENvbG9yJyxcblx0XHRnZXQ6ICgpIC0+IEBfdGludENvbG9yXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBlbWl0KFwiY2hhbmdlOiN7RXZlbnRzLlRpbnRDb2xvcn1cIiwgQF90aW50Q29sb3IgPSB2YWx1ZSlcdFx0XG5cblx0IyBDb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBcIlwiXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0b3B0aW9ucy5mYW1pbHkgPz0gRmFtaWx5Lk1vZHVsYXJTbWFsbFxuXHRcdG9wdGlvbnMudGVtcGxhdGUgPz0gVGVtcGxhdGUuU2ltcGxlVGV4dFxuXG5cdFx0QGZhbWlseSA9IG9wdGlvbnMuZmFtaWx5XG5cdFx0QHRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZVxuXG5cdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQjIEZhbWlseVxuXHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQjIE1vZHVsYXIgOiBTbWFsbFxuXHRtb2R1bGFyU21hbGw6ICgpIC0+XG5cdFx0QGZhbWlseSA9IEZhbWlseS5Nb2R1bGFyU21hbGxcblx0XHRAc2l6ZSA9IDEwMFxuXG5cdFx0QHRpbnRDb2xvciA9IFwid2hpdGVcIlxuXG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIE1vZHVsYXIgOiBMYXJnZVxuXHRtb2R1bGFyTGFyZ2U6ICgpIC0+XG5cdFx0QGZhbWlseSA9IEZhbWlseS5Nb2R1bGFyTGFyZ2Vcblx0XHRAcHJvcHMgPSB3aWR0aDogMzEyLCBoZWlnaHQ6IDEyNlxuXG5cdFx0QHRpbnRDb2xvciA9IFwid2hpdGVcIlxuXG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIFV0aWxpdGFyaWFuIDogU21hbGxcblx0dXRpbGl0YXJpYW5TbWFsbDogKCkgLT5cblx0XHRAZmFtaWx5ID0gRmFtaWx5LlV0aWxpdGFyaWFuU21hbGxcblx0XHRAc2l6ZSA9IDUxXG5cblx0XHRAdGludENvbG9yID0gXCJ3aGl0ZVwiXG5cblx0XHRyZXR1cm4gdGhpc1xuXG5cdCMgVXRpbGl0YXJpYW4gOiBTbWFsbCBmbGF0XG5cdHV0aWxpdGFyaWFuU21hbGxGbGF0OiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBmYW1pbHkgPSBGYW1pbHkuVXRpbGl0YXJpYW5TbWFsbEZsYXRcblx0XHRAcHJvcHMgPSB3aWR0aDogMTIwLCBoZWlnaHQ6IDM2XG5cblx0XHRAdGludENvbG9yID0gXCJ3aGl0ZVwiXG5cblx0XHQjIFBhcmFtZXRlcnNcblx0XHRvcHRpb25zLmltYWdlUHJvdmlkZXIgPz0ge31cblx0XHRvcHRpb25zLnRleHRQcm92aWRlciA/PSB7fVxuXG5cdFx0aW1hZ2VQcm92aWRlciA9IF8uZGVmYXVsdHMob3B0aW9ucy5pbWFnZVByb3ZpZGVyLCB7IHR3b1BpZWNlSW1hZ2VCYWNrZ3JvdW5kOiBcIlwiLCB0d29QaWVjZUltYWdlRm9yZWdyb3VuZDogXCJcIiwgdGludENvbG9yOiBcIndoaXRlXCIgfSlcblx0XHR0ZXh0UHJvdmlkZXIgPSBfLmRlZmF1bHRzKG9wdGlvbnMudGV4dFByb3ZpZGVyLCB7IHRpbnRDb2xvcjogXCJ3aGl0ZVwiIH0pXG5cblx0XHRpbWFnZSA9IG5ldyBMYXllclxuXHRcdFx0eDogQWxpZ24ubGVmdCwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRzaXplOiAyMFxuXHRcdFx0aW1hZ2U6IGltYWdlUHJvdmlkZXIub25lUGllY2VJbWFnZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdHRleHQgPSBuZXcgTGF5ZXJcblx0XHRcdGh0bWw6IHRleHRQcm92aWRlci5sYWJlbFxuXHRcdFx0c3R5bGU6IFxuXHRcdFx0XHRmb250U2l6ZTogXCIyOHB4XCIsIGZvbnRXZWlnaHQ6IFwiNDAwXCJcblx0XHRcdFx0bGluZUhlaWdodDogXCIje0BoZWlnaHR9cHhcIlxuXHRcdFx0XHRsZXR0ZXJTcGFjaW5nOiBcIi0wLjJweFwiXG5cdFx0XHRcdHRleHRBbGlnbjogXCJsZWZ0XCJcblx0XHRcdGNvbG9yOiB0ZXh0UHJvdmlkZXIudGludENvbG9yXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFV0aWwudGV4dC5hdXRvRm9udFNpemUgdGV4dCwgeyBoZWlnaHQ6IEBoZWlnaHQgfSwgeyB4OiBpbWFnZS5tYXhYICsgMywgeTogQWxpZ24uY2VudGVyIH1cblxuXHRcdGlmIEBjb250ZW50RnJhbWUoKS53aWR0aCA+IEB3aWR0aFxuXHRcdFx0VXRpbC50ZXh0LmF1dG9Gb250U2l6ZSB0ZXh0LCB7IHdpZHRoOiBAd2lkdGggLSBpbWFnZS53aWR0aCwgaGVpZ2h0OiBAaGVpZ2h0IH0sIHsgeDogaW1hZ2UubWF4WCArIDMsIHk6IEFsaWduLmNlbnRlciB9XG5cblx0XHQjIEV2ZW50IDogQ2hhbmdlIGNvbHVtbiBhbGlnbm1lbnRcblx0XHRAb24gXCJjaGFuZ2U6I3tFdmVudHMuQ29sdW1uQWxpZ25tZW50fVwiLCAtPlxuXHRcdFx0aWYgQGNvbHVtbkFsaWdubWVudCBpcyBDb2x1bW5BbGlnbm1lbnQuTGVhZGluZ1xuXHRcdFx0XHRpbWFnZS5wcm9wcyA9IHg6IEFsaWduLmxlZnQsIG1pZFk6IHRleHQubWlkWVxuXHRcdFx0XHR0ZXh0LnggPSBpbWFnZS5tYXhYICsgM1xuXHRcdFx0ZWxzZSBpZiBAY29sdW1uQWxpZ25tZW50IGlzIENvbHVtbkFsaWdubWVudC5UcmFpbGluZ1xuXHRcdFx0XHRpbWFnZS5wcm9wcyA9IHg6IEFsaWduLnJpZ2h0LCBtaWRZOiB0ZXh0Lm1pZFlcblx0XHRcdFx0dGV4dC54ID0gaW1hZ2UueCAtIHRleHQud2lkdGggLSAzXG5cdFx0XHRcdFxuXHRcdHJldHVybiB0aGlzXG5cblx0IyBVdGlsaXRhcmlhbiA6IExhcmdlXG5cdHV0aWxpdGFyaWFuTGFyZ2U6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QGZhbWlseSA9IEZhbWlseS5VdGlsaXRhcmlhbkxhcmdlXG5cdFx0QHByb3BzID0gd2lkdGg6IDMxMiwgaGVpZ2h0OiAzNlxuXG5cdFx0QHRpbnRDb2xvciA9IFwid2hpdGVcIlxuXG5cdFx0IyBQYXJhbWV0ZXJzXG5cdFx0b3B0aW9ucy5pbWFnZVByb3ZpZGVyID89IHt9XG5cdFx0b3B0aW9ucy50ZXh0UHJvdmlkZXIgPz0ge31cblxuXHRcdGltYWdlUHJvdmlkZXIgPSBfLmRlZmF1bHRzKG9wdGlvbnMuaW1hZ2VQcm92aWRlciwgeyB0d29QaWVjZUltYWdlQmFja2dyb3VuZDogXCJcIiwgdHdvUGllY2VJbWFnZUZvcmVncm91bmQ6IFwiXCIsIHRpbnRDb2xvcjogXCJ3aGl0ZVwiIH0pXG5cdFx0dGV4dFByb3ZpZGVyID0gXy5kZWZhdWx0cyhvcHRpb25zLnRleHRQcm92aWRlciwgeyB0aW50Q29sb3I6IFwid2hpdGVcIiB9KVxuXG5cdFx0aW1hZ2UgPSBuZXcgTGF5ZXJcblx0XHRcdHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLmJvdHRvbVxuXHRcdFx0c2l6ZTogMjBcblx0XHRcdGltYWdlOiBpbWFnZVByb3ZpZGVyLm9uZVBpZWNlSW1hZ2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHR0ZXh0ID0gbmV3IExheWVyXG5cdFx0XHRodG1sOiB0ZXh0UHJvdmlkZXIubGFiZWxcblx0XHRcdHN0eWxlOiBcblx0XHRcdFx0Zm9udFNpemU6IFwiMjhweFwiLCBmb250V2VpZ2h0OiBcIjQwMFwiXG5cdFx0XHRcdGxpbmVIZWlnaHQ6IFwiMVwiXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IFwiLTAuMnB4XCJcblx0XHRcdFx0dGV4dEFsaWduOiBcImxlZnRcIlxuXHRcdFx0Y29sb3I6IHRleHRQcm92aWRlci50aW50Q29sb3Jcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0VXRpbC50ZXh0LmF1dG9Gb250U2l6ZSB0ZXh0LCB7IGhlaWdodDogQGhlaWdodCB9LCB7IHg6IGltYWdlLm1heFggKyAzLCB5OiBBbGlnbi5ib3R0b20gfVxuXG5cdFx0aWYgQGNvbnRlbnRGcmFtZSgpLndpZHRoID4gQHdpZHRoXG5cdFx0XHRVdGlsLnRleHQuYXV0b0ZvbnRTaXplIHRleHQsIHsgd2lkdGg6IEB3aWR0aCAtIGltYWdlLndpZHRoLCBoZWlnaHQ6IEBoZWlnaHQgfSwgeyB4OiBpbWFnZS5tYXhYICsgMywgeTogQWxpZ24uYm90dG9tIH1cblxuXHRcdGltYWdlLnByb3BzID0geDogQG1pZFggLSBAY29udGVudEZyYW1lKCkud2lkdGggLyAyLCBtaWRZOiB0ZXh0Lm1pZFlcblx0XHR0ZXh0LnggPSBpbWFnZS5tYXhYICsgM1xuXG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIENpcmN1bGFyIDogU21hbGxcblx0Y2lyY3VsYXJTbWFsbDogKCkgLT5cblx0XHRAZmFtaWx5ID0gRmFtaWx5LkNpcmN1bGFyU21hbGxcblx0XHRAc2l6ZSA9IDY4XG5cdFx0QHNjYWxlID0gNTEvNjhcblxuXHRcdEB0aW50Q29sb3IgPSBcIiNiM2IzYjNcIlxuXG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIEV4dHJhTGFyZ2Vcblx0ZXh0cmFMYXJnZTogKCkgLT5cblx0XHRAZmFtaWx5ID0gRmFtaWx5LkV4dHJhTGFyZ2VcblxuXHRcdEB0aW50Q29sb3IgPSBcIndoaXRlXCJcblxuXHRcdHJldHVybiB0aGlzXG5cblx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCMgVGVtcGxhdGVcblx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0IyBTaW1wbGUgdGV4dFxuXHRzaW1wbGVUZXh0OiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEB0ZW1wbGF0ZSA9IFRlbXBsYXRlLlNpbXBsZVRleHRcblxuXHRcdCMgUGFyYW1ldGVyc1xuXHRcdG9wdGlvbnMudGV4dFByb3ZpZGVyID89IHt9XG5cblx0XHR0ZXh0UHJvdmlkZXIgPSBfLmRlZmF1bHRzKG9wdGlvbnMudGV4dFByb3ZpZGVyLCB7IHRpbnRDb2xvcjogQHRpbnRDb2xvciB9KVxuXG5cdFx0aGVpZ2h0ID0gQGhlaWdodFxuXHRcdHRleHQgPSBuZXcgTGF5ZXJcblx0XHRcdGh0bWw6IHRleHRQcm92aWRlci5sYWJlbFxuXHRcdFx0c3R5bGU6IFxuXHRcdFx0XHRmb250U2l6ZTogXCI2N3B4XCIsIGZvbnRXZWlnaHQ6IFwiNDAwXCJcblx0XHRcdFx0bGluZUhlaWdodDogXCIje2hlaWdodH1weFwiXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IFwiLTAuNXB4XCJcblx0XHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRjb2xvcjogdGV4dFByb3ZpZGVyLnRpbnRDb2xvclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRVdGlsLnRleHQuYXV0b0ZvbnRTaXplIHRleHQsIHsgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfSwgeyB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlciB9XG5cblx0XHRyZXR1cm4gdGhpc1xuXG5cdCMgU3RhY2sgdGV4dFxuXHRzdGFja1RleHQ6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QHRlbXBsYXRlID0gVGVtcGxhdGUuU3RhY2tUZXh0XG5cblx0XHQjIFBhcmFtZXRlcnNcblx0XHRvcHRpb25zLmxpbmUxVGV4dFByb3ZpZGVyID89IHt9XG5cdFx0b3B0aW9ucy5saW5lMlRleHRQcm92aWRlciA/PSB7fVxuXHRcdG9wdGlvbnMuaGlnaGxpZ2h0TGluZTIgPz0gZmFsc2VcblxuXHRcdGxpbmUxVGV4dFByb3ZpZGVyID0gXy5kZWZhdWx0cyhvcHRpb25zLmxpbmUxVGV4dFByb3ZpZGVyLCB7IHRpbnRDb2xvcjogQHRpbnRDb2xvciB9KVxuXHRcdGxpbmUyVGV4dFByb3ZpZGVyID0gXy5kZWZhdWx0cyhvcHRpb25zLmxpbmUyVGV4dFByb3ZpZGVyLCB7IHRpbnRDb2xvcjogQHRpbnRDb2xvciB9KVxuXHRcdGhpZ2hsaWdodExpbmUyID0gb3B0aW9ucy5oaWdobGlnaHRMaW5lMlxuXG5cdFx0bGluZTFUZXh0SGVpZ2h0ID0gMzBcblx0XHRsaW5lMVRleHQgPSBuZXcgTGF5ZXJcblx0XHRcdGh0bWw6IGxpbmUxVGV4dFByb3ZpZGVyLmxhYmVsXG5cdFx0XHRzdHlsZTogXG5cdFx0XHRcdGZvbnRTaXplOiBcIjY3cHhcIiwgZm9udFdlaWdodDogXCI1MDBcIlxuXHRcdFx0XHRsaW5lSGVpZ2h0OiBcIjFcIlxuXHRcdFx0XHRsZXR0ZXJTcGFjaW5nOiBcIi0wLjRweFwiXG5cdFx0XHRcdHBhZGRpbmc6IFwiMHB4IDhweFwiXG5cdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0Y29sb3I6IGxpbmUxVGV4dFByb3ZpZGVyLnRpbnRDb2xvclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRVdGlsLnRleHQuYXV0b0ZvbnRTaXplIGxpbmUxVGV4dCwgeyB3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IGxpbmUxVGV4dEhlaWdodCB9LCB7IHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC01NSkgfSAjQWxpZ24uY2VudGVyKCAtQGhlaWdodCAqIDEvMyAqIDEvMiApXG5cblx0XHRsaW5lMlRleHRIZWlnaHQgPSAzNVxuXHRcdGxpbmUyVGV4dCA9IG5ldyBMYXllclxuXHRcdFx0aHRtbDogbGluZTJUZXh0UHJvdmlkZXIubGFiZWxcblx0XHRcdHN0eWxlOiBcblx0XHRcdFx0Zm9udFNpemU6IFwiNjdweFwiLCBmb250V2VpZ2h0OiBcIjUwMFwiXG5cdFx0XHRcdGxpbmVIZWlnaHQ6IFwiMVwiXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IFwiLTAuNHB4XCJcblx0XHRcdFx0cGFkZGluZzogXCIwcHggMy41cHhcIlxuXHRcdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdGNvbG9yOiBsaW5lMlRleHRQcm92aWRlci50aW50Q29sb3Jcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0VXRpbC50ZXh0LmF1dG9Gb250U2l6ZSBsaW5lMlRleHQsIHsgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBsaW5lMlRleHRIZWlnaHQgfSwgeyB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtMTgpIH0gI2xpbmUxVGV4dC5tYXhZIC0gMTBcblxuXHRcdHJldHVybiB0aGlzXG5cblx0IyBTaW1wbGUgaW1hZ2Vcblx0c2ltcGxlSW1hZ2U6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QHRlbXBsYXRlID0gVGVtcGxhdGUuU2ltcGxlSW1hZ2VcblxuXHRcdCMgUGFyYW1ldGVyc1xuXHRcdG9wdGlvbnMuaW1hZ2VQcm92aWRlciA/PSB7fVxuXG5cdFx0aW1hZ2VQcm92aWRlciA9IF8uZGVmYXVsdHMob3B0aW9ucy5pbWFnZVByb3ZpZGVyLCB7IHR3b1BpZWNlSW1hZ2VCYWNrZ3JvdW5kOiBcIlwiLCB0d29QaWVjZUltYWdlRm9yZWdyb3VuZDogXCJcIiwgdGludENvbG9yOiBAdGludENvbG9yIH0pXG5cblx0XHRzaXplID0gMTAwXG5cdFx0c3dpdGNoIEBmYW1pbHlcblx0XHRcdHdoZW4gRmFtaWx5Lk1vZHVsYXJTbWFsbCB0aGVuIHNpemUgPSA1OCAqIDEuNlxuXHRcdFx0d2hlbiBGYW1pbHkuVXRpbGl0YXJpYW5TbWFsbCB0aGVuIHNpemUgPSA0NFxuXHRcdFx0d2hlbiBGYW1pbHkuQ2lyY3VsYXJTbWFsbCB0aGVuIHNpemUgPSAzNiAqICgxL0BzY2FsZSlcblx0XHRcdFx0XG5cdFx0aW1hZ2UgPSBuZXcgTGF5ZXJcblx0XHRcdHBvaW50OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNpemU6IHNpemVcblx0XHRcdGltYWdlOiBpbWFnZVByb3ZpZGVyLm9uZVBpZWNlSW1hZ2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRpZiBAZmFtaWx5IGlzIEZhbWlseS5DaXJjdWxhclNtYWxsXG5cdFx0XHRpbWFnZS5icmlnaHRuZXNzID0gMFxuXHRcdFx0aW1hZ2UuY29udHJhc3QgPSA1MFxuXHRcdFx0aW1hZ2UuaW52ZXJ0ID0gMTAwXG5cblx0XHRyZXR1cm4gdGhpc1xuXG5cdCMgU3F1YXJlXG5cdHNxdWFyZTogKG9wdGlvbnMgPSB7fSkgLT4gXG5cdFx0QHNpbXBsZUltYWdlIG9wdGlvbnNcblx0XHRAdGVtcGxhdGUgPSBUZW1wbGF0ZS5TcXVhcmVcblxuXHRcdHJldHVybiB0aGlzXG5cblx0IyBSaW5nIGltYWdlXG5cdHJpbmdJbWFnZTogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRAdGVtcGxhdGUgPSBUZW1wbGF0ZS5SaW5nSW1hZ2VcblxuXHRcdCMgUGFyYW1ldGVyc1xuXHRcdG9wdGlvbnMuaW1hZ2VQcm92aWRlciA/PSB7fVxuXHRcdG9wdGlvbnMuZmlsbEZyYWN0aW9uID89IDBcblx0XHRvcHRpb25zLnJpbmdTdHlsZSA/PSBSaW5nU3R5bGUuQ2xvc2VkXG5cblx0XHRpbWFnZVByb3ZpZGVyID0gXy5kZWZhdWx0cyhvcHRpb25zLmltYWdlUHJvdmlkZXIsIHsgdHdvUGllY2VJbWFnZUJhY2tncm91bmQ6IFwiXCIsIHR3b1BpZWNlSW1hZ2VGb3JlZ3JvdW5kOiBcIlwiLCB0aW50Q29sb3I6IEB0aW50Q29sb3IgfSlcblx0XHRmaWxsRnJhY3Rpb24gPSBvcHRpb25zLmZpbGxGcmFjdGlvblxuXHRcdHJpbmdTdHlsZSA9IG9wdGlvbnMucmluZ1N0eWxlXG5cblx0XHRpbWFnZVNpemUgPSAzODsgcmluZ1NpemUgPSA1ODsgcmluZ1dpZHRoID0gNVxuXHRcdHN3aXRjaCBAZmFtaWx5XG5cdFx0XHR3aGVuIEZhbWlseS5Nb2R1bGFyU21hbGwgXG5cdFx0XHRcdGltYWdlU2l6ZSA9IDM4XG5cdFx0XHRcdHJpbmdTaXplID0gNThcblx0XHRcdFx0cmluZ1dpZHRoID0gNVxuXHRcdFx0d2hlbiBGYW1pbHkuVXRpbGl0YXJpYW5TbWFsbFxuXHRcdFx0XHRpbWFnZVNpemUgPSAyOFxuXHRcdFx0XHRyaW5nU2l6ZSA9IDQ3XG5cdFx0XHRcdHJpbmdXaWR0aCA9IDRcblx0XHRcdHdoZW4gRmFtaWx5LkNpcmN1bGFyU21hbGxcblx0XHRcdFx0aW1hZ2VTaXplID0gNDRcblx0XHRcdFx0cmluZ1NpemUgPSA2NFxuXHRcdFx0XHRyaW5nV2lkdGggPSA2XG5cdFx0XHR3aGVuIEZhbWlseS5FeHRyYUxhcmdlXG5cdFx0XHRcdGltYWdlU2l6ZSA9IDEzM1xuXG5cdFx0aW1hZ2UgPSBuZXcgTGF5ZXJcblx0XHRcdHBvaW50OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNpemU6IGltYWdlU2l6ZVxuXHRcdFx0aW1hZ2U6IGltYWdlUHJvdmlkZXIub25lUGllY2VJbWFnZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRpZiBAZmFtaWx5IGlzIEZhbWlseS5DaXJjdWxhclNtYWxsXG5cdFx0XHRpbWFnZS5icmlnaHRuZXNzID0gMFxuXHRcdFx0aW1hZ2UuY29udHJhc3QgPSA1MFxuXHRcdFx0aW1hZ2UuaW52ZXJ0ID0gMTAwXG5cblx0XHRyaW5nID0gbmV3IENpcmN1bGFyUHJvZ3Jlc3NDb21wb25lbnRcblx0XHRcdHBvaW50OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNpemU6IHJpbmdTaXplXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdHJpbmdDb2xvciA9IG5ldyBDb2xvcihpbWFnZVByb3ZpZGVyLnRpbnRDb2xvcilcblx0XHRyaW5nLnN0cm9rZVdpZHRoID0gcmluZ1dpZHRoXG5cdFx0cmluZy5wcm9ncmVzc0NvbG9yID0gcmluZ0NvbG9yXG5cdFx0cmluZy5yYWlsc0NvbG9yID0gcmluZ0NvbG9yLmFscGhhKC4zKVxuXHRcdHJpbmcuc2V0UHJvZ3Jlc3MgZmlsbEZyYWN0aW9uLCBmYWxzZVxuXG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIFRhbGwgYm9keVxuXHR0YWxsQm9keTogKG9wdGlvbnMgPSB7fSktPlxuXHRcdEB0ZW1wbGF0ZSA9IFRlbXBsYXRlLlRhbGxCb2R5XG5cblx0XHQjIFBhcmFtZXRlcnNcblx0XHRvcHRpb25zLmhlYWRlclRleHRQcm92aWRlciA/PSB7fVxuXHRcdG9wdGlvbnMuYm9keVRleHRQcm92aWRlciA/PSB7fVxuXG5cdFx0aGVhZGVyVGV4dFByb3ZpZGVyID0gXy5kZWZhdWx0cyhvcHRpb25zLmhlYWRlclRleHRQcm92aWRlciwgeyB0aW50Q29sb3I6IEB0aW50Q29sb3IgfSlcblx0XHRib2R5VGV4dFByb3ZpZGVyID0gXy5kZWZhdWx0cyhvcHRpb25zLmJvZHlUZXh0UHJvdmlkZXIsIHsgdGludENvbG9yOiBAdGludENvbG9yIH0pXG5cblx0XHRoZWFkZXJUZXh0SGVpZ2h0ID0gNDZcblx0XHRoZWFkZXJUZXh0ID0gbmV3IExheWVyXG5cdFx0XHRodG1sOiBoZWFkZXJUZXh0UHJvdmlkZXIubGFiZWxcblx0XHRcdHN0eWxlOiBcblx0XHRcdFx0Zm9udFNpemU6IFwiMzNweFwiLCBmb250V2VpZ2h0OiBcIjQwMFwiXG5cdFx0XHRcdGxpbmVIZWlnaHQ6IFwiI3toZWFkZXJUZXh0SGVpZ2h0fXB4XCJcblx0XHRcdFx0bGV0dGVyU3BhY2luZzogXCIwLjFweFwiXG5cdFx0XHRcdHBhZGRpbmc6IFwiMHB4IDEycHhcIlxuXHRcdFx0XHR0ZXh0QWxpZ246IFwibGVmdFwiXG5cdFx0XHRjb2xvcjogaGVhZGVyVGV4dFByb3ZpZGVyLnRpbnRDb2xvclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRVdGlsLnRleHQuYXV0b0ZvbnRTaXplIGhlYWRlclRleHQsIHsgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBoZWFkZXJUZXh0SGVpZ2h0IH0sIHsgeDogQWxpZ24ubGVmdCwgeTogQWxpZ24udG9wIH0gXG5cblx0XHRib2R5VGV4dEhlaWdodCA9IDgwXG5cdFx0Ym9keVRleHQgPSBuZXcgTGF5ZXJcblx0XHRcdGh0bWw6IGJvZHlUZXh0UHJvdmlkZXIubGFiZWxcblx0XHRcdHN0eWxlOiBcblx0XHRcdFx0Zm9udFNpemU6IFwiODBweFwiLCBmb250V2VpZ2h0OiBcIjQwMFwiXG5cdFx0XHRcdGxpbmVIZWlnaHQ6IFwiI3tib2R5VGV4dEhlaWdodH1weFwiXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IFwiLTAuNXB4XCJcblx0XHRcdFx0cGFkZGluZzogXCIwcHggMTJweFwiXG5cdFx0XHRcdHRleHRBbGlnbjogXCJsZWZ0XCJcblx0XHRcdGNvbG9yOiBib2R5VGV4dFByb3ZpZGVyLnRpbnRDb2xvclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRVdGlsLnRleHQuYXV0b0ZvbnRTaXplIGJvZHlUZXh0LCB7IHdpZHRoOiBAd2lkdGgsIGhlaWdodDogYm9keVRleHRIZWlnaHQgfSwgeyB4OiBBbGlnbi5sZWZ0LCB5OiBoZWFkZXJUZXh0Lm1heFkgfVxuXG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIFNtYWxsIGZsYXRcblx0c21hbGxGbGF0OiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBUZW1wbGF0ZSA9IFRlbXBsYXRlLkZsYXRcblx0XHRAcHJvcHMgPSB3aWR0aDogMTIwLCBoZWlnaHQ6IDM2LCBzY2FsZTogMVxuXG5cdFx0IyBQYXJhbWV0ZXJzXG5cdFx0b3B0aW9ucy5pbWFnZVByb3ZpZGVyID89IHt9XG5cdFx0b3B0aW9ucy50ZXh0UHJvdmlkZXIgPz0ge31cblxuXHRcdGltYWdlUHJvdmlkZXIgPSBfLmRlZmF1bHRzKG9wdGlvbnMuaW1hZ2VQcm92aWRlciwgeyB0d29QaWVjZUltYWdlQmFja2dyb3VuZDogXCJcIiwgdHdvUGllY2VJbWFnZUZvcmVncm91bmQ6IFwiXCIsIHRpbnRDb2xvcjogQHRpbnRDb2xvciB9KVxuXHRcdHRleHRQcm92aWRlciA9IF8uZGVmYXVsdHMob3B0aW9ucy50ZXh0UHJvdmlkZXIsIHsgdGludENvbG9yOiBAdGludENvbG9yIH0pXG5cblx0XHRpbWFnZSA9IG5ldyBMYXllclxuXHRcdFx0eDogQWxpZ24ubGVmdCwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRzaXplOiAyMFxuXHRcdFx0aW1hZ2U6IGltYWdlUHJvdmlkZXIub25lUGllY2VJbWFnZVxuXHRcdFx0YnJpZ2h0bmVzczogMCwgY29udHJhc3Q6IDUwLCBpbnZlcnQ6IDEwMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdHRleHQgPSBuZXcgTGF5ZXJcblx0XHRcdGh0bWw6IHRleHRQcm92aWRlci5sYWJlbFxuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdGZvbnRTaXplOiBcIjI4cHhcIiwgZm9udFdlaWdodDogXCI1MDBcIlxuXHRcdFx0XHRsaW5lSGVpZ2h0OiBcIiN7QGhlaWdodH1weFwiXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IFwiLTAuMnB4XCJcblx0XHRcdFx0dGV4dEFsaWduOiBcImxlZnRcIlxuXHRcdFx0Y29sb3I6IHRleHRQcm92aWRlci50aW50Q29sb3Jcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0VXRpbC50ZXh0LmF1dG9Gb250U2l6ZSB0ZXh0LCB7IGhlaWdodDogQGhlaWdodCB9LCB7IHg6IGltYWdlLm1heFggKyAzLCB5OiBBbGlnbi5jZW50ZXIgfVxuXG5cdFx0aWYgQGNvbnRlbnRGcmFtZSgpLndpZHRoID4gQHdpZHRoXG5cdFx0XHRVdGlsLnRleHQuYXV0b0ZvbnRTaXplIHRleHQsIHsgd2lkdGg6IEB3aWR0aCAtIGltYWdlLndpZHRoLCBoZWlnaHQ6IEBoZWlnaHQgfSwgeyB4OiBpbWFnZS5tYXhYICsgMywgeTogQWxpZ24uY2VudGVyIH1cblxuXHRcdCMgRXZlbnQgOiBDaGFuZ2UgY29sdW1uIGFsaWdubWVudFxuXHRcdEBvbiBcImNoYW5nZToje0V2ZW50cy5Db2x1bW5BbGlnbm1lbnR9XCIsIC0+XG5cdFx0XHRpZiBAY29sdW1uQWxpZ25tZW50IGlzIENvbHVtbkFsaWdubWVudC5MZWFkaW5nXG5cdFx0XHRcdGltYWdlLnggPSBBbGlnbi5sZWZ0XG5cdFx0XHRcdHRleHQueCA9IGltYWdlLm1heFggKyAzXG5cdFx0XHRlbHNlIGlmIEBjb2x1bW5BbGlnbm1lbnQgaXMgQ29sdW1uQWxpZ25tZW50LlRyYWlsaW5nXG5cdFx0XHRcdGltYWdlLnggPSBBbGlnbi5yaWdodFxuXHRcdFx0XHR0ZXh0LnggPSBpbWFnZS54IC0gdGV4dC53aWR0aCAtIDNcblx0XHRcdFx0XG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIER1bW15XG5cdGR1bW15OiAoaW1hZ2VVcmwgPSBcIlwiKSAtPlxuXHRcdEB0ZW1wbGF0ZSA9IFRlbXBsYXRlXG5cdFx0QGltYWdlID0gaW1hZ2VVcmxcblxuXHRcdHJldHVybiB0aGlzXG5cbiMgQ2xvY2tGYWNlXG5jbGFzcyBDbG9ja0ZhY2UgZXh0ZW5kcyBMYXllclxuXHQjIENvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IFwicmdiYSgyNTUsMjU1LDI1NSwuMilcIlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdCMgQmFja2dyb3VuZFxuXHRcdEBiZyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuYmdcIlxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiYmxhY2tcIlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxMlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0QGJnLmZyYW1lID0gVXRpbHMuZnJhbWVJbnNldCBAYmcsIDEwXG5cblx0XHQjIENvbXBsaWNhdGlvblxuXHRcdEBjb21wbGljYXRpb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmNvbXBsaWNhdGlvblwiXG5cdFx0XHR3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJibGFja1wiXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdCMgTGFiZWxcblx0XHRAbGFiZWwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmxhYmVsXCJcblx0XHRcdGh0bWw6IEBuYW1lXG5cdFx0XHRzdHlsZTogXG5cdFx0XHRcdGZvbnRTaXplOiBcIiN7MjQgKiAxLzAuNyoyODQvMjcyfXB4XCIsIGZvbnRXZWlnaHQ6IFwiNDAwXCJcblx0XHRcdFx0bGluZUhlaWdodDogXCIxXCJcblx0XHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcblx0XHRcdHBhcmVudDogQFxuXG5cdFx0QGxhYmVsLm9uIFwiY2hhbmdlOmh0bWxcIiwgLT5cblx0XHRcdFV0aWwudGV4dC5hdXRvU2l6ZSBAXG5cdFx0XHRAcHJvcHMgPVx0eDogQWxpZ24uY2VudGVyKC03KSwgbWF4WTogLTEzXG5cblx0IyBDaGFuZ2UgbW9kZVxuXHRtb2RlQ2hhbmdlOiAodHlwZSA9IHRydWUpIC0+XG5cdFx0aWYgdHlwZVxuXHRcdFx0QHByb3BzID1cblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiAxNVxuXHRcdFx0XHRzY2FsZTogMjczIC8gMjg1XG5cdFx0XHRAY29tcGxpY2F0aW9uLnByb3BzID1cblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiAxMlxuXHRcdFx0XHRzY2FsZTogMjM5IC8gMjczXG5cdFx0ZWxzZSBcblx0XHRcdEBwcm9wcyA9XG5cdFx0XHRcdGJvcmRlclJhZGl1czogMFxuXHRcdFx0XHRzY2FsZTogMVxuXHRcdFx0QGNvbXBsaWNhdGlvbi5wcm9wcyA9XG5cdFx0XHRcdGJvcmRlclJhZGl1czogMFxuXHRcdFx0XHRzY2FsZTogMVxuXG5cdCMgQ2lyY3VsYXJcblx0Y2lyY3VsYXI6IChjb21wbGljYXRpb25zID0gW10pIC0+XG5cdFx0QGxhYmVsLmh0bWwgPSBAbmFtZSA9IFwi7Ius7ZSMXCJcblx0XHRAY2xvY2sgPSBuZXcgQW5hbG9nQ2xvY2sgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBAaGVpZ2h0LCBwYXJlbnQ6IEBjb21wbGljYXRpb25cblxuXHRcdGZvciBjb21wbGljYXRpb24sIGkgaW4gY29tcGxpY2F0aW9uc1xuXHRcdFx0aWYgY29tcGxpY2F0aW9uXG5cdFx0XHRcdEBjb21wbGljYXRpb24uYWRkQ2hpbGQgY29tcGxpY2F0aW9uXG5cdFx0XHRcdHN3aXRjaCBpXG5cdFx0XHRcdFx0d2hlbiAwXG5cdFx0XHRcdFx0XHRjb21wbGljYXRpb24ucHJvcHMgPSB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi50b3AsIG9yaWdpblg6IDAsIG9yaWdpblk6IDBcblx0XHRcdFx0XHRcdGNvbXBsaWNhdGlvbi5jb2x1bW5BbGlnbm1lbnQgPSBleHBvcnRzLkNvbXBsaWNhdGlvbi5Db2x1bW5BbGlnbm1lbnQuTGVhZGluZ1xuXHRcdFx0XHRcdHdoZW4gMSBcblx0XHRcdFx0XHRcdGNvbXBsaWNhdGlvbi5wcm9wcyA9IHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi50b3AsIG9yaWdpblg6IDEsIG9yaWdpblk6IDBcblx0XHRcdFx0XHRcdGNvbXBsaWNhdGlvbi5jb2x1bW5BbGlnbm1lbnQgPSBleHBvcnRzLkNvbXBsaWNhdGlvbi5Db2x1bW5BbGlnbm1lbnQuVHJhaWxpbmdcblx0XHRcdFx0XHR3aGVuIDIgXG5cdFx0XHRcdFx0XHRjb21wbGljYXRpb24ucHJvcHMgPSB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi5ib3R0b20sIG9yaWdpblg6IDAsIG9yaWdpblk6IDFcblx0XHRcdFx0XHRcdGNvbXBsaWNhdGlvbi5jb2x1bW5BbGlnbm1lbnQgPSBleHBvcnRzLkNvbXBsaWNhdGlvbi5Db2x1bW5BbGlnbm1lbnQuTGVhZGluZ1xuXHRcdFx0XHRcdHdoZW4gM1xuXHRcdFx0XHRcdFx0Y29tcGxpY2F0aW9uLnByb3BzID0geDogQWxpZ24ucmlnaHQsIHk6IEFsaWduLmJvdHRvbSwgb3JpZ2luWDogMSwgb3JpZ2luWTogMVxuXHRcdFx0XHRcdFx0Y29tcGxpY2F0aW9uLmNvbHVtbkFsaWdubWVudCA9IGV4cG9ydHMuQ29tcGxpY2F0aW9uLkNvbHVtbkFsaWdubWVudC5UcmFpbGluZ1xuXG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIFV0aWxpdGFyaWFuXG5cdHV0aWxpdGFyaWFuOiAoY29tcGxpY2F0aW9ucyA9IFtdKSAtPlxuXHRcdEBsYWJlbC5odG1sID0gQG5hbWUgPSBcIuycoO2LuOumrO2LsFwiXG5cdFx0QGNsb2NrID0gbmV3IEFuYWxvZ0Nsb2NrIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogQGhlaWdodCwgcGFyZW50OiBAY29tcGxpY2F0aW9uXG5cblx0XHRmb3IgY29tcGxpY2F0aW9uLCBpIGluIGNvbXBsaWNhdGlvbnNcblx0XHRcdGlmIGNvbXBsaWNhdGlvblxuXHRcdFx0XHRAY29tcGxpY2F0aW9uLmFkZENoaWxkIGNvbXBsaWNhdGlvblxuXHRcdFx0XHRzd2l0Y2ggaVxuXHRcdFx0XHRcdHdoZW4gMCBcblx0XHRcdFx0XHRcdGNvbXBsaWNhdGlvbi5wcm9wcyA9IHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLnRvcFxuXHRcdFx0XHRcdFx0Y29tcGxpY2F0aW9uLmNvbHVtbkFsaWdubWVudCA9IGV4cG9ydHMuQ29tcGxpY2F0aW9uLkNvbHVtbkFsaWdubWVudC5MZWFkaW5nXG5cdFx0XHRcdFx0d2hlbiAxXG5cdFx0XHRcdFx0XHRjb21wbGljYXRpb24ucHJvcHMgPSB4OiBBbGlnbi5yaWdodCwgeTogQWxpZ24udG9wXG5cdFx0XHRcdFx0XHRjb21wbGljYXRpb24uY29sdW1uQWxpZ25tZW50ID0gZXhwb3J0cy5Db21wbGljYXRpb24uQ29sdW1uQWxpZ25tZW50LlRyYWlsaW5nXG5cdFx0XHRcdFx0d2hlbiAyIHRoZW4gY29tcGxpY2F0aW9uLnByb3BzID0geDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b21cblxuXHRcdHJldHVybiB0aGlzXG5cblx0IyBNb2R1bGFyXG5cdG1vZHVsYXI6IChjb21wbGljYXRpb25zID0gW10pIC0+XG5cdFx0QGxhYmVsLmh0bWwgPSBAbmFtZSA9IFwi66qo65OIXCJcblx0XHRAY2xvY2sgPSBuZXcgRGlnaXRhbENsb2NrIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogQGhlaWdodCwgcGFyZW50OiBAY29tcGxpY2F0aW9uXG5cblx0XHRmb3IgY29tcGxpY2F0aW9uLCBpIGluIGNvbXBsaWNhdGlvbnNcblx0XHRcdGlmIGNvbXBsaWNhdGlvblxuXHRcdFx0XHRAY29tcGxpY2F0aW9uLmFkZENoaWxkIGNvbXBsaWNhdGlvblxuXHRcdFx0XHRzd2l0Y2ggaVxuXHRcdFx0XHRcdHdoZW4gMCB0aGVuIGNvbXBsaWNhdGlvbi5wcm9wcyA9IHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLnRvcCgzOClcblx0XHRcdFx0XHR3aGVuIDEgdGhlbiBjb21wbGljYXRpb24ucHJvcHMgPSB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi5ib3R0b21cblx0XHRcdFx0XHR3aGVuIDIgdGhlbiBjb21wbGljYXRpb24ucHJvcHMgPSB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbVxuXHRcdFx0XHRcdHdoZW4gMyB0aGVuIGNvbXBsaWNhdGlvbi5wcm9wcyA9IHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi5ib3R0b21cblx0XHRcdFx0XHR3aGVuIDQgdGhlbiBjb21wbGljYXRpb24ucHJvcHMgPSB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlcigxOSlcblx0XHRcdFx0XHRcblx0XHRyZXR1cm4gdGhpc1xuXG5cbiMgQ2xvY2tcbmNsYXNzIENsb2NrIGV4dGVuZHMgTGF5ZXJcblx0IyBDb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBcIlwiXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdCMgU3RhcnQgdGltZVxuXHRzdGFydDogKHRpbWVyKSAtPiBAdGltZXIgPSB0aW1lclxuXHQjIFN0b3AgdGltZVxuXHRzdG9wOiAtPiBjbGVhckludGVydmFsIEB0aW1lciBpZiBAdGltZXJcblxuXG4jIENsb2NrIDogRGlnaXRhbFxuY2xhc3MgRGlnaXRhbENsb2NrIGV4dGVuZHMgQ2xvY2tcblx0IyBDb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLm5hbWUgPSBcIkRpZ2l0YWxDbG9ja1wiXG5cdFx0b3B0aW9ucy5odG1sID0gVXRpbC5kYXRlLnRpbWVGb3JtYXR0ZXIgVXRpbC5kYXRlLmdldFRpbWUoKVxuXHRcdG9wdGlvbnMuc3R5bGUgPVxuXHRcdFx0Zm9udFNpemU6IFwiODVweFwiLCBmb250V2VpZ2h0OiBcIjMwMFwiXG5cdFx0XHRsaW5lSGVpZ2h0OiBcIjFcIlxuXHRcdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcblx0XHRcdGxldHRlclNwYWNpbmc6IFwiLTNweFwiXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0VXRpbC50ZXh0LmF1dG9TaXplIEBcblx0XHRAcHJvcHMgPSB4OiBBbGlnbi5yaWdodCgtMTIpLCB5OiBBbGlnbi50b3AoNDMpXG5cblx0XHQjIFN0YXJ0IHRpbWVcblx0XHRAc3RhcnQoKVxuXG5cdHN0YXJ0OiAtPlxuXHRcdHN1cGVyXG5cdFx0QHRpbWUgPSBVdGlsLmRhdGUuZ2V0VGltZSgpXG5cdFx0QGh0bWwgPSBVdGlsLmRhdGUudGltZUZvcm1hdHRlciBAdGltZSA9IFV0aWwuZGF0ZS5nZXRUaW1lKClcblx0XHRVdGlscy5kZWxheSA2MCAtIEB0aW1lLnNlY3MsID0+IFxuXHRcdFx0QGh0bWwgPSBVdGlsLmRhdGUudGltZUZvcm1hdHRlciBAdGltZSA9IFV0aWwuZGF0ZS5nZXRUaW1lKClcblx0XHRcdEB0aW1lciA9IFV0aWxzLmludGVydmFsIDYwLCA9PiBAaHRtbCA9IFV0aWwuZGF0ZS50aW1lRm9ybWF0dGVyIEB0aW1lID0gVXRpbC5kYXRlLmdldFRpbWUoKVxuXHRcdFx0c3VwZXIgQHRpbWVyXG5cblxuIyBDbG9jayA6IEFuYWxvZ1xuY2xhc3MgQW5hbG9nQ2xvY2sgZXh0ZW5kcyBDbG9ja1xuXHQjIENvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBib3JkZXJSYWRpdXMgPSBAd2lkdGgvMlxuXG5cdFx0IyBFZGdlXG5cdFx0QGVkZ2UgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmVkZ2VcIlxuXHRcdFx0cG9pbnQ6IEFsaWduLmNlbnRlclxuXHRcdFx0c2l6ZTogQHdpZHRoXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcblx0XHRcdHBhcmVudDogQFxuXG5cdFx0c2VjQW5nbGUgPSAzNjAgLyA2MFxuXHRcdGZvciBpIGluIFsxLi42MF1cblx0XHRcdCMgSG91clxuXHRcdFx0aWYgaSUlNSBpcyAwXG5cdFx0XHRcdGhvdXJCYXIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRuYW1lOiBcIi5lZGdlLmhvdXJcIlxuXHRcdFx0XHRcdGh0bWw6IGkgLyA1XG5cdFx0XHRcdFx0c3R5bGU6XG5cdFx0XHRcdFx0XHRmb250U2l6ZTogXCI0MHB4XCIsIGZvbnRXZWlnaHQ6IFwiNDAwXCJcblx0XHRcdFx0XHRcdGxpbmVIZWlnaHQ6IFwiMVwiXG5cdFx0XHRcdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRcdFx0cGFyZW50OiBAZWRnZVxuXHRcdFx0XHRVdGlsLnRleHQuYXV0b1NpemUgaG91ckJhclxuXHRcdFx0XHRhID0gKC05MCArIChzZWNBbmdsZSAqIGkpKSAqIChNYXRoLlBJIC8gMTgwKVxuXHRcdFx0XHRyID0gQGVkZ2Uud2lkdGgvMiAtIGhvdXJCYXIuaGVpZ2h0ICsgM1xuXHRcdFx0XHRob3VyQmFyLnByb3BzID0gXG5cdFx0XHRcdFx0eDogQGVkZ2Uud2lkdGgvMiAtIGhvdXJCYXIud2lkdGgvMiArIE1hdGguY29zKGEpICogclxuXHRcdFx0XHRcdHk6IEBlZGdlLmhlaWdodC8yIC0gaG91ckJhci5oZWlnaHQvMiArIE1hdGguc2luKGEpICogclxuXHRcdFx0XG5cdFx0XHQjIE1pbnV0ZVxuXHRcdFx0aWYgaSAlJSA1IGlzIDBcblx0XHRcdFx0bWluQmFyID0gbmV3IExheWVyXG5cdFx0XHRcdFx0bmFtZTogXCIuZWRnZS5taW5cIlxuXHRcdFx0XHRcdGh0bWw6IGlmIGkgPCAxMCB0aGVuIFwiMCN7aX1cIiBlbHNlIGlcblx0XHRcdFx0XHRzdHlsZTpcblx0XHRcdFx0XHRcdGZvbnRTaXplOiBcIjEzcHhcIiwgZm9udFdlaWdodDogXCI0MDBcIlxuXHRcdFx0XHRcdFx0bGluZUhlaWdodDogXCIxXCJcblx0XHRcdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0XHRcdFx0bGV0dGVyU3BhY2luZzogXCItMXB4XCJcblx0XHRcdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRcdFx0cGFyZW50OiBAZWRnZVxuXHRcdFx0XHRVdGlsLnRleHQuYXV0b1NpemUgbWluQmFyXG5cdFx0XHRcdGEgPSAoLTkwICsgKHNlY0FuZ2xlICogaSkpICogKE1hdGguUEkgLyAxODApXG5cdFx0XHRcdHIgPSBAZWRnZS53aWR0aC8yIC0gbWluQmFyLmhlaWdodCArIDlcblx0XHRcdFx0ciAtPSAyIGlmIGkgaXMgMTUgb3IgaSBpcyA0NVxuXHRcdFx0XHRtaW5CYXIucHJvcHMgPSBcblx0XHRcdFx0XHR4OiBAZWRnZS53aWR0aC8yIC0gbWluQmFyLndpZHRoLzIgKyBNYXRoLmNvcyhhKSAqIHJcblx0XHRcdFx0XHR5OiBAZWRnZS5oZWlnaHQvMiAtIG1pbkJhci5oZWlnaHQvMiArIE1hdGguc2luKGEpICogclxuXHRcdFx0IyBTZWNvbmRcblx0XHRcdGVsc2Vcblx0XHRcdFx0c2VjQmFyID0gbmV3IExheWVyXG5cdFx0XHRcdFx0bmFtZTogXCIuc2VjXCJcblx0XHRcdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtQGVkZ2Uud2lkdGgvMiArIDgpXG5cdFx0XHRcdFx0d2lkdGg6IDIsIGhlaWdodDogOFxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LC41KVwiXG5cdFx0XHRcdFx0cGFyZW50OiBuZXcgTGF5ZXIgbmFtZTogXCIuZWRnZS5zZWMucGFyZW50XCIsIHBvaW50OiBBbGlnbi5jZW50ZXIsIHNpemU6IDEsIG9yaWdpblg6IC41LCBvcmlnaW5ZOiAxLCByb3RhdGlvbjogc2VjQW5nbGUgKiBpLCBiYWNrZ3JvdW5kQ29sb3I6IFwiXCIsIHBhcmVudDogQGVkZ2VcblxuXHRcdCMgQXJyb3cgOiBNaW51dGVcblx0XHRAbWluID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5taW5cIlxuXHRcdFx0cG9pbnQ6IEFsaWduLmNlbnRlclxuXHRcdFx0c2l6ZTogMTJcblx0XHRcdGJvcmRlclJhZGl1czogN1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdEBtaW4uYm90dG9tID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5taW4uYm90dG9tXCJcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC1AbWluLndpZHRoLzIgKyAyKVxuXHRcdFx0d2lkdGg6IDQsIGhlaWdodDogMjAgKyAyXG5cdFx0XHRib3JkZXJSYWRpdXM6IDJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRwYXJlbnQ6IEBtaW5cblx0XHRAbWluLnRvcCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIubWluLnRvcFwiXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIG1heFk6IEBtaW4uYm90dG9tLm1pblkgKyA1XG5cdFx0XHR3aWR0aDogMTAsIGhlaWdodDogQHdpZHRoLzIgLSAxMCAtIDIwICsgNVxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA1XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRcdFx0cGFyZW50OiBAbWluXG5cblxuXHRcdCMgQXJyb3cgOiBIb3VyXG5cdFx0QGhvdXIgPSBAbWluLmNvcHkoKVxuXHRcdEBob3VyLnBhcmVudCA9IEBcblx0XHRAaG91ci5jaGlsZHJlblsxXS5oZWlnaHQgLT0gNTBcblx0XHRAaG91ci5jaGlsZHJlblsxXS5tYXhZID0gQGhvdXIuY2hpbGRyZW5bMF0ubWluWSArIDVcblxuXHRcdEBtaW4uc2VuZFRvQmFjaygpXG5cdFx0QGhvdXIuc2VuZFRvQmFjaygpXG5cblx0XHQjIEFycm93IDogU2Vjb25kXG5cdFx0QHNlYyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuc2VjXCJcblx0XHRcdHBvaW50OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNpemU6IDhcblx0XHRcdGJvcmRlclJhZGl1czogN1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIm9yYW5nZVwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRAc2VjLmJhciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuc2VjLmJhclwiXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgxOClcblx0XHRcdHdpZHRoOiAyLCBoZWlnaHQ6IEB3aWR0aC8yICsgMjJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQHNlYy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHBhcmVudDogQHNlY1xuXHRcdEBzZWMuZG90ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5zZWMuZG90XCJcblx0XHRcdHBvaW50OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNpemU6IDJcblx0XHRcdGJvcmRlclJhZGl1czogMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImJsYWNrXCJcblx0XHRcdHBhcmVudDogQHNlY1xuXG5cdFx0IyBFdmVudHNcblx0XHRhbmltYXRpb25FbmQgPSAtPiBAcm90YXRpb24gPSAwIGlmIEByb3RhdGlvbiBpcyAzNjBcblx0XHRAc2VjLm9uQW5pbWF0aW9uRW5kIGFuaW1hdGlvbkVuZFxuXHRcdEBtaW4ub25BbmltYXRpb25FbmQgYW5pbWF0aW9uRW5kXG5cdFx0QGhvdXIub25BbmltYXRpb25FbmQgYW5pbWF0aW9uRW5kXG5cblx0XHQjIFN0YXJ0IHRpbWVcblx0XHRAc3RhcnQoKVxuXG5cdHVwZGF0ZTogKGFuaW1hdGUgPSB0cnVlKSA9PlxuXHRcdHRpbWUgPSBVdGlsLmRhdGUuZ2V0VGltZSgpXG5cdFx0XG5cdFx0dGltZS5zZWNzID0gNjAgaWYgdGltZS5zZWNzIGlzIDBcblx0XHR0aW1lLm1pbnMgPSA2MCBpZiB0aW1lLm1pbnMgaXMgMFxuXHRcdHRpbWUuaG91cnMgPSB0aW1lLmhvdXJzIC0gMTIgaWYgdGltZS5ob3VycyA+IDEyXG5cdFx0dGltZS5ob3VycyA9IDEyIGlmIHRpbWUuaG91cnMgaXMgMFxuXHRcdFxuXHRcdHNlY0FuZ2xlID0gKDM2MCAvIDYwKSAqIHRpbWUuc2Vjc1xuXHRcdG1pbkFuZ2xlID0gKDM2MCAvIDYwKSAqIHRpbWUubWluc1xuXHRcdG1pbkFuZ2xlICs9ICgzNjAgLyA2MCAvIDYwKSAqIHRpbWUuc2VjcyB1bmxlc3MgdGltZS5zZWNzIGlzIDYwXG5cdFx0aG91ckFuZ2xlID0gKDM2MCAvIDEyKSAqIHRpbWUuaG91cnNcblx0XHRob3VyQW5nbGUgKz0gKDM2MCAvIDEyIC8gNjApICogdGltZS5taW5zIHVubGVzcyB0aW1lLm1pbnMgaXMgNjBcblx0XHRcblx0XHRAc2VjLmFuaW1hdGVTdG9wKClcblx0XHRAbWluLmFuaW1hdGVTdG9wKClcblx0XHRAaG91ci5hbmltYXRlU3RvcCgpXG5cdFx0XG5cdFx0aWYgYW5pbWF0ZVxuXHRcdFx0QHNlYy5hbmltYXRlIHJvdGF0aW9uOiBzZWNBbmdsZSwgb3B0aW9uczogeyB0aW1lOiAuOTgsIGN1cnZlOiBcImxpbmVhclwiIH1cblx0XHRcdEBtaW4uYW5pbWF0ZSByb3RhdGlvbjogbWluQW5nbGUsIG9wdGlvbnM6IHsgY3VydmU6IFwibGluZWFyXCIgfVxuXHRcdFx0QGhvdXIuYW5pbWF0ZSByb3RhdGlvbjogaG91ckFuZ2xlLCBvcHRpb25zOiB7IGN1cnZlOiBcImxpbmVhclwiIH1cblx0XHRlbHNlIFxuXHRcdFx0QHNlYy5yb3RhdGlvbiA9IHNlY0FuZ2xlXG5cdFx0XHRAbWluLnJvdGF0aW9uID0gbWluQW5nbGVcblx0XHRcdEBob3VyLnJvdGF0aW9uID0gaG91ckFuZ2xlXG5cblx0c3RhcnQ6IC0+XG5cdFx0QHVwZGF0ZSBmYWxzZVxuXHRcdEB0aW1lciA9IFV0aWxzLmludGVydmFsIDEsIEB1cGRhdGVcblx0XHRzdXBlciBAdGltZXIiLCInJydcbndhdGNoT1MgOiBBcHBcblxuQGF1dGhlciBKdW5naG8gc29uZyAodGhyZWV3b3JkLmNvbSlcbkBzaW5jZSAyMDE2LjExLjI0XG4nJydcbmNsYXNzIGV4cG9ydHMuQXBwIGV4dGVuZHMgTGF5ZXJcblxuXHQjIEV2ZW50c1xuXHRFdmVudHMuVG9Eb2NrID0gXCJ0b0RvY2tcIlxuXHRFdmVudHMuRnJvbURvY2sgPSBcImZyb21Eb2NrXCJcblxuXHQjIENvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMubmFtZSA/PSBcIkFwcFwiXG5cdFx0b3B0aW9ucy53aWR0aCA/PSBEZXZpY2Uud2lkdGhcblx0XHRvcHRpb25zLmhlaWdodCA/PSBEZXZpY2UuaGVpZ2h0XG5cdFx0b3B0aW9ucy5jbGlwID89IHRydWVcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBcImJsYWNrXCJcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRvcHRpb25zLmFjY2VudENvbG9yID89IFwiI2FlYjRiZlwiXG5cdFx0YWNjZW50Q29sb3IgPSBvcHRpb25zLmFjY2VudENvbG9yXG5cblx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0IyBQdWJsaWNcblx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHR0b0RvY2s6IC0+XG5cdFx0aWYgQGhlYWRlclxuXHRcdFx0QGhlYWRlci50aW1lLmFuaW1hdGUgb3BhY2l0eTogMCwgb3B0aW9uczogeyB0aW1lOiAuMjAsIGRlbGF5OiAuMyB9XG5cblx0XHRAZW1pdCBFdmVudHMuVG9Eb2NrLCBAXG5cblx0ZnJvbURvY2s6IC0+XG5cdFx0aWYgQGhlYWRlclxuXHRcdFx0QGhlYWRlci50aW1lLmFuaW1hdGUgb3BhY2l0eTogMSwgb3B0aW9uczogeyB0aW1lOiAuMTUsIGRlbGF5OiAuMiB9XG5cblx0XHRAZW1pdCBFdmVudHMuRnJvbURvY2ssIEBcblxuXHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQjIFByaXZhdGVcblx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQjIEV2ZW50IEhlbHBlclxuXHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRvblRvRG9jazogKGNiKSAtPiBAb24gRXZlbnRzLlRvRG9jaywgY2Jcblx0b25Gcm9tRG9jazogKGNiKSAtPiBAb24gRXZlbnRzLkZyb21Eb2NrLCBjYiIsIicnJ1xud2F0Y2hPUyA6IEFwcHNcblxuQGF1dGhlciBKdW5naG8gc29uZyAodGhyZWV3b3JkLmNvbSlcbkBzaW5jZSAyMDE2LjExLjIzXG4nJydcbmNsYXNzIGV4cG9ydHMuQXBwcyBleHRlbmRzIExheWVyXG5cdGNsb2NrU2l6ZSA9IDg0XG5cdGNsb2NrU2NhbGUgPSAxXG5cblx0YXBwU2l6ZSA9IGNsb2NrU2l6ZSAtIDEwXG5cdGFwcFNjYWxlID0gMVxuXG5cdCMgQ29uc3RydWN0b3Jcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy5uYW1lID89IFwiQXBwc1wiXG5cdFx0b3B0aW9ucy5pbWFnZSA/PSBcImltYWdlcy9hcHBzLmpwZ1wiXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0Y2xvY2tTY2FsZSA9IGNsb2NrU2l6ZSAvIE1hdGguc3FydCggTWF0aC5wb3coQHdpZHRoLCAyKSArIE1hdGgucG93KEBoZWlnaHQsIDIpIClcblx0XHRhcHBTY2FsZSA9IGFwcFNpemUgLyBNYXRoLnNxcnQoIE1hdGgucG93KEB3aWR0aCwgMikgKyBNYXRoLnBvdyhAaGVpZ2h0LCAyKSApXG5cblx0XHRAX2Nsb2NrZmFjZXMgPSBvcHRpb25zLmNsb2NrZmFjZXNcblx0XHRAX2FwcEluZm8gPSBvcHRpb25zLmFwcEluZm9cblx0XHRAX2FwcCA9IEBfYXBwSW5mby5hcHBcblxuXHRcdEBhbmlPcHRpb25zU2hvdyA9IHRpbWU6IC4zLCBjdXJ2ZTogXCJlYXNlLW91dFwiXG5cdFx0QGFuaU9wdGlvbnNEaXNtaXNzID0gdGltZTogLjI1LCBjdXJ2ZTogXCJlYXNlLWluXCJcblxuXHRcdEBjbG9ja2ZhY2UgPSBuZXcgQXBwXG5cdFx0XHRuYW1lOiBcImNsb2NrZmFjZXNcIlxuXHRcdFx0cG9pbnQ6IEFsaWduLmNlbnRlclxuXHRcdFx0c2l6ZTogY2xvY2tTaXplXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRAY2xvY2tmYWNlLm9uQ2xpY2sgPT4gQGRpc21pc3MgQF9jbG9ja2ZhY2VzXG5cblx0XHQjIEV4aXN0IGFwcFxuXHRcdGlmIEBfYXBwXG5cdFx0XHRAYXBwID0gbmV3IEFwcFxuXHRcdFx0XHRuYW1lOiBcImFwcFwiXG5cdFx0XHRcdHg6QWxpZ24uY2VudGVyKDkwKSwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRcdHNpemU6IGFwcFNpemVcblx0XHRcdFx0aHRtbDogXCJBUFBcIlxuXHRcdFx0XHRzdHlsZTpcblx0XHRcdFx0XHRmb250U2l6ZTogXCIyMHB4XCIsIGZvbnRXZWlnaHQ6IFwiNjAwXCJcblx0XHRcdFx0XHRsaW5lSGVpZ2h0OiBcIiN7YXBwU2l6ZX1weFwiXG5cdFx0XHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRcdFx0Ym9yZGVyU3R5bGU6IFwiZGFzaGVkXCJcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBhcHBTaXplLzIsIGJvcmRlcldpZHRoOiAxLCBib3JkZXJDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRcdHBhcmVudDogQFxuXG5cdFx0XHRpZiBAX2FwcEluZm8uaWNvblxuXHRcdFx0XHRAYXBwLnByb3BzID0gXG5cdFx0XHRcdFx0aHRtbDogXCJcIlxuXHRcdFx0XHRcdGJvcmRlcldpZHRoOiAwXG5cdFx0XHRcdFx0aW1hZ2U6IEBfYXBwSW5mby5pY29uXG5cdFx0XHRcdFx0XG5cdFx0XHRAYXBwLm9uQ2xpY2sgPT4gQGRpc21pc3MgQF9hcHBcblxuXHRcdEBzY2FsZSA9IDEgLyBjbG9ja1NjYWxlXG5cdFx0QHNlbmRUb0JhY2soKVxuXG5cdGluaXQ6IC0+XG5cdFx0QHByb3BzID0gdmlzaWJsZTogdHJ1ZSxcdHNjYWxlOiAxLCBwb2ludDogQWxpZ24uY2VudGVyXG5cblx0c2hvdzogKGFwcCkgLT5cblx0XHRyZXR1cm4gaWYgQGlzQW5pbWF0aW5nXG5cdFx0XG5cdFx0IyBDbG9ja0ZhY2Vcblx0XHRpZiBhcHAgaXMgQF9jbG9ja2ZhY2VzXG5cdFx0XHRAcHJvcHMgPSBzY2FsZTogMSAvIGNsb2NrU2NhbGUsIHBvaW50OiBBbGlnbi5jZW50ZXJcblx0XHRcdEBhbmltYXRlIHNjYWxlOiAxLCBvcHRpb25zOiBAYW5pT3B0aW9uc1Nob3dcblx0XHRcdFxuXHRcdFx0QGNsb2NrZmFjZS5hZGRDb250ZW50IEBfY2xvY2tmYWNlcywgY2xvY2tTY2FsZVxuXHRcdFx0QF9jbG9ja2ZhY2VzLnRpbWVTdG9wKClcblxuXHRcdFx0QHZpc2libGUgPSB0cnVlXG5cdFx0XHRAYnJpbmdUb0Zyb250KClcblx0XHRcdFxuXHRcdFx0QGNsb2NrZmFjZS5zaG93KClcblxuXHRcdFx0QF9jbG9ja2ZhY2VzLmFuaW1hdGVTdG9wKClcblx0XHRcdEBfY2xvY2tmYWNlcy5hbmltYXRlIHNjYWxlOiBjbG9ja1NjYWxlICogMi8zXG5cdFx0XHRcblx0XHQjIEFwcCAoS2FrYW9zdG9jaylcblx0XHRlbHNlIGlmIGFwcCBpcyBAX2FwcFxuXHRcdFx0QHByb3BzID0gc2NhbGU6IDEgLyBhcHBTY2FsZSwgeDogQWxpZ24uY2VudGVyKC05MCAvIGFwcFNjYWxlKSwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRAYW5pbWF0ZSBzY2FsZTogMSwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXIsIG9wdGlvbnM6IEBhbmlPcHRpb25zU2hvd1xuXHRcdFx0XG5cdFx0XHRAYXBwLmFkZENvbnRlbnQgQF9hcHAsIGFwcFNjYWxlXG5cblx0XHRcdEB2aXNpYmxlID0gdHJ1ZVxuXHRcdFx0QGJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcblx0XHRcdEBhcHAuc2hvdygpXG5cdFx0XHRcblx0XHRcdEBfYXBwLmFuaW1hdGVTdG9wKClcblx0XHRcdEBfYXBwLmFuaW1hdGUgc2NhbGU6IGFwcFNjYWxlICogMi8zXG5cblx0ZGlzbWlzczogKGFwcCkgLT5cblx0XHRyZXR1cm4gaWYgQGlzQW5pbWF0aW5nXG5cblx0XHQjIENsb2NrRmFjZVxuXHRcdGlmIGFwcCBpcyBAX2Nsb2NrZmFjZXNcblx0XHRcdHJldHVybiBpZiBAX2Nsb2NrZmFjZXMuaXNBbmltYXRpbmdcblxuXHRcdFx0QGFuaW1hdGUgc2NhbGU6IDEgLyBjbG9ja1NjYWxlLCBvcHRpb25zOiBAYW5pT3B0aW9uc0Rpc21pc3Ncblx0XHRcdFxuXHRcdFx0QGNsb2NrZmFjZS5kaXNtaXNzKClcblxuXHRcdFx0QF9jbG9ja2ZhY2VzLnZpc2libGUgPSB0cnVlXG5cdFx0XHRAX2Nsb2NrZmFjZXMuYW5pbWF0ZSBzY2FsZTogY2xvY2tTY2FsZSwgb3B0aW9uczogeyB0aW1lOiAuOCB9XG5cdFx0XHRVdGlscy5kZWxheSAuOSwgPT5cblx0XHRcdFx0QGNsb2NrZmFjZS5yZW1vdmVDb250ZW50IEBfY2xvY2tmYWNlc1xuXHRcdFx0XHRAX2Nsb2NrZmFjZXMudGltZVN0YXJ0KClcblxuXHRcdFx0XHRAdmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRcblx0XHQjIEFwcCAoS2FrYW9zdG9jaylcblx0XHRlbHNlIGlmIGFwcCBpcyBAX2FwcFxuXHRcdFx0cmV0dXJuIGlmIEBfYXBwLmlzQW5pbWF0aW5nXG5cblx0XHRcdCNcblx0XHRcdGlmIF8uaXNFbXB0eShAYXBwLmNvbnRlbnQuY2hpbGRyZW4pXG5cdFx0XHRcdEBhcHAuYWRkQ29udGVudCBAX2FwcCwgYXBwU2NhbGUgXG5cblx0XHRcdEBhbmltYXRlIHNjYWxlOiAxIC8gYXBwU2NhbGUsIHg6IEFsaWduLmNlbnRlcigtOTAgLyBhcHBTY2FsZSksIHk6IEFsaWduLmNlbnRlciwgb3B0aW9uczogQGFuaU9wdGlvbnNEaXNtaXNzXG5cdFx0XHRcblx0XHRcdEBhcHAuZGlzbWlzcygpXG5cblx0XHRcdEBfYXBwLnZpc2libGUgPSB0cnVlXG5cdFx0XHRAX2FwcC5hbmltYXRlIHNjYWxlOiBhcHBTY2FsZSwgb3B0aW9uczogeyB0aW1lOiAuOCB9XG5cdFx0XHRVdGlscy5kZWxheSAuOSwgPT5cblx0XHRcdFx0QGFwcC5yZW1vdmVDb250ZW50IEBfYXBwXG5cblx0XHRcdFx0QHZpc2libGUgPSBmYWxzZVxuXG4jIEFwcFxuY2xhc3MgQXBwIGV4dGVuZHMgTGF5ZXJcblx0IyBDb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBcIlwiXG5cdFx0b3B0aW9ucy5jbGlwID89IHRydWVcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAaWNvblNpemUgPSBvcHRpb25zLnNpemVcblxuXHRcdEBzdGFydFBvaW50ID0gQHBvaW50XG5cblx0XHRAYmcgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmJnXCJcblx0XHRcdHBvaW50OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNpemU6IEBpY29uU2l6ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImJsYWNrXCJcblx0XHRcdGJvcmRlclJhZGl1czogNDJcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHBhcmVudDogQFxuXG5cdFx0QGNvbnRlbnQgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiY29udGVudFwiXG5cdFx0XHRwb2ludDogQWxpZ24uY2VudGVyXG5cdFx0XHRzaXplOiAwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiYmxhY2tcIlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0MlxuXHRcdFx0Y2xpcDogdHJ1ZVxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRAY29udGVudC5vbiBcImNoYW5nZTpzaXplXCIsID0+XG5cdFx0XHRAY29udGVudC5jZW50ZXIoKVxuXG5cdFx0XHRyZXR1cm4gdW5sZXNzIGFwcCA9IEBjb250ZW50LmNoaWxkcmVuWzBdXG5cdFx0XHRhcHAucHJvcHMgPSB4OiAoQGNvbnRlbnQud2lkdGggLSBhcHAud2lkdGgpIC8gMiwgeTogKEBjb250ZW50LmhlaWdodCAtIGFwcC5oZWlnaHQpIC8gMlxuXG5cdFx0QGFuaU9wdGlvbnNTaG93ID0gdGltZTogLjMsIGN1cnZlOiBcImVhc2Utb3V0XCJcblx0XHRAYW5pT3B0aW9uc0Rpc21pc3MgPSB0aW1lOiAuMjUsIGN1cnZlOiBcImVhc2UtaW5cIlxuXG5cdGluaXQ6IC0+XG5cdFx0QGJnLm9wYWNpdHkgPSAwXG5cdFx0QGNvbnRlbnQuc2l6ZSA9IDBcblxuXHRzaG93OiAtPlxuXHRcdHJldHVybiBpZiBAYmcuaXNBbmltYXRpbmdcblxuXHRcdEBiZy5vcGFjaXR5ID0gMVxuXHRcdEBjb250ZW50LnNpemUgPSBAaWNvblNpemVcblx0XHRAYmcuYW5pbWF0ZSBvcGFjaXR5OiAwLCBvcHRpb25zOiBAYW5pT3B0aW9uc1Nob3dcblx0XHRAY29udGVudC5hbmltYXRlIHdpZHRoOiAwLCBoZWlnaHQ6IDAsIG9wdGlvbnM6IEBhbmlPcHRpb25zU2hvd1xuXG5cdGRpc21pc3M6IC0+XG5cdFx0cmV0dXJuIGlmIEBiZy5pc0FuaW1hdGluZ1xuXG5cdFx0QGJnLmFuaW1hdGUgb3BhY2l0eTogMSwgb3B0aW9uczogQGFuaU9wdGlvbnNEaXNtaXNzXG5cdFx0QGNvbnRlbnQuYW5pbWF0ZSB3aWR0aDogQGljb25TaXplLCBoZWlnaHQ6IEBpY29uU2l6ZSwgb3B0aW9uczogQGFuaU9wdGlvbnNEaXNtaXNzXG5cblx0YWRkQ29udGVudDogKGxheWVyLCBzY2FsZSkgLT5cblx0XHRpZiBsYXllclxuXHRcdFx0QGNvbnRlbnQuYWRkQ2hpbGQgbGF5ZXJcblx0XHRcdGxheWVyLnByb3BzID0gcG9pbnQ6IEFsaWduLmNlbnRlciwgc2NhbGU6IHNjYWxlLCBjbGlwOiB0cnVlXG5cdFxuXHRyZW1vdmVDb250ZW50OiAobGF5ZXIpIC0+XG5cdFx0aWYgbGF5ZXJcblx0XHRcdEBjb250ZW50LnJlbW92ZUNoaWxkIGxheWVyIFxuXHRcdFx0bGF5ZXIucHJvcHMgPSBwb2ludDogMCwgc2NhbGU6IDEsIGNsaXA6IGZhbHNlXG5cdFx0XHRsYXllci5icmluZ1RvRnJvbnQoKVxuXG5cdFx0XHRAaW5pdCgpXG4iLCInJydcblV0aWxpdGllc1xuXG5AYXV0aGVyIEp1bmdobyBzb25nICh0aHJlZXdvcmQuY29tKVxuQHNpbmNlIDIwMTYuMTEuMjRcbicnJ1xuXG4jIFV0aWxpdGlzXG5VdGlsID0ge31cblxuIyBUZXh0XG5VdGlsLnRleHQgPSB7fVxuI1xuVXRpbC50ZXh0LnNpemUgPSAobGF5ZXIsIHBhZGRpbmcgPSB7fSwgY29uc3RyYWludHM9e30pIC0+XG5cdHN0eWxlID0gbGF5ZXIuc3R5bGVcblx0dGV4dCA9IGxheWVyLmh0bWxcblx0c2l6ZUFmZmVjdGluZ1N0eWxlcyA9XG5cdFx0bGluZUhlaWdodDogc3R5bGVbXCJsaW5lLWhlaWdodFwiXVxuXHRcdGZvbnRTaXplOiBzdHlsZVtcImZvbnQtc2l6ZVwiXVxuXHRcdGZvbnRXZWlnaHQ6IHN0eWxlW1wiZm9udC13ZWlnaHRcIl1cblx0XHRwYWRkaW5nOiBzdHlsZVtcInBhZGRpbmdcIl1cblx0XHRwYWRkaW5nVG9wOiBzdHlsZVtcInBhZGRpbmctdG9wXCJdXG5cdFx0cGFkZGluZ1JpZ2h0OiBzdHlsZVtcInBhZGRpbmctcmlnaHRcIl1cblx0XHRwYWRkaW5nQm90dG9tOiBzdHlsZVtcInBhZGRpbmctYm90dG9tXCJdXG5cdFx0cGFkZGluZ0xlZnQ6IHN0eWxlW1wicGFkZGluZy1sZWZ0XCJdXG5cdFx0dGV4dFRyYW5zZm9ybTogc3R5bGVbXCJ0ZXh0LXRyYW5zZm9ybVwiXVxuXHRcdGJvcmRlcldpZHRoOiBzdHlsZVtcImJvcmRlci13aWR0aFwiXVxuXHRcdGxldHRlclNwYWNpbmc6IHN0eWxlW1wibGV0dGVyLXNwYWNpbmdcIl1cblx0XHRmb250RmFtaWx5OiBzdHlsZVtcImZvbnQtZmFtaWx5XCJdXG5cdFx0Zm9udFN0eWxlOiBzdHlsZVtcImZvbnQtc3R5bGVcIl1cblx0XHRmb250VmFyaWFudDogc3R5bGVbXCJmb250LXZhcmlhbnRcIl1cblxuXHRyZXR1cm4gVXRpbHMudGV4dFNpemUgdGV4dCwgc2l6ZUFmZmVjdGluZ1N0eWxlcywgY29uc3RyYWludHNcblxuI1xuVXRpbC50ZXh0LmF1dG9TaXplID0gKGxheWVyLCBwYWRkaW5nID0ge30sIGNvbnN0cmFpbnRzID0ge30pIC0+IGxheWVyLnNpemUgPSBVdGlsLnRleHQuc2l6ZSBsYXllciwgcGFkZGluZywgY29uc3RyYWludHNcblV0aWwudGV4dC5hdXRvRm9udFNpemUgPSAobGF5ZXIsIGNvbnN0cmFpbnRzID0ge30sIGFsaWduID0ge30pIC0+XG5cdFV0aWwudGV4dC5hdXRvU2l6ZSBsYXllclxuXG5cdCMgQWxpZ25tZW50XG5cdGxheWVyLnggPSBhbGlnbi54IGlmIF8uaGFzIGFsaWduLCBcInhcIlxuXHRsYXllci55ID0gYWxpZ24ueSBpZiBfLmhhcyBhbGlnbiwgXCJ5XCJcblxuXHRsYXllci5zdHlsZS5wYWRkaW5nTGVmdCA9IFwiMHB4XCIgaWYgXy5pc05hTihwYXJzZUludChsYXllci5zdHlsZS5wYWRkaW5nTGVmdCkpIFxuXHRsYXllci5zdHlsZS5wYWRkaW5nUmlnaHQgPSBcIjBweFwiIGlmIF8uaXNOYU4ocGFyc2VJbnQobGF5ZXIuc3R5bGUucGFkZGluZ1JpZ2h0KSlcblxuXHRpZiBfLmhhcyBjb25zdHJhaW50cywgXCJ3aWR0aFwiXG5cdFx0d2hpbGUgbGF5ZXIuX2VsZW1lbnRIVE1MLm9mZnNldFdpZHRoICsgcGFyc2VJbnQobGF5ZXIuc3R5bGUucGFkZGluZ0xlZnQpICsgcGFyc2VJbnQobGF5ZXIuc3R5bGUucGFkZGluZ1JpZ2h0KSA+IGNvbnN0cmFpbnRzLndpZHRoXG5cdFx0XHRsYXllci5zdHlsZS5mb250U2l6ZSA9IFwiI3twYXJzZUludChsYXllci5zdHlsZS5mb250U2l6ZSkgLSAxfXB4XCJcblx0XHRcdFV0aWwudGV4dC5hdXRvU2l6ZSBsYXllclxuXG5cdFx0XHQjIEFsaWdubWVudFxuXHRcdFx0bGF5ZXIueCA9IGFsaWduLnggaWYgXy5oYXMgYWxpZ24sIFwieFwiXG5cdFx0XHRsYXllci55ID0gYWxpZ24ueSBpZiBfLmhhcyBhbGlnbiwgXCJ5XCJcblxuXHRpZiBfLmhhcyBjb25zdHJhaW50cywgXCJoZWlnaHRcIlxuXHRcdHdoaWxlIHBhcnNlSW50KGxheWVyLl9lbGVtZW50SFRNTC5vZmZzZXRIZWlnaHQpID4gY29uc3RyYWludHMuaGVpZ2h0XG5cdFx0XHRsYXllci5zdHlsZS5mb250U2l6ZSA9IFwiI3twYXJzZUludChsYXllci5zdHlsZS5mb250U2l6ZSkgLSAxfXB4XCJcblx0XHRcdGxheWVyLnN0eWxlLmxpbmVIZWlnaHQgPSBsYXllci5zdHlsZS5mb250U2l6ZVxuXHRcdFx0VXRpbC50ZXh0LmF1dG9TaXplIGxheWVyLCB7fSwgY29uc3RyYWludHNcblxuXHRcdFx0IyBBbGlnbm1lbnRcblx0XHRcdGxheWVyLnggPSBhbGlnbi54IGlmIF8uaGFzIGFsaWduLCBcInhcIlxuXHRcdFx0bGF5ZXIueSA9IGFsaWduLnkgaWYgXy5oYXMgYWxpZ24sIFwieVwiXG5cbiMgQW5pXG5VdGlsLmFuaSA9IHt9XG4jIFxuVXRpbC5hbmkuc2hha2UgPSAobGF5ZXIsIHJhbmdlID0gMTApIC0+XG5cdHggPSBsYXllci54XG5cdGxheWVyLmFuaW1hdGUgcHJvcGVydGllczogeyB4OiB4ICsgcmFuZ2UgfSwgdGltZTogLjA4LCBjdXJ2ZTogXCJzcHJpbmcoNTAwLDI2LDUpXCJcblx0VXRpbHMuZGVsYXkgLjA3LCAtPlxuXHRcdGxheWVyLmFuaW1hdGVTdG9wKClcblx0XHRsYXllci5hbmltYXRlIHByb3BlcnRpZXM6IHsgeDogeCAtIHJhbmdlIH0sIHRpbWU6IC4wOCwgY3VydmU6IFwic3ByaW5nKDUwMCwyNiw1KVwiXG5cdFx0VXRpbHMuZGVsYXkgLjA3LCAtPlxuXHRcdFx0bGF5ZXIuYW5pbWF0ZVN0b3AoKVxuXHRcdFx0bGF5ZXIuYW5pbWF0ZSBwcm9wZXJ0aWVzOiB7IHg6IHggfSwgdGltZTogLjIsIGN1cnZlOiBcInNwcmluZyg1MDAsMjYsNTIpXCJcblxuIyBEYXRlXG5VdGlsLmRhdGUgPSB7fVxuVXRpbC5kYXRlLmdldFRpbWUgPSAtPlxuXHRkYXlzT2ZUaGVXZWVrID0gW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl1cblx0bW9udGhzT2ZUaGVZZWFyID0gW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl1cblx0ZGF0ZU9iaiA9IG5ldyBEYXRlKClcblx0bW9udGggPSBtb250aHNPZlRoZVllYXJbZGF0ZU9iai5nZXRNb250aCgpXVxuXHRkYXRlID0gZGF0ZU9iai5nZXREYXRlKClcblx0ZGF5ID0gZGF5c09mVGhlV2Vla1tkYXRlT2JqLmdldERheSgpXVxuXHRob3VycyA9IGRhdGVPYmouZ2V0SG91cnMoKVxuXHRtaW5zID0gZGF0ZU9iai5nZXRNaW51dGVzKClcblx0c2VjcyA9IGRhdGVPYmouZ2V0U2Vjb25kcygpXG5cdHJldHVybiB7XG5cdFx0bW9udGg6bW9udGhcblx0XHRkYXRlOmRhdGVcblx0XHRkYXk6ZGF5XG5cdFx0aG91cnM6aG91cnNcblx0XHRtaW5zOm1pbnNcblx0XHRzZWNzOnNlY3Ncblx0fVxuXG5VdGlsLmRhdGUudGltZURlbGVnYXRlID0gKGxheWVyLCBjbG9ja1R5cGUgPSB0cnVlKSAtPlxuXHRAdGltZSA9IFV0aWwuZGF0ZS5nZXRUaW1lKClcblx0VXRpbHMuZGVsYXkgNjAgLSBAdGltZS5zZWNzLCAtPlxuXHRcdGxheWVyLmh0bWwgPSBVdGlsLmRhdGUudGltZUZvcm1hdHRlciBAdGltZSA9IFV0aWwuZGF0ZS5nZXRUaW1lKCksIGNsb2NrVHlwZVxuXHRcdFV0aWxzLmludGVydmFsIDYwLCAtPlxuXHRcdFx0QHRpbWUgPSBVdGlsLmRhdGUuZ2V0VGltZSgpXG5cdFx0XHRsYXllci5odG1sID0gVXRpbC5kYXRlLnRpbWVGb3JtYXR0ZXIgQHRpbWUgPSBVdGlsLmRhdGUuZ2V0VGltZSgpLCBjbG9ja1R5cGVcblxuVXRpbC5kYXRlLnRpbWVGb3JtYXR0ZXIgPSAodGltZU9iaiwgY2xvY2tUeXBlID0gdHJ1ZSkgLT5cblx0aWYgY2xvY2tUeXBlID09IGZhbHNlXG5cdFx0aWYgdGltZU9iai5ob3VycyA+IDEyXG5cdFx0XHR0aW1lT2JqLmhvdXJzID0gdGltZU9iai5ob3VycyAtIDEyXG5cdFx0aWYgdGltZU9iai5ob3VycyA9PSAwIHRoZW4gdGltZU9iai5ob3VycyA9IDEyXG5cdGlmIHRpbWVPYmoubWlucyA8IDEwXG5cdFx0dGltZU9iai5taW5zID0gXCIwXCIgKyB0aW1lT2JqLm1pbnNcblx0cmV0dXJuIHRpbWVPYmouaG91cnMgKyBcIjpcIiArIHRpbWVPYmoubWluc1xuXG5cbiMgR3JhcGhpY1xuVXRpbC5ncmFwaGljID0ge31cblxuIyBTZXQgYmx1clxuVXRpbC5ibHVyID0gKGxheWVyLCBzaXplID0gMjApIC0+XG5cdGxheWVyLnN0eWxlID0gXy5leHRlbmQgbGF5ZXIuc3R5bGUsXG5cdFx0XCItd2Via2l0LWJhY2tkcm9wLWZpbHRlclwiOiBcImJsdXIoI3tzaXplfXB4KVwiXG5cdFx0XCJiYWNrZHJvcC1maWx0ZXJcIjogXCJibHVyKCN7c2l6ZX1weClcIlxuVXRpbC5ncmFwaGljLmJsdXIgPSAobGF5ZXIsIHNpemUgPSAyMCkgLT4gVXRpbC5ibHVyIGxheWVyLCBzaXplXG5cbiMgTG9hZCBpbWFnZVxuVXRpbC5ncmFwaGljLmxvYWRJbWFnZSA9ICh1cmwsIGNhbGxiYWNrLCBjb250ZXh0KSAtPlxuXHRlbGVtZW50ID0gbmV3IEltYWdlXG5cdFxuXHRjb250ZXh0ID89IEZyYW1lci5DdXJyZW50Q29udGV4dFxuXHRjb250ZXh0LmRvbUV2ZW50TWFuYWdlci53cmFwKGVsZW1lbnQpLmFkZEV2ZW50TGlzdGVuZXIgXCJsb2FkXCIsIChldmVudCkgLT4gY2FsbGJhY2soZXZlbnQpXG5cdGNvbnRleHQuZG9tRXZlbnRNYW5hZ2VyLndyYXAoZWxlbWVudCkuYWRkRXZlbnRMaXN0ZW5lciBcImVycm9yXCIsIChldmVudCkgLT4gY2FsbGJhY2sodHJ1ZSlcblx0XHRcblx0ZWxlbWVudC5zcmMgPSB1cmxcblxuIyBMb2FkIGltYWdlIGRhdGEgdXJsXG5VdGlsLmdyYXBoaWMuaW1hZ2VUb0RhdGFVUkwgPSAoaW1hZ2UpIC0+XG5cdHcgPSBpbWFnZS53aWR0aFxuXHRoID0gaW1hZ2UuaGVpZ2h0XG5cdFxuXHRjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXHRjYW52YXMud2lkdGggPSB3XG5cdGNhbnZhcy5oZWlnaHQgPSBoXG5cdFxuXHRjYW52YXNDb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKVxuXHRjYW52YXNDb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgdywgaClcblx0XG5cdGRhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpXG5cblx0cmV0dXJuIHdpZHRoOiB3LCBoZWlnaHQ6IGgsIGltYWdlOiBkYXRhVVJMXG5cblxuIyBzdmcgXG5VdGlsLmdyYXBoaWMuc3ZnID0gKHN2Zywgc2NhbGVXaWR0aCwgc2NhbGVIZWlnaHQpIC0+XG5cdCMgRmluZCBTdHJpbmdcblx0c3RhcnRJbmRleCA9IHN2Zy5zZWFyY2goXCI8c3ZnIHdpZHRoPVwiKVxuXHRlbmRJbmRleCA9IHN2Zy5zZWFyY2goXCIgdmlld0JveFwiKVxuXHRzdHJpbmcgPSBzdmcuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpXG5cblx0I0ZpbmQgd2lkdGhcblx0d1N0YXJ0SW5kZXggPSBzdHJpbmcuc2VhcmNoKFwiPVwiKSArIDJcblx0d0VuZEluZGV4ID0gIHN0cmluZy5zZWFyY2goXCJweFwiKVxuXHR3aWR0aCA9IHN0cmluZy5zbGljZSh3U3RhcnRJbmRleCwgd0VuZEluZGV4KVxuXHRzY2FsZVdpZHRoID89IHdpZHRoXG5cdG5ld1dpZHRoID0gc2NhbGVXaWR0aFxuXG5cdCMgRmluZCBIZWlnaHRcblx0aGVpZ2h0U3RyaW5nID0gc3RyaW5nLnNsaWNlKHdFbmRJbmRleCArIDQsIHN0cmluZy5sZW5ndGgpXG5cdGhTdGFydEluZGV4ID0gaGVpZ2h0U3RyaW5nLnNlYXJjaChcIj1cIikrIDJcblx0aEVuZEluZGV4ID0gaGVpZ2h0U3RyaW5nLnNlYXJjaChcInB4XCIpXG5cdGhlaWdodCA9IGhlaWdodFN0cmluZy5zbGljZShoU3RhcnRJbmRleCwgaEVuZEluZGV4KVxuXHRzY2FsZUhlaWdodCA/PSBoZWlnaHRcblx0bmV3SGVpZ2h0ID0gc2NhbGVIZWlnaHRcblxuXHQjQ3JlYXRlIG5ldyBzdHJpbmdcblx0bmV3U3RyaW5nID0gc3RyaW5nLnJlcGxhY2Uod2lkdGgsIG5ld1dpZHRoKVxuXHRuZXdTdHJpbmcgPSBuZXdTdHJpbmcucmVwbGFjZShoZWlnaHQsIG5ld0hlaWdodClcblxuXHQjUmVwbGFjZSBzdHJpbmdzXG5cdHN2ZyA9IHN2Zy5yZXBsYWNlKHN0cmluZywgbmV3U3RyaW5nKVxuXG5cdHJldHVybiB7XG5cdFx0c3ZnOiBzdmdcblx0XHR3aWR0aDogbmV3V2lkdGhcblx0XHRoZWlnaHQ6IG5ld0hlaWdodFxuXHR9XG5cbiMgQ2hhbmdlcyB0aGUgZmlsbCBhbmQgc3RvcmtlIG9mIGFuIFNWR1xuVXRpbC5ncmFwaGljLmNoYW5nZVNWR0NvbG9yID0gKGxheWVyLCBmaWxsQ29sb3IsIHN0cm9rZUNvbG9yKSAtPlxuXHRwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKClcblx0ZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhsYXllci5odG1sLCBcImltYWdlL3N2Zyt4bWxcIilcblx0cGF0aHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgncGF0aCcpXG5cdCMgaWYgXy5pc0FycmF5KHBhdGhzKSAmJiAhXy5pc0VtcHR5KHBhdGhzKVxuXHRmb3IgcGF0aCBpbiBwYXRoc1xuXHRcdHBhdGguc2V0QXR0cmlidXRlKFwiZmlsbFwiLCBmaWxsQ29sb3IpXG5cdFx0cGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2VcIiwgc3Ryb2tlQ29sb3IpXG5cdGxheWVyLmh0bWwgPSAobmV3IFhNTFNlcmlhbGl6ZXIoKSkuc2VyaWFsaXplVG9TdHJpbmcoZG9jKVxuXHRcdCMgZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoXCJwYXRoXCIpLmZvckVhY2ggKHBhdGgpIC0+IFxuXHRcdCMgXHRwYXRoLnNldEF0dHJpYnV0ZShcImZpbGxcIiwgZmlsbENvbG9yKVxuXHRcdCMgXHRwYXRoLnNldEF0dHJpYnV0ZShcInN0cm9rZVwiLCBzdHJva2VDb2xvcilcblx0XHQjIGxheWVyLmh0bWwgPSAobmV3IFhNTFNlcmlhbGl6ZXIoKSkuc2VyaWFsaXplVG9TdHJpbmcoZG9jKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFV0aWwgaWYgbW9kdWxlP1xuRnJhbWVyLlV0aWwgPSBVdGlsIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFVQUE7QURBQTtBQUFBLElBQUE7O0FBUUEsSUFBQSxHQUFPOztBQUdQLElBQUksQ0FBQyxJQUFMLEdBQVk7O0FBRVosSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFWLEdBQWlCLFNBQUMsS0FBRCxFQUFRLE9BQVIsRUFBc0IsV0FBdEI7QUFDaEIsTUFBQTs7SUFEd0IsVUFBVTs7O0lBQUksY0FBWTs7RUFDbEQsS0FBQSxHQUFRLEtBQUssQ0FBQztFQUNkLElBQUEsR0FBTyxLQUFLLENBQUM7RUFDYixtQkFBQSxHQUNDO0lBQUEsVUFBQSxFQUFZLEtBQU0sQ0FBQSxhQUFBLENBQWxCO0lBQ0EsUUFBQSxFQUFVLEtBQU0sQ0FBQSxXQUFBLENBRGhCO0lBRUEsVUFBQSxFQUFZLEtBQU0sQ0FBQSxhQUFBLENBRmxCO0lBR0EsT0FBQSxFQUFTLEtBQU0sQ0FBQSxTQUFBLENBSGY7SUFJQSxVQUFBLEVBQVksS0FBTSxDQUFBLGFBQUEsQ0FKbEI7SUFLQSxZQUFBLEVBQWMsS0FBTSxDQUFBLGVBQUEsQ0FMcEI7SUFNQSxhQUFBLEVBQWUsS0FBTSxDQUFBLGdCQUFBLENBTnJCO0lBT0EsV0FBQSxFQUFhLEtBQU0sQ0FBQSxjQUFBLENBUG5CO0lBUUEsYUFBQSxFQUFlLEtBQU0sQ0FBQSxnQkFBQSxDQVJyQjtJQVNBLFdBQUEsRUFBYSxLQUFNLENBQUEsY0FBQSxDQVRuQjtJQVVBLGFBQUEsRUFBZSxLQUFNLENBQUEsZ0JBQUEsQ0FWckI7SUFXQSxVQUFBLEVBQVksS0FBTSxDQUFBLGFBQUEsQ0FYbEI7SUFZQSxTQUFBLEVBQVcsS0FBTSxDQUFBLFlBQUEsQ0FaakI7SUFhQSxXQUFBLEVBQWEsS0FBTSxDQUFBLGNBQUEsQ0FibkI7O0FBZUQsU0FBTyxLQUFLLENBQUMsUUFBTixDQUFlLElBQWYsRUFBcUIsbUJBQXJCLEVBQTBDLFdBQTFDO0FBbkJTOztBQXNCakIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFWLEdBQXFCLFNBQUMsS0FBRCxFQUFRLE9BQVIsRUFBc0IsV0FBdEI7O0lBQVEsVUFBVTs7O0lBQUksY0FBYzs7U0FBTyxLQUFLLENBQUMsSUFBTixHQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBVixDQUFlLEtBQWYsRUFBc0IsT0FBdEIsRUFBK0IsV0FBL0I7QUFBeEQ7O0FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBVixHQUF5QixTQUFDLEtBQUQsRUFBUSxXQUFSLEVBQTBCLEtBQTFCO0FBQ3hCLE1BQUE7O0lBRGdDLGNBQWM7OztJQUFJLFFBQVE7O0VBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBVixDQUFtQixLQUFuQjtFQUdBLElBQXFCLENBQUMsQ0FBQyxHQUFGLENBQU0sS0FBTixFQUFhLEdBQWIsQ0FBckI7SUFBQSxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxFQUFoQjs7RUFDQSxJQUFxQixDQUFDLENBQUMsR0FBRixDQUFNLEtBQU4sRUFBYSxHQUFiLENBQXJCO0lBQUEsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsRUFBaEI7O0VBRUEsSUFBbUMsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxRQUFBLENBQVMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFyQixDQUFSLENBQW5DO0lBQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFaLEdBQTBCLE1BQTFCOztFQUNBLElBQW9DLENBQUMsQ0FBQyxLQUFGLENBQVEsUUFBQSxDQUFTLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBckIsQ0FBUixDQUFwQztJQUFBLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWixHQUEyQixNQUEzQjs7RUFFQSxJQUFHLENBQUMsQ0FBQyxHQUFGLENBQU0sV0FBTixFQUFtQixPQUFuQixDQUFIO0FBQ0MsV0FBTSxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQW5CLEdBQWlDLFFBQUEsQ0FBUyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQXJCLENBQWpDLEdBQXFFLFFBQUEsQ0FBUyxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQXJCLENBQXJFLEdBQTBHLFdBQVcsQ0FBQyxLQUE1SDtNQUNDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBWixHQUF5QixDQUFDLFFBQUEsQ0FBUyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQXJCLENBQUEsR0FBaUMsQ0FBbEMsQ0FBQSxHQUFvQztNQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVYsQ0FBbUIsS0FBbkI7TUFHQSxJQUFxQixDQUFDLENBQUMsR0FBRixDQUFNLEtBQU4sRUFBYSxHQUFiLENBQXJCO1FBQUEsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsRUFBaEI7O01BQ0EsSUFBcUIsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxLQUFOLEVBQWEsR0FBYixDQUFyQjtRQUFBLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLEVBQWhCOztJQU5ELENBREQ7O0VBU0EsSUFBRyxDQUFDLENBQUMsR0FBRixDQUFNLFdBQU4sRUFBbUIsUUFBbkIsQ0FBSDtBQUNDO1dBQU0sUUFBQSxDQUFTLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBNUIsQ0FBQSxHQUE0QyxXQUFXLENBQUMsTUFBOUQ7TUFDQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVosR0FBeUIsQ0FBQyxRQUFBLENBQVMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFyQixDQUFBLEdBQWlDLENBQWxDLENBQUEsR0FBb0M7TUFDN0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFaLEdBQXlCLEtBQUssQ0FBQyxLQUFLLENBQUM7TUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFWLENBQW1CLEtBQW5CLEVBQTBCLEVBQTFCLEVBQThCLFdBQTlCO01BR0EsSUFBcUIsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxLQUFOLEVBQWEsR0FBYixDQUFyQjtRQUFBLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLEVBQWhCOztNQUNBLElBQXFCLENBQUMsQ0FBQyxHQUFGLENBQU0sS0FBTixFQUFhLEdBQWIsQ0FBckI7cUJBQUEsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsR0FBaEI7T0FBQSxNQUFBOzZCQUFBOztJQVBELENBQUE7bUJBREQ7O0FBbkJ3Qjs7QUE4QnpCLElBQUksQ0FBQyxHQUFMLEdBQVc7O0FBRVgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFULEdBQWlCLFNBQUMsS0FBRCxFQUFRLEtBQVI7QUFDaEIsTUFBQTs7SUFEd0IsUUFBUTs7RUFDaEMsQ0FBQSxHQUFJLEtBQUssQ0FBQztFQUNWLEtBQUssQ0FBQyxPQUFOLENBQWM7SUFBQSxVQUFBLEVBQVk7TUFBRSxDQUFBLEVBQUcsQ0FBQSxHQUFJLEtBQVQ7S0FBWjtJQUE4QixJQUFBLEVBQU0sR0FBcEM7SUFBeUMsS0FBQSxFQUFPLGtCQUFoRDtHQUFkO1NBQ0EsS0FBSyxDQUFDLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLFNBQUE7SUFDaEIsS0FBSyxDQUFDLFdBQU4sQ0FBQTtJQUNBLEtBQUssQ0FBQyxPQUFOLENBQWM7TUFBQSxVQUFBLEVBQVk7UUFBRSxDQUFBLEVBQUcsQ0FBQSxHQUFJLEtBQVQ7T0FBWjtNQUE4QixJQUFBLEVBQU0sR0FBcEM7TUFBeUMsS0FBQSxFQUFPLGtCQUFoRDtLQUFkO1dBQ0EsS0FBSyxDQUFDLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLFNBQUE7TUFDaEIsS0FBSyxDQUFDLFdBQU4sQ0FBQTthQUNBLEtBQUssQ0FBQyxPQUFOLENBQWM7UUFBQSxVQUFBLEVBQVk7VUFBRSxDQUFBLEVBQUcsQ0FBTDtTQUFaO1FBQXNCLElBQUEsRUFBTSxFQUE1QjtRQUFnQyxLQUFBLEVBQU8sbUJBQXZDO09BQWQ7SUFGZ0IsQ0FBakI7RUFIZ0IsQ0FBakI7QUFIZ0I7O0FBV2pCLElBQUksQ0FBQyxJQUFMLEdBQVk7O0FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLEdBQW9CLFNBQUE7QUFDbkIsTUFBQTtFQUFBLGFBQUEsR0FBZ0IsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixTQUFyQixFQUFnQyxXQUFoQyxFQUE2QyxVQUE3QyxFQUF5RCxRQUF6RCxFQUFtRSxVQUFuRTtFQUNoQixlQUFBLEdBQWtCLENBQUMsU0FBRCxFQUFZLFVBQVosRUFBd0IsT0FBeEIsRUFBaUMsT0FBakMsRUFBMEMsS0FBMUMsRUFBaUQsTUFBakQsRUFBeUQsTUFBekQsRUFBaUUsUUFBakUsRUFBMkUsV0FBM0UsRUFBd0YsU0FBeEYsRUFBbUcsVUFBbkcsRUFBK0csVUFBL0c7RUFDbEIsT0FBQSxHQUFjLElBQUEsSUFBQSxDQUFBO0VBQ2QsS0FBQSxHQUFRLGVBQWdCLENBQUEsT0FBTyxDQUFDLFFBQVIsQ0FBQSxDQUFBO0VBQ3hCLElBQUEsR0FBTyxPQUFPLENBQUMsT0FBUixDQUFBO0VBQ1AsR0FBQSxHQUFNLGFBQWMsQ0FBQSxPQUFPLENBQUMsTUFBUixDQUFBLENBQUE7RUFDcEIsS0FBQSxHQUFRLE9BQU8sQ0FBQyxRQUFSLENBQUE7RUFDUixJQUFBLEdBQU8sT0FBTyxDQUFDLFVBQVIsQ0FBQTtFQUNQLElBQUEsR0FBTyxPQUFPLENBQUMsVUFBUixDQUFBO0FBQ1AsU0FBTztJQUNOLEtBQUEsRUFBTSxLQURBO0lBRU4sSUFBQSxFQUFLLElBRkM7SUFHTixHQUFBLEVBQUksR0FIRTtJQUlOLEtBQUEsRUFBTSxLQUpBO0lBS04sSUFBQSxFQUFLLElBTEM7SUFNTixJQUFBLEVBQUssSUFOQzs7QUFWWTs7QUFtQnBCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBVixHQUF5QixTQUFDLEtBQUQsRUFBUSxTQUFSOztJQUFRLFlBQVk7O0VBQzVDLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQUE7U0FDUixLQUFLLENBQUMsS0FBTixDQUFZLEVBQUEsR0FBSyxJQUFDLENBQUEsSUFBSSxDQUFDLElBQXZCLEVBQTZCLFNBQUE7SUFDNUIsS0FBSyxDQUFDLElBQU4sR0FBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQVYsQ0FBd0IsSUFBQyxDQUFBLElBQUQsR0FBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBQSxDQUFoQyxFQUFxRCxTQUFyRDtXQUNiLEtBQUssQ0FBQyxRQUFOLENBQWUsRUFBZixFQUFtQixTQUFBO01BQ2xCLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQUE7YUFDUixLQUFLLENBQUMsSUFBTixHQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBVixDQUF3QixJQUFDLENBQUEsSUFBRCxHQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFBLENBQWhDLEVBQXFELFNBQXJEO0lBRkssQ0FBbkI7RUFGNEIsQ0FBN0I7QUFGd0I7O0FBUXpCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBVixHQUEwQixTQUFDLE9BQUQsRUFBVSxTQUFWOztJQUFVLFlBQVk7O0VBQy9DLElBQUcsU0FBQSxLQUFhLEtBQWhCO0lBQ0MsSUFBRyxPQUFPLENBQUMsS0FBUixHQUFnQixFQUFuQjtNQUNDLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLEdBRGpDOztJQUVBLElBQUcsT0FBTyxDQUFDLEtBQVIsS0FBaUIsQ0FBcEI7TUFBMkIsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsR0FBM0M7S0FIRDs7RUFJQSxJQUFHLE9BQU8sQ0FBQyxJQUFSLEdBQWUsRUFBbEI7SUFDQyxPQUFPLENBQUMsSUFBUixHQUFlLEdBQUEsR0FBTSxPQUFPLENBQUMsS0FEOUI7O0FBRUEsU0FBTyxPQUFPLENBQUMsS0FBUixHQUFnQixHQUFoQixHQUFzQixPQUFPLENBQUM7QUFQWjs7QUFXMUIsSUFBSSxDQUFDLE9BQUwsR0FBZTs7QUFHZixJQUFJLENBQUMsSUFBTCxHQUFZLFNBQUMsS0FBRCxFQUFRLElBQVI7O0lBQVEsT0FBTzs7U0FDMUIsS0FBSyxDQUFDLEtBQU4sR0FBYyxDQUFDLENBQUMsTUFBRixDQUFTLEtBQUssQ0FBQyxLQUFmLEVBQ2I7SUFBQSx5QkFBQSxFQUEyQixPQUFBLEdBQVEsSUFBUixHQUFhLEtBQXhDO0lBQ0EsaUJBQUEsRUFBbUIsT0FBQSxHQUFRLElBQVIsR0FBYSxLQURoQztHQURhO0FBREg7O0FBSVosSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFiLEdBQW9CLFNBQUMsS0FBRCxFQUFRLElBQVI7O0lBQVEsT0FBTzs7U0FBTyxJQUFJLENBQUMsSUFBTCxDQUFVLEtBQVYsRUFBaUIsSUFBakI7QUFBdEI7O0FBR3BCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBYixHQUF5QixTQUFDLEdBQUQsRUFBTSxRQUFOLEVBQWdCLE9BQWhCO0FBQ3hCLE1BQUE7RUFBQSxPQUFBLEdBQVUsSUFBSTs7SUFFZCxVQUFXLE1BQU0sQ0FBQzs7RUFDbEIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUF4QixDQUE2QixPQUE3QixDQUFxQyxDQUFDLGdCQUF0QyxDQUF1RCxNQUF2RCxFQUErRCxTQUFDLEtBQUQ7V0FBVyxRQUFBLENBQVMsS0FBVDtFQUFYLENBQS9EO0VBQ0EsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUF4QixDQUE2QixPQUE3QixDQUFxQyxDQUFDLGdCQUF0QyxDQUF1RCxPQUF2RCxFQUFnRSxTQUFDLEtBQUQ7V0FBVyxRQUFBLENBQVMsSUFBVDtFQUFYLENBQWhFO1NBRUEsT0FBTyxDQUFDLEdBQVIsR0FBYztBQVBVOztBQVV6QixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWIsR0FBOEIsU0FBQyxLQUFEO0FBQzdCLE1BQUE7RUFBQSxDQUFBLEdBQUksS0FBSyxDQUFDO0VBQ1YsQ0FBQSxHQUFJLEtBQUssQ0FBQztFQUVWLE1BQUEsR0FBUyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QjtFQUNULE1BQU0sQ0FBQyxLQUFQLEdBQWU7RUFDZixNQUFNLENBQUMsTUFBUCxHQUFnQjtFQUVoQixhQUFBLEdBQWdCLE1BQU0sQ0FBQyxVQUFQLENBQWtCLElBQWxCO0VBQ2hCLGFBQWEsQ0FBQyxTQUFkLENBQXdCLEtBQXhCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDO0VBRUEsT0FBQSxHQUFVLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFdBQWpCO0FBRVYsU0FBTztJQUFBLEtBQUEsRUFBTyxDQUFQO0lBQVUsTUFBQSxFQUFRLENBQWxCO0lBQXFCLEtBQUEsRUFBTyxPQUE1Qjs7QUFic0I7O0FBaUI5QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQWIsR0FBbUIsU0FBQyxHQUFELEVBQU0sVUFBTixFQUFrQixXQUFsQjtBQUVsQixNQUFBO0VBQUEsVUFBQSxHQUFhLEdBQUcsQ0FBQyxNQUFKLENBQVcsYUFBWDtFQUNiLFFBQUEsR0FBVyxHQUFHLENBQUMsTUFBSixDQUFXLFVBQVg7RUFDWCxNQUFBLEdBQVMsR0FBRyxDQUFDLEtBQUosQ0FBVSxVQUFWLEVBQXNCLFFBQXRCO0VBR1QsV0FBQSxHQUFjLE1BQU0sQ0FBQyxNQUFQLENBQWMsR0FBZCxDQUFBLEdBQXFCO0VBQ25DLFNBQUEsR0FBYSxNQUFNLENBQUMsTUFBUCxDQUFjLElBQWQ7RUFDYixLQUFBLEdBQVEsTUFBTSxDQUFDLEtBQVAsQ0FBYSxXQUFiLEVBQTBCLFNBQTFCOztJQUNSLGFBQWM7O0VBQ2QsUUFBQSxHQUFXO0VBR1gsWUFBQSxHQUFlLE1BQU0sQ0FBQyxLQUFQLENBQWEsU0FBQSxHQUFZLENBQXpCLEVBQTRCLE1BQU0sQ0FBQyxNQUFuQztFQUNmLFdBQUEsR0FBYyxZQUFZLENBQUMsTUFBYixDQUFvQixHQUFwQixDQUFBLEdBQTBCO0VBQ3hDLFNBQUEsR0FBWSxZQUFZLENBQUMsTUFBYixDQUFvQixJQUFwQjtFQUNaLE1BQUEsR0FBUyxZQUFZLENBQUMsS0FBYixDQUFtQixXQUFuQixFQUFnQyxTQUFoQzs7SUFDVCxjQUFlOztFQUNmLFNBQUEsR0FBWTtFQUdaLFNBQUEsR0FBWSxNQUFNLENBQUMsT0FBUCxDQUFlLEtBQWYsRUFBc0IsUUFBdEI7RUFDWixTQUFBLEdBQVksU0FBUyxDQUFDLE9BQVYsQ0FBa0IsTUFBbEIsRUFBMEIsU0FBMUI7RUFHWixHQUFBLEdBQU0sR0FBRyxDQUFDLE9BQUosQ0FBWSxNQUFaLEVBQW9CLFNBQXBCO0FBRU4sU0FBTztJQUNOLEdBQUEsRUFBSyxHQURDO0lBRU4sS0FBQSxFQUFPLFFBRkQ7SUFHTixNQUFBLEVBQVEsU0FIRjs7QUE1Qlc7O0FBbUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWIsR0FBOEIsU0FBQyxLQUFELEVBQVEsU0FBUixFQUFtQixXQUFuQjtBQUM3QixNQUFBO0VBQUEsTUFBQSxHQUFhLElBQUEsU0FBQSxDQUFBO0VBQ2IsR0FBQSxHQUFNLE1BQU0sQ0FBQyxlQUFQLENBQXVCLEtBQUssQ0FBQyxJQUE3QixFQUFtQyxlQUFuQztFQUNOLEtBQUEsR0FBUSxHQUFHLENBQUMsZ0JBQUosQ0FBcUIsTUFBckI7QUFFUixPQUFBLHVDQUFBOztJQUNDLElBQUksQ0FBQyxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLFNBQTFCO0lBQ0EsSUFBSSxDQUFDLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEIsV0FBNUI7QUFGRDtTQUdBLEtBQUssQ0FBQyxJQUFOLEdBQWEsQ0FBSyxJQUFBLGFBQUEsQ0FBQSxDQUFMLENBQXFCLENBQUMsaUJBQXRCLENBQXdDLEdBQXhDO0FBUmdCOztBQWM5QixJQUF5QixnREFBekI7RUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixLQUFqQjs7O0FBQ0EsTUFBTSxDQUFDLElBQVAsR0FBYzs7OztBRDdNZDtBQUFBLElBQUEsR0FBQTtFQUFBOzs7QUFNTSxPQUFPLENBQUM7QUFDYixNQUFBOzs7O0VBQUEsU0FBQSxHQUFZOztFQUNaLFVBQUEsR0FBYTs7RUFFYixPQUFBLEdBQVUsU0FBQSxHQUFZOztFQUN0QixRQUFBLEdBQVc7O0VBR0UsY0FBQyxPQUFEOztNQUFDLFVBQVU7OztNQUN2QixPQUFPLENBQUMsT0FBUTs7O01BQ2hCLE9BQU8sQ0FBQyxRQUFTOztJQUNqQixzQ0FBTSxPQUFOO0lBRUEsVUFBQSxHQUFhLFNBQUEsR0FBWSxJQUFJLENBQUMsSUFBTCxDQUFXLElBQUksQ0FBQyxHQUFMLENBQVMsSUFBQyxDQUFBLEtBQVYsRUFBaUIsQ0FBakIsQ0FBQSxHQUFzQixJQUFJLENBQUMsR0FBTCxDQUFTLElBQUMsQ0FBQSxNQUFWLEVBQWtCLENBQWxCLENBQWpDO0lBQ3pCLFFBQUEsR0FBVyxPQUFBLEdBQVUsSUFBSSxDQUFDLElBQUwsQ0FBVyxJQUFJLENBQUMsR0FBTCxDQUFTLElBQUMsQ0FBQSxLQUFWLEVBQWlCLENBQWpCLENBQUEsR0FBc0IsSUFBSSxDQUFDLEdBQUwsQ0FBUyxJQUFDLENBQUEsTUFBVixFQUFrQixDQUFsQixDQUFqQztJQUVyQixJQUFDLENBQUEsV0FBRCxHQUFlLE9BQU8sQ0FBQztJQUN2QixJQUFDLENBQUEsUUFBRCxHQUFZLE9BQU8sQ0FBQztJQUNwQixJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxRQUFRLENBQUM7SUFFbEIsSUFBQyxDQUFBLGNBQUQsR0FBa0I7TUFBQSxJQUFBLEVBQU0sRUFBTjtNQUFVLEtBQUEsRUFBTyxVQUFqQjs7SUFDbEIsSUFBQyxDQUFBLGlCQUFELEdBQXFCO01BQUEsSUFBQSxFQUFNLEdBQU47TUFBVyxLQUFBLEVBQU8sU0FBbEI7O0lBRXJCLElBQUMsQ0FBQSxTQUFELEdBQWlCLElBQUEsR0FBQSxDQUNoQjtNQUFBLElBQUEsRUFBTSxZQUFOO01BQ0EsS0FBQSxFQUFPLEtBQUssQ0FBQyxNQURiO01BRUEsSUFBQSxFQUFNLFNBRk47TUFHQSxNQUFBLEVBQVEsSUFIUjtLQURnQjtJQUtqQixJQUFDLENBQUEsU0FBUyxDQUFDLE9BQVgsQ0FBbUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBUyxLQUFDLENBQUEsV0FBVjtNQUFIO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQjtJQUdBLElBQUcsSUFBQyxDQUFBLElBQUo7TUFDQyxJQUFDLENBQUEsR0FBRCxHQUFXLElBQUEsR0FBQSxDQUNWO1FBQUEsSUFBQSxFQUFNLEtBQU47UUFDQSxDQUFBLEVBQUUsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLENBREY7UUFDb0IsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUQ3QjtRQUVBLElBQUEsRUFBTSxPQUZOO1FBR0EsSUFBQSxFQUFNLEtBSE47UUFJQSxLQUFBLEVBQ0M7VUFBQSxRQUFBLEVBQVUsTUFBVjtVQUFrQixVQUFBLEVBQVksS0FBOUI7VUFDQSxVQUFBLEVBQWUsT0FBRCxHQUFTLElBRHZCO1VBRUEsU0FBQSxFQUFXLFFBRlg7VUFHQSxXQUFBLEVBQWEsUUFIYjtTQUxEO1FBU0EsWUFBQSxFQUFjLE9BQUEsR0FBUSxDQVR0QjtRQVN5QixXQUFBLEVBQWEsQ0FUdEM7UUFTeUMsV0FBQSxFQUFhLE9BVHREO1FBVUEsTUFBQSxFQUFRLElBVlI7T0FEVTtNQWFYLElBQUcsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFiO1FBQ0MsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEdBQ0M7VUFBQSxJQUFBLEVBQU0sRUFBTjtVQUNBLFdBQUEsRUFBYSxDQURiO1VBRUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFGakI7VUFGRjs7TUFNQSxJQUFDLENBQUEsR0FBRyxDQUFDLE9BQUwsQ0FBYSxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7aUJBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBUyxLQUFDLENBQUEsSUFBVjtRQUFIO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFiLEVBcEJEOztJQXNCQSxJQUFDLENBQUEsS0FBRCxHQUFTLENBQUEsR0FBSTtJQUNiLElBQUMsQ0FBQSxVQUFELENBQUE7RUE5Q1k7O2lCQWdEYixJQUFBLEdBQU0sU0FBQTtXQUNMLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFBQSxPQUFBLEVBQVMsSUFBVDtNQUFlLEtBQUEsRUFBTyxDQUF0QjtNQUF5QixLQUFBLEVBQU8sS0FBSyxDQUFDLE1BQXRDOztFQURKOztpQkFHTixJQUFBLEdBQU0sU0FBQyxHQUFEO0lBQ0wsSUFBVSxJQUFDLENBQUEsV0FBWDtBQUFBLGFBQUE7O0lBR0EsSUFBRyxHQUFBLEtBQU8sSUFBQyxDQUFBLFdBQVg7TUFDQyxJQUFDLENBQUEsS0FBRCxHQUFTO1FBQUEsS0FBQSxFQUFPLENBQUEsR0FBSSxVQUFYO1FBQXVCLEtBQUEsRUFBTyxLQUFLLENBQUMsTUFBcEM7O01BQ1QsSUFBQyxDQUFBLE9BQUQsQ0FBUztRQUFBLEtBQUEsRUFBTyxDQUFQO1FBQVUsT0FBQSxFQUFTLElBQUMsQ0FBQSxjQUFwQjtPQUFUO01BRUEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxVQUFYLENBQXNCLElBQUMsQ0FBQSxXQUF2QixFQUFvQyxVQUFwQztNQUNBLElBQUMsQ0FBQSxXQUFXLENBQUMsUUFBYixDQUFBO01BRUEsSUFBQyxDQUFBLE9BQUQsR0FBVztNQUNYLElBQUMsQ0FBQSxZQUFELENBQUE7TUFFQSxJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsQ0FBQTtNQUVBLElBQUMsQ0FBQSxXQUFXLENBQUMsV0FBYixDQUFBO2FBQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxPQUFiLENBQXFCO1FBQUEsS0FBQSxFQUFPLFVBQUEsR0FBYSxDQUFiLEdBQWUsQ0FBdEI7T0FBckIsRUFiRDtLQUFBLE1BZ0JLLElBQUcsR0FBQSxLQUFPLElBQUMsQ0FBQSxJQUFYO01BQ0osSUFBQyxDQUFBLEtBQUQsR0FBUztRQUFBLEtBQUEsRUFBTyxDQUFBLEdBQUksUUFBWDtRQUFxQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFDLEVBQUQsR0FBTSxRQUFuQixDQUF4QjtRQUFzRCxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQS9EOztNQUNULElBQUMsQ0FBQSxPQUFELENBQVM7UUFBQSxLQUFBLEVBQU8sQ0FBUDtRQUFVLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBbkI7UUFBMkIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFwQztRQUE0QyxPQUFBLEVBQVMsSUFBQyxDQUFBLGNBQXREO09BQVQ7TUFFQSxJQUFDLENBQUEsR0FBRyxDQUFDLFVBQUwsQ0FBZ0IsSUFBQyxDQUFBLElBQWpCLEVBQXVCLFFBQXZCO01BRUEsSUFBQyxDQUFBLE9BQUQsR0FBVztNQUNYLElBQUMsQ0FBQSxZQUFELENBQUE7TUFFQSxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBQTtNQUVBLElBQUMsQ0FBQSxJQUFJLENBQUMsV0FBTixDQUFBO2FBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLENBQWM7UUFBQSxLQUFBLEVBQU8sUUFBQSxHQUFXLENBQVgsR0FBYSxDQUFwQjtPQUFkLEVBWkk7O0VBcEJBOztpQkFrQ04sT0FBQSxHQUFTLFNBQUMsR0FBRDtJQUNSLElBQVUsSUFBQyxDQUFBLFdBQVg7QUFBQSxhQUFBOztJQUdBLElBQUcsR0FBQSxLQUFPLElBQUMsQ0FBQSxXQUFYO01BQ0MsSUFBVSxJQUFDLENBQUEsV0FBVyxDQUFDLFdBQXZCO0FBQUEsZUFBQTs7TUFFQSxJQUFDLENBQUEsT0FBRCxDQUFTO1FBQUEsS0FBQSxFQUFPLENBQUEsR0FBSSxVQUFYO1FBQXVCLE9BQUEsRUFBUyxJQUFDLENBQUEsaUJBQWpDO09BQVQ7TUFFQSxJQUFDLENBQUEsU0FBUyxDQUFDLE9BQVgsQ0FBQTtNQUVBLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixHQUF1QjtNQUN2QixJQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBcUI7UUFBQSxLQUFBLEVBQU8sVUFBUDtRQUFtQixPQUFBLEVBQVM7VUFBRSxJQUFBLEVBQU0sRUFBUjtTQUE1QjtPQUFyQjthQUNBLEtBQUssQ0FBQyxLQUFOLENBQVksRUFBWixFQUFnQixDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7VUFDZixLQUFDLENBQUEsU0FBUyxDQUFDLGFBQVgsQ0FBeUIsS0FBQyxDQUFBLFdBQTFCO1VBQ0EsS0FBQyxDQUFBLFdBQVcsQ0FBQyxTQUFiLENBQUE7aUJBRUEsS0FBQyxDQUFBLE9BQUQsR0FBVztRQUpJO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQixFQVREO0tBQUEsTUFnQkssSUFBRyxHQUFBLEtBQU8sSUFBQyxDQUFBLElBQVg7TUFDSixJQUFVLElBQUMsQ0FBQSxJQUFJLENBQUMsV0FBaEI7QUFBQSxlQUFBOztNQUdBLElBQUcsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxJQUFDLENBQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUF2QixDQUFIO1FBQ0MsSUFBQyxDQUFBLEdBQUcsQ0FBQyxVQUFMLENBQWdCLElBQUMsQ0FBQSxJQUFqQixFQUF1QixRQUF2QixFQUREOztNQUdBLElBQUMsQ0FBQSxPQUFELENBQVM7UUFBQSxLQUFBLEVBQU8sQ0FBQSxHQUFJLFFBQVg7UUFBcUIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBQyxFQUFELEdBQU0sUUFBbkIsQ0FBeEI7UUFBc0QsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUEvRDtRQUF1RSxPQUFBLEVBQVMsSUFBQyxDQUFBLGlCQUFqRjtPQUFUO01BRUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxPQUFMLENBQUE7TUFFQSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sR0FBZ0I7TUFDaEIsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLENBQWM7UUFBQSxLQUFBLEVBQU8sUUFBUDtRQUFpQixPQUFBLEVBQVM7VUFBRSxJQUFBLEVBQU0sRUFBUjtTQUExQjtPQUFkO2FBQ0EsS0FBSyxDQUFDLEtBQU4sQ0FBWSxFQUFaLEVBQWdCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNmLEtBQUMsQ0FBQSxHQUFHLENBQUMsYUFBTCxDQUFtQixLQUFDLENBQUEsSUFBcEI7aUJBRUEsS0FBQyxDQUFBLE9BQUQsR0FBVztRQUhJO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQixFQWJJOztFQXBCRzs7OztHQTdGaUI7O0FBb0lyQjs7O0VBRVEsYUFBQyxPQUFEOztNQUFDLFVBQVU7OztNQUN2QixPQUFPLENBQUMsa0JBQW1COzs7TUFDM0IsT0FBTyxDQUFDLE9BQVE7O0lBQ2hCLHFDQUFNLE9BQU47SUFFQSxJQUFDLENBQUEsUUFBRCxHQUFZLE9BQU8sQ0FBQztJQUVwQixJQUFDLENBQUEsVUFBRCxHQUFjLElBQUMsQ0FBQTtJQUVmLElBQUMsQ0FBQSxFQUFELEdBQVUsSUFBQSxLQUFBLENBQ1Q7TUFBQSxJQUFBLEVBQU0sS0FBTjtNQUNBLEtBQUEsRUFBTyxLQUFLLENBQUMsTUFEYjtNQUVBLElBQUEsRUFBTSxJQUFDLENBQUEsUUFGUDtNQUdBLGVBQUEsRUFBaUIsT0FIakI7TUFJQSxZQUFBLEVBQWMsRUFKZDtNQUtBLE9BQUEsRUFBUyxDQUxUO01BTUEsTUFBQSxFQUFRLElBTlI7S0FEUztJQVNWLElBQUMsQ0FBQSxPQUFELEdBQWUsSUFBQSxLQUFBLENBQ2Q7TUFBQSxJQUFBLEVBQU0sU0FBTjtNQUNBLEtBQUEsRUFBTyxLQUFLLENBQUMsTUFEYjtNQUVBLElBQUEsRUFBTSxDQUZOO01BR0EsZUFBQSxFQUFpQixPQUhqQjtNQUlBLFlBQUEsRUFBYyxFQUpkO01BS0EsSUFBQSxFQUFNLElBTE47TUFNQSxNQUFBLEVBQVEsSUFOUjtLQURjO0lBU2YsSUFBQyxDQUFBLE9BQU8sQ0FBQyxFQUFULENBQVksYUFBWixFQUEyQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7QUFDMUIsWUFBQTtRQUFBLEtBQUMsQ0FBQSxPQUFPLENBQUMsTUFBVCxDQUFBO1FBRUEsSUFBQSxDQUFjLENBQUEsR0FBQSxHQUFNLEtBQUMsQ0FBQSxPQUFPLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBeEIsQ0FBZDtBQUFBLGlCQUFBOztlQUNBLEdBQUcsQ0FBQyxLQUFKLEdBQVk7VUFBQSxDQUFBLEVBQUcsQ0FBQyxLQUFDLENBQUEsT0FBTyxDQUFDLEtBQVQsR0FBaUIsR0FBRyxDQUFDLEtBQXRCLENBQUEsR0FBK0IsQ0FBbEM7VUFBcUMsQ0FBQSxFQUFHLENBQUMsS0FBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULEdBQWtCLEdBQUcsQ0FBQyxNQUF2QixDQUFBLEdBQWlDLENBQXpFOztNQUpjO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEzQjtJQU1BLElBQUMsQ0FBQSxjQUFELEdBQWtCO01BQUEsSUFBQSxFQUFNLEVBQU47TUFBVSxLQUFBLEVBQU8sVUFBakI7O0lBQ2xCLElBQUMsQ0FBQSxpQkFBRCxHQUFxQjtNQUFBLElBQUEsRUFBTSxHQUFOO01BQVcsS0FBQSxFQUFPLFNBQWxCOztFQWxDVDs7Z0JBb0NiLElBQUEsR0FBTSxTQUFBO0lBQ0wsSUFBQyxDQUFBLEVBQUUsQ0FBQyxPQUFKLEdBQWM7V0FDZCxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsR0FBZ0I7RUFGWDs7Z0JBSU4sSUFBQSxHQUFNLFNBQUE7SUFDTCxJQUFVLElBQUMsQ0FBQSxFQUFFLENBQUMsV0FBZDtBQUFBLGFBQUE7O0lBRUEsSUFBQyxDQUFBLEVBQUUsQ0FBQyxPQUFKLEdBQWM7SUFDZCxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsR0FBZ0IsSUFBQyxDQUFBO0lBQ2pCLElBQUMsQ0FBQSxFQUFFLENBQUMsT0FBSixDQUFZO01BQUEsT0FBQSxFQUFTLENBQVQ7TUFBWSxPQUFBLEVBQVMsSUFBQyxDQUFBLGNBQXRCO0tBQVo7V0FDQSxJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsQ0FBaUI7TUFBQSxLQUFBLEVBQU8sQ0FBUDtNQUFVLE1BQUEsRUFBUSxDQUFsQjtNQUFxQixPQUFBLEVBQVMsSUFBQyxDQUFBLGNBQS9CO0tBQWpCO0VBTks7O2dCQVFOLE9BQUEsR0FBUyxTQUFBO0lBQ1IsSUFBVSxJQUFDLENBQUEsRUFBRSxDQUFDLFdBQWQ7QUFBQSxhQUFBOztJQUVBLElBQUMsQ0FBQSxFQUFFLENBQUMsT0FBSixDQUFZO01BQUEsT0FBQSxFQUFTLENBQVQ7TUFBWSxPQUFBLEVBQVMsSUFBQyxDQUFBLGlCQUF0QjtLQUFaO1dBQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULENBQWlCO01BQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxRQUFSO01BQWtCLE1BQUEsRUFBUSxJQUFDLENBQUEsUUFBM0I7TUFBcUMsT0FBQSxFQUFTLElBQUMsQ0FBQSxpQkFBL0M7S0FBakI7RUFKUTs7Z0JBTVQsVUFBQSxHQUFZLFNBQUMsS0FBRCxFQUFRLEtBQVI7SUFDWCxJQUFHLEtBQUg7TUFDQyxJQUFDLENBQUEsT0FBTyxDQUFDLFFBQVQsQ0FBa0IsS0FBbEI7YUFDQSxLQUFLLENBQUMsS0FBTixHQUFjO1FBQUEsS0FBQSxFQUFPLEtBQUssQ0FBQyxNQUFiO1FBQXFCLEtBQUEsRUFBTyxLQUE1QjtRQUFtQyxJQUFBLEVBQU0sSUFBekM7UUFGZjs7RUFEVzs7Z0JBS1osYUFBQSxHQUFlLFNBQUMsS0FBRDtJQUNkLElBQUcsS0FBSDtNQUNDLElBQUMsQ0FBQSxPQUFPLENBQUMsV0FBVCxDQUFxQixLQUFyQjtNQUNBLEtBQUssQ0FBQyxLQUFOLEdBQWM7UUFBQSxLQUFBLEVBQU8sQ0FBUDtRQUFVLEtBQUEsRUFBTyxDQUFqQjtRQUFvQixJQUFBLEVBQU0sS0FBMUI7O01BQ2QsS0FBSyxDQUFDLFlBQU4sQ0FBQTthQUVBLElBQUMsQ0FBQSxJQUFELENBQUEsRUFMRDs7RUFEYzs7OztHQTdERTs7OztBRDFJbEI7QUFBQSxJQUFBOzs7QUFNTSxPQUFPLENBQUM7OztFQUdiLE1BQU0sQ0FBQyxNQUFQLEdBQWdCOztFQUNoQixNQUFNLENBQUMsUUFBUCxHQUFrQjs7RUFHTCxhQUFDLE9BQUQ7QUFDWixRQUFBOztNQURhLFVBQVU7OztNQUN2QixPQUFPLENBQUMsT0FBUTs7O01BQ2hCLE9BQU8sQ0FBQyxRQUFTLE1BQU0sQ0FBQzs7O01BQ3hCLE9BQU8sQ0FBQyxTQUFVLE1BQU0sQ0FBQzs7O01BQ3pCLE9BQU8sQ0FBQyxPQUFROzs7TUFDaEIsT0FBTyxDQUFDLGtCQUFtQjs7SUFDM0IscUNBQU0sT0FBTjs7TUFFQSxPQUFPLENBQUMsY0FBZTs7SUFDdkIsV0FBQSxHQUFjLE9BQU8sQ0FBQztFQVRWOztnQkFlYixNQUFBLEdBQVEsU0FBQTtJQUNQLElBQUcsSUFBQyxDQUFBLE1BQUo7TUFDQyxJQUFDLENBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFiLENBQXFCO1FBQUEsT0FBQSxFQUFTLENBQVQ7UUFBWSxPQUFBLEVBQVM7VUFBRSxJQUFBLEVBQU0sR0FBUjtVQUFhLEtBQUEsRUFBTyxFQUFwQjtTQUFyQjtPQUFyQixFQUREOztXQUdBLElBQUMsQ0FBQSxJQUFELENBQU0sTUFBTSxDQUFDLE1BQWIsRUFBcUIsSUFBckI7RUFKTzs7Z0JBTVIsUUFBQSxHQUFVLFNBQUE7SUFDVCxJQUFHLElBQUMsQ0FBQSxNQUFKO01BQ0MsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBYixDQUFxQjtRQUFBLE9BQUEsRUFBUyxDQUFUO1FBQVksT0FBQSxFQUFTO1VBQUUsSUFBQSxFQUFNLEdBQVI7VUFBYSxLQUFBLEVBQU8sRUFBcEI7U0FBckI7T0FBckIsRUFERDs7V0FHQSxJQUFDLENBQUEsSUFBRCxDQUFNLE1BQU0sQ0FBQyxRQUFiLEVBQXVCLElBQXZCO0VBSlM7O2dCQWFWLFFBQUEsR0FBVSxTQUFDLEVBQUQ7V0FBUSxJQUFDLENBQUEsRUFBRCxDQUFJLE1BQU0sQ0FBQyxNQUFYLEVBQW1CLEVBQW5CO0VBQVI7O2dCQUNWLFVBQUEsR0FBWSxTQUFDLEVBQUQ7V0FBUSxJQUFDLENBQUEsRUFBRCxDQUFJLE1BQU0sQ0FBQyxRQUFYLEVBQXFCLEVBQXJCO0VBQVI7Ozs7R0ExQ2E7Ozs7QUROMUI7QUFBQSxJQUFBLDJDQUFBO0VBQUE7Ozs7O0FBTU0sT0FBTyxDQUFDO0VBQ2I7OztFQU9hLG9CQUFDLE9BQUQ7QUFDWixRQUFBOztNQURhLFVBQVU7OztNQUN2QixPQUFPLENBQUMsT0FBUTs7O01BQ2hCLE9BQU8sQ0FBQyxrQkFBbUI7O0lBQzNCLDRDQUFNLE9BQU47O01BRUEsT0FBTyxDQUFDLGdCQUFpQjs7SUFDekIsYUFBQSxHQUFnQixDQUFDLENBQUMsUUFBRixDQUFXLE9BQU8sQ0FBQyxhQUFuQixFQUFrQztNQUFFLFdBQUEsRUFBYSxFQUFmO01BQW1CLE9BQUEsRUFBUyxFQUE1QjtNQUFnQyxRQUFBLEVBQVUsRUFBMUM7S0FBbEM7SUFHaEIsSUFBQyxDQUFBLElBQUQsR0FBWSxJQUFBLGFBQUEsQ0FDWDtNQUFBLElBQUEsRUFBTSxNQUFOO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQURSO01BQ2UsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUR4QjtNQUVBLGNBQUEsRUFBZ0IsS0FGaEI7TUFHQSxlQUFBLEVBQWlCLEVBSGpCO01BSUEsSUFBQSxFQUFNLEtBSk47TUFLQSxNQUFBLEVBQVEsSUFMUjtLQURXO0lBT1osSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBZCxHQUFxQjtJQUNyQixJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sR0FDQztNQUFBLE1BQUEsRUFBUTtRQUFBLENBQUEsRUFBRyxDQUFDLEVBQUo7UUFBUSxLQUFBLEVBQU8sR0FBQSxHQUFNLElBQUMsQ0FBQSxNQUF0QjtPQUFSO01BQ0EsUUFBQSxFQUFVO1FBQUEsQ0FBQSxFQUFHLENBQUg7UUFBTSxLQUFBLEVBQU8sQ0FBYjtPQURWOztJQUlELElBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsU0FBQSxDQUFVO01BQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFSO01BQWUsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUF4QjtLQUFWLENBQXlDLENBQUMsV0FBMUMsQ0FBc0QsYUFBYSxDQUFDLFdBQXBFO0lBRW5CLElBQUMsQ0FBQSxPQUFELEdBQWUsSUFBQSxTQUFBLENBQVU7TUFBQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBQVI7TUFBZSxNQUFBLEVBQVEsSUFBQyxDQUFBLE1BQXhCO0tBQVYsQ0FBeUMsQ0FBQyxPQUExQyxDQUFrRCxhQUFhLENBQUMsT0FBaEU7SUFFZixJQUFDLENBQUEsUUFBRCxHQUFnQixJQUFBLFNBQUEsQ0FBVTtNQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FBUjtNQUFlLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFBeEI7S0FBVixDQUF5QyxDQUFDLFFBQTFDLENBQW1ELGFBQWEsQ0FBQyxRQUFqRTtJQUdoQixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBYyxJQUFDLENBQUEsV0FBZjtJQUNBLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixDQUFjLElBQUMsQ0FBQSxPQUFmO0lBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLENBQWMsSUFBQyxDQUFBLFFBQWY7SUFFQSxJQUFDLENBQUEsSUFBSSxDQUFDLFVBQU4sQ0FBaUIsSUFBQyxDQUFBLE9BQWxCLEVBQTJCLEtBQTNCO0lBR0EsSUFBQyxDQUFBLFNBQUQsR0FBaUIsSUFBQSxLQUFBLENBQ2hCO01BQUEsSUFBQSxFQUFNLFdBQU47TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRFQ7TUFDaUIsQ0FBQSxFQUFHLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixHQUFhLEVBRGpDO01BRUEsS0FBQSxFQUFPLEdBRlA7TUFFWSxNQUFBLEVBQVEsRUFGcEI7TUFHQSxJQUFBLEVBQU0sTUFITjtNQUlBLEtBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxNQUFWO1FBQWtCLFVBQUEsRUFBWSxLQUE5QjtRQUNBLFVBQUEsRUFBWSxNQURaO1FBRUEsU0FBQSxFQUFXLFFBRlg7T0FMRDtNQVFBLFlBQUEsRUFBYyxFQVJkO01BU0EsZUFBQSxFQUFpQixTQVRqQjtNQVVBLEtBQUEsRUFBTyxDQUFBLEdBQUksR0FWWDtNQVVnQixPQUFBLEVBQVMsQ0FWekI7TUFXQSxNQUFBLEVBQVEsSUFBQyxDQUFBLElBWFQ7S0FEZ0I7SUFhakIsSUFBQyxDQUFBLFNBQVMsQ0FBQyxVQUFYLENBQUE7SUFHQSxJQUFDLENBQUEsWUFBRCxHQUFnQjtJQUNoQixJQUFDLENBQUEsWUFBRCxHQUFnQjtBQUdoQjtBQUFBLFNBQUEscUNBQUE7O01BQ0MsS0FBSyxDQUFDLE9BQU4sQ0FBYyxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7aUJBQUcsS0FBQyxDQUFBLFFBQUQsQ0FBQTtRQUFIO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFkO0FBREQ7SUFJQSxJQUFDLENBQUEsSUFBSSxDQUFDLGdCQUFOLENBQXVCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtBQUN0QixZQUFBO1FBQUEsSUFBVSxLQUFDLENBQUEsWUFBWDtBQUFBLGlCQUFBOztBQUVBO0FBQUEsYUFBQSxnREFBQTs7VUFBQSxLQUFLLENBQUMsVUFBTixDQUFBO0FBQUE7ZUFDQSxLQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBYyxRQUFkO01BSnNCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2QjtJQU9BLElBQUMsQ0FBQSxJQUFJLENBQUMsY0FBTixDQUFxQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDcEIsSUFBVSxLQUFDLENBQUEsWUFBWDtBQUFBLGlCQUFBOztRQUVBLEtBQUMsQ0FBQSxZQUFELEdBQWdCO2VBQ2hCLEtBQUssQ0FBQyxLQUFOLENBQVksRUFBWixFQUFnQixTQUFBO2lCQUFHLEtBQUMsQ0FBQSxZQUFELEdBQWdCO1FBQW5CLENBQWhCO01BSm9CO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFyQjtFQW5FWTs7dUJBaUZiLFFBQUEsR0FBVSxTQUFBO0FBQ1QsUUFBQTtJQUFBLElBQUEsQ0FBYyxJQUFDLENBQUEsWUFBZjtBQUFBLGFBQUE7O0lBQ0EsSUFBQSxDQUFjLElBQUMsQ0FBQSxZQUFmO0FBQUEsYUFBQTs7QUFHQTtBQUFBLFNBQUEsNkNBQUE7O01BQ0MsS0FBSyxDQUFDLFVBQU4sQ0FBaUIsS0FBakI7QUFERDtJQUVBLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixDQUFjLFVBQWQ7SUFHQSxJQUFDLENBQUEsWUFBRCxHQUFnQjtXQUNoQixJQUFDLENBQUEsWUFBRCxHQUFnQjtFQVhQOzt1QkFjVixTQUFBLEdBQVcsU0FBQTtBQUFHLFFBQUE7QUFBQTtBQUFBO1NBQUEscUNBQUE7O21CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBWCxDQUFBO0FBQUE7O0VBQUg7O3VCQUdYLFFBQUEsR0FBVSxTQUFBO0FBQUcsUUFBQTtBQUFBO0FBQUE7U0FBQSxxQ0FBQTs7bUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFYLENBQUE7QUFBQTs7RUFBSDs7dUJBR1YsWUFBQSxHQUFjLFNBQUMsS0FBRDtJQUNiLElBQVUsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUF4QixDQUFWO0FBQUEsYUFBQTs7SUFDQSxJQUFVLENBQUMsQ0FBQyxJQUFGLENBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBckIsQ0FBQSxHQUFpQyxDQUFqQyxHQUFxQyxLQUEvQztBQUFBLGFBQUE7O1dBRUEsSUFBQyxDQUFBLElBQUksQ0FBQyxVQUFOLENBQWlCLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVMsQ0FBQSxLQUFBLENBQXhDO0VBSmE7Ozs7R0E3R2tCOztBQW1IakM7O0FBaUVNLE9BQU8sQ0FBQztBQUViLE1BQUE7Ozs7RUFBQSxNQUFNLENBQUMsZUFBUCxHQUF5Qjs7RUFDekIsTUFBTSxDQUFDLFNBQVAsR0FBbUI7O0VBRW5CLE1BQUEsR0FBUzs7RUFDVCxNQUFNLENBQUMsWUFBUCxHQUFzQjs7RUFDdEIsTUFBTSxDQUFDLFlBQVAsR0FBc0I7O0VBQ3RCLE1BQU0sQ0FBQyxnQkFBUCxHQUEwQjs7RUFDMUIsTUFBTSxDQUFDLG9CQUFQLEdBQThCOztFQUM5QixNQUFNLENBQUMsZ0JBQVAsR0FBMEI7O0VBQzFCLE1BQU0sQ0FBQyxhQUFQLEdBQXVCOztFQUN2QixNQUFNLENBQUMsVUFBUCxHQUFvQjs7RUFFcEIsUUFBQSxHQUFXOztFQUNYLFFBQVEsQ0FBQyxXQUFULEdBQXVCOztFQUN2QixRQUFRLENBQUMsVUFBVCxHQUFzQjs7RUFDdEIsUUFBUSxDQUFDLFNBQVQsR0FBcUI7O0VBQ3JCLFFBQVEsQ0FBQyxRQUFULEdBQW9COztFQUNwQixRQUFRLENBQUMsU0FBVCxHQUFxQjs7RUFDckIsUUFBUSxDQUFDLFVBQVQsR0FBc0I7O0VBQ3RCLFFBQVEsQ0FBQyxXQUFULEdBQXVCOztFQUN2QixRQUFRLENBQUMsT0FBVCxHQUFtQjs7RUFDbkIsUUFBUSxDQUFDLFlBQVQsR0FBd0I7O0VBQ3hCLFFBQVEsQ0FBQyxLQUFULEdBQWlCOztFQUNqQixRQUFRLENBQUMsUUFBVCxHQUFvQjs7RUFDcEIsUUFBUSxDQUFDLElBQVQsR0FBZ0I7O0VBQ2hCLFFBQVEsQ0FBQyxNQUFULEdBQWtCOztFQUVsQixTQUFBLEdBQVk7O0VBQ1osU0FBUyxDQUFDLE1BQVYsR0FBbUI7O0VBQ25CLFNBQVMsQ0FBQyxJQUFWLEdBQWlCOztFQUVqQixlQUFBLEdBQWtCOztFQUNsQixlQUFlLENBQUMsT0FBaEIsR0FBMEI7O0VBQzFCLGVBQWUsQ0FBQyxRQUFoQixHQUEyQjs7RUFFM0IsWUFBSSxDQUFDLE1BQUwsR0FBYzs7RUFDZCxZQUFJLENBQUMsUUFBTCxHQUFnQjs7RUFDaEIsWUFBSSxDQUFDLFNBQUwsR0FBaUI7O0VBQ2pCLFlBQUksQ0FBQyxlQUFMLEdBQXVCOztFQUV2QixZQUFDLENBQUEsTUFBRCxDQUFRLGlCQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFNLElBQUMsQ0FBQTtJQUFQLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLElBQUQsQ0FBTSxTQUFBLEdBQVUsTUFBTSxDQUFDLGVBQXZCLEVBQTBDLElBQUMsQ0FBQSxnQkFBRCxHQUFvQixLQUE5RDtJQUFYLENBREw7R0FERDs7RUFJQSxZQUFDLENBQUEsTUFBRCxDQUFRLFdBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQU0sSUFBQyxDQUFBO0lBQVAsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsSUFBRCxDQUFNLFNBQUEsR0FBVSxNQUFNLENBQUMsU0FBdkIsRUFBb0MsSUFBQyxDQUFBLFVBQUQsR0FBYyxLQUFsRDtJQUFYLENBREw7R0FERDs7RUFLYSxzQkFBQyxPQUFEOztNQUFDLFVBQVU7OztNQUN2QixPQUFPLENBQUMsa0JBQW1COztJQUMzQiw4Q0FBTSxPQUFOOztNQUVBLE9BQU8sQ0FBQyxTQUFVLE1BQU0sQ0FBQzs7O01BQ3pCLE9BQU8sQ0FBQyxXQUFZLFFBQVEsQ0FBQzs7SUFFN0IsSUFBQyxDQUFBLE1BQUQsR0FBVSxPQUFPLENBQUM7SUFDbEIsSUFBQyxDQUFBLFFBQUQsR0FBWSxPQUFPLENBQUM7RUFSUjs7eUJBZWIsWUFBQSxHQUFjLFNBQUE7SUFDYixJQUFDLENBQUEsTUFBRCxHQUFVLE1BQU0sQ0FBQztJQUNqQixJQUFDLENBQUEsSUFBRCxHQUFRO0lBRVIsSUFBQyxDQUFBLFNBQUQsR0FBYTtBQUViLFdBQU87RUFOTTs7eUJBU2QsWUFBQSxHQUFjLFNBQUE7SUFDYixJQUFDLENBQUEsTUFBRCxHQUFVLE1BQU0sQ0FBQztJQUNqQixJQUFDLENBQUEsS0FBRCxHQUFTO01BQUEsS0FBQSxFQUFPLEdBQVA7TUFBWSxNQUFBLEVBQVEsR0FBcEI7O0lBRVQsSUFBQyxDQUFBLFNBQUQsR0FBYTtBQUViLFdBQU87RUFOTTs7eUJBU2QsZ0JBQUEsR0FBa0IsU0FBQTtJQUNqQixJQUFDLENBQUEsTUFBRCxHQUFVLE1BQU0sQ0FBQztJQUNqQixJQUFDLENBQUEsSUFBRCxHQUFRO0lBRVIsSUFBQyxDQUFBLFNBQUQsR0FBYTtBQUViLFdBQU87RUFOVTs7eUJBU2xCLG9CQUFBLEdBQXNCLFNBQUMsT0FBRDtBQUNyQixRQUFBOztNQURzQixVQUFVOztJQUNoQyxJQUFDLENBQUEsTUFBRCxHQUFVLE1BQU0sQ0FBQztJQUNqQixJQUFDLENBQUEsS0FBRCxHQUFTO01BQUEsS0FBQSxFQUFPLEdBQVA7TUFBWSxNQUFBLEVBQVEsRUFBcEI7O0lBRVQsSUFBQyxDQUFBLFNBQUQsR0FBYTs7TUFHYixPQUFPLENBQUMsZ0JBQWlCOzs7TUFDekIsT0FBTyxDQUFDLGVBQWdCOztJQUV4QixhQUFBLEdBQWdCLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBTyxDQUFDLGFBQW5CLEVBQWtDO01BQUUsdUJBQUEsRUFBeUIsRUFBM0I7TUFBK0IsdUJBQUEsRUFBeUIsRUFBeEQ7TUFBNEQsU0FBQSxFQUFXLE9BQXZFO0tBQWxDO0lBQ2hCLFlBQUEsR0FBZSxDQUFDLENBQUMsUUFBRixDQUFXLE9BQU8sQ0FBQyxZQUFuQixFQUFpQztNQUFFLFNBQUEsRUFBVyxPQUFiO0tBQWpDO0lBRWYsS0FBQSxHQUFZLElBQUEsS0FBQSxDQUNYO01BQUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFUO01BQWUsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUF4QjtNQUNBLElBQUEsRUFBTSxFQUROO01BRUEsS0FBQSxFQUFPLGFBQWEsQ0FBQyxhQUZyQjtNQUdBLGVBQUEsRUFBaUIsRUFIakI7TUFJQSxNQUFBLEVBQVEsSUFKUjtLQURXO0lBT1osSUFBQSxHQUFXLElBQUEsS0FBQSxDQUNWO01BQUEsSUFBQSxFQUFNLFlBQVksQ0FBQyxLQUFuQjtNQUNBLEtBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxNQUFWO1FBQWtCLFVBQUEsRUFBWSxLQUE5QjtRQUNBLFVBQUEsRUFBZSxJQUFDLENBQUEsTUFBRixHQUFTLElBRHZCO1FBRUEsYUFBQSxFQUFlLFFBRmY7UUFHQSxTQUFBLEVBQVcsTUFIWDtPQUZEO01BTUEsS0FBQSxFQUFPLFlBQVksQ0FBQyxTQU5wQjtNQU9BLGVBQUEsRUFBaUIsRUFQakI7TUFRQSxNQUFBLEVBQVEsSUFSUjtLQURVO0lBVVgsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFWLENBQXVCLElBQXZCLEVBQTZCO01BQUUsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUFYO0tBQTdCLEVBQWtEO01BQUUsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFOLEdBQWEsQ0FBbEI7TUFBcUIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUE5QjtLQUFsRDtJQUVBLElBQUcsSUFBQyxDQUFBLFlBQUQsQ0FBQSxDQUFlLENBQUMsS0FBaEIsR0FBd0IsSUFBQyxDQUFBLEtBQTVCO01BQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFWLENBQXVCLElBQXZCLEVBQTZCO1FBQUUsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFELEdBQVMsS0FBSyxDQUFDLEtBQXhCO1FBQStCLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFBeEM7T0FBN0IsRUFBK0U7UUFBRSxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQU4sR0FBYSxDQUFsQjtRQUFxQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQTlCO09BQS9FLEVBREQ7O0lBSUEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxTQUFBLEdBQVUsTUFBTSxDQUFDLGVBQXJCLEVBQXdDLFNBQUE7TUFDdkMsSUFBRyxJQUFDLENBQUEsZUFBRCxLQUFvQixlQUFlLENBQUMsT0FBdkM7UUFDQyxLQUFLLENBQUMsS0FBTixHQUFjO1VBQUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFUO1VBQWUsSUFBQSxFQUFNLElBQUksQ0FBQyxJQUExQjs7ZUFDZCxJQUFJLENBQUMsQ0FBTCxHQUFTLEtBQUssQ0FBQyxJQUFOLEdBQWEsRUFGdkI7T0FBQSxNQUdLLElBQUcsSUFBQyxDQUFBLGVBQUQsS0FBb0IsZUFBZSxDQUFDLFFBQXZDO1FBQ0osS0FBSyxDQUFDLEtBQU4sR0FBYztVQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBVDtVQUFnQixJQUFBLEVBQU0sSUFBSSxDQUFDLElBQTNCOztlQUNkLElBQUksQ0FBQyxDQUFMLEdBQVMsS0FBSyxDQUFDLENBQU4sR0FBVSxJQUFJLENBQUMsS0FBZixHQUF1QixFQUY1Qjs7SUFKa0MsQ0FBeEM7QUFRQSxXQUFPO0VBNUNjOzt5QkErQ3RCLGdCQUFBLEdBQWtCLFNBQUMsT0FBRDtBQUNqQixRQUFBOztNQURrQixVQUFVOztJQUM1QixJQUFDLENBQUEsTUFBRCxHQUFVLE1BQU0sQ0FBQztJQUNqQixJQUFDLENBQUEsS0FBRCxHQUFTO01BQUEsS0FBQSxFQUFPLEdBQVA7TUFBWSxNQUFBLEVBQVEsRUFBcEI7O0lBRVQsSUFBQyxDQUFBLFNBQUQsR0FBYTs7TUFHYixPQUFPLENBQUMsZ0JBQWlCOzs7TUFDekIsT0FBTyxDQUFDLGVBQWdCOztJQUV4QixhQUFBLEdBQWdCLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBTyxDQUFDLGFBQW5CLEVBQWtDO01BQUUsdUJBQUEsRUFBeUIsRUFBM0I7TUFBK0IsdUJBQUEsRUFBeUIsRUFBeEQ7TUFBNEQsU0FBQSxFQUFXLE9BQXZFO0tBQWxDO0lBQ2hCLFlBQUEsR0FBZSxDQUFDLENBQUMsUUFBRixDQUFXLE9BQU8sQ0FBQyxZQUFuQixFQUFpQztNQUFFLFNBQUEsRUFBVyxPQUFiO0tBQWpDO0lBRWYsS0FBQSxHQUFZLElBQUEsS0FBQSxDQUNYO01BQUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFUO01BQWUsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUF4QjtNQUNBLElBQUEsRUFBTSxFQUROO01BRUEsS0FBQSxFQUFPLGFBQWEsQ0FBQyxhQUZyQjtNQUdBLGVBQUEsRUFBaUIsRUFIakI7TUFJQSxNQUFBLEVBQVEsSUFKUjtLQURXO0lBT1osSUFBQSxHQUFXLElBQUEsS0FBQSxDQUNWO01BQUEsSUFBQSxFQUFNLFlBQVksQ0FBQyxLQUFuQjtNQUNBLEtBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxNQUFWO1FBQWtCLFVBQUEsRUFBWSxLQUE5QjtRQUNBLFVBQUEsRUFBWSxHQURaO1FBRUEsYUFBQSxFQUFlLFFBRmY7UUFHQSxTQUFBLEVBQVcsTUFIWDtPQUZEO01BTUEsS0FBQSxFQUFPLFlBQVksQ0FBQyxTQU5wQjtNQU9BLGVBQUEsRUFBaUIsRUFQakI7TUFRQSxNQUFBLEVBQVEsSUFSUjtLQURVO0lBVVgsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFWLENBQXVCLElBQXZCLEVBQTZCO01BQUUsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUFYO0tBQTdCLEVBQWtEO01BQUUsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFOLEdBQWEsQ0FBbEI7TUFBcUIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUE5QjtLQUFsRDtJQUVBLElBQUcsSUFBQyxDQUFBLFlBQUQsQ0FBQSxDQUFlLENBQUMsS0FBaEIsR0FBd0IsSUFBQyxDQUFBLEtBQTVCO01BQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFWLENBQXVCLElBQXZCLEVBQTZCO1FBQUUsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFELEdBQVMsS0FBSyxDQUFDLEtBQXhCO1FBQStCLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFBeEM7T0FBN0IsRUFBK0U7UUFBRSxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQU4sR0FBYSxDQUFsQjtRQUFxQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQTlCO09BQS9FLEVBREQ7O0lBR0EsS0FBSyxDQUFDLEtBQU4sR0FBYztNQUFBLENBQUEsRUFBRyxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxZQUFELENBQUEsQ0FBZSxDQUFDLEtBQWhCLEdBQXdCLENBQW5DO01BQXNDLElBQUEsRUFBTSxJQUFJLENBQUMsSUFBakQ7O0lBQ2QsSUFBSSxDQUFDLENBQUwsR0FBUyxLQUFLLENBQUMsSUFBTixHQUFhO0FBRXRCLFdBQU87RUF0Q1U7O3lCQXlDbEIsYUFBQSxHQUFlLFNBQUE7SUFDZCxJQUFDLENBQUEsTUFBRCxHQUFVLE1BQU0sQ0FBQztJQUNqQixJQUFDLENBQUEsSUFBRCxHQUFRO0lBQ1IsSUFBQyxDQUFBLEtBQUQsR0FBUyxFQUFBLEdBQUc7SUFFWixJQUFDLENBQUEsU0FBRCxHQUFhO0FBRWIsV0FBTztFQVBPOzt5QkFVZixVQUFBLEdBQVksU0FBQTtJQUNYLElBQUMsQ0FBQSxNQUFELEdBQVUsTUFBTSxDQUFDO0lBRWpCLElBQUMsQ0FBQSxTQUFELEdBQWE7QUFFYixXQUFPO0VBTEk7O3lCQVlaLFVBQUEsR0FBWSxTQUFDLE9BQUQ7QUFDWCxRQUFBOztNQURZLFVBQVU7O0lBQ3RCLElBQUMsQ0FBQSxRQUFELEdBQVksUUFBUSxDQUFDOztNQUdyQixPQUFPLENBQUMsZUFBZ0I7O0lBRXhCLFlBQUEsR0FBZSxDQUFDLENBQUMsUUFBRixDQUFXLE9BQU8sQ0FBQyxZQUFuQixFQUFpQztNQUFFLFNBQUEsRUFBVyxJQUFDLENBQUEsU0FBZDtLQUFqQztJQUVmLE1BQUEsR0FBUyxJQUFDLENBQUE7SUFDVixJQUFBLEdBQVcsSUFBQSxLQUFBLENBQ1Y7TUFBQSxJQUFBLEVBQU0sWUFBWSxDQUFDLEtBQW5CO01BQ0EsS0FBQSxFQUNDO1FBQUEsUUFBQSxFQUFVLE1BQVY7UUFBa0IsVUFBQSxFQUFZLEtBQTlCO1FBQ0EsVUFBQSxFQUFlLE1BQUQsR0FBUSxJQUR0QjtRQUVBLGFBQUEsRUFBZSxRQUZmO1FBR0EsU0FBQSxFQUFXLFFBSFg7T0FGRDtNQU1BLEtBQUEsRUFBTyxZQUFZLENBQUMsU0FOcEI7TUFPQSxlQUFBLEVBQWlCLEVBUGpCO01BUUEsTUFBQSxFQUFRLElBUlI7S0FEVTtJQVVYLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBVixDQUF1QixJQUF2QixFQUE2QjtNQUFFLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FBVjtNQUFpQixNQUFBLEVBQVEsTUFBekI7S0FBN0IsRUFBZ0U7TUFBRSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQVg7TUFBbUIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUE1QjtLQUFoRTtBQUVBLFdBQU87RUFyQkk7O3lCQXdCWixTQUFBLEdBQVcsU0FBQyxPQUFEO0FBQ1YsUUFBQTs7TUFEVyxVQUFVOztJQUNyQixJQUFDLENBQUEsUUFBRCxHQUFZLFFBQVEsQ0FBQzs7TUFHckIsT0FBTyxDQUFDLG9CQUFxQjs7O01BQzdCLE9BQU8sQ0FBQyxvQkFBcUI7OztNQUM3QixPQUFPLENBQUMsaUJBQWtCOztJQUUxQixpQkFBQSxHQUFvQixDQUFDLENBQUMsUUFBRixDQUFXLE9BQU8sQ0FBQyxpQkFBbkIsRUFBc0M7TUFBRSxTQUFBLEVBQVcsSUFBQyxDQUFBLFNBQWQ7S0FBdEM7SUFDcEIsaUJBQUEsR0FBb0IsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFPLENBQUMsaUJBQW5CLEVBQXNDO01BQUUsU0FBQSxFQUFXLElBQUMsQ0FBQSxTQUFkO0tBQXRDO0lBQ3BCLGNBQUEsR0FBaUIsT0FBTyxDQUFDO0lBRXpCLGVBQUEsR0FBa0I7SUFDbEIsU0FBQSxHQUFnQixJQUFBLEtBQUEsQ0FDZjtNQUFBLElBQUEsRUFBTSxpQkFBaUIsQ0FBQyxLQUF4QjtNQUNBLEtBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxNQUFWO1FBQWtCLFVBQUEsRUFBWSxLQUE5QjtRQUNBLFVBQUEsRUFBWSxHQURaO1FBRUEsYUFBQSxFQUFlLFFBRmY7UUFHQSxPQUFBLEVBQVMsU0FIVDtRQUlBLFNBQUEsRUFBVyxRQUpYO09BRkQ7TUFPQSxLQUFBLEVBQU8saUJBQWlCLENBQUMsU0FQekI7TUFRQSxlQUFBLEVBQWlCLEVBUmpCO01BU0EsTUFBQSxFQUFRLElBVFI7S0FEZTtJQVdoQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVYsQ0FBdUIsU0FBdkIsRUFBa0M7TUFBRSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBQVY7TUFBaUIsTUFBQSxFQUFRLGVBQXpCO0tBQWxDLEVBQThFO01BQUUsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFYO01BQW1CLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsRUFBZCxDQUF0QjtLQUE5RTtJQUVBLGVBQUEsR0FBa0I7SUFDbEIsU0FBQSxHQUFnQixJQUFBLEtBQUEsQ0FDZjtNQUFBLElBQUEsRUFBTSxpQkFBaUIsQ0FBQyxLQUF4QjtNQUNBLEtBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxNQUFWO1FBQWtCLFVBQUEsRUFBWSxLQUE5QjtRQUNBLFVBQUEsRUFBWSxHQURaO1FBRUEsYUFBQSxFQUFlLFFBRmY7UUFHQSxPQUFBLEVBQVMsV0FIVDtRQUlBLFNBQUEsRUFBVyxRQUpYO09BRkQ7TUFPQSxLQUFBLEVBQU8saUJBQWlCLENBQUMsU0FQekI7TUFRQSxlQUFBLEVBQWlCLEVBUmpCO01BU0EsTUFBQSxFQUFRLElBVFI7S0FEZTtJQVdoQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVYsQ0FBdUIsU0FBdkIsRUFBa0M7TUFBRSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBQVY7TUFBaUIsTUFBQSxFQUFRLGVBQXpCO0tBQWxDLEVBQThFO01BQUUsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFYO01BQW1CLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsRUFBZCxDQUF0QjtLQUE5RTtBQUVBLFdBQU87RUF4Q0c7O3lCQTJDWCxXQUFBLEdBQWEsU0FBQyxPQUFEO0FBQ1osUUFBQTs7TUFEYSxVQUFVOztJQUN2QixJQUFDLENBQUEsUUFBRCxHQUFZLFFBQVEsQ0FBQzs7TUFHckIsT0FBTyxDQUFDLGdCQUFpQjs7SUFFekIsYUFBQSxHQUFnQixDQUFDLENBQUMsUUFBRixDQUFXLE9BQU8sQ0FBQyxhQUFuQixFQUFrQztNQUFFLHVCQUFBLEVBQXlCLEVBQTNCO01BQStCLHVCQUFBLEVBQXlCLEVBQXhEO01BQTRELFNBQUEsRUFBVyxJQUFDLENBQUEsU0FBeEU7S0FBbEM7SUFFaEIsSUFBQSxHQUFPO0FBQ1AsWUFBTyxJQUFDLENBQUEsTUFBUjtBQUFBLFdBQ00sTUFBTSxDQUFDLFlBRGI7UUFDK0IsSUFBQSxHQUFPLEVBQUEsR0FBSztBQUFyQztBQUROLFdBRU0sTUFBTSxDQUFDLGdCQUZiO1FBRW1DLElBQUEsR0FBTztBQUFwQztBQUZOLFdBR00sTUFBTSxDQUFDLGFBSGI7UUFHZ0MsSUFBQSxHQUFPLEVBQUEsR0FBSyxDQUFDLENBQUEsR0FBRSxJQUFDLENBQUEsS0FBSjtBQUg1QztJQUtBLEtBQUEsR0FBWSxJQUFBLEtBQUEsQ0FDWDtNQUFBLEtBQUEsRUFBTyxLQUFLLENBQUMsTUFBYjtNQUNBLElBQUEsRUFBTSxJQUROO01BRUEsS0FBQSxFQUFPLGFBQWEsQ0FBQyxhQUZyQjtNQUdBLGVBQUEsRUFBaUIsRUFIakI7TUFJQSxNQUFBLEVBQVEsSUFKUjtLQURXO0lBT1osSUFBRyxJQUFDLENBQUEsTUFBRCxLQUFXLE1BQU0sQ0FBQyxhQUFyQjtNQUNDLEtBQUssQ0FBQyxVQUFOLEdBQW1CO01BQ25CLEtBQUssQ0FBQyxRQUFOLEdBQWlCO01BQ2pCLEtBQUssQ0FBQyxNQUFOLEdBQWUsSUFIaEI7O0FBS0EsV0FBTztFQTFCSzs7eUJBNkJiLE1BQUEsR0FBUSxTQUFDLE9BQUQ7O01BQUMsVUFBVTs7SUFDbEIsSUFBQyxDQUFBLFdBQUQsQ0FBYSxPQUFiO0lBQ0EsSUFBQyxDQUFBLFFBQUQsR0FBWSxRQUFRLENBQUM7QUFFckIsV0FBTztFQUpBOzt5QkFPUixTQUFBLEdBQVcsU0FBQyxPQUFEO0FBQ1YsUUFBQTs7TUFEVyxVQUFVOztJQUNyQixJQUFDLENBQUEsUUFBRCxHQUFZLFFBQVEsQ0FBQzs7TUFHckIsT0FBTyxDQUFDLGdCQUFpQjs7O01BQ3pCLE9BQU8sQ0FBQyxlQUFnQjs7O01BQ3hCLE9BQU8sQ0FBQyxZQUFhLFNBQVMsQ0FBQzs7SUFFL0IsYUFBQSxHQUFnQixDQUFDLENBQUMsUUFBRixDQUFXLE9BQU8sQ0FBQyxhQUFuQixFQUFrQztNQUFFLHVCQUFBLEVBQXlCLEVBQTNCO01BQStCLHVCQUFBLEVBQXlCLEVBQXhEO01BQTRELFNBQUEsRUFBVyxJQUFDLENBQUEsU0FBeEU7S0FBbEM7SUFDaEIsWUFBQSxHQUFlLE9BQU8sQ0FBQztJQUN2QixTQUFBLEdBQVksT0FBTyxDQUFDO0lBRXBCLFNBQUEsR0FBWTtJQUFJLFFBQUEsR0FBVztJQUFJLFNBQUEsR0FBWTtBQUMzQyxZQUFPLElBQUMsQ0FBQSxNQUFSO0FBQUEsV0FDTSxNQUFNLENBQUMsWUFEYjtRQUVFLFNBQUEsR0FBWTtRQUNaLFFBQUEsR0FBVztRQUNYLFNBQUEsR0FBWTtBQUhSO0FBRE4sV0FLTSxNQUFNLENBQUMsZ0JBTGI7UUFNRSxTQUFBLEdBQVk7UUFDWixRQUFBLEdBQVc7UUFDWCxTQUFBLEdBQVk7QUFIUjtBQUxOLFdBU00sTUFBTSxDQUFDLGFBVGI7UUFVRSxTQUFBLEdBQVk7UUFDWixRQUFBLEdBQVc7UUFDWCxTQUFBLEdBQVk7QUFIUjtBQVROLFdBYU0sTUFBTSxDQUFDLFVBYmI7UUFjRSxTQUFBLEdBQVk7QUFkZDtJQWdCQSxLQUFBLEdBQVksSUFBQSxLQUFBLENBQ1g7TUFBQSxLQUFBLEVBQU8sS0FBSyxDQUFDLE1BQWI7TUFDQSxJQUFBLEVBQU0sU0FETjtNQUVBLEtBQUEsRUFBTyxhQUFhLENBQUMsYUFGckI7TUFHQSxlQUFBLEVBQWlCLEVBSGpCO01BSUEsTUFBQSxFQUFRLElBSlI7S0FEVztJQU1aLElBQUcsSUFBQyxDQUFBLE1BQUQsS0FBVyxNQUFNLENBQUMsYUFBckI7TUFDQyxLQUFLLENBQUMsVUFBTixHQUFtQjtNQUNuQixLQUFLLENBQUMsUUFBTixHQUFpQjtNQUNqQixLQUFLLENBQUMsTUFBTixHQUFlLElBSGhCOztJQUtBLElBQUEsR0FBVyxJQUFBLHlCQUFBLENBQ1Y7TUFBQSxLQUFBLEVBQU8sS0FBSyxDQUFDLE1BQWI7TUFDQSxJQUFBLEVBQU0sUUFETjtNQUVBLE1BQUEsRUFBUSxJQUZSO0tBRFU7SUFLWCxTQUFBLEdBQWdCLElBQUEsS0FBQSxDQUFNLGFBQWEsQ0FBQyxTQUFwQjtJQUNoQixJQUFJLENBQUMsV0FBTCxHQUFtQjtJQUNuQixJQUFJLENBQUMsYUFBTCxHQUFxQjtJQUNyQixJQUFJLENBQUMsVUFBTCxHQUFrQixTQUFTLENBQUMsS0FBVixDQUFnQixFQUFoQjtJQUNsQixJQUFJLENBQUMsV0FBTCxDQUFpQixZQUFqQixFQUErQixLQUEvQjtBQUVBLFdBQU87RUFuREc7O3lCQXNEWCxRQUFBLEdBQVUsU0FBQyxPQUFEO0FBQ1QsUUFBQTs7TUFEVSxVQUFVOztJQUNwQixJQUFDLENBQUEsUUFBRCxHQUFZLFFBQVEsQ0FBQzs7TUFHckIsT0FBTyxDQUFDLHFCQUFzQjs7O01BQzlCLE9BQU8sQ0FBQyxtQkFBb0I7O0lBRTVCLGtCQUFBLEdBQXFCLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBTyxDQUFDLGtCQUFuQixFQUF1QztNQUFFLFNBQUEsRUFBVyxJQUFDLENBQUEsU0FBZDtLQUF2QztJQUNyQixnQkFBQSxHQUFtQixDQUFDLENBQUMsUUFBRixDQUFXLE9BQU8sQ0FBQyxnQkFBbkIsRUFBcUM7TUFBRSxTQUFBLEVBQVcsSUFBQyxDQUFBLFNBQWQ7S0FBckM7SUFFbkIsZ0JBQUEsR0FBbUI7SUFDbkIsVUFBQSxHQUFpQixJQUFBLEtBQUEsQ0FDaEI7TUFBQSxJQUFBLEVBQU0sa0JBQWtCLENBQUMsS0FBekI7TUFDQSxLQUFBLEVBQ0M7UUFBQSxRQUFBLEVBQVUsTUFBVjtRQUFrQixVQUFBLEVBQVksS0FBOUI7UUFDQSxVQUFBLEVBQWUsZ0JBQUQsR0FBa0IsSUFEaEM7UUFFQSxhQUFBLEVBQWUsT0FGZjtRQUdBLE9BQUEsRUFBUyxVQUhUO1FBSUEsU0FBQSxFQUFXLE1BSlg7T0FGRDtNQU9BLEtBQUEsRUFBTyxrQkFBa0IsQ0FBQyxTQVAxQjtNQVFBLGVBQUEsRUFBaUIsRUFSakI7TUFTQSxNQUFBLEVBQVEsSUFUUjtLQURnQjtJQVdqQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVYsQ0FBdUIsVUFBdkIsRUFBbUM7TUFBRSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBQVY7TUFBaUIsTUFBQSxFQUFRLGdCQUF6QjtLQUFuQyxFQUFnRjtNQUFFLENBQUEsRUFBRyxLQUFLLENBQUMsSUFBWDtNQUFpQixDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQTFCO0tBQWhGO0lBRUEsY0FBQSxHQUFpQjtJQUNqQixRQUFBLEdBQWUsSUFBQSxLQUFBLENBQ2Q7TUFBQSxJQUFBLEVBQU0sZ0JBQWdCLENBQUMsS0FBdkI7TUFDQSxLQUFBLEVBQ0M7UUFBQSxRQUFBLEVBQVUsTUFBVjtRQUFrQixVQUFBLEVBQVksS0FBOUI7UUFDQSxVQUFBLEVBQWUsY0FBRCxHQUFnQixJQUQ5QjtRQUVBLGFBQUEsRUFBZSxRQUZmO1FBR0EsT0FBQSxFQUFTLFVBSFQ7UUFJQSxTQUFBLEVBQVcsTUFKWDtPQUZEO01BT0EsS0FBQSxFQUFPLGdCQUFnQixDQUFDLFNBUHhCO01BUUEsZUFBQSxFQUFpQixFQVJqQjtNQVNBLE1BQUEsRUFBUSxJQVRSO0tBRGM7SUFXZixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVYsQ0FBdUIsUUFBdkIsRUFBaUM7TUFBRSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBQVY7TUFBaUIsTUFBQSxFQUFRLGNBQXpCO0tBQWpDLEVBQTRFO01BQUUsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFYO01BQWlCLENBQUEsRUFBRyxVQUFVLENBQUMsSUFBL0I7S0FBNUU7QUFFQSxXQUFPO0VBdENFOzt5QkF5Q1YsU0FBQSxHQUFXLFNBQUMsT0FBRDtBQUNWLFFBQUE7O01BRFcsVUFBVTs7SUFDckIsSUFBQyxDQUFBLFFBQUQsR0FBWSxRQUFRLENBQUM7SUFDckIsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUFBLEtBQUEsRUFBTyxHQUFQO01BQVksTUFBQSxFQUFRLEVBQXBCO01BQXdCLEtBQUEsRUFBTyxDQUEvQjs7O01BR1QsT0FBTyxDQUFDLGdCQUFpQjs7O01BQ3pCLE9BQU8sQ0FBQyxlQUFnQjs7SUFFeEIsYUFBQSxHQUFnQixDQUFDLENBQUMsUUFBRixDQUFXLE9BQU8sQ0FBQyxhQUFuQixFQUFrQztNQUFFLHVCQUFBLEVBQXlCLEVBQTNCO01BQStCLHVCQUFBLEVBQXlCLEVBQXhEO01BQTRELFNBQUEsRUFBVyxJQUFDLENBQUEsU0FBeEU7S0FBbEM7SUFDaEIsWUFBQSxHQUFlLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBTyxDQUFDLFlBQW5CLEVBQWlDO01BQUUsU0FBQSxFQUFXLElBQUMsQ0FBQSxTQUFkO0tBQWpDO0lBRWYsS0FBQSxHQUFZLElBQUEsS0FBQSxDQUNYO01BQUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFUO01BQWUsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUF4QjtNQUNBLElBQUEsRUFBTSxFQUROO01BRUEsS0FBQSxFQUFPLGFBQWEsQ0FBQyxhQUZyQjtNQUdBLFVBQUEsRUFBWSxDQUhaO01BR2UsUUFBQSxFQUFVLEVBSHpCO01BRzZCLE1BQUEsRUFBUSxHQUhyQztNQUlBLGVBQUEsRUFBaUIsRUFKakI7TUFLQSxNQUFBLEVBQVEsSUFMUjtLQURXO0lBUVosSUFBQSxHQUFXLElBQUEsS0FBQSxDQUNWO01BQUEsSUFBQSxFQUFNLFlBQVksQ0FBQyxLQUFuQjtNQUNBLEtBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxNQUFWO1FBQWtCLFVBQUEsRUFBWSxLQUE5QjtRQUNBLFVBQUEsRUFBZSxJQUFDLENBQUEsTUFBRixHQUFTLElBRHZCO1FBRUEsYUFBQSxFQUFlLFFBRmY7UUFHQSxTQUFBLEVBQVcsTUFIWDtPQUZEO01BTUEsS0FBQSxFQUFPLFlBQVksQ0FBQyxTQU5wQjtNQU9BLGVBQUEsRUFBaUIsRUFQakI7TUFRQSxNQUFBLEVBQVEsSUFSUjtLQURVO0lBVVgsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFWLENBQXVCLElBQXZCLEVBQTZCO01BQUUsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUFYO0tBQTdCLEVBQWtEO01BQUUsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFOLEdBQWEsQ0FBbEI7TUFBcUIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUE5QjtLQUFsRDtJQUVBLElBQUcsSUFBQyxDQUFBLFlBQUQsQ0FBQSxDQUFlLENBQUMsS0FBaEIsR0FBd0IsSUFBQyxDQUFBLEtBQTVCO01BQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFWLENBQXVCLElBQXZCLEVBQTZCO1FBQUUsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFELEdBQVMsS0FBSyxDQUFDLEtBQXhCO1FBQStCLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFBeEM7T0FBN0IsRUFBK0U7UUFBRSxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQU4sR0FBYSxDQUFsQjtRQUFxQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQTlCO09BQS9FLEVBREQ7O0lBSUEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxTQUFBLEdBQVUsTUFBTSxDQUFDLGVBQXJCLEVBQXdDLFNBQUE7TUFDdkMsSUFBRyxJQUFDLENBQUEsZUFBRCxLQUFvQixlQUFlLENBQUMsT0FBdkM7UUFDQyxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQztlQUNoQixJQUFJLENBQUMsQ0FBTCxHQUFTLEtBQUssQ0FBQyxJQUFOLEdBQWEsRUFGdkI7T0FBQSxNQUdLLElBQUcsSUFBQyxDQUFBLGVBQUQsS0FBb0IsZUFBZSxDQUFDLFFBQXZDO1FBQ0osS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUM7ZUFDaEIsSUFBSSxDQUFDLENBQUwsR0FBUyxLQUFLLENBQUMsQ0FBTixHQUFVLElBQUksQ0FBQyxLQUFmLEdBQXVCLEVBRjVCOztJQUprQyxDQUF4QztBQVFBLFdBQU87RUEzQ0c7O3lCQThDWCxLQUFBLEdBQU8sU0FBQyxRQUFEOztNQUFDLFdBQVc7O0lBQ2xCLElBQUMsQ0FBQSxRQUFELEdBQVk7SUFDWixJQUFDLENBQUEsS0FBRCxHQUFTO0FBRVQsV0FBTztFQUpEOzs7O0dBL2IyQjs7QUFzYzdCOzs7RUFFUSxtQkFBQyxPQUFEOztNQUFDLFVBQVU7OztNQUN2QixPQUFPLENBQUMsa0JBQW1COztJQUMzQiwyQ0FBTSxPQUFOO0lBR0EsSUFBQyxDQUFBLEVBQUQsR0FBVSxJQUFBLEtBQUEsQ0FDVDtNQUFBLElBQUEsRUFBTSxLQUFOO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQURSO01BQ2UsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUR4QjtNQUVBLGVBQUEsRUFBaUIsT0FGakI7TUFHQSxZQUFBLEVBQWMsRUFIZDtNQUlBLE1BQUEsRUFBUSxJQUpSO0tBRFM7SUFNVixJQUFDLENBQUEsRUFBRSxDQUFDLEtBQUosR0FBWSxLQUFLLENBQUMsVUFBTixDQUFpQixJQUFDLENBQUEsRUFBbEIsRUFBc0IsRUFBdEI7SUFHWixJQUFDLENBQUEsWUFBRCxHQUFvQixJQUFBLEtBQUEsQ0FDbkI7TUFBQSxJQUFBLEVBQU0sZUFBTjtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FEUjtNQUNlLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFEeEI7TUFFQSxlQUFBLEVBQWlCLE9BRmpCO01BR0EsTUFBQSxFQUFRLElBSFI7S0FEbUI7SUFPcEIsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLEtBQUEsQ0FDWjtNQUFBLElBQUEsRUFBTSxRQUFOO01BQ0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxJQURQO01BRUEsS0FBQSxFQUNDO1FBQUEsUUFBQSxFQUFZLENBQUMsRUFBQSxHQUFLLENBQUwsR0FBTyxHQUFQLEdBQVcsR0FBWCxHQUFlLEdBQWhCLENBQUEsR0FBb0IsSUFBaEM7UUFBcUMsVUFBQSxFQUFZLEtBQWpEO1FBQ0EsVUFBQSxFQUFZLEdBRFo7UUFFQSxTQUFBLEVBQVcsUUFGWDtPQUhEO01BTUEsZUFBQSxFQUFpQixFQU5qQjtNQU9BLE1BQUEsRUFBUSxJQVBSO0tBRFk7SUFVYixJQUFDLENBQUEsS0FBSyxDQUFDLEVBQVAsQ0FBVSxhQUFWLEVBQXlCLFNBQUE7TUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFWLENBQW1CLElBQW5CO2FBQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUztRQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsQ0FBZCxDQUFIO1FBQXFCLElBQUEsRUFBTSxDQUFDLEVBQTVCOztJQUZlLENBQXpCO0VBL0JZOztzQkFvQ2IsVUFBQSxHQUFZLFNBQUMsSUFBRDs7TUFBQyxPQUFPOztJQUNuQixJQUFHLElBQUg7TUFDQyxJQUFDLENBQUEsS0FBRCxHQUNDO1FBQUEsWUFBQSxFQUFjLEVBQWQ7UUFDQSxLQUFBLEVBQU8sR0FBQSxHQUFNLEdBRGI7O2FBRUQsSUFBQyxDQUFBLFlBQVksQ0FBQyxLQUFkLEdBQ0M7UUFBQSxZQUFBLEVBQWMsRUFBZDtRQUNBLEtBQUEsRUFBTyxHQUFBLEdBQU0sR0FEYjtRQUxGO0tBQUEsTUFBQTtNQVFDLElBQUMsQ0FBQSxLQUFELEdBQ0M7UUFBQSxZQUFBLEVBQWMsQ0FBZDtRQUNBLEtBQUEsRUFBTyxDQURQOzthQUVELElBQUMsQ0FBQSxZQUFZLENBQUMsS0FBZCxHQUNDO1FBQUEsWUFBQSxFQUFjLENBQWQ7UUFDQSxLQUFBLEVBQU8sQ0FEUDtRQVpGOztFQURXOztzQkFpQlosUUFBQSxHQUFVLFNBQUMsYUFBRDtBQUNULFFBQUE7O01BRFUsZ0JBQWdCOztJQUMxQixJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsR0FBYyxJQUFDLENBQUEsSUFBRCxHQUFRO0lBQ3RCLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxXQUFBLENBQVk7TUFBQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBQVI7TUFBZSxNQUFBLEVBQVEsSUFBQyxDQUFBLE1BQXhCO01BQWdDLE1BQUEsRUFBUSxJQUFDLENBQUEsWUFBekM7S0FBWjtBQUViLFNBQUEsdURBQUE7O01BQ0MsSUFBRyxZQUFIO1FBQ0MsSUFBQyxDQUFBLFlBQVksQ0FBQyxRQUFkLENBQXVCLFlBQXZCO0FBQ0EsZ0JBQU8sQ0FBUDtBQUFBLGVBQ00sQ0FETjtZQUVFLFlBQVksQ0FBQyxLQUFiLEdBQXFCO2NBQUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFUO2NBQWUsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUF4QjtjQUE2QixPQUFBLEVBQVMsQ0FBdEM7Y0FBeUMsT0FBQSxFQUFTLENBQWxEOztZQUNyQixZQUFZLENBQUMsZUFBYixHQUErQixPQUFPLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQztBQUZoRTtBQUROLGVBSU0sQ0FKTjtZQUtFLFlBQVksQ0FBQyxLQUFiLEdBQXFCO2NBQUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFUO2NBQWdCLENBQUEsRUFBRyxLQUFLLENBQUMsR0FBekI7Y0FBOEIsT0FBQSxFQUFTLENBQXZDO2NBQTBDLE9BQUEsRUFBUyxDQUFuRDs7WUFDckIsWUFBWSxDQUFDLGVBQWIsR0FBK0IsT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7QUFGaEU7QUFKTixlQU9NLENBUE47WUFRRSxZQUFZLENBQUMsS0FBYixHQUFxQjtjQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsSUFBVDtjQUFlLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBeEI7Y0FBZ0MsT0FBQSxFQUFTLENBQXpDO2NBQTRDLE9BQUEsRUFBUyxDQUFyRDs7WUFDckIsWUFBWSxDQUFDLGVBQWIsR0FBK0IsT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7QUFGaEU7QUFQTixlQVVNLENBVk47WUFXRSxZQUFZLENBQUMsS0FBYixHQUFxQjtjQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBVDtjQUFnQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQXpCO2NBQWlDLE9BQUEsRUFBUyxDQUExQztjQUE2QyxPQUFBLEVBQVMsQ0FBdEQ7O1lBQ3JCLFlBQVksQ0FBQyxlQUFiLEdBQStCLE9BQU8sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDO0FBWnRFLFNBRkQ7O0FBREQ7QUFpQkEsV0FBTztFQXJCRTs7c0JBd0JWLFdBQUEsR0FBYSxTQUFDLGFBQUQ7QUFDWixRQUFBOztNQURhLGdCQUFnQjs7SUFDN0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLEdBQWMsSUFBQyxDQUFBLElBQUQsR0FBUTtJQUN0QixJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsV0FBQSxDQUFZO01BQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFSO01BQWUsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUF4QjtNQUFnQyxNQUFBLEVBQVEsSUFBQyxDQUFBLFlBQXpDO0tBQVo7QUFFYixTQUFBLHVEQUFBOztNQUNDLElBQUcsWUFBSDtRQUNDLElBQUMsQ0FBQSxZQUFZLENBQUMsUUFBZCxDQUF1QixZQUF2QjtBQUNBLGdCQUFPLENBQVA7QUFBQSxlQUNNLENBRE47WUFFRSxZQUFZLENBQUMsS0FBYixHQUFxQjtjQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsSUFBVDtjQUFlLENBQUEsRUFBRyxLQUFLLENBQUMsR0FBeEI7O1lBQ3JCLFlBQVksQ0FBQyxlQUFiLEdBQStCLE9BQU8sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDO0FBRmhFO0FBRE4sZUFJTSxDQUpOO1lBS0UsWUFBWSxDQUFDLEtBQWIsR0FBcUI7Y0FBQSxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQVQ7Y0FBZ0IsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUF6Qjs7WUFDckIsWUFBWSxDQUFDLGVBQWIsR0FBK0IsT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7QUFGaEU7QUFKTixlQU9NLENBUE47WUFPYSxZQUFZLENBQUMsS0FBYixHQUFxQjtjQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBVDtjQUFpQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQTFCOztBQVBsQyxTQUZEOztBQUREO0FBWUEsV0FBTztFQWhCSzs7c0JBbUJiLE9BQUEsR0FBUyxTQUFDLGFBQUQ7QUFDUixRQUFBOztNQURTLGdCQUFnQjs7SUFDekIsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLEdBQWMsSUFBQyxDQUFBLElBQUQsR0FBUTtJQUN0QixJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsWUFBQSxDQUFhO01BQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFSO01BQWUsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUF4QjtNQUFnQyxNQUFBLEVBQVEsSUFBQyxDQUFBLFlBQXpDO0tBQWI7QUFFYixTQUFBLHVEQUFBOztNQUNDLElBQUcsWUFBSDtRQUNDLElBQUMsQ0FBQSxZQUFZLENBQUMsUUFBZCxDQUF1QixZQUF2QjtBQUNBLGdCQUFPLENBQVA7QUFBQSxlQUNNLENBRE47WUFDYSxZQUFZLENBQUMsS0FBYixHQUFxQjtjQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsSUFBVDtjQUFlLENBQUEsRUFBRyxLQUFLLENBQUMsR0FBTixDQUFVLEVBQVYsQ0FBbEI7O0FBQTVCO0FBRE4sZUFFTSxDQUZOO1lBRWEsWUFBWSxDQUFDLEtBQWIsR0FBcUI7Y0FBQSxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQVQ7Y0FBZSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQXhCOztBQUE1QjtBQUZOLGVBR00sQ0FITjtZQUdhLFlBQVksQ0FBQyxLQUFiLEdBQXFCO2NBQUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFUO2NBQWlCLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBMUI7O0FBQTVCO0FBSE4sZUFJTSxDQUpOO1lBSWEsWUFBWSxDQUFDLEtBQWIsR0FBcUI7Y0FBQSxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQVQ7Y0FBZ0IsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUF6Qjs7QUFBNUI7QUFKTixlQUtNLENBTE47WUFLYSxZQUFZLENBQUMsS0FBYixHQUFxQjtjQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBVDtjQUFpQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLENBQXBCOztBQUxsQyxTQUZEOztBQUREO0FBVUEsV0FBTztFQWRDOzs7O0dBbEdjOztBQW9IbEI7OztFQUVRLGVBQUMsT0FBRDs7TUFBQyxVQUFVOzs7TUFDdkIsT0FBTyxDQUFDLGtCQUFtQjs7SUFDM0IsdUNBQU0sT0FBTjtFQUZZOztrQkFLYixLQUFBLEdBQU8sU0FBQyxLQUFEO1dBQVcsSUFBQyxDQUFBLEtBQUQsR0FBUztFQUFwQjs7a0JBRVAsSUFBQSxHQUFNLFNBQUE7SUFBRyxJQUF3QixJQUFDLENBQUEsS0FBekI7YUFBQSxhQUFBLENBQWMsSUFBQyxDQUFBLEtBQWYsRUFBQTs7RUFBSDs7OztHQVRhOztBQWFkOzs7RUFFUSxzQkFBQyxPQUFEOztNQUFDLFVBQVU7O0lBQ3ZCLE9BQU8sQ0FBQyxJQUFSLEdBQWU7SUFDZixPQUFPLENBQUMsSUFBUixHQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBVixDQUF3QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBQSxDQUF4QjtJQUNmLE9BQU8sQ0FBQyxLQUFSLEdBQ0M7TUFBQSxRQUFBLEVBQVUsTUFBVjtNQUFrQixVQUFBLEVBQVksS0FBOUI7TUFDQSxVQUFBLEVBQVksR0FEWjtNQUVBLFNBQUEsRUFBVyxPQUZYO01BR0EsYUFBQSxFQUFlLE1BSGY7O0lBSUQsOENBQU0sT0FBTjtJQUVBLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBVixDQUFtQixJQUFuQjtJQUNBLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFBQSxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFDLEVBQWIsQ0FBSDtNQUFxQixDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxFQUFWLENBQXhCOztJQUdULElBQUMsQ0FBQSxLQUFELENBQUE7RUFkWTs7eUJBZ0JiLEtBQUEsR0FBTyxTQUFBO0lBQ04seUNBQUEsU0FBQTtJQUNBLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQUE7SUFDUixJQUFDLENBQUEsSUFBRCxHQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBVixDQUF3QixJQUFDLENBQUEsSUFBRCxHQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFBLENBQWhDO1dBQ1IsS0FBSyxDQUFDLEtBQU4sQ0FBWSxFQUFBLEdBQUssSUFBQyxDQUFBLElBQUksQ0FBQyxJQUF2QixFQUE2QixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDNUIsS0FBQyxDQUFBLElBQUQsR0FBUSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQVYsQ0FBd0IsS0FBQyxDQUFBLElBQUQsR0FBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBQSxDQUFoQztRQUNSLEtBQUMsQ0FBQSxLQUFELEdBQVMsS0FBSyxDQUFDLFFBQU4sQ0FBZSxFQUFmLEVBQW1CLFNBQUE7aUJBQUcsS0FBQyxDQUFBLElBQUQsR0FBUSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQVYsQ0FBd0IsS0FBQyxDQUFBLElBQUQsR0FBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBQSxDQUFoQztRQUFYLENBQW5CO2VBQ1QseUNBQU0sS0FBQyxDQUFBLEtBQVA7TUFINEI7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTdCO0VBSk07Ozs7R0FsQm1COztBQTZCckI7OztFQUVRLHFCQUFDLE9BQUQ7QUFDWixRQUFBOztNQURhLFVBQVU7OztJQUN2Qiw2Q0FBTSxPQUFOO0lBRUEsSUFBQyxDQUFBLFlBQUQsR0FBZ0IsSUFBQyxDQUFBLEtBQUQsR0FBTztJQUd2QixJQUFDLENBQUEsSUFBRCxHQUFZLElBQUEsS0FBQSxDQUNYO01BQUEsSUFBQSxFQUFNLE9BQU47TUFDQSxLQUFBLEVBQU8sS0FBSyxDQUFDLE1BRGI7TUFFQSxJQUFBLEVBQU0sSUFBQyxDQUFBLEtBRlA7TUFHQSxlQUFBLEVBQWlCLEVBSGpCO01BSUEsTUFBQSxFQUFRLElBSlI7S0FEVztJQU9aLFFBQUEsR0FBVyxHQUFBLEdBQU07QUFDakIsU0FBUywyQkFBVDtNQUVDLFdBQUcsR0FBRyxFQUFILEtBQVEsQ0FBWDtRQUNDLE9BQUEsR0FBYyxJQUFBLEtBQUEsQ0FDYjtVQUFBLElBQUEsRUFBTSxZQUFOO1VBQ0EsSUFBQSxFQUFNLENBQUEsR0FBSSxDQURWO1VBRUEsS0FBQSxFQUNDO1lBQUEsUUFBQSxFQUFVLE1BQVY7WUFBa0IsVUFBQSxFQUFZLEtBQTlCO1lBQ0EsVUFBQSxFQUFZLEdBRFo7WUFFQSxTQUFBLEVBQVcsUUFGWDtXQUhEO1VBTUEsS0FBQSxFQUFPLE9BTlA7VUFPQSxlQUFBLEVBQWlCLEVBUGpCO1VBUUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxJQVJUO1NBRGE7UUFVZCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVYsQ0FBbUIsT0FBbkI7UUFDQSxDQUFBLEdBQUksQ0FBQyxDQUFDLEVBQUQsR0FBTSxDQUFDLFFBQUEsR0FBVyxDQUFaLENBQVAsQ0FBQSxHQUF5QixDQUFDLElBQUksQ0FBQyxFQUFMLEdBQVUsR0FBWDtRQUM3QixDQUFBLEdBQUksSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFOLEdBQVksQ0FBWixHQUFnQixPQUFPLENBQUMsTUFBeEIsR0FBaUM7UUFDckMsT0FBTyxDQUFDLEtBQVIsR0FDQztVQUFBLENBQUEsRUFBRyxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQU4sR0FBWSxDQUFaLEdBQWdCLE9BQU8sQ0FBQyxLQUFSLEdBQWMsQ0FBOUIsR0FBa0MsSUFBSSxDQUFDLEdBQUwsQ0FBUyxDQUFULENBQUEsR0FBYyxDQUFuRDtVQUNBLENBQUEsRUFBRyxJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sR0FBYSxDQUFiLEdBQWlCLE9BQU8sQ0FBQyxNQUFSLEdBQWUsQ0FBaEMsR0FBb0MsSUFBSSxDQUFDLEdBQUwsQ0FBUyxDQUFULENBQUEsR0FBYyxDQURyRDtVQWZGOztNQW1CQSxXQUFHLEdBQUssRUFBTCxLQUFVLENBQWI7UUFDQyxNQUFBLEdBQWEsSUFBQSxLQUFBLENBQ1o7VUFBQSxJQUFBLEVBQU0sV0FBTjtVQUNBLElBQUEsRUFBUyxDQUFBLEdBQUksRUFBUCxHQUFlLEdBQUEsR0FBSSxDQUFuQixHQUE0QixDQURsQztVQUVBLEtBQUEsRUFDQztZQUFBLFFBQUEsRUFBVSxNQUFWO1lBQWtCLFVBQUEsRUFBWSxLQUE5QjtZQUNBLFVBQUEsRUFBWSxHQURaO1lBRUEsU0FBQSxFQUFXLFFBRlg7WUFHQSxhQUFBLEVBQWUsTUFIZjtXQUhEO1VBT0EsS0FBQSxFQUFPLE9BUFA7VUFRQSxlQUFBLEVBQWlCLEVBUmpCO1VBU0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxJQVRUO1NBRFk7UUFXYixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVYsQ0FBbUIsTUFBbkI7UUFDQSxDQUFBLEdBQUksQ0FBQyxDQUFDLEVBQUQsR0FBTSxDQUFDLFFBQUEsR0FBVyxDQUFaLENBQVAsQ0FBQSxHQUF5QixDQUFDLElBQUksQ0FBQyxFQUFMLEdBQVUsR0FBWDtRQUM3QixDQUFBLEdBQUksSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFOLEdBQVksQ0FBWixHQUFnQixNQUFNLENBQUMsTUFBdkIsR0FBZ0M7UUFDcEMsSUFBVSxDQUFBLEtBQUssRUFBTCxJQUFXLENBQUEsS0FBSyxFQUExQjtVQUFBLENBQUEsSUFBSyxFQUFMOztRQUNBLE1BQU0sQ0FBQyxLQUFQLEdBQ0M7VUFBQSxDQUFBLEVBQUcsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFOLEdBQVksQ0FBWixHQUFnQixNQUFNLENBQUMsS0FBUCxHQUFhLENBQTdCLEdBQWlDLElBQUksQ0FBQyxHQUFMLENBQVMsQ0FBVCxDQUFBLEdBQWMsQ0FBbEQ7VUFDQSxDQUFBLEVBQUcsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLEdBQWEsQ0FBYixHQUFpQixNQUFNLENBQUMsTUFBUCxHQUFjLENBQS9CLEdBQW1DLElBQUksQ0FBQyxHQUFMLENBQVMsQ0FBVCxDQUFBLEdBQWMsQ0FEcEQ7VUFqQkY7T0FBQSxNQUFBO1FBcUJDLE1BQUEsR0FBYSxJQUFBLEtBQUEsQ0FDWjtVQUFBLElBQUEsRUFBTSxNQUFOO1VBQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQURUO1VBQ2lCLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFQLEdBQWEsQ0FBYixHQUFpQixDQUE5QixDQURwQjtVQUVBLEtBQUEsRUFBTyxDQUZQO1VBRVUsTUFBQSxFQUFRLENBRmxCO1VBR0EsZUFBQSxFQUFpQixzQkFIakI7VUFJQSxNQUFBLEVBQVksSUFBQSxLQUFBLENBQU07WUFBQSxJQUFBLEVBQU0sa0JBQU47WUFBMEIsS0FBQSxFQUFPLEtBQUssQ0FBQyxNQUF2QztZQUErQyxJQUFBLEVBQU0sQ0FBckQ7WUFBd0QsT0FBQSxFQUFTLEVBQWpFO1lBQXFFLE9BQUEsRUFBUyxDQUE5RTtZQUFpRixRQUFBLEVBQVUsUUFBQSxHQUFXLENBQXRHO1lBQXlHLGVBQUEsRUFBaUIsRUFBMUg7WUFBOEgsTUFBQSxFQUFRLElBQUMsQ0FBQSxJQUF2STtXQUFOLENBSlo7U0FEWSxFQXJCZDs7QUFyQkQ7SUFrREEsSUFBQyxDQUFBLEdBQUQsR0FBVyxJQUFBLEtBQUEsQ0FDVjtNQUFBLElBQUEsRUFBTSxNQUFOO01BQ0EsS0FBQSxFQUFPLEtBQUssQ0FBQyxNQURiO01BRUEsSUFBQSxFQUFNLEVBRk47TUFHQSxZQUFBLEVBQWMsQ0FIZDtNQUlBLGVBQUEsRUFBaUIsT0FKakI7TUFLQSxNQUFBLEVBQVEsSUFMUjtLQURVO0lBT1gsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEdBQWtCLElBQUEsS0FBQSxDQUNqQjtNQUFBLElBQUEsRUFBTSxhQUFOO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQURUO01BQ2lCLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFOLEdBQVksQ0FBWixHQUFnQixDQUE3QixDQURwQjtNQUVBLEtBQUEsRUFBTyxDQUZQO01BRVUsTUFBQSxFQUFRLEVBQUEsR0FBSyxDQUZ2QjtNQUdBLFlBQUEsRUFBYyxDQUhkO01BSUEsZUFBQSxFQUFpQixPQUpqQjtNQUtBLE1BQUEsRUFBUSxJQUFDLENBQUEsR0FMVDtLQURpQjtJQU9sQixJQUFDLENBQUEsR0FBRyxDQUFDLEdBQUwsR0FBZSxJQUFBLEtBQUEsQ0FDZDtNQUFBLElBQUEsRUFBTSxVQUFOO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQURUO01BQ2lCLElBQUEsRUFBTSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFaLEdBQW1CLENBRDFDO01BRUEsS0FBQSxFQUFPLEVBRlA7TUFFVyxNQUFBLEVBQVEsSUFBQyxDQUFBLEtBQUQsR0FBTyxDQUFQLEdBQVcsRUFBWCxHQUFnQixFQUFoQixHQUFxQixDQUZ4QztNQUdBLFlBQUEsRUFBYyxDQUhkO01BSUEsZUFBQSxFQUFpQixPQUpqQjtNQUtBLE1BQUEsRUFBUSxJQUFDLENBQUEsR0FMVDtLQURjO0lBVWYsSUFBQyxDQUFBLElBQUQsR0FBUSxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBQTtJQUNSLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixHQUFlO0lBQ2YsSUFBQyxDQUFBLElBQUksQ0FBQyxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUMsTUFBbEIsSUFBNEI7SUFDNUIsSUFBQyxDQUFBLElBQUksQ0FBQyxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUMsSUFBbEIsR0FBeUIsSUFBQyxDQUFBLElBQUksQ0FBQyxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUMsSUFBbEIsR0FBeUI7SUFFbEQsSUFBQyxDQUFBLEdBQUcsQ0FBQyxVQUFMLENBQUE7SUFDQSxJQUFDLENBQUEsSUFBSSxDQUFDLFVBQU4sQ0FBQTtJQUdBLElBQUMsQ0FBQSxHQUFELEdBQVcsSUFBQSxLQUFBLENBQ1Y7TUFBQSxJQUFBLEVBQU0sTUFBTjtNQUNBLEtBQUEsRUFBTyxLQUFLLENBQUMsTUFEYjtNQUVBLElBQUEsRUFBTSxDQUZOO01BR0EsWUFBQSxFQUFjLENBSGQ7TUFJQSxlQUFBLEVBQWlCLFFBSmpCO01BS0EsTUFBQSxFQUFRLElBTFI7S0FEVTtJQU9YLElBQUMsQ0FBQSxHQUFHLENBQUMsR0FBTCxHQUFlLElBQUEsS0FBQSxDQUNkO01BQUEsSUFBQSxFQUFNLFVBQU47TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRFQ7TUFDaUIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQURwQjtNQUVBLEtBQUEsRUFBTyxDQUZQO01BRVUsTUFBQSxFQUFRLElBQUMsQ0FBQSxLQUFELEdBQU8sQ0FBUCxHQUFXLEVBRjdCO01BR0EsZUFBQSxFQUFpQixJQUFDLENBQUEsR0FBRyxDQUFDLGVBSHRCO01BSUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxHQUpUO0tBRGM7SUFNZixJQUFDLENBQUEsR0FBRyxDQUFDLEdBQUwsR0FBZSxJQUFBLEtBQUEsQ0FDZDtNQUFBLElBQUEsRUFBTSxVQUFOO01BQ0EsS0FBQSxFQUFPLEtBQUssQ0FBQyxNQURiO01BRUEsSUFBQSxFQUFNLENBRk47TUFHQSxZQUFBLEVBQWMsQ0FIZDtNQUlBLGVBQUEsRUFBaUIsT0FKakI7TUFLQSxNQUFBLEVBQVEsSUFBQyxDQUFBLEdBTFQ7S0FEYztJQVNmLFlBQUEsR0FBZSxTQUFBO01BQUcsSUFBaUIsSUFBQyxDQUFBLFFBQUQsS0FBYSxHQUE5QjtlQUFBLElBQUMsQ0FBQSxRQUFELEdBQVksRUFBWjs7SUFBSDtJQUNmLElBQUMsQ0FBQSxHQUFHLENBQUMsY0FBTCxDQUFvQixZQUFwQjtJQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsY0FBTCxDQUFvQixZQUFwQjtJQUNBLElBQUMsQ0FBQSxJQUFJLENBQUMsY0FBTixDQUFxQixZQUFyQjtJQUdBLElBQUMsQ0FBQSxLQUFELENBQUE7RUE3SFk7O3dCQStIYixNQUFBLEdBQVEsU0FBQyxPQUFEO0FBQ1AsUUFBQTs7TUFEUSxVQUFVOztJQUNsQixJQUFBLEdBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQUE7SUFFUCxJQUFrQixJQUFJLENBQUMsSUFBTCxLQUFhLENBQS9CO01BQUEsSUFBSSxDQUFDLElBQUwsR0FBWSxHQUFaOztJQUNBLElBQWtCLElBQUksQ0FBQyxJQUFMLEtBQWEsQ0FBL0I7TUFBQSxJQUFJLENBQUMsSUFBTCxHQUFZLEdBQVo7O0lBQ0EsSUFBZ0MsSUFBSSxDQUFDLEtBQUwsR0FBYSxFQUE3QztNQUFBLElBQUksQ0FBQyxLQUFMLEdBQWEsSUFBSSxDQUFDLEtBQUwsR0FBYSxHQUExQjs7SUFDQSxJQUFtQixJQUFJLENBQUMsS0FBTCxLQUFjLENBQWpDO01BQUEsSUFBSSxDQUFDLEtBQUwsR0FBYSxHQUFiOztJQUVBLFFBQUEsR0FBVyxDQUFDLEdBQUEsR0FBTSxFQUFQLENBQUEsR0FBYSxJQUFJLENBQUM7SUFDN0IsUUFBQSxHQUFXLENBQUMsR0FBQSxHQUFNLEVBQVAsQ0FBQSxHQUFhLElBQUksQ0FBQztJQUM3QixJQUErQyxJQUFJLENBQUMsSUFBTCxLQUFhLEVBQTVEO01BQUEsUUFBQSxJQUFZLENBQUMsR0FBQSxHQUFNLEVBQU4sR0FBVyxFQUFaLENBQUEsR0FBa0IsSUFBSSxDQUFDLEtBQW5DOztJQUNBLFNBQUEsR0FBWSxDQUFDLEdBQUEsR0FBTSxFQUFQLENBQUEsR0FBYSxJQUFJLENBQUM7SUFDOUIsSUFBZ0QsSUFBSSxDQUFDLElBQUwsS0FBYSxFQUE3RDtNQUFBLFNBQUEsSUFBYSxDQUFDLEdBQUEsR0FBTSxFQUFOLEdBQVcsRUFBWixDQUFBLEdBQWtCLElBQUksQ0FBQyxLQUFwQzs7SUFFQSxJQUFDLENBQUEsR0FBRyxDQUFDLFdBQUwsQ0FBQTtJQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFBO0lBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxXQUFOLENBQUE7SUFFQSxJQUFHLE9BQUg7TUFDQyxJQUFDLENBQUEsR0FBRyxDQUFDLE9BQUwsQ0FBYTtRQUFBLFFBQUEsRUFBVSxRQUFWO1FBQW9CLE9BQUEsRUFBUztVQUFFLElBQUEsRUFBTSxHQUFSO1VBQWEsS0FBQSxFQUFPLFFBQXBCO1NBQTdCO09BQWI7TUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLE9BQUwsQ0FBYTtRQUFBLFFBQUEsRUFBVSxRQUFWO1FBQW9CLE9BQUEsRUFBUztVQUFFLEtBQUEsRUFBTyxRQUFUO1NBQTdCO09BQWI7YUFDQSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBYztRQUFBLFFBQUEsRUFBVSxTQUFWO1FBQXFCLE9BQUEsRUFBUztVQUFFLEtBQUEsRUFBTyxRQUFUO1NBQTlCO09BQWQsRUFIRDtLQUFBLE1BQUE7TUFLQyxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsR0FBZ0I7TUFDaEIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxRQUFMLEdBQWdCO2FBQ2hCLElBQUMsQ0FBQSxJQUFJLENBQUMsUUFBTixHQUFpQixVQVBsQjs7RUFsQk87O3dCQTJCUixLQUFBLEdBQU8sU0FBQTtJQUNOLElBQUMsQ0FBQSxNQUFELENBQVEsS0FBUjtJQUNBLElBQUMsQ0FBQSxLQUFELEdBQVMsS0FBSyxDQUFDLFFBQU4sQ0FBZSxDQUFmLEVBQWtCLElBQUMsQ0FBQSxNQUFuQjtXQUNULHVDQUFNLElBQUMsQ0FBQSxLQUFQO0VBSE07Ozs7R0E1SmtCOzs7O0FEOXhCMUI7QUFBQSxJQUFBOzs7O0FBTU0sT0FBTyxDQUFDO0FBR2IsTUFBQTs7OztFQUFBLE1BQU0sQ0FBQyxZQUFQLEdBQXNCOztFQUN0QixNQUFNLENBQUMsSUFBUCxHQUFjOztFQUdkLFVBQUEsR0FDQztJQUFBLFlBQUEsRUFBYyxzQkFBZDtJQUNBLFdBQUEsRUFBYSxxQkFEYjtJQUVBLGFBQUEsRUFBZSx1QkFGZjtJQUdBLE9BQUEsRUFBUyxpQkFIVDtJQUlBLE9BQUEsRUFBUyxpQkFKVDtJQUtBLEtBQUEsRUFBTyxlQUxQO0lBTUEsS0FBQSxFQUFPLGVBTlA7SUFPQSxJQUFBLEVBQU0sY0FQTjtJQVFBLEtBQUEsRUFBTyxlQVJQOzs7RUFVRCxNQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFBc0IsTUFBQyxDQUFBLGNBQUQsQ0FBZ0IsWUFBaEIsRUFBOEIsVUFBOUIsQ0FBdEI7O0VBS0EsTUFBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBQWlCLE1BQUMsQ0FBQSxjQUFELENBQWdCLE9BQWhCLEVBQXlCLEdBQXpCLENBQWpCOztFQUNBLE1BQUMsQ0FBQSxNQUFELENBQVEsUUFBUixFQUFrQixNQUFDLENBQUEsY0FBRCxDQUFnQixRQUFoQixFQUEwQixHQUExQixDQUFsQjs7RUFDQSxNQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFBaUIsTUFBQyxDQUFBLGNBQUQsQ0FBZ0IsT0FBaEIsRUFBeUIsTUFBekIsQ0FBakI7O0VBR2EsZ0JBQUMsT0FBRDtBQUNaLFFBQUE7O01BRGEsVUFBVTs7OztJQUN2Qix3Q0FBTSxPQUFOO0lBR0EsSUFBQyxDQUFBLEtBQUQsR0FBUyxNQUFNLENBQUMsS0FBUCxHQUFlLElBQUMsQ0FBQTtJQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLFlBQWQsR0FBNkIsSUFBQyxDQUFBO0lBRzlCLElBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBekIsQ0FBaUMsT0FBakMsQ0FBQSxLQUErQyxDQUFDLENBQW5EO01BQ0M7TUFBRztNQUNILElBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBekIsQ0FBaUMsTUFBakMsQ0FBQSxLQUE4QyxDQUFDLENBQWxEO1FBQ0MsQ0FBQSxHQUFJLENBQUM7UUFBRyxDQUFBLEdBQUksR0FEYjtPQUFBLE1BRUssSUFBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUF6QixDQUFpQyxNQUFqQyxDQUFBLEtBQThDLENBQUMsQ0FBbEQ7UUFDSixDQUFBLEdBQUk7UUFBRyxDQUFBLEdBQUksSUFEUDs7TUFJTCxJQUFDLENBQUEsWUFBRCxHQUFvQixJQUFBLEtBQUEsQ0FDbkI7UUFBQSxJQUFBLEVBQU0sY0FBTjtRQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBTixDQUFZLENBQVosQ0FESDtRQUNtQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFDLENBQWQsQ0FEdEI7UUFFQSxLQUFBLEVBQU8sRUFGUDtRQUVXLE1BQUEsRUFBUSxHQUZuQjtRQUdBLGVBQUEsRUFBaUIsaUJBSGpCO1FBSUEsTUFBQSxFQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FKdEI7T0FEbUI7TUFRcEIsSUFBQyxDQUFBLElBQUQsR0FBWSxJQUFBLEtBQUEsQ0FDWDtRQUFBLElBQUEsRUFBTSxNQUFOO1FBQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBQSxHQUFFLEVBQWQsQ0FESDtRQUNzQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFBLEdBQUUsRUFBZixDQUR6QjtRQUVBLEtBQUEsRUFBTyxFQUZQO1FBRVcsTUFBQSxFQUFRLEdBRm5CO1FBR0EsZUFBQSxFQUFpQixpQkFIakI7UUFJQSxNQUFBLEVBQVEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUp0QjtPQURXO01BT1osSUFBRyxLQUFLLENBQUMsU0FBTixDQUFBLENBQUEsSUFBc0IsQ0FBSSxLQUFLLENBQUMsVUFBTixDQUFpQixRQUFRLENBQUMsR0FBMUIsQ0FBN0I7UUFDQyxJQUFDLENBQUEsWUFBWSxDQUFDLEtBQWQsR0FBc0IsV0FBQSxDQUFZO1VBQUEsSUFBQSxFQUFNLGVBQU47VUFBdUIsTUFBQSxFQUFRLElBQUMsQ0FBQSxZQUFoQztTQUFaO1FBQ3RCLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBTixHQUFjLFdBQUEsQ0FBWTtVQUFBLElBQUEsRUFBTSxhQUFOO1VBQXFCLE1BQUEsRUFBUSxJQUFDLENBQUEsSUFBOUI7U0FBWixFQUZmOztNQUtBLElBQUMsQ0FBQSxZQUFZLENBQUMsT0FBZCxDQUFzQixTQUFBO2VBQUcsSUFBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsWUFBYixFQUEyQixJQUEzQjtNQUFILENBQXRCO01BQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLENBQWMsU0FBQTtlQUFHLElBQUMsQ0FBQSxJQUFELENBQU0sTUFBTSxDQUFDLElBQWIsRUFBbUIsSUFBbkI7TUFBSCxDQUFkLEVBN0JEOztFQVJZOztFQXVDYixXQUFBLEdBQWMsU0FBQyxPQUFEO0FBQ2IsUUFBQTs7TUFEYyxVQUFVOztJQUN4QixLQUFBLEdBQVksSUFBQSxLQUFBLENBQU0sQ0FBQyxDQUFDLE1BQUYsQ0FBUyxPQUFULEVBQ2pCO01BQUEsSUFBQSxFQUFNLFFBQU47TUFDQSxLQUFBLEVBQ0M7UUFBQSxVQUFBLEVBQVksS0FBWjtRQUNBLFFBQUEsRUFBVSxNQURWO1FBRUEsYUFBQSxFQUFlLFdBRmY7UUFHQSxhQUFBLEVBQWUsUUFIZjtRQUlBLFdBQUEsRUFBYSxNQUpiO09BRkQ7TUFPQSxLQUFBLEVBQU8sTUFQUDtNQVFBLGVBQUEsRUFBaUIsRUFSakI7S0FEaUIsQ0FBTjtJQVVaLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBVixDQUFtQixLQUFuQjtJQUNBLEtBQUssQ0FBQyxLQUFOLEdBQWM7TUFBQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFiLEdBQXFCLEVBQXhCO01BQTRCLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBckM7O0lBRWQsS0FBQSxHQUFZLElBQUEsS0FBQSxDQUNYO01BQUEsSUFBQSxFQUFNLFFBQU47TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRFQ7TUFFQSxJQUFBLEVBQU0sRUFGTjtNQUdBLFFBQUEsRUFBVSxFQUhWO01BSUEsS0FBQSxFQUNDO1FBQUEsV0FBQSxFQUFhLDJCQUFiO09BTEQ7TUFNQSxXQUFBLEVBQWEsTUFOYjtNQU9BLFdBQUEsRUFBYSxDQVBiO01BUUEsZUFBQSxFQUFpQixFQVJqQjtNQVNBLE1BQUEsRUFBUSxLQVRSO0tBRFc7SUFZWixLQUFLLENBQUMsSUFBTixHQUFpQixJQUFBLEtBQUEsQ0FDaEI7TUFBQSxLQUFBLEVBQU8sS0FBSyxDQUFDLE1BQU4sQ0FBYSxHQUFiLENBQVA7TUFDQSxLQUFBLEVBQU8sRUFEUDtNQUNXLE1BQUEsRUFBUSxDQURuQjtNQUVBLFFBQUEsRUFBVSxDQUFDLEVBRlg7TUFHQSxlQUFBLEVBQWlCLE1BSGpCO01BSUEsTUFBQSxFQUFRLEtBSlI7S0FEZ0I7QUFPakIsV0FBTztFQWpDTTs7bUJBb0NkLFVBQUEsR0FBWSxTQUFDLElBQUQ7QUFHWCxRQUFBOztNQUhZLE9BQU8sVUFBVSxDQUFDOztJQUc5QixNQUFBLEdBQVM7QUFDVCxZQUFPLElBQVA7QUFBQSxXQUNNLFVBQVUsQ0FBQyxPQURqQjtRQUM4QixNQUFBLEdBQVM7QUFEdkM7SUFJQSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFwQixHQUErQjtJQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFwQixDQUNDO01BQUEsUUFBQSxFQUFVLENBQVY7TUFDQSxPQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU0sRUFBTjtRQUNBLE1BQUEsRUFBUSxNQURSO1FBRUEsS0FBQSxFQUFPLG1CQUZQO09BRkQ7S0FERDtXQVFBLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBWDtFQWpCVzs7bUJBb0JaLFNBQUEsR0FBVyxTQUFDLElBQUQ7QUFDVixRQUFBO0lBQUEsSUFBQSxDQUFPLElBQUMsQ0FBQSxVQUFSO01BQ0MsSUFBQyxDQUFBLFVBQUQsR0FBa0IsSUFBQSxLQUFBLENBQU07UUFBQSxJQUFBLEVBQU0sQ0FBTjtRQUFTLE9BQUEsRUFBUyxLQUFsQjtPQUFOO01BQ2xCLElBQUMsQ0FBQSxNQUFELEdBQVUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkI7TUFDVixJQUFDLENBQUEsTUFBTSxDQUFDLFlBQVIsQ0FBcUIsb0JBQXJCLEVBQTJDLE1BQTNDO01BQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxZQUFSLENBQXFCLFNBQXJCLEVBQWdDLE1BQWhDOztZQUNPLENBQUMsU0FBVTs7TUFDbEIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBckIsQ0FBaUMsSUFBQyxDQUFBLE1BQWxDLEVBTkQ7O0lBUUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxHQUFSLEdBQWMsUUFBQSxHQUFTLElBQVQsR0FBYztXQUM1QixJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBQTtFQVZVOzttQkFhWCxjQUFBLEdBQWdCLFNBQUMsRUFBRDtXQUFRLElBQUMsQ0FBQSxZQUFZLENBQUMsRUFBZCxDQUFpQixNQUFNLENBQUMsWUFBeEIsRUFBc0MsRUFBdEM7RUFBUjs7bUJBQ2hCLE1BQUEsR0FBUSxTQUFDLEVBQUQ7V0FBUSxJQUFDLENBQUEsSUFBSSxDQUFDLEVBQU4sQ0FBUyxNQUFNLENBQUMsSUFBaEIsRUFBc0IsRUFBdEI7RUFBUjs7OztHQXpJb0IsTUFBTSxDQUFDOzs7O0FETnBDO0FBQUEsSUFBQSxzQkFBQTtFQUFBOzs7QUFNTSxPQUFPLENBQUM7QUFHYixNQUFBOzs7O0VBQUEsUUFBQSxHQUFXO0lBQ1Y7TUFBRSxJQUFBLEVBQU0sS0FBUjtNQUFlLElBQUEsRUFBTSx3QkFBckI7TUFBK0MsS0FBQSxFQUFPLHFCQUF0RDtLQURVLEVBRVY7TUFBRSxJQUFBLEVBQU0sS0FBUjtNQUFlLElBQUEsRUFBTSx3QkFBckI7TUFBK0MsS0FBQSxFQUFPLHFCQUF0RDtLQUZVLEVBR1Y7TUFBRSxJQUFBLEVBQU0sS0FBUjtNQUFlLElBQUEsRUFBTSx5QkFBckI7TUFBZ0QsS0FBQSxFQUFPLHNCQUF2RDtLQUhVLEVBSVY7TUFBRSxJQUFBLEVBQU0sSUFBUjtNQUFjLElBQUEsRUFBTSxvQkFBcEI7TUFBMEMsS0FBQSxFQUFPLGlCQUFqRDtLQUpVLEVBS1Y7TUFBRSxJQUFBLEVBQU0sSUFBUjtNQUFjLElBQUEsRUFBTSx1QkFBcEI7TUFBNkMsS0FBQSxFQUFPLG9CQUFwRDtLQUxVLEVBTVY7TUFBRSxJQUFBLEVBQU0sSUFBUjtNQUFjLElBQUEsRUFBTSx1QkFBcEI7TUFBNkMsS0FBQSxFQUFPLG9CQUFwRDtLQU5VLEVBT1Y7TUFBRSxJQUFBLEVBQU0sSUFBUjtNQUFjLElBQUEsRUFBTSxxQkFBcEI7TUFBMkMsS0FBQSxFQUFPLGtCQUFsRDtLQVBVOzs7RUFXRSxlQUFDLE9BQUQ7QUFDWixRQUFBOztNQURhLFVBQVU7O0lBQ3ZCLE9BQU8sQ0FBQyxJQUFSLEdBQWU7SUFDZixPQUFPLENBQUMsZUFBUixHQUEwQjtJQUMxQixPQUFPLENBQUMsT0FBUixHQUFrQjtJQUNsQix1Q0FBTSxPQUFOO0lBR0EsSUFBSSxDQUFDLElBQUwsQ0FBVSxJQUFWO0lBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUyxTQUFBO2FBQUcsT0FBTyxDQUFDLEdBQVIsQ0FBWSxPQUFaO0lBQUgsQ0FBVDtJQUNBLElBQUMsQ0FBQSxVQUFELENBQUE7SUFHQSxJQUFDLENBQUEsSUFBRCxHQUFZLElBQUEsYUFBQSxDQUNYO01BQUEsSUFBQSxFQUFNLE1BQU47TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBRFI7TUFDZSxNQUFBLEVBQVEsSUFBQyxDQUFBLE1BRHhCO01BRUEsY0FBQSxFQUFnQixLQUZoQjtNQUdBLElBQUEsRUFBTSxLQUhOO01BSUEsTUFBQSxFQUFRLElBSlI7S0FEVztJQVFaLElBQUMsQ0FBQSxJQUFJLENBQUMsU0FBTixHQUFzQixJQUFBLFNBQUEsQ0FBVTtNQUFBLElBQUEsRUFBTSxJQUFDLENBQUEsSUFBUDtLQUFWO0FBR3RCLFNBQUEsMENBQUE7O01BQ0MsSUFBQSxHQUFXLElBQUEsSUFBQSxDQUFLO1FBQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFSO1FBQWUsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUF4QjtRQUFnQyxJQUFBLEVBQU0sT0FBdEM7T0FBTDtNQUNYLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixDQUFjLElBQWQ7TUFDQSxJQUFJLENBQUMsT0FBTCxDQUFhLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtpQkFBRyxLQUFDLENBQUEsUUFBRCxDQUFBO1FBQUg7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWI7QUFIRDtJQU1BLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBTixHQUFrQixJQUFBLEtBQUEsQ0FBTTtNQUFBLElBQUEsRUFBTSxJQUFDLENBQUEsSUFBUDtLQUFOO0lBR2xCLElBQUMsQ0FBQSxJQUFJLENBQUMsVUFBTixDQUFpQixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFTLENBQUEsQ0FBQSxDQUF4QyxFQUE0QyxLQUE1QztFQWhDWTs7a0JBbUNiLElBQUEsR0FBTSxTQUFBO0FBQ0wsUUFBQTtJQUFBLElBQUMsQ0FBQSxXQUFELENBQUE7SUFDQSxJQUFDLENBQUEsWUFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixDQUFjO01BQUEsQ0FBQSxFQUFHLENBQUg7TUFBTSxLQUFBLEVBQU8sR0FBQSxHQUFNLElBQUMsQ0FBQSxNQUFwQjtLQUFkO0FBRUE7QUFBQTtTQUFBLDZDQUFBOzttQkFBQSxJQUFJLENBQUMsSUFBTCxDQUFBO0FBQUE7O0VBTks7O2tCQVNOLE9BQUEsR0FBUyxTQUFDLFVBQUQ7O01BQUMsYUFBYTs7SUFDdEIsSUFBVSxJQUFDLENBQUEsV0FBWDtBQUFBLGFBQUE7O0lBR0EsSUFBRyxVQUFIO2FBQW1CLElBQUMsQ0FBQSxLQUFELENBQUEsRUFBbkI7S0FBQSxNQUFBO01BR0MsSUFBRyxJQUFDLENBQUEsVUFBSjtRQUVDLElBQUcsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFOLEtBQWUsQ0FBbEI7aUJBQXlCLElBQUMsQ0FBQSxJQUFELENBQUEsRUFBekI7U0FBQSxNQUFBO2lCQUVLLElBQUMsQ0FBQSxRQUFELENBQUEsRUFGTDtTQUZEO09BQUEsTUFBQTtRQU9DLElBQUcsSUFBQyxDQUFBLFVBQUo7VUFFQyxJQUFHLElBQUMsQ0FBQSxJQUFJLENBQUMsV0FBTixLQUFxQixJQUFDLENBQUEsVUFBekI7bUJBQXlDLElBQUMsQ0FBQSxRQUFELENBQUEsRUFBekM7V0FBQSxNQUFBO1lBRUMsSUFBQyxDQUFBLElBQUksQ0FBQyxVQUFOLENBQWlCLElBQUMsQ0FBQSxVQUFsQixFQUE4QixJQUE5QixFQUFvQztjQUFBLElBQUEsRUFBTSxHQUFOO2FBQXBDO21CQUNBLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQWQsQ0FBbUIsTUFBTSxDQUFDLFlBQTFCLEVBQXdDLENBQUEsU0FBQSxLQUFBO3FCQUFBLFNBQUE7dUJBQUcsS0FBQyxDQUFBLFFBQUQsQ0FBQTtjQUFIO1lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF4QyxFQUhEO1dBRkQ7U0FBQSxNQUFBO2lCQU1LLElBQUMsQ0FBQSxLQUFELENBQUEsRUFOTDtTQVBEO09BSEQ7O0VBSlE7O2tCQXVCVCxLQUFBLEdBQU8sU0FBQTtBQUNOLFFBQUE7SUFBQSxJQUFDLENBQUEsT0FBRCxDQUFTO01BQUEsT0FBQSxFQUFTLENBQVQ7S0FBVDtJQUNBLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixDQUFjO01BQUEsQ0FBQSxFQUFHLENBQUg7TUFBTSxLQUFBLEVBQU8sQ0FBYjtLQUFkO0FBRUE7QUFBQSxTQUFBLDZDQUFBOztNQUFBLElBQUksRUFBQyxPQUFELEVBQUosQ0FBQTtBQUFBO0lBRUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsWUFBYixFQUEyQixTQUFBO01BQzFCLElBQWlCLElBQUMsQ0FBQSxPQUFELEtBQVksQ0FBN0I7ZUFBQSxJQUFDLENBQUEsVUFBRCxDQUFBLEVBQUE7O0lBRDBCLENBQTNCO1dBR0EsSUFBQyxDQUFBLFVBQUQsR0FBYztFQVRSOztrQkFZUCxRQUFBLEdBQVUsU0FBQTtJQUNULElBQVUsSUFBQyxDQUFBLElBQUksQ0FBQyxXQUFoQjtBQUFBLGFBQUE7O0lBRUEsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLENBQWM7TUFBQSxDQUFBLEVBQUcsQ0FBSDtNQUFNLEtBQUEsRUFBTyxDQUFiO0tBQWQ7SUFDQSxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUMsQ0FBQSxJQUFJLENBQUM7SUFDcEIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxRQUFaLENBQUE7SUFHQSxJQUFHLElBQUMsQ0FBQSxVQUFELElBQWdCLElBQUMsQ0FBQSxVQUFELEtBQWUsSUFBQyxDQUFBLFVBQW5DO2FBQ0MsSUFBQyxDQUFBLElBQUksQ0FBQyxJQUFOLENBQVcsTUFBTSxDQUFDLFlBQWxCLEVBQWdDLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUMvQixLQUFDLENBQUEsVUFBRCxDQUFBO1VBQ0EsS0FBQyxDQUFBLFVBQUQsQ0FBWSxLQUFDLENBQUEsVUFBYjtpQkFDQSxLQUFDLENBQUEsVUFBRCxHQUFjO1FBSGlCO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQyxFQUREOztFQVJTOztrQkFlVixhQUFBLEdBQWUsU0FBQyxPQUFEO0lBQ2QsSUFBRyxJQUFDLENBQUEsVUFBSjtNQUFvQixJQUFDLENBQUEsVUFBVSxDQUFDLFVBQVosQ0FBdUIsT0FBTyxDQUFDLEdBQS9CLEVBQXBCO0tBQUEsTUFBQTtNQUVDLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsSUFBQSxDQUFLO1FBQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFSO1FBQWUsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUF4QjtRQUFnQyxJQUFBLEVBQU0sT0FBdEM7T0FBTDtNQUNsQixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBYyxJQUFDLENBQUEsVUFBZjtNQUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixDQUFvQixDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUMsS0FBRDtpQkFBVyxLQUFDLENBQUEsUUFBRCxDQUFBO1FBQVg7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXBCLEVBSkQ7O0lBTUEsSUFBQyxDQUFBLElBQUksQ0FBQyxVQUFOLENBQWlCLElBQUMsQ0FBQSxVQUFsQixFQUE4QixLQUE5QjtXQUNBLElBQUMsQ0FBQSxJQUFELENBQUE7RUFSYzs7a0JBV2YsVUFBQSxHQUFZLFNBQUMsS0FBRDtJQUNYLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQWQsQ0FBMEIsS0FBMUI7SUFDQSxJQUFDLENBQUEsSUFBSSxDQUFDLGFBQU4sQ0FBQTtJQUdBLElBQUMsQ0FBQSxJQUFJLENBQUMsVUFBTixDQUFpQixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFTLENBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFyQixDQUFBLEdBQWlDLENBQWpDLENBQXhDLEVBQTZFLEtBQTdFO0lBR0EsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBWixDQUFBO1dBRUEsSUFBQyxDQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBaEIsQ0FBQTtFQVZXOzs7O0dBdkhlOztBQXFJdEI7OztFQUVRLGVBQUMsT0FBRDs7TUFBQyxVQUFVOzs7TUFDdkIsT0FBTyxDQUFDLE9BQVE7OztNQUNoQixPQUFPLENBQUMsT0FBUTs7SUFDaEIsT0FBTyxDQUFDLEtBQVIsR0FDQztNQUFBLFFBQUEsRUFBVSxNQUFWO01BQWtCLFVBQUEsRUFBWSxLQUE5QjtNQUNBLFVBQUEsRUFBWSxHQURaO01BRUEsV0FBQSxFQUFhLE1BRmI7OztNQUdELE9BQU8sQ0FBQyxrQkFBbUI7O0lBQzNCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLE9BQU8sQ0FBQztJQUN6Qix1Q0FBTSxPQUFOO0lBRUEsSUFBQyxDQUFBLElBQUQsR0FBUSxPQUFPLENBQUM7SUFFaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFWLENBQW1CLElBQW5CO0lBQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBVDtNQUFpQixJQUFBLEVBQU0sQ0FBQyxHQUF4Qjs7SUFHVCxJQUFDLENBQUEsSUFBRCxHQUFZLElBQUEsS0FBQSxDQUNYO01BQUEsSUFBQSxFQUFNLE9BQU47TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRFQ7TUFFQSxJQUFBLEVBQU0sSUFGTjtNQUdBLFlBQUEsRUFBYyxFQUhkO01BSUEsTUFBQSxFQUFRLElBSlI7S0FEVztJQVFaLElBQUMsQ0FBQSxJQUFJLENBQUMsRUFBTixDQUFTLG9CQUFULEVBQStCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUFHLEtBQUMsQ0FBQSxhQUFELENBQUE7TUFBSDtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0I7SUFHQSxJQUFDLENBQUEsYUFBRCxDQUFBO0VBNUJZOztrQkErQmIsYUFBQSxHQUFlLFNBQUE7QUFDZCxRQUFBO0lBQUEsV0FBQSxHQUFjLElBQUMsQ0FBQSxJQUFJLENBQUM7SUFFcEIsSUFBQyxDQUFBLElBQUQsR0FBUSxXQUFXLENBQUM7SUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFWLENBQW1CLElBQW5CO0lBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBQTtXQUNBLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBTixHQUFjLFdBQVcsQ0FBQztFQU5aOzs7O0dBakNJOztBQTBDZDtBQUVMLE1BQUE7Ozs7RUFBYSxtQkFBQyxPQUFEOztNQUFDLFVBQVU7O0lBQ3ZCLE9BQU8sQ0FBQyxJQUFSLEdBQWU7SUFDZixPQUFPLENBQUMsZUFBUixHQUEwQjtJQUMxQixPQUFPLENBQUMsTUFBUixHQUFpQixPQUFPLENBQUM7O01BQ3pCLE9BQU8sQ0FBQyxJQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBYixHQUFvQjs7SUFDakMsMkNBQU0sT0FBTjtJQUVBLElBQUMsQ0FBQSxJQUFELEdBQVEsT0FBTyxDQUFDO0lBRWhCLElBQUMsQ0FBQSxJQUFJLENBQUMsRUFBTixDQUFTLG9CQUFULEVBQStCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUFHLEtBQUMsQ0FBQSxjQUFELENBQUE7TUFBSDtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0I7SUFDQSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFkLENBQWlCLGlCQUFqQixFQUFvQyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFBRyxLQUFDLENBQUEsYUFBRCxDQUFBO01BQUg7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXBDO0VBVlk7O3NCQWFiLGFBQUEsR0FBZSxTQUFBO0FBQ2QsUUFBQTtBQUFBO0FBQUEsU0FBQSxxQ0FBQTs7TUFBQSxLQUFLLENBQUMsT0FBTixDQUFBO0FBQUE7QUFDQTtBQUFBLFNBQUEsZ0RBQUE7O01BQ0MsR0FBQSxHQUFNLFNBQUEsQ0FBQTtNQUNOLElBQTBDLENBQUEsS0FBSyxDQUEvQztRQUFBLEdBQUcsQ0FBQyxDQUFKLElBQVMsSUFBQyxDQUFBLFlBQUQsQ0FBQSxDQUFlLENBQUMsS0FBaEIsR0FBd0IsRUFBakM7O01BQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWO0FBSEQ7SUFLQSxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxZQUFELENBQUE7SUFDUixJQUFDLENBQUEsS0FBRCxHQUFTO01BQUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFOLENBQUEsQ0FBSDs7V0FFVCxJQUFDLENBQUEsY0FBRCxDQUFnQixLQUFoQjtFQVZjOztzQkFhZixjQUFBLEdBQWdCLFNBQUMsT0FBRDtBQUNmLFFBQUE7O01BRGdCLFVBQVE7O0lBQ3hCLFdBQUEsR0FBYyxJQUFDLENBQUEsSUFBSSxDQUFDO0lBQ3BCLFNBQUEsR0FBWSxJQUFDLENBQUEsSUFBSSxDQUFDLG1CQUFOLENBQTBCLFdBQTFCO0lBRVosSUFBRyxPQUFIO0FBQ0M7QUFBQTtXQUFBLDZDQUFBOztxQkFDQyxHQUFHLENBQUMsT0FBSixDQUFlLENBQUEsS0FBSyxTQUFSLEdBQXVCLFVBQXZCLEdBQXVDLFFBQW5EO0FBREQ7cUJBREQ7S0FBQSxNQUFBO0FBSUM7QUFBQTtXQUFBLGdEQUFBOztzQkFDQyxHQUFHLENBQUMsV0FBSixDQUFtQixDQUFBLEtBQUssU0FBUixHQUF1QixVQUF2QixHQUF1QyxRQUF2RDtBQUREO3NCQUpEOztFQUplOztFQVloQixTQUFBLEdBQVksU0FBQyxPQUFEO0FBQ1gsUUFBQTs7TUFEWSxVQUFROztJQUNwQixHQUFBLEdBQVUsSUFBQSxLQUFBLENBQ1Q7TUFBQSxJQUFBLEVBQU0sZ0JBQU47TUFDQSxJQUFBLEVBQU0sTUFETjtNQUVBLGVBQUEsRUFBaUIsT0FGakI7TUFHQSxPQUFBLEVBQVMsR0FIVDtNQUlBLFlBQUEsRUFBYyxFQUpkO0tBRFM7SUFPVixHQUFHLENBQUMsTUFBSixHQUNDO01BQUEsUUFBQSxFQUFVO1FBQUEsS0FBQSxFQUFPLEdBQVA7UUFBWSxPQUFBLEVBQVMsQ0FBckI7UUFBd0IsT0FBQSxFQUFTO1VBQUUsSUFBQSxFQUFNLEdBQVI7U0FBakM7T0FBVjtNQUNBLE1BQUEsRUFBUTtRQUFBLEtBQUEsRUFBTyxDQUFQO1FBQVUsT0FBQSxFQUFTLEdBQW5CO1FBQXdCLE9BQUEsRUFBUztVQUFFLElBQUEsRUFBTSxFQUFSO1NBQWpDO09BRFI7O0FBR0QsV0FBTztFQVpJOzs7O0dBeENXOztBQXVEbEI7OztFQUVRLGNBQUMsT0FBRDs7TUFBQyxVQUFVOztJQUN2QixPQUFPLENBQUMsZUFBUixHQUEwQjtJQUMxQixzQ0FBTSxPQUFOO0lBR0EsSUFBQyxDQUFBLElBQUQsR0FBUSxPQUFPLENBQUM7SUFDaEIsSUFBQyxDQUFBLElBQUQsR0FBUSxJQUFDLENBQUEsSUFBSSxDQUFDO0lBQ2QsSUFBQyxDQUFBLElBQUQsR0FBUSxJQUFDLENBQUEsSUFBSSxDQUFDO0lBR2QsSUFBQyxDQUFBLE9BQUQsR0FBZSxJQUFBLEtBQUEsQ0FDZDtNQUFBLElBQUEsRUFBTSxVQUFOO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQURSO01BQ2UsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUR4QjtNQUVBLGVBQUEsRUFBaUIsRUFGakI7TUFHQSxJQUFBLEVBQU0sSUFITjtNQUlBLE1BQUEsRUFBUSxJQUpSO0tBRGM7SUFPZixJQUFHLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBVDtNQUNDLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxHQUFpQixJQUFDLENBQUEsSUFBSSxDQUFDO01BQ3ZCLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFvQixJQUFBLEtBQUEsQ0FDbkI7UUFBQSxJQUFBLEVBQU0sZUFBTjtRQUNBLENBQUEsRUFBRyxDQURIO1FBRUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUZSO1FBRWUsTUFBQSxFQUFRLEVBRnZCO1FBR0EsSUFBQSxFQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBVixDQUF3QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBQSxDQUF4QixDQUhOO1FBSUEsS0FBQSxFQUNDO1VBQUEsUUFBQSxFQUFVLE1BQVY7VUFBa0IsVUFBQSxFQUFZLEtBQTlCO1VBQ0EsVUFBQSxFQUFZLE1BRFo7VUFFQSxTQUFBLEVBQVcsT0FGWDtTQUxEO1FBUUEsT0FBQSxFQUFTLENBUlQ7UUFTQSxlQUFBLEVBQWlCLEVBVGpCO1FBVUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxPQVZUO09BRG1CLEVBRnJCOztJQWVBLElBQUcsSUFBQyxDQUFBLElBQUksQ0FBQyxHQUFUO01BQ0MsSUFBQyxDQUFBLFVBQUQsQ0FBWSxJQUFDLENBQUEsSUFBSSxDQUFDLEdBQWxCLEVBREQ7O0VBaENZOztpQkFvQ2IsVUFBQSxHQUFZLFNBQUMsS0FBRDtBQUNYLFFBQUE7SUFBQSxJQUFDLENBQUEsT0FBTyxDQUFDLFFBQVQsQ0FBa0IsS0FBbEI7QUFDQTtBQUFBO1NBQUEscUNBQUE7O21CQUFBLEtBQUssQ0FBQyxZQUFOLEdBQXFCO0FBQXJCOztFQUZXOztpQkFJWixhQUFBLEdBQWUsU0FBQyxLQUFEO0FBQ2QsUUFBQTtJQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsV0FBVCxDQUFxQixLQUFyQjtBQUNBO0FBQUE7U0FBQSxxQ0FBQTs7bUJBQUEsS0FBSyxDQUFDLFlBQU4sR0FBcUI7QUFBckI7O0VBRmM7O2lCQUtmLElBQUEsR0FBTSxTQUFBO0lBQ0wsSUFBQyxDQUFBLE9BQUQsQ0FBUztNQUFBLEtBQUEsRUFBTyxHQUFBLEdBQU0sR0FBYjtNQUFrQixZQUFBLEVBQWMsRUFBaEM7TUFBb0MsT0FBQSxFQUFTO1FBQUUsSUFBQSxFQUFNLEdBQVI7T0FBN0M7S0FBVDtJQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBVCxDQUFpQjtNQUFBLEtBQUEsRUFBTyxHQUFBLEdBQU0sR0FBYjtNQUFrQixPQUFBLEVBQVM7UUFBRSxJQUFBLEVBQU0sR0FBUjtPQUEzQjtLQUFqQjtJQUVBLElBQUcsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFUO01BQ0MsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBZCxDQUFzQjtRQUFBLE9BQUEsRUFBUyxDQUFUO1FBQVksT0FBQSxFQUFTO1VBQUUsSUFBQSxFQUFNLEdBQVI7VUFBYSxLQUFBLEVBQU8sRUFBcEI7U0FBckI7T0FBdEIsRUFERDs7SUFHQSxJQUFzQixJQUFDLENBQUEsSUFBSSxDQUFDLEdBQTVCO2FBQUEsSUFBQyxDQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBVixDQUFBLEVBQUE7O0VBUEs7O2tCQVVOLFNBQUEsR0FBUyxTQUFBO0lBQ1IsSUFBQyxDQUFBLE9BQUQsQ0FBUztNQUFBLEtBQUEsRUFBTyxDQUFQO01BQVUsWUFBQSxFQUFjLENBQXhCO01BQTJCLE9BQUEsRUFBUztRQUFFLElBQUEsRUFBTSxHQUFSO09BQXBDO0tBQVQ7V0FDQSxJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsQ0FBaUI7TUFBQSxLQUFBLEVBQU8sQ0FBUDtNQUFVLE9BQUEsRUFBUztRQUFFLElBQUEsRUFBTSxHQUFSO09BQW5CO0tBQWpCO0VBRlE7O2lCQUtULFFBQUEsR0FBVSxTQUFBO0lBQ1QsSUFBQyxFQUFBLE9BQUEsRUFBRCxDQUFBO0lBRUEsSUFBRyxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQVQ7TUFDQyxJQUFDLENBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFkLEdBQXFCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBVixDQUF3QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBQSxDQUF4QjtNQUNyQixJQUFDLENBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFkLENBQXNCO1FBQUEsT0FBQSxFQUFTLENBQVQ7UUFBWSxPQUFBLEVBQVM7VUFBRSxJQUFBLEVBQU0sR0FBUjtVQUFhLEtBQUEsRUFBTyxFQUFwQjtTQUFyQjtPQUF0QixFQUZEOztJQUlBLElBQUcsSUFBQyxDQUFBLElBQUksQ0FBQyxHQUFUO2FBQ0MsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsTUFBTSxDQUFDLFlBQXJCLEVBQW1DLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNsQyxLQUFDLENBQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFWLENBQUE7VUFDQSxLQUFDLENBQUEsYUFBRCxDQUFlLEtBQUMsQ0FBQSxJQUFJLENBQUMsR0FBckI7aUJBQ0EsS0FBQyxDQUFBLE9BQUQsQ0FBQTtRQUhrQztNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkMsRUFERDs7RUFQUzs7OztHQTlEUTs7OztBRDVPbkI7QUFBQSxJQUFBOzs7QUFNTSxPQUFPLENBQUM7QUFHYixNQUFBOzs7O0VBQUEsTUFBQSxHQUFTOztFQUdULE1BQU0sQ0FBQyxLQUFQLEdBQWU7O0VBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFiLEdBQXVCOztFQUN2QixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQWIsR0FBMkI7O0VBRzNCLFlBQUksQ0FBQyxNQUFMLEdBQWM7O0VBRWQ7O0VBa0JhLHNCQUFDLE9BQUQ7QUFDWixRQUFBOztNQURhLFVBQVU7O0lBQ3ZCLE9BQU8sQ0FBQyxJQUFSLEdBQWU7O01BQ2YsT0FBTyxDQUFDLFFBQVMsTUFBTSxDQUFDOzs7TUFDeEIsT0FBTyxDQUFDLFNBQVUsTUFBTSxDQUFDOzs7TUFDekIsT0FBTyxDQUFDLGtCQUFtQjs7SUFDM0IsOENBQU0sT0FBTjs7TUFFQSxPQUFPLENBQUMsVUFBVzs7O01BQ25CLE9BQU8sQ0FBQyxVQUFXOzs7TUFDbkIsT0FBTyxDQUFDLE9BQVE7OztNQUNoQixPQUFPLENBQUMsY0FBZTs7O01BQ3ZCLE9BQU8sQ0FBQyxRQUFTOzs7TUFDakIsT0FBTyxDQUFDLFVBQVc7OztNQUNuQixPQUFPLENBQUMsWUFBYTs7O01BQ3JCLE9BQU8sQ0FBQyxVQUFXOzs7TUFDbkIsT0FBTyxDQUFDLGlCQUFrQjs7SUFFMUIsS0FBQSxHQUFRLE9BQU8sQ0FBQztJQUNoQixPQUFBLEdBQVUsT0FBTyxDQUFDO0lBQ2xCLE9BQUEsR0FBVSxPQUFPLENBQUM7SUFDbEIsT0FBQSxHQUFVLE9BQU8sQ0FBQztJQUNsQixJQUFBLEdBQU8sT0FBTyxDQUFDO0lBQ2YsV0FBQSxHQUFjLE9BQU8sQ0FBQztJQUN0QixTQUFBLEdBQVksT0FBTyxDQUFDO0lBQ3BCLE9BQUEsR0FBVSxPQUFPLENBQUM7SUFHbEIsSUFBQyxDQUFBLEVBQUQsR0FBVSxJQUFBLEtBQUEsQ0FDVDtNQUFBLElBQUEsRUFBTSxLQUFOO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQURSO01BQ2UsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUR4QjtNQUVBLGVBQUEsRUFBaUIsZ0JBRmpCO01BR0EsT0FBQSxFQUFTLENBSFQ7TUFJQSxNQUFBLEVBQVEsSUFKUjtLQURTO0lBTVYsSUFBSSxDQUFDLElBQUwsQ0FBVSxJQUFDLENBQUEsRUFBWDtJQUdBLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxLQUFBLENBQ1o7TUFBQSxJQUFBLEVBQU0sUUFBTjtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FEUjtNQUNlLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFEeEI7TUFFQSxlQUFBLEVBQWlCLEVBRmpCO01BR0EsTUFBQSxFQUFRLElBSFI7S0FEWTtJQU9iLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxHQUFrQixJQUFBLEtBQUEsQ0FDakI7TUFBQSxJQUFBLEVBQU0sYUFBTjtNQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFEVDtNQUNpQixDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxFQUFWLENBRHBCO01BRUEsSUFBQSxFQUFNLEdBRk47TUFHQSxLQUFBLEVBQU8sSUFIUDtNQUlBLFlBQUEsRUFBYyxFQUpkO01BS0EsT0FBQSxFQUFTLENBTFQ7TUFLWSxVQUFBLEVBQVksQ0FMeEI7TUFLMkIsV0FBQSxFQUFhLGdCQUx4QztNQU1BLGVBQUEsRUFBaUIsT0FOakI7TUFPQSxNQUFBLEVBQVEsSUFBQyxDQUFBLEtBUFQ7S0FEaUI7SUFXbEIsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFQLEdBQW1CLElBQUEsS0FBQSxDQUNsQjtNQUFBLElBQUEsRUFBTSxjQUFOO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQURUO01BQ2lCLENBQUEsRUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFaLEdBQW1CLEVBRHZDO01BRUEsSUFBQSxFQUFNLEtBRk47TUFHQSxLQUFBLEVBQ0M7UUFBQSxRQUFBLEVBQVUsTUFBVjtRQUFrQixVQUFBLEVBQVksR0FBOUI7UUFBbUMsVUFBQSxFQUFZLENBQS9DO1FBQ0EsYUFBQSxFQUFlLFNBRGY7UUFFQSxTQUFBLEVBQVcsUUFGWDtPQUpEO01BT0EsZUFBQSxFQUFpQixFQVBqQjtNQVFBLE1BQUEsRUFBUSxJQUFDLENBQUEsS0FSVDtLQURrQjtJQVVuQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVYsQ0FBbUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUExQjtJQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQWIsQ0FBQTtJQUdBLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxHQUFxQixJQUFBLEtBQUEsQ0FDcEI7TUFBQSxJQUFBLEVBQU0sZ0JBQU47TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRFQ7TUFDaUIsQ0FBQSxFQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQWIsR0FBb0IsQ0FEeEM7TUFFQSxJQUFBLEVBQU0sT0FGTjtNQUdBLEtBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxNQUFWO1FBQWtCLFVBQUEsRUFBWSxHQUE5QjtRQUFtQyxVQUFBLEVBQVksQ0FBL0M7UUFDQSxhQUFBLEVBQWUsUUFEZjtRQUVBLFNBQUEsRUFBVyxRQUZYO1FBR0EsYUFBQSxFQUFlLFdBSGY7T0FKRDtNQVFBLEtBQUEsRUFBTyxXQVJQO01BU0EsZUFBQSxFQUFpQixFQVRqQjtNQVVBLE1BQUEsRUFBUSxJQUFDLENBQUEsS0FWVDtLQURvQjtJQVlyQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVYsQ0FBbUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUExQjtJQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQWYsQ0FBQTtJQUdBLElBQUMsQ0FBQSxJQUFELEdBQVksSUFBQSxNQUFBLENBQ1g7TUFBQSxJQUFBLEVBQU0sT0FBTjtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FEUjtNQUNlLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFEeEI7TUFFQSxlQUFBLEVBQWlCLEVBRmpCO01BR0EsWUFBQSxFQUNDO1FBQUEsR0FBQSxFQUFLLEVBQUw7UUFBUyxNQUFBLEVBQVEsRUFBakI7T0FKRDtNQUtBLE1BQUEsRUFBUSxJQUxSO0tBRFc7SUFRWixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sR0FBb0IsSUFBQSxLQUFBLENBQ25CO01BQUEsSUFBQSxFQUFNLElBQU47TUFDQSxLQUFBLEVBQ0M7UUFBQSxVQUFBLEVBQVksS0FBWjtRQUNBLFFBQUEsRUFBVSxNQURWO1FBRUEsYUFBQSxFQUFlLE1BRmY7UUFHQSxTQUFBLEVBQVcsUUFIWDtPQUZEO01BTUEsZUFBQSxFQUFpQixFQU5qQjtNQU9BLEtBQUEsRUFBTyxTQVBQO01BUUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxJQVJUO0tBRG1CO0lBVXBCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBVixDQUFtQixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQXpCO0lBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBZCxHQUFzQjtNQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBVDtNQUFpQixDQUFBLEVBQUcsQ0FBQyxDQUFDLElBQUMsQ0FBQSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQW5CLEdBQXlCLEVBQTFCLENBQXJCOztJQUV0QixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFkLEdBQXdCLElBQUEsS0FBQSxDQUN2QjtNQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBVDtNQUFpQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQTFCO01BQ0EsS0FBQSxFQUFPLEVBRFA7TUFDVyxNQUFBLEVBQVEsQ0FEbkI7TUFFQSxlQUFBLEVBQWlCLEVBRmpCO01BR0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FIZDtLQUR1QjtJQUt4QixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBbEIsR0FBNkIsSUFBQSxLQUFBLENBQzVCO01BQUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFUO01BQWUsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUF4QjtNQUNBLEtBQUEsRUFBTyxFQURQO01BQ1csTUFBQSxFQUFRLENBRG5CO01BRUEsT0FBQSxFQUFTLENBRlQ7TUFFWSxPQUFBLEVBQVMsQ0FGckI7TUFHQSxZQUFBLEVBQWMsQ0FIZDtNQUlBLGVBQUEsRUFBaUIsU0FKakI7TUFLQSxNQUFBLEVBQVEsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsR0FMdEI7S0FENEI7SUFPN0IsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQWxCLEdBQThCLElBQUEsS0FBQSxDQUM3QjtNQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBVDtNQUFnQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQXpCO01BQ0EsS0FBQSxFQUFPLEVBRFA7TUFDVyxNQUFBLEVBQVEsQ0FEbkI7TUFFQSxPQUFBLEVBQVMsQ0FGVDtNQUVZLE9BQUEsRUFBUyxDQUZyQjtNQUdBLFlBQUEsRUFBYyxDQUhkO01BSUEsZUFBQSxFQUFpQixTQUpqQjtNQUtBLE1BQUEsRUFBUSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUx0QjtLQUQ2QjtJQVE5QixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFkLEdBQTJCLFNBQUMsSUFBRDtBQUMxQixVQUFBOztRQUQyQixPQUFLOztNQUNoQyxJQUFDLENBQUEsWUFBRCxHQUFnQjtNQUNoQixLQUFBLEdBQVcsSUFBSCxHQUFhLE9BQWIsR0FBMEI7TUFDbEMsUUFBQSxHQUFjLElBQUgsR0FBYSxFQUFiLEdBQXFCO01BQ2hDLE9BQUEsR0FBVTtRQUFBLElBQUEsRUFBTSxHQUFOO1FBQVcsS0FBQSxFQUFPLGtCQUFsQjs7TUFDVixJQUFDLENBQUEsT0FBRCxDQUFTO1FBQUEsS0FBQSxFQUFPLEtBQVA7UUFBYyxPQUFBLEVBQVMsT0FBdkI7T0FBVDtNQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0I7UUFBQSxRQUFBLEVBQVUsUUFBVjtRQUFvQixlQUFBLEVBQWlCLEtBQXJDO1FBQTRDLE9BQUEsRUFBUyxPQUFyRDtPQUFsQjthQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUI7UUFBQSxRQUFBLEVBQVUsQ0FBQyxRQUFYO1FBQW9CLGVBQUEsRUFBaUIsS0FBckM7UUFBNEMsT0FBQSxFQUFTLE9BQXJEO09BQW5CO0lBUDBCO0lBVTNCLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixHQUFpQixJQUFBLEtBQUEsQ0FDaEI7TUFBQSxJQUFBLEVBQU0sWUFBTjtNQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBTixDQUFZLENBQUMsQ0FBYixDQURIO01BQ29CLENBQUEsRUFBRyxLQUFLLENBQUMsR0FBTixDQUFVLENBQVYsQ0FEdkI7TUFFQSxLQUFBLEVBQU8sR0FGUDtNQUVZLE1BQUEsRUFBUSxFQUZwQjtNQUdBLElBQUEsRUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQVYsQ0FBd0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQUEsQ0FBeEIsQ0FITjtNQUlBLEtBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxNQUFWO1FBQWtCLFVBQUEsRUFBWSxHQUE5QjtRQUFtQyxVQUFBLEVBQVksTUFBL0M7UUFDQSxTQUFBLEVBQVcsT0FEWDtPQUxEO01BT0EsS0FBQSxFQUFPLFNBUFA7TUFRQSxlQUFBLEVBQWlCLEVBUmpCO01BU0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxJQVRUO0tBRGdCO0lBYWpCLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixHQUFnQixhQUFBLENBQWMsT0FBZDtJQUNoQixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFkLEdBQXVCLElBQUMsQ0FBQSxJQUFJLENBQUM7SUFHN0IsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLEdBQWdCO0lBRWhCLElBQUcsT0FBSDtBQUNDLFdBQUEsaURBQUE7O1FBQ0MsU0FBQSxHQUFZLGtCQUFBLENBQW1CLE1BQW5CO1FBQ1osU0FBUyxDQUFDLENBQVYsSUFBZSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFkLENBQUEsQ0FBNEIsQ0FBQyxNQUE3QixHQUFzQztRQUNyRCxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFkLENBQXVCLFNBQXZCO1FBRUEsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBZCxDQUFtQixTQUFuQjtBQUxELE9BREQ7O0lBU0EsSUFBQyxDQUFBLElBQUksQ0FBQyxVQUFOLEdBQW1CLGtCQUFBLENBQW1CO01BQUEsS0FBQSxFQUFPLElBQVA7TUFBYSxPQUFBLEVBQVMsc0JBQXRCO0tBQW5CO0lBQ25CLElBQUMsQ0FBQSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQWpCLElBQXNCLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQWQsQ0FBQSxDQUE0QixDQUFDLE1BQTdCLEdBQXNDO0lBQzVELElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQWQsQ0FBdUIsSUFBQyxDQUFBLElBQUksQ0FBQyxVQUE3QjtJQUNBLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQWQsQ0FBbUIsSUFBQyxDQUFBLElBQUksQ0FBQyxVQUF6QjtJQUdBLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxHQUFpQjtJQUNqQixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sR0FBZ0I7SUFHaEIsSUFBQyxDQUFBLEVBQUUsQ0FBQyxJQUFKLEdBQVcsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQ1YsS0FBQyxDQUFBLEVBQUUsQ0FBQyxPQUFKLENBQ0M7VUFBQSxPQUFBLEVBQVMsQ0FBVDtVQUNBLE9BQUEsRUFDQztZQUFBLElBQUEsRUFBTSxFQUFOO1lBQ0EsS0FBQSxFQUFPLFFBRFA7V0FGRDtTQUREO01BRFU7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBO0lBT1gsSUFBQyxDQUFBLEVBQUUsQ0FBQyxPQUFKLEdBQWMsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQ2IsS0FBQyxDQUFBLEVBQUUsQ0FBQyxPQUFKLENBQ0M7VUFBQSxPQUFBLEVBQVMsQ0FBVDtVQUNBLE9BQUEsRUFDQztZQUFBLElBQUEsRUFBTSxDQUFOO1lBQ0EsS0FBQSxFQUFPLFFBRFA7WUFFQSxLQUFBLEVBQU8sRUFGUDtXQUZEO1NBREQ7TUFEYTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUE7SUFTZCxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsR0FBYyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDYixLQUFDLENBQUEsS0FBSyxDQUFDLENBQVAsR0FBVyxLQUFDLENBQUE7ZUFDWixLQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FDQztVQUFBLENBQUEsRUFBRyxDQUFIO1VBQ0EsT0FBQSxFQUNDO1lBQUEsSUFBQSxFQUFNLENBQU47WUFDQSxLQUFBLEVBQU8sa0JBRFA7V0FGRDtTQUREO01BRmE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBO0lBUWQsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLEdBQWlCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUNoQixLQUFDLENBQUEsS0FBSyxDQUFDLFdBQVAsQ0FBbUIsS0FBQyxDQUFBLEtBQUssQ0FBQyxJQUExQjtRQUNBLEtBQUMsQ0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQVosR0FBcUIsS0FBQyxDQUFBO1FBRXRCLEtBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUNDO1VBQUEsQ0FBQSxFQUFHLEtBQUMsQ0FBQSxLQUFLLENBQUMsQ0FBUCxHQUFXLEdBQWQ7VUFDQSxPQUFBLEVBQVMsQ0FEVDtVQUVBLE9BQUEsRUFDQztZQUFBLElBQUEsRUFBTSxHQUFOO1lBQ0EsS0FBQSxFQUFPLGtCQURQO1dBSEQ7U0FERDtRQU1BLEtBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFZLE1BQU0sQ0FBQyxZQUFuQixFQUFpQyxTQUFBO2lCQUFHLEtBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUFBO1FBQUgsQ0FBakM7UUFFQSxLQUFDLENBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFaLENBQ0M7VUFBQSxDQUFBLEVBQUcsQ0FBQyxFQUFKO1VBQVEsQ0FBQSxFQUFHLENBQUMsRUFBWjtVQUVBLE9BQUEsRUFDQztZQUFBLElBQUEsRUFBTSxFQUFOO1lBQ0EsS0FBQSxFQUFPLGtCQURQO1dBSEQ7U0FERDtlQU9BLEtBQUMsQ0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQVosQ0FDQztVQUFBLEtBQUEsRUFBTyxFQUFBLEdBQUcsS0FBQyxDQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBdEI7VUFFQSxPQUFBLEVBQ0M7WUFBQSxJQUFBLEVBQU0sR0FBTjtZQUNBLEtBQUEsRUFBTyxhQURQO1dBSEQ7U0FERDtNQW5CZ0I7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBO0lBMkJqQixJQUFDLENBQUEsSUFBSSxDQUFDLElBQU4sR0FBYSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDWixLQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sR0FBZ0I7UUFDaEIsS0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBZCxHQUFrQixLQUFDLENBQUE7UUFFbkIsS0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBZCxDQUNDO1VBQUEsQ0FBQSxFQUFHLEtBQUMsQ0FBQSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQXRCO1VBQ0EsT0FBQSxFQUNDO1lBQUEsSUFBQSxFQUFNLENBQU47WUFDQSxLQUFBLEVBQU8sa0JBRFA7V0FGRDtTQUREO1FBTUEsS0FBQyxDQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBWCxHQUFxQjtRQUNyQixLQUFDLENBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFYLENBQ0M7VUFBQSxPQUFBLEVBQVMsQ0FBVDtVQUNBLE9BQUEsRUFDQztZQUFBLElBQUEsRUFBTSxDQUFOO1dBRkQ7U0FERDtlQU1BLEtBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQWQsQ0FBbUIsTUFBTSxDQUFDLFlBQTFCLEVBQXdDLFNBQUE7QUFFdkMsY0FBQTtVQUFBLEtBQUMsQ0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQVosR0FBcUIsS0FBQyxDQUFBLEtBQUssQ0FBQyxJQUFJLENBQUM7VUFDakMsS0FBQyxDQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBWCxHQUFvQixLQUFDLENBQUEsSUFBSSxDQUFDLElBQUksQ0FBQztVQUMvQixLQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFkLEdBQXVCLEtBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDO1VBQ3JDLEtBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixDQUFhLFNBQUE7QUFDWixnQkFBQTtZQUFBLElBQUEsR0FBTyxLQUFDLENBQUEsSUFBSSxDQUFDO1lBQ2IsS0FBQyxDQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBWixHQUFnQixLQUFDLENBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFaLEdBQXFCO1lBSXJDLEtBQUMsQ0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQVgsR0FBZSxLQUFDLENBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFYLEdBQW9CO1lBQ25DLElBQUcsSUFBQSxHQUFPLENBQVY7Y0FBaUIsS0FBQyxDQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBWCxHQUFlLEtBQUMsQ0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQTNDOztZQUNBLEtBQUMsQ0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVgsR0FBcUIsQ0FBQSxHQUFJLENBQUMsSUFBQSxHQUFPLEVBQVI7WUFFekIsS0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBZCxHQUFrQixLQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFkLEdBQXVCO1lBQ3pDLElBQUcsS0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBZCxHQUF1QixJQUF2QixHQUE4QixDQUFqQztxQkFDQyxLQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFkLENBQXlCLEtBQXpCLEVBREQ7YUFBQSxNQUFBO3FCQUdDLEtBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQWQsQ0FBeUIsSUFBekIsRUFIRDs7VUFYWSxDQUFiO1VBZ0JBLEtBQUMsQ0FBQSxJQUFJLENBQUMsV0FBTixDQUFrQixTQUFBO1lBQ2pCLElBQVksS0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBMUI7cUJBQUEsS0FBQyxDQUFBLEtBQUQsQ0FBQSxFQUFBOztVQURpQixDQUFsQjtBQUlBO0FBQUE7ZUFBQSx1Q0FBQTs7eUJBQ0MsTUFBTSxDQUFDLE9BQVAsQ0FBZSxTQUFBO3FCQUFHLEtBQUMsQ0FBQSxPQUFELENBQUE7WUFBSCxDQUFmO0FBREQ7O1FBekJ1QyxDQUF4QztNQWpCWTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUE7SUE4Q2IsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLEdBQWdCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUNmLEtBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixDQUNDO1VBQUEsT0FBQSxFQUFTLENBQVQ7VUFDQSxPQUFBLEVBQ0M7WUFBQSxJQUFBLEVBQU0sRUFBTjtZQUNBLEtBQUEsRUFBTyxNQURQO1dBRkQ7U0FERDtNQURlO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtJQU9oQixJQUFDLENBQUEsSUFBSSxDQUFDLEtBQU4sR0FBYyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDYixLQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBeEIsQ0FBQTtRQUNBLEtBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQWQsQ0FBQTtlQUNBLEtBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQWQsQ0FBc0I7VUFBQSxDQUFBLEVBQUcsS0FBQyxDQUFBLElBQUQsR0FBUSxHQUFYO1VBQWdCLE9BQUEsRUFBUztZQUFFLElBQUEsRUFBTSxHQUFSO1lBQWEsS0FBQSxFQUFPLGtCQUFwQjtXQUF6QjtTQUF0QjtNQUhhO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtJQU1kLElBQUMsQ0FBQSxJQUFELENBQUE7RUEzUlk7O3lCQThSYixJQUFBLEdBQU0sU0FBQTtJQUNMLElBQUMsQ0FBQSxZQUFELENBQUE7SUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLElBQUosQ0FBQTtJQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFBO1dBRUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUNoQixLQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FBQTtlQUNBLEtBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixDQUFBO01BRmdCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFqQjtFQUxLOzt5QkFVTixPQUFBLEdBQVMsU0FBQTtJQUNSLElBQUMsQ0FBQSxFQUFFLENBQUMsT0FBSixDQUFBO0lBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLENBQUE7V0FFQSxLQUFLLENBQUMsS0FBTixDQUFZLEdBQVosRUFBaUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBQTtNQUFIO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFqQjtFQUpROzt5QkFPVCxLQUFBLEdBQU8sU0FBQTtJQUNOLElBQUMsQ0FBQSxFQUFFLENBQUMsT0FBSixDQUFBO0lBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFOLENBQUE7V0FFQSxLQUFLLENBQUMsS0FBTixDQUFZLEVBQVosRUFBZ0IsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBQTtNQUFIO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQjtFQUpNOztFQU9QLGtCQUFBLEdBQXFCLFNBQUMsT0FBRDtBQUNwQixRQUFBOztNQURxQixVQUFVOzs7TUFDL0IsT0FBTyxDQUFDLFFBQVM7OztNQUNqQixPQUFPLENBQUMsUUFBUyxNQUFNLENBQUMsS0FBSyxDQUFDOzs7TUFDOUIsT0FBTyxDQUFDLFVBQVc7OztNQUNuQixPQUFPLENBQUMsYUFBYzs7O01BQ3RCLE9BQU8sQ0FBQyxXQUFZOztJQUVwQixLQUFBLEdBQVEsT0FBTyxDQUFDO0lBQ2hCLEtBQUEsR0FBUSxPQUFPLENBQUM7SUFDaEIsT0FBQSxHQUFVLE9BQU8sQ0FBQztJQUNsQixVQUFBLEdBQWEsT0FBTyxDQUFDO0lBQ3JCLFFBQUEsR0FBVyxPQUFPLENBQUM7SUFHbkIsTUFBQSxHQUFhLElBQUEsS0FBQSxDQUNaO01BQUEsSUFBQSxFQUFNLHVCQUFBLEdBQXdCLEtBQTlCO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFOLENBQVcsQ0FBWCxDQURIO01BRUEsS0FBQSxFQUFPLEdBRlA7TUFFWSxNQUFBLEVBQVEsRUFGcEI7TUFHQSxJQUFBLEVBQU0sS0FITjtNQUlBLEtBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxNQUFWO1FBQWtCLFVBQUEsRUFBWSxHQUE5QjtRQUFtQyxVQUFBLEVBQVksTUFBL0M7UUFDQSxTQUFBLEVBQVcsUUFEWDtRQUVBLGFBQUEsRUFBZSxRQUZmO09BTEQ7TUFRQSxLQUFBLEVBQVUsS0FBQSxLQUFTLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBekIsR0FBMEMsU0FBMUMsR0FBeUQsVUFSaEU7TUFTQSxZQUFBLEVBQWMsRUFUZDtNQVVBLGVBQUEsRUFBaUIsT0FWakI7S0FEWTtJQWFiLE1BQU0sQ0FBQyxNQUFQLEdBQ0M7TUFBQSxPQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8sR0FBUDtRQUNBLE9BQUEsRUFBUyxFQURUO1FBRUEsZ0JBQUEsRUFDQztVQUFBLElBQUEsRUFBTSxHQUFOO1VBQ0EsS0FBQSxFQUFPLGtCQURQO1NBSEQ7T0FERDtNQU1BLE1BQUEsRUFDQztRQUFBLEtBQUEsRUFBTyxDQUFQO1FBQ0EsT0FBQSxFQUFTLENBRFQ7UUFFQSxnQkFBQSxFQUNDO1VBQUEsSUFBQSxFQUFNLEdBQU47VUFDQSxLQUFBLEVBQU8sa0JBRFA7U0FIRDtPQVBEOztJQWNELE1BQU0sQ0FBQyxXQUFQLENBQW1CLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBRCxDQUFTLFNBQVQ7SUFBSCxDQUFuQjtJQUNBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBRCxDQUFTLFFBQVQ7SUFBSCxDQUFqQjtJQUNBLE1BQU0sQ0FBQyxVQUFQLENBQWtCLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBRCxDQUFTLFFBQVQ7SUFBSCxDQUFsQjtJQUNBLE1BQU0sQ0FBQyxLQUFQLENBQWEsU0FBQTtNQUFHLElBQXVCLFFBQXZCO2VBQUEsTUFBTSxDQUFDLFVBQVAsQ0FBQSxFQUFBOztJQUFILENBQWI7QUFFQSxXQUFPO0VBL0NhOztFQWtEckIsYUFBQSxHQUFnQixTQUFDLE9BQUQ7QUFFZixRQUFBOztNQUZnQixVQUFVOztJQUUxQixPQUFBLEdBQWMsSUFBQSxLQUFBLENBQ2I7TUFBQSxJQUFBLEVBQU0sdUJBQU47TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxDQUFYLENBREg7TUFFQSxLQUFBLEVBQU8sR0FGUDtNQUVZLE1BQUEsRUFBUSxHQUZwQjtNQUdBLGVBQUEsRUFBaUIsT0FBTyxDQUFDLE9BSHpCO01BSUEsWUFBQSxFQUFjLEVBSmQ7S0FEYTtJQVFkLE9BQU8sQ0FBQyxNQUFSLEdBQXFCLElBQUEsS0FBQSxDQUNwQjtNQUFBLElBQUEsRUFBTSxTQUFOO01BQ0EsS0FBQSxFQUFPLE9BQU8sQ0FBQyxLQURmO01BQ3NCLE1BQUEsRUFBUSxFQUQ5QjtNQUVBLElBQUEsRUFBTSxPQUFPLENBQUMsT0FGZDtNQUdBLEtBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxNQUFWO1FBQWtCLFVBQUEsRUFBWSxHQUE5QjtRQUFtQyxVQUFBLEVBQVksTUFBL0M7UUFDQSxhQUFBLEVBQWUsT0FEZjtRQUVBLFNBQUEsRUFBVyxPQUZYO1FBR0EsT0FBQSxFQUFTLG9CQUhUO1FBSUEsYUFBQSxFQUFlLFdBSmY7UUFLQSxZQUFBLEVBQWMsbUJBTGQ7T0FKRDtNQVVBLEtBQUEsRUFBTyxPQUFPLENBQUMsY0FWZjtNQVdBLGVBQUEsRUFBaUIsT0FBTyxDQUFDLFNBWHpCO01BWUEsTUFBQSxFQUFRLE9BWlI7S0FEb0I7SUFnQnJCLE9BQU8sQ0FBQyxLQUFSLEdBQW9CLElBQUEsS0FBQSxDQUNuQjtNQUFBLElBQUEsRUFBTSxRQUFOO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFOLENBQVcsRUFBWCxDQURIO01BQ21CLENBQUEsRUFBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQWYsR0FBc0IsRUFENUM7TUFFQSxLQUFBLEVBQU8sR0FGUDtNQUdBLElBQUEsRUFBTSxPQUFPLENBQUMsS0FIZDtNQUlBLEtBQUEsRUFBTztRQUFBLFFBQUEsRUFBVSxNQUFWO1FBQWtCLFVBQUEsRUFBWSxHQUE5QjtRQUFtQyxVQUFBLEVBQVksQ0FBL0M7T0FKUDtNQUtBLGVBQUEsRUFBaUIsRUFMakI7TUFNQSxNQUFBLEVBQVEsT0FOUjtLQURtQjtJQVFwQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVYsQ0FBbUIsT0FBTyxDQUFDLEtBQTNCLEVBQWtDLEVBQWxDLEVBQXNDO01BQUUsS0FBQSxFQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBdkI7S0FBdEM7SUFHQSxPQUFPLENBQUMsT0FBUixHQUFzQixJQUFBLEtBQUEsQ0FDckI7TUFBQSxJQUFBLEVBQU0sVUFBTjtNQUNBLENBQUEsRUFBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBRGpCO01BQ3VCLENBQUEsRUFBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQWQsR0FBcUIsQ0FEL0M7TUFFQSxLQUFBLEVBQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUZyQjtNQUdBLElBQUEsRUFBTSxPQUFPLENBQUMsT0FIZDtNQUlBLEtBQUEsRUFDQztRQUFBLFFBQUEsRUFBVSxNQUFWO1FBQWtCLFVBQUEsRUFBWSxHQUE5QjtRQUFtQyxVQUFBLEVBQVksTUFBL0M7UUFDQSxhQUFBLEVBQWUsUUFEZjtPQUxEO01BT0EsZUFBQSxFQUFpQixFQVBqQjtNQVFBLE1BQUEsRUFBUSxPQVJSO0tBRHFCO0lBVXRCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBVixDQUFtQixPQUFPLENBQUMsT0FBM0IsRUFBb0MsRUFBcEMsRUFBd0M7TUFBRSxLQUFBLEVBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUF6QjtLQUF4QztJQUdBLElBQUcsT0FBTyxDQUFDLE1BQVg7TUFDQyxPQUFPLENBQUMsTUFBUixHQUFxQixJQUFBLEtBQUEsQ0FDcEI7UUFBQSxJQUFBLEVBQU0sU0FBTjtRQUNBLENBQUEsRUFBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBRG5CO1FBQ3NCLENBQUEsRUFBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQWhCLEdBQXVCLENBRGhEO1FBRUEsS0FBQSxFQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FGdkI7UUFHQSxlQUFBLEVBQWlCLEVBSGpCO1FBSUEsTUFBQSxFQUFRLE9BSlI7T0FEb0I7TUFNckIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFmLENBQXdCLE9BQU8sQ0FBQyxNQUFoQztNQUNBLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBZixHQUF1QixLQUFLLENBQUM7TUFDN0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFmLEdBQXdCLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBZixDQUFBLENBQTZCLENBQUMsQ0FBOUIsR0FBa0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFmLENBQUEsQ0FBNkIsQ0FBQyxPQVR6Rjs7SUFZQSxPQUFPLENBQUMsTUFBUixHQUFpQixPQUFPLENBQUMsWUFBUixDQUFBLENBQXNCLENBQUMsTUFBdkIsR0FBZ0M7QUFFakQsV0FBTztFQWhFUTs7OztHQXZZa0I7Ozs7QURObkM7QUFBQSxJQUFBOzs7O0FBTU0sT0FBTyxDQUFDO0VBRWI7QUFBQSxNQUFBOzs7O0VBSUEsZ0JBQUEsR0FDQztJQUFBLENBQUEsRUFBRyxFQUFIOzs7RUFHWSxnQkFBQyxPQUFEOztNQUFDLFVBQVU7OztJQUN2QixPQUFPLENBQUMsZ0JBQVIsR0FBMkI7SUFDM0Isd0NBQU0sT0FBTjtJQUdBLElBQUMsQ0FBQSxTQUFELEdBQWlCLElBQUEsS0FBQSxDQUNoQjtNQUFBLElBQUEsRUFBTSxXQUFOO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBQyxDQUFiLENBREg7TUFDb0IsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQVUsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUF6QixDQUR2QjtNQUVBLEtBQUEsRUFBTyxFQUZQO01BRVcsTUFBQSxFQUFRLEVBRm5CO01BR0EsWUFBQSxFQUFjLEVBSGQ7TUFJQSxlQUFBLEVBQWlCLHVCQUpqQjtNQUtBLE9BQUEsRUFBUyxDQUxUO01BTUEsTUFBQSxFQUFRLElBTlI7S0FEZ0I7SUFRakIsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLEdBQ0M7TUFBQSxJQUFBLEVBQU07UUFBQSxPQUFBLEVBQVMsQ0FBVDtRQUFZLGdCQUFBLEVBQWtCO1VBQUUsSUFBQSxFQUFNLEdBQVI7U0FBOUI7T0FBTjs7SUFHRCxJQUFDLENBQUEsU0FBUyxDQUFDLEtBQVgsR0FBdUIsSUFBQSxLQUFBLENBQ3RCO01BQUEsSUFBQSxFQUFNLFFBQU47TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRFQ7TUFDaUIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQVUsQ0FBVixDQURwQjtNQUVBLEtBQUEsRUFBTyxFQUZQO01BRVcsTUFBQSxFQUFRLEVBRm5CO01BR0EsWUFBQSxFQUFjLEVBSGQ7TUFJQSxlQUFBLEVBQWlCLE9BSmpCO01BS0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQUxUO0tBRHNCO0lBU3ZCLElBQUMsQ0FBQSxhQUFELENBQWUsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO1FBQ2QsSUFBTyxLQUFDLENBQUEsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFqQixLQUEyQixFQUFsQztVQUNDLEtBQUMsQ0FBQSxTQUFTLENBQUMsV0FBWCxDQUFBO2lCQUNBLEtBQUMsQ0FBQSxTQUFTLENBQUMsT0FBWCxDQUFtQixNQUFuQixFQUZEOztNQURjO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFmO0lBS0EsSUFBQyxDQUFBLHVCQUFELENBQXlCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUN4QixJQUFPLEtBQUMsQ0FBQSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQWpCLEtBQTJCLEVBQWxDO1VBQ0MsS0FBQyxDQUFBLFNBQVMsQ0FBQyxXQUFYLENBQUE7aUJBQ0EsS0FBQyxDQUFBLFNBQVMsQ0FBQyxPQUFYLENBQW1CLFNBQW5CLEVBRkQ7O01BRHdCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QjtJQU1BLElBQUMsQ0FBQSxNQUFELENBQVEsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO0FBQ1AsWUFBQTtRQUFBLEdBQUEsR0FBTTtRQUNOLEdBQUEsR0FBTSxLQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsR0FBa0IsS0FBQyxDQUFBLE1BQW5CLEdBQTRCLENBQUMsS0FBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLEdBQXFCLEtBQUMsQ0FBQSxhQUFhLENBQUMsTUFBckM7UUFFbEMsS0FBQyxDQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBakIsR0FBcUIsS0FBSyxDQUFDLFFBQU4sQ0FBZSxLQUFDLENBQUEsT0FBaEIsRUFBeUIsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUF6QixFQUFxQyxDQUFDLENBQUQsRUFBSSxFQUFBLEdBQUssS0FBQyxDQUFBLFdBQVYsQ0FBckM7UUFFckIsSUFBRyxLQUFDLENBQUEsT0FBRCxJQUFZLEdBQWY7VUFDQyxLQUFDLENBQUEsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFqQixHQUEwQixLQUFLLENBQUMsS0FBTixDQUFZLEtBQUMsQ0FBQSxXQUFELEdBQWUsS0FBQyxDQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBNUMsRUFBK0MsRUFBL0MsRUFBbUQsS0FBQyxDQUFBLFdBQXBEO2lCQUMxQixLQUFDLENBQUEsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFqQixHQUFxQixFQUZ0QjtTQUFBLE1BSUssSUFBRyxLQUFDLENBQUEsT0FBRCxJQUFZLEdBQWY7VUFDSixLQUFDLENBQUEsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFqQixHQUEwQixLQUFLLENBQUMsS0FBTixDQUFZLEVBQUEsR0FBSyxLQUFDLENBQUEsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFsQyxFQUFxQyxFQUFyQyxFQUF5QyxLQUFDLENBQUEsV0FBMUM7VUFDMUIsSUFBZ0MsS0FBQyxDQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBakIsSUFBMkIsRUFBM0Q7bUJBQUEsS0FBQyxDQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBakIsR0FBcUIsRUFBQSxHQUFLLEdBQTFCO1dBRkk7U0FBQSxNQUFBO2lCQUlKLEtBQUMsQ0FBQSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQWpCLEdBQTBCLEtBQUMsQ0FBQSxZQUp2Qjs7TUFWRTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBUjtFQXJDWTs7bUJBc0RiLGFBQUEsR0FBZSxTQUFBO0lBQ2QsMkNBQUEsU0FBQTtJQUVBLElBQUEsQ0FBYyxJQUFDLENBQUEsU0FBZjtBQUFBLGFBQUE7O1dBRUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxLQUFLLENBQUMsS0FBTixDQUFhLElBQUMsQ0FBQSxTQUFTLENBQUMsTUFBWCxHQUFvQixJQUFDLENBQUEsTUFBckIsR0FBOEIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQTFFLEVBQW1GLEVBQW5GLEVBQXVGLEVBQXZGO0VBTEQ7Ozs7R0FoRWE7Ozs7QURON0I7QUFBQSxJQUFBOztBQVFBLFVBQUEsR0FBYTs7QUFHYixVQUFVLENBQUMsSUFBWCxHQUFtQixPQUFBLENBQVEsTUFBUjs7QUFFbkIsSUFBZ0MsTUFBaEM7RUFBQSxDQUFDLENBQUMsTUFBRixDQUFTLE1BQVQsRUFBaUIsVUFBakIsRUFBQTs7O0FBR0EsVUFBVSxDQUFDLE1BQVgsR0FBb0IsSUFBSSxDQUFDLE9BQUEsQ0FBUSxvQkFBUixDQUFELENBQThCLENBQUM7O0FBRXZELElBQWdDLE1BQWhDO0VBQUEsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxNQUFULEVBQWlCLFVBQWpCLEVBQUE7OztBQUdBLFVBQVUsQ0FBQyxVQUFYLEdBQXdCLENBQUMsT0FBQSxDQUFRLHdCQUFSLENBQUQsQ0FBa0MsQ0FBQzs7QUFDM0QsVUFBVSxDQUFDLFlBQVgsR0FBMEIsQ0FBQyxPQUFBLENBQVEsd0JBQVIsQ0FBRCxDQUFrQyxDQUFDOztBQUM3RCxVQUFVLENBQUMsSUFBWCxHQUFrQixDQUFDLE9BQUEsQ0FBUSxrQkFBUixDQUFELENBQTRCLENBQUM7O0FBQy9DLFVBQVUsQ0FBQyxLQUFYLEdBQW1CLENBQUMsT0FBQSxDQUFRLG1CQUFSLENBQUQsQ0FBNkIsQ0FBQzs7QUFDakQsVUFBVSxDQUFDLFlBQVgsR0FBMEIsQ0FBQyxPQUFBLENBQVEsMEJBQVIsQ0FBRCxDQUFvQyxDQUFDOztBQUMvRCxVQUFVLENBQUMsTUFBWCxHQUFvQixDQUFDLE9BQUEsQ0FBUSxvQkFBUixDQUFELENBQThCLENBQUM7O0FBQ25ELFVBQVUsQ0FBQyxHQUFYLEdBQWlCLENBQUMsT0FBQSxDQUFRLGlCQUFSLENBQUQsQ0FBMkIsQ0FBQzs7QUFDN0MsVUFBVSxDQUFDLE9BQVgsR0FBcUIsQ0FBQyxPQUFBLENBQVEsU0FBUixDQUFELENBQW1CLENBQUM7O0FBR3pDLElBQWdDLE1BQWhDO0VBQUEsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxNQUFULEVBQWlCLFVBQWpCLEVBQUE7OztBQUNBLElBQWtDLE1BQWxDO0VBQUEsTUFBTSxDQUFDLFVBQVAsR0FBb0IsV0FBcEI7Ozs7O0FEL0JBLElBQUE7OztBQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXBCLENBQUE7O0FBRUE7O0FBTU0sT0FBTyxDQUFDO0VBQ2I7OztFQWdCYSxpQkFBQyxPQUFEOztNQUFDLFVBQVE7O0lBQ3JCLDBDQUFBLFNBQUE7O01BRUEsT0FBTyxDQUFDLFVBQVc7O0lBRW5CLElBQUMsQ0FBQSxPQUFELEdBQVcsT0FBTyxDQUFDO0lBQ25CLElBQUMsQ0FBQSxHQUFELEdBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUVoQixJQUFDLENBQUEsYUFBRCxHQUFpQixPQUFPLENBQUM7SUFHekIsSUFBQyxDQUFBLEVBQUQsR0FBVSxJQUFBLEtBQUEsQ0FBTTtNQUFBLElBQUEsRUFBTSxZQUFOO01BQW9CLGVBQUEsRUFBaUIsT0FBckM7S0FBTjtJQUdWLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsVUFBQSxDQUNqQjtNQUFBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FBZDtNQUFxQixNQUFBLEVBQVEsTUFBTSxDQUFDLE1BQXBDO01BQ0EsYUFBQSxFQUFlLElBQUMsQ0FBQSxhQURoQjtLQURpQjtJQUlsQixJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsS0FBQSxDQUNaO01BQUEsS0FBQSxFQUFPLE1BQU0sQ0FBQyxLQUFkO01BQXFCLE1BQUEsRUFBUSxNQUFNLENBQUMsTUFBcEM7S0FEWTtJQUdiLElBQUMsQ0FBQSxJQUFELEdBQVksSUFBQSxJQUFBLENBQ1g7TUFBQSxLQUFBLEVBQU8sTUFBTSxDQUFDLEtBQWQ7TUFBcUIsTUFBQSxFQUFRLE1BQU0sQ0FBQyxNQUFwQztNQUNBLFVBQUEsRUFBWSxJQUFDLENBQUEsVUFEYjtNQUVBLE9BQUEsRUFBUyxJQUFDLENBQUEsT0FGVjtLQURXO0lBTVosTUFBTSxDQUFDLGNBQVAsQ0FBc0IsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO0FBQ3JCLFlBQUE7UUFBQSxhQUFBLEdBQWdCLEtBQUMsQ0FBQSxpQkFBRCxDQUFBO1FBQ2hCLElBQUEsQ0FBYyxhQUFkO0FBQUEsaUJBQUE7O1FBR0EsSUFBRyxhQUFBLEtBQWlCLEtBQUMsQ0FBQSxVQUFyQjtVQUVDLElBQUcsS0FBQyxDQUFBLFVBQVUsQ0FBQyxZQUFmO21CQUFpQyxLQUFDLENBQUEsVUFBVSxDQUFDLFFBQVosQ0FBQSxFQUFqQztXQUFBLE1BQUE7bUJBRUssS0FBQyxDQUFBLElBQUksQ0FBQyxJQUFOLENBQVcsS0FBQyxDQUFBLFVBQVosRUFGTDtXQUZEO1NBQUEsTUFNSyxJQUFHLGFBQUEsS0FBaUIsS0FBQyxDQUFBLEdBQXJCO2lCQUNKLEtBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixDQUFXLEtBQUMsQ0FBQSxHQUFaLEVBREk7U0FBQSxNQUdBLElBQUcsYUFBQSxLQUFpQixLQUFDLENBQUEsSUFBckI7aUJBQ0osS0FBQyxDQUFBLElBQUksQ0FBQyxPQUFOLENBQWMsS0FBQyxDQUFBLFVBQWYsRUFESTtTQUFBLE1BR0EsSUFBRyxhQUFBLEtBQWlCLEtBQUMsQ0FBQSxLQUFyQjtpQkFDSixLQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FBZSxJQUFmLEVBREk7U0FBQSxNQUdBLElBQUcsYUFBQSxLQUFpQixLQUFDLENBQUEsWUFBckI7aUJBQ0osS0FBQyxDQUFBLFlBQVksQ0FBQyxPQUFkLENBQUEsRUFESTs7TUFwQmdCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF0QjtJQXdCQSxNQUFNLENBQUMsTUFBUCxDQUFjLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtBQUNiLFlBQUE7UUFBQSxhQUFBLEdBQWdCLEtBQUMsQ0FBQSxpQkFBRCxDQUFBO1FBQ2hCLElBQUEsQ0FBYyxhQUFkO0FBQUEsaUJBQUE7O1FBR0EsSUFBRyxhQUFBLEtBQWlCLEtBQUMsQ0FBQSxLQUFyQjtpQkFBZ0MsS0FBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQUEsRUFBaEM7U0FBQSxNQUFBO1VBR0MsSUFBRyxhQUFBLEtBQWlCLEtBQUMsQ0FBQSxHQUFyQjtZQUNDLEtBQUMsQ0FBQSxLQUFLLENBQUMsYUFBUCxDQUFxQixLQUFDLENBQUEsT0FBdEI7bUJBQ0EsS0FBQyxDQUFBLElBQUksQ0FBQyxJQUFOLENBQUEsRUFGRDtXQUFBLE1BQUE7bUJBSUssS0FBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQUEsRUFKTDtXQUhEOztNQUxhO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFkO0VBbkRZOztvQkFzRWIsZ0JBQUEsR0FBa0IsU0FBQyxPQUFEOztNQUFDLFVBQVU7O0lBQzVCLElBQTJCLElBQUMsQ0FBQSxZQUE1QjtNQUFBLElBQUMsQ0FBQSxZQUFZLENBQUMsT0FBZCxDQUFBLEVBQUE7O1dBQ0EsSUFBQyxDQUFBLFlBQUQsR0FBb0IsSUFBQSxZQUFBLENBQWEsT0FBYjtFQUZIOztvQkFLbEIsWUFBQSxHQUFjLFNBQUMsS0FBRDtXQUFXLElBQUMsQ0FBQSxVQUFVLENBQUMsWUFBWixDQUF5QixLQUF6QjtFQUFYOztvQkFPZCxpQkFBQSxHQUFtQixTQUFBO0FBQ2xCLFFBQUE7SUFBQSxJQUFVLENBQUMsQ0FBQyxPQUFGLENBQVUsSUFBQyxDQUFBLEVBQUUsQ0FBQyxRQUFkLENBQVY7QUFBQSxhQUFBOztJQUNBLE1BQUEsR0FBUyxDQUFDLENBQUMsTUFBRixDQUFTLElBQUMsQ0FBQSxFQUFFLENBQUMsUUFBYixFQUF1QixPQUF2QixDQUErQixDQUFDLE9BQWhDLENBQUE7QUFDVCxXQUFPLE1BQU8sQ0FBQSxDQUFBO0VBSEk7Ozs7R0FuR1UsTUFBTSxDQUFDIn0=
