import { useSelector, useDispatch } from 'react-redux';
import { filterContact } from 'redux/filterSlice';

import css from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.value);

  const filterChange = evt => {
    dispatch(filterContact(evt.currentTarget.value));
  };
  return (
    <div className={css.filter}>
      <label className={css.labelFilter}>
        Filter
        <input
          type="name"
          value={filter}
          onChange={filterChange}
          className={css.filterInput}
        />
      </label>
    </div>
  );
};

export default Filter;
