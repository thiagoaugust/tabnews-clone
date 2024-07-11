import database from "../../../../infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseResultVersion = await database.query("SHOW server_version;");
  const databaseVersion = databaseResultVersion.rows[0].server_version;

  const databaseResultMaxConnections = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnections =
    databaseResultMaxConnections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResults = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnections =
    databaseOpenedConnectionsResults.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependecies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConnections),
        opened_connections: databaseOpenedConnections,
      },
    },
  });
}

export default status;
