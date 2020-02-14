import React from 'react';

class Clock extends React.Component {
  initTime() {
    const currentTime = new Date();
    const getHours = (currentTime.getHours()>12)? currentTime.getHours()-12 :currentTime.getHours();
    const getMinutes = currentTime.getMinutes();
    const getSeconds = currentTime.getSeconds();
    const hoursDeg = (getHours*60+getMinutes)*0.5;
    const minutesDeg = getMinutes*6;
    const secondsDeg = getSeconds*6;
    document.querySelector('.hour-hand').style.setProperty('transform', `rotate(${hoursDeg}deg`);
    document.querySelector('.minute-hand').style.setProperty('transform', `rotate(${minutesDeg}deg`);
    document.querySelector('.second-hand').style.setProperty('transform', `rotate(${secondsDeg}deg`);
    console.log(currentTime, getHours, getMinutes, getSeconds)
  }
  render() {
    // this.initTime();
    let minuteList = [];
    for(let i = 1; i <= 60; i++){
      let keyName = `scale-${i}`
      let hours = Math.floor(i/5)+1;
      let template = (
        <div className="clock-fixed" key={keyName}>
          { (i%5 == 1)
            ?
            <div className="hour-group">
              <div className="hour-pm">{hours+12}</div>
              <div className="hour-am">
                {(hours<10)? `${hours} ` : hours}
              </div>
            </div>
            : null}
          <div className="clock-scale"></div>
        </div>
      );
      minuteList.push(template)
    }
    return (
      <section name="2f" className="the-f2e-2f">
        <div className="clock-group">
          <div className="clock-circle">
            { minuteList }
          </div>
          <div className="hour-hand"></div>
          <div className="minute-hand"></div>
          <div className="second-hand"></div>
        </div>
      </section>
    )
  }
  componentDidMount() {
    this.initTime();
    setInterval(()=>{
      this.initTime();
    }, 1000)
  }
}

export default Clock;
