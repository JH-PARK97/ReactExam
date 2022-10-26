import React from "react";
import ReactDom from "react-dom/client";

// public 폴더의 index.html 파일 내의 <div id='root'>에 렌더링을 하겠다는 의미이다.
const root = ReactDom.createRoot(document.getElementById("root"));

// 이 코드에는 문제가 있다. Clock이 타이머를 설정하고 매초 UI를 업데이트 하는 것이 Clock의 구현 세부사항이 되어야 한다.
// 그러기 위해선 Clock 컴포넌트에 state를 추가해야한다.
// State는 props와 유사하지만, 비공개이며 컴포넌트에 의해 완전히 제어된다.

// function Clock(props) {
//   return (
//     <div>
//     <h1>Hello,world</h1>
//     <h2>현재 시각은 {props.data.toLocaleTimeString()}입니다.</h2>
//   </div>
//   );
// }

// function tick() {
// root.render(<Clock data={new Date()} />);
// }
// setInterval(tick,1000);


// ====Clock 함수 컴포넌트에서 클래스로 변환하기.====
// React.Component를 확장하는 동일한 이름의 ES6 class를 생성합니다.
// render()라고 불리는 빈 메서드를 추가합니다.
// 함수의 내용을 render() 메서드 안으로 옮깁니다.
// render() 내용 안에 있는 props를 this.props로 변경합니다.
// 남아있는 빈 함수 선언을 삭제합니다.

  // Clock은 이제 함수가 아닌 클래스로 정의된다.
class Clock extends React.Component {
  // class constructor 추가
  // 클래스 컴포넌트는 항상 props로 기본 constructor를 호출한다.
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  // 생명주기 메서드를 클래스에 추가하기
  // Clock이 처음 DOM에 렌더링 될 때마다 타이머 설정  ==> "마운팅"
  // Clock에 의해 생성된 DOM이 삭제될 때마다 타이머를 해제 ==> "언마운팅"
  // 컴포넌트 클래스에서 특별한 메서드를 선언하여 컴포넌트가 마운트되거나 언마운트 될 때 일부 코드를 작동할 수 있다.
  // 이러한 메서스들을 "생명주기 메서드"라고 한다.


  // 컴포넌트 출력물이 DOM에 렌더링 된 후 실행. (타이머를 설정하기 좋은 메소드)
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // Clock 컴포넌트가 매초 작동하도록 하는 tick() 메서드를 구현해야한다.
  // 이것을 컴포넌트 로컬 state를 업데이트하기 위해 this.setState()를 사용합니다.

  tick() {
    this.setState({
      date : new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello,world</h1>
{/* date를 props에서 state로 변환하기.
1. render() 메서드 안에 있는 this.props.date 를 this.state.date 로 변경한다. 
2. 초기 this.state를 지정하는 class constructor를 추가한다.*/}
        <h2>현재 시각은 {this.state.date.toLocaleTimeString()}입니다.</h2>
      </div>
    );
  }
}

  // <Clock /> 요소에서 date prop을 삭제한다.
  root.render(<Clock />);

// tick() ==> 초마다 root.render()를 호출하는 함수

//       함수 컴포넌트
//  function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

// function App() {
//   return (
//     <div>
//       <Welcome name="Sara" />
//       <Welcome name="Cahal" />
//       <Welcome name="Edite" />
//     </div>
//   );
// }

// root.render(<App />);

//             클래스 컴포넌트
// class Welcome extends React.Component {
//   render() {
//     return <h1>Hello, {this.props.name}</h1>;
//   }
// }

// Comment라는 컴포넌트의 구조는 구성요소가 중첩되어 있어서 변경하기 어려울 수 있다. 각 구성요소를 개별적으로 재사용하기도 힘들다.
// 이 컴포넌트에서 몇 가지 컴포넌트를 추출해야한다.

// function Comment(props) {
//   return (
//     <div className="Comment">
//       <div className="UserInfo">
//         <img className="Avatar"
//           src={props.author.avatarUrl}
//           alt={props.author.name}
//         />
//         <div className="UserInfo-name">
//           {props.author.name}
//         </div>
//       </div>
//       <div className="Comment-text">
//         {props.text}
//       </div>
//       <div className="Comment-date">
//         {formatDate(props.date)}
//       </div>
//     </div>
//   );
// }

// function formatDate(date) {
//   return date.toLocaleDateString();
// }

// // Avatar는 자신이 Comment 내에서 렌더링 된다는 것을 알 필요가 없다.
// // 이름을 arthor에서 user로 변경
// // props의 이름은 사용될 context가 아닌 컴포넌트 자체의 관점에서 짓는것을 권장한다.

// function Avatar(props) {
//   return (
//   <img className="Avatar"
//   src={props.user.avatarUrl}
//   alt={props.user.name} />
//   );
// }

// // 사용자의 이름을 렌더링하는 UserInfo 컴포넌트 추출
// function UserInfo(props) {
//   return (
//     <div className="UserInfo">
//       <Avatar user={props.user} />
//       <div className="UserInfo-name">
//         {props.user.name}
//       </div>
//     </div>
//   );
// }

// function Comment(props) {
//   return (
//     <div className="Comment">
//       <UserInfo user = {props.author} />
//       <div className="Comment-text">
//         {props.text}
//       </div>
//       <div className="Comment-date">
//         {formatDate(props.date)}
//       </div>
//     </div>
//   );
// }

// const comment = {
//   date: new Date(),
//   text: '열심히 리액트 배워봅시다',
//   author: {
//     name: '헬로키티',
//     avatarUrl: 'http://placekitten.com/g/64/64'
//   }
// };

// root.render(
//   <Comment
//     date={comment.date}
//     text={comment.text}
//     author={comment.author} />
// );
