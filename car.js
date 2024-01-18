class Car{
    constructor(x,y,width,height){
        this.x=x
        this.y=y
        this.width=width
        this.height=height

        this.speed=0
        this.acceleration=0.2
        this.friction=0.05
        this.maxSpeed=3

        this.angle=0
        this.damaged=false

        this.controls=new Controls()
        this.sensor=new Sensor(this)
    }
    update(roadBorders){
        this.#move()
        this.polygon=this.#createPolygon()
        this.damaged=this.#assessDamage()
        this.sensor.update(roadBorders)
    }
    draw(ctx){

    }
    #move(){
        this.speed+=this.controls.fr*this.acceleration
        this.speed=Math.min(this.speed,this.maxSpeed)
        this.angle-=this.controls.lr*0.03
        this.x-=Math.sin(-this.angle)*this.speed
        this.y-=Math.cos(-this.angle)*this.speed
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
    #assessDamage(roadBorders){
        for (let i = 0; i < roadBorders.lenght; i++) {
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true
            }
        }
        return false
    }
}