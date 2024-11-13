interface PrimeNgTableColumn {
  name: string;                      // Column name (displayed header)
  field: string;                     // Field in the data (used for sorting/filtering)
  sortOrder: 'asc' | 'desc' | null;   // Sort order ('asc', 'desc', or null)
  sortField: string | null;           // The field to be sorted (optional)
  filterMatchMode: string;            // Match mode for filter (e.g., 'contains', 'startsWith')
  filterValue: any;                  // Filter value
  filterType: 'text' | 'numeric' | 'date'; // Filter type (text, numeric, date)
  filterMultiple: boolean;           // Whether the filter can accept multiple values
  sortable: boolean;                 // Whether the column is sortable
}

