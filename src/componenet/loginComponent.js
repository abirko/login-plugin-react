import { withRouter} from 'react-router-dom';
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { loginCredUser } from "../redux/actions/loginActions";
import { useHistory } from "react-router-dom";

const LoginRegister = ({loginUser}) => {

  let history = useHistory();
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });

  const onUserLogin = () => {
    const baseUrl = 'http://127.0.0.1:8000/';
    console.log("login")
    if(userLogin.email!== "" && userLogin.password!==""){
      console.log("login")
      loginUser(userLogin, history, baseUrl)
      console.log("finished")
    }
  }

  return (
    <div>
      <div>
        <Container>
          <Row>
            <Col lg={6}>
              <div>
                <form>
                  <Row>
                    <Col lg={12}>
                      <input
                        defaultValue={userLogin.email}
                        onChange={(event) => setUserLogin({ ...userLogin, email: event.target.value })}
                        type="text"
                        placeholder="Email address"
                        required
                      />
                    </Col>
                    <Col lg={12}>
                      <input
                        defaultValue={userLogin.password}
                        onChange={(event) => setUserLogin({ ...userLogin, password: event.target.value })}
                        type="password"
                        placeholder="Password"
                        required
                      />
                    </Col>
                    <Col lg={12}>
                      <button onClick={onUserLogin}>
                        login
                      </button>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user, history, baseUrl) => {
        dispatch(loginCredUser(user, history, baseUrl));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginRegister));
