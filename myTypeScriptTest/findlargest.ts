let a : number[] = [10, 20, 30, 40, 50];
let large = a[0];
for ( let i = 0; i < a.length; i++)
    if (a[i] > large)
        large = a[i];
console.log(large);