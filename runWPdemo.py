# To add a new cell, type '#%%'
# To add a new markdown cell, type '#%% [markdown]'
#%%
from IPython import get_ipython

#%% [markdown]
# # Prerequisites
#%% [markdown]
# Using OKD and Kubernetes requires to have OKD, OpenShift and Docker downloaded.
#%% [markdown]
# # Create and open new cluster
#%% [markdown]
# The easiest way to start the cluster (will take a while):

#%%
get_ipython().system('oc cluster up')

#%% [markdown]
# You can open the web console if you'd like but it is not necessary for any further steps.
#%% [markdown]
# ## Log in
# For further actions, you have to be logged in. Now the user is your choice. You can log in as:
# * a basic-user. Give any username and any password, it will create a new user. Note that if you create any projects only the creator user and the administrator will be able to manage it.

#%%
get_ipython().system('oc login -u=test -p=test')

#%% [markdown]
# * the administrator. There is no password, you have to use another command for that.
# 
# (If it doesn't work at first shut the cluster down, run the openshift for a few seconds and then rebuild the cluster.)
# 
# You'll see all the projects you can reach through the admin user.

#%%
get_ipython().system('oc login -u system:admin')

#%% [markdown]
# # Create new project

#%%
get_ipython().system('oc new-project <projectName>')

#%% [markdown]
# You can list all your projects:

#%%
get_ipython().system('oc get project')

#%% [markdown]
# Between projects you can move:

#%%
get_ipython().system('oc project <projectName>')

#%% [markdown]
# # Create the WP app
#%% [markdown]
# Move somewhere you would like to create all your files:

#%%
get_ipython().system('mkdir /home/beki/Documents/wp_demo/')


#%%
cd /home/beki/Documents/wp_demo/


#%%
get_ipython().system('pwd')

#%% [markdown]
# For the WP demo, you have to create some yaml files. These are responsible for creating Services, Deployments, PersistentVolumes and PVClaims. You can modify them but that's not necessary.
# 
# I used Sublime Text Editor but you can choose your own method.

#%%
get_ipython().system('subl wordpress-deployment.yaml')

apiVersion: v1
kind: Service
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  ports:
    - port: 80
  selector:
    app: wordpress
    tier: frontend
  type: LoadBalancer
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: wp-pv-claim
  labels:
    app: wordpress
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
---
apiVersion: apps/v1 # for versions before 1.9.0 use apps/v1beta2
kind: Deployment
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: frontend
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: wordpress
        tier: frontend
    spec:
      containers:
      - image: wordpress:5.2.3-php7.1-apache
        name: wordpress
        env:
        - name: WORDPRESS_DB_HOST
          value: wordpress-mysql
        - name: WORDPRESS_DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-pass
              key: password
        ports:
        - containerPort: 80
          name: wordpress
        volumeMounts:
        - name: wordpress-persistent-storage
          mountPath: /var/www/html
      volumes:
      - name: wordpress-persistent-storage
        persistentVolumeClaim:
          claimName: wp-pv-claim
#%%
get_ipython().system('subl mysql-deployment.yaml')

apiVersion: v1
kind: Service
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
spec:
  ports:
    - port: 3306
  selector:
    app: wordpress
    tier: mysql
  clusterIP: None
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pv-claim
  labels:
    app: wordpress
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
---
apiVersion: apps/v1 # for versions before 1.9.0 use apps/v1beta2
kind: Deployment
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: mysql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: wordpress
        tier: mysql
    spec:
      containers:
      - image: mysql:5.6
        name: mysql
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-pass
              key: password
        ports:
        - containerPort: 3306
          name: mysql
        volumeMounts:
        - name: mysql-persistent-storage
          mountPath: /var/lib/mysql
      volumes:
      - name: mysql-persistent-storage
        persistentVolumeClaim:
          claimName: mysql-pv-claim#%% [markdown]
# And also create a PersistentVolume yaml:

#%%
get_ipython().system('subl pv.yaml')

kind: PersistentVolume
apiVersion: v1
metadata:  
  name: persistent-storage  
  labels:    
    type: local
spec:  
  storageClassName: manual  
  capacity:    
    storage: 4Gi  
  persistentVolumeReclaimPolicy: Recycle  
  accessModes:
    - ReadWriteOnce  
  hostPath:    
    path: "/var/lib/pv1"
---
kind: PersistentVolume
apiVersion: v1
metadata:  
  name: persistent-storage-wp
  labels:    
    type: local
spec:  
  storageClassName: manual  
  capacity:    
    storage: 2Gi  
  persistentVolumeReclaimPolicy: Recycle  
  accessModes:
    - ReadWriteOnce  
  hostPath:    
    path: "/var/lib/pv2"#%% [markdown]
# As you can see if look through these YAML files, the mysql-development uses a password. Kubernetes is able to set such secrets, you have to add it too.
# 
# You can check if it was successful with 'oc get secrets'.

#%%
get_ipython().system('oc create secret generic mysql-pass --from-literal=password=<yourPassword>')
get_ipython().system('oc get secrets')

#%% [markdown]
# For creating PV, you have to be logged in as administrator!

#%%
get_ipython().system('oc login -u system:admin')


#%%
get_ipython().system('oc create -f pv.yaml')


#%%
get_ipython().system('oc create -f mysql-deployment.yaml')


#%%
get_ipython().system('oc create -f wordpress-deployment.yaml')

#%% [markdown]
# # Run the project
# Wait a few seconds so everything can work out and then run the following command:

#%%
get_ipython().system('oc status --suggest')

#%% [markdown]
# If any of the pods stucks and won't be 1/1 (it stays in Pending status), you can run the 'oc describe pods podName' and in the Events section see the description of the problem. (Without the podName tag, you'll see all the pods. If there's only two as in this case, it's okay, else it could be hard to read.)
#%% [markdown]
# If you'd like to know the names of the pods, you can get them easily.

#%%
get_ipython().system('oc get pods')


#%%
get_ipython().system('oc describe pods wordpress-f5554c645-dc44k')

#%% [markdown]
# If any of the pods is crash-looping, you'll see a command in the 'oc status' suggestions:

#%%
get_ipython().system('oc adm policy add-scc-to-user anyuid -n <projectName> -z default')

#%% [markdown]
# You can also get a look at the logs of any pod:

#%%
get_ipython().system('oc logs <podName> -c <deploymentName>')

#%% [markdown]
# If the problem didn't disappear, you shall try to recreate the pods. It is easy to make with only deleting them: they will be regenerated automatically.

#%%
get_ipython().system('oc delete pods --all')


#%%
get_ipython().system('oc status')

#%% [markdown]
# ### Now you can see an URL by the wordpress deployment. Copy it to your browser and congratulations!
# If something went wrong, you shall try to restart (get a blank project). Sometimes Apache can create problems which I don't quite understand why.
#%% [markdown]
# # Get a blank project
# The PersistentVolumes are across projects so if you'd like to start over, you should delete them. Deleting PVs are connected to deleting PVCs, none of them can be done without the other.
#%% [markdown]
# You are able to get all the resources you've created (except for PVs):

#%%
get_ipython().system('oc get all')

#%% [markdown]
# At deletions I use the --all flag since I want everything to go. You can add the names of the resources instead if only one is problematic.

#%%
get_ipython().system('oc delete deployment --all')
get_ipython().system('oc delete service --all')
get_ipython().system('oc delete pods --all')
get_ipython().system('oc delete pvc --all')

#%% [markdown]
# Now it should be empty:

#%%
get_ipython().system('oc get all')

#%% [markdown]
# Without the PVCs the PVs status should be available. You can check it:

#%%
get_ipython().system('oc get pv')

#%% [markdown]
# If you'd like to delete them too, you have to specify the deletion with their names:

#%%
get_ipython().system('oc delete pv persistent-storage')
get_ipython().system('oc delete pv persistent-storage-wp')

#%% [markdown]
# That's it, now your project is as clean as it was before starting!
# 
# You can also delete the project if you'd like. (This will take a few seconds.)

#%%
get_ipython().system('oc delete project wp-xmpl')

#%% [markdown]
# # Shut down
#%% [markdown]
# This command stops the container running OpenShift on Docker and associated containers. (This will take a while.)

#%%
get_ipython().system('oc cluster down')

#%% [markdown]
# You can check whether it was successful. The status shouldn't be reachable when the cluster is down.

#%%
get_ipython().system('oc status')


