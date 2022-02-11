import { FC, useState } from 'react';
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { rules } from '../utils/rule';
import { User } from '../models/User';
import { IEvent } from '../models/IEvent';
import { Moment } from 'moment';
import { formatDate } from '../utils/date';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface EventFormProps {
  guests: User[],
  submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    author: '',
    date: '',
    description: '',
    guest: ''
  })
  
  const { user } = useTypedSelector(state => state.auth)
  
  const selectDate = (date: Moment | null) => {
    if(date) {
      setEvent({...event, date: formatDate(date.toDate())})
    }
  }
  
  const submitForm = () => {
    props.submit({...event, author: user.username})
    setEvent({
      author: '',
      date: '',
      description: '',
      guest: ''
    })
  }
  
  return <Form onFinish={submitForm}>
      <Form.Item
        label="Описание события"
        name="description"
        rules={[rules.required()]}
      >
        <Input 
          autoComplete='off'
          onChange={e => setEvent({...event, description: e.target.value})} 
          value={event.description}
        />
      </Form.Item>
      <Form.Item
        label="Дата события"
        name="date"
        rules={[rules.required()]}
      >
        <DatePicker onChange={date => selectDate(date)} />
      </Form.Item>
      <Form.Item
        label="Выберите гостя"
        name="guest"
        rules={[rules.required()]}
      >
        <Select onChange={(guest: string) => setEvent({...event, guest})}>
          {props.guests.map((guest, index) => {
            return <Select.Option value={guest.username} key={index}>
              {guest.username}
            </Select.Option>
          })}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Создать событие
        </Button>
      </Form.Item>
  </Form>;
};

export default EventForm;
