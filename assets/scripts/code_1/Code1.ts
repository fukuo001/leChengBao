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

    colorData:Array<Array<number>> = [];

    @property(cc.EditBox)
    inputX:cc.EditBox = undefined;

    @property(cc.EditBox)
    inputY:cc.EditBox = undefined;

    @property(cc.Node)
    nodeGroup:cc.Node = undefined;

    _colorNodes:Array<Array<any>> = [];

    @property(cc.Prefab)
    colorNode:cc.Prefab = undefined;

    _width:number = 10;
    _height:number = 10;
    _startColor:number = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initNodeColorData()
        this.initAddColorNodes()

        this.node.getChildByName("select_color").getComponent("SelectColor").setCallback((_index)=> {
            this._startColor = _index
            this.onClickBtn()
        })
    }

    onClickBtn(){
        var x = Number(this.inputX.string)
        var y = Number(this.inputY.string)
        var start = 0;
        console.log("",Number.isNaN(x), Number.isNaN(y))
        if (!Number.isNaN(x) && !Number.isNaN(y) && x > 0  && y > 0 && x + y < 100) {
            this.makeNodeColorData(this._startColor, x / 100, y / 100)
        }
    }

    start () {

    }

    initAddColorNodes(){
        var node = undefined;
        for (let i = 0; i < this._width; i++) {
            this._colorNodes[i] = [];
            for (let j = 0; j < 10; j++) {
                node = cc.instantiate(this.colorNode)
                this.nodeGroup.addChild(node)
                this._colorNodes[i][j] = node.getComponent("ColorNode")
            }
        }
    }

    updateColorNodes() {
        for (let i = 0; i < this._colorNodes.length; i++) {
            for (let j = 0; j < this._colorNodes[i].length; j++) {
                this._colorNodes[i][j].setColor(this.getColorDataByIndex(i,j));
            }
            
        }
    }

    initNodeColorData(){
        for (let i = 0; i < this._width; i++) {
            this.colorData[i] = [];
            for (let j = 0; j < 10; j++) {
                this.colorData[i][j] = 0;
            }
        }
    }

    

    makeNodeColorData(startColor:number, X:number, Y:number){
        var colorList = {}
        var probability_n = -1
        var probability_m = -1
        var colorIndex = 0
        for (let i = 0; i < this._width; i++) {
            // this.colorData[] = {}
            for (let j = 0; j < this._height; j++) {
                if (i === 0 && j == 0) {
                    this.colorData[i][j] = startColor
                }else{
                    probability_n = this.getColorDataByIndex(i,j-1);
                    probability_m = this.getColorDataByIndex(i-1,j);
                    if (probability_n ===  probability_m && probability_n !== undefined ) {
                        this.colorData[i][j] = CodeCtrl.getInstance().weightedRandom( this.colorData[i][j-1], Y);
                    }else{
                        if (probability_n !== undefined && probability_m != undefined ) {
                            this.colorData[i][j] = CodeCtrl.getInstance().weightedRandom( probability_n, X, probability_m,X);
                        }else if (probability_n !== undefined) {
                            this.colorData[i][j] = CodeCtrl.getInstance().weightedRandom( probability_n, X);
                        } else if(probability_m !== undefined){
                            this.colorData[i][j] = CodeCtrl.getInstance().weightedRandom( probability_m,X);
                        }
                    }
                    
                }
            }

            
        }
        this.updateColorNodes()
    }
    getColorDataByIndex(i:number, j:number){
        if (i>= 0 && j >= 0) {
            return this.colorData[i][j]
        }
        return undefined;
    }

    // update (dt) {}
}
