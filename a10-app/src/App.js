import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import jsonData from './slbserver.json';
import FormConfigurations from './SlbForm';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // Submit Function Triggers on submit of Form.
  submit = (values) => {
    // here we can get all the submited inputs
    window.alert('You submitted the Configurations... Please check console');
    console.log(values);
  }
  render() {
    return(
      <div>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Server Load Balancer Configurations</h1>
        </header>
        <div className='Form-content'>
          <MuiThemeProvider>
            <FormConfigurations onSubmit={this.submit} jsonData={jsonData} />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}


export default App;
