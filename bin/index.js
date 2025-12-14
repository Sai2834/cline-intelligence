#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { analyzeCodebase, generateCodeRabbitConfig, runRealClineReview } from '../src/agent.js';

const program = new Command();

program
  .name('cline-intelligence')
  .description('Autonomous Agent using Cline & CodeRabbit')
  .version('1.0.0');

// ANALYZE COMMAND
program
  .command('analyze')
  .description('Analyze repo structure')
  .action(async () => {
    const spinner = ora('Scanning codebase...').start();
    const stats = await analyzeCodebase();
    // Fake delay for realism
    setTimeout(() => {
        spinner.succeed(chalk.green('Analysis Complete.'));
        console.log(chalk.blue(`• Project Type: ${stats.type}`));
        console.log(chalk.blue(`• Files Found: ${stats.total}`));
    }, 1500);
  });

// CONFIGURE COMMAND
program
  .command('configure')
  .description('Generate CodeRabbit Config')
  .action(async () => {
    const spinner = ora('Generating YAML config...').start();
    await generateCodeRabbitConfig();
    setTimeout(() => {
        spinner.succeed(chalk.green('✔ Created coderabbit.yaml'));
    }, 1000);
  });

// REVIEW COMMAND
program
  .command('review')
  .description('Run AI Code Review')
  .option('-t, --tone <type>', 'Set AI personality', 'standard')
  .action(async (options) => {
    console.log(chalk.blue('🚀 Waking up Cline Agent...'));
    const spinner = ora(`Agent is reading code (Tone: ${options.tone})...`).start();
    
    // Call the Logic
    const report = await runRealClineReview(options.tone);
    
    spinner.stop();
    console.log(chalk.white(report));
  });

program.parse(process.argv);