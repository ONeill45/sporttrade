import React, { useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';

interface IAddOptionsPricesProps {
  updateTableData(validPrices: number[], profit: number): void;
}

export const AddOptionsPrices: React.FC<IAddOptionsPricesProps> = ({
  updateTableData,
}) => {
  const [pricesString, setPricesString] = useState<string>('');

  /**
   *
   * @param e
   * @param index
   *
   *store prices as a string and update on change
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPricesString(e.target.value);
  };

  /**
   * submits to the api the list of prices
   */
  const submit = () => {
    // on submit, transform string into array of prices
    const prices = pricesString
      .replace('[', '')
      .replace(']', '')
      .split(',')
      .map((price) => parseInt(price));
    fetch('http://localhost:5000/profit', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        prices: prices,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        updateTableData(prices, data);
      });
  };

  return (
    <Grid container direction='column' alignItems='flex-start'>
      <Grid item container direction='column'>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label='Prices'
            value={pricesString}
            onChange={handleChange}
          ></TextField>
        </Grid>
      </Grid>
      <Button onClick={submit}>Submit</Button>
    </Grid>
  );
};
