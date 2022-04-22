// state
const initState = {
    data : [1,2],
}

// reducer
// 第一個參數：state之前的值
// 操作者傳入dispatch函式的參數。
const dataReducer = (state = initState, action) => {
    switch (action.type) {
        // case 'CLEAN_ITEM': {
        //     return { data: [] };
        // }
        // 預設回傳state
        default:
            return state;
    }
};

export default dataReducer;