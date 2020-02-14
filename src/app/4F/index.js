import React from 'react'

class TimeZoneItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      UTC: new Date().toUTCString(),
      monthList: [
        'Jan.',
        'Feb.',
        'Mar.',
        'Apr.',
        'May.',
        'Jun.',
        'Jul.',
        'Aug.',
        'Sep.',
        'Oct.',
        'Nov.',
        'Dec.',
      ]
    }
  }
  dateDisplay(timezone) {
    const UTCaddTimezone = new Date(this.state.UTC).getTime() + (timezone*60*60*1000)
    const date = new Date(UTCaddTimezone).getUTCDate()
    const month = new Date(UTCaddTimezone).getUTCMonth()
    const year = new Date(UTCaddTimezone).getUTCFullYear()
    return `${date} ${this.state.monthList[month]} ${year}`
  }
  timeDisplay(timezone) {
    const UTCaddTimezone = new Date(this.state.UTC).getTime() + (timezone*60*60*1000)
    const hours = new Date(UTCaddTimezone).getUTCHours()
    const mins = new Date(UTCaddTimezone).getUTCMinutes()
    return `${(hours<10)? '0'+hours: hours}:${(mins<10)? '0'+mins: mins}`
  }
  isDark(timezone) {
    const UTCaddTimezone = new Date(this.state.UTC).getTime() + (timezone*60*60*1000)
    const hours = new Date(UTCaddTimezone).getUTCHours()
    return (hours>12)
  }
  render() {
    return (
      <div className={(this.isDark(this.props.utc))? 'time-zone-item dark-ver' : 'time-zone-item'}>
        <div className="row d-flex align-items-center">
          <div className="col-6">
            <div className="place-name">{this.props.name}</div>
            <div className="date">{this.dateDisplay(this.props.utc)}</div>
          </div>
          <div className="col-6 text-right">
            <div className="time">{this.timeDisplay(this.props.utc)}</div>
          </div>
        </div>
      </div>
    )
  }
}

class WorldClock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { // UTC
      list: [
        {
          name: 'Bangkok',
          utc: +7,
        },
        {
          name: 'New York',
          utc: -4,
        },
        {
          name: 'Taiwan',
          utc: +8,
        },
        {
          name: 'London',
          utc: +1,
        },
        {
          name: 'Sydney',
          utc: +10,
        },
      ],
    }
  }
  render() {
    return (
      <section name="4f" className="the-f2e-4f">
        <div className="work-clock-group">
          <div className="title">WORLD CLOCK</div>
          <div className="content">
            { this.state.list.map((item, index) => <TimeZoneItem name={item.name} utc={item.utc} key={`list-${index}`}></TimeZoneItem>) }
          </div>
        </div>
      </section>
    )
  }
}

export default WorldClock;
