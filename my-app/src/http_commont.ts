import axios from "axios";
//підключаю axios
const http = axios.create({

    //вибираю url сервера з якого витягуються дані 
    baseURL:"http://laravel.spu013.com",
    headers:{
        "Content-type":"application/json" /* дані витягую в app json*/
    }
});
export default http;