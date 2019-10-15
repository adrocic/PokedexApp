import React from 'react';
import { DatePicker, Form, Input, Tooltip, message, notification, Icon, Cascader, Select, Button } from 'antd';
import axios from 'axios';
import 'less/screens/auth';
import { createServerValidator, showValidationErrors } from 'utils/form';
import { Email, ToggleablePassword } from 'components/form-inputs';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;

const url = '/auth/register';

class RegistrationScreen extends React.Component {

  constructor (props) {
    super(props);

    this.serverValidator = createServerValidator({
      form: this.props.form,
      url
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.serverValidator.disable();

    const form = this.props.form;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        this.serverValidator.enable();
      } else {
        values.password_confirmation = values.password;

        axios.post(url, values)
          .then((response) => this.props.onSuccess(response.data.data))
          .catch(axiosError => {
            showValidationErrors(form, values, axiosError);
          })
          .then(this.serverValidator.enable);
      }
    });

  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const serverValidator = this.serverValidator;

    return (
      <div className='auth-screen'>
        <Form layout='vertical' hideRequiredMark onSubmit={this.handleSubmit}>
          <h1>Register</h1>

          <FormItem
            label="First Name"
            hasFeedback
          >
            {getFieldDecorator('first_name', {
              rules: [{
                validator: serverValidator('first_name')
              }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            label="Last Name"
            hasFeedback
          >
            {getFieldDecorator('last_name', {
              rules: [{
                validator: serverValidator('last_name')
              }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            label="E-mail"
            hasFeedback
          >
            {getFieldDecorator('email', {
              rules: [{
                validator: serverValidator('email')
              }],
            })(
              <Email />
            )}
          </FormItem>

          <FormItem
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Password is required' }],
            })(
              <ToggleablePassword />
            )}
          </FormItem>

          <FormItem>
            <Button className='float-right' type="primary" htmlType="submit">Register</Button>
          </FormItem>

          <FormItem>
            <Link to='/login' className='float-right'>
              Already registered?
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(RegistrationScreen);
