# Upgrade Notes

## From Bitcore 3.0.0 to 4.0.0

This major upgrade includes changes to indexes, API methods and services. Please review below details before upgrading.

### Indexes

Indexes include *more information* and are now also *faster*. Because of this a **reindex will be necessary** when upgrading as the address and database indexes are now a part of galactrumd with three new `galactrum.conf` options:
- `-addressindex`
- `-timestampindex`
- `-spentindex`

To start reindexing add `reindex=1` during the **first startup only**.

### Configuration Options

- The `galactrum.conf` file in will need to be updated to include additional indexes *(see below)*.
- The `datadir` option is now a part of `galactrumd` spawn configuration, and there is a new option to connect to multiple galactrumd processes (Please see [Galactrum Service Docs](services/galactrumd.md) for more details). The services `db` and `address` are now a part of the `galactrumd` service. Here is how to update `orecore-node.json` configuration options:

**Before**:
```json
{
  "datadir": "/home/<username>/.galactrum",
  "network": "livenet",
  "port": 3001,
  "services": [
    "address",
    "galactrumd",
    "db",
    "web"
  ]
}
```

**After**:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "galactrumd",
    "web"
  ],
  "servicesConfig": {
    "galactrumd": {
      "spawn": {
        "datadir": "/home/<username>/.galactrum",
        "exec": "/home/<username>/orecore-node/bin/galactrumd"
      }
    }
  }
}
```

It will also be necessary to update `galactrum.conf` settings, to include these fields:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:<port>
zmqpubhashblock=tcp://127.0.0.1:<port>
rpcallowip=127.0.0.1
rpcuser=<user>
rpcpassword=<password>
```

**Important**: Once changes have been made you'll also need to add the `reindex=1` option **only for the first startup** to regenerate the indexes. Once this is complete you should be able to remove the `orecore-node.db` directory with the old indexes.

### API and Service Changes
- Many API methods that were a part of the `db` and `address` services are now a part of the `galactrumd` service. Please see [Galactrum Service Docs](docs/services/galactrumd.md) for more details.
- The `db` and `address` services are deprecated, most of the functionality still exists. Any services that were extending indexes with the `db` service, will need to manage chain state itself, or build the indexes within `galactrumd`.
