class B extends egret.DisplayObjectContainer{
    public constructor(){
         super();
         this.once(egret.Event.ADDED_TO_STAGE,this.init,this);   
    }
    private init(evt:Index){
        console.log(evt.index)
    }
}