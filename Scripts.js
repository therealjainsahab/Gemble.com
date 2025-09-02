#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const securityChecks = [
  {
    name: 'Dependency Vulnerabilities',
    command: 'npm audit --production',
    allowedFailures: 0
  },
  {
    name: 'Secrets Exposure',
    command: 'npx detect-secrets-hook --baseline .secrets.baseline',
    allowedFailures: 0
  },
  {
    name: 'SSL/TLS Configuration',
    command: 'npx ssl-check api.betting-platform.com',
    allowedFailures: 0
  },
  {
    name: 'Security Headers',
    command: 'npx check-headers https://www.betting-platform.com',
    allowedFailures: 1
  }
];

async function runSecurityAudit() {
  let passed = 0;
  let failed = 0;

  for (const check of securityChecks) {
    try {
      console.log(`Running ${check.name} check...`);
      execSync(check.command, { stdio: 'pipe' });
      console.log(`✅ ${check.name} passed`);
      passed++;
    } catch (error) {
      console.error(`❌ ${check.name} failed:`, error.stdout.toString());
      failed++;
      
      if (check.allowedFailures === 0) {
        process.exit(1);
      }
    }
  }

  console.log(`\nSecurity Audit Complete: ${passed} passed, ${failed} failed`);
}

runSecurityAudit();
