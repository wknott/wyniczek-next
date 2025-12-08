/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetGamesForInfiniteScroll($skip: Int!, $take: Int!) {\n  games(skip: $skip, take: $take, sortBy: LAST_PLAYED) {\n    items {\n      id\n      name\n      thumbnailUrl\n      latestResult {\n        createdAt\n        scores {\n          player {\n            name\n          }\n        }\n      }\n    }\n    total\n  }\n}": typeof types.GetGamesForInfiniteScrollDocument,
    "query ResultsGetList($skip: Int, $take: Int) {\n  results(skip: $skip, take: $take) {\n    items {\n      id\n      createdAt\n      playingTime\n      game {\n        name\n        imgUrl\n      }\n      scores {\n        player {\n          name\n        }\n      }\n    }\n    total\n  }\n}": typeof types.ResultsGetListDocument,
};
const documents: Documents = {
    "query GetGamesForInfiniteScroll($skip: Int!, $take: Int!) {\n  games(skip: $skip, take: $take, sortBy: LAST_PLAYED) {\n    items {\n      id\n      name\n      thumbnailUrl\n      latestResult {\n        createdAt\n        scores {\n          player {\n            name\n          }\n        }\n      }\n    }\n    total\n  }\n}": types.GetGamesForInfiniteScrollDocument,
    "query ResultsGetList($skip: Int, $take: Int) {\n  results(skip: $skip, take: $take) {\n    items {\n      id\n      createdAt\n      playingTime\n      game {\n        name\n        imgUrl\n      }\n      scores {\n        player {\n          name\n        }\n      }\n    }\n    total\n  }\n}": types.ResultsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetGamesForInfiniteScroll($skip: Int!, $take: Int!) {\n  games(skip: $skip, take: $take, sortBy: LAST_PLAYED) {\n    items {\n      id\n      name\n      thumbnailUrl\n      latestResult {\n        createdAt\n        scores {\n          player {\n            name\n          }\n        }\n      }\n    }\n    total\n  }\n}"): typeof import('./graphql').GetGamesForInfiniteScrollDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ResultsGetList($skip: Int, $take: Int) {\n  results(skip: $skip, take: $take) {\n    items {\n      id\n      createdAt\n      playingTime\n      game {\n        name\n        imgUrl\n      }\n      scores {\n        player {\n          name\n        }\n      }\n    }\n    total\n  }\n}"): typeof import('./graphql').ResultsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
