#!/bin/sh

latest_version=$1

sed -i -e "s/\"aws-cdk\": \"[0-9].[0-9].[0-9]\"/\"aws-cdk\": \"${latest_version}\"/g" ./package.json