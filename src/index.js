const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Pokemon" type defines the queryable fields for every pokemon in our data source.
    
    type Routes {

    }

    type Regions {
        regions: []
    }

    type Pokemon {
    pokedex_number: Int!
    name: String!
    first_type: String!
    second_type: String
    found_in:[String!]
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "pokemon" query returns an array of zero or more Pokemon (defined above).
    
    type Query {
    pokemon: [Pokemon]
    }
`;

const pokemon = [
    {
        name: 'Pikachu',
        first_type: 'Electric',
    },
    {
        name: 'Bulbasaur',
        first_type: 'Grass',
        second_type: 'Poison'
    },
    {
        name: 'Charmander',
        first_type: 'Fire',
    }
]

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        pokemon: () => pokemon,
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
