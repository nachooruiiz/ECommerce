export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const SHOW_ALL_PRODUCTS = `${API_BASE_URL}/api/products`

const SEARCH_PRODUCTS = `${API_BASE_URL}/api/SmartSearch`

const LOGIN = `${API_BASE_URL}/api/Auth/login`

const REGISTER = `${API_BASE_URL}/api/Auth/register`

const SYNC_CART = `${API_BASE_URL}/api/Cart/SyncCart`

const SHOW_ONE_PRODUCT = `${API_BASE_URL}/api/Product/mostrarproduct`

const SHOW_CART = `${API_BASE_URL}/api/Cart`

const ADD_ITEM_CART = `${API_BASE_URL}/api/Cart/AddItem`

const UPDATE_ITEM_CART = `${API_BASE_URL}/api/Cart/UpdateItem`

const REMOVE_ITEM_CART = `${API_BASE_URL}/api/Cart/RemoveItem/`

const CLEAR_CART = `${API_BASE_URL}/api/Cart/ClearCart`

const CREATE_ORDER = `${API_BASE_URL}/api/Order/AddOrder`

const SHOW_USER_PROFILE = `${API_BASE_URL}/api/Users` 

const CHANGE_USER_INFO = `${API_BASE_URL}/api/Users/UpdateData`

const CHANGE_USER_ROL = `${API_BASE_URL}/api/Users/ChangeRole/`

const DELETE_USER = `${API_BASE_URL}/api/Users/DeleteUser`

const CREATE_PRODUCT = `${API_BASE_URL}/api/Product/registroproduct`

const UPDATE_PRODUCT = `${API_BASE_URL}/api/Product/UpdateProduct/`

const SHOW_CURRENT_USER = `${API_BASE_URL}/api/Users/GetCurrentUser`;

const UPDATE_USER_INFO = `${API_BASE_URL}/api/Users/UpdateUser`;  

const CHANGE_ROLE = `${API_BASE_URL}/api/Users/ChangeRole/`;

const GET_USER_ORDERS = `${API_BASE_URL}/api/Order`

export {
    SHOW_ALL_PRODUCTS, 
    SEARCH_PRODUCTS, 
    LOGIN, 
    SYNC_CART, 
    SHOW_ONE_PRODUCT, 
    SHOW_CART, 
    ADD_ITEM_CART, 
    UPDATE_ITEM_CART, 
    REMOVE_ITEM_CART,
    CLEAR_CART,
    CREATE_ORDER,
    REGISTER,
    SHOW_USER_PROFILE,
    CHANGE_USER_INFO,
    CHANGE_USER_ROL,
    DELETE_USER,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    SHOW_CURRENT_USER,
    UPDATE_USER_INFO,
    CHANGE_ROLE,
    GET_USER_ORDERS
}