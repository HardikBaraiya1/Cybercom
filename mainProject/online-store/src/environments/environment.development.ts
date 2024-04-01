export const environment = {
    basUrl: 'http://localhost:1337/',

    register: 'api/auth/local/register',
    login: 'api/auth/local',


    categories: 'api/categories',
    products: 'api/products?populate[category][fields][0]=category_name&populate[product_image][fields][1]=url&populate[wish_lists][fields][2]=id',

    cart: 'api/carts',

    userProfile: 'api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city',

    userUpdateMobile: 'api/users/'


    
};
