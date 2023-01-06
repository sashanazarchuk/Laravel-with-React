import { useState } from "react";
import { Link } from "react-router-dom";
import http from "../../http_commont";
import { IProductItem } from "./types";


const AddProduct = () => {

    const [list, setList] = useState<Array<IProductItem>>([]);

    function Update() {
        http.get<Array<IProductItem>>("api/products")
            .then((resp) => {
                console.log("List product server", resp);
                setList(resp.data);
            });
    }

    const Add = () => {
        const input_name = document.getElementById("name") as HTMLInputElement | null;
        const name = input_name?.value;
        const input_desc = document.getElementById("description") as HTMLInputElement | null;
        const description = input_desc?.value;
        console.log(name);
        console.log(description);
        const link = "/api/add/" + name + "/" + description;
        http.post(link)
            .then((resp) => {
                console.log("List product server", resp.data);
                Update();
            });
    };


    return (
        <>
            <div className="add-container">
                <div className="mb-3">
                    <label className="form-label">Назва</label>
                    <input type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Опис</label>
                    <input type="text" className="form-control" id="description" />
                </div>
                <Link onClick={() => Add()} to="/" className="btn btn-primary">Додати</Link>
            </div>
        </>
    );
}
export default AddProduct;