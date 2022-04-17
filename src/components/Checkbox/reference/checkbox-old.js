import  React,{useState,useMemo} from 'react';

const Checkbox = (props) => {
    return(
        <input 
            type="checkbox" 
            checked={props.checked}
            disabled={props.disabled}
            onChange={props.onChange}
            value={props.value}
        />
    );
}

const CheckboxRow = (props) => {
    const {
        label, 
        checked, 
        disabled,
        onChange, 
        value,
    } = props;
    return ( 
        <tr className={checked && !disabled?'is-checked':''}>
            <td>
            <Checkbox 
                type="checkbox" 
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                value={value}
            />
            </td>
            <td></td>
            <td>{label}</td>
        </tr>
    );
} 


const CheckboxGroupTable = (props) => {
    const {
        options,
        onChange,
    }=props;
    var children = options.map((option) => (
        <CheckboxRow
            key={option.value}
            label={option.label}
            checked={option.checked}
            disabled={option.disabled}
            onChange={onChange}
            value={option.value}
        />
    ));
    return (
        <>
            {children}
        </>
    )
}


const CheckboxPage = () => {
    const initOptions = [
        {label:'00-未派車',checked:false,disabled:false,value:0},
        {label:'00-未派車',checked:false,disabled:true,value:1},
        {label:'00-未派車',checked:false,disabled:false,value:2},
        {label:'00-未派車',checked:false,disabled:false,value:3},
        {label:'00-未派車',checked:false,disabled:false,value:4},
        {label:'00-未派車',checked:false,disabled:false,value:5},
        {label:'00-未派車',checked:false,disabled:false,value:6},
        {label:'00-未派車',checked:false,disabled:false,value:7},
        {label:'00-未派車',checked:false,disabled:true,value:8},
        {label:'00-未派車',checked:false,disabled:false,value:9},
        {label:'00-未派車',checked:false,disabled:false,value:10},
        {label:'00-未派車',checked:false,disabled:true,value:11},
        {label:'00-未派車',checked:false,disabled:false,value:12},

    ]
    // ======== data ================

    const [checkboxOptions,setCheckboxOptions] = useState(initOptions);
    const [batchStart,setbatchStart] = useState(0);
    // const [isShift,setIsShift] = useState(false);
    
    // 可checked的總數
    const getCheckboxActiveNum = (checkboxOptions) => {
        let canCheckedNum=0;
        checkboxOptions.forEach(option => {
            if(!option.disabled){
                canCheckedNum++
            }
        });
        return canCheckedNum;
    }
    const CheckboxActiveNum = getCheckboxActiveNum(checkboxOptions);
    // console.log('CheckboxActiveNum',CheckboxActiveNum)

    // 已checked的數量
    const checkedNum = useMemo(
        () => {
            let checkedOption=0;
            checkboxOptions.forEach(option => {
                if(option.checked && !option.disabled) checkedOption=checkedOption+1;
            })
            // console.log('useMemo',checkedOption)
            return checkedOption;
        }, [checkboxOptions]);
    // 是否全選
    const isAll = checkedNum === CheckboxActiveNum;

    // ======== controller處理邏輯 + model 處理資料================
    const onChange = (e) => {
            // console.log('shift press')
            // console.log('start',batchStart,'end',now)
        console.log(batchStart)
        const nowCheckedValue = e.target.value;
        const start =  Math.min(batchStart,nowCheckedValue);
        const end =  Math.max(batchStart,nowCheckedValue);
        setCheckboxOptions(prev => {
            let newState = [...prev];
            // 批量選
            if(e.nativeEvent.shiftKey){
                newState.forEach((element,index) => {
                    if(index >= start && index <= end){
                        newState[index].checked = e.target.checked;
                    }
                })
            // 單選
            }else{
                newState[nowCheckedValue].checked = e.target.checked;
            }
            return newState;
        })
        setbatchStart(nowCheckedValue);
    };

    const onCheckAllChange =() => {
        setCheckboxOptions(prev => prev.map( item => ({...item,checked:!isAll})))
    };

    // =========view===============
    return (
        <table>
            <thead>
                <tr>
                    <th><Checkbox onChange={onCheckAllChange} checked={isAll}></Checkbox></th>
                    <th></th>
                    <th>狀態</th>
                </tr>
                
            </thead>
            <tbody>
                <CheckboxGroupTable options={checkboxOptions} onChange={onChange}></CheckboxGroupTable>
            </tbody>
        </table>
    )
}

export default CheckboxPage;
/* https://www.robinwieruch.de/react-checkbox/
https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/ */
// func
// A：列出所有可選取的checkbox個數(排除disabled)
// B:紀錄目前選取的checkbox個數
// if A == B 全部選了,勾上全選按鈕
// else 沒全選，取消全選按鈕


// 全選按鈕按下：
// 全選/全不選
// 跑func，自動判斷要不要勾全選按鈕

// 單獨按鈕按下：
// 改變單獨checkbox的值
// 跑func，自動判斷要不要勾全選按鈕


    // function keydown(e){
    //     // console.log(e.shiftKey)
    //     setIsShift(e.shiftKey)
    //     let inBeteen = false;
    //     if(e.shiftKey){
            
    //     }

    // }
    // function keyup(e){
    //     // console.log('up',e.shiftKey)
    //     setIsShift(e.shiftKey)
    // }

    // useEffect(
    //     () => {
    //         window.addEventListener('keydown',keydown);
    //         window.addEventListener('keyup',keyup);
    //         // 需要 clean up 不然每次render都會重複綁定，變成重複執行
    //         return () => {
    //             window.removeEventListener('keydown',keydown)  
    //             window.removeEventListener('keyup',keyup)  
    //         }
    //     },[])