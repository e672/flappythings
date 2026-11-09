const list=["enes","hannah"];
selectDominant=()=>{
    randomNumber=Math.round(Math.random());
    chosenName=list[randomNumber];
    return chosenName
}
console.log("--------------------")
console.log("Dominant seat belongs to "+selectDominant()+" today")
console.log("--------------------")