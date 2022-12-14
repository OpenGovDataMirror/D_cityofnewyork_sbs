import $ from 'jquery'
import decorations from './decorations'
import facilityStyle from './facility-style'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'

const filters = [{
  title: 'Location Type',
  choices: [
    {name: 'FACILITY_TYPE', values: ['Business Center'], label: 'Business Center', checked: true, icon: true},
    {name: 'FACILITY_TYPE', values: ['Workforce1 Center'], label: 'Workforce1 Center', checked: true, icon: true},
    {name: 'FACILITY_TYPE', values: ['Industrial & Transportation Services'], label: 'Industrial & Transportation Services', checked: true, icon: true},
  ]
  },
  {
  title: 'Borough',
  choices: [
    {name: 'BOROUGH', values: ['Manhattan'], label: 'Manhattan', checked: true},
    {name: 'BOROUGH', values: ['Bronx'], label: 'Bronx', checked: true},
    {name: 'BOROUGH', values: ['Brooklyn'], label: 'Brooklyn', checked: true},
    {name: 'BOROUGH', values: ['Queens'], label: 'Queens', checked: true},
    {name: 'BOROUGH', values: ['Staten Island'], label: 'Staten Island', checked: true}
  ]
  },
]
class App extends FinderApp {
  constructor() {
    super({
      title: 'Small Business Services Finder',
      facilityTabTitle: 'Locations',
      splashOptions: {      
        message: 'Splash Message',
        buttonText: ['Screen reader instructions', 'View map to find closest location']
      },
      geoclientUrl: 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example',
      facilityUrl: 'data/center.csv',
      facilityStyle: facilityStyle.pointStyle,
      facilitySearch: { displayField: 'search_label', nameField: 'Name'},
      facilityFormat: new CsvPoint({
        x: 'Longitude',
        y: 'Latitude',
        dataProjection: 'EPSG:4326'
      }),
      filterChoiceOptions: filters,
      decorations: decorations,
      directionsUrl: 'https://maps.googleapis.com/maps/api/js?&sensor=false&libraries=visualization'
    })
  }
}
export default App