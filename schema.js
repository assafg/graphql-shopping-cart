module.exports = `
type Query {
    shoppingCart(userId: String!): ShoppingCart
}
type Mutation {
    addItem(item: ItemInput): Item
}
type Item {
    id: String
    name: String
    price: Float
}
type ShoppingCart {
    userId: String!
    items: [Item]
}

input ItemInput {
    userId: String!
    id: String!
    name: String!
    price: Float!
}
`;
