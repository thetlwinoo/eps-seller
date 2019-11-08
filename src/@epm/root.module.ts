import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { ROOT_CONFIG } from '@epm/services';

@NgModule()
export class RootModule
{
    constructor(@Optional() @SkipSelf() parentModule: RootModule)
    {
        if ( parentModule )
        {
            throw new Error('RootModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : RootModule,
            providers: [
                {
                    provide : ROOT_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
