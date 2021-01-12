import { Button as MuiButton } from "@material-ui/core";
import "./Button.css";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "300px",
      border: "1px solid #c4c4c4",
    },

    selected: {
      border: "1px solid black",
    },
  })
);

const Button = ({ description, selected, children, IHM, variant, ...rest }) => {
  const classes = useStyles();
  return (
    <div>
      <MuiButton
        variant={variant}
        className={
          selected && IHM ? clsx(classes.root, classes.selected) : classes.root
        }
        {...rest}
      >
        {children}
      </MuiButton>
    </div>
  );
};

export default Button;
