import css from './Options.module.css';

const Options = ({ children, handleClick }) => {
  return (
    <>
      <button className={css.button} onClick={handleClick}>
        {children}
      </button>
    </>
  );
};
export default Options;
