import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { OptionsPricesTableData } from '../models/OptionsPricesTableData';
import { makeStyles } from '@material-ui/styles';

interface IOptionsPricesTableProps {
  tableData: OptionsPricesTableData[];
}

const useStyles = makeStyles({
  highlightedRow: {
    backgroundColor: '#FFFF66',
  },
});

/**
 *
 * @param tableData
 * receives tableData and displays to user
 */
export const OptionsPricesTable: React.FC<IOptionsPricesTableProps> = ({
  tableData,
}) => {
  const [highestProfit, setHighestProfit] = useState(0);
  const [sortedData, setSortedData] = useState<OptionsPricesTableData[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('desc');

  useEffect(() => {
    calculateHighestProfit();
    setSortedData(tableData);
  }, [tableData]);

  const classes = useStyles();

  const calculateHighestProfit = () => {
    let highestProfit = 0;
    tableData.forEach((datum) => {
      if (datum.maxProfit > highestProfit) {
        highestProfit = datum.maxProfit;
      }
    });
    setHighestProfit(highestProfit);
  };

  const sort = (field: string) => {
    // sort data by field provided
    // currently hardcoded, future forward would want to allow it to match all eligible fields
    let tempSortedData = [...sortedData];
    if (field === 'maxProfit') {
      tempSortedData.sort((a, b) =>
        sortOrder === 'desc'
          ? a.maxProfit - b.maxProfit
          : b.maxProfit - a.maxProfit,
      );
    } else if (field === 'datetime') {
      tempSortedData.sort((a, b) =>
        sortOrder === 'desc'
          ? new Date(a.datetime).valueOf() - new Date(b.datetime).valueOf()
          : new Date(b.datetime).valueOf() - new Date(a.datetime).valueOf(),
      );
    }

    setSortedData(tempSortedData);
    // flip sort order after assigning updated data
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Prices</TableCell>
          <TableCell onClick={() => sort('maxProfit')}>
            Maximum Profit
          </TableCell>
          <TableCell onClick={() => sort('datetime')}>DateTime</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedData.map((tableDatum, i) => {
          return (
            <TableRow
              key={i}
              className={
                tableDatum.maxProfit === highestProfit
                  ? classes.highlightedRow
                  : ''
              }
            >
              <TableCell>{`[${tableDatum.prices}]`}</TableCell>
              <TableCell>{tableDatum.maxProfit}</TableCell>
              <TableCell>{tableDatum.datetime.toString()}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
