import React from 'react';

class NumberGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primaryNum: this.props.primaryNum,
      maxNum: this.props.maxNum,
    }
  }
  render() {
    let self = this.state;
    let listsLeft = [];
    let listsRight = [];
    for(let i = 1; i <= self.maxNum; i++){
      let total = self.primaryNum*i;
      let keyName = `Number-${i}`
      let template = (
        <div className="number-line" key={keyName} index={i}>
          <div>{ self.primaryNum }</div>
          <div>x</div>
          <div>{ i }</div>
          <div>=</div>
          <div className={(total < 10)? 'text-left pl5': 'text-left'}>{ total }</div>
        </div>
      );
      if(i <= 3){
        listsLeft.push(template)
      }else{
        listsRight.push(template)
      }
    }
    return (
      <div className="panel">
        <div className="content-group row no-gutters">
          <div className="col">
            <div className="title">
              { self.primaryNum }
            </div>
            { listsLeft }
          </div>
          <div className="col">{ listsRight }</div>
        </div>
      </div>
    )
  }
}

class MultiplicationChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minNum: 2,
      maxNum: 9,
    }
  }
  render() {
    const self = this.state;
    let items = [];
    for(let i = self.minNum; i <= self.maxNum; i++){
      let keyName = `NumberGroup-${i}`;
      items.push(<NumberGroup maxNum={self.maxNum} primaryNum={i} key={keyName}/>)
    }
    return (
        <section name="1f" className="the-f2e-1f">
          <div className="fe-container">
            <div className="panel">
              <div className="title-group">
                <div>
                  <span>x</span>
                  <span className="line"/>
                  <span>x</span>
                </div>
                <div className="text-center">
                  <div className="subject">九九乘法表</div>
                  <div>MULTIPLICATION CHART</div>
                </div>
                <div>
                  <span>x</span>
                  <span className="line"/>
                  <span>x</span>
                </div>
              </div>
            </div>
            { items }
          </div>
          <div className="fe-footer">
            <div className="text">
              Copyright © 2019 HexSchool. All rights reserved.
            </div>
          </div>
        </section>
    );
  }
}

export default MultiplicationChart;
