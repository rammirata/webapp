// Returns the elements found in arr1 but not in arr2
const difference = (arr1, arr2) => {
    const set2 = new Set();
    arr2.forEach(val => set2.add(val));
    const diff = arr1.filter(val => !set2.has(val));
    return diff;
}

module.exports = difference
