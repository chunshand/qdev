/**
 * 递归处理
 * @param a 数组
 * @param k 初始key
 * @param props 配置
 * @returns 
 */
export function recursion(a: any[] = [], k = null, props: any = { id: 'id', parentId: 'parentId', children: 'children' }) {
    function dg(arr, key) {
        let _arr = arr.filter((item) => item[props.parentId] == key)
        _arr = _arr.map((item) => {
            item[props.children] = dg(arr, item[props.id])
            return item
        })
        return _arr;
    }
    return dg(a, k)
}