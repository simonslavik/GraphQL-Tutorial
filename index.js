import {ApolloServer} from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'

//db
import db from './_db.js';

import {typeDefs} from './schema.js';

const resolvers = {
        Query: {
            games(){
                return db.games
            },
            game(_, args) {
                return db.games.find(game => game.id === args.id)
            },
            reviews(){
                return db.reviews
            },
            review(_, args){
                return db.reviews.find(review => review.id === args.id)
            },
            authors(){
                return db.authors
            },
            review(_, args){
                return db.reviews.find(review => review.id === args.id)
            },

    },
    Game: {
        reviews(parent){
            return db.reviews.filter(review => review.game_Id === parent.id)
        }
    },
    Author: {
        reviews(parent){
            return db.reviews.filter(review => review.author_Id === parent.id)
        }
    },
    Review: {
        game(parent){
            return db.games.find(game => game.id === parent.game_Id)
        },
        author(parent){
            return db.authors.find(author => author.id === parent.author_Id)
        }
    },
    Mutation: {
        deleteGame(_, args){
            db.games = db.games.filter(game => game.id !== args.id)
            return db.games
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers

});

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000},
});

console.log(`🚀  Server ready at port:`, 4000);