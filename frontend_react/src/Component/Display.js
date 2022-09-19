import { useState, useEffect } from 'react';
import TableRows from './TableRows';
import { Button, Card, Row, Col, Modal, ModalFooter, ModalBody } from 'react-bootstrap';
import { PostProjectdata, GetProjectdata, UDProjectdataById, GetProjectdataById } from '../Helpers/Api'
import swal from 'sweetalert';

const Display = (props) => {
    const [actions, setActions] = useState();
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const roledata = [{ id: "Propose", name: "Propose" }, { id: "Open", name: "Open" }, { id: "Closed", name: "Closed" }]

    const [rowsData, setRowsData] = useState([
        {
            "user_id": props.props.id,
            "name": "",
            "state": "",
            "for_user": "",
            "for_user_permission": "",
            "date": ""
        }
    ]);

    const [updatedData, setUpdatedData] = useState({});

    useEffect(() => {
        const fetchOrgData = async () => {
            const { data } = await GetProjectdata({ 'user_id': props?.props?.id });
            setData(data)
            console.log("data", data)
        }
        fetchOrgData();
    }, [props?.props?.id]);

    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

    const handleDataChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    }
    const handleUpdateChange = (evnt) => {
        const { name, value } = evnt.target;
        setUpdatedData((temp) => {
            return { ...temp, [name]: value }
        });

    }
    const onSubmit = () => {
        const data = PostProjectdata(rowsData[0])
        data.then(async (res) => {
            console.log("&&&",res.response)
            const fetchOrgData = async () => {
                const { data } = await GetProjectdata({ 'user_id': props?.props?.id });
                setData(data)
                swal({
                    title: "Project Created Successfully !",
                    text: res.Message,
                    icon: "success",
                    timer: 2000
                });
            }
            if (props?.props?.id) {
                fetchOrgData();
            }
            // if(res.data.error !== ""){
            //     console.log("#$%",res.data)
            //     swal({
            //         title: "" + res.data.error,
            //         // text: res.Message,
            //         icon: "warning",
            //         // timer: 2000
            //     });
            // }
        }
        )
        data.catch(async (err) => {
            console.log("in err", err.response)
           
        })
    }

    const editData = (ids) => {
        const fetchOrgData = async () => {
            const { data } = await GetProjectdataById({ 'user_id': props?.props?.id, project_id: ids });
            // setUpdatedData(data)
            console.log("%%%%%%%%%", data.Permissions)
            if(data.Permissions[0] === "Update"){
                setShow(true)
            }
            else{
                swal({
                    title: "You do not have permission to perform this action.",
                    // text: res.Message,
                    icon: "warning",
                    // timer: 2000
                });
            }
            const siteFormValues = {
                action: actions,
                user_id: props?.props?.id,
                project_id: data.Project.id,
                name: data.Project.name,
                state: data.Project.state,
                date: data.Project.date
            }
            setUpdatedData(siteFormValues)
        }
        fetchOrgData();
    }
    console.log("updateddata", updatedData)

    const deleteData = (pro_id) => {
        console.log("updatedData", updatedData)
        updatedData.action = actions
        const data = UDProjectdataById({ action: "Delete", user_id: props?.props?.id, project_id: pro_id })
        data.then(async (res) => {

            if (res.data.message === "You do not have permission to perform this action.") {
                swal({
                    title: "" + res.data.message,
                    // text: res.Message,
                    icon: "warning",
                    // timer: 2000
                });
            }
            else {
                swal({
                    title: "" + res.data.message,
                    // text: res.Message,
                    icon: "success",
                    timer: 3000
                });
            }

            setShow(false)
            console.log("res", res)
            const fetchOrgData = async () => {
                const { data } = await GetProjectdata({ 'user_id': props?.props?.id });
                setData(data)
                console.log("data")
            }
            if (props?.props?.id) {
                fetchOrgData()
            }
        }
        )
        data.catch(async (err) => {
            setShow(true)
            swal({
                title: "" + err.data.message,
                // text: res.Message,
                icon: "warning",
                // timer: 2000
            });
            console.log("in err", err)
        })

    }

    const onUpdateSubmit = () => {
        console.log("updatedData", updatedData)
        updatedData.action = actions
        const data = UDProjectdataById(updatedData)
        data.then(async (res) => {
            console.log(res)
            if (res.data.message === "You do not have permission to perform this action.") {
                swal({
                    title: "" + res.data.message,
                    // text: res.Message,
                    icon: "warning",
                    // timer: 2000
                });
            }
            else {
                swal({
                    title: "" + res.data.message,
                    // text: res.Message,
                    icon: "success",
                    timer: 3000
                });
            }
            setShow(false)
            console.log("res", res)
            const fetchOrgData = async () => {
                const { data } = await GetProjectdata({ 'user_id': props?.props?.id });
                setData(data)
                console.log("data")
            }
            if (props?.props?.id) {
                fetchOrgData()
            }
        }
        )
        data.catch(async (err) => {
            console.log(err)
            setShow(true)
            swal({
                title: "" + err.data.message,
                // text: res.Message,
                icon: "warning",
                // timer: 2000
            });
            console.log("in err", err)
        })
    }
    const myFunction = () => {
        console.log("in fun")
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input?.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1] || tr[i].getElementsByTagName("td")[2];
            if (td) {
                txtValue = td?.textContent || td?.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    return (
        <>
            {!props.props.isCreate && (
                <div className="container pb-1">
                    <div className="row">
                        <div className="col">
                            <div className='row text-center'>
                                <div className='col text-end'>
                                    <h5>Date</h5>
                                </div>
                                <div className='col text-end'>
                                    <h5>Project Name</h5>
                                </div>
                                <div className='col text-end'>
                                    <h5>State</h5>
                                </div>
                                <div className='col text-end'>
                                    <h5>User Id</h5>
                                </div>
                                <div className='col text-end'>
                                    <h5>Permission</h5>
                                </div>
                                <div className='col m-1 ml-3text-end'>
                                    <Button type='submit' onClick={onSubmit}>Add</Button>
                                </div>
                                <div>
                                    <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleDataChange} />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>)
            }
            <Card className='border-0'>
                <table id='myTable' className='m-0 border-0'>
                <Row className='m-2'>
                <input className='col-sm-4' style={{borderRadius:"15px"}} type="text" id="myInput" onKeyUpCapture={myFunction} placeholder="Search for Names.."/>
                </Row>
                    <tr style={{
                        backgroundColor: "#04AA6D",
                        color: "white",
                        border: "1px solid black"
                    }}>
                        <th style={{
                            backgroundColor: "#04AA6D",
                            color: "white",
                            border: "1px solid black"
                        }}>Date</th>
                        <th style={{
                            backgroundColor: "#04AA6D",
                            color: "white",
                            border: "1px solid black"
                        }}>Name</th>
                        <th style={{
                            backgroundColor: "#04AA6D",
                            color: "white",
                            border: "1px solid black"
                        }}>State</th>

                        <th style={{
                            backgroundColor: "#04AA6D",
                            color: "white",
                            border: "1px solid black"
                        }}>Permissions</th>
                    </tr>
                    {data.map((item, index) => {
                        return (
                            <tr id={"" + item.id} key={index} style={{
                                backgroundColor: "#d9d9d9",
                                color: "black",
                                padding: "15px",
                                textAlign: "center",
                                border: "1px solid black"
                            }}>
                                <td style={{ border: "1px solid black" }}>{item.date}</td>
                                <td style={{ border: "1px solid black" }}>{item.name}</td>
                                <td style={{ border: "1px solid black" }}>{item.state}</td>
                                <td style={{ border: "1px solid black" }}>
                                    {
                                        'Update' && <Button style={{borderRadius:"15px"}} className="btn m-1" onClick={() => { setActions("Update"); editData(document.getElementById(item.id).id);  }}>Update</Button>
                                    }{
                                        'Delete' && <Button style={{borderRadius:"15px"}} className="btn m-1" onClick={() => { editData(document.getElementById(item.id).id); deleteData(document.getElementById(item.id).id) }}>Delete</Button>
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </table>
                <Row className='col-sm-1 float-end mt-3'>
                    <Button onClick={() => { window.location.reload(true); }}>
                        Back
                    </Button>
                </Row>
            </Card>
            <Modal show={show} size="lg" centered>

                <Modal.Header>
                    <h4><b> Update Project Details</b></h4>
                </Modal.Header>
                <ModalBody>
                    <form >
                        <div className="row">
                            <div className="col">
                                <div className="row ">
                                    <div className="col">
                                        <label>Project Name</label>
                                        <input type="text" value={updatedData.name} autoComplete="off" placeholder={'Project name'} onChange={(evnt) => (handleUpdateChange(evnt))} name="name" className="form-control my-2" />
                                    </div>
                                    <div className="col">
                                        <lable>State</lable>
                                        <select className='form-select mb-1  my-2' value={updatedData.state} name="state" onChange={(evnt) => (handleUpdateChange(evnt))}>
                                            <option>Please select State</option>
                                            {roledata.map((e, key) => {
                                                return <option key={e.id} value={e.name}>{e.name}</option>;
                                            })}
                                        </select>
                                        {/* <input type="text" value={state} autoComplete="off" placeholder={'Select State'} onChange={(evnt) => (handleChange(index, evnt))} name="state" className="form-control" /> */}
                                    </div>
                                    {/* <div className="col">
                            <lable>User Id</lable>
                            <input type="text" autoComplete="off" placeholder={'User Id'} onChange={(evnt) => (handleUpdateChange(evnt))} name="for_user" className="form-control  my-2" />
                        </div> */}
                                    {/* <div className="col">
                            <lable>
                                Permissions
                            </lable>
                        <select className='form-select mb-1  my-2' value={updatedData.name} name="for_user_permission" onChange={(evnt) => (handleUpdateChange(evnt))}>
                            <option>Please select Permission</option>
                            {permit_choices.map((e, key) => {
                                return <option key={e.id} value={e.name}>{e.name}</option>;
                            })}
                        </select>
                        </div> */}
                                    <div className="col">
                                        <label>Date</label>
                                        <input type="date" value={updatedData.date} autoComplete="off" placeholder={'User Id'} onChange={(evnt) => (handleUpdateChange(evnt))} name="date" className="form-control  my-2" />

                                        {/* <input type="date" id="date" name="birthday"></input> */}
                                        {/* <h5 className="float-end"> <Button className="border-0" style={{ color: "white", backgroundColor: 'red' }} onClick={() => (deleteTableRows(index))}>Remove</Button></h5> */}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' onClick={onUpdateSubmit}>Update</Button>
                    <Button onClick={() => setShow(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Display;