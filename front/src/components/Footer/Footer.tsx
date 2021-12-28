import cx from 'classnames/bind';

const Footer = () => {
  return (
    <footer className={cx('bg-dark', 'py-3', 'text-white', 'text-center')}>
      2021 | Coded with &#10084;&#65039; by{' '}
      <a
        href="https://alfonsinalizardo.netlify.app/"
        target="_blank"
        rel="noreferrer"
        className="text-decoration-none"
      >
        &copy; Alfonsina Lizardo
      </a>
    </footer>
  );
};

export default Footer;
