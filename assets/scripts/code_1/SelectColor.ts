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

    @property(cc.Prefab)
    colorBtn :cc.Prefab = undefined
    
    callback:Function = undefined;
    // LIFE-CYCLE CALLBACKS:
    
    
    onLoad () {
        var addNode = undefined;
        var offsetY = 0
        for (let index = 0; index < 5; index++) {
            addNode = cc.instantiate(this.colorBtn);
            this.node.addChild(addNode)
            addNode.y = offsetY
            offsetY = offsetY - 50
            addNode.getComponent("ColorBtn").setColor(index, (_index)=>{
                var _ = this.callback && this.callback(_index)
            });
        }
        // this.codeCtrl.weightedRandom(1,0.2);
        // this.makeNodeColorData(0, 1, 1);
    }

    
    start () {

    }

    setCallback(callback:Function){
        this.callback = callback
    }

    // update (dt) {}
}
