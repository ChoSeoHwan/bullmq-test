# ISSUE

When using the `removeOnFail:true` option, \
if failed due to stalled, \
the job is passed as undefined.

# REPRODUCE

1. install `docker` to run `redis` container
2. `yarn install`
3. `yarn start:redis`
4. `yarn start`

## RESULT

```text
job pushing...
job pubshed : 6
accept 6
failed undefined Error : job stalled more than allowable limit
```

## Comment

The `lockDuration` and `lockRenewTime` settings in the `bullmq.mjs` script are options for forcibly reproducing the situation.\
In actual use, this option is not used.
