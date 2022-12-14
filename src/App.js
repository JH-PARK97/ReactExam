import React, { Component } from "react";

class App extends Component {
  state = {
    count: 0,
  };

  countUp = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <div className="App">


        <h3>index Props</h3>
        <div className="props">
          {/* Props가 들어가는 부분 */}
          <span>{"Props :" +this.props.message}</span>
        </div>

        <h3>State</h3>
        <div className="state">{/* State가 들어가는 부분 */}
          {this.state.count}
          <button onClick={this.countUp}>카운트업</button>
        </div>
        
        <h3> App Props </h3>
        <div className="inside-app-props">
          <InsideApp
            count={this.state.count}
            countUp={this.countUp}/>
        </div>
      </div>
    );
  }
}

class InsideApp extends Component {
  render() {
    return (
    <div>
      {this.props.count}
      <button onClick={this.props.countUp}>click me!</button>
    </div>
    )
  };
}

export default App;

{
  /*
    이 코드는 리액트 코드를 생성하는 부분인데요.
    먼저 App이라는 클래스를 생성한 후, 리액트 컴포넌트를 상속받습니다. 그렇게 되면 리액트 컴포넌트 메소드를 사용할 수가 있게 됩니다.
    render() 메소드는 리액트 컴포넌트인데, 화면에 html 뷰를 생성해주는 역할을 합니다. return 으로 받는 값들은, 나중에 html 코드로 바뀌게 됩니다.     
    그렇게 생성된 App 클래스를 export 문법을 이용해서 내보냅니다.
    더 간단하게 말해보자면,
    1. 리액트, 리액트 컴포넌트를 불러옵니다.
    2. App 클래스를 만드는데, 그 클래스는 리액트 컴포넌트를 상속받습니다.
    3. 상속받은 리액트 컴포넌트 메소드 중, render() 메소드를 활용해서 html 코드를 작성해 return 시켜줍니다.
    4. 이렇게 작성된 리액트 코드를 export 시켜줍니다.
*/
}
