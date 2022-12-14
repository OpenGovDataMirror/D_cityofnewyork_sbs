import facilityStyle from '../src/js/facility-style'
import decorations from '../src/js/decorations'
import Icon from 'ol/style/Icon'
import Feature from 'ol/Feature'

let feature
beforeEach(() => {
  feature = new Feature({
    TypeID: '1',
    Longitude: 40.861042,
    Latitude: -73.891505,
    X: 1014289.645833,
    Y: 253102.03472200001
  })
  Object.assign(feature, decorations)
})

describe('pointStyle', () => {
  const textStyle = facilityStyle.textStyle
  
  beforeEach(() => {
    facilityStyle.textStyle = jest.fn()
  })
  afterEach(() => {
    facilityStyle.textStyle = textStyle
  })

  test('pointStyle', () => {
    expect.assertions(24)
    feature.extendFeature()
    let style, typesMap = Object.entries(facilityStyle.FACILITY_TYPE)
    typesMap.forEach((obj, i) => {
      let type = obj[0]
      let color = obj[1]
      feature.set('TypeID', i+1)
      style = facilityStyle.pointStyle(feature, 305.748113140705)
      expect(style[0].getImage() instanceof Icon).toBe(true)
      expect(style[0].getImage().getSrc()).toBe(obj[1])
      expect(style[0].getImage().getImageSize()).toEqual([facilityStyle.ICON_WIDTH, facilityStyle.ICON_WIDTH])
      expect(style[0].getImage().anchor_).toEqual([0.5,0.5]) //getAnchor() doesn't return the correct values
      expect(style[0].getImage().getOpacity()).toBe(.7)
      expect(style[0].getZIndex()).toBe(0)
    })

    expect(facilityStyle.textStyle).toHaveBeenCalledTimes(0)

    const feature2 = Object.assign(new Feature({Longitude: feature.get('Longitude'), Latitude: feature.get('Latitude'), TypeID: '1'}), decorations)
    
    feature2.extendFeature()
    
    const style2 = facilityStyle.pointStyle(feature2, 305.748113140705)

    expect(style2[0].getImage().anchor_).toEqual([0.6,0.6]) //getAnchor() doesn't return the correct values
    expect(style2[0].getZIndex()).toBe(1)

    expect(facilityStyle.textStyle).toHaveBeenCalledTimes(1)
    expect(facilityStyle.textStyle.mock.calls[0][0]).toBe(2)
    expect(facilityStyle.textStyle.mock.calls[0][1]).toBe(0.5)


  })
})
test('textStyle', () => {
  expect.assertions(8)
  const style = facilityStyle.textStyle(3, 11/18)

  expect(style.getText().getFill().getColor()).toBe('#fff')
  expect(style.getText().getFont()).toBe('bold 16px sans-serif')
  expect(style.getText().getText()).toBe('3')
  
  expect(style.getText().getTextAlign()).toBe('center')
  expect(style.getText().getScale()).toBe(11/18)
  
  expect(style.getText().getOffsetX()).toBe(-(3 - 1) * 11/18 * facilityStyle.ANCHOR_OFFSET * facilityStyle.ICON_WIDTH)
  expect(style.getText().getOffsetY()).toBe(-(3 - 1) * 11/18 * facilityStyle.ANCHOR_OFFSET * facilityStyle.ICON_WIDTH)
  
  expect(style.getZIndex()).toBe(100)
})