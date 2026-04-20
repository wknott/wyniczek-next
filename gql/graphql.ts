/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: unknown; output: unknown; }
};

export type BggGameDetails = {
  bggId: Scalars['ID']['output'];
  img?: Maybe<Scalars['String']['output']>;
  maxPlayers: Scalars['Int']['output'];
  minPlayers: Scalars['Int']['output'];
  names: Array<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
};

export type BggGameSearchResult = {
  bggId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  yearPublished?: Maybe<Scalars['Int']['output']>;
};

export type BggGameStats = {
  bggRank: Scalars['Int']['output'];
  weight: Scalars['Float']['output'];
};

export type CreateExpansionInput = {
  gameId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  pointCategoryNames?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateGameInput = {
  bggId?: InputMaybe<Scalars['Int']['input']>;
  inCollection?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  pointCategoryNames?: InputMaybe<Array<Scalars['String']['input']>>;
  userId: Scalars['String']['input'];
};

export type CreatePlayerInput = {
  name: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreatePointInput = {
  pointCategoryId: Scalars['String']['input'];
  value?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateResultImageInput = {
  key: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type CreateResultInput = {
  expansionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  gameId: Scalars['String']['input'];
  images?: InputMaybe<Array<CreateResultImageInput>>;
  playingTime?: InputMaybe<Scalars['Int']['input']>;
  scores: Array<CreateScoreInput>;
  userId: Scalars['String']['input'];
};

export type CreateScoreInput = {
  playerId: Scalars['String']['input'];
  points?: InputMaybe<Array<InputMaybe<CreatePointInput>>>;
};

export type Expansion = {
  gameId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pointCategories?: Maybe<Array<PointCategory>>;
};

export type Game = {
  avgPlayingTime2Players?: Maybe<Scalars['Int']['output']>;
  bggId?: Maybe<Scalars['Int']['output']>;
  bggRank?: Maybe<Scalars['Int']['output']>;
  bggWeight?: Maybe<Scalars['Float']['output']>;
  expansions?: Maybe<Array<Expansion>>;
  id: Scalars['String']['output'];
  imgUrl?: Maybe<Scalars['String']['output']>;
  inCollection: Scalars['Boolean']['output'];
  lastPlayedAt?: Maybe<Scalars['DateTime']['output']>;
  latestResult?: Maybe<Result>;
  maxPlayers: Scalars['Int']['output'];
  minPlayers: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  playerStats: Array<GamePlayerStats>;
  pointCategories?: Maybe<Array<PointCategory>>;
  records: Array<GameRecord>;
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type GamePlayerStats = {
  player: Player;
  totalGames: Scalars['Int']['output'];
  wins: Scalars['Int']['output'];
};

export type GameRecord = {
  createdAt: Scalars['DateTime']['output'];
  expansions: Array<Expansion>;
  player: Player;
  resultId: Scalars['String']['output'];
  totalPoints: Scalars['Int']['output'];
};

export type GameSortBy =
  | 'ALPHABETICAL'
  | 'AVG_PLAYING_TIME_2P'
  | 'LAST_PLAYED'
  | 'POPULARITY';

export type Mutation = {
  createExpansion: Expansion;
  createGame: Game;
  createPlayer: Player;
  createResult: Result;
  deleteExpansion: Expansion;
  removePlayer: Player;
  removeResult: Result;
  syncAllGamesWithBgg: Array<Game>;
  syncGameWithBgg: Game;
  updateExpansion: Expansion;
  updateGameCategories: Game;
  updateGameCollectionStatus: Game;
  updateResult: Result;
};


export type MutationCreateExpansionArgs = {
  createExpansionInput: CreateExpansionInput;
};


export type MutationCreateGameArgs = {
  createGameInput: CreateGameInput;
};


export type MutationCreatePlayerArgs = {
  createPlayerInput: CreatePlayerInput;
};


export type MutationCreateResultArgs = {
  createResultInput: CreateResultInput;
};


export type MutationDeleteExpansionArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemovePlayerArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveResultArgs = {
  id: Scalars['String']['input'];
};


export type MutationSyncGameWithBggArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateExpansionArgs = {
  updateExpansionInput: UpdateExpansionInput;
};


export type MutationUpdateGameCategoriesArgs = {
  categories: Array<UpdatePointCategoryInput>;
  id: Scalars['String']['input'];
};


export type MutationUpdateGameCollectionStatusArgs = {
  id: Scalars['String']['input'];
  inCollection: Scalars['Boolean']['input'];
};


export type MutationUpdateResultArgs = {
  updateResultInput: UpdateResultInput;
};

export type PaginatedGames = {
  items: Array<Game>;
  total: Scalars['Int']['output'];
};

export type PaginatedResults = {
  items: Array<Result>;
  total: Scalars['Int']['output'];
};

export type Player = {
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  records: Array<PlayerRecord>;
  totalWins: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

export type PlayerRecord = {
  createdAt: Scalars['DateTime']['output'];
  expansions: Array<Expansion>;
  game: Game;
  resultId: Scalars['String']['output'];
  totalPoints: Scalars['Int']['output'];
};

export type Point = {
  id: Scalars['String']['output'];
  pointCategory: PointCategory;
  pointCategoryId: Scalars['String']['output'];
  scoreId: Scalars['String']['output'];
  value?: Maybe<Scalars['Int']['output']>;
};

export type PointCategory = {
  expansionId?: Maybe<Scalars['String']['output']>;
  gameId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
};

export type Query = {
  game?: Maybe<Game>;
  games: PaginatedGames;
  getBggGameDetails: BggGameDetails;
  getBggGameStats: BggGameStats;
  latestResultByGameName?: Maybe<Result>;
  player?: Maybe<Player>;
  players: Array<Player>;
  result?: Maybe<Result>;
  results: PaginatedResults;
  searchBggGames: Array<BggGameSearchResult>;
};


export type QueryGameArgs = {
  id: Scalars['String']['input'];
};


export type QueryGamesArgs = {
  includeNotInCollection?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<GameSortBy>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetBggGameDetailsArgs = {
  bggId: Scalars['String']['input'];
};


export type QueryGetBggGameStatsArgs = {
  bggId: Scalars['String']['input'];
};


export type QueryLatestResultByGameNameArgs = {
  gameName: Scalars['String']['input'];
};


export type QueryPlayerArgs = {
  id: Scalars['String']['input'];
};


export type QueryResultArgs = {
  id: Scalars['String']['input'];
};


export type QueryResultsArgs = {
  gameId?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchBggGamesArgs = {
  query: Scalars['String']['input'];
};

export type Result = {
  createdAt: Scalars['DateTime']['output'];
  expansions?: Maybe<Array<Expansion>>;
  game: Game;
  gameId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  images?: Maybe<Array<ResultImage>>;
  playingTime?: Maybe<Scalars['Int']['output']>;
  scores?: Maybe<Array<Score>>;
  userId: Scalars['String']['output'];
};

export type ResultImage = {
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  resultId: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Score = {
  id: Scalars['String']['output'];
  player?: Maybe<Player>;
  playerId: Scalars['String']['output'];
  points?: Maybe<Array<Point>>;
  resultId: Scalars['String']['output'];
};

export type UpdateExpansionInput = {
  categories?: InputMaybe<Array<UpdatePointCategoryInput>>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePointCategoryInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export type UpdateResultInput = {
  expansionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  gameId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  images?: InputMaybe<Array<CreateResultImageInput>>;
  playingTime?: InputMaybe<Scalars['Int']['input']>;
  scores?: InputMaybe<Array<CreateScoreInput>>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateExpansionMutationVariables = Exact<{
  input: CreateExpansionInput;
}>;


export type CreateExpansionMutation = { createExpansion: { id: string, name: string, gameId: string, pointCategories?: Array<{ id: string, name: string, order: number }> | null } };

export type CreateGameMutationVariables = Exact<{
  input: CreateGameInput;
}>;


export type CreateGameMutation = { createGame: { id: string, name: string } };

export type CreatePlayerMutationVariables = Exact<{
  input: CreatePlayerInput;
}>;


export type CreatePlayerMutation = { createPlayer: { id: string, name: string } };

export type CreateResultMutationVariables = Exact<{
  input: CreateResultInput;
}>;


export type CreateResultMutation = { createResult: { id: string, createdAt: unknown, playingTime?: number | null, game: { id: string, name: string }, images?: Array<{ id: string, url: string, key: string, order: number }> | null, scores?: Array<{ id: string, player?: { id: string, name: string } | null, points?: Array<{ id: string, value?: number | null, pointCategory: { id: string, name: string } }> | null }> | null } };

export type DeleteExpansionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteExpansionMutation = { deleteExpansion: { id: string, name: string } };

export type GetGameByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetGameByIdQuery = { game?: { id: string, name: string, thumbnailUrl?: string | null, minPlayers: number, maxPlayers: number, bggRank?: number | null, bggWeight?: number | null, lastPlayedAt?: unknown | null, inCollection: boolean, pointCategories?: Array<{ id: string, name: string, order: number }> | null, expansions?: Array<{ id: string, name: string, pointCategories?: Array<{ id: string, name: string, order: number }> | null }> | null, records: Array<{ totalPoints: number, createdAt: unknown, resultId: string, player: { id: string, name: string }, expansions: Array<{ id: string, name: string }> }>, playerStats: Array<{ wins: number, totalGames: number, player: { id: string, name: string } }> } | null };

export type GameCardDataFragment = { id: string, name: string, thumbnailUrl?: string | null, avgPlayingTime2Players?: number | null, inCollection: boolean, latestResult?: { createdAt: unknown, scores?: Array<{ player?: { name: string, id: string } | null }> | null } | null };

export type GetGamesForInfiniteScrollQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  sortBy: GameSortBy;
  includeNotInCollection?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetGamesForInfiniteScrollQuery = { games: { total: number, items: Array<{ id: string, name: string, thumbnailUrl?: string | null, avgPlayingTime2Players?: number | null, inCollection: boolean, latestResult?: { createdAt: unknown, scores?: Array<{ player?: { name: string, id: string } | null }> | null } | null }> } };

export type GetGamesForScoringQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGamesForScoringQuery = { games: { items: Array<{ id: string, name: string, thumbnailUrl?: string | null, minPlayers: number, maxPlayers: number, pointCategories?: Array<{ id: string, name: string }> | null, expansions?: Array<{ id: string, name: string, pointCategories?: Array<{ id: string, name: string }> | null }> | null }> } };

export type GetGamesListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<GameSortBy>;
  includeNotInCollection?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetGamesListQuery = { games: { total: number, items: Array<{ id: string, name: string, thumbnailUrl?: string | null, minPlayers: number, maxPlayers: number, bggRank?: number | null, bggWeight?: number | null, lastPlayedAt?: unknown | null, inCollection: boolean }> } };

export type GetPlayerByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetPlayerByIdQuery = { player?: { id: string, name: string, records: Array<{ totalPoints: number, createdAt: unknown, resultId: string, game: { id: string, name: string, thumbnailUrl?: string | null }, expansions: Array<{ id: string, name: string }> }> } | null };

export type GetPlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlayersQuery = { players: Array<{ id: string, name: string, totalWins: number }> };

export type GetResultByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetResultByIdQuery = { result?: { id: string, createdAt: unknown, playingTime?: number | null, game: { id: string, name: string, thumbnailUrl?: string | null }, expansions?: Array<{ id: string, name: string }> | null, images?: Array<{ id: string, url: string, key: string, order: number }> | null, scores?: Array<{ id: string, player?: { id: string, name: string } | null, points?: Array<{ id: string, value?: number | null, pointCategory: { id: string, name: string } }> | null }> | null } | null };

export type ResultsGetListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  gameId?: InputMaybe<Scalars['String']['input']>;
}>;


export type ResultsGetListQuery = { results: { total: number, items: Array<{ id: string, gameId: string, createdAt: unknown, playingTime?: number | null, game: { id: string, name: string, thumbnailUrl?: string | null }, expansions?: Array<{ id: string, name: string }> | null, scores?: Array<{ player?: { name: string } | null, points?: Array<{ value?: number | null }> | null }> | null }> } };

export type SearchBggGamesQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type SearchBggGamesQuery = { searchBggGames: Array<{ bggId: string, name: string }> };

export type SyncGameWithBggMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SyncGameWithBggMutation = { syncGameWithBgg: { id: string, name: string, thumbnailUrl?: string | null, minPlayers: number, maxPlayers: number, bggRank?: number | null, bggWeight?: number | null } };

export type UpdateExpansionMutationVariables = Exact<{
  input: UpdateExpansionInput;
}>;


export type UpdateExpansionMutation = { updateExpansion: { id: string, name: string, gameId: string, pointCategories?: Array<{ id: string, name: string, order: number }> | null } };

export type UpdateGameCategoriesMutationVariables = Exact<{
  id: Scalars['String']['input'];
  categories: Array<UpdatePointCategoryInput> | UpdatePointCategoryInput;
}>;


export type UpdateGameCategoriesMutation = { updateGameCategories: { id: string, pointCategories?: Array<{ id: string, name: string, order: number }> | null } };

export type UpdateGameCollectionStatusMutationVariables = Exact<{
  id: Scalars['String']['input'];
  inCollection: Scalars['Boolean']['input'];
}>;


export type UpdateGameCollectionStatusMutation = { updateGameCollectionStatus: { id: string, inCollection: boolean } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const GameCardDataFragmentDoc = new TypedDocumentString(`
    fragment GameCardData on Game {
  id
  name
  thumbnailUrl
  avgPlayingTime2Players
  latestResult {
    createdAt
    scores {
      player {
        name
        id
      }
    }
  }
  inCollection
}
    `, {"fragmentName":"GameCardData"}) as unknown as TypedDocumentString<GameCardDataFragment, unknown>;
export const CreateExpansionDocument = new TypedDocumentString(`
    mutation CreateExpansion($input: CreateExpansionInput!) {
  createExpansion(createExpansionInput: $input) {
    id
    name
    gameId
    pointCategories {
      id
      name
      order
    }
  }
}
    `) as unknown as TypedDocumentString<CreateExpansionMutation, CreateExpansionMutationVariables>;
export const CreateGameDocument = new TypedDocumentString(`
    mutation CreateGame($input: CreateGameInput!) {
  createGame(createGameInput: $input) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<CreateGameMutation, CreateGameMutationVariables>;
export const CreatePlayerDocument = new TypedDocumentString(`
    mutation CreatePlayer($input: CreatePlayerInput!) {
  createPlayer(createPlayerInput: $input) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<CreatePlayerMutation, CreatePlayerMutationVariables>;
export const CreateResultDocument = new TypedDocumentString(`
    mutation CreateResult($input: CreateResultInput!) {
  createResult(createResultInput: $input) {
    id
    createdAt
    playingTime
    game {
      id
      name
    }
    images {
      id
      url
      key
      order
    }
    scores {
      id
      player {
        id
        name
      }
      points {
        id
        value
        pointCategory {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CreateResultMutation, CreateResultMutationVariables>;
export const DeleteExpansionDocument = new TypedDocumentString(`
    mutation DeleteExpansion($id: String!) {
  deleteExpansion(id: $id) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<DeleteExpansionMutation, DeleteExpansionMutationVariables>;
export const GetGameByIdDocument = new TypedDocumentString(`
    query GetGameById($id: String!) {
  game(id: $id) {
    id
    name
    thumbnailUrl
    minPlayers
    maxPlayers
    bggRank
    bggWeight
    lastPlayedAt
    inCollection
    pointCategories {
      id
      name
      order
    }
    expansions {
      id
      name
      pointCategories {
        id
        name
        order
      }
    }
    records {
      totalPoints
      createdAt
      resultId
      player {
        id
        name
      }
      expansions {
        id
        name
      }
    }
    playerStats {
      wins
      totalGames
      player {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetGameByIdQuery, GetGameByIdQueryVariables>;
export const GetGamesForInfiniteScrollDocument = new TypedDocumentString(`
    query GetGamesForInfiniteScroll($skip: Int!, $take: Int!, $sortBy: GameSortBy!, $includeNotInCollection: Boolean) {
  games(
    skip: $skip
    take: $take
    sortBy: $sortBy
    includeNotInCollection: $includeNotInCollection
  ) {
    items {
      ...GameCardData
    }
    total
  }
}
    fragment GameCardData on Game {
  id
  name
  thumbnailUrl
  avgPlayingTime2Players
  latestResult {
    createdAt
    scores {
      player {
        name
        id
      }
    }
  }
  inCollection
}`) as unknown as TypedDocumentString<GetGamesForInfiniteScrollQuery, GetGamesForInfiniteScrollQueryVariables>;
export const GetGamesForScoringDocument = new TypedDocumentString(`
    query GetGamesForScoring {
  games(take: 100, sortBy: ALPHABETICAL) {
    items {
      id
      name
      thumbnailUrl
      pointCategories {
        id
        name
      }
      expansions {
        id
        name
        pointCategories {
          id
          name
        }
      }
      minPlayers
      maxPlayers
    }
  }
}
    `) as unknown as TypedDocumentString<GetGamesForScoringQuery, GetGamesForScoringQueryVariables>;
export const GetGamesListDocument = new TypedDocumentString(`
    query GetGamesList($skip: Int, $take: Int, $sortBy: GameSortBy, $includeNotInCollection: Boolean) {
  games(
    skip: $skip
    take: $take
    sortBy: $sortBy
    includeNotInCollection: $includeNotInCollection
  ) {
    items {
      id
      name
      thumbnailUrl
      minPlayers
      maxPlayers
      bggRank
      bggWeight
      lastPlayedAt
      inCollection
    }
    total
  }
}
    `) as unknown as TypedDocumentString<GetGamesListQuery, GetGamesListQueryVariables>;
export const GetPlayerByIdDocument = new TypedDocumentString(`
    query GetPlayerById($id: String!) {
  player(id: $id) {
    id
    name
    records {
      totalPoints
      createdAt
      resultId
      game {
        id
        name
        thumbnailUrl
      }
      expansions {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetPlayerByIdQuery, GetPlayerByIdQueryVariables>;
export const GetPlayersDocument = new TypedDocumentString(`
    query GetPlayers {
  players {
    id
    name
    totalWins
  }
}
    `) as unknown as TypedDocumentString<GetPlayersQuery, GetPlayersQueryVariables>;
export const GetResultByIdDocument = new TypedDocumentString(`
    query GetResultById($id: String!) {
  result(id: $id) {
    id
    createdAt
    playingTime
    game {
      id
      name
      thumbnailUrl
    }
    expansions {
      id
      name
    }
    images {
      id
      url
      key
      order
    }
    scores {
      id
      player {
        id
        name
      }
      points {
        id
        value
        pointCategory {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetResultByIdQuery, GetResultByIdQueryVariables>;
export const ResultsGetListDocument = new TypedDocumentString(`
    query ResultsGetList($skip: Int, $take: Int, $gameId: String) {
  results(skip: $skip, take: $take, gameId: $gameId) {
    items {
      id
      gameId
      createdAt
      playingTime
      game {
        id
        name
        thumbnailUrl
      }
      expansions {
        id
        name
      }
      scores {
        player {
          name
        }
        points {
          value
        }
      }
    }
    total
  }
}
    `) as unknown as TypedDocumentString<ResultsGetListQuery, ResultsGetListQueryVariables>;
export const SearchBggGamesDocument = new TypedDocumentString(`
    query SearchBggGames($query: String!) {
  searchBggGames(query: $query) {
    bggId
    name
  }
}
    `) as unknown as TypedDocumentString<SearchBggGamesQuery, SearchBggGamesQueryVariables>;
export const SyncGameWithBggDocument = new TypedDocumentString(`
    mutation SyncGameWithBgg($id: String!) {
  syncGameWithBgg(id: $id) {
    id
    name
    thumbnailUrl
    minPlayers
    maxPlayers
    bggRank
    bggWeight
  }
}
    `) as unknown as TypedDocumentString<SyncGameWithBggMutation, SyncGameWithBggMutationVariables>;
export const UpdateExpansionDocument = new TypedDocumentString(`
    mutation UpdateExpansion($input: UpdateExpansionInput!) {
  updateExpansion(updateExpansionInput: $input) {
    id
    name
    gameId
    pointCategories {
      id
      name
      order
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateExpansionMutation, UpdateExpansionMutationVariables>;
export const UpdateGameCategoriesDocument = new TypedDocumentString(`
    mutation UpdateGameCategories($id: String!, $categories: [UpdatePointCategoryInput!]!) {
  updateGameCategories(id: $id, categories: $categories) {
    id
    pointCategories {
      id
      name
      order
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateGameCategoriesMutation, UpdateGameCategoriesMutationVariables>;
export const UpdateGameCollectionStatusDocument = new TypedDocumentString(`
    mutation UpdateGameCollectionStatus($id: String!, $inCollection: Boolean!) {
  updateGameCollectionStatus(id: $id, inCollection: $inCollection) {
    id
    inCollection
  }
}
    `) as unknown as TypedDocumentString<UpdateGameCollectionStatusMutation, UpdateGameCollectionStatusMutationVariables>;