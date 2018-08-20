# demo-serverless

demo application using serverless framework on AWS lambdas

## get started

```sh
# pull it down
$ git clone git@github.com:heymackey/demo-serverless.git
$ cd demo-serverless

# install dependencies
$ npm install

# deploy application to AWS
$ npm run deploy
```

## hot takes

- the amount of AWS policy file knowledge required is a non-starter for non-devopsy folks
- yaml is an awful format for this level of configuration (arrays, nested keys)
