import requests
from requests.auth import HTTPBasicAuth
import json
import ssl
import time
import subprocess

import asyncio
import sys

async def guardia():
    subprocess.call(["python", "desk_security_guard.py"])
async def chequear():
    print("chequear pedidos a despachar")
    i=0
    while i < 1:

      url = "https://howtoservice-gse00014621.uscom-east-1.oraclecloud.com/pedidos/despachar"
      myResponse = requests.get(url,verify=False)
      jData = json.loads(myResponse.content)
      print["********************chequear"]
      if jData['resp'] == "OK" :
           print("****OK:")
           subprocess.call(["python", "05_cube_stack.py"])
           raise RuntimeError
        #  subprocess.call(["python", "01_hello_world.py"])
      time.sleep(5)

if __name__ == '__main__':
  j = 0
  while j < 1:
      try:
        #loop1 = asyncio.get_event_loop()
        #loop1.run_until_complete(guardia())
        #loop1.close()
        loop2 = asyncio.get_event_loop();
        loop2.run_until_complete(chequear())
        loop2.close()
      except KeyboardInterrupt:
        sys.exit(0)
      except:
        print ("Finalizando")
      # print("Vamos a despachar el pedido")
      # subprocess.call(["python", "05_cube_stack.py"])