import { useMemo, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import styles from './InventoryTable.module.css'

const bodyTypeOptions = ['All', 'Electric', 'Acoustic', 'Bass', 'Classical']

function InventoryTable({ guitars, selectedGuitarId, onSelectGuitar }) {
  const [bodyTypeFilter, setBodyTypeFilter] = useState('All')
  const [lowStockOnly, setLowStockOnly] = useState(false)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 4 })

  const filteredGuitars = useMemo(() => {
    let next = guitars

    if (bodyTypeFilter !== 'All') {
      next = next.filter((guitar) => guitar.bodyType === bodyTypeFilter)
    }

    if (lowStockOnly) {
      next = next.filter((guitar) => guitar.stockQuantity <= 10)
    }

    return next
  }, [bodyTypeFilter, guitars, lowStockOnly])

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredGuitars,
    getRowId: (row) => row.id,
    columns: [
      {
        accessorKey: 'guitarModel',
        header: 'Guitar Model',
      },
      {
        accessorKey: 'bodyType',
        header: 'Body Type',
      },
      {
        accessorKey: 'brandName',
        header: 'Brand',
      },
      {
        accessorKey: 'stockQuantity',
        header: 'Stock',
      },
      {
        accessorKey: 'manufacturerName',
        header: 'Manufacturer',
      },
      {
        accessorKey: 'userRole',
        header: 'Role',
        cell: ({ getValue }) => <span className={styles.roleBadge}>{String(getValue())}</span>,
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  })

  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex
  const countLabel = filteredGuitars.length

  const handleBodyTypeChange = (event) => {
    setBodyTypeFilter(event.target.value)
    setPagination((current) => ({ ...current, pageIndex: 0 }))
  }

  const handleLowStockToggle = () => {
    setLowStockOnly((current) => !current)
    setPagination((current) => ({ ...current, pageIndex: 0 }))
  }

  const handleResetFilters = () => {
    setBodyTypeFilter('All')
    setLowStockOnly(false)
    setPagination((current) => ({ ...current, pageIndex: 0 }))
  }

  const handleRowKeyDown = (event, row) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (onSelectGuitar) {
        onSelectGuitar(row.original.id)
      }
    }
  }

  return (
    <section className={styles.tableSection} aria-label="Inventory registry table">
      <div className={styles.filterBar}>
        <label className={styles.filterField}>
          <span>Body Type</span>
          <select value={bodyTypeFilter} onChange={handleBodyTypeChange}>
            {bodyTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.checkboxField}>
          <input type="checkbox" checked={lowStockOnly} onChange={handleLowStockToggle} />
          <span>Low Stock Only</span>
        </label>

        <button type="button" className={styles.resetButton} onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>

      {filteredGuitars.length === 0 ? (
        <div className={styles.emptyState}>No guitars match the current filters.</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                const isSelected = row.original.id === selectedGuitarId

                return (
                  <tr
                    key={row.id}
                    className={isSelected ? styles.selectedRow : ''}
                    onClick={() => onSelectGuitar?.(row.original.id)}
                    onKeyDown={(event) => handleRowKeyDown(event, row)}
                    tabIndex={0}
                    aria-selected={isSelected}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.paginationBar}>
        <button
          type="button"
          className={styles.pageButton}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>

        <span className={styles.pageMeta}>
          Page {currentPage + 1} of {pageCount || 1}
        </span>

        <span className={styles.resultMeta}>
          Showing {filteredGuitars.length === 0 ? 0 : currentPage * pagination.pageSize + 1}-{Math.min((currentPage + 1) * pagination.pageSize, filteredGuitars.length)} of {countLabel} records
        </span>

        <button
          type="button"
          className={styles.pageButton}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default InventoryTable
