import React from 'react'

const PLUS = '+';
const MINUS = '-';
const TIMES = '×';
const DIVIDE = '÷';
const EQUAL = '=';

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      icon: {
        plus: PLUS,
        minus: MINUS,
        times: TIMES,
        divide: DIVIDE,
        equal: EQUAL,
      },
      markList: [PLUS, MINUS, TIMES, DIVIDE],
      btnList: [
        '7', '8', '9', DIVIDE,
        '4', '5', '6', TIMES,
        '1', '2', '3', PLUS,
        '0', '00', '.', MINUS
      ],
      calcList: [0],
      input: 0,
      clickMark: false,
      msg: null,
    }
    this.btnNumber = this.btnNumber.bind(this);
    this.numFormat = this.numFormat.bind(this);
  }
  btnNumber(num) {
    const input = this.state.input;
    const calcListEnd = this.state.calcList[this.state.calcList.length-1];
    const hasMark = (this.state.markList.indexOf(calcListEnd) !== -1);
    const hasEqual = (calcListEnd === this.state.icon.equal);
    const hasDot = (calcListEnd.toString().indexOf('.') !== -1)
    console.log(calcListEnd, num, hasMark)
    if(hasDot && num == '.') return
    if(hasMark){
      let output = (num == '.')? ('0' + num) : (+num).toString();
      this.setState({
        input: output,
        calcList: [...this.state.calcList, output]
      })
    }else if(hasEqual){
      this.setState({
        input: num,
        calcList: [num]
      })
    }else{
      if(!this.verifyNumber()) return
      let output = (+calcListEnd === 0 && num !== '.' && !hasDot)? (+input + +num).toString() : (input + num);
      this.state.calcList.splice(this.state.calcList.length-1, 1, output);
      this.setState({
        input: output,
        calcList: this.state.calcList
      })
    }
    console.log(num, this.state.calcList)
  }
  btnMark(mark) {
    const calcListEnd = (this.state.calcList.length)? this.state.calcList[this.state.calcList.length-1] : null;
    const hasMark = (this.state.markList.indexOf(calcListEnd) !== -1);
    const hasEqual = (calcListEnd === this.state.icon.equal);
    const dotIndex = this.state.input.toString().indexOf('.');
    if((dotIndex !== -1) && dotIndex == (this.state.input.toString().length-1)) return
    if(hasMark){
      this.state.calcList.splice(this.state.calcList.length-1, 1, mark);
      this.setState({ calcList: this.state.calcList })
    }else if(hasEqual){
      this.setState({ calcList: [this.state.input, mark] })
    }else{
      this.setState({ calcList: [...this.state.calcList, mark] })
    }
    console.log(mark, this.state.calcList)
  }
  btnDelete(num) { // 1 == Back; 2 == AC
    if(+num == 1) {
      let length = this.state.input.length;
      let output = this.state.input.slice(0, length-1)
      this.setState({input: (length == 1)? 0: output})
    }else if(+num == 2){
      this.setState({
        input: 0,
        calcList: [0]
      })
    }
  }
  btnCalc() {
    const calcListEnd = (this.state.calcList.length)? this.state.calcList[this.state.calcList.length-1] : null;
    const hasEqual = (calcListEnd === this.state.icon.equal);
    if(hasEqual || this.state.calcList.length < 2){
      return
    }else{
      this.setState({ calcList: [...this.state.calcList, this.state.icon.equal] })
      this.calcTotal();
    }
  }
  calcDot(A, B, mark) {
    const strA = A.toString();
    const strB = B.toString();
    let dotBefore = 0;
    let dotAfter = 0;
    switch(mark) {
      case this.state.icon.plus:
        dotBefore = +strA.split('.')[0] + +strB.split('.')[0];
        dotAfter = +strA.split('.')[1] + +strB.split('.')[1];
        break;
      case this.state.icon.minus:
        dotBefore = +strA.split('.')[0] - +strB.split('.')[0];
        dotAfter = +strA.split('.')[1] - +strB.split('.')[1];
        break;
      case this.state.icon.times:
        dotBefore = +strA.split('.')[0] * +strB.split('.')[0];
        dotAfter = +strA.split('.')[1] * +strB.split('.')[1];
        break;
      case this.state.icon.divide:
        dotBefore = +strA.split('.')[0] / +strB.split('.')[0];
        dotAfter = +strA.split('.')[1] / +strB.split('.')[1];
        break;
      default:
        dotBefore = 0;
        dotAfter = 0;
    }
    return dotBefore+'.'+dotAfter
  }
  calcTotal() {
    let calcList = this.state.calcList;
    let filterIconList = this.state.calcList
                          .filter(item => this.state.markList.indexOf(item) !== -1)
                          .sort((Back, First)=> {
                            if (Back == this.state.icon.times || Back == this.state.icon.divide) {
                              return -1;
                            }
                            if (Back == this.state.icon.plus || Back == this.state.icon.minus) {
                              return 1;
                            }
                            return 0;
                          });
    const filterIconListLength = filterIconList.length;
    let total = 0;
    for(let i = 0; i < filterIconListLength; i++) {
      let item = filterIconList[i];
      let index = calcList.indexOf(item);
      let front = +calcList[index-1];
      let end = +calcList[index+1];
      let frontHasDot = (front.toString().indexOf('.') !== -1);
      let endHasDot = (end.toString().indexOf('.') !== -1);
      switch(item) {
        case this.state.icon.plus:
          total = (frontHasDot && endHasDot)? this.calcDot(front, end, this.state.icon.plus): (front + end);
          break;
        case this.state.icon.minus:
          total = (frontHasDot && endHasDot)? this.calcDot(front, end, this.state.minus): (front - end);
          break;
        case this.state.icon.times:
          total = (frontHasDot && endHasDot)? this.calcDot(front, end, this.state.times): (front * end);
          break;
        case this.state.icon.divide:
          total = (frontHasDot && endHasDot)? this.calcDot(front, end, this.state.divide): (front / end);
          break;
        default:
          total = 0;
      }
      calcList.splice(index-1, 3, total)
    }
    this.setState({ input: total })
  }
  numFormat(num) {
    let numToStr = num.toString();
    let startPoint = (numToStr.indexOf('.') !== -1)? numToStr.indexOf('.')-1 :numToStr.length
    let arr = numToStr.split('')
    if(+startPoint > 3){
      for(let i = startPoint-3 ; i > 0; i=i-3){
        arr.splice(i, 0, ',')
      }
    }
    return arr.join('')
  }
  verifyNumber() {
    const input = this.state.input;
    let isPass = true;
    if(input.toString().length > 9){
      document.querySelector('.hint-msg').setAttribute('class', 'hint-msg show')
      this.setState({msg: '已達最大位數'})
      setTimeout(()=>{
        document.querySelector('.hint-msg').setAttribute('class', 'hint-msg')
      }, 1300)
      isPass = false
    }
    return isPass
  }
  render() {
    return (
      <section name="3f" className="the-f2e-3f">
        <div className="calculator-group">
          {/* display */}
          <div className="display-group">
            <div className="display-process">
              {
                (this.state.calcList.length > 1)
                  ?
                  this.state.calcList
                    .map(item => {
                      const isMark = (this.state.markList.indexOf(item) !== -1 && item !== this.state.icon.equal)
                      return (isMark)? item: this.numFormat(item)
                    })
                    .join(' ')
                  :
                  null
              }
            </div>
            <div className="display-total">{this.numFormat(this.state.input)}</div>
          </div>
          {/* display end */}
          {/* button */}
          <div className="btn-group">
            <div className="row no-gutters">
              {
                this.state.btnList.map((item, index)=>{
                  let isMark = ( this.state.markList.indexOf(item) !== -1 );
                  return (
                    <div className="col-3" key={`btn-${index}`}
                      onClick={(isMark)? ()=>{this.btnMark(item)}: ()=>{this.btnNumber(item)}}>
                      <div className={(isMark)? 'btn-mark': 'btn-number'}>
                        {item}
                      </div>
                    </div>
                  )
                })
              }
              <div className="col-3">
                <div className="btn-delete" onClick={()=>{this.btnDelete(2)}}>AC</div>
              </div>
              <div className="col-3">
                <div className="btn-delete" onClick={()=>{this.btnDelete(1)}}>⌫</div>
              </div>
              <div className="col-6">
                <div className="btn-calc" onClick={()=>{this.btnCalc()}}>{this.state.icon.equal}</div>
              </div>
            </div>
          </div>
          {/* button end */}
        </div>
        <div className="hint-msg">{this.state.msg}</div>
      </section>
    )
  }
}

export default Calculator;
