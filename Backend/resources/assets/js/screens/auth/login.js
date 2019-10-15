import React from 'react';
import axios from 'axios';
import 'less/screens/auth';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { Email, ToggleablePassword } from 'components/form-inputs';
import { showValidationErrors } from 'utils/form';

const FormItem = Form.Item;

class LoginScreen extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    let form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        axios.post('/auth/login', values)
          .then(response => {
            this.props.onSuccess(response.data.data);
            return response;
          })
          .catch(axiosError => {
            showValidationErrors(form, values, axiosError);
          })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className='auth-screen'>
        <h1 className='header'>Login</h1>

        <Form onSubmit={this.handleSubmit}>

          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Email placeholder="Email" />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Password is required' }],
            })(
              <ToggleablePassword placeholder='Password' />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}

            <Button type="primary" htmlType="submit" className='float-right'>
              Log in
            </Button>
          </FormItem>

          <FormItem>
            <Link to='/forgot-password' className='forgot-password'>
              Forgot Password?
            </Link>
            <Link to='/register' className='float-right'>
              Register
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(LoginScreen);
