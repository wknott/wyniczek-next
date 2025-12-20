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
    "mutation CreateResult($input: CreateResultInput!) {\n  createResult(createResultInput: $input) {\n    id\n    createdAt\n    playingTime\n    game {\n      id\n      name\n    }\n    scores {\n      id\n      player {\n        id\n        name\n      }\n      points {\n        id\n        value\n        pointCategory {\n          id\n          name\n        }\n      }\n    }\n  }\n}": typeof types.CreateResultDocument,
    "fragment GameCardData on Game {\n  id\n  name\n  thumbnailUrl\n  latestResult {\n    createdAt\n    scores {\n      player {\n        name\n        id\n      }\n    }\n  }\n}\n\nquery GetGamesForInfiniteScroll($skip: Int!, $take: Int!, $sortBy: GameSortBy!) {\n  games(skip: $skip, take: $take, sortBy: $sortBy) {\n    items {\n      ...GameCardData\n    }\n    total\n  }\n}": typeof types.GameCardDataFragmentDoc,
    "query GetGamesForScoring {\n  games(take: 100, sortBy: ALPHABETICAL) {\n    items {\n      id\n      name\n      thumbnailUrl\n      pointCategories {\n        id\n        name\n      }\n    }\n  }\n}": typeof types.GetGamesForScoringDocument,
    "query GetPlayers {\n  players {\n    id\n    name\n  }\n}": typeof types.GetPlayersDocument,
    "query ResultsGetList($skip: Int, $take: Int) {\n  results(skip: $skip, take: $take) {\n    items {\n      id\n      createdAt\n      playingTime\n      game {\n        name\n        imgUrl\n      }\n      scores {\n        player {\n          name\n        }\n      }\n    }\n    total\n  }\n}": typeof types.ResultsGetListDocument,
};
const documents: Documents = {
    "mutation CreateResult($input: CreateResultInput!) {\n  createResult(createResultInput: $input) {\n    id\n    createdAt\n    playingTime\n    game {\n      id\n      name\n    }\n    scores {\n      id\n      player {\n        id\n        name\n      }\n      points {\n        id\n        value\n        pointCategory {\n          id\n          name\n        }\n      }\n    }\n  }\n}": types.CreateResultDocument,
    "fragment GameCardData on Game {\n  id\n  name\n  thumbnailUrl\n  latestResult {\n    createdAt\n    scores {\n      player {\n        name\n        id\n      }\n    }\n  }\n}\n\nquery GetGamesForInfiniteScroll($skip: Int!, $take: Int!, $sortBy: GameSortBy!) {\n  games(skip: $skip, take: $take, sortBy: $sortBy) {\n    items {\n      ...GameCardData\n    }\n    total\n  }\n}": types.GameCardDataFragmentDoc,
    "query GetGamesForScoring {\n  games(take: 100, sortBy: ALPHABETICAL) {\n    items {\n      id\n      name\n      thumbnailUrl\n      pointCategories {\n        id\n        name\n      }\n    }\n  }\n}": types.GetGamesForScoringDocument,
    "query GetPlayers {\n  players {\n    id\n    name\n  }\n}": types.GetPlayersDocument,
    "query ResultsGetList($skip: Int, $take: Int) {\n  results(skip: $skip, take: $take) {\n    items {\n      id\n      createdAt\n      playingTime\n      game {\n        name\n        imgUrl\n      }\n      scores {\n        player {\n          name\n        }\n      }\n    }\n    total\n  }\n}": types.ResultsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateResult($input: CreateResultInput!) {\n  createResult(createResultInput: $input) {\n    id\n    createdAt\n    playingTime\n    game {\n      id\n      name\n    }\n    scores {\n      id\n      player {\n        id\n        name\n      }\n      points {\n        id\n        value\n        pointCategory {\n          id\n          name\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CreateResultDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment GameCardData on Game {\n  id\n  name\n  thumbnailUrl\n  latestResult {\n    createdAt\n    scores {\n      player {\n        name\n        id\n      }\n    }\n  }\n}\n\nquery GetGamesForInfiniteScroll($skip: Int!, $take: Int!, $sortBy: GameSortBy!) {\n  games(skip: $skip, take: $take, sortBy: $sortBy) {\n    items {\n      ...GameCardData\n    }\n    total\n  }\n}"): typeof import('./graphql').GameCardDataFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetGamesForScoring {\n  games(take: 100, sortBy: ALPHABETICAL) {\n    items {\n      id\n      name\n      thumbnailUrl\n      pointCategories {\n        id\n        name\n      }\n    }\n  }\n}"): typeof import('./graphql').GetGamesForScoringDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPlayers {\n  players {\n    id\n    name\n  }\n}"): typeof import('./graphql').GetPlayersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ResultsGetList($skip: Int, $take: Int) {\n  results(skip: $skip, take: $take) {\n    items {\n      id\n      createdAt\n      playingTime\n      game {\n        name\n        imgUrl\n      }\n      scores {\n        player {\n          name\n        }\n      }\n    }\n    total\n  }\n}"): typeof import('./graphql').ResultsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
