import { HeaderProps } from '../types';

const Header = (props: HeaderProps): JSX.Element => <h1>{props.courseName}</h1>;

export default Header;
