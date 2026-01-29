# Secure Environment Variable Management Plan

## Overview

This document outlines the implementation plan for securing environment variables in the Blitzs Project Hub backend. The primary goal is to remove hardcoded credentials from the codebase and implement proper secret management practices.

## Current Security Issues

### Hardcoded Credentials

- Supabase URLs and keys in `.env` files committed to repository
- JWT secrets exposed in configuration
- Service role keys in plain text
- Database connection strings visible in configuration files

### Security Risks

- Complete system compromise if repository is exposed
- Unauthorized access to Supabase project
- Potential data breach of sensitive information
- Compliance violations due to poor credential management

## Recommended Approach

### Phase 1: Inventory and Assessment

#### 1.1 Identify All Sensitive Values

- Supabase URL: `SUPABASE_URL=https://afgromdzethkscaskofz.supabase.co`
- Supabase Anon Key: `SUPABASE_ANON_KEY=...`
- Supabase Service Role Key: `SUPABASE_SERVICE_ROLE_KEY=...`
- JWT Secret: `JWT_SECRET=...` (will be deprecated after auth consolidation)
- SMTP credentials: `SMTP_USER`, `SMTP_PASS`, etc.

#### 1.2 Locate Configuration Files

- Root `.env` file
- Server `.env` file (`server/.env`)
- Any configuration files containing credentials
- Build/deployment configuration files

### Phase 2: Secure Storage Implementation

#### 2.1 Environment-Specific Configuration

For development environments, maintain `.env` files but ensure they're properly excluded from version control:

```bash
# .gitignore additions
.env
server/.env
*.env
.env.local
.env.*.local
```

#### 2.2 Production Environment Configuration

Implement secure approaches for production:

1. **Platform-specific environment variable management** (Vercel, Netlify, etc.)
2. **Infrastructure as Code** with secure parameter stores (AWS Parameter Store, Azure Key Vault, etc.)
3. **Secrets management tools** (HashiCorp Vault, Doppler, etc.)

#### 2.3 Configuration Loading Pattern

Update configuration loading to be more secure and flexible:

```javascript
// server/config/environment.js
export const getConfig = () => {
  // Validate required environment variables
  const requiredEnvVars = [
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "PORT",
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar],
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`,
    );
  }

  return {
    supabase: {
      url: process.env.SUPABASE_URL,
      anonKey: process.env.SUPABASE_ANON_KEY,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
    server: {
      port: parseInt(process.env.PORT) || 3001,
      nodeEnv: process.env.NODE_ENV || "development",
    },
    smtp: process.env.SMTP_HOST
      ? {
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT),
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  };
};
```

### Phase 3: Update Supabase Configuration

#### 3.1 Secure Supabase Client Initialization

Update the Supabase configuration to use environment variables securely:

```javascript
// server/config/supabase.js
import { createClient } from "@supabase/supabase-js";
import { getConfig } from "./environment.js";

const config = getConfig();

export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey,
);

// For server-side operations requiring service role
export const supabaseService = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey,
);
```

### Phase 4: Deployment Configuration

#### 4.1 Platform-Specific Instructions

##### Vercel Deployment

```bash
# Set environment variables in Vercel dashboard
vercel env add SUPABASE_URL production
vercel env add SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
```

##### Docker Deployment

Create a separate secrets file that's mounted at runtime:

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Don't copy .env files to image
COPY --chown=node:node . .

USER node

EXPOSE 3001

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3001:3001"
    env_file:
      - .env
    environment:
      - NODE_ENV=production
    # Use external secrets management
    secrets:
      - supabase_anon_key
      - supabase_service_role_key

secrets:
  supabase_anon_key:
    file: ./secrets/supabase_anon_key.txt
  supabase_service_role_key:
    file: ./secrets/supabase_service_role_key.txt
```

#### 4.2 CI/CD Pipeline Security

Update CI/CD pipelines to use secure secret management:

```yaml
# GitHub Actions example
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}

      - name: Deploy
        run: |
          # Deployment commands here
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
```

### Phase 5: Validation and Monitoring

#### 5.1 Credential Validation

Add runtime validation to ensure credentials are properly loaded:

```javascript
// server/utils/validate-config.js
import { getConfig } from "../config/environment.js";

export const validateConfig = () => {
  const config = getConfig();

  // Validate Supabase configuration
  if (!config.supabase.url || !config.supabase.url.startsWith("https://")) {
    throw new Error("Invalid Supabase URL. Must be a valid HTTPS URL.");
  }

  if (!config.supabase.anonKey || config.supabase.anonKey.length < 10) {
    throw new Error("Invalid Supabase Anon Key. Key appears to be too short.");
  }

  if (
    !config.supabase.serviceRoleKey ||
    config.supabase.serviceRoleKey.length < 10
  ) {
    throw new Error(
      "Invalid Supabase Service Role Key. Key appears to be too short.",
    );
  }

  console.log("✓ Configuration validation passed");
};

// Call this early in application startup
validateConfig();
```

#### 5.2 Security Auditing

Implement logging for configuration access (without logging sensitive values):

```javascript
// server/utils/security-logger.js
export const logSecurityEvent = (event, details) => {
  // Log security-relevant events without exposing sensitive data
  console.log(`[SECURITY] ${event}`, {
    timestamp: new Date().toISOString(),
    ...details,
  });
};

// Usage example
logSecurityEvent("APP_STARTUP", {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
});
```

## Implementation Steps

### Step 1: Secure Current Environment Files

1. Remove current `.env` files from Git history
2. Add proper entries to `.gitignore`
3. Create template files for developers (`env.example`)

### Step 2: Update Configuration Loading

1. Implement secure configuration loading as shown above
2. Add validation for required environment variables
3. Test configuration loading in different environments

### Step 3: Platform Configuration

1. Set up secure environment variable management in deployment platform
2. Update deployment scripts to use platform secrets
3. Test deployments with new configuration approach

### Step 4: Documentation Updates

1. Update README with proper environment setup instructions
2. Document the secure configuration approach
3. Create developer onboarding documentation

## Security Checklist

### Before Implementation

- [ ] Inventory all current environment variables
- [ ] Document where each credential is used
- [ ] Create backup of current configuration
- [ ] Plan migration timeline

### During Implementation

- [ ] Remove hardcoded credentials from repository
- [ ] Update configuration loading to be secure
- [ ] Add validation for environment variables
- [ ] Test in staging environment

### After Implementation

- [ ] Verify application works with new configuration
- [ ] Confirm no credentials are in version control
- [ ] Test deployment process with secure variables
- [ ] Update documentation

## Risk Mitigation

### Configuration Errors

- Implement comprehensive validation of environment variables
- Provide clear error messages for missing configuration
- Maintain fallback values where appropriate

### Deployment Issues

- Test configuration changes in staging environment first
- Maintain rollback procedures
- Coordinate configuration changes with deployment schedule

### Access Control

- Limit access to production credentials
- Implement principle of least privilege
- Regularly rotate credentials

## Success Criteria

### Security Requirements

- [ ] No hardcoded credentials in version control
- [ ] Proper validation of environment variables
- [ ] Secure credential storage in production
- [ ] Limited access to sensitive configuration

### Operational Requirements

- [ ] Application functions normally with new configuration
- [ ] Deployment process works with secure variables
- [ ] Error handling for missing configuration
- [ ] Clear documentation for developers

### Compliance Requirements

- [ ] Credentials are properly secured
- [ ] Access to sensitive data is controlled
- [ ] Audit trail for configuration changes
- [ ] Regular credential rotation capability
