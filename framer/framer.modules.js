require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"util":[function(require,module,exports){
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
'watchOS : Apps\n\n@auther ho.s\n@since 2016.11.23';
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
'App\n\n@auther ho.s\n@since 2016.11.24';
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
'watchOS : ClockFaces\n\n@auther ho.s\n@since 2016.11.23';
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
'watchOS : Device\n\n@auther ho.s\n@since 2016.11.23';
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
'watchOS : Docks\n\n@auther ho.s\n@since 2016.11.23';
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
'watchOS : Notification\n\n@auther ho.s\n@since 2016.11.23';
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
'watchOS : Scroll\n\n@auther ho.s\n@since 2016.11.23';
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

'watchOS\n\n@auther ho.s\n@since 2016.11.24';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvd2F0Y2hvcy5jb2ZmZWUiLCIuLi9tb2R1bGVzL3dhdGNob3Mta2l0LmNvZmZlZSIsIi4uL21vZHVsZXMvd2F0Y2hvcy1raXQtc2Nyb2xsLmNvZmZlZSIsIi4uL21vZHVsZXMvd2F0Y2hvcy1raXQtbm90aWZpY2F0aW9uLmNvZmZlZSIsIi4uL21vZHVsZXMvd2F0Y2hvcy1raXQtZG9ja3MuY29mZmVlIiwiLi4vbW9kdWxlcy93YXRjaG9zLWtpdC1kZXZpY2UuY29mZmVlIiwiLi4vbW9kdWxlcy93YXRjaG9zLWtpdC1jbG9ja2ZhY2VzLmNvZmZlZSIsIi4uL21vZHVsZXMvd2F0Y2hvcy1raXQtYXBwLmNvZmZlZSIsIi4uL21vZHVsZXMvd2F0Y2hvcy1raXQtYXBwcy5jb2ZmZWUiLCIuLi9tb2R1bGVzL3V0aWwuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIERpc2FibGUgaGludHNcbkZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cbicnJ1xud2F0Y2hPU1xuXG5AYXV0aGVyIGhvLnNcbkBzaW5jZSAyMDE2LjExLjI0XG4nJydcbmNsYXNzIGV4cG9ydHMuV2F0Y2hPUyBleHRlbmRzIEZyYW1lci5CYXNlQ2xhc3Ncblx0JycnXG5cdG9wdGlvbnM6XG5cdFx0YXBwSW5mbzogXG5cdFx0XHRuYW1lOiBcIuy5tOy5tOyYpOymneq2jFwiXG5cdFx0XHRpY29uOiBcImltYWdlcy9hcHBpY29uLnBuZ1wiXG5cdFx0XHRhcHA6IGtha2Fvc3RvY2tzXG5cdFx0Y29tcGxpY2F0aW9uczpcblx0XHRcdHV0aWxpdGFyaWFuOiBbXG5cdFx0XHRdXG5cdFx0XHRtb2R1bGFyOiBbXG5cdFx0XHRcdG5ldyBDb21wbGljYXRpb24oKS5tb2R1bGFyU21hbGwoKS5zaW1wbGVUZXh0KFwi7Lm07Lm07Jik7Kad6raMXCIpXG5cdFx0XHRdXG5cdFx0XHRjaXJjdWxhcjogW1xuXHRcdFx0XVxuXHQnJydcblx0IyBDb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cdFx0c3VwZXJcblxuXHRcdG9wdGlvbnMuYXBwSW5mbyA/PSB7fVxuXG5cdFx0QGFwcEluZm8gPSBvcHRpb25zLmFwcEluZm9cblx0XHRAYXBwID0gQGFwcEluZm8uYXBwXG5cblx0XHRAY29tcGxpY2F0aW9ucyA9IG9wdGlvbnMuY29tcGxpY2F0aW9uc1xuXG5cdFx0IyBCYWNrZ3JvdW5kXG5cdFx0QGJnID0gbmV3IExheWVyIG5hbWU6IFwiQmFja2dyb3VuZFwiLCBiYWNrZ3JvdW5kQ29sb3I6IFwiYmxhY2tcIlxuXG5cdFx0IyBDbG9ja2ZhY2UgKENvbXBsaWNhdGlvbilcblx0XHRAY2xvY2tmYWNlcyA9IG5ldyBDbG9ja0ZhY2VzIFxuXHRcdFx0d2lkdGg6IERldmljZS53aWR0aCwgaGVpZ2h0OiBEZXZpY2UuaGVpZ2h0XG5cdFx0XHRjb21wbGljYXRpb25zOiBAY29tcGxpY2F0aW9uc1xuXHRcdCMgRG9ja3Ncblx0XHRAZG9ja3MgPSBuZXcgRG9ja3MgXG5cdFx0XHR3aWR0aDogRGV2aWNlLndpZHRoLCBoZWlnaHQ6IERldmljZS5oZWlnaHRcblx0XHQjIEFwcHNcblx0XHRAYXBwcyA9IG5ldyBBcHBzIFxuXHRcdFx0d2lkdGg6IERldmljZS53aWR0aCwgaGVpZ2h0OiBEZXZpY2UuaGVpZ2h0XG5cdFx0XHRjbG9ja2ZhY2VzOiBAY2xvY2tmYWNlc1xuXHRcdFx0YXBwSW5mbzogQGFwcEluZm9cblxuXHRcdCMgRXZlbnQgOiBEaWdpdGFsIENyb3duXG5cdFx0RGV2aWNlLm9uRGlnaXRhbENyb3duID0+XG5cdFx0XHRjdXJyZW50U2NyZWVuID0gQF9nZXRDdXJyZW50U2NyZWVuKClcblx0XHRcdHJldHVybiB1bmxlc3MgY3VycmVudFNjcmVlblxuXHRcdFx0XG5cdFx0XHQjIENsb2NrZmFjZVxuXHRcdFx0aWYgY3VycmVudFNjcmVlbiBpcyBAY2xvY2tmYWNlc1xuXHRcdFx0XHQjIENsb2NrZmFjZSA6IGNoYW5nZSBtb2RlXG5cdFx0XHRcdGlmIEBjbG9ja2ZhY2VzLmlzQ2hhbmdlTW9kZSB0aGVuIEBjbG9ja2ZhY2VzLnNlbGVjdGVkKClcblx0XHRcdFx0IyBDbG9ja2ZhY2UgOiBub3JtYWwgbW9kZVxuXHRcdFx0XHRlbHNlIEBhcHBzLnNob3cgQGNsb2NrZmFjZXNcblx0XHRcdCMgQXBwXG5cdFx0XHRlbHNlIGlmIGN1cnJlbnRTY3JlZW4gaXMgQGFwcFxuXHRcdFx0XHRAYXBwcy5zaG93IEBhcHBcblx0XHRcdCMgQXBwc1xuXHRcdFx0ZWxzZSBpZiBjdXJyZW50U2NyZWVuIGlzIEBhcHBzXG5cdFx0XHRcdEBhcHBzLmRpc21pc3MgQGNsb2NrZmFjZXNcblx0XHRcdCMgRG9ja3Ncblx0XHRcdGVsc2UgaWYgY3VycmVudFNjcmVlbiBpcyBAZG9ja3Ncblx0XHRcdFx0QGRvY2tzLmRpc21pc3MgdHJ1ZVxuXHRcdFx0IyBOb3RpZmljYXRpb25cblx0XHRcdGVsc2UgaWYgY3VycmVudFNjcmVlbiBpcyBAbm90aWZpY2F0aW9uXG5cdFx0XHRcdEBub3RpZmljYXRpb24uZGlzbWlzcygpXG5cblx0XHQjIEV2ZW50IDogU2lkZSBidXR0b25cblx0XHREZXZpY2Uub25TaWRlID0+XG5cdFx0XHRjdXJyZW50U2NyZWVuID0gQF9nZXRDdXJyZW50U2NyZWVuKClcblx0XHRcdHJldHVybiB1bmxlc3MgY3VycmVudFNjcmVlblxuXHRcdFx0XHRcblx0XHRcdCMgRG9ja3Ncblx0XHRcdGlmIGN1cnJlbnRTY3JlZW4gaXMgQGRvY2tzIHRoZW4gQGRvY2tzLmRpc21pc3MoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHQjIEFwcFxuXHRcdFx0XHRpZiBjdXJyZW50U2NyZWVuIGlzIEBhcHBcblx0XHRcdFx0XHRAZG9ja3MuYWRkUmVjZW50RG9jayBAYXBwSW5mb1xuXHRcdFx0XHRcdEBhcHBzLmluaXQoKVxuXHRcdFx0XHQjIE5vdCBBcHBcblx0XHRcdFx0ZWxzZSBAZG9ja3Muc2hvdygpXG5cblx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0IyBQdWJsaWNcblx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQjIE5vdGlmeSBub3RpZmljYXRpb25cblx0c2hvd05vdGlmaWNhdGlvbjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRAbm90aWZpY2F0aW9uLmRlc3Ryb3koKSBpZiBAbm90aWZpY2F0aW9uXG5cdFx0QG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24gb3B0aW9uc1xuXG5cdCMgU2V0IGNsb2NrZmFjZVxuXHRzZXRDbG9ja2ZhY2U6IChpbmRleCkgLT4gQGNsb2NrZmFjZXMuc2V0Q2xvY2tmYWNlIGluZGV4XG5cblx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0IyBQcml2YXRlXG5cdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0IyBHZXQgY3VycmVudCBzY3JlZW4gbGF5ZXIgKGZpcnN0IGxheWVyKVxuXHRfZ2V0Q3VycmVudFNjcmVlbjogLT5cblx0XHRyZXR1cm4gaWYgXy5pc0VtcHR5KEBiZy5zaWJsaW5ncylcblx0XHRsYXllcnMgPSBfLnNvcnRCeShAYmcuc2libGluZ3MsICdpbmRleCcpLnJldmVyc2UoKVxuXHRcdHJldHVybiBsYXllcnNbMF0iLCInJydcbndhdGNoT1Mga2l0XG5cbkBhdXRoZXIgSnVuZ2hvIHNvbmcgKHRocmVld29yZC5jb20pXG5Ac2luY2UgMjAxNi4xMS4yM1xuJycnXG5cbiMgV2F0Y2ggT1NcbldhdGNoT1NLaXQgPSB7fVxuXG4jIFV0aWxzXG5XYXRjaE9TS2l0LlV0aWwgPSAocmVxdWlyZSAndXRpbCcpXG4jXG5fLmV4dGVuZCh3aW5kb3csIFdhdGNoT1NLaXQpIGlmIHdpbmRvd1xuXG4jXG5XYXRjaE9TS2l0LkRldmljZSA9IG5ldyAocmVxdWlyZSAnd2F0Y2hvcy1raXQtZGV2aWNlJykuRGV2aWNlXG4jXG5fLmV4dGVuZCh3aW5kb3csIFdhdGNoT1NLaXQpIGlmIHdpbmRvd1xuXG5cbldhdGNoT1NLaXQuQ2xvY2tGYWNlcyA9IChyZXF1aXJlICd3YXRjaG9zLWtpdC1jbG9ja2ZhY2VzJykuQ2xvY2tGYWNlc1xuV2F0Y2hPU0tpdC5Db21wbGljYXRpb24gPSAocmVxdWlyZSAnd2F0Y2hvcy1raXQtY2xvY2tmYWNlcycpLkNvbXBsaWNhdGlvblxuV2F0Y2hPU0tpdC5BcHBzID0gKHJlcXVpcmUgJ3dhdGNob3Mta2l0LWFwcHMnKS5BcHBzXG5XYXRjaE9TS2l0LkRvY2tzID0gKHJlcXVpcmUgJ3dhdGNob3Mta2l0LWRvY2tzJykuRG9ja3NcbldhdGNoT1NLaXQuTm90aWZpY2F0aW9uID0gKHJlcXVpcmUgJ3dhdGNob3Mta2l0LW5vdGlmaWNhdGlvbicpLk5vdGlmaWNhdGlvblxuV2F0Y2hPU0tpdC5TY3JvbGwgPSAocmVxdWlyZSAnd2F0Y2hvcy1raXQtc2Nyb2xsJykuU2Nyb2xsXG5XYXRjaE9TS2l0LkFwcCA9IChyZXF1aXJlICd3YXRjaG9zLWtpdC1hcHAnKS5BcHBcbldhdGNoT1NLaXQuV2F0Y2hPUyA9IChyZXF1aXJlICd3YXRjaG9zJykuV2F0Y2hPU1xuXG4jXG5fLmV4dGVuZCh3aW5kb3csIFdhdGNoT1NLaXQpIGlmIHdpbmRvd1xud2luZG93LldhdGNoT1NLaXQgPSBXYXRjaE9TS2l0IGlmIHdpbmRvdyIsIicnJ1xud2F0Y2hPUyA6IFNjcm9sbFxuXG5AYXV0aGVyIGhvLnNcbkBzaW5jZSAyMDE2LjExLjIzXG4nJydcbmNsYXNzIGV4cG9ydHMuU2Nyb2xsIGV4dGVuZHMgU2Nyb2xsQ29tcG9uZW50XG5cblx0JycnXG5cdHNjcm9sbGJhcjpcblx0XHR5OlxuXHQnJydcblx0ZGVmYXVsdFNjcm9sbGJhciA9IFxuXHRcdHk6IDQyXG5cblx0IyBDb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLnNjcm9sbEhvcml6b250YWwgPSBmYWxzZVxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdCMgQmFyXG5cdFx0QHNjcm9sbGJhciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJTY3JvbGxCYXJcIlxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTUpLCB5OiBBbGlnbi50b3AoQF9jb250ZW50SW5zZXQudG9wKVxuXHRcdFx0d2lkdGg6IDEyLCBoZWlnaHQ6IDc1XG5cdFx0XHRib3JkZXJSYWRpdXM6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwuMjUpXCJcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHBhcmVudDogQFxuXHRcdEBzY3JvbGxiYXIuc3RhdGVzID1cblx0XHRcdHNob3c6IG9wYWNpdHk6IDEsIGFuaW1hdGlvbk9wdGlvbnM6IHsgdGltZTogLjE1IH1cblxuXHRcdCMgVGh1bWJcblx0XHRAc2Nyb2xsYmFyLnRodW1iID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi50aHVtYlwiXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLnRvcCgxKVxuXHRcdFx0d2lkdGg6IDEwLCBoZWlnaHQ6IDM2XG5cdFx0XHRib3JkZXJSYWRpdXM6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRcdFx0cGFyZW50OiBAc2Nyb2xsYmFyXG5cdFx0XHRcblx0XHQjIEV2ZW50IDogU2Nyb2xsIFN0YXJ0IC0gdmlzaWJsZSBiYXJcblx0XHRAb25TY3JvbGxTdGFydCA9PiBcblx0XHRcdHVubGVzcyBAc2Nyb2xsYmFyLnRodW1iLmhlaWdodCBpcyA3MyBcblx0XHRcdFx0QHNjcm9sbGJhci5hbmltYXRlU3RvcCgpXG5cdFx0XHRcdEBzY3JvbGxiYXIuYW5pbWF0ZSBcInNob3dcIiBcblx0XHQjIEV2ZW50IDogU2Nyb2xsIEVuZCAtIGludmlzaWJsZSBiYXJcblx0XHRAb25TY3JvbGxBbmltYXRpb25EaWRFbmQgPT4gXG5cdFx0XHR1bmxlc3MgQHNjcm9sbGJhci50aHVtYi5oZWlnaHQgaXMgNzNcblx0XHRcdFx0QHNjcm9sbGJhci5hbmltYXRlU3RvcCgpXG5cdFx0XHRcdEBzY3JvbGxiYXIuYW5pbWF0ZSBcImRlZmF1bHRcIlxuXG5cdFx0IyBFdmVudCA6IE1vdmVcblx0XHRAb25Nb3ZlID0+XG5cdFx0XHRtaW4gPSAwXG5cdFx0XHRtYXggPSBAY29udGVudC5oZWlnaHQgLSBAaGVpZ2h0ICsgKEBfY29udGVudEluc2V0LnRvcCArIEBfY29udGVudEluc2V0LmJvdHRvbSlcblx0XHRcdFxuXHRcdFx0QHNjcm9sbGJhci50aHVtYi55ID0gVXRpbHMubW9kdWxhdGUgQHNjcm9sbFksIFttaW4sIG1heF0sIFsxLCA3NCAtIEB0aHVtYkhlaWdodF1cblx0XHRcdCMgQW5jaG9yIGJvdHRvbVxuXHRcdFx0aWYgQHNjcm9sbFkgPD0gbWluXG5cdFx0XHRcdEBzY3JvbGxiYXIudGh1bWIuaGVpZ2h0ID0gVXRpbHMuY2xhbXAgQHRodW1iSGVpZ2h0ICsgQHNjcm9sbGJhci50aHVtYi55LCAxMiwgQHRodW1iSGVpZ2h0XG5cdFx0XHRcdEBzY3JvbGxiYXIudGh1bWIueSA9IDFcblx0XHRcdCMgQW5jaG9yIHRvcFxuXHRcdFx0ZWxzZSBpZiBAc2Nyb2xsWSA+PSBtYXhcblx0XHRcdFx0QHNjcm9sbGJhci50aHVtYi5oZWlnaHQgPSBVdGlscy5jbGFtcCA3NCAtIEBzY3JvbGxiYXIudGh1bWIueSwgMTIsIEB0aHVtYkhlaWdodFxuXHRcdFx0XHRAc2Nyb2xsYmFyLnRodW1iLnkgPSA3NCAtIDEyIGlmIEBzY3JvbGxiYXIudGh1bWIuaGVpZ2h0IDw9IDEyXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBzY3JvbGxiYXIudGh1bWIuaGVpZ2h0ID0gQHRodW1iSGVpZ2h0XG5cblx0IyBVcGRhdGUgY29udGVudFxuXHR1cGRhdGVDb250ZW50OiA9PlxuXHRcdHN1cGVyXG5cdFx0XG5cdFx0cmV0dXJuIHVubGVzcyBAc2Nyb2xsYmFyXG5cdFx0I1xuXHRcdEB0aHVtYkhlaWdodCA9IFV0aWxzLmNsYW1wIChAc2Nyb2xsYmFyLmhlaWdodCAqIEBoZWlnaHQgLyBAY29udGVudC5kcmFnZ2FibGUuY29uc3RyYWludHMuaGVpZ2h0KSwgMTIsIDczIiwiJycnXG53YXRjaE9TIDogTm90aWZpY2F0aW9uXG5cbkBhdXRoZXIgaG8uc1xuQHNpbmNlIDIwMTYuMTEuMjNcbicnJ1xuY2xhc3MgZXhwb3J0cy5Ob3RpZmljYXRpb24gZXh0ZW5kcyBMYXllclxuXG5cdCMgQnV0dG9uXG5cdEJ1dHRvbiA9IHt9XG5cblx0IyBCdXR0b24gOiBTdHlsZVxuXHRCdXR0b24uU3R5bGUgPSB7fVxuXHRCdXR0b24uU3R5bGUuRGVmYXVsdCA9IFwiYnV0dG9uU3R5bGUuZGVmYXVsdFwiXG5cdEJ1dHRvbi5TdHlsZS5EZXN0cnVjdGl2ZSA9IFwiYnV0dG9uU3R5bGUuZGVzdHJ1Y3RpdmVcIlxuXG5cdCMgU3RhdGljXG5cdHRoaXMuQnV0dG9uID0gQnV0dG9uXG5cblx0JycnXG5cdGFwcE5hbWU6IOyVseydtOumhCBbcmVxdWlyZV1cblx0aWNvbjog7JWE7J207L2YIOydtOuvuOyngCDqsr3roZwgW3JlcXVpcmVdXG5cdGFjY2VudENvbG9yOiDrjIDtkZwg7IOJ7IOBIChTaHJvdCBsb29rc+ydmCDslbHsnbTrpoQg7IOJ7IOB7J20IOuQqClcblx0dGl0bGU6IOygnOuqqVxuXHRtZXNzYWdlOiDrgrTsmqlcblx0YXR0YWNoOiDssqjrtoAg64K07JqpIChMYXllcilcblx0c2FzaENvbG9yOiDsg6Tsi5wg7IOJ7IOBIChMb25nIGxvb2tz7J2YIOyDgeuLqCDsg4nsg4EpXG5cdHNhc2hMYWJlbENvbG9yOiDsg6Tsi5zsnZgg7JWx7J2066aEIOyDieyDgSAoTG9uZyBsb29rc+ydmCDsg4Hri6jroIjsnbTruJQg7IOJ7IOBKVxuXHRiZ0NvbG9jOiDrsLDqsr0g7IOJ7IOBIChMb25nIGxvb2tz7J2YIOuwsOqyvSDsg4nsg4EpXG5cdGJ1dHRvbnM6XG5cdFx0bGFiZWw6IFwi7IOB7IS467O06riwXCIgW3JlcXVpcmVdXG5cdFx0c3R5bGU6IEJ1dHRvbi5TdHlsZS5EZWZhdWx0XG5cdFx0YmdDb2xvcjogXCJyZ2JhKDI0MiwyNDQsMjU1LC4xNClcIlxuXHRcdGxhYmVsQ29sb3I6IFwid2hpdGVcIlxuXHRcdGlzSGFwdGljOiBmYWxzZVxuXHQnJydcblx0IyBDb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLm5hbWUgPSBcIk5vdGlmaWNhdGlvblwiXG5cdFx0b3B0aW9ucy53aWR0aCA/PSBEZXZpY2Uud2lkdGhcblx0XHRvcHRpb25zLmhlaWdodCA/PSBEZXZpY2UuaGVpZ2h0XG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gXCJcIlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdG9wdGlvbnMuYnV0dG9ucyA/PSBbXVxuXHRcdG9wdGlvbnMuYXBwTmFtZSA/PSBcIkFwcFwiXG5cdFx0b3B0aW9ucy5pY29uID89IFwiXCJcblx0XHRvcHRpb25zLmFjY2VudENvbG9yID89IFwid2hpdGVcIlxuXHRcdG9wdGlvbnMudGl0bGUgPz0gXCJUaXRsZVwiXG5cdFx0b3B0aW9ucy5tZXNzYWdlID89IFwiTWVzc2FnZVwiXG5cdFx0b3B0aW9ucy5zYXNoQ29sb3IgPz0gXCJyZ2JhKDI1NSwyNTUsMjU1LC4xKVwiXG5cdFx0b3B0aW9ucy5iZ0NvbG9yID89IFwicmdiYSgyNTUsMjU1LDI1NSwuMTQpXCJcblx0XHRvcHRpb25zLnNhc2hMYWJlbENvbG9yID89IFwid2hpdGVcIlxuXHRcdFxuXHRcdHRpdGxlID0gb3B0aW9ucy50aXRsZVxuXHRcdG1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2Vcblx0XHRidXR0b25zID0gb3B0aW9ucy5idXR0b25zXG5cdFx0YXBwTmFtZSA9IG9wdGlvbnMuYXBwTmFtZVxuXHRcdGljb24gPSBvcHRpb25zLmljb25cblx0XHRhY2NlbnRDb2xvciA9IG9wdGlvbnMuYWNjZW50Q29sb3Jcblx0XHRzYXNoQ29sb3IgPSBvcHRpb25zLnNhc2hDb2xvclxuXHRcdGJnQ29sb3IgPSBvcHRpb25zLmJnQ29sb3JcdFxuXHRcdFxuXHRcdCMgYmdcblx0XHRAYmcgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmJnXCJcblx0XHRcdHdpZHRoOiBAd2lkdGgsIGhlaWdodDogQGhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsLjYpXCJcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHBhcmVudDogQFxuXHRcdFV0aWwuYmx1ciBAYmdcblx0XHRcblx0XHQjIFNob3J0IGxvb2tzXG5cdFx0QHNob3J0ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5zaG9ydFwiXG5cdFx0XHR3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XG5cdFx0IyBTaG9ydCBsb29rcyA6IEljb25cblx0XHRAc2hvcnQuaWNvbiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuc2hvcnQuaWNvblwiXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLnRvcCg0MSlcblx0XHRcdHNpemU6IDE5NlxuXHRcdFx0aW1hZ2U6IGljb25cblx0XHRcdGJvcmRlclJhZGl1czogOThcblx0XHRcdHNoYWRvd1k6IDIsIHNoYWRvd0JsdXI6IDgsIHNoYWRvd0NvbG9yOiBcInJnYmEoMCwwLDAsLjMpXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRwYXJlbnQ6IEBzaG9ydFxuXHRcdFxuXHRcdCMgU2hvcnQgbG9va3MgOiBUaXRsZVxuXHRcdEBzaG9ydC50aXRsZSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuc2hvcnQudGl0bGVcIlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBAc2hvcnQuaWNvbi5tYXhZICsgMThcblx0XHRcdGh0bWw6IHRpdGxlXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0Zm9udFNpemU6IFwiMzhweFwiLCBmb250V2VpZ2h0OiA0MDAsIGxpbmVIZWlnaHQ6IDFcblx0XHRcdFx0bGV0dGVyU3BhY2luZzogXCItMC40MnB4XCJcblx0XHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcblx0XHRcdHBhcmVudDogQHNob3J0XG5cdFx0VXRpbC50ZXh0LmF1dG9TaXplIEBzaG9ydC50aXRsZVxuXHRcdEBzaG9ydC50aXRsZS5jZW50ZXJYKClcblx0XHRcblx0XHQjIFNob3J0IGxvb2tzIDogQXBwIG5hbWVcblx0XHRAc2hvcnQuYXBwTmFtZSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuc2hvcnQuYXBwTmFtZVwiXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEBzaG9ydC50aXRsZS5tYXhZICsgOVxuXHRcdFx0aHRtbDogYXBwTmFtZVxuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdGZvbnRTaXplOiBcIjI4cHhcIiwgZm9udFdlaWdodDogNDAwLCBsaW5lSGVpZ2h0OiAxXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IFwiMC4yMnB4XCJcblx0XHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRcdHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCJcblx0XHRcdGNvbG9yOiBhY2NlbnRDb2xvclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBzaG9ydFxuXHRcdFV0aWwudGV4dC5hdXRvU2l6ZSBAc2hvcnQuYXBwTmFtZVxuXHRcdEBzaG9ydC5hcHBOYW1lLmNlbnRlclgoKVxuXHRcdFxuXHRcdCMgTG9uZiBsb29rc1xuXHRcdEBsb25nID0gbmV3IFNjcm9sbFxuXHRcdFx0bmFtZTogXCIubG9uZ1wiXG5cdFx0XHR3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0Y29udGVudEluc2V0OlxuXHRcdFx0XHR0b3A6IDQyLCBib3R0b206IDE0XG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdEBsb25nLmNvbmZpcm0gPSBuZXcgTGF5ZXJcblx0XHRcdGh0bWw6IFwi7ZmV7J24XCJcblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRmb250V2VpZ2h0OiBcIjQwMFwiXG5cdFx0XHRcdGZvbnRTaXplOiBcIjI0cHhcIlxuXHRcdFx0XHRwYWRkaW5nQm90dG9tOiBcIjI1cHhcIlxuXHRcdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0Y29sb3I6IFwiIzhkOGQ4ZFwiXG5cdFx0XHRwYXJlbnQ6IEBsb25nXG5cdFx0VXRpbC50ZXh0LmF1dG9TaXplIEBsb25nLmNvbmZpcm1cblx0XHRAbG9uZy5jb25maXJtLnByb3BzID0geDogQWxpZ24uY2VudGVyLCB5OiAtKEBsb25nLmNvbnRlbnRJbnNldC50b3AgKyAzMilcblxuXHRcdEBsb25nLmNvbmZpcm0uYmFyID0gbmV3IExheWVyXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbVxuXHRcdFx0d2lkdGg6IDgwLCBoZWlnaHQ6IDVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBAbG9uZy5jb25maXJtXG5cdFx0QGxvbmcuY29uZmlybS5iYXIubGVmdCA9IG5ldyBMYXllclxuXHRcdFx0eDogQWxpZ24ubGVmdCwgeTogQWxpZ24uYm90dG9tXG5cdFx0XHR3aWR0aDogNDMsIGhlaWdodDogNVxuXHRcdFx0b3JpZ2luWDogMCwgb3JpZ2luWTogMFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA1XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiIzhkOGQ4ZFwiXG5cdFx0XHRwYXJlbnQ6IEBsb25nLmNvbmZpcm0uYmFyXG5cdFx0QGxvbmcuY29uZmlybS5iYXIucmlnaHQgPSBuZXcgTGF5ZXJcblx0XHRcdHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi5ib3R0b21cblx0XHRcdHdpZHRoOiA0MywgaGVpZ2h0OiA1XG5cdFx0XHRvcmlnaW5YOiAxLCBvcmlnaW5ZOiAwXG5cdFx0XHRib3JkZXJSYWRpdXM6IDVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjOGQ4ZDhkXCJcblx0XHRcdHBhcmVudDogQGxvbmcuY29uZmlybS5iYXJcblxuXHRcdEBsb25nLmNvbmZpcm0uY2hhbmdlTW9kZSA9IChtb2RlPWZhbHNlKSAtPlxuXHRcdFx0QGlzQ2hhbmdlTW9kZSA9IG1vZGVcblx0XHRcdGNvbG9yID0gaWYgbW9kZSB0aGVuIFwid2hpdGVcIiBlbHNlIFwiIzhkOGQ4ZFwiXG5cdFx0XHRyb3RhdGlvbiA9IGlmIG1vZGUgdGhlbiAxMCBlbHNlIDBcblx0XHRcdG9wdGlvbnMgPSB0aW1lOiAuMTUsIGN1cnZlOiBcInNwcmluZyg1MDAsNTAsMClcIlxuXHRcdFx0QGFuaW1hdGUgY29sb3I6IGNvbG9yLCBvcHRpb25zOiBvcHRpb25zXG5cdFx0XHRAYmFyLmxlZnQuYW5pbWF0ZSByb3RhdGlvbjogcm90YXRpb24sIGJhY2tncm91bmRDb2xvcjogY29sb3IsIG9wdGlvbnM6IG9wdGlvbnNcblx0XHRcdEBiYXIucmlnaHQuYW5pbWF0ZSByb3RhdGlvbjogLXJvdGF0aW9uLGJhY2tncm91bmRDb2xvcjogY29sb3IsIG9wdGlvbnM6IG9wdGlvbnNcblx0XHRcdFxuXHRcdCMgTG9uZiBsb29rcyA6IFRpbWVcblx0XHRAbG9uZy50aW1lID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5sb25nLnRpbWVcIlxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTQpLCB5OiBBbGlnbi50b3AoMSlcblx0XHRcdHdpZHRoOiAxNTAsIGhlaWdodDogMzhcblx0XHRcdGh0bWw6IFV0aWwuZGF0ZS50aW1lRm9ybWF0dGVyIFV0aWwuZGF0ZS5nZXRUaW1lKClcblx0XHRcdHN0eWxlOlxuXHRcdFx0XHRmb250U2l6ZTogXCIzMnB4XCIsIGZvbnRXZWlnaHQ6IDQwMCwgbGluZUhlaWdodDogXCIzOHB4XCJcblx0XHRcdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcblx0XHRcdGNvbG9yOiBcIiNBQkFCQUJcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBsb25nXG5cdFx0XG5cdFx0IyBMb25mIGxvb2tzIDogTWVzc2FnZVxuXHRcdEBsb25nLm1lc3NhZ2UgPSBjcmVhdGVNZXNzYWdlIG9wdGlvbnNcblx0XHRAbG9uZy5tZXNzYWdlLnBhcmVudCA9IEBsb25nLmNvbnRlbnRcblx0XHRcblx0XHQjIEFjdGlvbiBidXR0b25zXG5cdFx0QGxvbmcuYnV0dG9ucyA9IFtdXG5cdFx0IyBDcmVhdGUgYnV0dG9uc1xuXHRcdGlmIGJ1dHRvbnNcblx0XHRcdGZvciBidXR0b24sIGkgaW4gYnV0dG9uc1xuXHRcdFx0XHRhY3Rpb25CdG4gPSBjcmVhdGVBY3Rpb25CdXR0b24gYnV0dG9uXG5cdFx0XHRcdGFjdGlvbkJ0bi55ICs9IEBsb25nLmNvbnRlbnQuY29udGVudEZyYW1lKCkuaGVpZ2h0ICsgOFxuXHRcdFx0XHRAbG9uZy5jb250ZW50LmFkZENoaWxkIGFjdGlvbkJ0blxuXHRcdFx0XHRcblx0XHRcdFx0QGxvbmcuYnV0dG9ucy5wdXNoIGFjdGlvbkJ0blxuXHRcdFx0XHRcblx0XHQjIEJ1dHRvbiA6IENsb3NlXG5cdFx0QGxvbmcuZGlzbWlzc0J0biA9IGNyZWF0ZUFjdGlvbkJ1dHRvbiBsYWJlbDogXCLri6vquLBcIiwgYmdDb2xvcjogXCJyZ2JhKDI0MiwyNDQsMjU1LC4yKVwiXG5cdFx0QGxvbmcuZGlzbWlzc0J0bi55ICs9IEBsb25nLmNvbnRlbnQuY29udGVudEZyYW1lKCkuaGVpZ2h0ICsgMjRcblx0XHRAbG9uZy5jb250ZW50LmFkZENoaWxkIEBsb25nLmRpc21pc3NCdG5cblx0XHRAbG9uZy5idXR0b25zLnB1c2ggQGxvbmcuZGlzbWlzc0J0blxuXHRcdFxuXHRcdCNcblx0XHRAc2hvcnQudmlzaWJsZSA9IHRydWVcblx0XHRAbG9uZy52aXNpYmxlID0gZmFsc2Vcblx0XHRcblx0XHQjIFNob3cgYmFja2dyb3VuZFxuXHRcdEBiZy5zaG93ID0gPT5cblx0XHRcdEBiZy5hbmltYXRlXG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOiAuM1xuXHRcdFx0XHRcdGN1cnZlOiBcImxpbmVhclwiXG5cdFx0IyBEaXNtaXNzIGJhY2tncm91bmRcblx0XHRAYmcuZGlzbWlzcyA9ID0+XHRcblx0XHRcdEBiZy5hbmltYXRlXG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOiAxXG5cdFx0XHRcdFx0Y3VydmU6IFwibGluZWFyXCJcblx0XHRcdFx0XHRkZWxheTogLjJcblx0XHRcdFx0XHRcblx0XHQjIFNob3cgU2hvcnQgbG9va3Ncblx0XHRAc2hvcnQuc2hvdyA9ID0+XG5cdFx0XHRAc2hvcnQueSA9IEBtYXhZXG5cdFx0XHRAc2hvcnQuYW5pbWF0ZSBcblx0XHRcdFx0eTogMFxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdHRpbWU6IDRcblx0XHRcdFx0XHRjdXJ2ZTogXCJzcHJpbmcoMjAwLDIwLDApXCJcblx0XHQjIERpc21pc3MgU2hvcnQgbG9va3Ncblx0XHRAc2hvcnQuZGlzbWlzcyA9ID0+XG5cdFx0XHRAc2hvcnQucmVtb3ZlQ2hpbGQgQHNob3J0Lmljb25cblx0XHRcdEBzaG9ydC5pY29uLnBhcmVudCA9IEBsb25nXG5cdFx0XHRcblx0XHRcdEBzaG9ydC5hbmltYXRlXG5cdFx0XHRcdHk6IEBzaG9ydC55IC0gMjUwXG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOiAuMDdcblx0XHRcdFx0XHRjdXJ2ZTogXCJzcHJpbmcoNTAwLDUwLDApXCJcblx0XHRcdEBzaG9ydC5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsID0+IEBzaG9ydC5kZXN0cm95KClcblx0XHRcdFx0XG5cdFx0XHRAc2hvcnQuaWNvbi5hbmltYXRlXG5cdFx0XHRcdHg6IC0zMiwgeTogLTQ5XG5cdCMgXHRcdFx0eDogMjIsIHk6IDVcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOiAuNFxuXHRcdFx0XHRcdGN1cnZlOiBcInNwcmluZygyMDAsMjAsMClcIlxuXHRcdFx0XHRcdFxuXHRcdFx0QHNob3J0Lmljb24uYW5pbWF0ZVxuXHRcdFx0XHRzY2FsZTogODgvQHNob3J0Lmljb24ud2lkdGhcblx0IyBcdFx0XHR3aWR0aDogODgsIGhlaWdodDogODhcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOiAuNDZcblx0XHRcdFx0XHRjdXJ2ZTogXCJlYXNlLWluLW91dFwiXG5cdFx0XHRcdFx0XG5cdFx0IyBTaG93IExvbmcgbG9va3Ncblx0XHRAbG9uZy5zaG93ID0gPT5cblx0XHRcdEBsb25nLnZpc2libGUgPSB0cnVlXG5cdFx0XHRAbG9uZy5jb250ZW50LnkgPSBAbWF4WVxuXHRcdFx0XG5cdFx0XHRAbG9uZy5jb250ZW50LmFuaW1hdGVcblx0XHRcdFx0eTogQGxvbmcuY29udGVudEluc2V0LnRvcFxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdHRpbWU6IDFcblx0XHRcdFx0XHRjdXJ2ZTogXCJzcHJpbmcoMjAwLDIwLDApXCJcblx0XHRcdFx0XHRcblx0XHRcdEBsb25nLnRpbWUub3BhY2l0eSA9IDBcblx0XHRcdEBsb25nLnRpbWUuYW5pbWF0ZSBcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdHRpbWU6IDFcblx0XHRcdFxuXHRcdFx0IyBFdmVudCA6IEFuaW1hdGlvbiBlbmRcblx0XHRcdEBsb25nLmNvbnRlbnQub25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PlxuXHRcdFx0XHQjIEV2ZW50IDogU2Nyb2xsXG5cdFx0XHRcdEBzaG9ydC5pY29uLnN0YXJ0WSA9IEBzaG9ydC5pY29uLnlcblx0XHRcdFx0QGxvbmcudGltZS5zdGFydFkgPSBAbG9uZy50aW1lLnlcblx0XHRcdFx0QGxvbmcuY29uZmlybS5zdGFydFkgPSBAbG9uZy5jb25maXJtLnlcblx0XHRcdFx0QGxvbmcub25Nb3ZlID0+XG5cdFx0XHRcdFx0cG9zWSA9IEBsb25nLnNjcm9sbFlcblx0XHRcdFx0XHRAc2hvcnQuaWNvbi55ID0gQHNob3J0Lmljb24uc3RhcnRZIC0gcG9zWVxuXG5cdFx0XHRcdFx0IyBwcmludCBwb3NZXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0QGxvbmcudGltZS55ID0gQGxvbmcudGltZS5zdGFydFkgLSBwb3NZXG5cdFx0XHRcdFx0aWYgcG9zWSA8IDAgdGhlbiBAbG9uZy50aW1lLnkgPSBAbG9uZy50aW1lLnN0YXJ0WVxuXHRcdFx0XHRcdEBsb25nLnRpbWUub3BhY2l0eSA9IDEgKyAocG9zWSAvIDQwKVxuXG5cdFx0XHRcdFx0QGxvbmcuY29uZmlybS55ID0gQGxvbmcuY29uZmlybS5zdGFydFkgLSBwb3NZXG5cdFx0XHRcdFx0aWYgQGxvbmcuY29uZmlybS5zdGFydFkgLSBwb3NZIDwgMFxuXHRcdFx0XHRcdFx0QGxvbmcuY29uZmlybS5jaGFuZ2VNb2RlIGZhbHNlXG5cdFx0XHRcdFx0ZWxzZSBcblx0XHRcdFx0XHRcdEBsb25nLmNvbmZpcm0uY2hhbmdlTW9kZSB0cnVlXG5cblx0XHRcdFx0QGxvbmcub25TY3JvbGxFbmQgPT5cblx0XHRcdFx0XHRAY2xvc2UoKSBpZiBAbG9uZy5jb25maXJtLmlzQ2hhbmdlTW9kZVxuXG5cdFx0XHRcdCMgRXZlbnQgOiBBY3Rpb24gYnV0dG9uc1xuXHRcdFx0XHRmb3IgYnV0dG9uIGluIEBsb25nLmJ1dHRvbnNcblx0XHRcdFx0XHRidXR0b24ub25DbGljayA9PiBAZGlzbWlzcygpIFxuXHRcdFxuXHRcdCMgRGlzbWlzcyBMb25nIGxvb2tzXG5cdFx0QGxvbmcuZGlzbWlzcyA9ID0+XG5cdFx0XHRAbG9uZy5hbmltYXRlXG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOiAuM1xuXHRcdFx0XHRcdGN1cnZlOiBcImVhc2VcIlxuXG5cdFx0QGxvbmcuY2xvc2UgPSA9PlxuXHRcdFx0QGxvbmcuY29udGVudC5kcmFnZ2FibGUuYW5pbWF0ZVN0b3AoKVxuXHRcdFx0QGxvbmcuY29udGVudC5hbmltYXRlU3RvcCgpXG5cdFx0XHRAbG9uZy5jb250ZW50LmFuaW1hdGUgeTogQG1heFkgKiAxLjMsIG9wdGlvbnM6IHsgdGltZTogLjE1LCBjdXJ2ZTogXCJzcHJpbmcoNTAwLDUwLDApXCIgfVxuXHRcdFx0XG5cdFx0IyDslYzrprwgXG5cdFx0QHNob3coKVxuXG5cdCMgU2hvd1xuXHRzaG93OiAtPlxuXHRcdEBicmluZ1RvRnJvbnQoKVxuXHRcdEBiZy5zaG93KClcblx0XHRAc2hvcnQuc2hvdygpXG5cdFx0XG5cdFx0VXRpbHMuZGVsYXkgMS4zLCA9PlxuXHRcdFx0QHNob3J0LmRpc21pc3MoKVxuXHRcdFx0QGxvbmcuc2hvdygpXG5cdFx0XHRcblx0IyBEaXNtaXNzXG5cdGRpc21pc3M6IC0+XG5cdFx0QGJnLmRpc21pc3MoKVxuXHRcdEBsb25nLmRpc21pc3MoKVxuXHRcdFxuXHRcdFV0aWxzLmRlbGF5IDEuMywgPT4gQGRlc3Ryb3koKVxuXG5cdCMgQ2xvc2Vcblx0Y2xvc2U6IC0+XG5cdFx0QGJnLmRpc21pc3MoKVxuXHRcdEBsb25nLmNsb3NlKClcblxuXHRcdFV0aWxzLmRlbGF5IC4zLCA9PiBAZGVzdHJveSgpXG5cblx0IyDrsoTtirwg7IOd7ISxIFxuXHRjcmVhdGVBY3Rpb25CdXR0b24gPSAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMubGFiZWwgPz0gXCJBY3Rpb25cIlxuXHRcdG9wdGlvbnMuc3R5bGUgPz0gQnV0dG9uLlN0eWxlLkRlZmF1bHRcblx0XHRvcHRpb25zLmJnQ29sb3IgPz0gXCJyZ2JhKDI0MiwyNDQsMjU1LC4xNClcIlxuXHRcdG9wdGlvbnMubGFiZWxDb2xvciA/PSBcIndoaXRlXCJcblx0XHRvcHRpb25zLmlzSGFwdGljID89IGZhbHNlXG5cdFx0XG5cdFx0bGFiZWwgPSBvcHRpb25zLmxhYmVsXG5cdFx0c3R5bGUgPSBvcHRpb25zLnN0eWxlXG5cdFx0YmdDb2xvciA9IG9wdGlvbnMuYmdDb2xvclxuXHRcdGxhYmVsQ29sb3IgPSBvcHRpb25zLmxhYmVsQ29sb3Jcblx0XHRpc0hhcHRpYyA9IG9wdGlvbnMuaXNIYXB0aWNcblxuXHRcdCMg67KE7Yq8XG5cdFx0YnV0dG9uID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5ub3RpZmljYXRpb24uYnV0dG9uLSN7bGFiZWx9XCJcblx0XHRcdHg6IEFsaWduLmxlZnQoMilcblx0XHRcdHdpZHRoOiAzMDgsIGhlaWdodDogODBcblx0XHRcdGh0bWw6IGxhYmVsXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0Zm9udFNpemU6IFwiMzJweFwiLCBmb250V2VpZ2h0OiA0MDAsIGxpbmVIZWlnaHQ6IFwiODBweFwiXG5cdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0XHRsZXR0ZXJTcGFjaW5nOiBcIi0wLjFweFwiXG5cdFx0XHRjb2xvcjogaWYgc3R5bGUgaXMgQnV0dG9uLlN0eWxlLkRlc3RydWN0aXZlIHRoZW4gXCIjRkYzQjMwXCIgZWxzZSBsYWJlbENvbG9yXG5cdFx0XHRib3JkZXJSYWRpdXM6IDE1XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGJnQ29sb3Jcblx0XHQjIOuyhO2KvCA6IOyDge2DnFxuXHRcdGJ1dHRvbi5zdGF0ZXMgPVxuXHRcdFx0cHJlc3NlZDogXG5cdFx0XHRcdHNjYWxlOiAuOTVcblx0XHRcdFx0b3BhY2l0eTogLjhcblx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0XHR0aW1lOiAuMTVcblx0XHRcdFx0XHRjdXJ2ZTogXCJzcHJpbmcoNTAwLDUwLDApXCJcblx0XHRcdG5vcm1hbDpcblx0XHRcdFx0c2NhbGU6IDFcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHRcdHRpbWU6IC4yMFxuXHRcdFx0XHRcdGN1cnZlOiBcInNwcmluZyg1MDAsNTAsMClcIlxuXHRcdFxuXHRcdCMg67KE7Yq8IO2aqOqzvFxuXHRcdGJ1dHRvbi5vbk1vdXNlRG93biAtPiBAYW5pbWF0ZSBcInByZXNzZWRcIlxuXHRcdGJ1dHRvbi5vbk1vdXNlVXAgLT4gQGFuaW1hdGUgXCJub3JtYWxcIlxuXHRcdGJ1dHRvbi5vbk1vdXNlT3V0IC0+IEBhbmltYXRlIFwibm9ybWFsXCJcblx0XHRidXR0b24ub25UYXAgLT4gRGV2aWNlLnBsYXlIYXB0aWMoKSBpZiBpc0hhcHRpY1xuXHRcdFxuXHRcdHJldHVybiBidXR0b25cblxuXHQjIOuplOyLnOyngCDsg53shLFcblx0Y3JlYXRlTWVzc2FnZSA9IChvcHRpb25zID0ge30pIC0+XG5cdFx0IyDsu6jthZDsuKBcblx0XHRjb250ZW50ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5ub3RpZmljYXRpb24uY29udGVudFwiXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDIpXG5cdFx0XHR3aWR0aDogMzA4LCBoZWlnaHQ6IDIzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcHRpb25zLmJnQ29sb3Jcblx0XHRcdGJvcmRlclJhZGl1czogMTVcblx0XHRcdFxuXHRcdCMg7Zek642UXG5cdFx0Y29udGVudC5oZWFkZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmhlYWRlclwiXG5cdFx0XHR3aWR0aDogY29udGVudC53aWR0aCwgaGVpZ2h0OiA2MFxuXHRcdFx0aHRtbDogb3B0aW9ucy5hcHBOYW1lXG5cdFx0XHRzdHlsZTogXG5cdFx0XHRcdGZvbnRTaXplOiBcIjI4cHhcIiwgZm9udFdlaWdodDogNDAwLCBsaW5lSGVpZ2h0OiBcIjM0cHhcIlxuXHRcdFx0XHRsZXR0ZXJTcGFjaW5nOiBcIjAuNXB4XCJcblx0XHRcdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcblx0XHRcdFx0cGFkZGluZzogXCIxMnB4IDIxcHggMTRweCAwcHhcIlxuXHRcdFx0XHR0ZXh0VHJhbnNmb3JtOiBcInVwcGVyY2FzZVwiXG5cdFx0XHRcdGJvcmRlclJhZGl1czogXCIxNXB4IDE1cHggMHB4IDBweFwiXG5cdFx0XHRjb2xvcjogb3B0aW9ucy5zYXNoTGFiZWxDb2xvclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcHRpb25zLnNhc2hDb2xvclxuXHRcdFx0cGFyZW50OiBjb250ZW50XG5cdFx0XG5cdFx0IyDtg4DsnbTti4Bcblx0XHRjb250ZW50LnRpdGxlID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi50aXRsZVwiXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDE1KSwgeTogY29udGVudC5oZWFkZXIubWF4WSArIDI1XG5cdFx0XHR3aWR0aDogMjc4XG5cdFx0XHRodG1sOiBvcHRpb25zLnRpdGxlXG5cdFx0XHRzdHlsZTogZm9udFNpemU6IFwiMzJweFwiLCBmb250V2VpZ2h0OiA2MDAsIGxpbmVIZWlnaHQ6IDFcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBjb250ZW50XG5cdFx0VXRpbC50ZXh0LmF1dG9TaXplIGNvbnRlbnQudGl0bGUsIHt9LCB7IHdpZHRoOiBjb250ZW50LnRpdGxlLndpZHRoIH1cblx0XHRcblx0XHQjIOuplOyLnOyngFxuXHRcdGNvbnRlbnQubWVzc2FnZSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIubWVzc2FnZVwiXG5cdFx0XHR4OiBjb250ZW50LnRpdGxlLm1pblgsIHk6IGNvbnRlbnQudGl0bGUubWF4WSArIDJcblx0XHRcdHdpZHRoOiBjb250ZW50LnRpdGxlLndpZHRoXG5cdFx0XHRodG1sOiBvcHRpb25zLm1lc3NhZ2Vcblx0XHRcdHN0eWxlOiBcblx0XHRcdFx0Zm9udFNpemU6IFwiMzJweFwiLCBmb250V2VpZ2h0OiA0MDAsIGxpbmVIZWlnaHQ6IFwiMzdweFwiXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IFwiLTAuMnB4XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBjb250ZW50XG5cdFx0VXRpbC50ZXh0LmF1dG9TaXplIGNvbnRlbnQubWVzc2FnZSwge30sIHsgd2lkdGg6IGNvbnRlbnQubWVzc2FnZS53aWR0aCB9XG5cblx0XHQjIOy2lOqwgOuCtOyaqVxuXHRcdGlmIG9wdGlvbnMuYXR0YWNoXG5cdFx0XHRjb250ZW50LmF0dGFjaCA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiBcIi5hdHRhY2hcIlxuXHRcdFx0XHR4OiBjb250ZW50Lm1lc3NhZ2UueCwgeTogY29udGVudC5tZXNzYWdlLm1heFkgKyAyXG5cdFx0XHRcdHdpZHRoOiBjb250ZW50Lm1lc3NhZ2Uud2lkdGhcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRcdHBhcmVudDogY29udGVudFxuXHRcdFx0Y29udGVudC5hdHRhY2guYWRkQ2hpbGQgb3B0aW9ucy5hdHRhY2hcblx0XHRcdG9wdGlvbnMuYXR0YWNoLnBvaW50ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRjb250ZW50LmF0dGFjaC5oZWlnaHQgPSBjb250ZW50LmF0dGFjaC5jb250ZW50RnJhbWUoKS55ICsgY29udGVudC5hdHRhY2guY29udGVudEZyYW1lKCkuaGVpZ2h0XG5cdFx0XG5cdFx0IyDsu6jthZDsuKAg64aS7J20IOyhsOyglSA6IO2VmOuLqCDsl6zrsLEg7LaU6rCAXG5cdFx0Y29udGVudC5oZWlnaHQgPSBjb250ZW50LmNvbnRlbnRGcmFtZSgpLmhlaWdodCArIDMzXG5cdFx0XG5cdFx0cmV0dXJuIGNvbnRlbnQiLCInJydcbndhdGNoT1MgOiBEb2Nrc1xuXG5AYXV0aGVyIGhvLnNcbkBzaW5jZSAyMDE2LjExLjIzXG4nJydcbmNsYXNzIGV4cG9ydHMuRG9ja3MgZXh0ZW5kcyBMYXllclxuXG5cdCMgQmFzaWMgYXBwc1xuXHRhcHBzSW5mbyA9IFtcblx0XHR7IG5hbWU6IFwi66mU7Iuc7KeAXCIsIGljb246IFwiaW1hZ2VzL2ljX21lc3NhZ2VzLnBuZ1wiLCBpbWFnZTogXCJpbWFnZXMvbWVzc2FnZXMucG5nXCIgfVxuXHRcdHsgbmFtZTogXCLsupjrprDrjZRcIiwgaWNvbjogXCJpbWFnZXMvaWNfY2FsZW5kYXIucG5nXCIsIGltYWdlOiBcImltYWdlcy9jYWxlbmRhci5wbmdcIiB9XG5cdFx0eyBuYW1lOiBcIu2DgOydtOuouFwiLCBpY29uOiBcImltYWdlcy9pY19zdG9wd2F0Y2gucG5nXCIsIGltYWdlOiBcImltYWdlcy9zdG9wd2F0Y2gucG5nXCIgfVxuXHRcdHsgbmFtZTogXCLsp4Drj4RcIiwgaWNvbjogXCJpbWFnZXMvaWNfbWFwcy5wbmdcIiwgaW1hZ2U6IFwiaW1hZ2VzL21hcHMucG5nXCIgfVxuXHRcdHsgbmFtZTogXCLsmrTrj5lcIiwgaWNvbjogXCJpbWFnZXMvaWNfd29ya291dC5wbmdcIiwgaW1hZ2U6IFwiaW1hZ2VzL3dvcmtvdXQucG5nXCIgfVxuXHRcdHsgbmFtZTogXCLrgqDslKhcIiwgaWNvbjogXCJpbWFnZXMvaWNfd2VhdGhlci5wbmdcIiwgaW1hZ2U6IFwiaW1hZ2VzL3dlYXRoZXIucG5nXCIgfVxuXHRcdHsgbmFtZTogXCLsnYzslYVcIiwgaWNvbjogXCJpbWFnZXMvaWNfbXVzaWMucG5nXCIsIGltYWdlOiBcImltYWdlcy9tdXNpYy5wbmdcIiB9XG5cdF1cblx0XHRcblx0IyBDb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLm5hbWUgPSBcIkRvY2tzXCJcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgyNTUsMjU1LDI1NSwuMilcIlxuXHRcdG9wdGlvbnMub3BhY2l0eSA9IDBcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHQjXG5cdFx0VXRpbC5ibHVyIEBcblx0XHRAb25DbGljayAtPiBjb25zb2xlLmxvZyBcImJsb2NrXCJcblx0XHRAc2VuZFRvQmFjaygpXG5cdFx0XG5cdFx0IyBQYWdlXHRcblx0XHRAcGFnZSA9IG5ldyBQYWdlQ29tcG9uZW50XG5cdFx0XHRuYW1lOiBcInBhZ2VcIlxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2Vcblx0XHRcdGNsaXA6IGZhbHNlXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcblx0XHQjIFBhZ2UgOiBJbmRpY2F0b3Jcblx0XHRAcGFnZS5pbmRpY2F0b3IgPSBuZXcgSW5kaWNhdG9yIHBhZ2U6IEBwYWdlXG5cblx0XHQjIFBhZ2UgOiBEb2NrXG5cdFx0Zm9yIGFwcEluZm8gaW4gYXBwc0luZm9cblx0XHRcdGRvY2sgPSBuZXcgRG9jayB3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IEBoZWlnaHQsIGluZm86IGFwcEluZm9cblx0XHRcdEBwYWdlLmFkZFBhZ2UgZG9ja1xuXHRcdFx0ZG9jay5vbkNsaWNrID0+IEBzZWxlY3RlZCgpXG5cblx0XHQjIFBhZ2UgOiBMYWJlbFxuXHRcdEBwYWdlLmxhYmVsID0gbmV3IExhYmVsXHRwYWdlOiBAcGFnZVxuXHRcdFxuXHRcdCMg6riw67O4IO2OmOydtOyngCA6IOyyq+uyiOynuFxuXHRcdEBwYWdlLnNuYXBUb1BhZ2UgQHBhZ2UuY29udGVudC5jaGlsZHJlblswXSwgZmFsc2Vcblx0XHRcblx0IyBTaG93XG5cdHNob3c6IC0+XG5cdFx0QGFuaW1hdGVTdG9wKClcblx0XHRAYnJpbmdUb0Zyb250KClcblx0XHRAb3BhY2l0eSA9IDFcblx0XHRAcGFnZS5hbmltYXRlIHk6IDUsIHNjYWxlOiAyODEgLyBAaGVpZ2h0XG5cblx0XHRwYWdlLnNob3coKSBmb3IgcGFnZSwgaSBpbiBAcGFnZS5jb250ZW50LmNoaWxkcmVuXG5cblx0IyBEaXNtaXNzXG5cdGRpc21pc3M6IChmb3JjZUNsb3NlID0gZmFsc2UpIC0+XG5cdFx0cmV0dXJuIGlmIEBpc0FuaW1hdGluZ1xuXG5cdFx0IyBGb3JjZSBjbG9zZVxuXHRcdGlmIGZvcmNlQ2xvc2UgdGhlbiBAY2xvc2UoKVxuXHRcdGVsc2Vcblx0XHRcdCMgRXhpc3Qgc2VsZWN0IGRvY2tcblx0XHRcdGlmIEBzZWxlY3REb2NrXG5cdFx0XHRcdCMgU2VsZWN0IG1vZGVcblx0XHRcdFx0aWYgQHBhZ2Uuc2NhbGUgaXMgMSB0aGVuIEBzaG93KClcblx0XHRcdFx0IyBTZWxlY3RlZFxuXHRcdFx0XHRlbHNlIEBzZWxlY3RlZCgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdCMgRXhzaXQgcmVjZW50IGRvY2tcblx0XHRcdFx0aWYgQHJlY2VudERvY2tcblx0XHRcdFx0XHQjIEN1cnJlbnQgcGFnZSBpcyByZWNlbnQgZG9ja1xuXHRcdFx0XHRcdGlmIEBwYWdlLmN1cnJlbnRQYWdlIGlzIEByZWNlbnREb2NrIHRoZW4gQHNlbGVjdGVkKClcblx0XHRcdFx0XHRlbHNlIFxuXHRcdFx0XHRcdFx0QHBhZ2Uuc25hcFRvUGFnZSBAcmVjZW50RG9jaywgdHJ1ZSwgdGltZTogLjE1XG5cdFx0XHRcdFx0XHRAcGFnZS5jb250ZW50Lm9uY2UgRXZlbnRzLkFuaW1hdGlvbkVuZCwgPT4gQHNlbGVjdGVkKClcblx0XHRcdFx0ZWxzZSBAY2xvc2UoKVxuXG5cdCMgQ2xvc2Vcblx0Y2xvc2U6IC0+XG5cdFx0QGFuaW1hdGUgb3BhY2l0eTogMFxuXHRcdEBwYWdlLmFuaW1hdGUgeTogMCwgc2NhbGU6IDFcblxuXHRcdHBhZ2UuZGVmYXVsdCgpIGZvciBwYWdlLCBpIGluIEBwYWdlLmNvbnRlbnQuY2hpbGRyZW5cblx0XHRcblx0XHRAb25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCAtPiBcblx0XHRcdEBzZW5kVG9CYWNrKCkgaWYgQG9wYWNpdHkgaXMgMFxuXG5cdFx0QHNlbGVjdERvY2sgPSB1bmRlZmluZWRcblx0XHRcdFx0XG5cdCMgU2VsZWN0ZWRcdFxuXHRzZWxlY3RlZDogLT5cblx0XHRyZXR1cm4gaWYgQHBhZ2UuaXNBbmltYXRpbmdcblxuXHRcdEBwYWdlLmFuaW1hdGUgeTogMCwgc2NhbGU6IDFcblx0XHRAc2VsZWN0RG9jayA9IEBwYWdlLmN1cnJlbnRQYWdlXG5cdFx0QHNlbGVjdERvY2suc2VsZWN0ZWQoKVxuXG5cdFx0IyBFeHNpdCByZWNlbnQgZG9ja1xuXHRcdGlmIEByZWNlbnREb2NrIGFuZCBAc2VsZWN0RG9jayBpcyBAcmVjZW50RG9ja1xuXHRcdFx0QHBhZ2Uub25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PlxuXHRcdFx0XHRAc2VuZFRvQmFjaygpXG5cdFx0XHRcdEByZW1vdmVEb2NrIEByZWNlbnREb2NrXG5cdFx0XHRcdEByZWNlbnREb2NrID0gdW5kZWZpbmVkXG5cblx0IyBBZGQgcmVjZW50IGRvY2tcblx0YWRkUmVjZW50RG9jazogKGFwcEluZm8pIC0+XG5cdFx0aWYgQHJlY2VudERvY2sgdGhlbiBAcmVjZW50RG9jay5hZGRDb250ZW50IGFwcEluZm8uYXBwXG5cdFx0ZWxzZVxuXHRcdFx0QHJlY2VudERvY2sgPSBuZXcgRG9jayB3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IEBoZWlnaHQsIGluZm86IGFwcEluZm9cblx0XHRcdEBwYWdlLmFkZFBhZ2UgQHJlY2VudERvY2tcblx0XHRcdEByZWNlbnREb2NrLm9uQ2xpY2sgKGV2ZW50KSA9PiBAc2VsZWN0ZWQoKVxuXHRcdFx0XHRcblx0XHRAcGFnZS5zbmFwVG9QYWdlIEByZWNlbnREb2NrLCBmYWxzZVxuXHRcdEBzaG93KClcblxuXHQjIFJlbW92ZSBkb2NrXG5cdHJlbW92ZURvY2s6IChsYXllcikgLT5cblx0XHRAcGFnZS5jb250ZW50LnJlbW92ZUNoaWxkIGxheWVyXG5cdFx0QHBhZ2UudXBkYXRlQ29udGVudCgpXG5cblx0XHQjIFNuYXAgbGFzdCBkb2NrXG5cdFx0QHBhZ2Uuc25hcFRvUGFnZSBAcGFnZS5jb250ZW50LmNoaWxkcmVuW18uc2l6ZShAcGFnZS5jb250ZW50LmNoaWxkcmVuKSAtIDFdLCBmYWxzZVxuXG5cdFx0IyBVcGRhdGUgbGFiZWxcblx0XHRAcGFnZS5sYWJlbC51cGRhdGVDb250ZW50KClcblx0XHQjIFVwZGF0ZSBpbmRpY2F0b3Jcblx0XHRAcGFnZS5pbmRpY2F0b3IudXBkYXRlQ29udGVudCgpXG5cdFx0XG5cbiMgTGFiZWxcbmNsYXNzIExhYmVsIGV4dGVuZHMgTGF5ZXJcblx0IyBDb25zdHVyY3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLm5hbWUgPz0gXCJsYWJlbFwiXG5cdFx0b3B0aW9ucy5odG1sID89IFwi66mU7Iuc7KeAXCJcblx0XHRvcHRpb25zLnN0eWxlID0gXG5cdFx0XHRmb250U2l6ZTogXCI0MXB4XCIsIGZvbnRXZWlnaHQ6IFwiNDAwXCJcblx0XHRcdGxpbmVIZWlnaHQ6IFwiMVwiXG5cdFx0XHRwYWRkaW5nTGVmdDogXCI3MnB4XCJcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBcIlwiXG5cdFx0b3B0aW9ucy5wYXJlbnQgPSBvcHRpb25zLnBhZ2Vcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAcGFnZSA9IG9wdGlvbnMucGFnZVxuXG5cdFx0VXRpbC50ZXh0LmF1dG9TaXplIEBcblx0XHRAcHJvcHMgPSB4OiBBbGlnbi5jZW50ZXIsIG1heFk6IC05LjdcblxuXHRcdCMgSWNvblxuXHRcdEBpY29uID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5pY29uXCJcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0c2l6ZTogNTguM1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiAzMFxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHQjIEV2ZW50c1xuXHRcdEBwYWdlLm9uIFwiY2hhbmdlOmN1cnJlbnRQYWdlXCIsID0+IEB1cGRhdGVDb250ZW50KClcblxuXHRcdCNcblx0XHRAdXBkYXRlQ29udGVudCgpXG5cdFxuXHQjIFVwZGF0ZVx0XG5cdHVwZGF0ZUNvbnRlbnQ6IC0+XG5cdFx0Y3VycmVudFBhZ2UgPSBAcGFnZS5jdXJyZW50UGFnZVxuXG5cdFx0QGh0bWwgPSBjdXJyZW50UGFnZS5uYW1lXG5cdFx0VXRpbC50ZXh0LmF1dG9TaXplIEBcblx0XHRAY2VudGVyWCgpXG5cdFx0QGljb24uaW1hZ2UgPSBjdXJyZW50UGFnZS5pY29uXG5cbiMgSW5kaWNhdG9yXG5jbGFzcyBJbmRpY2F0b3IgZXh0ZW5kcyBMYXllclxuXHQjIENvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMubmFtZSA9IFwiSW5kaWNhdG9yXCJcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IFwiXCJcblx0XHRvcHRpb25zLnBhcmVudCA9IG9wdGlvbnMucGFnZVxuXHRcdG9wdGlvbnMueSA/PSBvcHRpb25zLnBhZ2UubWF4WSArIDIyXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0QHBhZ2UgPSBvcHRpb25zLnBhZ2VcblxuXHRcdEBwYWdlLm9uIFwiY2hhbmdlOmN1cnJlbnRQYWdlXCIsID0+IEBjaGFuZ2VEb3RTdGF0ZSgpXHRcdFx0XG5cdFx0QHBhZ2UuY29udGVudC5vbiBcImNoYW5nZTpjaGlsZHJlblwiLCA9PiBAdXBkYXRlQ29udGVudCgpXG5cdFxuXHQjIFVwZGF0ZVxuXHR1cGRhdGVDb250ZW50OiAtPlxuXHRcdGNoaWxkLmRlc3Ryb3koKSBmb3IgY2hpbGQgaW4gQGNoaWxkcmVuXG5cdFx0Zm9yIGNoaWxkLCBpIGluIEBwYWdlLmNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdGRvdCA9IGNyZWF0ZURvdCgpXG5cdFx0XHRkb3QueCArPSBAY29udGVudEZyYW1lKCkud2lkdGggKyA4IHVubGVzcyBpIGlzIDBcblx0XHRcdEBhZGRDaGlsZCBkb3RcblxuXHRcdEBzaXplID0gQGNvbnRlbnRGcmFtZSgpXG5cdFx0QHByb3BzID0geDogQWxpZ24uY2VudGVyKClcblxuXHRcdEBjaGFuZ2VEb3RTdGF0ZSBmYWxzZVxuXG5cdCMgQ2hhbmdlIGRvdCBzdGF0ZVxuXHRjaGFuZ2VEb3RTdGF0ZTogKGFuaW1hdGU9dHJ1ZSkgLT5cblx0XHRjdXJyZW50UGFnZSA9IEBwYWdlLmN1cnJlbnRQYWdlXG5cdFx0cGFnZUluZGV4ID0gQHBhZ2UuaG9yaXpvbnRhbFBhZ2VJbmRleCBjdXJyZW50UGFnZVxuXG5cdFx0aWYgYW5pbWF0ZVxuXHRcdFx0Zm9yIGRvdCwgaSBpbiBAY2hpbGRyZW5cblx0XHRcdFx0ZG90LmFuaW1hdGUgaWYgaSBpcyBwYWdlSW5kZXggdGhlbiBcInNlbGVjdGVkXCIgZWxzZSBcIm5vcm1hbFwiXG5cdFx0ZWxzZSBcblx0XHRcdGZvciBkb3QsIGkgaW4gQGNoaWxkcmVuXG5cdFx0XHRcdGRvdC5zdGF0ZVN3aXRjaCBpZiBpIGlzIHBhZ2VJbmRleCB0aGVuIFwic2VsZWN0ZWRcIiBlbHNlIFwibm9ybWFsXCJcblxuXHQjIENyZWF0ZSBkb3RcdFxuXHRjcmVhdGVEb3QgPSAob3B0aW9ucz17fSkgLT5cblx0XHRkb3QgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmluZGljYXRvci5kb3RcIlxuXHRcdFx0c2l6ZTogMTMuODc5XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRcdFx0b3BhY2l0eTogLjM1XG5cdFx0XHRib3JkZXJSYWRpdXM6IDEwXG5cblx0XHRkb3Quc3RhdGVzID1cblx0XHRcdHNlbGVjdGVkOiBzY2FsZTogMS4yLCBvcGFjaXR5OiAxLCBvcHRpb25zOiB7IHRpbWU6IC4xNSB9XG5cdFx0XHRub3JtYWw6IHNjYWxlOiAxLCBvcGFjaXR5OiAuMzUsIG9wdGlvbnM6IHsgdGltZTogLjIgfVxuXHRcdFx0XG5cdFx0cmV0dXJuIGRvdFxuXG4jIERvY2sgYXBwc1xuY2xhc3MgRG9jayBleHRlbmRzIExheWVyXG5cdCMgQ29uc3RydWN0b3Jcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPSBcImJsYWNrXCJcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHQjXG5cdFx0QGluZm8gPSBvcHRpb25zLmluZm9cblx0XHRAbmFtZSA9IEBpbmZvLm5hbWVcblx0XHRAaWNvbiA9IEBpbmZvLmljb25cblxuXHRcdCMgQ29udGVudHNcblx0XHRAY29udGVudCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuY29udGVudFwiXG5cdFx0XHR3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0Y2xpcDogdHJ1ZVxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRpZiBAaW5mby5pbWFnZVxuXHRcdFx0QGNvbnRlbnQuaW1hZ2UgPSBAaW5mby5pbWFnZVxuXHRcdFx0QGNvbnRlbnQudGltZSA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiBcIi5jb250ZW50LnRpbWVcIlxuXHRcdFx0XHR5OiAzXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMzhcblx0XHRcdFx0aHRtbDogVXRpbC5kYXRlLnRpbWVGb3JtYXR0ZXIgVXRpbC5kYXRlLmdldFRpbWUoKVxuXHRcdFx0XHRzdHlsZTogXG5cdFx0XHRcdFx0Zm9udFNpemU6IFwiMzJweFwiLCBmb250V2VpZ2h0OiBcIjYwMFwiXG5cdFx0XHRcdFx0bGluZUhlaWdodDogXCIzOHB4XCJcblx0XHRcdFx0XHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuXHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0XHRwYXJlbnQ6IEBjb250ZW50XG5cblx0XHRpZiBAaW5mby5hcHBcblx0XHRcdEBhZGRDb250ZW50XHRAaW5mby5hcHBcblxuXHQjIEFkZCBjb250ZW50XG5cdGFkZENvbnRlbnQ6IChsYXllcikgLT4gXG5cdFx0QGNvbnRlbnQuYWRkQ2hpbGQgbGF5ZXJcblx0XHRjaGlsZC5pZ25vcmVFdmVudHMgPSB0cnVlIGZvciBjaGlsZCBpbiBsYXllci5kZXNjZW5kYW50c1xuXG5cdHJlbW92ZUNvbnRlbnQ6IChsYXllcikgLT5cblx0XHRAY29udGVudC5yZW1vdmVDaGlsZCBsYXllclxuXHRcdGNoaWxkLmlnbm9yZUV2ZW50cyA9IGZhbHNlIGZvciBjaGlsZCBpbiBsYXllci5kZXNjZW5kYW50c1xuXHRcdFxuXHQjIFNob3dcblx0c2hvdzogLT4gXG5cdFx0QGFuaW1hdGUgc2NhbGU6IDI2NSAvIDI4MSwgYm9yZGVyUmFkaXVzOiAxNSwgb3B0aW9uczogeyB0aW1lOiAuMTUgfVxuXHRcdEBjb250ZW50LmFuaW1hdGUgc2NhbGU6IDIzNyAvIDI2NSwgb3B0aW9uczogeyB0aW1lOiAuMTUgfVxuXG5cdFx0aWYgQGluZm8uaW1hZ2Vcblx0XHRcdEBjb250ZW50LnRpbWUuYW5pbWF0ZSBvcGFjaXR5OiAwLCBvcHRpb25zOiB7IHRpbWU6IC4yMCwgZGVsYXk6IC4zIH1cblxuXHRcdEBpbmZvLmFwcC50b0RvY2soKSBpZiBAaW5mby5hcHBcblxuXHQjIERlZmF1bHRcblx0ZGVmYXVsdDogLT4gXG5cdFx0QGFuaW1hdGUgc2NhbGU6IDEsIGJvcmRlclJhZGl1czogMCwgb3B0aW9uczogeyB0aW1lOiAuMjUgfVxuXHRcdEBjb250ZW50LmFuaW1hdGUgc2NhbGU6IDEsIG9wdGlvbnM6IHsgdGltZTogLjI1IH1cblxuXHQjIFNlbGVjdGVkXG5cdHNlbGVjdGVkOiAtPlxuXHRcdEBkZWZhdWx0KClcblx0XHRcblx0XHRpZiBAaW5mby5pbWFnZVxuXHRcdFx0QGNvbnRlbnQudGltZS5odG1sID0gVXRpbC5kYXRlLnRpbWVGb3JtYXR0ZXIgVXRpbC5kYXRlLmdldFRpbWUoKVxuXHRcdFx0QGNvbnRlbnQudGltZS5hbmltYXRlIG9wYWNpdHk6IDEsIG9wdGlvbnM6IHsgdGltZTogLjE1LCBkZWxheTogLjIgfVxuXG5cdFx0aWYgQGluZm8uYXBwXG5cdFx0XHRAY29udGVudC5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsID0+XG5cdFx0XHRcdEBpbmZvLmFwcC5mcm9tRG9jaygpXG5cdFx0XHRcdEByZW1vdmVDb250ZW50IEBpbmZvLmFwcFxuXHRcdFx0XHRAZGVzdHJveSgpIiwiJycnXG53YXRjaE9TIDogRGV2aWNlXG5cbkBhdXRoZXIgaG8uc1xuQHNpbmNlIDIwMTYuMTEuMjNcbicnJ1xuY2xhc3MgZXhwb3J0cy5EZXZpY2UgZXh0ZW5kcyBGcmFtZXIuQmFzZUNsYXNzXG5cblx0IyBFdmVudHMgZGVmaW5lZFxuXHRFdmVudHMuRGlnaXRhbENyb3duID0gJ2RpZ2l0YWxDcm93bidcblx0RXZlbnRzLlNpZGUgPSAnc2lkZSdcblxuXHQjIEhhcHRpYyB0eXBlXG5cdEhhcHRpY1R5cGUgPSBcblx0XHROb3RpZmljYXRpb246IFwiaGFwdGljcy1ub3RpZmljYXRpb25cIlxuXHRcdERpcmVjdGlvblVwOiBcImhhcHRpY3MtZGlyZWN0aW9uVXBcIlxuXHRcdERpcmVjdGlvbkRvd246IFwiaGFwdGljcy1kaXJlY3Rpb25Eb3duXCJcblx0XHRTdWNjZXNzOiBcImhhcHRpY3Mtc3VjY2Vzc1wiXG5cdFx0RmFpbHVyZTogXCJoYXB0aWNzLWZhaWx1cmVcIlxuXHRcdFJldHJ5OiBcImhhcHRpY3MtcmV0cnlcIlxuXHRcdFN0YXJ0OiBcImhhcHRpY3Mtc3RhcnRcIlxuXHRcdFN0b3A6IFwiaGFwdGljcy1zdG9wXCJcblx0XHRDbGljazogXCJoYXB0aWNzLWNsaWNrXCJcblxuXHRAZGVmaW5lIFwiSGFwdGljVHlwZVwiLCBAc2ltcGxlUHJvcGVydHkoXCJIYXB0aWNUeXBlXCIsIEhhcHRpY1R5cGUpXG5cblx0IyB0aGlzLkhhcHRpY1R5cGUgPSBIYXB0aWNUeXBlXG5cblx0IyBEZXZpY2UgOiBBcHBsZSBXYXRjaCA0Mm1tXG5cdEBkZWZpbmUgXCJ3aWR0aFwiLCBAc2ltcGxlUHJvcGVydHkoXCJ3aWR0aFwiLCAzMTIpXG5cdEBkZWZpbmUgXCJoZWlnaHRcIiwgQHNpbXBsZVByb3BlcnR5KFwiaGVpZ2h0XCIsIDM5MClcblx0QGRlZmluZSBcInJhdGlvXCIsIEBzaW1wbGVQcm9wZXJ0eShcInJhdGlvXCIsIHVuZGVmaW5lZClcblxuXHQjIENvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdCNcblx0XHRAcmF0aW8gPSBTY3JlZW4ud2lkdGggLyBAd2lkdGhcblx0XHRGcmFtZXIuRGV2aWNlLmNvbnRlbnRTY2FsZSA9IEByYXRpb1xuXG5cdFx0IyBQaHljaGljYWxcblx0XHRpZiBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUuaW5kZXhPZihcIndhdGNoXCIpIGlzbnQgLTFcblx0XHRcdHg7IHlcblx0XHRcdGlmIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZS5pbmRleE9mKFwiMzhtbVwiKSBpc250IC0xXG5cdFx0XHRcdHggPSAtNTsgeSA9IDg4XG5cdFx0XHRlbHNlIGlmIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZS5pbmRleE9mKFwiNDJtbVwiKSBpc250IC0xXG5cdFx0XHRcdHggPSA1OyB5ID0gMTAwXG5cdFx0XHRcdFx0XG5cdFx0XHQjIERpZ2l0YWwgQ3Jvd25cblx0XHRcdEBkaWdpdGFsQ3Jvd24gPSBuZXcgTGF5ZXJcblx0XHRcdFx0bmFtZTogXCJEaWdpdGFsQ3Jvd25cIlxuXHRcdFx0XHR4OiBBbGlnbi5yaWdodCh4KSwgeTogQWxpZ24uY2VudGVyKC15KVxuXHRcdFx0XHR3aWR0aDogNTAsIGhlaWdodDogMTAwXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwwLDAsMClcIlxuXHRcdFx0XHRwYXJlbnQ6IEZyYW1lci5EZXZpY2UucGhvbmVcblx0XHRcdFx0XG5cdFx0XHQjIFNpZGUgYnV0dG9uXG5cdFx0XHRAc2lkZSA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiBcIlNpZGVcIlxuXHRcdFx0XHR4OiBBbGlnbi5yaWdodCh4LTEzKSwgeTogQWxpZ24uY2VudGVyKHktMjApXG5cdFx0XHRcdHdpZHRoOiAzMiwgaGVpZ2h0OiAxNTBcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LDAsMCwwKVwiXG5cdFx0XHRcdHBhcmVudDogRnJhbWVyLkRldmljZS5waG9uZVxuXG5cdFx0XHRpZiBVdGlscy5pc0Rlc2t0b3AoKSBhbmQgbm90IFV0aWxzLmlzTG9jYWxVcmwoZG9jdW1lbnQuVVJMKVxuXHRcdFx0XHRAZGlnaXRhbENyb3duLmd1aWRlID0gY3JlYXRlR3VpZGUgaHRtbDogXCJEaWdpdGFsIENyb3duXCIsIHBhcmVudDogQGRpZ2l0YWxDcm93blxuXHRcdFx0XHRAc2lkZS5ndWlkZSA9IGNyZWF0ZUd1aWRlIGh0bWw6IFwiU2lkZSBCdXR0b25cIiwgcGFyZW50OiBAc2lkZVxuXHRcdFx0XHRcblx0XHRcdCMg7J2067Kk7Yq4XG5cdFx0XHRAZGlnaXRhbENyb3duLm9uQ2xpY2sgLT4gQGVtaXQgRXZlbnRzLkRpZ2l0YWxDcm93biwgQFxuXHRcdFx0QHNpZGUub25DbGljayAtPiBAZW1pdCBFdmVudHMuU2lkZSwgQFxuXG5cdGNyZWF0ZUd1aWRlID0gKG9wdGlvbnMgPSB7fSktPlxuXHRcdGd1aWRlID0gbmV3IExheWVyIF8uZXh0ZW5kIG9wdGlvbnMsXG5cdFx0XHRuYW1lOiBcIi5ndWlkZVwiXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0Zm9udFdlaWdodDogXCI0MDBcIlxuXHRcdFx0XHRmb250U2l6ZTogXCIyNXB4XCJcblx0XHRcdFx0dGV4dFRyYW5zZm9ybTogXCJ1cHBlcmNhc2VcIlxuXHRcdFx0XHRsZXR0ZXJTcGFjaW5nOiBcIi0xLjVweFwiXG5cdFx0XHRcdHBhZGRpbmdMZWZ0OiBcIjMwcHhcIlxuXHRcdFx0Y29sb3I6IFwiZ3JheVwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcblx0XHRVdGlsLnRleHQuYXV0b1NpemUgZ3VpZGVcblx0XHRndWlkZS5wcm9wcyA9IHg6IGd1aWRlLnBhcmVudC53aWR0aCArIDEwLCB5OiBBbGlnbi5jZW50ZXJcblxuXHRcdGFycm93ID0gbmV3IExheWVyIFxuXHRcdFx0bmFtZTogXCIuYXJyb3dcIlxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRzaXplOiAxNlxuXHRcdFx0cm90YXRpb246IDQ1XG5cdFx0XHRzdHlsZTogXG5cdFx0XHRcdGJvcmRlclN0eWxlOiBcImhpZGRlbiBoaWRkZW4gc29saWQgc29saWRcIlxuXHRcdFx0Ym9yZGVyQ29sb3I6IFwiZ3JheVwiLCBcblx0XHRcdGJvcmRlcldpZHRoOiAzXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcblx0XHRcdHBhcmVudDogZ3VpZGVcblxuXHRcdGFycm93LmxpbmUgPSBuZXcgTGF5ZXJcblx0XHRcdHBvaW50OiBBbGlnbi5jZW50ZXIoMS41KVxuXHRcdFx0d2lkdGg6IDIxLCBoZWlnaHQ6IDNcblx0XHRcdHJvdGF0aW9uOiAtNDVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJncmF5XCJcblx0XHRcdHBhcmVudDogYXJyb3dcblxuXHRcdHJldHVybiBndWlkZVxuXG5cdCMgUGxheSBoYXB0aWMgZmVlZGJhY2tcblx0cGxheUhhcHRpYzogKHR5cGUgPSBIYXB0aWNUeXBlLlN1Y2Nlc3MpIC0+XG5cblx0XHQjIENvdW50XG5cdFx0cmVwZWF0ID0gMFxuXHRcdHN3aXRjaCB0eXBlXG5cdFx0XHR3aGVuIEhhcHRpY1R5cGUuU3VjY2VzcyB0aGVuIHJlcGVhdCA9IDJcblxuXHRcdCMgVGFwXG5cdFx0RnJhbWVyLkRldmljZS5waG9uZS5yb3RhdGlvbiA9IC41XG5cdFx0RnJhbWVyLkRldmljZS5waG9uZS5hbmltYXRlIFxuXHRcdFx0cm90YXRpb246IDAsIFxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogLjFcblx0XHRcdFx0cmVwZWF0OiByZXBlYXRcblx0XHRcdFx0Y3VydmU6IFwic3ByaW5nKDEwMDAsMjAsMClcIlxuXG5cdFx0IyBBdWRpb1xuXHRcdEBwbGF5QXVkaW8gdHlwZVxuXG5cdCMgUGxheSBhdWRpbyBmZWVkYmFja1xuXHRwbGF5QXVkaW86ICh0eXBlKSAtPlxuXHRcdHVubGVzcyBAYXVkaW9MYXllclxuXHRcdFx0QGF1ZGlvTGF5ZXIgPSBuZXcgTGF5ZXIgc2l6ZTogMCwgdmlzaWJsZTogZmFsc2Vcblx0XHRcdEBwbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXVkaW9cIilcblx0XHRcdEBwbGF5ZXIuc2V0QXR0cmlidXRlKFwid2Via2l0LXBsYXlzaW5saW5lXCIsIFwidHJ1ZVwiKVxuXHRcdFx0QHBsYXllci5zZXRBdHRyaWJ1dGUoXCJwcmVsb2FkXCIsIFwiYXV0b1wiKVxuXHRcdFx0QHBsYXllci52b2x1bWUgPz0gMC43NVxuXHRcdFx0QGF1ZGlvTGF5ZXIuX2VsZW1lbnQuYXBwZW5kQ2hpbGQoQHBsYXllcilcblxuXHRcdEBwbGF5ZXIuc3JjID0gXCJhdWRpby8je3R5cGV9Lm1wM1wiXG5cdFx0QHBsYXllci5wbGF5KClcblxuXHQjIOydtOuypO2KuCDtl6ztjbxcblx0b25EaWdpdGFsQ3Jvd246IChjYikgPT4gQGRpZ2l0YWxDcm93bi5vbiBFdmVudHMuRGlnaXRhbENyb3duLCBjYlxuXHRvblNpZGU6IChjYikgPT4gQHNpZGUub24gRXZlbnRzLlNpZGUsIGNiIiwiJycnXG53YXRjaE9TIDogQ2xvY2tGYWNlc1xuXG5AYXV0aGVyIGhvLnNcbkBzaW5jZSAyMDE2LjExLjIzXG4nJydcbmNsYXNzIGV4cG9ydHMuQ2xvY2tGYWNlcyBleHRlbmRzIExheWVyXG5cdCcnJ1xuXHRjb21wbGljYXRpb25zOlxuXHRcdHV0aWxpdGFyaWFuOiBbXVxuXHRcdG1vZHVsYXI6IFtdXG5cdFx0Y2lyY3VsYXI6IFtdXG5cdCcnJ1xuXHQjIENvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMubmFtZSA/PSBcIkNsb2NrRmFjZXNcIlxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IFwiYmxhY2tcIlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdG9wdGlvbnMuY29tcGxpY2F0aW9ucyA/PSB7fVxuXHRcdGNvbXBsaWNhdGlvbnMgPSBfLmRlZmF1bHRzKG9wdGlvbnMuY29tcGxpY2F0aW9ucywge1x0dXRpbGl0YXJpYW46IFtdLCBtb2R1bGFyOiBbXSwgY2lyY3VsYXI6IFtdIH0pXG5cblx0XHQjIFBhZ2Vcblx0XHRAcGFnZSA9IG5ldyBQYWdlQ29tcG9uZW50XG5cdFx0XHRuYW1lOiBcInBhZ2VcIlxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0Y2xpcDogZmFsc2Vcblx0XHRcdHBhcmVudDogQFxuXHRcdEBwYWdlLmNvbnRlbnQuY2xpcCA9IGZhbHNlXG5cdFx0QHBhZ2Uuc3RhdGVzID1cblx0XHRcdGNoYW5nZTogeTogLTEzLCBzY2FsZTogMjg0IC8gQGhlaWdodFxuXHRcdFx0c2VsZWN0ZWQ6IHk6IDAsIHNjYWxlOiAxXG5cblx0XHQjIENsb2NrZmFjZSA6IFV0aWxpdGFyaWFuXG5cdFx0QHV0aWxpdGFyaWFuID0gbmV3IENsb2NrRmFjZSh3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IEBoZWlnaHQpLnV0aWxpdGFyaWFuIGNvbXBsaWNhdGlvbnMudXRpbGl0YXJpYW5cblx0XHQjIENsb2NrZmFjZSA6IE1vZHVsYXJcblx0XHRAbW9kdWxhciA9IG5ldyBDbG9ja0ZhY2Uod2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBAaGVpZ2h0KS5tb2R1bGFyIGNvbXBsaWNhdGlvbnMubW9kdWxhclxuXHRcdCMgQ2xvY2tmYWNlIDogQ2lyY3VsYXJcblx0XHRAY2lyY3VsYXIgPSBuZXcgQ2xvY2tGYWNlKHdpZHRoOiBAd2lkdGgsIGhlaWdodDogQGhlaWdodCkuY2lyY3VsYXIgY29tcGxpY2F0aW9ucy5jaXJjdWxhclxuXG5cdFx0IyBBZGQgcGFnZVxuXHRcdEBwYWdlLmFkZFBhZ2UgQHV0aWxpdGFyaWFuXG5cdFx0QHBhZ2UuYWRkUGFnZSBAbW9kdWxhclxuXHRcdEBwYWdlLmFkZFBhZ2UgQGNpcmN1bGFyXG5cdFx0IyBTbmFwIHBhZ2Vcblx0XHRAcGFnZS5zbmFwVG9QYWdlIEBtb2R1bGFyLCBmYWxzZVxuXG5cdFx0IyBDdXN0b21pemVcblx0XHRAY3VzdG9taXplID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImN1c3RvbWl6ZVwiXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEBwYWdlLm1heFkgKyAxMFxuXHRcdFx0d2lkdGg6IDE1NywgaGVpZ2h0OiA1N1xuXHRcdFx0aHRtbDogXCLsgqzsmqnsnpDtmZRcIlxuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdGZvbnRTaXplOiBcIjMycHhcIiwgZm9udFdlaWdodDogXCI0MDBcIlxuXHRcdFx0XHRsaW5lSGVpZ2h0OiBcIjU3cHhcIlxuXHRcdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdGJvcmRlclJhZGl1czogMTVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjMzMzMzMzXCJcblx0XHRcdHNjYWxlOiAxIC8gMC43LCBvcmlnaW5ZOiAwXG5cdFx0XHRwYXJlbnQ6IEBwYWdlXG5cdFx0QGN1c3RvbWl6ZS5zZW5kVG9CYWNrKClcblxuXHRcdCMg7Iuc6rOE7ZmU66m0IDog7J2067Kk7Yq4XG5cdFx0QGlzQ2hhbmdlRG9uZSA9IGZhbHNlXG5cdFx0QGlzQ2hhbmdlTW9kZSA9IGZhbHNlXG5cblx0XHQjIEV2ZW50c1xuXHRcdGZvciBjaGlsZCBpbiBAcGFnZS5jb250ZW50LmNoaWxkcmVuXG5cdFx0XHRjaGlsZC5vbkNsaWNrID0+IEBzZWxlY3RlZCgpXG5cblx0XHQjIExvbmctUHJlc3MoRm9yY2VUb3VjaCkgOiBTdGFydFxuXHRcdEBwYWdlLm9uTG9uZ1ByZXNzU3RhcnQgPT5cblx0XHRcdHJldHVybiBpZiBAaXNDaGFuZ2VNb2RlXG5cdFx0XHQjXG5cdFx0XHRjaGlsZC5tb2RlQ2hhbmdlKCkgZm9yIGNoaWxkLCBpIGluIEBwYWdlLmNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdEBwYWdlLmFuaW1hdGUgXCJjaGFuZ2VcIlxuXG5cdFx0IyBMb25nLVByZXNzKEZvcmNlVG91Y2gpIDogRW5kXG5cdFx0QHBhZ2Uub25Mb25nUHJlc3NFbmQgPT5cblx0XHRcdHJldHVybiBpZiBAaXNDaGFuZ2VNb2RlXG5cdFx0XHQjXG5cdFx0XHRAaXNDaGFuZ2VNb2RlID0gdHJ1ZVxuXHRcdFx0VXRpbHMuZGVsYXkgLjMsID0+IEBpc0NoYW5nZURvbmUgPSB0cnVlXG5cblx0XHQjIFNjcmVlbi5vbiBFdmVudHMuRWRnZVN3aXBlTGVmdFN0YXJ0LCAoZXZlbnQpIC0+XG5cdFx0IyBcdHByaW50IFwic3RhcnQgOiAje2V2ZW50LnBvaW50Lnh9XCJcblx0XHQjIFNjcmVlbi5vbiBFdmVudHMuRWRnZVN3aXBlTGVmdCwgKGV2ZW50KSAtPlxuXHRcdCMgIyBcdHByaW50IGV2ZW50XG5cdFx0IyBTY3JlZW4ub24gRXZlbnRzLkVkZ2VTd2lwZUxlZnRFbmQsIChldmVudCkgLT5cblx0XHQjIFx0cHJpbnQgXCJlbmQgOiAje2V2ZW50LnBvaW50fVwiXG5cblx0IyBTZWxlY3RlZFxuXHRzZWxlY3RlZDogKCkgLT5cblx0XHRyZXR1cm4gdW5sZXNzIEBpc0NoYW5nZU1vZGVcblx0XHRyZXR1cm4gdW5sZXNzIEBpc0NoYW5nZURvbmVcblx0XHRcblx0XHQjXG5cdFx0Zm9yIGNoaWxkLCBpIGluIEBwYWdlLmNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdGNoaWxkLm1vZGVDaGFuZ2UgZmFsc2UgXG5cdFx0QHBhZ2UuYW5pbWF0ZSBcInNlbGVjdGVkXCJcblxuXHRcdCNcblx0XHRAaXNDaGFuZ2VNb2RlID0gZmFsc2Vcblx0XHRAaXNDaGFuZ2VEb25lID0gZmFsc2VcblxuXHQjIFRpbWUgc3RhcnRcblx0dGltZVN0YXJ0OiAtPiBwYWdlLmNsb2NrLnN0YXJ0KCkgZm9yIHBhZ2UgaW4gQHBhZ2UuY29udGVudC5jaGlsZHJlblxuXHRcdFxuXHQjIFRpbWUgc3RvcFxuXHR0aW1lU3RvcDogLT4gcGFnZS5jbG9jay5zdG9wKCkgZm9yIHBhZ2UgaW4gQHBhZ2UuY29udGVudC5jaGlsZHJlblxuXG5cdCMgU2V0IGNsb2NrIGZhY2Vcblx0c2V0Q2xvY2tmYWNlOiAoaW5kZXgpIC0+XG5cdFx0cmV0dXJuIGlmIF8uaXNFbXB0eShAcGFnZS5jb250ZW50LmNoaWxkcmVuKVxuXHRcdHJldHVybiBpZiBfLnNpemUoQHBhZ2UuY29udGVudC5jaGlsZHJlbikgLSAxIDwgaW5kZXhcblxuXHRcdEBwYWdlLnNuYXBUb1BhZ2UgQHBhZ2UuY29udGVudC5jaGlsZHJlbltpbmRleF1cblxuJycnXG5Db21wbGljYXRpb24gSW1hZ2VzIDogaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3dhdGNob3MvaHVtYW4taW50ZXJmYWNlLWd1aWRlbGluZXMvaWNvbnMtYW5kLWltYWdlcy9cblxuRmFtaWx5OlxuXHRtb2R1bGFyU21hbGxcblx0bW9kdWxhckxhcmdlXG5cdHV0aWxpdGFyaWFuU21hbGxcblx0dXRpbGl0YXJpYW5TbWFsbEZsYXRcblx0dXRpbGl0YXJpYW5MYXJnZVxuXHRjaXJjdWxhclNtYWxsXG5cdGV4dHJhTGFyZ2VcblxuVGVtcGxhdGU6XG5cdHRpbnRDb2xvcjogXCLsg4nsg4FcIlxuXHRjb2x1bW5BbGlnbm1lbnQ6IFwibGVhZGluZ1wiIG9yIFwidGFpbGluZ1wiXG5cbkNpcmN1bGFyOlxuXHRTbWFsbFNpbXBsZVRleHQ6IChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2NvbXBsaWNhdGlvbnRlbXBsYXRlY2lyY3VsYXJzbWFsbHNpbXBsZXRleHQpXG5cdFx0dGV4dFByb3ZpZGVyOiBcIuusuOyekOyXtFwiIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa3RleHRwcm92aWRlcilcblx0U21hbGxSaW5nSW1hZ2U6IChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2NvbXBsaWNhdGlvbnRlbXBsYXRlY2lyY3VsYXJzbWFsbHJpbmdpbWFnZSlcblx0XHRpbWFnZVByb3ZpZGVyOiBcIuydtOuvuOyngFwiIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2ltYWdlcHJvdmlkZXIpXG5cdFx0cmluZ1N0eWxlOiBcImNsb3NlZFwiIG9yIFwib3BlblwiIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2NvbXBsaWNhdGlvbnJpbmdzdHlsZSlcblx0XHRmaWxsRnJhY3Rpb246IOyxhOyasOq4sCDruYTsnKhcblxuVXRpbGl0YXJpYW46XG5cdFNtYWxsRmxhdDogKGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9yZWZlcmVuY2UvY2xvY2traXQvY2xrY29tcGxpY2F0aW9udGVtcGxhdGV1dGlsaXRhcmlhbnNtYWxsZmxhdClcblx0XHR0ZXh0UHJvdmlkZXI6IFwi66y47J6Q7Je0XCIgKGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9yZWZlcmVuY2UvY2xvY2traXQvY2xrdGV4dHByb3ZpZGVyKVxuXHRcdGltYWdlUHJvdmlkZXI6IFwi7J2066+47KeAXCIgKGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9yZWZlcmVuY2UvY2xvY2traXQvY2xraW1hZ2Vwcm92aWRlcilcblx0TGFyZ2VGbGF0OiAoaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3JlZmVyZW5jZS9jbG9ja2tpdC9jbGtjb21wbGljYXRpb250ZW1wbGF0ZXV0aWxpdGFyaWFubGFyZ2VmbGF0KVxuXHRcdHRleHRQcm92aWRlcjogXCLrrLjsnpDsl7RcIiAoaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3JlZmVyZW5jZS9jbG9ja2tpdC9jbGt0ZXh0cHJvdmlkZXIpXG5cdFx0aW1hZ2VQcm92aWRlcjogXCLsnbTrr7jsp4BcIiAoaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3JlZmVyZW5jZS9jbG9ja2tpdC9jbGtpbWFnZXByb3ZpZGVyKVxuXHRTbWFsbFJpbmdJbWFnZTogKGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9yZWZlcmVuY2UvY2xvY2traXQvY2xrY29tcGxpY2F0aW9udGVtcGxhdGV1dGlsaXRhcmlhbnNtYWxscmluZ2ltYWdlKVxuXHRcdGltYWdlUHJvdmlkZXI6IFwi7J2066+47KeAXCIgW3JlcXVpcmVdIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2ltYWdlcHJvdmlkZXIpXG5cdFx0cmluZ1N0eWxlOiBcImNsb3NlZFwiIG9yIFwib3BlblwiIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2NvbXBsaWNhdGlvbnJpbmdzdHlsZSlcblx0XHRmaWxsRnJhY3Rpb246IOyxhOyasOq4sCDruYTsnKhcblx0U21hbGxTcXVhcmU6IChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2NvbXBsaWNhdGlvbnRlbXBsYXRldXRpbGl0YXJpYW5zbWFsbHNxdWFyZSlcblx0XHRpbWFnZVByb3ZpZGVyOiBcIuydtOuvuOyngFwiIFtyZXF1aXJlXSAoaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3JlZmVyZW5jZS9jbG9ja2tpdC9jbGtpbWFnZXByb3ZpZGVyKVxuXG5Nb2R1bGFyOlxuXHRTbWFsbFN0YWNrVGV4dDogKGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9yZWZlcmVuY2UvY2xvY2traXQvY2xrY29tcGxpY2F0aW9udGVtcGxhdGVtb2R1bGFyc21hbGxzdGFja3RleHQpXG5cdFx0bGluZTFUZXh0UHJvdmlkZXI6IFwiMeudvOyduCDrrLjsnpDsl7RcIiAoaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3JlZmVyZW5jZS9jbG9ja2tpdC9jbGt0ZXh0cHJvdmlkZXIpXG5cdFx0bGluZTJUZXh0UHJvdmlkZXI6IFwiMuudvOyduCDrrLjsnpDsl7RcIiAoaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3JlZmVyZW5jZS9jbG9ja2tpdC9jbGt0ZXh0cHJvdmlkZXIpXG5cdFx0aGlnaGxpZ2h0TGluZTI6IEJvb2xlYW5cblx0U21hbGxSaW5nSW1hZ2U6IChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2NvbXBsaWNhdGlvbnRlbXBsYXRlbW9kdWxhcnNtYWxscmluZ2ltYWdlKVxuXHRcdGltYWdlUHJvdmlkZXI6IFwi7J2066+47KeAXCIgW3JlcXVpcmVdIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2ltYWdlcHJvdmlkZXIpXG5cdFx0cmluZ1N0eWxlOiBcImNsb3NlZFwiIG9yIFwib3BlblwiIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa2NvbXBsaWNhdGlvbnJpbmdzdHlsZSlcblx0XHRmaWxsRnJhY3Rpb246IOyxhOyasOq4sCDruYTsnKhcblx0TGFyZ2VUYWxsQm9keTogKGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9yZWZlcmVuY2UvY2xvY2traXQvY2xrY29tcGxpY2F0aW9udGVtcGxhdGVtb2R1bGFybGFyZ2V0YWxsYm9keSlcblx0XHRoZWFkZXJUZXh0UHJvdmlkZXI6IFwi7Zek642UIOusuOyekOyXtFwiIChodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vcmVmZXJlbmNlL2Nsb2Nra2l0L2Nsa3RleHRwcm92aWRlcilcblx0XHRib2R5VGV4dFByb3ZpZGVyOiBcIuuwlOuUlCDrrLjsnpDsl7RcIiAoaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3JlZmVyZW5jZS9jbG9ja2tpdC9jbGt0ZXh0cHJvdmlkZXIpXG5cbkV4dHJhTGFyZ2U6XG5cblxudGV4dFByb3ZpZGVyOlxuXHRsYWJlbDog652867Ko66qFXG5cdHRpbnRDb2xvcjog7Yu07Yq47IOJ7IOBXG5cbmltYWdlUHJvdmlkZXI6XG5cdG9uZVBpZWNlSW1hZ2U6IOyyq+uyiOynuCDsnbTrr7jsp4Bcblx0dHdvUGllY2VJbWFnZUJhY2tncm91bmQ6IOuRkOuyiOynuCDrkrcg7J2066+47KeAXG5cdHR3b1BpZWNlSW1hZ2VGb3JlZ3JvdW5kOiDrkZDrsojsp7gg7JWeIOydtOuvuOyngFxuXHR0aW50Q29sb3I6IO2LtO2KuOyDieyDgVxuJycnXG4jIENvbXBsaWNhdGlvblxuY2xhc3MgZXhwb3J0cy5Db21wbGljYXRpb24gZXh0ZW5kcyBMYXllclxuXG5cdEV2ZW50cy5Db2x1bW5BbGlnbm1lbnQgPSBcImNvbHVtbkFsaWdubWVudFwiXG5cdEV2ZW50cy5UaW50Q29sb3IgPSAndGludENvbG9yJ1xuXG5cdEZhbWlseSA9IHt9XG5cdEZhbWlseS5Nb2R1bGFyU21hbGwgPSBcIm1vZHVsYXJTbWFsbFwiXG5cdEZhbWlseS5Nb2R1bGFyTGFyZ2UgPSBcIm1vZHVsYXJMYXJnZVwiXG5cdEZhbWlseS5VdGlsaXRhcmlhblNtYWxsID0gXCJ1dGlsaXRhcmlhblNtYWxsXCJcblx0RmFtaWx5LlV0aWxpdGFyaWFuU21hbGxGbGF0ID0gXCJ1dGlsaXRhcmlhblNtYWxsRmxhdFwiXG5cdEZhbWlseS5VdGlsaXRhcmlhbkxhcmdlID0gXCJ1dGlsaXRhcmlhbkxhcmdlXCJcblx0RmFtaWx5LkNpcmN1bGFyU21hbGwgPSBcImNpcmN1bGFyU21hbGxcIlxuXHRGYW1pbHkuRXh0cmFMYXJnZSA9IFwiZXh0cmFMYXJnZVwiXG5cblx0VGVtcGxhdGUgPSB7fVxuXHRUZW1wbGF0ZS5TaW1wbGVJbWFnZSA9IFwic2ltcGxlSW1hZ2VcIlxuXHRUZW1wbGF0ZS5TaW1wbGVUZXh0ID0gXCJzaW1wbGVUZXh0XCJcblx0VGVtcGxhdGUuUmluZ0ltYWdlID0gXCJyaW5nSW1hZ2VcIlxuXHRUZW1wbGF0ZS5SaW5nVGV4dCA9IFwicmluZ1RleHRcIlxuXHRUZW1wbGF0ZS5TdGFja1RleHQgPSBcInN0YWNrVGV4dFwiXG5cdFRlbXBsYXRlLlN0YWNrSW1hZ2UgPSBcInN0YWNrSW1hZ2VcIlxuXHRUZW1wbGF0ZS5Db2x1bW5zVGV4dCA9IFwiY29sdW1uc1RleHRcIlxuXHRUZW1wbGF0ZS5Db2x1bW5zID0gXCJjb2x1bW5zXCJcblx0VGVtcGxhdGUuU3RhbmRhcmRCb2R5ID0gXCJzdGFuZGFyZEJvZHlcIlxuXHRUZW1wbGF0ZS5UYWJsZSA9IFwidGFibGVcIlxuXHRUZW1wbGF0ZS5UYWxsQm9keSA9IFwidGFsbEJvZHlcIlxuXHRUZW1wbGF0ZS5GbGF0ID0gXCJmbGF0XCJcblx0VGVtcGxhdGUuU3F1YXJlID0gXCJzcXVhcmVcIlxuXG5cdFJpbmdTdHlsZSA9IHt9XG5cdFJpbmdTdHlsZS5DbG9zZWQgPSBcImNsb3NlZFwiXG5cdFJpbmdTdHlsZS5PcGVuID0gXCJvcGVuXCJcblxuXHRDb2x1bW5BbGlnbm1lbnQgPSB7fVxuXHRDb2x1bW5BbGlnbm1lbnQuTGVhZGluZyA9IFwibGVhZGluZ1wiXG5cdENvbHVtbkFsaWdubWVudC5UcmFpbGluZyA9IFwidHJhaWxpbmdcIlxuXG5cdHRoaXMuRmFtaWx5ID0gRmFtaWx5XG5cdHRoaXMuVGVtcGxhdGUgPSBUZW1wbGF0ZVxuXHR0aGlzLlJpbmdTdHlsZSA9IFJpbmdTdHlsZVxuXHR0aGlzLkNvbHVtbkFsaWdubWVudCA9IENvbHVtbkFsaWdubWVudFxuXG5cdEBkZWZpbmUgJ2NvbHVtbkFsaWdubWVudCcsXG5cdFx0Z2V0OiAoKSAtPiBAX2NvbHVtbkFsaWdubWVudFxuXHRcdHNldDogKHZhbHVlKSAtPiBAZW1pdChcImNoYW5nZToje0V2ZW50cy5Db2x1bW5BbGlnbm1lbnR9XCIsIEBfY29sdW1uQWxpZ25tZW50ID0gdmFsdWUpXG5cblx0QGRlZmluZSAndGludENvbG9yJyxcblx0XHRnZXQ6ICgpIC0+IEBfdGludENvbG9yXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBlbWl0KFwiY2hhbmdlOiN7RXZlbnRzLlRpbnRDb2xvcn1cIiwgQF90aW50Q29sb3IgPSB2YWx1ZSlcdFx0XG5cblx0IyBDb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBcIlwiXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0b3B0aW9ucy5mYW1pbHkgPz0gRmFtaWx5Lk1vZHVsYXJTbWFsbFxuXHRcdG9wdGlvbnMudGVtcGxhdGUgPz0gVGVtcGxhdGUuU2ltcGxlVGV4dFxuXG5cdFx0QGZhbWlseSA9IG9wdGlvbnMuZmFtaWx5XG5cdFx0QHRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZVxuXG5cdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQjIEZhbWlseVxuXHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQjIE1vZHVsYXIgOiBTbWFsbFxuXHRtb2R1bGFyU21hbGw6ICgpIC0+XG5cdFx0QGZhbWlseSA9IEZhbWlseS5Nb2R1bGFyU21hbGxcblx0XHRAc2l6ZSA9IDEwMFxuXG5cdFx0QHRpbnRDb2xvciA9IFwid2hpdGVcIlxuXG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIE1vZHVsYXIgOiBMYXJnZVxuXHRtb2R1bGFyTGFyZ2U6ICgpIC0+XG5cdFx0QGZhbWlseSA9IEZhbWlseS5Nb2R1bGFyTGFyZ2Vcblx0XHRAcHJvcHMgPSB3aWR0aDogMzEyLCBoZWlnaHQ6IDEyNlxuXG5cdFx0QHRpbnRDb2xvciA9IFwid2hpdGVcIlxuXG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIFV0aWxpdGFyaWFuIDogU21hbGxcblx0dXRpbGl0YXJpYW5TbWFsbDogKCkgLT5cblx0XHRAZmFtaWx5ID0gRmFtaWx5LlV0aWxpdGFyaWFuU21hbGxcblx0XHRAc2l6ZSA9IDUxXG5cblx0XHRAdGludENvbG9yID0gXCJ3aGl0ZVwiXG5cblx0XHRyZXR1cm4gdGhpc1xuXG5cdCMgVXRpbGl0YXJpYW4gOiBTbWFsbCBmbGF0XG5cdHV0aWxpdGFyaWFuU21hbGxGbGF0OiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBmYW1pbHkgPSBGYW1pbHkuVXRpbGl0YXJpYW5TbWFsbEZsYXRcblx0XHRAcHJvcHMgPSB3aWR0aDogMTIwLCBoZWlnaHQ6IDM2XG5cblx0XHRAdGludENvbG9yID0gXCJ3aGl0ZVwiXG5cblx0XHQjIFBhcmFtZXRlcnNcblx0XHRvcHRpb25zLmltYWdlUHJvdmlkZXIgPz0ge31cblx0XHRvcHRpb25zLnRleHRQcm92aWRlciA/PSB7fVxuXG5cdFx0aW1hZ2VQcm92aWRlciA9IF8uZGVmYXVsdHMob3B0aW9ucy5pbWFnZVByb3ZpZGVyLCB7IHR3b1BpZWNlSW1hZ2VCYWNrZ3JvdW5kOiBcIlwiLCB0d29QaWVjZUltYWdlRm9yZWdyb3VuZDogXCJcIiwgdGludENvbG9yOiBcIndoaXRlXCIgfSlcblx0XHR0ZXh0UHJvdmlkZXIgPSBfLmRlZmF1bHRzKG9wdGlvbnMudGV4dFByb3ZpZGVyLCB7IHRpbnRDb2xvcjogXCJ3aGl0ZVwiIH0pXG5cblx0XHRpbWFnZSA9IG5ldyBMYXllclxuXHRcdFx0eDogQWxpZ24ubGVmdCwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRzaXplOiAyMFxuXHRcdFx0aW1hZ2U6IGltYWdlUHJvdmlkZXIub25lUGllY2VJbWFnZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdHRleHQgPSBuZXcgTGF5ZXJcblx0XHRcdGh0bWw6IHRleHRQcm92aWRlci5sYWJlbFxuXHRcdFx0c3R5bGU6IFxuXHRcdFx0XHRmb250U2l6ZTogXCIyOHB4XCIsIGZvbnRXZWlnaHQ6IFwiNDAwXCJcblx0XHRcdFx0bGluZUhlaWdodDogXCIje0BoZWlnaHR9cHhcIlxuXHRcdFx0XHRsZXR0ZXJTcGFjaW5nOiBcIi0wLjJweFwiXG5cdFx0XHRcdHRleHRBbGlnbjogXCJsZWZ0XCJcblx0XHRcdGNvbG9yOiB0ZXh0UHJvdmlkZXIudGludENvbG9yXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFV0aWwudGV4dC5hdXRvRm9udFNpemUgdGV4dCwgeyBoZWlnaHQ6IEBoZWlnaHQgfSwgeyB4OiBpbWFnZS5tYXhYICsgMywgeTogQWxpZ24uY2VudGVyIH1cblxuXHRcdGlmIEBjb250ZW50RnJhbWUoKS53aWR0aCA+IEB3aWR0aFxuXHRcdFx0VXRpbC50ZXh0LmF1dG9Gb250U2l6ZSB0ZXh0LCB7IHdpZHRoOiBAd2lkdGggLSBpbWFnZS53aWR0aCwgaGVpZ2h0OiBAaGVpZ2h0IH0sIHsgeDogaW1hZ2UubWF4WCArIDMsIHk6IEFsaWduLmNlbnRlciB9XG5cblx0XHQjIEV2ZW50IDogQ2hhbmdlIGNvbHVtbiBhbGlnbm1lbnRcblx0XHRAb24gXCJjaGFuZ2U6I3tFdmVudHMuQ29sdW1uQWxpZ25tZW50fVwiLCAtPlxuXHRcdFx0aWYgQGNvbHVtbkFsaWdubWVudCBpcyBDb2x1bW5BbGlnbm1lbnQuTGVhZGluZ1xuXHRcdFx0XHRpbWFnZS5wcm9wcyA9IHg6IEFsaWduLmxlZnQsIG1pZFk6IHRleHQubWlkWVxuXHRcdFx0XHR0ZXh0LnggPSBpbWFnZS5tYXhYICsgM1xuXHRcdFx0ZWxzZSBpZiBAY29sdW1uQWxpZ25tZW50IGlzIENvbHVtbkFsaWdubWVudC5UcmFpbGluZ1xuXHRcdFx0XHRpbWFnZS5wcm9wcyA9IHg6IEFsaWduLnJpZ2h0LCBtaWRZOiB0ZXh0Lm1pZFlcblx0XHRcdFx0dGV4dC54ID0gaW1hZ2UueCAtIHRleHQud2lkdGggLSAzXG5cdFx0XHRcdFxuXHRcdHJldHVybiB0aGlzXG5cblx0IyBVdGlsaXRhcmlhbiA6IExhcmdlXG5cdHV0aWxpdGFyaWFuTGFyZ2U6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QGZhbWlseSA9IEZhbWlseS5VdGlsaXRhcmlhbkxhcmdlXG5cdFx0QHByb3BzID0gd2lkdGg6IDMxMiwgaGVpZ2h0OiAzNlxuXG5cdFx0QHRpbnRDb2xvciA9IFwid2hpdGVcIlxuXG5cdFx0IyBQYXJhbWV0ZXJzXG5cdFx0b3B0aW9ucy5pbWFnZVByb3ZpZGVyID89IHt9XG5cdFx0b3B0aW9ucy50ZXh0UHJvdmlkZXIgPz0ge31cblxuXHRcdGltYWdlUHJvdmlkZXIgPSBfLmRlZmF1bHRzKG9wdGlvbnMuaW1hZ2VQcm92aWRlciwgeyB0d29QaWVjZUltYWdlQmFja2dyb3VuZDogXCJcIiwgdHdvUGllY2VJbWFnZUZvcmVncm91bmQ6IFwiXCIsIHRpbnRDb2xvcjogXCJ3aGl0ZVwiIH0pXG5cdFx0dGV4dFByb3ZpZGVyID0gXy5kZWZhdWx0cyhvcHRpb25zLnRleHRQcm92aWRlciwgeyB0aW50Q29sb3I6IFwid2hpdGVcIiB9KVxuXG5cdFx0aW1hZ2UgPSBuZXcgTGF5ZXJcblx0XHRcdHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLmJvdHRvbVxuXHRcdFx0c2l6ZTogMjBcblx0XHRcdGltYWdlOiBpbWFnZVByb3ZpZGVyLm9uZVBpZWNlSW1hZ2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHR0ZXh0ID0gbmV3IExheWVyXG5cdFx0XHRodG1sOiB0ZXh0UHJvdmlkZXIubGFiZWxcblx0XHRcdHN0eWxlOiBcblx0XHRcdFx0Zm9udFNpemU6IFwiMjhweFwiLCBmb250V2VpZ2h0OiBcIjQwMFwiXG5cdFx0XHRcdGxpbmVIZWlnaHQ6IFwiMVwiXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IFwiLTAuMnB4XCJcblx0XHRcdFx0dGV4dEFsaWduOiBcImxlZnRcIlxuXHRcdFx0Y29sb3I6IHRleHRQcm92aWRlci50aW50Q29sb3Jcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0VXRpbC50ZXh0LmF1dG9Gb250U2l6ZSB0ZXh0LCB7IGhlaWdodDogQGhlaWdodCB9LCB7IHg6IGltYWdlLm1heFggKyAzLCB5OiBBbGlnbi5ib3R0b20gfVxuXG5cdFx0aWYgQGNvbnRlbnRGcmFtZSgpLndpZHRoID4gQHdpZHRoXG5cdFx0XHRVdGlsLnRleHQuYXV0b0ZvbnRTaXplIHRleHQsIHsgd2lkdGg6IEB3aWR0aCAtIGltYWdlLndpZHRoLCBoZWlnaHQ6IEBoZWlnaHQgfSwgeyB4OiBpbWFnZS5tYXhYICsgMywgeTogQWxpZ24uYm90dG9tIH1cblxuXHRcdGltYWdlLnByb3BzID0geDogQG1pZFggLSBAY29udGVudEZyYW1lKCkud2lkdGggLyAyLCBtaWRZOiB0ZXh0Lm1pZFlcblx0XHR0ZXh0LnggPSBpbWFnZS5tYXhYICsgM1xuXG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIENpcmN1bGFyIDogU21hbGxcblx0Y2lyY3VsYXJTbWFsbDogKCkgLT5cblx0XHRAZmFtaWx5ID0gRmFtaWx5LkNpcmN1bGFyU21hbGxcblx0XHRAc2l6ZSA9IDY4XG5cdFx0QHNjYWxlID0gNTEvNjhcblxuXHRcdEB0aW50Q29sb3IgPSBcIiNiM2IzYjNcIlxuXG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIEV4dHJhTGFyZ2Vcblx0ZXh0cmFMYXJnZTogKCkgLT5cblx0XHRAZmFtaWx5ID0gRmFtaWx5LkV4dHJhTGFyZ2VcblxuXHRcdEB0aW50Q29sb3IgPSBcIndoaXRlXCJcblxuXHRcdHJldHVybiB0aGlzXG5cblx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCMgVGVtcGxhdGVcblx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0IyBTaW1wbGUgdGV4dFxuXHRzaW1wbGVUZXh0OiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEB0ZW1wbGF0ZSA9IFRlbXBsYXRlLlNpbXBsZVRleHRcblxuXHRcdCMgUGFyYW1ldGVyc1xuXHRcdG9wdGlvbnMudGV4dFByb3ZpZGVyID89IHt9XG5cblx0XHR0ZXh0UHJvdmlkZXIgPSBfLmRlZmF1bHRzKG9wdGlvbnMudGV4dFByb3ZpZGVyLCB7IHRpbnRDb2xvcjogQHRpbnRDb2xvciB9KVxuXG5cdFx0aGVpZ2h0ID0gQGhlaWdodFxuXHRcdHRleHQgPSBuZXcgTGF5ZXJcblx0XHRcdGh0bWw6IHRleHRQcm92aWRlci5sYWJlbFxuXHRcdFx0c3R5bGU6IFxuXHRcdFx0XHRmb250U2l6ZTogXCI2N3B4XCIsIGZvbnRXZWlnaHQ6IFwiNDAwXCJcblx0XHRcdFx0bGluZUhlaWdodDogXCIje2hlaWdodH1weFwiXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IFwiLTAuNXB4XCJcblx0XHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRjb2xvcjogdGV4dFByb3ZpZGVyLnRpbnRDb2xvclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRVdGlsLnRleHQuYXV0b0ZvbnRTaXplIHRleHQsIHsgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfSwgeyB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlciB9XG5cblx0XHRyZXR1cm4gdGhpc1xuXG5cdCMgU3RhY2sgdGV4dFxuXHRzdGFja1RleHQ6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QHRlbXBsYXRlID0gVGVtcGxhdGUuU3RhY2tUZXh0XG5cblx0XHQjIFBhcmFtZXRlcnNcblx0XHRvcHRpb25zLmxpbmUxVGV4dFByb3ZpZGVyID89IHt9XG5cdFx0b3B0aW9ucy5saW5lMlRleHRQcm92aWRlciA/PSB7fVxuXHRcdG9wdGlvbnMuaGlnaGxpZ2h0TGluZTIgPz0gZmFsc2VcblxuXHRcdGxpbmUxVGV4dFByb3ZpZGVyID0gXy5kZWZhdWx0cyhvcHRpb25zLmxpbmUxVGV4dFByb3ZpZGVyLCB7IHRpbnRDb2xvcjogQHRpbnRDb2xvciB9KVxuXHRcdGxpbmUyVGV4dFByb3ZpZGVyID0gXy5kZWZhdWx0cyhvcHRpb25zLmxpbmUyVGV4dFByb3ZpZGVyLCB7IHRpbnRDb2xvcjogQHRpbnRDb2xvciB9KVxuXHRcdGhpZ2hsaWdodExpbmUyID0gb3B0aW9ucy5oaWdobGlnaHRMaW5lMlxuXG5cdFx0bGluZTFUZXh0SGVpZ2h0ID0gMzBcblx0XHRsaW5lMVRleHQgPSBuZXcgTGF5ZXJcblx0XHRcdGh0bWw6IGxpbmUxVGV4dFByb3ZpZGVyLmxhYmVsXG5cdFx0XHRzdHlsZTogXG5cdFx0XHRcdGZvbnRTaXplOiBcIjY3cHhcIiwgZm9udFdlaWdodDogXCI1MDBcIlxuXHRcdFx0XHRsaW5lSGVpZ2h0OiBcIjFcIlxuXHRcdFx0XHRsZXR0ZXJTcGFjaW5nOiBcIi0wLjRweFwiXG5cdFx0XHRcdHBhZGRpbmc6IFwiMHB4IDhweFwiXG5cdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0Y29sb3I6IGxpbmUxVGV4dFByb3ZpZGVyLnRpbnRDb2xvclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRVdGlsLnRleHQuYXV0b0ZvbnRTaXplIGxpbmUxVGV4dCwgeyB3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IGxpbmUxVGV4dEhlaWdodCB9LCB7IHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC01NSkgfSAjQWxpZ24uY2VudGVyKCAtQGhlaWdodCAqIDEvMyAqIDEvMiApXG5cblx0XHRsaW5lMlRleHRIZWlnaHQgPSAzNVxuXHRcdGxpbmUyVGV4dCA9IG5ldyBMYXllclxuXHRcdFx0aHRtbDogbGluZTJUZXh0UHJvdmlkZXIubGFiZWxcblx0XHRcdHN0eWxlOiBcblx0XHRcdFx0Zm9udFNpemU6IFwiNjdweFwiLCBmb250V2VpZ2h0OiBcIjUwMFwiXG5cdFx0XHRcdGxpbmVIZWlnaHQ6IFwiMVwiXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IFwiLTAuNHB4XCJcblx0XHRcdFx0cGFkZGluZzogXCIwcHggMy41cHhcIlxuXHRcdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdGNvbG9yOiBsaW5lMlRleHRQcm92aWRlci50aW50Q29sb3Jcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0VXRpbC50ZXh0LmF1dG9Gb250U2l6ZSBsaW5lMlRleHQsIHsgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBsaW5lMlRleHRIZWlnaHQgfSwgeyB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtMTgpIH0gI2xpbmUxVGV4dC5tYXhZIC0gMTBcblxuXHRcdHJldHVybiB0aGlzXG5cblx0IyBTaW1wbGUgaW1hZ2Vcblx0c2ltcGxlSW1hZ2U6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QHRlbXBsYXRlID0gVGVtcGxhdGUuU2ltcGxlSW1hZ2VcblxuXHRcdCMgUGFyYW1ldGVyc1xuXHRcdG9wdGlvbnMuaW1hZ2VQcm92aWRlciA/PSB7fVxuXG5cdFx0aW1hZ2VQcm92aWRlciA9IF8uZGVmYXVsdHMob3B0aW9ucy5pbWFnZVByb3ZpZGVyLCB7IHR3b1BpZWNlSW1hZ2VCYWNrZ3JvdW5kOiBcIlwiLCB0d29QaWVjZUltYWdlRm9yZWdyb3VuZDogXCJcIiwgdGludENvbG9yOiBAdGludENvbG9yIH0pXG5cblx0XHRzaXplID0gMTAwXG5cdFx0c3dpdGNoIEBmYW1pbHlcblx0XHRcdHdoZW4gRmFtaWx5Lk1vZHVsYXJTbWFsbCB0aGVuIHNpemUgPSA1OCAqIDEuNlxuXHRcdFx0d2hlbiBGYW1pbHkuVXRpbGl0YXJpYW5TbWFsbCB0aGVuIHNpemUgPSA0NFxuXHRcdFx0d2hlbiBGYW1pbHkuQ2lyY3VsYXJTbWFsbCB0aGVuIHNpemUgPSAzNiAqICgxL0BzY2FsZSlcblx0XHRcdFx0XG5cdFx0aW1hZ2UgPSBuZXcgTGF5ZXJcblx0XHRcdHBvaW50OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNpemU6IHNpemVcblx0XHRcdGltYWdlOiBpbWFnZVByb3ZpZGVyLm9uZVBpZWNlSW1hZ2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRpZiBAZmFtaWx5IGlzIEZhbWlseS5DaXJjdWxhclNtYWxsXG5cdFx0XHRpbWFnZS5icmlnaHRuZXNzID0gMFxuXHRcdFx0aW1hZ2UuY29udHJhc3QgPSA1MFxuXHRcdFx0aW1hZ2UuaW52ZXJ0ID0gMTAwXG5cblx0XHRyZXR1cm4gdGhpc1xuXG5cdCMgU3F1YXJlXG5cdHNxdWFyZTogKG9wdGlvbnMgPSB7fSkgLT4gXG5cdFx0QHNpbXBsZUltYWdlIG9wdGlvbnNcblx0XHRAdGVtcGxhdGUgPSBUZW1wbGF0ZS5TcXVhcmVcblxuXHRcdHJldHVybiB0aGlzXG5cblx0IyBSaW5nIGltYWdlXG5cdHJpbmdJbWFnZTogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRAdGVtcGxhdGUgPSBUZW1wbGF0ZS5SaW5nSW1hZ2VcblxuXHRcdCMgUGFyYW1ldGVyc1xuXHRcdG9wdGlvbnMuaW1hZ2VQcm92aWRlciA/PSB7fVxuXHRcdG9wdGlvbnMuZmlsbEZyYWN0aW9uID89IDBcblx0XHRvcHRpb25zLnJpbmdTdHlsZSA/PSBSaW5nU3R5bGUuQ2xvc2VkXG5cblx0XHRpbWFnZVByb3ZpZGVyID0gXy5kZWZhdWx0cyhvcHRpb25zLmltYWdlUHJvdmlkZXIsIHsgdHdvUGllY2VJbWFnZUJhY2tncm91bmQ6IFwiXCIsIHR3b1BpZWNlSW1hZ2VGb3JlZ3JvdW5kOiBcIlwiLCB0aW50Q29sb3I6IEB0aW50Q29sb3IgfSlcblx0XHRmaWxsRnJhY3Rpb24gPSBvcHRpb25zLmZpbGxGcmFjdGlvblxuXHRcdHJpbmdTdHlsZSA9IG9wdGlvbnMucmluZ1N0eWxlXG5cblx0XHRpbWFnZVNpemUgPSAzODsgcmluZ1NpemUgPSA1ODsgcmluZ1dpZHRoID0gNVxuXHRcdHN3aXRjaCBAZmFtaWx5XG5cdFx0XHR3aGVuIEZhbWlseS5Nb2R1bGFyU21hbGwgXG5cdFx0XHRcdGltYWdlU2l6ZSA9IDM4XG5cdFx0XHRcdHJpbmdTaXplID0gNThcblx0XHRcdFx0cmluZ1dpZHRoID0gNVxuXHRcdFx0d2hlbiBGYW1pbHkuVXRpbGl0YXJpYW5TbWFsbFxuXHRcdFx0XHRpbWFnZVNpemUgPSAyOFxuXHRcdFx0XHRyaW5nU2l6ZSA9IDQ3XG5cdFx0XHRcdHJpbmdXaWR0aCA9IDRcblx0XHRcdHdoZW4gRmFtaWx5LkNpcmN1bGFyU21hbGxcblx0XHRcdFx0aW1hZ2VTaXplID0gNDRcblx0XHRcdFx0cmluZ1NpemUgPSA2NFxuXHRcdFx0XHRyaW5nV2lkdGggPSA2XG5cdFx0XHR3aGVuIEZhbWlseS5FeHRyYUxhcmdlXG5cdFx0XHRcdGltYWdlU2l6ZSA9IDEzM1xuXG5cdFx0aW1hZ2UgPSBuZXcgTGF5ZXJcblx0XHRcdHBvaW50OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNpemU6IGltYWdlU2l6ZVxuXHRcdFx0aW1hZ2U6IGltYWdlUHJvdmlkZXIub25lUGllY2VJbWFnZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRpZiBAZmFtaWx5IGlzIEZhbWlseS5DaXJjdWxhclNtYWxsXG5cdFx0XHRpbWFnZS5icmlnaHRuZXNzID0gMFxuXHRcdFx0aW1hZ2UuY29udHJhc3QgPSA1MFxuXHRcdFx0aW1hZ2UuaW52ZXJ0ID0gMTAwXG5cblx0XHRyaW5nID0gbmV3IENpcmN1bGFyUHJvZ3Jlc3NDb21wb25lbnRcblx0XHRcdHBvaW50OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNpemU6IHJpbmdTaXplXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdHJpbmdDb2xvciA9IG5ldyBDb2xvcihpbWFnZVByb3ZpZGVyLnRpbnRDb2xvcilcblx0XHRyaW5nLnN0cm9rZVdpZHRoID0gcmluZ1dpZHRoXG5cdFx0cmluZy5wcm9ncmVzc0NvbG9yID0gcmluZ0NvbG9yXG5cdFx0cmluZy5yYWlsc0NvbG9yID0gcmluZ0NvbG9yLmFscGhhKC4zKVxuXHRcdHJpbmcuc2V0UHJvZ3Jlc3MgZmlsbEZyYWN0aW9uLCBmYWxzZVxuXG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIFRhbGwgYm9keVxuXHR0YWxsQm9keTogKG9wdGlvbnMgPSB7fSktPlxuXHRcdEB0ZW1wbGF0ZSA9IFRlbXBsYXRlLlRhbGxCb2R5XG5cblx0XHQjIFBhcmFtZXRlcnNcblx0XHRvcHRpb25zLmhlYWRlclRleHRQcm92aWRlciA/PSB7fVxuXHRcdG9wdGlvbnMuYm9keVRleHRQcm92aWRlciA/PSB7fVxuXG5cdFx0aGVhZGVyVGV4dFByb3ZpZGVyID0gXy5kZWZhdWx0cyhvcHRpb25zLmhlYWRlclRleHRQcm92aWRlciwgeyB0aW50Q29sb3I6IEB0aW50Q29sb3IgfSlcblx0XHRib2R5VGV4dFByb3ZpZGVyID0gXy5kZWZhdWx0cyhvcHRpb25zLmJvZHlUZXh0UHJvdmlkZXIsIHsgdGludENvbG9yOiBAdGludENvbG9yIH0pXG5cblx0XHRoZWFkZXJUZXh0SGVpZ2h0ID0gNDZcblx0XHRoZWFkZXJUZXh0ID0gbmV3IExheWVyXG5cdFx0XHRodG1sOiBoZWFkZXJUZXh0UHJvdmlkZXIubGFiZWxcblx0XHRcdHN0eWxlOiBcblx0XHRcdFx0Zm9udFNpemU6IFwiMzNweFwiLCBmb250V2VpZ2h0OiBcIjQwMFwiXG5cdFx0XHRcdGxpbmVIZWlnaHQ6IFwiI3toZWFkZXJUZXh0SGVpZ2h0fXB4XCJcblx0XHRcdFx0bGV0dGVyU3BhY2luZzogXCIwLjFweFwiXG5cdFx0XHRcdHBhZGRpbmc6IFwiMHB4IDEycHhcIlxuXHRcdFx0XHR0ZXh0QWxpZ246IFwibGVmdFwiXG5cdFx0XHRjb2xvcjogaGVhZGVyVGV4dFByb3ZpZGVyLnRpbnRDb2xvclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRVdGlsLnRleHQuYXV0b0ZvbnRTaXplIGhlYWRlclRleHQsIHsgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBoZWFkZXJUZXh0SGVpZ2h0IH0sIHsgeDogQWxpZ24ubGVmdCwgeTogQWxpZ24udG9wIH0gXG5cblx0XHRib2R5VGV4dEhlaWdodCA9IDgwXG5cdFx0Ym9keVRleHQgPSBuZXcgTGF5ZXJcblx0XHRcdGh0bWw6IGJvZHlUZXh0UHJvdmlkZXIubGFiZWxcblx0XHRcdHN0eWxlOiBcblx0XHRcdFx0Zm9udFNpemU6IFwiODBweFwiLCBmb250V2VpZ2h0OiBcIjQwMFwiXG5cdFx0XHRcdGxpbmVIZWlnaHQ6IFwiI3tib2R5VGV4dEhlaWdodH1weFwiXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IFwiLTAuNXB4XCJcblx0XHRcdFx0cGFkZGluZzogXCIwcHggMTJweFwiXG5cdFx0XHRcdHRleHRBbGlnbjogXCJsZWZ0XCJcblx0XHRcdGNvbG9yOiBib2R5VGV4dFByb3ZpZGVyLnRpbnRDb2xvclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRVdGlsLnRleHQuYXV0b0ZvbnRTaXplIGJvZHlUZXh0LCB7IHdpZHRoOiBAd2lkdGgsIGhlaWdodDogYm9keVRleHRIZWlnaHQgfSwgeyB4OiBBbGlnbi5sZWZ0LCB5OiBoZWFkZXJUZXh0Lm1heFkgfVxuXG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIFNtYWxsIGZsYXRcblx0c21hbGxGbGF0OiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBUZW1wbGF0ZSA9IFRlbXBsYXRlLkZsYXRcblx0XHRAcHJvcHMgPSB3aWR0aDogMTIwLCBoZWlnaHQ6IDM2LCBzY2FsZTogMVxuXG5cdFx0IyBQYXJhbWV0ZXJzXG5cdFx0b3B0aW9ucy5pbWFnZVByb3ZpZGVyID89IHt9XG5cdFx0b3B0aW9ucy50ZXh0UHJvdmlkZXIgPz0ge31cblxuXHRcdGltYWdlUHJvdmlkZXIgPSBfLmRlZmF1bHRzKG9wdGlvbnMuaW1hZ2VQcm92aWRlciwgeyB0d29QaWVjZUltYWdlQmFja2dyb3VuZDogXCJcIiwgdHdvUGllY2VJbWFnZUZvcmVncm91bmQ6IFwiXCIsIHRpbnRDb2xvcjogQHRpbnRDb2xvciB9KVxuXHRcdHRleHRQcm92aWRlciA9IF8uZGVmYXVsdHMob3B0aW9ucy50ZXh0UHJvdmlkZXIsIHsgdGludENvbG9yOiBAdGludENvbG9yIH0pXG5cblx0XHRpbWFnZSA9IG5ldyBMYXllclxuXHRcdFx0eDogQWxpZ24ubGVmdCwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRzaXplOiAyMFxuXHRcdFx0aW1hZ2U6IGltYWdlUHJvdmlkZXIub25lUGllY2VJbWFnZVxuXHRcdFx0YnJpZ2h0bmVzczogMCwgY29udHJhc3Q6IDUwLCBpbnZlcnQ6IDEwMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdHRleHQgPSBuZXcgTGF5ZXJcblx0XHRcdGh0bWw6IHRleHRQcm92aWRlci5sYWJlbFxuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdGZvbnRTaXplOiBcIjI4cHhcIiwgZm9udFdlaWdodDogXCI1MDBcIlxuXHRcdFx0XHRsaW5lSGVpZ2h0OiBcIiN7QGhlaWdodH1weFwiXG5cdFx0XHRcdGxldHRlclNwYWNpbmc6IFwiLTAuMnB4XCJcblx0XHRcdFx0dGV4dEFsaWduOiBcImxlZnRcIlxuXHRcdFx0Y29sb3I6IHRleHRQcm92aWRlci50aW50Q29sb3Jcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0VXRpbC50ZXh0LmF1dG9Gb250U2l6ZSB0ZXh0LCB7IGhlaWdodDogQGhlaWdodCB9LCB7IHg6IGltYWdlLm1heFggKyAzLCB5OiBBbGlnbi5jZW50ZXIgfVxuXG5cdFx0aWYgQGNvbnRlbnRGcmFtZSgpLndpZHRoID4gQHdpZHRoXG5cdFx0XHRVdGlsLnRleHQuYXV0b0ZvbnRTaXplIHRleHQsIHsgd2lkdGg6IEB3aWR0aCAtIGltYWdlLndpZHRoLCBoZWlnaHQ6IEBoZWlnaHQgfSwgeyB4OiBpbWFnZS5tYXhYICsgMywgeTogQWxpZ24uY2VudGVyIH1cblxuXHRcdCMgRXZlbnQgOiBDaGFuZ2UgY29sdW1uIGFsaWdubWVudFxuXHRcdEBvbiBcImNoYW5nZToje0V2ZW50cy5Db2x1bW5BbGlnbm1lbnR9XCIsIC0+XG5cdFx0XHRpZiBAY29sdW1uQWxpZ25tZW50IGlzIENvbHVtbkFsaWdubWVudC5MZWFkaW5nXG5cdFx0XHRcdGltYWdlLnggPSBBbGlnbi5sZWZ0XG5cdFx0XHRcdHRleHQueCA9IGltYWdlLm1heFggKyAzXG5cdFx0XHRlbHNlIGlmIEBjb2x1bW5BbGlnbm1lbnQgaXMgQ29sdW1uQWxpZ25tZW50LlRyYWlsaW5nXG5cdFx0XHRcdGltYWdlLnggPSBBbGlnbi5yaWdodFxuXHRcdFx0XHR0ZXh0LnggPSBpbWFnZS54IC0gdGV4dC53aWR0aCAtIDNcblx0XHRcdFx0XG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIER1bW15XG5cdGR1bW15OiAoaW1hZ2VVcmwgPSBcIlwiKSAtPlxuXHRcdEB0ZW1wbGF0ZSA9IFRlbXBsYXRlXG5cdFx0QGltYWdlID0gaW1hZ2VVcmxcblxuXHRcdHJldHVybiB0aGlzXG5cbiMgQ2xvY2tGYWNlXG5jbGFzcyBDbG9ja0ZhY2UgZXh0ZW5kcyBMYXllclxuXHQjIENvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IFwicmdiYSgyNTUsMjU1LDI1NSwuMilcIlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdCMgQmFja2dyb3VuZFxuXHRcdEBiZyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuYmdcIlxuXHRcdFx0d2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiYmxhY2tcIlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxMlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0QGJnLmZyYW1lID0gVXRpbHMuZnJhbWVJbnNldCBAYmcsIDEwXG5cblx0XHQjIENvbXBsaWNhdGlvblxuXHRcdEBjb21wbGljYXRpb24gPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmNvbXBsaWNhdGlvblwiXG5cdFx0XHR3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJibGFja1wiXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdCMgTGFiZWxcblx0XHRAbGFiZWwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmxhYmVsXCJcblx0XHRcdGh0bWw6IEBuYW1lXG5cdFx0XHRzdHlsZTogXG5cdFx0XHRcdGZvbnRTaXplOiBcIiN7MjQgKiAxLzAuNyoyODQvMjcyfXB4XCIsIGZvbnRXZWlnaHQ6IFwiNDAwXCJcblx0XHRcdFx0bGluZUhlaWdodDogXCIxXCJcblx0XHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcblx0XHRcdHBhcmVudDogQFxuXG5cdFx0QGxhYmVsLm9uIFwiY2hhbmdlOmh0bWxcIiwgLT5cblx0XHRcdFV0aWwudGV4dC5hdXRvU2l6ZSBAXG5cdFx0XHRAcHJvcHMgPVx0eDogQWxpZ24uY2VudGVyKC03KSwgbWF4WTogLTEzXG5cblx0IyBDaGFuZ2UgbW9kZVxuXHRtb2RlQ2hhbmdlOiAodHlwZSA9IHRydWUpIC0+XG5cdFx0aWYgdHlwZVxuXHRcdFx0QHByb3BzID1cblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiAxNVxuXHRcdFx0XHRzY2FsZTogMjczIC8gMjg1XG5cdFx0XHRAY29tcGxpY2F0aW9uLnByb3BzID1cblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiAxMlxuXHRcdFx0XHRzY2FsZTogMjM5IC8gMjczXG5cdFx0ZWxzZSBcblx0XHRcdEBwcm9wcyA9XG5cdFx0XHRcdGJvcmRlclJhZGl1czogMFxuXHRcdFx0XHRzY2FsZTogMVxuXHRcdFx0QGNvbXBsaWNhdGlvbi5wcm9wcyA9XG5cdFx0XHRcdGJvcmRlclJhZGl1czogMFxuXHRcdFx0XHRzY2FsZTogMVxuXG5cdCMgQ2lyY3VsYXJcblx0Y2lyY3VsYXI6IChjb21wbGljYXRpb25zID0gW10pIC0+XG5cdFx0QGxhYmVsLmh0bWwgPSBAbmFtZSA9IFwi7Ius7ZSMXCJcblx0XHRAY2xvY2sgPSBuZXcgQW5hbG9nQ2xvY2sgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiBAaGVpZ2h0LCBwYXJlbnQ6IEBjb21wbGljYXRpb25cblxuXHRcdGZvciBjb21wbGljYXRpb24sIGkgaW4gY29tcGxpY2F0aW9uc1xuXHRcdFx0aWYgY29tcGxpY2F0aW9uXG5cdFx0XHRcdEBjb21wbGljYXRpb24uYWRkQ2hpbGQgY29tcGxpY2F0aW9uXG5cdFx0XHRcdHN3aXRjaCBpXG5cdFx0XHRcdFx0d2hlbiAwXG5cdFx0XHRcdFx0XHRjb21wbGljYXRpb24ucHJvcHMgPSB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi50b3AsIG9yaWdpblg6IDAsIG9yaWdpblk6IDBcblx0XHRcdFx0XHRcdGNvbXBsaWNhdGlvbi5jb2x1bW5BbGlnbm1lbnQgPSBleHBvcnRzLkNvbXBsaWNhdGlvbi5Db2x1bW5BbGlnbm1lbnQuTGVhZGluZ1xuXHRcdFx0XHRcdHdoZW4gMSBcblx0XHRcdFx0XHRcdGNvbXBsaWNhdGlvbi5wcm9wcyA9IHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi50b3AsIG9yaWdpblg6IDEsIG9yaWdpblk6IDBcblx0XHRcdFx0XHRcdGNvbXBsaWNhdGlvbi5jb2x1bW5BbGlnbm1lbnQgPSBleHBvcnRzLkNvbXBsaWNhdGlvbi5Db2x1bW5BbGlnbm1lbnQuVHJhaWxpbmdcblx0XHRcdFx0XHR3aGVuIDIgXG5cdFx0XHRcdFx0XHRjb21wbGljYXRpb24ucHJvcHMgPSB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi5ib3R0b20sIG9yaWdpblg6IDAsIG9yaWdpblk6IDFcblx0XHRcdFx0XHRcdGNvbXBsaWNhdGlvbi5jb2x1bW5BbGlnbm1lbnQgPSBleHBvcnRzLkNvbXBsaWNhdGlvbi5Db2x1bW5BbGlnbm1lbnQuTGVhZGluZ1xuXHRcdFx0XHRcdHdoZW4gM1xuXHRcdFx0XHRcdFx0Y29tcGxpY2F0aW9uLnByb3BzID0geDogQWxpZ24ucmlnaHQsIHk6IEFsaWduLmJvdHRvbSwgb3JpZ2luWDogMSwgb3JpZ2luWTogMVxuXHRcdFx0XHRcdFx0Y29tcGxpY2F0aW9uLmNvbHVtbkFsaWdubWVudCA9IGV4cG9ydHMuQ29tcGxpY2F0aW9uLkNvbHVtbkFsaWdubWVudC5UcmFpbGluZ1xuXG5cdFx0cmV0dXJuIHRoaXNcblxuXHQjIFV0aWxpdGFyaWFuXG5cdHV0aWxpdGFyaWFuOiAoY29tcGxpY2F0aW9ucyA9IFtdKSAtPlxuXHRcdEBsYWJlbC5odG1sID0gQG5hbWUgPSBcIuycoO2LuOumrO2LsFwiXG5cdFx0QGNsb2NrID0gbmV3IEFuYWxvZ0Nsb2NrIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogQGhlaWdodCwgcGFyZW50OiBAY29tcGxpY2F0aW9uXG5cblx0XHRmb3IgY29tcGxpY2F0aW9uLCBpIGluIGNvbXBsaWNhdGlvbnNcblx0XHRcdGlmIGNvbXBsaWNhdGlvblxuXHRcdFx0XHRAY29tcGxpY2F0aW9uLmFkZENoaWxkIGNvbXBsaWNhdGlvblxuXHRcdFx0XHRzd2l0Y2ggaVxuXHRcdFx0XHRcdHdoZW4gMCBcblx0XHRcdFx0XHRcdGNvbXBsaWNhdGlvbi5wcm9wcyA9IHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLnRvcFxuXHRcdFx0XHRcdFx0Y29tcGxpY2F0aW9uLmNvbHVtbkFsaWdubWVudCA9IGV4cG9ydHMuQ29tcGxpY2F0aW9uLkNvbHVtbkFsaWdubWVudC5MZWFkaW5nXG5cdFx0XHRcdFx0d2hlbiAxXG5cdFx0XHRcdFx0XHRjb21wbGljYXRpb24ucHJvcHMgPSB4OiBBbGlnbi5yaWdodCwgeTogQWxpZ24udG9wXG5cdFx0XHRcdFx0XHRjb21wbGljYXRpb24uY29sdW1uQWxpZ25tZW50ID0gZXhwb3J0cy5Db21wbGljYXRpb24uQ29sdW1uQWxpZ25tZW50LlRyYWlsaW5nXG5cdFx0XHRcdFx0d2hlbiAyIHRoZW4gY29tcGxpY2F0aW9uLnByb3BzID0geDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b21cblxuXHRcdHJldHVybiB0aGlzXG5cblx0IyBNb2R1bGFyXG5cdG1vZHVsYXI6IChjb21wbGljYXRpb25zID0gW10pIC0+XG5cdFx0QGxhYmVsLmh0bWwgPSBAbmFtZSA9IFwi66qo65OIXCJcblx0XHRAY2xvY2sgPSBuZXcgRGlnaXRhbENsb2NrIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogQGhlaWdodCwgcGFyZW50OiBAY29tcGxpY2F0aW9uXG5cblx0XHRmb3IgY29tcGxpY2F0aW9uLCBpIGluIGNvbXBsaWNhdGlvbnNcblx0XHRcdGlmIGNvbXBsaWNhdGlvblxuXHRcdFx0XHRAY29tcGxpY2F0aW9uLmFkZENoaWxkIGNvbXBsaWNhdGlvblxuXHRcdFx0XHRzd2l0Y2ggaVxuXHRcdFx0XHRcdHdoZW4gMCB0aGVuIGNvbXBsaWNhdGlvbi5wcm9wcyA9IHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLnRvcCgzOClcblx0XHRcdFx0XHR3aGVuIDEgdGhlbiBjb21wbGljYXRpb24ucHJvcHMgPSB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi5ib3R0b21cblx0XHRcdFx0XHR3aGVuIDIgdGhlbiBjb21wbGljYXRpb24ucHJvcHMgPSB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbVxuXHRcdFx0XHRcdHdoZW4gMyB0aGVuIGNvbXBsaWNhdGlvbi5wcm9wcyA9IHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi5ib3R0b21cblx0XHRcdFx0XHR3aGVuIDQgdGhlbiBjb21wbGljYXRpb24ucHJvcHMgPSB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlcigxOSlcblx0XHRcdFx0XHRcblx0XHRyZXR1cm4gdGhpc1xuXG5cbiMgQ2xvY2tcbmNsYXNzIENsb2NrIGV4dGVuZHMgTGF5ZXJcblx0IyBDb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBcIlwiXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdCMgU3RhcnQgdGltZVxuXHRzdGFydDogKHRpbWVyKSAtPiBAdGltZXIgPSB0aW1lclxuXHQjIFN0b3AgdGltZVxuXHRzdG9wOiAtPiBjbGVhckludGVydmFsIEB0aW1lciBpZiBAdGltZXJcblxuXG4jIENsb2NrIDogRGlnaXRhbFxuY2xhc3MgRGlnaXRhbENsb2NrIGV4dGVuZHMgQ2xvY2tcblx0IyBDb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLm5hbWUgPSBcIkRpZ2l0YWxDbG9ja1wiXG5cdFx0b3B0aW9ucy5odG1sID0gVXRpbC5kYXRlLnRpbWVGb3JtYXR0ZXIgVXRpbC5kYXRlLmdldFRpbWUoKVxuXHRcdG9wdGlvbnMuc3R5bGUgPVxuXHRcdFx0Zm9udFNpemU6IFwiODVweFwiLCBmb250V2VpZ2h0OiBcIjMwMFwiXG5cdFx0XHRsaW5lSGVpZ2h0OiBcIjFcIlxuXHRcdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcblx0XHRcdGxldHRlclNwYWNpbmc6IFwiLTNweFwiXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0VXRpbC50ZXh0LmF1dG9TaXplIEBcblx0XHRAcHJvcHMgPSB4OiBBbGlnbi5yaWdodCgtMTIpLCB5OiBBbGlnbi50b3AoNDMpXG5cblx0XHQjIFN0YXJ0IHRpbWVcblx0XHRAc3RhcnQoKVxuXG5cdHN0YXJ0OiAtPlxuXHRcdHN1cGVyXG5cdFx0QHRpbWUgPSBVdGlsLmRhdGUuZ2V0VGltZSgpXG5cdFx0QGh0bWwgPSBVdGlsLmRhdGUudGltZUZvcm1hdHRlciBAdGltZSA9IFV0aWwuZGF0ZS5nZXRUaW1lKClcblx0XHRVdGlscy5kZWxheSA2MCAtIEB0aW1lLnNlY3MsID0+IFxuXHRcdFx0QGh0bWwgPSBVdGlsLmRhdGUudGltZUZvcm1hdHRlciBAdGltZSA9IFV0aWwuZGF0ZS5nZXRUaW1lKClcblx0XHRcdEB0aW1lciA9IFV0aWxzLmludGVydmFsIDYwLCA9PiBAaHRtbCA9IFV0aWwuZGF0ZS50aW1lRm9ybWF0dGVyIEB0aW1lID0gVXRpbC5kYXRlLmdldFRpbWUoKVxuXHRcdFx0c3VwZXIgQHRpbWVyXG5cblxuIyBDbG9jayA6IEFuYWxvZ1xuY2xhc3MgQW5hbG9nQ2xvY2sgZXh0ZW5kcyBDbG9ja1xuXHQjIENvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBib3JkZXJSYWRpdXMgPSBAd2lkdGgvMlxuXG5cdFx0IyBFZGdlXG5cdFx0QGVkZ2UgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmVkZ2VcIlxuXHRcdFx0cG9pbnQ6IEFsaWduLmNlbnRlclxuXHRcdFx0c2l6ZTogQHdpZHRoXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcblx0XHRcdHBhcmVudDogQFxuXG5cdFx0c2VjQW5nbGUgPSAzNjAgLyA2MFxuXHRcdGZvciBpIGluIFsxLi42MF1cblx0XHRcdCMgSG91clxuXHRcdFx0aWYgaSUlNSBpcyAwXG5cdFx0XHRcdGhvdXJCYXIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRuYW1lOiBcIi5lZGdlLmhvdXJcIlxuXHRcdFx0XHRcdGh0bWw6IGkgLyA1XG5cdFx0XHRcdFx0c3R5bGU6XG5cdFx0XHRcdFx0XHRmb250U2l6ZTogXCI0MHB4XCIsIGZvbnRXZWlnaHQ6IFwiNDAwXCJcblx0XHRcdFx0XHRcdGxpbmVIZWlnaHQ6IFwiMVwiXG5cdFx0XHRcdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRcdFx0cGFyZW50OiBAZWRnZVxuXHRcdFx0XHRVdGlsLnRleHQuYXV0b1NpemUgaG91ckJhclxuXHRcdFx0XHRhID0gKC05MCArIChzZWNBbmdsZSAqIGkpKSAqIChNYXRoLlBJIC8gMTgwKVxuXHRcdFx0XHRyID0gQGVkZ2Uud2lkdGgvMiAtIGhvdXJCYXIuaGVpZ2h0ICsgM1xuXHRcdFx0XHRob3VyQmFyLnByb3BzID0gXG5cdFx0XHRcdFx0eDogQGVkZ2Uud2lkdGgvMiAtIGhvdXJCYXIud2lkdGgvMiArIE1hdGguY29zKGEpICogclxuXHRcdFx0XHRcdHk6IEBlZGdlLmhlaWdodC8yIC0gaG91ckJhci5oZWlnaHQvMiArIE1hdGguc2luKGEpICogclxuXHRcdFx0XG5cdFx0XHQjIE1pbnV0ZVxuXHRcdFx0aWYgaSAlJSA1IGlzIDBcblx0XHRcdFx0bWluQmFyID0gbmV3IExheWVyXG5cdFx0XHRcdFx0bmFtZTogXCIuZWRnZS5taW5cIlxuXHRcdFx0XHRcdGh0bWw6IGlmIGkgPCAxMCB0aGVuIFwiMCN7aX1cIiBlbHNlIGlcblx0XHRcdFx0XHRzdHlsZTpcblx0XHRcdFx0XHRcdGZvbnRTaXplOiBcIjEzcHhcIiwgZm9udFdlaWdodDogXCI0MDBcIlxuXHRcdFx0XHRcdFx0bGluZUhlaWdodDogXCIxXCJcblx0XHRcdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0XHRcdFx0bGV0dGVyU3BhY2luZzogXCItMXB4XCJcblx0XHRcdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRcdFx0cGFyZW50OiBAZWRnZVxuXHRcdFx0XHRVdGlsLnRleHQuYXV0b1NpemUgbWluQmFyXG5cdFx0XHRcdGEgPSAoLTkwICsgKHNlY0FuZ2xlICogaSkpICogKE1hdGguUEkgLyAxODApXG5cdFx0XHRcdHIgPSBAZWRnZS53aWR0aC8yIC0gbWluQmFyLmhlaWdodCArIDlcblx0XHRcdFx0ciAtPSAyIGlmIGkgaXMgMTUgb3IgaSBpcyA0NVxuXHRcdFx0XHRtaW5CYXIucHJvcHMgPSBcblx0XHRcdFx0XHR4OiBAZWRnZS53aWR0aC8yIC0gbWluQmFyLndpZHRoLzIgKyBNYXRoLmNvcyhhKSAqIHJcblx0XHRcdFx0XHR5OiBAZWRnZS5oZWlnaHQvMiAtIG1pbkJhci5oZWlnaHQvMiArIE1hdGguc2luKGEpICogclxuXHRcdFx0IyBTZWNvbmRcblx0XHRcdGVsc2Vcblx0XHRcdFx0c2VjQmFyID0gbmV3IExheWVyXG5cdFx0XHRcdFx0bmFtZTogXCIuc2VjXCJcblx0XHRcdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtQGVkZ2Uud2lkdGgvMiArIDgpXG5cdFx0XHRcdFx0d2lkdGg6IDIsIGhlaWdodDogOFxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LC41KVwiXG5cdFx0XHRcdFx0cGFyZW50OiBuZXcgTGF5ZXIgbmFtZTogXCIuZWRnZS5zZWMucGFyZW50XCIsIHBvaW50OiBBbGlnbi5jZW50ZXIsIHNpemU6IDEsIG9yaWdpblg6IC41LCBvcmlnaW5ZOiAxLCByb3RhdGlvbjogc2VjQW5nbGUgKiBpLCBiYWNrZ3JvdW5kQ29sb3I6IFwiXCIsIHBhcmVudDogQGVkZ2VcblxuXHRcdCMgQXJyb3cgOiBNaW51dGVcblx0XHRAbWluID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5taW5cIlxuXHRcdFx0cG9pbnQ6IEFsaWduLmNlbnRlclxuXHRcdFx0c2l6ZTogMTJcblx0XHRcdGJvcmRlclJhZGl1czogN1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdEBtaW4uYm90dG9tID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5taW4uYm90dG9tXCJcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC1AbWluLndpZHRoLzIgKyAyKVxuXHRcdFx0d2lkdGg6IDQsIGhlaWdodDogMjAgKyAyXG5cdFx0XHRib3JkZXJSYWRpdXM6IDJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRwYXJlbnQ6IEBtaW5cblx0XHRAbWluLnRvcCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIubWluLnRvcFwiXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIG1heFk6IEBtaW4uYm90dG9tLm1pblkgKyA1XG5cdFx0XHR3aWR0aDogMTAsIGhlaWdodDogQHdpZHRoLzIgLSAxMCAtIDIwICsgNVxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA1XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRcdFx0cGFyZW50OiBAbWluXG5cblxuXHRcdCMgQXJyb3cgOiBIb3VyXG5cdFx0QGhvdXIgPSBAbWluLmNvcHkoKVxuXHRcdEBob3VyLnBhcmVudCA9IEBcblx0XHRAaG91ci5jaGlsZHJlblsxXS5oZWlnaHQgLT0gNTBcblx0XHRAaG91ci5jaGlsZHJlblsxXS5tYXhZID0gQGhvdXIuY2hpbGRyZW5bMF0ubWluWSArIDVcblxuXHRcdEBtaW4uc2VuZFRvQmFjaygpXG5cdFx0QGhvdXIuc2VuZFRvQmFjaygpXG5cblx0XHQjIEFycm93IDogU2Vjb25kXG5cdFx0QHNlYyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuc2VjXCJcblx0XHRcdHBvaW50OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNpemU6IDhcblx0XHRcdGJvcmRlclJhZGl1czogN1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIm9yYW5nZVwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRAc2VjLmJhciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuc2VjLmJhclwiXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgxOClcblx0XHRcdHdpZHRoOiAyLCBoZWlnaHQ6IEB3aWR0aC8yICsgMjJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQHNlYy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdHBhcmVudDogQHNlY1xuXHRcdEBzZWMuZG90ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5zZWMuZG90XCJcblx0XHRcdHBvaW50OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNpemU6IDJcblx0XHRcdGJvcmRlclJhZGl1czogMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImJsYWNrXCJcblx0XHRcdHBhcmVudDogQHNlY1xuXG5cdFx0IyBFdmVudHNcblx0XHRhbmltYXRpb25FbmQgPSAtPiBAcm90YXRpb24gPSAwIGlmIEByb3RhdGlvbiBpcyAzNjBcblx0XHRAc2VjLm9uQW5pbWF0aW9uRW5kIGFuaW1hdGlvbkVuZFxuXHRcdEBtaW4ub25BbmltYXRpb25FbmQgYW5pbWF0aW9uRW5kXG5cdFx0QGhvdXIub25BbmltYXRpb25FbmQgYW5pbWF0aW9uRW5kXG5cblx0XHQjIFN0YXJ0IHRpbWVcblx0XHRAc3RhcnQoKVxuXG5cdHVwZGF0ZTogKGFuaW1hdGUgPSB0cnVlKSA9PlxuXHRcdHRpbWUgPSBVdGlsLmRhdGUuZ2V0VGltZSgpXG5cdFx0XG5cdFx0dGltZS5zZWNzID0gNjAgaWYgdGltZS5zZWNzIGlzIDBcblx0XHR0aW1lLm1pbnMgPSA2MCBpZiB0aW1lLm1pbnMgaXMgMFxuXHRcdHRpbWUuaG91cnMgPSB0aW1lLmhvdXJzIC0gMTIgaWYgdGltZS5ob3VycyA+IDEyXG5cdFx0dGltZS5ob3VycyA9IDEyIGlmIHRpbWUuaG91cnMgaXMgMFxuXHRcdFxuXHRcdHNlY0FuZ2xlID0gKDM2MCAvIDYwKSAqIHRpbWUuc2Vjc1xuXHRcdG1pbkFuZ2xlID0gKDM2MCAvIDYwKSAqIHRpbWUubWluc1xuXHRcdG1pbkFuZ2xlICs9ICgzNjAgLyA2MCAvIDYwKSAqIHRpbWUuc2VjcyB1bmxlc3MgdGltZS5zZWNzIGlzIDYwXG5cdFx0aG91ckFuZ2xlID0gKDM2MCAvIDEyKSAqIHRpbWUuaG91cnNcblx0XHRob3VyQW5nbGUgKz0gKDM2MCAvIDEyIC8gNjApICogdGltZS5taW5zIHVubGVzcyB0aW1lLm1pbnMgaXMgNjBcblx0XHRcblx0XHRAc2VjLmFuaW1hdGVTdG9wKClcblx0XHRAbWluLmFuaW1hdGVTdG9wKClcblx0XHRAaG91ci5hbmltYXRlU3RvcCgpXG5cdFx0XG5cdFx0aWYgYW5pbWF0ZVxuXHRcdFx0QHNlYy5hbmltYXRlIHJvdGF0aW9uOiBzZWNBbmdsZSwgb3B0aW9uczogeyB0aW1lOiAuOTgsIGN1cnZlOiBcImxpbmVhclwiIH1cblx0XHRcdEBtaW4uYW5pbWF0ZSByb3RhdGlvbjogbWluQW5nbGUsIG9wdGlvbnM6IHsgY3VydmU6IFwibGluZWFyXCIgfVxuXHRcdFx0QGhvdXIuYW5pbWF0ZSByb3RhdGlvbjogaG91ckFuZ2xlLCBvcHRpb25zOiB7IGN1cnZlOiBcImxpbmVhclwiIH1cblx0XHRlbHNlIFxuXHRcdFx0QHNlYy5yb3RhdGlvbiA9IHNlY0FuZ2xlXG5cdFx0XHRAbWluLnJvdGF0aW9uID0gbWluQW5nbGVcblx0XHRcdEBob3VyLnJvdGF0aW9uID0gaG91ckFuZ2xlXG5cblx0c3RhcnQ6IC0+XG5cdFx0QHVwZGF0ZSBmYWxzZVxuXHRcdEB0aW1lciA9IFV0aWxzLmludGVydmFsIDEsIEB1cGRhdGVcblx0XHRzdXBlciBAdGltZXIiLCInJydcbkFwcFxuXG5AYXV0aGVyIGhvLnNcbkBzaW5jZSAyMDE2LjExLjI0XG4nJydcbmNsYXNzIGV4cG9ydHMuQXBwIGV4dGVuZHMgTGF5ZXJcblxuXHQjIEV2ZW50c1xuXHRFdmVudHMuVG9Eb2NrID0gXCJ0b0RvY2tcIlxuXHRFdmVudHMuRnJvbURvY2sgPSBcImZyb21Eb2NrXCJcblxuXHQjIENvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMubmFtZSA/PSBcIkFwcFwiXG5cdFx0b3B0aW9ucy53aWR0aCA/PSBEZXZpY2Uud2lkdGhcblx0XHRvcHRpb25zLmhlaWdodCA/PSBEZXZpY2UuaGVpZ2h0XG5cdFx0b3B0aW9ucy5jbGlwID89IHRydWVcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBcImJsYWNrXCJcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRvcHRpb25zLmFjY2VudENvbG9yID89IFwiI2FlYjRiZlwiXG5cdFx0YWNjZW50Q29sb3IgPSBvcHRpb25zLmFjY2VudENvbG9yXG5cblx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0IyBQdWJsaWNcblx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHR0b0RvY2s6IC0+XG5cdFx0aWYgQGhlYWRlclxuXHRcdFx0QGhlYWRlci50aW1lLmFuaW1hdGUgb3BhY2l0eTogMCwgb3B0aW9uczogeyB0aW1lOiAuMjAsIGRlbGF5OiAuMyB9XG5cblx0XHRAZW1pdCBFdmVudHMuVG9Eb2NrLCBAXG5cblx0ZnJvbURvY2s6IC0+XG5cdFx0aWYgQGhlYWRlclxuXHRcdFx0QGhlYWRlci50aW1lLmFuaW1hdGUgb3BhY2l0eTogMSwgb3B0aW9uczogeyB0aW1lOiAuMTUsIGRlbGF5OiAuMiB9XG5cblx0XHRAZW1pdCBFdmVudHMuRnJvbURvY2ssIEBcblxuXHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQjIFByaXZhdGVcblx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQjIEV2ZW50IEhlbHBlclxuXHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRvblRvRG9jazogKGNiKSAtPiBAb24gRXZlbnRzLlRvRG9jaywgY2Jcblx0b25Gcm9tRG9jazogKGNiKSAtPiBAb24gRXZlbnRzLkZyb21Eb2NrLCBjYiIsIicnJ1xud2F0Y2hPUyA6IEFwcHNcblxuQGF1dGhlciBoby5zXG5Ac2luY2UgMjAxNi4xMS4yM1xuJycnXG5jbGFzcyBleHBvcnRzLkFwcHMgZXh0ZW5kcyBMYXllclxuXHRjbG9ja1NpemUgPSA4NFxuXHRjbG9ja1NjYWxlID0gMVxuXG5cdGFwcFNpemUgPSBjbG9ja1NpemUgLSAxMFxuXHRhcHBTY2FsZSA9IDFcblxuXHQjIENvbnN0cnVjdG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMubmFtZSA/PSBcIkFwcHNcIlxuXHRcdG9wdGlvbnMuaW1hZ2UgPz0gXCJpbWFnZXMvYXBwcy5qcGdcIlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdGNsb2NrU2NhbGUgPSBjbG9ja1NpemUgLyBNYXRoLnNxcnQoIE1hdGgucG93KEB3aWR0aCwgMikgKyBNYXRoLnBvdyhAaGVpZ2h0LCAyKSApXG5cdFx0YXBwU2NhbGUgPSBhcHBTaXplIC8gTWF0aC5zcXJ0KCBNYXRoLnBvdyhAd2lkdGgsIDIpICsgTWF0aC5wb3coQGhlaWdodCwgMikgKVxuXG5cdFx0QF9jbG9ja2ZhY2VzID0gb3B0aW9ucy5jbG9ja2ZhY2VzXG5cdFx0QF9hcHBJbmZvID0gb3B0aW9ucy5hcHBJbmZvXG5cdFx0QF9hcHAgPSBAX2FwcEluZm8uYXBwXG5cblx0XHRAYW5pT3B0aW9uc1Nob3cgPSB0aW1lOiAuMywgY3VydmU6IFwiZWFzZS1vdXRcIlxuXHRcdEBhbmlPcHRpb25zRGlzbWlzcyA9IHRpbWU6IC4yNSwgY3VydmU6IFwiZWFzZS1pblwiXG5cblx0XHRAY2xvY2tmYWNlID0gbmV3IEFwcFxuXHRcdFx0bmFtZTogXCJjbG9ja2ZhY2VzXCJcblx0XHRcdHBvaW50OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNpemU6IGNsb2NrU2l6ZVxuXHRcdFx0cGFyZW50OiBAXG5cdFx0QGNsb2NrZmFjZS5vbkNsaWNrID0+IEBkaXNtaXNzIEBfY2xvY2tmYWNlc1xuXG5cdFx0IyBFeGlzdCBhcHBcblx0XHRpZiBAX2FwcFxuXHRcdFx0QGFwcCA9IG5ldyBBcHBcblx0XHRcdFx0bmFtZTogXCJhcHBcIlxuXHRcdFx0XHR4OkFsaWduLmNlbnRlcig5MCksIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0XHRzaXplOiBhcHBTaXplXG5cdFx0XHRcdGh0bWw6IFwiQVBQXCJcblx0XHRcdFx0c3R5bGU6XG5cdFx0XHRcdFx0Zm9udFNpemU6IFwiMjBweFwiLCBmb250V2VpZ2h0OiBcIjYwMFwiXG5cdFx0XHRcdFx0bGluZUhlaWdodDogXCIje2FwcFNpemV9cHhcIlxuXHRcdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0XHRcdGJvcmRlclN0eWxlOiBcImRhc2hlZFwiXG5cdFx0XHRcdGJvcmRlclJhZGl1czogYXBwU2l6ZS8yLCBib3JkZXJXaWR0aDogMSwgYm9yZGVyQ29sb3I6IFwid2hpdGVcIlxuXHRcdFx0XHRwYXJlbnQ6IEBcblxuXHRcdFx0aWYgQF9hcHBJbmZvLmljb25cblx0XHRcdFx0QGFwcC5wcm9wcyA9IFxuXHRcdFx0XHRcdGh0bWw6IFwiXCJcblx0XHRcdFx0XHRib3JkZXJXaWR0aDogMFxuXHRcdFx0XHRcdGltYWdlOiBAX2FwcEluZm8uaWNvblxuXHRcdFx0XHRcdFxuXHRcdFx0QGFwcC5vbkNsaWNrID0+IEBkaXNtaXNzIEBfYXBwXG5cblx0XHRAc2NhbGUgPSAxIC8gY2xvY2tTY2FsZVxuXHRcdEBzZW5kVG9CYWNrKClcblxuXHRpbml0OiAtPlxuXHRcdEBwcm9wcyA9IHZpc2libGU6IHRydWUsXHRzY2FsZTogMSwgcG9pbnQ6IEFsaWduLmNlbnRlclxuXG5cdHNob3c6IChhcHApIC0+XG5cdFx0cmV0dXJuIGlmIEBpc0FuaW1hdGluZ1xuXHRcdFxuXHRcdCMgQ2xvY2tGYWNlXG5cdFx0aWYgYXBwIGlzIEBfY2xvY2tmYWNlc1xuXHRcdFx0QHByb3BzID0gc2NhbGU6IDEgLyBjbG9ja1NjYWxlLCBwb2ludDogQWxpZ24uY2VudGVyXG5cdFx0XHRAYW5pbWF0ZSBzY2FsZTogMSwgb3B0aW9uczogQGFuaU9wdGlvbnNTaG93XG5cdFx0XHRcblx0XHRcdEBjbG9ja2ZhY2UuYWRkQ29udGVudCBAX2Nsb2NrZmFjZXMsIGNsb2NrU2NhbGVcblx0XHRcdEBfY2xvY2tmYWNlcy50aW1lU3RvcCgpXG5cblx0XHRcdEB2aXNpYmxlID0gdHJ1ZVxuXHRcdFx0QGJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcblx0XHRcdEBjbG9ja2ZhY2Uuc2hvdygpXG5cblx0XHRcdEBfY2xvY2tmYWNlcy5hbmltYXRlU3RvcCgpXG5cdFx0XHRAX2Nsb2NrZmFjZXMuYW5pbWF0ZSBzY2FsZTogY2xvY2tTY2FsZSAqIDIvM1xuXHRcdFx0XG5cdFx0IyBBcHAgKEtha2Fvc3RvY2spXG5cdFx0ZWxzZSBpZiBhcHAgaXMgQF9hcHBcblx0XHRcdEBwcm9wcyA9IHNjYWxlOiAxIC8gYXBwU2NhbGUsIHg6IEFsaWduLmNlbnRlcigtOTAgLyBhcHBTY2FsZSksIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0QGFuaW1hdGUgc2NhbGU6IDEsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyLCBvcHRpb25zOiBAYW5pT3B0aW9uc1Nob3dcblx0XHRcdFxuXHRcdFx0QGFwcC5hZGRDb250ZW50IEBfYXBwLCBhcHBTY2FsZVxuXG5cdFx0XHRAdmlzaWJsZSA9IHRydWVcblx0XHRcdEBicmluZ1RvRnJvbnQoKVxuXHRcdFx0XG5cdFx0XHRAYXBwLnNob3coKVxuXHRcdFx0XG5cdFx0XHRAX2FwcC5hbmltYXRlU3RvcCgpXG5cdFx0XHRAX2FwcC5hbmltYXRlIHNjYWxlOiBhcHBTY2FsZSAqIDIvM1xuXG5cdGRpc21pc3M6IChhcHApIC0+XG5cdFx0cmV0dXJuIGlmIEBpc0FuaW1hdGluZ1xuXG5cdFx0IyBDbG9ja0ZhY2Vcblx0XHRpZiBhcHAgaXMgQF9jbG9ja2ZhY2VzXG5cdFx0XHRyZXR1cm4gaWYgQF9jbG9ja2ZhY2VzLmlzQW5pbWF0aW5nXG5cblx0XHRcdEBhbmltYXRlIHNjYWxlOiAxIC8gY2xvY2tTY2FsZSwgb3B0aW9uczogQGFuaU9wdGlvbnNEaXNtaXNzXG5cdFx0XHRcblx0XHRcdEBjbG9ja2ZhY2UuZGlzbWlzcygpXG5cblx0XHRcdEBfY2xvY2tmYWNlcy52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0QF9jbG9ja2ZhY2VzLmFuaW1hdGUgc2NhbGU6IGNsb2NrU2NhbGUsIG9wdGlvbnM6IHsgdGltZTogLjggfVxuXHRcdFx0VXRpbHMuZGVsYXkgLjksID0+XG5cdFx0XHRcdEBjbG9ja2ZhY2UucmVtb3ZlQ29udGVudCBAX2Nsb2NrZmFjZXNcblx0XHRcdFx0QF9jbG9ja2ZhY2VzLnRpbWVTdGFydCgpXG5cblx0XHRcdFx0QHZpc2libGUgPSBmYWxzZVxuXHRcdFx0XG5cdFx0IyBBcHAgKEtha2Fvc3RvY2spXG5cdFx0ZWxzZSBpZiBhcHAgaXMgQF9hcHBcblx0XHRcdHJldHVybiBpZiBAX2FwcC5pc0FuaW1hdGluZ1xuXG5cdFx0XHQjXG5cdFx0XHRpZiBfLmlzRW1wdHkoQGFwcC5jb250ZW50LmNoaWxkcmVuKVxuXHRcdFx0XHRAYXBwLmFkZENvbnRlbnQgQF9hcHAsIGFwcFNjYWxlIFxuXG5cdFx0XHRAYW5pbWF0ZSBzY2FsZTogMSAvIGFwcFNjYWxlLCB4OiBBbGlnbi5jZW50ZXIoLTkwIC8gYXBwU2NhbGUpLCB5OiBBbGlnbi5jZW50ZXIsIG9wdGlvbnM6IEBhbmlPcHRpb25zRGlzbWlzc1xuXHRcdFx0XG5cdFx0XHRAYXBwLmRpc21pc3MoKVxuXG5cdFx0XHRAX2FwcC52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0QF9hcHAuYW5pbWF0ZSBzY2FsZTogYXBwU2NhbGUsIG9wdGlvbnM6IHsgdGltZTogLjggfVxuXHRcdFx0VXRpbHMuZGVsYXkgLjksID0+XG5cdFx0XHRcdEBhcHAucmVtb3ZlQ29udGVudCBAX2FwcFxuXG5cdFx0XHRcdEB2aXNpYmxlID0gZmFsc2VcblxuIyBBcHBcbmNsYXNzIEFwcCBleHRlbmRzIExheWVyXG5cdCMgQ29uc3RydWN0b3Jcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gXCJcIlxuXHRcdG9wdGlvbnMuY2xpcCA/PSB0cnVlXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0QGljb25TaXplID0gb3B0aW9ucy5zaXplXG5cblx0XHRAc3RhcnRQb2ludCA9IEBwb2ludFxuXG5cdFx0QGJnID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5iZ1wiXG5cdFx0XHRwb2ludDogQWxpZ24uY2VudGVyXG5cdFx0XHRzaXplOiBAaWNvblNpemVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJibGFja1wiXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRwYXJlbnQ6IEBcblxuXHRcdEBjb250ZW50ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImNvbnRlbnRcIlxuXHRcdFx0cG9pbnQ6IEFsaWduLmNlbnRlclxuXHRcdFx0c2l6ZTogMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImJsYWNrXCJcblx0XHRcdGJvcmRlclJhZGl1czogNDJcblx0XHRcdGNsaXA6IHRydWVcblx0XHRcdHBhcmVudDogQFxuXG5cdFx0QGNvbnRlbnQub24gXCJjaGFuZ2U6c2l6ZVwiLCA9PlxuXHRcdFx0QGNvbnRlbnQuY2VudGVyKClcblxuXHRcdFx0cmV0dXJuIHVubGVzcyBhcHAgPSBAY29udGVudC5jaGlsZHJlblswXVxuXHRcdFx0YXBwLnByb3BzID0geDogKEBjb250ZW50LndpZHRoIC0gYXBwLndpZHRoKSAvIDIsIHk6IChAY29udGVudC5oZWlnaHQgLSBhcHAuaGVpZ2h0KSAvIDJcblxuXHRcdEBhbmlPcHRpb25zU2hvdyA9IHRpbWU6IC4zLCBjdXJ2ZTogXCJlYXNlLW91dFwiXG5cdFx0QGFuaU9wdGlvbnNEaXNtaXNzID0gdGltZTogLjI1LCBjdXJ2ZTogXCJlYXNlLWluXCJcblxuXHRpbml0OiAtPlxuXHRcdEBiZy5vcGFjaXR5ID0gMFxuXHRcdEBjb250ZW50LnNpemUgPSAwXG5cblx0c2hvdzogLT5cblx0XHRyZXR1cm4gaWYgQGJnLmlzQW5pbWF0aW5nXG5cblx0XHRAYmcub3BhY2l0eSA9IDFcblx0XHRAY29udGVudC5zaXplID0gQGljb25TaXplXG5cdFx0QGJnLmFuaW1hdGUgb3BhY2l0eTogMCwgb3B0aW9uczogQGFuaU9wdGlvbnNTaG93XG5cdFx0QGNvbnRlbnQuYW5pbWF0ZSB3aWR0aDogMCwgaGVpZ2h0OiAwLCBvcHRpb25zOiBAYW5pT3B0aW9uc1Nob3dcblxuXHRkaXNtaXNzOiAtPlxuXHRcdHJldHVybiBpZiBAYmcuaXNBbmltYXRpbmdcblxuXHRcdEBiZy5hbmltYXRlIG9wYWNpdHk6IDEsIG9wdGlvbnM6IEBhbmlPcHRpb25zRGlzbWlzc1xuXHRcdEBjb250ZW50LmFuaW1hdGUgd2lkdGg6IEBpY29uU2l6ZSwgaGVpZ2h0OiBAaWNvblNpemUsIG9wdGlvbnM6IEBhbmlPcHRpb25zRGlzbWlzc1xuXG5cdGFkZENvbnRlbnQ6IChsYXllciwgc2NhbGUpIC0+XG5cdFx0aWYgbGF5ZXJcblx0XHRcdEBjb250ZW50LmFkZENoaWxkIGxheWVyXG5cdFx0XHRsYXllci5wcm9wcyA9IHBvaW50OiBBbGlnbi5jZW50ZXIsIHNjYWxlOiBzY2FsZSwgY2xpcDogdHJ1ZVxuXHRcblx0cmVtb3ZlQ29udGVudDogKGxheWVyKSAtPlxuXHRcdGlmIGxheWVyXG5cdFx0XHRAY29udGVudC5yZW1vdmVDaGlsZCBsYXllciBcblx0XHRcdGxheWVyLnByb3BzID0gcG9pbnQ6IDAsIHNjYWxlOiAxLCBjbGlwOiBmYWxzZVxuXHRcdFx0bGF5ZXIuYnJpbmdUb0Zyb250KClcblxuXHRcdFx0QGluaXQoKVxuIiwiIyBVdGlsaXRpc1xuVXRpbCA9IHt9XG5cbiMgVGV4dFxuVXRpbC50ZXh0ID0ge31cbiNcblV0aWwudGV4dC5zaXplID0gKGxheWVyLCBwYWRkaW5nID0ge30sIGNvbnN0cmFpbnRzPXt9KSAtPlxuXHRzdHlsZSA9IGxheWVyLnN0eWxlXG5cdHRleHQgPSBsYXllci5odG1sXG5cdHNpemVBZmZlY3RpbmdTdHlsZXMgPVxuXHRcdGxpbmVIZWlnaHQ6IHN0eWxlW1wibGluZS1oZWlnaHRcIl1cblx0XHRmb250U2l6ZTogc3R5bGVbXCJmb250LXNpemVcIl1cblx0XHRmb250V2VpZ2h0OiBzdHlsZVtcImZvbnQtd2VpZ2h0XCJdXG5cdFx0cGFkZGluZzogc3R5bGVbXCJwYWRkaW5nXCJdXG5cdFx0cGFkZGluZ1RvcDogc3R5bGVbXCJwYWRkaW5nLXRvcFwiXVxuXHRcdHBhZGRpbmdSaWdodDogc3R5bGVbXCJwYWRkaW5nLXJpZ2h0XCJdXG5cdFx0cGFkZGluZ0JvdHRvbTogc3R5bGVbXCJwYWRkaW5nLWJvdHRvbVwiXVxuXHRcdHBhZGRpbmdMZWZ0OiBzdHlsZVtcInBhZGRpbmctbGVmdFwiXVxuXHRcdHRleHRUcmFuc2Zvcm06IHN0eWxlW1widGV4dC10cmFuc2Zvcm1cIl1cblx0XHRib3JkZXJXaWR0aDogc3R5bGVbXCJib3JkZXItd2lkdGhcIl1cblx0XHRsZXR0ZXJTcGFjaW5nOiBzdHlsZVtcImxldHRlci1zcGFjaW5nXCJdXG5cdFx0Zm9udEZhbWlseTogc3R5bGVbXCJmb250LWZhbWlseVwiXVxuXHRcdGZvbnRTdHlsZTogc3R5bGVbXCJmb250LXN0eWxlXCJdXG5cdFx0Zm9udFZhcmlhbnQ6IHN0eWxlW1wiZm9udC12YXJpYW50XCJdXG5cblx0cmV0dXJuIFV0aWxzLnRleHRTaXplIHRleHQsIHNpemVBZmZlY3RpbmdTdHlsZXMsIGNvbnN0cmFpbnRzXG5cbiNcblV0aWwudGV4dC5hdXRvU2l6ZSA9IChsYXllciwgcGFkZGluZyA9IHt9LCBjb25zdHJhaW50cyA9IHt9KSAtPiBsYXllci5zaXplID0gVXRpbC50ZXh0LnNpemUgbGF5ZXIsIHBhZGRpbmcsIGNvbnN0cmFpbnRzXG5VdGlsLnRleHQuYXV0b0ZvbnRTaXplID0gKGxheWVyLCBjb25zdHJhaW50cyA9IHt9LCBhbGlnbiA9IHt9KSAtPlxuXHRVdGlsLnRleHQuYXV0b1NpemUgbGF5ZXJcblxuXHQjIEFsaWdubWVudFxuXHRsYXllci54ID0gYWxpZ24ueCBpZiBfLmhhcyBhbGlnbiwgXCJ4XCJcblx0bGF5ZXIueSA9IGFsaWduLnkgaWYgXy5oYXMgYWxpZ24sIFwieVwiXG5cblx0bGF5ZXIuc3R5bGUucGFkZGluZ0xlZnQgPSBcIjBweFwiIGlmIF8uaXNOYU4ocGFyc2VJbnQobGF5ZXIuc3R5bGUucGFkZGluZ0xlZnQpKSBcblx0bGF5ZXIuc3R5bGUucGFkZGluZ1JpZ2h0ID0gXCIwcHhcIiBpZiBfLmlzTmFOKHBhcnNlSW50KGxheWVyLnN0eWxlLnBhZGRpbmdSaWdodCkpXG5cblx0aWYgXy5oYXMgY29uc3RyYWludHMsIFwid2lkdGhcIlxuXHRcdHdoaWxlIGxheWVyLl9lbGVtZW50SFRNTC5vZmZzZXRXaWR0aCArIHBhcnNlSW50KGxheWVyLnN0eWxlLnBhZGRpbmdMZWZ0KSArIHBhcnNlSW50KGxheWVyLnN0eWxlLnBhZGRpbmdSaWdodCkgPiBjb25zdHJhaW50cy53aWR0aFxuXHRcdFx0bGF5ZXIuc3R5bGUuZm9udFNpemUgPSBcIiN7cGFyc2VJbnQobGF5ZXIuc3R5bGUuZm9udFNpemUpIC0gMX1weFwiXG5cdFx0XHRVdGlsLnRleHQuYXV0b1NpemUgbGF5ZXJcblxuXHRcdFx0IyBBbGlnbm1lbnRcblx0XHRcdGxheWVyLnggPSBhbGlnbi54IGlmIF8uaGFzIGFsaWduLCBcInhcIlxuXHRcdFx0bGF5ZXIueSA9IGFsaWduLnkgaWYgXy5oYXMgYWxpZ24sIFwieVwiXG5cblx0aWYgXy5oYXMgY29uc3RyYWludHMsIFwiaGVpZ2h0XCJcblx0XHR3aGlsZSBwYXJzZUludChsYXllci5fZWxlbWVudEhUTUwub2Zmc2V0SGVpZ2h0KSA+IGNvbnN0cmFpbnRzLmhlaWdodFxuXHRcdFx0bGF5ZXIuc3R5bGUuZm9udFNpemUgPSBcIiN7cGFyc2VJbnQobGF5ZXIuc3R5bGUuZm9udFNpemUpIC0gMX1weFwiXG5cdFx0XHRsYXllci5zdHlsZS5saW5lSGVpZ2h0ID0gbGF5ZXIuc3R5bGUuZm9udFNpemVcblx0XHRcdFV0aWwudGV4dC5hdXRvU2l6ZSBsYXllciwge30sIGNvbnN0cmFpbnRzXG5cblx0XHRcdCMgQWxpZ25tZW50XG5cdFx0XHRsYXllci54ID0gYWxpZ24ueCBpZiBfLmhhcyBhbGlnbiwgXCJ4XCJcblx0XHRcdGxheWVyLnkgPSBhbGlnbi55IGlmIF8uaGFzIGFsaWduLCBcInlcIlxuXG4jIEFuaVxuVXRpbC5hbmkgPSB7fVxuIyBcblV0aWwuYW5pLnNoYWtlID0gKGxheWVyLCByYW5nZSA9IDEwKSAtPlxuXHR4ID0gbGF5ZXIueFxuXHRsYXllci5hbmltYXRlIHByb3BlcnRpZXM6IHsgeDogeCArIHJhbmdlIH0sIHRpbWU6IC4wOCwgY3VydmU6IFwic3ByaW5nKDUwMCwyNiw1KVwiXG5cdFV0aWxzLmRlbGF5IC4wNywgLT5cblx0XHRsYXllci5hbmltYXRlU3RvcCgpXG5cdFx0bGF5ZXIuYW5pbWF0ZSBwcm9wZXJ0aWVzOiB7IHg6IHggLSByYW5nZSB9LCB0aW1lOiAuMDgsIGN1cnZlOiBcInNwcmluZyg1MDAsMjYsNSlcIlxuXHRcdFV0aWxzLmRlbGF5IC4wNywgLT5cblx0XHRcdGxheWVyLmFuaW1hdGVTdG9wKClcblx0XHRcdGxheWVyLmFuaW1hdGUgcHJvcGVydGllczogeyB4OiB4IH0sIHRpbWU6IC4yLCBjdXJ2ZTogXCJzcHJpbmcoNTAwLDI2LDUyKVwiXG5cbiMgRGF0ZVxuVXRpbC5kYXRlID0ge31cblV0aWwuZGF0ZS5nZXRUaW1lID0gLT5cblx0ZGF5c09mVGhlV2VlayA9IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdXG5cdG1vbnRoc09mVGhlWWVhciA9IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdXG5cdGRhdGVPYmogPSBuZXcgRGF0ZSgpXG5cdG1vbnRoID0gbW9udGhzT2ZUaGVZZWFyW2RhdGVPYmouZ2V0TW9udGgoKV1cblx0ZGF0ZSA9IGRhdGVPYmouZ2V0RGF0ZSgpXG5cdGRheSA9IGRheXNPZlRoZVdlZWtbZGF0ZU9iai5nZXREYXkoKV1cblx0aG91cnMgPSBkYXRlT2JqLmdldEhvdXJzKClcblx0bWlucyA9IGRhdGVPYmouZ2V0TWludXRlcygpXG5cdHNlY3MgPSBkYXRlT2JqLmdldFNlY29uZHMoKVxuXHRyZXR1cm4ge1xuXHRcdG1vbnRoOm1vbnRoXG5cdFx0ZGF0ZTpkYXRlXG5cdFx0ZGF5OmRheVxuXHRcdGhvdXJzOmhvdXJzXG5cdFx0bWluczptaW5zXG5cdFx0c2VjczpzZWNzXG5cdH1cblxuVXRpbC5kYXRlLnRpbWVEZWxlZ2F0ZSA9IChsYXllciwgY2xvY2tUeXBlID0gdHJ1ZSkgLT5cblx0QHRpbWUgPSBVdGlsLmRhdGUuZ2V0VGltZSgpXG5cdFV0aWxzLmRlbGF5IDYwIC0gQHRpbWUuc2VjcywgLT5cblx0XHRsYXllci5odG1sID0gVXRpbC5kYXRlLnRpbWVGb3JtYXR0ZXIgQHRpbWUgPSBVdGlsLmRhdGUuZ2V0VGltZSgpLCBjbG9ja1R5cGVcblx0XHRVdGlscy5pbnRlcnZhbCA2MCwgLT5cblx0XHRcdEB0aW1lID0gVXRpbC5kYXRlLmdldFRpbWUoKVxuXHRcdFx0bGF5ZXIuaHRtbCA9IFV0aWwuZGF0ZS50aW1lRm9ybWF0dGVyIEB0aW1lID0gVXRpbC5kYXRlLmdldFRpbWUoKSwgY2xvY2tUeXBlXG5cblV0aWwuZGF0ZS50aW1lRm9ybWF0dGVyID0gKHRpbWVPYmosIGNsb2NrVHlwZSA9IHRydWUpIC0+XG5cdGlmIGNsb2NrVHlwZSA9PSBmYWxzZVxuXHRcdGlmIHRpbWVPYmouaG91cnMgPiAxMlxuXHRcdFx0dGltZU9iai5ob3VycyA9IHRpbWVPYmouaG91cnMgLSAxMlxuXHRcdGlmIHRpbWVPYmouaG91cnMgPT0gMCB0aGVuIHRpbWVPYmouaG91cnMgPSAxMlxuXHRpZiB0aW1lT2JqLm1pbnMgPCAxMFxuXHRcdHRpbWVPYmoubWlucyA9IFwiMFwiICsgdGltZU9iai5taW5zXG5cdHJldHVybiB0aW1lT2JqLmhvdXJzICsgXCI6XCIgKyB0aW1lT2JqLm1pbnNcblxuXG4jIEdyYXBoaWNcblV0aWwuZ3JhcGhpYyA9IHt9XG5cbiMgU2V0IGJsdXJcblV0aWwuYmx1ciA9IChsYXllciwgc2l6ZSA9IDIwKSAtPlxuXHRsYXllci5zdHlsZSA9IF8uZXh0ZW5kIGxheWVyLnN0eWxlLFxuXHRcdFwiLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXJcIjogXCJibHVyKCN7c2l6ZX1weClcIlxuXHRcdFwiYmFja2Ryb3AtZmlsdGVyXCI6IFwiYmx1cigje3NpemV9cHgpXCJcblV0aWwuZ3JhcGhpYy5ibHVyID0gKGxheWVyLCBzaXplID0gMjApIC0+IFV0aWwuYmx1ciBsYXllciwgc2l6ZVxuXG4jIExvYWQgaW1hZ2VcblV0aWwuZ3JhcGhpYy5sb2FkSW1hZ2UgPSAodXJsLCBjYWxsYmFjaywgY29udGV4dCkgLT5cblx0ZWxlbWVudCA9IG5ldyBJbWFnZVxuXHRcblx0Y29udGV4dCA/PSBGcmFtZXIuQ3VycmVudENvbnRleHRcblx0Y29udGV4dC5kb21FdmVudE1hbmFnZXIud3JhcChlbGVtZW50KS5hZGRFdmVudExpc3RlbmVyIFwibG9hZFwiLCAoZXZlbnQpIC0+IGNhbGxiYWNrKGV2ZW50KVxuXHRjb250ZXh0LmRvbUV2ZW50TWFuYWdlci53cmFwKGVsZW1lbnQpLmFkZEV2ZW50TGlzdGVuZXIgXCJlcnJvclwiLCAoZXZlbnQpIC0+IGNhbGxiYWNrKHRydWUpXG5cdFx0XG5cdGVsZW1lbnQuc3JjID0gdXJsXG5cbiMgTG9hZCBpbWFnZSBkYXRhIHVybFxuVXRpbC5ncmFwaGljLmltYWdlVG9EYXRhVVJMID0gKGltYWdlKSAtPlxuXHR3ID0gaW1hZ2Uud2lkdGhcblx0aCA9IGltYWdlLmhlaWdodFxuXHRcblx0Y2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcblx0Y2FudmFzLndpZHRoID0gd1xuXHRjYW52YXMuaGVpZ2h0ID0gaFxuXHRcblx0Y2FudmFzQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcblx0Y2FudmFzQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIHcsIGgpXG5cdFxuXHRkYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKVxuXG5cdHJldHVybiB3aWR0aDogdywgaGVpZ2h0OiBoLCBpbWFnZTogZGF0YVVSTFxuXG5cbiMgc3ZnIFxuVXRpbC5ncmFwaGljLnN2ZyA9IChzdmcsIHNjYWxlV2lkdGgsIHNjYWxlSGVpZ2h0KSAtPlxuXHQjIEZpbmQgU3RyaW5nXG5cdHN0YXJ0SW5kZXggPSBzdmcuc2VhcmNoKFwiPHN2ZyB3aWR0aD1cIilcblx0ZW5kSW5kZXggPSBzdmcuc2VhcmNoKFwiIHZpZXdCb3hcIilcblx0c3RyaW5nID0gc3ZnLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KVxuXG5cdCNGaW5kIHdpZHRoXG5cdHdTdGFydEluZGV4ID0gc3RyaW5nLnNlYXJjaChcIj1cIikgKyAyXG5cdHdFbmRJbmRleCA9ICBzdHJpbmcuc2VhcmNoKFwicHhcIilcblx0d2lkdGggPSBzdHJpbmcuc2xpY2Uod1N0YXJ0SW5kZXgsIHdFbmRJbmRleClcblx0c2NhbGVXaWR0aCA/PSB3aWR0aFxuXHRuZXdXaWR0aCA9IHNjYWxlV2lkdGhcblxuXHQjIEZpbmQgSGVpZ2h0XG5cdGhlaWdodFN0cmluZyA9IHN0cmluZy5zbGljZSh3RW5kSW5kZXggKyA0LCBzdHJpbmcubGVuZ3RoKVxuXHRoU3RhcnRJbmRleCA9IGhlaWdodFN0cmluZy5zZWFyY2goXCI9XCIpKyAyXG5cdGhFbmRJbmRleCA9IGhlaWdodFN0cmluZy5zZWFyY2goXCJweFwiKVxuXHRoZWlnaHQgPSBoZWlnaHRTdHJpbmcuc2xpY2UoaFN0YXJ0SW5kZXgsIGhFbmRJbmRleClcblx0c2NhbGVIZWlnaHQgPz0gaGVpZ2h0XG5cdG5ld0hlaWdodCA9IHNjYWxlSGVpZ2h0XG5cblx0I0NyZWF0ZSBuZXcgc3RyaW5nXG5cdG5ld1N0cmluZyA9IHN0cmluZy5yZXBsYWNlKHdpZHRoLCBuZXdXaWR0aClcblx0bmV3U3RyaW5nID0gbmV3U3RyaW5nLnJlcGxhY2UoaGVpZ2h0LCBuZXdIZWlnaHQpXG5cblx0I1JlcGxhY2Ugc3RyaW5nc1xuXHRzdmcgPSBzdmcucmVwbGFjZShzdHJpbmcsIG5ld1N0cmluZylcblxuXHRyZXR1cm4ge1xuXHRcdHN2Zzogc3ZnXG5cdFx0d2lkdGg6IG5ld1dpZHRoXG5cdFx0aGVpZ2h0OiBuZXdIZWlnaHRcblx0fVxuXG4jIENoYW5nZXMgdGhlIGZpbGwgYW5kIHN0b3JrZSBvZiBhbiBTVkdcblV0aWwuZ3JhcGhpYy5jaGFuZ2VTVkdDb2xvciA9IChsYXllciwgZmlsbENvbG9yLCBzdHJva2VDb2xvcikgLT5cblx0cGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG5cdGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcobGF5ZXIuaHRtbCwgXCJpbWFnZS9zdmcreG1sXCIpXG5cdHBhdGhzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ3BhdGgnKVxuXHQjIGlmIF8uaXNBcnJheShwYXRocykgJiYgIV8uaXNFbXB0eShwYXRocylcblx0Zm9yIHBhdGggaW4gcGF0aHNcblx0XHRwYXRoLnNldEF0dHJpYnV0ZShcImZpbGxcIiwgZmlsbENvbG9yKVxuXHRcdHBhdGguc2V0QXR0cmlidXRlKFwic3Ryb2tlXCIsIHN0cm9rZUNvbG9yKVxuXHRsYXllci5odG1sID0gKG5ldyBYTUxTZXJpYWxpemVyKCkpLnNlcmlhbGl6ZVRvU3RyaW5nKGRvYylcblx0XHQjIGRvYy5xdWVyeVNlbGVjdG9yQWxsKFwicGF0aFwiKS5mb3JFYWNoIChwYXRoKSAtPiBcblx0XHQjIFx0cGF0aC5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIGZpbGxDb2xvcilcblx0XHQjIFx0cGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2VcIiwgc3Ryb2tlQ29sb3IpXG5cdFx0IyBsYXllci5odG1sID0gKG5ldyBYTUxTZXJpYWxpemVyKCkpLnNlcmlhbGl6ZVRvU3RyaW5nKGRvYylcblxubW9kdWxlLmV4cG9ydHMgPSBVdGlsIGlmIG1vZHVsZT9cbkZyYW1lci5VdGlsID0gVXRpbCIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBVUFBO0FEQ0E7O0FBQUE7O0FBR0E7O0FBRUE7QUFDQzs7QUFERDs7O0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQztBQW5CZ0I7O0FBc0JqQjs7QUFBQTs7O0FBQUE7O0FBQUE7QUFBcUI7O0FBQ3JCO0FBQ0M7O0FBREQ7OztBQUFBOztBQUNBO0FBR0E7QUFBQTs7QUFDQTtBQUFBOztBQUVBO0FBQUE7O0FBQ0E7QUFBQTs7QUFFQTtBQUNFO0FBQ0Y7QUFDQTtBQUdBO0FBQUE7O0FBQ0E7QUFBQTs7QUFOQTs7QUFRQTtBQUNFO0FBQUY7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQVBBO0FBREE7O0FBbkJ5Qjs7QUE4QnpCOztBQUVBO0FBQ0M7O0FBREQ7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBSEE7QUFIaUI7O0FBV2pCOztBQUNBO0FBQ0M7QUFBRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFoQm9COztBQW1CcEI7O0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQUZ5Qjs7QUFRekI7O0FBQUE7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFIQTs7QUFJQTtBQUNBOztBQUNDO0FBUHlCOztBQVcxQjs7QUFHQTs7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQURZOztBQUlaOztBQUFBOztBQUFBO0FBQW9COztBQUdwQjtBQUNDO0FBQUQ7O0FBRUE7O0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFQeUI7O0FBVXpCO0FBQ0M7QUFBRDtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUM7QUFBRDtBQUFBO0FBQUE7O0FBYjhCOztBQWlCOUI7QUFFQztBQUFEO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTs7QUFDQTs7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUNBO0FBR0E7QUFDQTtBQUdBO0FBRUM7QUFDRDtBQUNBO0FBQ0E7O0FBL0JtQjs7QUFtQ25CO0FBQ0M7QUFBRDtBQUNBO0FBQ0E7QUFFQzs7QUFDRDtBQUNBO0FBRkM7QUFHRDtBQVI4Qjs7QUFjOUI7QUFBQTs7O0FBQ0E7Ozs7QUR0TUE7QUFBQTtBQUFBOzs7QUFNTTtBQUNMOzs7O0FBQUQ7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBR0E7O0FBQUE7OztBQUNBOzs7QUFDQTs7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBU0E7QUFBQTtBQUFBO0FBQ0E7QUFYQTtBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTs7QUFNQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUE5Q0E7O0FBZ0RBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBREE7O0FBR0E7QUFDQTtBQUFFOztBQUdGO0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBYkE7QUFpQkE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQUE7QUFBQTs7QUFoQ0E7O0FBa0NBO0FBQ0E7QUFBRTs7QUFHRjtBQUNBO0FBQUc7O0FBRUg7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUpBO0FBQUE7QUFUQTtBQWlCQTtBQUFHOztBQUdIO0FBQ0E7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBSEE7QUFBQTs7QUFqQ0E7Ozs7QUE3RkE7O0FBb0lNOzs7QUFFTjs7QUFBQTs7O0FBQ0E7OztBQUNBOztBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVNBO0FBQUE7QUFDRztBQUFIO0FBRUE7QUFBRzs7QUFDSDtBQUFBO0FBQUE7O0FBSkE7QUFBQTtBQU1BO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7O0FBbENBOztBQW9DQTtBQUNBO0FBQ0E7QUFGQTs7QUFJQTtBQUNBO0FBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU5BOztBQVFBO0FBQ0E7QUFBRTs7QUFFRjtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFKQTs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUZBOztBQURBOztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBRUE7O0FBTkE7Ozs7QUE3REE7Ozs7QUQxSUE7QUFBQTs7O0FBTU07OztBQUdOOztBQUNBOztBQUdBO0FBQ0U7O0FBREY7OztBQUNBOzs7QUFDQTs7O0FBQ0E7OztBQUNBOzs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTtBQVRBOztBQWVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQTtBQUpBOztBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQTtBQUpBOztBQWFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7Ozs7QUExQ0E7Ozs7QUROQTtBQUFBO0FBQUE7Ozs7O0FBTU07QUFDTjs7O0FBT0E7QUFDRTs7QUFERjs7O0FBQ0E7OztBQUNBOztBQUNBOztBQUVBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFPQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFEQTs7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQVBBO0FBUUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQVpBO0FBYUE7QUFHQTtBQUNBO0FBR0U7QUFBQTs7QUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREU7QUFJRjtBQUFBO0FBQ0c7QUFBSDtBQUFHOztBQUVBO0FBQUE7O0FBQUg7QUFBRztBQUNIO0FBSkE7QUFBQTtBQU9BO0FBQUE7QUFDQTtBQUFHOztBQUVIO0FBQ0E7QUFBQTtBQUFBO0FBSkE7QUFBQTtBQW5FQTs7QUFpRkE7QUFDRTtBQUFGO0FBQUU7O0FBQ0Y7QUFBRTs7QUFHQTtBQUFBOztBQUNGO0FBREU7QUFFRjtBQUdBO0FBQ0E7QUFYQTs7QUFjQTtBQUFlO0FBQUE7QUFBQTtBQUFmOztBQUFBO0FBQWU7O0FBQWY7O0FBR0E7QUFBYztBQUFBO0FBQUE7QUFBZDs7QUFBQTtBQUFjOztBQUFkOztBQUdBO0FBQ0E7QUFBRTs7QUFDRjtBQUFFOztBQUVGO0FBSkE7Ozs7QUE3R0E7O0FBbUhBOztBQWlFTTtBQUVMOzs7O0FBQUQ7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFGQTs7QUFJQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUZBOztBQUtBOztBQUFBOzs7QUFDQTs7QUFDQTs7QUFFQTs7O0FBQ0E7O0FBRUE7QUFDQTtBQVJBOztBQWVBO0FBQ0E7QUFDQTtBQUVBO0FBRUU7QUFORjs7QUFTQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUVBO0FBRUU7QUFORjs7QUFTQTtBQUNBO0FBQ0E7QUFFQTtBQUVFO0FBTkY7O0FBU0E7QUFDRTs7QUFERjs7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTs7QUFHQTs7O0FBQ0E7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFNQTtBQUNBO0FBQ0E7QUFUQTtBQVVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBOztBQUNBOztBQU5BO0FBUUU7QUE1Q0Y7O0FBK0NBO0FBQ0U7O0FBREY7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7O0FBR0E7OztBQUNBOztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBTUE7QUFDQTtBQUNBO0FBVEE7QUFVQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVBO0FBQUE7QUFBQTs7QUFDQTtBQUVFO0FBdENGOztBQXlDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUU7QUFQRjs7QUFVQTtBQUNBO0FBRUE7QUFFRTtBQUxGOztBQVlBO0FBQ0U7O0FBREY7O0FBQ0E7O0FBR0E7O0FBRUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFNQTtBQUNBO0FBQ0E7QUFUQTtBQVVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUU7QUFyQkY7O0FBd0JBO0FBQ0U7O0FBREY7O0FBQ0E7O0FBR0E7OztBQUNBOzs7QUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFPQTtBQUNBO0FBQ0E7QUFWQTtBQVdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQU9BO0FBQ0E7QUFDQTtBQVZBO0FBV0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFRTtBQXhDRjs7QUEyQ0E7QUFDRTs7QUFERjs7QUFDQTs7QUFHQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDRTtBQUFBO0FBQ0Y7QUFBUTtBQUROO0FBRUY7QUFBUTtBQUZOO0FBR0Y7QUFIRTtBQUtGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUU7QUExQkY7O0FBNkJBOztBQUFBOztBQUNBO0FBQ0E7QUFFRTtBQUpGOztBQU9BO0FBQ0U7O0FBREY7O0FBQ0E7O0FBR0E7OztBQUNBOzs7QUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFFRjtBQUNBO0FBQ0E7QUFIUTtBQUROO0FBTUY7QUFDQTtBQUNBO0FBSFE7QUFMTjtBQVVGO0FBQ0E7QUFDQTtBQUhRO0FBVE47QUFjRjtBQWRFO0FBZ0JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFRTtBQW5ERjs7QUFzREE7QUFDRTs7QUFERjs7QUFDQTs7QUFHQTs7O0FBQ0E7O0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQU9BO0FBQ0E7QUFDQTtBQVZBO0FBV0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBT0E7QUFDQTtBQUNBO0FBVkE7QUFXQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVFO0FBdENGOztBQXlDQTtBQUNFOztBQURGOztBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7OztBQUdBOzs7QUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU1BO0FBQ0E7QUFDQTtBQVRBO0FBVUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTs7QUFOQTtBQVFFO0FBM0NGOztBQThDQTs7QUFBQTs7QUFDQTtBQUNBO0FBRUU7QUFKRjs7OztBQS9iQTs7QUFzY007OztBQUVOOztBQUFBOzs7QUFDQTs7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFNQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUxBO0FBTUE7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFGQTtBQS9CQTs7QUFvQ0E7O0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFBQTtBQVFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFiQTs7QUFEQTs7QUFpQkE7QUFDRTs7QUFERjs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFRTs7QUFDRjtBQUNBO0FBQ0k7QUFBQTtBQUVKO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFGVTtBQUROO0FBS0o7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUZVO0FBSk47QUFRSjtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBRlU7QUFQTjtBQVdKO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFaSTs7QUFIRjtBQWlCQTtBQXJCRjs7QUF3QkE7QUFDRTs7QUFERjs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFRTs7QUFDRjtBQUNBO0FBQ0k7QUFBQTtBQUVKO0FBQUE7QUFBQTs7QUFDQTtBQUZVO0FBRE47QUFLSjtBQUFBO0FBQUE7O0FBQ0E7QUFGVTtBQUpOO0FBT0o7QUFBQTtBQUFBOztBQVBJOztBQUhGO0FBWUE7QUFoQkY7O0FBbUJBO0FBQ0U7O0FBREY7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUU7O0FBQ0Y7QUFDQTtBQUNJO0FBQUE7QUFDSjtBQUFBO0FBQUE7O0FBQVU7QUFETjtBQUVKO0FBQUE7QUFBQTs7QUFBVTtBQUZOO0FBR0o7QUFBQTtBQUFBOztBQUFVO0FBSE47QUFJSjtBQUFBO0FBQUE7O0FBQVU7QUFKTjtBQUtKO0FBQUE7QUFBQTs7QUFMSTs7QUFIRjtBQVVBO0FBZEY7Ozs7QUFsR0E7O0FBb0hNOzs7QUFFTjs7QUFBQTs7O0FBQ0E7O0FBQ0E7QUFGQTs7QUFLQTtBQUFBO0FBQUE7O0FBRUE7QUFBQTtBQUFBOztBQUFBOzs7O0FBVEE7O0FBYU07OztBQUVOOztBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFBQTs7QUFHQTtBQWRBOztBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBSEE7QUFBQTtBQUpBOzs7O0FBbEJBOztBQTZCTTs7O0FBRU47QUFDRTs7QUFERjs7O0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDRTtBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUxBO0FBTUE7QUFDQTtBQUNBO0FBVEE7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoQkE7O0FBbUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFPQTtBQUNBO0FBQ0E7QUFWQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBbEJBO0FBQUE7QUFxQkE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUxBOztBQTFDRTtBQWtERjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBT0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFPQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFPQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBTEE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBU0E7QUFBQTtBQUFBOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUE3SEE7O0FBK0hBO0FBQ0U7O0FBREY7O0FBQ0E7QUFFQTtBQUFBOztBQUNBO0FBQUE7O0FBQ0E7QUFBQTs7QUFDQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUFBOztBQUNBO0FBQ0E7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7O0FBekJBOztBQTJCQTtBQUNBO0FBQ0E7QUFDQTtBQUhBOzs7O0FBNUpBOzs7O0FEOXhCQTtBQUFBOzs7O0FBTU07QUFHTDs7OztBQUFEOztBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTs7QUFLQTs7QUFDQTs7QUFDQTs7QUFHQTtBQUNFOztBQURGOzs7O0FBQ0E7QUFHQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBREE7QUFHQTtBQUFBOztBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7O0FBckNBOztBQXVDQTtBQUNFOztBQURGOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQU9BO0FBQ0E7QUFUQTtBQVVBO0FBQ0E7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQVZBO0FBWUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9FO0FBakNGOztBQW9DQTtBQUdFOztBQUhGOztBQUdBO0FBQ0U7QUFBQTtBQUNGO0FBREU7QUFJRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFRQTtBQWpCQTs7QUFvQkE7QUFDRTtBQUFGO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7QUFDQTtBQVZBOztBQWFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7Ozs7QUF6SUE7Ozs7QUROQTtBQUFBO0FBQUE7OztBQU1NO0FBR0w7Ozs7QUFBRDtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFFQTtBQUFBO0FBQUE7QUFGQTtBQUdBO0FBQUE7QUFBQTtBQUhBO0FBSUE7QUFBQTtBQUFBO0FBSkE7QUFLQTtBQUFBO0FBQUE7QUFMQTtBQU1BO0FBQUE7QUFBQTtBQU5BO0FBT0E7QUFBQTtBQUFBO0FBUEE7OztBQVdBO0FBQ0U7O0FBREY7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQUE7QUFBQTtBQUdFOztBQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIRTtBQU1GO0FBQUE7QUFBQTtBQUdBO0FBaENBOztBQW1DQTtBQUNFO0FBQUY7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFRTtBQUFBO0FBQUY7O0FBQUE7QUFBRTs7QUFORjs7QUFTQTs7QUFBQTs7QUFDQTtBQUFFOztBQUdGO0FBQUE7QUFBQTtBQUdBO0FBRUE7QUFBQTtBQUFBO0FBRUE7QUFKQTtBQUFBO0FBT0E7QUFFQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTEE7QUFBQTtBQU1BO0FBYkE7QUFIQTs7QUFKQTs7QUF1QkE7QUFDRTtBQUFGO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUU7QUFBQTs7QUFBRjtBQUFFO0FBRUY7QUFDQTtBQUFBOztBQURBO0FBR0E7QUFUQTs7QUFZQTtBQUNBO0FBQUU7O0FBRUY7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFBQTs7QUFUQTs7QUFlQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQVJBOztBQVdBO0FBQ0E7QUFDQTtBQUdBO0FBR0E7QUFFQTtBQVZBOzs7O0FBdkhBOztBQXFJTTs7O0FBRU47O0FBQUE7OztBQUNBOzs7QUFDQTs7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBOzs7QUFDQTs7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQUE7QUFBQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQTVCQTs7QUErQkE7QUFDRTtBQUFGO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFOQTs7OztBQWpDQTs7QUEwQ007QUFFTDs7OztBQUFEOztBQUFBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7QUFDQTtBQUVBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFWQTs7QUFhQTtBQUNFO0FBQUE7QUFBQTs7QUFBRjtBQUFFO0FBQ0E7QUFBQTs7QUFDRjtBQUNBO0FBQUE7O0FBQ0E7QUFIRTtBQUtGO0FBQ0E7QUFBQTs7QUFFQTtBQVZBOztBQWFBO0FBQ0U7O0FBREY7O0FBQ0E7QUFDQTtBQUVBO0FBQ0c7QUFBQTtBQUFIOztBQUNBO0FBREc7QUFESDtBQUFBO0FBSUc7QUFBQTtBQUFIOztBQUNBO0FBREc7QUFKSDs7QUFKQTs7QUFZQTtBQUNFOztBQURGOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBOztBQUdFO0FBWkY7Ozs7QUF4Q0E7O0FBdURNOzs7QUFFTjs7QUFBQTs7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBUEE7QUFRQTtBQUNBO0FBQ0E7QUFYQTs7QUFhQTtBQUNBOztBQWpDQTs7QUFvQ0E7QUFDRTtBQUFGO0FBQ0U7QUFBQTtBQUFGOztBQUFBO0FBQUU7O0FBRkY7O0FBSUE7QUFDRTtBQUFGO0FBQ0U7QUFBQTtBQUFGOztBQUFBO0FBQUU7O0FBRkY7O0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRUE7QUFBQTs7QUFQQTs7QUFVQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7O0FBS0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUFBOztBQVJBOzs7O0FBOURBOzs7O0FENU9BO0FBQUE7OztBQU1NO0FBR0w7Ozs7QUFBRDs7QUFHQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFFQTs7QUFrQkE7QUFDRTs7QUFERjs7QUFDQTs7QUFDQTs7O0FBQ0E7OztBQUNBOztBQUNBOztBQUVBOzs7QUFDQTs7O0FBQ0E7OztBQUNBOzs7QUFDQTs7O0FBQ0E7OztBQUNBOzs7QUFDQTs7O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFNQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBTkE7QUFPQTtBQUNBO0FBVEE7QUFVQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFRQTtBQUNBO0FBQ0E7QUFYQTtBQVlBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBSkE7QUFLQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU1BO0FBQ0E7QUFDQTtBQVRBO0FBVUE7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFKQTtBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFPQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDRzs7QUFESDs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVBBO0FBVUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBTkE7QUFPQTtBQUNBO0FBQ0E7QUFWQTtBQWFBO0FBQ0E7QUFHQTtBQUVBO0FBQ0c7O0FBQ0g7QUFDQTtBQUNBO0FBRUE7QUFMRzs7QUFRSDtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBREE7QUFEQTtBQUFBO0FBT0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFEQTtBQUFBO0FBU0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBREE7QUFGQTtBQUFBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQURBO0FBTUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQU9BO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFKQTtBQURBO0FBbkJBO0FBQUE7QUEyQkE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFEQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQURBO0FBTUE7QUFFSTtBQUFKO0FBQ0E7QUFDQTtBQUNBO0FBQ0s7QUFBTDtBQUNBO0FBSUE7QUFDQTtBQUFBOztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBREE7QUFHQTs7QUFkQTtBQWdCQTtBQUNBO0FBQUE7O0FBREE7QUFJSTtBQUFBO0FBQUo7O0FBQ0E7QUFBQTtBQUFBO0FBREk7O0FBekJKO0FBakJBO0FBQUE7QUE4Q0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQURBO0FBREE7QUFBQTtBQU9BO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIQTtBQUFBO0FBTUE7QUEzUkE7O0FBOFJBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUFBO0FBTEE7O0FBVUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUpBOztBQU9BO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFKQTs7QUFPQTtBQUNFOztBQURGOzs7QUFDQTs7O0FBQ0E7OztBQUNBOzs7QUFDQTs7O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQVBBO0FBUUE7QUFDQTtBQUNBO0FBWEE7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVBBOztBQWNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTs7QUFBQTtBQUVFO0FBL0NGOztBQWtEQTtBQUVFOztBQUZGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFVQTtBQUNBO0FBQ0E7QUFiQTtBQWdCQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUpBO0FBS0E7QUFDQTtBQVBBO0FBUUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQU5BO0FBT0E7QUFDQTtBQVRBO0FBVUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBTUE7QUFDQTtBQUNBOztBQUdBO0FBRUU7QUFoRUY7Ozs7QUF2WUE7Ozs7QUROQTtBQUFBOzs7O0FBTU07QUFFTjtBQUFDOzs7O0FBSUQ7QUFDQTs7O0FBR0E7O0FBQUE7OztBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBUUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFTQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUhBO0FBQUE7QUFLQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUhBO0FBQUE7QUFNQTtBQUFBO0FBQ0c7QUFBSDtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFBQTtBQUZBO0FBQUE7QUFJQTs7QUFkQTtBQUFBO0FBckNBOztBQXNEQTtBQUNBO0FBRUE7QUFBRTs7QUFFRjtBQUxBOzs7O0FBaEVBOzs7O0FETkE7QUFBQTs7QUFRQTs7QUFHQTs7QUFFQTtBQUFBOzs7QUFHQTs7QUFFQTtBQUFBOzs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTtBQUFBOzs7QUFDQTtBQUFBOzs7OztBRC9CQTs7O0FBQUE7O0FBRUE7O0FBTU07QUFDTjs7O0FBZ0JBOztBQUFBOztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFBQTtBQURBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFBQTtBQUNHO0FBQUg7QUFDQTtBQUFHOztBQUdIO0FBRUE7QUFBQTtBQUFBO0FBRUE7QUFKQTtBQUFBO0FBT0E7QUFEQTtBQUlBO0FBREE7QUFJQTtBQURBO0FBSUE7O0FBckJBO0FBQUE7QUF3QkE7QUFBQTtBQUNHO0FBQUg7QUFDQTtBQUFHOztBQUdIO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFQQTs7QUFMQTtBQUFBO0FBbkRBOztBQXNFQTs7QUFBQTs7QUFDQTtBQUFBOztBQUNBO0FBRkE7O0FBS0E7QUFBQTtBQUFBOztBQU9BO0FBQ0U7QUFBRjtBQUFFOztBQUNGO0FBQ0U7QUFIRjs7OztBQW5HQTs7OyJ9
