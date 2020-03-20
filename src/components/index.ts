/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

import * as layout from "./layout";
import * as common from "./common";

const components =
{
    ...layout,
    ...common
};

// tslint:disable-next-line:variable-name
export function install(Vue: any, opts: any = {})
{
    Object.keys(components).forEach(key =>
    {
        Vue.component(key, components[key]);
    });
}

// Vue.use
export default { ...components, install };
