export interface RootConfig {
  colorTheme: string;
  customScrollbars: boolean;
  layout: {
    style: string;
    width: 'fullwidth' | 'boxed';
    alert: {
      customBackgroundColor: boolean;
      hidden: boolean;
      position: 'top' | 'top-fixed';
      background: string;
    };
    header: {
      hidden: boolean;
      position: 'top' | 'top-fixed';
      primaryBackground: string;
      secondaryBackground: string;
      variant: string;
    };
    subnav: {
      primaryBackground: string;
      secondaryBackground: string;
      hidden: boolean;
      folded: boolean;
      position: 'left' | 'right' | 'top';
      variant: string;
    };
    sidenav: {
      primaryBackground: string;
      secondaryBackground: string;
      hidden: boolean;
      folded: boolean;
      position: 'left' | 'right' | 'top';
      variant: string;
    };
    toolbar: {
      customBackgroundColor: boolean;
      background: string;
      hidden: boolean;
      position: 'above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed';
    };
    footer: {
      customBackgroundColor: boolean;
      background: string;
      hidden: boolean;
      position: 'above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed';
    };
    contentBelow: {
      customBackgroundColor: boolean;
      background: string;
      hidden: boolean;
      position: 'below';
    };
    sidepanel: {
      hidden: boolean;
      position: 'left' | 'right';
    };
  };
}
