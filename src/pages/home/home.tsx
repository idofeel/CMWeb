import React, { Component } from 'react'
import { Input, Button } from 'antd';
import request from '../../utils';
import _fetch from 'dva/fetch';
import style from './home.less'
const { Search } = Input;
interface Props {

}
interface State {

}

export default class index extends Component<Props, State> {
    state = {
        value: ''
    }

    render() {
        return (
            <div className={style.a}>
                <Search placeholder="input search text" onSearch={(value: string) => {
                    // this.getWord(value)
                }} enterButton />

                {/* {this.state} */}
                <div dangerouslySetInnerHTML={{ __html: this.state.value }}></div>
            </div>
        )
    }

    async componentDidMount() {


    }

//     async getWord(word: string) {
//         try {

//             let self = this;
//             const ress = _fetch('http://10.36.34.209:80/translate?word=' + word).then(res => {
//                 console.log(res.text())

//                 self.setState({
//                     value: res
//                 })
//             });

//         } catch (err) {
//             console.log(err)
//         }

//     }

// }
