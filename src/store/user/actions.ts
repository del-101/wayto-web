/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

import { ActionTree, ActionContext } from "vuex";
import State from "./state";
import { IUserProfile } from "models/account";

export function setProfile(store: ActionContext<State, any>, profile: IUserProfile): void
{
    store.commit("SET_PROFILE", profile);
}

export function setRole(store: ActionContext<State, any>, role: string): void
{
    store.commit("SET_ROLE", role);
}

export function logout(store: ActionContext<State, any>): void
{
    store.commit("LOGOUT");
}

export function setAuthorizedCodes(store: ActionContext<State, any>, authorizedCodes: Array<any>): void
{
    store.commit("SET_AUTHORIZEDCODES", authorizedCodes);
}

export default <ActionTree<State, any>>
{
    setProfile,
    setRole,
    logout,
    setAuthorizedCodes
};
