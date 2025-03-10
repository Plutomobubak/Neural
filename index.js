const canvas = document.getElementById("can")
const score = document.getElementById("score")
const score2 = document.getElementById("score2")
canvas.width = 444

const ctx = canvas.getContext("2d")
const road = new Road(canvas.width/2,canvas.width*0.9,6)
const cars = generateCars(400)
var bestCar=cars[0];
const traffic=[
    
]
var t = document.timeline.currentTime
var timer = 0
var c= 0;
var diff=0
var lastScore = 0
score.addEventListener("animationend",()=>{
    score.classList.remove("roll")
    score.innerHTML=score2.innerHTML
})
score2.addEventListener("animationend",()=>{
    score2.classList.remove("roll2")
})

if(localStorage.getItem("fluffiestFluff") && localStorage.getItem("fluffiestFluff")!="null"){
    for(let i=0;i<cars.length;i++){
        cars[i].fluff=JSON.parse(localStorage.getItem("fluffiestFluff"))
        if(i!=0)Network.mutate(cars[i].fluff)
    }
}


animate()

function animate(){
    t=document.timeline.currentTime-t
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic)
    }
    bestCar=cars.find(c=>c.y==Math.min(...cars.map(c=>c.y)))
    if(bestCar.damaged){timer+=t}
    else{timer=0}
    if(timer>10000){
        save()
        location.reload()
    }
    updateTraffic(bestCar)
    updateScore(bestCar)
    canvas.height = window.innerHeight
    //draw
    ctx.save()
    ctx.translate(0,-bestCar.y+canvas.height*0.7)
    road.draw(ctx)
    for(let i =0;i<traffic.length;i++){
        traffic[i].draw(ctx)
    }
    ctx.globalAlpha=0.2
    for(let i=0;i<cars.length;i++){
        cars[i].draw(ctx)
    }
    ctx.globalAlpha=1
    bestCar.draw(ctx,"red")
    ctx.restore()
    t=document.timeline.currentTime
    requestAnimationFrame(animate)
}

function generateCars(N){
    const cars=[]
    for (let i = 0; i < N; i++) {
        cars.push(new Car(road.getLaneCenter(3),100,20,35,0.2,2))
    }
    return cars
}

function updateTraffic(car){
    //traffic
    c+=t
    if(c>5000){
        let lane=Math.round(Math.random()*5)
        traffic.push(new Car(road.getLaneCenter(lane),car.y+(1000*Math.sign(lane-2.1-((lane>2)*(Math.random()-0.5)*10))),20,35,0.2*Math.sign(lane-2.1),0))
        c=0
    }
    for(let i =0;i<traffic.length;i++){
        traffic[i].update(road.borders,[])
        if(Math.abs(traffic[i].y-car.y)>1000)traffic[i].y=car.y-1000
    }

}
function updateScore(car){
    //score
    diff=(Math.round(car.y/100-1)*-1)-lastScore
    if(diff>=1){
        score.classList.add("roll")
        score2.classList.add("roll2")
        score.innerHTML= lastScore
        score2.innerHTML= lastScore+diff
        lastScore+=diff
    }
}
function save(){
    localStorage.setItem("fluffiestFluff",JSON.stringify(bestCar.fluff))
}
//meow