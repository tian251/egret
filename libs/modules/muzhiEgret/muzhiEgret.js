var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var muzhiEgret;
(function (muzhiEgret) {
    /**
     * 统计
     */
    function tongji(eventName, eventType, eventValue) {
        if (eventType === void 0) { eventType = 'click'; }
        if (eventValue === void 0) { eventValue = 1; }
        if (typeof window['_czc'] === 'undefined') {
            window['_czc'] = [];
        }
        window['_czc'].push(["_trackEvent", eventName, eventType, 'startup', eventValue]);
    }
    muzhiEgret.tongji = tongji;
    /**
     * 请参照jquery
     */
    function ajax(options) {
        var self = this, isPost = (options.type || '').toLowerCase() === 'post', request = new egret.HttpRequest(), timeout;
        if (!isPost && options.data) {
            options.url =
                options.url
                    +
                        (options.url.indexOf('?') !== -1
                            ?
                                '&'
                            :
                                '?')
                    +
                        param(options.data);
        }
        function done(event) {
            var request = event.currentTarget, data = JSON.parse(request.response);
            if (timeout) {
                clearTimeout(timeout);
            }
            if (typeof options.success === 'function') {
                options.success(data);
            }
        }
        function error(e) {
            if (timeout) {
                clearTimeout(timeout);
            }
            if (typeof options.error === 'function') {
                options.error(e);
            }
        }
        function removeEvent() {
            request.removeEventListener(egret.Event.COMPLETE, done, self);
            request.removeEventListener(egret.IOErrorEvent.IO_ERROR, error, self);
        }
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(options.url, isPost
            ?
                egret.HttpMethod.POST
            :
                egret.HttpMethod.GET);
        if (!options.noMuzhiHeader) {
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            if (window['muzhi'] && window['muzhi'].weixin && window['muzhi'].weixin.mz_jwt) {
                request.setRequestHeader("Authorization", "Bearer " + window['muzhi'].weixin.mz_jwt);
            }
        }
        if (typeof options.before === 'function') {
            options.before(request);
        }
        if (isPost && options.data) {
            request.send(param(options.data));
        }
        else {
            request.send();
        }
        if (options.timeout) {
            timeout = setTimeout(function () {
                request.abort();
            }, options.timeout);
        }
        request.addEventListener(egret.Event.COMPLETE, done, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this);
    }
    muzhiEgret.ajax = ajax;
    function param() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var a = [].slice.call(arguments), p = a.shift(), r = [], i, iMax, o;
        if (p === null)
            return p;
        if (p.constructor === Array) {
            i = 0;
            iMax = p.length;
            for (; i < iMax; i++) {
                o = p[i];
                r[r.length] = paramClass(o, a.slice(), i);
            }
            return r.join('&');
        }
        else if (p.constructor === Object) {
            for (i in p) {
                o = p[i];
                r[r.length] = paramClass(o, a.slice(), i);
            }
            return r.join('&');
        }
        else {
            return p;
        }
    }
    function paramClass(o, _a, i) {
        _a[_a.length] = i;
        if (typeof o === 'object') {
            _a.unshift(o);
            return param.apply(this, _a);
        }
        else {
            _a[_a.length] = o;
            return pPfix.apply(this, _a);
        }
    }
    function pPfix() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var a = [].slice.call(arguments), f = encodeURIComponent(a.shift()), l = '=' + encodeURIComponent(a.pop()), i = 0, j = a.length, _a = [];
        for (; i < j; i++) {
            _a[i] = encodeURIComponent('[' + a[i] + ']');
        }
        _a[_a.length] = l;
        _a.unshift(f);
        return _a.join('');
    }
    /**
     * 根据name关键字创建一个Bitmap对象
     */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    muzhiEgret.createBitmapByName = createBitmapByName;
    function center(target, pTarget) {
        var parent = pTarget || target.parent || egret.MainContext.instance.stage, w = typeof parent.stageWidth === 'undefined'
            ?
                parent.width
            :
                parent.stageWidth;
        if (w > target.width) {
            target.x = (w - target.width) / 2;
        }
        else {
            target.x = (target.width - w) / 2;
        }
    }
    muzhiEgret.center = center;
    function middle(target, pTarget) {
        var parent = pTarget || target.parent || egret.MainContext.instance.stage, h = typeof parent.stageHeight === 'undefined'
            ?
                parent.height
            :
                parent.stageHeight;
        if (h > target.height) {
            target.y = (h - target.height) / 2;
        }
        else {
            target.y = (target.height - h) / 2;
        }
    }
    muzhiEgret.middle = middle;
    var nTips;
    function tips(msg) {
        if (!nTips) {
            nTips = new muzhiEgret.TipsClass();
            egret.MainContext.instance.stage.addChild(nTips);
        }
        nTips.tips(msg);
    }
    muzhiEgret.tips = tips;
    ;
    /** 2.0 */
    /**
         * 根据name关键字创建一个Bitmap对象。此name 是根据TexturePacker 组合成的一张位图
         * 2.0
         */
    function createBitmapFromSheet(name, sheetName) {
        var sheet = RES.getRes(sheetName);
        var texture = sheet.getTexture(name);
        var result = new egret.Bitmap();
        result.texture = texture;
        return result;
    }
    muzhiEgret.createBitmapFromSheet = createBitmapFromSheet;
    /**
     * 获取url参数对象
     */
    function getSearchArgs(search) {
        search = search || window.location.search;
        var qs = search.length > 0 ? search.substring(1) : "", args = {}, items = qs && qs.split("&") || [], item, i = 0, len = items.length;
        for (; i < len; i++) {
            item = items[i].split("=");
            args[item[0]] = item[1];
        }
        return args;
    }
    muzhiEgret.getSearchArgs = getSearchArgs;
    var id = Math.random().toString(36).substring(2, 6), num = 0;
    /**
     * 随机id
     */
    function randomId() {
        return id + (++num);
    }
    muzhiEgret.randomId = randomId;
    /**
     * 数据克隆
     */
    function clone(data) {
        var i, iMax, result;
        switch (data != null && data.constructor) {
            case Array:
                i = 0;
                iMax = data.length;
                result = [];
                for (; i < iMax; i++) {
                    result[i] = clone(data[i]);
                }
                return result;
            case Object:
                result = {};
                for (i in data) {
                    result[i] = clone(data[i]);
                }
                return result;
        }
        return data;
    }
    muzhiEgret.clone = clone;
    /**
     * 异步执行
     */
    function async(fn) {
        setTimeout(fn);
    }
    muzhiEgret.async = async;
})(muzhiEgret || (muzhiEgret = {}));
var muzhiEgret;
(function (muzhiEgret) {
    var TipsClass = (function (_super) {
        __extends(TipsClass, _super);
        function TipsClass() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.destroy, _this);
            return _this;
        }
        TipsClass.prototype.init = function () {
            var width = this.stage.stageWidth - 20, height = 80, layer = new egret.Sprite(), border = new egret.Shape(), textField = new egret.TextField();
            border.graphics.beginFill(0x000000, 0.8);
            border.graphics.lineStyle(3, 0x000000);
            border.graphics.drawRoundRect(10, 0, width, height, 30, 30);
            border.graphics.endFill();
            textField.width = width;
            textField.height = height;
            textField.verticalAlign = 'middle';
            textField.textAlign = 'center';
            textField.size = 30;
            textField.text = '';
            textField.textColor = 0xffffff;
            layer.addChild(border);
            layer.addChild(textField);
            layer.y = (this.stage.stageHeight - height) / 2;
            layer.alpha = 0;
            layer.visible = false;
            this.textField = textField;
            this.layer = layer;
            this.addChild(layer);
        };
        TipsClass.prototype.destroy = function () {
            egret.Tween.pauseTweens(this.layer);
        };
        TipsClass.prototype.tips = function (msg) {
            var self = this;
            this.textField.text = msg;
            clearTimeout(this.timeout);
            this.layer.visible = true;
            egret.Tween.pauseTweens(this.layer);
            this.parent.setChildIndex(this, 10);
            egret.Tween
                .get(this.layer)
                .to({
                alpha: 1
            }, 200)
                .call(function () {
                this.timeout = setTimeout(function () {
                    egret.Tween
                        .get(self.layer)
                        .to({
                        alpha: 0
                    }, 200)
                        .call(function () {
                        self.layer.visible = false;
                    }, self);
                }, 2000);
            }, this);
        };
        return TipsClass;
    }(egret.Sprite));
    muzhiEgret.TipsClass = TipsClass;
})(muzhiEgret || (muzhiEgret = {}));
var muzhiEgret;
(function (muzhiEgret) {
    var Scroller = (function () {
        function Scroller(target, viewHeight, barColor) {
            this.target = target;
            this.viewHeight = viewHeight;
            this.barColor = barColor || 0x555555;
            this.init();
        }
        Scroller.prototype.init = function () {
            var target = this.target, rect = target.scrollRect
                ||
                    new egret.Rectangle(0, 0, target.width, this.viewHeight);
            this.max = target.height - this.viewHeight;
            if (this.max < 1)
                return;
            this.scrollInfo = this.scrollBarInfo();
            this.createTouchBg();
            this.createScrollBar();
            if (rect.y > this.max) {
                rect.y = this.max;
            }
            target.scrollRect = new egret.Rectangle(0, 0, target.width, this.viewHeight);
            target.cacheAsBitmap = true;
            this.addEvent();
        };
        Scroller.prototype.reset = function () {
            this.destroy();
            this.init();
        };
        Scroller.prototype.createTouchBg = function () {
            var target = this.target, bg = new egret.Shape();
            bg.graphics.beginFill(0xffffff, 0);
            bg.graphics.drawRect(0, 0, target.width, target.height);
            bg.graphics.endFill();
            //添加透明背景，让空白的地方也可以触发事件
            target.addChildAt(bg, 0);
            this.touchBg = bg;
        };
        Scroller.prototype.createScrollBar = function () {
            var target = this.target, scrollInfo = this.scrollInfo, scrollBar = new egret.Shape(), barWidth = muzhiEgret.Scroller.barWidth;
            scrollBar.graphics.beginFill(this.barColor);
            scrollBar.graphics.drawRect(0, 0, barWidth, scrollInfo.height);
            scrollBar.graphics.endFill();
            scrollBar.x = target.width - barWidth;
            scrollBar.alpha = 0;
            target.addChildAt(scrollBar, 100);
            this.scrollBar = scrollBar;
        };
        Scroller.prototype.scrollBarInfo = function () {
            var height = this.target.height, viewHeight = this.viewHeight, percent, barHeight;
            if (viewHeight < height) {
                percent = viewHeight / height;
                barHeight = Math.max(viewHeight * percent, 5);
                return {
                    height: barHeight | 0,
                    max: viewHeight - barHeight | 0
                };
            }
            else {
                return {
                    height: 0,
                    max: 0
                };
            }
        };
        Scroller.prototype.addEvent = function () {
            var target = this.target;
            target.touchEnabled = true;
            target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStart, this);
            target.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
            target.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            target.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
            target.addEventListener(egret.Event.REMOVED, this.destroy, this);
        };
        Scroller.prototype.removeEvent = function () {
            var target = this.target;
            target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStart, this);
            target.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
            target.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            target.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
            target.removeEventListener(egret.Event.REMOVED, this.destroy, this);
        };
        Scroller.prototype.touchStart = function (e) {
            var rect = this.target.scrollRect;
            e.stopPropagation();
            this.startY = e.stageY;
            this.currentY = rect.y;
            egret.Tween.pauseTweens(this.scrollBar);
            egret.Tween.get(this.scrollBar)
                .to({
                alpha: 1
            }, muzhiEgret.Scroller.barAniTime);
        };
        Scroller.prototype.touchMove = function (e) {
            var target = this.target, rect = target.scrollRect, distance, endY;
            e.stopPropagation();
            if (typeof this.startY === 'number') {
                distance = this.startY - e.stageY;
                endY = this.currentY + distance;
                if (endY > this.max) {
                    endY = this.max;
                }
                else if (endY < 0) {
                    endY = 0;
                }
                rect.y = endY;
                target.scrollRect = rect;
                this.scrollBar.y = endY + this.scrollInfo.max * endY / this.max | 0;
            }
        };
        Scroller.prototype.touchEnd = function (e) {
            e.stopPropagation();
            if (typeof this.startY === 'number') {
                egret.Tween.pauseTweens(this.scrollBar);
                egret.Tween.get(this.scrollBar)
                    .to({
                    alpha: 0
                }, muzhiEgret.Scroller.barAniTime);
                this.startY = null;
            }
        };
        Scroller.prototype.destroy = function () {
            var target = this.target;
            this.removeEvent();
            if (this.touchBg) {
                target.removeChild(this.touchBg);
                this.touchBg = null;
            }
            if (this.scrollBar) {
                target.removeChild(this.scrollBar);
                this.scrollBar = null;
            }
        };
        return Scroller;
    }());
    Scroller.barWidth = 8;
    Scroller.barAniTime = 500;
    muzhiEgret.Scroller = Scroller;
})(muzhiEgret || (muzhiEgret = {}));
var muzhiEgret;
(function (muzhiEgret) {
    var MusicPlayer = (function () {
        function MusicPlayer(sound, options) {
            if (options === void 0) { options = {}; }
            this.status = 'stop';
            this.position = 0;
            this.loops = 0;
            this.options = {
                play: function () { },
                pause: function () { },
                stop: function () { }
            };
            this.sound = sound;
            if (typeof options['play'] === 'function') {
                this.options['play'] = options['play'];
            }
            if (typeof options['pause'] === 'function') {
                this.options['pause'] = options['pause'];
            }
            if (typeof options['stop'] === 'function') {
                this.options['stop'] = options['stop'];
            }
        }
        MusicPlayer.prototype.play = function (startTime, loops) {
            if (startTime === void 0) { startTime = 0; }
            if (loops === void 0) { loops = 0; }
            this.loops = loops;
            if (this.status === 'stop' || this.status === 'pause') {
                this.channel = this.sound.play(this.status === 'pause' ? this.position : startTime, 1);
                this.addEvent();
                this.changeStatus('play');
            }
        };
        MusicPlayer.prototype.pause = function () {
            if (!(this.channel && this.status === 'play'))
                return;
            this.position = this.channel.position;
            this.channel.stop();
            this.changeStatus('pause');
            this.removeEvent();
            this.channel = null;
        };
        MusicPlayer.prototype.stop = function () {
            if (!this.channel)
                return;
            this.position = 0;
            this.channel.stop();
            this.changeStatus('stop');
            this.removeEvent();
            this.channel = null;
        };
        MusicPlayer.prototype.changeStatus = function (status) {
            this.status = status;
            this.options[status]();
        };
        MusicPlayer.prototype.addEvent = function () {
            this.channel.addEventListener(egret.Event.SOUND_COMPLETE, this.complete, this);
        };
        MusicPlayer.prototype.removeEvent = function () {
            this.channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.complete, this);
        };
        MusicPlayer.prototype.complete = function () {
            this.stop();
            if (this.loops === 0) {
                this.play();
            }
        };
        return MusicPlayer;
    }());
    muzhiEgret.MusicPlayer = MusicPlayer;
})(muzhiEgret || (muzhiEgret = {}));
var muzhiEgret;
(function (muzhiEgret) {
    var sub;
    (function (sub_1) {
        var caches = {}, idTable = {};
        function createSub(name) {
            var item = {
                data: null,
                pubed: false,
                list: {}
            };
            caches[name] = item;
        }
        function run(name) {
            muzhiEgret.async(function () {
                var item = caches[name], list = item.list, i;
                for (i in list) {
                    list[i](muzhiEgret.clone(item.data));
                }
            });
        }
        /**
         * 订阅事件
         * @param  { String }   name 事件名称
         * @param  { Function } fn   处理函数
         * @return { String }        事件id,用于取消订阅
         */
        function sub(name, fn) {
            var item, id;
            if (!caches[name]) {
                createSub(name);
            }
            item = caches[name];
            id = muzhiEgret.randomId();
            idTable[id] = {
                name: name
            };
            item.list[id] = fn;
            if (item.pubed) {
                muzhiEgret.async(function () {
                    fn(muzhiEgret.clone(item.data));
                });
            }
            return id;
        }
        sub_1.sub = sub;
        /**
         * 订阅事件
         * @param  { String }   name 事件名称
         * @param  { Function } fn   处理函数
         * @return { String }        事件id,用于取消订阅
         */
        function once(name, fn) {
            var self = this, subId = this.sub(name, function (data) {
                self.unsub(subId);
                fn(data);
            });
            return subId;
        }
        sub_1.once = once;
        /**
         * 发布事件
         * @param  { String }   name 事件名称
         * @param  { Any } data 数据
         */
        function pub(name, data) {
            var item, hasSub = !!caches[name];
            if (!hasSub) {
                createSub(name);
            }
            item = caches[name];
            item.pubed = true;
            item.data = data;
            if (hasSub) {
                run(name);
            }
        }
        sub_1.pub = pub;
        /**
         * 取消订阅
         * @param  { String } id 订阅事件id
         */
        function unsub(id) {
            var table = idTable[id];
            if (table) {
                delete caches[table['name']].list[id];
                delete idTable[id];
            }
        }
        sub_1.unsub = unsub;
        /**
         * 清除一个事件
         * @param  { String }   name 事件名称
         */
        function clear(name) {
            var i;
            for (i in idTable) {
                if (idTable[i]['name'] === name) {
                    delete idTable[i];
                }
            }
            delete caches[name];
        }
        sub_1.clear = clear;
    })(sub = muzhiEgret.sub || (muzhiEgret.sub = {}));
})(muzhiEgret || (muzhiEgret = {}));
var muzhiEgret;
(function (muzhiEgret) {
    var Placeholder = (function () {
        function Placeholder(target, tips) {
            this.target = target;
            this.tips = tips;
            this.init();
        }
        Placeholder.prototype.init = function () {
            this.target.text = this.tips;
            this.addEvent();
        };
        Placeholder.prototype.addEvent = function () {
            this.target.addEventListener(egret.FocusEvent.FOCUS_IN, this.focusIn, this);
            this.target.addEventListener(egret.FocusEvent.FOCUS_OUT, this.focusOut, this);
            this.target.addEventListener(egret.Event.REMOVED, this.destroy, this);
        };
        Placeholder.prototype.removeEvent = function () {
            this.target.removeEventListener(egret.FocusEvent.FOCUS_IN, this.focusIn, this);
            this.target.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.focusOut, this);
            this.target.removeEventListener(egret.Event.REMOVED, this.destroy, this);
        };
        Placeholder.prototype.focusIn = function () {
            var target = this.target;
            if (target.text === this.tips) {
                target.text = '';
            }
        };
        Placeholder.prototype.focusOut = function () {
            var target = this.target;
            if (target.text === '') {
                target.text = this.tips;
            }
        };
        Placeholder.prototype.destroy = function () {
            this.removeEvent();
        };
        return Placeholder;
    }());
    muzhiEgret.Placeholder = Placeholder;
})(muzhiEgret || (muzhiEgret = {}));
var muzhiEgret;
(function (muzhiEgret) {
    var OperationChain = (function () {
        function OperationChain() {
            this.list = [];
        }
        OperationChain.prototype.add = function (handle) {
            var list = this.list;
            if (typeof handle !== 'function')
                return;
            list[list.length] = function () {
                var next = list.shift() || function () { };
                Array.prototype.push.call(arguments, next);
                handle.apply(null, arguments);
            };
        };
        OperationChain.prototype.run = function () {
            var list = this.list;
            if (list.length > 0) {
                list.shift()();
            }
        };
        return OperationChain;
    }());
    muzhiEgret.OperationChain = OperationChain;
})(muzhiEgret || (muzhiEgret = {}));
var muzhiEgret;
(function (muzhiEgret) {
    var DragonbonesSprite = (function (_super) {
        __extends(DragonbonesSprite, _super);
        function DragonbonesSprite(dataName, textureName, photoName, armatureName, frameName) {
            var _this = _super.call(this) || this;
            _this.dataName = dataName;
            _this.textureName = textureName;
            _this.photoName = photoName;
            _this.armatureName = armatureName;
            _this.frameName = frameName;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.destroy, _this);
            return _this;
        }
        DragonbonesSprite.prototype.init = function () {
            var dragonbonesData = RES.getRes(this.dataName), textureData = RES.getRes(this.textureName), texture = RES.getRes(this.photoName), armature, dragonbonesFactory = new dragonBones.EgretFactory();
            dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
            armature = dragonbonesFactory.buildArmature(this.armatureName);
            this.addChild(armature.display);
            this.armature = armature;
            this.addEvent();
            this.armature.animation.gotoAndPlay(this.frameName);
        };
        DragonbonesSprite.prototype.addEvent = function () {
            dragonBones.WorldClock.clock.add(this.armature);
        };
        DragonbonesSprite.prototype.removeEvent = function () {
            dragonBones.WorldClock.clock.remove(this.armature);
        };
        DragonbonesSprite.prototype.destroy = function () {
            this.removeEvent();
        };
        return DragonbonesSprite;
    }(egret.Sprite));
    muzhiEgret.DragonbonesSprite = DragonbonesSprite;
})(muzhiEgret || (muzhiEgret = {}));
var muzhiEgret;
(function (muzhiEgret) {
    var route;
    (function (route) {
        var currentPage;
        route.aniType = 'common';
        route.aniTime = 200;
        function to(options) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            var stage = egret.MainContext.instance.stage, pageClass = window[options.page], ani = {
                left: left,
                right: right,
                top: top,
                bottom: bottom,
                alpha: alpha,
                common: common
            }[options.type || route.aniType];
            if (!pageClass) {
                throw "没有" + options.page + '页面';
            }
            options.type = options.type || route.aniType;
            options.time = typeof options.time === 'undefined' ? route.aniTime : options.time;
            options.end = options.end || function () {
            };
            ani(new (Function.prototype.bind.apply(pageClass, [null].concat(params)))(), options);
        }
        route.to = to;
        function setCurrent(page) {
            currentPage = page;
        }
        route.setCurrent = setCurrent;
        function getCurrent() {
            return currentPage;
        }
        route.getCurrent = getCurrent;
        function aniEnd(newPage, options) {
            if (currentPage) {
                egret.Tween.pauseTweens(currentPage);
                currentPage.parent.removeChild(currentPage);
            }
            currentPage = newPage;
            options.end(currentPage);
        }
        function common(newPage, options) {
            var stage = egret.MainContext.instance.stage;
            if (currentPage) {
                stage.removeChild(currentPage);
            }
            currentPage = newPage;
            stage.addChild(currentPage);
            options.end(currentPage);
        }
        function left(newPage, options) {
            var stage = egret.MainContext.instance.stage, width = stage.stageWidth;
            if (currentPage) {
                egret.Tween.get(currentPage)
                    .to({
                    x: width
                }, options.time, egret.Ease.sineIn);
            }
            newPage.x = -width;
            stage.addChild(newPage);
            egret.Tween.get(newPage)
                .to({
                x: 0
            }, options.time, egret.Ease.sineIn)
                .call(function () {
                aniEnd(newPage, options);
            });
        }
        function right(newPage, options) {
            var stage = egret.MainContext.instance.stage, width = stage.stageWidth;
            if (currentPage) {
                egret.Tween.get(currentPage)
                    .to({
                    x: -width
                }, options.time, egret.Ease.sineIn);
            }
            newPage.x = width;
            stage.addChild(newPage);
            egret.Tween.get(newPage)
                .to({
                x: 0
            }, options.time, egret.Ease.sineIn)
                .call(function () {
                aniEnd(newPage, options);
            });
        }
        function top(newPage, options) {
            var stage = egret.MainContext.instance.stage, height = stage.stageHeight;
            if (currentPage) {
                egret.Tween.get(currentPage)
                    .to({
                    y: height
                }, options.time, egret.Ease.sineIn);
            }
            newPage.y = -height;
            stage.addChild(newPage);
            egret.Tween.get(newPage)
                .to({
                y: 0
            }, options.time, egret.Ease.sineIn)
                .call(function () {
                aniEnd(newPage, options);
            });
        }
        function bottom(newPage, options) {
            var stage = egret.MainContext.instance.stage, height = stage.stageHeight;
            if (currentPage) {
                egret.Tween.get(currentPage)
                    .to({
                    y: -height
                }, options.time, egret.Ease.sineIn);
            }
            newPage.y = height;
            stage.addChild(newPage);
            egret.Tween.get(newPage)
                .to({
                y: 0
            }, options.time, egret.Ease.sineIn)
                .call(function () {
                aniEnd(newPage, options);
            });
        }
        function alpha(newPage, options) {
            var stage = egret.MainContext.instance.stage;
            if (currentPage) {
                egret.Tween.get(currentPage)
                    .to({
                    alpha: 0
                }, options.time, egret.Ease.sineIn);
            }
            newPage.alpha = 0;
            stage.addChild(newPage);
            egret.Tween.get(newPage)
                .to({
                alpha: 1
            }, options.time, egret.Ease.sineIn)
                .call(function () {
                aniEnd(newPage, options);
            });
        }
    })(route = muzhiEgret.route || (muzhiEgret.route = {}));
})(muzhiEgret || (muzhiEgret = {}));
