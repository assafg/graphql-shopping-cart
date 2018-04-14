const request = require('request');

const options = {
    method: 'POST',
    url: 'https://su7o6a6xgb.execute-api.us-east-1.amazonaws.com/dev/api/query',
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${process.argv[2]}`,
    },
    body: JSON.stringify({query : `mutation{
            addItem(item: {
            userId: "Node Client",
            id: "2",
            name: "milk",
            price: 2.99
            }){
                id
                name
                quantity
            }
        }`}),
};

request(options, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
