class Sensor{
    constructor(car){
        this.car=car
        this.rayCount=7
        this.rayLenght=150
        this.raySpread=Math.PI

        this.rays=[]
        this.readings=[]
    }

    update(roadBorders){
        this.#castRays()
        this.readings=[]
        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(
                this.#getReading(this.rays[i],roadBorders)
            )
        }
    }
    
    #castRays(){
        this.rays=[]
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle=lerp(this.raySpread/2,-this.raySpread/2,i/(this.rayCount-1))
            const start={
                x:this.car.x,
                y:this.car.y
            }
            const end={
                x:(Math.sin(rayAngle)*this.rayLenght)*Math.cos(-this.car.angle)+(Math.cos(rayAngle)*this.rayLenght)*Math.sin(-this.car.angle)+this.car.x,
                y:-(Math.cos(rayAngle)*this.rayLenght)*Math.cos(-this.car.angle)+(Math.sin(rayAngle)*this.rayLenght)*Math.sin(-this.car.angle)+this.car.y
            }
            this.rays.push([start,end])
        }
    }
    #getReading(ray,roadBorders){
        let touches=[]
        for (let i = 0; i < roadBorders.length; i++) {
            const rayAngle=lerp(this.raySpread/2,-this.raySpread/2,i/(this.rayCount-1))
            const touch = getIntersection(ray[0],ray[1],roadBorders[i][0],roadBorders[i][1])
            if(touch)touches.push(touch)
        }
        if(touches.length==0){
            return null
        }
        else{
            const offsets=touches.map(e=>e.offset)
            const minOffset=Math.min(...offsets)
            return touches.find(e=>e.offset == minOffset)
        }
    }
    draw(ctx){
        for (let i = 0; i < this.rayCount; i++){
            let end=this.rays[i][1]
            if(this.readings[i]){
                end=this.readings[i]
                console.table(this.readings)
            }
            
            ctx.beginPath()
            ctx.lineWidth=2
            ctx.strokeStyle="yellow"
            ctx.moveTo(this.rays[i][0].x,this.rays[i][0].y)
            ctx.lineTo(end.x,end.y)
            ctx.stroke()
            
            ctx.beginPath()
            ctx.lineWidth=2
            ctx.strokeStyle="red"
            ctx.moveTo(end.x,end.y)
            ctx.lineTo(this.rays[i][1].x,this.rays[i][1].y)
            ctx.stroke()
        }
    }
}
