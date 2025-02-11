import { ChangeEvent, useState } from 'react';

export const usePledges = (initialPledges = ['']) => {
  const [pledges, setPledges] = useState(initialPledges);

  const handlePledgeChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newPledges = [...pledges];
    newPledges[index] = e.target.value;
    setPledges(newPledges);
  };

  const handleAddPledge = () => {
    if (pledges.length < 5) {
      setPledges([...pledges, '']);
    }
  };

  const handleDeletePledge = (indexToDelete: number) => {
    setPledges(pledges.filter((_, index) => index !== indexToDelete));
  };

  return {
    pledges,
    setPledges,
    handlePledgeChange,
    handleAddPledge,
    handleDeletePledge,
  };
};
