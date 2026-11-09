let main=document.querySelector("main")
let button=document.querySelector("button")
let mainState="start";
let score=0;
button.onclick=()=>{
    if(mainState=="start"){
        mainState="pause"
        setBird()
        boooo()
    if(document.querySelector("main").children.length==0){
        createPipe()
        setTimeout(createPipe,800)
        setTimeout(createPipe,1600)
        setTimeout(createPipe,2400)
        }
        document.querySelector("i").setAttribute("class","bi bi-pause")
    }
    scoreUpdate()
}
scoreUpdate=()=>{
    //updading the score element
    let loop=setInterval(()=>{
        let h1=document.querySelector("#score")
        h1.innerHTML=(parseInt(h1.innerHTML)+1).toString()
        score+=1;
    },2000)
}
rndmGen=()=>{
    /* returns number between 2-18 its
     not 20 because i dont want any 0 length pipe */
    return Math.round(Math.random()*16+2);
}
createPipe=()=>{
    let rndm=rndmGen();//geerated first random to first iteration of pipes
    let element=document.createElement("div")
    let element2=document.createElement("div")
    let mother=creationRoom("pipe")
    element.id="top"
    element2.id="bottom";
    element.style.height=rndm+"rem";//top pipe height 
    element2.style.height=(20-rndm).toString()+"rem";//bottom pipe height 
    mother.appendChild(element2);//top pipe
    mother.appendChild(element);//bottom pipe
    main.appendChild(mother);//appending pipe complex to its parent main
    mother.addEventListener("animationiteration",()=>{//in every iteration
        let anot=rndmGen();//generating random in every animation iteration for pipes
        /* there are 10rem length between top and bttom pipes 
        the height of canvas 30rem so one pipe ll be x the others 20rem-x */
        mother.firstChild.style.height=anot+"rem"
        mother.lastChild.style.height=(20-anot)+"rem"
        /* scoreUpdate() *///updating score in every iteration
        
    })
}

setBird=()=>{
    //creating bird and its playground
    let mother=document.createElement("div")
    let son=document.createElement("div")
    mother.className="mother"
    son.className="son"
    mother.appendChild(son)
    let hey=document.getElementById("hey")
    hey.appendChild(mother)
    mother.onclick=()=>{
            //select the element with className .son
            let main=document.querySelector(".son")
            let position=main.getBoundingClientRect();
            //create .son2 and add positions
            let newe=creationRoom("son2")
            mother.appendChild(newe)
            newe.style.top=position.top.toString()+"px";
            //adding keyframe new directions
            document.documentElement.style.setProperty('--y-start',(pixTo(newe.style.top)).toString()+"px");
            document.documentElement.style.setProperty('--y-end',(pixTo(newe.style.top)-65).toString()+"px");
            //delete .son element
            main.remove()
            setTimeout(()=>{
                //take its positions when the animation of .son2 and remove it
                let hey=document.querySelector(".son2")
                let pos=hey.getBoundingClientRect();
                hey.remove()
                //create .son2 again and adding its positions
                let newAgain=creationRoom("son");
                newAgain.style.top=pos.top.toString()+"px";
                //telling .son2 bird its animation directions
                document.documentElement.style.setProperty('--x-start',newAgain.style.top);
                document.documentElement.style.setProperty('--x-end',(pixTo(newAgain.style.top)+400).toString()+"px");

                mother.appendChild(newAgain)
                let eski=document.querySelector(".son").getBoundingClientRect();
            },200)
        }
}
pixTo=(str)=>{//to be able to make arithmetic with length like pixel
    return parseInt(str.split("px")[0])
}
creationRoom=(clas)=>{//creating a div element with given parameter as className and return it
    let ele=document.createElement("div")
    ele.className=clas;
    return ele;
}
touchControl=(pipe,bird)=>{//for short,checking if two element touching each other
    let dir=pipe.getBoundingClientRect();
    let birdir=bird.getBoundingClientRect()
    if(birdir.right>=dir.left&&birdir.left<=dir.right&&birdir.bottom>=dir.top&&birdir.top<=dir.bottom){
        return true;
    }
    else{
        return false;
    }
}
boooo=()=>{
    let int = setInterval(function(){
        console.log("hala sayiyor amk")
        let main2=document.querySelector("main")
        let bird=document.querySelector(".son")
        let bird2=document.querySelector(".son2")
        if(main2&&bird){//checking if the bird .son class element touch any pipe
            for(let i=0;i<main2.children.length;i++){
                for(let j=0;j<2;j++){
                    let pipe=main2.children[i].children[j]//now i can reach every pipe
                    if(touchControl(pipe,bird)/* touching bird? */){
                        clearInterval(int)//for ending checking process
                        ele=document.querySelector("#score")
                        ele.innerHTML="GAME OVER,Score:"+ele.innerHTML
                        bird.style.animationPlayState="paused"//froze the bird
                        pausingAllPipes()
                        setTimeout(endGame,3000)
                    }
                }
            }
        }
        else if(main2&&bird2){
            for(let i=0;i<main2.children.length;i++){
                for(let j=0;j<2;j++){
                    let pipe=main2.children[i].children[j]
                    if(touchControl(pipe,bird2)&&document.get){
                        clearInterval(int)
                        ele=document.querySelector("#score")
                        ele.innerHTML="GAME OVER,Score:"+ele.innerHTML
                        bird2.style.animationPlayState="paused"
                        pausingAllPipes()
                        setTimeout(endGame,3000)
                    }
                }
            }
        }
    },100)
}
pausingAllPipes=()=>{
    let main=document.querySelectorAll(".pipe")
    main.forEach((item)=>{
        item.style.animationPlayState="paused"
    })
}
endGame=()=>{
    let main=document.querySelectorAll(".pipe")
    main.forEach((item)=>{
        item.remove()
    })
    document.querySelector("i").setAttribute("class","bi bi-play")
    mainState="start"
    document.querySelector(".mother").remove()
    document.querySelector("#score").innerHTML="0";
}

getAllPipes=()=>{
    let arr=document.querySelectorAll(".pipe")
    let rndm1=Math.round(Math.random());
    let rndm2=Math.round(Math.random()*arr.length)

}

//tüm boruları liste şeklinde al.Sonra herhangibirinin indeksine random olarak eriş 
/*next mission : addding piranha plant to a random pipe*/

/*I have been doing games and simple kinda apps for a some time.
i had started with basics like calendar,calculator,tic tac toe 
but always wanted to make flappy bird but at that time i had no idea
to make it like how thoese pipes moving backwards how the bird going
down always and how the bird going up when you click.
Not even talking about how to detect the bird and pipe connection.
But finally i have done it.It took so much time to me coding and to think problems
that i told you before,i made pipes with infinity animation iteration
those pipes are not infinity amount there are just four of them and 
they are chasing themselves ahahaha.And the bird,tell you what,it was the 
hardest part of the work.I cant tell how it works but think like its not 
just one bird up there actually two.Ones going up,ones down:)
Must tell you the code is not efficient and perfect but never asked to AI
and watch a flappy bird making tutorial.Im so proud finally making this
best wishes for you.*/
//this company is built...
