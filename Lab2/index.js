const funct = require("./arrayUtils");
const strUtil = require("./stringUtils");
const obj = require("./objUtils");

// mean() test case
try
{
    // Should Pass
    console.log(funct.mean([-10,12.85,24]));
    console.log("Mean test passed successfully");
}
catch(e){
    console.log("Error = " + e);
    console.log("Mean test Failed");
}

try
{
    // Should Fail
    console.log(funct.mean([10,12,'%']));
    console.log("Mean test passed successfully");
}
catch(e){
    console.log("Error = " + e);
    console.log("Mean test failed");
}

//medianSquared test case
try
{
    // Should Pass
    console.log(funct.medianSquared([9,-6,-5,10,11,-15,-18,19,8.8]));
    console.log("medianSquared test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("medianSquared test Failed");
}

try
{
    // Should Fail
    console.log(funct.medianSquared([null]));
    console.log("medianSquared test passed successfully");
}
catch(e){
    console.log("Error = " + e);
    console.log("medianSquared test failed");
}

//maxElement test case
try
{
    // Should Pass
    console.log(funct.maxElement([5.9,8.0,19.1,-7,5,19.1]));
    console.log("maxElement test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("maxElement test Failed");
}

try
{
    // Should Fail
    console.log(funct.maxElement(6,7));
    console.log("maxElement test passed successfully");
}
catch(e){
    console.log("Error = " + e);
    console.log("maxElement test failed");
}

//fill test case
try
{
    // Should Pass
    console.log(funct.fill(6,"test"));
    console.log("fill test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("fill test Failed");
}

try
{
    // Should Fail
    console.log(funct.fill(-7));
    console.log("fill test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("fill test Failed");
}

//countRepeating test case
try
{
    // Should Pass
    console.log(funct.countRepeating([1,2,3,5,"5","hello","Hello","Hello",-5,"cat","cat","Hello","Hello"]));
    console.log("countRepeating test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("countRepeating test Failed");
}

try
{
    // Should Fail
    console.log(funct.countRepeating(undefined));
    console.log("countRepeating test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("countRepeating test Failed");
}

//isEqual
try
{
    // Should Pass
   // console.log(funct.isEqual([["test1","fail"],7,2,-1,true,["false",-5,4,-6,[0,123]],17,19,[-2,-3]],
    //[[[0,123],-5,4,-6,"false"],17,19,["test1","fail"],[-2,-3],7,2,-1,true])); 

    //isEqual(['a', 'b', 'x', 'y'], ['a', 'x', 'b', 'y']) 
    console.log(funct.isEqual(['a', 'b', 'x', 'y'], ['a', 'x', 'b', 'y'])); 
    console.log("isEqual test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("isEqual test Failed");
}

try
{
    // Should Fail
    console.log(funct.isEqual(4,[2,4,true])); 
    console.log("isEqual test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("isEqual test Failed");
}


//camelCase

try
{
    // Should Pass
    console.log(strUtil.camelCase("              hi there what do YOU Think"));
    console.log("camelCase test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("camelCase test Failed");
}

try
{
    // Should Fail
    console.log(strUtil.camelCase("   $%^&"));
    console.log("camelCase test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("camelCase test Failed");
}

//replaceChar

try
{
    // Should Pass
    console.log(strUtil.replaceChar("babbbbble"));
    console.log("replaceChar test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("replaceChar test Failed");
}

try
{
    // Should Fail
    console.log(strUtil.replaceChar(""));
    console.log("replaceChar test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("replaceChar test Failed");
}

//mashUp

try
{
    // Should Pass
    console.log(strUtil.mashUp("@$bbbbblebaba","cattttcaca"));
    console.log("mashUp test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("mashUp test Failed");
}

try
{
    // Should Fail
    console.log(strUtil.mashUp("null"));
    console.log("mashUp test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("mashUp test Failed");
}


//makeArrays

try
{
    // Should Pass
    console.log(obj.makeArrays([{fg:"hello",5:"hi there"},{1:"hi",2:"hello"},{4:"test"}]));
    console.log("makeArrays test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("makeArrays test Failed");
}

try
{
    // Should Fail
    console.log(obj.makeArrays([{1:1}]));
    console.log("makeArrays test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("makeArrays test Failed");
}

//isDeepEqual
try
{
    // Should Pass
    console.log(obj.isDeepEqual({a: {sA: "Hello", sB: "There", sC: "Class",4:{3:4,5:6}}, b: 7, c: true, d: "Test"}, 
    {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello",4:{3:4,5:6}}}));
    console.log("isDeepEqual test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("isDeepEqual test Failed");
}

try
{
     // Should Fail
    console.log(obj.isDeepEqual({2:true},undefined));
    console.log("isDeepEqual test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("isDeepEqual test Failed");
}

//computeObject

try
{
    // Should Pass
    console.log(obj.computeObject({2:false,3:true}, (a) =>  !a ));
    console.log("computeObject test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("computeObject test Failed");
}

try
{
     // Should Fail
    console.log(obj.computeObject({1:"1",2:"s"}, (a) => "s"+"b"));
    console.log("computeObject test passed successfully");
}
catch(e){
    
    console.log("Error = " + e);
    console.log("computeObject test Failed");
}



