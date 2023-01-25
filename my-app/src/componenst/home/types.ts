/* створюю інтерфейс продукта*/
export interface IProductItem {
    id: number;
    name: string;
    detail: string;

}

export interface IProductResponse {
    data: Array<IProductItem>,
    current_page: number,
    total: number,
    last_page: number
}

export interface IProductState {
    list: Array<IProductItem>,
    current_page: number,
    total: number,
    count_page: number
}

//Action - це простий JS  об'єкт, який представляє корисне навантаження,
//що відправляє дані з програми в store. Action приймає тип і опціонально корисне навантаження (type та payload).
export enum ProductActionTypes {

    //назва дії
    GET_PRODUCTS = "GET_PRODUCTS_ACTION" 
}

//Дія для оновлення списку товарів в Редаксі
export interface GetProductAction {   
    type: ProductActionTypes.GET_PRODUCTS,
    payload: IProductState
}

//Список дії, які можна виконати над продуктами
export type ProdutActions = | GetProductAction