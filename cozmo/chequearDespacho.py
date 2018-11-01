import requests
from requests.auth import HTTPBasicAuth
import json
import ssl
import time
import subprocess

print("chequear pedidos a despachar")
i=0
while i < 1:

 url = "https://howtoservice-gse00014621.uscom-east-1.oraclecloud.com/pedidos/despachar"
 myResponse = requests.get(url,verify=False)
 jData = json.loads(myResponse.content)
 if jData['resp'] == "OK" : 
    print("****OK:")
  #  subprocess.call(["python", "01_hello_world.py"]) 
  #  subprocess.call(["python", "05_cube_stack.py"]) 
 time.sleep(5)