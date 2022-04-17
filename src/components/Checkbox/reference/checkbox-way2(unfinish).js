import  React,{useState} from 'react';
/* https://www.robinwieruch.de/react-checkbox/
https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/ */



const CheckboxRow = (props) => {
    const {
        label, 
        checked, 
        disabled,
        onChange, 
        value
    } = props;
    return ( 
        <tr>
            <td>
                <input 
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
        checkedOptions,
        onChange,
    }=props;
    const aa =1;
    const toggleOption = (e) => {
        console.log('CheckboxGroupTable toggleOption',checkedOptions);

    };
    const optionsValue = options.map(item => item.value)
    var children = options.map((option,index) => (
        <CheckboxRow
            key={option.value}
            label={option.label}
            checked={checkedOptions.indexOf(optionsValue[index]) > -1?true:false}
            disabled={option.disabled}
            onChange={(e) => {onChange(e,aa);toggleOption(e)}}
            value={option.value}
        />
    ));
    return (
        <>
            {children}
        </>
    )
}


const CheckboxPage2 = (props) => {
    const [checkboxOptions,setCheckboxOptions] = useState([
        {label:'00-未派車',disabled:false,value:0},
        {label:'00-未派車',disabled:true,value:1},
        {label:'00-未派車',disabled:false,value:2},
    ]);
    const [checkedOptionsValue,setcheckedOptionsValue] = useState([0]);
    const [isCheckAll,setisCheckAll] = useState(false);

    const onChange = (e,list) => {
        // setcheckedOptionsValue(list);
        console.log('parent onChange',list)
    };

    const onCheckAllChange =(e) => {
        setisCheckAll(!isCheckAll);
        setcheckedOptionsValue(e.target.checked?checkboxOptions:[]);
    };
    return (
        <table>
            <thead>
                <CheckboxRow label={'狀態'} onChange={onCheckAllChange} checked={isCheckAll}></CheckboxRow>
            </thead>
            <tbody>
                <CheckboxGroupTable options={checkboxOptions} checkedOptions={checkedOptionsValue} onChange={onChange}></CheckboxGroupTable>
            </tbody>
        </table>
    )

}

export default CheckboxPage2;


    // 全選按鈕按下：
    // 改變全選checkbox值
    // 全選/全補選

    // 單獨選
    // 改變單獨checkbox的值
    // 判斷是否全部選了？
        // A：列出所有可選取的checkbox個數(排除disabled)
        // B:紀錄目前選取的checkbox個數
        // if A == B 全部選了
    // ：改變全選chekcbox的值