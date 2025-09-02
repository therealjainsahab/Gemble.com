# Environment Configuration

## Required Variables

### Database
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string

### Authentication
- `JWT_SECRET`: Secret for signing JWTs
- `OAUTH_GOOGLE_CLIENT_ID`: Google OAuth client ID
- `OAUTH_GOOGLE_CLIENT_SECRET`: Google OAuth client secret

### Blockchain
- `ETHEREUM_RPC_URL`: Ethereum node RPC endpoint
- `POLYGON_RPC_URL`: Polygon node RPC endpoint
- `HOT_WALLET_PRIVATE_KEY`: Wallet private key (secure storage)

### Payment Processing
- `STRIPE_SECRET_KEY`: Stripe API secret key
- `COINBASE_COMMERCE_API_KEY`: Coinbase Commerce API key

## Environment-specific Settings

### Development
- `NODE_ENV=development`
- `DEBUG=true`

### Production
- `NODE_ENV=production`
- `SENTRY_DSN`: Sentry error tracking DSN
