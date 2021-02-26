function() {
  const path = window.location.pathname;
  const query = window.location.href.split("?")[1] || "";
  const parts = path.split("/");
  const removed = "[removed]"

  // the search URLs contain locations which we strip out
  if(path.indexOf("/reiseplan") == 0){
    parts[2] = removed;
    parts[3] = removed;
  }

  // near you and favourites also has locations to be stripped
  else if(parts[3] == "indernaehe" || parts[3] == "gespeichertesuchen"){
    parts[1] = removed;
    parts[2] = removed;
  }

  const modifiedPath = parts.join("/");
  return window.location.protocol + "//" + window.location.host + modifiedPath + "?" + query;

};
