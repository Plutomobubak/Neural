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
        this.sensor=new Sensor()
    }
    update(roadBorders){
        this.#move()
        this.polygon=this.#createPolygon()
        this.damaged=this.#assesDamage()
        this.sensor.update(roadBorders)
    }
    #move(){
        this.speed+=this.controls.rl*this.acceleration
        this.speed=Math.min(this.speed,this.maxSpeed)
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
    }
}