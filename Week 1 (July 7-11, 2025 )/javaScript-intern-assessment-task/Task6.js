function formatPhoneNumber(digits) {
    if (digits.length !== 10 || isNaN(digits)) {
        return "Invalid input";
    }
    return "(" + digits.slice(0, 3) + ") " + digits.slice(3, 6) + "-" + digits.slice(6);
}

function findDuplicates(arr) {
    var seen = {};
    var duplicates = [];

    for (var i = 0; i < arr.length; i++) {
        if (seen[arr[i]]) {
            if (!duplicates.includes(arr[i])) {
                duplicates.push(arr[i]);
            }
        } else {
            seen[arr[i]] = true;
        }
    }

    return duplicates;
}

function rotateArray(arr, positions) {
    var part1 = arr.slice(positions);
    var part2 = arr.slice(0, positions);
    return part1.concat(part2);
}



function isPalindrome(str) {
    var clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    var reversed = clean.split("").reverse().join("");
    return clean === reversed;
}

function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    var a = 0;
    var b = 1;
    var c;

    for (var i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }

    return c;
}

console.log(formatPhoneNumber("1234567890"));
console.log(findDuplicates([1, 2, 3, 2, 4, 5, 1]));
console.log(rotateArray([1, 2, 3, 4, 5], 2));
console.log(isPalindrome("abc cba"));
console.log(fibonacci(10));
