let myObj // = delete comment mark and paste geojson object



// the for cycle below deletes every property that is not written in the exceptions array
let exceptions = ["name", "address","icon","name_en","name_de","address_en", "address_de"];


for(let i = 0; i < myObj.features.length; i++){

  let properties = myObj.features[i].properties;

  // deletes the properies listed below
  delete myObj.features[i].id;
  delete myObj.features[i].copyright;
  delete myObj.features[i].generator;

  for(let propertiesKey in properties){
    if(!exceptions.includes(propertiesKey)) {
      delete properties[propertiesKey];
    }
  }
}
// deletes the properies listed below
delete myObj.generator;
delete myObj.copyright;


console.log(myObj);