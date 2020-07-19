const { ApolloServer, gql } = require("apollo-server");
const { missions, astronauts } = require("./data");

const typeDefs = gql`
    type Mission {
        id: Int!
        name: String!
        astronauts: [Astronaut]!
    }

    type Astronaut {
        id: Int!
        name: String!
        height: Int
    }

    type Query {
        missions: [Mission]
        mission(id: Int!): Mission
        astronauts: [Astronaut]
        astronaut(id: Int!): Astronaut
    }
`;

const resolvers = {
    Query: {
        missions: () => missions,
        astronauts: () => astronauts,
        mission(parent, args, context, info) {
            return missions.find(mission => mission.id === args.id);
        },
        astronaut(parent, args, context, info) {
            return astronauts.find(astronaut => astronaut.id === args.id);
        },
    },
    Mission: {
        astronauts(parent) {
            console.log(parent);
            return astronauts.filter(astronaut =>
                parent.astronauts.includes(astronaut.id)
            );
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`GraphQL Server ready at ${url}`);
});
