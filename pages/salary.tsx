import React from 'react'
import { Row, Col, Table, Button, Space } from 'antd';
import router from 'next/router';


function Salary() {

    const [user, setUser] = React.useState<any[]>([]);

    React.useEffect(() => {
        const users = JSON.parse(localStorage.getItem("Data") || "[]");
        setUser(users)
    }, []);

    const dataUser = user.map((user:any,index:number)=>{
        return user;
    })

    const deleteProfile = (result:any) => {
        console.log(result);
        const newUser =  user.filter((user:any)=>{
            return result.รหัส !== user.รหัส
        })
        var r = confirm("Sure for delete?");
        if(r == true) {
            localStorage.setItem("Data", JSON.stringify(newUser));
            setUser(newUser)
            alert(`delete " ชื่อ : ${result.รายชื่อ} " success!`)
        }
        
    }

    const showSlip = (result:any) => {
        console.log(result.รหัส);
        
        var r = confirm("Go to Edit profile")
        if(r == true) {
            router.push({
                pathname: '/[id]',
                query: {id: result.รหัส}
            })
        }
    }

    const deleteAll = () =>{
        var r = confirm("Sure for delete?");
        if(r == true) {
            localStorage.removeItem('Data');
            router.push('../')
            alert(`Delete All Success!`)
        }
    }

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
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'id',
            render: (text:any, record:any) => {
                return <Space size="middle">
                <Button type='primary' onClick={()=> showSlip(record)}>Show Slip</Button>
                <Button danger type="primary" onClick={() => deleteProfile(record)}>Delete</Button>
              </Space>
            },
          },
      ];

    return (
        <Row justify="space-around" align="middle" className="admin-container">
            <Col span={16}>
                <h1>สลิปเงินเดือน</h1>
                <Table dataSource={dataUser} columns={columns} />;
                <Button danger type='primary' onClick={()=> deleteAll()}>Delete All</Button>
            </Col>
        </Row>
    )
}

export default Salary
