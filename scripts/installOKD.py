# To add a new cell, type '#%%'
# To add a new markdown cell, type '#%% [markdown]'
#%%
from IPython import get_ipython

#%% [markdown]
# # Installing OKD in local machine
#%% [markdown]
# You have to visit the page https://github.com/openshift/origin/releases and download the appropriate binary.
# I recommend openshift-origin-server-v3.11.0-0cbc58b-linux-64bit.
# Then move to the downloads directory.

#%%
cd ~/Downloads

#%% [markdown]
# Untar the file:

#%%
get_ipython().system('tar xvzf openshift-origin-server-v3.11.0-0cbc58b-linux-64bit.tar.gz')

#%% [markdown]
# Get into the newly made folder:

#%%
cd ./openshift-origin-server-v3.11.0-0cbc58b-linux-64bit

#%% [markdown]
# You have to make some path variables.

#%%
get_ipython().system('export PATH="$(pwd)":$PATH')


#%%
get_ipython().system('export KUBECONFIG="$(pwd)"/openshift.local.config/master/admin.kubeconfig')


#%%
get_ipython().system('export CURL_CA_BUNDLE="$(pwd)"/openshift.local.config/master/ca.crt')


#%%
get_ipython().system('sudo chmod +r "$(pwd)"/openshift.local.config/master/admin.kubeconfig')

#%% [markdown]
# The OKD CLI is availabe only in this folder but you should make is global.

#%%
get_ipython().system('sudo cp oc /usr/local/bin/')

#%% [markdown]
# If everything's alright, you should be able to run this command:

#%%
get_ipython().system('oc')

#%% [markdown]
# You might need some additional commands in the future so add them to your bin too. (It can be added later if needed.)

#%%
get_ipython().system('sudo cp kubectl /usr/local/bin/')


#%%
get_ipython().system('sudo cp openshift /usr/local/bin/')

#%% [markdown]
# The last step of setting up is:
# This is a forever-running command, so you only have to start it for some initializations, will launch the server.

#%%
get_ipython().system('openshift start master')

#%% [markdown]
# You have to modify the /lib/systemd/system/docker.service file as the following:
# 1. find the line starting as "ExecStart"
# 2. add the flag: --insecure-registry 172.30.0.0/16
# 3. save
# 
# You probably need your password for making this change.

#%%
cd /lib/systemd/system/


#%%
get_ipython().system('more docker.service')

#%% [markdown]
# Look up for the docker infos. If you see the added insecure registry (at the end), everything will be fine.

#%%
get_ipython().system('docker info')

#%% [markdown]
# It is also important to be able to use the 'docker' command without sudo. Achieving this, you have to run the following (with your username of course).
# With the 'id' command you can check whether your changes were successful.

#%%
get_ipython().system('sudo groupadd docker')
get_ipython().system('sudo usermod -a -G docker <userName>')
get_ipython().system('id')


#%%



