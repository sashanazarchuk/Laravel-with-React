import { useEffect, useState } from "react"; 
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import http from "../../http_commont";
import { GetProductAction, IProductItem, IProductResponse, IProductState, ProductActionTypes } from "./types";

const HomePage = () => {
    const location = useLocation();
    let link = "";
    let items = 0;
    if (location.state != null)
        {
            let lnk = location.state;
            items = lnk.slice(-1);
        }
    else
        items = 1;
    const [query, setQuery] = useState(items);
    const [items_count, setItems_count] = useState(query);
    if (location.state != null)
        link = location.state;
    else
        link = "?page=1"

    let items_string = "";
    if (query != null)
        items_string = "&items=" + items_count.toString();
    console.log(link, "link");


    //оголошую змінну list і setlist в хуці useState
    const { list, total, count_page } = useSelector((state: any) => state.product as IProductState);
    const dispatch = useDispatch(); //посилає запити на систему
    useEffect(() => {
        http.get<IProductResponse>("/api/products" + link).then((resp) => {
            console.log("List product server", resp);
            const { data } = resp;

            const payload: IProductState = {
                list: data.data,
                count_page: data.last_page,
                current_page: data.current_page,
                total: data.total
            };

            const action: GetProductAction = {
                type: ProductActionTypes.GET_PRODUCTS,
                payload: payload
            };

            dispatch(action);
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

    function Search() {
        const input = document.getElementById("search_name") as HTMLInputElement | null;
        const name = input?.value;
        link += "&name=" + name;
        http.get<IProductResponse>("/api/products" + link).then((resp) => {
            console.log("List product server", resp);
            const { data } = resp;

            const payload: IProductState = {
                list: data.data,
                count_page: data.last_page,
                current_page: data.current_page,
                total: data.total
            };

            const action: GetProductAction = {
                type: ProductActionTypes.GET_PRODUCTS,
                payload: payload
            };
            dispatch(action);
        });

    }
    function applyItems() {
        const input = document.getElementById("items_count") as HTMLInputElement | null;
        let count = input?.value!;
        setItems_count(parseInt(count));
        items_string = "&items=" + count.toString();
    }
    function refreshPage() {
        setTimeout(() => {
            window.location.reload();
        }, 100);
        console.log('page to reload')
    }


    const data = list.map(product => ( //перебираю елементи lista через map
        <tr key={product.id}> 
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.detail}</td>
            <td className="align-middle"><button onClick={() => Delete(product.id)} className="btn btn-danger d-block m-auto" value={product.id}>Видалити</button></td>

        </tr>
    ));

    const buttons: Array<number> = [];
    for (let i = 1; i <= count_page; i++) {
        buttons.push(i);
    }

    const pagination = buttons.map(page => {
        return (
            <li key={page} className="page-item">
                <Link to={"?page=" + page + "&items=" + query} state={"?page=" + page + "&items=" + query} onClick={refreshPage} className="page-link">{page}</Link>
            </li>
        );
    });

    return (
        <>
            <h1 className="text-center">Головна сторінка</h1>
             {/* виводжу продукти в таблиці через {data} */}

             <h4>Всього записів <strong>{total}</strong></h4>
            <div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label className="col-form-label">Name</label>
                </div>
                <div className="col-auto">
                    <input id="search_name" type="text" className="form-control" />
                </div>
                <div className="col-auto">
                    <button type="button" onClick={Search} className="btn btn-primary">Search</button>
                </div>
            </div>

            <div className="row g-3 align-items-center mt-2">
                <div className="col-auto">
                    <label className="col-form-label">Items on page</label>
                </div>
                <div className="col-auto">
                    <input id="items_count" type="number" onChange={(e) => setQuery(parseInt(e.target.value))} className="form-control" />
                </div>
                <div className="col-auto">
                    <Link to={"?page=1" + "&items=" + query} state={"?page=1" + "&items=" + query} onClick={refreshPage} className="page-link">
                        <button type="button" className="btn btn-primary" onClick={applyItems}>Apply</button>
                    </Link>

                </div>
            </div>

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
            <nav>
                <ul className="pagination">
                    {pagination}
                </ul>
            </nav>
        </>
    );

};
export default HomePage;

function setlist(data: IProductItem[]) {
    throw new Error("Function not implemented.");
}
