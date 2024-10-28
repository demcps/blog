const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const migrationsDir = path.join(__dirname, 'prisma', 'migrations');

fs.readdir(migrationsDir, (err, files) => {
  if (err) {
    console.error('Error reading migrations directory:', err);
    return;
  }

  const migrationDirs = files.filter(file => fs.statSync(path.join(migrationsDir, file)).isDirectory());
  const lastMigrationDir = migrationDirs.sort().reverse()[0]; 
  const seedFilePath = path.join(migrationsDir, lastMigrationDir, 'seed.ts');

  if (fs.existsSync(seedFilePath)) {
    exec(`ts-node ${seedFilePath}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error executing seed file: ${stderr}`);
        return;
      }
      console.log(`Seed executed successfully:\n${stdout}`);
    });
  } else {
    console.log('No seed file found for the latest migration.');
  }
});
