const { exec } = require("node:child_process");

function checkPostgresConnections() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write("⬜");
      checkPostgresConnections();
      return;
    }

    console.log("\n\n🟢 Postgres está pronto!!! 🟢");
  }
}

process.stdout.write(
  "\n\n⏳ Aguardando Postgres aceitar conexões\nAguardando:: ",
);
checkPostgresConnections();
