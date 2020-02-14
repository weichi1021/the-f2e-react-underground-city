import React from 'react';
import Doc1F from '../1F/doc.json'
import Doc2F from '../2F/doc.json'
import Doc3F from '../3F/doc.json'
import Doc4F from '../4F/doc.json'
import Doc5F from '../5F/doc.json'
import Doc6F from '../6F/doc.json'

class DocTemplate extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const doc = this.props.doc;
    return (
      <div className="doc-template">
        <div className="name">{doc.name}</div>
        <div className="content">

          <div className="sub-name">本層 BOSS 弱點</div>
          <div className="sub-content">{doc.point}</div>

          <div className="sub-name">心得</div>
          <div className="sub-content">{doc.memo}</div>

          <div className="sub-name">UI 線上設計稿</div>
          <div className="sub-content">
            <a href={doc.ui_url} target="_blank">
              <img src={require(`../../img/${doc.img}`)} alt={doc.name} className="d-inline-block" />
            </a>
          </div>

          <div className="sub-name">作品</div>
          <div className="sub-content">
            <a className="btn-primary"
              href={doc.demo_url} target="_blank">
              <span>Demo</span>
            </a>
            <a className="btn-primary reverse"
              href={doc.github_url} target="_blank">
              <span>Github</span>
            </a>
          </div>

        </div>
      </div>
    )
  }
}

class BtnPCMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.current,
      href: this.props.href,
      icon: (this.props.icon)? this.props.icon: null,
      displayName: (this.props.displayName)? this.props.displayName: null,
      fullName: this.props.fullName,
      hover: false,
    }
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }
  handleMouseOut() {
    this.setState({ hover: false })
  }
  handleMouseOver() {
    this.setState({ hover: true })
  }
  render() {
    return (
      <div className="btn-pc-menu-group">
        <button onClick={()=>{this.props.setShow(this.state.current)}}
          className="btn-pc-menu"
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}>
          {(this.state.displayName)? this.state.displayName: <i className={`fas fa-${this.state.icon}`} />}
        </button>
        {(this.state.hover)? (<span>{ this.state.fullName }</span>): null}
      </div>
    )
  }
}

class BtnMobileMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
    }
    this.btnMenu = this.btnMenu.bind(this)
    this.linkItem = this.linkItem.bind(this)
  }
  btnMenu(){
    this.setState({
      active: !this.state.active
    })
  }
  linkItem(num){
    this.props.setShow(num);
    this.setState({
      active: false
    })
  }
  render() {
    let btnMobileMenuList = this.props.stairList.map( (item, index) =>{
      return (
        <li key={`btnMobileMenu-${index}`} onClick={()=>{this.linkItem(index)}}>
        {(item.display_name)? item.display_name: <i className={`fas fa-${item.icon}`}/>} : {item.full_name}
        </li>
      )
    })
    return (
      <div className="mobile-menu">
        <button className="btn-mobile-menu" onClick={this.btnMenu}>
          <i className="fas fa-bars" />
        </button>
          {
            (this.state.active)?
            (<ul className="mobile-menu-list">{ btnMobileMenuList }</ul>): null
          }
      </div>
    )
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Vicky\'s JS 地下城',
      desc: 'JS 練攻城，一款以 React 為主的玩法，搭配刺激冒險的 RGP 主題',
    }
  }
  render() {
    return (
      <section name="home-page-main">
        <div className="title mb10">{ this.state.title }</div>
        <div className="summary mb20">{ this.state.desc }</div>
        <button onClick={()=>{this.props.setShow(1)}} className="btn-primary">
          Get Start
        </button>
        <a href="https://github.com/weichi1021/the-f2e-react-underground-city" target="_blank" className="btn-primary reverse">
          Github
        </a>
      </section>
    )
  }
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 0,
      stairList: [
        { full_name: 'Home', icon: 'home', link: false},
        { full_name: 'Multiplication Chart', display_name: 'B1', link: '/1f'},
        { full_name: 'Clock', display_name: 'B2', link: '/2f'},
        { full_name: 'Calculator', display_name: 'B3', link: '/3f'},
        { full_name: 'World Clock', display_name: 'B4', link: '/4f'},
        { full_name: 'AQI', display_name: 'B5', link: '/5f'},
        { full_name: 'Sixty Seconds Game', display_name: 'B6', link: '/6f'},
      ]
    }
  }
  setShow(num = 0) {
    console.log(num)
    this.setState({ show: num});
  }
  render() {
    return (
        <section name="home-page">
          <div className="home-page-bg"></div>
          <div className="home-page d-flex justify-content-center align-items-center">
            <div className="container prl30">
              { (this.state.show === 0)? <Main setShow={(num)=>{this.setShow(num)}} />: null }
              { (this.state.show === 1)? <DocTemplate doc={Doc1F} />: null }
              { (this.state.show === 2)? <DocTemplate doc={Doc2F} />: null }
              { (this.state.show === 3)? <DocTemplate doc={Doc3F} />: null }
              { (this.state.show === 4)? <DocTemplate doc={Doc4F} />: null }
              { (this.state.show === 5)? <DocTemplate doc={Doc5F} />: null }
              { (this.state.show === 6)? <DocTemplate doc={Doc6F} />: null }
            </div>
            <div className="right-side-mobile d-sm-none">
              <BtnMobileMenu
                stairList={this.state.stairList}
                setShow={(num)=>{this.setShow(num)}}/>
            </div>
            <div className="right-side-pc d-none d-sm-block">
              { this.state.stairList.map( (item, index) =>
                <BtnPCMenu
                  setShow={(num)=>{this.setShow(num)}}
                  current={index}
                  key={`btnPCMenu-${index}`}
                  href={item.link}
                  icon={item.icon}
                  displayName={item.display_name}
                  fullName={item.full_name} />
              )}
            </div>
          </div>
        </section>
    );
  }
}

export default HomePage;
