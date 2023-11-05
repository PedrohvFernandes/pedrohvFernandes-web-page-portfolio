import React from 'react';

import { IoCloseCircle } from 'react-icons/io5';

import SubtitleMain from '@components/texts/SubtitleMain';
import SubtitleSecondary from '@components/texts/SubtitleSecondary';
import { ConfigStyles } from '@config/index';

import {
  AppPlatformsLink,
  CardAppPlatformsContainer,
  CardAppPlatformsContent,
} from './styles';

type IPropsSubTitleMainMobileOrDesktop = {
  className?: string;
};

export const SubTitleMainMobileOrDesktop: React.FC<IPropsSubTitleMainMobileOrDesktop> = ({
  className,
}) => {
  return (
    <SubtitleMain className={className}>
      Baixe o nosso App e fique por dentro do seu
      <span style={{ color: ConfigStyles.rebox.colors.black.main }}>
        {' '}
        plano!
      </span>
    </SubtitleMain>
  );
};

type IPropsAppPlatform = {
  linkApp: string;
  LogoSvg: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  namePlatform: string;
};

const AppPlatform: React.FC<IPropsAppPlatform> = ({
  linkApp,
  LogoSvg,
  namePlatform,
}) => {
  return (
    <AppPlatformsLink
      to={{
        pathname: linkApp,
      }}
      target="_blank"
    >
      <SubtitleSecondary fontWeight={400}>{namePlatform}</SubtitleSecondary>
      <LogoSvg />
    </AppPlatformsLink>
  );
};

interface IPropsCardAppPlatforms extends React.HTMLAttributes<HTMLDivElement> {
  children:
    | React.ReactElement<IPropsAppPlatform>
    | React.ReactElement<IPropsAppPlatform>[];
  setMenuPlatformIsClose: (sidebarIsClose: boolean) => void;
  menuPlatformIsClose: boolean;
}
const CardAppPlatform: React.FC<IPropsCardAppPlatforms> = ({
  children,
  setMenuPlatformIsClose,
  menuPlatformIsClose,
  ...rest
}) => {
  return (
    <CardAppPlatformsContainer {...rest}>
      <IoCloseCircle
        size={25}
        onClick={() => setMenuPlatformIsClose(!menuPlatformIsClose)}
      />
      <SubTitleMainMobileOrDesktop className="titleMobileMain" />
      <SubtitleSecondary fontWeight={400}>Disponível para:</SubtitleSecondary>
      <CardAppPlatformsContent>
        {React.Children.map(children, child => {
          if (!React.isValidElement(child) || child.type !== AppPlatform) {
            throw new Error(
              'CardAppPlatforms must receive only AppPlatform component as children',
            );
          }
          return child;
        })}
      </CardAppPlatformsContent>
    </CardAppPlatformsContainer>
  );
};

const CardAppPlatforms = {
  SubTitleMainMobileOrDesktop,
  AppPlatform,
  CardAppPlatform,
};

export default CardAppPlatforms;
