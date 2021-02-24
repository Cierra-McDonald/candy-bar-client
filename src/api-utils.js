import request from 'superagent';

const URL = 'https://pure-wildwood-35101.herokuapp.com';

export async function getCandies() {
    const response = await request.get(`${URL}/candies`);

    return response.body;
}

export async function getCategories() {
    // we can destructure, to suck the body property out of the response object
    const { body } = await request.get(`${URL}/categories`);

    return body;
}

// this is a recipe for getting candy
export async function getCandy(
    // this is the ingredient we need
    // the ID will be supplied by whoever is using this function later on
    // just like the flour will be supplied by whoever is making the recipe
    // we are NOT responsible for giving flour to the baker
    id
    ) {
    const { body } = await request.get(`${URL}/candies/${id}`);

    return body;
}

// we're trusting the user/programmer to supply the correct object with the correct properties
// we don 't explain what flour is. we assume the baker knows what flour is
export async function makeCandy(aPieceOfCandy) {
    const { body } = await request
        .post(`${URL}/candies/`)
        // we send along a candy so the back end knows what to create
        .send(aPieceOfCandy);

        return body;
}

export async function deleteCandy(id) {
    const { body } = await request.delete(`${URL}/candies/${id}`);

    return body;
}

export async function updateCandy(id, aPieceOfCandy) {
    const { body } = await request.put(`${URL}/candies/${id}`)
        .send(aPieceOfCandy);

        return body;
}