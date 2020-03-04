import React from 'react'

export type SortIconType = 'asce' | 'desc' | null

export interface TableSortIconProps {
  status: SortIconType
}

const TableSortIcon: React.FC<TableSortIconProps> = ({ status }) => {
  return (
    <div className="table-sort-icon">
      <span
        className={`table-sort-up ${
          status === 'asce' ? ' table-sort-active' : ''
        }`}
      />
      <span
        className={`table-sort-down${
          status === 'desc' ? ' table-sort-active' : ''
        }`}
      />
    </div>
  )
}

export default TableSortIcon
