import { IRangeObject } from "../../utils/types";

export enum GridCell {
  operator = "operator",
  empty = "empty",
  active = "active",
}

export interface ICalculatedRange {
  rows: number;
  cols: number;
  grid: GridCell[][];
}

const calculateRange = (rangeData: IRangeObject): ICalculatedRange => {
  const rangeGrids = [...rangeData.grids, { row: 0, col: 0 }];
  const rowIndices = rangeGrids.map((i) => i.row);
  const colIndices = rangeGrids.map((i) => i.col);
  const minRowIndex = Math.min(...rowIndices);
  const maxRowIndex = Math.max(...rowIndices);
  const minColIndex = Math.min(...colIndices);
  const maxColIndex = Math.max(...colIndices);

  const rows = maxRowIndex - minRowIndex + 1;
  const cols = maxColIndex - minColIndex + 1;
  const grid = Array<GridCell>(rows)
    .fill(GridCell.empty)
    .map(() => Array<GridCell>(cols).fill(GridCell.empty));

  for (const cell of rangeGrids) {
    const type =
      cell.row === 0 && cell.col === 0 ? GridCell.operator : GridCell.active;
    grid[cell.row - minRowIndex][cell.col - minColIndex] = type;
  }

  return { rows, cols, grid };
};

export interface IProps {
  range: IRangeObject;
}

const OperatorRange = ({ range: rangeData }: IProps) => {
  const { rows, cols, grid } = calculateRange(rangeData);

  return (
    <div className="relative flex h-[210px] w-full items-center justify-center rounded-md bg-slate-700">
      <table className="table flex-shrink-0 border-separate border-spacing-1">
        <tbody>
          {[...Array(rows).keys()].map((rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(cols).keys()].map((colIndex) => (
                <td
                  key={colIndex}
                  className={`box-border h-6 w-6 range-cell-${grid[rowIndex][colIndex]}`}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OperatorRange;
