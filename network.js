class Level{
    constructor(inC,outC){
        this.ins=new Array(inC)
        this.outs=new Array(outC)
        this.biases=new Array(outC)

        this.weights=[]
        for(let i=0;i<inC;i++){
            this.weights[i]=new Array(outC)
        }

        Level.#randomize(this)
    }
    static #randomize(level){
        for (let i = 0; i < level.ins.length; i++) {
            for (let j = 0; j < level.outs.length; j++) {
                level.weights[i][j]=Math.random()*2-1
            }
            
        }
        for (let j = 0; j < level.biases.length; j++) {
            level.biases[j]=Math.random()*2-1
        }
    }

    static feedForward(inps,level){
        for (let i = 0; i < level.ins.length; i++){
            level.ins[i]=inps[i]
        }
        for(let i=0;i<level.outs.length;i++){
            let sum=0
            for(let j=0;j<level.ins.length;j++){
                sum+=level.ins[j]*level.weights[j][i]
            }
            level.outs[i]=sum>level.biases[i]?1:0
        }

        return level.outs;
    }
}