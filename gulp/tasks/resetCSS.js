import {deleteAsync} from "del"
export const resetCSS = () => {
    return deleteAsync(['dist/css'])
}