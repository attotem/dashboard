import React, {useEffect,useState} from 'react';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import {useCookies } from 'react-cookie'


const defaultState = {
  name: null,
  park_name: null,
  password: null,
  nameError: null,
  park_nameError: null,
  passwordError: null,
};

function CustomFormValidation() {
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    ...defaultState,
  });
  
  const [UserId, setUserId] = useState(0);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value,
    });
  };

 
    const submit = () => {
      
      console.log(state.park_name)
      fetch("https://ttestt.shop/cars/api/login", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: 'include', 
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            park_name: state.park_name, 
          })
      })
      .then(response => response.json())
      .then(data => {

          console.log(data)
          if (bcrypt.compareSync(state.password, data.hashed_password)){
            console.log(data.id)
            setUserId(data.id)
            localStorage.setItem('isSuperuser', data.is_superuser);
            Add_session(data.id);  
          }
          else{
              console.log("Authentication failed message") 
          }
      })
      .catch(error => {console.error("Error fetching data:", error);}) 
  };
  const [cookies, setCookie] = useCookies(["session_id"])


  const expiration = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); 
  const storedIsSuperuser = localStorage.getItem('isSuperuser');

  function Add_session(id)
  {

    const userData = {
      id: id,
      is_superuser : storedIsSuperuser
    };
    console.log("userData")
    console.log(userData)
    fetch("https://ttestt.shop/cars/api/add_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        
          setCookie('session_id', data, { path: '/', expires: expiration }); 

          navigate("/dashboard")
      })
      .catch(error => {
          console.error("Error fetching data:", error);
      });
  }
   
  

  return (
    <div className="App">
      <div className="container-fluid ps-md-0">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Welcome back!</h3>
                    <form>
                      <div className="form-floating mb-3">
                        <input
                          type="park_name"
                          className={`form-control`}
                          id="floatingInput"
                          name="park_name"
                          placeholder="name@example.com"
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingInput">Park name</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className={`form-control ${
                            state.passwordError ? 'invalid' : ''
                          }`}
                          id="floatingPassword"
                          name="password"
                          placeholder="Password"
                          value={state.password || ''}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                        <span className="text-danger">{state.passwordError}</span>
                      </div>
                      

                      <div className="d-grid">
                        <button
                          className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                          type="button"
                          onClick={submit}
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomFormValidation;
