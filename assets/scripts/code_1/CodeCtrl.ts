
const {ccclass, property} = cc._decorator;

@ccclass
export default class CodeCtrl  {
    private static _instance: CodeCtrl;  
    public static getInstance(): CodeCtrl {  
        // 如果实例不存在，则创建并返回  
        if (!CodeCtrl._instance) {  
            CodeCtrl._instance = new CodeCtrl();  
        }  
        // 返回单例实例  
        return CodeCtrl._instance;  
    }  

    colorList = [
        cc.color(255,255,255),
        cc.color(255,0,0),
        cc.color(0,255,0),
        cc.color(0,0,255),
        cc.color(100,0,0),
    ];

    getColorByIndex(_index:number){
        if (this.colorList[_index]) {
            return this.colorList[_index]
        }
        this.colorList[0]
    }

    weightedRandom(index_1:number, bias_1:number, index_2:number = -1, bias_2:number = 0) {  
        
      
        // 创建一个权重数组，初始时所有元素权重相同  
        let weights = new Array(5).fill(0);
        let base_bias = 1/ 5
        let last_bias = 1;
        let lastCount = 5;
        // 增加index下标的权重
        weights[index_1] = bias_1 + base_bias;  
        last_bias = last_bias - weights[index_1]
        lastCount--;
        if (index_2 >= 0 ) {
            weights[index_2] += bias_2 + base_bias;  
            last_bias = last_bias - weights[index_1]
            lastCount--
        }
        for (let index = 0; index < weights.length; index++) {
            if (weights[index] == 0) {
                weights[index] = last_bias / lastCount
            }
        }
      
        // 使用权重数组进行随机选择  
        let randomNum = Math.random();  
        let sum = 0;  
        for (let i = 0; i < weights.length; i++) {  
            sum += weights[i]; 
            if (randomNum < sum) {  
                return i; // 返回随机选中的元素  
            }  
        }  
        // 如果以上循环没有返回（理论上不会发生，因为总和为1），则返回一个默认值  
        return 0;  
    }
    
}
