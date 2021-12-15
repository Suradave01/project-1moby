import { useState } from "react";
import XLSX from 'xlsx'
import { Table,Button } from 'antd';
import router, { useRouter } from 'next/router'



export default function CsvReader(){
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const [tableShow, setTableShow] = useState(false);
    // [{ลำดับที่: "", รหัส: "", รายชื่อ: "", เงินเดือน: "", เงินเดือนตกเบิก: "", รวม: "", OT: "", ค่าคอมมิชชั่น: "", ค่าชดเชยและสวัสติการ: "", ค่าโทรศัพท์: "", อื่นๆ: "",
    //   เงินชดเชย: "", เงินได้พิเศษ: "", โบนัส: "", รวมเงินได้: "", ภาษี: "", เงินประกัน: "", เงินกู้ยืม: "", ไม่รับเงินเดือน: "", รายหัก: "", เงินได้สุทธิ: ""}]

    const processcsv = (str:any, delim =',') => {
        const headers = str[0];
        const totalArray = Object.keys(str).length;
        const rows = str.slice(1,totalArray);
        console.log(rows);

        const newArray = rows.map((row: string)=>{
           const eachObject = headers.reduce((obj: { [x: string]: string; },header: string | number,i:number)=>{
               obj[header] = row[i];
               return obj;
           },{})
           return eachObject;
        })  
        console.log(newArray);
        setCsvArray(newArray);
        setTableShow(!tableShow)
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

    const dataUser = csvArray.map((user:any,index:number)=>{
        return user;
    })

    const columns = [
        {
          title: 'ลำดับที่',
          dataIndex: 'ลำดับที่',
          key: 'ลำดับที่',
        },
        {
          title: 'รหัส',
          dataIndex: 'รหัส',
          key: 'รหัส',
        },
        {
          title: 'รายชื่อ',
          dataIndex: 'รายชื่อ',
          key: 'รายชื่อ',
        },
        {
            title: 'เงินเดือน',
            dataIndex: 'เงินเดือน',
            key: 'เงินเดือน'
        }
      ];

      const confirmSave = (e:any) =>{
          if (confirm("Save or Not")){
              const lengthData = Object.keys(e).length;
              const dataSlip = JSON.parse(localStorage.getItem('Data') || "[]");
              csvArray.map((user:any,index:number)=>{
                  dataSlip.push(user);
                  console.log(user);
              })
              localStorage.setItem("Data",JSON.stringify(dataSlip));
              alert("Success Save!")
              router.push('../')

          } else {
              alert("Plese try again!")
          }
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
            {tableShow === true && (
                <div>
                    <Table dataSource={dataUser} columns={columns} />
                    <Button type="primary" onClick={()=>confirmSave(dataUser)}>Save</Button>
                </div>
            )};
        </form>
    )
}

