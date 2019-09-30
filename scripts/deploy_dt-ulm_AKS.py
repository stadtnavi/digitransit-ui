# To add a new cell, type '#%%'
# To add a new markdown cell, type '#%% [markdown]'
#%%
from IPython import get_ipython

#%% [markdown]
# # Prerequisites
# For starting this script, you have to have 'az' and 'kubectl' installed. If you don't have it yet, see:
# * Azure-CLI: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-apt?view=azure-cli-latest

#%%
get_ipython().system('curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash')

#%% [markdown]
# * kubectl: https://kubernetes.io/docs/tasks/tools/install-kubectl/
#%% [markdown]
# # Start with your Azure account
# The first step is to log in. For this you have to have a valid Azure registration. The log in will pop up in a new browser tab, you have to log in manually. At the first time it will ask for your password, next time it will be more automatic.

#%%
get_ipython().system('az login')


#%%
get_ipython().system('pwd')

#%% [markdown]
# # Creating the new cluster
# For the new cluster, you have to have a new Resource Group too and then you have to attach them.
# 
# The second step (creating the new cluster) can take up to 40 minutes... (I ran it my local terminal, the notebook gives a timeout.)

#%%
get_ipython().system('az group create --name dt-vh-Rg --location westeurope')


#%%
get_ipython().system('az aks create --resource-group dt-vh-Rg --name dt-vh-cluster --node-count 2 --enable-addons monitoring --generate-ssh-keys')


#%%
get_ipython().system('az aks get-credentials --resource-group dt-vh-Rg --name dt-vh-cluster')

#%% [markdown]
# The desired output:
# 
# Merged "dt-vh-cluster" as current context in /home/beki/.kube/config
#%% [markdown]
# If everything went well, you should see all (two) nodes ready.

#%%
get_ipython().system('kubectl get nodes')

#%% [markdown]
# # Get the verschwoerhaus solution for Kubernetes usage
# You have to clone the github repo and then navigate inside the folder.

#%%
get_ipython().system('git clone git@github.com:verschwoerhaus/digitransit-kubernetes.git')


#%%
cd ./digitransit-kubernetes

#%% [markdown]
# # Create the app
# Use the all.yml file to create Services and Deployments needed.

#%%
get_ipython().system('kubectl create -f all.yml')

#%% [markdown]
# Now you have to wait a few minutes to let Kubernetes work. Check the status of the pods: the goal is to see every one is running.

#%%
get_ipython().system('kubectl get pods')


#%%
get_ipython().system('kubectl get pods')

#%% [markdown]
# Might happen that some pods are evicted - this means, they are in lack of some resource (memory for example) but no worries, they will be automatically recreated. You can delete the rest, no need them.

#%%
get_ipython().system('kubectl -n default delete pods --field-selector=status.phase=Failed')

#%% [markdown]
# # Run the app
# You are not yet able to run the app, you need the UI to have an external IP. This is not included in the YAML file, so you have to add it manually with a one-line command.
# 
# Creating the external IP will also take a few minutes.

#%%
get_ipython().system('kubectl expose deployment digitransit-ui --type=LoadBalancer --name=load-balancer-service')


#%%
get_ipython().system('kubectl get service load-balancer-service')


#%%
get_ipython().system('kubectl get service load-balancer-service')

#%% [markdown]
# As you open the gotten externalIP:port URL, the browser will show you the Digitransit Ulm version.

