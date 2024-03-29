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
  const [is_superuser, setis_superuser] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [usernameError, setusernameError] = useState(false);

  const handleInputChange = (event) => {
    if(passwordError){
      setpasswordError(false)
    }
    if(usernameError){
      setusernameError(false)
    }
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
      fetch("https://ttestt.shop/cars/api/parks/login", {
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
          if(data.detail == "Invalid username")
          {
            setusernameError(true)
          }
          else{
            console.log("Authentication failed message") 
            setpasswordError(true)
          } 
          if (bcrypt.compareSync(state.password, data.hashed_password)){
            setUserId(data.id)
            localStorage.setItem('isSuperuser', data.is_superuser);
            setis_superuser(data.is_superuser)
            Add_session(data.id);  
          }
         
      })
      .catch(error => {console.error("Error fetching data:", error);}) 
  };
  const [cookies, setCookie] = useCookies(["session_id"])


  const expiration = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); 


  function Add_session(id)
  {

    const userData = {
      id: id,
      is_superuser : is_superuser
    };
    console.log("userData")
    console.log(userData)
    fetch("https://ttestt.shop/cars/api/parks/sessions/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
          console.log("seession id")
          setCookie('session_id', data, { path: '/', expires: expiration }); 
          console.log("123")
          localStorage.setItem('isAuthenticated', true);

          navigate("/dashboard");
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
                          className={`form-control ${
                            usernameError ? 'invalid' : ''
                          }`}                          
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
                            passwordError ? 'invalid' : ''
                          }`}
                          id="floatingPassword"
                          name="password"
                          placeholder="Password"
                          value={state.password || ''}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingPassword">Password</label>
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
