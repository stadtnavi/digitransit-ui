# To add a new cell, type '#%%'
# To add a new markdown cell, type '#%% [markdown]'
#%%
from IPython import get_ipython

#%% [markdown]
# # Prerequsities
# For these steps, you have to have 'openshift' and 'oc' installed.
#%% [markdown]
# # Start the cluster and have the new project

#%%
get_ipython().system('oc cluster up')


#%%
get_ipython().system('oc config current-context')

#%% [markdown]
# If you have something else there in the middle, you should run the following command in oder to use the OKD console.

#%%
get_ipython().system('oc config set-cluster 127-0-0-1:8443')


#%%
get_ipython().system('oc login -u test -p test')


#%%
get_ipython().system('oc new-project p-dt-vh')


#%%
get_ipython().system('oc login -u system:admin')


#%%
get_ipython().system('oc adm policy add-scc-to-user anyuid P-dt-vh -z default')

#%% [markdown]
# # Get the verschwoerhaus solution for Kubernetes usage
# You have to clone the github repo and then navigate inside the folder.

#%%
get_ipython().system('pwd')


#%%
get_ipython().system('git clone git@github.com:verschwoerhaus/digitransit-kubernetes.git')


#%%
cd ./digitransit-kubernetes

#%% [markdown]
# # Create the app
# Use the all.yml file to create Services and Deployments needed.

#%%
get_ipython().system('oc create -f all.yml')

#%% [markdown]
# # Run the app
# Creating was fast but running might take a few minutes. You have to wait until all resources become "1 pod".

#%%
get_ipython().system('oc status')

#%% [markdown]
# And all you need is the Cluster-IP:port URL of the UI. Open it in your browser and see it running.

#%%
get_ipython().system('oc get service digitransit-ui-ulm')

#%% [markdown]
# # Shut the cluster down

#%%
get_ipython().system('oc cluster down')


