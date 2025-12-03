let obj1 = [{ a: 1 }, { b: 2 }];
let obj2 = [...obj1];

obj1[0].a = 999;

console.log(obj1[0].a);
console.log(obj2[0].a);

let arr1 = [1, 2, 3];
let arr2 = [...arr1];

arr1[0] = 999;

console.log(arr1[0]);
console.log(arr2[0]);