declare namespace muzhiEgret {
    /**
     * 统计
     */
    function tongji(eventName: string, eventType?: string, eventValue?: number): void;
    interface ajaxOptions {
        url: string;
        type?: string;
        data?: any;
        timeout?: number;
        noMuzhiHeader?: boolean;
        before?(re: any): void;
        success?(re: any): void;
        error?(re: any): void;
    }
    /**
     * 请参照jquery
     */
    function ajax(options: ajaxOptions): void;
    /**
     * 根据name关键字创建一个Bitmap对象
     */
    function createBitmapByName(name: string): egret.Bitmap;
    function center(target: any, pTarget?: any): void;
    function middle(target: any, pTarget?: any): void;
    function tips(msg: string): void;
    /** 2.0 */
    /**
         * 根据name关键字创建一个Bitmap对象。此name 是根据TexturePacker 组合成的一张位图
         * 2.0
         */
    function createBitmapFromSheet(name: string, sheetName: string): egret.Bitmap;
    /**
     * 获取url参数对象
     */
    function getSearchArgs(search?: string): any;
    /**
     * 随机id
     */
    function randomId(): string;
    /**
     * 数据克隆
     */
    function clone(data: any): any;
    /**
     * 异步执行
     */
    function async(fn: Function): void;
}
declare namespace muzhiEgret {
    class TipsClass extends egret.Sprite {
        private layer;
        private textField;
        private timeout;
        constructor();
        private init();
        private destroy();
        tips(msg: string): void;
    }
}
declare namespace muzhiEgret {
    class Scroller {
        constructor(target: egret.DisplayObjectContainer | egret.Sprite, viewHeight: number, barColor?: number);
        private target;
        private touchBg;
        private barColor;
        private viewHeight;
        private max;
        private startY;
        private currentY;
        private scrollBar;
        private scrollInfo;
        static barWidth: number;
        static barAniTime: number;
        private init();
        reset(): void;
        private createTouchBg();
        private createScrollBar();
        private scrollBarInfo();
        private addEvent();
        private removeEvent();
        private touchStart(e);
        private touchMove(e);
        private touchEnd(e);
        private destroy();
    }
}
declare namespace muzhiEgret {
    class MusicPlayer {
        constructor(sound: egret.Sound, options?: {});
        status: string;
        private sound;
        private channel;
        private position;
        private loops;
        private options;
        play(startTime?: number, loops?: number): void;
        pause(): void;
        stop(): void;
        private changeStatus(status);
        private addEvent();
        private removeEvent();
        private complete();
    }
}
declare namespace muzhiEgret {
    namespace sub {
        /**
         * 订阅事件
         * @param  { String }   name 事件名称
         * @param  { Function } fn   处理函数
         * @return { String }        事件id,用于取消订阅
         */
        function sub(name: string, fn: Function): string;
        /**
         * 订阅事件
         * @param  { String }   name 事件名称
         * @param  { Function } fn   处理函数
         * @return { String }        事件id,用于取消订阅
         */
        function once(name: string, fn: Function): string;
        /**
         * 发布事件
         * @param  { String }   name 事件名称
         * @param  { Any } data 数据
         */
        function pub(name: string, data?: any): void;
        /**
         * 取消订阅
         * @param  { String } id 订阅事件id
         */
        function unsub(id: string): void;
        /**
         * 清除一个事件
         * @param  { String }   name 事件名称
         */
        function clear(name: string): void;
    }
}
declare namespace muzhiEgret {
    class Placeholder {
        constructor(target: egret.TextField, tips: string);
        private target;
        private tips;
        private init();
        private addEvent();
        private removeEvent();
        private focusIn();
        private focusOut();
        private destroy();
    }
}
declare namespace muzhiEgret {
    class OperationChain {
        constructor();
        private list;
        add(handle: Function): void;
        run(): void;
    }
}
declare namespace muzhiEgret {
    class DragonbonesSprite extends egret.Sprite {
        constructor(dataName: string, textureName: string, photoName: string, armatureName: string, frameName: string);
        private dataName;
        private textureName;
        private photoName;
        private armatureName;
        private frameName;
        armature: dragonBones.Armature;
        private init();
        private addEvent();
        private removeEvent();
        private destroy();
    }
}
interface routeOptions {
    page: string;
    type?: string;
    time?: number;
    end?: Function;
}
declare namespace muzhiEgret {
    namespace route {
        var aniType: string;
        var aniTime: number;
        function to(options: routeOptions, ...params: any[]): void;
        function setCurrent(page: egret.DisplayObjectContainer | egret.Sprite): void;
        function getCurrent(): any;
    }
}
