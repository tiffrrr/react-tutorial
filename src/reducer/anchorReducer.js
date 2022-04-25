// state
const initState = {
    isAnchorFixed : false,
    isHeaderFixed: false,
}

// reducer
// 第一個參數：state之前的值
// 操作者傳入dispatch函式的參數。
const anchorReducer = (state = initState, action) => {
    switch (action.type) {
        case 'TOGGLE_ANCHOR_FIXED': {
            return {isAnchorFixed: action.payload}
        }
        // case 'CLEAN_ITEM': {
        //     return { data: [] };
        // }
        // 預設回傳state
        default:
            return state;
    }
};

export default anchorReducer;