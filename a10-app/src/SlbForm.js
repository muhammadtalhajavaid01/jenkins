import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, getFormValues } from 'redux-form';
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { load as loadData } from './reducers/initial-reducer'
import { applyRules } from './utils/check-validations'
import { actionBtnStyle, fieldStyle, addItemStyle}  from './FormStyle/style'

// data for initialValues
var data = {};
var portListDefaultValue = {};

///////////////////////////
// Customize Field to render different type of fields
const renderField = ({type, label, disable, padding, input, meta: { error } }) => (
  <div style={fieldStyle(padding)}>
    <TextField {...input} disabled= {disable} type={type} floatingLabelText={label} errorText={error}/>
  </div>
);

///////////////////////////
// render multiple inputs against single JSON property (Array Field handling).
const renderFieldArray = ({padding, data, label, fields, meta: {submitFailed, error}}) =>
   <div>
    <br/><br/>
    <div>
      <label style={fieldStyle(padding - 1)}>{label}</label>
      <FloatingActionButton  mini={true} style={actionBtnStyle}>
        <ContentAdd style={addItemStyle} onClick={() => fields.push({}) }/>
      </FloatingActionButton>
    </div>
    {fields.map((field, index) =>
      <div key={index}>
        <ActionDelete style = {fieldStyle(padding - 1)} onClick={()=> fields.remove(index)} />
        {generateInputFields(JSON.parse(data).array[0], index, padding, field)}
      </div>
    )}
  </div>


///////////////////////////
// Generating fields based on string, number, object and array types
const fieldsGenerator = (key, value, index, padding, field, disable) => {
    let name = key;
    let tag;
    let portlist = false;

    if (field != null) {
      name = `${field}.${key}`
      if(field === 'portlist[0]')
        portlist = true;
    }

    if( value.type === "string" || value.type === "number") {
      const validate = applyRules(value);
      let type = "number";

      if (value.type === "string")
        type = "text"

      if(!data[key] && value.default !== undefined) {
        data[key] = value.default;
      }

      if(portlist) {
        if(!portListDefaultValue[key] && value.default !== undefined)  {
          portListDefaultValue[key] = value.default;
        }
      }
      return (<Field key={key} name={name} type={type} label={key} disable={disable} padding ={padding} component={renderField}  validate={validate} />);

    }else if (value.type === "object") {
      Object.entries(value.properties).forEach(([key, value]) => {
        const validate = applyRules(value);
        let type = "number";
        if(value.type === "string")
          type = "text";

        let innerFieldName = `${name}.${key}`;
        tag = (<Field key={key} name={innerFieldName} type={type} label={key} disable={disable} padding ={padding} component={renderField}  validate={validate} />);
      });

    } else if( value.type === "array" ) {
		    const strValue = JSON.stringify(value);
		    return (<FieldArray key={key} name={name} label={key} padding={padding + 1} data={strValue}  component={renderFieldArray} />);
    }

    if(tag)
      return tag;
}

///////////////////////////
// Generate Input Fields and push into tags list
const generateInputFields = (values, index, padding, field) =>{
  let tags = [];
  Object.entries(values.properties).forEach(([key, value]) => {
    let disable = false;
    if(value["modify-not-allowed"] !== undefined) {
      if(value["modify-not-allowed"] === 1)
        disable = true;
    }
    tags.push(fieldsGenerator(key, value, index, padding, field, disable));
  });
  return tags;
}

///////////////////////////
// Form Creator Component
class FormCreator extends Component {
  componentDidUpdate(prevProps) {
    // initial Data Loading
    this.props.load(data);
    const { portlist, change } = this.props;
    const { portlist: prevPortList } = prevProps;
    if (!portlist || portlist === prevPortList)
      return;

    if (!prevPortList || portlist.length > prevPortList.length) {
      change('portlist', portlist.slice(0, portlist.length - 1).concat(portListDefaultValue));
    }
  }
  render() {
    const { handleSubmit, jsonData, pristine, submitting, reset } = this.props;
    return (
      <form onSubmit = {handleSubmit}>
        {generateInputFields(jsonData, 0, 0, null)}
        <br/>
        <FlatButton type="submit" label="submit" primary={true} />
        <FlatButton type="button" secondary= {true} label= "set default" disabled={pristine || submitting} onClick={reset} />
      </form>
    );
  }
}


///////////////////////////
// Server Load Balancer Form Configuration and Redux Form Connect.

const formName = 'SLBFrom';
const FormConfiguration = {
  form: formName
}

let Form = reduxForm(FormConfiguration)(FormCreator)

const mapStateToProps = state => ({
  initialValues: state.initiailReducer.data,
  portlist: (getFormValues(formName)(state) || {}).portlist
})

const mapDispatchToProps = {
  load: loadData
}

Form = connect(mapStateToProps, mapDispatchToProps)(Form)

export default Form
