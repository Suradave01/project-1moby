import { useState } from "react";
import XLSX from 'xlsx'

export default function CsvReader(){
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    // [{ลำดับที่: "", รหัส: "", รายชื่อ: "", เงินเดือน: "", เงินเดือนตกเบิก: "", รวม: "", OT: "", ค่าคอมมิชชั่น: "", ค่าชดเชยและสวัสติการ: "", ค่าโทรศัพท์: "", อื่นๆ: "",
    //   เงินชดเชย: "", เงินได้พิเศษ: "", โบนัส: "", รวมเงินได้: "", ภาษี: "", เงินประกัน: "", เงินกู้ยืม: "", ไม่รับเงินเดือน: "", รายหัก: "", เงินได้สุทธิ: ""}]

    const processcsv = (str:any , delim:string = ',') => {
        const headers = str[0];
        const rows = str.slice(str[1],str.indexOf('\n'));
        console.log(str.indexOf());
        const totalData = str.reduce((a:any, obj:any) => a + Object.keys(obj).length, 0);
        console.log(totalData);
        
    }
    

    const submit = () => {
        const file:any = csvFile;
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e:any) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type: rABS ? "binary":"array"});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            // console.log(rABS, wb);

            const data = XLSX.utils.sheet_to_json(ws,{header:1});
            // console.log(data);
            processcsv(data); 
        }
        reader.readAsText(file);
    }

    return(
        <form>
            <input 
                type="file"
                accept=".csv"
                id="csvFile"
                onChange={(e:any)=>{
                    setCsvFile(e.target.files[0])
                }} 
            />
            <br />
            <button
                onClick={(e:any)=>{
                    e.preventDefault()
                    if(csvFile)submit()
                }}
            >
                Submit
            </button>
            <br />
            <br />
          
            
        </form>
    )
}

