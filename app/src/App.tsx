import { useState } from 'react';
import { Container } from '@material-ui/core';

import { OptionsPricesTableData } from './models/OptionsPricesTableData';
import { OptionsPricesTable } from './Components/OptionsPricesTable';
import { AddOptionsPrices } from './Components/AddOptionsPrices';

const App = () => {
  const [tableData, setTableData] = useState<OptionsPricesTableData[]>([]);

  const updateTableData = (validPrices: number[], profit: number) => {
    const currentTableData = [...tableData];
    currentTableData.push({
      prices: validPrices,
      maxProfit: profit,
      datetime: new Date(),
    });
    setTableData(currentTableData);
  };

  return (
    <div className='App'>
      <Container>
        <AddOptionsPrices updateTableData={updateTableData} />
        <OptionsPricesTable tableData={tableData} />
      </Container>
    </div>
  );
};

export default App;
