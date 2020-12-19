
function validate(argument,typeCheck="N"){

    if (typeCheck === "A" || typeCheck === "N")
    {
        if (!Array.isArray(argument)) throw `Parameter sent ${argument} is not an array`;
    }

    if (typeCheck === "N")
    {
        if (!argument.length>0) throw `Parameter sent ${argument} does not contain any element`;
        for(let i of argument){
            if (typeof i !== 'number') throw `Parameter sent ${i} is not a number`;
        }
    }

    if (typeCheck === "I"){
        if (argument < 0) throw `Passed argument ${argument} cannot be less than zero`;
        if (typeof argument !== "number") throw `Passed argument ${argument} is not a number`;
        if (!Number.isInteger(argument)) throw `Passed argument ${argument} is not an Integer`;
    }
}
    

function mean(array)
{
    validate(array);
    let sum = array.reduce((currentsum,nextVal) => currentsum + nextVal ,0);
    let mean = sum / (array.length);
    return parseFloat(mean.toFixed(2));
}

function medianSquared(array){
    validate(array);
    let median;
    let medianIndex=Math.trunc(array.length/2);
    let sortedArray = array.sort(function(a, b){return a-b});
    if (sortedArray.length % 2 == 1) median = sortedArray[medianIndex];
    else median = (sortedArray[medianIndex-1] + sortedArray[medianIndex])/2;
    return parseFloat((median**2).toFixed(2));
}

function maxElement(array){
    validate(array);
    let max = array[0];
    let returnObj = {};
    for(let num of array)
    {
        if (num > max) max = num;
    }

    returnObj[max]=array.indexOf(max);
    return returnObj;

}

function fill(end, value){
    validate(end,"I");
    let returnArray=[];
        if (value!=null) 
        { 
            for(let i=0;i<end;i++)
                returnArray[i]=value;
        }
        else
        {
           if(arguments.length==1){
                for(let i=0;i<end;i++)
                returnArray[i]=i;
            }
            else if(value===null || value===undefined){
                for(let i=0;i<end;i++)
                returnArray[i]=value;
            }
        }
        return returnArray;
}

function countRepeating(array){
    validate(array,"A");
    let returnObj = {};
    let compareNo;
    let compareCount=1;
     for(let i=0;i<array.length;i++){
        compareNo = array[i];
        compareCount=1;
        if(!(compareNo in returnObj))
        {
            for(let k=i+1; k<array.length;k++){
                if (compareNo==array[k]) compareCount++;
            }
            if (compareCount > 1){
                returnObj[compareNo]=compareCount;
            }
        }
     }
     return returnObj;
}

function isEqual(arrayOne, arrayTwo){
      validate(arrayOne,"A");
      validate(arrayTwo,"A");

      if (arrayOne.length !== arrayTwo.length) return false;

      arrayOne.sort(compare);
      arrayTwo.sort(compare);

      function compareNumberString(a,b){
        if(typeof a === "number" && typeof b !== "number") return -1;
        if(typeof a !== "number" && typeof b === "number") return 1;
        return a-b;
      }


    function compare(a,b){
            
           if (Array.isArray(a) && Array.isArray(b)) 
           {
                a.sort(compare);
                b.sort(compare);
                return compareNumberString(a[0],b[0]);
           }
           if (Array.isArray(a)) 
           {
               a.sort(compare);
               return compareNumberString(a[0],b);
           }
           if (Array.isArray(b)) 
           {
                b.sort(compare);
                return compareNumberString(a,b[0]);
           }

           return compareNumberString(a,b);

    }
        
    
        if (arrayOne.toString() === arrayTwo.toString()) return true;
        else return false;
        
}
  

module.exports = {
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
}


