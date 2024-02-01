const canvas = document.getElementById("can")
const score = document.getElementById("score")
const score2 = document.getElementById("score2")
canvas.width = 444

const ctx = canvas.getContext("2d")
const road = new Road(canvas.width/2,canvas.width*0.9,6)
const car = new Car(road.getLaneCenter(3),100,20,35,0.2,true)

const traffic=[
    new Car(road.getLaneCenter(3),-100,20,35,false)
]
var t = document.timeline.currentTime
var c= 0;
var diff=0
var lastScore = (Math.round(car.y/100-1)*-1)
score.addEventListener("animationend",()=>{
    score.classList.remove("roll")
    score.innerHTML=score2.innerHTML
})
score2.addEventListener("animationend",()=>{
    score2.classList.remove("roll2")
})
animate()
function animate(){
    //traffic
    t=document.timeline.currentTime-t
    c+=t
    if(c>5000){
        let lane=Math.round(Math.random()*5)
        traffic.push(new Car(road.getLaneCenter(lane),car.y+(1000*Math.sign(lane-2.1)),20,35,0.2*Math.sign(lane-2.1),false))
        c=0
    }
    for(let i =0;i<traffic.length;i++){
        traffic[i].update(road.borders,[])
        if(Math.abs(traffic[i].y-car.y)>1000)traffic[i].y=car.y-1000
    }
    //car
    diff=(Math.round(car.y/100-1)*-1)-lastScore
    console.log(lastScore + ", " + diff)
    if(diff>=1){
        score.classList.add("roll")
        score2.classList.add("roll2")
        score.innerHTML= lastScore
        score2.innerHTML= lastScore+diff
        lastScore+=diff
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
    t=document.timeline.currentTime
    requestAnimationFrame(animate)
}
//meow