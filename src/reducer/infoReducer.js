// state
const initState = {
    info : 'fix',
}

// reducer
// 第一個參數：state之前的值
// 操作者傳入dispatch函式的參數。
const infoReducer = (state = initState, action) => {
    switch (action.type) {
        // case 'CLEAN_ITEM': {
        //     return { info: [] };
        // }
        case 'CHANGE': {
            return {info:action.payload};
        }
        // 預設回傳state
        default:
            return state;
    }
};

export default infoReducer;