const scaleNames={
    c: 'Celsius',
    f: 'Fahrenheit'
}

function toCelsius (fahrenheit){

    return (fahrenheit - 32)*5/9

}

function toFahrenheit (celsius){

    return (celsius*9/5) + 32

}

function BoilingVerdict({celsius}){
    if(celsius >=100){
        return <div className="alert alert-success marg" >L'eau bout</div>
    }
    return <div className="alert alert-info marg" >L'eau ne bout pas</div>
}

function tryConvert(temperature, convert){
    const value = parseFloat(temperature)
    if (Number.isNaN(value)){
        return ''
    }
    return (Math.round(convert(value) * 100) / 100).toString()
}

class TemperatureInput extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        const {temperature} = this.props
        const name = 'scale' + this.props.scale
        const scaleName = scaleNames[this.props.scale]
        return <div className="form-group">
            <label className="marg" htmlFor={name}>Templeature (en {scaleName})</label>
            <input type="text" id={name} value={temperature} onChange={this.handleChange} className="form-control marg"/>
        </div>
    }

}

class Calculator extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            scale: 'c',
            temperature: 0
        }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    }

    handleCelsiusChange(temperature){
        this.setState({
            scale: 'c',
            temperature
        })
    }

    handleFahrenheitChange(temperature){
        this.setState({
            scale: 'f',
            temperature
        })
    }


    render() {
        const {temperature, scale} = this.state
        const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius)
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature
        return <div>
            <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
            <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
            <BoilingVerdict celsius={celsius}/>
        </div>

    }
}

ReactDOM.render(<Calculator/>, document.querySelector('#app'))