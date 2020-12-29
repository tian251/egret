var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Index = (function (_super) {
    __extends(Index, _super);
    function Index() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    Index.prototype.init = function () {
        var sign = new egret.Bitmap(RES.getRes('sign'));
        this.addChild(sign);
        var font = new egret.Bitmap(RES.getRes('font'));
        this.addChild(font);
        font.x = this.stage.stageWidth / 2 - font.width / 2;
        font.y = 200;
        var msk = new egret.Bitmap(RES.getRes('msk'));
        msk.height = 0;
        this.addChild(msk);
        msk.x = font.x;
        msk.y = font.y;
        var scall = new egret.Bitmap(RES.getRes('scall'));
        this.addChild(scall);
        var scall_drow = new egret.Bitmap(RES.getRes('scall'));
        this.addChild(scall_drow);
        scall_drow.x = this.stage.stageWidth / 2 - scall_drow.width / 2;
        scall.x = this.stage.stageWidth / 2 - scall_drow.width / 2;
        scall.y = font.y - scall.height;
        scall_drow.y = font.y;
        font.mask = msk;
        egret.Tween.get(msk).to({ height: font.height }, 1000);
        egret.Tween.get(scall_drow).to({ y: font.y + font.height }, 1000);
    };
    Index.prototype.onIndex = function () {
        this.index = 1;
        this.dispatchEventWith('pageEnd', true, { index: this.index });
    };
    return Index;
}(egret.DisplayObjectContainer));
__reflect(Index.prototype, "Index");
