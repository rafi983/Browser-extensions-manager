import FilterButton from './FilterButton';

const buttons: { text: 'All' | 'Active' | 'Inactive' }[] = [{ text: 'All' }, { text: 'Active' }, { text: 'Inactive' }];

const FilterButtons = () => {
  return (
    <div className='flex items-center gap-3'>
      {buttons.map((button) => (
        <FilterButton key={button.text} text={button.text} />
      ))}
    </div>
  );
};

export default FilterButtons;
