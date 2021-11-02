import { Link } from 'react-router-dom';

import Date from 'screens/layout/components/Date';

import './style.css';


const GistList = ({ records }) => {

  const recordSnippet = (record) => {
    const file = Object.values(record.files).pop()

    return file.content
  }


  return (
    <div className="gists">
      {records !== undefined && !records.length && (
        <div className="loading">Loading gists...</div>
      )
      }
      {!!records && records.map(record => (
          <Link to={`/gist/${record.id}`} key={record.id}>
            <div className="gist" >
                <div className="content">
                  <Date date={record.created_at} />
                  <div className="snippet">
                    {recordSnippet(record)}
                  </div>
                </div>
                <div className="action">
                  Read
                </div>
            </div>
          </Link>
      ))}
    </div>
  );
}

export default GistList;
