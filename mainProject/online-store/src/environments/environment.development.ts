const userId = JSON.parse(localStorage.getItem('user') || '').id;

export const environment = {
    basUrl: 'http://localhost:1337/',
    register: 'api/auth/local/register',
    login: 'api/auth/local',


    categories: 'api/categories',
    products: 'api/products?populate[category][fields][0]=category_name&populate[product_image][fields][1]=url&populate[wish_lists][fields][2]=id',

    cart: 'api/carts',
    // cart: `api/carts?filters[user_detail][id][$eq][0]=${userId}`,
    orders: 'api/orders',
    userProfile: 'api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city',

    stateUrl: 'api/states',
    cityUrl: 'api/cities',


    userUpdateMobile: 'api/users/',
    addressUrl : 'api/user-addresses'


    
};
