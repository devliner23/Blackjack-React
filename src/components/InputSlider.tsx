import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';

const Input = styled(MuiInput)`
  width: 42px;
`;

interface InputSliderProps {
  value: number;
  setValue: (value: number) => void;
  max: number;
}

export default function InputSlider({ value, setValue, max }: InputSliderProps) {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > max) {
      setValue(max);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            sx={{
              color: 'primary.main',
              '& .MuiSlider-thumb': {
                backgroundColor: '#FF5733',
              },
              '& .MuiSlider-track': {
                backgroundColor: '#FF5733', 
              },
              '& .MuiSlider-rail': {
                opacity: 0.5,
                backgroundColor: '#FF5733', 
              },
            }}
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={max}
          />
        </Grid>
        <Grid item>
          <Input
            sx={{
              input: {
                color: '#00BFFF', 
              },
            }}
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              min: 0,
              max: max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );}
