import css from './Options.module.css';

const Options = ({ children, handleClick }) => {
  return (
    <>
      <li>
        <button className={css.button} onClick={handleClick}>
          {children}
        </button>
      </li>
    </>
  );
};
export default Options;
