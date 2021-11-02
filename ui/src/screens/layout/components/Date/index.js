import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import './style.css';

dayjs.extend(relativeTime);
const Date = ({ rawDate }) => {

  const date = dayjs(rawDate);

  const formatted = date.format('MMMM DD / YYYY');
  const timeAgo =  date.fromNow();

  return (
    <div className="date-container">
      <span className="publication-date">{formatted}</span>
      <span className="time-ago">{timeAgo}</span>
    </div>
  );
}

export default Date;
