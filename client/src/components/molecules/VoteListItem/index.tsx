import React from 'react';
import './VoteListItem.scss';

interface VoteListItemProps {
  title: string;
  position: string;
  status: '후보지정' | '투표진행중' | '투표완료';
  onClose?: () => void;
  onClick?: () => void;
}

export const VoteListItem: React.FC<VoteListItemProps> = ({
  title,
  position,
  status,
  onClose,
  onClick,
}) => {
  return (
    <div className='vote-list-item' onClick={onClick}>
      <div className='vote-list-item__content'>
        <div className='vote-list-item__title'>{title}</div>
        <div className='vote-list-item__position'>{position}</div>
      </div>
      <div className='vote-list-item__actions'>
        <div className='vote-list-item__status'>{status}</div>
        {onClose && (
          <button
            className='vote-list-item__close'
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};
