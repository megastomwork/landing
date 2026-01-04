# Deployment Guide

## CI/CD Pipeline Overview

This project uses GitHub Actions for safe, zero-downtime deployments with database migrations.

### Deployment Flow

```
Push to main/payload-migration
    ↓
1. Run Database Migrations
    ↓ (only if successful)
2. Build & Deploy to Vercel
    ↓
3. Health Check
    ↓
4. Rollback on failure (optional)
```

## Setup Instructions

### 1. GitHub Secrets

Add these secrets to your GitHub repository (`Settings` → `Secrets and variables` → `Actions`):

```bash
VERCEL_TOKEN          # Vercel API token
VERCEL_ORG_ID         # Vercel organization ID
VERCEL_PROJECT_ID     # Vercel project ID
DATABASE_URI          # Production database connection string
PAYLOAD_SECRET        # Payload CMS secret key
PRODUCTION_URL        # Your production URL (e.g., https://megastom.com)
```

#### How to get Vercel credentials:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Get organization and project IDs
cat .vercel/project.json
```

Create Vercel token: https://vercel.com/account/tokens

### 2. Environment Setup

Create GitHub Environment:
1. Go to `Settings` → `Environments`
2. Create `production` environment
3. Add protection rules (optional):
   - Required reviewers
   - Wait timer
   - Deployment branches (only main/payload-migration)

### 3. Vercel Settings

In Vercel dashboard:
1. Go to Project Settings → Git
2. Disable automatic deployments (already done via vercel.json)
3. All deployments will be triggered via GitHub Actions

## Migration Strategy

### Writing Backward-Compatible Migrations

Always write migrations that work with both old and new code:

**❌ Bad (Breaking change):**
```sql
-- This will break the old version
ALTER TABLE products DROP COLUMN old_field;
ALTER TABLE products ADD COLUMN new_field VARCHAR(255) NOT NULL;
```

**✅ Good (Backward-compatible):**
```sql
-- Step 1: Add new field as nullable
ALTER TABLE products ADD COLUMN new_field VARCHAR(255);

-- Step 2: Deploy new code

-- Step 3 (separate migration): Remove old field
-- ALTER TABLE products DROP COLUMN old_field;
```

### Deployment Process

1. **Create backward-compatible migration**
2. **Push to main/payload-migration branch**
3. **GitHub Actions runs automatically:**
   - Runs migrations on production DB
   - If migrations succeed → deploys to Vercel
   - If migrations fail → stops deployment
4. **Health check verifies deployment**

### Manual Migration (if needed)

If you need to run migrations manually:

```bash
# Set production environment variables
export DATABASE_URI="your_production_database_url"
export PAYLOAD_SECRET="your_payload_secret"

# Run migrations
npm run payload migrate

# Check migration status
npm run payload migrate:status
```

### Rollback Strategy

If deployment fails:

1. **Revert code:** Push previous working commit
2. **Rollback migration (if needed):**
   ```bash
   npm run payload migrate:down
   ```

## Monitoring

- Check GitHub Actions tab for deployment status
- Monitor Vercel dashboard for build logs
- Check application health endpoint after deployment

## Local Development

Migrations are NOT run automatically in development:

```bash
# Run dev server
npm run dev

# Run migrations manually when needed
npm run payload migrate
```

## Best Practices

1. **Always test migrations locally first**
2. **Keep migrations small and incremental**
3. **Use backward-compatible changes**
4. **Never mix schema changes with data changes**
5. **Test rollback before deploying**
6. **Monitor application after deployment**

## Troubleshooting

### Migration fails in CI

- Check DATABASE_URI is correct in GitHub Secrets
- Verify migration syntax locally
- Check database permissions

### Deployment succeeds but app crashes

- Check Vercel logs
- Verify environment variables in Vercel
- Run health check manually
- Consider rollback

### Need to skip migrations

Temporarily disable migration step in `.github/workflows/deploy.yml` (not recommended).
