- 常數抽離開用大寫命名
    ```
    const INIT_OPTIONS = [ { label: '00-未派車', checked: false, disabled: false, value: 0 },]
    ```


- 傳進來的props太多的話，可以適當分類，比較好閱讀
    - Bad
        ```
        <CheckboxRow
            key={option.value}
            label={option.label}
            checked={option.checked}
            disabled={option.disabled}
            onChange={onChange}
            value={option.value}
        />
        ```
    - Good
        ```
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
        ```
    
- 解構賦值用法
    ```
    const useCheckBoxOptions = () => {
        return { checkboxOptions, setCheckboxOptions, onChange, onCheckAllChange, isAll };
    }

    const { checkboxOptions, onChange, onCheckAllChange, isAll } = useCheckBoxOptions();

    ```
    等同於
    ```
    const checkboxOptions 
    const onChange
    ...
    分別等於function return 的 checkboxOptions, onChange, onCheckAllChange, isAll
    ```
- 元件裡面的邏輯抽離開，別的地方可能也可以用到
    - Bad
        ```
        <!-- --------元件開始----------- -->
        const CheckboxPage2 = (props) => {
            const initOptions = []
            const [checkboxOptions,setCheckboxOptions] = useState(initOptions);
            const [batchStart,setbatchStart] = useState(0);
            
            // 可checked的總數
            const getCheckboxActiveNum = (checkboxOptions) => {...}
            const CheckboxActiveNum = getCheckboxActiveNum(checkboxOptions);

            // 已checked的數量
            const checkedNum = useMemo(
                () => {...}, [checkboxOptions]);
            // 是否全選
            const isAll = checkedNum === CheckboxActiveNum;

            const onChange = (e,list) => {...};

            const onCheckAllChange =(e) => {...};
            return (<>...</>)
        }
        ```
    - Good
        ```
        const INIT_OPTIONS = []
        const DEFAULT_BATCH_STATUS = {}

        const useCheckBoxOptions = () => {
            const [checkboxOptions, setCheckboxOptions] = useState([]);
            const [batchStatus, setBatchStatus] = useState(DEFAULT_BATCH_STATUS);
            // 已checked的數量
            const { checkedNum, checkboxActiveNum } = useMemo(() => {...});}, [checkboxOptions]);
            const isAll = checkedNum === checkboxActiveNum;

            const onChange = (e, nowOptionIndex) => {...};

            const onCheckAllChange = () => {...};

            useEffect(() => {
                setCheckboxOptions(INIT_OPTIONS);
            }, []);

            return { checkboxOptions, setCheckboxOptions, onChange, onCheckAllChange, isAll };
        }
        <!-- --------元件開始----------- -->
        const CheckboxPage = () => {
            const { checkboxOptions, onChange, onCheckAllChange, isAll } = useCheckBoxOptions();
            return (<table>...</table>)
        }
        ```

