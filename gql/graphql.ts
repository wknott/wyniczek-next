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

export type CreateGameInput = {
  bggId?: InputMaybe<Scalars['Int']['input']>;
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

export type CreateResultInput = {
  gameId: Scalars['String']['input'];
  playingTime?: InputMaybe<Scalars['Int']['input']>;
  scores: Array<CreateScoreInput>;
  userId: Scalars['String']['input'];
};

export type CreateScoreInput = {
  playerId: Scalars['String']['input'];
  points?: InputMaybe<Array<InputMaybe<CreatePointInput>>>;
};

export type Game = {
  bggId?: Maybe<Scalars['Int']['output']>;
  bggRank?: Maybe<Scalars['Int']['output']>;
  bggWeight?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  imgUrl?: Maybe<Scalars['String']['output']>;
  lastPlayedAt?: Maybe<Scalars['DateTime']['output']>;
  latestResult?: Maybe<Result>;
  maxPlayers: Scalars['Int']['output'];
  minPlayers: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  pointCategories?: Maybe<Array<PointCategory>>;
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type GameSortBy =
  | 'ALPHABETICAL'
  | 'LAST_PLAYED'
  | 'POPULARITY';

export type Mutation = {
  createGame: Game;
  createPlayer: Player;
  createResult: Result;
  removePlayer: Player;
  removeResult: Result;
  syncAllGamesWithBgg: Array<Game>;
  syncGameWithBgg: Game;
  updateResult: Result;
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


export type MutationRemovePlayerArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveResultArgs = {
  id: Scalars['String']['input'];
};


export type MutationSyncGameWithBggArgs = {
  id: Scalars['String']['input'];
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
  userId: Scalars['String']['output'];
};

export type Point = {
  id: Scalars['String']['output'];
  pointCategory: PointCategory;
  pointCategoryId: Scalars['String']['output'];
  scoreId: Scalars['String']['output'];
  value?: Maybe<Scalars['Int']['output']>;
};

export type PointCategory = {
  gameId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
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
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchBggGamesArgs = {
  query: Scalars['String']['input'];
};

export type Result = {
  createdAt: Scalars['DateTime']['output'];
  game: Game;
  gameId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  playingTime?: Maybe<Scalars['Int']['output']>;
  scores?: Maybe<Array<Score>>;
  userId: Scalars['String']['output'];
};

export type Score = {
  id: Scalars['String']['output'];
  player?: Maybe<Player>;
  playerId: Scalars['String']['output'];
  points?: Maybe<Array<Point>>;
  resultId: Scalars['String']['output'];
};

export type UpdateResultInput = {
  gameId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  playingTime?: InputMaybe<Scalars['Int']['input']>;
  scores?: InputMaybe<Array<CreateScoreInput>>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateResultMutationVariables = Exact<{
  input: CreateResultInput;
}>;


export type CreateResultMutation = { createResult: { id: string, createdAt: unknown, playingTime?: number | null, game: { id: string, name: string }, scores?: Array<{ id: string, player?: { id: string, name: string } | null, points?: Array<{ id: string, value?: number | null, pointCategory: { id: string, name: string } }> | null }> | null } };

export type GameCardDataFragment = { id: string, name: string, thumbnailUrl?: string | null, latestResult?: { createdAt: unknown, scores?: Array<{ player?: { name: string, id: string } | null }> | null } | null };

export type GetGamesForInfiniteScrollQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  sortBy: GameSortBy;
}>;


export type GetGamesForInfiniteScrollQuery = { games: { total: number, items: Array<{ id: string, name: string, thumbnailUrl?: string | null, latestResult?: { createdAt: unknown, scores?: Array<{ player?: { name: string, id: string } | null }> | null } | null }> } };

export type GetGamesForScoringQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGamesForScoringQuery = { games: { items: Array<{ id: string, name: string, thumbnailUrl?: string | null, pointCategories?: Array<{ id: string, name: string }> | null }> } };

export type GetPlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlayersQuery = { players: Array<{ id: string, name: string }> };

export type ResultsGetListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ResultsGetListQuery = { results: { total: number, items: Array<{ id: string, createdAt: unknown, playingTime?: number | null, game: { name: string, imgUrl?: string | null }, scores?: Array<{ player?: { name: string } | null }> | null }> } };

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
  latestResult {
    createdAt
    scores {
      player {
        name
        id
      }
    }
  }
}
    `, {"fragmentName":"GameCardData"}) as unknown as TypedDocumentString<GameCardDataFragment, unknown>;
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
export const GetGamesForInfiniteScrollDocument = new TypedDocumentString(`
    query GetGamesForInfiniteScroll($skip: Int!, $take: Int!, $sortBy: GameSortBy!) {
  games(skip: $skip, take: $take, sortBy: $sortBy) {
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
  latestResult {
    createdAt
    scores {
      player {
        name
        id
      }
    }
  }
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
    }
  }
}
    `) as unknown as TypedDocumentString<GetGamesForScoringQuery, GetGamesForScoringQueryVariables>;
export const GetPlayersDocument = new TypedDocumentString(`
    query GetPlayers {
  players {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<GetPlayersQuery, GetPlayersQueryVariables>;
export const ResultsGetListDocument = new TypedDocumentString(`
    query ResultsGetList($skip: Int, $take: Int) {
  results(skip: $skip, take: $take) {
    items {
      id
      createdAt
      playingTime
      game {
        name
        imgUrl
      }
      scores {
        player {
          name
        }
      }
    }
    total
  }
}
    `) as unknown as TypedDocumentString<ResultsGetListQuery, ResultsGetListQueryVariables>;