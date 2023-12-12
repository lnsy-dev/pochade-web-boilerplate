export const datalist = [
  
  /*
  
    GEO MAP COMPONENT

   */
  {
    name: 'Geo Map',
    render: function(keys){
      return `
<geo-map id=${keys.ID}
  id="geo_map"
  accesstoken=${keys.GEO_MAP_ACCESS_TOKEN}
  styleurl=${keys.GEO_MAP_STYLE_URL}
  latitude= 33.86716840617632
  longitude=-118.12701323464881
  zoom=9
  bearing=0
  pitch=45
  navigation
  geolocate
  geocoder=true
>
</geo-map>`
    }
  },
  /*
  
      GENERATE NEW COMPONENT

   */
  {
    name: 'Generate New component', 
    render: function(keys){
      return `
<generate-new-component 
  id="${keys.ID}"
>
</generate-new-component>`
    }
  },

  /*
  
    GRAPH DATA

   */
  
  {
    name: 'Graph Data Visualization', 
    render: function(keys){
      return `
<graph-data 
  id="${keys.ID}"
>
  [test-1]->[test-2]
  [test-3]->[test-3]
  [test-4]->[test-1]
  [test-5]->[test-3]
</graph-data>

      `
    }
  }, 
  {
    name: 'Help',
    render: function(keys){
      return `Click this for help: #help`
    }
  }

]
