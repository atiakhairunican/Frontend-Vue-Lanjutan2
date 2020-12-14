const data = [
    {
        name : "atia",
        age : 23
    },
    {
        name : "gandung",
        age : 25
    },
    {
        name : "atia",
        age : 23
    }
]
function get (value) {
    // let a = data.filter( item => item.name != value.name)
    // let age = 0
    // a.forEach(element => {
    //     age += element.age
    // });
    // console.log(age);
    if (in_array(value.name, data)) {
        data.push(value)
    }
}
// get({name:"gandung",age:27})
let a = data.filter( item => item.name != "atia")
let b = data.map( item => item.name)
// console.log(a);
// for (let el of data) {
//     let z = Object.values(el)
//     console.log(z);
// }
console.log(b)
