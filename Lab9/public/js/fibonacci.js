
const fibform = document.getElementById("fib-form");
let text;
let flag=false;
let c;
fibform.addEventListener('submit',(event)=>{
    event.preventDefault();
const indexID = document.getElementById("fib-id");
const index=indexID.value;
const btn = document.getElementById("btn-submit");
const unorderList = document.getElementById("result");
const errorDiv = document.getElementById("error-id");
errorDiv.hidden=true;
if(!index){
    errorDiv.innerHTML="Enter index to get the fibonacci number";
    errorDiv.hidden=false;
}
else{
    fibonacci(index);
        let newLi = document.createElement("li");
        newLi.innerHTML=text;
        if(flag){
            newLi.className="not-prime";
        }else{
            newLi.className="is-prime";
        }
    unorderList.appendChild(newLi);
}
        fibform.reset();
        indexID.focus();
});


function fibonacci(index){
    flag=false;
    let no=parseInt(index);
    let a=0;
    let b=1;
    if(index==0 || index<0){
        c=0;
    }
    if(index==1)
        c=1;
    else{
        for (let i = 2; i<=index; i++) {
            c=a+b;
            a=b;
            b=c;
        }  
    }

    text="The Fibonacci of "+ index + " is " + c + ".";

    for (let i = 2; i <= c/2; i++) {
        if(c%i==0){
            flag=true;
            break;
        } 
    }

    if(c===0 || c===1){
        flag=true;
    }
    
    
}