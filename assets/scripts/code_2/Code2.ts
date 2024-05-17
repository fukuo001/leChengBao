function canSumToV(a: number[], b: number[], v: number): boolean {  
    // 将其中一个数组（这里选择数组a）转换为Set以便快速查找  
    const setA = new Set(a);

    // 遍历数组b，检查是否存在b[i]与v-b[i]的和在SetA中  
    for (const numB of b) {  
        const complement = v - numB;  
        if (setA.has(complement)) {  
            return true;
        }
    }
    // 如果循环结束后没有找到，则返回false  
    return false;
}

const a = [10, 40, 5, 280];
const b = [234, 5, 2, 148, 23];
const v = 42;

console.log(canSumToV(a, b, v)); // 输出: true
// 将数组 a 转换为 Set 的时间复杂度是 O(n)
// 遍历数组 b 的时间复杂度是 O(m)
// 对于数组 b 中的每个元素，检查其补数 v - numB 是否在 SetA 中的时间复杂度是 O(1)
// 总的时间复杂度是 O(n + m)，但通常我们忽略加法中的较小项，因此可以说时间复杂度是 O(n + m)，
// 但考虑到 Set 的快速查找，它在实际操作中更接近 O(n + m) 中的较小值，即 O(max(n, m))。如果两个数组长度相近，可以简化为 O(n)。