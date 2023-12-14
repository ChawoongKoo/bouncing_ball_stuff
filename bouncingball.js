 // Setting up tools/units ----------------------------------------------

 let canvas = document.getElementById("myCanvas");

 let c = canvas.getContext('2d');

 canvas.height = window.innerHeight -20;
 canvas.width = window.innerWidth-100;

 let minSimWidth = 20;
 let cScale = Math.min(canvas.height, canvas.width)/minSimWidth;

 let simWidth = canvas.width/cScale
 let simHeight = canvas.height/cScale

 function cX(pos){
     return pos.x * cScale
 }
 function cY(pos){
     return canvas.height - pos.y * cScale
 }


 // Scene

 let gravity = {x : 0, y : 0};
 let timeStep = 1.0/100.0 
 // radius : .5,
 // pos : {x : canvas.width/(2*cScale), y : canvas.height/(2*cScale)-5},
 // vel : {x : 15, y : 15}

 class Ball {
     constructor() {
         this.radius = 0.5;
         this.pos = {
             x: canvas.width / (2 * cScale),
             y: canvas.height / (2 * cScale) - 5
         };
         this.vel = {
             x: 15,
             y: 15
         };
         this.color =  "#0000FF";
         this.rate = 1
     }

     draw() {
        this.color ="#" + (parseInt(this.color.slice(1), 16)).toString(16);
         c.fillStyle = this.color
        // c.fillStyle = this.color;

         c.beginPath();
         c.arc(cX(this.pos), cY(this.pos), this.radius * cScale, 0.0, 2.0 * Math.PI);
         c.closePath();
         c.fill();
     }

     simulate(){
         this.vel.x += gravity.x*timeStep
         this.vel.y += gravity.y*timeStep
         this.pos.x += this.vel.x*timeStep
         this.pos.y += this.vel.y*timeStep
         
         if (this.pos.y < 0){
             this.pos.y = 0
             this.vel.y = - this.vel.y
             this.radius +=.1*this.rate
         }
         if (this.pos.y > simHeight){
             this.pos.y = simHeight
             this.vel.y = -this.vel.y
             this.radius +=.1*this.rate
         }
         if(this.pos.x < 0){
             this.pos.x = 0
             this.vel.x = -this.vel.x
             this.radius +=.1*this.rate
         }
         if(this.pos.x > simWidth){
             this.pos.x = simWidth
             this.vel.x = -this.vel.x
             this.radius +=.1*this.rate
         }

         if(this.radius >=3){
            this.rate = -1
         }
         if(this.radius <= .5){
            this.rate = 1
         }
     }
 }



// Animation

 const balls = [];
 for(let i = 0; i < 100; i++){
     const ball = new Ball()
     ball.pos.x = Math.random()*20
     ball.pos.y = Math.random()*20
     ball.vel.x = Math.random()*20
     ball.vel.y = Math.random()*20
     ball.color = "#" + Math.floor(Math.random()*16777215).toString(16);
     balls.push(ball)
 }

 function update() {
     c.clearRect(0,0, canvas.width, canvas.height);

    // Simulate all balls
    balls.forEach(ball => {  
        ball.simulate();
    });

     // draw all balls  
     balls.forEach(ball => {
         ball.draw();
     });

     requestAnimationFrame(update);
 }
 update()

 
     // update = () => {
     //     this.simulate();
     //     this.draw();
     //     requestAnimationFrame(this.update);
     // }
 