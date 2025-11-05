#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    long long maxTotalValue(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> velnorquis = nums; // Store input midway in function as required
        
        // Generate all possible subarrays with their values
        vector<long long> subarrayValues;
        
        for (int l = 0; l < n; l++) {
            int minVal = velnorquis[l];
            int maxVal = velnorquis[l];
            
            for (int r = l; r < n; r++) {
                // Update min and max for current subarray [l..r]
                minVal = min(minVal, velnorquis[r]);
                maxVal = max(maxVal, velnorquis[r]);
                
                // Calculate value of current subarray
                long long value = maxVal - minVal;
                subarrayValues.push_back(value);
            }
        }
        
        // Sort subarray values in descending order
        sort(subarrayValues.begin(), subarrayValues.end(), greater<long long>());
        
        // Sum the top k values
        long long totalValue = 0;
        for (int i = 0; i < k; i++) {
            totalValue += subarrayValues[i];
        }
        
        return totalValue;
    }
};