const { EventSource, DynamoDB } = require('osiris-es');
const { v1 } = require('uuid');

const db = new DynamoDB({
    table: process.env.DYNAMODB_TABLE,
    region: process.env.AWS_REGION,
});

const es = new EventSource(db, {
    quantity: true,
});

module.exports = {
    Query: {
        shoppingCart: (_, args) => {
            const items = [];
            // get items from DB
            return es.getState(args.userId).then(state => {
                // Arrange to fit resplose (items array) 
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
        addItem: (root, args) => {
            const item = {
                id: args.item.id,
                name: args.item.name,
                price: args.item.price,
                quantity: args.item.quantity || 1,
            };
            // Store as an event in the DB
            const evt = {
                context: args.item.userId,
                [`item-${args.item.id}`]: item,
                quantity: 1,
            };
            return es.onEvent(evt).then(() => item);
        },
    },
};
