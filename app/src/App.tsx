import React, { useState } from 'react';
import {
  Grid,
  Container,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { Delete, Add } from '@material-ui/icons';

interface OptionsPricesTableData {
  prices: Array<number>;
  datetime: Date;
  maxProfit: number;
}
const App = () => {
  const [prices, setPrices] = useState<Array<number | null>>([null, null]);
  const [tableData, setTableData] = useState<OptionsPricesTableData[]>([]);

  /**
   *
   * @param e
   * @param index
   *
   * handles change in value of a specific price in the array using the index
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    if (e.target.value) {
      let currentPrices = [...prices];
      currentPrices[index] = parseInt(e.target.value);
      setPrices(currentPrices);
    }
  };

  /**
   * allows user to add more input fields for prices beyond the initial 2 the page is populated with
   */
  const addPrice = () => {
    // capped at 10 for demo purposes, could handle more if needed
    if (prices.length < 10) {
      const currentPrices = [...prices];
      currentPrices.push(null);
      setPrices(currentPrices);
    }
  };

  /**
   * submits to the api the list of prices (sanitized to remove nulls)
   */
  const submit = () => {
    const validPrices: number[] = prices.filter(
      (price) => price !== null,
    ) as number[];
    fetch('http://localhost:5000/profit', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        prices: validPrices,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const currentTableData = [...tableData];
        currentTableData.push({
          prices: validPrices,
          maxProfit: data,
          datetime: new Date(),
        });
        setTableData(currentTableData);
      });
  };

  return (
    <div className='App'>
      <Container>
        <Grid container direction='column' alignItems='flex-start'>
          <Grid item container direction='column'>
            {prices.map((price, i) => {
              return (
                <Grid item container alignItems='center' key={i}>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      label='Price'
                      value={price || ''}
                      onChange={(e) => handleChange(e, i)}
                    ></TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <Delete />
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <Add onClick={addPrice} />
          <Button onClick={submit}>Submit</Button>
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prices</TableCell>
              <TableCell>Maximum Profit</TableCell>
              <TableCell>DateTime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((tableDatum, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{`[${tableDatum.prices}]`}</TableCell>
                  <TableCell>{tableDatum.maxProfit}</TableCell>
                  <TableCell>{tableDatum.datetime.toString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
};

export default App;
