// scripts/set-admin-password.js
// Usage:
//   APPWRITE_ENDPOINT="https://<your-appwrite>/v1" APPWRITE_PROJECT_ID="<proj>" APPWRITE_API_KEY="<key>" node scripts/set-admin-password.js "MyNewPassword123!"

const { Client, ID, TablesDB } = require('node-appwrite');

async function run() {
  const newPassword = process.argv[2];
  if (!newPassword) {
    console.error('Usage: node scripts/set-admin-password.js <new-password>');
    process.exit(1);
  }

  const endpoint = process.env.APPWRITE_ENDPOINT || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.APPWRITE_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;

  if (!endpoint || !projectId || !apiKey) {
    console.error('Missing Appwrite environment variables. Set APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID and APPWRITE_API_KEY');
    process.exit(2);
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  const tables = new TablesDB(client);

  try {
    const existing = await tables.listRows({
      databaseId: 'main',
      tableId: 'password',
      queries: [],
    });

    if (existing.rows && existing.rows.length > 0) {
      const rowId = existing.rows[0].$id;
      await tables.updateRow({
        databaseId: 'main',
        tableId: 'password',
        rowId,
        data: { password: newPassword },
      });
      console.log('Updated admin password (rowId:', rowId + ')');
    } else {
      await tables.createRow({
        databaseId: 'main',
        tableId: 'password',
        rowId: ID.unique(),
        data: { password: newPassword },
      });
      console.log('Created admin password row.');
    }

    console.log('Done.');
  } catch (err) {
    console.error('Failed to set admin password:', err);
    process.exit(3);
  }
}

run();
