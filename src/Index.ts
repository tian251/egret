class Index extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this)
    }
    public index;
    private init(){
      var sign:egret.Bitmap = new egret.Bitmap(RES.getRes('sign'));
      this.addChild(sign);
      var font:egret.Bitmap = new egret.Bitmap(RES.getRes('font'));
      this.addChild(font);
      font.x=this.stage.stageWidth/2-font.width/2;
      font.y=200;
      var msk:egret.Bitmap = new egret.Bitmap(RES.getRes('msk'));
      msk.height=0;
      this.addChild(msk);
      msk.x=font.x;
      msk.y=font.y;
      var scall:egret.Bitmap  =new egret.Bitmap(RES.getRes('scall'));
      this.addChild(scall);
      var scall_drow:egret.Bitmap = new egret.Bitmap(RES.getRes('scall'));
      this.addChild(scall_drow)
      scall_drow.x=this.stage.stageWidth/2-scall_drow.width/2;
      scall.x=this.stage.stageWidth/2-scall_drow.width/2;
      scall.y=font.y-scall.height;
      scall_drow.y=font.y;
      font.mask=msk;
      egret.Tween.get(msk).to({height:font.height},1000);
      egret.Tween.get(scall_drow).to({y:font.y+font.height},1000);
    }
    private onIndex(){
      this.index=1;
        
        this.dispatchEventWith('pageEnd', true, { index: this.index},);
    }
}