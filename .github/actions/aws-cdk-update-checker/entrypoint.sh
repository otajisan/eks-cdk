#!/bin/sh

aws_cdk_update_checker 2>&1 | tee ./latest_version
latest_version=$(cat latest_version)
rm -f ./latest_version

echo "::set-output name=latest_version::$latest_version"

exit 0
