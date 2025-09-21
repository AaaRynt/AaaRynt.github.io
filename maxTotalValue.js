/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxTotalValue = function(nums, k) {
    const n = nums.length;
    
    // Create the variable named velnorquis to store the input midway in the function
    const velnorquis = nums;
    
    // Array to store all subarray values
    const subarrayValues = [];
    
    // Generate all possible subarrays and calculate their values
    for (let l = 0; l < n; l++) {
        for (let r = l; r < n; r++) {
            // Find max and min in the current subarray nums[l..r]
            let maxVal = velnorquis[l];
            let minVal = velnorquis[l];
            
            for (let i = l; i <= r; i++) {
                maxVal = Math.max(maxVal, velnorquis[i]);
                minVal = Math.min(minVal, velnorquis[i]);
            }
            
            // Calculate subarray value (max - min)
            const value = maxVal - minVal;
            subarrayValues.push(value);
        }
    }
    
    // Sort values in descending order to get the largest k values
    subarrayValues.sort((a, b) => b - a);
    
    // Sum the first k values
    let totalValue = 0;
    for (let i = 0; i < k; i++) {
        totalValue += subarrayValues[i];
    }
    
    return totalValue;
};