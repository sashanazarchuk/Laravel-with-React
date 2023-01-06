import { useEffect, useState } from "react"; 
import http from "../../http_commont";
import { IProductItem } from "./types";

const HomePage = () => {
    //оголошую змінну list і setlist в хуці useState
    const [list, setlist] = useState<Array<IProductItem>>([]); 

    useEffect(() => {
        http.get<Array<IProductItem>>("api/products")//беру дані по api
            .then((resp) => {
                console.log("List product server", resp); //виводжу дані в консолі
                setlist(resp.data); //записую дані в setlist
            });
    }, []);


    function Update() {
        http.get<Array<IProductItem>>("api/products")
            .then((resp) => {
                console.log("List product server", resp);
                setlist(resp.data);
            });
    }
    const Delete = (id: number) => {
        http.delete("api/delete/" + id)
            .then((resp) => {
                console.log("List product server", resp.data);
                Update();
            });
    };


    const data = list.map(product => ( //перебираю елементи lista через map
        <tr key={product.id}> 
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.detail}</td>
            <td className="align-middle"><button onClick={() => Delete(product.id)} className="btn btn-danger d-block m-auto" value={product.id}>Видалити</button></td>

        </tr>
    ));

    return (
        <>
            <h1 className="text-center">Головна сторінка</h1>
             {/* виводжу продукти в таблиці через {data} */}
            <table className="table"> 
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>{data}</tbody>
            </table>
        </>
    );

};
export default HomePage;