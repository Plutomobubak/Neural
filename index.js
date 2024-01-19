const canvas = document.getElementById("can")
canvas.width = 400

const ctx = canvas.getContext("2d")
const road = new Road(canvas.width/2,canvas.width*0.9,6)
const car = new Car(road.getLaneCenter(3),100,20,35,true)

const traffic=[
    new Car(road.getLaneCenter(3),-100,20,35,false)
]

animate()
function animate(){
    for(let i =0;i<traffic.length;i++){
        traffic[i].update(road.borders,[])
    }
    car.update(road.borders,traffic)
    canvas.height = window.innerHeight
    ctx.save()
    ctx.translate(0,-car.y+canvas.height*0.7)
    road.draw(ctx)
    for(let i =0;i<traffic.length;i++){
        traffic[i].draw(ctx)
    }
    car.draw(ctx)
    ctx.restore()
    requestAnimationFrame(animate)
}