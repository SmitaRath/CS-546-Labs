function validate(argument,type="O"){
    if (type==="A"){
        if (!Array.isArray(argument)) throw `Parameter sent ${argument} is not array`; }
    if (type==="O"){
        if (Array.isArray(argument)) throw `Sent Parameter ${argument} is an array`;
        if (argument===null) throw  `Sent parameter is null`;
        if (typeof argument !== "object") throw `Sent Parameter ${argument} is not Object`;
        if (argument.hasOwnProperty(undefined)) throw `Sent Parameter Object contains undefined`;}
    if (type==="F"){
            if (typeof argument !== "function") throw `Sent Parameter ${argument} is not a function`;}
    if (type==="E"){       
            if (Object.keys(argument).length === 0) throw `Sent Parameter object doesnot contain any values`;}

}

function makeArrays(objects){
    validate(objects,"A");
    let finalArray = [];
    let arrayEntries = [];
    let value;
    if (objects.length < 2) throw `Sent parameter ${objects} should at least contain two objects`;
    for(let i of objects){
        validate(i);
        validate(i,"E");
        arrayEntries=Object.entries(i);
        for(let arr of arrayEntries){
        finalArray.push(arr);
        }
    }

    return finalArray;
}

function isDeepEqual(obj1, obj2){
    validate(obj1);
    validate(obj2);

    let keysFromObj1 = Object.keys(obj1);
    let keysFromObj2 = Object.keys(obj2);
    let result;

    if (keysFromObj1.length !== keysFromObj2.length)
    return false;

    for(let varKey of keysFromObj1){


        let varkeyValue1=obj1[varKey];
        let varkeyValue2=obj2[varKey];
        
        if(varkeyValue1 !== varkeyValue2)
        {
            if(varkeyValue2 === null) return false;

            if(!(typeof varkeyValue1 === "object" && typeof varkeyValue2 === "object")) return false;
           
            result = isDeepEqual(varkeyValue1 , varkeyValue2);

            if(!result) 
            return false;
        }
    }

    return true;

}

function computeObject(object, func){
    validate(object);
    validate(object,"E");
    validate(func,"F");
    let value;
    
    let varFuncReturnType = typeof func();
    if (varFuncReturnType === "undefined") throw `Sent Parameter ${func} is of undefined type`;
    let allkeys=Object.keys(object);

    for(let key of allkeys){
        value=object[key];
        if(typeof value !== varFuncReturnType) throw `Sent Parameter ${value} is not of ${varFuncReturnType} type`;
        object[key]=func(value);
    }

    return object;
    
}

module.exports={
    makeArrays,
    isDeepEqual,
    computeObject
};

