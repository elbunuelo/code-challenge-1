import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { getGist } from 'api/github';
import Date from 'screens/layout/components/Date';
import User from 'screens/layout/components/User';

import './style.css'

const Detail = () => {
  const { id } = useParams();

  const [gist, setGist] = useState();
  useEffect(() => {
    getGist(id).then(setGist);
  }, [id]);


  const fileContents = [];
  let owner = {};
  if (gist) {
    for (const filename in gist.files) {
      const file = gist.files[filename];
      if (filename.endsWith('.md')) {
        fileContents.push(
        <ReactMarkdown key={filename} rehypePlugins={[rehypeRaw]}>{file.content}</ReactMarkdown>
        );
      } else {
        fileContents.push(
          <p key={filename}>
            { file.content.split('\n').map((line, index) => <span key={`${filename}-line-${index}`}>{line}<br/></span>)}
          </p>);
      }
    }
    owner = gist.owner;
  }

  return (
  <div className="gist-detail">
    {!gist && <h2>Loading...</h2> }
    {!!gist && (
    <>
      <Date date={gist.created_at}/>
      <h2 className="headline">
        {gist.description || "Untitled Gist"}
      </h2>
      <div className="content">
      {fileContents}
      </div>
      <Link to={`/user/${owner.login}`}>
        <User username={owner.login} avatar={owner.avatar_url} />
      </Link>
    </>)}
  </div>);
}

export default Detail;
