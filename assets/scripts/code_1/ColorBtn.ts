// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import CodeCtrl from "./CodeCtrl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    _index:number = 0
    _callback:Function = undefined;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    setColor(index, callback){
        this._index = index
        this._callback = callback;
        this.bg.node.color = CodeCtrl.getInstance().getColorByIndex(index);
    }

    onClicked(){
        this._callback(this._index);
    }

    // update (dt) {}
}
