#!/bin/sh

echo "::set-output name=latest_version::$(aws_cdk_update_checker)"
echo "::set-output name=foo::bar"
exit 0
