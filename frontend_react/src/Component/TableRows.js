import { Button, Card, Row, Col } from 'react-bootstrap';

function TableRows({ rowsData, deleteTableRows, handleChange }) {
    const roledata = [{ id: "Propose", name: "Propose" }, { id: "Open", name: "Open" },{ id: "Closed", name: "Closed" }]
    const permit_choices = [{ id: "Read", name: "Read" }, { id: "Create", name: "Create" },{ id: "Update", name: "Update" },{ id: "Delete", name: "Delete" }]
    
    return (

        rowsData.map((data, index) => {
            const { name, state,for_user, for_user_permission,date} = data;
            return (<>
                <div className="container pb-1">
                    <div className="row">
                        <div className="col">
                            <div className="row ">
                            <div className="col">
                                <input type="date" value={date} autoComplete="off" placeholder={'User Id'} onChange={(evnt) => (handleChange(index, evnt))} name="date" className="form-control" />
                               
                                {/* <input type="date" id="date" name="birthday"></input> */}
                                    {/* <h5 className="float-end"> <Button className="border-0" style={{ color: "white", backgroundColor: 'red' }} onClick={() => (deleteTableRows(index))}>Remove</Button></h5> */}
                                </div>
                                <div className="col">
                                    <input type="text" value={name} autoComplete="off" placeholder={'Project name'} onChange={(evnt) => (handleChange(index, evnt))} name="name" className="form-control" />
                                </div>
                                <div className="col">
                                <select className='form-select mb-1' value={state} name="state" onChange={(evnt) => (handleChange(index, evnt))}>
                                    <option>Please select State</option>
                                    {roledata.map((e, key) => {
                                        return <option key={e.id} value={e.name}>{e.name}</option>;
                                    })}
                                </select>
                                    {/* <input type="text" value={state} autoComplete="off" placeholder={'Select State'} onChange={(evnt) => (handleChange(index, evnt))} name="state" className="form-control" /> */}
                                </div>
                                <div className="col">
                                    <input type="text" value={for_user} autoComplete="off" placeholder={'User Id'} onChange={(evnt) => (handleChange(index, evnt))} name="for_user" className="form-control" />
                                </div>
                                <div className="col">
                                <select className='form-select mb-1' value={for_user_permission} name="for_user_permission" onChange={(evnt) => (handleChange(index, evnt))}>
                                    <option>Please select Permission</option>
                                    {permit_choices.map((e, key) => {
                                        return <option key={e.id} value={e.name}>{e.name}</option>;
                                    })}
                                </select>
                                    {/* <input type="text" value={for_user_permission} autoComplete="off" placeholder={'Select User Permission'} onChange={(evnt) => (handleChange(index, evnt))} name="for_user_permission" className="form-control" /> */}
                                </div>
                                

                            </div>
                        </div>
                    </div>
                </div>



                {/* <tr key={index}>
                <td><input type="text" value={email}  onChange={(evnt)=>(handleChange(index, evnt))} name="email" className="form-control"/> </td>
                <td><input type="text" value={mobile_number}  onChange={(evnt)=>(handleChange(index, evnt))} name="mobile_number" className="form-control" /> </td>
                <td><button className="fas fa-minus-circle border-0" style={{ fontSize: "1.3rem", color: "#ff4d4d", backgroundColor:'white'}} onClick={()=>(deleteTableRows(index))}></button></td>
            </tr> */}
            </>
            )
        })

    )

}

export default TableRows;