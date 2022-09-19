import axios from 'axios';

const Postdata = (data) =>{
    const res = axios.post("http://172.17.0.1:8000/check_permission/", data)
    return res
    }

const PostProjectdata = async(data) =>{
    return await axios.post("http://172.17.0.1:8000/create_project_api/", data);
    
}

const GetProjectdata = async(data) =>{
    return await axios.post("http://172.17.0.1:8000/read_project_api/", data);
    
}

const GetProjectdataById = async(data) =>{
    return await axios.post("http://172.17.0.1:8000/read_single_project_api/", data);
    
}

const UDProjectdataById = async(data) =>{
    return await axios.post("http://172.17.0.1:8000/update_project_api/", data);
    
}

const Deletedata = (url) =>{
    let response;
    response = axios.delete(url);
    return response;
}

export { Postdata, UDProjectdataById, GetProjectdataById, PostProjectdata, Deletedata, GetProjectdata};