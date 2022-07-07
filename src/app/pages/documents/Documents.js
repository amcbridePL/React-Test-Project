import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAllDocuments, setFilterQuery, setProcessingDocs } from '../../Redux/reducers/documentSlice';
import './Documents.scss';
import DocumentsTable from './DocumentsTable';
import PageFilter from '../../components/PageFilter';
import PageSearch from '../../components/PageSearch';
import DocumentsService from '../../services/DocumentsService';
import ProcessedDocuments from './ProcessedDocuments';
import Modal from '../../components/Modal';

export default function Documents() {

    // Instances of a global state that will include larger objects
    const { filteredDocuments, processingDocs } = useSelector((state) => state.documents);
    const allFilters = useSelector((state) => state.documents.filters);
    const filterQuery = useSelector((state) => state.documents.filterQuery);
    const countGlobal = useSelector((state) => state.count.count);
    const dispatch = useDispatch();
    // Local state can be upheld as well, for small tasks like tracking modals 
    const [ isModalOpen, setModalOpen ] = useState(false);

    useEffect(() => {
        setDocumentsData();
        retrieveProcessingDocs();
    }, []) // runs after initial load (twice in dev strict mode)

    async function setDocumentsData(queryString='') {
        let data = await DocumentsService.getAllDocsSearch(queryString);
        dispatch(setAllDocuments(data.Results));
    }

    async function retrieveProcessingDocs() {
        let data = await DocumentsService.getProcessingDocs();
        dispatch(setProcessingDocs(data.Results))
    }

    function handleSearch(searchInfo) {
        let searchBase = '';
        let searchString = '';
        let searchMinusSpaces = searchInfo.searchText.split(' ').join('%20');
        switch (searchInfo.searchType) {
            case 'title':
                searchBase = `documents.title/`;
                searchString = `contains:${searchMinusSpaces}`;
                break;
            case 'keyword':
                searchBase = `scorable_content.english/`;
                searchString = `contains:${searchMinusSpaces}`;
                break;       
        }
        let searchQuery = `${searchBase}${searchString}%2F`;
        setDocumentsData(searchQuery);
    }

    function handleFilter(filterInfo){
        let filterBase = '';
        let filterString = '';
        let filterValue = filterInfo.value;
        switch (filterInfo.filterType) {
            case 'reviewed':
                filterBase = `documents.reviewed/`;
                filterString = filterValue == 'reviewed' ? 'is:true' : 'not:true';
                break;
            case 'fileType':
                filterBase = `mime.minor/`;
                filterString = filterValue;
                break;
            }
        let filterQuery = `${filterBase}${filterString}%2F`;
        filterQuery = (filterInfo.filterType == 'reviewed' && filterValue == 'both') ? '' : filterQuery;
        dispatch(setFilterQuery(filterQuery));
    }
            
    function executeFilters(){
        setDocumentsData(filterQuery)
    }

    function removeFilters(){
        // dispatch(setAllDocumentsData(allDocuments))
    }

    const ModalContent = () => (
        <div>
            <label className='bold-label'>Campaign<span className='error-text'>*</span></label>
            <select name='accounts_group_id' id='accounts_group_id' required>
                <option default disabled defaultValue value=''>Choose a campaign</option>
                <option value='campaign-a'>Some Campaign A</option>
                <option value='campaign-b'>Some Campaign B</option>
            </select>
            <p className='form-hint'>Campaign will be the same for all selected files.</p>

            <label className='bold-label' htmlFor='file_data'>Choose File(s) to Upload<span className='error-text'>*</span></label>

            <input type='file' id='file_data' multiple='multiple' name='file_data' accept='.pdf, .docx, .doc, .jpeg, .jpg, .png, .gif, .bmp' required/>
            <p className='form-hint'>Max size 15MB. Accepted filetypes: .pdf, .docx, .doc, .jpeg, .jpg, .png, .gif, .bmp</p>

            <div id='selected_files'>
            </div>

            <div>
                <button type='submit' className='button button--solid button--action' tabIndex='0'>
                    Upload New Files
                </button>
            </div>
        </div> 
    )

    return (
        <div className='full-page grid'>
            <div className='header grid-wrapper-12'>
                <div className='grid-7'>
                    <h1>{countGlobal}</h1>
                    <h1> Documents </h1>
                    <button onClick={() => setModalOpen(true)} className='upload-btn'> + Upload </button>
                </div>
                <PageSearch search={handleSearch}></PageSearch>
            </div>
            <div className='page-body'>
                <div className='page-filters'>
                    { allFilters.map( (filter, index ) => (
                        <PageFilter key={index} filter={handleFilter} data={filter}></PageFilter>
                    ))}
                    <div className='filter-btns'>
                        <a className='action-button apply-filter-button' role='button' title='Apply filters' tabIndex='0' onClick={executeFilters}>
                            <svg xmlns='http://www.w3.org/2000/svg' style={{ height: '17px' }} viewBox='0 0 50 50'><title>Apply filters</title><path d='M25 49.5c-6.5 0-12.7-2.5-17.3-7.2C3 37.7.5 31.5.5 25S3 12.3 7.7 7.7C12.3 3 18.5.5 25 .5S37.7 3 42.3 7.7c4.6 4.6 7.2 10.8 7.2 17.3S47 37.7 42.3 42.3 31.5 49.5 25 49.5zm0-45.2C13.6 4.3 4.3 13.6 4.3 25S13.6 45.7 25 45.7 45.7 36.4 45.7 25 36.4 4.3 25 4.3z'/><path d='M22.1 33.6c-.5 0-1-.2-1.3-.6l-7.5-7.5c-.7-.7-.7-2 0-2.7.7-.7 2-.7 2.7 0l6.2 6.2 12.1-12.1c.7-.7 2-.7 2.7 0 .4.4.6.8.6 1.3s-.2 1-.6 1.3L23.4 33.1c-.4.3-.8.5-1.3.5z'/></svg>
                        </a>
                        <a className='remove-button' role='button' href='/documents' title='Clear filters' style={{ height: 'auto'}} onClick={executeFilters}>
                            <svg style={{ height: '17px', width: '11px' }} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'><title>Clear filters</title><path d='M31.4 25.2L47.8 8.8c1.8-1.8 1.8-4.7 0-6.4s-4.7-1.8-6.4 0L24.9 18.8 8.5 2.3C6.7.5 3.8.5 2 2.3S.3 7 2 8.8l16.4 16.4L2 41.6C.2 43.4.2 46.3 2 48c1.8 1.8 4.7 1.8 6.4 0l16.4-16.4L41.2 48c1.8 1.8 4.7 1.8 6.4 0 1.8-1.8 1.8-4.7 0-6.4L31.4 25.2z'></path></svg>
                        </a>
                    </div>
                </div>
                <ProcessedDocuments failed={false} isDropdownOpen={false} documentsProcessing={processingDocs}></ProcessedDocuments>
                <ProcessedDocuments failed={true} isDropdownOpen={false} documentsFailed={processingDocs}></ProcessedDocuments>
                <DocumentsTable documents={filteredDocuments}></DocumentsTable>
            </div>
            { isModalOpen ? 
                <Modal title='Upload new Files' emitClose={() => setModalOpen(false)}>
                    <ModalContent/>
                </Modal> : null 
            }
        </div>
    )
}