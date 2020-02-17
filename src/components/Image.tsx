import { Component } from "react";

interface ImagePorps {
    source: string
}
interface ImageState {
    source: string,
    loaded: boolean
}
const defaultSrc = require('../assets/images/default.jpg')
class Image extends Component<ImagePorps, ImageState> {
    constructor(props: ImagePorps) {
        super(props);
        this.state = {
            source: '',
            loaded: false,
        }
    }
    render() {
        const { source, loaded } = this.state;
        console.log(this.props.source);

        return <div style={{ position: 'relative' }} {...this.props} >
            {loaded ? null : <img src={defaultSrc} style={{ position: 'absolute', width: '100%' }} />}
            <img src={this.props.source}
                onLoad={(a) => {
                    console.log(a);
                    this.setState({
                        loaded: true,
                    })
                }}
                style={{ visibility: loaded ? 'visible' : 'hidden', width: '100%' }}
            />
        </div>
    }
    componentDidMount() {

    }

}


export default Image