import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import './problem.css'
import axios from 'axios';
import cookie from 'react-cookies';

class Problem_right extends Component {
    state = {
        list: [],
    };


    componentDidMount() {
        //

        axios.get("http://3.35.220.252/problem")
            //axios.get("http://localhost:8001/problem")
            .then((resp) => {
                var temp = [];
                for (var i = 0; i < resp.data.results.length; i++) {
                    temp.push({
                        id: resp.data.results[i].id, title: resp.data.results[i].title, category: resp.data.results[i].category,
                        level: resp.data.results[i].level, cntOfSolve: resp.data.results[i].cntOfSolve, cntOfRun: resp.data.results[i].cntOfRun,
                        timeAverage: resp.data.results[i].timeAverage
                    });
                }
                this.setState({
                    list: temp,
                });

            })
            .catch((err) => {
                console.log(err)
            })
    }

    move = (e) => {
        alert(e.target.id);
        cookie.save("number", e.target.id);
        cookie.save("starttime", new Date().getTime());

        axios.get("http://3.35.220.252/problem/" + e.target.id, { withCredentials: true, })
            //axios.get("http://localhost:8001/problem/" + e.target.id, { withCredentials: true, })
            .then((resp) => {
                alert(resp.data.results.content)

                cookie.save("content", resp.data.results.content);
                cookie.save("image", resp.data.results.image);
                cookie.save("code", resp.data.code);

                document.location.href = "/code"
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //난이도 추가
    render() {
        const listList = this.state.list.map(

            (list) => (
                <div className="box" onClick={this.move} id={list.id}>
                    <b className="bold">
                        <div className="problem_num">{list.id}</div>
                        <div className="problem_name">{list.title}</div>
                    </b>
                    <br></br>
                    <div>
                        <div className="problem_solve">{list.cntOfSolve}</div>
                        <div className="problem_percentage">정답률 </div>
                    </div>
                </div>
            )
        );
        return (
            <div>
                <div class="row">

                    {listList}

                </div>
            </div >
        )
    }

}

export default Problem_right;