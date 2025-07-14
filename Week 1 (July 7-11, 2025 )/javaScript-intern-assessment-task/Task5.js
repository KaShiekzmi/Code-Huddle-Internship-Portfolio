function processUserData(users) {
    const results = [];

    //changed <= to < to avoid undefined user at end 
    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (user.age > 18) {
            results.push({
                name: user.name,
                email: user.email,
                category: user.age >= 65 ? 'senior' : 'adult'
            });
        }
    }

    return results;
}

function calculateDiscount(price, discountPercent) {
    if (discountPercent > 0) {
        return price - (price * discountPercent / 100);
    }
    return price;
}

function groupUsersByAge(users) {
    const groups = {};

    users.forEach(user => {
        const category = user.age < 18 ? 'minor' :
            user.age < 65 ? 'adult' : 'senior';

        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(user);
    });

    return groups;
}

const testUsers = [
    { name: 'John', age: 25, email: 'john@test.com' },
    { name: 'Jane', age: 17, email: 'jane@test.com' },
    { name: 'Bob', age: 70, email: 'bob@test.com' }
];

console.log(processUserData(testUsers));
console.log(calculateDiscount(100, 20));
console.log(groupUsersByAge(testUsers));

/*

Task 5: Debugging & Code Review

1. Identify and Fix All Bugs (5 points)

The main bug was in the processUserData function.  
The loop was written as: for (let i = 0; i <= users.length; i++)   
The fix is to change the loop condition to i < users.length.

2. Explain What Each Bug Was and Why It Occurred (3 points)

This is wrong because arrays in JavaScript start at index 0 and end at length - 1.  
When i becomes equal to users.length, users[i] becomes undefined, which causes an error when trying to access user.age. 
The correct way is to loop with i < users.length to avoid this problem.

3. Suggest Improvements to Make the Code More Robust (2 points)

Add input validation: Check if users is an array before running the loop.  
Use filter and map instead of for loops to make the code shorter and easier to read. 

*/
