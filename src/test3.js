const obj1 = [1, 2];
const arr2 = [...obj1, 3, 4];

console.log(arr2);

const user = { name: "Kim", age: 30 };
const updated = { ...user, age: 31 };

console.log(updated);