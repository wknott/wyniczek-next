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
    "mutation CreateGame($input: CreateGameInput!) {\n  createGame(createGameInput: $input) {\n    id\n    name\n  }\n}": typeof types.CreateGameDocument,
    "mutation CreatePlayer($input: CreatePlayerInput!) {\n  createPlayer(createPlayerInput: $input) {\n    id\n    name\n  }\n}": typeof types.CreatePlayerDocument,
    "mutation CreateResult($input: CreateResultInput!) {\n  createResult(createResultInput: $input) {\n    id\n    createdAt\n    playingTime\n    game {\n      id\n      name\n    }\n    scores {\n      id\n      player {\n        id\n        name\n      }\n      points {\n        id\n        value\n        pointCategory {\n          id\n          name\n        }\n      }\n    }\n  }\n}": typeof types.CreateResultDocument,
    "query GetGameById($id: String!) {\n  game(id: $id) {\n    id\n    name\n    thumbnailUrl\n    minPlayers\n    maxPlayers\n    bggRank\n    bggWeight\n    lastPlayedAt\n    inCollection\n    pointCategories {\n      id\n      name\n    }\n  }\n}": typeof types.GetGameByIdDocument,
    "fragment GameCardData on Game {\n  id\n  name\n  thumbnailUrl\n  latestResult {\n    createdAt\n    scores {\n      player {\n        name\n        id\n      }\n    }\n  }\n  inCollection\n}\n\nquery GetGamesForInfiniteScroll($skip: Int!, $take: Int!, $sortBy: GameSortBy!, $includeNotInCollection: Boolean) {\n  games(\n    skip: $skip\n    take: $take\n    sortBy: $sortBy\n    includeNotInCollection: $includeNotInCollection\n  ) {\n    items {\n      ...GameCardData\n    }\n    total\n  }\n}": typeof types.GameCardDataFragmentDoc,
    "query GetGamesForScoring {\n  games(take: 100, sortBy: ALPHABETICAL) {\n    items {\n      id\n      name\n      thumbnailUrl\n      pointCategories {\n        id\n        name\n      }\n      minPlayers\n      maxPlayers\n    }\n  }\n}": typeof types.GetGamesForScoringDocument,
    "query GetGamesList($skip: Int, $take: Int, $sortBy: GameSortBy, $includeNotInCollection: Boolean) {\n  games(\n    skip: $skip\n    take: $take\n    sortBy: $sortBy\n    includeNotInCollection: $includeNotInCollection\n  ) {\n    items {\n      id\n      name\n      thumbnailUrl\n      minPlayers\n      maxPlayers\n      bggRank\n      bggWeight\n      lastPlayedAt\n      inCollection\n    }\n    total\n  }\n}": typeof types.GetGamesListDocument,
    "query GetPlayers {\n  players {\n    id\n    name\n  }\n}": typeof types.GetPlayersDocument,
    "query GetResultById($id: String!) {\n  result(id: $id) {\n    id\n    createdAt\n    playingTime\n    game {\n      id\n      name\n      thumbnailUrl\n    }\n    scores {\n      id\n      player {\n        id\n        name\n      }\n      points {\n        id\n        value\n        pointCategory {\n          id\n          name\n        }\n      }\n    }\n  }\n}": typeof types.GetResultByIdDocument,
    "query ResultsGetList($skip: Int, $take: Int) {\n  results(skip: $skip, take: $take) {\n    items {\n      id\n      createdAt\n      playingTime\n      game {\n        name\n        thumbnailUrl\n      }\n      scores {\n        player {\n          name\n        }\n        points {\n          value\n        }\n      }\n    }\n    total\n  }\n}": typeof types.ResultsGetListDocument,
    "query SearchBggGames($query: String!) {\n  searchBggGames(query: $query) {\n    bggId\n    name\n  }\n}": typeof types.SearchBggGamesDocument,
    "mutation SyncGameWithBgg($id: String!) {\n  syncGameWithBgg(id: $id) {\n    id\n    name\n    thumbnailUrl\n    minPlayers\n    maxPlayers\n    bggRank\n    bggWeight\n  }\n}": typeof types.SyncGameWithBggDocument,
    "mutation UpdateGameCollectionStatus($id: String!, $inCollection: Boolean!) {\n  updateGameCollectionStatus(id: $id, inCollection: $inCollection) {\n    id\n    inCollection\n  }\n}": typeof types.UpdateGameCollectionStatusDocument,
};
const documents: Documents = {
    "mutation CreateGame($input: CreateGameInput!) {\n  createGame(createGameInput: $input) {\n    id\n    name\n  }\n}": types.CreateGameDocument,
    "mutation CreatePlayer($input: CreatePlayerInput!) {\n  createPlayer(createPlayerInput: $input) {\n    id\n    name\n  }\n}": types.CreatePlayerDocument,
    "mutation CreateResult($input: CreateResultInput!) {\n  createResult(createResultInput: $input) {\n    id\n    createdAt\n    playingTime\n    game {\n      id\n      name\n    }\n    scores {\n      id\n      player {\n        id\n        name\n      }\n      points {\n        id\n        value\n        pointCategory {\n          id\n          name\n        }\n      }\n    }\n  }\n}": types.CreateResultDocument,
    "query GetGameById($id: String!) {\n  game(id: $id) {\n    id\n    name\n    thumbnailUrl\n    minPlayers\n    maxPlayers\n    bggRank\n    bggWeight\n    lastPlayedAt\n    inCollection\n    pointCategories {\n      id\n      name\n    }\n  }\n}": types.GetGameByIdDocument,
    "fragment GameCardData on Game {\n  id\n  name\n  thumbnailUrl\n  latestResult {\n    createdAt\n    scores {\n      player {\n        name\n        id\n      }\n    }\n  }\n  inCollection\n}\n\nquery GetGamesForInfiniteScroll($skip: Int!, $take: Int!, $sortBy: GameSortBy!, $includeNotInCollection: Boolean) {\n  games(\n    skip: $skip\n    take: $take\n    sortBy: $sortBy\n    includeNotInCollection: $includeNotInCollection\n  ) {\n    items {\n      ...GameCardData\n    }\n    total\n  }\n}": types.GameCardDataFragmentDoc,
    "query GetGamesForScoring {\n  games(take: 100, sortBy: ALPHABETICAL) {\n    items {\n      id\n      name\n      thumbnailUrl\n      pointCategories {\n        id\n        name\n      }\n      minPlayers\n      maxPlayers\n    }\n  }\n}": types.GetGamesForScoringDocument,
    "query GetGamesList($skip: Int, $take: Int, $sortBy: GameSortBy, $includeNotInCollection: Boolean) {\n  games(\n    skip: $skip\n    take: $take\n    sortBy: $sortBy\n    includeNotInCollection: $includeNotInCollection\n  ) {\n    items {\n      id\n      name\n      thumbnailUrl\n      minPlayers\n      maxPlayers\n      bggRank\n      bggWeight\n      lastPlayedAt\n      inCollection\n    }\n    total\n  }\n}": types.GetGamesListDocument,
    "query GetPlayers {\n  players {\n    id\n    name\n  }\n}": types.GetPlayersDocument,
    "query GetResultById($id: String!) {\n  result(id: $id) {\n    id\n    createdAt\n    playingTime\n    game {\n      id\n      name\n      thumbnailUrl\n    }\n    scores {\n      id\n      player {\n        id\n        name\n      }\n      points {\n        id\n        value\n        pointCategory {\n          id\n          name\n        }\n      }\n    }\n  }\n}": types.GetResultByIdDocument,
    "query ResultsGetList($skip: Int, $take: Int) {\n  results(skip: $skip, take: $take) {\n    items {\n      id\n      createdAt\n      playingTime\n      game {\n        name\n        thumbnailUrl\n      }\n      scores {\n        player {\n          name\n        }\n        points {\n          value\n        }\n      }\n    }\n    total\n  }\n}": types.ResultsGetListDocument,
    "query SearchBggGames($query: String!) {\n  searchBggGames(query: $query) {\n    bggId\n    name\n  }\n}": types.SearchBggGamesDocument,
    "mutation SyncGameWithBgg($id: String!) {\n  syncGameWithBgg(id: $id) {\n    id\n    name\n    thumbnailUrl\n    minPlayers\n    maxPlayers\n    bggRank\n    bggWeight\n  }\n}": types.SyncGameWithBggDocument,
    "mutation UpdateGameCollectionStatus($id: String!, $inCollection: Boolean!) {\n  updateGameCollectionStatus(id: $id, inCollection: $inCollection) {\n    id\n    inCollection\n  }\n}": types.UpdateGameCollectionStatusDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateGame($input: CreateGameInput!) {\n  createGame(createGameInput: $input) {\n    id\n    name\n  }\n}"): typeof import('./graphql').CreateGameDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreatePlayer($input: CreatePlayerInput!) {\n  createPlayer(createPlayerInput: $input) {\n    id\n    name\n  }\n}"): typeof import('./graphql').CreatePlayerDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateResult($input: CreateResultInput!) {\n  createResult(createResultInput: $input) {\n    id\n    createdAt\n    playingTime\n    game {\n      id\n      name\n    }\n    scores {\n      id\n      player {\n        id\n        name\n      }\n      points {\n        id\n        value\n        pointCategory {\n          id\n          name\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CreateResultDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetGameById($id: String!) {\n  game(id: $id) {\n    id\n    name\n    thumbnailUrl\n    minPlayers\n    maxPlayers\n    bggRank\n    bggWeight\n    lastPlayedAt\n    inCollection\n    pointCategories {\n      id\n      name\n    }\n  }\n}"): typeof import('./graphql').GetGameByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment GameCardData on Game {\n  id\n  name\n  thumbnailUrl\n  latestResult {\n    createdAt\n    scores {\n      player {\n        name\n        id\n      }\n    }\n  }\n  inCollection\n}\n\nquery GetGamesForInfiniteScroll($skip: Int!, $take: Int!, $sortBy: GameSortBy!, $includeNotInCollection: Boolean) {\n  games(\n    skip: $skip\n    take: $take\n    sortBy: $sortBy\n    includeNotInCollection: $includeNotInCollection\n  ) {\n    items {\n      ...GameCardData\n    }\n    total\n  }\n}"): typeof import('./graphql').GameCardDataFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetGamesForScoring {\n  games(take: 100, sortBy: ALPHABETICAL) {\n    items {\n      id\n      name\n      thumbnailUrl\n      pointCategories {\n        id\n        name\n      }\n      minPlayers\n      maxPlayers\n    }\n  }\n}"): typeof import('./graphql').GetGamesForScoringDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetGamesList($skip: Int, $take: Int, $sortBy: GameSortBy, $includeNotInCollection: Boolean) {\n  games(\n    skip: $skip\n    take: $take\n    sortBy: $sortBy\n    includeNotInCollection: $includeNotInCollection\n  ) {\n    items {\n      id\n      name\n      thumbnailUrl\n      minPlayers\n      maxPlayers\n      bggRank\n      bggWeight\n      lastPlayedAt\n      inCollection\n    }\n    total\n  }\n}"): typeof import('./graphql').GetGamesListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPlayers {\n  players {\n    id\n    name\n  }\n}"): typeof import('./graphql').GetPlayersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetResultById($id: String!) {\n  result(id: $id) {\n    id\n    createdAt\n    playingTime\n    game {\n      id\n      name\n      thumbnailUrl\n    }\n    scores {\n      id\n      player {\n        id\n        name\n      }\n      points {\n        id\n        value\n        pointCategory {\n          id\n          name\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').GetResultByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ResultsGetList($skip: Int, $take: Int) {\n  results(skip: $skip, take: $take) {\n    items {\n      id\n      createdAt\n      playingTime\n      game {\n        name\n        thumbnailUrl\n      }\n      scores {\n        player {\n          name\n        }\n        points {\n          value\n        }\n      }\n    }\n    total\n  }\n}"): typeof import('./graphql').ResultsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SearchBggGames($query: String!) {\n  searchBggGames(query: $query) {\n    bggId\n    name\n  }\n}"): typeof import('./graphql').SearchBggGamesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SyncGameWithBgg($id: String!) {\n  syncGameWithBgg(id: $id) {\n    id\n    name\n    thumbnailUrl\n    minPlayers\n    maxPlayers\n    bggRank\n    bggWeight\n  }\n}"): typeof import('./graphql').SyncGameWithBggDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateGameCollectionStatus($id: String!, $inCollection: Boolean!) {\n  updateGameCollectionStatus(id: $id, inCollection: $inCollection) {\n    id\n    inCollection\n  }\n}"): typeof import('./graphql').UpdateGameCollectionStatusDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
