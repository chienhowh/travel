
export const CHANGE_LANGUAGE = "change_language";

export interface ChangeLanguageAction {
    type: string;
    payload: string
}

export const changeLanguageActionCreator = (key: string): ChangeLanguageAction => {
    return { type: CHANGE_LANGUAGE, payload: key }
}