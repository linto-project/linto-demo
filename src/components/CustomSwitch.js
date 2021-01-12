import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import "./CustomSlider.css";

const CustomeSlider = ({
  id,
  name,
  onChange,
  checked,
  children,
  icon,
  disabled,
  seuilLocuteurActif,
}) => {
  return (
    <Box width="100%" display="inline-flex" flexDirection="column">
      <Typography id="input-slider" gutterBottom>
        {children}
      </Typography>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item>{icon}</Grid>
        <Grid xs item>
          <Switch
            disabled={disabled}
            id={id}
            value={seuilLocuteurActif}
            name={name}
            checked={checked}
            onChange={(e) => onChange(e)}
            aria-labelledby="switch"
            color="primary"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default CustomeSlider;
