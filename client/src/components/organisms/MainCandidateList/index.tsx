import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import Text from '@/components/atoms/Text';
import CandidateSection from '@/components/molecules/CandidateSection';
import medal from '@/assets/icons/medal.svg';
import crown from '@/assets/icons/crown.svg';
import silverCrown from '@/assets/icons/silverCrown.svg';
import { useNavigate } from 'react-router-dom';
import { VoteResult } from '@/types/voteSession';

interface Props {
  index: number;
  vote: VoteResult;
}

function MainCandidateList({ index, vote }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [canSlide, setCanSlide] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideWidth = useRef(0);
  const startX = useRef(0);
  const translateX = useRef(0);
  const isSingleItem = vote.teamResults.length === 1;
  const navigate = useNavigate();

  const items = getItems();

  // [0, 1, 2] => [2, 0, 1, 2, 0] 으로 만들기
  function getItems() {
    if (vote.teamResults.length === 0) return []; // 후보자가 없는 경우
    return isSingleItem
      ? vote.teamResults
      : [
          vote.teamResults[vote.teamResults.length - 1],
          ...vote.teamResults,
          vote.teamResults[0],
        ];
  }

  useEffect(initSlideWidth, [currentIndex]);

  function initSlideWidth() {
    const updateSlideWidth = () => {
      slideWidth.current =
        containerRef.current?.parentElement?.offsetWidth || 0;
      moveSlider(-currentIndex * slideWidth.current);
    };

    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    return () => window.removeEventListener('resize', updateSlideWidth);
  }

  function moveSlider(position: number) {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${position}px)`;
    }
  }

  function handleTouchStart(e: React.TouchEvent) {
    if (!canSlide || isSingleItem) return;
    startX.current = e.touches[0].clientX;
    translateX.current = -currentIndex * slideWidth.current;
    setTransitioning(false);
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!canSlide || isSingleItem) return;
    const deltaX = e.touches[0].clientX - startX.current;
    moveSlider(translateX.current + deltaX);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!canSlide || isSingleItem) return;

    const deltaX = e.changedTouches[0].clientX - startX.current;
    const threshold = slideWidth.current * 0.25;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        moveToSlide(currentIndex + 1);
      } else {
        moveToSlide(currentIndex - 1);
      }
    } else {
      moveToSlide(currentIndex);
    }
  }

  function moveToSlide(index: number) {
    if (index === 0 || index === items.length - 1) {
      setCanSlide(false);
      setTimeout(() => setCanSlide(true), 500);
    }

    setTransitioning(true);
    setCurrentIndex(index);
  }

  function handleRouteChannel(cadindateId: number) {
    navigate(`/elections/${vote.voteId}/candidates/${cadindateId}`);
  }

  useEffect(handleTransitionEndEffect, [currentIndex, transitioning]);

  function handleTransitionEndEffect() {
    if (!transitioning || isSingleItem) return;

    function handleTransitionEnd() {
      let newIndex = currentIndex;

      if (currentIndex === 0) {
        newIndex = items.length - 2;
      } else if (currentIndex === items.length - 1) {
        newIndex = 1;
      }

      setTransitioning(false);
      setCurrentIndex(newIndex);
    }

    const container = containerRef.current;
    container?.addEventListener('transitionend', handleTransitionEnd);

    return () =>
      container?.removeEventListener('transitionend', handleTransitionEnd);
  }

  useEffect(handleSlideTransition, [currentIndex, transitioning]);

  function handleSlideTransition() {
    if (!containerRef.current || isSingleItem) return;

    const offset = -currentIndex * slideWidth.current;
    containerRef.current.style.transition = transitioning
      ? 'transform 0.4s ease'
      : 'none';
    containerRef.current.style.transform = `translateX(${offset}px)`;
  }

  return (
    <div className={styles['vote-main']}>
      <div className={styles['vote-title']}>
        {index === 0 ? (
          <img src={crown} alt='후보' />
        ) : index === 1 ? (
          <img src={silverCrown} alt='후보' />
        ) : (
          <img src={medal} alt='후보' />
        )}
        <Text weight='bold'>{vote.voteName} 후보</Text>
      </div>

      <div className={styles['vote-team-wrapper']}>
        <div
          className={styles['vote-team-list']}
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role='region'
          aria-label='후보 목록'
        >
          {items ? (
            items.map((team, index) => {
              if (!team || team.teamId === undefined) {
                return <div key={index}>후보자 X</div>;
              }
              return (
                <CandidateSection
                  key={`${team.teamId}-${index}`}
                  team={team}
                  onClick={() => handleRouteChannel(team.teamId)}
                />
              );
            })
          ) : (
            <div style={{ width: '100%', height: '100%' }}>
              아직 후보자가 등록되지 않았어요
            </div>
          )}
        </div>
      </div>

      {!isSingleItem && (
        <div className={styles['vote-dots']}>
          {vote.teamResults.map((_, index) => (
            <Text
              key={index}
              size='xl'
              color={
                currentIndex === index
                  ? 'var(--color-main-orange)'
                  : 'var(--color-gray-light)'
              }
            >
              •
            </Text>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainCandidateList;
