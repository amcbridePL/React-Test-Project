import { createSlice } from '@reduxjs/toolkit';

export const documentSlice = createSlice({
    name: 'documents',
    initialState: {
        allDocuments: [],
        filteredDocuments: [],
        processingDocs: [],
        filterQuery: '',
        filters: [
            {
                filterName: 'Reviewed',
                class: 'reviewed-filter',
                filterOptions: [
                    { label: 'Show reviewed', value: 'reviewed'},
                    { label: 'Show unreviewed', value: 'unreviewed' },
                    { label: 'Show both', value: 'both'}
                ],
                hasCheckAlloption: false,
                isRadioButtons: true,
                isCheckboxes: false,
                isOpen: false
            },
            {
                filterName: 'Type',
                class: 'type-filter',
                filterOptions: [
                    { label: 'bmp', value: 'bmp'},
                    { label: 'jpg', value: 'jpg'},
                    { label: 'pdf', value: 'pdf'},
                    { label: 'docx', value: 'docx'},
                    { label: 'gif', value: 'gif'},
                    { label: 'gif', value: 'gif'},
                    { label: 'msword', value: 'msword'},
                    { label: 'png', value: 'png'}
                ],
                hasCheckAlloption: true, 
                isRadioButtons: false, 
                isCheckboxes: true,
                isOpen: false
            }
        ]
    },
    reducers: {
        setAllDocuments: (state, action) => {
            state.allDocuments = action.payload;
            state.filteredDocuments = action.payload;
        },
        setFilteredDocs: (state, action) => {
            state.filteredDocuments = action.payload;
        },
        setProcessingDocs: (state, action) => {
            state.processingDocs = action.payload;
            state.failedDocs = action.payload;  // Example
        },
        clearDocuments: (state) => {
            state.filteredDocuments = [];
        },
        setFilterQuery: (state, action) => {
            state.filterQuery = action.payload;
        },
    },
})

export const { setAllDocuments, clearDocuments, setFilterQuery, setProcessingDocs } = documentSlice.actions;
export default documentSlice.reducer;