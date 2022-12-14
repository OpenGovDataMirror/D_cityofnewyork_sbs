import $ from 'jquery'
import decorations from '../src/js/decorations'
import Feature from 'ol/Feature'

let feature
beforeEach(() => {
  feature = new Feature({
    ID: 1,
    Name: 'Name',
    Hours: 'Hours',
    Street_Address_1: 'Address 1',
    Street_Address_2: 'Address 2',
    City: 'City',
    Boro: '1',
    State: 'NY',
    ZIP: 'ZIP',
    Details: 'Details',
    TypeID: '1',
    Longitude: 40.861042,
    Latitude: -73.891505,
    X: 1014289.645833,
    Y: 253102.03472200001
  })
  Object.assign(feature, decorations)
})

test('extendFeature', () => {
  expect.assertions(9)
  
  feature.extendFeature()

  expect(feature.locationKey).toBe(`${feature.get('Longitude')}@${feature.get('Latitude')}`)
  expect(feature.countIdx).toBe(0)

  expect(feature.get('FACILITY_TYPE')).toBe(feature.getType())
  expect(feature.get('BOROUGH')).toBe(feature.getBorough())
  expect(feature.get('search_label')).toBe(
    `<b><span class="srch-lbl-lg">${feature.getName()}</span></b><br>
      <span class="srch-lbl-sm">${feature.getAddress1()}</span>`
  )
  
  const feature2 = Object.assign(new Feature({Longitude: feature.get('Longitude'), Latitude: feature.get('Latitude')}), decorations)
  
  feature2.extendFeature()
  expect(feature.locationKey).toEqual(feature2.locationKey)
  expect(feature.countByLocation[feature.locationKey]).toBe(2) 
  expect(feature2.countByLocation[feature.locationKey]).toBe(2) 
  expect(feature2.countIdx).toBe(1)

  feature.countByLocation[feature.locationKey] = 0

})

test('getCountAtLocation', () => {
  expect.assertions(2)
  
  feature.extendFeature()
  expect(feature.getCountAtLocation()).toBe(1)

  const feature2 = Object.assign(new Feature({Longitude: feature.get('Longitude'), Latitude: feature.get('Latitude')}), decorations)
  feature2.extendFeature()
  expect(feature.getCountAtLocation()).toBe(2)

})


describe('cssClass', () => {
  test('cssClass', () => {
    expect.assertions(3)
    expect(Object.assign(new Feature({TypeID: '1'}), decorations).cssClass()).toBe('business-center')
    expect(Object.assign(new Feature({TypeID: '2'}), decorations).cssClass()).toBe('workforce1-center')
    expect(Object.assign(new Feature({TypeID: '3'}), decorations).cssClass()).toBe('industrial-transportation-services')
    
  })
})

test('getAddress1', () => {
  expect.assertions(1)
  expect(feature.getAddress1()).toBe('Address 1')
})

test('getAddress2', () => {
  expect.assertions(1)
  expect(feature.getAddress2()).toBe('Address 2')
  
})

test('getBorough', () => {
  expect.assertions(5)
  expect(Object.assign(new Feature({Boro: '1'}), decorations).getBorough()).toBe('Manhattan')
  expect(Object.assign(new Feature({Boro: '2'}), decorations).getBorough()).toBe('Bronx')
  expect(Object.assign(new Feature({Boro: '3'}), decorations).getBorough()).toBe('Brooklyn')
  expect(Object.assign(new Feature({Boro: '4'}), decorations).getBorough()).toBe('Queens')
  expect(Object.assign(new Feature({Boro: '5'}), decorations).getBorough()).toBe('Staten Island')
})

test('getCityStateZip', () => {
  expect.assertions(1)
  expect(feature.getCityStateZip()).toBe('City, NY ZIP')

})

test('getName', () => {
  expect.assertions(1)
  expect(feature.getName()).toBe('Name')

})

test('getType', () => {
  expect.assertions(3)
  expect(Object.assign(new Feature({TypeID: '1'}), decorations).getType()).toBe('Business Center')
  expect(Object.assign(new Feature({TypeID: '2'}), decorations).getType()).toBe('Workforce1 Center')
  expect(Object.assign(new Feature({TypeID: '3'}), decorations).getType()).toBe('Industrial & Transportation Services')
})

test('detailsHtml', () => {
  expect.assertions(2)
  const div = $('<div></div>') 

  div.html(feature.detailsHtml())
  expect(div.html()).toBe('<div class=\"detail\"><div><strong>Type: </strong> Business Center</div><div><strong>Hours: </strong> Hours</div><div><strong>Details: </strong> Details</div></div>')

  feature.set('Details', '')
  div.html(feature.detailsHtml())
  expect(div.html()).toBe('<div class=\"detail\"><div><strong>Type: </strong> Business Center</div><div><strong>Hours: </strong> Hours</div></div>')

})

test('nameHtml', () => {
  expect.assertions(1)
  let html = $('<h3 class="name notranslate"></h3>')
  .append($(`<div class="ico ${feature.cssClass()}"></div>`))
  .append(feature.getName())

  expect(feature.nameHtml()).toEqual(html)
}) 