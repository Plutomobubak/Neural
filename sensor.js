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
                x:0,
                y:0
            }
            const end={
                x:-Math.sin(rayAngle)*this.rayLenght,
                y:-Math.cos(rayAngle)*this.rayLenght
            }
            this.rays.push([start,end])
        }
    }
    #getReading(ray,roadBorders){
        let touches=[]
        for (let i = 0; i < roadBorders.length; i++) {
            const rayAngle=lerp(this.raySpread/2,-this.raySpread/2,i/(this.rayCount-1))
            const touch = getIntersection(
                {
                    x:ray[0].x+this.car.x,
                    y:ray[0].y+this.car.y
                },{
                    x:(ray[1].x)*Math.cos(-this.car.angle)+(ray[1].y)*Math.sin(-this.car.angle)+this.car.x,
                    y:-(ray[1].y)*Math.cos(-this.car.angle)+(ray[1].x)*Math.sin(-this.car.angle)+this.car.y
                },roadBorders[i][0],roadBorders[i][1])
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
                end={
                    x:(this.readings[i].x-this.car.x)*Math.cos(-this.car.angle)+(this.readings[i].y-this.car.y)*Math.sin(-this.car.angle),
                    y:(this.readings[i].x-this.car.x)*Math.sin(-this.car.angle)-(this.readings[i].y-this.car.y)*Math.cos(-this.car.angle)
                }
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
function lerp(A,B,t){
    return A+((B-A)*t);
}
function getIntersection(A,B,C,D){
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x)
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y)
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y)

    if(bottom!=0){
        const t=tTop/bottom
        const u=uTop/bottom
        if(t>=0 && t<=1 &&u>=0 && u<=1){
            return{
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }
}