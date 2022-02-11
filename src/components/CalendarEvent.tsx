import { FC } from 'react';
import { Badge, Calendar } from 'antd';
import { IEvent } from '../models/IEvent';
import { Moment } from 'moment';
import { formatDate } from '../utils/date';

interface EventCalendarProps {
  events: IEvent[]
}

const CalendarEvent: FC<EventCalendarProps> = ({events}) => {

  function dateCellRender(value: Moment) {
    const formatedDate = formatDate(value.toDate())
    const currentDayEvents = events.filter(ev => ev.date === formatedDate)

    console.log(currentDayEvents)
    
    return (
      <div>
        {currentDayEvents.map((ev, index) => 
          <div key={index}>
            <Badge color={'green'}>{ev.description}</Badge>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <Calendar dateCellRender={dateCellRender} />
  )
};

export default CalendarEvent;
