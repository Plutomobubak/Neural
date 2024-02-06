class Network{
    constructor(neurCs){
        this.levels=[]
        for (let i = 0; i < neurCs.length-1; i++) {
            this.levels.push(new Level(neurCs[i],neurCs[i+1]))
        }
    }

    static feedForward(ins,net){
        let outs=Level.feedForward(ins,net.levels[0])
        for (let i = 1; i < net.levels.length; i++) {
            outs= Level.feedForward(outs,net.levels[i])
        }
        return outs
    }
}

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
            level.outs[i]=Math.abs(sum)>level.biases[i]?Math.sign(sum+0.1):0
        }

        return level.outs;
    }
}