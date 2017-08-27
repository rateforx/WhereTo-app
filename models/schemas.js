/**
 * Created by Snippy on 2017-08-26.
 */

let schemas = {

    user: {
        id: null,
        name: null,
        login: null,
        password: null,
    },

    offer: {
        id: null,
        order_id: null,
        user_id: null,
        created: null,
        updated: null,
        value: null,
    },

    order: {
        id: null,
        user_id: null,
        origin: null,
        dest: null,
        added: null,
        updated: null,
        expires: null,
        weight: null,
        cargo: null,
        status: null,
    },

    driver: {
        id: null,
        user_id: null,
        super_id: null,
        status: null,
    },
};

module.exports = schemas;
