# To add a new cell, type '#%%'
# To add a new markdown cell, type '#%% [markdown]'

#%%
import json
import overpass
from osmtogeojson import osmtogeojson, merge

#%% [markdown]
# ### UpdateLayer class' functions
# * get data from Overpass-API
#     * change it into geojson format
# * add _name_ and _address_ localized attributes for each feature
#     * _name_ attribute have also English and German versions
#     * _address_ attribute have the values of prior _opening_hours_, _phone_ and _capacity_ attributes (if they were defined)
# * delete unnecessary attributes (also the above mentioned ones due to their copied values)
# * localize the _address_ property's value: name of days are in German and in English too
# * each type of location has its own icon

#%%
class UpdateLayer:
    def __init__(self, bbox, query, dest_dir, name_de, name_en, iconId, iconSource, exceptions):
        self.default_name = name_de
        self.fileName = name_en.replace(" ", "")
        self.fileName = dest_dir+self.fileName+'.geojson'
        self.query = query
        self.bbox = bbox
        self.name_de = name_de
        self.name_en = name_en
        self.iconId = iconId
        self.iconSource = iconSource
        self.exceptions = exceptions
        
        self.api = overpass.API(timeout=600)
        
    def run(self):     
        bbQuery = self.modify_query(self.query, self.bbox)

        response = self.api.get(bbQuery, 'geojson', build=False)
        self.geojson_response = osmtogeojson.process_osm_json(response)
        self.write_geojson_file(self.geojson_response, self.fileName)
        
        self.data = self.open_file(self.fileName)
        self.add_properties(self.default_name, self.name_de, self.name_en)
        self.localize_description()
        self.set_default_description()
        self.add_icon(self.iconId, self.iconSource)
        self.delete_unnecessary_properties(self.exceptions)
        self.modify_file(self.geojson_response)
    
    def modify_query(self, query, bbox):
        overpass_query = query['overpass_query']
        return overpass_query.replace('{{bbox}}',self.bbox)
    
    def write_geojson_file(self, geojson_response, fileName):
         with open(self.fileName, "w") as file:
            json.dump(self.geojson_response, file)
    
    def open_file(self, fileName):
        with open(fileName) as file:
            data = json.load(file)
        return data
    
    def add_properties(self, default_name, name_de, name_en):
        for feat in self.data['features']:
            # set the name properties (localized)
            if not 'name' in feat['properties']:
                feat['properties']['name'] = default_name
            if not 'name_en' in feat['properties']:
                feat['properties']['name_en'] = name_en
            if not 'name_de' in feat['properties']:
                feat['properties']['name_de'] = name_de
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
    
    def localize_description(self):
        for feat in self.data['features']:
            if 'address_de' in feat['properties']:
                # Tu -> Di, Wed -> Mi, Th -> Do, Su -> So
                for i in feat['properties']['address_de']:
                    index = feat['properties']['address_de'].index(i)
                    i = i.replace("Tu", "Di").replace("We", "Mi").replace("Th", "Do").replace('Su', 'So')
                    feat['properties']['address_de'][index] = i
    
    def set_default_description(self):
        for feat in self.data['features']:
            feat['properties']['address'] = feat['properties']['address_de']
    
    def add_icon(self, iconId, iconSource):
        for feat in self.data['features']:
            if not 'icon' in feat['properties']:
                feat['properties']['icon'] = {}
            if not 'id' in feat['properties']['icon']:
                feat['properties']['icon']['id'] = iconID

        self.data['features'][0]['properties']['icon']['svg'] = iconSource
    
    def delete_unnecessary_properties(self, exceptions):
        if 'generator' in self.data:
            del data['generator']
        if 'copyright' in self.data:
            del data['copyright']
        for feat in self.data['features']:
            if 'generator' in feat:
                del feat['generator']
            if 'id' in feat:
                del feat['id']
            for key in list(feat['properties']):
                if not key in self.exceptions:
                    del feat['properties'][key]
    
    def modify_file(self, fileName):
        with open(self.fileName, "w") as f:
            json.dump(self.data, f, indent=2)

#%% [markdown]
# ### Default variables

#%%
exceptions = ['name', 'name_en', 'name_de', 'address', 'address_en', 'address_de', 'icon']
Stuttgart_bbox = "48.592050872804194,8.795928955078125,48.94730802864721,9.554672241210938"

#%% [markdown]
# ### Specific variables
# Before start, you have to declare the destination directory, the name of the feature (English and German), the icon and the overpass query.
# 
# In the overpass query there must be am '[out:json];' command.

#%%
dest_dir = "/home/beki/Documents/"
iconID = "taxiIcon"
iconSource = """<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t viewBox="0 0 207 207" style="enable-background:new 0 0 207 207;" xml:space="preserve">\n<path d="M193.031,101.521l-19.398-64.25C171.374,29.829,163.687,24,156.025,24H144V10c0-5.523-4.144-10-9.667-10h-63\n\tC65.81,0,61,4.477,61,10v14H50.641c-7.659,0-15.43,5.829-17.691,13.272L13.2,101.86C7.36,103.911,3,109.459,3,116v47\n\tc0,8.284,7.049,15,15.333,15H19v6.094C19,196.745,29.589,207,42.24,207h0.188C55.078,207,65,196.745,65,184.094V178h75v6.828\n\tC140,197.073,150.26,207,162.505,207h0.656c12.245,0,21.839-9.927,21.839-22.172V178h4.333c8.284,0,14.667-6.716,14.667-15v-47\n\tC204,109.054,199.439,103.228,193.031,101.521z M43.185,157.355c-10.036,0-18.172-8.136-18.172-18.172s8.136-18.172,18.172-18.172\n\ts18.172,8.136,18.172,18.172S53.221,157.355,43.185,157.355z M40.068,94l17.078-56h92.374l17.078,56H40.068z M163.118,157.355\n\tc-10.036,0-18.172-8.136-18.172-18.172s8.136-18.172,18.172-18.172s18.172,8.136,18.172,18.172S173.154,157.355,163.118,157.355z"/>"""
name_en = "Taxi stand"
name_de = "Taxistelle"
taxiQuery = {"overpass_query" : """[out:json];node [amenity=taxi] ({{bbox}}); out;"""}


#%%
taxi = UpdateLayer(Stuttgart_bbox, taxiQuery, dest_dir, name_de, name_en, iconID, iconSource, exceptions)
taxi.run()


