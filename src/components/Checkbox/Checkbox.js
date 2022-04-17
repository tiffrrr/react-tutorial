import  React,{useState,useMemo} from 'react';
import './checkbox.css'
const INIT_OPTIONS = [
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

const CheckboxRow = ({ checkboxProps, label }) => {
  return(
    <tr className={checkboxProps.checked && !checkboxProps.disabled ? 'is-checked' : ''}>
        <td>
          <Checkbox type="checkbox" {...checkboxProps}/>
        </td>
        <td></td>
        <td>{label}</td>
    </tr>
  )
};

const CheckboxTableBody = ({ options, onChange }) => {
  return(
    <tbody>
        {options.map((option, idx) => (
            <CheckboxRow
                key={option.value}
                checkboxProps={{
                    checked: option.checked,
                    disabled: option.disabled,
                    onChange: e => onChange(e, idx),
                    value: option.value,
                }}
                label={option.label}
            />
        ))}
    </tbody>
)};


const useCheckBoxOptions = () => {
    const [checkboxOptions,setCheckboxOptions] = useState(INIT_OPTIONS);
    const [batchStart,setbatchStart] = useState(-1);
    const {checkedNum, checkboxActiveNum} = useMemo(
        () => {
            let checkedNum=0;
            let checkboxActiveNum=0;
            checkboxOptions.forEach(option => {
                if(!option.disabled){
                  checkboxActiveNum++;
                  if(option.checked) checkedNum++;
                }
            })
            return {checkedNum,checkboxActiveNum};
        }, [checkboxOptions]);
    const isAll = checkedNum === checkboxActiveNum;

    const onChange = (e) => {
        const nowCheckedValue = e.target.value;
        const start =  Math.min(batchStart,nowCheckedValue);
        const end =  Math.max(batchStart,nowCheckedValue);
        setCheckboxOptions(prev => {
            let newState = [...prev];
            if(e.nativeEvent.shiftKey && batchStart>-1){
                newState.forEach((element,index) => {
                    if(index > start && index <= end && !element.disabled){
                        newState[index].checked = e.target.checked;
                    }
                })
            }else{
                newState[nowCheckedValue].checked = e.target.checked;
            }
            return newState;
        })
        setbatchStart(nowCheckedValue);
    };

    const onCheckAllChange =() => {
        setbatchStart(-1);
        setCheckboxOptions(prev => prev.map( item => ({...item,checked: !item.disabled ? !isAll : item.checked})))
      
    };
    return { checkboxOptions, onChange, onCheckAllChange, isAll };

}
const CheckboxPage = () => {
    const { checkboxOptions, onChange, onCheckAllChange, isAll } = useCheckBoxOptions();
    return (
        <table>
            <thead>
                <tr>
                    <th><Checkbox onChange={onCheckAllChange} checked={isAll}></Checkbox></th>
                    <th></th>
                    <th>狀態</th>
                </tr>
                
            </thead>
        <CheckboxTableBody options={checkboxOptions} onChange={onChange}></CheckboxTableBody>
        </table>
    )
}

export default CheckboxPage;