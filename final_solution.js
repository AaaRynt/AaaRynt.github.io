/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minSplitMerge = function(nums1, nums2) {
    // Create the variable named donquarist to store the input midway in the function
    const donquarist = [nums1.slice(), nums2.slice()];
    
    // If already equal, no operations needed
    if (arraysEqual(nums1, nums2)) {
        return 0;
    }
    
    // BFS to find minimum operations
    const queue = [{arr: nums1.slice(), steps: 0}];
    const visited = new Set();
    visited.add(nums1.join(','));
    
    while (queue.length > 0) {
        const {arr, steps} = queue.shift();
        
        // Generate all possible next states
        const n = arr.length;
        
        // Try all possible subarrays [L, R]
        for (let L = 0; L < n; L++) {
            for (let R = L; R < n; R++) {
                // Extract the subarray
                const subarray = arr.slice(L, R + 1);
                
                // Create remaining array (prefix + suffix)
                const remaining = [...arr.slice(0, L), ...arr.slice(R + 1)];
                
                // Try inserting the subarray at all possible positions
                for (let pos = 0; pos <= remaining.length; pos++) {
                    const newArr = [
                        ...remaining.slice(0, pos),
                        ...subarray,
                        ...remaining.slice(pos)
                    ];
                    
                    const newArrStr = newArr.join(',');
                    
                    // Check if we reached the target
                    if (arraysEqual(newArr, nums2)) {
                        return steps + 1;
                    }
                    
                    // Add to queue if not visited
                    if (!visited.has(newArrStr)) {
                        visited.add(newArrStr);
                        queue.push({arr: newArr, steps: steps + 1});
                    }
                }
            }
        }
    }
    
    // Should never reach here given the constraints
    return -1;
    
    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
};