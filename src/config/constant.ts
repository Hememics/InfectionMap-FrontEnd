const BASENAME = '';
const BASE_URL = '/app/dashboard/default';
const BASE_TITLE = ' | React Datta Able ';
const API_SERVER = '/api/'

type Test = {
    _id: number;
    test_date: string;
    test_type: string;
    test_result: string;
    test_location: number[];
}

export default BASENAME;
export {BASE_URL, BASE_TITLE, API_SERVER, Test};