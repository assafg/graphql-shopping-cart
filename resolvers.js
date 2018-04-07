const { EventSource, DynamoDB } = require('osiris-es');
const { v1 } = require('uuid');

const db = new DynamoDB({
    table: process.env.DYNAMODB_TABLE,
    region: process.env.AWS_REGION,
    // endpoint: 'http://localhost:8000',
});

const es = new EventSource(db);
module.exports = {
    Query: {
        shoppingCart: (_, args) => {
            const items = [];
            // TODO - get items from DB
            return es.getState(args.userId).then(state => {
                const items = Object.keys(state)
                    .filter(k => k.indexOf('item-') === 0)
                    .map(k => state[k]);
                console.log({
                    userId: args.userId,
                    items,
                });
                return {
                    userId: args.userId,
                    items,
                };
            });
        },
    },
    Mutation: {
        addItem: (_, args) => {
            const item = {
                id: args.item.id,
                name: args.item.name,
                price: args.item.price,
            };
            //TODO - Store in DB
            const evt = {
                context: args.item.userId,
                [`item-${v1()}`]: item,
            };
            return es.onEvent(evt).then(() => item);
        },
    },
};
