#!/usr/bin/env python3
import json

def writejson(jsonpath, dictdata):
  with open(jsonpath, 'w') as json_file:  
    json.dump(dictdata, json_file)