function validate(stringArg){
    if (stringArg == null) throw `Parameter is not provided`
    if (typeof stringArg !== "string") throw `Parameter sent ${stringArg} is not a string`
    if (stringArg.trim().length == 0) throw `Parameter sent ${stringArg} does not contain any charaters`;
    if (stringArg.match(/^[0-9!@#\$%\^\&*\)\(+=._-\s]+$/) != null) throw  `Parameter sent ${stringArg} is not a valid string`;
}

function camelCase(string){
 validate(string);
 let resultString;
 let validString=string.trim();
 let stringArr = validString.split(" ");
 resultString=stringArr[0].toLowerCase();
 for(let i=1;i<stringArr.length;i++){
     resultString=resultString + stringArr[i].charAt(0).toUpperCase() + stringArr[i].slice(1).toLowerCase();
 }
return resultString;

}

function replaceChar(string){
    validate(string);
    let validString=string.trim();
    let matchChar = validString.charAt(0).toLowerCase();
    let oldString = validString.split("");
    let count=0;
    for(let i=1;i<oldString.length;i++)
    {
        if(matchChar == oldString[i].toLowerCase()){
            count++;
            if (count%2!=0) oldString[i]="*";
            else oldString[i]="$";
        }
    }
    return oldString.join("");

}

function mashUp(string1, string2){
    validate(string1);
    validate(string2);
    let validString1=string1.trim();
    let validString2=string2.trim();
    let substr1 = validString1.substr(0,2);
    let substr2 = validString2.substr(0,2);
    return validString1.replace(substr1,substr2) + " " + validString2.replace(substr2,substr1);
}




module.exports={
    camelCase,
    replaceChar,
    mashUp
};