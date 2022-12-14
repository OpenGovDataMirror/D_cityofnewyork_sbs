import $ from 'jquery'
import decorations from '../src/js/decorations'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import App from '../src/js/App';
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import facilityStyle from '../src/js/facility-style'

jest.mock('nyc-lib/nyc/ol/FinderApp')
jest.mock('nyc-lib/nyc/ol/format/CsvPoint')

test('constructor', () => {
  expect.assertions(33)
  const app = new App()

  expect(app instanceof FinderApp).toBe(true)
  expect(FinderApp).toHaveBeenCalledTimes(1)

  expect(FinderApp.mock.calls[0][0].title).toBe('Small Business Services Finder')
  expect(FinderApp.mock.calls[0][0].splashOptions.message).toBe('Splash Message')
  expect(FinderApp.mock.calls[0][0].splashOptions.buttonText).toEqual(['Screen reader instructions', 'View map to find closest location'])
  expect(FinderApp.mock.calls[0][0].facilityUrl).toBe('data/center.csv')
  expect(FinderApp.mock.calls[0][0].facilityStyle).toBe(facilityStyle.pointStyle)
  expect(FinderApp.mock.calls[0][0].facilitySearch.displayField).toBe('search_label')
  expect(FinderApp.mock.calls[0][0].facilitySearch.nameField).toBe('Name')


  expect(CsvPoint).toHaveBeenCalledTimes(1)
  expect(CsvPoint.mock.calls[0][0].x).toBe('Longitude')
  expect(CsvPoint.mock.calls[0][0].y).toBe('Latitude')    
  expect(CsvPoint.mock.calls[0][0].dataProjection).toBe('EPSG:4326')
  
  expect(FinderApp.mock.calls[0][0].facilityTabTitle).toBe('Locations')

  expect(FinderApp.mock.calls[0][0].decorations).toBe(decorations)

  expect(FinderApp.mock.calls[0][0].filterChoiceOptions.length).toBe(2)
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].title).toBe('Location Type')
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices.length).toBe(3)

  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].name).toBe('FACILITY_TYPE')
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].values).toEqual(['Business Center'])
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].label).toBe('Business Center')
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].checked).toBe(true)
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].icon).toBe(true)

  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].name).toBe('FACILITY_TYPE')
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].values).toEqual(['Workforce1 Center'])
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].label).toBe('Workforce1 Center')
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].checked).toBe(true)
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].icon).toBe(true)

  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].name).toBe('FACILITY_TYPE')
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].values).toEqual(['Industrial & Transportation Services'])
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].label).toBe('Industrial & Transportation Services')
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].checked).toBe(true)
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].icon).toBe(true)

})