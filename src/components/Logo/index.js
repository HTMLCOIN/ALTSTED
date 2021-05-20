
import AlthashImage from 'components/AlthashImage';

const sources = [
  {
    srcSet: ' /assets/logo/htmlLogo.png 600w,  /assets/logo/htmlLogo.png 960w, /assets/logo/htmlLogo.png 1280w',
    type: 'image/webp'
  },
  {
    srcSet: ' /assets/logo/htmlLogo.png 600w,  /assets/logo/htmlLogo.png 960w,  /assets/logo/htmlLogo.png',
    type: 'image/png'
  }
];

const Logo = props => (
  <AlthashImage
    {...props}
    width={32}
    height={32}
    sources={sources} />
);

export default Logo;
