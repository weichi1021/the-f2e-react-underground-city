import React from 'react';
import twCityList from './twCityList.json';
import tempAPIDate from './tempAPIDate.json';


class AQIList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: this.props.list
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({list: newProps.list})
  }
  render() {
    return (
      <div className="row no-gutters">
        {
          this.state.list.map((item, index)=> {
            return (
              <div className="col-6" key={index} onClick={ ()=>{this.props.setCity(item)} }>
                <div className={((index%2 == 0)? 'mr10 ': 'ml10 ')+'row no-gutters text-center btn-city'}>
                  <div className="col h3-b">{item.SiteName}</div>
                  <div className="col h1-b"
                    style={{ 'backgroundColor' : this.props.bgColor(item.AQI) }}>
                    {this.props.displayAQI(item.AQI)}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

class AQIDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.item
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({item: newProps.item})
  }
  render() {
    return (
      <table className="city-aqi-detail mb40">
        <thead>
          <tr className="text-center">
            <th className="h3-b">{this.state.item.SiteName}</th>
            <th className="h1-b"
              style={{ 'backgroundColor' : this.props.bgColor(this.state.item.AQI) }}>
              {this.props.displayAQI(this.state.item.AQI)}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2">
              <div className="d-flex justify-content-between list-item">
                <div>
                  <span className="h4-b pr10">臭氧</span>
                  <span className="h5">O3 (ppb)</span>
                </div>
                <div className="h4-b">{this.state.item.O3 || '--'}</div>
              </div>
              <div className="d-flex justify-content-between list-item">
                <div>
                  <span className="h4-b pr10">懸浮微粒</span>
                  <span className="h5">PM<sub>10</sub> (μg/m³)</span>
                </div>
                <div className="h4-b">{this.state.item.PM10 || '--'}</div>
              </div>
              <div className="d-flex justify-content-between list-item">
                <div>
                  <span className="h4-b pr10">細懸浮微粒</span>
                  <span className="h5">PM<sub>2.5</sub> (μg/m³)</span>
                </div>
                <div className="h4-b">{this.state.item['PM2.5'] || '--'}</div>
              </div>
              <div className="d-flex justify-content-between list-item">
                <div>
                  <span className="h4-b pr10">一氧化碳</span>
                  <span className="h5">CO (ppm)</span>
                </div>
                <div className="h4-b">{this.state.item.CO || '--'}</div>
              </div>
              <div className="d-flex justify-content-between list-item">
                <div>
                  <span className="h4-b pr10">二氧化硫</span>
                  <span className="h5">SO<sub>2</sub> (ppb)</span>
                </div>
                <div className="h4-b">{this.state.item.SO2 || '--'}</div>
              </div>
              <div className="d-flex justify-content-between list-item">
                <div>
                  <span className="h4-b pr10">二氧化氮</span>
                  <span className="h5">NO<sub>2</sub> (ppb)</span>
                </div>
                <div className="h4-b">{this.state.item.NO2 || '--'}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

class AQI extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      levelList: [
        {
          less: 50,
          range: '0～50',
          desc: '良好',
          color: '#95F084',
        },
        {
          less: 100,
          range: '51～100',
          desc: '普通',
          color: '#FFE695'
        },
        {
          less: 150,
          range: '101～150',
          desc: '對敏感族群 不健康',
          color: '#FFAF6A',
        },
        {
          less: 200,
          range: '151～200',
          desc: '對所有族群 不健康',
          color: '#FF5757',
        },
        {
          less: 300,
          range: '201～300',
          desc: '非常不健康',
          color: '#9777FF',
        },
        {
          less: 400,
          range: '301～400',
          desc: '危害',
          color: '#AD1774',
        },
      ],
      twCityList: twCityList,
      aqiList: tempAPIDate,
      paramCity: '',
      selectedList: [],
      selectedItem: {},
    }
  }
  isEmpty(val) {
    return ( (val === '') || (val === null) || (val === undefined) || (String(val).trim() === '') )
  }
  setCity(city) {
    const filterSelectedList = this.state.aqiList.filter(item=> item.County == city)
    if(filterSelectedList.length){
      this.setState({
        paramCity: city,
        selectedList: filterSelectedList,
        selectedItem: filterSelectedList[0]
      })
    }else{
      this.setState({ selectedItem: city })
    }
    console.log(this.state, filterSelectedList)
  }
  queryAQI() {
    fetch('https://cors.io/?http://opendata.epa.gov.tw/ws/Data/AQI/?$format=json')
      .then(res => res.json())
      .then(
        (response) => {
          this.setState({aqiList: response})
          console.log(this.state)
        },
        (error) => {
          console.log(error)
        }
      )
  }
  bgColor(aqi) {
    const findLevel = this.state.levelList.find(item=> {
      return (item.less - (+aqi) < 50) && (item.less - (+aqi) >= 0)
    });
    console.log((findLevel)? findLevel.color: '')
    return (findLevel)? findLevel.color: ''
  }
  displayAQI(aqi) {
    return (this.isEmpty(aqi))? '--': aqi
  }
  componentDidMount() {
    // this.queryAQI();
  }
  render() {
    return(
      <section name="5f" className="the-f2e-5f">
        {/* container */}
        <div className="container" style={{ minHeight: 'calc(100vh - 34px)' }}>
          {/* header */}
          <div className="row pt20 mb30 aqi-header">
            <div className="col-md-4 mb15">
              <div className="h2-b mb5">空氣品質指標 (AQI)</div>
              <div className="select-city-group">
                <select className="select-city h5-b" onChange={ (e)=>{this.setCity(e.target.value)} } disabled={(this.state.aqiList.length == 0)}>
                  <option value="">請選擇地區</option>
                  { this.state.twCityList.map((item, index)=> (<option value={item.value} key={index}>{item.name}</option>)) }
                </select>
              </div>
            </div>
            <div className="col-md-8">
              <table className="level-table h5-b">
                <thead>
                  <tr>
                    {
                      this.state.levelList.map((item, index)=> {
                        return (
                          <th className="range" style={{ 'backgroundColor': item.color }} key={`level-${index}`}>
                            {item.range}
                          </th>
                        )
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {
                      this.state.levelList.map((item, index)=> {
                        return (
                          <td className="desc" key={`level-${index}`}>
                            {item.desc}
                          </td>
                        )
                      })
                    }
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* content */}
          <div className="aqi-hr d-flex align-items-center">
            { (this.isEmpty(this.state.paramCity)? '': (<div className="hr-name h3-b pr15">{this.state.paramCity}</div>) ) }
            <div className="hr-border"></div>
            { (this.isEmpty(this.state.paramCity)? '': (<div className="hr-date h5-b pl15">{this.state.selectedItem.PublishTime} 更新</div>) ) }
          </div>
          {
            (this.isEmpty(this.state.paramCity) ? '' :
              (
                <div className="row aqi-content mt30">
                  <div className="col-md-4">
                    <AQIDetail
                      item={this.state.selectedItem}
                      bgColor={(aqi)=>{ return this.bgColor(aqi)}}
                      displayAQI={(aqi)=>{ return this.displayAQI(aqi)}}>
                    </AQIDetail>
                  </div>
                  <div className="col-md-8">
                    <AQIList
                      list={this.state.selectedList}
                      bgColor={(aqi)=>{ return this.bgColor(aqi)}}
                      displayAQI={(aqi)=>{ return this.displayAQI(aqi)}}
                      setCity={(val)=>{ this.setCity(val) }}>
                    </AQIList>
                  </div>
                </div>
              )
            )
          }
        </div>
        {/* footer */}
        <div className="aqi-footer">
          <div className="container d-flex justify-content-between">
            <div className="h5-b">資料來源：行政院環境保護署</div>
            <div className="h5">Copyright © 2019 HexSchool. All rights reserved.</div>
          </div>
        </div>
      </section>
    )
  }
}

export default AQI;
