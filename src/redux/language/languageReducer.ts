
import i18n from 'i18next';
import { CHANGE_LANGUAGE } from './languageAction';


export interface LanguageState {
    language: string;
    languageList: { name: string, code: string }[];
}

const languageState: LanguageState = {
    language: 'zh',
    languageList: [
        { name: '中文', code: 'zh' },
        { name: 'English', code: 'en' }]
}

const languageReducer = (state = languageState, action: any) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            i18n.changeLanguage(action.payload);
            return { ...state, language: action.payload };
    }
    return state;
}

export default languageReducer;