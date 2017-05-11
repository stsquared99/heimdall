# Heimdall Project

This project seeks to extend [Cloudflare](cloudflare.com). It provides granular access control, versioning, and storage of all records in MongoDB. We prefer to maintain our own central source of truth for DNS, but we really appreciate how flexible and powerful [Cloudflare](cloudflare.com) is.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need Docker, NodeJS 7, and the Yarn package manager.
```
$ node --version
v7.10.0
brew install yarn
...
$ yarn --version
0.23.4
```

### Installing

A step by step series of examples that tell you have to get a development env running

1) Clone this repo

```
$ mkdir heimdall
$ cd heimdall
$ git clone https://github.com/heimdall-project/cloudflare.git
$ cd cloudflare
```

 2) Install dependencies:

```
$ yarn
```

3) Start sample mongodb:

```
$ docker run --name mongo -p 27017:27017 -d mongo
```

4) Start heimdall:

```
$ yarn run dev
```

5) Test endpoint:

```
$ curl localhost:3000
```

## Running the tests

To test heimdall-cloudflare, simply run
```
$ yarn run test
```

## Deployment

For a real deployment, take a look at the [autopilot](https://github.com/heimdall-project/autopilot) repo.

## Built With

* [magnet](http://github.com/wedeploy/magnet) - For rapid generation of API routes and controllers
* [yarn](https://yarnpkg.com/en/) - Dependency Management

## Contributing

Please do!

Just fork this repo, clone it locally, fix some things, push back to your repo, and open a PR. 

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/heimdall-project/cloudflare/tags). 

## Authors

* **liftedkilt** - *Initial work* - [Liferay](https://github.com/Liferay)
* **mikwerdna** - *Initial work* - [Liferay](https://github.com/Liferay)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the BSD-2-Clause License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to the [WeDeploy](https://wedeploy.com) team for creating [magnet](https://github.com/wedeploy/magnet)
