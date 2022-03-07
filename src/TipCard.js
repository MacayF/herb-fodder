import './TipCard.css';

export default function Message(props) {
  // can add other data to messages with props.date etc
  return (
    <div className='card'>
      <span className='name-tag'>{props.name}</span>
      <div className='message-text'>{props.url}</div>
      <img className="pic" src={props.image}/>
    </div>
  );
}