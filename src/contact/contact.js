import { useState } from 'react';
import {Form, InputGroup, Row, Col, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
export default function Contact()
{
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const [data, setData] = useState({email: '', password: ''});
    const handleChange = (e) => {
        e.preventDefault();
        const enteredUsername = usernameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const database = {
            username: enteredUsername,
            password: enteredPassword
        };
        setData(database);
      };
      function handleSubmit(e) {
        e.preventDefault();
        console.log(data)
            fetch('http://localhost:3001/auth/login',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body: JSON.stringify(data)
            }).then(async (data) => {
                const token = await data.json();
                console.log("token", token);
                // navigateToHome('/');
            })
            .catch(e => console.log(e))

                // localStorage.setItem('token', dataRes.token);
            }



        

    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                <Form.Control
                    name="email"
                    type='text'
                    ref={usernameInputRef}
                    // value={data.email}
                    onChange={handleChange}
                    placeholder="email"
                    autoComplete='username'
                    aria-label="email"
                    aria-describedby="basic-addon1"
                />
                <Form.Control
                    name="password"
                    type='password'
                    ref={passwordInputRef}
                    // value={data.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    placeholder="password"
                    aria-label="password"
                    aria-describedby="basic-addon1"
                />
                </InputGroup>
                <Row>
                <Col xs="auto">
                    <Button type="submit">Submit</Button>
                </Col>
                </Row>
            </Form>
        </div>
        
    );
}