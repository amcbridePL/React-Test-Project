const DocumentsService = {

  async documentDetails(documentId){
    return fetch(`http://localhost:3050/documents/details/${documentId}`)
    .then(res => res.json())
    .then(data => {
      return data;
    })
  },
  
  async getAllDocsSearch(filterString='') {
    return fetch(`http://localhost:3050/search/general`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filter: filterString})
    })
    .then(res => res.json())
    .then(data => {
      return data;
    })
  },
  
  async getProcessingDocs() {
    return fetch('http://localhost:3050/processing')
    .then(res => res.json())
    .then(data => {
      return data})
  },

}
export default DocumentsService;