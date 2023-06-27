const arrowFunction = (name , age=21) => {
console.log("Name" , name , "Age", age);
}
arrowFunction("subrota") ;
// const users = [{name:"subrota" , age:21} , {name:"diposh" , age:"25"} , {name:"bappi" , age:"26"}] ;

let user = {name:"subrota" , age:21 , role:"developer"}
const { ...userInfo} = user ; 
console.log(userInfo.name , userInfo.age , userInfo.role);


function *infiniteNumbers() {
	let n=1;
	while(true) {
		yield n++;
	}
}

const numbers = infiniteNumbers(); // returns an iterable object

console.log(
    numbers.next() ,  // { value: 1, done: false}
numbers.next() ,  // { value: 2, done: false}
numbers.next() , // { value: 3, done: false}
);

let firstNumbers = [50 , 60 , 70] ;
let secondNumbers = [10, 20 , 30 , 40  , ...firstNumbers , 80 , 90 , 100 ] ;
console.log(secondNumbers)
let fullName = ["“subrota”"," “chandra”" , "“sarker”"] ;
let [firstname , middlename, lastname]  = fullName;
console.log(firstname , middlename, lastname)
