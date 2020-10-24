export const apiUrl = 'http://localhost:3001';


export const getEmpresas = async () => {
    const _url = apiUrl+'/empresas';
    var dados = [];
    await fetch(_url)
        .then((response) => response.json())
        .then((data) => { console.log('This is your data', data); dados = data });
    return dados;
}

export const postEmpresa = async (model) => {
    const _url = apiUrl+'/empresas';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };
    var dados = [];
    await fetch(_url, requestOptions)
        .then((response) => response.json())
        .then((data) => { console.log('This is your data', data); dados = data });
    return dados;
}

export const putEmpresa = async (model) => {
    const _url = apiUrl+'/empresas/'+model.id;
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };
    var dados = [];
    await fetch(_url, requestOptions)
        .then((response) => response.json())
        .then((data) => { console.log('This is your data', data); dados = data });
    return dados;
}

export const deleteEmpresa = async (id) => {
    const _url = apiUrl+'/empresas/'+id;
    const requestOptions = {
        method: 'DELETE'
    };
    var dados = [];
    await fetch(_url, requestOptions)
        .then((response) => response.json())
        .then((data) => { console.log('This is your data', data); dados = data });
    return dados;
}