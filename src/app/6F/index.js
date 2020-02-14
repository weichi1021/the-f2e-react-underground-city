import React from 'react';

class EndPage extends React.Component{
  constructor(props){
    super();
    this.state = {}
  }
  render() {
    return (
      <div className="end-page">

      </div>
    )
  }
}

class CalcPage extends React.Component{
  constructor(props){
    super();
    this.state = {
      seconds: 60,
      countDownVar: null,
    }
  }
  countDownDisplay() {
    const Minute = Math.floor(this.state.seconds / 60);
    const Second = this.state.seconds % 60;
    return `${(Minute<10)? '0'+Minute: Minute} : ${(Second<10)? '0'+Second: Second}`
  }
  componentDidMount() {
    const self = this;
    // var countDownVar = setInterval(() => {
    //   console.log(self.state.seconds)
    //   self.setState({ seconds: self.state.seconds-1});
    //   if(self.state.seconds == 0){
    //     clearInterval(this.state.countDownVar);
    //   }
    // }, 1000)
    // this.setState({ countDownVar: countDownVar })

  }
  componentWillReceiveProps(newProps) {
    this.setState({item: newProps.item})
  }
  render() {
    return (
      <div className="calc-page">
        <div className="d-flex justify-content-between">
          <div>
            <div className="border-white text-white h5-b">
              60 SECONDS CHALLENGE
            </div>
            <div>
              <span className="d-inline-block h5-b highlight vertical-middle">SCORE</span>
              <span className="d-inline-block h3-b vertical-middle">001</span>
            </div>
          </div>
          <div className="h2-b text-italic text-white">{this.countDownDisplay()}</div>
        </div>
        <div className="d-flex justify-content-between mt60">
          <div className="h1-b">5</div>
          <div className="h1-b text-white">x</div>
          <div className="h1-b">5</div>
          <div className="h1-b text-white">=</div>
          <div className="text-center">
            <input type="number" className="calc-input" />
            <div className="h6 text-italic text-white">press enter to answer</div>
          </div>
        </div>
      </div>
    )
  }
}

class InitPage extends React.Component{
  constructor(props){
    super();
    this.state = {}
  }
  render() {
    return (
      <div className="init-page text-center">
        <div className="d-flex align-items-center">
          <div className="h0-b text-white text-shadow pr15">60</div>
          <div className="position-relative text-left">
            <div className="h3 text-white double-underline">+−×÷</div>
            <div className="h2-b">SECONDS<br/>CHALLENGE</div>
          </div>
        </div>
        <button className="btn-default" onClick={()=>{this.props.setPage(1)}}>Start!</button>
        <div className="h6 text-italic text-white mt5">
          try to answer more as you can
        </div>
      </div>
    )
  }
}

class SixtySecGame extends React.Component{
  constructor(props){
    super();
    this.state = {
      page: 1,
    };
  }
  setPage(num) {
    this.setState({ page : num });
  }
  render() {
    return (
      <section name="6f" className="the-f2e-6f">
        { (this.state.page == 0)? (<InitPage setPage={(num)=>{this.setPage(num)}}></InitPage>): '' }
        { (this.state.page == 1)? (<CalcPage setPage={(num)=>{this.setPage(num)}}></CalcPage>): '' }
        { (this.state.page == 2)? (<EndPage setPage={(num)=>{this.setPage(num)}}></EndPage>): '' }
      </section>
    )
  }
}

export default SixtySecGame;
