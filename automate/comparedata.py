#!/usr/bin/env python3

import sys
import re
libsdir = '../automatelibs'
sys.path.append(libsdir)


import Qcsv
import Qjson
import Qapi


if __name__ == "__main__":
  csvfilepath = "./data.csv"
  output_jsonfilepath = "./output.json"
  output_csvfilepath = "./output.csv"
  apiurl = 'http://localhost:5000/api/guest/list'
  listcsvcontent = Qcsv.readcsv(csvfilepath)
  listdbguest = Qapi.getGuestlist(apiurl).get('data').get('rows')
  
  formatted_csv_data = []
  for eachcontent in listcsvcontent:
    ##print(eachcontent)
    if eachcontent.get('Meja VIP') == "":
      gtype = "reg"
      dnumber = "-"
    else:
      gtype = "VIP"
      dnumber = eachcontent.get('Meja VIP')
    regnumber = "{:04d}".format(int(eachcontent.get('No')))
    each_data = {
      "name": eachcontent.get('Nama Undangan'),
      "shop_name": eachcontent.get('Nama Toko'),
      "num_invited": eachcontent.get('Jumlah orang'),
      "city": eachcontent.get('Cabang'),
      "guesttype": gtype,
      "desknumber": dnumber,
      "regnumber": regnumber
    }
    
    api_data = Qapi.findInDict(listdbguest, 'regnumber', regnumber)
    each_data['code'] = api_data.get('code')
    formatted_csv_data.append(each_data)

  Qjson.writejson(output_jsonfilepath, formatted_csv_data)
  Qcsv.writecsv(output_csvfilepath, formatted_csv_data)
  print(formatted_csv_data)