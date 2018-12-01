# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop orecore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/oreore-node.git
git clone git@github.com:<yourusername>/orecore-lib.git
```

To develop Galactrum or to compile from source:

```bash
git clone git@github.com:<yourusername>/galactrum.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```

## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd orecore-lib
npm install
cd ../orecore-node
npm install
```

We now will setup symlinks in `orecore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf orecore-lib
ln -s ~/orecore-lib
rm -rf galactrumd-rpc
ln -s ~/galactrumd-rpc
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd orecore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/galactrumd.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/galactrumd.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch orecore-node.json
touch package.json
```

Edit `orecore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "galactrumd",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "galactrumd": {
      "spawn": {
        "datadir": "/home/<youruser>/.galactrum",
        "exec": "/home/<youruser>/galactrum/src/galactrumd"
      }
    }
  }
}
```

**Note**: To install services [insight-api](https://github.com/GAB5TER/insight-api) and [insight-ui](https://github.com/GAB5TER/insight-ui) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/orecore-lib
ln -s ~/orecore-node
ln -s ~/insight-api
ln -s ~/insight-ui
```

Make sure that the `<datadir>/galactrum.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=user
rpcpassword=pass
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../orecore-node/bin/orecore-node start
```
