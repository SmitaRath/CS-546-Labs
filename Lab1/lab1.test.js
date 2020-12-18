const lab1 = require("./lab1");

console.log(lab1.questionOne([10]));
//{ '10': false }
console.log(lab1.questionOne([2, 5, 3, 4, 4, 1, 1000000]));
/*
{
  '1': false,
  '2': true,
  '3': true,
  '4': false,
  '5': true,
  '1000000': false
}
*/
console.log(lab1.questionOne([1, 13, 25, 999, 457, 10000]));
/*{
    '1': false,
    '13': true,
    '25': false,
    '457': true,
    '999': false,
    '10000': false
  }*/
console.log(lab1.questionOne([]));
//{}
console.log(lab1.questionOne());
//{}


console.log(lab1.questionTwo([1,1,1])); 
//27
console.log(lab1.questionTwo([5]));
//15625
console.log(lab1.questionTwo([]));
//0
console.log(lab1.questionTwo());
//0
console.log(lab1.questionTwo([4,5,6,7,10,13,10,19]));
//627222016

console.log(lab1.questionThree("She said, \"Let's eat.\" bread & butter at 8:45 pm.")); 
/*{
    consonants: 18,
    vowels: 11,
    numbers: 3,
    spaces: 9,
    punctuation: 7,
    specialCharacters: 1
  }*/

  console.log(lab1.questionThree("Numbers from : 0, 2, 4, ... , 100 & the special Charaters from ~, @, #, $, ..., }.")); 
  /*{
    consonants: 23,
    vowels: 11,
    numbers: 6,
    spaces: 19,
    punctuation: 13,
    specialCharacters: 6
  }*/

  console.log(lab1.questionThree("")); 
/*{
  consonants: 0,
  vowels: 0,
  numbers: 0,
  spaces: 0,
  punctuation: 0,
  specialCharacters: 0
}*/

  console.log(lab1.questionThree()); 
/*{
  consonants: 0,
  vowels: 0,
  numbers: 0,
  spaces: 0,
  punctuation: 0,
  specialCharacters: 0
}*/

console.log(lab1.questionThree("I can't see the cat's tail, I can only see the cat's 4 cute paws \\")); 
/*{
  consonants: 27,
  vowels: 18,
  numbers: 1,
  spaces: 15,
  punctuation: 4,
  specialCharacters: 1
}*/

console.log(lab1.questionFour(50000, 10.5, 10)); 
//674.67

console.log(lab1.questionFour(1000, 0.05, 10)); 
//8.35

console.log(lab1.questionFour(200000, 15.756, 20)); 
//2745.96

console.log(lab1.questionFour(12000, 0, 5)); 
//200

console.log(lab1.questionFour(0, 0, 5)); 
//0






