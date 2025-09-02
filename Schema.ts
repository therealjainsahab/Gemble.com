type Query {
  getUser(id: ID!): User
  getBets(filter: BetFilter): [Bet!]!
  getLiveEvents: [LiveEvent!]!
}

type Mutation {
  placeBet(input: PlaceBetInput!): BetResult!
  withdrawFunds(amount: Float!): Transaction!
  updateProfile(input: ProfileInput!): User!
}

type Subscription {
  liveOddsChanged(eventId: ID!): OddsUpdate!
  betSettled(userId: ID!): Bet!
}

type User {
  id: ID!
  email: String!
  balance: Float!
  bets: [Bet!]!
  transactions: [Transaction!]!
}

type Bet {
  id: ID!
  amount: Float!
  odds: Float!
  status: BetStatus!
  potentialWin: Float!
  createdAt: String!
}

input PlaceBetInput {
  eventId: ID!
  marketId: ID!
  outcomeId: ID!
  amount: Float!
}
