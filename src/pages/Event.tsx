
import { FC, useEffect, useState } from 'react';
import Layout from 'antd/lib/layout/layout';
import CalendarEvent from '../components/CalendarEvent';
import { Button, Modal, Row } from 'antd';
import EventForm from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

const Event: FC = () => {
  const [showModal, setShowModal] = useState(false)
  const { fetchUsers, fetchEvents, createEvent } = useActions()
  const { guests, events } = useTypedSelector(state => state.event)
  const { user } = useTypedSelector(state => state.auth)

  useEffect(() => {
    fetchUsers()
    fetchEvents(user.username)
  }, []);
  
  const addNewEvent = (event: IEvent) => {
    setShowModal(false)
    createEvent(event)
  }
  
  return <Layout>
    <CalendarEvent events={events} />
    <Row justify='center'>
      <Button onClick={() => setShowModal(true)}>
        Добавить событие
      </Button>
    </Row>
    <Modal
      title="Добавить событие"
      visible={showModal}
      footer={null}
      onCancel={() => setShowModal(false)}
    >
      <EventForm
        guests={guests}
        submit={event => addNewEvent(event)}
      />
    </Modal>
  </Layout>;
};

export default Event;

