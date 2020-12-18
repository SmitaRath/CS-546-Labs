const questionOne = function questionOne(arr) {
    //declaring empty object to return as the result
    let resultObj = {};
    //declaring flag to set the number as prime or not.
    let primeFlag = true;
    //checking whether the parameter is not empty
    if (Array.isArray(arr)){
        //outer loop for checking the numbers in the array is prime or not
        for(let x of arr){
            //inner loop for checking whether the current number in the loop is prime or not
            for(let i=2;i<=x/2;i++){
                //condition for prime
                if(x % i == 0){
                  primeFlag = false;
                }
            }
            //if the primeflag is true then we will set true for the number in the object
            if (primeFlag){
                if(x == 1){
                    resultObj[x]=false;
                    primeFlag=true;
                }else{
                     resultObj[x]=primeFlag;
                }
            }
            //if the primeflag is false then we will set false to the number in the object  
            else{
                resultObj[x]=primeFlag;
                primeFlag = true;
            }
        }
    }

    return (resultObj);
}

const questionTwo = function questionTwo(arr) { 
    if (Array.isArray(arr)){
        //calculating the sum of square of an array using the reduce method by initializing sum to 0
        let sumOfSquares = arr.reduce((sum, currentNumber) => sum + Math.pow(currentNumber,2),0);
        //calcualtion the square root of the sum which is raised to power 6
        let sqrtOfNumber = Math.sqrt(Math.pow(sumOfSquares,6));
        return sqrtOfNumber;
    }
        return 0;
    
}

const questionThree = function questionThree(text) {
    //declaring the count variables and an empty object to return
    let vowelCount = 0;
    let consonantCount = 0;
    let numberCount = 0;
    let spaceCount = 0;
    let punctuationCount = 0;
    let specialCharacterCount = 0;
    let returnObject = {};

    //declaring the list of vowels,consonants,numbers,punctuations,special characters
    let vowelList="aeiou";
    let consonantList = "bcdfghjklmnpqrstvwxyz";
    let numberList = "0123456789";
    let punctuationList = ".,?!\"'-:;()[].../";
    let specialCharacterList = "#$%&*+-<=>@^_`{|}~\\";

    //checking if the string is null or not
    if (text!=null)
    { 
      //looping through the array of string to check each character
      for(let x =0; x<text.length; x++){
        if (vowelList.indexOf(text.charAt(x).toLowerCase()) != -1)
        {
           vowelCount++;
        }else if (consonantList.indexOf(text.charAt(x).toLowerCase()) != -1){
            consonantCount++;
        }else if (numberList.indexOf(text.charAt(x)) != -1){
            numberCount++;
        }else if (text.charAt(x) == " "){
            spaceCount++;
        }else if (punctuationList.indexOf(text.charAt(x)) != -1){
            //checking for ellipsis if true then increasing the counter by 2
            if("."== text.charAt(x) && text.substr(x,3) == "..."){
                x+=2;
            }
            punctuationCount++;
        }else if (specialCharacterList.indexOf(text.charAt(x)) != -1){
            specialCharacterCount++;
        }

    }
  }

    // assigning the count variables to the object.
    returnObject["consonants"] = consonantCount;
    returnObject["vowels"] = vowelCount;
    returnObject["numbers"] = numberCount;
    returnObject["spaces"] = spaceCount;
    returnObject["punctuation"] = punctuationCount;
    returnObject["specialCharacters"] = specialCharacterCount;
    return returnObject;
}

const questionFour = function questionFour(num1, num2,num3) {
    let monthlyAmount;
    //checking if the rate of interest is zero
    if (num2 == 0){
        monthlyAmount = num1/(num3 * 12);
    }else{
        //calculating rate for the month
        let r = (num2/(12*100));
        //calculating total no of months for the loan 
        let n = num3 * 12;
        //calculating the rate expression (1+r)^n for the formula Pr(1+r)^n/((1+r)^n -1)
        let rateExp = Math.pow((1+r),n);
        monthlyAmount = (num1 * r * rateExp)/(rateExp - 1);
        
    }
    //truncating result to two decimal places
    return parseFloat(monthlyAmount.toFixed(2));
    
}

module.exports = {
    firstName: "SMITA", 
    lastName: "RATH", 
    studentId: "10458082",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};