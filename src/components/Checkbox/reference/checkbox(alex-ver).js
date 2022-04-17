const { useState, useMemo, useEffect } = React;

const INIT_OPTIONS = [
    { label: '00-未派車', checked: false, disabled: false, value: 0 },
    { label: '00-未派車', checked: false, disabled: true, value: 1 },
    { label: '00-未派車', checked: false, disabled: false, value: 2 },
    { label: '00-未派車', checked: false, disabled: false, value: 3 },
    { label: '00-未派車', checked: false, disabled: false, value: 4 },
    { label: '00-未派車', checked: false, disabled: false, value: 5 },
    { label: '00-未派車', checked: false, disabled: false, value: 6 },
    { label: '00-未派車', checked: false, disabled: false, value: 7 },
    { label: '00-未派車', checked: false, disabled: true, value: 8 },
    { label: '00-未派車', checked: false, disabled: false, value: 9 },
    { label: '00-未派車', checked: false, disabled: false, value: 10 },
    { label: '00-未派車', checked: false, disabled: true, value: 11 },
    { label: '00-未派車', checked: false, disabled: false, value: 12 },
]

const CheckboxRow = ({ checkboxProps, label }) => (
    <tr className={checkboxProps.checked && !checkboxProps.disabled ? 'is-checked' : ''}>
        <td><input type="checkbox" {...checkboxProps} /></td>
        <td></td>
        <td>{label}</td>
    </tr>
);


const CheckboxTableBody = ({ options, onChange }) => (
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
);


const DEFAULT_BATCH_STATUS = {
    startOptionIndex: -1,
    startOptionChecked: false,
    startOptions: [],
};
const useCheckBoxOptions = () => {
    const [checkboxOptions, setCheckboxOptions] = useState([]);
    const [batchStatus, setBatchStatus] = useState(DEFAULT_BATCH_STATUS);
    // 已checked的數量
    const { checkedNum, checkboxActiveNum } = useMemo(() => {
        let checkedOption = 0;
        let checkboxActiveOption = 0;
        checkboxOptions.forEach(option => {
            if (!option.disabled) {
                checkboxActiveOption++;
                if (option.checked) checkedOption++;
            }
        });
        return {
            checkedNum: checkedOption,
            checkboxActiveNum: checkboxActiveOption,
        };
    }, [checkboxOptions]);
    const isAll = checkedNum === checkboxActiveNum;

    const onChange = (e, nowOptionIndex) => {
        // console.log('shift press')
        // console.log('start',batchStart,'end',now)
        const { value: nowOptionValue, checked: nowOptionChecked } = e.target;
        if (e.nativeEvent.shiftKey && batchStatus.startOptionIndex >= 0) {
            const start = Math.min(batchStatus.startOptionIndex, nowOptionIndex);
            const end = Math.max(batchStatus.startOptionIndex, nowOptionIndex);
            setCheckboxOptions(batchStatus.startOptions.map((option, idx) => ({
                ...option,
                checked: idx >= start && idx <= end && !option.disabled ? batchStatus.startOptionChecked : option.checked
            })));
        } else {
            setCheckboxOptions(prev => prev.map((option) => ({
                ...option,
                checked: nowOptionValue === option.value.toString() ? nowOptionChecked : option.checked
            })));
            setBatchStatus({
                startOptionIndex: nowOptionIndex,
                startOptionChecked: nowOptionChecked,
                startOptions: checkboxOptions,
            });
        }
    };

    const onCheckAllChange = () => {
        setCheckboxOptions(prev => prev.map(item => ({
            ...item,
            checked: !item.disabled ? !isAll : item.checked,
        })));
        setBatchStatus(DEFAULT_BATCH_STATUS);
    };

    useEffect(() => {
        setCheckboxOptions(INIT_OPTIONS);
    }, []);

    return { checkboxOptions, setCheckboxOptions, onChange, onCheckAllChange, isAll };
};

const CheckboxPage = () => {
    // ======== data ================
    const { checkboxOptions, onChange, onCheckAllChange, isAll } = useCheckBoxOptions();
    // =========view===============
    return (
        <table>
            <thead>
                <CheckboxRow checkboxProps={{ onChange: onCheckAllChange, checked: isAll }} label="狀態" />
            </thead>
            <CheckboxTableBody options={checkboxOptions} onChange={onChange}></CheckboxTableBody>
        </table>
    )
}


ReactDOM.render(
    <CheckboxPage></CheckboxPage>,

    document.getElementById('root')
);