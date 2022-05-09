import React from "react";
import reser from './reservation.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Container, Form, ListGroup, Image, Alert} from "react-bootstrap";



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: "",
            last_name: "",
            insurance_code :0,
            phone :0,
            email :"",
            id_person :0,
            name2: "",
            description: "",
            error: {},


        };
    }

    componentDidMount() {
        const axios = require('axios').default;
        axios.get('http://localhost:8080/visits')
            .then((response) => {
                this.setState({
                    'data': response.data
                })
                //console.log(response.data);
                //console.log(response.status);
                //console.log(response.statusText);
                //console.log(response.headers);
                //console.log(response.config);
            });
        //console.log(this.state.response);
        //console.log(this.state.error);
    }

    onChange = (e, name) => {
        //console.log("---", e, name)
        this.setState({
            [name]: e
        })
    }

    createNew = (e) => {
        e.preventDefault();
        const axios = require('axios').default;
        axios({
            method: 'post',
            url: 'http://localhost:8080/visits/create',
            data: {
                "person":{
                "name": this.state.name,
                "lastName": this.state.lastName,
                "phone": this.state.phone,
                "email": this.state.email,
                "insuranceCode": this.state.insurance_code
            },

            "reason":{
                "description":this.state.description,
                "name": this.state.name2
            },

            "visit":{
                "isblocked": this.state.isblocked,
                "year": this.state.year,
                "month": this.state.month,
                "day" : this.state.day,
                "hour" : this.state.hour
            }
            },
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then(response => {
            console.log(response)
            if (response.data.errors){
                this.setState({
                    error: response.data.errors
                })
            } else {
                this.setState({
                    error: {},
                    firstName: "",
                    lastName: "",
                    age: 0,
                })
            }
        }).catch(error => {
            console.log('Error: ', error);
        });
    }

    render() {
        const DisplayError = (error) => {
            return Object.keys(error.children).map((item,index) => {
                //console.log(item, index)
                return(
                    <Alert key={index} variant="danger">
                        {error.children[item]}
                    </Alert>
                )
            })
        }

        const DisplayItems = (data) => {
            const list = data.children.map(item => <CustomItem key={item.idPerson}>{item}</CustomItem>)
            return (
                <ListGroup variant="flush">
                    {list}
                </ListGroup>
            )
        }

        const CustomItem = (data) => {
            const item = data.children;
            return       <ListGroup>
                <Col className="text-primary ms-3 p-2 fs-3"><b>Pacient č.{item.id_person}.</b></Col>

                <ListGroup.Item><b> Jméno:</b> {item.name}</ListGroup.Item>
                <ListGroup.Item><b> Příjmení:</b> {item.last_name}</ListGroup.Item>
                <ListGroup.Item><b> Kód pojištěnce:</b> {item.insurance_code}</ListGroup.Item>
                <ListGroup.Item><b> Email:</b> {item.email}</ListGroup.Item>
                <ListGroup.Item><b> Telefon:</b> {item.phone}</ListGroup.Item>
                <ListGroup.Item><b> Důvod:</b> {item.name2}</ListGroup.Item>
                <ListGroup.Item><b> Popis důvodu:</b> {item.description}</ListGroup.Item>
                <ListGroup.Item><b> Rok:</b> {item.year}</ListGroup.Item>
                <ListGroup.Item><b> Měsíc:</b> {item.month}</ListGroup.Item>
                <ListGroup.Item><b> Den:</b> {item.day}</ListGroup.Item>
                <ListGroup.Item><b> Hodina:</b> {item.hour}</ListGroup.Item>
            </ListGroup>






        };

        return (
            <Container >
                <Container className="text-center">


                    <h1 className='m-5'>Rezervujte si termín prohlídky!</h1>


                    <Button className='btn-reservation btn-primary mb-5 fs-5 p-3' href='#rezervace' variant='primary'> Rezervovat termín! </Button>




                </Container>
                <Image className='mt-5 mb-5' src={reser}></Image>

<section id="rezervace">
    <h1 className="text-primary"><b>Rezervace pacientů</b></h1>

    <Card className="mb-5">
        <Card.Body>
            <Card.Title className="text-primary fs-3">Vytvoření nové rezervace</Card.Title>
            <Form onSubmit={this.createNew}>
                <Form.Group className="mb-3" controlId="firstNameId">
                    <Form.Control
                        type="text"
                        placeholder="Vložte jméno"
                        value={this.state.name}
                        onChange={(e) => this.onChange(e.target.value, 'name')}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastNameId">
                    <Form.Control
                        type="text"
                        placeholder="Vložte příjmení"
                        value={this.state.last_name}
                        onChange={(e) => this.onChange(e.target.value, 'last_name')}
                    />
                </Form.Group>


                <Form.Group className="mb-3" controlId="reasonNameID">
                    <Form.Control
                        type="text"
                        placeholder="Název důvodu"
                        value={this.state.name2}
                        onChange={(e) => this.onChange(e.target.value, 'name2')}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="descriptionID">
                    <Form.Control
                        type="text"
                        placeholder="Popis důvodu"
                        value={this.state.description}
                        onChange={(e) => this.onChange(e.target.value, 'description')}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Rok</Form.Label>
                    <Form.Select>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        value={this.state.year}
                        onChange={(e) => this.onChange(e.target.value, 'year')}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Měsíc</Form.Label>
                    <Form.Select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        value={this.state.month}
                        onChange={(e) => this.onChange(e.target.value, 'month')}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Den</Form.Label>
                    <Form.Select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                        <option>25</option>
                        <option>26</option>
                        <option>27</option>
                        <option>28</option>
                        <option>29</option>
                        <option>30</option>
                        <option>31</option>
                        value={this.state.day}
                        onChange={(e) => this.onChange(e.target.value, 'day')}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Čas</Form.Label>
                    <Form.Select>
                        <option>8:00:00</option>
                        <option>9:00:00</option>
                        <option>10:00:00</option>
                        <option>11:00:00</option>
                        <option>12:00:00</option>
                        <option>13:00:00</option>
                        <option>14:00:00</option>
                        <option>15:00:00</option>
                        <option>16:00:00</option>
                        <option>17:00:00</option>
                        <option>18:00:00</option>
                        value={this.state.hour}
                        onChange={(e) => this.onChange(e.target.value, 'hour')}

                    </Form.Select>
                </Form.Group>





                <Button variant="primary" type="submit">Vytvořit rezervaci</Button>
            </Form>
        </Card.Body>
    </Card>

</section>


               <section id="pacienti">
                   <Card >
                       <DisplayError>{this.state.error}</DisplayError>
                       <DisplayItems>{this.state.data}</DisplayItems>
                   </Card>
               </section>



                <footer className="bg-primary text-center">Tomáš Sikora, Daniel Chlopčík SWI1 rezervační aplikace</footer>
            </Container>


        );
    }
}
export default App;