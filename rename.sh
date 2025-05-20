#!/usr/bin/env bash

npx react-native-rename $1 -b $2
rm -rf "${HOME}/Library/Caches/CocoaPods"
rm -rf "`pwd`/Pods/"
cd ios && npx pod update
