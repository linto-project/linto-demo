import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import "./CustomSlider.css";

const CustomSelect = ({
  // id,
  // name,
  onChange,
  value,
  icon,
  children,
  title,
  disabled,
  // seuilLocuteurActif,
}) => {
  return (
    <Box width="100%" display="inline-flex" flexDirection="column">
      <Typography id="input-slider" gutterBottom>
        {title}
      </Typography>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item>{icon}</Grid>
        <Grid xs item>
          <NativeSelect value={value} disabled={disabled} onChange={onChange}>
            {children}
          </NativeSelect>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CustomSelect;
