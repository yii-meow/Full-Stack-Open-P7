import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fillForm } from "../reducers/userReducer";
import { Button, TextField } from "@mui/material";
const LoginForm = ({ handleSubmit }) => {
  const user = useSelector(({ users }) => {
    return users;
  });

  const dispatch = useDispatch();

  return (
    <div>
      <h2>Login to Application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Username"
            variant="standard"
            id="username"
            value={user.username}
            onChange={(e) => dispatch(fillForm(e.target.value))}
          />
        </div>
        <div>
          <TextField
            label="Password"
            variant="standard"
            id="password"
            value={user.password}
            onChange={(e) => dispatch(fillForm(e.target.value))}
            type="password"
          />
        </div>
        <Button variant="contained" id="login-button" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

LoginForm.protoTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
