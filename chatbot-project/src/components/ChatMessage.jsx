import dayjs from 'dayjs';
import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/daju-bhai.jpeg';
import './ChatMessage.css';
import LoadingSpinnerImage from '../assets/loading-spinner.gif';


export function ChatMessage({message, sender, time}) {
  return (
    <div className={`chat-message-${sender}`}>
      {sender === 'robot' && (
        <img className="chat-profile" src={RobotProfileImage} />
      )}
      <div className="chat-message">
        <div>
          {
            message === 'loading'
            ? <img className="loading-img" src={LoadingSpinnerImage} />
            : message
          }
        </div>
        <div className="message-time">{dayjs(time).format('H:ma')}</div>
      </div>
      {sender === 'user' && (
        <img className="chat-profile" src={UserProfileImage} />
      )}
    </div>
  )
}