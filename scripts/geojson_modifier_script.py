# To add a new cell, type '#%%'
# To add a new markdown cell, type '#%% [markdown]'
#%% [markdown]
# # Use JSON in Python
# We have to import the json module which has implemented methods for using JSON files in Python.

#%%
import json

#%% [markdown]
# # Set variables
# The most convenient way to reuse this script is to define all of the variables at the beginning.
# * Give the path of the source file and the destination file. These two can be the same.
# * Set the ID of the icon which will be displayed at each point.
# * Add the SVG file as the iconSource.
# * Set default name property value. For those features which doesn't have a unique name, we'll set one, so it won't be left blank. (For localization we need both English and German name values. If the name is given without a $locale, it will be the default fallback.

#%%
source_file = "/home/misi/Work/mfdz/digitransit-ui/static/assets/geojson/Point/stuttgart_taxi.geojson"
dest_file = source_file
iconID = "taxiIcon"
iconSource = """<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t viewBox="0 0 207 207" style="enable-background:new 0 0 207 207;" xml:space="preserve">\n<path d="M193.031,101.521l-19.398-64.25C171.374,29.829,163.687,24,156.025,24H144V10c0-5.523-4.144-10-9.667-10h-63\n\tC65.81,0,61,4.477,61,10v14H50.641c-7.659,0-15.43,5.829-17.691,13.272L13.2,101.86C7.36,103.911,3,109.459,3,116v47\n\tc0,8.284,7.049,15,15.333,15H19v6.094C19,196.745,29.589,207,42.24,207h0.188C55.078,207,65,196.745,65,184.094V178h75v6.828\n\tC140,197.073,150.26,207,162.505,207h0.656c12.245,0,21.839-9.927,21.839-22.172V178h4.333c8.284,0,14.667-6.716,14.667-15v-47\n\tC204,109.054,199.439,103.228,193.031,101.521z M43.185,157.355c-10.036,0-18.172-8.136-18.172-18.172s8.136-18.172,18.172-18.172\n\ts18.172,8.136,18.172,18.172S53.221,157.355,43.185,157.355z M40.068,94l17.078-56h92.374l17.078,56H40.068z M163.118,157.355\n\tc-10.036,0-18.172-8.136-18.172-18.172s8.136-18.172,18.172-18.172s18.172,8.136,18.172,18.172S173.154,157.355,163.118,157.355z"/>"""
default_name_en = "Taxi stand"
default_name_de = "Taxistelle"


#%%
default_name = default_name_de

#%% [markdown]
# Have to read our file into the buffer so we can work on it.

#%%
with open(source_file) as file:
    data = json.load(file)

#%% [markdown]
# Check how many features, locations we have. This information can help to check how many modifications we made (if interested).

#%%
amount_of_locations = len(data['features'])
print(amount_of_locations)

#%% [markdown]
# # Modify the source data
# ### Can add new properties:
# * name (default, English, German) has to be defined
# * address (English, German) has to be defined
#     * capacity
#     * opening hours
#     * phone number
#     * ... ?
# 
# Name will be shown in bold in the popup label on the UI, the address will be shown as description below.

#%%
for feat in data['features']:
    # set the name properties (localized)
    if not 'name' in feat['properties']:
        feat['properties']['name'] = default_name
    if not 'name_en' in feat['properties']:
        feat['properties']['name_en'] = default_name_en
    if not 'name_de' in feat['properties']:
        feat['properties']['name_de'] = default_name_de
    # if not yet exists, create the address properties; if exists, make them empty dictionaries (localized)
    feat['properties']['address'] = []
    feat['properties']['address_de'] = []
    feat['properties']['address_en'] = []
    # add some important properties to the address property (to be displayed)
    if 'capacity' in feat['properties']:
        feat['properties']['address_de'].append('kapazität: ' + feat['properties']['capacity'] + ', ')
        feat['properties']['address_en'].append('capacity: ' + feat['properties']['capacity']+ ', ')
    if 'opening_hours' in feat['properties']:
        feat['properties']['address_de'].append('öffnungszeiten: ' + feat['properties']['opening_hours']+ ', ')
        feat['properties']['address_en'].append('opening hours: ' + feat['properties']['opening_hours']+ ', ')
    if 'phone' in feat['properties']:
        feat['properties']['address_de'].append('telefon: ' + feat['properties']['phone'])
        feat['properties']['address_en'].append('phone: ' + feat['properties']['phone'])

#%% [markdown]
# ### and delete all the unnecessary properties
# * such as the creator of the data
# * "bicycle"
# * "car"
# * ...

#%%
exceptions = ['name', 'name_en', 'name_de', 'address', 'address_en', 'address_de', 'icon']
del data['generator']
del data['copyright']
for feat in data['features']:
    if 'id' in feat:
        del feat['id']
    for key in list(feat['properties']):
        if not key in exceptions:
            del feat['properties'][key]

#%% [markdown]
# ### Localize the opening hours property

#%%
for feat in data['features']:
    if 'address_de' in feat['properties']:
        # Tu -> Di, Wed -> Mi, Th -> Do, Su -> So
        for i in feat['properties']['address_de']:
            index = feat['properties']['address_de'].index(i)
            i = i.replace("Tu", "Di").replace("We", "Mi").replace("Th", "Do").replace('Su', 'So')
            feat['properties']['address_de'][index] = i

#%% [markdown]
# ### Set German description as default

#%%
for feat in data['features']:
    feat['properties']['address'] = feat['properties']['address_de']

#%% [markdown]
# ### Add the icons:
# 1. By default there is no given icon property, so for further use we have to create it as a list.
# 2. The iconID will be the same for every feature in the same collection.
# 3. The SVG raw data will be set only among the first feature's properties, this way we can avoid data multiplication. We have to modify only the first feature's icon.svg property.

#%%
for feat in data['features']:
    if not 'icon' in feat['properties']:
        feat['properties']['icon'] = {}
    if not 'id' in feat['properties']['icon']:
        feat['properties']['icon']['id'] = iconID

data['features'][0]['properties']['icon']['svg'] = iconSource

#%% [markdown]
# # Save the new file
# * dump parses JSON from the Python dictionary
# * indent makes the files readable (the value is the number of spaces at each indentation)

#%%
with open(dest_file, "w") as f:
    json.dump(data, f, indent=2)


