
import axios from 'axios';


export default axios.create({
    baseURL: "https://app-finanza-4611cd32c034.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});