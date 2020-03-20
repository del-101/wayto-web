/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

const patrol = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/patrol/patrol")), "patrol");

export default
[
    {
        name: "patrol",
        path: "/patrol",
        component: patrol
    }
];
