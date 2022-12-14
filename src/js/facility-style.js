/**
 * @module sbs/facility-style
 */
import nycOl from 'nyc-lib/nyc/ol' 
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import Fill from 'ol/style/Fill'
import Text from 'ol/style/Text'

const facilityStyle = {
  ANCHOR: 0.5,
  ANCHOR_OFFSET: 0.1,
  ICON_WIDTH: 32,
  FACILITY_TYPE: {
    'Business Center': 'img/biz.svg',
    'Workforce1 Center': 'img/wf1.svg',
    'Industrial & Transportation Services': 'img/ind.svg',
  },
  textStyle: (count, scale) => {
    const offset = -(count - 1) * scale * facilityStyle.ANCHOR_OFFSET * facilityStyle.ICON_WIDTH
    return new Style({
      text: new Text({
        fill: new Fill({color: '#fff'}),
        font: 'bold 16px sans-serif',
        text: `${count}`,
        textAlign: 'center',
        scale,
        offsetX: offset,
        offsetY: offset
      }), 
      zIndex: 100
    })
  },
  pointStyle: (feature, resolution) => {
    const scale = nycOl.TILE_GRID.getZForResolution(resolution) / 18
    const type = feature.getType()
    const count = feature.getCountAtLocation()
    const countIdx = feature.countIdx
    const anchor = facilityStyle.ANCHOR + (countIdx * facilityStyle.ANCHOR_OFFSET)

    const style = [
      new Style({
        image: new Icon({
          src: facilityStyle.FACILITY_TYPE[type],
          imgSize: [facilityStyle.ICON_WIDTH, facilityStyle.ICON_WIDTH],
          scale,
          anchor: [anchor, anchor],
          opacity: .7
        }),
        zIndex: countIdx
      })
    ]
    if (count > 1 && countIdx === count - 1) {
      style.push(facilityStyle.textStyle(count, scale))
    }
    return style
  }
}
export default facilityStyle