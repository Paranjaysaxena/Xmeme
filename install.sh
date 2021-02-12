#!/bin/bash


# Any installation related commands
sudo apt update
sudo apt install -y nodejs
sudo apt install -y npm

# Any configuration related commands
#!/bin/bash

#
# MongoDB script
#

# Pre-req: Ubuntu Bionic (18.04) flavored distro
# Note:  To expose your server to the network, set bind to 0.0.0.0 in /etc/mongod.conf
#
# Recommended for first time users:  create a VM, ssh into it, 'wget' the raw version of this gist.

if [ -f /usr/bin/mongod ]; then
    echo "MongoDB is installed on your machine."
    kill -0 "$$" || exit
else
    echo "********************* MongoDB 4.0 INSTALL **************************"
    echo "MongoDB is is not installed."
    echo "You will be prompted several time for input during the install."
    echo "******************************************************************"
    
    wget -qO- https://www.mongodb.org/static/pgp/server-4.0.asc | sudo bash -c "apt-key add"
    
    sudo bash -c "echo deb http://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse > /etc/apt/sources.list.d/mongodb-org.list"
    sudo bash -c "apt update && apt upgrade -y"
    sudo bash -c "apt install mongodb-org -y"

    sudo bash -c "apt update && apt upgrade -y"
    sudo bash -c "apt autoremove && apt clean"
    
    sudo bash -c " mkdir /data /data/db"
        
    sudo bash -c "ufw allow proto tcp from any to any port 27017" #recommend 'from any' to local network range
    sudo bash -c "ufw enable"  
    
    sudo bash -c "systemctl enable mongod"  #enables Mongo on system startup
    sudo bash -c "service mongod start"

    echo "Username for your Mongo DB admin account (DONOT use ampersands -> @)?"
    read mongo_admin_user
    
    echo "What is the password you want to set for $mongo_admin_user (DONOT use ampersands -> @)?"
    read mongo_admin_pwd 
    
    echo "User name will be set to $mongo_admin_user and password to $mongo_admin_pwd."
    
    mongo "admin" --eval "db.createUser({'user':'$mongo_admin_user','pwd':'$mongo_admin_pwd','roles': ['userAdminAnyDatabase','readWriteAnyDatabase']})"  
    
    sudo bash -c "echo ' ' >> /etc/mongod.conf"
    sudo bash -c "echo 'security:' >> /etc/mongod.conf"
    sudo bash -c "echo '  authorization: enabled' >> /etc/mongod.conf"    
    
    sudo bash -c "service mongod restart"

    #this is just a sanity check to ensure everything worked
    mongo "yourproject-com" -u $mongo_admin_user -p --authenticationDatabase admin --eval "db.createCollection('dummy')"
    mongo -u $mongo_admin_user -p --authenticationDatabase admin --eval "db.createUser({'user':'yourproject-web-user','pwd':'passw0rd123','roles':[{'role':'dbOwner','db':'yourproject-com'}]})"
fi

echo "Script complete."