import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <span>
      <span style={hideWhenVisible}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          endIcon={<AddIcon />}
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </span>

      <span class="m-5" style={showWhenVisible} className="togglableContent">
        {props.buttonLabel === "view" ? (
          <span>
            <button onClick={toggleVisibility}>hide</button>
            {props.children}
          </span>
        ) : (
          <div>
            {props.children}
            <Button
              variant="contained"
              color="error"
              onClick={toggleVisibility}
              sx={{ mt: 3 }}
            >
              cancel
            </Button>
          </div>
        )}
      </span>
    </span>
  );
};

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
