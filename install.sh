#!/bin/bash


# Any installation related commands
sudo apt update
sudo apt install -y nodejs
sudo apt install -y npm

# Any configuration related commands
#!/bin/bash

sudo apt-get install -y mongodb
sudo systemctl start mongod
sudo systemctl enable mongod