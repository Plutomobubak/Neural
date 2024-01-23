class Car{
    constructor(x,y,width,height,isPlayer){
        this.x=x
        this.y=y
        this.width=width
        this.height=height

        this.speed=0
        this.acceleration=0.2
        this.friction=0.05
        this.maxSpeed=2.5*(isPlayer+1)

        this.angle=0
        this.damaged=false

        
        this.controls=new Controls(isPlayer)
        if(isPlayer)
        this.sensor=new Sensor(this)
    }
    update(roadBorders,traffic){
        if(!this.damaged){
            this.#move()
            this.polygon=this.#createPolygon()
            this.damaged=this.#assessDamage(roadBorders,traffic)
        }
        if(this.sensor)this.sensor.update(roadBorders,traffic)
    }
    draw(ctx){
        if(this.damaged)ctx.fillStyle="gray"
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y)
        for(let i =0;i<this.polygon.length;i++){
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y)
        }
        ctx.fill()
        if(this.sensor)this.sensor.draw(ctx)
        ctx.restore()
    }
    #move(){
        this.speed+=this.controls.fr*this.acceleration
        this.speed=Math.min(Math.abs(this.speed),this.maxSpeed)*Math.sign(this.speed)
        this.speed-=this.friction*Math.sign(this.speed)
        if(Math.abs(this.speed)<=this.friction)this.speed=0
        this.angle-=this.controls.lr*0.03*Math.sign(this.speed)
        this.x-=Math.sin(this.angle)*this.speed
        this.y-=Math.cos(this.angle)*this.speed
    }
    #createPolygon(){
        const points=[]
        const rad=Math.hypot(this.width,this.height)
        const alpha=Math.atan2(this.width,this.height)
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        })
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        })
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        })
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        })
        return points
    }
    #assessDamage(roadBorders,traffic){
        for (let i = 0; i < roadBorders.length; i++) {
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true
            }
        }
        for (let i = 0; i < traffic.length; i++) {
            if(polysIntersect(this.polygon,traffic[i].polygon)){
                return true
            }
        }
        return false
    }
}
//meow