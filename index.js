import {ApollotServer} from 'apollo-server';
import {starStandaloneServer} from '@apollo/server/standalone';

//db
import db from './_db.js';

import {typeDefs} from './schema.js';

const resolvers = {
        Query: {
            games(){
                return db.games
            },
            reviews(){
                return db.reviews
            },
            authors(){
                return db.authors
            }
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers

});

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000},
});

console.log(`🚀  Server ready at port:`, 4000);