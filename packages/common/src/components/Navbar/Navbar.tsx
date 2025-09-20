import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../../hooks/useIsMobile';
import { IItemList, INavbar } from '../../interfaces/INavbar';
import FlexCenter from '../shared/sharedStyles';
import {
  NavbarBrandImg,
  NavbarList,
  NavbarListItem,
  NavbarSlider,
  NavbarSliderIcon,
  NavbarUser,
  NavbarWrapper,
} from './NavbarElements';
import NavbarUserProfileCard from './NavbarUserProfileCard';

const Navbar: React.FC<INavbar> = ({
  img, itemList, userImg, profileList,
}) => {
  const [toggleSlider, setToggleSlider] = useState(false);
  const [showUserProfileCard, setShowUserProfileCard] = useState(false);
  const sliderRef = useRef();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const closeBtnStyles = {
    width: '5rem',
    height: '5rem',
    filter: 'opacity(0.75)',
    cursor: 'pointer',
    zIndex: 1005,
  };

  const toggleStyles = {
    display: toggleSlider ? 'flex' : 'none',
  };

  return (
    <NavbarWrapper>
      {img && (
        <NavbarBrandImg onClick={() => navigate('/')}>
          <img src={img} alt={img} width={50} height={50} />
        </NavbarBrandImg>
      )}
      <NavbarList>
        {itemList
          && itemList.map((e) => (
            <div key={e?.url}>
              <NavbarListItem href={e?.url} target={e?.target}>
                {e.text}
              </NavbarListItem>
            </div>
          ))}
      </NavbarList>
      {userImg && (
        <NavbarUser
          src={userImg}
          alt={userImg}
          onClick={() => setShowUserProfileCard(!showUserProfileCard)}
        />
      )}
      {showUserProfileCard && profileList && profileList?.length !== 0 && (
        <NavbarUserProfileCard
          profileList={profileList}
          setState={setShowUserProfileCard}
        />
      )}
      {isMobile && (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {!toggleSlider ? (
            <NavbarSliderIcon onClick={() => setToggleSlider(!toggleSlider)} />
          ) : (
            <FlexCenter
              style={closeBtnStyles}
              onClick={() => setToggleSlider(!toggleSlider)}
            >
              <img
                src="/assets/imgs/close.svg"
                alt="Close"
                width={20}
                height={20}
              />
            </FlexCenter>
          )}
        </>
      )}
      <NavbarSlider ref={sliderRef.current} style={toggleStyles}>
        {itemList
          && itemList.map((e: IItemList) => (
            <div key={e?.url}>
              <NavbarListItem href={e?.url} target={e?.target}>
                {e?.text}
              </NavbarListItem>
            </div>
          ))}
      </NavbarSlider>
    </NavbarWrapper>
  );
};

export default Navbar;
