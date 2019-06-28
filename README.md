Orecore Node
============

A Galactrum full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services. At the minimum a node has an interface to [Galactrum (galactrumd)](https://github.com/galactrum/galactrum) for more advanced address queries. Additional services can be enabled to make a node more useful such as exposing new APIs, running a block explorer and wallet service.

## Usages

### As a standalone server

```bash
git clone https://github.com/GAB5TER/orecore-node
cd orecore-node
npm install
./bin/orecore-node start
```

When running the start command, it will seek for a .orecore folder with a orecore-node.json conf file.
If it doesn't exist, it will create it, with basic task to connect to galactrumd.

Some plugins are available :

- Insight-API : `./bin/orecore-node addservice insight-api`
- Insight-UI : `./bin/orecore-node addservice insight-ui`

You also might want to add these index to your galactrum.conf file :
```
-addressindex
-timestampindex
-spentindex
```

### As a library

```javascript
const orecore = require('orecore-node');
const config = require('./orecore-node.json');

let node = orecore.scaffold.start({ path: "", config: config });
node.on('ready', function() {
    //Galactrum started
    glactrumd.on('tx', function(txData) {
        let tx = new orecore.lib.Transaction(txData);
    });
});
```

## Prerequisites

- Galactrum (galactrumd) with support for additional indexing *(see above)*
- Node.js v8+
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~20GB of disk storage
- ~1GB of RAM

## Configuration

Orecore includes a Command Line Interface (CLI) for managing, configuring and interfacing with your Orecore Node.

```bash
orecore-node create -d <galactrum-data-dir> mynode
cd mynode
orecore-node install <service>
orecore-node install https://github.com/yourname/helloworld
orecore-node start
```

This will create a directory with configuration files for your node and install the necessary dependencies.

Please note that [Galactrum](https://github.com/galactrum/galactrum/tree/master) needs to be installed first.

For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of Orecore:

- [Insight API](https://github.com/GAB5TER/insight-api/tree/master)
- [Insight UI](https://github.com/GAB5TER/insight-ui/tree/master)
- [Orecore Wallet Service](https://github.com/GAB5TER/orecore-wallet-service/tree/master)

## Documentation

- [Upgrade Notes](docs/upgrade.md)
- [Services](docs/services.md)
  - [Galactrumd](docs/services/galactrumd.md) - Interface to Galactrum
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.


## Setting up dev environment (with Insight)

Prerequisite : Having a galactrumd node already runing `galactrumd --daemon`.

Orecore-node : `git clone https://github.com/GAB5TER/orecore-node -b develop`
Insight-api (optional) : `git clone https://github.com/GAB5TER/insight-api -b develop`
Insight-UI (optional) : `git clone https://github.com/GAB5TER/insight-ui -b develop`

Install them :
```
cd orecore-node && npm install \
 && cd ../insight-ui && npm install \
 && cd ../insight-api && npm install && cd ..
```

Symbolic linking in parent folder :
```
npm link ../insight-api
npm link ../insight-ui
```

Start with `./bin/orecore-node start` to first generate a ~/.orecore/orecore-node.json file.
Append this file with `"insight-ui"` and `"insight-api"` in the services array.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/GAB5TER/orecore/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/GAB5TER/orecore-node/blob/master/LICENSE).

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)
