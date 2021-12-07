import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { OptionsPricesTableData } from '../models/OptionsPricesTableData';

interface IOptionsPricesTableProps {
  tableData: OptionsPricesTableData[];
}

export const OptionsPricesTable: React.FC<IOptionsPricesTableProps> = ({
  tableData,
}) => {
  return (
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
  );
};
