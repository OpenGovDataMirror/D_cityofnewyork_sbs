import $ from 'jquery'

const decorations = {
  countByLocation: {},
  extendFeature() {
    const locationKey = `${this.get('Longitude')}@${this.get('Latitude')}`
    const count = decorations.countByLocation[locationKey] || 0
    decorations.countByLocation[locationKey] = count + 1
    this.locationKey = locationKey
    this.countIdx = decorations.countByLocation[locationKey] - 1
    this.set('FACILITY_TYPE', this.getType())
    this.set('BOROUGH', this.getBorough())
    this.set(
      'search_label',
      `<b><span class="srch-lbl-lg">${this.getName()}</span></b><br>
      <span class="srch-lbl-sm">${this.getAddress1()}</span>`
    )
  },
  getCountAtLocation() {
    return decorations.countByLocation[this.locationKey]
  },
  cssClass() {
    return `${this.getType()}`.replace(/[^A-Za-z0-9\s|^_]/g, '').replace(/\s+/g, '-').toLowerCase()
  },
  getAddress1() {
    return this.get('Street_Address_1')
  },
  getAddress2() {
    return this.get('Street_Address_2')
  },
  getBorough() {
    return {
      '1': 'Manhattan',
      '2': 'Bronx',
      '3': 'Brooklyn',
      '4': 'Queens',
      '5': 'Staten Island'
    }[this.get('Boro')]
  }, 
  getCityStateZip() {
    return `${this.get('City')}, NY ${this.get('ZIP')}`
  },
  getName() {
    return this.get('Name')
  },
  getType() {
    return {
      '1': 'Business Center',
      '2': 'Workforce1 Center',
      '3': 'Industrial & Transportation Services',
    }[this.get('TypeID')]
  },
  detailsHtml() {
    const hours = this.get('Hours')
    const details = this.get('Details')
    const type = this.getType()

    const div = $('<div class="detail"></div>')
    .append(`<div><strong>Type: </strong> ${type}</div>`)
    .append(`<div><strong>Hours: </strong> ${hours}</div>`)
    
    if (details) {
      div.append(`<div><strong>Details: </strong> ${details}</div>`)
    }

    return div
  },
  nameHtml() {
    return $('<h3 class="name notranslate"></h3>')
      .append($(`<div class="ico ${this.cssClass()}"></div>`))
      .append(this.getName())
  },
}
export default decorations