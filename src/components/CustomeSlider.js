import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

const CustomeSlider = ({
  id,
  name,
  value,
  onChange,
  min,
  max,
  step,
  children,
  icon,
}) => {
  return (
    <div>
      <div>
        <Typography id="input-slider" gutterBottom>
          {children}
        </Typography>
        <Grid container spacing={2}>
          <Grid item>{icon}</Grid>
          <Grid xs item>
            <Slider
              id="volume"
              name="volume"
              value={value}
              onChange={onChange}
              aria-labelledby="continuous-slider"
              min={min}
              max={max}
              step={step}
              valueLabelDisplay="auto"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default CustomeSlider;
