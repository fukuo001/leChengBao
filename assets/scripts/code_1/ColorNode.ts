// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:

import CodeCtrl from "./CodeCtrl";

//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    bg: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    setColor(colorIndex:number){
        this.bg.color = CodeCtrl.getInstance().getColorByIndex(colorIndex)
    }

    // update (dt) {}
}
