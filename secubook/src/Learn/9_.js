import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import './learn.css';
import Header from '../components/header.js'
import Arrow from '../assets/play.svg'
import axios from 'axios';

class Learn_9_ extends Component {

    state = {
        check: 0,
        re1: '',
        re2: '',
        re3: '',
        answer1_1: false,
        answer1_2: false,
        answer1_3: false,
        answer1_4: false,
        answer2: '',
    };

    submit = (e) => {
        if (this.state.re1 === "답이 맞았습니다." && this.state.re2 === "답이 맞았습니다." && this.state.re3 === "답이 맞았습니다.") {

            //axios.post('http://3.35.220.252/learn/check', { userAnswer: "", title: "크로스-사이트-스크립팅", type: 1 }, { withCredentials: true, }

            axios.post('http://localhost:8001/learn/check', { userAnswer: "", title: "SQL-INJECTION", type: 1 }, { withCredentials: true, }
            )
                .then(function (response) {
                    document.location.href = "/";
                })
                .catch(error => {
                    console.log('error : ', error.response)

                    //document.location.href = "/login";
                });

        }
        else {
            document.location.href = "/";
        }
    }

    check = (e) => {

        if (this.state.answer1_1 === true && this.state.answer1_3 === true && this.state.answer1_2 === false && this.state.answer1_4 === false) {
            this.setState({
                re1: "답이 맞았습니다."
            });
        }
        else {
            this.setState({
                re1: "답이 틀렸습니다."
            });
        }

        if (this.state.answer2 === "request.getParameter()") {
            this.setState({
                re2: "답이 맞았습니다."
            });
        }
        else {
            this.setState({
                re2: "답이 틀렸습니다."
            });
        }

        if (this.state.re1 === "답이 맞았습니다." && this.state.re2 === "답이 맞았습니다.") {

            this.setState({ check: 1 });
        }
        else {
            this.setState({ check: 0 });
        }

    }

    handleCheck = (e) => {
        this.setState({ [e.target.name]: e.target.checked })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div>
                <Header />
                <div className="connection-wrap-content">

                    <div onClick={this.submit} className="goProblem">목록보기</div>
                    <div className="problem">
                        <div className="problem_title">
                            1. SQL injection 예방을 위한 행동을 모두 고르시오.
                        </div>
                        <br></br>
                        <div id="problem0">

                            <input type="checkbox" name="answer1_1" value={this.state.answer1_1} onChange={this.handleCheck} /> PreparedStatement 라이브러리 및 setXXX() 사용

                            <br></br>
                            <input type="checkbox" name="answer1_2" value={this.state.answer1_2} onChange={this.handleCheck} /> Statement 라이브러리 사용
 <br></br>
                            <input type="checkbox" name="answer1_3" value={this.state.answer1_3} onChange={this.handleCheck} />불필요한 문자 필터링
                            <br></br>
                            <input type="checkbox" name="answer1_4" value={this.state.answer1_4} onChange={this.handleCheck} />검증된 사용자에게 온 입력값 바로 사용


                        </div>
                        <div className="error">
                            {this.state.re1}
                        </div>

                    </div>

                    <div className="problem">
                        <div className="problem_title">2. 다음 코드에서 취약한 부분에 해당하는 함수를 찾으시오. 단, 매개변수를 생략하시오. </div>
                        <br></br>
                        String accountBalanceQuery = <br></br>
  "SELECT accountNumber, balance FROM accounts WHERE account_owner_id = "
  + request.getParameter("user_id");<br></br>

try {"{"}<br></br>
    Statement statement = connection.createStatement();<br></br>
    ResultSet rs = statement.executeQuery(accountBalanceQuery);<br></br>
    while (rs.next()) {"{"}<br></br>
        page.addTableRow(rs.getInt("accountNumber"), rs.getFloat("balance"));
    {"}"}<br></br>
                        {"}"}<br></br> catch (SQLException e) {"{"} ... {"}"}<br></br>
                        <br></br>
                        <div>
                            <input id="answer2" name="answer2" value={this.state.answer2} onChange={this.handleChange} type="text" /><br></br>
                        </div>
                        <div className="error">
                            {this.state.re2}
                        </div>
                    </div>


                    {(this.state.check == 0) ? (<button className="problem_button" onClick={this.check}>채점하기</button>) : <button className="problem_button" onClick={this.submit}>제출하기</button>}


                </div>


            </div >
        )
    }

}

export default Learn_9_;