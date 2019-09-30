import { RootConfig } from '@root/types';

export const rootConfig: RootConfig = {
    // Color themes can be defined in src/app/app.theme.scss
    colorTheme: 'theme-default',
    customScrollbars: false,
    layout: {
        style: 'layout-1',
        width: 'fullwidth',
        header: {
            hidden: false,
            position: 'top',
            primaryBackground: 'root-navy-700',
            secondaryBackground: 'root-navy-900',
            variant: 'header header-6'
        },
        navbar: {
            primaryBackground: 'root-navy-700',
            secondaryBackground: 'root-navy-900',
            folded: false,
            hidden: true,
            position: 'top',
            variant: 'navbar1'
        },
        toolbar: {
            customBackgroundColor: true,
            background: 'root-navy-700',
            hidden: false,
            position: 'above'
        },
        footer: {
            customBackgroundColor: true,
            background: 'root-navy-900',
            hidden: false,
            position: 'above-fixed'
        },
        contentBelow: {
            customBackgroundColor: true,
            background: 'root-navy-700',
            hidden: false,
            position: 'below'
        },
        sidepanel: {
            hidden: true,
            position: 'right'
        }
    }
};
