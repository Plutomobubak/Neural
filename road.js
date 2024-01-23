class Road{
    constructor(x,width,lanes){
        this.x = x
        this.width = width
        this.lanes = lanes

        this.left=this.x-width/2
        this.right=this.x+width/2

        const aLot = 9999999
        this.top = -aLot
        this.bottom= aLot
        this.borders=[[
                        {x:this.left,y:this.top},
                        {x:this.left,y:this.bottom}
                    ],
                        [
                            {x:this.right,y:this.top},
                        {x:this.right,y:this.bottom}
                        ]]
    }

    getLaneCenter(index){
        index=Math.min(this.lanes-1,index)
        index=Math.max(0,index)
        const lineWidth = this.width/this.lanes
        return this.left+lineWidth*(index+0.5)
    }

    draw(ctx){
        ctx.lineWidth=5
        ctx.strokeStyle="white"

        for(let i=0;i<=this.lanes;i++){
            var l = lerp(this.left,this.right,i/this.lanes)
            if(i>0 && i<this.lanes){
                ctx.setLineDash([20,20])
            }
            else 
            {
                ctx.setLineDash([])
            }
            ctx.beginPath()
            ctx.moveTo(l,this.top)
            ctx.lineTo(l,this.bottom)
            ctx.stroke()
        }
    }
}
//meow