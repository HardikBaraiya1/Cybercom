export const environment = {
    basUrl: 'http://localhost:1337/',

    register: 'api/auth/local/register',
    login: 'api/auth/local',
};

// Cart Items Of User : http://localhost:1337/api/carts?filters[user_detail][id][$eq][0]=5&populate=product&filters[order][id][$notNull]