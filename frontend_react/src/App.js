import './App.css';
import { useState } from 'react';
import { Postdata } from './Helpers/Api';
import { Button, Card, Row} from 'react-bootstrap';
import Display from './Component/Display';

function App() {
  const [state, setState] = useState({ value: '' });
  const handleChange = (event) => {
    setState({ value: event.target.value })
  }
  const [id, setId] = useState()
  const [index, setIndex] = useState(false)
  const [isCreate, setIsCreate] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { "user_id": state.value }
    const data = Postdata(payload)
    data.then(async (res) => {
      console.log("res", res.data.access.includes('Create'))
      setIndex(true)
      if (res.data.access.includes('Create')) {
        setId(payload.user_id)
        setIsCreate(false)
      }
      else {
        setId(payload.user_id)
      }
    })
    data.catch(async (err) => {
      console.log('err', err)
    })

  }
  return (
    <>
      {!index && (
        <div className='col text-center m-5 justify-content-center align-self-center'>
          <Row className=" m-5 p-4 justify-content-center align-self-center">
            <Card className='row text-center m-5justify-content-center align-self-center p-0' style={{ backgroundColor: "#cccccc", maxWidth: '50rem', minHeight: '15rem', top:'10rem', borderEndEndRadius:'10px', borderEndStartRadius:'10px' }}>
              <Card.Title className='p-4 text-danger' style={{ backgroundColor: "rgb(24 84 112)", color: 'white', maxWidth: '50rem', fontSize:'40px' }}>
                Admin
              </Card.Title>
              <Card.Body >

                <form onSubmit={handleSubmit} className='text-center justify-content-center align-self-center'>
                  <Row >
                    <label className='p-1'>
                      <b style={{fontSize:'25px', color:'#404040'}}> User ID : </b>
                      <input className='p-1 m-3' type="text" name='value' placeholder='Please enter User ID ....' onChange={handleChange} autoComplete='off'/>
                      <Button className='m-3 col-sm-2' type='submit'>Submit</Button>
                    </label>
                  </Row>
                </form>
              </Card.Body>
            </Card>
          </Row>
        </div>
      )}
      {index && (
        <>
          <div className='col text-center m-5 justify-content-center align-self-center'>
            <Row className=" m-5 p-4 justify-content-center align-self-center">

              <Display props={{ id: id, isCreate: isCreate }} />
            </Row></div>
        </>)}
    </>
  );
}

export default App;

