import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'

const BackupTableList = ({}) => {

  return (
    <DataTable
    subHeader={true}

    pagination
    fixedHead
    keyField
    dense
	highlightOnHover
    pointerOnHover
    selectableRows={true}
    selectableRowsHighlight={true}
    paginationPerPage={10}/>
  )
}

export default BackupTableList